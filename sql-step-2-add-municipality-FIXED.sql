-- ========================================================================
-- ÉTAPE 2: AJOUTER MUNICIPALITY_ID AUX TABLES POLITIQUES EXISTANTES (CORRIGÉ)
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS l'étape 1
-- ========================================================================

-- 1. Vérifier la structure des tables existantes
SELECT
  'questions' as table_name,
  COUNT(*) as row_count,
  'Table existante avec données' as status
FROM questions

UNION ALL

SELECT
  'parties' as table_name,
  COUNT(*) as row_count,
  'Table existante avec données' as status
FROM parties

UNION ALL

SELECT
  'party_positions' as table_name,
  COUNT(*) as row_count,
  'Table existante avec données' as status
FROM party_positions;

-- 2. Ajouter municipality_id à la table questions
ALTER TABLE questions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 3. Ajouter municipality_id à la table parties
ALTER TABLE parties ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;

-- 4. Ajouter les contraintes de clé étrangère (avec gestion d'erreur)
DO $$
BEGIN
  -- Contrainte pour questions
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_questions_municipality'
    AND table_name = 'questions'
  ) THEN
    ALTER TABLE questions
    ADD CONSTRAINT fk_questions_municipality
    FOREIGN KEY (municipality_id) REFERENCES municipalities(id);
    RAISE NOTICE '✅ Contrainte fk_questions_municipality ajoutée';
  ELSE
    RAISE NOTICE '⚠️ Contrainte fk_questions_municipality existe déjà';
  END IF;

  -- Contrainte pour parties
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_parties_municipality'
    AND table_name = 'parties'
  ) THEN
    ALTER TABLE parties
    ADD CONSTRAINT fk_parties_municipality
    FOREIGN KEY (municipality_id) REFERENCES municipalities(id);
    RAISE NOTICE '✅ Contrainte fk_parties_municipality ajoutée';
  ELSE
    RAISE NOTICE '⚠️ Contrainte fk_parties_municipality existe déjà';
  END IF;
END $$;

-- 5. Migrer TOUTES les données existantes vers quebec
UPDATE questions
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

UPDATE parties
SET municipality_id = 'quebec'
WHERE municipality_id IS NULL;

-- 6. Créer les index pour performance
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);

-- 7. Vérifier les résultats de la migration
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

-- 8. Afficher un échantillon des données migrées
SELECT
  'QUESTIONS migrées vers Québec:' as info,
  id,
  LEFT(text, 40) || '...' as text_preview,
  municipality_id
FROM questions
WHERE municipality_id = 'quebec'
ORDER BY id
LIMIT 5;

-- 9. Afficher les partis migrés
SELECT
  'PARTIS migrés vers Québec:' as info,
  id,
  name,
  municipality_id
FROM parties
WHERE municipality_id = 'quebec'
ORDER BY name;

-- 10. Message de confirmation final
SELECT '🎉 Migration des tables existantes terminée ! Toutes les données sont assignées à Québec.' as final_status;