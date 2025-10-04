-- Script de population des priorités des partis - QUEBEC
-- Date: 2025-01-26
-- Objectif: Peupler la colonne priority_list pour tous les partis de Quebec
-- Utilise response_type='priority_ranking' pour identifier la question cible

-- Mise à jour des priorités pour chaque parti de Quebec
-- Basé sur l'analyse documentée dans PRIORITES-PARTIS-MUNICIPAUX-2025.md

-- 1. Alliance citoyenne de Québec
UPDATE party_positions
SET priority_list = '["Développement économique et social", "Services municipaux", "Transport et mobilité"]'
WHERE party_id = 'alliance_citoyenne'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 2. Équipe priorité Québec
UPDATE party_positions
SET priority_list = '["Environnement et espaces verts", "Services municipaux", "Transport et mobilité"]'
WHERE party_id = 'equipe_priorite_quebec'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 3. Leadership Québec
UPDATE party_positions
SET priority_list = '["Transport et mobilité", "Gestion des finances municipales", "Services municipaux"]'
WHERE party_id = 'leadership_quebec'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 4. Québec d'abord
UPDATE party_positions
SET priority_list = '["Services municipaux", "Transport et mobilité", "Logement abordable"]'
WHERE party_id = 'quebec_dabord'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 5. Québec forte et fière (maire sortant Bruno Marchand)
UPDATE party_positions
SET priority_list = '["Projet de tramway", "Logement abordable", "Environnement et espaces verts"]'
WHERE party_id = 'quebec_forte_et_fiere'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 6. Respect citoyens
UPDATE party_positions
SET priority_list = '["Gestion des finances municipales", "Services municipaux", "Sécurité publique"]'
WHERE party_id = 'respect_citoyens'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- 7. Transition Québec
UPDATE party_positions
SET priority_list = '["Logement abordable", "Environnement et espaces verts", "Transport et mobilité"]'
WHERE party_id = 'transition_quebec'
AND question_id IN (
    SELECT id FROM questions
    WHERE response_type = 'priority_ranking'
    AND municipality_id = 'quebec'
);

-- Validation: Vérifier que toutes les priorités ont été mises à jour
SELECT
    pp.party_id,
    pp.priority_list,
    q.id as question_id,
    q.text as question_text
FROM party_positions pp
JOIN questions q ON pp.question_id = q.id
WHERE q.response_type = 'priority_ranking'
AND q.municipality_id = 'quebec'
AND pp.priority_list IS NOT NULL;