-- Migration: Ajout d'index de performance pour les requêtes par municipality_id
-- Créé pour résoudre les problèmes de performance des APIs Questions/Parties

-- Index pour la table questions (actuellement 4272ms -> cible <1000ms)
CREATE INDEX IF NOT EXISTS idx_questions_municipality_id
ON questions(municipality_id);

-- Index pour la table parties (actuellement 1714ms -> cible <1000ms)
CREATE INDEX IF NOT EXISTS idx_parties_municipality_id
ON parties(municipality_id);

-- Index pour la table party_positions (déjà rapide mais par sécurité)
CREATE INDEX IF NOT EXISTS idx_party_positions_municipality_id
ON party_positions(municipality_id);

-- Index composite pour optimiser les requêtes avec order by
CREATE INDEX IF NOT EXISTS idx_questions_municipality_order
ON questions(municipality_id, order_index);

CREATE INDEX IF NOT EXISTS idx_parties_municipality_name
ON parties(municipality_id, name);

-- Analyse des tables pour optimiser le query planner
ANALYZE questions;
ANALYZE parties;
ANALYZE party_positions;