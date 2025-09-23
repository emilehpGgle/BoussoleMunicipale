// lib/postal-code-mapping.ts

// Mapping des codes postaux vers les municipalités
export const postalCodeToMunicipality: Record<string, string> = {
  // Québec
  'G1A': 'quebec', 'G1B': 'quebec', 'G1C': 'quebec', 'G1E': 'quebec', 'G1F': 'quebec',
  'G1G': 'quebec', 'G1H': 'quebec', 'G1J': 'quebec', 'G1K': 'quebec', 'G1L': 'quebec',
  'G1M': 'quebec', 'G1N': 'quebec', 'G1P': 'quebec', 'G1R': 'quebec', 'G1S': 'quebec',
  'G1T': 'quebec', 'G1U': 'quebec', 'G1V': 'quebec', 'G1W': 'quebec', 'G1X': 'quebec',
  'G1Y': 'quebec', 'G1Z': 'quebec', 'G2A': 'quebec', 'G2B': 'quebec', 'G2C': 'quebec',
  'G2E': 'quebec', 'G2G': 'quebec', 'G2J': 'quebec', 'G2K': 'quebec', 'G2L': 'quebec',
  'G2M': 'quebec', 'G2N': 'quebec', 'G3E': 'quebec', 'G3G': 'quebec', 'G3H': 'quebec',
  'G3J': 'quebec', 'G3K': 'quebec',

  // Montréal
  'H1A': 'montreal', 'H1B': 'montreal', 'H1C': 'montreal', 'H1E': 'montreal', 'H1G': 'montreal',
  'H1H': 'montreal', 'H1J': 'montreal', 'H1K': 'montreal', 'H1L': 'montreal', 'H1M': 'montreal',
  'H1N': 'montreal', 'H1P': 'montreal', 'H1R': 'montreal', 'H1S': 'montreal', 'H1T': 'montreal',
  'H1V': 'montreal', 'H1W': 'montreal', 'H1X': 'montreal', 'H1Y': 'montreal', 'H1Z': 'montreal',
  'H2A': 'montreal', 'H2B': 'montreal', 'H2C': 'montreal', 'H2E': 'montreal', 'H2G': 'montreal',
  'H2H': 'montreal', 'H2J': 'montreal', 'H2K': 'montreal', 'H2L': 'montreal', 'H2M': 'montreal',
  'H2N': 'montreal', 'H2P': 'montreal', 'H2R': 'montreal', 'H2S': 'montreal', 'H2T': 'montreal',
  'H2V': 'montreal', 'H2W': 'montreal', 'H2X': 'montreal', 'H2Y': 'montreal', 'H2Z': 'montreal',
  'H3A': 'montreal', 'H3B': 'montreal', 'H3C': 'montreal', 'H3E': 'montreal', 'H3G': 'montreal',
  'H3H': 'montreal', 'H3J': 'montreal', 'H3K': 'montreal', 'H3L': 'montreal', 'H3M': 'montreal',
  'H3N': 'montreal', 'H3P': 'montreal', 'H3R': 'montreal', 'H3S': 'montreal', 'H3T': 'montreal',
  'H3V': 'montreal', 'H3W': 'montreal', 'H3X': 'montreal', 'H3Y': 'montreal', 'H3Z': 'montreal',
  'H4A': 'montreal', 'H4B': 'montreal', 'H4C': 'montreal', 'H4E': 'montreal', 'H4G': 'montreal',
  'H4H': 'montreal', 'H4J': 'montreal', 'H4K': 'montreal', 'H4L': 'montreal', 'H4M': 'montreal',
  'H4N': 'montreal', 'H4P': 'montreal', 'H4R': 'montreal', 'H4S': 'montreal', 'H4T': 'montreal',
  'H4V': 'montreal', 'H4W': 'montreal', 'H4X': 'montreal', 'H4Y': 'montreal', 'H4Z': 'montreal',

  // Laval
  'H7A': 'laval', 'H7B': 'laval', 'H7C': 'laval', 'H7E': 'laval', 'H7G': 'laval',
  'H7H': 'laval', 'H7J': 'laval', 'H7K': 'laval', 'H7L': 'laval', 'H7M': 'laval',
  'H7N': 'laval', 'H7P': 'laval', 'H7R': 'laval', 'H7S': 'laval', 'H7T': 'laval',
  'H7V': 'laval', 'H7W': 'laval', 'H7X': 'laval', 'H7Y': 'laval',

  // Gatineau
  'J8A': 'gatineau', 'J8B': 'gatineau', 'J8C': 'gatineau', 'J8E': 'gatineau', 'J8G': 'gatineau',
  'J8H': 'gatineau', 'J8J': 'gatineau', 'J8K': 'gatineau', 'J8L': 'gatineau', 'J8M': 'gatineau',
  'J8N': 'gatineau', 'J8P': 'gatineau', 'J8R': 'gatineau', 'J8S': 'gatineau', 'J8T': 'gatineau',
  'J8V': 'gatineau', 'J8W': 'gatineau', 'J8X': 'gatineau', 'J8Y': 'gatineau', 'J8Z': 'gatineau',
  'J9A': 'gatineau', 'J9B': 'gatineau', 'J9H': 'gatineau', 'J9J': 'gatineau',

  // Longueuil
  'J4A': 'longueuil', 'J4B': 'longueuil', 'J4C': 'longueuil', 'J4E': 'longueuil', 'J4G': 'longueuil',
  'J4H': 'longueuil', 'J4J': 'longueuil', 'J4K': 'longueuil', 'J4L': 'longueuil', 'J4M': 'longueuil',
  'J4N': 'longueuil', 'J4P': 'longueuil', 'J4R': 'longueuil', 'J4S': 'longueuil', 'J4T': 'longueuil',
  'J4V': 'longueuil', 'J4W': 'longueuil', 'J4X': 'longueuil', 'J4Y': 'longueuil', 'J4Z': 'longueuil',

  // Lévis
  'G6A': 'levis', 'G6B': 'levis', 'G6C': 'levis', 'G6E': 'levis', 'G6G': 'levis',
  'G6H': 'levis', 'G6J': 'levis', 'G6K': 'levis', 'G6L': 'levis', 'G6P': 'levis',
  'G6R': 'levis', 'G6S': 'levis', 'G6T': 'levis', 'G6V': 'levis', 'G6W': 'levis',
  'G6X': 'levis', 'G6Y': 'levis', 'G6Z': 'levis', 'G7A': 'levis',
}

