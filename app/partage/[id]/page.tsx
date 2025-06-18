import { type Metadata } from 'next'
import SharePageClient from './share-page-client'
import { createClient } from '@/lib/supabase/client'
// Importer les types pour une meilleure cohérence (comme dans l'API)

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

// Fonction pour récupérer les données partagées depuis Supabase avec anon key
async function getSharedResult(id: string): Promise<SharedResult | null> {
  console.log(`🔍 [getSharedResult] Début récupération depuis Supabase avec anon key pour ID: ${id}`)
  
  try {
    // Valider l'ID pour éviter les injections
    const safeId = id.toString().replace(/[^a-zA-Z0-9\-_]/g, '')
    console.log(`🔒 [getSharedResult] ID sécurisé: ${safeId}`)
    
    // Créer le client Supabase normal (avec anon key)
    console.log(`🗄️ [getSharedResult] Connexion à Supabase avec anon key`)
    const supabase = createClient()
    
    // Récupérer les données depuis la table shared_results
    // Les politiques RLS permettent la lecture publique des résultats non expirés
    console.log(`🔍 [getSharedResult] Requête base de données`)
    const { data, error } = await supabase
      .from('shared_results')
      .select('share_data, access_count')
      .eq('share_id', safeId)
      .gt('expires_at', new Date().toISOString()) // Seulement les résultats non expirés
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`⚠️ [getSharedResult] Aucun résultat trouvé pour ID: ${safeId}`)
        return null
      }
      console.error(`❌ [getSharedResult] Erreur Supabase:`, error)
      return null
    }

    if (!data || !data.share_data) {
      console.warn(`⚠️ [getSharedResult] Données vides pour ID: ${safeId}`)
      return null
    }

    console.log(`✅ [getSharedResult] Données récupérées avec succès pour ID: ${safeId}`)
    console.log(`📊 [getSharedResult] Nombre d'accès précédents: ${data.access_count}`)

    // Incrémenter le compteur d'accès (en arrière-plan, sans attendre)
    // Les politiques RLS permettent maintenant la mise à jour du compteur
    supabase
      .from('shared_results')
      .update({ 
        access_count: (data.access_count || 0) + 1,
        last_accessed_at: new Date().toISOString()
      })
      .eq('share_id', safeId)
      .then(({ error: updateError }) => {
        if (updateError) {
          console.warn(`⚠️ [getSharedResult] Erreur mise à jour compteur:`, updateError)
        } else {
          console.log(`📈 [getSharedResult] Compteur d'accès mis à jour`)
        }
      })

    // Retourner les données du partage
    return data.share_data as SharedResult

  } catch (error) {
    console.error(`💥 [getSharedResult] Erreur critique pour ${id}:`, error)
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
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://boussolemunicipalequebec.ca' 
    : 'http://localhost:3000'
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