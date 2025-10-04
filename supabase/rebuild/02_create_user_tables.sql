-- ========================================================================
-- REBUILD 02: CRÉER LES TABLES UTILISATEURS
-- ========================================================================
-- Tables: user_sessions, user_profiles, user_responses, user_results
-- Ordre d'exécution: 2/16
-- Dépendances: 01_create_core_tables.sql (pour foreign keys sur questions)
-- ========================================================================

-- ========================================================================
-- 1. TABLE USER_SESSIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  municipality_id VARCHAR,
  last_activity_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter colonne last_activity_at si table existe déjà sans cette colonne
ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP;

-- Index user_sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_municipality ON user_sessions(municipality_id);

-- ========================================================================
-- 2. TABLE USER_PROFILES
-- ========================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
  profile_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  municipality_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index user_profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_municipality ON user_profiles(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_session_municipality ON user_profiles(session_id, municipality_id);

-- ========================================================================
-- 3. TABLE USER_RESPONSES
-- ========================================================================
CREATE TABLE IF NOT EXISTS user_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
  question_id VARCHAR NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  response_type TEXT NOT NULL,
  agreement_value TEXT,
  importance_value INTEGER,
  importance_direct_value TEXT,
  priority_data JSONB,
  municipality_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte unique par session + question + type
  UNIQUE(session_id, question_id, response_type),

  -- Contraintes sur les valeurs
  CONSTRAINT user_responses_response_type_check CHECK (response_type IN ('agreement', 'importance_direct', 'priority_ranking')),
  CONSTRAINT user_responses_agreement_value_check CHECK (agreement_value IN ('FA', 'PA', 'N', 'PD', 'FD', 'IDK')),
  CONSTRAINT user_responses_importance_direct_value_check CHECK (importance_direct_value IN ('TI', 'AI', 'NI', 'PI', 'PTI', 'IDK'))
);

-- Ajouter colonne importance_value si table existe déjà sans cette colonne
ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS importance_value INTEGER;

-- Index user_responses
CREATE INDEX IF NOT EXISTS idx_user_responses_session_id ON user_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_question_id ON user_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_priority ON user_responses(session_id, question_id) WHERE response_type = 'priority_ranking';
CREATE INDEX IF NOT EXISTS idx_user_responses_municipality ON user_responses(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_session_municipality ON user_responses(session_id, municipality_id);

-- ========================================================================
-- 4. TABLE USER_RESULTS
-- ========================================================================
CREATE TABLE IF NOT EXISTS user_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
  results_data JSONB NOT NULL,
  political_position JSONB,
  status TEXT DEFAULT 'partial',
  municipality_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte sur status
  CONSTRAINT user_results_status_check CHECK (status IN ('partial', 'completed'))
);

-- Migration completion_status → status (si table existe avec ancien nom de colonne)
DO $$
BEGIN
  -- Vérifier si completion_status existe et status n'existe pas
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_results' AND column_name = 'completion_status'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_results' AND column_name = 'status'
  ) THEN
    -- Supprimer l'ancienne contrainte
    ALTER TABLE user_results DROP CONSTRAINT IF EXISTS user_results_completion_status_check;
    -- Renommer la colonne
    ALTER TABLE user_results RENAME COLUMN completion_status TO status;
    -- Recréer la contrainte avec le nouveau nom
    ALTER TABLE user_results ADD CONSTRAINT user_results_status_check CHECK (status IN ('partial', 'completed'));
    RAISE NOTICE 'Migration: completion_status renommé en status';
  ELSE
    -- Ajouter colonne status si elle n'existe pas
    ALTER TABLE user_results ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'partial';
    -- Ajouter contrainte si elle n'existe pas
    ALTER TABLE user_results DROP CONSTRAINT IF EXISTS user_results_status_check;
    ALTER TABLE user_results ADD CONSTRAINT user_results_status_check CHECK (status IN ('partial', 'completed'));
  END IF;
END
$$;

-- Index user_results
CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_results_session_municipality ON user_results(session_id, municipality_id);

-- ========================================================================
-- 5. CRÉER TRIGGERS POUR updated_at (idempotent)
-- ========================================================================
DROP TRIGGER IF EXISTS update_user_sessions_updated_at ON user_sessions;
CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_responses_updated_at ON user_responses;
CREATE TRIGGER update_user_responses_updated_at
  BEFORE UPDATE ON user_responses
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_results_updated_at ON user_results;
CREATE TRIGGER update_user_results_updated_at
  BEFORE UPDATE ON user_results
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 02: Tables utilisateurs créées/mises à jour avec succès!';
  RAISE NOTICE '   - user_sessions (avec last_activity_at + 3 index)';
  RAISE NOTICE '   - user_profiles (avec 2 index)';
  RAISE NOTICE '   - user_responses (avec importance_value + 5 index)';
  RAISE NOTICE '   - user_results (avec status + 2 index)';
  RAISE NOTICE '   - Triggers updated_at configurés';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Script idempotent: peut être réexécuté sans erreur';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 03_create_additional_tables.sql';
END
$$;
