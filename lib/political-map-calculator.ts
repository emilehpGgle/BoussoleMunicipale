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
      { id: "q12_augmentation_taxes", weight: 1.5 },          // Augmentation taxes (+ = interventionnisme)
      { id: "q5_quotas_logements_abordables", weight: 1.2 },   // Quotas logements (+ = interventionnisme)
      { id: "q4_secteur_prive_transport", weight: 1.0 },      // Transport privé (+ = libre marché)
      { id: "q15_avantages_fiscaux_entreprises", weight: 1.0 }, // Avantages fiscaux (+ = libre marché)
      { id: "q14_reduction_dette", weight: 0.8 },             // Réduction dette (+ = libre marché)
      { id: "q17_soutien_organismes_communautaires", weight: 0.8 }, // Soutien communautaire (+ = interventionnisme)
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
      { id: "q6_densification_quartiers", weight: 1.0 },     // Densification (+ = progressiste)
      { id: "q9_protection_espaces_verts", weight: 1.0 },    // Espaces verts (+ = progressiste)
      { id: "q10_transition_carboneutre", weight: 1.0 },     // Transition carbone (+ = progressiste)
      { id: "q18_augmentation_effectifs_policiers", weight: 0.8 }, // Police (+ = conservateur)
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
        if (id === 'q3_troisieme_lien' || id === 'q18_augmentation_effectifs_policiers') {
          // Questions "conservatrices" : être d'accord = conservateur (score négatif)
          score = -score
        }
        // Autres questions sociales/env : être d'accord = progressiste (score positif)
      }
      
      // Axe économique : + = Libre marché, - = Interventionnisme
      if (axisConfig === axisConfiguration.economic) {
        if (id === 'q12_augmentation_taxes' || id === 'q5_quotas_logements_abordables' || id === 'q17_soutien_organismes_communautaires') {
          // Questions "interventionnistes" : être d'accord = interventionnisme (score négatif)
          score = -score
        }
        // Questions "libre marché" (q4, q14, q15) : être d'accord = libre marché (score positif)
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

// ============================================================================
// 🧠 SYSTÈME DE CENTRAGE DYNAMIQUE ET DÉZOOM GRAPHIQUE
// ============================================================================

/**
 * Calcule le centre politique moyen d'un ensemble de positions
 * Utilisé pour recentrer dynamiquement la carte électorale
 */
export function calculateMeanCenter(positions: PoliticalPosition[]): PoliticalPosition {
  if (positions.length === 0) {
    return { x: 0, y: 0 }
  }
  
  const total = positions.length
  const meanX = positions.reduce((sum, p) => sum + p.x, 0) / total
  const meanY = positions.reduce((sum, p) => sum + p.y, 0) / total
  
  return { x: meanX, y: meanY }
}

/**
 * Recentre une position par rapport à un centre de référence
 * Déplace tous les points pour que le centre soit à (0,0)
 */
export function recentrePosition(position: PoliticalPosition, center: PoliticalPosition): PoliticalPosition {
  return {
    x: position.x - center.x,
    y: position.y - center.y
  }
}

/**
 * Applique un facteur de dézoom à une position
 * Réduit l'échelle pour que les distances paraissent moins extrêmes
 * @param position Position à redimensionner
 * @param zoomFactor Facteur de zoom (0.6 = dézoom de 40%, 1.0 = taille normale)
 */
export function scalePosition(position: PoliticalPosition, zoomFactor = 0.6): PoliticalPosition {
  return {
    x: position.x * zoomFactor,
    y: position.y * zoomFactor
  }
}

/**
 * Applique le centrage dynamique et le dézoom à une position utilisateur
 * @param userPosition Position brute de l'utilisateur
 * @param partyPositions Positions des partis pour calculer le centre
 * @param zoomFactor Facteur de dézoom (défaut: 0.6)
 * @returns Position utilisateur recentrée et redimensionnée
 */
export function applyDynamicScaling(
  userPosition: PoliticalPosition, 
  partyPositions: PoliticalPosition[], 
  zoomFactor = 0.6
): PoliticalPosition {
  const center = calculateMeanCenter(partyPositions)
  const recentred = recentrePosition(userPosition, center)
  return scalePosition(recentred, zoomFactor)
}

/**
 * Applique le centrage dynamique et le dézoom à toutes les positions des partis
 * @param partyPositions Positions brutes des partis
 * @param zoomFactor Facteur de dézoom (défaut: 0.6)
 * @returns Positions des partis recentrées et redimensionnées
 */
export function applyDynamicScalingToParties(
  partyPositions: PoliticalPosition[], 
  zoomFactor = 0.6
): PoliticalPosition[] {
  const center = calculateMeanCenter(partyPositions)
  
  return partyPositions.map(position => {
    const recentred = recentrePosition(position, center)
    return scalePosition(recentred, zoomFactor)
  })
}

/**
 * Calcule les positions des partis avec centrage dynamique et dézoom
 * Version optimisée qui applique les transformations en une seule passe
 * @param zoomFactor Facteur de dézoom (défaut: 0.6)
 * @returns Positions des partis recentrées et redimensionnées
 */
export function calculateScaledPartyPositions(zoomFactor = 0.6): Record<string, PoliticalPosition> {
  const rawPositions = calculatePartyPositions()
  const positionsArray = Object.values(rawPositions)
  const center = calculateMeanCenter(positionsArray)
  
  const scaledPositions: Record<string, PoliticalPosition> = {}
  
  Object.entries(rawPositions).forEach(([partyId, position]) => {
    const recentred = recentrePosition(position, center)
    scaledPositions[partyId] = scalePosition(recentred, zoomFactor)
  })
  
  return scaledPositions
}

/**
 * Interface pour les résultats de transformation
 * Contient les positions originales et transformées
 */
export interface ScaledPoliticalMap {
  original: {
    user: PoliticalPosition
    parties: Record<string, PoliticalPosition>
    center: PoliticalPosition
  }
  scaled: {
    user: PoliticalPosition
    parties: Record<string, PoliticalPosition>
    center: PoliticalPosition
  }
  zoomFactor: number
}

/**
 * Calcule une carte politique complète avec centrage dynamique et dézoom
 * @param userPosition Position brute de l'utilisateur
 * @param zoomFactor Facteur de dézoom (défaut: 0.6)
 * @returns Carte politique avec positions originales et transformées
 */
export function calculateScaledPoliticalMap(
  userPosition: PoliticalPosition, 
  zoomFactor = 0.6
): ScaledPoliticalMap {
  const rawPartyPositions = calculatePartyPositions()
  const partyPositionsArray = Object.values(rawPartyPositions)
  const center = calculateMeanCenter(partyPositionsArray)
  
  // Positions originales
  const original = {
    user: userPosition,
    parties: rawPartyPositions,
    center
  }
  
  // Positions transformées
  const scaledParties: Record<string, PoliticalPosition> = {}
  Object.entries(rawPartyPositions).forEach(([partyId, position]) => {
    const recentred = recentrePosition(position, center)
    scaledParties[partyId] = scalePosition(recentred, zoomFactor)
  })
  
  const recentredUser = recentrePosition(userPosition, center)
  const scaledUser = scalePosition(recentredUser, zoomFactor)
  
  const scaled = {
    user: scaledUser,
    parties: scaledParties,
    center: { x: 0, y: 0 } // Le centre transformé est toujours à (0,0)
  }
  
  return {
    original,
    scaled,
    zoomFactor
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
    // Bruno Marchand - Maire sortant, progressiste modéré
    q1_tramway: 'FA',                              // Fortement pour le tramway (projet phare)
    q2_pistes_cyclables: 'PA',                     // Pour les pistes cyclables
    q3_troisieme_lien: 'FD',                       // Fortement contre le 3e lien
    q4_secteur_prive_transport: 'PD',              // Préfère le public
    q5_quotas_logements_abordables: 'PA',          // Pour le logement social
    q6_densification_quartiers: 'PA',              // Pour la densification
    q7_etalement_urbain: 'PD',                     // Contre l'étalement
    q8_stationnements_centre_ville: 'PD',          // Réduire les stationnements
    q9_protection_espaces_verts: 'PA',             // Protection environnement
    q10_transition_carboneutre: 'FA',              // Fortement pour la transition
    q11_collecte_residus_alimentaires: 'FA',       // Fortement pour (60% participation citoyenne atteinte)
    q12_augmentation_taxes: 'PA',                  // Accepte hausses pour services
    q13_participation_citoyenne: 'PA',             // Pour la participation
    q14_reduction_dette: 'PD',                     // Investit massivement (réserve climat 1,17 milliards)
    q15_avantages_fiscaux_entreprises: 'PA',       // Vision économie-environnement intégrée
    q16_achat_local: 'PA',                         // Pour l'achat local
    q17_soutien_organismes_communautaires: 'PA',   // Soutien aux organismes
    q18_augmentation_effectifs_policiers: 'N',     // Neutre sur la police
    q19_cameras_surveillance: 'N',                 // Neutre
    q20_couvre_feu: 'PD',                         // Contre les mesures répressives
  },

  'transition_quebec': {
    // Jackie Smith - Parti écologiste municipal ambitieux (contexte réaliste)
    q1_tramway: 'FA',                              // Fortement pour (transport durable)
    q2_pistes_cyclables: 'FA',                     // Fortement pour (mobilité verte)
    q3_troisieme_lien: 'PD',                       // "J'affirme mon opposition au troisième lien"
    q4_secteur_prive_transport: 'PD',              // Préfère gestion publique
    q5_quotas_logements_abordables: 'FA',          // Fortement pour justice sociale
    q6_densification_quartiers: 'FA',              // Fortement pour (contre étalement)
    q7_etalement_urbain: 'PD',                     // Contre l'étalement
    q8_stationnements_centre_ville: 'PD',          // Contre (favorise transport collectif)
    q9_protection_espaces_verts: 'FA',             // Priorité environnementale
    q10_transition_carboneutre: 'FA',              // Priorité climatique
    q11_collecte_residus_alimentaires: 'FA',       // Fortement pour gestion durable
    q12_augmentation_taxes: 'PA',                  // Pour financer la transition (modéré)
    q13_participation_citoyenne: 'FA',             // Fortement pour démocratie participative
    q14_reduction_dette: 'PD',                     // Contre (investissements verts prioritaires)
    q15_avantages_fiscaux_entreprises: 'PD',       // Contre (sauf critères environnementaux)
    q16_achat_local: 'PA',                         // Pour l'économie durable
    q17_soutien_organismes_communautaires: 'FA',   // Fortement pour initiatives citoyennes
    q18_augmentation_effectifs_policiers: 'PD',    // Contre (préfère prévention sociale)
    q19_cameras_surveillance: 'PD',                // Contre surveillance excessive
    q20_couvre_feu: 'PD',                         // Contre mesures répressives
  },

  'quebec_dabord': {
    // Claude Villeneuve - Centre, pragmatique (positions peu documentées) ✏️ CORRIGÉ
    q1_tramway: 'PA',                              // ✏️ CORRIGÉ : Soutien probable basé sur continuité majorité pro-tramway
    q2_pistes_cyclables: 'N',                      // ✏️ CORRIGÉ : Position non documentée publiquement
    q3_troisieme_lien: 'PA',                       // Pour les connexions
    q4_secteur_prive_transport: 'N',               // ✏️ CORRIGÉ : Pas de position documentée sur privatisation
    q5_quotas_logements_abordables: 'N',           // Préfère autres solutions
    q6_densification_quartiers: 'N',               // Neutre
    q7_etalement_urbain: 'PA',                     // Pour le développement équilibré
    q8_stationnements_centre_ville: 'PA',          // Pour l'automobile
    q9_protection_espaces_verts: 'PA',             // Pour la protection
    q10_transition_carboneutre: 'N',               // Neutre (pragmatisme)
    q11_collecte_residus_alimentaires: 'N',        // Si rentable
    q12_augmentation_taxes: 'PD',                  // Contre les hausses
    q13_participation_citoyenne: 'PA',             // Pour la consultation
    q14_reduction_dette: 'PA',                     // Pour la réduction
    q15_avantages_fiscaux_entreprises: 'PA',       // Pour l'attraction
    q16_achat_local: 'PD',                         // Libre marché
    q17_soutien_organismes_communautaires: 'N',    // ✏️ CORRIGÉ : Selon les budgets (non confirmé publiquement)
    q18_augmentation_effectifs_policiers: 'PA',    // Pour la sécurité
    q19_cameras_surveillance: 'PA',                // Pour la sécurité
    q20_couvre_feu: 'PA',                          // Mesures de sécurité
  },

  'respect_citoyens': {
    // Stéphane Lachance - Conservateur-populiste, localiste ✏️ MISE À JOUR selon plateforme électorale
    q1_tramway: 'FD',                              // 🟥 S'oppose aux grands projets jugés coûteux
    q2_pistes_cyclables: 'PD',                     // 🟧 Critique la perte de voies pour automobilistes
    q3_troisieme_lien: 'FA',                       // 🟩 Projet prioritaire du parti
    q4_secteur_prive_transport: 'PA',              // 🟧 Ouvert aux modèles mixtes avec supervision
    q5_quotas_logements_abordables: 'N',           // 🟨 Rejette quotas obligatoires mais reconnaît le besoin
    q6_densification_quartiers: 'FD',              // 🟥 Opposé à densification imposée
    q7_restrictions_airbnb: 'FD',                  // 🟥 Défend liberté d'usage des propriétés
    q8_assouplissement_zonage: 'FA',               // 🟩 Réduire freins bureaucratiques
    q9_protection_espaces_verts: 'PA',             // 🟧 Favorise milieux sains sans lourdeur réglementaire
    q10_transition_carboneutre: 'FD',              // 🟥 S'oppose aux plans jugés idéologiques
    q11_reduction_dechets: 'N',                    // 🟨 Thème secondaire dans plateforme
    q12_augmentation_taxes: 'FD',                  // 🟥 Refus clair de toute hausse
    q13_pouvoir_conseils_quartier: 'PD',           // 🟧 Méfiance envers structures intermédiaires
    q14_reduction_dette: 'FA',                     // 🟩 Objectif majeur : saine gestion
    q15_avantages_fiscaux_entreprises: 'FA',       // 🟩 Stimuler économie locale
    q16_limitation_touristes: 'N',                 // 🟨 Souhaite retombées économiques équilibrées
    q17_soutien_organismes_communautaires: 'PA',   // 🟧 Appuie services proximité sans excès
    q18_augmentation_effectifs_policiers: 'N',     // 🟨 Priorise prévention et services proximité
    q19_investissement_infrastructures_loisirs_sportives: 'FA', // 🟩 Installations accessibles ancrées quartiers
    q20_protection_patrimoine: 'PA',               // 🟧 Valorise patrimoine sans approche contraignante
    q21_enjeux_prioritaires: 'FA',                 // 🟩 3e lien, fiscalité, développement économique, participation
  },

  'equipe_priorite_quebec': {
    // Stevens Melançon - Centre-droit prudent, gestionnaire ✏️ CORRIGÉ selon feedback agent AI
    q1_tramway: 'N',                               // ✏️ Agent AI : Neutre (héritiers Québec 21, critiques mais pas fermement opposés)
    q2_pistes_cyclables: 'PA',                     // Pour le transport actif
    q3_troisieme_lien: 'PA',                       // Pour le développement
    q4_secteur_prive_transport: 'PA',              // Mix public-privé
    q5_quotas_logements_abordables: 'N',           // ✏️ CORRIGÉ : Solutions variées
    q6_densification_quartiers: 'N',               // ✏️ Agent AI : Neutre (gestionnaire plutôt qu'idéologue)
    q7_etalement_urbain: 'PD',                     // Contre l'étalement
    q8_stationnements_centre_ville: 'FA',          // Pour l'automobile
    q9_protection_espaces_verts: 'N',              // ✏️ CORRIGÉ : Neutre
    q10_transition_carboneutre: 'N',               // ✏️ Agent AI : Neutre (neutres ou silencieux)
    q11_collecte_residus_alimentaires: 'N',        // ✏️ Agent AI : Neutre (non abordé)
    q12_augmentation_taxes: 'PD',                  // ✏️ ÉQUILIBRÉ : Contre hausses mais pas extrême
    q13_participation_citoyenne: 'N',              // Selon les besoins
    q14_reduction_dette: 'PA',                     // ✏️ ÉQUILIBRÉ : Gestionnaire responsable
    q15_avantages_fiscaux_entreprises: 'PA',       // ✏️ ÉQUILIBRÉ : Pour développement mesuré
    q16_achat_local: 'FD',                         // Contre interventions
    q17_soutien_organismes_communautaires: 'PA',   // ✏️ ÉQUILIBRÉ : Soutien ciblé efficace
    q18_augmentation_effectifs_policiers: 'FA',    // Pour la sécurité
    q19_cameras_surveillance: 'PA',                // Pour la sécurité
    q20_couvre_feu: 'N',                          // Selon les circonstances
  },

  'leadership_quebec': {
    // Sam Hamad - Centre-droit pragmatique et technocratique ✏️ MISE À JOUR selon déclarations publiques 2025
    q1_tramway: 'PD',                              // 🟧 « Je ne suis pas contre, mais ce n'est pas un bon projet pour le moment »
    q2_pistes_cyclables: 'FD',                     // 🟥 Accuse Marchand d'« une guerre à l'auto »
    q3_troisieme_lien: 'PA',                       // 🟧 Appui au SRB pour connecter banlieues
    q4_secteur_prive_transport: 'N',               // 🟨 Aucun soutien explicite aux partenariats privé-public mentionné
    q5_quotas_logements_abordables: 'PD',          // 🟧 Peu d'intérêt pour les mesures interventionnistes
    q6_densification_quartiers: 'N',               // 🟨 N'aborde pas clairement la question
    q7_restrictions_airbnb: 'N',                   // 🟨 Non abordé dans les communiqués
    q8_assouplissement_zonage: 'PA',               // 🟧 Compatible avec logique de simplification réglementaire
    q9_protection_espaces_verts: 'N',              // 🟨 Non mentionné dans la plateforme
    q10_transition_carboneutre: 'PD',              // 🟧 Pas d'objectifs annoncés, priorité à fiscalité/transports
    q11_reduction_dechets: 'N',                    // 🟨 Aucun programme ou priorité sur ce dossier
    q12_augmentation_taxes: 'FD',                  // 🟥 Promet abolition de la « taxe Marchand »
    q13_pouvoir_conseils_quartier: 'N',            // 🟨 Valorise écoute citoyenne sans appuyer structures formelles
    q14_reduction_dette: 'FA',                     // 🟩 Discours axé sur rigueur budgétaire
    q15_avantages_fiscaux_entreprises: 'PA',       // 🟧 Favorise attractivité économique
    q16_limitation_touristes: 'N',                 // 🟨 Non abordé dans la plateforme
    q17_soutien_organismes_communautaires: 'PA',   // 🟧 Valorise OBNL efficaces et engagement citoyen
    q18_augmentation_effectifs_policiers: 'N',     // 🟨 Aucun engagement clair sur augmentation/réduction
    q19_investissement_infrastructures_loisirs_sportives: 'PA', // 🟧 Projets pour tous quartiers et jeunes familles
    q20_protection_patrimoine: 'N',                // 🟨 Non abordé dans plateforme 2025
    q21_enjeux_prioritaires: 'PA',                 // 🟧 Mobilité (SRB), rigueur fiscale, relance économique, implication
  },

  'alliance_citoyenne': {
    // Alain Giasson / Daniel Brisson - Centre-droit libertarien
    q1_tramway: 'PD',                              // Plutôt contre (révision complète nécessaire)
    q2_pistes_cyclables: 'PA',                     // Pour mais approche équilibrée
    q3_troisieme_lien: 'FA',                       // Fortement pour (projet spécifique jetée Beauport-Île d'Orléans)
    q4_secteur_prive_transport: 'PA',              // Favorable aux partenariats public-privé
    q5_quotas_logements_abordables: 'PA',          // Soutient mesures pour augmenter l'offre
    q6_densification_quartiers: 'PD',              // Contre densification imposée (liberté choix résidentiel)
    q7_etalement_urbain: 'PA',                     // Pour libre choix développement résidentiel
    q8_stationnements_centre_ville: 'FA',          // Veut abolir les parcomètres
    q9_protection_espaces_verts: 'PA',             // Protection importante mais équilibrée
    q10_transition_carboneutre: 'PD',              // Sceptique des politiques climatiques coûteuses
    q11_collecte_residus_alimentaires: 'FD',       // Oppose mesures contraignantes citoyens
    q12_augmentation_taxes: 'FD',                  // Fortement contre (veut réduire taxes)
    q13_participation_citoyenne: 'FA',             // Retour autonomie aux citoyens
    q14_reduction_dette: 'PA',                     // Réduction dépenses publiques
    q15_avantages_fiscaux_entreprises: 'PA',       // Développement économique pro-entreprise
    q16_achat_local: 'PD',                         // Contre intervention marché (libre marché)
    q17_soutien_organismes_communautaires: 'PD',   // Préfère initiatives privées (réduction intervention)
    q18_augmentation_effectifs_policiers: 'PA',    // Sécurité publique (tendance conservatrice)
    q19_cameras_surveillance: 'PA',                // Technologie sécuritaire acceptable
    q20_couvre_feu: 'PD',                         // Contre mesures restrictives libertés individuelles
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