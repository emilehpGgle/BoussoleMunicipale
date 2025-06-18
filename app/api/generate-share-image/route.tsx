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

// Fonction pour récupérer les données partagées directement depuis Supabase
async function getSharedResult(id: string): Promise<SharedResult | null> {
  try {
    console.log(`🔍 [getSharedResult] Récupération depuis Supabase pour l'image: ${id}`)
    
    // Utiliser les variables d'environnement Supabase directement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[getSharedResult] Variables Supabase manquantes')
      return null
    }
    
    // Valider l'ID pour éviter les injections
    const safeId = id.toString().replace(/[^a-zA-Z0-9\-_]/g, '')
    
    const response = await fetch(`${supabaseUrl}/rest/v1/shared_results?share_id=eq.${safeId}&expires_at=gt.${new Date().toISOString()}&select=share_data`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Range': '0-0'
      }
    })
    
    if (!response.ok) {
      console.error(`[getSharedResult] Erreur Supabase ${response.status} pour ID: ${safeId}`)
      return null
    }
    
    const data = await response.json()
    if (!data || data.length === 0) {
      console.warn(`[getSharedResult] Aucune donnée trouvée pour ID: ${safeId}`)
      return null
    }
    
    return data[0].share_data as SharedResult
  } catch (error) {
    console.error(`[getSharedResult] Erreur lors de la récupération pour ${id}:`, error)
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