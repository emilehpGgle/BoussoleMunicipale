// Hooks personnalisés pour la Boussole Municipale
// Gestion des données avec Supabase + fallback localStorage

export { useSession } from './useSession'
export { useUserResponses } from './useUserResponses'
export { useProfile, type UserProfile } from './useProfile'
export { useResults, type CalculatedResults, type PartyScore } from './useResults'

// Types réexportés pour faciliter l'utilisation
export type { AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types' 