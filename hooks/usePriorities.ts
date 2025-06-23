import { useState, useCallback, useEffect } from 'react'
import { useSession } from './useSession'

interface PrioritiesState {
  priorities: Record<string, number> // { "item": rank }
  isLoading: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
}

/**
 * Hook pour gérer les réponses de priorité
 * Remplace l'usage du localStorage par Supabase
 */
export function usePriorities() {
  const sessionData = useSession()
  const { sessionToken, isSessionValid, isInitializing } = sessionData
  
  const [state, setState] = useState<PrioritiesState>({
    priorities: {},
    isLoading: true,
    isSaving: false,
    error: null,
    lastSaved: null
  })

  // Charger les priorités depuis Supabase
  const loadPriorities = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          priorities: {},
          isLoading: false,
          // Ne pas afficher d'erreur si la session est en train de s'initialiser
          error: null
        }))
        return
      }

      const response = await fetch('/api/responses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.responses) {
          // Filtrer les réponses de priorité pour la question q21_enjeux_prioritaires
          const priorityResponses = data.responses.filter(
            (r: any) => r.response_type === 'priority_ranking' && r.question_id === 'q21_enjeux_prioritaires'
          )
          
          // Extraire les priorités (question q21_enjeux_prioritaires)
          const priorities = priorityResponses.length > 0 
            ? priorityResponses[0].priority_data || {} 
            : {}

          setState(prev => ({
            ...prev,
            priorities,
            isLoading: false,
            error: null
          }))
        }
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Erreur lors du chargement des priorités'
        }))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des priorités:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Sauvegarder les priorités vers Supabase
  const savePriorities = useCallback(async (priorityData: Record<string, number>) => {
    console.log('🔄 [usePriorities] Début sauvegarde priorités:', priorityData)
    console.log('🔍 [usePriorities] État de session:', { 
      sessionToken: sessionToken ? `${sessionToken.substring(0, 10)}...` : 'null', 
      isSessionValid, 
      isInitializing,
      hasStoredSession: sessionData.hasStoredSession
    })
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Attendre que la session soit initialisée si elle est en cours
      if (isInitializing) {
        console.log('⏳ [usePriorities] Session en cours d\'initialisation, attente...')
        // Attendre jusqu'à 5 secondes que la session soit prête
        for (let i = 0; i < 50; i++) {
          await new Promise(resolve => setTimeout(resolve, 100))
          if (!sessionData.isInitializing && sessionData.sessionToken) {
            console.log('✅ [usePriorities] Session maintenant prête après attente')
            break
          }
        }
      }

      // Utiliser le token le plus récent possible
      const currentToken = sessionData.sessionToken || sessionToken
      const currentIsValid = sessionData.isSessionValid || isSessionValid

      if (!currentToken || !currentIsValid) {
        console.log('❌ [usePriorities] Session invalide pour sauvegarde - sessionToken:', !!currentToken, 'isSessionValid:', currentIsValid)
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: 'Session requise pour sauvegarder les priorités'
        }))
        return
      }

      // Mettre à jour l'état local immédiatement
      setState(prev => ({
        ...prev,
        priorities: priorityData
      }))
      console.log('✅ [usePriorities] État local mis à jour:', priorityData)

      const requestBody = {
        questionId: 'q21_enjeux_prioritaires', // ID correct de la question de priorité
        responseType: 'priority_ranking',
        priorityData
      }
      console.log('📤 [usePriorities] Envoi requête API:', requestBody)

      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('📥 [usePriorities] Réponse API status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('📥 [usePriorities] Réponse API data:', data)
        if (data.success) {
          setState(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date()
          }))
          console.log('✅ [usePriorities] Sauvegarde réussie!')
          return
        }
      } else {
        const errorData = await response.json()
        console.error('❌ [usePriorities] Erreur API:', errorData)
      }

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Erreur lors de la sauvegarde des priorités'
      }))

    } catch (error) {
      console.error('❌ [usePriorities] Exception lors de la sauvegarde:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de sauvegarde',
        isSaving: false
      }))
    }
  }, [sessionToken, isSessionValid])

  // Charger les priorités au montage avec patience pour l'initialisation
  useEffect(() => {
    // Attendre que la session soit complètement initialisée avant de charger
    if (!isInitializing && isSessionValid) {
      loadPriorities()
    } else if (!isInitializing && !isSessionValid) {
      // Session définitivement non valide - état par défaut sans erreur
      setState(prev => ({
        ...prev,
        priorities: {},
        isLoading: false,
        error: null
      }))
    }
    // Si isInitializing est true, on attend patiemment
  }, [isSessionValid, isInitializing, loadPriorities])

  return {
    // État
    priorities: state.priorities,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    error: state.error,
    lastSaved: state.lastSaved,

    // Actions
    savePriorities,
    loadPriorities,

    // Utilitaires
    hasResponse: Object.keys(state.priorities).length > 0
  }
} 