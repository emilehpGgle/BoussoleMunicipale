import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'

// ✅ Utility function pour la gestion d'erreurs simplifiée
const handleAPIError = (error: unknown, context: string) => {
  console.error(`❌ [API SESSIONS] Erreur ${context}:`, {
    error,
    message: error instanceof Error ? error.message : String(error),
    timestamp: new Date().toISOString()
  })
  
  return NextResponse.json(
    { 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur interne du serveur',
      context 
    },
    { status: 500 }
  )
}

// ✅ POST - Créer une nouvelle session (simplifié)
export async function POST(request: NextRequest) {
  try {
    console.log('🆕 [API SESSIONS] Création session...')

    // ✅ Récupérer l'user agent (optionnel)
    const rawUserAgent = request.headers.get('user-agent')
    const userAgent = rawUserAgent?.slice(0, 255) || 'Unknown'

    // ✅ Vérifier les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ [API SESSIONS] Variables d\'environnement Supabase manquantes')
      return NextResponse.json(
        { success: false, error: 'Configuration serveur invalide' },
        { status: 500 }
      )
    }

    // ✅ Créer l'instance d'API et une nouvelle session
    const sessionsAPI = new SessionsAPI()
    const session = await sessionsAPI.createSession(userAgent)

    console.log('✅ [API SESSIONS] Session créée:', session.id)

    return NextResponse.json({ 
      success: true, 
      session: {
        id: session.id,
        sessionToken: session.session_token,
        expiresAt: session.expires_at,
        createdAt: session.created_at
      },
      message: 'Session créée avec succès' 
    })

  } catch (error) {
    return handleAPIError(error, 'création de session')
  }
}

// ✅ GET - Vérifier le statut d'une session (simplifié)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'sessionToken est requis' },
        { status: 400 }
      )
    }

    // ✅ Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // ✅ Récupérer et vérifier la session
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    
    if (!session) {
      return NextResponse.json({
        success: false,
        valid: false,
        message: 'Session invalide ou expirée'
      })
    }

    // ✅ Mettre à jour l'activité de la session
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
    return handleAPIError(error, 'vérification de session')
  }
}

// ✅ DELETE - Supprimer une session (simplifié)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'sessionToken est requis' },
        { status: 400 }
      )
    }

    // ✅ Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // ✅ Supprimer la session
    await sessionsAPI.deleteSessionByToken(sessionToken)

    return NextResponse.json({ 
      success: true, 
      message: 'Session supprimée avec succès' 
    })

  } catch (error) {
    return handleAPIError(error, 'suppression de session')
  }
} 