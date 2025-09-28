/**
 * Fonctions de transformation pour les données Supabase vers les formats attendus par l'application
 */

import { AgreementOptionKey } from '@/lib/boussole-data'
import { UserAnswers } from '@/lib/political-map-calculator'

/**
 * Interface pour les positions de parti avec détails (depuis usePartyPositions)
 */
interface PartyPositionWithDetails {
  questionId: string
  position: AgreementOptionKey | "?"
  party: {
    id: string
    name: string
    shortName: string | null
    leader: string
    logoUrl: string
    color: string
    municipalityId: string
    municipalityName: string | undefined
  } | null
  question: {
    id: string
    text: string
    category: string
    responseType: string
    orderIndex: number
    municipalityId: string
    isGeneric: boolean
  } | null
}

/**
 * Transforme les positions d'un parti depuis Supabase vers le format UserAnswers
 * utilisé par les fonctions de calcul politique
 *
 * @param positions - Tableau des positions du parti depuis Supabase
 * @returns UserAnswers - Object avec questionId comme clé et position comme valeur
 */
export function transformPartyPositionsToUserAnswers(
  positions: PartyPositionWithDetails[]
): UserAnswers {
  const userAnswers: UserAnswers = {}

  positions.forEach((position) => {
    // On ne prend que les positions avec une réponse valide (pas "?")
    if (position.position !== "?" && position.questionId) {
      userAnswers[position.questionId] = position.position as AgreementOptionKey
    }
  })

  return userAnswers
}

/**
 * Transforme les positions de tous les partis depuis Supabase vers le format
 * Record<partyId, UserAnswers> utilisé par calculatePartyPositions()
 *
 * @param positionsByParty - Positions groupées par parti depuis usePartyPositions
 * @returns Record<partyId, UserAnswers> - Format utilisé par calculatePartyPositions()
 */
export function transformAllPartyPositionsToUserAnswers(
  positionsByParty: Record<string, PartyPositionWithDetails[]>
): Record<string, UserAnswers> {
  const allPartyAnswers: Record<string, UserAnswers> = {}

  Object.entries(positionsByParty).forEach(([partyId, positions]) => {
    const transformed = transformPartyPositionsToUserAnswers(positions)


    allPartyAnswers[partyId] = transformed
  })

  return allPartyAnswers
}

/**
 * Debug: Affiche les statistiques de transformation pour valider la conversion
 */
export function debugTransformation(
  original: Record<string, PartyPositionWithDetails[]>,
  transformed: Record<string, UserAnswers>
): void {
  console.log('🔄 [Transform Debug] Statistiques de transformation:')

  Object.keys(original).forEach(partyId => {
    const originalCount = original[partyId].length
    const transformedCount = Object.keys(transformed[partyId] || {}).length
    const excludedCount = originalCount - transformedCount

    console.log(`  📊 ${partyId}:`, {
      'positions Supabase': originalCount,
      'positions transformées': transformedCount,
      'positions exclues (?)': excludedCount
    })
  })
}