import { MetadataRoute } from 'next'

// Municipalités supportées
const supportedMunicipalities = [
  'quebec',
  'montreal',
  'laval',
  'gatineau',
  'longueuil',
  'levis'
]

// IDs des partis par municipalité (à terme, cela viendra de Supabase)
const partyIdsByMunicipality = {
  quebec: [1, 2, 3, 4, 5, 6, 7],
  montreal: [1, 2, 3], // Exemple pour Montreal
  laval: [1, 2], // Exemple pour Laval
  gatineau: [1, 2], // Exemple pour Gatineau
  longueuil: [1, 2], // Exemple pour Longueuil
  levis: [1, 2] // Exemple pour Lévis
}


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boussolemunicipale.com'
  const urls: MetadataRoute.Sitemap = []

  // Page principale - Priorité maximale
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  })

  // Pages statiques globales
  const staticPages = [
    { path: '/comment-ca-marche', priority: 0.7 },
    { path: '/pourquoi-important', priority: 0.7 },
    { path: '/faq', priority: 0.8 },
    { path: '/centre-aide', priority: 0.5 },
    { path: '/confidentialite', priority: 0.3 },
    { path: '/conditions', priority: 0.3 },
  ]

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority,
    })
  })

  // URLs par municipalité
  supportedMunicipalities.forEach(municipality => {
    // Pages principales par municipalité
    const municipalityPages = [
      { path: '/test-politique-municipal', priority: 0.9 },
      { path: '/resultats', priority: 0.7 },
      { path: '/profil', priority: 0.6 },
    ]

    municipalityPages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${municipality}${page.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page.priority,
      })
    })

    // Pages des partis par municipalité
    const partyIds = partyIdsByMunicipality[municipality as keyof typeof partyIdsByMunicipality] || []
    partyIds.forEach(partyId => {
      urls.push({
        url: `${baseUrl}/${municipality}/parti/${partyId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  // URLs legacy (redirections) pour Québec - priorité plus basse
  const legacyPages = [
    '/test-politique-municipal',
    '/resultats',
    '/profil',
    '/parti/1', '/parti/2', '/parti/3', '/parti/4', '/parti/5', '/parti/6', '/parti/7'
  ]

  legacyPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2, // Priorité basse car ce sont des redirections
    })
  })

  return urls
} 