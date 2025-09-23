import { NextRequest, NextResponse } from 'next/server'
import { SessionsAPI } from '@/lib/api/sessions'
import { ResultsAPI, type ResultsData } from '@/lib/api/results'
import { validateSessionWithTestBypass } from '@/lib/api/auth-helper'

// Utility function for results metadata generation
const createResultsMetadata = () => ({
  calculatedAt: new Date().toISOString(),
  version: '1.0',
  algorithm: 'standard'
})

// Proper interfaces for type safety
interface PartyMatch {
  partyId: string;
  score: number;
  percentage: number;
  rank: number;
}

interface RequestCalculatedResults {
  partyScores: Record<string, number>;
  matchedParties: string[];
  topMatches: PartyMatch[];
  politicalPosition?: { x: number; y: number };
  completionPercentage: number;
  totalQuestions: number;
  answeredQuestions: number;
  calculatedAt: string;
}

// Types pour les requêtes
interface SaveResultsRequest {
  resultsData: RequestCalculatedResults
  municipalityId?: string // Support optionnel pour multi-municipalités
}

// POST - Calculer et sauvegarder les résultats
export async function POST(request: NextRequest) {
  try {
    const body: SaveResultsRequest = await request.json()
    const { resultsData, municipalityId } = body

    // Validation des paramètres requis
    if (!resultsData) {
      return NextResponse.json(
        { error: 'resultsData est requis' },
        { status: 400 }
      )
    }

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Construire l'objet ResultsData avec la structure requise
    const formattedResultsData: ResultsData = {
      calculatedResults: {
        partyScores: resultsData.partyScores,
        matchedParties: resultsData.matchedParties,
        politicalPosition: resultsData.politicalPosition,
        completionPercentage: resultsData.completionPercentage,
        totalQuestions: resultsData.totalQuestions,
        answeredQuestions: resultsData.answeredQuestions
      },
      metadata: createResultsMetadata()
    }

    // Sauvegarder les résultats
    const results = await resultsAPI.saveResults(
      session!.id,
      formattedResultsData,
      'completed',
      municipalityId
    )

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Résultats sauvegardés avec succès'
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
    // Extraire municipalityId depuis les paramètres de requête
    const url = new URL(request.url)
    const municipalityId = url.searchParams.get('municipalityId')

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Récupérer les résultats de la session avec filtrage optionnel par municipalité
    const results = await resultsAPI.getResults(session.id, municipalityId || undefined)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      results,
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
    const { resultsData, municipalityId } = body

    if (!resultsData) {
      return NextResponse.json(
        { error: 'resultsData est requis' },
        { status: 400 }
      )
    }

    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Mettre à jour les résultats
    const formattedResultsData: ResultsData = {
      calculatedResults: {
        partyScores: resultsData.partyScores,
        matchedParties: resultsData.matchedParties,
        politicalPosition: resultsData.politicalPosition,
        completionPercentage: resultsData.completionPercentage,
        totalQuestions: resultsData.totalQuestions,
        answeredQuestions: resultsData.answeredQuestions
      },
      metadata: createResultsMetadata()
    }

    const results = await resultsAPI.saveResults(
      session.id,
      formattedResultsData,
      'completed',
      municipalityId
    )

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Résultats mis à jour avec succès'
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
    console.error('Erreur lors de la mise à jour des résultats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer les résultats d'une session
export async function DELETE(request: NextRequest) {
  try {
    // Valider la session (avec bypass pour les tests)
    const { session, isTestMode } = await validateSessionWithTestBypass(request)

    // Créer les instances d'API
    const resultsAPI = new ResultsAPI()
    const sessionsAPI = new SessionsAPI()

    // Supprimer les résultats de la session
    await resultsAPI.deleteResults(session.id)

    // Mettre à jour l'activité de la session (sauf en mode test)
    if (!isTestMode) {
      await sessionsAPI.updateSessionActivity(session.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Résultats supprimés avec succès'
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
    console.error('Erreur lors de la suppression des résultats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 