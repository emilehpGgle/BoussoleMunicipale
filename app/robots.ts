import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://boussolemunicipale.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Blocage des pages de partage temporaires et API
        disallow: [
          '/api/',
          '/partage/*',  // Pages de partage temporaires
          '/_next/',
          '/private/',
        ],
      },
      {
        // Permettre spécifiquement aux moteurs de recherche majeurs
        userAgent: ['Googlebot', 'Bingbot', 'Slurp'],
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Optimisation pour le crawl des mots-clés importants
    host: baseUrl,
  }
} 