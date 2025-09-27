/**
 * CALCULATEUR POLITIQUE UNIVERSEL - ARCHITECTURE BASE DE DONNÉES
 *
 * Remplace political-map-calculator.ts avec une approche dynamique :
 * - Configuration politique stockée en DB (colonnes political_*)
 * - Support automatique de toutes les municipalités
 * - Maintenance simplifiée sans redéploiement
 *
 * Date: 2025-09-24
 * Version: 1.0 - Architecture DB
 */

import { createClient } from '@/lib/supabase/client'
import {
  PoliticalPosition,
  UserAnswers,
  calculatePoliticalDistance,
  calculatePriorityCompatibility,
  calculateExactCompatibility,
  calculateMapBounds,
  normalizePositionForDisplay,
  calculateUserPoliticalPosition as legacyCalculateUserPoliticalPosition
} from '@/lib/political-map-calculator'

// ==============================================================================
// TYPES ET INTERFACES
// ==============================================================================

/**
 * Interface pour les questions avec paramètres politiques (depuis DB)
 */
interface QuestionWithPolitics {
  id: string
  political_axis: 'economic' | 'social' | 'neutral'
  political_weight: number
  political_interpretation: string
  score_inversion: boolean
}

/**
 * Valeurs numériques pour les positions d'accord (réutilisées de l'ancien système)
 */
const agreementScoreValues: Record<string, number> = {
  FA: 2,    // Fortement d'accord
  PA: 1,    // Plutôt d'accord
  N: 0,     // Neutre
  PD: -1,   // Plutôt en désaccord
  FD: -2,   // Fortement en désaccord
  IDK: 0,   // Ne sais pas (traité comme neutre)
}

/**
 * Calcule le score politique correct basé sur l'interprétation politique de la question
 * CETTE FONCTION CORRIGE LE BUG : elle utilise political_interpretation pour orienter correctement
 *
 * @param userAnswer Réponse de l'utilisateur (FA, PA, N, PD, FD)
 * @param politicalInterpretation Type d'interprétation (interventionist, free_market, progressive, conservative, etc.)
 * @param politicalAxis Axe politique (economic ou social)
 * @returns Score orienté correctement selon l'interprétation
 */
function getScoreByInterpretation(
  userAnswer: string,
  politicalInterpretation: string,
  politicalAxis: 'economic' | 'social'
): number {
  const baseScore = agreementScoreValues[userAnswer]
  if (baseScore === undefined) return 0

  // LOGIQUE ÉCONOMIQUE
  if (politicalAxis === 'economic') {
    switch (politicalInterpretation) {
      case 'interventionist':
        // FA à une question interventionniste = plus d'intervention = GAUCHE (-)
        // FD à une question interventionniste = moins d'intervention = DROITE (+)
        return -baseScore

      case 'free_market':
      case 'conservative':
        // FA à une question free_market = plus de libre marché = DROITE (+)
        // FD à une question free_market = moins de libre marché = GAUCHE (-)
        return baseScore

      default:
        console.warn(`⚠️ [Score] Interprétation économique inconnue: ${politicalInterpretation}`)
        return baseScore
    }
  }

  // LOGIQUE SOCIALE
  if (politicalAxis === 'social') {
    switch (politicalInterpretation) {
      case 'progressive':
        // FA à une question progressive = plus progressiste = HAUT (+)
        // FD à une question progressive = moins progressiste = BAS (-)
        return baseScore

      case 'conservative':
        // FA à une question conservative = plus conservateur = BAS (-)
        // FD à une question conservative = moins conservateur = HAUT (+)
        return -baseScore

      case 'decentralization':
        // FA à décentralisation = plus de pouvoir local = légèrement progressiste
        return baseScore * 0.5

      default:
        console.warn(`⚠️ [Score] Interprétation sociale inconnue: ${politicalInterpretation}`)
        return baseScore
    }
  }

  return baseScore
}

/**
 * Configuration de cache pour optimiser les performances
 */
const configCache = new Map<string, CacheEntry>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Structure du cache avec timestamp
 */
interface CacheEntry {
  data: QuestionWithPolitics[]
  timestamp: number
}

