-- ========================================================================
-- CRÉER LES SESSIONS DE TEST POUR CHAQUE MUNICIPALITÉ
-- ========================================================================
-- À exécuter dans Supabase SQL Editor
-- ========================================================================

-- Insérer les sessions de test pour chaque municipalité
INSERT INTO user_sessions (id, session_token, ip_address, user_agent, municipality_id, expires_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'TEST_TOKEN_QUEBEC', '127.0.0.1'::inet, 'Test Agent Quebec', 'quebec', NOW() + INTERVAL '1 year'),
  ('00000000-0000-0000-0000-000000000002', 'TEST_TOKEN_MONTREAL', '127.0.0.1'::inet, 'Test Agent Montreal', 'montreal', NOW() + INTERVAL '1 year'),
  ('00000000-0000-0000-0000-000000000003', 'TEST_TOKEN_LAVAL', '127.0.0.1'::inet, 'Test Agent Laval', 'laval', NOW() + INTERVAL '1 year'),
  ('00000000-0000-0000-0000-000000000004', 'TEST_TOKEN_GATINEAU', '127.0.0.1'::inet, 'Test Agent Gatineau', 'gatineau', NOW() + INTERVAL '1 year'),
  ('00000000-0000-0000-0000-000000000005', 'TEST_TOKEN_LONGUEUIL', '127.0.0.1'::inet, 'Test Agent Longueuil', 'longueuil', NOW() + INTERVAL '1 year'),
  ('00000000-0000-0000-0000-000000000006', 'TEST_TOKEN_LEVIS', '127.0.0.1'::inet, 'Test Agent Levis', 'levis', NOW() + INTERVAL '1 year')
ON CONFLICT (id) DO UPDATE SET
  session_token = EXCLUDED.session_token,
  municipality_id = EXCLUDED.municipality_id,
  expires_at = EXCLUDED.expires_at,
  updated_at = NOW();

-- Vérification
SELECT id, session_token, municipality_id, expires_at FROM user_sessions 
WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000006'
)
ORDER BY id;
