-- ========================================================================
-- MIGRATION 9: CRÉER LA TABLE LEADERS POUR MULTI-MUNICIPALITÉS
-- ========================================================================
-- Date: 2025-09-30
-- Description: Création de la table leaders pour gérer les profils enrichis
--              des leaders politiques municipaux avec biographies complètes
-- ========================================================================

-- ========================================================================
-- 1. CRÉER LA TABLE LEADERS
-- ========================================================================
CREATE TABLE IF NOT EXISTS leaders (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  party_id VARCHAR REFERENCES parties(id) ON DELETE CASCADE,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,

  -- Profil enrichi
  biography TEXT,
  photo_url VARCHAR,
  experience JSONB DEFAULT '[]'::jsonb,  -- Array de strings
  vision_2025 TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,  -- Array de strings

  -- Réseaux sociaux et liens
  website_url VARCHAR,
  facebook_url VARCHAR,
  twitter_url VARCHAR,
  linkedin_url VARCHAR,

  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte d'unicité : un leader par slug par municipalité
  UNIQUE(municipality_id, slug)
);

-- ========================================================================
-- 2. CRÉER LES INDEX POUR PERFORMANCE
-- ========================================================================
CREATE INDEX IF NOT EXISTS idx_leaders_municipality ON leaders(municipality_id);
CREATE INDEX IF NOT EXISTS idx_leaders_party ON leaders(party_id);
CREATE INDEX IF NOT EXISTS idx_leaders_slug ON leaders(slug);
CREATE INDEX IF NOT EXISTS idx_leaders_name ON leaders(name);

-- ========================================================================
-- 3. ACTIVER ROW LEVEL SECURITY (RLS)
-- ========================================================================
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique
CREATE POLICY "Leaders publiquement lisibles"
  ON leaders
  FOR SELECT
  USING (true);

-- ========================================================================
-- 4. CRÉER LA FONCTION ET TRIGGER POUR MISE À JOUR AUTOMATIQUE
-- ========================================================================

-- Créer la fonction si elle n'existe pas déjà
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer le trigger
CREATE TRIGGER update_leaders_updated_at
  BEFORE UPDATE ON leaders
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 5. AJOUTER COLONNE leader_id À LA TABLE PARTIES (OPTIONNEL)
-- ========================================================================
-- Cette colonne crée un lien bidirectionnel entre parti et leader
-- Utile pour retrouver rapidement le leader principal d'un parti
ALTER TABLE parties ADD COLUMN IF NOT EXISTS leader_id VARCHAR REFERENCES leaders(id);

-- ========================================================================
-- 6. CRÉER UNE VUE POUR FACILITER LES REQUÊTES
-- ========================================================================
CREATE OR REPLACE VIEW leaders_complete_view AS
SELECT
  l.*,
  p.name as party_name,
  p.short_name as party_short_name,
  p.logo_url as party_logo_url,
  p.orientation as party_orientation,
  m.name as municipality_name
FROM leaders l
LEFT JOIN parties p ON l.party_id = p.id
LEFT JOIN municipalities m ON l.municipality_id = m.id;

-- ========================================================================
-- 7. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Table leaders créée avec succès!';
  RAISE NOTICE '✅ Index de performance ajoutés';
  RAISE NOTICE '✅ Politique RLS configurée';
  RAISE NOTICE '✅ Vue leaders_complete_view créée';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 10_insert_leaders_data.sql';
END
$$;