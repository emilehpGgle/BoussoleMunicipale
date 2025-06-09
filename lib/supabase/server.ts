import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

/**
 * Client Supabase côté serveur avec Service Role Key
 * Peut contourner Row Level Security (RLS)
 * 
 * ⚠️ ATTENTION: Ne jamais utiliser ce client côté client (browser)
 * La Service Role Key doit rester confidentielle
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceRoleKey) {
    throw new Error(
      'Variables d\'environnement Supabase manquantes:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL\n' +
      '- SUPABASE_SERVICE_ROLE_KEY\n\n' +
      'Assurez-vous que votre fichier .env.local contient ces variables.'
    );
  }
  
  // Créer le client avec Service Role Key
  // auth.persistSession: false pour éviter les sessions côté serveur
  return createClient<Database>(
    url,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  )
}

/**
 * Client Supabase côté serveur pour les API routes
 * Alternative plus sécurisée avec gestion d'erreurs robuste
 */
export function createAPIClient() {
  try {
    return createServerClient()
  } catch (error) {
    console.error('❌ Erreur lors de la création du client Supabase serveur:', error)
    throw new Error('Configuration Supabase invalide. Vérifiez vos variables d\'environnement.')
  }
} 