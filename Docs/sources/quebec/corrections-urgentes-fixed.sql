-- ================================================================
-- CORRECTIONS URGENTES - PARTIS POLITIQUES QUÉBEC (VERSION CORRIGÉE)
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
SELECT 'Alliance Citoyenne supprimé' as status,
       COUNT(*) as positions_restantes
FROM party_positions
WHERE party_id = 'alliance-citoyenne-quebec';

-- ================================================================
-- 2. GESTION FUSION ÉQUIPE PRIORITÉ → LEADERSHIP QUÉBEC
-- ================================================================

-- D'abord, vérifier quels partis existent
SELECT 'Partis existants:' as info,
       id,
       name,
       leader
FROM parties
WHERE id IN ('equipe-priorite-quebec', 'leadership-quebec')
ORDER BY id;

-- Vérifier les positions existantes
SELECT 'Positions par parti:' as info,
       p.name,
       COUNT(pp.id) as nb_positions
FROM parties p
LEFT JOIN party_positions pp ON p.id = pp.party_id
WHERE p.id IN ('equipe-priorite-quebec', 'leadership-quebec')
GROUP BY p.id, p.name;

-- Identifier les conflits potentiels
SELECT 'Conflits détectés:' as info,
       eq.question_id,
       eq.position as equipe_priorite_position,
       lq.position as leadership_position
FROM party_positions eq
JOIN party_positions lq ON eq.question_id = lq.question_id
WHERE eq.party_id = 'equipe-priorite-quebec'
AND lq.party_id = 'leadership-quebec';

-- Solution: Mettre à jour les métadonnées de Leadership Québec pour refléter la fusion
UPDATE parties
SET
    name = 'Leadership Québec',
    leader = 'Sam Hamad',
    main_ideas_summary = 'Coalition municipale pragmatique issue de la fusion avec Équipe Priorité Québec (août 2025). Opposition au tramway avec alternative SRB+. Gestion rigoureuse et écoute citoyenne.',
    strengths = jsonb_set(
        COALESCE(strengths, '[]'::jsonb),
        '{999}',
        '"Fusion avec Équipe Priorité (Stevens Mélançon)"'
    )
WHERE id = 'leadership-quebec';

-- Ajouter une note sur la fusion dans les positions de Leadership Québec
UPDATE party_positions
SET note = COALESCE(note || ' | ', '') || 'Position renforcée par fusion avec Équipe Priorité Québec (août 2025)'
WHERE party_id = 'leadership-quebec';

-- Supprimer Équipe Priorité Québec seulement APRÈS avoir vérifié que Leadership existe
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM parties WHERE id = 'leadership-quebec') THEN
        -- Supprimer les positions d'Équipe Priorité (évite les doublons)
        DELETE FROM party_positions WHERE party_id = 'equipe-priorite-quebec';

        -- Supprimer le parti Équipe Priorité
        DELETE FROM parties WHERE id = 'equipe-priorite-quebec';

        RAISE NOTICE 'Équipe Priorité Québec supprimé avec succès';
    ELSE
        RAISE NOTICE 'Leadership Québec n''existe pas, fusion impossible';
    END IF;
END $$;

-- ================================================================
-- 3. METTRE À JOUR LES SOURCES DE RESPECT CITOYENS
-- ================================================================

-- Vérifier d'abord si Respect Citoyens existe
SELECT 'Respect Citoyens trouvé:' as info,
       id,
       name,
       leader
FROM parties
WHERE name ILIKE '%respect%citoyens%'
   OR id ILIKE '%respect%citoyens%';

-- Mettre à jour les sources de Respect Citoyens avec double référence
UPDATE party_positions
SET
    source = 'Plateforme Électorale 2025 (14 mai) + Questionnaire direct',
    note = COALESCE(note, '') || CASE
        WHEN note IS NULL OR note = '' THEN 'Double validation: Plateforme officielle + Réponse questionnaire direct'
        ELSE ' | Double validation: Plateforme officielle + Réponse questionnaire direct'
    END
WHERE party_id IN (
    SELECT id FROM parties
    WHERE name ILIKE '%respect%citoyens%'
       OR id ILIKE '%respect%citoyens%'
);

-- ================================================================
-- 4. METTRE À JOUR SOURCES QUÉBEC FORTE ET FIÈRE
-- ================================================================

-- Québec Forte et Fière - Sources du site officiel
UPDATE party_positions
SET
    source = 'Site officiel quebecforteetfiere.org/plateforme - Sept 2025',
    note = COALESCE(note, '') || CASE
        WHEN note IS NULL OR note = '' THEN 'Source officielle vérifiée'
        ELSE ' | Source officielle vérifiée'
    END
WHERE party_id IN (
    SELECT id FROM parties WHERE name ILIKE '%québec%forte%fière%'
)
AND (source = 'Données actualisées 2025' OR source ILIKE '%données%actualisées%');

-- ================================================================
-- 5. METTRE À JOUR SOURCES LEADERSHIP QUÉBEC (TRANSPORT)
-- ================================================================

-- Leadership Québec - Position SRB documentée
UPDATE party_positions
SET
    source = 'Le Devoir - 18 juin 2025 - Proposition SRB+ 4,2 milliards',
    note = COALESCE(note, '') || CASE
        WHEN note IS NULL OR note = '' THEN 'Alternative au tramway: SRB+ 29km, mise en service 2029-2031'
        ELSE ' | Alternative au tramway: SRB+ 29km, mise en service 2029-2031'
    END
WHERE party_id = 'leadership-quebec'
AND question_id ILIKE '%tramway%';

-- ================================================================
-- 6. VÉRIFICATIONS FINALES
-- ================================================================

-- Compter les partis actifs après nettoyage
SELECT 'RÉSUMÉ FINAL:' as info,
       COUNT(*) as partis_actifs_quebec
FROM parties
WHERE municipality_id = 'quebec';

-- Liste des partis restants
SELECT 'Partis actifs:' as info,
       name,
       leader,
       id
FROM parties
WHERE municipality_id = 'quebec'
ORDER BY name;

-- Vérifier la qualité des sources après amélioration
SELECT 'Qualité des sources:' as info,
    CASE
        WHEN source ILIKE '%site officiel%' OR source ILIKE '%plateforme%' THEN 'Source officielle'
        WHEN source ILIKE '%questionnaire%direct%' THEN 'Réponse directe'
        WHEN source ILIKE '%le devoir%' OR source ILIKE '%radio-canada%' THEN 'Média crédible'
        WHEN source IN ('Position politique', 'Programme politique', 'Déclarations publiques') THEN 'Source générique'
        ELSE 'Autre'
    END as type_source,
    COUNT(*) as occurrences
FROM party_positions pp
JOIN parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'quebec'
GROUP BY type_source
ORDER BY occurrences DESC;

-- ================================================================
-- RÉSUMÉ DES CHANGEMENTS SÉCURISÉS
-- ================================================================

SELECT 'CHANGEMENTS APPLIQUÉS:' as summary;
SELECT '✅ Alliance Citoyenne supprimé (parti inactif)' as change;
SELECT '✅ Équipe Priorité fusionné dans Leadership Québec' as change;
SELECT '✅ Sources Respect Citoyens améliorées (double référence)' as change;
SELECT '✅ Sources Québec Forte et Fière précisées' as change;
SELECT '✅ Position Leadership Québec sur transport documentée' as change;