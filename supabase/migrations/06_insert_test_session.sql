-- Migration: Insérer session TEST fixe pour les tests
-- Date: 2025-01-22
-- Description: Créer une session permanente pour les tests avec UUID prévisible

-- Insérer la session TEST si elle n'existe pas déjà
INSERT INTO public.user_sessions (
  id,
  session_token,
  ip_address,
  user_agent,
  created_at,
  updated_at,
  expires_at,
  municipality_id
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'TEST_TOKEN_STATIC',
  '127.0.0.1'::inet,
  'Test Agent - Boussole Municipale',
  '2025-01-01 00:00:00+00',
  '2025-01-01 00:00:00+00',
  '2030-12-31 23:59:59+00', -- Expiration dans le futur lointain
  'quebec' -- Municipality par défaut pour les tests
)
ON CONFLICT (session_token) DO NOTHING;

-- Vérifier que la session a été créée
SELECT
  id,
  session_token,
  municipality_id,
  created_at
FROM public.user_sessions
WHERE session_token = 'TEST_TOKEN_STATIC';