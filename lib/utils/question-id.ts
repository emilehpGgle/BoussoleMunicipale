/**
 * Utilitaires pour gérer les IDs de questions avec préfixe de municipalité
 */

// Mapping des municipalités vers leurs préfixes d'ID
const MUNICIPALITY_PREFIXES: Record<string, string> = {
  quebec: 'qc',
  montreal: 'mtl',
  laval: 'lav',
  gatineau: 'gat',
  longueuil: 'lng',
  levis: 'lev'
}

/**
 * Génère l'ID complet d'une question avec le préfixe de municipalité
 * @param municipality - Le nom de la municipalité (ex: 'montreal')
 * @param baseId - L'ID de base de la question (ex: 'q21_enjeux_prioritaires')
 * @returns L'ID complet avec préfixe (ex: 'mtl_q21_enjeux_prioritaires')
 */
export function getQuestionId(municipality: string, baseId: string): string {
  const prefix = MUNICIPALITY_PREFIXES[municipality]

  if (!prefix) {
    throw new Error(`Municipality not supported: ${municipality}. Supported: ${Object.keys(MUNICIPALITY_PREFIXES).join(', ')}`)
  }

  return `${prefix}_${baseId}`
}

/**
 * Génère l'ID de la question des priorités (Q21) pour une municipalité donnée
 * @param municipality - Le nom de la municipalité
 * @returns L'ID complet de la question des priorités
 */
export function getPriorityQuestionId(municipality: string): string {
  return getQuestionId(municipality, 'q21_enjeux_prioritaires')
}

/**
 * Extrait la municipalité et l'ID de base d'un ID complet de question
 * @param fullQuestionId - L'ID complet (ex: 'mtl_q21_enjeux_prioritaires')
 * @returns Un objet contenant la municipalité et l'ID de base
 */
export function parseQuestionId(fullQuestionId: string): { municipality: string; baseId: string } | null {
  const parts = fullQuestionId.split('_')
  if (parts.length < 2) return null

  const prefix = parts[0]
  const baseId = parts.slice(1).join('_')

  const municipality = Object.keys(MUNICIPALITY_PREFIXES).find(
    key => MUNICIPALITY_PREFIXES[key] === prefix
  )

  if (!municipality) return null

  return { municipality, baseId }
}

/**
 * Vérifie si un ID de question appartient à une municipalité donnée
 * @param questionId - L'ID de la question
 * @param municipality - La municipalité à vérifier
 * @returns true si l'ID appartient à cette municipalité
 */
export function isQuestionFromMunicipality(questionId: string, municipality: string): boolean {
  const prefix = MUNICIPALITY_PREFIXES[municipality]
  return prefix ? questionId.startsWith(`${prefix}_`) : false
}