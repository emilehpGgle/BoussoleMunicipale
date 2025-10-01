import { useState, useEffect } from 'react'

/**
 * Interface pour les données de leader de la base de données
 */
interface DatabaseLeader {
  id: string
  name: string
  slug: string
  party_id: string
  municipality_id: string
  biography: string | null
  photo_url: string | null
  experience: string[] | null
  vision_2025: string | null
  achievements: string[] | null
  website_url: string | null
  facebook_url: string | null
  twitter_url: string | null
  linkedin_url: string | null
  created_at: string
  updated_at: string
}

/**
 * Interface pour un leader transformé avec informations parti
 */
export interface Leader {
  id: string
  name: string
  slug: string
  partyId: string
  municipalityId: string
  biography?: string
  photoUrl?: string
  experience: string[]
  vision2025?: string
  achievements: string[]
  socialMedia: {
    website?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  }
  party?: {
    id: string
    name: string
    shortName?: string
    logoUrl?: string
    orientation?: string
  }
}

/**
 * Hook pour gérer les données des leaders depuis l'API Supabase
 * @param municipality - ID de la municipalité (ex: 'quebec', 'montreal')
 * @returns État des leaders avec loading et erreurs
 */
export function useLeaders(municipality?: string) {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Transformer les données de la base vers l'interface Leader
   */
  const transformDatabaseLeaderToLeader = (dbLeader: any): Leader => {
    return {
      id: dbLeader.id,
      name: dbLeader.name,
      slug: dbLeader.slug,
      partyId: dbLeader.party_id,
      municipalityId: dbLeader.municipality_id,
      biography: dbLeader.biography || undefined,
      photoUrl: dbLeader.photo_url || undefined,
      experience: Array.isArray(dbLeader.experience) ? dbLeader.experience : [],
      vision2025: dbLeader.vision_2025 || undefined,
      achievements: Array.isArray(dbLeader.achievements) ? dbLeader.achievements : [],
      socialMedia: {
        website: dbLeader.website_url || undefined,
        facebook: dbLeader.facebook_url || undefined,
        twitter: dbLeader.twitter_url || undefined,
        linkedin: dbLeader.linkedin_url || undefined,
      },
      party: dbLeader.party ? {
        id: dbLeader.party.id,
        name: dbLeader.party.name,
        shortName: dbLeader.party.short_name || undefined,
        logoUrl: dbLeader.party.logo_url || undefined,
        orientation: dbLeader.party.orientation || undefined,
      } : undefined
    }
  }

  /**
   * Charger les leaders depuis l'API
   */
  const fetchLeaders = async () => {
    if (!municipality) {
      setLeaders([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`🔍 [useLeaders] Chargement leaders pour ${municipality}`)

      const url = new URL('/api/leaders', window.location.origin)
      url.searchParams.set('municipality', municipality)

      const response = await fetch(url.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur ${response.status}`)
      }

      const data = await response.json()

      console.log(`✅ [useLeaders] ${data.leaders?.length || 0} leaders récupérés`)

      // Transformer les données en format Leader
      const transformedLeaders: Leader[] = (data.leaders || []).map((dbLeader: any) =>
        transformDatabaseLeaderToLeader(dbLeader)
      )

      setLeaders(transformedLeaders)

    } catch (err) {
      console.error('❌ [useLeaders] Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      setLeaders([])
    } finally {
      setLoading(false)
    }
  }

  /**
   * Recharger les données
   */
  const refetch = () => {
    fetchLeaders()
  }

  /**
   * Trouver un leader par slug
   */
  const findLeaderBySlug = (slug: string): Leader | undefined => {
    return leaders.find(leader => leader.slug === slug)
  }

  // Charger les données lors du changement de municipalité
  useEffect(() => {
    fetchLeaders()
  }, [municipality])

  return {
    leaders,
    loading,
    error,
    refetch,
    findLeaderBySlug,
    isEmpty: leaders.length === 0 && !loading && !error
  }
}

/**
 * Hook pour récupérer un leader individuel avec ses informations parti
 * @param municipality - ID de la municipalité
 * @param slug - Slug du leader
 * @returns État du leader avec loading et erreurs
 */
export function useLeader(municipality: string, slug: string) {
  const [leader, setLeader] = useState<Leader | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLeader = async () => {
    if (!municipality || !slug) {
      setLeader(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`🔍 [useLeader] Chargement leader ${slug} pour ${municipality}`)

      const url = new URL('/api/leaders', window.location.origin)
      url.searchParams.set('municipality', municipality)
      url.searchParams.set('slug', slug)

      const response = await fetch(url.toString())

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur ${response.status}`)
      }

      const data = await response.json()

      if (!data.leader) {
        throw new Error(`Leader "${slug}" non trouvé dans ${municipality}`)
      }

      console.log(`✅ [useLeader] Leader ${slug} chargé avec succès`)

      // Transformer la donnée en format Leader
      const transformedLeader: Leader = {
        id: data.leader.id,
        name: data.leader.name,
        slug: data.leader.slug,
        partyId: data.leader.party_id,
        municipalityId: data.leader.municipality_id,
        biography: data.leader.biography || undefined,
        photoUrl: data.leader.photo_url || undefined,
        experience: Array.isArray(data.leader.experience) ? data.leader.experience : [],
        vision2025: data.leader.vision_2025 || undefined,
        achievements: Array.isArray(data.leader.achievements) ? data.leader.achievements : [],
        socialMedia: {
          website: data.leader.website_url || undefined,
          facebook: data.leader.facebook_url || undefined,
          twitter: data.leader.twitter_url || undefined,
          linkedin: data.leader.linkedin_url || undefined,
        },
        party: data.leader.party ? {
          id: data.leader.party.id,
          name: data.leader.party.name,
          shortName: data.leader.party.short_name || undefined,
          logoUrl: data.leader.party.logo_url || undefined,
          orientation: data.leader.party.orientation || undefined,
        } : undefined
      }

      setLeader(transformedLeader)

    } catch (err) {
      console.error('❌ [useLeader] Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      setLeader(null)
    } finally {
      setLoading(false)
    }
  }

  // Charger les données lors du changement de paramètres
  useEffect(() => {
    fetchLeader()
  }, [municipality, slug])

  return {
    leader,
    loading,
    error,
    refetch: fetchLeader,
    notFound: !leader && !loading && !error
  }
}