-- Script SQL pour créer la table des résultats partagés dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- Table pour stocker les résultats partagés
CREATE TABLE IF NOT EXISTS shared_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    share_id TEXT UNIQUE NOT NULL,
    share_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'), -- Expiration automatique après 30 jours
    access_count INTEGER DEFAULT 0, -- Compteur d'accès pour statistiques
    last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_shared_results_share_id ON shared_results(share_id);
CREATE INDEX IF NOT EXISTS idx_shared_results_expires ON shared_results(expires_at);
CREATE INDEX IF NOT EXISTS idx_shared_results_created ON shared_results(created_at);

-- Politique RLS pour accès public en lecture (pour les partages)
CREATE POLICY IF NOT EXISTS "Public read access for shared results" 
ON shared_results FOR SELECT 
USING (expires_at > NOW()); -- Seulement les résultats non expirés

-- Activer RLS sur la table
ALTER TABLE shared_results ENABLE ROW LEVEL SECURITY;

-- Fonction pour nettoyer automatiquement les résultats expirés (optionnel)
CREATE OR REPLACE FUNCTION cleanup_expired_shared_results()
RETURNS void AS $$
BEGIN
    DELETE FROM shared_results 
    WHERE expires_at < NOW() - INTERVAL '7 days'; -- Garde 7 jours de grâce après expiration
END;
$$ LANGUAGE plpgsql;

-- Commentaires pour documenter la table
COMMENT ON TABLE shared_results IS 'Résultats de boussole partagés publiquement avec expiration automatique';
COMMENT ON COLUMN shared_results.share_id IS 'Identifiant unique du partage (ex: 1749601189696-6zzidzl1g)';
COMMENT ON COLUMN shared_results.share_data IS 'Données complètes du partage au format JSON';
COMMENT ON COLUMN shared_results.expires_at IS 'Date d\'expiration automatique (30 jours par défaut)';
COMMENT ON COLUMN shared_results.access_count IS 'Nombre de fois que le partage a été consulté'; 