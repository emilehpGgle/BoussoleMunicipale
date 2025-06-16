import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ProfilesAPI } from '@/lib/api/profiles'

// Helper function to extract sessionToken from Authorization header
function extractSessionToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Types pour les requêtes (sessionToken retiré du body)
interface SaveProfileRequest {
  profileData: Record<string, unknown>
}

// POST - Sauvegarder un profil utilisateur
export async function POST(request: NextRequest) {
  try {
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
      )
    }

    const body: SaveProfileRequest = await request.json()
    const { profileData } = body

    // Validation des paramètres requis
    if (!profileData) {
      return NextResponse.json(
        { error: 'profileData est requis' },
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
    console.error('[profile] Profile save failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// GET - Récupérer le profil d'une session
export async function GET(request: NextRequest) {
  try {
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
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
    console.error('[profile] Profile fetch failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un profil existant
export async function PUT(request: NextRequest) {
  try {
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
      )
    }

    const body: SaveProfileRequest = await request.json()
    const { profileData } = body

    // Validation des paramètres requis
    if (!profileData) {
      return NextResponse.json(
        { error: 'profileData est requis' },
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
    console.error('[profile] Profile update failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer le profil d'une session
export async function DELETE(request: NextRequest) {
  try {
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
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

    // Supprimer le profil
    await profilesAPI.deleteProfile(session.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true,
      message: 'Profil supprimé avec succès' 
    })

  } catch (error) {
    console.error('[profile] Profile deletion failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 