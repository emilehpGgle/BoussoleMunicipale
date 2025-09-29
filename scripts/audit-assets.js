#!/usr/bin/env node
/**
 * Script d'audit des assets (logos et photos)
 * Vérifie la cohérence entre les fichiers et les références dans le code
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PARTY_ASSETS_FILE = path.join(ROOT, 'lib', 'party-assets.ts');

// Lecture des fichiers existants
const logosDir = path.join(PUBLIC_DIR, 'logos');
const leadersDir = path.join(PUBLIC_DIR, 'Leaders');

const existingLogos = fs.existsSync(logosDir)
  ? fs.readdirSync(logosDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))
  : [];

const existingLeaders = fs.existsSync(leadersDir)
  ? fs.readdirSync(leadersDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))
  : [];

// Extraction des références depuis party-assets.ts
const partyAssetsContent = fs.readFileSync(PARTY_ASSETS_FILE, 'utf-8');

const referencedLogos = [...partyAssetsContent.matchAll(/\/logos\/([^'"]+)/g)]
  .map(m => m[1]);

const referencedLeaders = [...partyAssetsContent.matchAll(/\/Leaders\/([^'"]+)/g)]
  .map(m => m[1]);

console.log('\n📊 AUDIT DES ASSETS - Boussole Municipale\n');
console.log('='.repeat(60));

// 1. Logos
console.log('\n🏛️  LOGOS DE PARTIS');
console.log('-'.repeat(60));
console.log(`Fichiers présents : ${existingLogos.length}`);
console.log(`Références dans code : ${referencedLogos.length}`);

const missingLogos = referencedLogos.filter(ref => !existingLogos.includes(ref));
const orphanLogos = existingLogos.filter(file => !referencedLogos.includes(file));

if (missingLogos.length > 0) {
  console.log('\n❌ Logos MANQUANTS (référencés mais absents) :');
  missingLogos.forEach(logo => console.log(`   - /logos/${logo}`));
} else {
  console.log('\n✅ Tous les logos référencés sont présents');
}

if (orphanLogos.length > 0) {
  console.log('\n⚠️  Logos ORPHELINS (fichiers non référencés) :');
  orphanLogos.forEach(logo => console.log(`   - ${logo}`));
}

// 2. Photos de leaders
console.log('\n\n📸 PHOTOS DE LEADERS');
console.log('-'.repeat(60));
console.log(`Fichiers présents : ${existingLeaders.length}`);
console.log(`Références dans code : ${referencedLeaders.length}`);

const missingLeaders = referencedLeaders.filter(ref => !existingLeaders.includes(ref));
const orphanLeaders = existingLeaders.filter(file => !referencedLeaders.includes(file));

if (missingLeaders.length > 0) {
  console.log('\n❌ Photos MANQUANTES (référencées mais absentes) :');
  missingLeaders.forEach(photo => console.log(`   - /Leaders/${photo}`));
} else {
  console.log('\n✅ Toutes les photos référencées sont présentes');
}

if (orphanLeaders.length > 0) {
  console.log('\n⚠️  Photos ORPHELINES (fichiers non référencés) :');
  orphanLeaders.forEach(photo => console.log(`   - ${photo}`));
}

// 3. Détection des doublons (fichiers avec -new, versions multiples)
console.log('\n\n🔍 DOUBLONS POTENTIELS');
console.log('-'.repeat(60));

const duplicatePatterns = existingLogos.filter(logo =>
  logo.includes('-new') ||
  existingLogos.some(other =>
    other !== logo &&
    other.replace(/-new|-old/, '') === logo.replace(/-new|-old/, '')
  )
);

if (duplicatePatterns.length > 0) {
  console.log('⚠️  Doublons détectés (versions multiples du même logo) :');
  duplicatePatterns.forEach(dup => console.log(`   - ${dup}`));
} else {
  console.log('✅ Aucun doublon détecté');
}

// 4. Formats non uniformes
console.log('\n\n📐 FORMATS DE FICHIERS');
console.log('-'.repeat(60));

const logoPngs = existingLogos.filter(f => f.endsWith('.png')).length;
const logoJpgs = existingLogos.filter(f => /\.(jpg|jpeg)$/i.test(f)).length;

console.log(`Logos PNG : ${logoPngs}`);
console.log(`Logos JPG/JPEG : ${logoJpgs}`);

const leaderPngs = existingLeaders.filter(f => f.endsWith('.png')).length;
const leaderJpgs = existingLeaders.filter(f => /\.(jpg|jpeg)$/i.test(f)).length;

console.log(`\nPhotos PNG : ${leaderPngs}`);
console.log(`Photos JPG/JPEG : ${leaderJpgs}`);

if (leaderPngs > 0) {
  console.log('\n⚠️  Photos en PNG détectées (recommandé : JPG pour photos) :');
  existingLeaders.filter(f => f.endsWith('.png')).forEach(p => console.log(`   - ${p}`));
}

// Résumé final
console.log('\n\n' + '='.repeat(60));
const issues = missingLogos.length + missingLeaders.length + duplicatePatterns.length;
if (issues === 0 && orphanLogos.length === 0 && orphanLeaders.length === 0) {
  console.log('✅ AUCUN PROBLÈME DÉTECTÉ - Assets cohérents\n');
} else {
  console.log(`⚠️  ${issues} PROBLÈMES DÉTECTÉS - Action requise\n`);
}