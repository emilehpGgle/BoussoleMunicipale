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
    
    const response = await fetch(`${baseUrl}/partage/${id}.json`, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'FacebookExternalHit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
      }
    })
    
    if (!response.ok) {
      console.error(`[getSharedResult] HTTP ${response.status} error for ID: ${id}`)
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error(`[getSharedResult] Failed to fetch data for image ${id}:`, error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const shareId = searchParams.get('id')

    if (!shareId) {
      return new Response('Missing share ID', { status: 400 })
    }

    const result = await getSharedResult(shareId)

    if (!result) {
      return new Response('Results not found', { status: 404 })
    }
    
    const { userName, topParties } = result

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

    return imageResponse
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'
    console.error(`[generate-share-image] Image generation failed: ${errorMessage}`)
    return new Response('Image generation failed', { status: 500 })
  }
} 