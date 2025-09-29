import { type AgreementOptionKey, type Question } from './boussole-data'

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

// ============================================================================
// 🎯 NOUVEAU SYSTÈME D'AFFINITÉ DIRECTE QUESTION PAR QUESTION
// ============================================================================

/**
 * Mapping des catégories de questions DB vers les priorités utilisateur
 */
const categoryToPriorityMapping: Record<string, string | null> = {
  "Transport et mobilité": "Transport et mobilité",
  "Logement et aménagement urbain": "Logement abordable",
  "Environnement et développement durable": "Environnement et espaces verts",
  "Finances municipales": "Gestion des finances municipales",
  "Services municipaux": "Services municipaux",
  "Sécurité publique": "Sécurité publique",
  "Développement économique": "Développement économique et social",
  "Gouvernance et participation": "Gouvernance et participation citoyenne",
  "Patrimoine et développement": "Patrimoine et développement",
  "Services sociaux": "Services municipaux", // Regroupé avec services municipaux
  "Équilibre développement/qualité de vie": "Développement économique et social",
  "Gestion des priorités": "Gestion des finances municipales",

  // Enjeux spécifiques municipaux (1 question chacun)
  "Projet tramway": "Projet tramway",
  "Troisième lien": "Troisième lien",

  // Catégorie spéciale - exclue du calcul d'affinité
  "Enjeux prioritaires": null
}

/**
 * Interface pour les détails d'affinité directe
 */
export interface DirectCompatibilityDetails {
  finalScore: number
  totalQuestions: number
  agreementsByCategory: Record<string, { agreed: number; total: number; percentage: number }>
  priorityWeights: Record<string, number>
  sharedPriorities: string[]
  weightedContributions: Record<string, number>
  narrative: {
    mainScore: string
    priorityAnalysis: string
    categoryBreakdown: string
    summary: string
  }
}

/**
 * Extrait le nom de la priorité spécifique d'une question "Enjeu spécifique"
 * en cherchant dans les priority_options de la municipalité
 */
function extractSpecificPriorityName(
  question: Question,
  allQuestions: Question[]
): string | null {
  // Trouver la question de priorités pour cette municipalité
  const priorityQuestion = allQuestions.find(q =>
    q.category === "Enjeux prioritaires" ||
    q.responseType === "priority_ranking"
  )

  if (!priorityQuestion?.priorityOptions) {
    return null
  }

  // Parser les options de priorité
  let priorityOptions: string[] = []
  try {
    priorityOptions = typeof priorityQuestion.priorityOptions === 'string'
      ? JSON.parse(priorityQuestion.priorityOptions)
      : priorityQuestion.priorityOptions
  } catch (error) {
    console.warn('Erreur parsing priorityOptions:', error)
    return null
  }

  // Mapping basé sur l'ID de la question pour identifier l'enjeu spécifique
  const specificMappings: Record<string, string[]> = {
    // Québec
    'qc_q_01_tramway': ['Projet tramway', 'Tramway'],
    'qc_spec_troisieme_lien': ['Troisième lien', '3e lien', 'Troisieme lien'],

    // Montréal
    'mtl_spec_rem': ['Extension du métro et REM', 'Métro et REM', 'REM'],
    'mtl_spec_arrondissements': ['Coordination des arrondissements', 'Arrondissements', 'Autonomie arrondissements'],
    'mtl_spec_festivals': ['Gestion des festivals et événements', 'Festivals', 'Événements'],
  }

  // Chercher l'enjeu correspondant dans les options
  const possibleNames = specificMappings[question.id] || []
  for (const possibleName of possibleNames) {
    const found = priorityOptions.find(option =>
      option.toLowerCase().includes(possibleName.toLowerCase()) ||
      possibleName.toLowerCase().includes(option.toLowerCase())
    )
    if (found) {
      return found
    }
  }

  return null
}

/**
 * Calcule le poids d'une question selon les priorités utilisateur
 * Inclut un bonus de rareté pour les enjeux avec peu de questions
 * Gère spécialement les catégories "Enjeu spécifique X"
 */
