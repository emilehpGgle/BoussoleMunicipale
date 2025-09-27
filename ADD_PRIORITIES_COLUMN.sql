-- Migration: Ajouter colonne priority_list à la table party_positions
-- Date: 2025-01-26
-- Objectif: Résoudre le problème des priorités des partis qui retournent des scores neutres à ~50%

-- Ajouter la nouvelle colonne priority_list de type JSONB
ALTER TABLE party_positions
ADD COLUMN priority_list JSONB;

-- Commentaire pour documenter l'usage de la colonne
COMMENT ON COLUMN party_positions.priority_list IS 'Liste des priorités du parti au format JSONB. Exemple: ["Transport et mobilité", "Logement abordable", "Environnement et espaces verts"]';

-- Index GIN pour optimiser les requêtes sur priority_list (supporté par JSONB)
CREATE INDEX IF NOT EXISTS idx_party_positions_priority_list
ON party_positions USING gin (priority_list);

-- Validation: Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'party_positions'
AND column_name = 'priority_list';