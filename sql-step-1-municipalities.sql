-- ========================================================================
-- ÉTAPE 1: CRÉER UNIQUEMENT LA TABLE MUNICIPALITIES
-- ========================================================================
-- À exécuter dans Supabase SQL Editor
-- ========================================================================

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

-- 2. Insérer les 6 municipalités
INSERT INTO municipalities (id, name, code, population, is_active) VALUES
  ('quebec', 'Ville de Québec', 'QUEBEC', 549459, true),
  ('montreal', 'Ville de Montréal', 'MONTREAL', 1780000, true),
  ('laval', 'Ville de Laval', 'LAVAL', 438366, true),
  ('gatineau', 'Ville de Gatineau', 'GATINEAU', 291041, true),
  ('longueuil', 'Ville de Longueuil', 'LONGUEUIL', 254483, true),
  ('levis', 'Ville de Lévis', 'LEVIS', 149683, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Vérifier les résultats
SELECT
  '✅ Table municipalities créée' as status,
  COUNT(*) as total_municipalities
FROM municipalities;

-- 4. Afficher toutes les municipalités
SELECT * FROM municipalities ORDER BY name;