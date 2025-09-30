-- =====================================================
-- CORRECTION Q11 - Transition Montréal
-- Date: 30 septembre 2025
-- Raison: La question Q11 est inversée (services vs environnement)
-- Parti "Transition" = priorité environnement > fréquence collecte
-- =====================================================

BEGIN;

-- =====================================================
-- Q11 - Réduction déchets : N → FD
-- =====================================================
-- Question: "Faut-il améliorer la fréquence de collecte des ordures
-- PLUTÔT QUE la réduire pour des raisons environnementales ?"
--
-- FD = Fortement en désaccord avec prioriser services sur environnement
-- = Parti privilégie clairement l'environnement
-- =====================================================

UPDATE party_positions
SET
    position = 'FD',
    source = 'Identité et plateforme environnementale - transitionmtl.org',
    note = 'Parti "Transition" avec engagement environnemental fort (transport collectif, taxe kilométrique). Privilégie réduction environnementale sur fréquence collecte services.',
    quote = 'Le transport collectif est la colonne vertébrale d''une ville moderne et juste',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q11_reduction_dechets';

-- Vérification
SELECT
    question_id,
    position,
    note
FROM party_positions
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q11_reduction_dechets';

COMMIT;

-- =====================================================
-- Justification détaillée:
-- =====================================================
-- 1. Nom du parti: "Transition" = transition écologique
-- 2. Transport collectif structurant prioritaire (réduction GES)
-- 3. Taxe kilométrique pour financer transport écologique
-- 4. Focus général sur environnement et justice sociale
-- 5. Logique: Un parti écologiste privilégie TOUJOURS
--    la réduction environnementale sur la fréquence de services
-- =====================================================
