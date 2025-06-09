import { useState, useEffect, useCallback } from 'react'
import { useSession } from './useSession'
import { useUserResponses } from './useUserResponses'

// Types pour les résultats
export interface PartyScore {
  partyId: string
  score: number
  percentage: number
  rank: number
}

export interface CalculatedResults {
  partyScores: Record<string, number>
  sortedParties: PartyScore[]
  topMatches: PartyScore[]
  politicalPosition?: { x: number; y: number }
  completionPercentage: number
  totalQuestions: number
  answeredQuestions: number
  calculatedAt: string
}

interface ResultsState {
  results: CalculatedResults | null
  isLoading: boolean
  isCalculating: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
  hasResults: boolean
}

const RESULTS_STORAGE_KEY = 'calculatedResults'

export function useResults() {
  const { sessionToken, isSessionValid } = useSession()
  const { responses, getResponseCounts } = useUserResponses()
  
  const [state, setState] = useState<ResultsState>({
    results: null,
    isLoading: true,
    isCalculating: false,
    isSaving: false,
    error: null,
    lastSaved: null,
    hasResults: false
  })

  // Constantes pour le calcul de complétion
  const TOTAL_QUESTIONS = 20
  const RESPONSE_TYPES_COUNT = 2 // agreement + importance (importanceDirect est optionnel)

  // Charger les résultats depuis Supabase ou localStorage
  const loadResults = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Si pas de session ou session invalide, charger depuis localStorage directement
      if (!sessionToken || !isSessionValid) {
        const localResults = JSON.parse(localStorage.getItem(RESULTS_STORAGE_KEY) || 'null')

        setState(prev => ({
          ...prev,
          results: localResults,
          isLoading: false,
          hasResults: !!localResults
        }))
        return
      }

      // Charger depuis Supabase avec header Authorization sécurisé
      const response = await fetch('/api/results', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.success && data.results) {
          const resultsData = data.results.results_data?.calculatedResults || null
          
          setState(prev => ({
            ...prev,
            results: resultsData,
            isLoading: false,
            hasResults: !!resultsData,
            lastSaved: new Date(data.results.updated_at)
          }))
          return
        }
      }

      // Fallback : charger depuis localStorage
      const localResults = JSON.parse(localStorage.getItem(RESULTS_STORAGE_KEY) || 'null')

      setState(prev => ({
        ...prev,
        results: localResults,
        isLoading: false,
        hasResults: !!localResults
      }))

    } catch (error) {
      console.error('Erreur lors du chargement des résultats:', error)
      
      // En cas d'erreur, fallback vers localStorage
      const localResults = JSON.parse(localStorage.getItem(RESULTS_STORAGE_KEY) || 'null')
      
      setState(prev => ({
        ...prev,
        results: localResults,
        isLoading: false,
        hasResults: !!localResults,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Calculer les résultats à partir des réponses
  const calculateResults = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isCalculating: true, error: null }))

      // Vérifier qu'on a des réponses
      const counts = getResponseCounts()
      if (counts.total === 0) {
        throw new Error('Aucune réponse disponible pour calculer les résultats')
      }

      // Calcul correct du pourcentage de complétion
      // Utilise uniquement les réponses agreement et importance pour éviter > 100%
      const primaryResponsesCount = counts.agreement + counts.importance
      const maxExpectedResponses = TOTAL_QUESTIONS * RESPONSE_TYPES_COUNT
      const completionPercentage = Math.min(100, Math.round((primaryResponsesCount / maxExpectedResponses) * 100))

      // TODO: Implémenter l'algorithme de calcul des résultats
      // Pour l'instant, créons un exemple de résultats
      const mockResults: CalculatedResults = {
        partyScores: {
          'quebec_forte_et_fiere': 85,
          'transition_quebec': 78,
          'alliance_citoyenne': 65,
          'quebec_dabord': 58,
          'equipe_priorite_quebec': 45,
          'leadership_quebec': 32,
          'respect_citoyens': 28
        },
        sortedParties: [
          { partyId: 'quebec_forte_et_fiere', score: 85, percentage: 85, rank: 1 },
          { partyId: 'transition_quebec', score: 78, percentage: 78, rank: 2 },
          { partyId: 'alliance_citoyenne', score: 65, percentage: 65, rank: 3 },
          { partyId: 'quebec_dabord', score: 58, percentage: 58, rank: 4 },
          { partyId: 'equipe_priorite_quebec', score: 45, percentage: 45, rank: 5 },
          { partyId: 'leadership_quebec', score: 32, percentage: 32, rank: 6 },
          { partyId: 'respect_citoyens', score: 28, percentage: 28, rank: 7 }
        ],
        topMatches: [
          { partyId: 'quebec_forte_et_fiere', score: 85, percentage: 85, rank: 1 },
          { partyId: 'transition_quebec', score: 78, percentage: 78, rank: 2 },
          { partyId: 'alliance_citoyenne', score: 65, percentage: 65, rank: 3 }
        ],
        politicalPosition: { x: -0.2, y: 0.4 }, // Centre-gauche légèrement
        completionPercentage,
        totalQuestions: TOTAL_QUESTIONS,
        answeredQuestions: counts.agreement,
        calculatedAt: new Date().toISOString()
      }

      // Mettre à jour l'état local
      setState(prev => ({
        ...prev,
        results: mockResults,
        isCalculating: false,
        hasResults: true
      }))

      // Sauvegarder dans localStorage
      localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(mockResults))

      return mockResults

    } catch (error) {
      console.error('Erreur lors du calcul des résultats:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de calcul',
        isCalculating: false
      }))
      return null
    }
  }, [getResponseCounts])

  // Sauvegarder les résultats
  const saveResults = useCallback(async (resultsData: CalculatedResults) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Mettre à jour l'état local
      setState(prev => ({
        ...prev,
        results: resultsData,
        hasResults: true
      }))

      // Sauvegarder dans localStorage
      localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(resultsData))

      // Sauvegarder vers Supabase si possible
      if (sessionToken && isSessionValid) {
        const response = await fetch('/api/results', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resultsData,
            politicalPosition: resultsData.politicalPosition
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
      }

      // Si la sauvegarde Supabase échoue, on garde juste le localStorage
      setState(prev => ({ ...prev, isSaving: false }))

    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de sauvegarde',
        isSaving: false
      }))
    }
  }, [sessionToken, isSessionValid])

  // Calculer et sauvegarder les résultats
  const calculateAndSaveResults = useCallback(async () => {
    const results = await calculateResults()
    if (results) {
      await saveResults(results)
    }
    return results
  }, [calculateResults, saveResults])

  // Effacer les résultats
  const clearResults = useCallback(async () => {
    try {
      // Effacer localStorage
      localStorage.removeItem(RESULTS_STORAGE_KEY)

      // Effacer l'état local
      setState(prev => ({
        ...prev,
        results: null,
        hasResults: false,
        lastSaved: null
      }))

      // TODO: Effacer sur Supabase si nécessaire

    } catch (error) {
      console.error('Erreur lors de l\'effacement des résultats:', error)
    }
  }, [])

  // Obtenir le top N des partis
  const getTopParties = useCallback((n: number = 3) => {
    return state.results?.topMatches.slice(0, n) || []
  }, [state.results])

  // Obtenir le score d'un parti spécifique
  const getPartyScore = useCallback((partyId: string) => {
    return state.results?.partyScores[partyId] || 0
  }, [state.results])

  // Vérifier si les résultats sont récents (calculés dans les dernières 24h)
  const areResultsRecent = useCallback(() => {
    if (!state.results?.calculatedAt) return false
    
    const calculatedAt = new Date(state.results.calculatedAt)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    return calculatedAt > oneDayAgo
  }, [state.results])

  // Charger les résultats au montage du composant
  useEffect(() => {
    loadResults()
  }, [loadResults])

  return {
    // État
    results: state.results,
    isLoading: state.isLoading,
    isCalculating: state.isCalculating,
    isSaving: state.isSaving,
    error: state.error,
    lastSaved: state.lastSaved,
    hasResults: state.hasResults,

    // Actions
    calculateResults,
    saveResults,
    calculateAndSaveResults,
    clearResults,
    loadResults,

    // Utilitaires
    getTopParties,
    getPartyScore,
    areResultsRecent,

    // Alias pour compatibilité avec le code existant
    calculatedResults: state.results
  }
} 