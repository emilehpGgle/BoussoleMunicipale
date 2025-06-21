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
  const { sessionToken, isSessionValid } = useSession()
  
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
          error: 'Session requise pour charger les priorités'
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
          // Filtrer les réponses de priorité
          const priorityResponses = data.responses.filter(
            (r: any) => r.response_type === 'priority_ranking'
          )
          
          // Extraire les priorités (supposons Q21 comme question de priorité)
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
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      if (!sessionToken || !isSessionValid) {
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

      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: 'Q21', // ID de la question de priorité
          responseType: 'priority_ranking',
          priorityData
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setState(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date()
          }))
          return
        }
      }

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Erreur lors de la sauvegarde des priorités'
      }))

    } catch (error) {
      console.error('Erreur lors de la sauvegarde des priorités:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de sauvegarde',
        isSaving: false
      }))
    }
  }, [sessionToken, isSessionValid])

  // Charger les priorités au montage
  useEffect(() => {
    if (isSessionValid) {
      loadPriorities()
    }
  }, [isSessionValid, loadPriorities])

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