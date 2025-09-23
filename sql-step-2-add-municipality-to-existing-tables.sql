-- ========================================================================
-- ÉTAPE 2: AJOUTER MUNICIPALITY_ID AUX TABLES POLITIQUES EXISTANTES
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS l'étape 1 et 1.5
-- ========================================================================

-- 1. Vérifier la structure des tables existantes
SELECT
  table_name,
  COUNT(*) as row_count,
  'Table existante avec données' as status
FROM (
  SELECT 'questions' as table_name, COUNT(*) as count FROM questions
  UNION ALL
  SELECT 'parties' as table_name, COUNT(*) as count FROM parties
  UNION ALL
  SELECT 'party_positions' as table_name, COUNT(*) as count FROM party_positions
) t(table_name, count)
GROUP BY table_name, count;

-- 2. Ajouter municipality_id à la table questions
ALTER TABLE questions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 3. Ajouter municipality_id à la table parties
ALTER TABLE parties ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 4. Ajouter municipality_id à la table party_positions
-- Note: party_positions n'a pas besoin de municipality_id directement car elle peut le récupérer via parties
-- Mais on peut l'ajouter pour optimiser les requêtes
-- ALTER TABLE party_positions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 5. Ajouter les contraintes de clé étrangère
ALTER TABLE questions
ADD CONSTRAINT IF NOT EXISTS fk_questions_municipality
FOREIGN KEY (municipality_id) REFERENCES municipalities(id);

ALTER TABLE parties
ADD CONSTRAINT IF NOT EXISTS fk_parties_municipality
FOREIGN KEY (municipality_id) REFERENCES municipalities(id);

-- 6. Migrer TOUTES les données existantes vers quebec
UPDATE questions
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

UPDATE parties
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- 7. Créer les index pour performance
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);

-- 8. Vérifier les résultats de la migration
SELECT
  'questions' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE municipality_id = 'quebec') as quebec_rows,
  COUNT(*) FILTER (WHERE municipality_id IS NULL) as null_rows
FROM questions

UNION ALL

SELECT
  'parties' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE municipality_id = 'quebec') as quebec_rows,
  COUNT(*) FILTER (WHERE municipality_id IS NULL) as null_rows
FROM parties

UNION ALL

SELECT
  'party_positions' as table_name,
  COUNT(*) as total_rows,
  NULL as quebec_rows,
  NULL as null_rows
FROM party_positions;

-- 9. Afficher un échantillon des données migrées
SELECT
  '✅ QUESTIONS migrées vers Québec:' as status,
  id,
  LEFT(text, 50) || '...' as text_preview,
  municipality_id
FROM questions
WHERE municipality_id = 'quebec'
ORDER BY order_index
LIMIT 5;

SELECT
  '✅ PARTIS migrés vers Québec:' as status,
  id,
  name,
  municipality_id
FROM parties
WHERE municipality_id = 'quebec'
ORDER BY name;

-- 10. Message de confirmation
SELECT '🎉 Migration des tables existantes terminée ! Toutes les données sont assignées à Québec.' as final_status;