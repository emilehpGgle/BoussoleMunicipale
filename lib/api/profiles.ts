import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']
type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']

// Interface pour les données de profil utilisateur
export interface ProfileData {
  age_group?: string
  gender?: string
  household_income?: string
  education_level?: string
  main_transport?: string[]
  housing_status?: string
  municipal_priorities?: Record<string, number>
  citizen_concerns?: string
  [key: string]: string | string[] | Record<string, number> | undefined
}

export class ProfilesAPI {
  private supabase = createClient()

  /**
   * Sauvegarde ou met à jour le profil utilisateur pour une session
   */
  async saveProfile(sessionId: string, profileData: ProfileData, municipalityId?: string) {
    // Validate sessionId format
    if (!sessionId || typeof sessionId !== 'string' || sessionId.length < 10) {
      throw new Error('Invalid session ID format')
    }

    // Validate profile data structure
    if (!profileData || typeof profileData !== 'object') {
      throw new Error('Profile data must be a valid object')
    }

    const profile: UserProfileInsert = {
      session_id: sessionId,
      profile_data: profileData,
      ...(municipalityId && { municipality_id: municipalityId }),
    }

    const { data, error } = await this.supabase
      .from('user_profiles')
      .upsert(profile, { 
        onConflict: 'session_id',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error)
      throw new Error(`Erreur lors de la sauvegarde du profil: ${error.message}`)
    }

    return data
  }

  /**
   * Récupère le profil utilisateur pour une session
   */
  async getProfile(sessionId: string, municipalityId?: string): Promise<UserProfile | null> {
    let query = this.supabase
      .from('user_profiles')
      .select('*')
      .eq('session_id', sessionId)

    // Filtrer par municipalité si spécifié
    if (municipalityId) {
      query = query.eq('municipality_id', municipalityId)
    }

    const { data, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Aucun profil trouvé, ce n'est pas une erreur
        return null
      }
      console.error('Erreur lors de la récupération du profil:', error)
      throw new Error(`Erreur lors de la récupération du profil: ${error.message}`)
    }

    return data
  }

  /**
   * Récupère les données du profil
   */
  async getProfileData(sessionId: string, municipalityId?: string): Promise<ProfileData> {
    const profile = await this.getProfile(sessionId, municipalityId)
    return profile?.profile_data as ProfileData || {}
  }

  /**
   * Met à jour partiellement le profil utilisateur
   */
  async updateProfile(sessionId: string, profileUpdates: Partial<ProfileData>, municipalityId?: string) {
    // D'abord récupérer le profil existant
    const existingProfile = await this.getProfile(sessionId, municipalityId)

    let updatedProfileData: ProfileData

    if (existingProfile) {
      // Fusionner avec les données existantes
      updatedProfileData = {
        ...(existingProfile.profile_data as ProfileData),
        ...profileUpdates
      }
    } else {
      // Créer un nouveau profil
      updatedProfileData = profileUpdates
    }

    return this.saveProfile(sessionId, updatedProfileData, municipalityId)
  }

  /**
   * Supprime le profil d'une session
   */
  async deleteProfile(sessionId: string) {
    const { error } = await this.supabase
      .from('user_profiles')
      .delete()
      .eq('session_id', sessionId)

    if (error) {
      console.error('Erreur lors de la suppression du profil:', error)
      throw new Error(`Erreur lors de la suppression du profil: ${error.message}`)
    }
  }

  /**
   * Vérifie si un profil existe pour une session
   */
  async profileExists(sessionId: string, municipalityId?: string): Promise<boolean> {
    let query = this.supabase
      .from('user_profiles')
      .select('id')
      .eq('session_id', sessionId)

    // Filtrer par municipalité si spécifié
    if (municipalityId) {
      query = query.eq('municipality_id', municipalityId)
    }

    const { data, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') {
        return false
      }
      console.error('Erreur lors de la vérification du profil:', error)
      return false
    }

    return !!data
  }

  /**
   * Récupère des statistiques sur les profils (pour analytics)
   */
  async getProfileStats() {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('profile_data')

    if (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      throw new Error(`Erreur lors de la récupération des statistiques: ${error.message}`)
    }

    // Analyser les données pour créer des statistiques
    const stats = {
      totalProfiles: data.length,
      demographics: this.analyzeDemographics(data.map(p => p.profile_data as ProfileData))
    }

    return stats
  }

  /**
   * Analyse les données démographiques (méthode privée)
   */
  private analyzeDemographics(profiles: ProfileData[]) {
    const demographics = {
      age: {} as Record<string, number>,
      region: {} as Record<string, number>,
      education: {} as Record<string, number>,
      employment: {} as Record<string, number>
    }

    profiles.forEach(profile => {
      // Skip null or invalid profiles
      if (!profile || typeof profile !== 'object') {
        return
      }

      // Analyser l'âge
      if (profile.age && typeof profile.age === 'string') {
        demographics.age[profile.age] = (demographics.age[profile.age] || 0) + 1
      }

      // Analyser la région
      if (profile.region && typeof profile.region === 'string') {
        demographics.region[profile.region] = (demographics.region[profile.region] || 0) + 1
      }

      // Analyser l'éducation
      if (profile.education && typeof profile.education === 'string') {
        demographics.education[profile.education] = (demographics.education[profile.education] || 0) + 1
      }

      // Analyser l'emploi
      if (profile.employment && typeof profile.employment === 'string') {
        demographics.employment[profile.employment] = (demographics.employment[profile.employment] || 0) + 1
      }
    })

    return demographics
  }
}

// Instance singleton pour utilisation dans l'application
export const profilesAPI = new ProfilesAPI() 