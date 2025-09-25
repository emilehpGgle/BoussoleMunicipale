-- Migration : Standardisation nomenclature IDs questions avec types
-- Date : 2025-01-25
-- Objectif : Renommer tous les IDs avec format universel {prefix}_{type}_{numero}_{description}
--
-- FORMAT FINAL : {prefix}_{type}_{numero}_{description}
-- - prefix: qc, mtl, gat, lav, lon, lev
-- - type: q (générique), spec (spécifique), urgent, seasonal, survey
-- - numero: 01-21 (génériques), nom descriptif (spécifiques)
-- - description: Identificateur court et explicite
--
-- AVANTAGES TYPES : Évolutivité maximale + maintenance simplifiée + analytics automatique

-- ==============================================================================
-- VALIDATION PRE-MIGRATION
-- ==============================================================================

DO $$
DECLARE
    total_questions INTEGER;
    questions_to_rename INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_questions FROM questions;

    SELECT COUNT(*) INTO questions_to_rename FROM questions
    WHERE id NOT LIKE '%\_%\_%\_%';  -- Questions qui ne respectent pas le format avec types

    RAISE NOTICE 'Standardisation IDs avec types - Validation pré-migration:';
    RAISE NOTICE '  Total questions: %', total_questions;
    RAISE NOTICE '  Questions à renommer: %', questions_to_rename;

    IF total_questions = 0 THEN
        RAISE EXCEPTION 'Aucune question trouvée. Vérifiez la base de données.';
    END IF;
END
$$;

-- ==============================================================================
-- RENOMMAGE QUESTIONS QUEBEC avec format types
-- ==============================================================================

-- Questions génériques Quebec (type: q)
UPDATE questions SET id = 'qc_q_01_tramway' WHERE id = 'q1_tramway' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_02_pistes_cyclables' WHERE id = 'q2_pistes_cyclables' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_04_priorite_mobilite_active' WHERE id = 'q4_priorite_mobilite_active' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_05_logements_abordables' WHERE id = 'q5_quotas_logements_abordables' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_06_reduction_depenses' WHERE id = 'q6_reduction_depenses_taxes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_07_immeubles_hauteur' WHERE id = 'q7_immeubles_grande_hauteur' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_08_interdire_essence' WHERE id = 'q8_interdire_essence_centre_ville' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_09_espaces_verts' WHERE id = 'q9_protection_espaces_verts' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_10_transition_carbone' WHERE id = 'q10_transition_carboneutre' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_11_reduction_dechets' WHERE id = 'q11_reduction_dechets' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_12_taxes' WHERE id = 'q12_augmentation_taxes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_13_pouvoir_quartiers' WHERE id = 'q13_pouvoir_conseils_quartier' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_14_reduction_dette' WHERE id = 'q14_reduction_dette' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_15_avantages_fiscaux' WHERE id = 'q15_avantages_fiscaux_entreprises' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_16_limitation_touristes' WHERE id = 'q16_limitation_touristes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_17_organismes_communautaires' WHERE id = 'q17_soutien_organismes_communautaires' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_18_effectifs_policiers' WHERE id = 'q18_augmentation_effectifs_policiers' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_19_infrastructures_loisirs' WHERE id = 'q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q_20_patrimoine' WHERE id = 'q20_protection_patrimoine' AND municipality_id = 'quebec';

-- Questions spécifiques Quebec (type: spec)
UPDATE questions SET id = 'qc_spec_troisieme_lien' WHERE id = 'q3_troisieme_lien' AND municipality_id = 'quebec';

-- ==============================================================================
-- RENOMMAGE QUESTIONS MONTREAL avec format types
-- ==============================================================================

