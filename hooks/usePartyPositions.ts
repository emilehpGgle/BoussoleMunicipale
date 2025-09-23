import { useState, useEffect } from 'react'
import { PartyPosition } from '@/lib/boussole-data'

interface PartyPositionWithDetails extends PartyPosition {
  id: number
  createdAt: string
  party: {
    id: string
    name: string
    shortName: string | null
    leader: string
    logoUrl: string
    color: string
    municipalityId: string
    municipalityName: string | undefined
  } | null
  question: {
    id: string
    text: string
    category: string
    responseType: string
    orderIndex: number
    municipalityId: string
    isGeneric: boolean
  } | null
}

interface PartyPositionsResponse {
  positions: PartyPositionWithDetails[]
  positionsByParty?: Record<string, PartyPositionWithDetails[]>
  count: number
  filters: {
    municipality: string | null
    partyId: string | null
  }
  stats: {
    uniqueParties: number
    uniqueQuestions: number
    positionDistribution: Record<string, number>
    avgPositionsPerParty: number
    completionRate: number
  }
}

interface UsePartyPositionsReturn {
  positions: PartyPositionWithDetails[]
  positionsByParty: Record<string, PartyPositionWithDetails[]> | null
  isLoading: boolean
  error: string | null
  count: number
  stats: PartyPositionsResponse['stats'] | null
  refetch: () => Promise<void>
}

/**
 * Hook pour récupérer les positions des partis depuis Supabase
 * @param municipalityId ID de la municipalité (optionnel)
 * @param partyId ID du parti (optionnel)
 * @returns Positions, état de chargement, erreurs
 */
export function usePartyPositions(
  municipalityId?: string,
  partyId?: string
): UsePartyPositionsReturn {
  const [positions, setPositions] = useState<PartyPositionWithDetails[]>([])
  const [positionsByParty, setPositionsByParty] = useState<Record<string, PartyPositionWithDetails[]> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const [stats, setStats] = useState<PartyPositionsResponse['stats'] | null>(null)

  const fetchPositions = async () => {
    if (!municipalityId && !partyId) {
      setError('Municipality ID or Party ID is required')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Construire l'URL avec les paramètres
      const params = new URLSearchParams()
      if (municipalityId) params.set('municipality', municipalityId)
      if (partyId) params.set('party_id', partyId)

      const response = await fetch(`/api/party-positions?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data: PartyPositionsResponse = await response.json()

      setPositions(data.positions)
      setPositionsByParty(data.positionsByParty || null)
      setCount(data.count)
      setStats(data.stats)

      console.log(`✅ [usePartyPositions] ${data.count} positions chargées`, {
        municipalityId,
        partyId,
        uniqueParties: data.stats.uniqueParties,
        completionRate: data.stats.completionRate
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error(`❌ [usePartyPositions] Erreur:`, errorMessage, { municipalityId, partyId })
      setError(errorMessage)
      setPositions([])
      setPositionsByParty(null)
      setCount(0)
      setStats(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPositions()
  }, [municipalityId, partyId])

  return {
    positions,
    positionsByParty,
    isLoading,
    error,
    count,
    stats,
    refetch: fetchPositions
  }
}

/**
 * Hook spécialisé pour récupérer les positions d'un parti spécifique
 * @param partyId ID du parti
 * @returns Positions du parti
 */
export function usePartyPositionsById(partyId: string) {
  return usePartyPositions(undefined, partyId)
}

/**
 * Hook spécialisé pour récupérer toutes les positions d'une municipalité
 * @param municipalityId ID de la municipalité
 * @returns Toutes les positions de la municipalité
 */
export function usePartyPositionsByMunicipality(municipalityId: string) {
  return usePartyPositions(municipalityId, undefined)
}