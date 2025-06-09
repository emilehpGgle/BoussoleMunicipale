import { useState, useEffect, useCallback } from 'react'
import { useSession } from './useSession'
import { AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

// Interface pour les réponses Supabase
interface SupabaseResponseRow {
  response_type: 'agreement' | 'importance_direct'
  question_id: string
  agreement_value?: AgreementOptionKey
  importance_direct_value?: ImportanceDirectOptionKey
}

// Types pour les réponses (simplifiés)
interface UserResponses {
  agreement: Record<string, AgreementOptionKey>
  importanceDirect: Record<string, ImportanceDirectOptionKey>
}

interface ResponsesState {
  responses: UserResponses
  isLoading: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
}

// Clés localStorage pour fallback (importance supprimé)
const STORAGE_KEYS = {
  agreement: 'userAnswers',
  importanceDirect: 'userImportanceDirectAnswers'
}

export function useUserResponses() {
  const { sessionToken, isSessionValid } = useSession()
  
  const [state, setState] = useState<ResponsesState>({
    responses: {
      agreement: {},
      importanceDirect: {}
    },
    isLoading: true,
    isSaving: false,
    error: null,
    lastSaved: null
  })

  // Fonction helper pour charger depuis localStorage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const localResponses: UserResponses = {
        agreement: JSON.parse(localStorage.getItem(STORAGE_KEYS.agreement) || '{}'),
        importanceDirect: JSON.parse(localStorage.getItem(STORAGE_KEYS.importanceDirect) || '{}')
      }

      setState(prev => ({
        ...prev,
        responses: localResponses,
        isLoading: false
      }))
    } catch (error) {
      console.error('Erreur localStorage:', error)
      setState(prev => ({
        ...prev,
        responses: {
          agreement: {},
          importanceDirect: {}
        },
        isLoading: false
      }))
    }
  }, [])

  // Charger les réponses depuis Supabase ou localStorage
  const loadResponses = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Si pas de session ou session invalide, charger depuis localStorage directement
      if (!sessionToken || !isSessionValid) {
        loadFromLocalStorage()
        return
      }

      // Charger depuis Supabase avec header Authorization sécurisé
      const response = await fetch('/api/responses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.success && Array.isArray(data.responses)) {
          // Convertir les réponses au format attendu avec typage strict
          const formattedResponses: UserResponses = {
            agreement: {},
            importanceDirect: {}
          }

          data.responses.forEach((resp: SupabaseResponseRow) => {
            if (resp.response_type === 'agreement' && resp.agreement_value) {
              formattedResponses.agreement[resp.question_id] = resp.agreement_value
            } else if (resp.response_type === 'importance_direct' && resp.importance_direct_value) {
              formattedResponses.importanceDirect[resp.question_id] = resp.importance_direct_value
            }
          })

          setState(prev => ({
            ...prev,
            responses: formattedResponses,
            isLoading: false,
            lastSaved: new Date()
          }))
          return
        }
      }

      // Fallback : charger depuis localStorage
      loadFromLocalStorage()

    } catch (error) {
      console.error('Erreur lors du chargement des réponses:', error)
      
      // En cas d'erreur, fallback vers localStorage
      loadFromLocalStorage()
      
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid, loadFromLocalStorage])

  // Sauvegarder une réponse
  const saveResponse = useCallback(async (
    questionId: string,
    responseType: 'agreement' | 'importance_direct',
    value: AgreementOptionKey | ImportanceDirectOptionKey
  ) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Mettre à jour l'état local immédiatement
      setState(prev => ({
        ...prev,
        responses: {
          ...prev.responses,
          [responseType === 'importance_direct' ? 'importanceDirect' : responseType]: {
            ...prev.responses[responseType === 'importance_direct' ? 'importanceDirect' : responseType],
            [questionId]: value
          }
        }
      }))

      // Sauvegarder dans localStorage comme fallback
      const storageKey = responseType === 'importance_direct' ? 'importanceDirect' : responseType
      const currentData = JSON.parse(localStorage.getItem(STORAGE_KEYS[storageKey as keyof typeof STORAGE_KEYS]) || '{}')
      currentData[questionId] = value
      localStorage.setItem(STORAGE_KEYS[storageKey as keyof typeof STORAGE_KEYS], JSON.stringify(currentData))

      // Sauvegarder vers Supabase si possible
      if (sessionToken && isSessionValid) {
        const requestBody: {
          questionId: string
          responseType: string
          agreementValue?: AgreementOptionKey
          importanceDirectValue?: ImportanceDirectOptionKey
        } = {
          questionId,
          responseType
        }

        if (responseType === 'agreement') {
          requestBody.agreementValue = value as AgreementOptionKey
        } else if (responseType === 'importance_direct') {
          requestBody.importanceDirectValue = value as ImportanceDirectOptionKey
        }

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
              lastSaved: new Date()
            }))
            return
          }
        }
      }

      // Si la sauvegarde Supabase échoue, on garde juste le localStorage
      setState(prev => ({ ...prev, isSaving: false }))

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de sauvegarde',
        isSaving: false
      }))
    }
  }, [sessionToken, isSessionValid])

  // Méthodes de convenance pour chaque type de réponse
  const saveAgreementResponse = useCallback((questionId: string, value: AgreementOptionKey) => {
    return saveResponse(questionId, 'agreement', value)
  }, [saveResponse])

  const saveImportanceDirectResponse = useCallback((questionId: string, value: ImportanceDirectOptionKey) => {
    return saveResponse(questionId, 'importance_direct', value)
  }, [saveResponse])

  // Effacer toutes les réponses
  const clearAllResponses = useCallback(async () => {
    try {
      // Effacer localStorage
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })

      // Effacer l'état local
      setState(prev => ({
        ...prev,
        responses: {
          agreement: {},
          importanceDirect: {}
        },
        lastSaved: null
      }))

      // TODO: Effacer sur Supabase si nécessaire
      // (non implémenté car pas de endpoint DELETE spécifique)

    } catch (error) {
      console.error('Erreur lors de l\'effacement:', error)
    }
  }, [])

  // Obtenir le nombre de réponses par type
  const getResponseCounts = useCallback(() => {
    // Compteur de questions uniques (corrigé)
    const uniqueQuestions = new Set([
      ...Object.keys(state.responses.agreement),
      ...Object.keys(state.responses.importanceDirect)
    ])

    return {
      agreement: Object.keys(state.responses.agreement).length,
      importanceDirect: Object.keys(state.responses.importanceDirect).length,
      // CORRIGÉ: Compter les questions uniques, pas la somme des types de réponses
      total: uniqueQuestions.size,
      // Nouveau: Compter le nombre total de réponses individuelles
      totalResponses: Object.keys(state.responses.agreement).length + 
                     Object.keys(state.responses.importanceDirect).length
    }
  }, [state.responses])

  // Vérifier si une question a été répondue
  const hasResponse = useCallback((questionId: string, responseType?: 'agreement' | 'importance_direct') => {
    if (responseType) {
      const key = responseType === 'importance_direct' ? 'importanceDirect' : responseType
      return questionId in state.responses[key]
    }
    
    // Vérifier tous les types
    return questionId in state.responses.agreement ||
           questionId in state.responses.importanceDirect
  }, [state.responses])

  // Charger les réponses au montage du composant
  useEffect(() => {
    loadResponses()
  }, [loadResponses])

  return {
    // État
    responses: state.responses,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    error: state.error,
    lastSaved: state.lastSaved,

    // Actions
    saveAgreementResponse,
    saveImportanceDirectResponse,
    clearAllResponses,
    loadResponses,

    // Utilitaires
    getResponseCounts,
    hasResponse,
    
    // Getters pour compatibilité avec le code existant
    userAnswers: state.responses.agreement,
    userImportanceDirectAnswers: state.responses.importanceDirect
  }
} 