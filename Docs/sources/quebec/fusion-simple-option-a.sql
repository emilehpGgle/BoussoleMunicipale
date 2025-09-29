-- ================================================================
-- FUSION SIMPLE - OPTION A : GARDER LEADERSHIP QUÉBEC
-- ================================================================
-- Supprime Équipe Priorité et garde les positions de Leadership Québec
-- Note la fusion dans les métadonnées pour traçabilité

-- ================================================================
-- 1. DOCUMENTER LA FUSION AVANT SUPPRESSION
-- ================================================================

-- Créer un log des différences pour traçabilité
CREATE TEMP TABLE fusion_log AS
SELECT
    q.text as question,
    eq.position as equipe_priorite_pos,
    lq.position as leadership_pos,
    CASE
        WHEN eq.position = lq.position THEN 'IDENTIQUE'
        ELSE 'CONFLIT'
    END as status
FROM party_positions eq
JOIN party_positions lq ON eq.question_id = lq.question_id
JOIN questions q ON eq.question_id = q.id
WHERE eq.party_id = 'equipe-priorite-quebec'
AND lq.party_id = 'leadership-quebec'
ORDER BY q.order_index;

-- Afficher le résumé des conflits
SELECT 'RÉSUMÉ FUSION:' as info,
       status,
       COUNT(*) as nb_questions
FROM fusion_log
GROUP BY status;

-- ================================================================
-- 2. METTRE À JOUR LES MÉTADONNÉES DE LEADERSHIP QUÉBEC
-- ================================================================

-- Enrichir la description pour mentionner la fusion
UPDATE parties
SET
    main_ideas_summary = 'Coalition municipale issue de la fusion avec Équipe Priorité Québec (Stevens Mélançon) en août 2025. Opposition au tramway avec alternative SRB+. Gestion rigoureuse et écoute citoyenne pragmatique.',
    strengths = CASE
        WHEN strengths IS NULL THEN
            '["Coalition renforcée", "Fusion avec Équipe Priorité", "Expérience municipale (Stevens Mélançon)", "Vision SRB+ documentée"]'::jsonb
        ELSE
            strengths || '["Fusion avec Équipe Priorité (août 2025)"]'::jsonb
    END
WHERE id = 'leadership-quebec';

-- Ajouter note de fusion aux positions de Leadership
UPDATE party_positions
SET note = CASE
    WHEN note IS NULL OR note = '' THEN
        'Position maintenue après fusion avec Équipe Priorité Québec (août 2025)'
    ELSE
        note || ' | Position maintenue après fusion avec Équipe Priorité Québec (août 2025)'
END
WHERE party_id = 'leadership-quebec';

-- ================================================================
-- 3. SUPPRIMER ÉQUIPE PRIORITÉ QUÉBEC
-- ================================================================

-- Supprimer les positions d'Équipe Priorité
DELETE FROM party_positions
WHERE party_id = 'equipe-priorite-quebec';

-- Supprimer le parti Équipe Priorité
DELETE FROM parties
WHERE id = 'equipe-priorite-quebec';

-- ================================================================
-- 4. METTRE À JOUR LES SOURCES DE LEADERSHIP QUÉBEC
-- ================================================================

-- Améliorer les sources avec la fusion documentée
UPDATE party_positions
SET source = CASE
    WHEN question_id ILIKE '%tramway%' THEN
        'Le Devoir (18 juin 2025) - SRB+ 4,2 milliards + Fusion Équipe Priorité (août 2025)'
    WHEN source IN ('Position politique', 'Programme politique', 'Données actualisées 2025') THEN
        'Leadership Québec + Équipe Priorité fusionnés (août 2025) - Sources: Radio-Canada, Le Soleil'
    ELSE
        COALESCE(source, 'Position politique') || ' - Post-fusion août 2025'
END
WHERE party_id = 'leadership-quebec';

-- ================================================================
-- 5. VÉRIFICATIONS FINALES
-- ================================================================

-- Vérifier que la fusion est complète
SELECT 'VÉRIFICATION:' as info,
       COUNT(*) as nb_partis_equipe_priorite
FROM parties
WHERE id = 'equipe-priorite-quebec';

-- Afficher le résultat final
SELECT 'LEADERSHIP QUÉBEC APRÈS FUSION:' as info,
       name,
       leader,
       main_ideas_summary
FROM parties
WHERE id = 'leadership-quebec';

-- Compter les positions de Leadership après fusion
SELECT 'POSITIONS LEADERSHIP:' as info,
       COUNT(*) as nb_positions
FROM party_positions
WHERE party_id = 'leadership-quebec';

-- Afficher quelques exemples de sources mises à jour
SELECT 'EXEMPLES SOURCES:' as info,
       LEFT(q.text, 50) || '...' as question,
       pp.position,
       LEFT(pp.source, 80) || '...' as source
FROM party_positions pp
JOIN questions q ON pp.question_id = q.id
WHERE pp.party_id = 'leadership-quebec'
ORDER BY q.order_index
LIMIT 5;

SELECT 'FUSION TERMINÉE - Équipe Priorité intégrée dans Leadership Québec' as status;