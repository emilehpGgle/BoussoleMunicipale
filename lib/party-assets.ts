// lib/party-assets.ts
// Mapping statique pour les logos et photos des partis/leaders
// Solution hybride : images hardcodées, données via API

/**
 * Mapping des logos de partis (par ID de parti)
 */
export const PARTY_LOGOS: Record<string, string> = {
  // Québec
  'alliance_citoyenne': '/logos/alliance-citoyenne.png',
  'equipe_priorite_quebec': '/logos/equipe-priorite-quebec-new.png',
  'leadership_quebec': '/logos/leadership-quebec-new.png',
  'quebec_dabord': '/logos/quebec-dabord-new.png',
  'quebec_forte_et_fiere': '/logos/quebec-forte-et-fiere-new.png',
  'respect_citoyens': '/logos/respect-citoyens-new.jpg',
  'transition_quebec': '/logos/transition-quebec-new.png',
  'parti_du_monde_quebec': '/logos/parti-du-monde.png',

  // Montréal
  'projet_montreal': '/logos/projet-montreal.png',
  'ensemble_montreal': '/logos/ensemble-montreal.png',
  'futur_montreal': '/logos/futur-montreal.png',
  'action_montreal': '/logos/action-montreal.png',
  'transition_montreal': '/logos/transition-montreal.png',

  // Laval
  'mouvement_lavallois': '/logos/mouvement-lavallois.png',
  'parti_laval': '/logos/parti-laval.png',
  'action_laval': '/logos/action-laval.png',

  // Gatineau
  'action_gatineau': '/logos/action-gatineau.png',
  'equipe_mario_aube': '/logos/equipe-mario-aube.png',

  // Longueuil
  'coalition_longueuil': '/logos/coalition-longueuil.jpg',
  'option_alliance': '/logos/option-alliance.png',

  // Lévis
  'levis_force_10': '/logos/levis-force-10.png',
  'repensons_levis': '/logos/repensons-levis.png',
  'prosperite_levis': '/logos/prosperite-levis.png',
}

/**
 * Mapping des photos de leaders (par nom de leader)
 */
export const LEADER_PHOTOS: Record<string, string> = {
  // Québec
  'Stevens Mélançon': '/Leaders/Stevens_Melancons.jpg',
  'Sam Hamad': '/Leaders/Sam_Hamad.jpg',
  'Claude Villeneuve': '/Leaders/Claude_Villeneuve.jpg',
  'Bruno Marchand': '/Leaders/Bruno_Marchand.jpg',
  'Stéphane Lachance': '/Leaders/Stephane_Lachance.jpg',
  'Jackie Smith': '/Leaders/Jackie_Smith.jpg',
  'Anne Guérette': '/Leaders/Anne_Guerette.jpg',

  // Autres municipalités (à ajouter selon les données disponibles)
  // Montréal, Laval, Gatineau, Longueuil, Lévis...
}

/**
 * Normalise un nom pour le système de fichiers
 * - Enlève les accents
 * - Remplace espaces par underscores
 * - Garde lettres, chiffres et underscores uniquement
 * @param name - Nom à normaliser
 * @returns Nom normalisé
 */
export function normalizeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/\s+/g, "_") // Remplace espaces par underscores
    .replace(/[^a-zA-Z0-9_-]/g, "") // Garde uniquement alphanumérique, - et _
}

/**
 * Génère dynamiquement le chemin d'un logo de parti
 * @param partyId - ID du parti (snake_case)
 * @returns Chemin vers le logo
 */
export function generatePartyLogoPath(partyId: string): string {
  return `/logos/${partyId}.png`
}

/**
 * Génère dynamiquement le chemin d'une photo de leader
 * @param firstName - Prénom du leader
 * @param lastName - Nom de famille du leader
 * @returns Chemin vers la photo
 */
export function generateLeaderPhotoPath(firstName: string, lastName: string): string {
  const normalized = normalizeFileName(`${firstName}_${lastName}`)
  return `/Leaders/${normalized}.jpg`
}

/**
 * Récupère le chemin du logo d'un parti
 * @param partyId - ID du parti
 * @returns Chemin vers le logo ou placeholder
 */
export function getPartyLogo(partyId: string): string {
  return PARTY_LOGOS[partyId] || generatePartyLogoPath(partyId)
}

/**
 * Récupère le chemin de la photo d'un leader
 * @param leaderName - Nom complet du leader
 * @returns Chemin vers la photo ou undefined si non disponible
 */
export function getLeaderPhoto(leaderName: string): string | undefined {
  if (LEADER_PHOTOS[leaderName]) {
    return LEADER_PHOTOS[leaderName]
  }

  // Génération dynamique si non trouvé
  const parts = leaderName.split(' ')
  if (parts.length >= 2) {
    const firstName = parts[0]
    const lastName = parts.slice(1).join('_')
    return generateLeaderPhotoPath(firstName, lastName)
  }

  return undefined
}

/**
 * Vérifie si un parti a un logo disponible
 * @param partyId - ID du parti
 * @returns true si le logo existe dans le mapping
 */
export function hasPartyLogo(partyId: string): boolean {
  return partyId in PARTY_LOGOS
}

/**
 * Vérifie si un leader a une photo disponible
 * @param leaderName - Nom du leader
 * @returns true si la photo existe dans le mapping
 */
export function hasLeaderPhoto(leaderName: string): boolean {
  return leaderName in LEADER_PHOTOS
}