// Mapping des codes postaux vers les arrondissements/secteurs par municipalité
export const postalCodeToDistrictByMunicipality = {
  quebec: {
    // La Cité-Limoilou (centre-ville, Vieux-Québec, Limoilou)
    'G1A': 'La Cité-Limoilou',
    'G1B': 'La Cité-Limoilou',
    'G1J': 'La Cité-Limoilou',
    'G1K': 'La Cité-Limoilou',
    'G1L': 'La Cité-Limoilou',
    'G1M': 'La Cité-Limoilou',
    'G1N': 'La Cité-Limoilou',
    'G1P': 'La Cité-Limoilou',
    'G1R': 'La Cité-Limoilou',
    'G1S': 'La Cité-Limoilou',
    'G1T': 'La Cité-Limoilou',
    'G1V': 'La Cité-Limoilou',

    // Beauport (secteur est)
    'G1C': 'Beauport',
    'G1E': 'Beauport',
    'G1F': 'Beauport',

    // Charlesbourg (secteur nord)
    'G1G': 'Charlesbourg',
    'G1H': 'Charlesbourg',

    // Sainte-Foy–Sillery–Cap-Rouge (secteur ouest)
    'G1U': 'Sainte-Foy–Sillery–Cap-Rouge',
    'G1W': 'Sainte-Foy–Sillery–Cap-Rouge',
    'G1X': 'Sainte-Foy–Sillery–Cap-Rouge',
    'G1Y': 'Sainte-Foy–Sillery–Cap-Rouge',
    'G1Z': 'Sainte-Foy–Sillery–Cap-Rouge',

    // Les Rivières
    'G2C': 'Les Rivières',
    'G2E': 'Les Rivières',
    'G2G': 'Les Rivières',
    'G2J': 'Les Rivières',
    'G2K': 'Les Rivières',
    'G2L': 'Les Rivières',
    'G2M': 'Les Rivières',
    'G2N': 'Les Rivières',

    // La Haute-Saint-Charles (secteur nord-ouest)
    'G2A': 'La Haute-Saint-Charles',
    'G2B': 'La Haute-Saint-Charles',
    'G3E': 'La Haute-Saint-Charles',
    'G3G': 'La Haute-Saint-Charles',
    'G3H': 'La Haute-Saint-Charles',
    'G3J': 'La Haute-Saint-Charles',
    'G3K': 'La Haute-Saint-Charles'
  },
  montreal: {
    // Ville-Marie (centre-ville)
    'H2X': 'Ville-Marie',
    'H2Y': 'Ville-Marie',
    'H2Z': 'Ville-Marie',
    'H3A': 'Ville-Marie',
    'H3B': 'Ville-Marie',
    'H3C': 'Ville-Marie',

    // Le Plateau-Mont-Royal
    'H2H': 'Le Plateau-Mont-Royal',
    'H2J': 'Le Plateau-Mont-Royal',
    'H2T': 'Le Plateau-Mont-Royal',
    'H2W': 'Le Plateau-Mont-Royal',

    // Rosemont–La Petite-Patrie
    'H1X': 'Rosemont–La Petite-Patrie',
    'H1Y': 'Rosemont–La Petite-Patrie',
    'H2G': 'Rosemont–La Petite-Patrie',
    'H2S': 'Rosemont–La Petite-Patrie',

    // Ahuntsic-Cartierville
    'H2M': 'Ahuntsic-Cartierville',
    'H3L': 'Ahuntsic-Cartierville',
    'H3M': 'Ahuntsic-Cartierville',
    'H4J': 'Ahuntsic-Cartierville',

    // Villeray–Saint-Michel–Parc-Extension
    'H1Z': 'Villeray–Saint-Michel–Parc-Extension',
    'H2A': 'Villeray–Saint-Michel–Parc-Extension',
    'H2B': 'Villeray–Saint-Michel–Parc-Extension',
    'H3N': 'Villeray–Saint-Michel–Parc-Extension',

    // Mercier–Hochelaga-Maisonneuve
    'H1K': 'Mercier–Hochelaga-Maisonneuve',
    'H1L': 'Mercier–Hochelaga-Maisonneuve',
    'H1M': 'Mercier–Hochelaga-Maisonneuve',
    'H1N': 'Mercier–Hochelaga-Maisonneuve',
    'H1V': 'Mercier–Hochelaga-Maisonneuve',
    'H1W': 'Mercier–Hochelaga-Maisonneuve',

    // Côte-des-Neiges–Notre-Dame-de-Grâce
    'H3S': 'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'H3T': 'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'H3V': 'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'H3W': 'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'H4A': 'Côte-des-Neiges–Notre-Dame-de-Grâce',

    // Le Sud-Ouest
    'H3J': 'Le Sud-Ouest',
    'H3K': 'Le Sud-Ouest',
    'H4C': 'Le Sud-Ouest',

    // Verdun
    'H3E': 'Verdun',
    'H4G': 'Verdun',
    'H4H': 'Verdun',

    // Saint-Laurent
    'H4L': 'Saint-Laurent',
    'H4M': 'Saint-Laurent',
    'H4N': 'Saint-Laurent',
    'H4P': 'Saint-Laurent',
    'H4R': 'Saint-Laurent',
    'H4S': 'Saint-Laurent',
    'H4T': 'Saint-Laurent',

    // Outremont
    'H2V': 'Outremont',

    // Montréal-Nord
    'H1G': 'Montréal-Nord',
    'H1H': 'Montréal-Nord',

    // Saint-Léonard
    'H1P': 'Saint-Léonard',
    'H1R': 'Saint-Léonard',
    'H1S': 'Saint-Léonard',
    'H1T': 'Saint-Léonard',

    // Anjou
    'H1J': 'Anjou',

    // Rivière-des-Prairies–Pointe-aux-Trembles
    'H1A': 'Rivière-des-Prairies–Pointe-aux-Trembles',
    'H1B': 'Rivière-des-Prairies–Pointe-aux-Trembles',
    'H1C': 'Rivière-des-Prairies–Pointe-aux-Trembles',
    'H1E': 'Rivière-des-Prairies–Pointe-aux-Trembles',

    // LaSalle
    'H8N': 'LaSalle',
    'H8P': 'LaSalle',
    'H8R': 'LaSalle',

    // Lachine
    'H8S': 'Lachine',
    'H8T': 'Lachine',

    // Pierrefonds-Roxboro
    'H8Y': 'Pierrefonds-Roxboro',
    'H8Z': 'Pierrefonds-Roxboro',
    'H9A': 'Pierrefonds-Roxboro',
    'H9B': 'Pierrefonds-Roxboro',
    'H9C': 'Pierrefonds-Roxboro',
    'H9G': 'Pierrefonds-Roxboro',
    'H9H': 'Pierrefonds-Roxboro',

    // L'Île-Bizard–Sainte-Geneviève
    'H9E': 'L\'Île-Bizard–Sainte-Geneviève',
    'H9K': 'L\'Île-Bizard–Sainte-Geneviève'
  },
  laval: {
    // Chomedey
    'H7W': 'Chomedey',
    'H7X': 'Chomedey',

    // Laval-des-Rapides
    'H7N': 'Laval-des-Rapides',

    // Pont-Viau
    'H7G': 'Pont-Viau',

    // Duvernay
    'H7A': 'Duvernay',
    'H7E': 'Duvernay',

    // Vimont
    'H7M': 'Vimont',

    // Auteuil
    'H7H': 'Auteuil',
    'H7J': 'Auteuil',

    // Fabreville-Sud
    'H7P': 'Fabreville-Sud',
    'H7R': 'Fabreville-Sud',
    'H7S': 'Fabreville-Sud',
    'H7T': 'Fabreville-Sud',

    // Champfleury (nouveau secteur)
    'H7Y': 'Champfleury',

    // Sainte-Rose
    'H7L': 'Sainte-Rose',

    // Sainte-Dorothée
    'H7B': 'Sainte-Dorothée',

    // Laval-Ouest
    'H7V': 'Laval-Ouest',

    // Laval-sur-le-Lac et Saint-François (secteurs adjacents)
    'H7K': 'Laval-sur-le-Lac',

    // Saint-Vincent-de-Paul
    'H7C': 'Saint-Vincent-de-Paul'
  },
  gatineau: {
    // Hull
    'J8X': 'Hull',
    'J8Y': 'Hull',
    'J8Z': 'Hull',
    'J9A': 'Hull',

    // Gatineau
    'J8T': 'Gatineau',
    'J8V': 'Gatineau',
    'J8W': 'Gatineau',

    // Aylmer
    'J9H': 'Aylmer',
    'J9J': 'Aylmer',

    // Buckingham
    'J8L': 'Buckingham',
    'J8M': 'Buckingham',
    'J8N': 'Buckingham',

    // Masson-Angers
    'J8P': 'Masson-Angers',
    'J8R': 'Masson-Angers',
    'J8S': 'Masson-Angers'
  },
  longueuil: {
    // Le Vieux-Longueuil
    'J4H': 'Le Vieux-Longueuil',
    'J4J': 'Le Vieux-Longueuil',
    'J4K': 'Le Vieux-Longueuil',
    'J4L': 'Le Vieux-Longueuil',
    'J4M': 'Le Vieux-Longueuil',
    'J4N': 'Le Vieux-Longueuil',
    'J4P': 'Le Vieux-Longueuil',
    'J4R': 'Le Vieux-Longueuil',
    'J4S': 'Le Vieux-Longueuil',
    'J4T': 'Le Vieux-Longueuil',

    // Saint-Hubert
    'J3Y': 'Saint-Hubert',
    'J3Z': 'Saint-Hubert',
    'J4A': 'Saint-Hubert',
    'J4B': 'Saint-Hubert',
    'J4E': 'Saint-Hubert',
    'J4G': 'Saint-Hubert',
    'J4W': 'Saint-Hubert',
    'J4X': 'Saint-Hubert',
    'J4Y': 'Saint-Hubert',
    'J4Z': 'Saint-Hubert',

    // Greenfield Park
    'J4V': 'Greenfield Park'
  },
  levis: {
    // Desjardins (secteur central)
    'G6V': 'Desjardins',
    'G6W': 'Desjardins',
    'G6X': 'Desjardins',
    'G6Y': 'Desjardins',
    'G6Z': 'Desjardins',
    'G7A': 'Desjardins',

    // Les Chutes-de-la-Chaudière-Ouest
    'G6A': 'Les Chutes-de-la-Chaudière-Ouest',
    'G6B': 'Les Chutes-de-la-Chaudière-Ouest',
    'G6C': 'Les Chutes-de-la-Chaudière-Ouest',
    'G6E': 'Les Chutes-de-la-Chaudière-Ouest',

    // Les Chutes-de-la-Chaudière-Est
    'G6G': 'Les Chutes-de-la-Chaudière-Est',
    'G6H': 'Les Chutes-de-la-Chaudière-Est',
    'G6J': 'Les Chutes-de-la-Chaudière-Est',
    'G6K': 'Les Chutes-de-la-Chaudière-Est',
    'G6L': 'Les Chutes-de-la-Chaudière-Est',
    'G6P': 'Les Chutes-de-la-Chaudière-Est',
    'G6R': 'Les Chutes-de-la-Chaudière-Est',
    'G6S': 'Les Chutes-de-la-Chaudière-Est',
    'G6T': 'Les Chutes-de-la-Chaudière-Est'
  }
}

