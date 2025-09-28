import { type AgreementOptionKey } from './boussole-data'

// Définition des axes politiques
export interface PoliticalPosition {
  x: number // Axe économique : -100 (Interventionnisme) à +100 (Libre marché)
  y: number // Axe social/environnemental : -100 (Conservateur) à +100 (Progressiste)
}

// Valeurs numériques pour les positions d'accord
const agreementScoreValues: Record<AgreementOptionKey, number> = {
  FA: 2,    // Fortement d'accord
  PA: 1,    // Plutôt d'accord
  N: 0,     // Neutre
  PD: -1,   // Plutôt en désaccord
  FD: -2,   // Fortement en désaccord
  IDK: 0,   // Ne sais pas (traité comme neutre)
}

// Configuration des questions par axe
export const axisConfiguration = {
  economic: {
    name: "Axe économique",
    leftLabel: "Interventionnisme municipal",
    rightLabel: "Libre marché",
    questions: [
      { id: "q12_augmentation_taxes", weight: 1.4 },          // Augmentation taxes (+ = interventionnisme)
      { id: "q5_quotas_logements_abordables", weight: 1.3 },   // Quotas logements (+ = interventionnisme)
      { id: "q17_soutien_organismes_communautaires", weight: 1.1 }, // Soutien communautaire (+ = interventionnisme)
      { id: "q6_reduction_depenses_taxes", weight: 1.2 },     // Réduction dépenses/taxes (+ = libre marché)
      { id: "q15_avantages_fiscaux_entreprises", weight: 0.9 }, // Avantages fiscaux (+ = libre marché)
      { id: "q14_reduction_dette", weight: 0.8 },             // Réduction dette (+ = libre marché)
      { id: "q13_pouvoir_conseils_quartier", weight: 0.7 },   // ✏️ AJOUTÉ : Pouvoir conseils quartier (+ = interventionnisme)
    ]
  },
  social: {
    name: "Axe social/environnemental", 
    leftLabel: "Conservateur",
    rightLabel: "Progressiste",
    questions: [
      { id: "q1_tramway", weight: 1.5 },                     // Tramway (+ = progressiste)
      { id: "q2_pistes_cyclables", weight: 1.3 },            // Pistes cyclables (+ = progressiste)
      { id: "q3_troisieme_lien", weight: 1.2 },              // 3e lien (+ = conservateur, - = progressiste)
      { id: "q4_priorite_mobilite_active", weight: 1.1 },    // Priorité mobilité active (+ = progressiste)
      { id: "q7_immeubles_grande_hauteur", weight: 1.1 },         // Immeubles grande hauteur (+ = progressiste)
      { id: "q8_interdire_essence_centre_ville", weight: 1.2 }, // Interdire essence centre-ville (+ = progressiste)
      { id: "q9_protection_espaces_verts", weight: 1.0 },    // Espaces verts (+ = progressiste)
      { id: "q10_transition_carboneutre", weight: 1.0 },     // Transition carbone (+ = progressiste)
      { id: "q11_reduction_dechets", weight: 0.9 },          // Collecte ordures prioritaire (+ = conservateur)
      { id: "q20_protection_patrimoine", weight: 0.9 },      // Protection patrimoine (+ = progressiste)
      { id: "q18_augmentation_effectifs_policiers", weight: 0.8 }, // Police (+ = conservateur)
      { id: "q16_limitation_touristes", weight: 0.7 },       // ✏️ AJOUTÉ : Limitation touristes (+ = progressiste)
      { id: "q19_investissement_infrastructures_loisirs_sportives", weight: 0.7 }, // ✏️ AJOUTÉ : Infrastructures loisirs (+ = progressiste)
    ]
  }
}

// Interface pour les réponses utilisateur
export interface UserAnswers {
  [questionId: string]: AgreementOptionKey | undefined
}

/**
 * Calcule la position politique sur un axe donné
 */
