import { useState, useEffect } from 'react'
import { Party } from '@/lib/boussole-data'

interface PartiesResponse {
  parties: Party[]
  count: number
  municipality: string
  municipalityName: string
  includePositions: boolean
  stats: {
    totalPositions: number
    avgPositionsPerParty: number
    partiesWithAllPositions: number
  }
}

interface UsePartiesReturn {
  parties: Party[]
  isLoading: boolean
  error: string | null
  municipalityName: string | null
  count: number
  stats: PartiesResponse['stats'] | null
  refetch: () => Promise<void>
}

/**
 * Hook pour récupérer les partis depuis Supabase par municipalité
 * @param municipalityId ID de la municipalité (ex: 'quebec', 'montreal')
 * @param includePositions Inclure les positions des partis (optionnel, défaut: false)
 * @returns Partis, état de chargement, erreurs
 */
export function useParties(
  municipalityId: string,
  includePositions: boolean = false
): UsePartiesReturn {
  const [parties, setParties] = useState<Party[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [municipalityName, setMunicipalityName] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const [stats, setStats] = useState<PartiesResponse['stats'] | null>(null)

  const fetchParties = async () => {
    if (!municipalityId) {
      setError('Municipality ID is required')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const url = `/api/parties?municipality=${encodeURIComponent(municipalityId)}${
        includePositions ? '&include_positions=true' : ''
      }`

      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data: PartiesResponse = await response.json()

      // Transformer les données pour correspondre à l'interface Party
      const transformedParties: Party[] = data.parties.map(p => ({
        id: p.id,
        name: p.name,
        shortName: p.shortName,
        leader: p.leader,
        logoUrl: p.logoUrl,
        color: p.color,
        websiteUrl: p.websiteUrl,
        orientation: p.orientation,
        mainIdeasSummary: p.mainIdeasSummary,
        strengths: p.strengths || [],
        reserves: p.reserves || [],
        priorities: p.priorities || [],
        positions: p.positions || [] // Les positions si includePositions = true
      }))

      setParties(transformedParties)
      setMunicipalityName(data.municipalityName)
      setCount(data.count)
      setStats(data.stats)

      console.log(`✅ [useParties] ${data.count} partis chargés pour ${municipalityId}`, {
        includePositions,
        totalPositions: data.stats.totalPositions
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error(`❌ [useParties] Erreur pour ${municipalityId}:`, errorMessage)
      setError(errorMessage)
      setParties([])
      setMunicipalityName(null)
      setCount(0)
      setStats(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchParties()
  }, [municipalityId, includePositions])

  return {
    parties,
    isLoading,
    error,
    municipalityName,
    count,
    stats,
    refetch: fetchParties
  }
}