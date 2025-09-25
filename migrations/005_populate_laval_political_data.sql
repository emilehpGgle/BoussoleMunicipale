-- Migration : Population des données politiques Laval
-- Date : 2025-09-24
-- Objectif : Configurer les paramètres politiques pour Laval
--
-- Laval a des spécificités de banlieue métropolitaine : transport vers Montreal,
-- équilibre développement vs espaces verts, densification contrôlée.
-- Configuration adaptée au contexte de 3e ville du Québec.

-- ==============================================================================
-- VALIDATION PRE-MIGRATION
-- ==============================================================================

-- Vérifier que Gatineau est déjà configuré (pour cohérence progressive)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM questions
        WHERE municipality_id = 'gatineau' AND political_axis != 'neutral'
        LIMIT 1
    ) THEN
        RAISE WARNING 'Gatineau political data recommended for consistency. Consider running 004_populate_gatineau_political_data.sql first.';
    END IF;
END
$$;

-- ==============================================================================
-- QUESTIONS SPÉCIFIQUES LAVAL (enjeux banlieue métropolitaine)
-- ==============================================================================

-- lav_srb_transport_montreal - SRB et transport vers Montreal (ÉCONOMIQUE COLLABORATIF)
-- Connectivité métropolitaine essentielle pour banlieue
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.7,  -- Poids très élevé - vital pour économie Laval
    political_interpretation = 'collaborative',
    score_inversion = false
WHERE id = 'lav_spec_srb' AND municipality_id = 'laval';

-- lav_equilibre_developpement_espaces_verts - ENJEU MAJEUR banlieue (SOCIAL)
-- Équilibre développement résidentiel vs préservation caractère banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.5,  -- Poids très élevé - identité banlieue
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_spec_espaces_verts' AND municipality_id = 'laval';

-- ==============================================================================
-- QUESTIONS ÉCONOMIQUES LAVAL (contexte banlieue métropolitaine)
-- ==============================================================================

-- Questions interventionnistes (score_inversion = true)

-- lav_q12_augmentation_taxes - Modéré pour banlieue
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.3,  -- Entre Quebec (1.4) et Gatineau (1.2)
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'lav_q_12_taxes' AND municipality_id = 'laval';

-- lav_q5_quotas_logements_abordables - Important mais moins critique que MTL
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.2,  -- Banlieue = moins de pression logement
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'lav_q_05_logements_abordables' AND municipality_id = 'laval';

-- lav_q17_soutien_organismes_communautaires - Standard banlieue
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.0,
    political_interpretation = 'interventionist',
    score_inversion = true
WHERE id = 'lav_q_17_organismes_communautaires' AND municipality_id = 'laval';

-- lav_q13_pouvoir_conseils_quartier - Décentralisation vers quartiers
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.8,
    political_interpretation = 'decentralization',
    score_inversion = false
WHERE id = 'lav_q_13_pouvoir_quartiers' AND municipality_id = 'laval';

-- Questions libre marché (score_inversion = false)

-- lav_q6_reduction_depenses_taxes - Standard banlieue
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.1,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'lav_q_06_reduction_depenses' AND municipality_id = 'laval';

-- lav_q15_avantages_fiscaux_entreprises - Important pour développement économique
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 1.1,  -- Attirer entreprises vs concurrence régionale
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'lav_q_15_avantages_fiscaux' AND municipality_id = 'laval';

-- lav_q14_reduction_dette - Standard
UPDATE questions SET
    political_axis = 'economic',
    political_weight = 0.8,
    political_interpretation = 'free_market',
    score_inversion = false
WHERE id = 'lav_q_14_reduction_dette' AND municipality_id = 'laval';

-- ==============================================================================
-- QUESTIONS SOCIALES LAVAL (contexte banlieue qualité de vie)
-- ==============================================================================

-- Questions progressistes (score_inversion = false)

-- lav_q2_pistes_cyclables - Important pour qualité de vie banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,  -- Important mais moins crucial qu'en ville dense
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_02_pistes_cyclables' AND municipality_id = 'laval';

-- lav_q4_priorite_mobilite_active - Standard progressiste
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.0,
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_04_mobilite_active' AND municipality_id = 'laval';

-- lav_q8_interdire_essence_centre_ville - Moins pertinent pour banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.7,  -- Centre-ville moins dense que MTL
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_08_interdire_essence' AND municipality_id = 'laval';

-- lav_q7_immeubles_grande_hauteur - Densification contrôlée banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- Densification mais préservation caractère banlieue
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_07_immeubles_hauteur' AND municipality_id = 'laval';

-- lav_q10_transition_carboneutre - Important pour image moderne
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.2,  -- Banlieue moderne et verte
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_10_transition_carbone' AND municipality_id = 'laval';

-- lav_q9_protection_espaces_verts - TRÈS IMPORTANT pour banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.4,  -- Identité banlieue = espaces verts
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_09_espaces_verts' AND municipality_id = 'laval';

