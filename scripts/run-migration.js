// Script pour exécuter la migration des données
// Usage: node scripts/run-migration.js

const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Démarrage de la migration des données...');
console.log('=' .repeat(60));

try {
  // Nous allons utiliser l'API route de migration via curl une fois le serveur démarré
  console.log('📌 Pour exécuter la migration, lancez:');
  console.log('1. pnpm run dev (dans un terminal)');
  console.log('2. Visitez: http://localhost:3000/api/migrate');
  console.log('3. Ou utilisez: curl http://localhost:3000/api/migrate');
  
} catch (error) {
  console.error('💥 Erreur:', error.message);
  process.exit(1);
}