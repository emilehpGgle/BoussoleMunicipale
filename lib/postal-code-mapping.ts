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

// Liste des arrondissements de Québec (legacy)
export const quebecDistricts = [
  'La Cité-Limoilou',
  'Les Rivières',
  'Sainte-Foy–Sillery–Cap-Rouge',
  'Charlesbourg',
  'Beauport',
  'La Haute-Saint-Charles'
]

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

// Coordonnées approximatives des arrondissements pour la mini-carte (latitude, longitude)
export const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  'La Cité-Limoilou': { lat: 46.8139, lng: -71.2080 },
  'Les Rivières': { lat: 46.8308, lng: -71.2918 },
  'Sainte-Foy–Sillery–Cap-Rouge': { lat: 46.7745, lng: -71.2933 },
  'Charlesbourg': { lat: 46.8528, lng: -71.2528 },
  'Beauport': { lat: 46.8607, lng: -71.1864 },
  'La Haute-Saint-Charles': { lat: 46.8750, lng: -71.3167 }
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
 * Détecte automatiquement la municipalité à partir d'un code postal
 * et retourne les informations complètes
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

  return {
    id: municipalityId,
    name: municipalityInfo.name,
    population: municipalityInfo.population,
    postalCode,
    // Pour Québec, on garde aussi l'arrondissement
    district: municipalityId === 'quebec' ? getDistrictFromPostalCode(postalCode) : null
  }
} 