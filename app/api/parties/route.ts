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

    console.log('[🔍 API PARTIES DIAGNOSTIC] ===================')
    console.log('[🔍 API PARTIES DIAGNOSTIC] Nouvelle requête API')
    console.log('[🔍 API PARTIES DIAGNOSTIC] Municipality demandée:', municipality)
    console.log('[🔍 API PARTIES DIAGNOSTIC] Include positions:', includePositions)
    console.log('[🔍 API PARTIES DIAGNOSTIC] URL complète:', request.url)
    console.log('[🔍 API PARTIES DIAGNOSTIC] Timestamp:', new Date().toISOString())

    if (!municipality) {
      console.log('[🔍 API PARTIES DIAGNOSTIC] ❌ Municipality manquante')
      return NextResponse.json(
        { error: 'Parameter municipality is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    console.log('[🔍 API PARTIES DIAGNOSTIC] ✅ Client Supabase créé')

    // NOUVEAU: Vérifier d'abord si la municipalité existe dans la table municipalities
    console.log('[🔍 API PARTIES DIAGNOSTIC] Vérification existence municipalité...')
    const { data: municipalityCheck, error: municipalityError } = await supabase
      .from('municipalities')
      .select('id, name, is_active')
      .eq('id', municipality)
      .single()

    console.log('[🔍 API PARTIES DIAGNOSTIC] Résultat check municipality:', {
      data: municipalityCheck,
      error: municipalityError,
      hasData: !!municipalityCheck,
      isActive: municipalityCheck?.is_active
    })

    console.log('[🔍 API PARTIES DIAGNOSTIC] Début requête parties pour municipality:', municipality, 'includePositions:', includePositions)

    // Récupérer les partis pour la municipalité donnée (optimisé pour performance)
    const { data: parties, error: partiesError } = await supabase
      .from('parties')
      .select(`
        id,
        name,
        short_name,
        leader,
        logo_url,
        leader_photo_url,
        website_url,
        orientation,
        main_ideas_summary,
        strengths,
        reserves,
        municipality_id
      `)
      .eq('municipality_id', municipality)
      .order('name', { ascending: true })

    console.log('[🔍 API PARTIES DIAGNOSTIC] Query parties terminée')
    console.log('[🔍 API PARTIES DIAGNOSTIC] Parties Error:', partiesError)
    console.log('[🔍 API PARTIES DIAGNOSTIC] Parties Data:', {
      hasData: !!parties,
      count: parties?.length || 0,
      firstParty: parties?.[0] ? {
        id: parties[0].id,
        name: parties[0].name,
        municipality_id: parties[0].municipality_id
      } : null
    })

    if (partiesError) {
      console.error('[🔍 API PARTIES DIAGNOSTIC] ❌ Erreur Supabase (partis):', partiesError)
      return NextResponse.json(
        { error: 'Failed to fetch parties', details: partiesError.message },
        { status: 500 }
      )
    }

    if (!parties || parties.length === 0) {
      console.log('[🔍 API PARTIES DIAGNOSTIC] ❌ Aucun parti trouvé pour:', municipality)

      // NOUVEAU: Log de toutes les municipalités disponibles pour debug
      console.log('[🔍 API PARTIES DIAGNOSTIC] Récupération de toutes les municipalités pour comparaison...')
      const { data: allMunicipalities } = await supabase
        .from('municipalities')
        .select('id, name')
        .order('id')

      console.log('[🔍 API PARTIES DIAGNOSTIC] Municipalités disponibles en base:', allMunicipalities)

      // Log de tous les partis pour debug
      const { data: allParties } = await supabase
        .from('parties')
        .select('id, name, municipality_id')
        .order('municipality_id')

      console.log('[🔍 API PARTIES DIAGNOSTIC] Tous les partis en base:', allParties)

      return NextResponse.json(
        {
          error: 'No parties found for this municipality',
          municipality,
          suggestions: ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis'],
          debug: {
            availableMunicipalities: allMunicipalities?.map(m => m.id) || [],
            totalPartiesInDB: allParties?.length || 0,
            partiesByMunicipality: allParties?.reduce((acc, party) => {
              acc[party.municipality_id] = (acc[party.municipality_id] || 0) + 1
              return acc
            }, {} as Record<string, number>) || {}
          }
        },
        { status: 404 }
      )
    }

    // Transformer les données pour correspondre au format attendu
    console.log('[DEBUG API PARTIES] Début transformation. Partis récupérés:', parties?.length)
    const formattedParties = parties.map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.short_name,
      leader: p.leader,
      logoUrl: p.logo_url,
      leaderPhotoUrl: p.leader_photo_url,
      websiteUrl: p.website_url,
      orientation: p.orientation,
      mainIdeasSummary: p.main_ideas_summary,
      strengths: p.strengths || [],
      reserves: p.reserves || [],
      priorities: [], // TODO: Sera rempli quand la colonne priorities sera ajoutée dans Supabase
      municipalityId: p.municipality_id,
      positions: [] as ApiPartyPosition[] // Sera rempli si includePositions = true
    }))
    console.log('[DEBUG API PARTIES] Transformation terminée. Priorities temporairement vides en attendant migration DB')

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