-- =============================================================================
-- Migration : Standardisation IDs questions avec ON UPDATE CASCADE
-- Date : 2025-01-25
-- Objectif : Renommer tous les IDs avec format {prefix}_{type}_{numero}_{description}
--
-- STRATÉGIE : Utiliser ON UPDATE CASCADE pour propager automatiquement les changements
-- Les contraintes FK sont temporairement modifiées pour permettre la cascade
-- puis restaurées à leur état original après la migration
--
-- FORMAT FINAL : {prefix}_{type}_{numero}_{description}
-- Types supportés : q (générique), spec (spécifique), urgent, seasonal, survey
-- =============================================================================

BEGIN;

-- =============================================================================
-- ÉTAPE 1 : MODIFIER LES CONTRAINTES FK POUR AJOUTER ON UPDATE CASCADE
-- =============================================================================

-- 1.1 party_positions
ALTER TABLE party_positions
DROP CONSTRAINT party_positions_question_id_fkey;

ALTER TABLE party_positions
ADD CONSTRAINT party_positions_question_id_fkey
FOREIGN KEY (question_id) REFERENCES questions(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 1.2 user_responses (si existe)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'user_responses_question_id_fkey'
    ) THEN
        ALTER TABLE user_responses
        DROP CONSTRAINT user_responses_question_id_fkey;

        ALTER TABLE user_responses
        ADD CONSTRAINT user_responses_question_id_fkey
        FOREIGN KEY (question_id) REFERENCES questions(id)
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- =============================================================================
-- ÉTAPE 2 : RENOMMER LES IDs DANS questions (CASCADE automatique vers autres tables)
-- =============================================================================

-- QUEBEC : Format qc_q_XX et qc_spec_*
UPDATE questions SET id = 'qc_q_01_tramway' WHERE id = 'q1_tramway';
UPDATE questions SET id = 'qc_q_02_transports_gratuits' WHERE id = 'q2_transports_gratuits';
UPDATE questions SET id = 'qc_spec_troisieme_lien' WHERE id = 'q3_troisieme_lien';
UPDATE questions SET id = 'qc_q_04_voies_reservees' WHERE id = 'q4_voies_reservees_autobus';
UPDATE questions SET id = 'qc_q_05_logements_abordables' WHERE id = 'q5_quotas_logements_abordables';
UPDATE questions SET id = 'qc_q_06_reduction_depenses' WHERE id = 'q6_reduction_depenses_taxes';
UPDATE questions SET id = 'qc_q_07_terrains_sport' WHERE id = 'q7_terrains_sport';
UPDATE questions SET id = 'qc_q_08_espaces_verts' WHERE id = 'q8_espaces_naturels';
UPDATE questions SET id = 'qc_q_09_participation_citoyenne' WHERE id = 'q9_participation_citoyenne';
UPDATE questions SET id = 'qc_q_10_transition_ecologique' WHERE id = 'q10_transition_ecologique';
UPDATE questions SET id = 'qc_q_11_patrimoine' WHERE id = 'q11_patrimoine_bati';
UPDATE questions SET id = 'qc_q_12_taxes' WHERE id = 'q12_augmentation_taxes';
UPDATE questions SET id = 'qc_q_13_securite' WHERE id = 'q13_securite_publique';
UPDATE questions SET id = 'qc_q_14_compostage' WHERE id = 'q14_compostage';
UPDATE questions SET id = 'qc_q_15_collecte_dechets' WHERE id = 'q15_collecte_dechets';
UPDATE questions SET id = 'qc_q_16_aqueduc' WHERE id = 'q16_aqueduc_entretien';
UPDATE questions SET id = 'qc_q_17_organismes' WHERE id = 'q17_soutien_organismes_communautaires';
UPDATE questions SET id = 'qc_q_18_democratie' WHERE id = 'q18_democratie_participative';
UPDATE questions SET id = 'qc_q_19_deneigement' WHERE id = 'q19_financement_deneigement';
UPDATE questions SET id = 'qc_spec_priorites_actions' WHERE id = 'q20_priorites_actions';
UPDATE questions SET id = 'qc_spec_mode_financement' WHERE id = 'q21_mode_financement';