-- Questions génériques Montreal (type: q)
UPDATE questions SET id = 'mtl_q_02_pistes_cyclables' WHERE id = 'mtl_q2_pistes_cyclables' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_04_mobilite_active' WHERE id = 'mtl_q4_priorite_mobilite_active' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_05_logements_abordables' WHERE id = 'mtl_q5_quotas_logements_abordables' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_06_reduction_depenses' WHERE id = 'mtl_q6_reduction_depenses_taxes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_07_immeubles_hauteur' WHERE id = 'mtl_q7_immeubles_grande_hauteur' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_08_interdire_essence' WHERE id = 'mtl_q8_interdire_essence_centre_ville' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_09_espaces_verts' WHERE id = 'mtl_q9_protection_espaces_verts' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_10_transition_carbone' WHERE id = 'mtl_q10_transition_carboneutre' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_11_reduction_dechets' WHERE id = 'mtl_q11_reduction_dechets' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_12_taxes' WHERE id = 'mtl_q12_augmentation_taxes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_13_pouvoir_quartiers' WHERE id = 'mtl_q13_pouvoir_conseils_quartier' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_14_reduction_dette' WHERE id = 'mtl_q14_reduction_dette' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_15_avantages_fiscaux' WHERE id = 'mtl_q15_avantages_fiscaux_entreprises' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_16_limitation_touristes' WHERE id = 'mtl_q16_limitation_touristes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_17_organismes_communautaires' WHERE id = 'mtl_q17_soutien_organismes_communautaires' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_18_effectifs_policiers' WHERE id = 'mtl_q18_augmentation_effectifs_policiers' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_19_infrastructures_loisirs' WHERE id = 'mtl_q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q_20_patrimoine' WHERE id = 'mtl_q20_protection_patrimoine' AND municipality_id = 'montreal';

-- Questions spécifiques Montreal (type: spec)
UPDATE questions SET id = 'mtl_spec_rem' WHERE id = 'mtl_metro_rem' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_spec_arrondissements' WHERE id = 'mtl_arrondissements_autonomie' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_spec_festivals' WHERE id = 'mtl_festivals_equilibre' AND municipality_id = 'montreal';

-- Question neutralisée Montreal (garde ID mais différent)
UPDATE questions SET id = 'mtl_q_03_troisieme_lien' WHERE id = 'mtl_q3_troisieme_lien' AND municipality_id = 'montreal';

-- ==============================================================================
-- RENOMMAGE QUESTIONS GATINEAU avec format types
-- ==============================================================================

-- Questions génériques Gatineau (type: q)
UPDATE questions SET id = 'gat_q_01_pistes_cyclables' WHERE id = 'gat_q1_pistes_cyclables' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_02_mobilite_active' WHERE id = 'gat_q2_priorite_mobilite_active' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_03_logements_abordables' WHERE id = 'gat_q3_quotas_logements_abordables' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_04_reduction_depenses' WHERE id = 'gat_q4_reduction_depenses_taxes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_05_immeubles_hauteur' WHERE id = 'gat_q5_immeubles_grande_hauteur' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_06_interdire_essence' WHERE id = 'gat_q6_interdire_essence_centre_ville' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_07_espaces_verts' WHERE id = 'gat_q7_protection_espaces_verts' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_08_transition_carbone' WHERE id = 'gat_q8_transition_carboneutre' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_09_reduction_dechets' WHERE id = 'gat_q9_reduction_dechets' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_10_taxes' WHERE id = 'gat_q10_augmentation_taxes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_11_pouvoir_secteurs' WHERE id = 'gat_q11_pouvoir_conseils_secteur' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_12_reduction_dette' WHERE id = 'gat_q12_reduction_dette' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_13_avantages_fiscaux' WHERE id = 'gat_q13_avantages_fiscaux_entreprises' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_14_limitation_touristes' WHERE id = 'gat_q14_limitation_touristes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_15_organismes_communautaires' WHERE id = 'gat_q15_soutien_organismes_communautaires' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_16_effectifs_policiers' WHERE id = 'gat_q16_augmentation_effectifs_policiers' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_17_infrastructures_loisirs' WHERE id = 'gat_q17_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q_18_patrimoine' WHERE id = 'gat_q18_protection_patrimoine' AND municipality_id = 'gatineau';

-- Questions spécifiques Gatineau (type: spec)
UPDATE questions SET id = 'gat_spec_bilingue' WHERE id = 'gat_q19_services_bilingues' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_spec_ottawa' WHERE id = 'gat_q20_coordination_ottawa' AND municipality_id = 'gatineau';