function calculateAxisPosition(
  userAnswers: UserAnswers, 
  axisConfig: typeof axisConfiguration.economic | typeof axisConfiguration.social
): number {
  let totalWeightedScore = 0
  let totalWeight = 0

  axisConfig.questions.forEach(({ id, weight }) => {
    const userAnswer = userAnswers[id]

    if (userAnswer && userAnswer !== 'IDK') {
      let score = agreementScoreValues[userAnswer]
      
      // Logique d'inversion corrigée basée sur l'orientation des questions
      // Axe social/environnemental : + = Progressiste, - = Conservateur
      if (axisConfig === axisConfiguration.social) {
        if (id === 'q3_troisieme_lien' || id === 'q18_augmentation_effectifs_policiers' || id === 'q11_reduction_dechets') {
          // Questions "conservatrices" : être d'accord = conservateur (score négatif)
          score = -score
        }
        // Autres questions sociales/env : être d'accord = progressiste (score positif)
      }
      
      // Axe économique : + = Libre marché, - = Interventionnisme
      if (axisConfig === axisConfiguration.economic) {
        if (id === 'q12_augmentation_taxes' || id === 'q5_quotas_logements_abordables' || id === 'q17_soutien_organismes_communautaires' || id === 'q13_pouvoir_conseils_quartier') {
          // Questions "interventionnistes" : être d'accord = interventionnisme (score négatif)
          score = -score
        }
        // Questions "libre marché" (q6_reduction_depenses_taxes, q14, q15) : être d'accord = libre marché (score positif)
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
 */
export function calculateUserPoliticalPosition(
  userAnswers: UserAnswers
): PoliticalPosition {
  const x = calculateAxisPosition(userAnswers, axisConfiguration.economic)
  const y = calculateAxisPosition(userAnswers, axisConfiguration.social)

  return { x, y }
}

/**
 * Détermine une description textuelle de la position politique
 */
export function getPoliticalPositionDescription(position: PoliticalPosition): string {
  const { x, y } = position
  
  // Quadrants
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
 */
export function calculatePoliticalDistance(pos1: PoliticalPosition, pos2: PoliticalPosition): number {
  const dx = pos1.x - pos2.x
  const dy = pos1.y - pos2.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calcule la compatibilité basée sur les priorités
 * Retourne un score de 0 à 100 basé sur l'alignement des priorités
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
 * Interface pour les détails de compatibilité narratifs
 */
export interface CompatibilityDetails {
  finalScore: number
  politicalScore: number
  priorityScore: number
  priorityMatches: number
  totalPriorities: number
  sharedPriorities: string[]
  narrative: {
    agreement: string
    priorities: string
    summary: string
  }
}

/**
 * CALCUL UNIFIÉ EXACT - Version de référence basée sur resultats/page.tsx
 * Assure la cohérence parfaite entre l'affichage de la carte et les pourcentages d'affinité
 * IMPORTANT: Cette fonction utilise exactement la même logique que dans resultats/page.tsx
 */
export function calculateExactCompatibility(
  userPosition: PoliticalPosition,
  partyPosition: PoliticalPosition,
  userPriorities: Record<string, number>,
  partyPriorities: string[]
): number {
  // 1. Calcul du score politique (exactement comme dans resultats/page.tsx)
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
 * CALCUL UNIFIÉ AVEC DÉTAILS NARRATIFS
 * Version complète qui retourne le score ET les détails pour affichage narratif
 */
export function calculateExactCompatibilityWithDetails(
  userPosition: PoliticalPosition,
  partyPosition: PoliticalPosition,
  userPriorities: Record<string, number>,
  partyPriorities: string[]
): CompatibilityDetails {

  // 1. Calcul du score politique (exactement comme dans resultats/page.tsx)
  const distance = calculatePoliticalDistance(userPosition, partyPosition)
  // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
  const maxDistance = 283
  const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
  const politicalScore = compatibility


  // 2. Calcul du score des priorités avec détails
  const priorityScore = calculatePriorityCompatibility(userPriorities, partyPriorities)

  // 3. Analyse des priorités partagées
  const userPriorityList = Object.entries(userPriorities || {})
    .sort(([,a], [,b]) => a - b) // Trier par rang (1, 2, 3)
    .map(([priority]) => priority)

  const sharedPriorities = userPriorityList.filter(userPriority =>
    partyPriorities.includes(userPriority)
  )

  const priorityMatches = sharedPriorities.length
  const totalPriorities = Math.max(userPriorityList.length, partyPriorities.length, 3) // Minimum 3

  // 4. Score final pondéré : 70% position politique, 30% priorités
  const finalScore = (politicalScore * 0.7) + (priorityScore * 0.3)

  // 5. Génération du texte narratif
  const generateNarrative = () => {
    // Texte de similarité politique (position globale, pas accord direct)
    let agreementText = ""
    if (politicalScore >= 90) {
      agreementText = `Votre position politique est très similaire à celle de ce parti (${politicalScore}%)`
    } else if (politicalScore >= 75) {
      agreementText = `Votre position politique est proche de celle de ce parti (${politicalScore}%)`
    } else if (politicalScore >= 60) {
      agreementText = `Votre position politique rejoint celle de ce parti à ${politicalScore}%`
    } else if (politicalScore >= 40) {
      agreementText = `Votre position politique converge partiellement avec ce parti (${politicalScore}%)`
    } else {
      agreementText = `Votre position politique diverge significativement de ce parti (${politicalScore}%)`
    }

    // Texte des priorités
    let prioritiesText = ""
    if (priorityMatches === 0) {
      prioritiesText = `Vous n'avez aucune priorité municipale en commun`
    } else if (priorityMatches === 1) {
      const sharedPriority = sharedPriorities[0]
      prioritiesText = `Vous partagez 1 priorité sur ${totalPriorities} : "${sharedPriority}"`
    } else if (priorityMatches === 2) {
      prioritiesText = `Vous partagez 2 priorités sur ${totalPriorities} avec eux`
    } else {
      prioritiesText = `Vous partagez ${priorityMatches} priorités sur ${totalPriorities} avec eux`
    }

    // Texte de résumé
    let summaryText = ""
    const roundedScore = Math.round(finalScore)
    if (roundedScore >= 80) {
      summaryText = `C'est pourquoi vous avez une excellente compatibilité de ${roundedScore}%`
    } else if (roundedScore >= 65) {
      summaryText = `C'est pourquoi votre compatibilité globale est de ${roundedScore}%`
    } else if (roundedScore >= 50) {
      summaryText = `Votre compatibilité modérée est de ${roundedScore}%`
    } else {
      summaryText = `Votre compatibilité limitée est de ${roundedScore}%`
    }

    return {
      agreement: agreementText,
      priorities: prioritiesText,
      summary: summaryText
    }
  }

  return {
    finalScore: Math.round(finalScore),
    politicalScore,
    priorityScore,
    priorityMatches,
    totalPriorities,
    sharedPriorities,
    narrative: generateNarrative()
  }
}

// ============================================================================
// 📊 FONCTIONS UTILITAIRES POUR L'AFFICHAGE
// ============================================================================

/**
 * Calcule les limites de la carte politique pour l'affichage
 * @param positions Positions à analyser
 * @param padding Marge autour des points (défaut: 20)
 * @returns Limites min/max pour l'affichage
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
 * @param position Position à normaliser
 * @param bounds Limites de la carte
 * @param canvasSize Taille du canvas (défaut: 400)
 * @returns Position normalisée pour l'affichage
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
 * Réponses hypothétiques des partis aux questions de la boussole
 * Basées sur leurs programmes et positions publiques
 */
export const partyAnswers: Record<string, UserAnswers> = {
  'quebec_forte_et_fiere': {
    q1_tramway: 'FA',
    q2_pistes_cyclables: 'FA',
    q3_troisieme_lien: 'PD',
    q4_priorite_mobilite_active: 'PA',
    q5_quotas_logements_abordables: 'PA',
    q6_reduction_depenses_taxes: 'PD',
    q7_immeubles_grande_hauteur: 'FD',
    q8_interdire_essence_centre_ville: 'PA',
    q9_protection_espaces_verts: 'FA',
    q10_transition_carboneutre: 'FA',
    q11_reduction_dechets: 'FD',
    q12_augmentation_taxes: 'PA',
    q13_pouvoir_conseils_quartier: 'FD',
    q14_reduction_dette: 'FD',
    q15_avantages_fiscaux_entreprises: 'PD',
    q16_limitation_touristes: 'FD',
    q17_soutien_organismes_communautaires: 'FA',
    q18_augmentation_effectifs_policiers: 'N',
    q19_investissement_infrastructures_loisirs_sportives: 'FA',
    q20_protection_patrimoine: 'FA',
  },

  'transition_quebec': {
    q1_tramway: 'FA',
    q2_pistes_cyclables: 'FA',
    q3_troisieme_lien: 'FD',
    q4_priorite_mobilite_active: 'FA',
    q5_quotas_logements_abordables: 'FA',
    q6_reduction_depenses_taxes: 'FD',
    q7_immeubles_grande_hauteur: 'FD',
    q8_interdire_essence_centre_ville: 'FA',
    q9_protection_espaces_verts: 'PA',
    q10_transition_carboneutre: 'FA',
    q11_reduction_dechets: 'FD',
    q12_augmentation_taxes: 'FA',
    q13_pouvoir_conseils_quartier: 'PD',
    q14_reduction_dette: 'FD',
    q15_avantages_fiscaux_entreprises: 'FD',
    q16_limitation_touristes: 'N',
    q17_soutien_organismes_communautaires: 'PA',
    q18_augmentation_effectifs_policiers: 'FD',
    q19_investissement_infrastructures_loisirs_sportives: 'FD',
    q20_protection_patrimoine: 'PA',
  },

  'quebec_dabord': {
    q1_tramway: 'PA',
    q2_pistes_cyclables: 'PA',
    q3_troisieme_lien: 'PA',
    q4_priorite_mobilite_active: 'N',
    q5_quotas_logements_abordables: 'N',
    q6_reduction_depenses_taxes: 'N',
    q7_immeubles_grande_hauteur: 'PD',
    q8_interdire_essence_centre_ville: 'PA',
    q9_protection_espaces_verts: 'N',
    q10_transition_carboneutre: 'PA',
    q11_reduction_dechets: 'N',
    q12_augmentation_taxes: 'N',
    q13_pouvoir_conseils_quartier: 'PA',
    q14_reduction_dette: 'PA',
    q15_avantages_fiscaux_entreprises: 'N',
    q16_limitation_touristes: 'PD',
    q17_soutien_organismes_communautaires: 'N',
    q18_augmentation_effectifs_policiers: 'PD',
    q19_investissement_infrastructures_loisirs_sportives: 'N',
    q20_protection_patrimoine: 'PD',
  },

  'respect_citoyens': {
    q1_tramway: 'FD',
    q2_pistes_cyclables: 'FD',
    q3_troisieme_lien: 'FA',
    q4_priorite_mobilite_active: 'FD',
    q5_quotas_logements_abordables: 'FD',
    q6_reduction_depenses_taxes: 'FA',
    q7_immeubles_grande_hauteur: 'FA',
    q8_interdire_essence_centre_ville: 'FD',
    q9_protection_espaces_verts: 'FD',
    q10_transition_carboneutre: 'FD',
    q11_reduction_dechets: 'FA',
    q12_augmentation_taxes: 'FD',
    q13_pouvoir_conseils_quartier: 'FA',
    q14_reduction_dette: 'FA',
    q15_avantages_fiscaux_entreprises: 'FA',
    q16_limitation_touristes: 'PA',
    q17_soutien_organismes_communautaires: 'PD',
    q18_augmentation_effectifs_policiers: 'FA',
    q19_investissement_infrastructures_loisirs_sportives: 'FA',
    q20_protection_patrimoine: 'FD',
  },

  'equipe_priorite_quebec': {
    // NOTE: Ce parti n'est pas dans positions_partis.md. Les réponses existantes sont conservées mais les IDs de questions obsolètes sont corrigés.
    q1_tramway: 'FD',
    q2_pistes_cyclables: 'PA',
    q3_troisieme_lien: 'PA',
    q4_priorite_mobilite_active: 'N',
    q5_quotas_logements_abordables: 'PA',
    q6_reduction_depenses_taxes: 'PA',
    q7_immeubles_grande_hauteur: 'PA',
    q8_interdire_essence_centre_ville: 'PA',
    q9_protection_espaces_verts: 'FA',
    q10_transition_carboneutre: 'FA',
    q11_reduction_dechets: 'PD',
    q12_augmentation_taxes: 'PA',
    q13_pouvoir_conseils_quartier: 'PA',
    q14_reduction_dette: 'N',
    q15_avantages_fiscaux_entreprises: 'N',
    q16_limitation_touristes: 'N',
    q17_soutien_organismes_communautaires: 'PA',
    q18_augmentation_effectifs_policiers: 'N',
    q19_investissement_infrastructures_loisirs_sportives: 'PA',
    q20_protection_patrimoine: 'PA',
  },

  'leadership_quebec': {
    q1_tramway: 'PD',
    q2_pistes_cyclables: 'PD',
    q3_troisieme_lien: 'N',
    q4_priorite_mobilite_active: 'PD',
    q5_quotas_logements_abordables: 'N',
    q6_reduction_depenses_taxes: 'PA',
    q7_immeubles_grande_hauteur: 'N',
    q8_interdire_essence_centre_ville: 'N',
    q9_protection_espaces_verts: 'PD',
    q10_transition_carboneutre: 'N',
    q11_reduction_dechets: 'N',
    q12_augmentation_taxes: 'PD',
    q13_pouvoir_conseils_quartier: 'N',
    q14_reduction_dette: 'N',
    q15_avantages_fiscaux_entreprises: 'PA',
    q16_limitation_touristes: 'N',
    q17_soutien_organismes_communautaires: 'N',
    q18_augmentation_effectifs_policiers: 'N',
    q19_investissement_infrastructures_loisirs_sportives: 'PD',
    q20_protection_patrimoine: 'N',
  },

  'alliance_citoyenne': {
    // NOTE: Ce parti n'est pas dans positions_partis.md. Les réponses existantes sont conservées mais les IDs de questions obsolètes sont corrigés.
    q1_tramway: 'PD',
    q2_pistes_cyclables: 'PA',
    q3_troisieme_lien: 'FA',
    q4_priorite_mobilite_active: 'PA',
    q5_quotas_logements_abordables: 'PA',
    q6_reduction_depenses_taxes: 'FD',
    q7_immeubles_grande_hauteur: 'FD',
    q8_interdire_essence_centre_ville: 'FA',
    q9_protection_espaces_verts: 'PA',
    q10_transition_carboneutre: 'PD',
    q11_reduction_dechets: 'FA',
    q12_augmentation_taxes: 'FD',
    q13_pouvoir_conseils_quartier: 'FA',
    q14_reduction_dette: 'PD',
    q15_avantages_fiscaux_entreprises: 'PA',
    q16_limitation_touristes: 'PD',
    q17_soutien_organismes_communautaires: 'PD',
    q18_augmentation_effectifs_policiers: 'PA',
    q19_investissement_infrastructures_loisirs_sportives: 'PA',
    q20_protection_patrimoine: 'PD',
  },
}

/**
 * Calcule les positions des partis basées sur leurs réponses aux questions
 */
export function calculatePartyPositions(): Record<string, PoliticalPosition> {
  const positions: Record<string, PoliticalPosition> = {}
  
  Object.entries(partyAnswers).forEach(([partyId, answers]) => {
    positions[partyId] = calculateUserPoliticalPosition(answers)
  })
  
  return positions
}

/**
 * Positions calculées des partis (remplace les positions arbitraires)
 */
export const partyPositions = calculatePartyPositions() 