-- MONTREAL : Format mtl_q_XX et mtl_spec_*
UPDATE questions SET id = 'mtl_q_01_pistes_cyclables' WHERE id = 'mtl_pistes_cyclables';
UPDATE questions SET id = 'mtl_q_02_transports_gratuits' WHERE id = 'mtl_transports_gratuits';
UPDATE questions SET id = 'mtl_spec_rem' WHERE id = 'mtl_metro_rem';
UPDATE questions SET id = 'mtl_q_05_logements_abordables' WHERE id = 'mtl_logements_abordables';
UPDATE questions SET id = 'mtl_q_06_reduction_depenses' WHERE id = 'mtl_reduction_depenses';
UPDATE questions SET id = 'mtl_q_07_terrains_sport' WHERE id = 'mtl_terrains_sport';
UPDATE questions SET id = 'mtl_q_08_espaces_verts' WHERE id = 'mtl_espaces_verts';
UPDATE questions SET id = 'mtl_q_09_participation_citoyenne' WHERE id = 'mtl_participation_citoyenne';
UPDATE questions SET id = 'mtl_q_10_transition_ecologique' WHERE id = 'mtl_carboneutralite';
UPDATE questions SET id = 'mtl_spec_quartiers_culture' WHERE id = 'mtl_quartiers_culturels';
UPDATE questions SET id = 'mtl_q_12_taxes' WHERE id = 'mtl_q12_augmentation_taxes';
UPDATE questions SET id = 'mtl_q_13_securite' WHERE id = 'mtl_securite_publique';
UPDATE questions SET id = 'mtl_q_14_compostage' WHERE id = 'mtl_compostage';
UPDATE questions SET id = 'mtl_spec_gaspillage' WHERE id = 'mtl_zero_gaspillage';
UPDATE questions SET id = 'mtl_q_17_organismes' WHERE id = 'mtl_organismes_communautaires';
UPDATE questions SET id = 'mtl_spec_arrondissements' WHERE id = 'mtl_arrondissements_autonomie';
UPDATE questions SET id = 'mtl_spec_festivals' WHERE id = 'mtl_festivals_equilibre';
UPDATE questions SET id = 'mtl_spec_priorites_actions' WHERE id = 'mtl_priorites_actions';

-- GATINEAU : Format gat_q_XX et gat_spec_*
UPDATE questions SET id = 'gat_q_01_pistes_cyclables' WHERE id = 'gat_q1_pistes_cyclables';
UPDATE questions SET id = 'gat_q_02_transports_gratuits' WHERE id = 'gat_transports_gratuits';
UPDATE questions SET id = 'gat_spec_ottawa' WHERE id = 'gat_q20_coordination_ottawa';
UPDATE questions SET id = 'gat_q_05_logements_abordables' WHERE id = 'gat_q5_logements_abordables';
UPDATE questions SET id = 'gat_q_06_reduction_depenses' WHERE id = 'gat_q6_reduction_depenses_taxes';
UPDATE questions SET id = 'gat_q_07_terrains_sport' WHERE id = 'gat_q7_terrains_sport';
UPDATE questions SET id = 'gat_q_08_espaces_verts' WHERE id = 'gat_q8_espaces_naturels';
UPDATE questions SET id = 'gat_q_09_participation_citoyenne' WHERE id = 'gat_q9_participation_citoyenne';
UPDATE questions SET id = 'gat_q_10_transition_ecologique' WHERE id = 'gat_q10_transition_ecologique';
UPDATE questions SET id = 'gat_spec_patrimoine' WHERE id = 'gat_q11_patrimoine_bati';
UPDATE questions SET id = 'gat_q_12_taxes' WHERE id = 'gat_q10_augmentation_taxes';
UPDATE questions SET id = 'gat_q_13_securite' WHERE id = 'gat_q13_securite_publique';
UPDATE questions SET id = 'gat_q_14_compostage' WHERE id = 'gat_q14_compostage';
UPDATE questions SET id = 'gat_spec_tram' WHERE id = 'gat_tram_gatineau';
UPDATE questions SET id = 'gat_q_17_organismes' WHERE id = 'gat_q17_soutien_organismes_communautaires';
UPDATE questions SET id = 'gat_q_18_democratie' WHERE id = 'gat_q18_democratie_participative';
UPDATE questions SET id = 'gat_spec_bilingue' WHERE id = 'gat_q19_services_bilingues';
UPDATE questions SET id = 'gat_spec_priorites_actions' WHERE id = 'gat_priorites_actions';

