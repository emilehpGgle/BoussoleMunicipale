-- ========================================================================
-- REBUILD 08: ACTIVER RLS ET POLITIQUES POUR SHARED_RESULTS
-- ========================================================================
-- Tables: shared_results
-- Politique: Lecture publique + Insertion publique + Mise à jour publique
-- Ordre d'exécution: 8/16
-- Dépendances: 03_create_additional_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. ACTIVER ROW LEVEL SECURITY
-- ========================================================================
ALTER TABLE shared_results ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- 2. POLITIQUE: LECTURE PUBLIQUE DES RÉSULTATS NON-EXPIRÉS
-- ========================================================================
CREATE POLICY "Allow public read for non-expired shared results"
  ON shared_results
  FOR SELECT
  USING (expires_at > NOW() OR expires_at IS NULL);

-- ========================================================================
-- 3. POLITIQUE: PERMETTRE INSERTION PUBLIQUE (CRÉATION PARTAGE)
-- ========================================================================
CREATE POLICY "public_insert_shared_results"
  ON shared_results
  FOR INSERT
  TO public
  WITH CHECK (true);

-- ========================================================================
-- 4. POLITIQUE: LECTURE PUBLIQUE GLOBALE
-- ========================================================================
CREATE POLICY "public_read_shared_results"
  ON shared_results
  FOR SELECT
  TO public
  USING (true);

-- ========================================================================
-- 5. POLITIQUE: MISE À JOUR PUBLIQUE (COMPTEUR ACCÈS)
-- ========================================================================
CREATE POLICY "public_update_shared_results"
  ON shared_results
  FOR UPDATE
  TO public
  USING (true);

-- ========================================================================
-- 6. MESSAGE DE CONFIRMATION
-- ========================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Fichier 08: Politiques RLS shared_results activées!';
  RAISE NOTICE '   - shared_results: 4 politiques configurées';
  RAISE NOTICE '     • Lecture publique résultats non-expirés';
  RAISE NOTICE '     • Insertion publique (création partage)';
  RAISE NOTICE '     • Lecture publique globale';
  RAISE NOTICE '     • Mise à jour publique (compteur accès)';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 09_data_municipalities.sql';
END
$$;
