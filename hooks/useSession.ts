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

// ✅ SINGLETON GLOBAL pour éviter les multiples initialisations
let globalSessionState: SessionState = {
    sessionToken: null,
    isSessionValid: false,
    isLoading: true,
    isInitializing: true,
    error: null
}

let globalInitialized = false
let globalInitializing = false
const listeners: Set<(state: SessionState) => void> = new Set()
  
// ✅ Fonction pour notifier tous les listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener(globalSessionState))
}

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
    console.log('🔍 [useSession] Validation token:', token.substring(0, 8) + '...')
    
    const response = await fetch('/api/sessions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const success = response.ok
    console.log(success ? '✅ [useSession] Token valide' : '❌ [useSession] Token invalide')
    return success
  } catch (error) {
    console.error('❌ [useSession] Erreur validation session:', error)
    return false
  }
}

// ✅ Initialisation globale unique
const initializeGlobalSession = async () => {
  if (globalInitializing || globalInitialized) {
    console.log('🔄 [useSession] Initialisation déjà en cours ou terminée')
      return
    }

  globalInitializing = true
  console.log('🚀 [useSession] Initialisation session GLOBALE')

  try {
    // ✅ D'abord vérifier si on a déjà une session dans localStorage
    const existingToken = localStorage.getItem('boussole_session_token')
    
    if (existingToken) {
      console.log('🔍 [useSession] Session existante trouvée, validation...')
      const isValid = await validateSession(existingToken)
      
      if (isValid) {
        console.log('✅ [useSession] Session existante valide')
        globalSessionState = {
          sessionToken: existingToken,
          isSessionValid: true,
          isLoading: false,
          isInitializing: false,
          error: null
        }
        globalInitialized = true
        globalInitializing = false
        notifyListeners()
        return
      } else {
        console.log('❌ [useSession] Session existante invalide, suppression...')
        localStorage.removeItem('boussole_session_token')
      }
    }

    // ✅ Créer une nouvelle session si nécessaire
    const result = await createSession()
    if (result) {
      globalSessionState = {
        sessionToken: result.sessionToken,
        isSessionValid: true,
        isLoading: false,
        isInitializing: false,
        error: null
      }
      console.log('✅ [useSession] Session GLOBALE initialisée avec succès')
    } else {
      globalSessionState = {
        sessionToken: null,
        isSessionValid: false,
          isLoading: false,
          isInitializing: false,
          error: 'Impossible de créer une session'
      }
      console.error('❌ [useSession] Échec initialisation session GLOBALE')
      }
  } catch (error) {
    console.error('❌ [useSession] Erreur lors de l\'initialisation GLOBALE:', error)
    globalSessionState = {
      sessionToken: null,
      isSessionValid: false,
      isLoading: false,
      isInitializing: false,
      error: 'Erreur lors de l\'initialisation de la session'
    }
  }
  
  globalInitialized = true
  globalInitializing = false
  notifyListeners()
}

/**
 * ✅ Hook optimisé pour gérer les sessions utilisateur
 * Utilise un singleton global pour éviter les créations multiples
 */
export function useSession() {
  const [state, setState] = useState<SessionState>(globalSessionState)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    
    // ✅ S'abonner aux changements globaux
    const listener = (newState: SessionState) => {
      if (mounted.current) {
        setState(newState)
      }
    }
    
    listeners.add(listener)

    // ✅ Initialiser si pas encore fait
    if (!globalInitialized && !globalInitializing) {
      initializeGlobalSession()
    } else {
      // Mettre à jour avec l'état actuel
      setState(globalSessionState)
    }

    // ✅ Cleanup
    return () => {
      mounted.current = false
      listeners.delete(listener)
      console.log('🧹 [useSession] Cleanup listener')
    }
  }, [])

  return {
    sessionToken: state.sessionToken,
    isSessionValid: state.isSessionValid,
    isLoading: state.isLoading,
    isInitializing: state.isInitializing,
    error: state.error
  }
} 