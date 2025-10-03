-- ========================================================================
-- REBUILD 05: ACTIVER RLS ET POLITIQUES POUR TABLE LEADERS
-- ========================================================================
-- Tables: leaders
-- Politique: Lecture publique (SELECT uniquement)
-- Ordre d'exécution: 5/16
-- Dépendances: 03_create_additional_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. ACTIVER ROW LEVEL SECURITY
-- ========================================================================
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 2. POLITIQUE RLS: LEADERS (LECTURE PUBLIQUE)
-- ========================================================================
CREATE POLICY "Leaders publiquement lisibles"
  ON leaders
  FOR SELECT
  USING (true);

-- ========================================================================
-- 3. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 05: Politique RLS leaders activée!';
  RAISE NOTICE '   - leaders: Lecture publique ✓';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 06_rls_user_sessions.sql';
END
$$;