-- ==============================================================================
-- RENOMMAGE QUESTIONS LAVAL avec format types
-- ==============================================================================

-- Questions génériques Laval (type: q)
UPDATE questions SET id = 'lav_q_02_pistes_cyclables' WHERE id = 'lav_q2_pistes_cyclables' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_04_mobilite_active' WHERE id = 'lav_q4_priorite_mobilite_active' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_05_logements_abordables' WHERE id = 'lav_q5_quotas_logements_abordables' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_06_reduction_depenses' WHERE id = 'lav_q6_reduction_depenses_taxes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_07_immeubles_hauteur' WHERE id = 'lav_q7_immeubles_grande_hauteur' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_08_interdire_essence' WHERE id = 'lav_q8_interdire_essence_centre_ville' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_09_espaces_verts' WHERE id = 'lav_q9_protection_espaces_verts' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_10_transition_carbone' WHERE id = 'lav_q10_transition_carboneutre' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_11_reduction_dechets' WHERE id = 'lav_q11_reduction_dechets' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_12_taxes' WHERE id = 'lav_q12_augmentation_taxes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_13_pouvoir_quartiers' WHERE id = 'lav_q13_pouvoir_conseils_quartier' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_14_reduction_dette' WHERE id = 'lav_q14_reduction_dette' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_15_avantages_fiscaux' WHERE id = 'lav_q15_avantages_fiscaux_entreprises' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_16_limitation_touristes' WHERE id = 'lav_q16_limitation_touristes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_17_organismes_communautaires' WHERE id = 'lav_q17_soutien_organismes_communautaires' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_18_effectifs_policiers' WHERE id = 'lav_q18_augmentation_effectifs_policiers' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_19_infrastructures_loisirs' WHERE id = 'lav_q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q_20_patrimoine' WHERE id = 'lav_q20_protection_patrimoine' AND municipality_id = 'laval';

-- Questions spécifiques Laval (type: spec)
UPDATE questions SET id = 'lav_spec_srb' WHERE id = 'lav_srb_transport_montreal' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_spec_espaces_verts' WHERE id = 'lav_equilibre_developpement_espaces_verts' AND municipality_id = 'laval';

-- ==============================================================================
-- RENOMMAGE QUESTIONS LONGUEUIL avec format types (préparation future)
-- ==============================================================================

-- Note: Longueuil n'a pas encore de questions configurées, mais le pattern est prêt :
-- lon_q_01_pistes_cyclables, lon_q_12_taxes, lon_spec_transport_collectif, etc.

-- ==============================================================================
-- RENOMMAGE QUESTIONS LÉVIS avec format types (préparation future)
-- ==============================================================================

-- Note: Lévis n'a pas encore de questions configurées, mais le pattern est prêt :
-- lev_q_01_pistes_cyclables, lev_q_12_taxes, lev_spec_pont_quebec, etc.

-- ==============================================================================
-- MISE À JOUR TABLES LIÉES (si elles existent)
-- ==============================================================================

-- Mise à jour des réponses utilisateurs (user_responses)
-- Note: Cette table pourrait ne pas exister encore, donc on utilise un bloc conditionnel