-- LAVAL : Format lav_q_XX et lav_spec_*
UPDATE questions SET id = 'lav_q_01_pistes_cyclables' WHERE id = 'lav_pistes_cyclables';
UPDATE questions SET id = 'lav_q_02_transports_gratuits' WHERE id = 'lav_transports_gratuits';
UPDATE questions SET id = 'lav_spec_srb' WHERE id = 'lav_srb_transport_montreal';
UPDATE questions SET id = 'lav_q_04_autobus' WHERE id = 'lav_q4_voies_reservees_autobus';
UPDATE questions SET id = 'lav_q_05_logements_abordables' WHERE id = 'lav_q5_logements_abordables';
UPDATE questions SET id = 'lav_q_06_reduction_depenses' WHERE id = 'lav_q6_reduction_depenses_taxes';
UPDATE questions SET id = 'lav_q_07_terrains_sport' WHERE id = 'lav_q7_terrains_sport';
UPDATE questions SET id = 'lav_spec_espaces_verts' WHERE id = 'lav_equilibre_developpement';
UPDATE questions SET id = 'lav_q_09_participation_citoyenne' WHERE id = 'lav_q9_participation_citoyenne';
UPDATE questions SET id = 'lav_q_10_transition_ecologique' WHERE id = 'lav_q10_transition_carboneutre';
UPDATE questions SET id = 'lav_spec_culture_locale' WHERE id = 'lav_culture_locale';
UPDATE questions SET id = 'lav_q_12_taxes' WHERE id = 'lav_q12_augmentation_taxes';
UPDATE questions SET id = 'lav_q_13_securite' WHERE id = 'lav_q13_securite_publique';
UPDATE questions SET id = 'lav_q_14_compostage' WHERE id = 'lav_q14_compostage';
UPDATE questions SET id = 'lav_spec_zones_industrielles' WHERE id = 'lav_zones_industrielles';
UPDATE questions SET id = 'lav_q_17_organismes' WHERE id = 'lav_q17_soutien_organismes_communautaires';
UPDATE questions SET id = 'lav_spec_priorites_actions' WHERE id = 'lav_priorites_actions';

-- LONGUEUIL (si présent)
UPDATE questions SET id = 'lon_q_01_transport' WHERE id = 'lon_transport_collectif' AND EXISTS (SELECT 1 FROM questions WHERE id = 'lon_transport_collectif');
UPDATE questions SET id = 'lon_q_12_taxes' WHERE id = 'lon_taxes_municipales' AND EXISTS (SELECT 1 FROM questions WHERE id = 'lon_taxes_municipales');

-- LÉVIS (si présent)
UPDATE questions SET id = 'lev_q_01_transport' WHERE id = 'lev_transport_collectif' AND EXISTS (SELECT 1 FROM questions WHERE id = 'lev_transport_collectif');
UPDATE questions SET id = 'lev_q_12_taxes' WHERE id = 'lev_taxes_municipales' AND EXISTS (SELECT 1 FROM questions WHERE id = 'lev_taxes_municipales');

