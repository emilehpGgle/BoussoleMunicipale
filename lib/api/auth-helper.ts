import { NextRequest } from 'next/server'
import { SessionsAPI } from './sessions'

// Helper function to extract municipality from request body
function _extractMunicipalityFromBody(_request: NextRequest): string | null {
  try {
    // Note: Dans Next.js, on ne peut pas lire le body ici car il est déjà consommé
    // Cette fonction est un placeholder pour une logique future si nécessaire
    return null
  } catch {
    return null
  }
}

// Helper function to map municipality to unique test session ID suffix
function getMunicipalityId(municipality: string): string {
  const municipalityMap: Record<string, string> = {
    'quebec': '1',
    'montreal': '2', 
    'laval': '3',
    'gatineau': '4',
    'longueuil': '5',
    'levis': '6'
  }
  return municipalityMap[municipality] || '1' // Default to quebec
}

// Helper function to extract sessionToken from Authorization header
export function extractSessionToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Helper function to check if request is in test mode
export function isTestMode(request: NextRequest): boolean {
  return request.headers.get('x-test-mode') === 'true'
}

// Helper function for session validation with test mode bypass
export async function validateSessionWithTestBypass(request: NextRequest) {
  // Check if we're in test mode
  if (isTestMode(request)) {
    // Générer un session_id unique par municipalité pour éviter les collisions de données
    const municipality = request.headers.get('x-test-municipality') || 'quebec'
    const testSessionId = `00000000-0000-0000-0000-00000000000${getMunicipalityId(municipality)}`
    
    return {
      session: {
        id: testSessionId,
        token: 'TEST_TOKEN_STATIC',
        userId: testSessionId,
        createdAt: '2025-01-01T00:00:00.000Z',
        lastActivity: new Date().toISOString()
      },
      isTestMode: true
    }
  }

  // Normal authentication flow
  const sessionToken = extractSessionToken(request)
  if (!sessionToken) {
    throw new Error('Header Authorization Bearer requis')
  }

  // Validate sessionToken format
  if (typeof sessionToken !== 'string' || sessionToken.length < 10) {
    throw new Error('Format de sessionToken invalide')
  }

  const sessionsAPI = new SessionsAPI()
  const session = await sessionsAPI.getSessionByToken(sessionToken)

  if (!session) {
    throw new Error('Session invalide ou expirée')
  }

  return {
    session,
    isTestMode: false
  }
}