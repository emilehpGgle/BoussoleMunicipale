#!/usr/bin/env tsx

// Script pour exécuter la migration des données vers Supabase
// Usage: npx tsx scripts/migrate-data.ts

import { runFullMigration } from '../lib/migration-script'

async function main() {
  console.log('🚀 Début de la migration des données vers Supabase...')
  console.log('=' .repeat(60))
  
  try {
    const result = await runFullMigration()
    
    console.log('=' .repeat(60))
    console.log('🎉 Migration réussie !')
    console.log('Résultat:', result)
    
    process.exit(0)
  } catch (error) {
    console.error('💥 Erreur lors de la migration:', error)
    process.exit(1)
  }
}

main()