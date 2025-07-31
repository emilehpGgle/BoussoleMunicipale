import { NextRequest, NextResponse } from 'next/server'
import { migrateQuestions, migrateParties, migratePartyPositions, verifyMigration } from '@/lib/migration-script'

/**
 * API route pour exécuter la migration complète des données
 * GET /api/migrate - Lance la migration COMPLÈTE (questions + partis + positions)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    console.log('🚀 [MIGRATE API] Début de la migration COMPLÈTE')
    console.log('=' .repeat(50))
    
    // Étape 1: Migrer TOUTES les questions (incluant nos corrections importance_direct → agreement)
    console.log('📝 [MIGRATE API] Migration des questions...')
    await migrateQuestions()
    
    // Étape 2: Migrer les partis (incluant nos corrections de positions)
    console.log('🏛️ [MIGRATE API] Migration des partis...')
    await migrateParties()
    
    // Étape 3: Migrer les positions des partis (avec nos corrections)
    console.log('📊 [MIGRATE API] Migration des positions...')
    await migratePartyPositions()
    
    // Étape 4: Vérifier que tout est synchronisé
    console.log('🔍 [MIGRATE API] Vérification finale...')
    const verification = await verifyMigration()
    
    console.log('=' .repeat(50))
    console.log('🎉 [MIGRATE API] Migration complète terminée avec succès!')
    
    return NextResponse.json({
      success: true,
      message: 'Migration complète terminée - Base de données synchronisée avec les dernières corrections',
      ...verification
    })
    
  } catch (error) {
    console.error('❌ [MIGRATE API] Erreur lors de la migration complète:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      message: 'Erreur lors de la migration complète - Base de données NON synchronisée'
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