// ==============================================================================
// FONCTIONS PRINCIPALES
// ==============================================================================

/**
 * FONCTION UNIVERSELLE - Calcule la position politique de n'importe quelle municipalité
 * Remplace calculateUserPoliticalPosition() avec support municipal dynamique
 *
 * @param userAnswers Réponses de l'utilisateur aux questions
 * @param municipality ID de la municipalité (ex: 'quebec', 'montreal')
 * @param useCache Utiliser le cache pour optimiser les performances (défaut: true)
 * @returns Position politique calculée dynamiquement depuis la DB
 */
export async function calculateUserPoliticalPosition(
  userAnswers: UserAnswers,
  municipality: string,
  useCache: boolean = true
): Promise<PoliticalPosition> {
  try {
    console.log(`🔄 [Calculator-DB] Calcul position pour ${municipality}`)

    // Log détaillé pour débugger
    console.log(`🔍 [Calculator-DB-DEBUG] userAnswers reçu:`, {
      count: Object.keys(userAnswers).length,
      keys: Object.keys(userAnswers),
      values: Object.values(userAnswers),
      sample: Object.entries(userAnswers).slice(0, 3).map(([k, v]) => `${k}: ${v}`)
    })

    // 1. Récupérer la configuration politique depuis la DB
    const questions = await getPoliticalQuestionsFromDB(municipality, useCache)

    if (questions.length === 0) {
      console.warn(`⚠️ [Calculator-DB] Aucune question politique trouvée pour ${municipality}`)

      // FALLBACK : Utiliser l'ancien système pour Quebec
      if (municipality === 'quebec' || municipality === 'Quebec') {
        console.log(`🔄 [Calculator-DB] Fallback vers ancien système pour Quebec`)
        return legacyCalculateUserPoliticalPosition(userAnswers)
      }

      return { x: 0, y: 0 }
    }

    // 2. Grouper par axe politique
    const economicQuestions = questions.filter(q => q.political_axis === 'economic')
    const socialQuestions = questions.filter(q => q.political_axis === 'social')

    console.log(`📊 [Calculator-DB] Questions trouvées:`, {
      municipality,
      total: questions.length,
      economic: economicQuestions.length,
      social: socialQuestions.length
    })

    // 3. Calculer chaque axe dynamiquement
    const x = calculateAxisFromDB(userAnswers, economicQuestions, 'economic')
    const y = calculateAxisFromDB(userAnswers, socialQuestions, 'social')

    const position = { x, y }
    console.log(`✅ [Calculator-DB] Position calculée pour ${municipality}:`, position)

    return position

  } catch (error) {
    console.error(`❌ [Calculator-DB] Erreur pour ${municipality}:`, error)

    // FALLBACK : Utiliser l'ancien système pour Quebec
    if (municipality === 'quebec' || municipality === 'Quebec') {
      console.log(`🔄 [Calculator-DB] Fallback vers ancien système pour Quebec (erreur)`)
      return legacyCalculateUserPoliticalPosition(userAnswers)
    }

    return { x: 0, y: 0 }
  }
}

/**
 * Calcule la position sur un axe politique donné basé sur les données DB
 * Logique générique qui remplace les configurations hardcodées
 *
 * @param userAnswers Réponses utilisateur
 * @param questions Questions avec configuration politique
 * @param axisType Type d'axe (pour logs/debug uniquement)
 * @returns Position calculée sur l'axe (-100 à +100)
 */
