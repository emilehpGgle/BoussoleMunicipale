-- Migration : Population des données politiques Montreal
-- Date : 2025-09-24
-- Objectif : Configurer les paramètres politiques pour Montreal
--
-- Montreal a des spécificités urbaines : REM/métro (transport), autonomie arrondissements,
-- équilibre festivals. Configuration adaptée au contexte métropolitain.

-- ==============================================================================
-- VALIDATION PRE-MIGRATION
-- ==============================================================================

-- Vérifier que Quebec est déjà configuré (référence pour cohérence)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM questions
        WHERE municipality_id = 'quebec' AND political_axis != 'neutral'
        LIMIT 1
    ) THEN
        RAISE EXCEPTION 'Quebec political data required. Run 002_populate_quebec_political_data.sql first.';
    END IF;
END
$$;

-- ==============================================================================
-- QUESTIONS SPÉCIFIQUES MONTREAL (haute priorité politique)
-- ==============================================================================

-- mtl_metro_rem - REM et transport métropolitain (TRÈS PROGRESSISTE, poids élevé)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.8,  -- Plus élevé que tramway Quebec (1.5) - enjeu majeur MTL
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_spec_rem' AND municipality_id = 'montreal';

-- mtl_arrondissements_autonomie - Décentralisation municipale (ÉCONOMIQUE)
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.3,  -- Décentralisation vs centralisation
    political_interpretation = 'decentralization',
    score_inversion = false
WHERE id = 'mtl_spec_arrondissements' AND municipality_id = 'montreal';

-- mtl_festivals_equilibre - Équilibre festivals vs résidents (SOCIAL PROGRESSISTE)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,  -- Enjeu culturel/qualité de vie
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_spec_festivals' AND municipality_id = 'montreal';

-- ==============================================================================
-- QUESTIONS ÉCONOMIQUES MONTREAL (basées sur Quebec avec ajustements urbains)
-- ==============================================================================

-- Questions interventionnistes (score_inversion = true)

-- mtl_q12_augmentation_taxes - Plus sensible en contexte urbain
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.5,  -- 1.4 → 1.5 (plus sensible MTL)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'mtl_q_12_taxes' AND municipality_id = 'montreal';

-- mtl_q5_quotas_logements_abordables - ENJEU MAJEUR à Montreal
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.6,  -- 1.3 → 1.6 (crise du logement MTL)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'mtl_q_05_logements_abordables' AND municipality_id = 'montreal';

-- mtl_q17_soutien_organismes_communautaires - Important en milieu urbain
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,  -- 1.1 → 1.2 (plus important MTL)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'mtl_q_17_organismes_communautaires' AND municipality_id = 'montreal';

-- mtl_q13_pouvoir_conseils_quartier - Lié à l'autonomie arrondissements
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.8,  -- 0.7 → 0.8 (plus pertinent MTL)
    political_interpretation = 'decentralization',
    score_inversion = false  -- Décentralisation = score positif
WHERE id = 'mtl_q_13_pouvoir_quartiers' AND municipality_id = 'montreal';

-- Questions libre marché (score_inversion = false)

-- mtl_q6_reduction_depenses_taxes - Standard
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'mtl_q_06_reduction_depenses' AND municipality_id = 'montreal';

-- mtl_q15_avantages_fiscaux_entreprises - Important pour économie MTL
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.0,  -- 0.9 → 1.0 (plus important MTL)
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'mtl_q_15_avantages_fiscaux' AND municipality_id = 'montreal';

-- mtl_q14_reduction_dette - Standard
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.8,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'mtl_q_14_reduction_dette' AND municipality_id = 'montreal';

-- ==============================================================================
-- QUESTIONS SOCIALES MONTREAL (contexte urbain dense)
-- ==============================================================================

-- Questions progressistes (score_inversion = false)

