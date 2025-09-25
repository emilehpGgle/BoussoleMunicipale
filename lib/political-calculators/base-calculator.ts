// Fonctions communes partagées pour tous les calculateurs politiques municipaux

import {
  type UserAnswers,
  type PoliticalPosition,
  type AxisConfig,
  agreementScoreValues
} from './types'

/**
 * Calcule la position politique sur un axe donné
 * Fonction commune utilisée par tous les calculateurs municipaux
 */
export function calculateAxisPosition(
  userAnswers: UserAnswers,
  axisConfig: AxisConfig
): number {
  let totalWeightedScore = 0
  let totalWeight = 0

  axisConfig.questions.forEach(({ id, weight, interpretation }) => {
    const userAnswer = userAnswers[id]

    if (userAnswer && userAnswer !== 'IDK') {
      let score = agreementScoreValues[userAnswer]

      // Logique d'inversion basée sur l'interprétation politique des questions
      if (interpretation) {
        switch (interpretation) {
          case 'conservative':
            // Questions conservatrices : être d'accord = conservateur (score négatif sur axe social)
            if (axisConfig.name.includes('social')) {
              score = -score
            }
            break
          case 'interventionist':
            // Questions interventionnistes : être d'accord = interventionnisme (score négatif sur axe économique)
            if (axisConfig.name.includes('économique')) {
              score = -score
            }
            break
          // 'progressive' et 'free_market' gardent le score positif tel quel
          // 'decentralization', 'collaborative' sont neutres ou contextuels
        }
      } else {
        // Fallback : logique d'inversion legacy pour compatibilité Quebec
        if (axisConfig.name.includes('social')) {
          if (id.includes('troisieme_lien') || id.includes('effectifs_policiers') || id.includes('reduction_dechets')) {
            score = -score
          }
        }

        if (axisConfig.name.includes('économique')) {
          if (id.includes('augmentation_taxes') || id.includes('quotas_logements') ||
              id.includes('soutien_organismes') || id.includes('pouvoir_conseils')) {
            score = -score
          }
        }
      }

      const questionWeight = weight
      totalWeightedScore += score * questionWeight
      totalWeight += questionWeight
    }
  })

  if (totalWeight === 0) return 0

  // Normalisation sur [-100, +100]
  const normalizedScore = (totalWeightedScore / totalWeight) * 50
  return Math.max(-100, Math.min(100, normalizedScore))
}

/**
 * Calcule la position politique complète d'un utilisateur
 * Utilise la configuration d'axes fournie
 */
export function calculateUserPoliticalPositionWithConfig(
  userAnswers: UserAnswers,
  economicAxis: AxisConfig,
  socialAxis: AxisConfig
): PoliticalPosition {
  const x = calculateAxisPosition(userAnswers, economicAxis)
  const y = calculateAxisPosition(userAnswers, socialAxis)

  return { x, y }
}

/**
 * Détermine une description textuelle de la position politique
 * Description générique applicable à toutes les municipalités
 */
export function getPoliticalPositionDescription(position: PoliticalPosition): string {
  const { x, y } = position

  // Quadrants politiques universels
  if (x >= 0 && y >= 0) {
    return "Libéral progressiste"
  } else if (x < 0 && y >= 0) {
    return "Social-démocrate / Écologiste"
  } else if (x >= 0 && y < 0) {
    return "Conservateur fiscal"
  } else {
    return "Autoritaire / Populiste"
  }
}

/**
 * Calcule la distance entre deux positions politiques
 * Fonction utilitaire pour calculs de compatibilité
 */
