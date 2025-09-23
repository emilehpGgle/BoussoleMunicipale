-- Script de création des tables pour l'architecture multi-municipalités
-- À exécuter dans Supabase SQL Editor

-- 1. Créer la table municipalities
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

-- 2. Créer la table questions si elle n'existe pas
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR NOT NULL,
  response_type VARCHAR NOT NULL,
  description TEXT,
  response_format VARCHAR DEFAULT 'standard',
  agreement_options JSONB,
  importance_options JSONB,
  importance_direct_options JSONB,
  priority_options JSONB,
  custom_agreement_labels JSONB,
  custom_importance_direct_labels JSONB,
  order_index INTEGER,
  municipality_id VARCHAR REFERENCES municipalities(id),
  is_generic BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Créer la table parties si elle n'existe pas
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
  municipality_id VARCHAR REFERENCES municipalities(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Créer la table party_positions si elle n'existe pas
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

-- 5. Ajouter les colonnes municipality_id aux tables existantes si elles n'existent pas
ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
ALTER TABLE user_results ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 6. Créer les index pour performance
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_party ON party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_question ON party_positions(question_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_municipality ON user_sessions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_municipality ON user_responses(municipality_id);
CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);

-- 7. Insérer les municipalités supportées
INSERT INTO municipalities (id, name, code, population, is_active) VALUES
  ('quebec', 'Ville de Québec', 'QUEBEC', 549459, true),
  ('montreal', 'Ville de Montréal', 'MONTREAL', 1780000, true),
  ('laval', 'Ville de Laval', 'LAVAL', 438366, true),
  ('gatineau', 'Ville de Gatineau', 'GATINEAU', 291041, true),
  ('longueuil', 'Ville de Longueuil', 'LONGUEUIL', 254483, true),
  ('levis', 'Ville de Lévis', 'LEVIS', 149683, true)
ON CONFLICT (id) DO NOTHING;

-- 8. Mettre à jour les sessions existantes pour Québec
UPDATE user_sessions
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- 9. Mettre à jour les réponses existantes pour Québec
UPDATE user_responses
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- 10. Mettre à jour les résultats existants pour Québec
UPDATE user_results
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- 11. Activer Row Level Security (RLS) sur les nouvelles tables
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_positions ENABLE ROW LEVEL SECURITY;

-- 12. Créer les politiques RLS (lecture publique)
CREATE POLICY "Municipalités publiquement lisibles" ON municipalities
  FOR SELECT USING (true);

CREATE POLICY "Questions publiquement lisibles" ON questions
  FOR SELECT USING (true);

CREATE POLICY "Partis publiquement lisibles" ON parties
  FOR SELECT USING (true);

CREATE POLICY "Positions publiquement lisibles" ON party_positions
  FOR SELECT USING (true);

-- Message de confirmation
SELECT 'Tables créées avec succès!' AS message;