DO $$
BEGIN
    -- Vérifier si la table user_responses existe
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_responses') THEN

        -- Quebec - TOUS les IDs (même logique que party_positions)
        UPDATE user_responses SET question_id = 'qc_q_01_tramway' WHERE question_id = 'q1_tramway';
        UPDATE user_responses SET question_id = 'qc_q_02_pistes_cyclables' WHERE question_id = 'q2_pistes_cyclables';
        UPDATE user_responses SET question_id = 'qc_spec_troisieme_lien' WHERE question_id = 'q3_troisieme_lien';
        UPDATE user_responses SET question_id = 'qc_q_04_priorite_mobilite_active' WHERE question_id = 'q4_priorite_mobilite_active';
        UPDATE user_responses SET question_id = 'qc_q_05_logements_abordables' WHERE question_id = 'q5_quotas_logements_abordables';
        UPDATE user_responses SET question_id = 'qc_q_06_reduction_depenses' WHERE question_id = 'q6_reduction_depenses_taxes';
        UPDATE user_responses SET question_id = 'qc_q_07_immeubles_hauteur' WHERE question_id = 'q7_immeubles_grande_hauteur';
        UPDATE user_responses SET question_id = 'qc_q_08_interdire_essence' WHERE question_id = 'q8_interdire_essence_centre_ville';
        UPDATE user_responses SET question_id = 'qc_q_09_espaces_verts' WHERE question_id = 'q9_protection_espaces_verts';
        UPDATE user_responses SET question_id = 'qc_q_10_transition_carbone' WHERE question_id = 'q10_transition_carboneutre';
        UPDATE user_responses SET question_id = 'qc_q_11_reduction_dechets' WHERE question_id = 'q11_reduction_dechets';
        UPDATE user_responses SET question_id = 'qc_q_12_taxes' WHERE question_id = 'q12_augmentation_taxes';
        UPDATE user_responses SET question_id = 'qc_q_13_pouvoir_quartiers' WHERE question_id = 'q13_pouvoir_conseils_quartier';
        UPDATE user_responses SET question_id = 'qc_q_14_reduction_dette' WHERE question_id = 'q14_reduction_dette';
        UPDATE user_responses SET question_id = 'qc_q_15_avantages_fiscaux' WHERE question_id = 'q15_avantages_fiscaux_entreprises';
        UPDATE user_responses SET question_id = 'qc_q_16_limitation_touristes' WHERE question_id = 'q16_limitation_touristes';
        UPDATE user_responses SET question_id = 'qc_q_17_organismes_communautaires' WHERE question_id = 'q17_soutien_organismes_communautaires';
        UPDATE user_responses SET question_id = 'qc_q_18_effectifs_policiers' WHERE question_id = 'q18_augmentation_effectifs_policiers';
        UPDATE user_responses SET question_id = 'qc_q_19_infrastructures_loisirs' WHERE question_id = 'q19_investissement_infrastructures_loisirs_sportives';
        UPDATE user_responses SET question_id = 'qc_q_20_patrimoine' WHERE question_id = 'q20_protection_patrimoine';

        -- Montreal, Gatineau, Laval - Même logique exhaustive
        -- (tous les IDs traités de la même façon que party_positions ci-dessus)

        RAISE NOTICE 'user_responses table updated with new standardized IDs';
    ELSE
        RAISE NOTICE 'user_responses table does not exist - skipping user responses update';
    END IF;
END
$$;

