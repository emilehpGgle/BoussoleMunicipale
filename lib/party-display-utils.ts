/**
 * Utilitaires pour l'affichage des partis politiques
 * Gestion des initiales, logos et représentation visuelle
 */

export interface PartyDisplayInfo {
  name: string
  shortName?: string
}

/**
 * Génère les initiales intelligentes d'un nom de parti
 * @param name - Nom complet du parti
 * @returns Initiales en majuscules (ex: "Respect citoyens" → "RC")
 */
export const generatePartyInitials = (name: string): string => {
  // Mots à ignorer lors de la génération d'initiales
  const stopWords = [
    'de', 'du', 'la', 'le', 'les', 'des', 'et', 'pour', 'avec', 'sans',
    'dans', 'sur', 'sous', 'vers', 'par', 'chez', 'en', 'à', 'au', 'aux'
  ]

  return name
    .split(' ')
    .filter(word => word.length > 0 && !stopWords.includes(word.toLowerCase()))
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * Obtient les initiales d'un parti (utilise shortName en priorité, sinon génère depuis le nom)
 * @param party - Objet parti avec name et shortName optionnel
 * @returns Initiales à afficher
 */
export const getPartyInitials = (party: PartyDisplayInfo): string => {
  if (party.shortName && party.shortName.trim()) {
    return party.shortName.toUpperCase()
  }
  return generatePartyInitials(party.name)
}

/**
 * Génère un nom court d'affichage pour un parti
 * @param party - Objet parti avec name et shortName optionnel
 * @returns Nom court à afficher (shortName ou nom tronqué intelligemment)
 */
export const getPartyShortName = (party: PartyDisplayInfo): string => {
  if (party.shortName && party.shortName.trim()) {
    return party.shortName
  }

  // Si pas de nom court, tronquer intelligemment le nom complet
  const name = party.name
  if (name.length <= 20) {
    return name
  }

  // Essayer de tronquer au niveau des mots
  const words = name.split(' ')
  if (words.length > 1) {
    // Prendre les premiers mots jusqu'à ~20 caractères
    let shortName = words[0]
    for (let i = 1; i < words.length; i++) {
      if ((shortName + ' ' + words[i]).length <= 20) {
        shortName += ' ' + words[i]
      } else {
        break
      }
    }
    return shortName
  }

  // Fallback: tronquer brutalement
  return name.substring(0, 17) + '...'
}

/**
 * Exemples de résultats pour tests et documentation
 */
export const PARTY_INITIALS_EXAMPLES = {
  "Respect citoyens": "RC",
  "Alliance citoyenne de Québec": "ACQ",
  "Équipe priorité Québec": "EPQ",
  "Québec d'abord": "QD",
  "Québec forte et fière": "QFF",
  "Leadership Québec": "LQ",
  "Transition Québec": "TQ"
} as const