import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResponsesAPI } from '@/lib/api/responses'
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types'
import { validateSessionWithTestBypass } from '@/lib/api/auth-helper'

// Types pour les requêtes (sessionToken retiré du body)
interface SaveResponseRequest {
  questionId: string
  responseType: 'agreement' | 'importance_direct' | 'priority_ranking'
  agreementValue?: AgreementOptionKey
  importanceDirectValue?: ImportanceDirectOptionKey
  priorityData?: Record<string, number>
  municipalityId?: string // Support optionnel pour multi-municipalités
}

// POST - Sauvegarder une réponse
export async function POST(request: NextRequest) {
  try {
    const body: SaveResponseRequest = await request.json()
    const { questionId, responseType, agreementValue, importanceDirectValue, priorityData, municipalityId } = body

    // Validation des paramètres requis
    if (!questionId || !responseType) {
      return NextResponse.json(
        { error: 'questionId et responseType sont requis' },
        { status: 400 }
      )
    }

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const responsesAPI = new ResponsesAPI()
    const sessionsAPI = new SessionsAPI()

    // Sauvegarder la réponse selon le type
    let response
    if (responseType === 'agreement' && agreementValue) {
      response = await responsesAPI.saveAgreementResponse(session.id, questionId, agreementValue, municipalityId)
    } else if (responseType === 'importance_direct' && importanceDirectValue) {
      response = await responsesAPI.saveImportanceDirectResponse(session.id, questionId, importanceDirectValue, municipalityId)
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
        const result = await responsesAPI.savePriorityResponse(session.id, questionId, priorityData, municipalityId)
        
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

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      response,
      message: 'Réponse sauvegardée avec succès'
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
    // Extraire municipalityId depuis les paramètres de requête
    const url = new URL(request.url)
    const municipalityId = url.searchParams.get('municipalityId')

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const responsesAPI = new ResponsesAPI()
    const sessionsAPI = new SessionsAPI()

    // Récupérer toutes les réponses de la session avec filtrage optionnel par municipalité
    const responses = await responsesAPI.getSessionResponses(session.id, municipalityId || undefined)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      responses,
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
    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const responsesAPI = new ResponsesAPI()
    const sessionsAPI = new SessionsAPI()

    // Supprimer toutes les réponses de la session
    await responsesAPI.clearSessionResponses(session.id)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Toutes les réponses ont été supprimées avec succès'
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
    console.error('[responses] Response deletion failed:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 