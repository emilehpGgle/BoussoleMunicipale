// lib/migration-multi-municipality.ts

import { createClient } from '@/lib/supabase/client'
import { supportedMunicipalities } from '@/lib/postal-code-mapping'
import { boussoleQuestions, partiesData } from '@/lib/boussole-data'

/**
 * Script de migration pour l'architecture multi-municipalités
 * 1. Crée la table municipalities
 * 2. Ajoute les colonnes municipality_id aux tables existantes
 * 3. Migre toutes les données Québec existantes
 */

export async function createMunicipalitiesTable() {
  const supabase = createClient()

  console.log('🏙️ [MIGRATION] Création de la table municipalities...')

  // Créer la table municipalities
  const { error: createTableError } = await supabase.rpc('sql', {
    query: `
      CREATE TABLE IF NOT EXISTS municipalities (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        code VARCHAR UNIQUE NOT NULL,
        province VARCHAR DEFAULT 'QC',
        population INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
  })

  if (createTableError) {
    console.error('❌ Erreur création table municipalities:', createTableError)
    throw createTableError
  }

  console.log('✅ Table municipalities créée')

  // Insérer les municipalités supportées
  console.log('📊 Insertion des municipalités...')

  for (const municipality of supportedMunicipalities) {
    const { error: insertError } = await supabase
      .from('municipalities')
      .upsert({
        id: municipality.id,
        name: municipality.name,
        code: municipality.id.toUpperCase(),
        province: 'QC',
        population: municipality.population,
        is_active: true
      })

    if (insertError) {
      console.error(`❌ Erreur insertion municipalité ${municipality.name}:`, insertError)
    } else {
      console.log(`✅ Municipalité ${municipality.name} insérée`)
    }
  }

  console.log('🎉 Municipalités créées avec succès')
}

export async function addMunicipalityIdColumns() {
  const supabase = createClient()

  console.log('🔧 [MIGRATION] Ajout des colonnes municipality_id...')

  const alterQueries = [
    // Questions
    `ALTER TABLE questions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR REFERENCES municipalities(id);`,
    `ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_generic BOOLEAN DEFAULT true;`,

    // Parties
    `ALTER TABLE parties ADD COLUMN IF NOT EXISTS municipality_id VARCHAR REFERENCES municipalities(id);`,

    // User tables
    `ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;`,
    `ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;`,
    `ALTER TABLE user_results ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;`,
  ]

  for (const query of alterQueries) {
    const { error } = await supabase.rpc('sql', { query })
    if (error) {
      console.error('❌ Erreur ALTER TABLE:', error)
      throw error
    }
  }

  console.log('✅ Colonnes municipality_id ajoutées')
}

export async function migrateQuebecData() {
  const supabase = createClient()

  console.log('🍁 [MIGRATION] Migration des données Québec...')

  // 1. Migrer les questions existantes vers Quebec
  console.log('📝 Migration des questions...')

  for (const question of boussoleQuestions) {
    const { error: questionError } = await supabase
      .from('questions')
      .upsert({
        id: question.id,
        text: question.text,
        category: question.category,
        response_type: question.responseType,
        description: question.description || null,
        response_format: question.responseFormat || 'standard',
        agreement_options: question.agreementOptions,
        importance_options: question.importanceOptions,
        importance_direct_options: question.importanceDirectOptions || null,
        priority_options: question.priorityOptions || null,
        custom_agreement_labels: question.customAgreementLabels || null,
        custom_importance_direct_labels: question.customImportanceDirectLabels || null,
        order_index: boussoleQuestions.indexOf(question),
        municipality_id: 'quebec', // Assigner à Québec
        is_generic: !isQuebecSpecificQuestion(question.id), // Marquer les questions spécifiques
      })

    if (questionError) {
      console.error(`❌ Erreur migration question ${question.id}:`, questionError)
    }
  }

  console.log('✅ Questions migrées vers Québec')

  // 2. Migrer les partis vers Quebec
  console.log('🏛️ Migration des partis...')

  for (const party of partiesData) {
    const { error: partyError } = await supabase
      .from('parties')
      .upsert({
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
        municipality_id: 'quebec', // Assigner à Québec
      })

    if (partyError) {
      console.error(`❌ Erreur migration parti ${party.name}:`, partyError)
    }

    // Migrer les positions du parti
    for (const position of party.positions) {
      const { error: positionError } = await supabase
        .from('party_positions')
        .upsert({
          party_id: party.id,
          question_id: position.questionId,
          position: position.position,
          source: position.source || null,
          note: position.note || null,
          quote: position.quote || null,
        })

      if (positionError) {
        console.error(`❌ Erreur migration position ${party.id}-${position.questionId}:`, positionError)
      }
    }
  }

  console.log('✅ Partis et positions migrés vers Québec')

  // 3. Mettre à jour les sessions utilisateur existantes
  console.log('👥 Mise à jour des sessions utilisateur...')

  const { error: sessionError } = await supabase
    .from('user_sessions')
    .update({ municipality_id: 'quebec' })
    .is('municipality_id', null)

  if (sessionError) {
    console.error('❌ Erreur mise à jour sessions:', sessionError)
  } else {
    console.log('✅ Sessions utilisateur mises à jour')
  }

  console.log('🎉 Migration complète des données Québec terminée')
}

/**
 * Détermine si une question est spécifique à Québec
 */
function isQuebecSpecificQuestion(questionId: string): boolean {
  const quebecSpecificQuestions = [
    'q1_tramway', // Spécifique au projet de tramway de Québec
    'q3_troisieme_lien', // Spécifique au 3e lien Québec-Lévis
  ]

  return quebecSpecificQuestions.includes(questionId)
}

/**
 * Migration complète multi-municipalités
 */
export async function runFullMultiMunicipalityMigration() {
  console.log('🚀 [MIGRATION] Début de la migration multi-municipalités')
  console.log('=' .repeat(60))

  try {
    // Étape 1: Créer la table municipalities
    await createMunicipalitiesTable()

    // Étape 2: Ajouter les colonnes municipality_id
    await addMunicipalityIdColumns()

    // Étape 3: Migrer les données Québec
    await migrateQuebecData()

    console.log('=' .repeat(60))
    console.log('🎉 [MIGRATION] Migration multi-municipalités terminée avec succès!')
    console.log('')
    console.log('📊 Résultats:')
    console.log(`  • ${supportedMunicipalities.length} municipalités créées`)
    console.log(`  • ${boussoleQuestions.length} questions migrées vers Québec`)
    console.log(`  • ${partiesData.length} partis migrés vers Québec`)
    console.log('  • Sessions utilisateur existantes mises à jour')
    console.log('')
    console.log('🔧 Prochaines étapes:')
    console.log('  • Tester la détection automatique de municipalité')
    console.log('  • Ajouter les données des autres municipalités')
    console.log('  • Implémenter le routing dynamique')

    return {
      success: true,
      municipalitiesCreated: supportedMunicipalities.length,
      questionsmigrated: boussoleQuestions.length,
      partiesMigrated: partiesData.length,
    }

  } catch (error) {
    console.error('💥 [MIGRATION] Erreur fatale:', error)
    throw error
  }
}

/**
 * Fonction de vérification post-migration
 */
export async function verifyMultiMunicipalityMigration() {
  const supabase = createClient()

  console.log('🔍 [VERIFICATION] Vérification de la migration...')

  // Vérifier les municipalités
  const { data: municipalities, error: munError } = await supabase
    .from('municipalities')
    .select('*')

  if (munError) {
    console.error('❌ Erreur vérification municipalités:', munError)
    return { success: false, error: munError }
  }

  // Vérifier les questions avec municipality_id
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id, municipality_id, is_generic')
    .eq('municipality_id', 'quebec')

  if (qError) {
    console.error('❌ Erreur vérification questions:', qError)
    return { success: false, error: qError }
  }

  // Vérifier les partis avec municipality_id
  const { data: parties, error: pError } = await supabase
    .from('parties')
    .select('id, name, municipality_id')
    .eq('municipality_id', 'quebec')

  if (pError) {
    console.error('❌ Erreur vérification partis:', pError)
    return { success: false, error: pError }
  }

  console.log('✅ Vérification terminée:')
  console.log(`  • ${municipalities?.length || 0} municipalités créées`)
  console.log(`  • ${questions?.length || 0} questions assignées à Québec`)
  console.log(`  • ${parties?.length || 0} partis assignés à Québec`)

  return {
    success: true,
    verification: {
      municipalities: municipalities?.length || 0,
      questions: questions?.length || 0,
      parties: parties?.length || 0,
    }
  }
}