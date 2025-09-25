// Interface publique et factory pattern pour les calculateurs politiques multi-municipalités

import type {
  UserAnswers,
  PoliticalPosition,
  PoliticalCalculationResult,
  MunicipalityCalculator
} from './types'

// Import dynamique des calculateurs (seront créés dans les prochaines étapes)
// import { quebecCalculator } from './quebec'
// import { montrealCalculator } from './montreal'
// import { gatineauCalculator } from './gatineau'
// import { lavalCalculator } from './laval'

/**
 * INTERFACE PUBLIQUE PRINCIPALE
 * Remplace l'ancienne fonction calculateUserPoliticalPosition
 */
export function calculateUserPoliticalPosition(
  userAnswers: UserAnswers,
  municipality: string
): PoliticalPosition {
  const calculator = getCalculator(municipality)
  return calculator.calculatePosition(userAnswers)
}

/**
 * Calcule la position politique avec description complète
 */
export function calculatePoliticalResult(
  userAnswers: UserAnswers,
  municipality: string
): PoliticalCalculationResult {
  const calculator = getCalculator(municipality)
  const position = calculator.calculatePosition(userAnswers)
  const description = calculator.getDescription(position)

  return {
    userPosition: position,
    description,
    municipality,
    specificities: calculator.getSpecificities?.()
  }
}

/**
 * Détermine une description textuelle de la position politique
 * Interface publique avec support municipal
 */
export function getPoliticalPositionDescription(
  position: PoliticalPosition,
  municipality: string
): string {
  const calculator = getCalculator(municipality)
  return calculator.getDescription(position)
}

/**
 * Obtient les spécificités politiques d'une municipalité
 */
export function getMunicipalitySpecificities(municipality: string): string[] {
  const calculator = getCalculator(municipality)
  return calculator.getSpecificities?.() || []
}

/**
 * Liste des municipalités supportées
 */
export function getSupportedMunicipalities(): string[] {
  return ['quebec', 'montreal', 'gatineau', 'laval', 'longueuil', 'levis']
}

/**
 * Vérifie si une municipalité est supportée
 */
export function isMunicipalitySupported(municipality: string): boolean {
  return getSupportedMunicipalities().includes(municipality.toLowerCase())
}

/**
 * FACTORY PATTERN - Sélectionneur de calculateur
 * Point central qui détermine quel calculateur utiliser
 */
function getCalculator(municipality: string): MunicipalityCalculator {
  const municipalityLower = municipality.toLowerCase()

  switch (municipalityLower) {
    case 'quebec':
      // return quebecCalculator // Sera activé après migration
      throw new Error('Quebec calculator not yet migrated - use legacy system temporarily')

    case 'montreal':
      // return montrealCalculator // Sera activé après création
      throw new Error('Montreal calculator not yet implemented')

    case 'gatineau':
      // return gatineauCalculator // Sera activé après création
      throw new Error('Gatineau calculator not yet implemented')

    case 'laval':
      // return lavalCalculator // Sera activé après création
      throw new Error('Laval calculator not yet implemented')

    case 'longueuil':
      // return longueuilCalculator // Sera créé plus tard
      throw new Error('Longueuil calculator not yet implemented')

    case 'levis':
      // return levisCalculator // Sera créé plus tard
      throw new Error('Lévis calculator not yet implemented')

    default:
      console.warn(`Municipality '${municipality}' not supported, available: ${getSupportedMunicipalities().join(', ')}`)
      throw new Error(`Municipality '${municipality}' not supported`)
  }
}

/**
 * Fonction de diagnostic pour le développement
 * Aide à identifier les problèmes de configuration
 */
export function diagnoseCalculator(municipality: string, userAnswers: UserAnswers): {
  municipality: string
  supported: boolean
  hasAnswers: boolean
  answersCount: number
  sampleAnswers: Record<string, string>
  calculatorStatus: string
} {
  const supported = isMunicipalitySupported(municipality)
  const answers = Object.entries(userAnswers).filter(([, value]) => value && value !== 'IDK')

  let calculatorStatus = 'unknown'
  try {
    getCalculator(municipality)
    calculatorStatus = 'available'
  } catch (error) {
    calculatorStatus = error instanceof Error ? error.message : 'error'
  }

  return {
    municipality,
    supported,
    hasAnswers: answers.length > 0,
    answersCount: answers.length,
    sampleAnswers: Object.fromEntries(answers.slice(0, 3).filter(([, value]) => value !== undefined).map(([key, value]) => [key, String(value)])), // 3 premiers pour debug
    calculatorStatus
  }
}

// ============================================================================
// EXPORTS DE COMPATIBILITÉ LEGACY
// Ces exports maintiennent la compatibilité pendant la migration
// ============================================================================

/**
 * Export des fonctions utilitaires communes
 */
export {
  calculatePoliticalDistance,
  calculatePriorityCompatibility,
  calculateExactCompatibility,
  calculateMapBounds,
  normalizePositionForDisplay
} from './base-calculator'

/**
 * Export des types pour utilisation externe
 */
export type {
  UserAnswers,
  PoliticalPosition,
  AgreementOptionKey,
  QuestionConfig,
  AxisConfig,
  MunicipalityAxisConfiguration,
  MunicipalityCalculator,
  PoliticalCalculationResult
} from './types'

/**
 * Export des constantes utiles
 */
export { agreementScoreValues } from './types'