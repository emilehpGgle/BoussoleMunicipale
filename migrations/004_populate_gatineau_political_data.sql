-- Migration : Population des données politiques Gatineau
-- Date : 2025-09-24
-- Objectif : Configurer les paramètres politiques pour Gatineau
--
-- Gatineau a des spécificités interprovinciales uniques : services bilingues,
-- coordination Ottawa, et contexte de municipalité frontalière. Configuration
-- adaptée à la réalité de la capitale nationale côté québécois.

-- ==============================================================================
-- VALIDATION PRE-MIGRATION
-- ==============================================================================

-- Vérifier que Montreal est déjà configuré (pour cohérence progressive)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM questions
        WHERE municipality_id = 'montreal' AND political_axis != 'neutral'
        LIMIT 1
    ) THEN
        RAISE WARNING 'Montreal political data recommended for consistency. Consider running 003_populate_montreal_political_data.sql first.';
    END IF;
END
$$;

-- ==============================================================================
-- QUESTIONS SPÉCIFIQUES GATINEAU (enjeux interprovincaux uniques)
-- ==============================================================================

-- gat_q19_services_bilingues - ENJEU MAJEUR spécifique à Gatineau
-- Collaboration linguistique dans région frontalière (TRÈS PROGRESSISTE COLLABORATIF)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.6,  -- Poids très élevé - enjeu unique à Gatineau
    political_interpretation = 'collaborative',
    score_inversion = false
WHERE id = 'gat_spec_bilingue' AND municipality_id = 'gatineau';

-- gat_q20_coordination_ottawa - ENJEU ÉCONOMIQUE INTERPROVINCIAL unique
-- Partenariats interprovincaux (TRÈS COLLABORATIF ÉCONOMIQUE)
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.5,  -- Poids très élevé - collaboration interprovinciale unique
    political_interpretation = 'collaborative',
    score_inversion = false
WHERE id = 'gat_spec_ottawa' AND municipality_id = 'gatineau';

-- ==============================================================================
-- QUESTIONS ÉCONOMIQUES GATINEAU (contexte ville frontalière)
-- ==============================================================================

-- Questions interventionnistes (score_inversion = true)

-- gat_q10_augmentation_taxes - Contexte plus modéré que grandes villes
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,  -- 1.4 → 1.2 (moins de pression fiscale que MTL/QC)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'gat_q_10_taxes' AND municipality_id = 'gatineau';

