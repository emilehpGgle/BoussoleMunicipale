import { useState, useEffect } from 'react'
import type { Party } from '@/lib/boussole-data'
import { extractPartyPrioritiesSimple } from '@/lib/extract-priorities'

/**
 * Interface pour les données de parti de la base de données
 */
interface DatabaseParty {
  id: string
  name: string
  short_name: string | null
  leader: string
  logo_url: string
  leader_photo_url?: string | null
  color?: string
  website_url: string | null
  orientation: string | null
  main_ideas_summary: string | null
  strengths: string[] | null
  reserves: string[] | null
  municipality_id: string
}

/**
 * Interface pour les positions de parti avec détails de question
 */
interface DatabasePartyPosition {
  id: string
  questionId: string
  position: string
  source: string | null
  note: string | null
  quote: string | null
  question: {
    id: string
    text: string
    category: string
    orderIndex: number
  } | null
}

/**
 * Hook pour gérer les données des partis depuis l'API Supabase
 * @param municipality - ID de la municipalité (ex: 'quebec', 'montreal')
 * @param includePositions - Inclure les positions des partis
 * @returns État des partis avec loading et erreurs
 */
export function useParties(municipality?: string, includePositions = false) {
  const [parties, setParties] = useState<Party[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Transformer les données de la base vers l'interface Party
   */
  const transformDatabasePartyToParty = async (dbParty: DatabaseParty, positions: DatabasePartyPosition[] = []): Promise<Party> => {
    // Extraire les priorités du parti depuis la base de données
    const priorities = await extractPartyPrioritiesSimple(dbParty.id, dbParty.municipality_id)

    return {
      id: dbParty.id,
      name: dbParty.name,
      shortName: dbParty.short_name || undefined,
      leader: dbParty.leader,
      logoUrl: dbParty.logo_url,
      leaderPhotoUrl: dbParty.leader_photo_url || undefined,
      color: dbParty.color || '#0066CC', // Couleur par défaut
      websiteUrl: dbParty.website_url || undefined,
      orientation: dbParty.orientation || undefined,
      mainIdeasSummary: dbParty.main_ideas_summary || undefined,
      strengths: Array.isArray(dbParty.strengths) ? dbParty.strengths : [],
      reserves: Array.isArray(dbParty.reserves) ? dbParty.reserves : [],
      priorities,
      positions: positions.map(pos => ({
        questionId: pos.questionId,
        position: pos.position as any, // Type assertion pour compatibilité
        source: pos.source || undefined,
        note: pos.note || undefined,
        quote: pos.quote || undefined,
      }))
    }
  }

  /**
   * Charger les partis depuis l'API
   */
  const fetchParties = async () => {
    if (!municipality) {
      setParties([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`🔍 [useParties] Chargement partis pour ${municipality}, includePositions: ${includePositions}`)

      const url = new URL('/api/parties', window.location.origin)
      url.searchParams.set('municipality', municipality)
      if (includePositions) {
        url.searchParams.set('include_positions', 'true')
      }

      const response = await fetch(url.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur ${response.status}`)
      }

      const data = await response.json()

      console.log(`✅ [useParties] ${data.parties?.length || 0} partis récupérés`)

      // Transformer les données en format Party
      const transformedParties: Party[] = []

      for (const dbParty of (data.parties || [])) {
        const transformedParty = await transformDatabasePartyToParty(dbParty, dbParty.positions || [])
        transformedParties.push(transformedParty)
      }

      setParties(transformedParties)

    } catch (err) {
      console.error('❌ [useParties] Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      setParties([])
    } finally {
      setLoading(false)
    }
  }

  /**
   * Recharger les données
   */
  const refetch = () => {
    fetchParties()
  }

  /**
   * Trouver un parti par ID
   */
  const findPartyById = (partyId: string): Party | undefined => {
    return parties.find(party => party.id === partyId)
  }

  // Charger les données lors du changement de municipalité
  useEffect(() => {
    fetchParties()
  }, [municipality, includePositions])

  return {
    parties,
    loading,
    error,
    refetch,
    findPartyById,
    isEmpty: parties.length === 0 && !loading && !error
  }
}

/**
 * Hook pour récupérer un parti individuel avec ses positions
 * @param municipality - ID de la municipalité
 * @param partyId - ID du parti
 * @returns État du parti avec loading et erreurs
 */
export function useParty(municipality: string, partyId: string) {
  const [party, setParty] = useState<Party | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchParty = async () => {
    if (!municipality || !partyId) {
      setParty(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`🔍 [useParty] Chargement parti ${partyId} pour ${municipality}`)

      // Utiliser l'API parties avec filtrage côté client
      const url = new URL('/api/parties', window.location.origin)
      url.searchParams.set('municipality', municipality)
      url.searchParams.set('include_positions', 'true')

      const response = await fetch(url.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur ${response.status}`)
      }

      const data = await response.json()
      const dbParty = data.parties?.find((p: any) => p.id === partyId)

      if (!dbParty) {
        throw new Error(`Parti "${partyId}" non trouvé dans ${municipality}`)
      }

      // Transformer la donnée en format Party
      const transformedParty = await transformDatabasePartyToParty(dbParty, dbParty.positions || [])
      setParty(transformedParty)

      console.log(`✅ [useParty] Parti ${partyId} chargé avec ${transformedParty.positions.length} positions`)

    } catch (err) {
      console.error('❌ [useParty] Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      setParty(null)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Transformer les données de la base vers l'interface Party
   */
  const transformDatabasePartyToParty = async (dbParty: any, positions: any[] = []): Promise<Party> => {
    // Extraire les priorités du parti depuis la base de données
    const priorities = await extractPartyPrioritiesSimple(dbParty.id, dbParty.municipality_id)

    return {
      id: dbParty.id,
      name: dbParty.name,
      shortName: dbParty.short_name || undefined,
      leader: dbParty.leader,
      logoUrl: dbParty.logo_url,
      leaderPhotoUrl: dbParty.leader_photo_url || undefined,
      color: dbParty.color || '#0066CC',
      websiteUrl: dbParty.website_url || undefined,
      orientation: dbParty.orientation || undefined,
      mainIdeasSummary: dbParty.main_ideas_summary || undefined,
      strengths: Array.isArray(dbParty.strengths) ? dbParty.strengths : [],
      reserves: Array.isArray(dbParty.reserves) ? dbParty.reserves : [],
      priorities,
      positions: positions.map(pos => ({
        questionId: pos.questionId,
        position: pos.position as any,
        source: pos.source || undefined,
        note: pos.note || undefined,
        quote: pos.quote || undefined,
      }))
    }
  }

  // Charger les données lors du changement de paramètres
  useEffect(() => {
    fetchParty()
  }, [municipality, partyId])

  return {
    party,
    loading,
    error,
    refetch: fetchParty,
    notFound: !party && !loading && !error
  }
}