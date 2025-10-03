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
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

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
  completion_status TEXT DEFAULT 'partial',
  municipality_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte sur completion_status
  CONSTRAINT user_results_completion_status_check CHECK (completion_status IN ('partial', 'completed'))
);

-- Index user_results
CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_results_session_municipality ON user_results(session_id, municipality_id);

-- ========================================================================
-- 5. CRÉER TRIGGERS POUR updated_at
-- ========================================================================
CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_responses_updated_at
  BEFORE UPDATE ON user_responses
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_results_updated_at
  BEFORE UPDATE ON user_results
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 02: Tables utilisateurs créées avec succès!';
  RAISE NOTICE '   - user_sessions (avec 3 index)';
  RAISE NOTICE '   - user_profiles (avec 2 index)';
  RAISE NOTICE '   - user_responses (avec 5 index)';
  RAISE NOTICE '   - user_results (avec 2 index)';
  RAISE NOTICE '   - Triggers updated_at configurés';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 03_create_additional_tables.sql';
END
$$;
