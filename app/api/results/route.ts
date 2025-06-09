import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResultsAPI } from '@/lib/api/results'
import { ResponsesAPI } from '@/lib/api/responses'

// Types pour les requêtes
interface SaveResultsRequest {
  sessionToken: string
  resultsData: Record<string, any>
  politicalPosition?: { x: number; y: number }
}

// POST - Calculer et sauvegarder les résultats
export async function POST(request: NextRequest) {
  try {
    const body: SaveResultsRequest = await request.json()
    const { sessionToken, resultsData, politicalPosition } = body

    // Validation des paramètres requis
    if (!sessionToken || !resultsData) {
      return NextResponse.json(
        { error: 'sessionToken et resultsData sont requis' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const resultsAPI = new ResultsAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Construire l'objet ResultsData avec la structure requise
    const formattedResultsData = {
      calculatedResults: resultsData as any,
      metadata: {
        calculatedAt: new Date().toISOString(),
        version: '1.0',
        algorithm: 'standard'
      }
    }

    // Sauvegarder les résultats
    const results = await resultsAPI.saveResults(
      session.id, 
      formattedResultsData as any,
      'completed'
    )

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({ 
      success: true, 
      results,
      message: 'Résultats sauvegardés avec succès' 
    })

  } catch (error) {
    console.error('Erreur lors de la sauvegarde des résultats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// GET - Récupérer les résultats d'une session
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
    const resultsAPI = new ResultsAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Récupérer les résultats de la session
    const results = await resultsAPI.getResults(session.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({
      success: true,
      results,
      sessionId: session.id
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des résultats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les résultats existants
export async function PUT(request: NextRequest) {
  try {
    const body: SaveResultsRequest = await request.json()
    const { sessionToken, resultsData } = body

    if (!sessionToken || !resultsData) {
      return NextResponse.json(
        { error: 'sessionToken et resultsData sont requis' },
        { status: 400 }
      )
    }

    // Créer les instances d'API
    const sessionsAPI = new SessionsAPI()
    const resultsAPI = new ResultsAPI()

    // Vérifier que la session existe et est valide
    const session = await sessionsAPI.getSessionByToken(sessionToken)
    if (!session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      )
    }

    // Mettre à jour les résultats
    const formattedResultsData = {
      calculatedResults: resultsData as any,
      metadata: {
        calculatedAt: new Date().toISOString(),
        version: '1.0',
        algorithm: 'standard'
      }
    }

    const results = await resultsAPI.saveResults(
      session.id, 
      formattedResultsData as any,
      'completed'
    )

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session.id)

    return NextResponse.json({
      success: true,
      results,
      message: 'Résultats mis à jour avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour des résultats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 