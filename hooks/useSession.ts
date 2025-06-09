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
}

const SESSION_STORAGE_KEY = 'boussole_session_token'

export function useSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    isLoading: true,
    error: null
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
        // Sauvegarder le token dans localStorage
        localStorage.setItem(SESSION_STORAGE_KEY, data.session.sessionToken)
        
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

  // Supprimer la session
  const deleteSession = async (): Promise<void> => {
    try {
      const currentToken = localStorage.getItem(SESSION_STORAGE_KEY)
      
      if (currentToken) {
        await fetch(`/api/sessions?sessionToken=${encodeURIComponent(currentToken)}`, {
          method: 'DELETE'
        })
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
    }
  }

  // Obtenir ou créer une session
  const getOrCreateSession = async (): Promise<Session | null> => {
    // Vérifier d'abord si on a déjà une session en mémoire
    if (state.session) {
      return state.session
    }

    // Vérifier le localStorage
    const storedToken = localStorage.getItem(SESSION_STORAGE_KEY)
    
    if (storedToken) {
      // Valider la session existante
      const validSession = await validateSession(storedToken)
      if (validSession) {
        setState(prev => ({ 
          ...prev, 
          session: validSession, 
          isLoading: false 
        }))
        return validSession
      } else {
        // Session expirée, la supprimer du localStorage
        localStorage.removeItem(SESSION_STORAGE_KEY)
      }
    }

    // Créer une nouvelle session
    return await createSession()
  }

  // Initialiser la session au chargement du composant
  useEffect(() => {
    getOrCreateSession()
  }, [])

  // Obtenir le token de session actuel
  const getSessionToken = (): string | null => {
    return state.session?.sessionToken || localStorage.getItem(SESSION_STORAGE_KEY)
  }

  return {
    // État de la session
    session: state.session,
    sessionToken: getSessionToken(),
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    createSession,
    validateSession,
    deleteSession,
    getOrCreateSession,
    
    // Utilitaires
    isSessionValid: !!state.session,
    hasStoredSession: !!localStorage.getItem(SESSION_STORAGE_KEY)
  }
} 