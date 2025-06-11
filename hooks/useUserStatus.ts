import { useMemo } from 'react'
import { useUserResponses } from './useUserResponses'
import { useResults } from './useResults'
import { useSession } from './useSession'

export interface UserStatus {
  // États de base
  isFirstTime: boolean          // Première visite (aucune donnée)
  hasPartialResponses: boolean  // A commencé mais pas fini
  hasCompleteResponses: boolean // A fini le questionnaire
  hasResults: boolean          // A des résultats calculés
  
  // Statistiques
  responseCount: number        // Nombre de réponses
  completionPercentage: number // Pourcentage de complétion
  
  // États de chargement
  isLoading: boolean
  
  // Actions recommandées
  recommendedAction: 'start' | 'continue' | 'view_results' | 'restart_or_view'
  
  // Messages pour l'utilisateur
  statusMessage: string
  actionMessage: string
}

export function useUserStatus(): UserStatus {
  const { sessionToken, isSessionValid } = useSession()
  const { 
    responses, 
    isLoading: responsesLoading, 
    getResponseCounts 
  } = useUserResponses()
  
  const { 
    results, 
    hasResults, 
    isLoading: resultsLoading 
  } = useResults()

  const status = useMemo(() => {
    // Si pas de session valide, c'est une première visite
    if (!sessionToken || !isSessionValid) {
      return {
        isFirstTime: true,
        hasPartialResponses: false,
        hasCompleteResponses: false,
        hasResults: false,
        responseCount: 0,
        completionPercentage: 0,
        isLoading: false,
        recommendedAction: 'start' as const,
        statusMessage: 'Bienvenue ! Découvrez vos affinités politiques municipales.',
        actionMessage: 'Commencer le questionnaire'
      }
    }

    // Pendant le chargement
    if (responsesLoading || resultsLoading) {
      return {
        isFirstTime: false,
        hasPartialResponses: false,
        hasCompleteResponses: false,
        hasResults: false,
        responseCount: 0,
        completionPercentage: 0,
        isLoading: true,
        recommendedAction: 'start' as const,
        statusMessage: 'Chargement de vos données...',
        actionMessage: 'Veuillez patienter'
      }
    }

    const counts = getResponseCounts()
    const responseCount = counts.total
    const totalQuestions = 20
    const completionPercentage = Math.round((responseCount / totalQuestions) * 100)

    // Aucune réponse - première visite
    if (responseCount === 0) {
      return {
        isFirstTime: true,
        hasPartialResponses: false,
        hasCompleteResponses: false,
        hasResults: false,
        responseCount: 0,
        completionPercentage: 0,
        isLoading: false,
        recommendedAction: 'start' as const,
        statusMessage: 'Découvrez vos affinités politiques municipales.',
        actionMessage: 'Commencer le questionnaire'
      }
    }

    // Questionnaire incomplet (moins de 80% ou pas de résultats)
    if (completionPercentage < 80 || !hasResults) {
      return {
        isFirstTime: false,
        hasPartialResponses: true,
        hasCompleteResponses: false,
        hasResults: false,
        responseCount,
        completionPercentage,
        isLoading: false,
        recommendedAction: 'continue' as const,
        statusMessage: `Questionnaire en cours : ${responseCount}/20 questions répondues (${completionPercentage}%)`,
        actionMessage: 'Continuer le questionnaire'
      }
    }

    // Questionnaire complet ET résultats disponibles
    if (completionPercentage >= 80 && hasResults) {
      return {
        isFirstTime: false,
        hasPartialResponses: false,
        hasCompleteResponses: true,
        hasResults: true,
        responseCount,
        completionPercentage,
        isLoading: false,
        recommendedAction: 'restart_or_view' as const,
        statusMessage: `Questionnaire terminé ! Vos résultats sont disponibles.`,
        actionMessage: 'Que souhaitez-vous faire ?'
      }
    }

    // Cas par défaut (ne devrait pas arriver)
    return {
      isFirstTime: false,
      hasPartialResponses: false,
      hasCompleteResponses: false,
      hasResults: false,
      responseCount,
      completionPercentage,
      isLoading: false,
      recommendedAction: 'start' as const,
      statusMessage: 'État indéterminé',
      actionMessage: 'Commencer'
    }
  }, [sessionToken, isSessionValid, responsesLoading, resultsLoading, responses, hasResults, getResponseCounts])

  return status
} 