// Mapping des codes postaux de Québec vers les arrondissements (legacy - gardé pour compatibilité)
export const postalCodeToDistrict: Record<string, string> = {
  // La Cité-Limoilou (centre-ville, Vieux-Québec, Limoilou)
  'G1A': 'La Cité-Limoilou',
  'G1B': 'La Cité-Limoilou', 
  'G1J': 'La Cité-Limoilou',
  'G1K': 'La Cité-Limoilou',
  'G1L': 'La Cité-Limoilou',
  'G1M': 'La Cité-Limoilou',
  'G1N': 'La Cité-Limoilou',
  'G1P': 'La Cité-Limoilou',
  'G1R': 'La Cité-Limoilou',
  'G1S': 'La Cité-Limoilou',
  'G1T': 'La Cité-Limoilou',
  'G1V': 'La Cité-Limoilou',

  // Beauport (secteur est)
  'G1C': 'Beauport',
  'G1E': 'Beauport',
  'G1F': 'Beauport',

  // Charlesbourg (secteur nord)
  'G1G': 'Charlesbourg',
  'G1H': 'Charlesbourg',

  // Sainte-Foy–Sillery–Cap-Rouge (secteur ouest)
  'G1U': 'Sainte-Foy–Sillery–Cap-Rouge',
  'G1W': 'Sainte-Foy–Sillery–Cap-Rouge',
  'G1X': 'Sainte-Foy–Sillery–Cap-Rouge',
  'G1Y': 'Sainte-Foy–Sillery–Cap-Rouge',
  'G1Z': 'Sainte-Foy–Sillery–Cap-Rouge',

  // Les Rivières
  'G2C': 'Les Rivières',
  'G2E': 'Les Rivières',
  'G2G': 'Les Rivières',
  'G2J': 'Les Rivières',
  'G2K': 'Les Rivières',
  'G2L': 'Les Rivières',
  'G2M': 'Les Rivières',
  'G2N': 'Les Rivières',

  // La Haute-Saint-Charles (secteur nord-ouest)
  'G2A': 'La Haute-Saint-Charles',
  'G2B': 'La Haute-Saint-Charles',
  'G3E': 'La Haute-Saint-Charles',
  'G3G': 'La Haute-Saint-Charles',
  'G3H': 'La Haute-Saint-Charles',
  'G3J': 'La Haute-Saint-Charles',
  'G3K': 'La Haute-Saint-Charles',
}

