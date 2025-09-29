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
 * Convertit un objet de classement en tableau trié par rang
 * @param rankingObject - Objet avec priorités comme clés et rangs comme valeurs
 * @returns Array de priorités triées par rang
 */
function convertRankingObjectToArray(rankingObject: Record<string, number>): string[] {
  return Object.entries(rankingObject)
    .sort(([, rankA], [, rankB]) => rankA - rankB) // Trier par rang croissant (1, 2, 3...)
    .map(([priority]) => priority)
}

/**
 * Version simplifiée qui extrait directement depuis party_positions
 * en assumant qu'il n'y a qu'une seule question de type priority_ranking par municipalité
 * Gère les deux formats: arrays JSON et objets de classement
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

    // console.log(`🔍 [PRIORITIES-DEBUG] Recherche priorités pour ${partyId} dans ${municipalityId}`)

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

    // console.log(`✅ [PRIORITIES-DEBUG] Données trouvées pour ${partyId}:`, {
    //   hasPriorityList: !!data?.priority_list,
    //   isArray: Array.isArray(data?.priority_list),
    //   isObject: typeof data?.priority_list === 'object' && data?.priority_list !== null && !Array.isArray(data?.priority_list),
    //   priorityList: data?.priority_list
    // })

    if (!data?.priority_list) {
      console.warn(`⚠️ [PRIORITIES-DEBUG] priority_list manquant pour ${partyId}`)
      return []
    }

    // 🔧 CORRECTION: Gérer les deux formats de données
    if (Array.isArray(data.priority_list)) {
      // Format array: ["Priority1", "Priority2", "Priority3"]
      // console.log(`✅ [PRIORITIES-DEBUG] Format array détecté pour ${partyId}`)
      return data.priority_list as string[]
    }
    else if (typeof data.priority_list === 'object' && data.priority_list !== null) {
      // Format objet de classement: {Priority1: 1, Priority2: 3, Priority3: 2}
      // console.log(`✅ [PRIORITIES-DEBUG] Format objet de classement détecté pour ${partyId}`)
      const convertedArray = convertRankingObjectToArray(data.priority_list as Record<string, number>)
      // console.log(`🔄 [PRIORITIES-DEBUG] Conversion pour ${partyId}:`, {
      //   original: data.priority_list,
      //   converted: convertedArray
      // })
      return convertedArray
    }
    else {
      console.warn(`⚠️ [PRIORITIES-DEBUG] Format priority_list invalide pour ${partyId}:`, typeof data.priority_list)
      return []
    }

  } catch (error) {
    console.error(`Erreur extraction priorités ${partyId}:`, error)
    return []
  }
}