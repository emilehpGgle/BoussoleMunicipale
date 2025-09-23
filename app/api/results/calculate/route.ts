import { NextRequest, NextResponse } from 'next/server'
import { calculateUserPoliticalPosition, calculatePoliticalDistance, type UserAnswers } from '@/lib/political-map-calculator'

// Types pour les requêtes de calcul
interface CalculateRequest {
  municipality: string
  responses: Record<string, string>
  importance?: Record<string, number>
}

interface PartyScore {
  party: {
    id: string
    name: string
    color: string
  }
  score: number
  percentage: number
}

// POST - Calculer les résultats politiques
export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequest = await request.json()
    const { municipality, responses } = body

    // Validation des paramètres requis
    if (!municipality || !responses) {
      return NextResponse.json(
        { error: 'municipality et responses sont requis' },
        { status: 400 }
      )
    }

    // Récupérer les questions et partis pour cette municipalité
    const questionsRes = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/questions?municipality=${municipality}`)
    const questionsData = await questionsRes.json()

    const partiesRes = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/parties?municipality=${municipality}`)
    const partiesData = await partiesRes.json()

    if (!questionsData.questions || !partiesData.parties) {
      return NextResponse.json(
        { error: 'Impossible de récupérer les données pour cette municipalité' },
        { status: 400 }
      )
    }

    // Calculer la position politique de l'utilisateur
    const userAnswers: UserAnswers = {}
    Object.entries(responses).forEach(([questionId, answer]) => {
      userAnswers[questionId] = answer as 'FA' | 'PA' | 'N' | 'PD' | 'FD' | 'IDK'
    })

    const politicalPosition = calculateUserPoliticalPosition(userAnswers)

    // Récupérer les positions des partis depuis l'API party-positions
    const positionsRes = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/party-positions?municipality=${municipality}`)
    const positionsData = await positionsRes.json()

    if (!positionsData.positions) {
      return NextResponse.json(
        { error: 'Impossible de récupérer les positions des partis' },
        { status: 400 }
      )
    }

    // Transformer les positions Supabase vers le format UserAnswers
    const { transformAllPartyPositionsToUserAnswers } = await import('@/lib/supabase-transform')

    // Helper fonction pour grouper les positions par parti si positionsByParty est undefined
    function createGroupedPositions(positions: Array<{ partyId: string; [key: string]: unknown }>): Record<string, Array<{ partyId: string; [key: string]: unknown }>> {
      return positions.reduce((acc, pos) => {
        if (!acc[pos.partyId]) acc[pos.partyId] = []
        acc[pos.partyId].push(pos)
        return acc
      }, {} as Record<string, Array<{ partyId: string; [key: string]: unknown }>>)
    }

    // Utiliser positionsByParty si disponible, sinon créer le groupement manuellement
    const groupedPositions = positionsData.positionsByParty || createGroupedPositions(positionsData.positions)
    const partyAnswers = transformAllPartyPositionsToUserAnswers(groupedPositions)

    // Calculer les positions politiques de chaque parti
    const partyPositions: Record<string, { x: number; y: number }> = {}
    Object.entries(partyAnswers).forEach(([partyId, answers]) => {
      partyPositions[partyId] = calculateUserPoliticalPosition(answers)
    })

    // Calculer les scores de compatibilité avec la VRAIE logique de production
    const partyScores: PartyScore[] = partiesData.parties.map((party: { id: string, name: string, color?: string }) => {
      const partyPosition = partyPositions[party.id]
      let score = 0

      if (partyPosition) {
        // MÊME calcul que useResults.ts et page de production
        const distance = calculatePoliticalDistance(politicalPosition, partyPosition)
        // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
        const maxDistance = 283
        const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
        score = compatibility
      } else {
        console.warn(`Pas de position politique définie pour le parti: ${party.id}`)
        score = 0
      }

      return {
        party: {
          id: party.id,
          name: party.name,
          color: party.color || '#666666'
        },
        score,
        percentage: Math.round(score)
      }
    }).sort((a: PartyScore, b: PartyScore) => b.score - a.score)

    // Préparer la réponse
    const results = {
      scores: partyScores,
      politicalPosition,
      municipality,
      calculatedAt: new Date().toISOString(),
      totalQuestions: questionsData.questions.length,
      answeredQuestions: Object.keys(responses).length,
      completionPercentage: Math.round((Object.keys(responses).length / questionsData.questions.length) * 100)
    }

    return NextResponse.json({
      success: true,
      ...results
    })

  } catch (error) {
    console.error('[results/calculate] Calculation failed:', error)
    return NextResponse.json(
      { error: 'Erreur lors du calcul des résultats' },
      { status: 500 }
    )
  }
}