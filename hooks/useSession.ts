import { useState, useEffect, useRef } from 'react'

// Types pour la session
interface Session {
  id: string
  sessionToken: string
  expiresAt: string
  createdAt: string
}

interface SessionState {
  sessionToken: string | null
  isSessionValid: boolean
  isLoading: boolean
  isInitializing: boolean
  error: string | null
}

/**
 * ✅ Hook optimisé pour gérer les sessions utilisateur
 * Évite les créations multiples et utilise localStorage pour la persistance
 */
export function useSession() {
  const [state, setState] = useState<SessionState>({
    sessionToken: null,
    isSessionValid: false,
    isLoading: true,
    isInitializing: true,
    error: null
  })
  
  // ✅ Référence pour éviter les double-initialisations
  const initializingRef = useRef(false)
  const initialized = useRef(false)

  // ✅ Fonction pour créer une nouvelle session
  const createSession = async (): Promise<{ sessionToken: string } | null> => {
    try {
      console.log('🆕 [useSession] Création nouvelle session...')
      
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success && data.session) {
        console.log('✅ [useSession] Session créée:', data.session.sessionToken)
        // ✅ Sauvegarder dans localStorage
        localStorage.setItem('boussole_session_token', data.session.sessionToken)
        return { sessionToken: data.session.sessionToken }
      } else {
        throw new Error(data.message || 'Échec de création de session')
      }
    } catch (error) {
      console.error('❌ [useSession] Erreur création session:', error)
      return null
    }
  }

  // ✅ Fonction pour valider une session existante
  const validateSession = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      return response.ok
    } catch (error) {
      console.error('❌ [useSession] Erreur validation session:', error)
      return false
    }
  }

  // ✅ Effet d'initialisation optimisé
  useEffect(() => {
    // Empêcher les double-initialisations
    if (initializingRef.current || initialized.current) {
      return
    }

    if (!state.isInitializing) {
      return
    }

    initializingRef.current = true
    console.log('🚀 [useSession] Initialisation session')

    const initializeSession = async () => {
      try {
        // ✅ D'abord vérifier si on a déjà une session dans localStorage
        const existingToken = localStorage.getItem('boussole_session_token')
        
        if (existingToken) {
          console.log('🔍 [useSession] Session existante trouvée, validation...')
          const isValid = await validateSession(existingToken)
          
          if (isValid) {
            console.log('✅ [useSession] Session existante valide')
            setState({
              sessionToken: existingToken,
              isSessionValid: true,
              isLoading: false,
              isInitializing: false,
              error: null
            })
            initialized.current = true
            initializingRef.current = false
            return
          } else {
            console.log('❌ [useSession] Session existante invalide, suppression...')
            localStorage.removeItem('boussole_session_token')
          }
        }

        // ✅ Créer une nouvelle session si nécessaire
        const result = await createSession()
        if (result) {
          setState({
            sessionToken: result.sessionToken,
            isSessionValid: true,
            isLoading: false,
            isInitializing: false,
            error: null
          })
          console.log('✅ [useSession] Session initialisée avec succès')
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isInitializing: false,
            error: 'Impossible de créer une session'
          }))
          console.error('❌ [useSession] Échec initialisation session')
        }
      } catch (error) {
        console.error('❌ [useSession] Erreur lors de l\'initialisation:', error)
        setState(prev => ({
          ...prev,
          isLoading: false,
          isInitializing: false,
          error: 'Erreur lors de l\'initialisation de la session'
        }))
      }
      
      initialized.current = true
      initializingRef.current = false
    }

    initializeSession()

    // ✅ Cleanup function
    return () => {
      console.log('🧹 [useSession] Cleanup')
    }
  }, [state.isInitializing])

  return {
    sessionToken: state.sessionToken,
    isSessionValid: state.isSessionValid,
    isLoading: state.isLoading,
    isInitializing: state.isInitializing,
    error: state.error
  }
} 