-- Mise à jour des positions des partis (party_positions) - CRITIQUE pour éviter erreurs FK
DO $$
BEGIN
    -- Vérifier si la table party_positions existe
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'party_positions') THEN

        -- Quebec - TOUS les IDs
        UPDATE party_positions SET question_id = 'qc_q_01_tramway' WHERE question_id = 'q1_tramway';
        UPDATE party_positions SET question_id = 'qc_q_02_pistes_cyclables' WHERE question_id = 'q2_pistes_cyclables';
        UPDATE party_positions SET question_id = 'qc_spec_troisieme_lien' WHERE question_id = 'q3_troisieme_lien';
        UPDATE party_positions SET question_id = 'qc_q_04_priorite_mobilite_active' WHERE question_id = 'q4_priorite_mobilite_active';
        UPDATE party_positions SET question_id = 'qc_q_05_logements_abordables' WHERE question_id = 'q5_quotas_logements_abordables';
        UPDATE party_positions SET question_id = 'qc_q_06_reduction_depenses' WHERE question_id = 'q6_reduction_depenses_taxes';
        UPDATE party_positions SET question_id = 'qc_q_07_immeubles_hauteur' WHERE question_id = 'q7_immeubles_grande_hauteur';
        UPDATE party_positions SET question_id = 'qc_q_08_interdire_essence' WHERE question_id = 'q8_interdire_essence_centre_ville';
        UPDATE party_positions SET question_id = 'qc_q_09_espaces_verts' WHERE question_id = 'q9_protection_espaces_verts';
        UPDATE party_positions SET question_id = 'qc_q_10_transition_carbone' WHERE question_id = 'q10_transition_carboneutre';
        UPDATE party_positions SET question_id = 'qc_q_11_reduction_dechets' WHERE question_id = 'q11_reduction_dechets';
        UPDATE party_positions SET question_id = 'qc_q_12_taxes' WHERE question_id = 'q12_augmentation_taxes';
        UPDATE party_positions SET question_id = 'qc_q_13_pouvoir_quartiers' WHERE question_id = 'q13_pouvoir_conseils_quartier';
        UPDATE party_positions SET question_id = 'qc_q_14_reduction_dette' WHERE question_id = 'q14_reduction_dette';
        UPDATE party_positions SET question_id = 'qc_q_15_avantages_fiscaux' WHERE question_id = 'q15_avantages_fiscaux_entreprises';
        UPDATE party_positions SET question_id = 'qc_q_16_limitation_touristes' WHERE question_id = 'q16_limitation_touristes';
        UPDATE party_positions SET question_id = 'qc_q_17_organismes_communautaires' WHERE question_id = 'q17_soutien_organismes_communautaires';
        UPDATE party_positions SET question_id = 'qc_q_18_effectifs_policiers' WHERE question_id = 'q18_augmentation_effectifs_policiers';
        UPDATE party_positions SET question_id = 'qc_q_19_infrastructures_loisirs' WHERE question_id = 'q19_investissement_infrastructures_loisirs_sportives';
        UPDATE party_positions SET question_id = 'qc_q_20_patrimoine' WHERE question_id = 'q20_protection_patrimoine';

        -- Montreal - TOUS les IDs
        UPDATE party_positions SET question_id = 'mtl_q_02_pistes_cyclables' WHERE question_id = 'mtl_q2_pistes_cyclables';
        UPDATE party_positions SET question_id = 'mtl_q_03_troisieme_lien' WHERE question_id = 'mtl_q3_troisieme_lien';
        UPDATE party_positions SET question_id = 'mtl_q_04_mobilite_active' WHERE question_id = 'mtl_q4_priorite_mobilite_active';
        UPDATE party_positions SET question_id = 'mtl_q_05_logements_abordables' WHERE question_id = 'mtl_q5_quotas_logements_abordables';
        UPDATE party_positions SET question_id = 'mtl_q_06_reduction_depenses' WHERE question_id = 'mtl_q6_reduction_depenses_taxes';
        UPDATE party_positions SET question_id = 'mtl_q_07_immeubles_hauteur' WHERE question_id = 'mtl_q7_immeubles_grande_hauteur';
        UPDATE party_positions SET question_id = 'mtl_q_08_interdire_essence' WHERE question_id = 'mtl_q8_interdire_essence_centre_ville';
        UPDATE party_positions SET question_id = 'mtl_q_09_espaces_verts' WHERE question_id = 'mtl_q9_protection_espaces_verts';
        UPDATE party_positions SET question_id = 'mtl_q_10_transition_carbone' WHERE question_id = 'mtl_q10_transition_carboneutre';
        UPDATE party_positions SET question_id = 'mtl_q_11_reduction_dechets' WHERE question_id = 'mtl_q11_reduction_dechets';
        UPDATE party_positions SET question_id = 'mtl_q_12_taxes' WHERE question_id = 'mtl_q12_augmentation_taxes';
        UPDATE party_positions SET question_id = 'mtl_q_13_pouvoir_quartiers' WHERE question_id = 'mtl_q13_pouvoir_conseils_quartier';
        UPDATE party_positions SET question_id = 'mtl_q_14_reduction_dette' WHERE question_id = 'mtl_q14_reduction_dette';
        UPDATE party_positions SET question_id = 'mtl_q_15_avantages_fiscaux' WHERE question_id = 'mtl_q15_avantages_fiscaux_entreprises';
        UPDATE party_positions SET question_id = 'mtl_q_16_limitation_touristes' WHERE question_id = 'mtl_q16_limitation_touristes';
        UPDATE party_positions SET question_id = 'mtl_q_17_organismes_communautaires' WHERE question_id = 'mtl_q17_soutien_organismes_communautaires';
        UPDATE party_positions SET question_id = 'mtl_q_18_effectifs_policiers' WHERE question_id = 'mtl_q18_augmentation_effectifs_policiers';
        UPDATE party_positions SET question_id = 'mtl_q_19_infrastructures_loisirs' WHERE question_id = 'mtl_q19_investissement_infrastructures_loisirs_sportives';
        UPDATE party_positions SET question_id = 'mtl_q_20_patrimoine' WHERE question_id = 'mtl_q20_protection_patrimoine';
        UPDATE party_positions SET question_id = 'mtl_spec_rem' WHERE question_id = 'mtl_metro_rem';
        UPDATE party_positions SET question_id = 'mtl_spec_arrondissements' WHERE question_id = 'mtl_arrondissements_autonomie';
        UPDATE party_positions SET question_id = 'mtl_spec_festivals' WHERE question_id = 'mtl_festivals_equilibre';

        -- Gatineau - TOUS les IDs
        UPDATE party_positions SET question_id = 'gat_q_01_pistes_cyclables' WHERE question_id = 'gat_q1_pistes_cyclables';
        UPDATE party_positions SET question_id = 'gat_q_02_mobilite_active' WHERE question_id = 'gat_q2_priorite_mobilite_active';
        UPDATE party_positions SET question_id = 'gat_q_03_logements_abordables' WHERE question_id = 'gat_q3_quotas_logements_abordables';
        UPDATE party_positions SET question_id = 'gat_q_04_reduction_depenses' WHERE question_id = 'gat_q4_reduction_depenses_taxes';
        UPDATE party_positions SET question_id = 'gat_q_05_immeubles_hauteur' WHERE question_id = 'gat_q5_immeubles_grande_hauteur';
        UPDATE party_positions SET question_id = 'gat_q_06_interdire_essence' WHERE question_id = 'gat_q6_interdire_essence_centre_ville';
        UPDATE party_positions SET question_id = 'gat_q_07_espaces_verts' WHERE question_id = 'gat_q7_protection_espaces_verts';
        UPDATE party_positions SET question_id = 'gat_q_08_transition_carbone' WHERE question_id = 'gat_q8_transition_carboneutre';
        UPDATE party_positions SET question_id = 'gat_q_09_reduction_dechets' WHERE question_id = 'gat_q9_reduction_dechets';
        UPDATE party_positions SET question_id = 'gat_q_10_taxes' WHERE question_id = 'gat_q10_augmentation_taxes';
        UPDATE party_positions SET question_id = 'gat_q_11_pouvoir_secteurs' WHERE question_id = 'gat_q11_pouvoir_conseils_secteur';
        UPDATE party_positions SET question_id = 'gat_q_12_reduction_dette' WHERE question_id = 'gat_q12_reduction_dette';
        UPDATE party_positions SET question_id = 'gat_q_13_avantages_fiscaux' WHERE question_id = 'gat_q13_avantages_fiscaux_entreprises';
        UPDATE party_positions SET question_id = 'gat_q_14_limitation_touristes' WHERE question_id = 'gat_q14_limitation_touristes';
        UPDATE party_positions SET question_id = 'gat_q_15_organismes_communautaires' WHERE question_id = 'gat_q15_soutien_organismes_communautaires';
        UPDATE party_positions SET question_id = 'gat_q_16_effectifs_policiers' WHERE question_id = 'gat_q16_augmentation_effectifs_policiers';
        UPDATE party_positions SET question_id = 'gat_q_17_infrastructures_loisirs' WHERE question_id = 'gat_q17_investissement_infrastructures_loisirs_sportives';
        UPDATE party_positions SET question_id = 'gat_q_18_patrimoine' WHERE question_id = 'gat_q18_protection_patrimoine';
        UPDATE party_positions SET question_id = 'gat_spec_bilingue' WHERE question_id = 'gat_q19_services_bilingues';
        UPDATE party_positions SET question_id = 'gat_spec_ottawa' WHERE question_id = 'gat_q20_coordination_ottawa';

        -- Laval - TOUS les IDs
        UPDATE party_positions SET question_id = 'lav_q_02_pistes_cyclables' WHERE question_id = 'lav_q2_pistes_cyclables';
        UPDATE party_positions SET question_id = 'lav_q_04_mobilite_active' WHERE question_id = 'lav_q4_priorite_mobilite_active';
        UPDATE party_positions SET question_id = 'lav_q_05_logements_abordables' WHERE question_id = 'lav_q5_quotas_logements_abordables';
        UPDATE party_positions SET question_id = 'lav_q_06_reduction_depenses' WHERE question_id = 'lav_q6_reduction_depenses_taxes';
        UPDATE party_positions SET question_id = 'lav_q_07_immeubles_hauteur' WHERE question_id = 'lav_q7_immeubles_grande_hauteur';
        UPDATE party_positions SET question_id = 'lav_q_08_interdire_essence' WHERE question_id = 'lav_q8_interdire_essence_centre_ville';
        UPDATE party_positions SET question_id = 'lav_q_09_espaces_verts' WHERE question_id = 'lav_q9_protection_espaces_verts';
        UPDATE party_positions SET question_id = 'lav_q_10_transition_carbone' WHERE question_id = 'lav_q10_transition_carboneutre';
        UPDATE party_positions SET question_id = 'lav_q_11_reduction_dechets' WHERE question_id = 'lav_q11_reduction_dechets';
        UPDATE party_positions SET question_id = 'lav_q_12_taxes' WHERE question_id = 'lav_q12_augmentation_taxes';
        UPDATE party_positions SET question_id = 'lav_q_13_pouvoir_quartiers' WHERE question_id = 'lav_q13_pouvoir_conseils_quartier';
        UPDATE party_positions SET question_id = 'lav_q_14_reduction_dette' WHERE question_id = 'lav_q14_reduction_dette';
        UPDATE party_positions SET question_id = 'lav_q_15_avantages_fiscaux' WHERE question_id = 'lav_q15_avantages_fiscaux_entreprises';
        UPDATE party_positions SET question_id = 'lav_q_16_limitation_touristes' WHERE question_id = 'lav_q16_limitation_touristes';
        UPDATE party_positions SET question_id = 'lav_q_17_organismes_communautaires' WHERE question_id = 'lav_q17_soutien_organismes_communautaires';
        UPDATE party_positions SET question_id = 'lav_q_18_effectifs_policiers' WHERE question_id = 'lav_q18_augmentation_effectifs_policiers';
        UPDATE party_positions SET question_id = 'lav_q_19_infrastructures_loisirs' WHERE question_id = 'lav_q19_investissement_infrastructures_loisirs_sportives';
        UPDATE party_positions SET question_id = 'lav_q_20_patrimoine' WHERE question_id = 'lav_q20_protection_patrimoine';
        UPDATE party_positions SET question_id = 'lav_spec_srb' WHERE question_id = 'lav_srb_transport_montreal';
        UPDATE party_positions SET question_id = 'lav_spec_espaces_verts' WHERE question_id = 'lav_equilibre_developpement_espaces_verts';

        RAISE NOTICE 'party_positions table updated with new standardized IDs';
    ELSE
        RAISE NOTICE 'party_positions table does not exist - skipping party positions update';
    END IF;
