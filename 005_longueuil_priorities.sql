-- Script SQL: Peupler les priorités des partis politiques de Longueuil
-- Date: 2025-01-26
-- Municipalité: Longueuil (2 partis)
-- Note: Utilise response_type='priority_ranking' pour identifier les questions de priorités

-- ===========================================================================
-- COALITION LONGUEUIL
-- Orientation: Centre-gauche progressiste | Chef: Catherine Fournier
-- Priorités: 1. Logement abordable, 2. Environnement et espaces verts, 3. Transport métropolitain
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Logement abordable", "Environnement et espaces verts", "Transport métropolitain"]'::JSONB
WHERE party_id = 'coalition_longueuil_lng'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'longueuil'
);

-- ===========================================================================
-- OPTION ALLIANCE
-- Orientation: Centre-droit, participation citoyenne | Chef: Susan Rasmussen
-- Priorités: 1. Gestion des finances municipales, 2. Services municipaux, 3. Sécurité publique
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Services municipaux", "Sécurité publique"]'::JSONB
WHERE party_id = 'option_alliance_lng'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'longueuil'
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
AND q.municipality_id = 'longueuil'
AND pp.priority_list IS NOT NULL
GROUP BY pp.party_id, pp.priority_list
ORDER BY pp.party_id;

-- Résultat attendu: 2 partis avec leurs priorités respectives