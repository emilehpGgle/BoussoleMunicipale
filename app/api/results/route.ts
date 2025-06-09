import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResultsAPI } from '@/lib/api/results'
import { ResponsesAPI } from '@/lib/api/responses'

// Helper function to extract sessionToken from Authorization header
function extractSessionToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Helper function for session validation
const validateSession = async (sessionToken: string) => {
  const sessionsAPI = new SessionsAPI()
  const session = await sessionsAPI.getSessionByToken(sessionToken)
  
  if (!session) {
    return {
      error: NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      ),
      session: null
    }
  }
  
  return { error: null, session }
}

// Utility function for results metadata generation
const createResultsMetadata = () => ({
  calculatedAt: new Date().toISOString(),
  version: '1.0',
  algorithm: 'standard'
})

// Proper interfaces for type safety
interface CalculatedResults {
  [key: string]: unknown
}

interface FormattedResultsData {
  calculatedResults: CalculatedResults
  metadata: {
    calculatedAt: string
    version: string
    algorithm: string
  }
}

// Types pour les requêtes (sessionToken retiré du body)
interface SaveResultsRequest {
  resultsData: CalculatedResults
  politicalPosition?: { x: number; y: number }
}

// POST - Calculer et sauvegarder les résultats
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

    const body: SaveResultsRequest = await request.json()
    const { resultsData, politicalPosition } = body

    // Validation des paramètres requis
    if (!resultsData) {
      return NextResponse.json(
        { error: 'resultsData est requis' },
        { status: 400 }
      )
    }

    // Valider la session
    const { error, session } = await validateSession(sessionToken)
    if (error) return error

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Construire l'objet ResultsData avec la structure requise
    const formattedResultsData: FormattedResultsData = {
      calculatedResults: resultsData,
      metadata: createResultsMetadata()
    }

    // Sauvegarder les résultats
    const results = await resultsAPI.saveResults(
      session!.id, 
      formattedResultsData as any, // Note: API expects specific format, keeping minimal casting
      'completed'
    )

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session!.id)

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
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
      )
    }

    // Valider la session
    const { error, session } = await validateSession(sessionToken)
    if (error) return error

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Récupérer les résultats de la session
    const results = await resultsAPI.getResults(session!.id)

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session!.id)

    return NextResponse.json({
      success: true,
      results,
      sessionId: session!.id
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
    // Extraire le sessionToken depuis le header Authorization
    const sessionToken = extractSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Header Authorization Bearer requis' },
        { status: 401 }
      )
    }

    const body: SaveResultsRequest = await request.json()
    const { resultsData } = body

    if (!resultsData) {
      return NextResponse.json(
        { error: 'resultsData est requis' },
        { status: 400 }
      )
    }

    // Valider la session
    const { error, session } = await validateSession(sessionToken)
    if (error) return error

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Mettre à jour les résultats
    const formattedResultsData: FormattedResultsData = {
      calculatedResults: resultsData,
      metadata: createResultsMetadata()
    }

    const results = await resultsAPI.saveResults(
      session!.id, 
      formattedResultsData as any, // Note: API expects specific format, keeping minimal casting
      'completed'
    )

    // Mettre à jour l'activité de la session
    await sessionsAPI.updateSessionActivity(session!.id)

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