function calculateAxisFromDB(
  userAnswers: UserAnswers,
  questions: QuestionWithPolitics[],
  axisType: string
): number {
  let totalWeightedScore = 0
  let totalWeight = 0
  let processedQuestions = 0

  questions.forEach(({ id, political_weight, score_inversion, political_interpretation, political_axis }) => {
    const userAnswer = userAnswers[id]

    // Log détaillé pour débugger
    if (axisType === 'economic' && processedQuestions < 3) {
      console.log(`🔍 [Calculator-DB-DEBUG] Question ${id}:`, {
        userAnswer,
        hasAnswer: userAnswer !== undefined,
        isIDK: userAnswer === 'IDK',
        politicalInterpretation: political_interpretation,
        scoreInversion: score_inversion
      })
    }

    if (userAnswer && userAnswer !== 'IDK') {
      // NOUVELLE LOGIQUE : Utiliser political_interpretation pour calculer le score correct
      let score = getScoreByInterpretation(userAnswer, political_interpretation, political_axis)

      if (score === undefined) {
        console.warn(`⚠️ [Calculator-DB] Score inconnu pour ${userAnswer} sur question ${id}`)
        return
      }

      // NOTE: score_inversion est maintenant géré dans getScoreByInterpretation
      // donc on n'applique plus d'inversion manuelle ici
      if (score_inversion) {
        console.log(`🔍 [Calculator-DB-DEBUG] Score inversion appliquée pour ${id}: ${score} → ${-score}`)
        score = -score
      }

      totalWeightedScore += score * political_weight
      totalWeight += political_weight
      processedQuestions++

      // Log supplémentaire pour comprendre le calcul
      if (axisType === 'economic' && processedQuestions <= 3) {
        console.log(`📊 [Calculator-DB-DEBUG] ${id}: ${userAnswer} + ${political_interpretation} = score ${score} (weight: ${political_weight})`)
      }
    }
  })

  if (totalWeight === 0) {
    console.warn(`⚠️ [Calculator-DB] Aucune question répondue pour l'axe ${axisType}`)
    return 0
  }

  // Normalisation sur [-100, +100] (même logique que l'ancien système)
  const normalizedScore = (totalWeightedScore / totalWeight) * 50
  const finalScore = Math.max(-100, Math.min(100, normalizedScore))

  console.log(`📊 [Calculator-DB] Calcul axe ${axisType}:`, {
    questions: questions.length,
    processed: processedQuestions,
    totalWeight,
    score: finalScore
  })

  return finalScore
}

// ==============================================================================
// RÉCUPÉRATION DES DONNÉES DB
// ==============================================================================

/**
 * Récupère les questions avec leurs paramètres politiques depuis Supabase
 * Utilise un cache pour optimiser les performances
 *
 * @param municipality ID de la municipalité
 * @param useCache Utiliser le cache (défaut: true)
 * @returns Questions avec configuration politique
 */
async function getPoliticalQuestionsFromDB(
  municipality: string,
  useCache: boolean = true
): Promise<QuestionWithPolitics[]> {
  const cacheKey = `political_questions_${municipality}`

  // Vérifier le cache
  if (useCache && configCache.has(cacheKey)) {
    const cached = configCache.get(cacheKey) as CacheEntry
    const now = Date.now()

    if (now - cached.timestamp < CACHE_DURATION) {
      console.log(`🚀 [Calculator-DB] Cache hit pour ${municipality}`)
      return cached.data
    } else {
      configCache.delete(cacheKey)
    }
  }

  try {
    const supabase = createClient()

    // Requête optimisée avec les nouvelles colonnes politiques
    const { data: questions, error } = await supabase
      .from('questions')
      .select(`
        id,
        political_axis,
        political_weight,
        political_interpretation,
        score_inversion
      `)
      .eq('municipality_id', municipality)
      .not('political_axis', 'eq', 'neutral') // Exclure les questions neutres
      .order('id')

    if (error) {
      console.error(`❌ [Calculator-DB] Erreur Supabase pour ${municipality}:`, error)
      throw new Error(`Database error: ${error.message}`)
    }

    if (!questions || questions.length === 0) {
      console.warn(`⚠️ [Calculator-DB] Aucune question politique en DB pour ${municipality}`)
      return []
    }

    // Valider les données récupérées
    const validQuestions = questions.filter(q => {
      if (!q.id || !q.political_axis || typeof q.political_weight !== 'number') {
        console.warn(`⚠️ [Calculator-DB] Question invalide ignorée:`, q)
        return false
      }
      return true
    }) as QuestionWithPolitics[]

    // Mettre en cache
    if (useCache) {
      configCache.set(cacheKey, {
        data: validQuestions,
        timestamp: Date.now()
      })
    }

    console.log(`✅ [Calculator-DB] ${validQuestions.length} questions politiques chargées pour ${municipality}`)
    return validQuestions

  } catch (error) {
    console.error(`❌ [Calculator-DB] Erreur récupération questions ${municipality}:`, error)
    throw error
  }
}

