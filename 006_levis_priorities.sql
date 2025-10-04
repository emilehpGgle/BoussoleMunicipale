-- Script SQL: Peupler les priorités des partis politiques de Lévis
-- Date: 2025-01-26
-- Municipalité: Lévis (3 partis)
-- Note: Utilise response_type='priority_ranking' pour identifier les questions de priorités

-- ===========================================================================
-- LÉVIS FORCE 10
-- Orientation: Centre | Chef: Isabelle Demers
-- Priorités: 1. Gestion des finances municipales, 2. Transport et mobilité, 3. Services municipaux
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Transport et mobilité", "Services municipaux"]'::JSONB
WHERE party_id = 'levis_force_10_lev'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'levis'
);

-- ===========================================================================
-- REPENSONS LÉVIS
-- Orientation: Centre-gauche | Chef: Serge Bonin
-- Priorités: 1. Gestion des finances municipales, 2. Services municipaux, 3. Développement économique et social
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Services municipaux", "Développement économique et social"]'::JSONB
WHERE party_id = 'repensons_levis_lev'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'levis'
);

-- ===========================================================================
-- PROSPÉRITÉ LÉVIS
-- Orientation: Centre-droit | Chef: Steven Blaney
-- Priorités: 1. Transport et mobilité, 2. Gestion des finances municipales, 3. Services municipaux
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Transport et mobilité", "Gestion des finances municipales", "Services municipaux"]'::JSONB
WHERE party_id = 'prosperite_levis_lev'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'levis'
);

-- ===========================================================================
-- VALIDATION
-- ===========================================================================
-- Vérifier que toutes les priorités ont été ajoutées correctement
SELECT
    pp.party_id,
    pp.priority_list,
    COUNT(*) as questions_mises_a_jour
FROM party_positions pp
JOIN questions q ON pp.question_id = q.id
WHERE q.response_type = 'priority_ranking'
AND q.municipality_id = 'levis'
AND pp.priority_list IS NOT NULL
GROUP BY pp.party_id, pp.priority_list
ORDER BY pp.party_id;

-- Résultat attendu: 3 partis avec leurs priorités respectives