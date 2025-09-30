-- =====================================================
-- Mise à jour des positions politiques - Transition Montréal
-- Date: 30 septembre 2025
-- Basé sur: Docs/sources/montreal/transition-montreal-positions-research.md
-- =====================================================

BEGIN;

-- =====================================================
-- Q1 - Extension métro/REM : PA → FA
-- =====================================================
UPDATE party_positions
SET
    position = 'FA',
    source = 'Page transport collectif - transitionmtl.org, 30 septembre 2025',
    note = 'Support fort aux extensions métro (ligne orange vers REM Bois-Franc, ligne verte vers LaSalle/Lachine) et tramway Est. Maintien expertise bureau projet STM.',
    quote = 'Maintenir l''expertise du bureau de projet du métro de la STM pour les futures extensions du métro. Prioriser: extension ligne orange vers station REM Bois-Franc; extension ligne verte vers LaSalle et Lachine',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q1_metro_rem';

-- =====================================================
-- Q2 - Pistes cyclables : Mise à jour source/note seulement
-- =====================================================
UPDATE party_positions
SET
    source = 'Page transport collectif - transitionmtl.org',
    note = 'Support à la mobilité active dans cadre développement transport collectif structurant, sans programme cyclable spécifique identifié',
    quote = 'Le transport collectif est la colonne vertébrale d''une ville moderne et juste',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q2_pistes_cyclables';

-- =====================================================
-- Q3 - Autonomie arrondissements : PA → FA
-- =====================================================
UPDATE party_positions
SET
    position = 'FA',
    source = 'Page réforme électorale - transitionmtl.org, 30 septembre 2025',
    note = 'Vote libre pour conseillers selon convictions et besoins électeurs, fin exception antidémocratique Ville-Marie, opposition votes de parti whippés',
    quote = 'Instaurer le vote libre pour les membres des partis. Chaque représentant·e pourra voter selon ses convictions et les besoins de ses électeur·rice·s',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q3_arrondissements_autonomie';

-- =====================================================
-- Q4 - Mobilité active centre-ville : Mise à jour source/note
-- =====================================================
UPDATE party_positions
SET
    source = 'Page sécurité autour écoles - transitionmtl.org',
    note = 'Priorité mobilité active dans zones scolaires avec woonerf et apaisement circulation, sans position explicite réduction espace automobile centre-ville',
    quote = 'Un droit fondamental à des déplacements sécuritaires pour chaque élève, peu importe le quartier',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q4_priorite_mobilite_active';

-- =====================================================
-- Q5 - Quotas logements abordables : Mise à jour source/note
-- =====================================================
UPDATE party_positions
SET
    source = 'Page taxe ultras-riches - transitionmtl.org, 30 septembre 2025',
    note = 'Surtaxe propriétés luxe 3,5M+ (1,25x) et 5M+ (1,33x) pour financer logement abordable et lutte itinérance. Engagement prioritaire justice sociale.',
    quote = 'L''argent ne manque pas. Il est simplement concentré entre trop peu de mains, alors que des personnes dorment dehors',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q5_quotas_logements_abordables';

-- =====================================================
-- Q6 - Réduction dépenses/taxes : N → PD
-- =====================================================
UPDATE party_positions
SET
    position = 'PD',
    source = 'Pages taxe ultras-riches et sécurité publique - transitionmtl.org',
    note = 'Opposition réduction taxes générales, taxation progressive ultras-riches, contrôle gaspillage SPVM (40M$/an heures supp), réallocation budgétaire',
    quote = 'Contrôler rigoureusement les heures supplémentaires du SPVM (plus de 40 millions $ annuellement 2019-2023) pour libérer fonds nécessaires à la prévention',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q6_reduction_depenses_taxes';

-- =====================================================
-- Q7 - Immeubles grande hauteur : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Analyse plateforme complète - transitionmtl.org',
    note = 'Aucune position explicite sur densification verticale, focus sur accessibilité et abordabilité logement',
    quote = NULL,
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q7_immeubles_grande_hauteur';

