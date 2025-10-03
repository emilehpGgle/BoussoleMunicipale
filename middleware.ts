import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Municipalités supportées
const supportedMunicipalities = [
  'quebec',
  'montreal',
  'laval',
  'gatineau',
  'longueuil',
  'levis'
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclure les routes API et les pages statiques du middleware
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Pages statiques globales qui ne doivent pas être redirigées
  const staticPages = [
    '/comment-ca-marche',
    '/pourquoi-important',
    '/faq',
    '/centre-aide',
    '/elections-municipales-2025',
    '/confidentialite'
  ]

  if (staticPages.includes(pathname)) {
    return NextResponse.next()
  }

  // Vérifier si l'URL commence par une municipalité
  const municipalityMatch = pathname.match(/^\/([^\/]+)/)

  if (municipalityMatch) {
    const municipality = municipalityMatch[1]

    // Si c'est une municipalité supportée, on laisse passer
    if (supportedMunicipalities.includes(municipality)) {
      return NextResponse.next()
    }

    // Si ce n'est pas une municipalité supportée, vérifier si c'est un chemin legacy
    const legacyPaths = [
      'profil',
      'test-politique-municipal',
      'resultats',
      'parti',
      'a-propos',
      'aide',
      'conditions',
      'confidentialite',
      'contact',
      'donnees-protegees',
      'leaders',
      'partage',
      'preferences'
    ]

    // Si c'est un chemin legacy, rediriger vers quebec par défaut
    if (legacyPaths.includes(municipality)) {
      const newUrl = new URL(`/quebec${pathname}`, request.url)
      return NextResponse.redirect(newUrl, 308) // Permanent redirect
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png).*)',
  ],
}