-- =============================================================================
-- ÉTAPE 3 : RESTAURER LES CONTRAINTES FK ORIGINALES (sans ON UPDATE CASCADE)
-- =============================================================================

-- 3.1 party_positions
ALTER TABLE party_positions
DROP CONSTRAINT party_positions_question_id_fkey;

ALTER TABLE party_positions
ADD CONSTRAINT party_positions_question_id_fkey
FOREIGN KEY (question_id) REFERENCES questions(id)
ON DELETE CASCADE;

-- 3.2 user_responses (si existe)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'user_responses_question_id_fkey'
    ) THEN
        ALTER TABLE user_responses
        DROP CONSTRAINT user_responses_question_id_fkey;

        ALTER TABLE user_responses
        ADD CONSTRAINT user_responses_question_id_fkey
        FOREIGN KEY (question_id) REFERENCES questions(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- =============================================================================
-- ÉTAPE 4 : VALIDATION
-- =============================================================================

-- Vérifier le format standardisé
DO $$
DECLARE
    invalid_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO invalid_count
    FROM questions
    WHERE municipality_id IN ('quebec', 'montreal', 'gatineau', 'laval')
    AND id NOT SIMILAR TO '(qc|mtl|gat|lav)_(q|spec)_[0-9a-z_]+';

    IF invalid_count > 0 THEN
        RAISE NOTICE 'Attention: % questions avec format non-standard détectées', invalid_count;
    ELSE
        RAISE NOTICE '✅ Toutes les questions suivent le format standardisé';
    END IF;
END $$;

-- Vérifier l'intégrité référentielle
DO $$
DECLARE
    orphan_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO orphan_count
    FROM party_positions pp
    WHERE NOT EXISTS (
        SELECT 1 FROM questions q WHERE q.id = pp.question_id
    );

    IF orphan_count > 0 THEN
        RAISE EXCEPTION 'Erreur: % références orphelines dans party_positions', orphan_count;
    END IF;

    SELECT COUNT(*) INTO orphan_count
    FROM user_responses ur
    WHERE NOT EXISTS (
        SELECT 1 FROM questions q WHERE q.id = ur.question_id
    );

    IF orphan_count > 0 THEN
        RAISE EXCEPTION 'Erreur: % références orphelines dans user_responses', orphan_count;
    END IF;

    RAISE NOTICE '✅ Intégrité référentielle validée';
END $$;

-- Afficher le résumé
DO $$
DECLARE
    total_renamed INTEGER;
    qc_count INTEGER;
    mtl_count INTEGER;
    gat_count INTEGER;
    lav_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO qc_count FROM questions WHERE id LIKE 'qc_%';
    SELECT COUNT(*) INTO mtl_count FROM questions WHERE id LIKE 'mtl_%';
    SELECT COUNT(*) INTO gat_count FROM questions WHERE id LIKE 'gat_%';
    SELECT COUNT(*) INTO lav_count FROM questions WHERE id LIKE 'lav_%';

    total_renamed := qc_count + mtl_count + gat_count + lav_count;

    RAISE NOTICE '==============================================';
    RAISE NOTICE '✅ MIGRATION TERMINÉE AVEC SUCCÈS';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Questions renommées par municipalité:';
    RAISE NOTICE '  - Quebec: % questions', qc_count;
    RAISE NOTICE '  - Montreal: % questions', mtl_count;
    RAISE NOTICE '  - Gatineau: % questions', gat_count;
    RAISE NOTICE '  - Laval: % questions', lav_count;
    RAISE NOTICE '----------------------------------------------';
    RAISE NOTICE 'TOTAL: % questions standardisées', total_renamed;
    RAISE NOTICE '==============================================';
END $$;

COMMIT;

-- =============================================================================
-- FIN DE LA MIGRATION - FORMAT STANDARDISÉ APPLIQUÉ
-- =============================================================================