-- Migration : Population des données politiques Quebec
-- Date : 2025-09-24
-- Objectif : Migrer la configuration hardcodée vers les colonnes DB
--
-- Cette migration traduit exactement axisConfiguration de political-map-calculator.ts
-- vers les nouvelles colonnes politiques pour garantir des résultats identiques

-- ==============================================================================
-- VALIDATION PRE-MIGRATION
-- ==============================================================================

-- Vérifier que les colonnes politiques existent
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'questions' AND column_name = 'political_axis'
    ) THEN
        RAISE EXCEPTION 'Migration 001 required: political columns not found. Run 001_add_political_columns.sql first.';
    END IF;
END
$$;

-- ==============================================================================
-- MIGRATION QUESTIONS ÉCONOMIQUES QUEBEC
-- ==============================================================================

-- Axe économique : Interventionnisme municipal (gauche) vs Libre marché (droite)
-- Les questions interventionnistes ont score_inversion = true (être d'accord = score négatif)

-- q12_augmentation_taxes (weight: 1.4) - Interventionniste FORT
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.4,
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'qc_q_12_taxes' AND municipality_id = 'quebec';

-- q5_quotas_logements_abordables (weight: 1.3) - Interventionniste
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.3,
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'qc_q_05_logements_abordables' AND municipality_id = 'quebec';

-- q17_soutien_organismes_communautaires (weight: 1.1) - Interventionniste
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.1,
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'qc_q_17_organismes_communautaires' AND municipality_id = 'quebec';

-- q13_pouvoir_conseils_quartier (weight: 0.7) - Interventionniste (AJOUTÉ récemment)
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.7,
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'qc_q_13_pouvoir_quartiers' AND municipality_id = 'quebec';

-- Questions libre marché (score_inversion = false)

-- q6_reduction_depenses_taxes (weight: 1.2) - Libre marché
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'qc_q_06_reduction_depenses' AND municipality_id = 'quebec';

-- q15_avantages_fiscaux_entreprises (weight: 0.9) - Libre marché
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.9,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'qc_q_15_avantages_fiscaux' AND municipality_id = 'quebec';

-- q14_reduction_dette (weight: 0.8) - Libre marché
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.8,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'qc_q_14_reduction_dette' AND municipality_id = 'quebec';

-- ==============================================================================
-- MIGRATION QUESTIONS SOCIALES QUEBEC
-- ==============================================================================

-- Axe social/environnemental : Conservateur (gauche) vs Progressiste (droite)
-- Les questions conservatrices ont score_inversion = true (être d'accord = score négatif)

-- Questions progressistes (score_inversion = false)

-- q1_tramway (weight: 1.5) - Progressiste FORT
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.5,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_01_tramway' AND municipality_id = 'quebec';

-- q2_pistes_cyclables (weight: 1.3) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.3,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_02_pistes_cyclables' AND municipality_id = 'quebec';

-- q8_interdire_essence_centre_ville (weight: 1.2) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_08_interdire_essence' AND municipality_id = 'quebec';

-- q4_priorite_mobilite_active (weight: 1.1) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_04_priorite_mobilite_active' AND municipality_id = 'quebec';

-- q7_immeubles_grande_hauteur (weight: 1.1) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_07_immeubles_hauteur' AND municipality_id = 'quebec';

-- q9_protection_espaces_verts (weight: 1.0) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_09_espaces_verts' AND municipality_id = 'quebec';

-- q10_transition_carboneutre (weight: 1.0) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_10_transition_carbone' AND municipality_id = 'quebec';

-- q20_protection_patrimoine (weight: 0.9) - Progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_20_patrimoine' AND municipality_id = 'quebec';

-- q16_limitation_touristes (weight: 0.7) - Progressiste (AJOUTÉ récemment)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.7,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_16_limitation_touristes' AND municipality_id = 'quebec';

-- q19_investissement_infrastructures_loisirs_sportives (weight: 0.7) - Progressiste (AJOUTÉ récemment)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.7,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'qc_q_19_infrastructures_loisirs' AND municipality_id = 'quebec';

-- Questions conservatrices (score_inversion = true)

-- q3_troisieme_lien (weight: 1.2) - Conservateur
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'qc_spec_troisieme_lien' AND municipality_id = 'quebec';

-- q11_reduction_dechets (weight: 0.9) - Conservateur (priorité service vs environnement)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'qc_q_11_reduction_dechets' AND municipality_id = 'quebec';

-- q18_augmentation_effectifs_policiers (weight: 0.8) - Conservateur
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'qc_q_18_effectifs_policiers' AND municipality_id = 'quebec';

-- ==============================================================================
-- VALIDATION POST-MIGRATION
-- ==============================================================================

-- Compter les questions configurées par axe
DO $$
DECLARE
    economic_count INTEGER;
    social_count INTEGER;
    total_configured INTEGER;
BEGIN
    SELECT COUNT(*) INTO economic_count
    FROM questions
    WHERE municipality_id = 'quebec' AND political_axis = 'economic';

    SELECT COUNT(*) INTO social_count
    FROM questions
    WHERE municipality_id = 'quebec' AND political_axis = 'social';

    SELECT COUNT(*) INTO total_configured
    FROM questions
    WHERE municipality_id = 'quebec' AND political_axis != 'neutral';

    RAISE NOTICE 'Quebec political configuration summary:';
    RAISE NOTICE '  Economic questions: %', economic_count;
    RAISE NOTICE '  Social questions: %', social_count;
    RAISE NOTICE '  Total configured: %', total_configured;

    -- Validation des comptes attendus (basé sur axisConfiguration hardcodé)
    IF economic_count != 7 THEN
        RAISE WARNING 'Expected 7 economic questions, got %', economic_count;
    END IF;

    IF social_count != 10 THEN
        RAISE WARNING 'Expected 10 social questions, got %', social_count;
    END IF;

    IF total_configured < 15 THEN
        RAISE WARNING 'Less than 15 questions configured. Review migration completeness.';
    END IF;

    RAISE NOTICE 'Migration 002_populate_quebec_political_data.sql completed';
END
$$;

-- Afficher un échantillon pour validation manuelle
SELECT
    id,
    CASE
        WHEN political_axis = 'economic' THEN '💰 ECON'
        WHEN political_axis = 'social' THEN '🌍 SOCIAL'
        ELSE '⚪ NEUTRAL'
    END as axis,
    political_weight as weight,
    CASE
        WHEN score_inversion THEN '🔄 INV'
        ELSE '➡️ DIR'
    END as inversion,
    political_interpretation as interpretation
FROM questions
WHERE municipality_id = 'quebec'
    AND political_axis != 'neutral'
ORDER BY political_axis, political_weight DESC;

-- ==============================================================================
-- SCRIPT DE TEST POUR VALIDATION MANUELLE
-- ==============================================================================

/*
-- Test de régression à exécuter après cette migration :
-- 1. Comparer les résultats avant/après pour des réponses test identiques
-- 2. Utiliser la fonction de diagnostic

-- Exemple de test :
SELECT * FROM questions WHERE municipality_id = 'quebec' AND political_axis = 'economic';
SELECT * FROM questions WHERE municipality_id = 'quebec' AND political_axis = 'social';

-- Compter total configuré vs total questions
SELECT
    COUNT(*) FILTER (WHERE political_axis != 'neutral') as configured,
    COUNT(*) as total,
    ROUND(COUNT(*) FILTER (WHERE political_axis != 'neutral') * 100.0 / COUNT(*), 1) as percentage
FROM questions
WHERE municipality_id = 'quebec';
*/