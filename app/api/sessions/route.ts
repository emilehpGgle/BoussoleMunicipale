import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'

// Utility function for standardized error handling avec logs détaillés
const handleAPIError = (error: unknown, context: string) => {
  console.error(`❌ [API SESSIONS] Erreur lors de ${context}:`, {
    error,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString()
  })
  
  return NextResponse.json(
    { 
      error: 'Erreur interne du serveur',
      details: error instanceof Error ? error.message : String(error),
      context 
    },
    { status: 500 }
  )
}

// POST - Créer une nouvelle session
export async function POST(request: NextRequest) {
  console.log('🚀 [API SESSIONS] POST /api/sessions - Début de la requête')
  
  try {
    // Récupérer et valider l'user agent depuis les headers
    const rawUserAgent = request.headers.get('user-agent')
    const userAgent = rawUserAgent 
      ? rawUserAgent.slice(0, 255) // Truncate to reasonable length
      : undefined

    console.log('📝 [API SESSIONS] User Agent traité:', { rawUserAgent, userAgent })

    // Vérifier les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('🔑 [API SESSIONS] Variables d\'environnement:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPrefix: supabaseUrl?.substring(0, 20) + '...',
      keyPrefix: supabaseKey?.substring(0, 20) + '...'
    })

    // Créer l'instance d'API
    console.log('🏗️ [API SESSIONS] Création de l\'instance SessionsAPI...')
    const sessionsAPI = new SessionsAPI()

    // Créer une nouvelle session
    console.log('💾 [API SESSIONS] Appel à createSession...')
    const session = await sessionsAPI.createSession(userAgent)

    console.log('✅ [API SESSIONS] Session créée avec succès:', {
      id: session.id,
      token: session.session_token?.substring(0, 8) + '...',
      expires: session.expires_at
    })

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
    console.error('💥 [API SESSIONS] Erreur attrapée dans POST:', error)
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