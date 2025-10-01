import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function optimizeLogo() {
  console.log('🚀 Optimisation du logo PNG...');

  const inputPath = join(__dirname, '../public/LogoPNGnobg.png');
  const outputPath = join(__dirname, '../public/logo-main.png');

  try {
    // Lire les métadonnées
    const metadata = await sharp(inputPath).metadata();
    console.log(`📐 Dimensions originales: ${metadata.width}x${metadata.height}`);
    console.log(`📊 Taille originale: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KiB`);

    // Redimensionner à 380px width (taille max affichée)
    // et optimiser compression
    await sharp(inputPath)
      .resize(380, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true
      })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    const originalSizeKB = (fs.statSync(inputPath).size / 1024).toFixed(2);
    const savings = ((1 - outputStats.size / fs.statSync(inputPath).size) * 100).toFixed(1);

    console.log(`\n✅ PNG optimisé créé: ${outputPath}`);
    console.log(`📊 Taille finale: ${outputSizeKB} KiB`);
    console.log(`💰 Économie: ${savings}% (${originalSizeKB} KiB → ${outputSizeKB} KiB)`);

    if (outputStats.size < 20 * 1024) {
      console.log('✅ Taille acceptable (< 20 KiB)');
    } else if (outputStats.size < 50 * 1024) {
      console.log('⚠️  Taille acceptable mais peut être améliorée avec TinyPNG');
      console.log('   https://tinypng.com/');
    } else {
      console.log('❌ Taille encore trop grande, utiliser TinyPNG obligatoire');
      console.log('   https://tinypng.com/');
    }

    console.log('\n📋 PROCHAINES ÉTAPES:');
    console.log('1. Modifier components/site-header.tsx ligne 117:');
    console.log('   src="/logo-main.png"');
    console.log('2. Build: pnpm build');
    console.log('3. Tester visuellement');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Sharp n\'est pas installé. Installons-le:');
    console.log('   pnpm add -D sharp');
    console.log('   Puis relancez: node scripts/optimize-logo.mjs');
  }
}

optimizeLogo().catch(console.error);
