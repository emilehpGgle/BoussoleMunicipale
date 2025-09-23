import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ProfilesAPI } from '@/lib/api/profiles'
import type { ProfileData } from '@/lib/api/profiles'
import { validateSessionWithTestBypass } from '@/lib/api/auth-helper'

// Types pour les requêtes (sessionToken retiré du body)
interface SaveProfileRequest {
  profileData: ProfileData
  municipalityId?: string // Support optionnel pour multi-municipalités
}

// POST - Sauvegarder un profil utilisateur
export async function POST(request: NextRequest) {
  try {
    const body: SaveProfileRequest = await request.json()
    const { profileData, municipalityId } = body

    // Validation des paramètres requis
    if (!profileData) {
      return NextResponse.json(
        { error: 'profileData est requis' },
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

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const profilesAPI = new ProfilesAPI()
    const sessionsAPI = new SessionsAPI()

    // Sauvegarder le profil
    const profile = await profilesAPI.saveProfile(session.id, profileData, municipalityId)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      profile,
      message: 'Profil sauvegardé avec succès'
    })

  } catch (error) {
    // Gestion spéciale des erreurs d'authentification
    if (error instanceof Error && (
      error.message.includes('Authorization') ||
      error.message.includes('Session')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

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
    // Extraire municipalityId depuis les paramètres de requête
    const url = new URL(request.url)
    const municipalityId = url.searchParams.get('municipalityId')

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const profilesAPI = new ProfilesAPI()
    const sessionsAPI = new SessionsAPI()

    // Récupérer le profil de la session avec filtrage optionnel par municipalité
    const profile = await profilesAPI.getProfile(session.id, municipalityId || undefined)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      profile,
      sessionId: session.id
    })

  } catch (error) {
    // Gestion spéciale des erreurs d'authentification
    if (error instanceof Error && (
      error.message.includes('Authorization') ||
      error.message.includes('Session')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
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
    const body: SaveProfileRequest = await request.json()
    const { profileData, municipalityId } = body

    // Validation des paramètres requis
    if (!profileData) {
      return NextResponse.json(
        { error: 'profileData est requis' },
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

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const profilesAPI = new ProfilesAPI()
    const sessionsAPI = new SessionsAPI()

    // Mettre à jour le profil
    const profile = await profilesAPI.updateProfile(session.id, profileData, municipalityId)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      profile,
      message: 'Profil mis à jour avec succès'
    })

  } catch (error) {
    // Gestion spéciale des erreurs d'authentification
    if (error instanceof Error && (
      error.message.includes('Authorization') ||
      error.message.includes('Session')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
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
    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const profilesAPI = new ProfilesAPI()
    const sessionsAPI = new SessionsAPI()

    // Supprimer le profil
    await profilesAPI.deleteProfile(session.id)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Profil supprimé avec succès'
    })

  } catch (error) {
    // Gestion spéciale des erreurs d'authentification
    if (error instanceof Error && (
      error.message.includes('Authorization') ||
      error.message.includes('Session')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    console.error('[profile] Profile deletion failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 