function calculateQuestionWeight(
  question: Question,
  userPriorities: Record<string, number>,
  questionsPerCategory: Record<string, number>,
  allQuestions: Question[]
): number {
  // 🎯 GESTION SPÉCIALE : Enjeux spécifiques municipaux
  if (question.category && question.category.startsWith("Enjeu spécifique")) {
    // Extraire le nom exact de la priorité spécifique
    const specificPriorityName = extractSpecificPriorityName(question, allQuestions)

    if (specificPriorityName) {
      // Vérifier si l'utilisateur a sélectionné cette priorité
      const priorityRank = userPriorities[specificPriorityName]

      if (priorityRank) {
        // Multiplicateurs de base selon le rang de priorité
        const baseMultipliers: Record<number, number> = {
          1: 2.0,   // 1ère priorité
          2: 1.75,  // 2ème priorité
          3: 1.5    // 3ème priorité
        }

        const baseMultiplier = baseMultipliers[priorityRank] || 1.0
        // Bonus de rareté automatique pour tous les enjeux spécifiques
        const scarcityBonus = 1.5

        return baseMultiplier * scarcityBonus
      } else {
        // L'utilisateur n'a pas sélectionné cette priorité spécifique
        // Mais on applique quand même le bonus de rareté
        return 1.0 * 1.5
      }
    }

    // Fallback si on n'arrive pas à extraire le nom
    return 1.0 * 1.5
  }

  // 📝 GESTION NORMALE : Catégories standards
  const mappedPriority = categoryToPriorityMapping[question.category]

  if (!mappedPriority) {
    return 1.0 // Poids de base pour catégories non-mappées
  }

  // Vérifier si c'est une priorité utilisateur
  const priorityRank = userPriorities[mappedPriority]
  if (!priorityRank) {
    return 1.0 // Poids de base si pas une priorité
  }

  // Multiplicateurs de base selon le rang de priorité
  const baseMultipliers: Record<number, number> = {
    1: 2.0,   // 1ère priorité
    2: 1.75,  // 2ème priorité
    3: 1.5    // 3ème priorité
  }

  const baseMultiplier = baseMultipliers[priorityRank] || 1.0

  // Bonus de rareté pour enjeux avec peu de questions (pas pour les spécifiques)
  const questionsInCategory = questionsPerCategory[mappedPriority] || 1
  const scarcityBonus = questionsInCategory === 1 ? 1.5 : 1.0

  return baseMultiplier * scarcityBonus
}

/**
 * Groupe les questions par priorité mappée et compte les questions par catégorie
 */
function analyzeQuestionDistribution(questions: Question[]): {
  questionsPerCategory: Record<string, number>
  questionsByPriority: Record<string, Question[]>
} {
  const questionsPerCategory: Record<string, number> = {}
  const _questionsByPriority: Record<string, Question[]> = {}

  // Filtrer les questions normales (exclure enjeux prioritaires)
  const normalQuestions = questions.filter(q =>
    q.category !== "Enjeux prioritaires" &&
    q.responseType !== "priority_ranking"
  )

  normalQuestions.forEach(question => {
    const mappedPriority = categoryToPriorityMapping[question.category]

    if (mappedPriority) {
      // Compter les questions par priorité
      questionsPerCategory[mappedPriority] = (questionsPerCategory[mappedPriority] || 0) + 1

      // Grouper les questions par priorité
      if (!_questionsByPriority[mappedPriority]) {
        _questionsByPriority[mappedPriority] = []
      }
      _questionsByPriority[mappedPriority].push(question)
    }
  })

  return { questionsPerCategory, questionsByPriority: _questionsByPriority }
}

/**
 * CALCUL D'AFFINITÉ DIRECTE - Question par question avec pondération équilibrée
 * Système bicéphale : utilisé pour l'affinité pratique (décision de vote)
 * Différent du calcul de position politique (carte)
 */
