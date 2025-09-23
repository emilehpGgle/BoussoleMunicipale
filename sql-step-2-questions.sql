-- ========================================================================
-- ÉTAPE 2: CRÉER LA TABLE QUESTIONS ET INSÉRER LES 21 QUESTIONS
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS l'étape 1
-- ========================================================================

-- 1. Créer la table questions
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR NOT NULL,
  response_type VARCHAR NOT NULL CHECK (response_type IN ('agreement', 'importance_direct', 'priority_ranking')),
  description TEXT,
  response_format VARCHAR DEFAULT 'standard',
  agreement_options JSONB,
  importance_options JSONB,
  importance_direct_options JSONB,
  priority_options JSONB,
  custom_agreement_labels JSONB,
  custom_importance_direct_labels JSONB,
  order_index INTEGER,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  is_generic BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Créer l'index pour performance
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);

-- 3. Insérer les 21 questions (seulement les 5 premières pour tester)
INSERT INTO questions (id, text, category, response_type, description, response_format, agreement_options, importance_options, importance_direct_options, priority_options, custom_agreement_labels, custom_importance_direct_labels, order_index, municipality_id, is_generic) VALUES

('q1_tramway', 'La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 0, 'quebec', false),

('q2_pistes_cyclables', 'La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.', 'Mobilité et transport', 'agreement', 'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 1, 'quebec', true),

('q3_troisieme_lien', 'La Ville de Québec devrait activement soutenir la réalisation d''un troisième lien routier entre Québec et Lévis.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 2, 'quebec', false),

('q4_priorite_mobilite_active', 'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 3, 'quebec', true),

('q5_quotas_logements_abordables', 'La municipalité devrait imposer des quotas de logements abordables dans tous les nouveaux projets de développement résidentiel.', 'Logement et aménagement', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 4, 'quebec', true)

ON CONFLICT (id) DO UPDATE SET
  text = EXCLUDED.text,
  category = EXCLUDED.category,
  response_type = EXCLUDED.response_type,
  description = EXCLUDED.description,
  response_format = EXCLUDED.response_format,
  agreement_options = EXCLUDED.agreement_options,
  importance_options = EXCLUDED.importance_options,
  importance_direct_options = EXCLUDED.importance_direct_options,
  priority_options = EXCLUDED.priority_options,
  custom_agreement_labels = EXCLUDED.custom_agreement_labels,
  custom_importance_direct_labels = EXCLUDED.custom_importance_direct_labels,
  order_index = EXCLUDED.order_index,
  municipality_id = EXCLUDED.municipality_id,
  is_generic = EXCLUDED.is_generic,
  updated_at = NOW();

-- 4. Vérifier les résultats
SELECT
  '✅ Table questions créée' as status,
  COUNT(*) as total_questions
FROM questions;

-- 5. Afficher les questions créées
SELECT id, LEFT(text, 50) || '...' as text_preview, category, municipality_id, order_index
FROM questions
ORDER BY order_index;