import { NextRequest, NextResponse } from 'next/server'
// Import retiré car non utilisé - les APIs utilisent leurs propres clients
import { SessionsAPI } from '@/lib/api/sessions'
import { ResponsesAPI } from '@/lib/api/responses'
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'

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
  responseType: 'agreement' | 'importance_direct' | 'priority_ranking'
  agreementValue?: AgreementOptionKey
  importanceDirectValue?: ImportanceDirectOptionKey
  priorityData?: Record<string, number>
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
    const { questionId, responseType, agreementValue, importanceDirectValue, priorityData } = body

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
    } else if (responseType === 'importance_direct' && importanceDirectValue) {
      response = await responsesAPI.saveImportanceDirectResponse(session.id, questionId, importanceDirectValue)
    } else if (responseType === 'priority_ranking') {
      if (!priorityData) {
        return NextResponse.json({
          success: false,
          error: 'priorityData est requis pour les réponses de priorité'
        }, { status: 400 })
      }

      console.log('🎯 [RESPONSES API] Sauvegarde priorité - session:', session.id.substring(0, 10) + '...', 'question:', questionId)

      try {
        // Utiliser la méthode normale maintenant que la question existe
        const result = await responsesAPI.savePriorityResponse(session.id, questionId, priorityData)
        
        console.log('✅ [RESPONSES API] Priorité sauvegardée avec succès')
        return NextResponse.json({
          success: true,
          message: 'Réponse de priorité sauvegardée',
          data: result
        })
      } catch (error) {
        console.error('[responses] Response save failed:', error)
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 })
      }
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
    console.error('[responses] Response save failed:', error)
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
    console.error('[responses] Response fetch failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer toutes les réponses d'une session
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

    // Valider et récupérer la session
    const { session, sessionsAPI } = await validateSession(sessionToken)
    const responsesAPI = new ResponsesAPI()

    // Supprimer toutes les réponses de la session
    await responsesAPI.clearSessionResponses(session.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true,
      message: 'Toutes les réponses ont été supprimées avec succès' 
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Session invalide ou expirée') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    console.error('[responses] Response deletion failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 