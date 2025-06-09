import { useState, useEffect, useCallback } from 'react'
import { useSession } from './useSession'

// Types pour le profil utilisateur
export interface UserProfile {
  age?: string
  gender?: string
  occupation?: string
  residenceType?: string
  residenceArea?: string
  politicalInterest?: string
  previousVoting?: string
  mainConcerns?: string[]
  informationSources?: string[]
  [key: string]: any // Pour permettre d'autres champs dynamiques
}

interface ProfileState {
  profile: UserProfile
  isLoading: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
  hasProfile: boolean
}

const PROFILE_STORAGE_KEY = 'userProfile'

export function useProfile() {
  const { sessionToken, isSessionValid } = useSession()
  
  const [state, setState] = useState<ProfileState>({
    profile: {},
    isLoading: true,
    isSaving: false,
    error: null,
    lastSaved: null,
    hasProfile: false
  })

  // Charger le profil depuis Supabase ou localStorage
  const loadProfile = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Si pas de session ou session invalide, charger depuis localStorage directement
      if (!sessionToken || !isSessionValid) {
        const localProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}')

        setState(prev => ({
          ...prev,
          profile: localProfile,
          isLoading: false,
          hasProfile: Object.keys(localProfile).length > 0
        }))
        return
      }

      // Charger depuis Supabase avec header Authorization sécurisé
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.success && data.profile) {
          const profileData = data.profile.profile_data || {}
          
          setState(prev => ({
            ...prev,
            profile: profileData,
            isLoading: false,
            hasProfile: Object.keys(profileData).length > 0,
            lastSaved: new Date(data.profile.updated_at)
          }))
          return
        }
      }

      // Fallback : charger depuis localStorage
      const localProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}')

      setState(prev => ({
        ...prev,
        profile: localProfile,
        isLoading: false,
        hasProfile: Object.keys(localProfile).length > 0
      }))

    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
      
      // En cas d'erreur, fallback vers localStorage
      const localProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}')
      
      setState(prev => ({
        ...prev,
        profile: localProfile,
        isLoading: false,
        hasProfile: Object.keys(localProfile).length > 0,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Sauvegarder le profil complet
  const saveProfile = useCallback(async (profileData: UserProfile) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Calculer le profil mis à jour AVANT la mise à jour de l'état (fix bug state stale)
      const updatedProfile = { ...state.profile, ...profileData }

      // Mettre à jour l'état local immédiatement
      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        hasProfile: true
      }))

      // Sauvegarder dans localStorage comme fallback
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile))

      // Sauvegarder vers Supabase si possible
      if (sessionToken && isSessionValid) {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileData: updatedProfile
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setState(prev => ({
              ...prev,
              isSaving: false,
              lastSaved: new Date()
            }))
            return
          }
        }
      }

      // Si la sauvegarde Supabase échoue, on garde juste le localStorage
      setState(prev => ({ ...prev, isSaving: false }))

    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de sauvegarde',
        isSaving: false
      }))
    }
  }, [sessionToken, isSessionValid, state.profile])

  // Mettre à jour un champ spécifique du profil
  const updateProfileField = useCallback(async (field: string, value: any) => {
    return saveProfile({ [field]: value })
  }, [saveProfile])

  // Mettre à jour plusieurs champs en une fois
  const updateProfileFields = useCallback(async (fields: Partial<UserProfile>) => {
    return saveProfile(fields)
  }, [saveProfile])

  // Effacer le profil
  const clearProfile = useCallback(async () => {
    try {
      // Effacer localStorage
      localStorage.removeItem(PROFILE_STORAGE_KEY)

      // Effacer l'état local
      setState(prev => ({
        ...prev,
        profile: {},
        hasProfile: false,
        lastSaved: null
      }))

      // TODO: Effacer sur Supabase si nécessaire
      // (nécessiterait un endpoint DELETE spécifique)

    } catch (error) {
      console.error('Erreur lors de l\'effacement du profil:', error)
    }
  }, [])

  // Obtenir un champ spécifique du profil
  const getProfileField = useCallback((field: string, defaultValue?: any) => {
    return state.profile[field] ?? defaultValue
  }, [state.profile])

  // Vérifier si un champ existe dans le profil
  const hasProfileField = useCallback((field: string) => {
    return field in state.profile && state.profile[field] !== null && state.profile[field] !== undefined
  }, [state.profile])

  // Obtenir le pourcentage de complétion du profil
  const getCompletionPercentage = useCallback(() => {
    const requiredFields = [
      'age', 'gender', 'occupation', 'residenceType', 'residenceArea',
      'politicalInterest', 'previousVoting', 'mainConcerns', 'informationSources'
    ]
    
    const completedFields = requiredFields.filter(field => hasProfileField(field))
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }, [hasProfileField])

  // Vérifier si le profil est complet
  const isProfileComplete = useCallback(() => {
    return getCompletionPercentage() >= 80 // 80% de complétion considéré comme complet
  }, [getCompletionPercentage])

  // Obtenir un résumé du profil pour affichage
  const getProfileSummary = useCallback(() => {
    const summary: { [key: string]: string } = {}
    
    if (state.profile.age) summary['Âge'] = state.profile.age
    if (state.profile.gender) summary['Genre'] = state.profile.gender
    if (state.profile.occupation) summary['Profession'] = state.profile.occupation
    if (state.profile.residenceArea) summary['Secteur'] = state.profile.residenceArea
    if (state.profile.politicalInterest) summary['Intérêt politique'] = state.profile.politicalInterest
    
    return summary
  }, [state.profile])

  // Charger le profil au montage du composant
  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return {
    // État
    profile: state.profile,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    error: state.error,
    lastSaved: state.lastSaved,
    hasProfile: state.hasProfile,

    // Actions
    saveProfile,
    updateProfileField,
    updateProfileFields,
    clearProfile,
    loadProfile,

    // Utilitaires
    getProfileField,
    hasProfileField,
    getCompletionPercentage,
    isProfileComplete,
    getProfileSummary,

    // Alias pour compatibilité avec le code existant
    userProfile: state.profile
  }
} 