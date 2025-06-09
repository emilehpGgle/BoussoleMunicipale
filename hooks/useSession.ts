import { useState, useEffect } from 'react'

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

export function useSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    isLoading: true,
    error: null,
    isInitializing: false
  })

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

  // Obtenir ou créer une session avec prévention des race conditions
  const getOrCreateSession = async (): Promise<Session | null> => {
    // Prévenir les appels concurrents
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

    // Vérifier d'abord si on a déjà une session en mémoire
    if (state.session) {
      return state.session
    }

    setState(prev => ({ ...prev, isInitializing: true }))

    try {
      // Vérifier le localStorage (avec protection SSR)
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem(SESSION_STORAGE_KEY)
        
        if (storedToken) {
          // Valider la session existante
          const validSession = await validateSession(storedToken)
          if (validSession) {
            setState(prev => ({ 
              ...prev, 
              session: validSession, 
              isLoading: false,
              isInitializing: false
            }))
            return validSession
          } else {
            // Session expirée, la supprimer du localStorage
            localStorage.removeItem(SESSION_STORAGE_KEY)
          }
        }
      }

      // Créer une nouvelle session
      const newSession = await createSession()
      setState(prev => ({ ...prev, isInitializing: false }))
      return newSession
    } catch (error) {
      setState(prev => ({ ...prev, isInitializing: false }))
      throw error
    }
  }

  // Initialiser la session au chargement du composant
  useEffect(() => {
    getOrCreateSession()
  }, [])

  // Obtenir le token de session actuel avec protection SSR
  const getSessionToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return state.session?.sessionToken || localStorage.getItem(SESSION_STORAGE_KEY)
  }

  return {
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
} 