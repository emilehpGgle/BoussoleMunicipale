import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertSvgToPng() {
  console.log('🚀 Démarrage de la conversion SVG → PNG...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Lire le SVG
    const svgPath = join(__dirname, '../public/logo-main.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Extraire les dimensions du SVG
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);
    const viewBoxMatch = svgContent.match(/viewBox="[\d\s.]+ ([\d.]+) ([\d.]+)"/);

    let width = widthMatch ? parseInt(widthMatch[1]) : 500;
    let height = heightMatch ? parseInt(heightMatch[1]) : 500;

    // Si pas de width/height, utiliser viewBox
    if (viewBoxMatch && (!widthMatch || !heightMatch)) {
      width = parseFloat(viewBoxMatch[1]);
      height = parseFloat(viewBoxMatch[2]);
    }

    console.log(`📐 Dimensions détectées: ${width}x${height}`);

    // Export à 2x la résolution pour qualité (380px → 760px)
    const scale = 2;
    const finalWidth = Math.round(width * scale);
    const finalHeight = Math.round(height * scale);

    console.log(`🎨 Génération PNG ${finalWidth}x${finalHeight} (2x résolution)...`);

    // Définir viewport
    await page.setViewport({
      width: finalWidth,
      height: finalHeight,
      deviceScaleFactor: 1
    });

    // Créer HTML avec SVG
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
          }
          svg {
            width: ${finalWidth}px;
            height: ${finalHeight}px;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Attendre que le SVG soit rendu
    await page.waitForSelector('svg');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capturer screenshot
    const outputPath = join(__dirname, '../public/logo-main-temp.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true,
      clip: {
        x: 0,
        y: 0,
        width: finalWidth,
        height: finalHeight
      }
    });

    console.log(`✅ PNG généré: ${outputPath}`);

    // Afficher la taille
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 Taille PNG non optimisé: ${sizeKB} KiB`);

    console.log('\n📋 PROCHAINES ÉTAPES:');
    console.log('1. Allez sur https://tinypng.com/');
    console.log('2. Upload: public/logo-main-temp.png');
    console.log('3. Téléchargez le PNG optimisé');
    console.log('4. Renommez en: public/logo-main.png');
    console.log('5. Modifiez components/site-header.tsx ligne 117:');
    console.log('   src="/logo-main.png"');
    console.log('6. Build: pnpm build');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

convertSvgToPng().catch(console.error);
