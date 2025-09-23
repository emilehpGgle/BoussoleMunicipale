import { NextRequest } from 'next/server'
import { SessionsAPI } from './sessions'

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
    // Return fixed TEST session for all tests (exists in Supabase)
    return {
      session: {
        id: '00000000-0000-0000-0000-000000000001',
        token: 'TEST_TOKEN_STATIC',
        userId: '00000000-0000-0000-0000-000000000001',
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