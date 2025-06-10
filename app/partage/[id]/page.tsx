import { type Metadata } from 'next'
import SharePageClient from './share-page-client'
// Importer les types pour une meilleure cohérence (comme dans l'API)
import type { Party } from '@/lib/boussole-data'

interface SharePageProps {
  params: Promise<{ id: string }>
}

// Utiliser la définition existante de SharedResult (cohérente avec share-page-client.tsx)
interface SharedResult {
  id: string
  userName: string
  topParties: Array<{
    party: {
      id: string
      name: string
      shortName?: string
      leader?: string
      logoUrl?: string
    }
    score: number
  }>
  userPosition?: {
    economic: number
    social: number
  }
  timestamp: number
}

// Fonction pour récupérer les données partagées
async function getSharedResult(id: string): Promise<SharedResult | null> {
  try {
    // Essayer d'abord avec l'URL publique (fonctionne mieux sur Vercel)
    const publicUrl = `/partage/${id}.json`
    
    // En développement, utiliser l'URL complète, en production utiliser l'URL relative
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'https://boussole-municipale.vercel.app'
    
    const fullUrl = process.env.NODE_ENV === 'development' 
      ? `${baseUrl}${publicUrl}`
      : publicUrl
    
    console.log(`Tentative de récupération: ${fullUrl}`)
    
    const response = await fetch(fullUrl, { 
      next: { revalidate: 3600 },
      cache: 'force-cache'
    })
    
    if (!response.ok) {
      console.warn(`Données de partage non trouvées pour ${id}, statut: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    console.log(`Données récupérées pour ${id}:`, data.id)
    return data
  } catch (error) {
    console.error(`Erreur lors de la récupération des données de partage pour ${id}:`, error)
    
    // Fallback: essayer avec le système de fichiers
    try {
      const fs = await import('fs').then(m => m.promises)
      const path = await import('path')
      
      const filePath = path.join(process.cwd(), 'public', 'partage', `${id}.json`)
      console.log(`Fallback: tentative lecture fichier ${filePath}`)
      
      const fileContent = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileContent)
    } catch (fsError) {
      console.error(`Erreur fallback fichier pour ${id}:`, fsError)
      return null
    }
  }
}

// Génération des métadonnées dynamiques pour le partage
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params
  const result = await getSharedResult(id)
  
  const title = result ? `Résultats de ${result.userName} | Boussole Municipale` : 'Résultats | Boussole Municipale'
  
  // Amélioration 2: Vérifications null pour éviter les crashes
  const topParty = result?.topParties?.[0]
  const description = result && topParty 
    ? `Découvrez mes affinités politiques ! Mon parti principal : ${topParty.party.shortName || topParty.party.name} (${Math.round(topParty.score)}%).` 
    : 'Découvrez vos affinités politiques avec la Boussole Municipale.'
  
  // Amélioration 1: URL absolue pour Open Graph (CRITIQUE pour les réseaux sociaux)
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const imageUrl = `${baseUrl}/api/generate-share-image?id=${id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Résumé des résultats de la Boussole Municipale',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

// La page principale est maintenant un composant serveur
export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params
  const sharedResult = await getSharedResult(id)
  
  return <SharePageClient sharedResult={sharedResult} />
} 