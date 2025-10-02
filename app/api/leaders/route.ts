import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

/**
 * API route pour récupérer les leaders par municipalité
 * GET /api/leaders?municipality=quebec
 * GET /api/leaders?municipality=montreal&slug=luc-rabouin
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const municipality = searchParams.get('municipality')
    const slug = searchParams.get('slug')

    console.log('[🔍 API LEADERS] ===================')
    console.log('[🔍 API LEADERS] Nouvelle requête API')
    console.log('[🔍 API LEADERS] Municipality:', municipality)
    console.log('[🔍 API LEADERS] Slug:', slug)

    if (!municipality) {
      return NextResponse.json(
        { error: 'Le paramètre municipality est requis' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Si un slug est fourni, récupérer un leader spécifique
    if (slug) {
      console.log(`[🔍 API LEADERS] Chargement leader spécifique: ${slug}`)

      const { data: leader, error } = await supabase
        .from('leaders')
        .select(`
          *,
          party:parties!leaders_party_id_fkey(
            id,
            name,
            short_name,
            logo_url,
            orientation,
            website_url
          )
        `)
        .eq('municipality_id', municipality)
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('[❌ API LEADERS] Erreur Supabase:', error)
        return NextResponse.json(
          { error: `Erreur lors de la récupération du leader: ${error.message}` },
          { status: 500 }
        )
      }

      if (!leader) {
        console.log(`[❌ API LEADERS] Leader ${slug} non trouvé pour ${municipality}`)
        return NextResponse.json(
          { error: `Leader ${slug} non trouvé pour la municipalité ${municipality}` },
          { status: 404 }
        )
      }

      console.log('[✅ API LEADERS] Leader trouvé:', leader.name)

      return NextResponse.json({
        leader,
        municipality,
      })
    }

    // Sinon, récupérer tous les leaders de la municipalité
    console.log(`[🔍 API LEADERS] Chargement tous les leaders pour ${municipality}`)

    const { data: leaders, error } = await supabase
      .from('leaders')
      .select(`
        *,
        party:parties!leaders_party_id_fkey(
          id,
          name,
          short_name,
          logo_url,
          orientation,
          website_url
        )
      `)
      .eq('municipality_id', municipality)
      .order('name', { ascending: true })

    if (error) {
      console.error('[❌ API LEADERS] Erreur Supabase:', error)
      return NextResponse.json(
        { error: `Erreur lors de la récupération des leaders: ${error.message}` },
        { status: 500 }
      )
    }

    console.log(`[✅ API LEADERS] ${leaders?.length || 0} leaders récupérés`)

    return NextResponse.json({
      leaders: leaders || [],
      municipality,
      count: leaders?.length || 0,
    })

  } catch (error) {
    console.error('[❌ API LEADERS] Erreur non gérée:', error)
    return NextResponse.json(
      {
        error: 'Erreur serveur lors de la récupération des leaders',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}