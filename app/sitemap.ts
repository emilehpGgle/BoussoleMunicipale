import { MetadataRoute } from 'next'
import { partiesData } from '@/lib/boussole-data'

// Fonction pour générer le slug à partir du nom du leader
function generateSlug(leaderName: string): string {
  return leaderName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprime les caractères spéciaux
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Remplace les tirets multiples par un seul
    .trim()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boussole-municipale.vercel.app'
  
  return [
    // Page principale - Priorité maximale
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // Questionnaire - Très important pour SEO
    {
      url: `${baseUrl}/questionnaire`,
      lastModified: new Date(),
      changeFrequency: 'monthly', 
      priority: 0.9,
    },
    
    // Page À Propos - Importante pour "boussole électorale québec"
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Page FAQ - Importante pour longue traîne SEO
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Page Leaders - Très importante pour SEO des noms de leaders
    {
      url: `${baseUrl}/leaders`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Page Résultats
    {
      url: `${baseUrl}/resultats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    
    // Page Profil
    {
      url: `${baseUrl}/profil`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Pages légales
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    
    {
      url: `${baseUrl}/conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly', 
      priority: 0.3,
    },
    
    {
      url: `${baseUrl}/aide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
    // Pages des partis - Importantes pour "partis politiques québec"
    {
      url: `${baseUrl}/parti/1`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/2`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/3`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/4`,
      lastModified: new Date(),
      changeFrequency: 'monthly', 
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/5`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/6`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/parti/7`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Pages individuelles des leaders - Très importantes pour SEO des noms
    ...partiesData.map((party) => ({
      url: `${baseUrl}/leaders/${generateSlug(party.leader)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
} 