import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'

// Utility function for standardized error handling
const handleAPIError = (error: unknown, context: string) => {
  console.error(`Erreur lors de ${context}:`, error)
  return NextResponse.json(
    { error: 'Erreur interne du serveur' },
    { status: 500 }
  )
}

// POST - Créer une nouvelle session
export async function POST(request: NextRequest) {
  try {
    // Récupérer et valider l'user agent depuis les headers
    const rawUserAgent = request.headers.get('user-agent')
    const userAgent = rawUserAgent 
      ? rawUserAgent.slice(0, 255) // Truncate to reasonable length
      : undefined

    // Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // Créer une nouvelle session
    const session = await sessionsAPI.createSession(userAgent)

    return NextResponse.json({ 
      success: true, 
      session: {
        id: session.id,
        sessionToken: session.session_token,
        expiresAt: session.expires_at
      },
      message: 'Session créée avec succès' 
    })

  } catch (error) {
    return handleAPIError(error, 'la création de la session')
  }
}

// GET - Vérifier le statut d'une session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'sessionToken est requis' },
        { status: 400 }
      )
    }

    // Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // Récupérer et vérifier la session
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    
    if (!session) {
      return NextResponse.json({
        success: false,
        valid: false,
        message: 'Session invalide ou expirée'
      })
    }

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({
      success: true,
      valid: true,
      session: {
        id: session.id,
        sessionToken: session.session_token,
        expiresAt: session.expires_at,
        createdAt: session.created_at
      },
      message: 'Session valide'
    })

  } catch (error) {
    return handleAPIError(error, 'la vérification de la session')
  }
}

// DELETE - Supprimer une session
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'sessionToken est requis' },
        { status: 400 }
      )
    }

    // Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // Supprimer la session
    await sessionsAPI.deleteSessionByToken(sessionToken)

    return NextResponse.json({ 
      success: true, 
      message: 'Session supprimée avec succès' 
    })

  } catch (error) {
    return handleAPIError(error, 'la suppression de la session')
  }
} 