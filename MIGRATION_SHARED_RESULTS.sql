-- Script de migration pour corriger les politiques RLS de la table shared_results
-- À exécuter dans l'interface SQL de Supabase

-- 1. Créer la table shared_results si elle n'existe pas déjà
CREATE TABLE IF NOT EXISTS shared_results (
  id SERIAL PRIMARY KEY,
  share_id TEXT UNIQUE NOT NULL,
  share_data JSONB NOT NULL,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- 2. Activer RLS sur la table
ALTER TABLE shared_results ENABLE ROW LEVEL SECURITY;

-- 3. Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow public insert on shared_results" ON shared_results;
DROP POLICY IF EXISTS "Allow public read on shared_results" ON shared_results;
DROP POLICY IF EXISTS "Allow public update access count on shared_results" ON shared_results;

-- 4. Créer les nouvelles politiques pour l'accès public
-- Politique pour permettre l'insertion publique (création de partages)
CREATE POLICY "Allow public insert on shared_results" 
ON shared_results FOR INSERT 
WITH CHECK (true);

-- Politique pour permettre la lecture publique des résultats non expirés
CREATE POLICY "Allow public read on shared_results" 
ON shared_results FOR SELECT 
USING (expires_at > NOW());

-- Politique pour permettre la mise à jour publique du compteur d'accès
CREATE POLICY "Allow public update access count on shared_results" 
ON shared_results FOR UPDATE 
USING (expires_at > NOW())
WITH CHECK (expires_at > NOW());

-- 5. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_shared_results_share_id ON shared_results(share_id);
CREATE INDEX IF NOT EXISTS idx_shared_results_expires_at ON shared_results(expires_at);

-- 6. Commentaires pour documentation
COMMENT ON TABLE shared_results IS 'Table pour stocker les résultats partagés publiquement';
COMMENT ON COLUMN shared_results.share_id IS 'Identifiant unique du partage (généré côté client)';
COMMENT ON COLUMN shared_results.share_data IS 'Données du partage au format JSON';
COMMENT ON COLUMN shared_results.access_count IS 'Nombre de fois que le partage a été consulté';
COMMENT ON COLUMN shared_results.expires_at IS 'Date d\'expiration du partage (30 jours par défaut)';