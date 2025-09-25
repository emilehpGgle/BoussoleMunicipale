-- Migration : Ajout des colonnes politiques à la table questions
-- Date : 2025-09-24
-- Objectif : Architecture calculs politiques multi-municipalités basée sur DB
--
-- Cette migration ajoute 4 colonnes pour stocker la configuration politique
-- de chaque question, permettant des calculs dynamiques par municipalité

-- ==============================================================================
-- AJOUT DES COLONNES POLITIQUES
-- ==============================================================================

-- 1. Axe politique de la question (economic/social/neutral)
ALTER TABLE questions
ADD COLUMN political_axis VARCHAR(20) DEFAULT 'neutral';

-- 2. Poids de la question dans le calcul politique (0.1 - 3.0)
ALTER TABLE questions
ADD COLUMN political_weight DECIMAL(3,2) DEFAULT 1.0;

-- 3. Interprétation politique de la question
ALTER TABLE questions
ADD COLUMN political_interpretation VARCHAR(30) DEFAULT 'neutral';

-- 4. Inversion de score (si true : être d'accord = score négatif)
ALTER TABLE questions
ADD COLUMN score_inversion BOOLEAN DEFAULT false;

-- ==============================================================================
-- CONTRAINTES DE VALIDATION
-- ==============================================================================

-- Contrainte sur l'axe politique
ALTER TABLE questions
ADD CONSTRAINT chk_political_axis
CHECK (political_axis IN ('economic', 'social', 'neutral'));

-- Contrainte sur l'interprétation politique
ALTER TABLE questions
ADD CONSTRAINT chk_political_interpretation
CHECK (political_interpretation IN (
    'progressive',
    'conservative',
    'interventionist',
    'free_market',
    'neutral',
    'decentralization',
    'collaborative'
));

-- Contrainte sur le poids politique (entre 0.1 et 3.0)
ALTER TABLE questions
ADD CONSTRAINT chk_political_weight
CHECK (political_weight >= 0.1 AND political_weight <= 3.0);

-- ==============================================================================
-- INDEX D'OPTIMISATION
-- ==============================================================================

-- Index pour requêtes par axe politique
CREATE INDEX idx_questions_political_axis
ON questions(political_axis);

-- Index composite pour requêtes par municipalité et axe
CREATE INDEX idx_questions_municipality_axis
ON questions(municipality_id, political_axis);

-- Index pour requêtes par poids politique (pour diagnostics)
CREATE INDEX idx_questions_political_weight
ON questions(political_weight);

-- ==============================================================================
-- COMMENTAIRES DESCRIPTIFS
-- ==============================================================================

COMMENT ON COLUMN questions.political_axis IS 'Axe politique : economic (interventionnisme vs libre marché), social (conservateur vs progressiste), ou neutral';

COMMENT ON COLUMN questions.political_weight IS 'Poids dans le calcul politique (0.1 = faible impact, 3.0 = très fort impact)';

COMMENT ON COLUMN questions.political_interpretation IS 'Type d interprétation politique pour la logique de calcul';

COMMENT ON COLUMN questions.score_inversion IS 'Si true, être d accord avec cette question donne un score négatif sur l axe';

-- ==============================================================================
-- VALIDATION POST-MIGRATION
-- ==============================================================================

-- Vérifier que toutes les colonnes ont été ajoutées
DO $$
BEGIN
    -- Vérifier political_axis
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'questions' AND column_name = 'political_axis'
    ) THEN
        RAISE EXCEPTION 'Migration failed: political_axis column not added';
    END IF;

    -- Vérifier political_weight
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'questions' AND column_name = 'political_weight'
    ) THEN
        RAISE EXCEPTION 'Migration failed: political_weight column not added';
    END IF;

    -- Vérifier political_interpretation
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'questions' AND column_name = 'political_interpretation'
    ) THEN
        RAISE EXCEPTION 'Migration failed: political_interpretation column not added';
    END IF;

    -- Vérifier score_inversion
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'questions' AND column_name = 'score_inversion'
    ) THEN
        RAISE EXCEPTION 'Migration failed: score_inversion column not added';
    END IF;

    RAISE NOTICE 'Migration 001_add_political_columns.sql completed successfully';
END
$$;

-- ==============================================================================
-- ROLLBACK SCRIPT (à utiliser en cas de problème)
-- ==============================================================================

/*
-- Pour annuler cette migration en cas de problème :

-- Supprimer les index
DROP INDEX IF EXISTS idx_questions_political_axis;
DROP INDEX IF EXISTS idx_questions_municipality_axis;
DROP INDEX IF EXISTS idx_questions_political_weight;

-- Supprimer les contraintes
ALTER TABLE questions DROP CONSTRAINT IF EXISTS chk_political_axis;
ALTER TABLE questions DROP CONSTRAINT IF EXISTS chk_political_interpretation;
ALTER TABLE questions DROP CONSTRAINT IF EXISTS chk_political_weight;

-- Supprimer les colonnes
ALTER TABLE questions DROP COLUMN IF EXISTS political_axis;
ALTER TABLE questions DROP COLUMN IF EXISTS political_weight;
ALTER TABLE questions DROP COLUMN IF EXISTS political_interpretation;
ALTER TABLE questions DROP COLUMN IF EXISTS score_inversion;
*/