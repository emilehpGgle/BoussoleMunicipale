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
    q11_collecte_residus_alimentaires: 'PA',       // Pour les services environnementaux
    q12_augmentation_taxes: 'PA',                  // Accepte hausses pour services
    q13_participation_citoyenne: 'PA',             // Pour la participation
    q14_reduction_dette: 'N',                      // Neutre (équilibre)
    q15_avantages_fiscaux_entreprises: 'N',        // Neutre
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
    // Stéphane Lachance - Populiste local, administration pragmatique ✏️ CORRIGÉ selon feedback agent AI
    q1_tramway: 'FD',                              // "Critique les grands projets coûteux"
    q2_pistes_cyclables: 'N',                      // ✏️ Agent AI : Neutre (pas d'opposition systématique)
    q3_troisieme_lien: 'FA',                       // Pour (développement économique)
    q4_secteur_prive_transport: 'PA',              // ✏️ ÉQUILIBRÉ : Pour efficacité mais pas idéologique
    q5_quotas_logements_abordables: 'N',           // ✏️ Agent AI : Neutre (pas d'opposition forte publique)
    q6_densification_quartiers: 'FD',              // Contre (préfère choix libre)
    q7_etalement_urbain: 'FD',                     // Contre l'étalement
    q8_stationnements_centre_ville: 'FA',          // Pour l'automobile
    q9_protection_espaces_verts: 'PA',             // ✏️ Agent AI : Pour qualité de vie de quartier
    q10_transition_carboneutre: 'N',               // ✏️ Agent AI : Neutre (pas de rejet explicite)
    q11_collecte_residus_alimentaires: 'N',        // ✏️ Agent AI : Neutre (aucune mention publique)
    q12_augmentation_taxes: 'FD',                  // "Réduction des taxes" (priorité)
    q13_participation_citoyenne: 'FD',             // Contre bureaucratie excessive
    q14_reduction_dette: 'PA',                     // ✏️ ÉQUILIBRÉ : Pour mais pas obsessionnel
    q15_avantages_fiscaux_entreprises: 'PA',       // ✏️ ÉQUILIBRÉ : Pour attraction mais mesuré
    q16_achat_local: 'FD',                         // Contre interventions
    q17_soutien_organismes_communautaires: 'N',    // ✏️ ÉQUILIBRÉ : Neutre (soutien ciblé possible)
    q18_augmentation_effectifs_policiers: 'FA',    // Pour (sécurité publique)
    q19_cameras_surveillance: 'PD',                // Plutôt contre
    q20_couvre_feu: 'N',                          // ✏️ Agent AI : Neutre (pas abordé publiquement)
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
    // André Simard - Centre-droit, efficacité et SRB ✏️ CORRIGÉ
    q1_tramway: 'PD',                              // Plutôt contre (propose SRB+ alternatif)
    q2_pistes_cyclables: 'PD',                     // ✏️ CORRIGÉ : Sam Hamad critique la réduction de voies automobiles
    q3_troisieme_lien: 'PA',                       // Pour le développement
    q4_secteur_prive_transport: 'N',               // ✏️ CORRIGÉ : Centré sur efficacité du SRB, pas idéologie privé
    q5_quotas_logements_abordables: 'PD',          // Préfère incitatifs
    q6_densification_quartiers: 'N',               // Planification
    q7_etalement_urbain: 'PD',                     // Contre l'étalement
    q8_stationnements_centre_ville: 'FA',          // Pour l'automobile
    q9_protection_espaces_verts: 'N',              // ✏️ CORRIGÉ : Neutre (aucune prise de position visible)
    q10_transition_carboneutre: 'N',               // ✏️ CORRIGÉ : Neutre (pas abordé publiquement)
    q11_collecte_residus_alimentaires: 'PD',       // Services selon efficacité
    q12_augmentation_taxes: 'FD',                  // Fortement contre
    q13_participation_citoyenne: 'PD',             // Préfère efficacité
    q14_reduction_dette: 'FA',                     // Fortement pour la santé fiscale
    q15_avantages_fiscaux_entreprises: 'FA',       // Fortement pour
    q16_achat_local: 'FD',                         // Libre marché
    q17_soutien_organismes_communautaires: 'PD',   // Préfère efficacité privée
    q18_augmentation_effectifs_policiers: 'FA',    // Pour la sécurité
    q19_cameras_surveillance: 'N',                 // Technologie selon efficacité
    q20_couvre_feu: 'N',                          // Selon circonstances
  },

  'alliance_citoyenne': {
    // Alain Giasson - Démocratie participative
    q1_tramway: 'PA',                              // Pour avec consultation
    q2_pistes_cyclables: 'PA',                     // Pour le transport actif
    q3_troisieme_lien: 'PD',                       // Contre (consultation citoyenne)
    q4_secteur_prive_transport: 'PD',              // Préfère public
    q5_quotas_logements_abordables: 'PA',          // Pour l'accessibilité
    q6_densification_quartiers: 'PA',              // Avec consultation
    q7_etalement_urbain: 'PD',                     // Contre
    q8_stationnements_centre_ville: 'PD',          // Pour transport collectif
    q9_protection_espaces_verts: 'PA',             // Protection importante
    q10_transition_carboneutre: 'PA',              // Pour la transition
    q11_collecte_residus_alimentaires: 'PA',       // Services aux citoyens
    q12_augmentation_taxes: 'N',                   // Selon consultation
    q13_participation_citoyenne: 'FA',             // Fortement pour
    q14_reduction_dette: 'N',                      // Équilibre
    q15_avantages_fiscaux_entreprises: 'N',        // Selon les cas
    q16_achat_local: 'PA',                         // Pour la communauté
    q17_soutien_organismes_communautaires: 'FA',   // Fortement pour
    q18_augmentation_effectifs_policiers: 'PD',    // Préfère prévention
    q19_cameras_surveillance: 'PD',                // Contre surveillance
    q20_couvre_feu: 'PD',                         // Contre mesures répressives
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