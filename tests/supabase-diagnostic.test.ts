/**
 * Script de diagnostic Supabase
 * Test de connexion et audit des données existantes
 *
 * Usage: npx tsx tests/supabase-diagnostic.test.ts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

// Configuration depuis .env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('\n========================================')
console.log('🔍 DIAGNOSTIC SUPABASE - Boussole Municipale')
console.log('========================================\n')

// Fonction utilitaire pour logger les résultats
function logResult(testName: string, success: boolean, details?: any) {
  const icon = success ? '✅' : '❌'
  console.log(`${icon} ${testName}`)
  if (details) {
    console.log('   Détails:', JSON.stringify(details, null, 2))
  }
  console.log('')
}

// Test 1: Connexion Supabase
async function testConnection() {
  console.log('📡 Test 1: Connexion Supabase\n')

  try {
    // Vérifier les variables d'environnement
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      logResult('Variables d\'environnement', false, {
        SUPABASE_URL: SUPABASE_URL ? 'Définie' : 'MANQUANTE',
        SUPABASE_ANON_KEY: SUPABASE_ANON_KEY ? 'Définie' : 'MANQUANTE'
      })
      return false
    }

    logResult('Variables d\'environnement', true, {
      SUPABASE_URL,
      SUPABASE_ANON_KEY: SUPABASE_ANON_KEY.substring(0, 20) + '...'
    })

    // Test de connexion simple avec une query basique
    const { data, error } = await supabase
      .from('municipalities')
      .select('id, name')
      .limit(1)

    if (error) {
      logResult('Connexion à la base de données', false, {
        error: error.message,
        hint: error.hint,
        details: error.details
      })
      return false
    }

    logResult('Connexion à la base de données', true, {
      message: 'Connexion réussie',
      sampleData: data
    })
    return true

  } catch (err) {
    logResult('Connexion Supabase', false, {
      error: err instanceof Error ? err.message : 'Erreur inconnue'
    })
    return false
  }
}

// Test 2: Audit des municipalités
async function auditMunicipalities() {
  console.log('🏙️  Test 2: Audit des Municipalités\n')

  const { data, error } = await supabase
    .from('municipalities')
    .select('*')
    .order('id')

  if (error) {
    logResult('Table municipalities', false, { error: error.message })
    return false
  }

  const expectedCount = 6
  const success = data.length === expectedCount

  logResult('Table municipalities', success, {
    attendu: expectedCount,
    trouvé: data.length,
    municipalités: data.map(m => ({ id: m.id, name: m.name, is_active: m.is_active }))
  })

  return success
}

// Test 3: Audit des questions
async function auditQuestions() {
  console.log('❓ Test 3: Audit des Questions\n')

  const municipalities = ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']
  const expectedQuestionsPerCity = 21
  const totalExpected = municipalities.length * expectedQuestionsPerCity

  const results: Record<string, any> = {}
  let totalFound = 0

  for (const municipality of municipalities) {
    const { data, error } = await supabase
      .from('questions')
      .select('id, text, category, order_index, municipality_id')
      .eq('municipality_id', municipality)
      .order('order_index')

    if (error) {
      results[municipality] = { error: error.message, count: 0 }
    } else {
      results[municipality] = {
        count: data.length,
        success: data.length === expectedQuestionsPerCity,
        categories: [...new Set(data.map(q => q.category))]
      }
      totalFound += data.length
    }
  }

  const allSuccess = totalFound === totalExpected

  logResult('Table questions', allSuccess, {
    attendu: totalExpected,
    trouvé: totalFound,
    parMunicipalité: results
  })

  return allSuccess
}

// Test 4: Audit des partis
async function auditParties() {
  console.log('🎯 Test 4: Audit des Partis\n')

  const expectedByMunicipality = {
    quebec: 6,
    montreal: 5,
    laval: 3,
    gatineau: 2,
    longueuil: 2,
    levis: 3
  }

  const totalExpected = Object.values(expectedByMunicipality).reduce((a, b) => a + b, 0)
  const results: Record<string, any> = {}
  let totalFound = 0

  for (const [municipality, expectedCount] of Object.entries(expectedByMunicipality)) {
    const { data, error } = await supabase
      .from('parties')
      .select('id, name, leader, municipality_id')
      .eq('municipality_id', municipality)

    if (error) {
      results[municipality] = { error: error.message, count: 0 }
    } else {
      results[municipality] = {
        attendu: expectedCount,
        trouvé: data.length,
        success: data.length === expectedCount,
        partis: data.map(p => ({ id: p.id, name: p.name, leader: p.leader }))
      }
      totalFound += data.length
    }
  }

  const allSuccess = totalFound === totalExpected

  logResult('Table parties', allSuccess, {
    attendu: totalExpected,
    trouvé: totalFound,
    parMunicipalité: results
  })

  return allSuccess
}

// Test 5: Audit des positions
async function auditPartyPositions() {
  console.log('📊 Test 5: Audit des Positions des Partis\n')

  // Récupérer toutes les positions
  const { data: positions, error } = await supabase
    .from('party_positions')
    .select('id, party_id, question_id, position')

  if (error) {
    logResult('Table party_positions', false, { error: error.message })
    return false
  }

  // Analyser par parti
  const positionsByParty: Record<string, number> = {}
  positions?.forEach(pos => {
    positionsByParty[pos.party_id] = (positionsByParty[pos.party_id] || 0) + 1
  })

  const totalPositions = positions?.length || 0

  logResult('Table party_positions', totalPositions > 0, {
    totalPositions,
    positionsParParti: positionsByParty,
    premièresPositions: positions?.slice(0, 3).map(p => ({
      party_id: p.party_id,
      question_id: p.question_id,
      position: p.position
    }))
  })

  return totalPositions > 0
}

// Test 6: Audit des leaders
async function auditLeaders() {
  console.log('👤 Test 6: Audit des Leaders\n')

  const { data, error } = await supabase
    .from('leaders')
    .select('id, name, party_id')

  if (error) {
    logResult('Table leaders', false, { error: error.message })
    return false
  }

  const leadersCount = data?.length || 0

  logResult('Table leaders', leadersCount > 0, {
    totalLeaders: leadersCount,
    leaders: data?.map(l => ({ id: l.id, name: l.name, party_id: l.party_id }))
  })

  return leadersCount > 0
}

// Test 7: Vérification RLS (Row Level Security)
async function testRLS() {
  console.log('🔒 Test 7: Politiques RLS (Row Level Security)\n')

  const tables = ['municipalities', 'questions', 'parties', 'party_positions', 'leaders']
  const results: Record<string, boolean> = {}

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      results[table] = !error

      if (error) {
        console.log(`   ❌ ${table}: ${error.message}`)
      } else {
        console.log(`   ✅ ${table}: Lecture autorisée`)
      }
    } catch (err) {
      results[table] = false
      console.log(`   ❌ ${table}: Erreur`)
    }
  }

  const allSuccess = Object.values(results).every(r => r)
  console.log('')

  logResult('Politiques RLS', allSuccess, results)

  return allSuccess
}

// Exécution de tous les tests
async function runAllTests() {
  console.log('🚀 Début du diagnostic...\n')

  const results = {
    connection: await testConnection(),
    municipalities: await auditMunicipalities(),
    questions: await auditQuestions(),
    parties: await auditParties(),
    positions: await auditPartyPositions(),
    leaders: await auditLeaders(),
    rls: await testRLS()
  }

  // Résumé final
  console.log('\n========================================')
  console.log('📋 RÉSUMÉ DU DIAGNOSTIC')
  console.log('========================================\n')

  const totalTests = Object.keys(results).length
  const passedTests = Object.values(results).filter(r => r).length
  const successRate = Math.round((passedTests / totalTests) * 100)

  console.log(`Tests réussis: ${passedTests}/${totalTests} (${successRate}%)\n`)

  Object.entries(results).forEach(([test, passed]) => {
    const icon = passed ? '✅' : '❌'
    console.log(`${icon} ${test}`)
  })

  console.log('\n========================================\n')

  if (successRate === 100) {
    console.log('🎉 Tous les tests ont réussi ! La base de données est correctement configurée.\n')
  } else {
    console.log('⚠️  Certains tests ont échoué. Consultez les détails ci-dessus.\n')
  }

  return results
}

// Exécuter les tests
runAllTests().catch(console.error)
