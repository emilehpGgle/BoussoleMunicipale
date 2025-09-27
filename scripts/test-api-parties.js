#!/usr/bin/env node

/**
 * Script de diagnostic pour tester l'API parties
 * Permet de comprendre pourquoi le build Next.js échoue avec des 404
 *
 * Usage: node scripts/test-api-parties.js
 */

const municipalities = ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis'];

// Déterminer l'URL de base selon l'environnement
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return 'https://boussolemunicipale.com'
}

async function testMunicipalityAPI(municipality) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/parties?municipality=${encodeURIComponent(municipality)}`

  console.log(`\n🔍 Test pour ${municipality.toUpperCase()}`)
  console.log(`   URL: ${url}`)

  try {
    const startTime = Date.now()
    const response = await fetch(url)
    const endTime = Date.now()

    console.log(`   ⏱️  Temps de réponse: ${endTime - startTime}ms`)
    console.log(`   📊 Status: ${response.status} ${response.statusText}`)

    if (response.ok) {
      const data = await response.json()
      console.log(`   ✅ Succès: ${data.parties?.length || 0} partis trouvés`)

      if (data.parties && data.parties.length > 0) {
        console.log(`   🏛️  Partis: ${data.parties.map(p => p.name).join(', ')}`)
      }

      if (data.stats) {
        console.log(`   📈 Stats: ${data.stats.totalPositions} positions, ${data.stats.avgPositionsPerParty} positions/parti`)
      }
    } else {
      const errorData = await response.json()
      console.log(`   ❌ Erreur: ${errorData.error}`)

      if (errorData.debug) {
        console.log(`   🔧 Debug info:`)
        console.log(`      - Municipalités disponibles: ${errorData.debug.availableMunicipalities?.join(', ') || 'Aucune'}`)
        console.log(`      - Total partis en DB: ${errorData.debug.totalPartiesInDB || 0}`)

        if (errorData.debug.partiesByMunicipality) {
          console.log(`      - Répartition partis:`)
          Object.entries(errorData.debug.partiesByMunicipality).forEach(([mun, count]) => {
            console.log(`        * ${mun}: ${count} parti(s)`)
          })
        }
      }
    }

    return {
      municipality,
      status: response.status,
      success: response.ok,
      data: response.ok ? await response.json() : null
    }

  } catch (error) {
    console.log(`   💥 Erreur de connexion: ${error.message}`)
    return {
      municipality,
      status: 'ERROR',
      success: false,
      error: error.message
    }
  }
}

async function runDiagnostic() {
  console.log('🚀 DIAGNOSTIC API PARTIES')
  console.log('=========================')
  console.log(`Base URL: ${getBaseUrl()}`)
  console.log(`Node ENV: ${process.env.NODE_ENV || 'undefined'}`)
  console.log(`Vercel URL: ${process.env.VERCEL_URL || 'undefined'}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)

  const results = []

  // Tester toutes les municipalités
  for (const municipality of municipalities) {
    const result = await testMunicipalityAPI(municipality)
    results.push(result)

    // Petite pause entre les requêtes
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Résumé final
  console.log('\n📊 RÉSUMÉ DU DIAGNOSTIC')
  console.log('=======================')

  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`✅ Municipalités avec données: ${successful.length}/${municipalities.length}`)
  console.log(`❌ Municipalités sans données: ${failed.length}/${municipalities.length}`)

  if (successful.length > 0) {
    console.log('\n🏛️ Municipalités fonctionnelles:')
    successful.forEach(r => {
      const partiesCount = r.data?.parties?.length || 0
      console.log(`   - ${r.municipality}: ${partiesCount} parti(s)`)
    })
  }

  if (failed.length > 0) {
    console.log('\n💥 Municipalités problématiques:')
    failed.forEach(r => {
      console.log(`   - ${r.municipality}: ${r.status} (${r.error || 'Pas de données'})`)
    })
  }

  // Recommandations
  console.log('\n💡 RECOMMANDATIONS')
  console.log('==================')

  if (failed.length === municipalities.length) {
    console.log('❗ PROBLÈME CRITIQUE: Aucune municipalité ne fonctionne')
    console.log('   - Vérifier la connexion Supabase')
    console.log('   - Vérifier les variables d\'environnement')
    console.log('   - Vérifier que le serveur local fonctionne')
  } else if (failed.length > 0) {
    console.log('⚠️  PROBLÈME PARTIEL: Certaines municipalités manquent de données')
    console.log('   - Exécuter les migrations pour les municipalités manquantes')
    console.log('   - Ou utiliser une stratégie de génération statique conditionnelle')
  } else {
    console.log('🎉 TOUT FONCTIONNE: Toutes les municipalités ont des données')
  }
}

// Exécuter le diagnostic
runDiagnostic().catch(error => {
  console.error('💥 Erreur fatale du diagnostic:', error)
  process.exit(1)
})