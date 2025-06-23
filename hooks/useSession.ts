import { useState, useEffect, useRef } from 'react'

// Types pour la session
interface Session {
  id: string
  sessionToken: string
  expiresAt: string
  createdAt: string
}

interface SessionState {
  session: Session | null
  isLoading: boolean
  error: string | null
  isInitializing: boolean
}

const SESSION_STORAGE_KEY = 'boussole_session_token'

// Variable globale pour prévenir les créations multiples
let globalSessionPromise: Promise<Session | null> | null = null

export function useSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    isLoading: true,
    error: null,
    isInitializing: false
  })

  // Référence pour éviter les appels multiples
  const initializationRef = useRef(false)

  // Créer une nouvelle session
  const createSession = async (): Promise<Session | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session')
      }

      const data = await response.json()
      
      if (data.success) {
        // Sauvegarder le token dans localStorage (avec vérification SSR)
        if (typeof window !== 'undefined') {
          localStorage.setItem(SESSION_STORAGE_KEY, data.session.sessionToken)
        }
        
        setState(prev => ({ 
          ...prev, 
          session: data.session, 
          isLoading: false 
        }))
        
        return data.session
      } else {
        throw new Error(data.error || 'Erreur inconnue')
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      }))
      return null
    }
  }

  // Vérifier si une session existe et est valide
  const validateSession = async (sessionToken: string): Promise<Session | null> => {
    try {
      const response = await fetch(`/api/sessions?sessionToken=${encodeURIComponent(sessionToken)}`)
      
      if (!response.ok) {
        throw new Error('Erreur lors de la validation de la session')
      }

      const data = await response.json()
      
      if (data.success && data.valid) {
        return data.session
      }
      
      return null
    } catch (error) {
      console.error('Erreur lors de la validation de la session:', error)
      return null
    }
  }

  // Supprimer la session avec gestion d'erreur améliorée
  const deleteSession = async (): Promise<void> => {
    try {
      if (typeof window === 'undefined') return

      const currentToken = localStorage.getItem(SESSION_STORAGE_KEY)
      
      if (currentToken) {
        const response = await fetch(`/api/sessions?sessionToken=${encodeURIComponent(currentToken)}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          console.warn('Failed to delete session on server, continuing with local cleanup')
        }
      }
      
      // Nettoyer le localStorage et l'état
      localStorage.removeItem(SESSION_STORAGE_KEY)
      setState(prev => ({ 
        ...prev, 
        session: null, 
        error: null 
      }))
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error)
      // Continuer avec le nettoyage local même en cas d'erreur serveur
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_STORAGE_KEY)
      }
      setState(prev => ({ 
        ...prev, 
        session: null, 
        error: null 
      }))
    }
  }

  // Obtenir ou créer une session avec prévention améliorée des race conditions
  const getOrCreateSession = async (): Promise<Session | null> => {
    // Si une création de session est déjà en cours globalement, attendre
    if (globalSessionPromise) {
      console.log('🔄 Session en cours de création, attente...')
      return globalSessionPromise
    }

    // Vérifier d'abord si on a déjà une session en mémoire
    if (state.session) {
      console.log('✅ Session déjà en mémoire')
      return state.session
    }

    // Prévenir les appels concurrents pour cette instance
    if (state.isInitializing) {
      return new Promise((resolve) => {
        const checkState = () => {
          if (!state.isInitializing) {
            resolve(state.session)
          } else {
            setTimeout(checkState, 100)
          }
        }
        checkState()
      })
    }

    console.log('🎯 Début de l\'initialisation de session')
    setState(prev => ({ ...prev, isInitializing: true }))

    // Créer une promesse globale pour éviter les créations multiples
    globalSessionPromise = (async () => {
      try {
        // Vérifier le localStorage (avec protection SSR)
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem(SESSION_STORAGE_KEY)
          
          if (storedToken) {
            console.log('🔍 Token trouvé dans localStorage, validation...')
            // Valider la session existante
            const validSession = await validateSession(storedToken)
            if (validSession) {
              console.log('✅ Session valide récupérée:', {
                id: validSession.id,
                token: validSession.sessionToken?.substring(0, 10) + '...',
                expires: validSession.expiresAt
              })
              setState(prev => ({ 
                ...prev, 
                session: validSession, 
                isLoading: false,
                isInitializing: false
              }))
              console.log('📊 État mis à jour - session stockée')
              return validSession
            } else {
              console.log('❌ Session expirée, suppression du localStorage')
              // Session expirée, la supprimer du localStorage
              localStorage.removeItem(SESSION_STORAGE_KEY)
            }
          }
        }

        // Créer une nouvelle session seulement si nécessaire
        console.log('🆕 Création d\'une nouvelle session')
        const newSession = await createSession()
        setState(prev => ({ ...prev, isInitializing: false }))
        return newSession
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de session:', error)
        setState(prev => ({ ...prev, isInitializing: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }))
        throw error
      } finally {
        // Nettoyer la promesse globale
        globalSessionPromise = null
      }
    })()

    return globalSessionPromise
  }

  // Initialiser la session au chargement du composant avec protection contre les doubles appels
  useEffect(() => {
    // Prévenir les doubles initialisations
    if (initializationRef.current) {
      console.log('🛑 Initialisation déjà en cours, skip')
      return
    }

    initializationRef.current = true
    console.log('🚀 Initialisation de useSession')
    
    getOrCreateSession()
      .then(session => {
        console.log('✅ Session initialisée:', session ? 'Succès' : 'Échec')
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'initialisation:', error)
      })
  }, [])

  // Obtenir le token de session actuel avec protection SSR
  const getSessionToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return state.session?.sessionToken || localStorage.getItem(SESSION_STORAGE_KEY)
  }

  // Debug des valeurs retournées
  const returnValue = {
    // État de la session
    session: state.session,
    sessionToken: getSessionToken(),
    isLoading: state.isLoading,
    error: state.error,
    isInitializing: state.isInitializing,
    
    // Actions
    createSession,
    validateSession,
    deleteSession,
    getOrCreateSession,
    
    // Utilitaires avec protection SSR
    isSessionValid: !!state.session,
    hasStoredSession: typeof window !== 'undefined' ? !!localStorage.getItem(SESSION_STORAGE_KEY) : false
  }

  // Log occasionnel pour debug (seulement 1 fois sur 10 pour éviter spam)
  if (Math.random() < 0.1) {
    console.log('🔍 [useSession] État retourné:', {
      hasSession: !!state.session,
      hasToken: !!returnValue.sessionToken,
      isValid: returnValue.isSessionValid,
      isLoading: returnValue.isLoading,
      isInitializing: returnValue.isInitializing
    })
  }

  return returnValue
} 