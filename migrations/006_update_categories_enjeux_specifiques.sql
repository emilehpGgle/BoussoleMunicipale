-- ================================================================
-- MIGRATION : Modification des catégories pour enjeux spécifiques
-- ================================================================
-- Date: 2025-01-29
-- Objectif: Changer les catégories des questions spécifiques vers "Enjeu spécifique X"
-- pour faciliter la détection automatique et l'application du bonus de rareté
--
-- PRÉREQUIS: Cette migration doit être exécutée APRÈS l'insertion de toutes les
-- questions municipales (sql-quebec-questions.sql, sql-montreal-questions.sql, etc.)
--
-- VALIDATION PRE-MIGRATION: Vérifier que les questions existent
DO $$
DECLARE
    missing_questions TEXT[] := ARRAY[]::TEXT[];
    question_count INTEGER;
BEGIN
    -- Vérifier Québec
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('qc_q_01_tramway', 'qc_spec_troisieme_lien');
    IF question_count < 2 THEN
        missing_questions := array_append(missing_questions, 'Questions Québec (tramway, 3e lien)');
    END IF;

    -- Vérifier Montréal
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('mtl_spec_rem', 'mtl_spec_arrondissements', 'mtl_spec_festivals');
    IF question_count < 3 THEN
        missing_questions := array_append(missing_questions, 'Questions Montréal (REM, arrondissements, festivals)');
    END IF;

    -- Vérifier Longueuil
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('lng_transport_metropolitain', 'lng_aeroport_qualite_vie');
    IF question_count < 2 THEN
        missing_questions := array_append(missing_questions, 'Questions Longueuil (transport métropolitain, aéroport)');
    END IF;

    -- Vérifier Lévis
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('lev_q3_troisieme_lien', 'lev_traverse_quebec_levis');
    IF question_count < 2 THEN
        missing_questions := array_append(missing_questions, 'Questions Lévis (3e lien, traverse)');
    END IF;

    -- Vérifier Laval
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('lav_srb_transport_montreal', 'lav_equilibre_developpement_espaces_verts');
    IF question_count < 2 THEN
        missing_questions := array_append(missing_questions, 'Questions Laval (SRB, espaces verts)');
    END IF;

    -- Vérifier Gatineau
    SELECT COUNT(*) INTO question_count FROM questions WHERE id IN ('gat_q19_services_bilingues', 'gat_q20_coordination_ottawa', 'gat_q21_transport_interprovincial');
    IF question_count < 3 THEN
        missing_questions := array_append(missing_questions, 'Questions Gatineau (bilingue, Ottawa, interprovincial)');
    END IF;

    -- Afficher les questions manquantes si il y en a
    IF array_length(missing_questions, 1) > 0 THEN
        RAISE NOTICE 'ATTENTION: Questions manquantes détectées:';
        FOR i IN 1..array_length(missing_questions, 1) LOOP
            RAISE NOTICE '  - %', missing_questions[i];
        END LOOP;
        RAISE NOTICE 'Veuillez exécuter les migrations d''insertion des questions avant cette migration.';
        RAISE NOTICE 'Migration continuera quand même pour les questions existantes...';
    ELSE
        RAISE NOTICE 'Toutes les questions spécifiques détectées. Migration peut procéder.';
    END IF;
END
$$;

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES QUEBEC
-- ==============================================================================

-- Question tramway (enjeu spécifique #1 pour Québec)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'qc_q_01_tramway' AND municipality_id = 'quebec';

-- Question 3e lien (enjeu spécifique #2 pour Québec)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'qc_spec_troisieme_lien' AND municipality_id = 'quebec';

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES MONTREAL
-- ==============================================================================

-- Question métro/REM (enjeu spécifique #1 pour Montréal)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'mtl_spec_rem' AND municipality_id = 'montreal';

-- Question arrondissements (enjeu spécifique #2 pour Montréal)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'mtl_spec_arrondissements' AND municipality_id = 'montreal';

-- Question festivals (enjeu spécifique #3 pour Montréal)
UPDATE questions SET
    category = 'Enjeu spécifique 3'
WHERE id = 'mtl_spec_festivals' AND municipality_id = 'montreal';

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES LONGUEUIL
-- ==============================================================================

-- Question transport métropolitain (enjeu spécifique #1 pour Longueuil)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'lng_transport_metropolitain' AND municipality_id = 'longueuil';

-- Question développement aéroportuaire (enjeu spécifique #2 pour Longueuil)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'lng_aeroport_qualite_vie' AND municipality_id = 'longueuil';

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES LÉVIS
-- ==============================================================================

-- Question troisième lien routier (enjeu spécifique #1 pour Lévis)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'lev_q3_troisieme_lien';

-- Question traverse Québec-Lévis (enjeu spécifique #2 pour Lévis)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'lev_traverse_quebec_levis';

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES LAVAL
-- ==============================================================================

-- Question SRB et transport vers Montréal (enjeu spécifique #1 pour Laval)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'lav_srb_transport_montreal' AND municipality_id = 'laval';

-- Question équilibre développement/espaces verts (enjeu spécifique #2 pour Laval)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'lav_equilibre_developpement_espaces_verts' AND municipality_id = 'laval';

-- ==============================================================================
-- MISE À JOUR QUESTIONS SPÉCIFIQUES GATINEAU
-- ==============================================================================

-- Question services bilingues (enjeu spécifique #1 pour Gatineau)
UPDATE questions SET
    category = 'Enjeu spécifique 1'
WHERE id = 'gat_q19_services_bilingues' AND municipality_id = 'gatineau';

-- Question coordination Ottawa (enjeu spécifique #2 pour Gatineau)
UPDATE questions SET
    category = 'Enjeu spécifique 2'
WHERE id = 'gat_q20_coordination_ottawa' AND municipality_id = 'gatineau';

-- Question transport interprovincial (enjeu spécifique #3 pour Gatineau)
UPDATE questions SET
    category = 'Enjeu spécifique 3'
WHERE id = 'gat_q21_transport_interprovincial' AND municipality_id = 'gatineau';

-- ==============================================================================
-- VÉRIFICATION POST-MIGRATION
-- ==============================================================================

-- Vérifier les changements pour Québec
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE municipality_id = 'quebec'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Vérifier les changements pour Montréal
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE municipality_id = 'montreal'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Vérifier les changements pour Longueuil
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE municipality_id = 'longueuil'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Vérifier les changements pour Lévis
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE id LIKE 'lev_%'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Vérifier les changements pour Laval
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE municipality_id = 'laval'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Vérifier les changements pour Gatineau
SELECT
    id,
    LEFT(text, 50) as question_preview,
    category,
    municipality_id
FROM questions
WHERE municipality_id = 'gatineau'
  AND category LIKE 'Enjeu spécifique%'
ORDER BY category;

-- Compter les enjeux spécifiques par municipalité
SELECT
    municipality_id,
    category,
    COUNT(*) as nb_questions
FROM questions
WHERE category LIKE 'Enjeu spécifique%'
GROUP BY municipality_id, category
ORDER BY municipality_id, category;

-- Résumé global des enjeux spécifiques
SELECT
    municipality_id,
    COUNT(*) as total_enjeux_specifiques
FROM questions
WHERE category LIKE 'Enjeu spécifique%'
GROUP BY municipality_id
ORDER BY municipality_id;