-- lav_q20_protection_patrimoine - Modéré (patrimoine récent)
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,  -- Moins de patrimoine historique
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_20_patrimoine' AND municipality_id = 'laval';

-- lav_q16_limitation_touristes - Peu pertinent pour Laval
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.5,  -- Laval = destination touristique limitée
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_16_limitation_touristes' AND municipality_id = 'laval';

-- lav_q19_investissement_infrastructures_loisirs_sportives - Important qualité vie
UPDATE questions SET
    political_axis = 'social',
    political_weight = 1.1,  -- Qualité de vie banlieue
    political_interpretation = 'progressive',
    score_inversion = false
WHERE id = 'lav_q_19_infrastructures_loisirs' AND municipality_id = 'laval';

-- Questions conservatrices (score_inversion = true)

-- lav_q11_reduction_dechets - Service vs environnement
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.9,  -- Standard
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'lav_q_11_reduction_dechets' AND municipality_id = 'laval';

-- lav_q18_augmentation_effectifs_policiers - Sécurité banlieue
UPDATE questions SET
    political_axis = 'social',
    political_weight = 0.8,  -- Banlieue généralement plus sécuritaire
    political_interpretation = 'conservative',
    score_inversion = true
WHERE id = 'lav_q_18_effectifs_policiers' AND municipality_id = 'laval';

-- ==============================================================================
-- VALIDATION POST-MIGRATION LAVAL
-- ==============================================================================

DO $$
DECLARE
    economic_count INTEGER;
    social_count INTEGER;
    specific_count INTEGER;
    transport_weight DECIMAL;
    espaces_verts_weight DECIMAL;
    total_configured INTEGER;
BEGIN
    SELECT COUNT(*) INTO economic_count
    FROM questions
    WHERE municipality_id = 'laval' AND political_axis = 'economic';

    SELECT COUNT(*) INTO social_count
    FROM questions
    WHERE municipality_id = 'laval' AND political_axis = 'social';

    -- Questions spécifiques Laval
    SELECT COUNT(*) INTO specific_count
    FROM questions
    WHERE municipality_id = 'laval'
      AND id IN ('lav_srb_transport_montreal', 'lav_equilibre_developpement_espaces_verts')
      AND political_axis != 'neutral';

    -- Vérifier poids questions clés
    SELECT political_weight INTO transport_weight
    FROM questions
    WHERE municipality_id = 'laval' AND id = 'lav_srb_transport_montreal';

    SELECT political_weight INTO espaces_verts_weight
    FROM questions
    WHERE municipality_id = 'laval' AND id = 'lav_equilibre_developpement_espaces_verts';

    SELECT COUNT(*) INTO total_configured
    FROM questions
    WHERE municipality_id = 'laval' AND political_axis != 'neutral';

    RAISE NOTICE 'Laval political configuration summary:';
    RAISE NOTICE '  Economic questions: %', economic_count;
    RAISE NOTICE '  Social questions: %', social_count;
    RAISE NOTICE '  Specific Laval questions: %', specific_count;
    RAISE NOTICE '  Transport SRB weight: %', transport_weight;
    RAISE NOTICE '  Espaces verts weight: %', espaces_verts_weight;
    RAISE NOTICE '  Total configured: %', total_configured;

    -- Validation des spécificités Laval
    IF specific_count < 2 THEN
        RAISE WARNING 'Missing Laval-specific questions (SRB transport, espaces verts)';
    END IF;

    IF transport_weight < 1.5 THEN
        RAISE WARNING 'Transport SRB weight should be high priority for Laval';
    END IF;

    IF espaces_verts_weight < 1.3 THEN
        RAISE WARNING 'Espaces verts weight should be high priority for Laval';
    END IF;

    IF total_configured < 16 THEN
        RAISE WARNING 'Less than 16 questions configured for Laval. Review completeness.';
    END IF;

    RAISE NOTICE 'Migration 005_populate_laval_political_data.sql completed';
END
$$;

-- Afficher configuration Laval pour validation
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
        WHEN id IN ('lav_srb_transport_montreal', 'lav_equilibre_developpement_espaces_verts')
        THEN '🌉 SPECIFIC'
        WHEN political_interpretation = 'collaborative'
        THEN '🤝 COLLAB'
        WHEN id = 'lav_q9_protection_espaces_verts'
        THEN '🌳 PRIORITY'
        ELSE 'STANDARD'
    END as special
FROM questions
WHERE municipality_id = 'laval'
    AND political_axis != 'neutral'
ORDER BY
    CASE
        WHEN id IN ('lav_srb_transport_montreal', 'lav_equilibre_developpement_espaces_verts') THEN 0
        WHEN id = 'lav_q9_protection_espaces_verts' THEN 1
        ELSE 2
    END,
    political_axis,
    political_weight DESC;