export function calculateDirectCompatibility(
  userAnswers: UserAnswers,
  partyAnswers: UserAnswers,
  userPriorities: Record<string, number>,
  questions: Question[]
): DirectCompatibilityDetails {
  // Analyser la distribution des questions
  const { questionsPerCategory } = analyzeQuestionDistribution(questions)

  // Filtrer les questions normales pour le calcul
  const normalQuestions = questions.filter(q =>
    q.category !== "Enjeux prioritaires" &&
    q.responseType !== "priority_ranking"
  )

  let totalWeightedScore = 0
  let totalWeight = 0
  const agreementsByCategory: Record<string, { agreed: number; total: number; percentage: number }> = {}
  const priorityWeights: Record<string, number> = {}
  const weightedContributions: Record<string, number> = {}

  // Calculer pour chaque question
  normalQuestions.forEach(question => {
    const userAnswer = userAnswers[question.id]
    const partyAnswer = partyAnswers[question.id]

    // Vérifier que les deux réponses existent et ne sont pas IDK
    if (!userAnswer || !partyAnswer || userAnswer === 'IDK' || partyAnswer === 'IDK') {
      return
    }

    // Calculer la distance et l'accord
    const userScore = agreementScoreValues[userAnswer]
    const partyScore = agreementScoreValues[partyAnswer]
    const distance = Math.abs(userScore - partyScore)
    const accordPercentage = Math.max(0, (4 - distance) / 4 * 100)

    // Calculer le poids de la question (nouvelle signature avec gestion enjeux spécifiques)
    const weight = calculateQuestionWeight(question, userPriorities, questionsPerCategory, questions)

    // Déterminer la priorité mappée pour le tracking par catégorie
    const mappedPriority = question.category.startsWith("Enjeu spécifique")
      ? extractSpecificPriorityName(question, questions) || question.category
      : categoryToPriorityMapping[question.category]

    // Ajouter au score total
    totalWeightedScore += accordPercentage * weight
    totalWeight += weight

    // Tracking par catégorie
    if (mappedPriority) {
      if (!agreementsByCategory[mappedPriority]) {
        agreementsByCategory[mappedPriority] = { agreed: 0, total: 0, percentage: 0 }
      }

      agreementsByCategory[mappedPriority].total++
      if (accordPercentage >= 75) { // Seuil d'accord : 75% et plus
        agreementsByCategory[mappedPriority].agreed++
      }

      // Contribution pondérée de cette catégorie
      if (!weightedContributions[mappedPriority]) {
        weightedContributions[mappedPriority] = 0
      }
      weightedContributions[mappedPriority] += accordPercentage * weight

      // Poids moyen de cette catégorie
      priorityWeights[mappedPriority] = weight
    }
  })

  // Calcul du score final
  const finalScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0

  // Calculer les pourcentages par catégorie
  Object.keys(agreementsByCategory).forEach(category => {
    const data = agreementsByCategory[category]
    data.percentage = data.total > 0 ? Math.round((data.agreed / data.total) * 100) : 0
  })

  // Identifier les priorités partagées
  const userPriorityList = Object.entries(userPriorities)
    .sort(([,a], [,b]) => a - b) // Trier par rang (1, 2, 3)
    .map(([priority]) => priority)

  const sharedPriorities = userPriorityList.filter(priority =>
    agreementsByCategory[priority] && agreementsByCategory[priority].percentage >= 50
  )

  // Générer les narratifs
  const narrative = generateDirectCompatibilityNarrative(
    finalScore,
    agreementsByCategory,
    userPriorityList,
    sharedPriorities,
    normalQuestions.length
  )

  return {
    finalScore,
    totalQuestions: normalQuestions.length,
    agreementsByCategory,
    priorityWeights,
    sharedPriorities,
    weightedContributions,
    narrative
  }
}

/**
 * Génère les textes narratifs pour l'affinité directe
 */
function generateDirectCompatibilityNarrative(
  finalScore: number,
  agreementsByCategory: Record<string, { agreed: number; total: number; percentage: number }>,
  userPriorities: string[],
  sharedPriorities: string[],
  _totalQuestions: number
): DirectCompatibilityDetails['narrative'] {
  // Score principal
  let mainScore = ""
  if (finalScore >= 80) {
    mainScore = `Vous êtes en accord avec ce parti sur ${finalScore}% des solutions proposées`
  } else if (finalScore >= 65) {
    mainScore = `Vous partagez ${finalScore}% des approches de ce parti`
  } else if (finalScore >= 50) {
    mainScore = `Vous avez un accord modéré avec ce parti (${finalScore}%)`
  } else if (finalScore >= 35) {
    mainScore = `Vous avez des convergences limitées avec ce parti (${finalScore}%)`
  } else {
    mainScore = `Vous avez peu d'accord avec ce parti sur les solutions (${finalScore}%)`
  }

  // Analyse des priorités
  let priorityAnalysis = ""
  const prioritiesInCommon = userPriorities.filter(p => Object.keys(agreementsByCategory).includes(p))

  if (prioritiesInCommon.length === 0) {
    priorityAnalysis = `Vous ne partagez aucune priorité avec ce parti`
  } else if (sharedPriorities.length === 0 && prioritiesInCommon.length > 0) {
    priorityAnalysis = `Vous partagez ${prioritiesInCommon.length} priorité(s) avec ce parti, mais vous n'êtes pas d'accord sur les façons de les aborder`
  } else if (sharedPriorities.length === prioritiesInCommon.length) {
    priorityAnalysis = `Vous êtes alignés avec ce parti sur vos ${sharedPriorities.length} priorité(s) commune(s)`
  } else {
    priorityAnalysis = `Vous partagez ${prioritiesInCommon.length} priorité(s) avec ce parti, mais êtes d'accord sur les approches pour ${sharedPriorities.length} d'entre elles`
  }

  // Breakdown par catégorie (top 3)
  const topCategories = Object.entries(agreementsByCategory)
    .sort(([,a], [,b]) => b.percentage - a.percentage)
    .slice(0, 3)

  let categoryBreakdown = ""
  if (topCategories.length > 0) {
    const breakdownText = topCategories
      .map(([cat, data]) => `${cat}: ${data.percentage}%`)
      .join(", ")
    categoryBreakdown = `Accords les plus forts: ${breakdownText}`
  }

  // Résumé
  let summary = ""
  if (finalScore >= 70) {
    summary = `Une compatibilité forte qui faciliterait une collaboration`
  } else if (finalScore >= 50) {
    summary = `Des bases communes existent mais avec des nuances importantes`
  } else {
    summary = `Des divergences importantes sur les approches municipales`
  }

  return {
    mainScore,
    priorityAnalysis,
    categoryBreakdown,
    summary
  }
}