-- mtl_q2_pistes_cyclables - TRÈS important en ville
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.4,  -- 1.3 → 1.4 (plus crucial MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_02_pistes_cyclables' AND municipality_id = 'montreal';

-- mtl_q8_interdire_essence_centre_ville - ENJEU MAJEUR urbain
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.5,  -- 1.2 → 1.5 (très pertinent centre-ville MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_08_interdire_essence' AND municipality_id = 'montreal';

-- mtl_q4_priorite_mobilite_active - Crucial pour MTL
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.3,  -- 1.1 → 1.3 (plus important MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_04_mobilite_active' AND municipality_id = 'montreal';

-- mtl_q7_immeubles_grande_hauteur - SPÉCIFIQUE urbain
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.4,  -- 1.1 → 1.4 (enjeu majeur densification MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_07_immeubles_hauteur' AND municipality_id = 'montreal';

-- mtl_q10_transition_carboneutre - Standard progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,  -- 1.0 → 1.1 (plus ambitieux MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_10_transition_carbone' AND municipality_id = 'montreal';

-- mtl_q9_protection_espaces_verts - Important mais compétition urbaine
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,  -- 1.0 → 1.2 (plus rare donc précieux MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_09_espaces_verts' AND municipality_id = 'montreal';

-- mtl_q20_protection_patrimoine - Important identité MTL
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,  -- 0.9 → 1.1 (plus important MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_20_patrimoine' AND municipality_id = 'montreal';

-- mtl_q16_limitation_touristes - Pertinent pour MTL touristique
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- 0.7 → 0.9 (plus pertinent MTL)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_16_limitation_touristes' AND municipality_id = 'montreal';

-- mtl_q19_investissement_infrastructures_loisirs_sportives - Standard
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,  -- 0.7 → 0.8
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'mtl_q_19_infrastructures_loisirs' AND municipality_id = 'montreal';

-- Questions conservatrices (score_inversion = true)

-- mtl_q3_troisieme_lien - N/A pour Montreal (pas de 3e lien), mais question peut exister
UPDATE questions SET
    political_axis = 'neutral',  -- Neutraliser cette question pour Montreal
    political_weight = 0.0,
    political_interpretation = 'neutral',
    score_inversion = false
WHERE id = 'mtl_q_03_troisieme_lien' AND municipality_id = 'montreal';

-- mtl_q11_reduction_dechets - Service vs environnement (conservateur)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,  -- 0.9 → 0.8 (moins priorité MTL)
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'mtl_q_11_reduction_dechets' AND municipality_id = 'montreal';

-- mtl_q18_augmentation_effectifs_policiers - Sécurité urbaine (conservateur)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,  -- 0.8 → 1.0 (plus pertinent contexte urbain)
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'mtl_q_18_effectifs_policiers' AND municipality_id = 'montreal';

-- ==============================================================================
-- VALIDATION POST-MIGRATION MONTREAL
-- ==============================================================================

DO $$
DECLARE
    economic_count INTEGER;
    social_count INTEGER;
    specific_count INTEGER;
    total_configured INTEGER;
BEGIN
    SELECT COUNT(*) INTO economic_count
    FROM questions
    WHERE municipality_id = 'montreal' AND political_axis = 'economic';

    SELECT COUNT(*) INTO social_count
    FROM questions
    WHERE municipality_id = 'montreal' AND political_axis = 'social';

    SELECT COUNT(*) INTO specific_count
    FROM questions
    WHERE municipality_id = 'montreal'
      AND id IN ('mtl_metro_rem', 'mtl_arrondissements_autonomie', 'mtl_festivals_equilibre')
      AND political_axis != 'neutral';

    SELECT COUNT(*) INTO total_configured
    FROM questions
    WHERE municipality_id = 'montreal' AND political_axis != 'neutral';

    RAISE NOTICE 'Montreal political configuration summary:';
    RAISE NOTICE '  Economic questions: %', economic_count;
    RAISE NOTICE '  Social questions: %', social_count;
    RAISE NOTICE '  Specific Montreal questions: %', specific_count;
    RAISE NOTICE '  Total configured: %', total_configured;

    -- Validation des spécificités Montreal
    IF specific_count < 3 THEN
        RAISE WARNING 'Missing Montreal-specific questions configuration';
    END IF;

    IF total_configured < 18 THEN
        RAISE WARNING 'Less than 18 questions configured for Montreal. Review completeness.';
    END IF;

    RAISE NOTICE 'Migration 003_populate_montreal_political_data.sql completed';
END
$$;

-- Afficher configuration Montreal pour validation
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
    political_interpretation as interpretation,
    CASE
        WHEN id IN ('mtl_metro_rem', 'mtl_arrondissements_autonomie', 'mtl_festivals_equilibre')
        THEN '⭐ SPECIFIC'
        ELSE 'GENERIC'
    END as type
FROM questions
WHERE municipality_id = 'montreal'
    AND political_axis != 'neutral'
ORDER BY
    CASE WHEN id LIKE 'mtl_metro%' OR id LIKE 'mtl_arrond%' OR id LIKE 'mtl_fest%' THEN 0 ELSE 1 END,
    political_axis,
    political_weight DESC;