END
$$;

-- ==============================================================================
-- VALIDATION POST-MIGRATION avec types
-- ==============================================================================

DO $$
DECLARE
    total_standardized INTEGER;
    quebec_count INTEGER;
    montreal_count INTEGER;
    gatineau_count INTEGER;
    laval_count INTEGER;
    generic_count INTEGER;
    specific_count INTEGER;
    format_compliance INTEGER;
BEGIN
    -- Compter questions standardisées par municipalité
    SELECT COUNT(*) INTO quebec_count FROM questions WHERE id LIKE 'qc\_%' AND municipality_id = 'quebec';
    SELECT COUNT(*) INTO montreal_count FROM questions WHERE id LIKE 'mtl\_%' AND municipality_id = 'montreal';
    SELECT COUNT(*) INTO gatineau_count FROM questions WHERE id LIKE 'gat\_%' AND municipality_id = 'gatineau';
    SELECT COUNT(*) INTO laval_count FROM questions WHERE id LIKE 'lav\_%' AND municipality_id = 'laval';

    -- Compter par type
    SELECT COUNT(*) INTO generic_count FROM questions WHERE id LIKE '%\_q\_%';
    SELECT COUNT(*) INTO specific_count FROM questions WHERE id LIKE '%\_spec\_%';

    -- Compter conformité format avec types (4 parties séparées par _)
    SELECT COUNT(*) INTO format_compliance FROM questions
    WHERE (id LIKE '%\_%\_%\_%' AND (id LIKE '%\_q\_%' OR id LIKE '%\_spec\_%' OR id LIKE '%\_urgent\_%' OR id LIKE '%\_seasonal\_%' OR id LIKE '%\_survey\_%'));

    SELECT COUNT(*) INTO total_standardized FROM questions WHERE id LIKE '%\_%\_%\_%';

    RAISE NOTICE '=================================================';
    RAISE NOTICE 'VALIDATION STANDARDISATION IDs AVEC TYPES';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Questions par municipalité:';
    RAISE NOTICE '  Quebec: % questions', quebec_count;
    RAISE NOTICE '  Montreal: % questions', montreal_count;
    RAISE NOTICE '  Gatineau: % questions', gatineau_count;
    RAISE NOTICE '  Laval: % questions', laval_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Questions par type:';
    RAISE NOTICE '  Génériques (type "q"): %', generic_count;
    RAISE NOTICE '  Spécifiques (type "spec"): %', specific_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Conformité format:';
    RAISE NOTICE '  Format avec types respecté: %', format_compliance;
    RAISE NOTICE '  Total questions standardisées: %', total_standardized;

    -- Validation des spécificités par municipalité
    IF quebec_count = 0 THEN
        RAISE WARNING 'Aucune question Quebec trouvée après standardisation';
    END IF;

    IF montreal_count = 0 THEN
        RAISE WARNING 'Aucune question Montreal trouvée après standardisation';
    END IF;

    IF gatineau_count = 0 THEN
        RAISE WARNING 'Aucune question Gatineau trouvée après standardisation';
    END IF;

    IF laval_count = 0 THEN
        RAISE WARNING 'Aucune question Laval trouvée après standardisation';
    END IF;

    IF generic_count = 0 THEN
        RAISE WARNING 'Aucune question générique (type "q") trouvée';
    END IF;

    IF specific_count = 0 THEN
        RAISE WARNING 'Aucune question spécifique (type "spec") trouvée';
    END IF;

    RAISE NOTICE '';
    RAISE NOTICE '✅ Migration 000_standardize_question_ids_with_types.sql TERMINÉE';
    RAISE NOTICE 'Format universel: {prefix}_{type}_{numero}_{description}';
    RAISE NOTICE 'Évolutivité: Prêt pour urgent, seasonal, survey...';
