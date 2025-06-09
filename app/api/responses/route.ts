import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResponsesAPI } from '@/lib/api/responses'
import { AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

// Helper function to extract sessionToken from Authorization header
function extractSessionToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Helper function for session validation
async function validateSession(sessionToken: string) {
  const sessionsAPI = new SessionsAPI()
  const session = await sessionsAPI.getSessionByToken(sessionToken)
  if (!session) {
    throw new Error('Session invalide ou expirée')
  }
  return { session, sessionsAPI }
}

// Types pour les requêtes (sessionToken retiré du body)
interface SaveResponseRequest {
  questionId: string
  responseType: 'agreement' | 'importance' | 'importance_direct'
  agreementValue?: AgreementOptionKey
  importanceValue?: ImportanceOptionKey
  importanceDirectValue?: ImportanceDirectOptionKey
}

// POST - Sauvegarder une réponse
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

    const body: SaveResponseRequest = await request.json()
    const { questionId, responseType, agreementValue, importanceValue, importanceDirectValue } = body

    // Validation des paramètres requis
    if (!questionId || !responseType) {
      return NextResponse.json(
        { error: 'questionId et responseType sont requis' },
        { status: 400 }
      )
    }

    // Valider et récupérer la session
    const { session, sessionsAPI } = await validateSession(sessionToken)
    const responsesAPI = new ResponsesAPI()

    // Sauvegarder la réponse selon le type
    let response
    if (responseType === 'agreement' && agreementValue) {
      response = await responsesAPI.saveAgreementResponse(session.id, questionId, agreementValue)
    } else if (responseType === 'importance' && importanceValue) {
      response = await responsesAPI.saveImportanceResponse(session.id, questionId, importanceValue)
    } else if (responseType === 'importance_direct' && importanceDirectValue) {
      response = await responsesAPI.saveImportanceDirectResponse(session.id, questionId, importanceDirectValue)
    } else {
      return NextResponse.json(
        { error: 'Valeur de réponse manquante pour le type spécifié' },
        { status: 400 }
      )
    }

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true, 
      response,
      message: 'Réponse sauvegardée avec succès' 
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Session invalide ou expirée') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    console.error('Erreur lors de la sauvegarde de la réponse:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// GET - Récupérer toutes les réponses d'une session
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

    // Valider et récupérer la session
    const { session, sessionsAPI } = await validateSession(sessionToken)
    const responsesAPI = new ResponsesAPI()

    // Récupérer toutes les réponses de la session
    const responses = await responsesAPI.getSessionResponses(session.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({
      success: true,
      responses,
      sessionId: session.id
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Session invalide ou expirée') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    console.error('Erreur lors de la récupération des réponses:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une réponse spécifique
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

    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('questionId')
    const responseType = searchParams.get('responseType')

    if (!questionId || !responseType) {
      return NextResponse.json(
        { error: 'questionId et responseType sont requis' },
        { status: 400 }
      )
    }

    // Valider et récupérer la session
    const { session, sessionsAPI } = await validateSession(sessionToken)
    const responsesAPI = new ResponsesAPI()

    // Supprimer la réponse spécifique (à implémenter ou supprimer toute la session)
    // Pour l'instant, on peut supprimer toutes les réponses de la session
    // TODO: Implémenter deleteSpecificResponse si nécessaire
    return NextResponse.json({ 
      error: 'Suppression de réponse spécifique non implémentée' 
    }, { status: 501 })

  } catch (error) {
    if (error instanceof Error && error.message === 'Session invalide ou expirée') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    console.error('Erreur lors de la suppression de la réponse:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 