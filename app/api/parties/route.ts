import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

// Interface pour les positions avec détails complets (API)
interface ApiPartyPosition {
  id: string
  questionId: string
  position: string
  source: string | null
  note: string | null
  quote: string | null
  question: {
    id: string
    text: string
    category: string
    orderIndex: number
  } | null
}

// Interface pour la réponse Supabase (correspond exactement à la query)
interface SupabasePartyPosition {
  id: string
  question_id: string
  position: string
  source: string | null
  note: string | null
  quote: string | null
  questions: {
    id: string
    text: string
    category: string
    order_index: number
  } | null
}

/**
 * API route pour récupérer les partis par municipalité avec leurs positions
 * GET /api/parties?municipality=quebec
 * GET /api/parties?municipality=montreal&include_positions=true
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const municipality = searchParams.get('municipality')
    const includePositions = searchParams.get('include_positions') === 'true'

    if (!municipality) {
      return NextResponse.json(
        { error: 'Parameter municipality is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Récupérer les partis pour la municipalité donnée (optimisé pour performance)
    const { data: parties, error: partiesError } = await supabase
      .from('parties')
      .select(`
        id,
        name,
        short_name,
        leader,
        logo_url,
        website_url,
        orientation,
        main_ideas_summary,
        strengths,
        reserves,
        municipality_id
      `)
      .eq('municipality_id', municipality)
      .order('name', { ascending: true })

    if (partiesError) {
      console.error('[API Parties] Erreur Supabase (partis):', partiesError)
      return NextResponse.json(
        { error: 'Failed to fetch parties', details: partiesError.message },
        { status: 500 }
      )
    }

    if (!parties || parties.length === 0) {
      return NextResponse.json(
        {
          error: 'No parties found for this municipality',
          municipality,
          suggestions: ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']
        },
        { status: 404 }
      )
    }

    // Transformer les données pour correspondre au format attendu
    const formattedParties = parties.map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.short_name,
      leader: p.leader,
      logoUrl: p.logo_url,
      websiteUrl: p.website_url,
      orientation: p.orientation,
      mainIdeasSummary: p.main_ideas_summary,
      strengths: p.strengths || [],
      reserves: p.reserves || [],
      municipalityId: p.municipality_id,
      positions: [] as ApiPartyPosition[] // Sera rempli si includePositions = true
    }))

    // Si demandé, récupérer les positions pour chaque parti
    if (includePositions) {
      for (const parti of formattedParties) {
        const { data: positions, error: positionsError } = await supabase
          .from('party_positions')
          .select(`
            id,
            question_id,
            position,
            source,
            note,
            quote,
            questions (
              id,
              text,
              category,
              order_index
            )
          `)
          .eq('party_id', parti.id)
          .order('questions(order_index)', { ascending: true }) as {
            data: SupabasePartyPosition[] | null
            error: Error | null
          }

        if (positionsError) {
          console.error(`[API Parties] Erreur positions pour ${parti.id}:`, positionsError)
          // Continue avec positions vides plutôt que de faire échouer toute la requête
          parti.positions = [] as ApiPartyPosition[]
        } else {
          parti.positions = positions?.map(pos => ({
            id: pos.id,
            questionId: pos.question_id,
            position: pos.position,
            source: pos.source,
            note: pos.note,
            quote: pos.quote,
            question: pos.questions ? {
              id: pos.questions.id,
              text: pos.questions.text,
              category: pos.questions.category,
              orderIndex: pos.questions.order_index
            } : null
          })) || []
        }
      }
    }

    // Calculer des statistiques globales
    const totalPositions = includePositions
      ? formattedParties.reduce((sum, p) => sum + p.positions.length, 0)
      : 0
    const avgPositionsPerParty = parties.length > 0 ? Math.round(totalPositions / parties.length) : 0

    const response = NextResponse.json({
      parties: formattedParties,
      count: formattedParties.length,
      municipality,
      includePositions,
      stats: {
        totalPositions,
        avgPositionsPerParty
      }
    })

    // Cache pour améliorer les performances (5 minutes)
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')

    return response

  } catch (error) {
    console.error('[API Parties] Erreur inattendue:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}