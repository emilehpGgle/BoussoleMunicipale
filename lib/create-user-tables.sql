-- Script SQL pour créer les tables utilisateurs dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Table des sessions utilisateur
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 2. Table des réponses utilisateur
CREATE TABLE IF NOT EXISTS user_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    response_type TEXT NOT NULL CHECK (response_type IN ('agreement', 'importance', 'importance_direct')),
    agreement_value TEXT CHECK (agreement_value IN ('FA', 'PA', 'N', 'PD', 'FD', 'IDK')),
    importance_value INTEGER CHECK (importance_value BETWEEN 1 AND 5),
    importance_direct_value TEXT CHECK (importance_direct_value IN ('TI', 'AI', 'NI', 'PI', 'PTI', 'IDK')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, question_id, response_type)
);

-- 3. Table des profils utilisateur
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    profile_data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id)
);

-- 4. Table des résultats utilisateur
CREATE TABLE IF NOT EXISTS user_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    results_data JSONB NOT NULL,
    political_position JSONB, -- {x: number, y: number}
    completion_status TEXT DEFAULT 'partial' CHECK (completion_status IN ('partial', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_responses_session_id ON user_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_question_id ON user_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

-- Politiques RLS pour les tables publiques (lecture seule)
CREATE POLICY IF NOT EXISTS "Public read access" ON questions FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public read access" ON parties FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public read access" ON party_positions FOR SELECT USING (true);

-- Activer RLS sur les tables publiques
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_positions ENABLE ROW LEVEL SECURITY;

-- Commentaires pour documenter les tables
COMMENT ON TABLE user_sessions IS 'Sessions utilisateur anonymes avec tokens sécurisés';
COMMENT ON TABLE user_responses IS 'Réponses des utilisateurs aux questions du questionnaire';
COMMENT ON TABLE user_profiles IS 'Profils démographiques des utilisateurs (format JSONB)';
COMMENT ON TABLE user_results IS 'Résultats calculés et positions politiques des utilisateurs';

COMMENT ON COLUMN user_profiles.profile_data IS 'Données de profil au format JSON: {age, gender, occupation, postalCode, district, etc.}';
COMMENT ON COLUMN user_results.results_data IS 'Résultats calculés: {partyScores, sortedParties, topMatches, etc.}';
COMMENT ON COLUMN user_results.political_position IS 'Position sur la carte politique: {x, y}';

-- Mettre à jour le script SQL pour inclure un exemple de structure de profil
/*
Exemple de structure profile_data :
{
  "age": "25-34 ans",
  "gender": "Femme",
  "occupation": "Enseignant",
  "postalCode": "G1A 1A1",
  "district": "La Cité-Limoilou", 
  "residenceArea": "La Cité-Limoilou",
  "politicalInterest": "Moyennement intéressé",
  "previousVoting": "Toujours",
  "mainConcerns": ["Transport", "Environnement"],
  "informationSources": ["Médias sociaux", "Journaux"],
  "location": {
    "postalCode": "G1A 1A1",
    "district": "La Cité-Limoilou",
    "coordinates": {"lat": 46.8139, "lng": -71.2080}
  }
}
*/ 