// ==============================================================================
// FONCTIONS UTILITAIRES ET COMPATIBILITÉ
// ==============================================================================

/**
 * Détermine une description textuelle de la position politique
 * Réutilise la logique générique de l'ancien système
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
 * Fonction de diagnostic pour valider la configuration d'une municipalité
 * Utile pour débogage et validation des données politiques
 */
export async function diagnosePoliticalConfiguration(municipality: string): Promise<{
  municipality: string
  totalQuestions: number
  economicQuestions: number
  socialQuestions: number
  neutralQuestions: number
  avgWeight: number
  weightDistribution: { low: number; medium: number; high: number }
  invertedQuestions: number
  sampleQuestions: Array<{ id: string; axis: string; weight: number; inverted: boolean }>
  configurationStatus: 'complete' | 'partial' | 'missing'
}> {
  try {
    const supabase = createClient()

    // Récupérer TOUTES les questions (politiques et neutres) pour diagnostic complet
    const { data: questions, error } = await supabase
      .from('questions')
      .select(`
        id,
        political_axis,
        political_weight,
        political_interpretation,
        score_inversion
      `)
      .eq('municipality_id', municipality)
      .order('id')

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    if (!questions || questions.length === 0) {
      return {
        municipality,
        totalQuestions: 0,
        economicQuestions: 0,
        socialQuestions: 0,
        neutralQuestions: 0,
        avgWeight: 0,
        weightDistribution: { low: 0, medium: 0, high: 0 },
        invertedQuestions: 0,
        sampleQuestions: [],
        configurationStatus: 'missing'
      }
    }

    // Analyser la configuration
    const economicQuestions = questions.filter(q => q.political_axis === 'economic').length
    const socialQuestions = questions.filter(q => q.political_axis === 'social').length
    const neutralQuestions = questions.filter(q => q.political_axis === 'neutral').length

    const politicalQuestions = questions.filter(q => q.political_axis !== 'neutral')
    const avgWeight = politicalQuestions.length > 0
      ? politicalQuestions.reduce((sum, q) => sum + (q.political_weight || 1), 0) / politicalQuestions.length
      : 0

    const weightDistribution = {
      low: politicalQuestions.filter(q => (q.political_weight || 1) < 1.0).length,
      medium: politicalQuestions.filter(q => (q.political_weight || 1) >= 1.0 && (q.political_weight || 1) <= 1.5).length,
      high: politicalQuestions.filter(q => (q.political_weight || 1) > 1.5).length
    }

    const invertedQuestions = politicalQuestions.filter(q => q.score_inversion).length

    const sampleQuestions = politicalQuestions.slice(0, 5).map(q => ({
      id: q.id,
      axis: q.political_axis || 'neutral',
      weight: q.political_weight || 1.0,
      inverted: q.score_inversion || false
    }))

    const configurationStatus =
      economicQuestions >= 3 && socialQuestions >= 3 ? 'complete' :
      economicQuestions >= 1 && socialQuestions >= 1 ? 'partial' :
      'missing'

    return {
      municipality,
      totalQuestions: questions.length,
      economicQuestions,
      socialQuestions,
      neutralQuestions,
      avgWeight: Math.round(avgWeight * 100) / 100,
      weightDistribution,
      invertedQuestions,
      sampleQuestions,
      configurationStatus
    }

  } catch (error) {
    console.error(`❌ [Diagnostic] Erreur pour ${municipality}:`, error)
    throw error
  }
}

/**
 * Vide le cache de configuration (utile pour développement/debug)
 */
export function clearPoliticalConfigCache(): void {
  configCache.clear()
  console.log('🧹 [Calculator-DB] Cache de configuration vidé')
}

// ==============================================================================
// EXPORTS DE COMPATIBILITÉ - Interface identique à l'ancien système
// ==============================================================================

// Réexporter toutes les fonctions utilitaires de l'ancien système
export {
  calculatePoliticalDistance,
  calculatePriorityCompatibility,
  calculateExactCompatibility,
  calculateMapBounds,
  normalizePositionForDisplay,
  type PoliticalPosition,
  type UserAnswers
}