-- ========================================================================
-- REBUILD 04: ACTIVER RLS ET POLITIQUES POUR TABLES PUBLIQUES
-- ========================================================================
-- Tables: municipalities, questions, parties, party_positions
-- Politique: Lecture publique (SELECT uniquement)
-- Ordre d'exécution: 4/16
-- Dépendances: 01_create_core_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. ACTIVER ROW LEVEL SECURITY
-- ========================================================================
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_positions ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 2. POLITIQUE RLS: MUNICIPALITIES (LECTURE PUBLIQUE)
-- ========================================================================
CREATE POLICY "Public read access"
  ON municipalities
  FOR SELECT
  USING (true);

-- ========================================================================
-- 3. POLITIQUE RLS: QUESTIONS (LECTURE PUBLIQUE)
-- ========================================================================
CREATE POLICY "Public read access"
  ON questions
  FOR SELECT
  USING (true);

-- ========================================================================
-- 4. POLITIQUE RLS: PARTIES (LECTURE PUBLIQUE)
-- ========================================================================
CREATE POLICY "Public read access"
  ON parties
  FOR SELECT
  USING (true);

-- ========================================================================
-- 5. POLITIQUE RLS: PARTY_POSITIONS (LECTURE PUBLIQUE)
-- ========================================================================
CREATE POLICY "Public read access"
  ON party_positions
  FOR SELECT
  USING (true);

-- ========================================================================
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 04: Politiques RLS tables publiques activées!';
  RAISE NOTICE '   - municipalities: Lecture publique ✓';
  RAISE NOTICE '   - questions: Lecture publique ✓';
  RAISE NOTICE '   - parties: Lecture publique ✓';
  RAISE NOTICE '   - party_positions: Lecture publique ✓';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 05_rls_leaders.sql';
END
$$;
