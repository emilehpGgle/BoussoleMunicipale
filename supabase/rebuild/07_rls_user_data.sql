-- ========================================================================
-- REBUILD 07: ACTIVER RLS ET POLITIQUES POUR DONNÉES UTILISATEURS
-- ========================================================================
-- Tables: user_profiles, user_responses, user_results
-- Politique: Gestion complète par session (CRUD)
-- Ordre d'exécution: 7/16
-- Dépendances: 02_create_user_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. ACTIVER ROW LEVEL SECURITY
-- ========================================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_results ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 2. POLITIQUES RLS: USER_PROFILES
-- ========================================================================

-- Permettre gestion complète des profils (tous les users peuvent tout faire)
CREATE POLICY "Allow manage own profiles"
  ON user_profiles
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ========================================================================
-- 3. POLITIQUES RLS: USER_RESPONSES
-- ========================================================================

-- Permettre gestion complète des réponses (tous les users peuvent tout faire)
CREATE POLICY "Allow manage own responses"
  ON user_responses
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ========================================================================
-- 4. POLITIQUES RLS: USER_RESULTS
-- ========================================================================

-- Permettre gestion complète des résultats (tous les users peuvent tout faire)
CREATE POLICY "Allow manage own results"
  ON user_results
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ========================================================================
-- 5. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 07: Politiques RLS données utilisateurs activées!';
  RAISE NOTICE '   - user_profiles: Gestion complète ✓';
  RAISE NOTICE '   - user_responses: Gestion complète ✓';
  RAISE NOTICE '   - user_results: Gestion complète ✓';
  RAISE NOTICE '';
  RAISE NOTICE '   Note: Politiques permissives pour sessions anonymes';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 08_rls_shared_results.sql';
END
$$;
