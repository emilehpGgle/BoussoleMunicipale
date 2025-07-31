import { MetadataRoute } from 'next'

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
  ]
} 