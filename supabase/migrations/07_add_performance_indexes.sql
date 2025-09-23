-- Migration: Ajouter index pour optimiser les performances des requêtes par municipality_id
-- Date: 2025-01-22
-- Description: Index pour accélération des APIs Questions et Parties

-- Index pour table questions sur municipality_id (si pas déjà existant)
CREATE INDEX IF NOT EXISTS idx_questions_municipality_perf
ON public.questions USING btree (municipality_id);

-- Index pour table parties sur municipality_id (si pas déjà existant)
CREATE INDEX IF NOT EXISTS idx_parties_municipality_perf
ON public.parties USING btree (municipality_id);

-- Index composite pour questions (municipality_id + order_index) pour tri optimisé
CREATE INDEX IF NOT EXISTS idx_questions_municipality_order
ON public.questions USING btree (municipality_id, order_index);

-- Index composite pour party_positions via foreign key
CREATE INDEX IF NOT EXISTS idx_party_positions_party_municipality
ON public.party_positions USING btree (party_id);

-- Statistiques pour vérifier les performances
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN ('questions', 'parties', 'party_positions')
  AND indexname LIKE '%municipality%'
ORDER BY tablename, indexname;