-- ================================================================
-- CORRECTIONS URGENTES - PARTIS POLITIQUES QUÉBEC
-- ================================================================
-- Date: 29 septembre 2025
-- Corrections basées sur recherche et validation des sources

-- ================================================================
-- 1. SUPPRIMER ALLIANCE CITOYENNE DE QUÉBEC (PARTI INACTIF)
-- ================================================================

-- Supprimer toutes les positions du parti
DELETE FROM party_positions
WHERE party_id = 'alliance-citoyenne-quebec';

-- Supprimer le parti lui-même
DELETE FROM parties
WHERE id = 'alliance-citoyenne-quebec';

-- Vérification de la suppression
SELECT COUNT(*) as positions_restantes
FROM party_positions
WHERE party_id = 'alliance-citoyenne-quebec';

SELECT COUNT(*) as parti_existe
FROM parties
WHERE id = 'alliance-citoyenne-quebec';

-- ================================================================
-- 2. METTRE À JOUR ÉQUIPE PRIORITÉ QUÉBEC → LEADERSHIP QUÉBEC
-- ================================================================

-- Note: Stevens Mélançon et Équipe Priorité Québec ont fusionné avec Leadership Québec en août 2025
-- Source: Radio-Canada, Le Soleil, 13 août 2025

-- Transférer les positions d'Équipe Priorité vers Leadership Québec
UPDATE party_positions
SET party_id = 'leadership-quebec'
WHERE party_id = 'equipe-priorite-quebec';

-- Supprimer l'ancien parti Équipe Priorité Québec
DELETE FROM parties
WHERE id = 'equipe-priorite-quebec';

-- Vérification de la fusion
SELECT COUNT(*) as positions_leadership
FROM party_positions
WHERE party_id = 'leadership-quebec';

-- ================================================================
-- 3. METTRE À JOUR LES SOURCES DE RESPECT CITOYENS
-- ================================================================

-- Respect Citoyens dispose de sources de haute qualité:
-- 1. Plateforme officielle (14 mai 2025)
-- 2. Réponses directes au questionnaire

UPDATE party_positions
SET
    source = 'Plateforme Électorale 2025 (14 mai) + Questionnaire direct',
    note = COALESCE(note, '') || ' [Source double: Plateforme officielle + Réponse questionnaire]'
WHERE party_id IN (
    SELECT id FROM parties WHERE name LIKE '%Respect%Citoyens%'
);

-- ================================================================
-- 4. METTRE À JOUR LES SOURCES GÉNÉRIQUES
-- ================================================================

-- Identifier les sources génériques à améliorer
SELECT
    p.name as parti,
    pp.source,
    COUNT(*) as occurrences
FROM party_positions pp
JOIN parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'quebec'
AND pp.source IN (
    'Position politique',
    'Programme politique',
    'Déclarations publiques',
    'Données actualisées 2025',
    'Philosophie politique'
)
GROUP BY p.name, pp.source
ORDER BY p.name, occurrences DESC;

-- ================================================================
-- 5. AJOUTER DE NOUVELLES SOURCES SPÉCIFIQUES
-- ================================================================

-- Québec Forte et Fière - Sources du site officiel
UPDATE party_positions
SET source = 'Site officiel quebecforteetfiere.org/plateforme - Sept 2025'
WHERE party_id IN (
    SELECT id FROM parties WHERE name = 'Québec Forte et Fière'
)
AND source = 'Données actualisées 2025';

-- Leadership Québec - Position SRB
UPDATE party_positions
SET
    source = 'Le Devoir - 18 juin 2025 - Proposition SRB+ 4,2 milliards',
    note = 'Alternative au tramway: SRB+ 29km, mise en service 2029-2031'
WHERE party_id = 'leadership-quebec'
AND question_id LIKE '%tramway%';

-- ================================================================
-- 6. VÉRIFICATIONS FINALES
-- ================================================================

-- Compter les partis actifs après nettoyage
SELECT
    COUNT(*) as partis_actifs,
    string_agg(name, ', ' ORDER BY name) as liste_partis
FROM parties
WHERE municipality_id = 'quebec';

-- Vérifier la répartition des sources améliorées
SELECT
    CASE
        WHEN source LIKE '%site officiel%' OR source LIKE '%plateforme%' THEN 'Source officielle'
        WHEN source LIKE '%questionnaire%' THEN 'Réponse directe'
        WHEN source LIKE '%Le Devoir%' OR source LIKE '%Radio-Canada%' THEN 'Média crédible'
        WHEN source IN ('Position politique', 'Programme politique') THEN 'Source générique'
        ELSE 'Autre'
    END as type_source,
    COUNT(*) as occurrences
FROM party_positions pp
JOIN parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'quebec'
GROUP BY type_source
ORDER BY occurrences DESC;

-- ================================================================
-- RÉSUMÉ DES CHANGEMENTS
-- ================================================================
/*
1. ✅ Alliance Citoyenne supprimé (parti inactif)
2. ✅ Équipe Priorité fusionné avec Leadership Québec
3. ✅ Sources Respect Citoyens améliorées (double référence)
4. ✅ Sources Québec Forte et Fière précisées
5. ✅ Position Leadership Québec sur transport documentée

PARTIS ACTIFS APRÈS NETTOYAGE:
- Québec Forte et Fière (Bruno Marchand) - au pouvoir
- Leadership Québec (Sam Hamad) - opposition
- Respect Citoyens (Stéphane Lachance) - nouveau parti
- Québec d'Abord (Claude Villeneuve) - à vérifier
- Transition Québec (Jackie Smith) - à vérifier
- Démocratie Québec - à vérifier
*/