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
    console.log('🔍 [API SESSIONS] Validation session...')
    
    // ✅ Extraire le sessionToken depuis le header Authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ [API SESSIONS] Header Authorization manquant ou invalide')
      return NextResponse.json(
        { success: false, error: 'Header Authorization Bearer requis' },
        { status: 400 }
      )
    }
    
    const sessionToken = authHeader.substring(7) // Retirer 'Bearer '
    
    // ✅ Validation basique du format
    if (!sessionToken || sessionToken.length < 10) {
      console.log('❌ [API SESSIONS] Format sessionToken invalide:', sessionToken)
      return NextResponse.json(
        { success: false, error: 'Format de sessionToken invalide' },
        { status: 400 }
      )
    }

    console.log('🔍 [API SESSIONS] Validation token:', sessionToken.substring(0, 8) + '...')

    // ✅ Créer l'instance d'API
    const sessionsAPI = new SessionsAPI()

    // ✅ Récupérer et vérifier la session
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    
    if (!session) {
      console.log('❌ [API SESSIONS] Session non trouvée en base')
      return NextResponse.json({
        success: false,
        valid: false,
        message: 'Session invalide ou expirée'
      }, { status: 401 })
    }

    console.log('✅ [API SESSIONS] Session trouvée:', session.id)

    // ✅ Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    console.log('✅ [API SESSIONS] Session validée avec succès')

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
    console.error('❌ [API SESSIONS] Erreur validation:', error)
    return NextResponse.json({
      success: false,
      valid: false,
      error: error instanceof Error ? error.message : 'Erreur interne',
      message: 'Erreur lors de la validation'
    }, { status: 500 })
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