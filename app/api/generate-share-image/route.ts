import { NextRequest } from 'next/server'
import puppeteer from 'puppeteer'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const userName = searchParams.get('userName') || 'Citoyen'
    const topPartiesParam = searchParams.get('topParties')
    const shareId = searchParams.get('shareId')

    // Si on a un shareId, on peut capturer la page de partage directement
    let pageUrl: string
    
    if (shareId) {
      // Capturer la page de partage existante
      pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/partage/${shareId}`
    } else {
      // Créer une URL de résultats avec les paramètres
      const params = new URLSearchParams()
      if (topPartiesParam) params.set('topParties', topPartiesParam)
      if (userName) params.set('userName', userName)
      
      pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/resultats?${params.toString()}`
    }

    // Lancer Puppeteer pour capturer la page
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    })
    
    const page = await browser.newPage()
    
    // Configurer la taille pour Open Graph (1200x630)
    await page.setViewport({ width: 1200, height: 630 })
    
    // Aller à la page
    await page.goto(pageUrl, { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    })
    
    // Attendre que le contenu soit chargé
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Prendre la capture d'écran
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    })
    
    await browser.close()
    
    // Retourner l'image
    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // Cache 1 heure
      },
    })
    
  } catch (error) {
    console.error('Erreur capture screenshot:', error)
    
    // Fallback vers image statique en cas d'erreur
    const fallbackImageUrl = `/share-images/boussole-default.svg`
    return Response.redirect(new URL(fallbackImageUrl, request.url).toString(), 302)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const params = new URLSearchParams({
      userName: body.userName || 'Citoyen',
      topParties: encodeURIComponent(JSON.stringify(body.topParties || [])),
      ...(body.shareId && { shareId: body.shareId })
    })
    
    const url = new URL(request.url)
    return Response.redirect(`${url.origin}${url.pathname}?${params.toString()}`)
  } catch (error) {
    console.error('Erreur POST:', error)
    return Response.json({ error: 'Erreur dans la requête POST' }, { status: 400 })
  }
} 