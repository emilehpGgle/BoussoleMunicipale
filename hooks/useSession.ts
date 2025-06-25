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
 * ✅ Hook simplifié pour gérer les sessions utilisateur
 * Élimine les boucles infinites et la complexité du localStorage
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
        return { sessionToken: data.session.sessionToken }
      } else {
        throw new Error(data.message || 'Échec de création de session')
      }
    } catch (error) {
      console.error('❌ [useSession] Erreur création session:', error)
      return null
    }
  }

  // ✅ Effet d'initialisation simplifié
  useEffect(() => {
    // Empêcher les double-initialisations
    if (initializingRef.current) {
      return
    }

    if (!state.isInitializing) {
      return
    }

    initializingRef.current = true
    console.log('🚀 [useSession] Initialisation session')

    createSession().then((result) => {
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
      initializingRef.current = false
    })

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