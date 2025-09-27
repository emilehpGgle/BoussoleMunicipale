-- Script SQL: Peupler les priorités des partis politiques de Laval
-- Date: 2025-01-26
-- Municipalité: Laval (3 partis)
-- Note: Utilise response_type='priority_ranking' pour identifier les questions de priorités

-- ===========================================================================
-- MOUVEMENT LAVALLOIS – ÉQUIPE STÉPHANE BOYER
-- Orientation: Centre-gauche | Chef: Stéphane Boyer
-- Priorités: 1. Services municipaux, 2. Environnement et espaces verts, 3. Transport et mobilité
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Services municipaux", "Environnement et espaces verts", "Transport et mobilité"]'::JSONB
WHERE party_id = 'mouvement_lavallois_lav'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'laval'
);

-- ===========================================================================
-- PARTI LAVAL – ÉQUIPE CLAUDE LAROCHELLE
-- Orientation: Centre-droit | Chef: Claude Larochelle
-- Priorités: 1. Gestion des finances municipales, 2. Sécurité publique, 3. Services municipaux
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Sécurité publique", "Services municipaux"]'::JSONB
WHERE party_id = 'parti_laval_lav'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'laval'
);

-- ===========================================================================
-- ACTION LAVAL
-- Orientation: Centre | Chef: Frédéric Mayer
-- Priorités: 1. Gestion des finances municipales, 2. Développement économique, 3. Services municipaux
-- ===========================================================================
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Développement économique", "Services municipaux"]'::JSONB
WHERE party_id = 'action_laval_lav'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'laval'
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
AND q.municipality_id = 'laval'
AND pp.priority_list IS NOT NULL
GROUP BY pp.party_id, pp.priority_list
ORDER BY pp.party_id;

-- Résultat attendu: 3 partis avec leurs priorités respectives