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
  'Stéphane Lachance': '/Leaders/Stephane_Lachance.png',
  'Jackie Smith': '/Leaders/Jackie_Smith.jpg',

  // Autres municipalités (à ajouter selon les données disponibles)
  // Montréal, Laval, Gatineau, Longueuil, Lévis...
}

/**
 * Récupère le chemin du logo d'un parti
 * @param partyId - ID du parti
 * @returns Chemin vers le logo ou placeholder
 */
export function getPartyLogo(partyId: string): string {
  return PARTY_LOGOS[partyId] || "/placeholder.svg?width=128&height=128&query=Logo+non+disponible"
}

/**
 * Récupère le chemin de la photo d'un leader
 * @param leaderName - Nom du leader
 * @returns Chemin vers la photo ou undefined si non disponible
 */
export function getLeaderPhoto(leaderName: string): string | undefined {
  return LEADER_PHOTOS[leaderName]
}

/**
 * Vérifie si un parti a un logo disponible
 * @param partyId - ID du parti
 * @returns true si le logo existe
 */
export function hasPartyLogo(partyId: string): boolean {
  return partyId in PARTY_LOGOS
}

/**
 * Vérifie si un leader a une photo disponible
 * @param leaderName - Nom du leader
 * @returns true si la photo existe
 */
export function hasLeaderPhoto(leaderName: string): boolean {
  return leaderName in LEADER_PHOTOS
}