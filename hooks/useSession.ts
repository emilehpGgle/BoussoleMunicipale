import { useState, useEffect, useRef, useCallback } from 'react'

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

export function useSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    isLoading: true,
    error: null
  })

  const mountedRef = useRef(true)
  const initializingRef = useRef(false)

  // ✅ Créer une nouvelle session (fonction simple)
  const createSession = useCallback(async (): Promise<Session | null> => {
    console.log('🆕 [useSession] Tentative de création session...')
    
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      console.log('📡 [useSession] Réponse API:', response.status, response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ [useSession] Erreur réponse:', errorText)
        throw new Error(`Erreur création session: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('📥 [useSession] Données complètes reçues:', JSON.stringify(data, null, 2))
      
      if (data.success && data.session) {
        console.log('✅ [useSession] Session créée avec succès:', {
          id: data.session.id,
          token: data.session.sessionToken ? data.session.sessionToken.substring(0, 15) + '...' : 'MISSING',
          expires: data.session.expiresAt
        })
        return data.session
      } else {
        console.error('❌ [useSession] Réponse invalide:', data)
        throw new Error(data.error || 'Réponse invalide du serveur')
      }
    } catch (error) {
      console.error('❌ [useSession] Erreur création complète:', error)
      throw error
    }
  }, [])

  // ✅ Initialisation simple une seule fois
  useEffect(() => {
    const initializeSession = async () => {
      // Éviter les doubles initialisations
      if (initializingRef.current) {
        console.log('⏸️ [useSession] Initialisation déjà en cours, ignorée')
        return
      }

      initializingRef.current = true
      console.log('🚀 [useSession] Début initialisation session')

      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const newSession = await createSession()
        console.log('🔍 [useSession] Session retournée par createSession:', newSession)
        
        if (mountedRef.current && newSession) {
          console.log('✅ [useSession] Mise à jour état avec nouvelle session')
          setState({
            session: newSession,
            isLoading: false,
            error: null
          })
        } else if (mountedRef.current) {
          console.error('❌ [useSession] Session créée mais invalide ou composant démonté')
          throw new Error('Session créée mais invalide')
        }
        
      } catch (error) {
        console.error('❌ [useSession] Erreur initialisation:', error)
        if (mountedRef.current) {
          setState({
            session: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Erreur inconnue'
          })
        }
      } finally {
        initializingRef.current = false
        console.log('🏁 [useSession] Fin initialisation, initializingRef.current =', initializingRef.current)
      }
    }

    console.log('⚡ [useSession] useEffect déclenché, isInitializing =', initializingRef.current)
    
    // Lancer l'initialisation
    initializeSession()

    // Cleanup
    return () => {
      console.log('🧹 [useSession] Cleanup')
      mountedRef.current = false
    }
  }, [createSession]) // createSession ne change jamais donc pas de boucle

  // ✅ Utilitaires dérivés
  const sessionToken = state.session?.sessionToken || null
  const isSessionValid = Boolean(
    state.session?.sessionToken && 
    state.session?.expiresAt && 
    new Date(state.session.expiresAt) > new Date()
  )

  // ✅ Supprimer session
  const deleteSession = useCallback(async (): Promise<void> => {
    try {
      if (sessionToken) {
        await fetch(`/api/sessions?sessionToken=${encodeURIComponent(sessionToken)}`, {
          method: 'DELETE'
        })
      }
      
      if (mountedRef.current) {
        setState({
          session: null,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      console.error('❌ [useSession] Erreur suppression session:', error)
    }
  }, [sessionToken])

  // ✅ Fonction pour forcer création de session (pour debugging)
  const getOrCreateSession = useCallback(async (): Promise<Session | null> => {
    if (state.session && isSessionValid) {
      return state.session
    }
    
    try {
      const newSession = await createSession()
      if (newSession && mountedRef.current) {
        setState(prev => ({
          ...prev,
          session: newSession,
          error: null
        }))
      }
      return newSession
    } catch (error) {
      console.error('❌ [useSession] Erreur getOrCreateSession:', error)
      return null
    }
  }, [state.session, isSessionValid, createSession])

  // ✅ Log de debug détaillé
  console.log('🔍 [useSession] État complet:', {
    hasSession: !!state.session,
    sessionObject: state.session ? {
      id: state.session.id,
      tokenExists: !!state.session.sessionToken,
      tokenLength: state.session.sessionToken?.length || 0,
      expires: state.session.expiresAt
    } : null,
    sessionToken: sessionToken || 'NULL',
    tokenSubstring: sessionToken ? sessionToken.substring(0, 10) + '...' : 'NULL',
    isValid: isSessionValid,
    isLoading: state.isLoading,
    initializing: initializingRef.current,
    error: state.error,
    mountedRef: mountedRef.current
  })

  return {
    // ✅ État principal
    session: state.session,
    sessionToken,
    isSessionValid,
    isLoading: state.isLoading,
    error: state.error,
    isInitializing: initializingRef.current,
    
    // ✅ Actions
    getOrCreateSession,
    deleteSession,
    getSessionToken: useCallback(() => sessionToken, [sessionToken])
  }
} 