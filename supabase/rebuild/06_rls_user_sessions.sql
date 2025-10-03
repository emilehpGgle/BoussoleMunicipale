-- ========================================================================
-- REBUILD 06: ACTIVER RLS ET POLITIQUES POUR USER_SESSIONS
-- ========================================================================
-- Tables: user_sessions
-- Politique: Gestion complète anonyme (INSERT, SELECT, UPDATE, DELETE)
-- Ordre d'exécution: 6/16
-- Dépendances: 02_create_user_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. ACTIVER ROW LEVEL SECURITY
-- ========================================================================
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 2. POLITIQUE: PERMETTRE CRÉATION SESSION ANONYME (INSERT)
-- ========================================================================
CREATE POLICY "Allow anon session creation"
  ON user_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ========================================================================
-- 3. POLITIQUE: PERMETTRE LECTURE SESSION (SELECT)
-- ========================================================================
CREATE POLICY "Allow session token lookup"
  ON user_sessions
  FOR SELECT
  TO anon
  USING (true);

-- ========================================================================
-- 4. POLITIQUE: PERMETTRE MISE À JOUR SESSION (UPDATE)
-- ========================================================================
CREATE POLICY "Allow session activity update"
  ON user_sessions
  FOR UPDATE
  TO anon
  USING (true);

-- ========================================================================
-- 5. POLITIQUE: PERMETTRE SUPPRESSION SESSION EXPIRÉE (DELETE)
-- ========================================================================
CREATE POLICY "Allow session cleanup"
  ON user_sessions
  FOR DELETE
  TO anon
  USING (true);

-- ========================================================================
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 06: Politiques RLS user_sessions activées!';
  RAISE NOTICE '   - user_sessions: 4 politiques configurées';
  RAISE NOTICE '     • Allow anon session creation (INSERT)';
  RAISE NOTICE '     • Allow session token lookup (SELECT)';
  RAISE NOTICE '     • Allow session activity update (UPDATE)';
  RAISE NOTICE '     • Allow session cleanup (DELETE)';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 07_rls_user_data.sql';
END
$$;
