import { useState, useEffect, useMemo } from 'react'
import { useUserResponses } from './useUserResponses'
import { useParties } from './useParties'
import { usePartyPositions } from './usePartyPositions'
import { usePartyPriorities } from './usePartyPriorities'

// Types pour le debugging
interface QuestionComparison {
  questionId: string
  userResponse: any
  partyPosition: string
  userScore: number
  partyScore: number
  distance: number
  questionScore: number
  weight: number
}

interface PartyDebugInfo {
  partyId: string
  partyName: string
  politicalComparisons: QuestionComparison[]
  politicalScore: number
  priorityScore: number
  finalScore: number
  finalPercentage: number
  validComparisons: number
  missingPositions: string[]
  priorities: Record<string, number> | null
}

interface CalculDebugData {
  municipality: string
  totalUserResponses: number
  partiesCount: number
  positionsCount: number
  prioritiesCount: number
  partyDebugInfo: PartyDebugInfo[]
  globalStats: {
    avgPoliticalScore: number
    avgPriorityScore: number
    avgFinalScore: number
  }
  validationErrors: string[]
  calculationSteps: string[]
}

export function useCalculDebug(municipalityId?: string) {
  const [debugData, setDebugData] = useState<CalculDebugData | null>(null)
  const [calculationSteps, setCalculationSteps] = useState<string[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  // Hooks pour les données
  const { responses, getResponseCounts } = useUserResponses(municipalityId)
  const { parties } = useParties(municipalityId || '', false)
  const { positionsByParty } = usePartyPositions(municipalityId || '')
  const { prioritiesByParty } = usePartyPriorities(municipalityId)

  const addStep = (step: string) => {
    setCalculationSteps(prev => [...prev, step])
  }

  const clearSteps = () => {
    setCalculationSteps([])
  }

  // Fonction pour convertir les positions en scores numériques
  const getPositionScore = (position: string): number => {
    const positionValues: Record<string, number> = {
      'FD': -2, // Fortement en désaccord
      'PD': -1, // Plutôt en désaccord
      'N': 0,   // Neutre
      'PA': 1,  // Plutôt en accord
      'FA': 2   // Fortement en accord
    }
    return positionValues[position] ?? 0
  }

  // Fonction pour calculer le score d'une question
  const calculateQuestionScore = (userScore: number, partyScore: number, weight: number = 1): number => {
    const distance = Math.abs(partyScore - userScore)
    const maxDistance = 4 // Distance maximale possible (-2 à +2)
    const normalizedScore = Math.max(0, (maxDistance - distance) / maxDistance)
    return normalizedScore * weight
  }

  // Calcul des priorités
  const calculatePriorityScore = (userPriorities: any, partyPriorities: Record<string, number> | null): number => {
    if (!partyPriorities || Object.keys(partyPriorities).length === 0) {
      addStep('⚠️ Aucune priorité disponible pour ce parti')
      return 0
    }

    addStep(`✅ Priorités du parti trouvées: ${Object.keys(partyPriorities).join(', ')}`)

    // Calcul basique de correspondance des priorités
    // Si le parti a des priorités définies, on donne un score de base de 70%
    // TODO: Implémenter le calcul de correspondance avec les priorités utilisateur
    const baseScore = 0.7
    addStep(`🎯 Score priorités calculé: ${(baseScore * 100).toFixed(1)}%`)
    return baseScore
  }

  const debugCalculateAffinity = () => {
    if (!municipalityId || !responses || !parties || !positionsByParty) {
      setDebugData(null)
      return
    }

    setIsCalculating(true)
    clearSteps()
    addStep(`🚀 Début du calcul d'affinité pour ${municipalityId}`)

    const validationErrors: string[] = []
    const partyDebugInfo: PartyDebugInfo[] = []

    addStep(`📊 Données disponibles:`)
    addStep(`  - Réponses utilisateur: ${Object.keys(responses).length}`)
    addStep(`  - Partis: ${parties.length}`)
    addStep(`  - Positions par parti: ${Object.keys(positionsByParty).length}`)
    addStep(`  - Priorités par parti: ${prioritiesByParty ? Object.keys(prioritiesByParty).length : 0}`)

    // Validation des données
    if (Object.keys(responses).length === 0) {
      validationErrors.push('Aucune réponse utilisateur')
    }

    if (parties.length === 0) {
      validationErrors.push('Aucun parti chargé')
    }

    if (Object.keys(positionsByParty).length === 0) {
      validationErrors.push('Aucune position de parti chargée')
    }

    // Calcul pour chaque parti
    let totalPoliticalScore = 0
    let totalPriorityScore = 0
    let totalFinalScore = 0

    parties.forEach(party => {
      addStep(`\n🏛️ === CALCUL POUR ${party.name.toUpperCase()} (${party.id}) ===`)

      const partyPositions = positionsByParty[party.id]
      const partyPriorities = prioritiesByParty?.[party.id] || null

      if (!partyPositions) {
        addStep(`❌ Aucune position trouvée pour ${party.id}`)
        validationErrors.push(`Positions manquantes pour ${party.id}`)
        return
      }

      const politicalComparisons: QuestionComparison[] = []
      const missingPositions: string[] = []
      let politicalScore = 0
      let validComparisons = 0

      // Calcul des positions politiques (questions 1-20)
      addStep(`📋 Calcul des positions politiques:`)

      Object.entries(responses).forEach(([questionId, userResponse]) => {
        // Ignorer la question des priorités
        if (questionId.includes('enjeux_prioritaires') || questionId.includes('q21')) {
          return
        }

        const partyPosition = partyPositions?.find(pos => pos.questionId === questionId)

        if (!partyPosition) {
          missingPositions.push(questionId)
          addStep(`⚠️ Position manquante pour ${questionId}`)
          return
        }

        const partyScore = getPositionScore(partyPosition.position)
        const userScore = typeof userResponse === 'number' ? userResponse : 0

        const questionScore = calculateQuestionScore(userScore, partyScore)

        const comparison: QuestionComparison = {
          questionId,
          userResponse,
          partyPosition: partyPosition.position,
          userScore,
          partyScore,
          distance: Math.abs(partyScore - userScore),
          questionScore,
          weight: 1
        }

        politicalComparisons.push(comparison)
        politicalScore += questionScore
        validComparisons++

        addStep(`  ${questionId}: User(${userScore}) vs Parti(${partyPosition}=${partyScore}) → Score: ${questionScore.toFixed(3)}`)
      })

      const avgPoliticalScore = validComparisons > 0 ? politicalScore / validComparisons : 0
      addStep(`📊 Score politique moyen: ${avgPoliticalScore.toFixed(3)} (${validComparisons} comparaisons valides)`)

      // Calcul des priorités (question 21)
      addStep(`\n⭐ Calcul des priorités:`)
      const priorityScore = calculatePriorityScore(null, partyPriorities) // TODO: passer les vraies priorités user

      // Score final avec pondération 70/30
      const weightedPoliticalScore = avgPoliticalScore * 0.7
      const weightedPriorityScore = priorityScore * 0.3
      const finalScore = weightedPoliticalScore + weightedPriorityScore
      const finalPercentage = finalScore * 100

      addStep(`\n🎯 Calcul final:`)
      addStep(`  Score politique pondéré (70%): ${weightedPoliticalScore.toFixed(3)}`)
      addStep(`  Score priorités pondéré (30%): ${weightedPriorityScore.toFixed(3)}`)
      addStep(`  Score total: ${finalScore.toFixed(3)}`)
      addStep(`  Pourcentage d'affinité: ${finalPercentage.toFixed(1)}%`)

      const partyDebug: PartyDebugInfo = {
        partyId: party.id,
        partyName: party.name,
        politicalComparisons,
        politicalScore: avgPoliticalScore,
        priorityScore,
        finalScore,
        finalPercentage,
        validComparisons,
        missingPositions,
        priorities: partyPriorities
      }

      partyDebugInfo.push(partyDebug)

      // Accumulation pour les statistiques globales
      totalPoliticalScore += avgPoliticalScore
      totalPriorityScore += priorityScore
      totalFinalScore += finalScore
    })

    // Statistiques globales
    const partyCount = parties.length
    const globalStats = {
      avgPoliticalScore: partyCount > 0 ? totalPoliticalScore / partyCount : 0,
      avgPriorityScore: partyCount > 0 ? totalPriorityScore / partyCount : 0,
      avgFinalScore: partyCount > 0 ? totalFinalScore / partyCount : 0
    }

    addStep(`\n📈 Statistiques globales:`)
    addStep(`  Score politique moyen: ${globalStats.avgPoliticalScore.toFixed(3)}`)
    addStep(`  Score priorités moyen: ${globalStats.avgPriorityScore.toFixed(3)}`)
    addStep(`  Score final moyen: ${globalStats.avgFinalScore.toFixed(3)}`)

    // Tri des partis par score final
    partyDebugInfo.sort((a, b) => b.finalScore - a.finalScore)

    addStep(`\n🏆 Classement final:`)
    partyDebugInfo.forEach((party, index) => {
      addStep(`  ${index + 1}. ${party.partyName}: ${party.finalPercentage.toFixed(1)}%`)
    })

    addStep(`\n✅ Calcul terminé avec ${validationErrors.length} erreur(s)`)

    const finalDebugData: CalculDebugData = {
      municipality: municipalityId,
      totalUserResponses: Object.keys(responses).length,
      partiesCount: parties.length,
      positionsCount: Object.keys(positionsByParty).length,
      prioritiesCount: prioritiesByParty ? Object.keys(prioritiesByParty).length : 0,
      partyDebugInfo,
      globalStats,
      validationErrors,
      calculationSteps: [...calculationSteps]
    }

    setDebugData(finalDebugData)
    setIsCalculating(false)
  }

  // Recalculer automatiquement quand les données changent
  useEffect(() => {
    if (municipalityId && responses && parties && positionsByParty) {
      debugCalculateAffinity()
    }
  }, [municipalityId, responses, parties, positionsByParty, prioritiesByParty])

  return {
    debugData,
    calculationSteps,
    isCalculating,
    debugCalculateAffinity,
    clearSteps,
    // Données individuelles pour accès facile
    responses,
    parties,
    positionsByParty,
    prioritiesByParty,
    responseCounts: getResponseCounts
  }
}