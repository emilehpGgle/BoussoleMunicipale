-- Script SQL: Peupler les priorités des partis politiques de Montréal
-- Date: 2025-01-26
-- Municipalité: Montréal (5 partis)
-- Note: Utilise response_type='priority_ranking' pour identifier les questions de priorités

-- ===========================================================================
-- PROJET MONTRÉAL
-- Orientation: Centre-gauche | Chef: Luc Rabouin
-- Priorités: 1. Transport et mobilité, 2. Environnement et espaces verts, 3. Logement abordable
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Transport et mobilité", "Environnement et espaces verts", "Logement abordable"]'::JSONB
WHERE party_id = 'projet_montreal_mtl'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'montreal'
);

-- ===========================================================================
-- ENSEMBLE MONTRÉAL
-- Orientation: Centre-droit | Chef: Soraya Martinez Ferrada
-- Priorités: 1. Gestion des finances municipales, 2. Coordination des arrondissements, 3. Services municipaux
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Coordination des arrondissements", "Services municipaux"]'::JSONB
WHERE party_id = 'ensemble_montreal_mtl'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'montreal'
);

-- ===========================================================================
-- TRANSITION MONTRÉAL
-- Orientation: Centre-gauche | Chef: Craig Sauvé
-- Priorités: 1. Logement abordable, 2. Développement économique et social, 3. Transport et mobilité
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Logement abordable", "Développement économique et social", "Transport et mobilité"]'::JSONB
WHERE party_id = 'transition_montreal_mtl'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'montreal'
);

-- ===========================================================================
-- ACTION MONTRÉAL
-- Orientation: Centre-droit | Chef: Gilbert Thibodeau
-- Priorités: 1. Gestion des finances municipales, 2. Services municipaux, 3. Sécurité publique
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Services municipaux", "Sécurité publique"]'::JSONB
WHERE party_id = 'action_montreal_mtl'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'montreal'
);

-- ===========================================================================
-- FUTUR MONTRÉAL
-- Orientation: Centre | Chef: Jean-François Kacou
-- Priorités: 1. Transport et mobilité, 2. Logement abordable, 3. Sécurité publique
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Transport et mobilité", "Logement abordable", "Sécurité publique"]'::JSONB
WHERE party_id = 'futur_montreal_mtl'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'montreal'
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
AND q.municipality_id = 'montreal'
AND pp.priority_list IS NOT NULL
GROUP BY pp.party_id, pp.priority_list
ORDER BY pp.party_id;

-- Résultat attendu: 5 partis avec leurs priorités respectives