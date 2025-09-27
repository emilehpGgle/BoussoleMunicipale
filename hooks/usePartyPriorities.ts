import { useState, useCallback, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

interface PartyPrioritiesState {
  prioritiesByParty: Record<string, Record<string, number>> | null
  isLoading: boolean
  error: string | null
}

/**
 * Hook pour récupérer les priorités des partis depuis Supabase
 * Parse les priorités depuis la colonne 'note' des party_positions
 */
export function usePartyPriorities(municipalityId?: string) {
  const [state, setState] = useState<PartyPrioritiesState>({
    prioritiesByParty: null,
    isLoading: true,
    error: null
  })

  // Fonction pour parser les priorités depuis le texte de la colonne 'note'
  const parsePrioritiesFromNote = useCallback((noteText: string): Record<string, number> => {
    if (!noteText) return {}

    // Rechercher le pattern "Priorités: ..." dans le texte
    const priorityMatch = noteText.match(/Priorités?\s*:\s*(.+)/i)
    if (!priorityMatch) return {}

    const prioritiesText = priorityMatch[1]

    // Diviser par virgules et nettoyer
    const priorityItems = prioritiesText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)

    // Créer un objet avec rang par priorité (1 = plus important)
    const priorities: Record<string, number> = {}
    priorityItems.forEach((item, index) => {
      // Normaliser le nom de la priorité
      const normalizedItem = item
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')

      priorities[normalizedItem] = index + 1
    })

    return priorities
  }, [])

  // Charger les priorités des partis depuis Supabase
  const loadPartyPriorities = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      if (!municipalityId) {
        setState(prev => ({
          ...prev,
          prioritiesByParty: null,
          isLoading: false,
          error: null
        }))
        return
      }

      // Mapper le municipality_id vers le préfixe utilisé dans question_id
      const municipalityPrefixes: Record<string, string> = {
        'quebec': 'qc',
        'montreal': 'mtl',
        'laval': 'lav',
        'gatineau': 'gat',
        'longueuil': 'lng',
        'levis': 'lev'
      }

      const prefix = municipalityPrefixes[municipalityId]
      if (!prefix) {
        throw new Error(`Préfixe non trouvé pour municipality_id: ${municipalityId}`)
      }

      const supabase = createClient()

      // Récupérer les positions des partis avec la question de priorités
      // Note: utilise le préfixe dans question_id car municipality_id n'existe pas dans party_positions
      const { data: partyPositions, error } = await supabase
        .from('party_positions')
        .select('party_id, question_id, position, note, priority_list')
        .ilike('question_id', `${prefix}%enjeux_prioritaires%`)

      if (error) {
        throw new Error(`Erreur Supabase: ${error.message}`)
      }

      if (!partyPositions || partyPositions.length === 0) {
        console.warn(`🔍 [usePartyPriorities] Aucune priorité trouvée pour ${municipalityId}`)
        setState(prev => ({
          ...prev,
          prioritiesByParty: {},
          isLoading: false,
          error: null
        }))
        return
      }

      // Parser les priorités pour chaque parti
      const prioritiesByParty: Record<string, Record<string, number>> = {}

      partyPositions.forEach(position => {
        let priorities: Record<string, number> = {}

        // Essayer d'abord priority_list (format JSON)
        if (position.priority_list) {
          try {
            const parsed = typeof position.priority_list === 'string'
              ? JSON.parse(position.priority_list)
              : position.priority_list
            if (parsed && typeof parsed === 'object') {
              // Normaliser les clés et convertir les valeurs en nombres
              Object.entries(parsed).forEach(([key, value]) => {
                const normalizedKey = key.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
                priorities[normalizedKey] = Number(value) || 0
              })
            }
          } catch (error) {
            console.warn(`Erreur parsing priority_list pour ${position.party_id}:`, error)
          }
        }

        // Si priority_list vide, essayer note (format texte)
        if (Object.keys(priorities).length === 0 && position.note) {
          priorities = parsePrioritiesFromNote(position.note)
        }

        // Ajouter aux résultats si des priorités ont été trouvées
        if (Object.keys(priorities).length > 0) {
          prioritiesByParty[position.party_id] = priorities
        }
      })

      console.log(`✅ [usePartyPriorities] Priorités chargées pour ${municipalityId}:`, {
        partiesCount: Object.keys(prioritiesByParty).length,
        parties: Object.keys(prioritiesByParty),
        samplePriorities: Object.values(prioritiesByParty)[0]
      })

      setState(prev => ({
        ...prev,
        prioritiesByParty,
        isLoading: false,
        error: null
      }))

    } catch (error) {
      console.error('❌ [usePartyPriorities] Erreur chargement:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [municipalityId, parsePrioritiesFromNote])

  // Charger automatiquement quand municipalityId change
  useEffect(() => {
    loadPartyPriorities()
  }, [loadPartyPriorities])

  return {
    // État
    prioritiesByParty: state.prioritiesByParty,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    loadPartyPriorities,

    // Utilitaires mémoisés
    partiesCount: useMemo(() =>
      state.prioritiesByParty ? Object.keys(state.prioritiesByParty).length : 0,
      [state.prioritiesByParty]
    ),

    hasData: useMemo(() =>
      state.prioritiesByParty !== null && Object.keys(state.prioritiesByParty).length > 0,
      [state.prioritiesByParty]
    )
  }
}