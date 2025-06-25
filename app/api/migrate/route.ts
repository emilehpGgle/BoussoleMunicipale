import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

/**
 * API route pour exécuter la migration complète des données
 * GET /api/migrate - Lance la migration
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    console.log('🚀 [MIGRATE API] Début de la migration')
    
    const supabase = createClient()
    
    // Test de connexion d'abord
    console.log('🔗 [MIGRATE API] Test de connexion Supabase...')
    const { error: testError } = await supabase
      .from('user_sessions')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ [MIGRATE API] Erreur de connexion:', testError)
      throw new Error(`Connexion Supabase échouée: ${testError.message}`)
    }
    
    console.log('✅ [MIGRATE API] Connexion OK')
    
    // Vérifier si les questions existent déjà
    console.log('🔍 [MIGRATE API] Vérification des questions existantes...')
    const { data: existingQuestions, error: questionsError } = await supabase
      .from('questions')
      .select('id')
      .eq('id', 'q21_enjeux_prioritaires')
    
    if (questionsError) {
      console.error('❌ [MIGRATE API] Erreur lors de la vérification:', questionsError)
    } else {
      console.log('📊 [MIGRATE API] Questions q21 trouvées:', existingQuestions?.length || 0)
    }
    
    // Insérer manuellement la question q21 si elle n'existe pas
    if (!existingQuestions || existingQuestions.length === 0) {
      console.log('➕ [MIGRATE API] Insertion de la question q21_enjeux_prioritaires...')
      
      const { error: insertError } = await supabase
        .from('questions')
        .upsert({
          id: 'q21_enjeux_prioritaires',
          text: 'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d\'importance : 1er, 2e et 3e choix)',
          category: 'Priorités municipales',
          response_type: 'priority_ranking',
          description: 'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d\'importance.',
          response_format: 'priority',
          agreement_options: ['FA', 'PA', 'N', 'PD', 'FD', 'IDK'],
          importance_options: [5, 4, 3, 2, 1],
          importance_direct_options: null,
          priority_options: [
            'Transport et mobilité',
            'Logement abordable', 
            'Environnement et espaces verts',
            'Sécurité publique',
            'Développement économique',
            'Services municipaux',
            'Projet de tramway',
            'Troisième lien routier',
            'Lutte aux changements climatiques',
            'Patrimoine et identité'
          ],
          custom_agreement_labels: null,
          custom_importance_direct_labels: null,
          order_index: 21
        })
      
      if (insertError) {
        console.error('❌ [MIGRATE API] Erreur insertion q21:', insertError)
        throw new Error(`Insertion échouée: ${insertError.message}`)
      }
      
      console.log('✅ [MIGRATE API] Question q21_enjeux_prioritaires insérée avec succès')
    }
    
    return NextResponse.json({
      success: true,
      message: 'Migration de la question q21 terminée',
      questionsFound: existingQuestions?.length || 0
    })
    
  } catch (error) {
    console.error('❌ [MIGRATE API] Erreur:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de la migration'
    }, { status: 500 })
  }
}

/**
 * POST /api/migrate - Vérification simple des questions
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  try {
    console.log('🔍 [MIGRATE API] Vérification simple des questions')
    
    const supabase = createClient()
    
    const { data: questions, error } = await supabase
      .from('questions')
      .select('id, response_type')
      .order('order_index')
    
    if (error) {
      throw new Error(`Erreur de vérification: ${error.message}`)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Vérification terminée',
      questionsCount: questions?.length || 0,
      priorityQuestions: questions?.filter(q => q.response_type === 'priority_ranking') || []
    })
    
  } catch (error) {
    console.error('❌ [MIGRATE API] Erreur lors de la vérification:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de la vérification'
    }, { status: 500 })
  }
} 