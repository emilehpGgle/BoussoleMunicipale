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
  postalCode?: string
  district?: string
  location?: {
    postalCode: string
    district: string
    coordinates?: { lat: number; lng: number }
  }
  // Nouveaux champs pour email et consentements
  email?: string
  emailConsent?: boolean // Consentement pour recevoir les résultats par email
  marketingConsent?: boolean // Consentement pour marketing ciblé/vente de données
  consentTimestamp?: string // ISO timestamp du consentement
  emailVerified?: boolean // Statut de vérification de l'email
  unsubscribeToken?: string // Token pour se désabonner facilement
  [key: string]: any // Pour permettre d'autres champs dynamiques
}

// Types pour les consentements spécifiquement
export interface ConsentData {
  emailConsent: boolean
  marketingConsent: boolean
  timestamp: string
  ipAddress?: string // Pour traçabilité légale
}

interface ProfileState {
  profile: UserProfile
  isLoading: boolean
  isSaving: boolean
  error: string | null
  lastSaved: Date | null
  hasProfile: boolean
}

export function useProfile() {
  const { sessionToken, isSessionValid, isInitializing } = useSession()
  
  const [state, setState] = useState<ProfileState>({
    profile: {},
    isLoading: true,
    isSaving: false,
    error: null,
    lastSaved: null,
    hasProfile: false
  })

  // Charger le profil depuis Supabase uniquement
  const loadProfile = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Session obligatoire pour charger le profil
      // Mais être plus tolérant pendant l'initialisation de la session
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          profile: {},
          isLoading: false,
          hasProfile: false,
          // Ne pas afficher d'erreur si la session est en train de s'initialiser
          error: null 
        }))
        return
      }

      // Charger depuis Supabase
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
            lastSaved: new Date(data.profile.updated_at),
            error: null
          }))
          return
        }
      }

      // En cas d'erreur API ou profil vide
      setState(prev => ({
        ...prev,
        profile: {},
        isLoading: false,
        hasProfile: false,
        error: null // Pas d'erreur si le profil n'existe pas encore
      }))

    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
      setState(prev => ({
        ...prev,
        profile: {},
        isLoading: false,
        hasProfile: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [sessionToken, isSessionValid])

  // Sauvegarder le profil (Supabase uniquement)
  const saveProfile = useCallback(async (profileData: UserProfile) => {
    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }))

      // Session obligatoire pour sauvegarder - mais être plus patient
      if (!sessionToken || !isSessionValid) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          // Afficher l'erreur seulement pour les tentatives de sauvegarde explicites
          error: 'Session requise pour sauvegarder votre profil'
        }))
        return
      }

      // Calculer le profil mis à jour
      const updatedProfile = { ...state.profile, ...profileData }

      // Mettre à jour l'état local immédiatement pour l'UX
      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        hasProfile: true
      }))

      // Sauvegarder vers Supabase
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

      // En cas d'erreur API
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Erreur lors de la sauvegarde du profil'
      }))

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

  // Effacer le profil (Supabase uniquement)
  const clearProfile = useCallback(async () => {
    try {
      if (!sessionToken || !isSessionValid) {
        console.warn('Session requise pour effacer le profil')
        return
      }

      // Effacer sur Supabase
      const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        setState(prev => ({
          ...prev,
          profile: {},
          hasProfile: false,
          lastSaved: null
        }))
        console.log('✅ Profil effacé sur Supabase')
      } else {
        console.warn('⚠️ Impossible d\'effacer le profil sur Supabase')
      }

    } catch (error) {
      console.error('Erreur lors de l\'effacement du profil:', error)
    }
  }, [sessionToken, isSessionValid])

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
      'age_group',
      'gender',
      'household_income',
      'education_level',
      'housing_status',
      'main_transport'
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
    if (state.profile.postalCode) summary['Code postal'] = state.profile.postalCode
    if (state.profile.politicalInterest) summary['Intérêt politique'] = state.profile.politicalInterest
    
    return summary
  }, [state.profile])

  // Méthodes spécifiques pour les consentements et email
  const updateConsent = useCallback(async (consentData: Partial<ConsentData>) => {
    const updatedProfile = {
      ...consentData,
      consentTimestamp: new Date().toISOString(),
    }
    return saveProfile(updatedProfile)
  }, [saveProfile])

  const setEmailConsent = useCallback(async (consent: boolean) => {
    return updateConsent({ emailConsent: consent })
  }, [updateConsent])

  const setMarketingConsent = useCallback(async (consent: boolean) => {
    return updateConsent({ marketingConsent: consent })
  }, [updateConsent])

  const updateEmailAndConsent = useCallback(async (email: string, emailConsent: boolean = true, marketingConsent: boolean = false) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Adresse email invalide')
    }

    const updatedProfile = {
      email: email.toLowerCase().trim(),
      emailConsent,
      marketingConsent,
      consentTimestamp: new Date().toISOString(),
      emailVerified: false, // À vérifier ultérieurement
    }
    
    return saveProfile(updatedProfile)
  }, [saveProfile])

  const hasValidConsent = useCallback((consentType: 'email' | 'marketing') => {
    if (consentType === 'email') {
      return state.profile.emailConsent === true && !!state.profile.email
    }
    return state.profile.marketingConsent === true
  }, [state.profile])

  const getConsentStatus = useCallback(() => {
    return {
      hasEmail: !!state.profile.email,
      emailConsent: state.profile.emailConsent === true,
      marketingConsent: state.profile.marketingConsent === true,
      consentDate: state.profile.consentTimestamp ? new Date(state.profile.consentTimestamp) : null,
      emailVerified: state.profile.emailVerified === true,
    }
  }, [state.profile])

  const revokeAllConsents = useCallback(async () => {
    const updatedProfile = {
      emailConsent: false,
      marketingConsent: false,
      consentTimestamp: new Date().toISOString(),
      // Garde l'email mais retire les consentements
    }
    return saveProfile(updatedProfile)
  }, [saveProfile])

  // Charger le profil au montage du composant avec patience pour l'initialisation
  useEffect(() => {
    // Attendre que la session soit complètement initialisée avant de charger
    if (!isInitializing && isSessionValid) {
      loadProfile()
    } else if (!isInitializing && !isSessionValid) {
      // Session définitivement non valide - état par défaut sans erreur
      setState(prev => ({
        ...prev,
        profile: {},
        isLoading: false,
        hasProfile: false,
        error: null
      }))
    }
    // Si isInitializing est true, on attend patiemment
  }, [isSessionValid, isInitializing, loadProfile])

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

    // Méthodes pour consentements et email
    updateConsent,
    setEmailConsent,
    setMarketingConsent,
    updateEmailAndConsent,
    hasValidConsent,
    getConsentStatus,
    revokeAllConsents,

    // Alias pour compatibilité avec le code existant
    userProfile: state.profile
  }
} 