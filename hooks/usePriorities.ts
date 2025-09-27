import { useState, useCallback, useEffect, useMemo } from 'react'
import { useSession } from './useSession'
import { getPriorityQuestionId } from '@/lib/utils/question-id'

interface PrioritiesState {
  priorities: Record<string, number> // { "item": rank }
  isLoading: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
}

/**
 * ✅ Hook simplifié pour gérer les réponses de priorité
 * Remplace l'usage du localStorage par Supabase
 */
export function usePriorities(municipalityId?: string) {
  const { sessionToken, isSessionValid, isLoading: sessionLoading, error: sessionError } = useSession()
  
  const [state, setState] = useState<PrioritiesState>({
    priorities: {},
    isLoading: true,
    isSaving: false,
    error: null,
    lastSaved: null
  })

  // ✅ Charger les priorités depuis Supabase (simplifié)
  const loadPriorities = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // ✅ Attendre que la session soit prête
      if (sessionLoading) {
        setState(prev => ({ ...prev, isLoading: false }))
        return
      }

      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          priorities: {},
          isLoading: false,
          error: null // ✅ Pas d'erreur si pas de session
        }))
        return
      }

      const url = municipalityId
        ? `/api/responses?municipalityId=${encodeURIComponent(municipalityId)}`
        : '/api/responses'

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.responses) {
          // ✅ Filtrer les réponses de priorité pour la question q21_enjeux_prioritaires
          const priorityQuestionId = municipalityId ? getPriorityQuestionId(municipalityId) : 'q21_enjeux_prioritaires'
          const priorityResponses = data.responses.filter(
            (r: any) => r.response_type === 'priority_ranking' && r.question_id === priorityQuestionId
          )
          
          // ✅ Extraire les priorités (question q21_enjeux_prioritaires)
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
        throw new Error(`Erreur API: ${response.status}`)
      }
    } catch (error) {
      console.error('❌ [usePriorities] Erreur chargement:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid, sessionLoading, municipalityId])

  // ✅ Sauvegarder les priorités vers Supabase (logique simplifiée)
  const savePriorities = useCallback(async (priorityData: Record<string, number>) => {
    console.log('🔄 [usePriorities] Sauvegarde priorités:', priorityData)
    
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // ✅ Vérification simple : session requise
      if (!sessionToken || !isSessionValid) {
        throw new Error('Session requise pour sauvegarder les priorités')
      }

      // ✅ Mettre à jour l'état local immédiatement pour UX fluide
      setState(prev => ({
        ...prev,
        priorities: priorityData
      }))

      const priorityQuestionId = municipalityId ? getPriorityQuestionId(municipalityId) : 'q21_enjeux_prioritaires'

      const requestBody = {
        questionId: priorityQuestionId,
        responseType: 'priority_ranking',
        priorityData,
        municipalityId
      }

      console.log('📤 [usePriorities] Envoi requête API:', requestBody)

      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setState(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date(),
            error: null
          }))
          console.log('✅ [usePriorities] Sauvegarde réussie!')
          
          // ✅ Supprimé le rechargement automatique pour éviter le clignotement
          // L'état local est déjà mis à jour et reflète les bonnes données
          return
        } else {
          throw new Error(data.error || 'Erreur de sauvegarde')
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Erreur réseau' }))
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`)
      }

    } catch (error) {
      console.error('❌ [usePriorities] Erreur sauvegarde:', error)
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
      // ✅ Propager l'erreur pour que le composant puisse réagir
      throw error
    }
  }, [sessionToken, isSessionValid, municipalityId])

  // ✅ Charger automatiquement quand la session change
  useEffect(() => {
    loadPriorities()
  }, [loadPriorities])

  // ✅ Si erreur de session, la propager
  useEffect(() => {
    if (sessionError && !sessionLoading) {
      setState(prev => ({
        ...prev,
        error: `Erreur de session: ${sessionError}`,
        isLoading: false
      }))
    }
  }, [sessionError, sessionLoading])

  return {
    // ✅ État
    priorities: state.priorities,
    isLoading: state.isLoading || sessionLoading,
    isSaving: state.isSaving,
    error: state.error,
    lastSaved: state.lastSaved,
    
    // ✅ Actions
    savePriorities,
    loadPriorities,
    
    // ✅ Utilitaires (mémoisés)
    hasSelection: useMemo(() => Object.keys(state.priorities).length > 0, [state.priorities]),
    selectionCount: useMemo(() => Object.keys(state.priorities).length, [state.priorities]),
    isComplete: useMemo(() => Object.keys(state.priorities).length === 3, [state.priorities])
  }
} 