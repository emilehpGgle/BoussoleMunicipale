/**
 * Fonction pour extraire les priorités des partis depuis la base de données
 * Remplace l'accès direct à party.priorities qui n'existe pas
 */

import { createClient } from '@/lib/supabase/client'

/**
 * Extrait les priorités d'un parti depuis la table party_positions
 * @param partyId - L'ID du parti (ex: 'alliance_citoyenne', 'projet_montreal_mtl')
 * @param municipalityId - L'ID de la municipalité (ex: 'quebec', 'montreal')
 * @returns Promise<string[]> - Tableau des priorités ou tableau vide si non trouvé
 */
export async function extractPartyPriorities(
  partyId: string,
  municipalityId: string
): Promise<string[]> {
  try {
    const supabase = createClient()
    // Rechercher la ligne party_positions avec priority_list pour ce parti
    // Utilise response_type='priority_ranking' pour identifier les questions de priorités
    const { data, error } = await supabase
      .from('party_positions')
      .select('priority_list')
      .eq('party_id', partyId)
      .eq('question_id',
        supabase
          .from('questions')
          .select('id')
          .eq('response_type', 'priority_ranking')
          .eq('municipality_id', municipalityId)
          .single()
      )
      .single()

    if (error) {
      console.warn(`Aucune priorité trouvée pour le parti ${partyId} dans ${municipalityId}:`, error.message)
      return []
    }

    // Vérifier que priority_list existe et est un tableau valide
    if (!data?.priority_list || !Array.isArray(data.priority_list)) {
      console.warn(`Priorités invalides pour le parti ${partyId}: ${JSON.stringify(data?.priority_list)}`)
      return []
    }

    return data.priority_list as string[]

  } catch (error) {
    console.error(`Erreur lors de l'extraction des priorités pour ${partyId}:`, error)
    return []
  }
}

/**
 * Version simplifiée qui extrait directement depuis party_positions
 * en assumant qu'il n'y a qu'une seule question de type priority_ranking par municipalité
 * @param partyId - L'ID du parti
 * @param municipalityId - L'ID de la municipalité
 * @returns Promise<string[]> - Tableau des priorités ou tableau vide
 */
export async function extractPartyPrioritiesSimple(
  partyId: string,
  municipalityId: string
): Promise<string[]> {
  try {
    const supabase = createClient()

    console.log(`🔍 [PRIORITIES-DEBUG] Recherche priorités pour ${partyId} dans ${municipalityId}`)

    // Recherche directe avec jointure pour obtenir les priorités
    const { data, error } = await supabase
      .from('party_positions')
      .select(`
        priority_list,
        questions!inner(
          response_type,
          municipality_id
        )
      `)
      .eq('party_id', partyId)
      .eq('questions.response_type', 'priority_ranking')
      .eq('questions.municipality_id', municipalityId)
      .single()

    if (error) {
      console.warn(`❌ [PRIORITIES-DEBUG] Aucune priorité trouvée pour ${partyId} dans ${municipalityId}:`, error.message)
      return []
    }

    console.log(`✅ [PRIORITIES-DEBUG] Données trouvées pour ${partyId}:`, {
      hasPriorityList: !!data?.priority_list,
      isArray: Array.isArray(data?.priority_list),
      priorityList: data?.priority_list
    })

    if (!data?.priority_list || !Array.isArray(data.priority_list)) {
      console.warn(`⚠️ [PRIORITIES-DEBUG] priority_list invalide pour ${partyId}`)
      return []
    }

    return data.priority_list as string[]

  } catch (error) {
    console.error(`Erreur extraction priorités ${partyId}:`, error)
    return []
  }
}