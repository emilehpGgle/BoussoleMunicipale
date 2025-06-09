import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ProfilesAPI } from '@/lib/api/profiles'

// Types pour les requêtes
interface SaveProfileRequest {
  sessionToken: string
  profileData: Record<string, any>
}

// POST - Sauvegarder un profil utilisateur
export async function POST(request: NextRequest) {
  try {
    const body: SaveProfileRequest = await request.json()
    const { sessionToken, profileData } = body

    // Validation des paramètres requis
    if (!sessionToken || !profileData) {
      return NextResponse.json(
        { error: 'sessionToken et profileData sont requis' },
        { status: 400 }
      )
    }

    // Validate sessionToken format
    if (typeof sessionToken !== 'string' || sessionToken.length < 10) {
      return NextResponse.json(
        { error: 'Format de sessionToken invalide' },
        { status: 400 }
      )
    }

    // Validate profileData structure
    if (typeof profileData !== 'object' || Array.isArray(profileData)) {
      return NextResponse.json(
        { error: 'profileData doit être un objet valide' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const profilesAPI = new ProfilesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Sauvegarder le profil
    const profile = await profilesAPI.saveProfile(session.id, profileData)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true, 
      profile,
      message: 'Profil sauvegardé avec succès' 
    })

  } catch (error) {
    console.error('Erreur lors de la sauvegarde du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// GET - Récupérer le profil d'une session
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

    // Validate sessionToken format
    if (typeof sessionToken !== 'string' || sessionToken.length < 10) {
      return NextResponse.json(
        { error: 'Format de sessionToken invalide' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const profilesAPI = new ProfilesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Récupérer le profil de la session
    const profile = await profilesAPI.getProfile(session.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({
      success: true,
      profile,
      sessionId: session.id
    })

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un profil existant
export async function PUT(request: NextRequest) {
  try {
    const body: SaveProfileRequest = await request.json()
    const { sessionToken, profileData } = body

    // Validation des paramètres requis
    if (!sessionToken || !profileData) {
      return NextResponse.json(
        { error: 'sessionToken et profileData sont requis' },
        { status: 400 }
      )
    }

    // Validate sessionToken format
    if (typeof sessionToken !== 'string' || sessionToken.length < 10) {
      return NextResponse.json(
        { error: 'Format de sessionToken invalide' },
        { status: 400 }
      )
    }

    // Validate profileData structure
    if (typeof profileData !== 'object' || Array.isArray(profileData)) {
      return NextResponse.json(
        { error: 'profileData doit être un objet valide' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const profilesAPI = new ProfilesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Mettre à jour le profil
    const profile = await profilesAPI.updateProfile(session.id, profileData)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true, 
      profile,
      message: 'Profil mis à jour avec succès' 
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 