export function calculatePoliticalDistance(pos1: PoliticalPosition, pos2: PoliticalPosition): number {
  const dx = pos1.x - pos2.x
  const dy = pos1.y - pos2.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calcule la compatibilité basée sur les priorités
 * Logique commune à toutes les municipalités
 */
export function calculatePriorityCompatibility(
  userPriorities: Record<string, number>,
  partyPriorities: string[]
): number {
  if (!userPriorities || Object.keys(userPriorities).length === 0) {
    return 50 // Score neutre si pas de priorités utilisateur
  }

  let compatibilityScore = 0
  const userPriorityList = Object.entries(userPriorities)
    .sort(([,a], [,b]) => a - b) // Trier par rang (1, 2, 3)
    .map(([priority]) => priority)

  // Calculer le score basé sur les correspondances de priorités
  userPriorityList.forEach((userPriority, userIndex) => {
    const partyRank = partyPriorities.findIndex(p => p === userPriority)

    if (partyRank !== -1) {
      // Correspondance trouvée - plus le rang est proche, plus le score est élevé
      const rankDifference = Math.abs(userIndex - partyRank)
      const maxPoints = 35 - (userIndex * 5) // 1er = 35 points max, 2e = 30, 3e = 25
      const actualPoints = Math.max(0, maxPoints - (rankDifference * 10))
      compatibilityScore += actualPoints
    }
    // Pas de points si pas de correspondance
  })

  return Math.min(100, Math.max(0, compatibilityScore))
}

/**
 * CALCUL UNIFIÉ EXACT - Version de référence
 * Assure la cohérence parfaite entre l'affichage de la carte et les pourcentages d'affinité
 */
export function calculateExactCompatibility(
  userPosition: PoliticalPosition,
  partyPosition: PoliticalPosition,
  userPriorities: Record<string, number>,
  partyPriorities: string[]
): number {
  // 1. Calcul du score politique
  const distance = calculatePoliticalDistance(userPosition, partyPosition)
  // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
  const maxDistance = 283
  const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
  const politicalScore = compatibility

  // 2. Calcul du score des priorités
  const priorityScore = calculatePriorityCompatibility(userPriorities, partyPriorities)

  // 3. Score final pondéré : 70% position politique, 30% priorités
  const finalScore = (politicalScore * 0.7) + (priorityScore * 0.3)

  return Math.round(finalScore)
}

/**
 * Fonctions utilitaires pour l'affichage (réutilisées de l'ancien système)
 */

/**
 * Calcule les limites de la carte politique pour l'affichage
 */
export function calculateMapBounds(
  positions: PoliticalPosition[],
  padding = 20
): { minX: number; maxX: number; minY: number; maxY: number } {
  if (positions.length === 0) {
    return { minX: -padding, maxX: padding, minY: -padding, maxY: padding }
  }

  const xs = positions.map(p => p.x)
  const ys = positions.map(p => p.y)

  return {
    minX: Math.min(...xs) - padding,
    maxX: Math.max(...xs) + padding,
    minY: Math.min(...ys) - padding,
    maxY: Math.max(...ys) + padding
  }
}

/**
 * Normalise une position pour l'affichage dans un canvas/SVG
 */
export function normalizePositionForDisplay(
  position: PoliticalPosition,
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
  canvasSize = 400
): { x: number; y: number } {
  const rangeX = bounds.maxX - bounds.minX
  const rangeY = bounds.maxY - bounds.minY

  const normalizedX = ((position.x - bounds.minX) / rangeX) * canvasSize
  // Ne pas inverser Y pour maintenir la cohérence avec le centrage dynamique
  const normalizedY = ((position.y - bounds.minY) / rangeY) * canvasSize

  return { x: normalizedX, y: normalizedY }
}

/**
 * Fonction de validation pour débogage
 * Vérifie qu'une configuration municipale est valide
 */
export function validateMunicipalityConfiguration(
  municipality: string,
  economicAxis: AxisConfig,
  socialAxis: AxisConfig
): { valid: boolean; issues: string[] } {
  const issues: string[] = []

  // Vérifier que les axes ont des questions
  if (economicAxis.questions.length === 0) {
    issues.push(`${municipality}: Axe économique sans questions`)
  }
  if (socialAxis.questions.length === 0) {
    issues.push(`${municipality}: Axe social sans questions`)
  }

  // Vérifier que les IDs de questions contiennent le préfixe municipal
  const municipalityPrefix = municipality.toLowerCase()
  economicAxis.questions.forEach(q => {
    if (!q.id.includes(municipalityPrefix) && municipality !== 'quebec') {
      issues.push(`${municipality}: Question économique ${q.id} ne contient pas le préfixe municipal`)
    }
  })

  socialAxis.questions.forEach(q => {
    if (!q.id.includes(municipalityPrefix) && municipality !== 'quebec') {
      issues.push(`${municipality}: Question sociale ${q.id} ne contient pas le préfixe municipal`)
    }
  })

  return {
    valid: issues.length === 0,
    issues
  }
}