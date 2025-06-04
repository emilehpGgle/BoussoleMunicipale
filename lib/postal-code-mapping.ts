// lib/postal-code-mapping.ts

// Mapping des codes postaux de Québec vers les arrondissements
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

// Liste des arrondissements de Québec
export const quebecDistricts = [
  'La Cité-Limoilou',
  'Les Rivières', 
  'Sainte-Foy–Sillery–Cap-Rouge',
  'Charlesbourg',
  'Beauport',
  'La Haute-Saint-Charles'
]

/**
 * Détermine l'arrondissement basé sur un code postal
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