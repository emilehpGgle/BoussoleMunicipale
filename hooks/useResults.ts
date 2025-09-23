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

export function useResults(municipalityId?: string) {
  const { sessionToken, isSessionValid, isInitializing } = useSession()
  const { responses, getResponseCounts } = useUserResponses(municipalityId)
  
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
  const TOTAL_QUESTIONS = 21

  // Charger les résultats depuis Supabase uniquement
  const loadResults = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Session obligatoire pour charger les résultats
      // Mais être plus tolérant pendant l'initialisation de la session
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          results: null,
          isLoading: false,
          hasResults: false,
          // Ne pas afficher d'erreur si la session est en train de s'initialiser
          error: null
        }))
        return
      }

      // Charger depuis Supabase
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
            lastSaved: new Date(data.results.updated_at),
            error: null
          }))
          return
        }
      }

      // En cas d'erreur API ou résultats vides
      setState(prev => ({
        ...prev,
        results: null,
        isLoading: false,
        hasResults: false,
        error: null // Pas d'erreur si les résultats n'existent pas encore
      }))

    } catch (error) {
      console.error('Erreur lors du chargement des résultats:', error)
      setState(prev => ({
        ...prev,
        results: null,
        isLoading: false,
        hasResults: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Calculer les résultats à partir des réponses
  const calculateResults = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isCalculating: true, error: null }))

      // Vérifier qu'on a suffisamment de réponses pour calculer les résultats
      const counts = getResponseCounts
      if (counts.total === 0) {
        throw new Error('Aucune réponse disponible pour calculer les résultats')
      }

      // Calcul du pourcentage de complétion
      const primaryResponsesCount = counts.agreement
      const maxExpectedResponses = TOTAL_QUESTIONS
      const completionPercentage = Math.min(100, Math.round((primaryResponsesCount / maxExpectedResponses) * 100))

      // Algorithme de calcul basé sur les réponses utilisateur
      const { calculateUserPoliticalPosition, partyAnswers, calculatePoliticalDistance } = await import('../lib/political-map-calculator')
      
      // Convertir les réponses au format attendu par l'algorithme
      const userAnswers = responses.agreement
      
      // Calculer la position politique de l'utilisateur
      const politicalPosition = calculateUserPoliticalPosition(userAnswers)
      
      // Calculer les positions des partis
      const partyPositions: Record<string, { x: number; y: number }> = {}
      Object.entries(partyAnswers).forEach(([partyId, answers]) => {
        partyPositions[partyId] = calculateUserPoliticalPosition(answers)
      })
      
      // NOTE: useResults.ts garde sa logique existante simple
      // Les priorités seront gérées au niveau des composants qui affichent les résultats
      
      // Calculer les scores de compatibilité avec le système unifié 70/30
      const partyScores: Record<string, number> = {}
      const partyDistances: { partyId: string; distance: number; score: number }[] = []
      
      Object.entries(partyPositions).forEach(([partyId, partyPos]) => {
        const distance = calculatePoliticalDistance(politicalPosition, partyPos)
        // Convertir distance en pourcentage de compatibilité (logique politique pure)
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

  // Sauvegarder les résultats (Supabase uniquement)
  const saveResults = useCallback(async (resultsData: CalculatedResults) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Session obligatoire pour sauvegarder
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: 'Session requise pour sauvegarder vos résultats'
        }))
        return
      }

      // Mettre à jour l'état local
      setState(prev => ({
        ...prev,
        results: resultsData,
        hasResults: true
      }))

      // Sauvegarder vers Supabase
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

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Erreur lors de la sauvegarde des résultats'
      }))

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

  // Effacer les résultats (Supabase uniquement)
  const clearResults = useCallback(async () => {
    try {
      if (!sessionToken || !isSessionValid) {
        console.warn('Session requise pour effacer les résultats')
        return
      }

      // Effacer sur Supabase
      const response = await fetch('/api/results', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        setState(prev => ({
          ...prev,
          results: null,
          hasResults: false,
          lastSaved: null
        }))
        console.log('✅ Résultats effacés sur Supabase')
      } else {
        console.warn('⚠️ Impossible d\'effacer les résultats sur Supabase')
      }

    } catch (error) {
      console.error('Erreur lors de l\'effacement des résultats:', error)
    }
  }, [sessionToken, isSessionValid])

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

  // Charger les résultats au montage du composant avec patience pour l'initialisation
  useEffect(() => {
    // Attendre que la session soit complètement initialisée avant de charger
    if (!isInitializing && isSessionValid) {
      loadResults()
    } else if (!isInitializing && !isSessionValid) {
      // Session définitivement non valide - état par défaut sans erreur
      setState(prev => ({
        ...prev,
        results: null,
        isLoading: false,
        hasResults: false,
        error: null
      }))
    }
    // Si isInitializing est true, on attend patiemment
  }, [isSessionValid, isInitializing, loadResults])

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