// Liste des municipalités supportées
export const supportedMunicipalities = [
  { id: 'quebec', name: 'Québec', population: 550000 },
  { id: 'montreal', name: 'Montréal', population: 1704000 },
  { id: 'laval', name: 'Laval', population: 438000 },
  { id: 'gatineau', name: 'Gatineau', population: 291000 },
  { id: 'longueuil', name: 'Longueuil', population: 246000 },
  { id: 'levis', name: 'Lévis', population: 149000 },
]

// Arrondissements/secteurs par municipalité
export const municipalityDistricts = {
  quebec: [
    'La Cité-Limoilou',
    'Les Rivières',
    'Sainte-Foy–Sillery–Cap-Rouge',
    'Charlesbourg',
    'Beauport',
    'La Haute-Saint-Charles'
  ],
  montreal: [
    'Ahuntsic-Cartierville',
    'Anjou',
    'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'Lachine',
    'LaSalle',
    'Le Plateau-Mont-Royal',
    'Le Sud-Ouest',
    'L\'Île-Bizard–Sainte-Geneviève',
    'Mercier–Hochelaga-Maisonneuve',
    'Montréal-Nord',
    'Outremont',
    'Pierrefonds-Roxboro',
    'Rivière-des-Prairies–Pointe-aux-Trembles',
    'Rosemont–La Petite-Patrie',
    'Saint-Laurent',
    'Saint-Léonard',
    'Verdun',
    'Ville-Marie',
    'Villeray–Saint-Michel–Parc-Extension'
  ],
  laval: [
    'Auteuil',
    'Chomedey',
    'Duvernay',
    'Fabreville-Sud',
    'Champfleury',
    'Laval-des-Rapides',
    'Laval-Ouest',
    'Laval-sur-le-Lac',
    'Pont-Viau',
    'Saint-Vincent-de-Paul',
    'Sainte-Dorothée',
    'Sainte-Rose',
    'Vimont'
  ],
  gatineau: [
    'Aylmer',
    'Buckingham',
    'Gatineau',
    'Hull',
    'Masson-Angers'
  ],
  longueuil: [
    'Greenfield Park',
    'Saint-Hubert',
    'Le Vieux-Longueuil'
  ],
  levis: [
    'Desjardins',
    'Les Chutes-de-la-Chaudière-Ouest',
    'Les Chutes-de-la-Chaudière-Est'
  ]
}

