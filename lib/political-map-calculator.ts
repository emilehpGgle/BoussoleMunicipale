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
      { id: "q8_assouplissement_zonage", weight: 1.0 },       // Assouplissement zonage (+ = libre marché)
      { id: "q4_secteur_prive_transport", weight: 1.0 },      // Transport privé (+ = libre marché)
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
      { id: "q7_restrictions_airbnb", weight: 1.1 },         // Restrictions Airbnb (+ = progressiste)
      { id: "q6_densification_quartiers", weight: 1.0 },     // Densification (+ = progressiste)
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
        // Questions "libre marché" (q4, q8, q14, q15) : être d'accord = libre marché (score positif)
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
    q7_restrictions_airbnb: 'PA',                  // ✏️ NOUVEAU : Pour réguler Airbnb
    q8_assouplissement_zonage: 'PA',               // ✏️ NOUVEAU : Pour faciliter développement durable
    q9_protection_espaces_verts: 'PA',             // Protection environnement
    q10_transition_carboneutre: 'FA',              // Fortement pour la transition
    q11_reduction_dechets: 'PD',                   // Aligné nouvelle formulation : prioriser la collecte vs réduire les collectes (moins aligné)
    q12_augmentation_taxes: 'PA',                  // Accepte hausses pour services
    q13_pouvoir_conseils_quartier: 'PA',           // ✏️ CORRIGÉ : Pour la participation
    q14_reduction_dette: 'PD',                     // Investit massivement (réserve climat 1,17 milliards)
    q15_avantages_fiscaux_entreprises: 'PA',       // Vision économie-environnement intégrée
    q16_limitation_touristes: 'N',                 // ✏️ NOUVEAU : Position équilibrée sur tourisme
    q17_soutien_organismes_communautaires: 'PA',   // Soutien aux organismes
    q18_augmentation_effectifs_policiers: 'N',     // Neutre sur la police
    q19_investissement_infrastructures_loisirs_sportives: 'PA', // ✏️ NOUVEAU : Investissement services citoyens
    q20_protection_patrimoine: 'PA',               // ✏️ NOUVEAU : Protection patrimoine historique
    q21_enjeux_prioritaires: 'FA',                 // ✏️ NOUVEAU : Démocratisation, services, environnement
  },

  'transition_quebec': {
    // Jackie Smith - Parti écologiste municipal ambitieux ✏️ MISE À JOUR selon sources 2025
    q1_tramway: 'FA',                              // Fortement pour (transport durable)
    q2_pistes_cyclables: 'FA',                     // Fortement pour (mobilité verte)
    q3_troisieme_lien: 'FD',                       // "C'est tellement insultant... un projet qui n'a aucun sens" (juillet 2025)
    q4_secteur_prive_transport: 'FD',              // Oppose privatisation, veut gratuité transport en commun
    q5_quotas_logements_abordables: 'FA',          // "Le coût du logement sera un incontournable" (juin 2025)
    q6_densification_quartiers: 'FA',              // Fortement pour (contre étalement)
    q7_restrictions_airbnb: 'FA',                  // "Nous lutterons énergiquement contre... les locations de type Airbnb" (juin 2025)
    q8_assouplissement_zonage: 'PA',               // Pour faciliter logement abordable
    q9_protection_espaces_verts: 'FA',             // "L'enjeu numéro 1 des gens de Limoilou, c'est la qualité de l'air" (2022-2025)
    q10_transition_carboneutre: 'FA',              // "faire face aux changements climatiques" (mai 2025)
    q11_reduction_dechets: 'FD',                   // Aligné nouvelle formulation : contre prioriser collecte vs environnement
    q12_augmentation_taxes: 'N',                   // "Il faut alléger le fardeau des citoyens" vs financer transition
    q13_pouvoir_conseils_quartier: 'FA',           // "démocratie participative", sondages citoyens (mai 2025)
    q14_reduction_dette: 'PD',                     // Contre (investissements verts prioritaires)
    q15_avantages_fiscaux_entreprises: 'FD',       // Contre pression promoteurs immobiliers (juin 2025)
    q16_limitation_touristes: 'N',                 // Non abordé
    q17_soutien_organismes_communautaires: 'FA',   // Soutien Centre des femmes Basse-Ville (juin 2025)
    q18_augmentation_effectifs_policiers: 'PD',    // Contre (préfère prévention sociale)
    q19_investissement_infrastructures_loisirs_sportives: 'FA', // Pour équipements de proximité
    q20_protection_patrimoine: 'PA',               // Patrimoine culturel francophone prioritaire (juin 2025)
    q21_enjeux_prioritaires: 'FA',                 // Logement, mobilité, environnement, francophonie
  },

  'quebec_dabord': {
    // Claude Villeneuve - Centre-progressiste pragmatique ✏️ MISE À JOUR selon déclarations jan-mai 2025
    q1_tramway: 'PA',                              // 🟧 CORRIGÉ : "Si pour avoir le tramway, ça prend un 3e lien, deale me in" (appui conditionnel)
    q2_pistes_cyclables: 'N',                      // 🟨 CORRIGÉ : "Je ne déteste pas les pistes cyclables, au contraire" mais contre mauvaise implémentation
    q3_troisieme_lien: 'PA',                       // 🟧 CONFIRMÉ : "Prêt à appuyer s'il répond aux besoins" (navigation, intégration urbaine)
    q4_secteur_prive_transport: 'N',               // 🟨 Aucune mention explicite PPP/privatisation
    q5_quotas_logements_abordables: 'PA',          // 🟧 Soutient accélération logements abordables
    q6_densification_quartiers: 'PD',              // 🟧 Demande report projet dense Henri-Bourassa
    q7_restrictions_airbnb: 'N',                   // 🟨 Aucune déclaration retrouvée
    q8_assouplissement_zonage: 'PA',               // 🟧 Favorise souplesse pour accélérer constructions
    q9_protection_espaces_verts: 'PA',             // 🟧 Appui corridor vert Maizerets
    q10_transition_carboneutre: 'PA',              // 🟧 CORRIGÉ : "Il faut adapter nos tuyaux, avoir une ville plus perméable" (adaptation climatique)
    q11_reduction_dechets: 'PA',                   // 🟧 CORRIGÉ : Exemple pavé alvéolé, perméabilisation urbaine
    q12_augmentation_taxes: 'PD',                  // 🟧 Critique hausses déguisées par tarifs
    q13_pouvoir_conseils_quartier: 'N',            // 🟨 CORRIGÉ : Met l'accent sur écoute citoyenne et proximité mais pas structures formelles
    q14_reduction_dette: 'PA',                     // 🟧 Appel gestion rigoureuse et simplifiée
    q15_avantages_fiscaux_entreprises: 'PA',       // 🟧 Favorise entrepreneuriat local
    q16_limitation_touristes: 'N',                 // 🟨 Pas de position recensée
    q17_soutien_organismes_communautaires: 'N',    // 🟨 Aucune mention spécifique financement accru
    q18_augmentation_effectifs_policiers: 'N',     // 🟨 Aucun commentaire public retrouvé
    q19_investissement_infrastructures_loisirs_sportives: 'PA', // 🟧 Favorable équipements proximité
    q20_protection_patrimoine: 'PA',               // 🟧 Opposé projets nuisibles quartiers patrimoniaux
    q21_enjeux_prioritaires: 'FA',                 // 🟩 Logement, transport fluide, services simplifiés
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
    q9_protection_espaces_verts: 'N',              // 🟨 Favorise milieux sains sans lourdeur réglementaire
    q10_transition_carboneutre: 'FD',              // 🟥 S'oppose aux plans jugés idéologiques
    q11_reduction_dechets: 'FA',                   // 🟩 Priorise la collecte vs réduction des collectes pour env.
    q12_augmentation_taxes: 'FD',                  // 🟥 Refus clair de toute hausse
    q13_pouvoir_conseils_quartier: 'PD',           // 🟧 Méfiance envers structures intermédiaires
    q14_reduction_dette: 'FA',                     // 🟩 Objectif majeur : saine gestion
    q15_avantages_fiscaux_entreprises: 'FA',       // 🟩 Stimuler économie locale
    q16_limitation_touristes: 'FD',                // 🟥 Contre limitations (soutien retombées économiques)
    q17_soutien_organismes_communautaires: 'PA',   // 🟧 Appuie services proximité sans excès
    q18_augmentation_effectifs_policiers: 'FA',    // 🟩 Patrouilles accrues et hausse budget police
    q19_investissement_infrastructures_loisirs_sportives: 'N',  // 🟨 Investissement actuel jugé suffisant
    q20_protection_patrimoine: 'PA',               // 🟧 Valorise patrimoine sans approche contraignante
    q21_enjeux_prioritaires: 'FA',                 // 🟩 3e lien, fiscalité, développement économique, participation
  },

  'equipe_priorite_quebec': {
    // Stevens Melançon - Centre-vert pragmatique ✏️ CORRECTION MAJEURE selon virage environnemental 2022-2025
    q1_tramway: 'FD',                               // ✏️ Opposition catégorique pour raisons environnementales (coupes d'arbres, îlots chaleur)
    q2_pistes_cyclables: 'PA',                     // Pour le transport actif
    q3_troisieme_lien: 'PA',                       // ✏️ Stevens favorable historiquement (déçu tracé échoisi) - position parti à clarifier
    q4_secteur_prive_transport: 'N',               // ✏️ CORRIGÉ : Neutre sur privatisation
    q5_quotas_logements_abordables: 'PA',          // ✏️ CORRIGÉ : Soutien logement abordable
    q6_densification_quartiers: 'PA',              // ✏️ CORRIGÉ : Pour développement durable
    q7_restrictions_airbnb: 'PA',                  // ✏️ NOUVEAU : Protection parc locatif
    q8_assouplissement_zonage: 'PA',               // Pour faciliter construction (mais avec acceptabilité sociale)
    q9_protection_espaces_verts: 'FA',             // ✏️ CORRIGÉ : Combat principal - "Ce sont des écosystèmes vivants" (2025)
    q10_transition_carboneutre: 'FA',              // ✏️ CORRIGÉ : "Questions environnementales une priorité" - virage écoresponsable
    q11_reduction_dechets: 'FA',                   // ✏️ CORRIGÉ : Cohérent avec virage écologique 2022
    q12_augmentation_taxes: 'N',                   // ✏️ CORRIGÉ : Équilibré fiscal
    q13_pouvoir_conseils_quartier: 'PA',           // ✏️ NOUVEAU : Démocratie participative
    q14_reduction_dette: 'N',                      // ✏️ CORRIGÉ : Gestionnaire équilibré
    q15_avantages_fiscaux_entreprises: 'N',        // ✏️ CORRIGÉ : Approche équilibrée
    q16_limitation_touristes: 'N',                 // ✏️ NOUVEAU : Position mesurée
    q17_soutien_organismes_communautaires: 'PA',   // Soutien cohésion sociale
    q18_augmentation_effectifs_policiers: 'N',     // ✏️ CORRIGÉ : Approche équilibrée sécurité
    q19_investissement_infrastructures_loisirs_sportives: 'PA', // ✏️ NOUVEAU : Services de proximité
    q20_protection_patrimoine: 'PA',               // ✏️ NOUVEAU : Préservation identité
    q21_enjeux_prioritaires: 'FA',                 // ✏️ Environnement + développement durable + acceptabilité sociale
  },

  'leadership_quebec': {
    // Sam Hamad - Centre-droit pragmatique et technocratique ✏️ MISE À JOUR selon déclarations publiques 2025
    q1_tramway: 'FD',                              // 🟥 Veut abandonner le projet malgré pénalités 153-371M$ (Journal Québec mai 2025)
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
    q14_reduction_dette: 'PA',                     // 🟧 Critique dette RTC (+59% 2021-2024) mais propose dépenses SRB (Journal Québec mai 2025)
    q15_avantages_fiscaux_entreprises: 'PD',       // 🟧 Liens CA Trudel Innovation (immobilier) - questions conflits intérêts (Journal Québec mai 2025)
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
    q7_restrictions_airbnb: 'FD',                  // ✏️ NOUVEAU : Fortement contre restrictions (libertés individuelles)
    q8_assouplissement_zonage: 'FA',               // ✏️ NOUVEAU : Pour réduction bureaucratie
    q9_protection_espaces_verts: 'PA',             // Protection importante mais équilibrée
    q10_transition_carboneutre: 'PD',              // Sceptique des politiques climatiques coûteuses
    q11_reduction_dechets: 'FD',                   // ✏️ CORRIGÉ : Oppose mesures contraignantes citoyens
    q12_augmentation_taxes: 'FD',                  // Fortement contre (veut réduire taxes)
    q13_pouvoir_conseils_quartier: 'FA',           // ✏️ CORRIGÉ : Retour autonomie aux citoyens
    q14_reduction_dette: 'PA',                     // Réduction dépenses publiques
    q15_avantages_fiscaux_entreprises: 'PA',       // Développement économique pro-entreprise
    q16_limitation_touristes: 'PD',                // ✏️ NOUVEAU : Contre limitations (liberté économique)
    q17_soutien_organismes_communautaires: 'PD',   // Préfère initiatives privées (réduction intervention)
    q18_augmentation_effectifs_policiers: 'PA',    // Sécurité publique (tendance conservatrice)
    q19_investissement_infrastructures_loisirs_sportives: 'PA', // ✏️ NOUVEAU : Services de proximité acceptables
    q20_protection_patrimoine: 'PD',               // ✏️ NOUVEAU : Contre mesures restrictives développement
    q21_enjeux_prioritaires: 'FA',                 // ✏️ NOUVEAU : Libertés individuelles, développement économique
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