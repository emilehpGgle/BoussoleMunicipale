/* eslint-disable */
import React from 'react'
import { ImageResponse } from 'next/og'
// Importer les types existants pour une meilleure cohérence
import type { Party } from '@/lib/boussole-data'

// Important: next/og fonctionne sur l'Edge Runtime, pas nodejs
export const runtime = 'edge'

// Interface pour les résultats de parti avec score
interface TopParty {
  party: Party
  score: number
}

// Interface pour les données partagées
interface SharedResult {
  userName: string
  topParties: TopParty[]
}

// Fonction pour récupérer les données partagées
async function getSharedResult(id: string): Promise<SharedResult | null> {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    console.log(`🔍 [getSharedResult] Récupération données pour ID: ${id} depuis ${baseUrl}`)
    
    const response = await fetch(`${baseUrl}/partage/${id}.json`, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'FacebookExternalHit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
      }
    })
    
    if (!response.ok) {
      console.error(`❌ [getSharedResult] Erreur HTTP ${response.status} pour ID: ${id}`)
      return null
    }
    
    const data = await response.json()
    console.log(`✅ [getSharedResult] Données récupérées avec succès pour ID: ${id}`)
    return data
  } catch (error) {
    console.error(`💥 [getSharedResult] Erreur lors de la récupération des données pour l'image ${id}:`, error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    // Correction: utiliser le bon paramètre 'id' comme dans les autres parties de l'app
    const shareId = searchParams.get('id')

    console.log(`🎨 [generate-share-image] Génération image pour ID: ${shareId}`)

    if (!shareId) {
      console.error(`❌ [generate-share-image] ID de partage manquant`)
      return new Response('ID de partage manquant', { status: 400 })
    }

    const result = await getSharedResult(shareId)

    if (!result) {
      console.error(`❌ [generate-share-image] Résultats non trouvés pour ID: ${shareId}`)
      return new Response('Résultats non trouvés', { status: 404 })
    }
    
    const { userName, topParties } = result
    console.log(`✅ [generate-share-image] Génération image pour utilisateur: ${userName}`)

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f5f9',
            fontFamily: '"Inter", sans-serif',
            color: '#1e293b',
            padding: '40px',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 20 }}>🧭 Boussole Municipale</div>
          <div style={{ fontSize: 60, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}>
            Résultats de {userName}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
            {topParties.slice(0, 3).map((p: TopParty, index: number) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '25px',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  borderRadius: 16,
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 32, fontWeight: 600 }}>
                  {p.party.shortName || p.party.name}
                </div>
                <div style={{ fontSize: 50, fontWeight: 800, color: '#2563eb' }}>
                  {`${Math.round(p.score)}%`}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          // Headers recommandés par Facebook pour les images Open Graph
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          // Permettre à Facebook de cacher l'image
          'X-Robots-Tag': 'noindex, nofollow',
        },
      },
    );

    console.log(`🎉 [generate-share-image] Image générée avec succès pour ID: ${shareId}`)
    return imageResponse
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Erreur inconnue'
    console.error(`💥 [generate-share-image] Erreur de génération d'image: ${errorMessage}`)
    return new Response('Échec de la génération de l\'image', { status: 500 })
  }
} 