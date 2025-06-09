import { useState, useEffect, useCallback } from 'react'
import { useSession } from './useSession'
import { useUserResponses } from './useUserResponses'
import { ImportanceOptionKey } from '@/lib/supabase/types'

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
      // Utilise uniquement les réponses agreement et importanceDirect 
      const primaryResponsesCount = counts.agreement + counts.importanceDirect
      const maxExpectedResponses = TOTAL_QUESTIONS
      const completionPercentage = Math.min(100, Math.round((primaryResponsesCount / maxExpectedResponses) * 100))

      // NOUVEAU: Vrai algorithme de calcul basé sur les réponses utilisateur
      const { calculateUserPoliticalPosition, partyAnswers, calculatePoliticalDistance } = await import('../lib/political-map-calculator')
      
      // Convertir les réponses au format attendu par l'algorithme
      const userAnswers = responses.agreement
      
      // Calculer la position politique de l'utilisateur (sans importance)
      const politicalPosition = calculateUserPoliticalPosition(userAnswers)
      
      // Calculer les positions des partis (sans importance)
      const partyPositions: Record<string, { x: number; y: number }> = {}
      Object.entries(partyAnswers).forEach(([partyId, answers]) => {
        partyPositions[partyId] = calculateUserPoliticalPosition(answers)
      })
      
      // Calculer les distances et scores de compatibilité
      const partyScores: Record<string, number> = {}
      const partyDistances: { partyId: string; distance: number; score: number }[] = []
      
      Object.entries(partyPositions).forEach(([partyId, partyPos]) => {
        const distance = calculatePoliticalDistance(politicalPosition, partyPos)
        // Convertir distance en pourcentage de compatibilité (100% = distance 0, 0% = distance max ~283)
        const maxDistance = 283 // Distance maximale théorique sqrt(200^2 + 200^2)
        const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
        
        partyScores[partyId] = compatibility
        partyDistances.push({ partyId, distance, score: compatibility })
      })
      
      // Trier les partis par score de compatibilité
      partyDistances.sort((a, b) => b.score - a.score)
      
      const sortedParties = partyDistances.map((item, index) => ({
        partyId: item.partyId,
        score: item.score,
        percentage: item.score,
        rank: index + 1
      }))
      
      const topMatches = sortedParties.slice(0, 3)

      const calculatedResults: CalculatedResults = {
        partyScores,
        sortedParties,
        topMatches,
        politicalPosition: { x: politicalPosition.x, y: politicalPosition.y },
        completionPercentage,
        totalQuestions: TOTAL_QUESTIONS,
        answeredQuestions: counts.total,
        calculatedAt: new Date().toISOString()
      }

      // Mettre à jour l'état local
      setState(prev => ({
        ...prev,
        results: calculatedResults,
        isCalculating: false,
        hasResults: true
      }))

      // Sauvegarder dans localStorage
      localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(calculatedResults))

      return calculatedResults

    } catch (error) {
      console.error('Erreur lors du calcul des résultats:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de calcul',
        isCalculating: false
      }))
      return null
    }
  }, [getResponseCounts, responses])

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