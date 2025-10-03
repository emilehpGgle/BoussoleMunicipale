-- ========================================================================
-- REBUILD 01: CRÉER LES TABLES CORE (DONNÉES PUBLIQUES)
-- ========================================================================
-- Tables: municipalities, questions, parties, party_positions
-- Ordre d'exécution: 1/16
-- Dépendances: Aucune
-- ========================================================================

-- ========================================================================
-- 1. TABLE MUNICIPALITIES
-- ========================================================================
CREATE TABLE IF NOT EXISTS municipalities (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  code VARCHAR UNIQUE NOT NULL,
  province VARCHAR DEFAULT 'QC',
  population INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index municipalities
CREATE INDEX IF NOT EXISTS idx_municipalities_active ON municipalities(is_active);

-- ========================================================================
-- 2. TABLE QUESTIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR NOT NULL,
  response_type VARCHAR NOT NULL CHECK (response_type IN ('agreement', 'importance_direct', 'priority_ranking')),
  description TEXT,
  response_format VARCHAR DEFAULT 'standard',
  agreement_options JSONB DEFAULT '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb,
  importance_options JSONB DEFAULT '[5, 4, 3, 2, 1]'::jsonb,
  importance_direct_options JSONB,
  priority_options JSONB,
  custom_agreement_labels JSONB,
  custom_importance_direct_labels JSONB,
  order_index INTEGER NOT NULL,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  political_axis VARCHAR(20) DEFAULT 'neutral',
  political_weight NUMERIC(3, 2) DEFAULT 1.0,
  political_interpretation VARCHAR(30) DEFAULT 'neutral',
  score_inversion BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contraintes
  CONSTRAINT chk_political_axis CHECK (political_axis IN ('economic', 'social', 'neutral')),
  CONSTRAINT chk_political_interpretation CHECK (
    political_interpretation IN ('progressive', 'conservative', 'interventionist',
                                 'free_market', 'neutral', 'decentralization', 'collaborative')
  ),
  CONSTRAINT chk_political_weight CHECK (political_weight >= 0.1 AND political_weight <= 3.0),
  CONSTRAINT questions_response_format_check CHECK (response_format IN ('standard', 'priority', 'frequency', 'financing'))
);

-- Index questions
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_questions_municipality_perf ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_municipality_order ON questions(municipality_id, order_index);
CREATE INDEX IF NOT EXISTS idx_questions_political_axis ON questions(political_axis);
CREATE INDEX IF NOT EXISTS idx_questions_municipality_axis ON questions(municipality_id, political_axis);
CREATE INDEX IF NOT EXISTS idx_questions_political_weight ON questions(political_weight);

-- ========================================================================
-- 3. TABLE PARTIES
-- ========================================================================
CREATE TABLE IF NOT EXISTS parties (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  short_name VARCHAR,
  leader VARCHAR NOT NULL,
  logo_url VARCHAR,
  color VARCHAR,
  website_url VARCHAR,
  orientation VARCHAR,
  main_ideas_summary TEXT,
  strengths JSONB DEFAULT '[]'::jsonb,
  reserves JSONB DEFAULT '[]'::jsonb,
  priorities JSONB,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index parties
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);
CREATE INDEX IF NOT EXISTS idx_parties_municipality_perf ON parties(municipality_id);

-- ========================================================================
-- 4. TABLE PARTY_POSITIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS party_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id VARCHAR REFERENCES parties(id) ON DELETE CASCADE,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  position VARCHAR NOT NULL,
  source TEXT,
  note TEXT,
  quote TEXT,
  priority_list JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte unique
  UNIQUE(party_id, question_id),

  -- Contrainte valeurs position
  CONSTRAINT party_positions_position_check CHECK (position IN ('FA', 'PA', 'N', 'PD', 'FD', 'IDK', '?'))
);

-- Index party_positions
CREATE INDEX IF NOT EXISTS idx_party_positions_party ON party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_question ON party_positions(question_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_party_municipality ON party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_priority_list ON party_positions USING GIN(priority_list);

-- ========================================================================
-- 5. CRÉER FONCTION POUR MISE À JOUR AUTOMATIQUE updated_at
-- ========================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- ========================================================================
-- 6. CRÉER TRIGGERS POUR updated_at
-- ========================================================================
CREATE TRIGGER update_municipalities_updated_at
  BEFORE UPDATE ON municipalities
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_parties_updated_at
  BEFORE UPDATE ON parties
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_party_positions_updated_at
  BEFORE UPDATE ON party_positions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 7. CRÉER VUES UTILITAIRES
-- ========================================================================

-- Vue complète des partis avec statistiques
CREATE OR REPLACE VIEW party_complete_view AS
SELECT
  p.*,
  m.name as municipality_name,
  COUNT(DISTINCT pp.id) as total_positions
FROM parties p
LEFT JOIN municipalities m ON p.municipality_id = m.id
LEFT JOIN party_positions pp ON p.id = pp.party_id
GROUP BY p.id, p.name, p.short_name, p.leader, p.logo_url, p.color,
         p.website_url, p.orientation, p.main_ideas_summary, p.strengths,
         p.reserves, p.priorities, p.municipality_id, p.created_at,
         p.updated_at, m.name;

-- Vue questions ordonnées
CREATE OR REPLACE VIEW questions_ordered_view AS
SELECT
  q.*,
  m.name as municipality_name
FROM questions q
LEFT JOIN municipalities m ON q.municipality_id = m.id
ORDER BY q.order_index, q.id;

-- ========================================================================
-- 8. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 01: Tables core créées avec succès!';
  RAISE NOTICE '   - municipalities (avec index)';
  RAISE NOTICE '   - questions (avec 7 index)';
  RAISE NOTICE '   - parties (avec 2 index)';
  RAISE NOTICE '   - party_positions (avec 4 index)';
  RAISE NOTICE '   - Triggers updated_at configurés';
  RAISE NOTICE '   - Vues utilitaires créées';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 02_create_user_tables.sql';
END
$$;
