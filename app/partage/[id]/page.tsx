import { type Metadata } from 'next'
import SharePageClient from './share-page-client'

interface SharePageProps {
  params: { id: string }
}

// Fonction pour récupérer les données partagées
async function getSharedResult(id: string) {
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
  const description = result ? `Découvrez mes affinités politiques ! Mon parti principal : ${result.topParties[0]?.party.shortName} (${Math.round(result.topParties[0]?.score || 0)}%).` : 'Découvrez vos affinités politiques avec la Boussole Municipale.'
  
  // URL de l'image de partage générée par une API
  const imageUrl = `/api/generate-share-image?id=${params.id}`

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