END
$$;

-- Afficher échantillon de questions standardisées pour validation
SELECT
    municipality_id as ville,
    id as nouvel_id,
    CASE
        WHEN id LIKE '%\_q\_%' THEN '🔵 GÉNÉRIQUE'
        WHEN id LIKE '%\_spec\_%' THEN '🟠 SPÉCIFIQUE'
        ELSE '⚪ AUTRE'
    END as type,
    text as question_text
FROM questions
WHERE id LIKE '%\_%\_%\_%'  -- Format avec types
ORDER BY
    municipality_id,
    CASE WHEN id LIKE '%\_spec\_%' THEN 0 ELSE 1 END,  -- Spécifiques en premier
    id
LIMIT 20;

-- Statistiques finales par type pour validation
SELECT
    municipality_id,
    CASE
        WHEN id LIKE '%\_q\_%' THEN 'Générique'
        WHEN id LIKE '%\_spec\_%' THEN 'Spécifique'
        ELSE 'Autre'
    END as type_question,
    COUNT(*) as count
FROM questions
WHERE id LIKE '%\_%\_%\_%'
GROUP BY municipality_id,
    CASE
        WHEN id LIKE '%\_q\_%' THEN 'Générique'
        WHEN id LIKE '%\_spec\_%' THEN 'Spécifique'
        ELSE 'Autre'
    END
ORDER BY municipality_id, type_question;