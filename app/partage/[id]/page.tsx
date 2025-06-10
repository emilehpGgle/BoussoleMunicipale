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
    // En développement et production, utiliser le chemin absolu vers le fichier
    const fs = await import('fs').then(m => m.promises)
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'partage', `${id}.json`)
    
    // Vérifier si le fichier existe
    try {
      await fs.access(filePath)
    } catch {
      console.warn(`Fichier de partage non trouvé: ${filePath}`)
      return null
    }
    
    // Lire le fichier directement depuis le système de fichiers
    const fileContent = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Erreur lors de la récupération des données de partage pour ${id}:`, error)
    return null
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