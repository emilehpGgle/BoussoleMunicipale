-- ========================================================================
-- MIGRATION 1: CRÉER LES TABLES POUR L'ARCHITECTURE MULTI-MUNICIPALITÉS
-- ========================================================================
-- À exécuter dans Supabase SQL Editor
-- Date: 2025-09-21
-- ========================================================================

-- ========================================================================
-- 1. CRÉER LA TABLE MUNICIPALITIES
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

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_municipalities_active ON municipalities(is_active);

-- ========================================================================
-- 2. CRÉER LA TABLE QUESTIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR NOT NULL,
  response_type VARCHAR NOT NULL CHECK (response_type IN ('agreement', 'importance_direct', 'priority_ranking')),
  description TEXT,
  response_format VARCHAR DEFAULT 'standard',
  agreement_options JSONB,
  importance_options JSONB,
  importance_direct_options JSONB,
  priority_options JSONB,
  custom_agreement_labels JSONB,
  custom_importance_direct_labels JSONB,
  order_index INTEGER,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  is_generic BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);

-- ========================================================================
-- 3. CRÉER LA TABLE PARTIES
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
  strengths JSONB,
  reserves JSONB,
  priorities JSONB,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);

-- ========================================================================
-- 4. CRÉER LA TABLE PARTY_POSITIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS party_positions (
  id SERIAL PRIMARY KEY,
  party_id VARCHAR REFERENCES parties(id) ON DELETE CASCADE,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  position VARCHAR NOT NULL,
  source TEXT,
  note TEXT,
  quote TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(party_id, question_id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_party_positions_party ON party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_question ON party_positions(question_id);

-- ========================================================================
-- 5. AJOUTER COLONNES MUNICIPALITY_ID AUX TABLES EXISTANTES
-- ========================================================================

-- Table user_sessions
ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
CREATE INDEX IF NOT EXISTS idx_user_sessions_municipality ON user_sessions(municipality_id);

-- Table user_responses
ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
CREATE INDEX IF NOT EXISTS idx_user_responses_municipality ON user_responses(municipality_id);

-- Table user_results
ALTER TABLE user_results ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);

-- Table user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
CREATE INDEX IF NOT EXISTS idx_user_profiles_municipality ON user_profiles(municipality_id);

-- ========================================================================
-- 6. ACTIVER ROW LEVEL SECURITY (RLS)
-- ========================================================================

-- Activer RLS sur les nouvelles tables
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_positions ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 7. CRÉER LES POLITIQUES RLS (LECTURE PUBLIQUE)
-- ========================================================================

-- Politique pour municipalities - Lecture publique
CREATE POLICY "Municipalités publiquement lisibles"
  ON municipalities
  FOR SELECT
  USING (true);

-- Politique pour questions - Lecture publique
CREATE POLICY "Questions publiquement lisibles"
  ON questions
  FOR SELECT
  USING (true);

-- Politique pour parties - Lecture publique
CREATE POLICY "Partis publiquement lisibles"
  ON parties
  FOR SELECT
  USING (true);

-- Politique pour party_positions - Lecture publique
CREATE POLICY "Positions publiquement lisibles"
  ON party_positions
  FOR SELECT
  USING (true);

-- ========================================================================
-- 8. CRÉER LES FONCTIONS DE MISE À JOUR AUTOMATIQUE
-- ========================================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
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
-- 9. INSÉRER LES MUNICIPALITÉS SUPPORTÉES
-- ========================================================================

INSERT INTO municipalities (id, name, code, population, is_active) VALUES
  ('quebec', 'Ville de Québec', 'QUEBEC', 549459, true),
  ('montreal', 'Ville de Montréal', 'MONTREAL', 1780000, true),
  ('laval', 'Ville de Laval', 'LAVAL', 438366, true),
  ('gatineau', 'Ville de Gatineau', 'GATINEAU', 291041, true),
  ('longueuil', 'Ville de Longueuil', 'LONGUEUIL', 254483, true),
  ('levis', 'Ville de Lévis', 'LEVIS', 149683, true)
ON CONFLICT (id) DO NOTHING;

-- ========================================================================
-- 10. MIGRER LES DONNÉES EXISTANTES VERS QUÉBEC
-- ========================================================================

-- Mettre à jour les sessions existantes pour Québec
UPDATE user_sessions
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- Mettre à jour les réponses existantes pour Québec
UPDATE user_responses
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- Mettre à jour les résultats existants pour Québec
UPDATE user_results
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- Mettre à jour les profils existants pour Québec
UPDATE user_profiles
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- ========================================================================
-- 11. CRÉER UNE VUE POUR FACILITER LES REQUÊTES
-- ========================================================================

-- Vue pour récupérer tous les partis avec leurs positions
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

-- Vue pour récupérer les questions avec leur ordre
CREATE OR REPLACE VIEW questions_ordered_view AS
SELECT
  q.*,
  m.name as municipality_name
FROM questions q
LEFT JOIN municipalities m ON q.municipality_id = m.id
ORDER BY q.order_index, q.id;

-- ========================================================================
-- 12. MESSAGE DE CONFIRMATION
-- ========================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Tables créées avec succès!';
  RAISE NOTICE '✅ Municipalités insérées';
  RAISE NOTICE '✅ Politiques RLS configurées';
  RAISE NOTICE '✅ Triggers et vues créés';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 02_insert_questions_data.sql';
END
$$;