// Liste des arrondissements de Québec (legacy - pour compatibilité)
export const quebecDistricts = municipalityDistricts.quebec

/**
 * Détermine la municipalité basée sur un code postal
 */
export function getMunicipalityFromPostalCode(postalCode: string): string | null {
  if (!postalCode || postalCode.length < 3) {
    return null
  }

  // Nettoyer et extraire les 3 premiers caractères
  const prefix = postalCode.toUpperCase().replace(/\s/g, '').substring(0, 3)

  return postalCodeToMunicipality[prefix] || null
}

/**
 * Détermine l'arrondissement/secteur basé sur un code postal et une municipalité
 */
export function getDistrictFromPostalCodeByMunicipality(postalCode: string, municipalityId: string): string | null {
  if (!postalCode || postalCode.length < 3 || !municipalityId) {
    return null
  }

  // Nettoyer et extraire les 3 premiers caractères
  const prefix = postalCode.toUpperCase().replace(/\s/g, '').substring(0, 3)

  const municipalityMapping = postalCodeToDistrictByMunicipality[municipalityId as keyof typeof postalCodeToDistrictByMunicipality]
  if (!municipalityMapping) {
    return null
  }

  return municipalityMapping[prefix as keyof typeof municipalityMapping] || null
}

/**
 * Détermine l'arrondissement basé sur un code postal (legacy - pour Québec seulement)
 */
