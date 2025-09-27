-- Script SQL: Peupler les priorités des partis politiques de Gatineau
-- Date: 2025-01-26
-- Municipalité: Gatineau (2 partis)
-- Note: Utilise response_type='priority_ranking' pour identifier les questions de priorités

-- ===========================================================================
-- ACTION GATINEAU
-- Orientation: Centre-gauche social-démocrate | Chef: Maude Marquis-Bissonnette
-- Priorités: 1. Environnement et espaces verts, 2. Services municipaux, 3. Développement économique et social
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Environnement et espaces verts", "Services municipaux", "Développement économique et social"]'::JSONB
WHERE party_id = 'action_gatineau_gat'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'gatineau'
);

-- ===========================================================================
-- ÉQUIPE MARIO AUBÉ
-- Orientation: Big tent, conservatisme fiscal | Chef: Mario Aubé
-- Priorités: 1. Gestion des finances municipales, 2. Services municipaux, 3. Transport et mobilité
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Services municipaux", "Transport et mobilité"]'::JSONB
WHERE party_id = 'equipe_mario_aube_gat'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'gatineau'
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
AND q.municipality_id = 'gatineau'
AND pp.priority_list IS NOT NULL
GROUP BY pp.party_id, pp.priority_list
ORDER BY pp.party_id;

-- Résultat attendu: 2 partis avec leurs priorités respectives