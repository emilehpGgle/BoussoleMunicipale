-- ========================================================================
-- REBUILD 09: INSÉRER LES DONNÉES DES MUNICIPALITÉS
-- ========================================================================
-- Données: 6 municipalités du Québec
-- Ordre d'exécution: 9/16
-- Dépendances: 01_create_core_tables.sql + 04_rls_public_tables.sql
-- ========================================================================

-- ========================================================================
-- 1. INSÉRER LES 6 MUNICIPALITÉS SUPPORTÉES
-- ========================================================================
INSERT INTO municipalities (id, name, code, population, is_active) VALUES
  ('quebec', 'Ville de Québec', 'QUEBEC', 549459, true),
  ('montreal', 'Ville de Montréal', 'MONTREAL', 1780000, true),
  ('laval', 'Ville de Laval', 'LAVAL', 438366, true),
  ('gatineau', 'Ville de Gatineau', 'GATINEAU', 291041, true),
  ('longueuil', 'Ville de Longueuil', 'LONGUEUIL', 254483, true),
  ('levis', 'Ville de Lévis', 'LEVIS', 149683, true)
ON CONFLICT (id) DO NOTHING;

-- ========================================================================
-- 2. VÉRIFICATION DES DONNÉES
-- ========================================================================
DO $$
DECLARE
  municipality_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO municipality_count FROM municipalities;

  RAISE NOTICE '✅ Fichier 09: Données municipalités insérées!';
  RAISE NOTICE '   - Total: % municipalités', municipality_count;
  RAISE NOTICE '   - Québec (549,459 habitants)';
  RAISE NOTICE '   - Montréal (1,780,000 habitants)';
  RAISE NOTICE '   - Laval (438,366 habitants)';
  RAISE NOTICE '   - Gatineau (291,041 habitants)';
  RAISE NOTICE '   - Longueuil (254,483 habitants)';
  RAISE NOTICE '   - Lévis (149,683 habitants)';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 10_data_questions_quebec.sql';
END
$$;
