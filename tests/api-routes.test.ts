/**
 * Suite de tests pour les API routes
 * Teste chaque endpoint pour identifier les erreurs 500
 *
 * Usage: npx tsx tests/api-routes.test.ts
 */

import { config } from 'dotenv'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

console.log('\n========================================')
console.log('🧪 TESTS API ROUTES - Boussole Municipale')
console.log('========================================\n')

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'
const MUNICIPALITIES = ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis']

interface TestResult {
  endpoint: string
  status: number
  success: boolean
  error?: string
  data?: any
  duration?: number
}

const results: TestResult[] = []

// Fonction utilitaire pour tester un endpoint
async function testEndpoint(
  endpoint: string,
  description: string,
  expectedStatus = 200
): Promise<TestResult> {
  const startTime = Date.now()

  console.log(`\n📡 Test: ${description}`)
  console.log(`   Endpoint: ${endpoint}`)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    const duration = Date.now() - startTime

    let data
    let error

    // Essayer de parser la réponse
    try {
      data = await response.json()
    } catch (e) {
      error = 'Impossible de parser la réponse JSON'
    }

    const success = response.status === expectedStatus
    const icon = success ? '✅' : '❌'

    console.log(`   ${icon} Status: ${response.status} (attendu: ${expectedStatus})`)
    console.log(`   ⏱️  Durée: ${duration}ms`)

    if (!success && data) {
      console.log(`   ⚠️  Erreur:`, data.error || data.message || 'Erreur inconnue')
      if (data.details) {
        console.log(`   📝 Détails:`, data.details)
      }
      if (data.debug) {
        console.log(`   🔍 Debug:`, JSON.stringify(data.debug, null, 2))
      }
    } else if (success && data) {
      console.log(`   ✅ Données reçues:`, {
        count: data.count || data.parties?.length || data.questions?.length || 0,
        hasData: !!(data.parties || data.questions || data.leaders || data.positions)
      })
    }

    const result: TestResult = {
      endpoint,
      status: response.status,
      success,
      duration,
      data: success ? data : undefined,
      error: success ? undefined : (data?.error || data?.message || 'Erreur inconnue')
    }

    results.push(result)
    return result

  } catch (err) {
    const duration = Date.now() - startTime
    const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'

    console.log(`   ❌ Erreur: ${errorMessage}`)
    console.log(`   ⏱️  Durée: ${duration}ms`)

    const result: TestResult = {
      endpoint,
      status: 0,
      success: false,
      duration,
      error: errorMessage
    }

    results.push(result)
    return result
  }
}

// Test Suite 1: API Parties
async function testPartiesAPI() {
  console.log('\n\n🎯 Suite 1: API /api/parties\n')
  console.log('========================================')

  for (const municipality of MUNICIPALITIES) {
    await testEndpoint(
      `/api/parties?municipality=${municipality}`,
      `Récupérer partis pour ${municipality}`
    )

    await testEndpoint(
      `/api/parties?municipality=${municipality}&include_positions=true`,
      `Récupérer partis avec positions pour ${municipality}`
    )
  }

  // Test cas d'erreur
  await testEndpoint(
    '/api/parties',
    'Test sans paramètre municipality (devrait échouer)',
    400
  )

  await testEndpoint(
    '/api/parties?municipality=invalid',
    'Test avec municipalité invalide (devrait échouer)',
    404
  )
}

// Test Suite 2: API Questions
async function testQuestionsAPI() {
  console.log('\n\n❓ Suite 2: API /api/questions\n')
  console.log('========================================')

  for (const municipality of MUNICIPALITIES) {
    await testEndpoint(
      `/api/questions?municipality=${municipality}`,
      `Récupérer questions pour ${municipality}`
    )
  }

  // Test cas d'erreur
  await testEndpoint(
    '/api/questions',
    'Test sans paramètre municipality (devrait échouer)',
    400
  )

  await testEndpoint(
    '/api/questions?municipality=invalid',
    'Test avec municipalité invalide (devrait échouer)',
    404
  )
}

// Test Suite 3: API Leaders
async function testLeadersAPI() {
  console.log('\n\n👤 Suite 3: API /api/leaders\n')
  console.log('========================================')

  for (const municipality of MUNICIPALITIES) {
    await testEndpoint(
      `/api/leaders?municipality=${municipality}`,
      `Récupérer leaders pour ${municipality}`
    )
  }
}

