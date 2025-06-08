import { type Metadata } from 'next'
import SharePageClient from './share-page-client'
// Importer les types pour une meilleure cohérence (comme dans l'API)
import type { Party } from '@/lib/boussole-data'

interface SharePageProps {
  params: { id: string }
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
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/partage/${id}.json`, { next: { revalidate: 3600 } })
    
    if (!response.ok) {
      console.warn(`Données de partage non trouvées pour ${id}, statut: ${response.status}`)
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la récupération des données de partage pour ${id}:`, error)
    return null
  }
}

// Génération des métadonnées dynamiques pour le partage
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const result = await getSharedResult(params.id)
  
  const title = result ? `Résultats de ${result.userName} | Boussole Municipale` : 'Résultats | Boussole Municipale'
  
  // Amélioration 2: Vérifications null pour éviter les crashes
  const topParty = result?.topParties?.[0]
  const description = result && topParty 
    ? `Découvrez mes affinités politiques ! Mon parti principal : ${topParty.party.shortName || topParty.party.name} (${Math.round(topParty.score)}%).` 
    : 'Découvrez vos affinités politiques avec la Boussole Municipale.'
  
  // Amélioration 1: URL absolue pour Open Graph (CRITIQUE pour les réseaux sociaux)
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const imageUrl = `${baseUrl}/api/generate-share-image?id=${params.id}`

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
  const sharedResult = await getSharedResult(params.id)
  
  return <SharePageClient sharedResult={sharedResult} />
} 