-- gat_q3_quotas_logements_abordables - Important mais moins critique qu'à Montreal
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.1,  -- 1.3 → 1.1 (moins de crise logement qu'à MTL)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'gat_q_03_logements_abordables' AND municipality_id = 'gatineau';

-- gat_q15_soutien_organismes_communautaires - Standard interventionniste
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.0,  -- Standard
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'gat_q_15_organismes_communautaires' AND municipality_id = 'gatineau';

-- gat_q11_pouvoir_conseils_secteur - DÉCENTRALISATION (spécifique Gatineau)
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.0,  -- Décentralisation vers secteurs
    political_interpretation = 'decentralization',
    score_inversion = false  -- Décentralisation = score positif
WHERE id = 'gat_q_11_pouvoir_secteurs' AND municipality_id = 'gatineau';

-- Questions libre marché (score_inversion = false)

-- gat_q4_reduction_depenses_taxes - Standard libre marché
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.1,  -- 1.2 → 1.1
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'gat_q_04_reduction_depenses' AND municipality_id = 'gatineau';

-- gat_q13_avantages_fiscaux_entreprises - Important pour attirer entreprises d'Ottawa
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,  -- 0.9 → 1.2 (compétition avec Ottawa)
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'gat_q_13_avantages_fiscaux' AND municipality_id = 'gatineau';

-- gat_q12_reduction_dette - Services essentiels vs projets avenir
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.9,  -- Standard
    political_interpretation = 'conservative',  -- Priorité services essentiels
    score_inversion = false
WHERE id = 'gat_q_12_reduction_dette' AND municipality_id = 'gatineau';

-- ==============================================================================
-- QUESTIONS SOCIALES GATINEAU (contexte frontalier et qualité de vie)
-- ==============================================================================

-- Questions progressistes (score_inversion = false)

-- gat_q1_pistes_cyclables - Important pour qualité de vie frontalière
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,  -- Important pour attractivité vs Ottawa
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_01_pistes_cyclables' AND municipality_id = 'gatineau';

-- gat_q2_priorite_mobilite_active - Connexion avec réseau Ottawa
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_02_mobilite_active' AND municipality_id = 'gatineau';

-- gat_q6_interdire_essence_centre_ville - Moins urgent qu'à Montreal
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- 1.2 → 0.9 (centre-ville moins dense)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_06_interdire_essence' AND municipality_id = 'gatineau';

-- gat_q5_immeubles_grande_hauteur - Moins pertinent dans contexte Gatineau
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.7,  -- 1.1 → 0.7 (moins de densification)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_05_immeubles_hauteur' AND municipality_id = 'gatineau';

-- gat_q8_transition_carboneutre - Standard progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_08_transition_carbone' AND municipality_id = 'gatineau';

-- gat_q7_protection_espaces_verts - TRÈS important pour Gatineau (qualité de vie)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.3,  -- 1.0 → 1.3 (attractivité vs Ottawa)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_07_espaces_verts' AND municipality_id = 'gatineau';

-- gat_q18_protection_patrimoine - Important identité vs Ottawa
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,  -- 0.9 → 1.0
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_18_patrimoine' AND municipality_id = 'gatineau';

-- gat_q14_limitation_touristes - Contexte différent de Montreal
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.6,  -- 0.7 → 0.6 (moins de tourisme de masse)
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_14_limitation_touristes' AND municipality_id = 'gatineau';

-- gat_q17_investissement_infrastructures_loisirs_sportives - Important qualité de vie
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- 0.7 → 0.9
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'gat_q_17_infrastructures_loisirs' AND municipality_id = 'gatineau';

-- Questions conservatrices (score_inversion = true)

-- gat_q9_reduction_dechets - Service vs environnement (conservateur)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'gat_q_09_reduction_dechets' AND municipality_id = 'gatineau';

-- gat_q16_augmentation_effectifs_policiers - Sécurité frontalière
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- 0.8 → 0.9 (contexte frontalier)
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'gat_q_16_effectifs_policiers' AND municipality_id = 'gatineau';

-- ==============================================================================
-- VALIDATION POST-MIGRATION GATINEAU
-- ==============================================================================

DO $$
DECLARE
    economic_count INTEGER;
    social_count INTEGER;
    interprovincial_count INTEGER;
    collaborative_count INTEGER;
    total_configured INTEGER;
BEGIN
    SELECT COUNT(*) INTO economic_count
    FROM questions
    WHERE municipality_id = 'gatineau' AND political_axis = 'economic';

    SELECT COUNT(*) INTO social_count
    FROM questions
    WHERE municipality_id = 'gatineau' AND political_axis = 'social';

    -- Questions interprovinciales spécifiques
    SELECT COUNT(*) INTO interprovincial_count
    FROM questions
    WHERE municipality_id = 'gatineau'
      AND id IN ('gat_q19_services_bilingues', 'gat_q20_coordination_ottawa')
      AND political_axis != 'neutral';

    -- Questions avec interprétation collaborative (unique à Gatineau)
    SELECT COUNT(*) INTO collaborative_count
    FROM questions
    WHERE municipality_id = 'gatineau'
      AND political_interpretation = 'collaborative';

    SELECT COUNT(*) INTO total_configured
    FROM questions
    WHERE municipality_id = 'gatineau' AND political_axis != 'neutral';

    RAISE NOTICE 'Gatineau political configuration summary:';
    RAISE NOTICE '  Economic questions: %', economic_count;
    RAISE NOTICE '  Social questions: %', social_count;
    RAISE NOTICE '  Interprovincial questions: %', interprovincial_count;
    RAISE NOTICE '  Collaborative questions: %', collaborative_count;
    RAISE NOTICE '  Total configured: %', total_configured;

    -- Validation des spécificités Gatineau
    IF interprovincial_count < 2 THEN
        RAISE WARNING 'Missing Gatineau interprovincial questions (services bilingues, coordination Ottawa)';
    END IF;

    IF collaborative_count < 2 THEN
        RAISE WARNING 'Missing collaborative interpretation questions for Gatineau context';
    END IF;

    IF total_configured < 16 THEN
        RAISE WARNING 'Less than 16 questions configured for Gatineau. Review completeness.';
    END IF;

    RAISE NOTICE 'Migration 004_populate_gatineau_political_data.sql completed';
END
$$;

-- Afficher configuration Gatineau pour validation
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
        WHEN id IN ('gat_q19_services_bilingues', 'gat_q20_coordination_ottawa')
        THEN '🌉 INTERPROV'
        WHEN political_interpretation = 'collaborative'
        THEN '🤝 COLLAB'
        WHEN political_interpretation = 'decentralization'
        THEN '🏛️ DECENT'
        ELSE 'STANDARD'
    END as special
FROM questions
WHERE municipality_id = 'gatineau'
    AND political_axis != 'neutral'
ORDER BY
    CASE
        WHEN id IN ('gat_q19_services_bilingues', 'gat_q20_coordination_ottawa') THEN 0
        WHEN political_interpretation = 'collaborative' THEN 1
        ELSE 2
    END,
    political_axis,
    political_weight DESC;