export function getDistrictFromPostalCode(postalCode: string): string | null {
  if (!postalCode || postalCode.length < 3) {
    return null
  }

  // Nettoyer et extraire les 3 premiers caractères
  const prefix = postalCode.toUpperCase().replace(/\s/g, '').substring(0, 3)

  return postalCodeToDistrict[prefix] || null
}

/**
 * Valide le format d'un code postal canadien
 */
export function isValidCanadianPostalCode(postalCode: string): boolean {
  // Format canadien : A1A 1A1 ou A1A1A1
  const pattern = /^[A-Za-z]\d[A-Za-z][\s\-]?\d[A-Za-z]\d$/
  return pattern.test(postalCode)
}

/**
 * Formate un code postal selon le standard canadien
 */
export function formatPostalCode(postalCode: string): string {
  const cleaned = postalCode.toUpperCase().replace(/\s/g, '')
  if (cleaned.length === 6) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`
  }
  return postalCode
}

// Coordonnées approximatives des arrondissements/secteurs pour toutes les municipalités
export const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  // Québec
  'La Cité-Limoilou': { lat: 46.8139, lng: -71.2080 },
  'Les Rivières': { lat: 46.8308, lng: -71.2918 },
  'Sainte-Foy–Sillery–Cap-Rouge': { lat: 46.7745, lng: -71.2933 },
  'Charlesbourg': { lat: 46.8528, lng: -71.2528 },
  'Beauport': { lat: 46.8607, lng: -71.1864 },
  'La Haute-Saint-Charles': { lat: 46.8750, lng: -71.3167 },

  // Montréal
  'Ville-Marie': { lat: 45.5017, lng: -73.5673 },
  'Le Plateau-Mont-Royal': { lat: 45.5238, lng: -73.5830 },
  'Rosemont–La Petite-Patrie': { lat: 45.5469, lng: -73.5909 },
  'Ahuntsic-Cartierville': { lat: 45.5473, lng: -73.6738 },
  'Villeray–Saint-Michel–Parc-Extension': { lat: 45.5597, lng: -73.6250 },
  'Mercier–Hochelaga-Maisonneuve': { lat: 45.5478, lng: -73.5343 },
  'Côte-des-Neiges–Notre-Dame-de-Grâce': { lat: 45.4945, lng: -73.6187 },
  'Le Sud-Ouest': { lat: 45.4736, lng: -73.5788 },
  'Verdun': { lat: 45.4584, lng: -73.5684 },
  'Saint-Laurent': { lat: 45.5088, lng: -73.6789 },
  'Outremont': { lat: 45.5198, lng: -73.6103 },
  'Montréal-Nord': { lat: 45.6067, lng: -73.6289 },
  'Saint-Léonard': { lat: 45.5879, lng: -73.5954 },
  'Anjou': { lat: 45.6067, lng: -73.5679 },
  'Rivière-des-Prairies–Pointe-aux-Trembles': { lat: 45.6569, lng: -73.5107 },
  'LaSalle': { lat: 45.4261, lng: -73.6282 },
  'Lachine': { lat: 45.4441, lng: -73.6710 },
  'Pierrefonds-Roxboro': { lat: 45.4944, lng: -73.8408 },
  'L\'Île-Bizard–Sainte-Geneviève': { lat: 45.4558, lng: -73.8747 },

  // Laval
  'Chomedey': { lat: 45.5369, lng: -73.7330 },
  'Laval-des-Rapides': { lat: 45.5640, lng: -73.7441 },
  'Pont-Viau': { lat: 45.5570, lng: -73.7125 },
  'Duvernay': { lat: 45.5264, lng: -73.6808 },
  'Vimont': { lat: 45.5753, lng: -73.6989 },
  'Auteuil': { lat: 45.5894, lng: -73.6781 },
  'Fabreville-Sud': { lat: 45.5531, lng: -73.7681 },
  'Champfleury': { lat: 45.5440, lng: -73.7572 },
  'Sainte-Rose': { lat: 45.6011, lng: -73.7372 },
  'Sainte-Dorothée': { lat: 45.5219, lng: -73.7764 },
  'Laval-Ouest': { lat: 45.5653, lng: -73.7764 },
  'Laval-sur-le-Lac': { lat: 45.5756, lng: -73.7514 },
  'Saint-Vincent-de-Paul': { lat: 45.5972, lng: -73.6989 },

  // Gatineau
  'Hull': { lat: 45.4215, lng: -75.7081 },
  'Gatineau': { lat: 45.4836, lng: -75.6503 },
  'Aylmer': { lat: 45.3942, lng: -75.8506 },
  'Buckingham': { lat: 45.5836, lng: -75.4169 },
  'Masson-Angers': { lat: 45.5208, lng: -75.5364 },

  // Longueuil
  'Le Vieux-Longueuil': { lat: 45.5308, lng: -73.5181 },
  'Saint-Hubert': { lat: 45.4836, lng: -73.4169 },
  'Greenfield Park': { lat: 45.4647, lng: -73.4669 },

  // Lévis
  'Desjardins': { lat: 46.8033, lng: -71.1775 },
  'Les Chutes-de-la-Chaudière-Ouest': { lat: 46.7375, lng: -71.2714 },
  'Les Chutes-de-la-Chaudière-Est': { lat: 46.7375, lng: -71.1036 }
}

/**
 * Retourne des informations détaillées sur un arrondissement
 */
export interface DistrictInfo {
  name: string
  population?: number
  area?: string
  description?: string
  coordinates: { lat: number; lng: number }
}

export function getDistrictInfo(districtName: string): DistrictInfo | null {
  const coords = districtCoordinates[districtName]
  if (!coords) return null

  const districtDetails: Record<string, Partial<DistrictInfo>> = {
    // Québec
    'La Cité-Limoilou': {
      population: 110000,
      area: '32.5 km²',
      description: 'Cœur historique de Québec, incluant le Vieux-Québec et Limoilou'
    },
    'Les Rivières': {
      population: 88000,
      area: '108.3 km²',
      description: 'Arrondissement résidentiel avec de nombreux parcs'
    },
    'Sainte-Foy–Sillery–Cap-Rouge': {
      population: 90000,
      area: '95.2 km²',
      description: 'Secteur ouest incluant l\'Université Laval'
    },
    'Charlesbourg': {
      population: 78000,
      area: '65.8 km²',
      description: 'Arrondissement au nord, mélange urbain et semi-rural'
    },
    'Beauport': {
      population: 76000,
      area: '153.5 km²',
      description: 'Arrondissement à l\'est, en bordure du fleuve'
    },
    'La Haute-Saint-Charles': {
      population: 58000,
      area: '376.8 km²',
      description: 'Plus grand arrondissement, principalement résidentiel'
    },

    // Montréal (exemples principaux)
    'Ville-Marie': {
      population: 89000,
      area: '16.5 km²',
      description: 'Centre-ville de Montréal et Vieux-Montréal'
    },
    'Le Plateau-Mont-Royal': {
      population: 104000,
      area: '8.1 km²',
      description: 'Quartier branché avec architecture typique montréalaise'
    },
    'Rosemont–La Petite-Patrie': {
      population: 140000,
      area: '15.9 km²',
      description: 'Arrondissement familial et multiculturel'
    },

    // Laval (exemples)
    'Chomedey': {
      population: 85000,
      area: '25.2 km²',
      description: 'Secteur central de Laval avec commerces et services'
    },
    'Vimont': {
      population: 45000,
      area: '18.7 km²',
      description: 'Secteur résidentiel familial'
    },

    // Gatineau
    'Hull': {
      population: 75000,
      area: '30.1 km²',
      description: 'Centre-ville de Gatineau, face à Ottawa'
    },
    'Gatineau': {
      population: 110000,
      area: '95.5 km²',
      description: 'Plus grand secteur résidentiel'
    },
    'Aylmer': {
      population: 55000,
      area: '85.2 km²',
      description: 'Secteur historique anglophone'
    },

    // Longueuil
    'Le Vieux-Longueuil': {
      population: 130000,
      area: '42.8 km²',
      description: 'Centre historique et administratif'
    },
    'Saint-Hubert': {
      population: 85000,
      area: '65.5 km²',
      description: 'Secteur résidentiel et aéroportuaire'
    },
    'Greenfield Park': {
      population: 17000,
      area: '4.2 km²',
      description: 'Petit arrondissement résidentiel'
    },

    // Lévis
    'Desjardins': {
      population: 85000,
      area: '95.8 km²',
      description: 'Centre administratif et commercial de Lévis'
    },
    'Les Chutes-de-la-Chaudière-Ouest': {
      population: 35000,
      area: '145.2 km²',
      description: 'Secteur ouest plus rural'
    },
    'Les Chutes-de-la-Chaudière-Est': {
      population: 29000,
      area: '312.5 km²',
      description: 'Secteur est avec grandes étendues rurales'
    }
  }

  return {
    name: districtName,
    coordinates: coords,
    ...districtDetails[districtName]
  }
}

/**
 * Retourne les informations d'une municipalité
 */
export function getMunicipalityInfo(municipalityId: string) {
  return supportedMunicipalities.find(m => m.id === municipalityId) || null
}

/**
 * Valide qu'une municipalité est supportée
 */
export function isMunicipalitySupported(municipalityId: string): boolean {
  return supportedMunicipalities.some(m => m.id === municipalityId)
}

/**
 * Obtient la liste des arrondissements/secteurs pour une municipalité
 */
export function getDistrictsForMunicipality(municipalityId: string): string[] {
  return municipalityDistricts[municipalityId as keyof typeof municipalityDistricts] || []
}

/**
 * Retourne le terme approprié pour les divisions territoriales selon la municipalité
 */
export function getDistrictTerminology(municipalityId: string): string {
  switch (municipalityId) {
    case 'quebec':
    case 'montreal':
    case 'longueuil':
    case 'levis':
      return 'arrondissement'
    case 'laval':
      return 'secteur'
    case 'gatineau':
      return 'secteur'
    default:
      return 'secteur'
  }
}

/**
 * Détecte automatiquement la municipalité à partir d'un code postal
 * et retourne les informations complètes incluant l'arrondissement/secteur
 */
export function detectMunicipalityFromPostalCode(postalCode: string) {
  const municipalityId = getMunicipalityFromPostalCode(postalCode)
  if (!municipalityId) {
    return null
  }

  const municipalityInfo = getMunicipalityInfo(municipalityId)
  if (!municipalityInfo) {
    return null
  }

  // Détecter l'arrondissement/secteur pour cette municipalité
  const district = getDistrictFromPostalCodeByMunicipality(postalCode, municipalityId)

  return {
    id: municipalityId,
    name: municipalityInfo.name,
    population: municipalityInfo.population,
    postalCode,
    district,
    terminology: getDistrictTerminology(municipalityId),
    availableDistricts: getDistrictsForMunicipality(municipalityId)
  }
} 