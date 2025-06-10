import { useState, useEffect, useCallback } from 'react'
import { useSession } from './useSession'
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

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

  // Charger les réponses depuis Supabase uniquement
  const loadResponses = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Session obligatoire pour charger les données
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          responses: {
            agreement: {},
            importanceDirect: {}
          },
          isLoading: false,
          error: 'Session requise pour charger vos réponses'
        }))
        return
      }

      // Charger depuis Supabase
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
          // Convertir les réponses au format attendu
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
            lastSaved: new Date(),
            error: null
          }))
          return
        }
      }

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erreur lors du chargement des réponses'
      }))

    } catch (error) {
      console.error('Erreur lors du chargement des réponses:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Sauvegarder une réponse (Supabase uniquement)
  const saveResponse = useCallback(async (
    questionId: string,
    responseType: 'agreement' | 'importance_direct',
    value: AgreementOptionKey | ImportanceDirectOptionKey
  ) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Session obligatoire pour sauvegarder
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: 'Session requise pour sauvegarder vos réponses'
        }))
        return
      }

      // Mettre à jour l'état local immédiatement pour l'UX
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

      // Sauvegarder vers Supabase
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

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Erreur lors de la sauvegarde'
      }))

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

  // Effacer toutes les réponses (Supabase uniquement)
  const clearAllResponses = useCallback(async () => {
    try {
      if (!sessionToken || !isSessionValid) {
        console.warn('Session requise pour effacer les réponses')
        return
      }

      const response = await fetch('/api/responses', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        setState(prev => ({
          ...prev,
          responses: {
            agreement: {},
            importanceDirect: {}
          },
          lastSaved: null
        }))
        console.log('✅ Réponses effacées sur Supabase')
      } else {
        console.warn('⚠️ Impossible d\'effacer les réponses sur Supabase')
      }
    } catch (error) {
      console.error('Erreur lors de l\'effacement:', error)
    }
  }, [sessionToken, isSessionValid])

  // Obtenir le nombre de réponses par type
  const getResponseCounts = useCallback(() => {
    const uniqueQuestions = new Set([
      ...Object.keys(state.responses.agreement),
      ...Object.keys(state.responses.importanceDirect)
    ])

    return {
      agreement: Object.keys(state.responses.agreement).length,
      importanceDirect: Object.keys(state.responses.importanceDirect).length,
      total: uniqueQuestions.size,
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