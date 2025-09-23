-- ========================================================================
-- MIGRATION 5: AJOUTER MUNICIPALITY_ID À SHARED_RESULTS
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS toutes les migrations précédentes
-- Date: 2025-09-22
-- Objectif: Résoudre le problème de municipality manquante dans les partages
-- ========================================================================

-- ========================================================================
-- AJOUTER COLONNE MUNICIPALITY_ID À SHARED_RESULTS
-- ========================================================================

-- Ajouter la colonne municipality_id avec contrainte FK
ALTER TABLE shared_results
ADD COLUMN municipality_id VARCHAR REFERENCES municipalities(id);

-- Ajouter commentaire pour documenter l'usage
COMMENT ON COLUMN shared_results.municipality_id IS 'Référence à la municipalité du résultat partagé, permet de charger les bonnes données politiques';

-- Créer index pour optimiser les requêtes par municipalité
CREATE INDEX IF NOT EXISTS idx_shared_results_municipality
ON shared_results(municipality_id);

-- ========================================================================
-- MIGRER LES DONNÉES EXISTANTES (FALLBACK QUEBEC)
-- ========================================================================

-- Mettre à jour tous les partages existants vers 'quebec' par défaut
-- Cette approche conservative est sûre car tous les partages actuels
-- proviennent probablement de l'instance Québec
UPDATE shared_results
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- ========================================================================
-- AJOUTER CONTRAINTE NOT NULL (après migration des données)
-- ========================================================================

-- Maintenant que toutes les lignes ont une municipality_id,
-- rendre la colonne obligatoire pour les futures insertions
ALTER TABLE shared_results
ALTER COLUMN municipality_id SET NOT NULL;

-- ========================================================================
-- VÉRIFICATION DE LA MIGRATION
-- ========================================================================

-- Vérifier que tous les partages ont maintenant une municipality_id
DO $$
DECLARE
    null_count INTEGER;
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO null_count FROM shared_results WHERE municipality_id IS NULL;
    SELECT COUNT(*) INTO total_count FROM shared_results;

    RAISE NOTICE 'Migration shared_results: % total, % sans municipality (devrait être 0)', total_count, null_count;

    IF null_count > 0 THEN
        RAISE EXCEPTION 'ERREUR: % lignes ont encore municipality_id NULL', null_count;
    END IF;

    RAISE NOTICE '✅ Migration shared_results complétée avec succès!';
END $$;