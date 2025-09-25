// Types et interfaces communes pour les calculateurs politiques multi-municipalités

export type AgreementOptionKey = 'FA' | 'PA' | 'N' | 'PD' | 'FD' | 'IDK'

export interface PoliticalPosition {
  x: number // Axe économique : -100 (Interventionnisme) à +100 (Libre marché)
  y: number // Axe social/environnemental : -100 (Conservateur) à +100 (Progressiste)
}

export interface UserAnswers {
  [questionId: string]: AgreementOptionKey | undefined
}

export interface QuestionConfig {
  id: string
  weight: number
  interpretation?: 'progressive' | 'conservative' | 'interventionist' | 'free_market' | 'decentralization' | 'collaborative'
}

export interface AxisConfig {
  name: string
  leftLabel: string
  rightLabel: string
  questions: QuestionConfig[]
}

export interface MunicipalityAxisConfiguration {
  economic: AxisConfig
  social: AxisConfig
}

export interface MunicipalityCalculator {
  municipality: string
  axisConfiguration: MunicipalityAxisConfiguration
  calculatePosition: (userAnswers: UserAnswers) => PoliticalPosition
  getDescription: (position: PoliticalPosition) => string
  getSpecificities?: () => string[] // Particularités municipales
}

// Valeurs numériques pour les positions d'accord (réutilisées partout)
export const agreementScoreValues: Record<AgreementOptionKey, number> = {
  FA: 2,    // Fortement d'accord
  PA: 1,    // Plutôt d'accord
  N: 0,     // Neutre
  PD: -1,   // Plutôt en désaccord
  FD: -2,   // Fortement en désaccord
  IDK: 0,   // Ne sais pas (traité comme neutre)
}

// Types pour l'export des fonctions de calcul
export interface PoliticalCalculationResult {
  userPosition: PoliticalPosition
  description: string
  municipality: string
  specificities?: string[]
}