-- =====================================================
-- Q8 - Interdire essence centre-ville : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Page transport collectif - transitionmtl.org',
    note = 'Approche progressive via taxe kilométrique véhicules plutôt qu''interdiction, incitation au transport collectif',
    quote = 'Plutôt que de taxer l''essence, on taxe l''utilisation réelle de la route',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q8_interdire_essence_centre_ville';

-- =====================================================
-- Q9 - Protection espaces verts : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Analyse générale plateforme - transitionmtl.org',
    note = 'Pas de position explicite, valeurs progressistes suggèrent support modéré protection espaces verts',
    quote = NULL,
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q9_protection_espaces_verts';

-- =====================================================
-- Q10 - Transition carboneutre : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Ensemble plateforme transport et fiscalité - transitionmtl.org',
    note = 'Engagement transition écologique via transport collectif et taxe kilométrique, sans échéancier 2040 explicite',
    quote = 'Le transport collectif est la colonne vertébrale d''une ville moderne et juste',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q10_transition_carboneutre';

-- =====================================================
-- Q11 - Réduction déchets : N → FD
-- =====================================================
-- Question inversée: "Faut-il améliorer fréquence collecte
-- PLUTÔT QUE la réduire pour raisons environnementales ?"
-- FD = Privilégie environnement sur fréquence services
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

-- =====================================================
-- Q12 - Augmentation taxes projets écoresponsables : PA → FA
-- =====================================================
UPDATE party_positions
SET
    position = 'FA',
    source = 'Pages taxe ultras-riches et transport collectif - transitionmtl.org',
    note = 'Taxation progressive ultras-riches et taxe kilométrique véhicules pour financer projets sociaux/écologiques. Redistribution assumée.',
    quote = 'Créer deux nouvelles catégories de propriétés résidentielles : 3,5M+ taxées à 1,25x taux standard; 5M+ taxées à 1,33x',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q12_augmentation_taxes';

-- =====================================================
-- Q13 - Pouvoir conseils quartier : PA → FA
-- =====================================================
UPDATE party_positions
SET
    position = 'FA',
    source = 'Page réforme électorale - transitionmtl.org',
    note = 'Réforme démocratique incluant vote libre élus, représentation proportionnelle, renforcement démocratie participative locale',
    quote = 'Si Ottawa et Québec n''ont pas le courage de s''engager vers une réforme démocratique, Montréal doit montrer la voie',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q13_pouvoir_conseils_quartier';

-- =====================================================
-- Q14 - Réduction dette : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Pages infra-MTL et transport collectif - transitionmtl.org',
    note = 'Équilibre entre efficacité (travaux internes anti-collusion) et investissements structurants (transport). Pas de priorité réduction dette.',
    quote = 'Nous avons du personnel compétent à la Ville. Arrêtons de toujours tout donner au privé. Donnons à nos équipes les moyens d''en faire plus et d''en faire mieux',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q14_reduction_dette';

-- =====================================================
-- Q15 - Avantages fiscaux entreprises : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Page vie nocturne protégée - transitionmtl.org',
    note = 'Support petits commerces culturels via fonds coopératif, opposition avantages fiscaux généraux entreprises, priorité protection vs attraction',
    quote = 'Créer un fonds coopératif pour protéger les petites salles de la gentrification commerciale',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q15_avantages_fiscaux_entreprises';

-- =====================================================
-- Q16 - Limitation touristes : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Analyse plateforme - transitionmtl.org',
    note = 'Aucune position explicite sur tourisme, focus sur besoins résidents (logement, transport, services sociaux)',
    quote = NULL,
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q16_limitation_touristes';

-- =====================================================
-- Q17 - Soutien organismes communautaires : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Pages sécurité publique, taxe ultras-riches, marché alimentaire - transitionmtl.org',
    note = 'Investissement 25M$/an prévention, service civil 24/7 professionnels sociaux, réinvestissement revenus taxe ultras-riches, marchés communautaires',
    quote = 'Augmenter de 25 millions $ par année les investissements dans les programmes de prévention. Réinvestir les économies du SPVM dans les services sociaux préventifs',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q17_soutien_organismes_communautaires';

