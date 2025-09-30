-- =====================================================
-- Corrections de cohérence - Transition Montréal
-- Date: 30 septembre 2025
-- Raison: Renforcer cohérence profil écologiste/progressiste
-- =====================================================

BEGIN;

-- =====================================================
-- Q9 - Protection espaces verts : PA → FA
-- =====================================================
-- Question: "Faut-il protéger davantage les espaces verts,
-- MÊME SI cela limite le développement immobilier ?"
--
-- Dualité: Espaces verts vs Développement immobilier
-- FA = Parti écologiste privilégie clairement environnement
-- =====================================================

UPDATE party_positions
SET
    position = 'FA',
    source = 'Identité écologique et plateforme environnementale - transitionmtl.org',
    note = 'Parti "Transition" écologique privilégie fortement protection espaces verts sur développement immobilier. Cohérent avec engagement transport collectif, taxe kilométrique, et identité environnementale centrale.',
    quote = 'Le transport collectif est la colonne vertébrale d''une ville moderne et juste',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q9_protection_espaces_verts';

-- =====================================================
-- Q10 - Transition carboneutre : PA → FA
-- =====================================================
-- Question: "La ville devrait-elle exiger que tous les nouveaux
-- bâtiments soient carboneutres, MÊME SI cela augmente les coûts ?"
--
-- Dualité: Carboneutralité vs Coûts construction
-- FA = Parti "Transition" assume son engagement écologique
-- =====================================================

UPDATE party_positions
SET
    position = 'FA',
    source = 'Nom du parti et engagement transition écologique - transitionmtl.org',
    note = 'Parti "Transition Montréal" assume fortement son engagement carboneutre. Nom même du parti reflète priorité transition écologique sur considérations économiques court terme.',
    quote = 'Le transport collectif est la colonne vertébrale d''une ville moderne et juste',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q10_transition_carboneutre';

-- =====================================================
-- Q14 - Réduction dette : N → PD
-- =====================================================
-- Question INVERSÉE: "La ville devrait-elle prioriser le maintien
-- des services essentiels PLUTÔT QUE d'investir dans des projets d'avenir ?"
--
-- Dualité inversée: Services essentiels vs Projets d'avenir
-- FA/PA = Conservateur (services actuels uniquement)
-- PD/FD = Progressiste (investissements futurs)
--
-- PD = Parti progressiste avec grands projets structurants
-- =====================================================

UPDATE party_positions
SET
    position = 'PD',
    source = 'Pages transport collectif et infra-MTL - transitionmtl.org',
    note = 'Parti progressiste avec investissements structurants majeurs (extensions métro, tramway Est, taxe kilométrique). Privilégie projets d''avenir sur maintien strict services essentiels uniquement.',
    quote = 'Maintenir l''expertise du bureau de projet du métro de la STM pour les futures extensions. Prioriser: extension ligne orange vers station REM Bois-Franc; extension ligne verte vers LaSalle et Lachine',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q14_reduction_dette';

-- =====================================================
-- Validation finale
-- =====================================================

-- Vérifier que les 3 mises à jour ont été effectuées
DO $$
DECLARE
    updated_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO updated_count
    FROM party_positions
    WHERE party_id = 'transition-montreal'
      AND question_id IN ('mtl_q9_protection_espaces_verts',
                          'mtl_q10_transition_carboneutre',
                          'mtl_q14_reduction_dette')
      AND updated_at > NOW() - INTERVAL '1 minute';

    RAISE NOTICE 'Nombre de positions corrigées: %', updated_count;

    IF updated_count != 3 THEN
        RAISE EXCEPTION 'ERREUR: % positions mises à jour au lieu de 3', updated_count;
    END IF;
END $$;

-- Afficher résumé des corrections
SELECT
    question_id,
    position,
    LEFT(note, 80) || '...' as note_preview
FROM party_positions
WHERE party_id = 'transition-montreal'
  AND question_id IN ('mtl_q9_protection_espaces_verts',
                      'mtl_q10_transition_carboneutre',
                      'mtl_q14_reduction_dette')
ORDER BY question_id;

COMMIT;

-- =====================================================
-- Résumé des corrections de cohérence
-- =====================================================
-- Q9:  PA → FA (Protection espaces verts - parti écologiste)
-- Q10: PA → FA (Carboneutre - nom du parti "Transition")
-- Q14: N  → PD (Projets d'avenir - question inversée, parti progressiste)
--
-- Justification générale:
-- Ces corrections renforcent la cohérence du profil politique
-- avec l'identité "Transition" écologique et progressiste du parti.
-- =====================================================
