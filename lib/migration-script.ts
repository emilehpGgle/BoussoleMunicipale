// Script de migration des données vers Supabase
// À exécuter une seule fois pour migrer les données statiques

import { boussoleQuestions, partiesData, Question, Party } from './boussole-data'
import { createClient } from './supabase/client'

const supabase = createClient()

/**
 * Migre toutes les questions vers la base de données
 */
export async function migrateQuestions() {
  console.log('🔄 Migration des questions en cours...')
  
  const questionsToInsert = boussoleQuestions.map((question: Question, index: number) => ({
    id: question.id,
    text: question.text,
    category: question.category,
    response_type: question.responseType,
    description: question.description || null,
    response_format: question.responseFormat || 'standard',
    agreement_options: question.agreementOptions,
    importance_options: question.importanceOptions,
    importance_direct_options: question.importanceDirectOptions || null,
    custom_agreement_labels: question.customAgreementLabels || null,
    custom_importance_direct_labels: question.customImportanceDirectLabels || null,
    order_index: index + 1, // Ordre basé sur la position dans le tableau
  }))

  const { data, error } = await supabase
    .from('questions')
    .upsert(questionsToInsert, { 
      onConflict: 'id',
      ignoreDuplicates: false 
    })

  if (error) {
    console.error('❌ Erreur lors de la migration des questions:', error)
    throw error
  }

  console.log(`✅ ${questionsToInsert.length} questions migrées avec succès`)
  return data
}

/**
 * Migre tous les partis vers la base de données
 */
export async function migrateParties() {
  console.log('🔄 Migration des partis en cours...')
  
  const partiesToInsert = partiesData.map((party: Party) => ({
    id: party.id,
    name: party.name,
    short_name: party.shortName || null,
    leader: party.leader,
    logo_url: party.logoUrl,
    website_url: party.websiteUrl || null,
    orientation: party.orientation || null,
    main_ideas_summary: party.mainIdeasSummary || null,
    strengths: party.strengths || [],
    reserves: party.reserves || [],
  }))

  const { data, error } = await supabase
    .from('parties')
    .upsert(partiesToInsert, { 
      onConflict: 'id',
      ignoreDuplicates: false 
    })

  if (error) {
    console.error('❌ Erreur lors de la migration des partis:', error)
    throw error
  }

  console.log(`✅ ${partiesToInsert.length} partis migrés avec succès`)
  return data
}

/**
 * Migre toutes les positions des partis vers la base de données
 */
export async function migratePartyPositions() {
  console.log('🔄 Migration des positions des partis en cours...')
  
  const positionsToInsert: Array<{
    party_id: string;
    question_id: string;
    position: string;
    source: string | null;
    note: string | null;
    quote: string | null;
  }> = []
  
  // Parcourir tous les partis et leurs positions
  partiesData.forEach((party: Party) => {
    party.positions.forEach((position) => {
      positionsToInsert.push({
        party_id: party.id,
        question_id: position.questionId,
        position: position.position,
        source: position.source || null,
        note: position.note || null,
        quote: position.quote || null,
      })
    })
  })

  const { data, error } = await supabase
    .from('party_positions')
    .upsert(positionsToInsert, { 
      onConflict: 'party_id,question_id',
      ignoreDuplicates: false 
    })

  if (error) {
    console.error('❌ Erreur lors de la migration des positions:', error)
    throw error
  }

  console.log(`✅ ${positionsToInsert.length} positions de partis migrées avec succès`)
  return data
}

/**
 * Vérifie que les données ont été migrées correctement
 */
export async function verifyMigration() {
  console.log('🔍 Vérification de la migration...')
  
  // Vérifier les questions
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .order('order_index')

  if (questionsError) {
    console.error('❌ Erreur lors de la vérification des questions:', questionsError)
    return false
  }

  // Vérifier les partis
  const { data: parties, error: partiesError } = await supabase
    .from('parties')
    .select('*')

  if (partiesError) {
    console.error('❌ Erreur lors de la vérification des partis:', partiesError)
    return false
  }

  // Vérifier les positions
  const { data: positions, error: positionsError } = await supabase
    .from('party_positions')
    .select('*')

  if (positionsError) {
    console.error('❌ Erreur lors de la vérification des positions:', positionsError)
    return false
  }

  console.log(`✅ Vérification terminée:`)
  console.log(`   - ${questions?.length || 0} questions`)
  console.log(`   - ${parties?.length || 0} partis`)
  console.log(`   - ${positions?.length || 0} positions`)

  return {
    questionsCount: questions?.length || 0,
    partiesCount: parties?.length || 0,
    positionsCount: positions?.length || 0,
    success: true
  }
}

/**
 * Fonction principale pour exécuter toute la migration
 */
export async function runFullMigration() {
  try {
    console.log('🚀 Début de la migration complète des données')
    console.log('=' .repeat(50))
    
    // Étape 1: Migrer les questions
    await migrateQuestions()
    
    // Étape 2: Migrer les partis  
    await migrateParties()
    
    // Étape 3: Migrer les positions des partis
    await migratePartyPositions()
    
    // Étape 4: Vérifier la migration
    const verification = await verifyMigration()
    
    console.log('=' .repeat(50))
    console.log('🎉 Migration complète terminée avec succès!')
    
    return verification
    
  } catch (error) {
    console.error('💥 Erreur lors de la migration:', error)
    throw error
  }
}

/**
 * Nettoie toutes les données (utile pour les tests)
 */
export async function cleanAllData() {
  console.log('🗑️ Nettoyage de toutes les données...')
  
  try {
    // Supprimer dans l'ordre inverse des dépendances
    await supabase.from('party_positions').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('parties').delete().neq('id', '')
    await supabase.from('questions').delete().neq('id', '')
    
    console.log('✅ Toutes les données ont été supprimées')
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
    throw error
  }
}

// Export d'une instance pour utilisation dans l'application
export const migrationAPI = {
  migrateQuestions,
  migrateParties,
  migratePartyPositions,
  verifyMigration,
  runFullMigration,
  cleanAllData
} 