import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

/**
 * API route pour récupérer les questions par municipalité
 * GET /api/questions?municipality=quebec
 * GET /api/questions?municipality=montreal
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const municipality = searchParams.get('municipality')

    if (!municipality) {
      return NextResponse.json(
        { error: 'Parameter municipality is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Récupérer les questions pour la municipalité donnée (optimisé pour performance)
    const { data: questions, error } = await supabase
      .from('questions')
      .select(`
        id,
        text,
        category,
        response_type,
        description,
        response_format,
        agreement_options,
        priority_options,
        order_index,
        municipality_id
      `)
      .eq('municipality_id', municipality)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('[API Questions] Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Failed to fetch questions', details: error.message },
        { status: 500 }
      )
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        {
          error: 'No questions found for this municipality',
          municipality,
          suggestions: ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']
        },
        { status: 404 }
      )
    }

    // Transformer les données pour correspondre au format attendu (optimisé pour performance)
    const formattedQuestions = questions.map(q => ({
      id: q.id,
      text: q.text,
      category: q.category,
      responseType: q.response_type,
      description: q.description || '', // Valeur par défaut pour compatibilité
      responseFormat: q.response_format || 'standard',
      agreementOptions: q.agreement_options || [],
      importanceOptions: [5, 4, 3, 2, 1], // Hardcodé (toujours identique)
      importanceDirectOptions: undefined, // Jamais utilisé
      priorityOptions: q.priority_options || undefined, // Crucial pour Q21
      customAgreementLabels: undefined, // Jamais utilisé
      customImportanceDirectLabels: undefined, // Jamais utilisé
      orderIndex: q.order_index,
      municipalityId: q.municipality_id
    }))

    const response = NextResponse.json({
      questions: formattedQuestions,
      count: formattedQuestions.length,
      municipality
    })

    // Cache pour améliorer les performances (5 minutes)
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')

    return response

  } catch (error) {
    console.error('[API Questions] Erreur inattendue:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}