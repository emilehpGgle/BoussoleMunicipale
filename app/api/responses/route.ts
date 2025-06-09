import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResponsesAPI } from '@/lib/api/responses'

// Types pour les requêtes
interface SaveResponseRequest {
  sessionToken: string
  questionId: string
  responseType: 'agreement' | 'importance' | 'importance_direct'
  agreementValue?: string
  importanceValue?: number
  importanceDirectValue?: string
}

interface GetResponsesRequest {
  sessionToken: string
}

// POST - Sauvegarder une réponse
export async function POST(request: NextRequest) {
  try {
    const body: SaveResponseRequest = await request.json()
    const { sessionToken, questionId, responseType, agreementValue, importanceValue, importanceDirectValue } = body

    // Validation des paramètres requis
    if (!sessionToken || !questionId || !responseType) {
      return NextResponse.json(
        { error: 'sessionToken, questionId et responseType sont requis' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const responsesAPI = new ResponsesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Sauvegarder la réponse selon le type
    let response
    if (responseType === 'agreement' && agreementValue) {
      response = await responsesAPI.saveAgreementResponse(session.id, questionId, agreementValue as any)
    } else if (responseType === 'importance' && importanceValue) {
      response = await responsesAPI.saveImportanceResponse(session.id, questionId, importanceValue as any)
    } else if (responseType === 'importance_direct' && importanceDirectValue) {
      response = await responsesAPI.saveImportanceDirectResponse(session.id, questionId, importanceDirectValue as any)
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
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'sessionToken est requis' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const responsesAPI = new ResponsesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

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
    const { searchParams } = new URL(request.url)
    const sessionToken = searchParams.get('sessionToken')
    const questionId = searchParams.get('questionId')
    const responseType = searchParams.get('responseType')

    if (!sessionToken || !questionId || !responseType) {
      return NextResponse.json(
        { error: 'sessionToken, questionId et responseType sont requis' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const responsesAPI = new ResponsesAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Supprimer la réponse spécifique (à implémenter ou supprimer toute la session)
    // Pour l'instant, on peut supprimer toutes les réponses de la session
    // TODO: Implémenter deleteSpecificResponse si nécessaire
    return NextResponse.json({ 
      error: 'Suppression de réponse spécifique non implémentée' 
    }, { status: 501 })

  } catch (error) {
    console.error('Erreur lors de la suppression de la réponse:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 