-- ========================================================================
-- VÉRIFIER LES CONTRAINTES ACTUELLES
-- ========================================================================
-- À exécuter dans Supabase SQL Editor pour voir l'état actuel
-- ========================================================================

-- Vérifier les contraintes d'unicité sur user_profiles
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_profiles'::regclass 
AND contype = 'u';

-- Vérifier les contraintes d'unicité sur user_results  
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_results'::regclass 
AND contype = 'u';

-- Vérifier les contraintes d'unicité sur user_responses
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_responses'::regclass 
AND contype = 'u';

-- Afficher un résumé
DO $$
BEGIN
    RAISE NOTICE '=== ÉTAT DES CONTRAINTES ===';
    RAISE NOTICE 'Exécutez les requêtes ci-dessus pour voir les contraintes actuelles';
    RAISE NOTICE 'Ensuite, ajustez le code TypeScript en conséquence';
END $$;
