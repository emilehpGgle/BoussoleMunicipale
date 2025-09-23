-- ========================================================================
-- ÉTAPE 1.5: AJOUTER LES COLONNES MUNICIPALITY_ID AUX TABLES EXISTANTES
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS l'étape 1 et AVANT l'étape 2
-- ========================================================================

-- 1. Vérifier quelles tables existent déjà
SELECT
  table_name,
  'Table existante' as status
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  AND table_name IN ('user_sessions', 'user_responses', 'user_results', 'user_profiles')
ORDER BY table_name;

-- 2. Ajouter municipality_id aux tables utilisateur existantes (si elles existent)
DO $$
BEGIN
  -- user_sessions
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions' AND table_schema = 'public') THEN
    ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
    RAISE NOTICE '✅ Colonne municipality_id ajoutée à user_sessions';
  ELSE
    RAISE NOTICE '⚠️ Table user_sessions n''existe pas encore';
  END IF;

  -- user_responses
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses' AND table_schema = 'public') THEN
    ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
    RAISE NOTICE '✅ Colonne municipality_id ajoutée à user_responses';
  ELSE
    RAISE NOTICE '⚠️ Table user_responses n''existe pas encore';
  END IF;

  -- user_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results' AND table_schema = 'public') THEN
    ALTER TABLE user_results ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
    RAISE NOTICE '✅ Colonne municipality_id ajoutée à user_results';
  ELSE
    RAISE NOTICE '⚠️ Table user_results n''existe pas encore';
  END IF;

  -- user_profiles
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles' AND table_schema = 'public') THEN
    ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
    RAISE NOTICE '✅ Colonne municipality_id ajoutée à user_profiles';
  ELSE
    RAISE NOTICE '⚠️ Table user_profiles n''existe pas encore';
  END IF;
END $$;

-- 3. Mettre à jour les données existantes pour les assigner à Québec
DO $$
BEGIN
  -- user_sessions
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions' AND table_schema = 'public') THEN
    UPDATE user_sessions SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
    RAISE NOTICE '✅ Données user_sessions mises à jour vers Québec';
  END IF;

  -- user_responses
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses' AND table_schema = 'public') THEN
    UPDATE user_responses SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
    RAISE NOTICE '✅ Données user_responses mises à jour vers Québec';
  END IF;

  -- user_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results' AND table_schema = 'public') THEN
    UPDATE user_results SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
    RAISE NOTICE '✅ Données user_results mises à jour vers Québec';
  END IF;

  -- user_profiles
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles' AND table_schema = 'public') THEN
    UPDATE user_profiles SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
    RAISE NOTICE '✅ Données user_profiles mises à jour vers Québec';
  END IF;
END $$;

-- 4. Créer les index pour performance
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions' AND table_schema = 'public') THEN
    CREATE INDEX IF NOT EXISTS idx_user_sessions_municipality ON user_sessions(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses' AND table_schema = 'public') THEN
    CREATE INDEX IF NOT EXISTS idx_user_responses_municipality ON user_responses(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results' AND table_schema = 'public') THEN
    CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles' AND table_schema = 'public') THEN
    CREATE INDEX IF NOT EXISTS idx_user_profiles_municipality ON user_profiles(municipality_id);
  END IF;
END $$;

-- 5. Vérifier les résultats
SELECT
  '✅ Colonnes municipality_id ajoutées aux tables existantes' as status;