-- =====================================================
-- Q18 - Augmentation effectifs policiers : N → PD
-- =====================================================
UPDATE party_positions
SET
    position = 'PD',
    source = 'Page sécurité publique - transitionmtl.org, 30 septembre 2025',
    note = 'Opposition augmentation effectifs policiers, création service civil 24/7 professionnels santé/sociaux pour 70-80% appels 911 non-criminels',
    quote = 'La sécurité publique ce n''est pas plus de policiers et de voitures de patrouille. Elle passe par la prévention, la protection des droits humains et la création de services civils',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q18_augmentation_effectifs_policiers';

-- =====================================================
-- Q19 - Infrastructures loisirs/sport : Mise à jour note
-- =====================================================
UPDATE party_positions
SET
    source = 'Pages marchés alimentaires et vie nocturne - transitionmtl.org',
    note = 'Support infrastructures communautaires et culturelles de proximité, sans position spécifique installations sportives',
    quote = 'Implanter des marchés communautaires et publics dans les secteurs où l''accès à une alimentation saine et abordable à distance de marche est insuffisant',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q19_investissement_infrastructures_loisirs_sportives';

-- =====================================================
-- Q20 - Protection patrimoine : N → PA
-- =====================================================
UPDATE party_positions
SET
    position = 'PA',
    source = 'Page vie nocturne protégée - transitionmtl.org',
    note = 'Protection patrimoine culturel vivant via zones protégées lieux musicaux/bars, équilibre développement culturel vs gentrification',
    quote = 'Établir des zones culturelles protégées pour les lieux de musique et les bars',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q20_protection_patrimoine';

-- =====================================================
-- Q21 - Enjeux prioritaires : Modification priority_list
-- =====================================================
UPDATE party_positions
SET
    source = 'Analyse complète plateforme 10 pages - transitionmtl.org, 30 septembre 2025',
    note = 'Trois priorités centrales : logement abordable et lutte itinérance (taxe ultras-riches, 25M$/an prévention), transport collectif structurant (métro, tramway, taxe kilométrique), réforme démocratique et justice sociale (vote proportionnel, taxation progressive)',
    quote = NULL,
    priority_list = '{"Logement abordable": 1, "Transport collectif": 2, "Réforme démocratique et justice sociale": 3}',
    updated_at = NOW()
WHERE party_id = 'transition-montreal'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- =====================================================
-- Validation finale
-- =====================================================

-- Vérifier que toutes les mises à jour concernent bien Transition Montréal
DO $$
DECLARE
    updated_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO updated_count
    FROM party_positions
    WHERE party_id = 'transition-montreal'
      AND updated_at > NOW() - INTERVAL '1 minute';

    RAISE NOTICE 'Nombre de positions mises à jour pour Transition Montréal: %', updated_count;

    IF updated_count != 21 THEN
        RAISE EXCEPTION 'ERREUR: % positions mises à jour au lieu de 21', updated_count;
    END IF;
END $$;

-- Afficher résumé des changements de position
SELECT
    question_id,
    position,
    LEFT(note, 80) || '...' as note_preview
FROM party_positions
WHERE party_id = 'transition-montreal'
ORDER BY question_id;

COMMIT;

-- =====================================================
-- Résumé des modifications
-- =====================================================
-- Changements de position (9):
--   Q1:  PA → FA (Extension métro/REM)
--   Q3:  PA → FA (Autonomie arrondissements)
--   Q6:  N  → PD (Réduction dépenses/taxes)
--   Q11: N  → FD (Réduction déchets - question inversée, privilégie environnement)
--   Q12: PA → FA (Augmentation taxes projets écoresponsables)
--   Q13: PA → FA (Pouvoir conseils quartier)
--   Q18: N  → PD (Augmentation effectifs policiers)
--   Q20: N  → PA (Protection patrimoine)
--   Q21: Modification priority_list
--
-- Mises à jour sources/notes (12): Q2, Q4, Q5, Q7, Q8, Q9, Q10, Q14, Q15, Q16, Q17, Q19
-- =====================================================
