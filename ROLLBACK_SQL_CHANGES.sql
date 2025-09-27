-- ========================================================================
-- ROLLBACK: Restaurer les contraintes d'unicité originales
-- ========================================================================
-- À exécuter dans Supabase SQL Editor pour annuler les changements
-- du script HOTFIX_MUNICIPALITY_CONSTRAINTS.sql
-- ========================================================================

BEGIN;

-- ========================================================================
-- 1. RESTAURER LA TABLE user_profiles (contrainte originale)
-- ========================================================================

-- Supprimer la nouvelle contrainte
ALTER TABLE user_profiles 
DROP CONSTRAINT IF EXISTS user_profiles_session_municipality_key;

-- Restaurer l'ancienne contrainte
ALTER TABLE user_profiles 
ADD CONSTRAINT user_profiles_session_id_key 
UNIQUE (session_id);

-- ========================================================================
-- 2. RESTAURER LA TABLE user_results (contrainte originale)
-- ========================================================================

-- Supprimer la nouvelle contrainte
ALTER TABLE user_results 
DROP CONSTRAINT IF EXISTS user_results_session_municipality_key;

-- Restaurer l'ancienne contrainte
ALTER TABLE user_results 
ADD CONSTRAINT user_results_session_id_key 
UNIQUE (session_id);

-- ========================================================================
-- 3. RESTAURER LA TABLE user_responses (contrainte originale)
-- ========================================================================

-- Supprimer la nouvelle contrainte
ALTER TABLE user_responses 
DROP CONSTRAINT IF EXISTS user_responses_session_question_type_municipality_key;

-- Restaurer l'ancienne contrainte
ALTER TABLE user_responses 
ADD CONSTRAINT user_responses_session_id_question_id_response_type_key 
UNIQUE (session_id, question_id, response_type);

-- ========================================================================
-- 4. SUPPRIMER LES INDEX AJOUTÉS (optionnel - ils ne font pas de mal)
-- ========================================================================

-- Ces index peuvent rester, ils améliorent les performances
-- DROP INDEX IF EXISTS idx_user_profiles_session_municipality;
-- DROP INDEX IF EXISTS idx_user_results_session_municipality;
-- DROP INDEX IF EXISTS idx_user_responses_session_municipality;

COMMIT;

-- ========================================================================
-- 5. VÉRIFICATION
-- ========================================================================

DO $$
BEGIN
    RAISE NOTICE '✅ ROLLBACK terminé !';
    RAISE NOTICE '🔄 Contraintes originales restaurées';
    RAISE NOTICE '💡 La vraie solution utilise des sessions de test uniques';
    RAISE NOTICE '🚀 Vous pouvez maintenant tester avec npm run dev';
END $$;
