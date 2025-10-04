import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

// Interface pour la réponse Supabase party-positions
interface SupabasePartyPositionResponse {
  id: string
  party_id: string
  question_id: string
  position: string
  source: string | null
  note: string | null
  quote: string | null
  created_at: string
  parties: {
    id: string
    name: string
    short_name: string
    leader: string
    logo_url: string | null
    municipality_id: string
    is_active: boolean
  } | null
  questions: {
    id: string
    text: string
    category: string
    response_type: string
    order_index: number
    municipality_id: string
  } | null
}

/**
 * API route pour récupérer les positions des partis
 * GET /api/party-positions?municipality=quebec
 * GET /api/party-positions?party_id=democratie_quebec
 * GET /api/party-positions?municipality=quebec&party_id=democratie_quebec
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const municipality = searchParams.get('municipality')
    const partyId = searchParams.get('party_id')

    // Au moins un paramètre requis
    if (!municipality && !partyId) {
      return NextResponse.json(
        { error: 'Parameter municipality or party_id is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Construire la requête de base avec JOINs simplifiés
    let query = supabase
      .from('party_positions')
      .select(`
        id,
        party_id,
        question_id,
        position,
        source,
        note,
        quote,
        created_at,
        parties!inner (
          id,
          name,
          short_name,
          leader,
          logo_url,
          municipality_id,
          is_active
        ),
        questions (
          id,
          text,
          category,
          response_type,
          order_index,
          municipality_id
        )
      `)
      // Filtrer uniquement les partis actifs
      .eq('parties.is_active', true)

    // Filtrer par party_id si fourni
    if (partyId) {
      query = query.eq('party_id', partyId)
    }

    // Filtrer par municipalité si fournie (approche en 2 étapes comme API parties)
    if (municipality) {
      // D'abord récupérer les party_ids de cette municipalité (uniquement actifs)
      const { data: municipalityParties, error: partiesError } = await supabase
        .from('parties')
        .select('id')
        .eq('municipality_id', municipality)
        .eq('is_active', true)

      if (partiesError) {
        console.error('[API Party Positions] Erreur récupération partis:', partiesError)
        return NextResponse.json(
          { error: 'Failed to fetch parties for municipality', details: partiesError.message },
          { status: 500 }
        )
      }

      if (!municipalityParties || municipalityParties.length === 0) {
        return NextResponse.json(
          {
            error: 'No parties found for this municipality',
            municipality,
            suggestions: ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']
          },
          { status: 404 }
        )
      }

      const partyIds = municipalityParties.map(p => p.id)
      query = query.in('party_id', partyIds)
    }

    // Order BY simplifié (un seul niveau)
    query = query.order('created_at', { ascending: true })

    const { data: positions, error } = await query as {
      data: SupabasePartyPositionResponse[] | null
      error: Error | null
    }

    if (error) {
      console.error('[API Party Positions] Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Failed to fetch party positions', details: error.message },
        { status: 500 }
      )
    }

    if (!positions || positions.length === 0) {
      return NextResponse.json(
        {
          error: 'No positions found',
          filters: { municipality, partyId },
          suggestions: municipality ? [] : ['Add municipality parameter or check party_id']
        },
        { status: 404 }
      )
    }

    // Transformer les données pour correspondre au format attendu
    const formattedPositions = positions.map(pos => ({
      id: pos.id,
      partyId: pos.party_id,
      questionId: pos.question_id,
      position: pos.position,
      source: pos.source,
      note: pos.note,
      quote: pos.quote,
      createdAt: pos.created_at,
      party: pos.parties ? {
        id: pos.parties.id,
        name: pos.parties.name,
        shortName: pos.parties.short_name,
        leader: pos.parties.leader,
        logoUrl: pos.parties.logo_url,
        color: null, // Colonne color n'existe pas dans la table parties
        municipalityId: pos.parties.municipality_id
      } : null,
      question: pos.questions ? {
        id: pos.questions.id,
        text: pos.questions.text,
        category: pos.questions.category,
        responseType: pos.questions.response_type,
        orderIndex: pos.questions.order_index,
        municipalityId: pos.questions.municipality_id
      } : null
    }))

    // Tri en JavaScript pour reproduire l'ordre souhaité (questions puis partis)
    const sortedPositions = formattedPositions.sort((a, b) => {
      // Trier d'abord par order_index des questions
      const orderDiff = (a.question?.orderIndex || 0) - (b.question?.orderIndex || 0)
      if (orderDiff !== 0) return orderDiff

      // Puis par nom du parti
      const partyNameA = a.party?.name || ''
      const partyNameB = b.party?.name || ''
      return partyNameA.localeCompare(partyNameB)
    })

    // Calculer des statistiques sur les positions triées
    const uniqueParties = Array.from(new Set(sortedPositions.map(p => p.partyId)))
    const uniqueQuestions = Array.from(new Set(sortedPositions.map(p => p.questionId)))
    const positionDistribution = sortedPositions.reduce((acc, pos) => {
      acc[pos.position] = (acc[pos.position] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Grouper par parti si plusieurs partis
    const positionsByParty = sortedPositions.reduce((acc, pos) => {
      if (!acc[pos.partyId]) {
        acc[pos.partyId] = []
      }
      acc[pos.partyId].push(pos)
      return acc
    }, {} as Record<string, typeof sortedPositions>)

    const response = NextResponse.json({
      positions: sortedPositions,
      positionsByParty: positionsByParty, // Toujours retourner positionsByParty
      count: sortedPositions.length,
      filters: { municipality, partyId },
      stats: {
        uniqueParties: uniqueParties.length,
        uniqueQuestions: uniqueQuestions.length,
        positionDistribution,
        avgPositionsPerParty: Math.round(sortedPositions.length / uniqueParties.length),
        completionRate: uniqueQuestions.length > 0 ?
          Math.round((sortedPositions.length / (uniqueParties.length * uniqueQuestions.length)) * 100) : 0
      }
    })

    // Cache pour améliorer les performances (5 minutes)
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')

    return response

  } catch (error) {
    console.error('[API Party Positions] Erreur inattendue:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}