// Test Suite 4: API Party Positions
async function testPartyPositionsAPI() {
  console.log('\n\n📊 Suite 4: API /api/party-positions\n')
  console.log('========================================')

  // On va tester avec les IDs de partis connus
  const testPartyIds = [
    'qff_qc', // Québec forte et fière
    'pm_mtl', // Projet Montréal
    'ml_lav', // Mouvement lavallois
  ]

  for (const partyId of testPartyIds) {
    await testEndpoint(
      `/api/party-positions?party_id=${partyId}`,
      `Récupérer positions pour parti ${partyId}`
    )
  }
}

// Test Suite 5: API Sessions
async function testSessionsAPI() {
  console.log('\n\n🔑 Suite 5: API /api/sessions\n')
  console.log('========================================')

  // Test création de session
  await testEndpoint(
    '/api/sessions',
    'Créer une nouvelle session (GET)',
    200
  )

  // Note: POST test nécessiterait une implémentation plus complexe
  console.log('\n   ℹ️  Tests POST/PUT/DELETE nécessitent une implémentation plus avancée')
}

// Fonction pour générer le rapport
function generateReport() {
  console.log('\n\n========================================')
  console.log('📋 RAPPORT DE TESTS')
  console.log('========================================\n')

  const totalTests = results.length
  const passedTests = results.filter(r => r.success).length
  const failedTests = totalTests - passedTests
  const successRate = Math.round((passedTests / totalTests) * 100)

  console.log(`Total de tests: ${totalTests}`)
  console.log(`Tests réussis: ${passedTests} ✅`)
  console.log(`Tests échoués: ${failedTests} ❌`)
  console.log(`Taux de réussite: ${successRate}%\n`)

  // Statistiques par endpoint
  const endpointStats: Record<string, { total: number; passed: number }> = {}

  results.forEach(result => {
    const baseEndpoint = result.endpoint.split('?')[0]
    if (!endpointStats[baseEndpoint]) {
      endpointStats[baseEndpoint] = { total: 0, passed: 0 }
    }
    endpointStats[baseEndpoint].total++
    if (result.success) {
      endpointStats[baseEndpoint].passed++
    }
  })

  console.log('📊 Statistiques par endpoint:\n')
  Object.entries(endpointStats).forEach(([endpoint, stats]) => {
    const rate = Math.round((stats.passed / stats.total) * 100)
    const icon = rate === 100 ? '✅' : rate >= 50 ? '⚠️' : '❌'
    console.log(`${icon} ${endpoint}: ${stats.passed}/${stats.total} (${rate}%)`)
  })

  // Liste des échecs
  const failures = results.filter(r => !r.success)
  if (failures.length > 0) {
    console.log('\n\n❌ TESTS ÉCHOUÉS:\n')
    failures.forEach((failure, index) => {
      console.log(`${index + 1}. ${failure.endpoint}`)
      console.log(`   Status: ${failure.status}`)
      console.log(`   Erreur: ${failure.error}`)
      console.log('')
    })
  }

  // Durée moyenne
  const avgDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0) / results.length
  console.log(`\n⏱️  Durée moyenne: ${Math.round(avgDuration)}ms`)

  console.log('\n========================================\n')

  if (successRate === 100) {
    console.log('🎉 Tous les tests ont réussi ! Les API routes fonctionnent correctement.\n')
  } else if (successRate >= 50) {
    console.log('⚠️  Certains tests ont échoué. Consultez les détails ci-dessus.\n')
  } else {
    console.log('🚨 La majorité des tests ont échoué. Problème critique détecté.\n')
  }

  return {
    totalTests,
    passedTests,
    failedTests,
    successRate,
    results,
    endpointStats
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.log('🚀 Démarrage des tests API...\n')
  console.log(`Base URL: ${BASE_URL}\n`)

  // Vérifier que le serveur est démarré
  try {
    await fetch(BASE_URL)
  } catch (err) {
    console.log('❌ ERREUR: Le serveur Next.js ne semble pas démarré.')
    console.log(`   Veuillez démarrer le serveur avec: pnpm run dev`)
    console.log(`   Puis relancer ce script.\n`)
    process.exit(1)
  }

  // Exécuter les suites de tests
  await testPartiesAPI()
  await testQuestionsAPI()
  await testLeadersAPI()
  await testPartyPositionsAPI()
  await testSessionsAPI()

  // Générer le rapport
  const report = generateReport()

  // Retourner le rapport pour usage programmatique
  return report
}

// Exécuter les tests
runAllTests().catch(console.error)
