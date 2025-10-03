-- ========================================================================
-- REBUILD 03: CRÉER LES TABLES ADDITIONNELLES
-- ========================================================================
-- Tables: shared_results, leaders
-- Modifications: Ajouter colonne leader_id à parties
-- Ordre d'exécution: 3/16
-- Dépendances: 01_create_core_tables.sql (municipalities, parties)
-- ========================================================================

-- ========================================================================
-- 1. TABLE SHARED_RESULTS
-- ========================================================================
CREATE TABLE IF NOT EXISTS shared_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id TEXT UNIQUE NOT NULL,
  share_data JSONB NOT NULL,
  municipality_id VARCHAR NOT NULL REFERENCES municipalities(id),
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index shared_results
CREATE INDEX IF NOT EXISTS idx_shared_results_share_id ON shared_results(share_id);
CREATE INDEX IF NOT EXISTS idx_shared_results_expires ON shared_results(expires_at);
CREATE INDEX IF NOT EXISTS idx_shared_results_created ON shared_results(created_at);
CREATE INDEX IF NOT EXISTS idx_shared_results_municipality ON shared_results(municipality_id);

-- ========================================================================
-- 2. TABLE LEADERS
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
  experience JSONB DEFAULT '[]'::jsonb,
  vision_2025 TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,

  -- Réseaux sociaux et liens
  website_url VARCHAR,
  facebook_url VARCHAR,
  twitter_url VARCHAR,
  linkedin_url VARCHAR,

  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte unicité slug par municipalité
  UNIQUE(municipality_id, slug)
);

-- Index leaders
CREATE INDEX IF NOT EXISTS idx_leaders_municipality ON leaders(municipality_id);
CREATE INDEX IF NOT EXISTS idx_leaders_party ON leaders(party_id);
CREATE INDEX IF NOT EXISTS idx_leaders_slug ON leaders(slug);
CREATE INDEX IF NOT EXISTS idx_leaders_name ON leaders(name);

-- ========================================================================
-- 3. AJOUTER COLONNE leader_id À PARTIES (LIEN BIDIRECTIONNEL)
-- ========================================================================
ALTER TABLE parties ADD COLUMN IF NOT EXISTS leader_id VARCHAR REFERENCES leaders(id);

-- ========================================================================
-- 4. CRÉER TRIGGERS POUR updated_at
-- ========================================================================
CREATE TRIGGER update_shared_results_updated_at
  BEFORE UPDATE ON shared_results
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_leaders_updated_at
  BEFORE UPDATE ON leaders
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 5. CRÉER VUE COMPLÈTE LEADERS
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
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 03: Tables additionnelles créées avec succès!';
  RAISE NOTICE '   - shared_results (avec 4 index)';
  RAISE NOTICE '   - leaders (avec 4 index)';
  RAISE NOTICE '   - Colonne leader_id ajoutée à parties';
  RAISE NOTICE '   - Triggers updated_at configurés';
  RAISE NOTICE '   - Vue leaders_complete_view créée';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 04_rls_public_tables.sql';
END
$$;
