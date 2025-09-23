-- ========================================================================
-- MIGRATION COMPLÈTE BOUSSOLE MUNICIPALE - ARCHITECTURE MULTI-VILLES
-- ========================================================================
-- À COPIER-COLLER directement dans Supabase SQL Editor
-- Exécute TOUT en une seule fois : tables, données, partis, positions
-- Date: 2025-09-21
-- ========================================================================

-- ========================================================================
-- 1. CRÉER LES TABLES DE BASE
-- ========================================================================

-- Table municipalities
CREATE TABLE IF NOT EXISTS municipalities (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  code VARCHAR UNIQUE NOT NULL,
  province VARCHAR DEFAULT 'QC',
  population INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table questions
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

-- Table parties
CREATE TABLE IF NOT EXISTS parties (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  short_name VARCHAR,
  leader VARCHAR NOT NULL,
  logo_url VARCHAR,
  color VARCHAR,
  website_url VARCHAR,
  orientation VARCHAR,
  main_ideas_summary TEXT,
  strengths JSONB,
  reserves JSONB,
  priorities JSONB,
  municipality_id VARCHAR REFERENCES municipalities(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table party_positions
CREATE TABLE IF NOT EXISTS party_positions (
  id SERIAL PRIMARY KEY,
  party_id VARCHAR REFERENCES parties(id) ON DELETE CASCADE,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  position VARCHAR NOT NULL,
  source TEXT,
  note TEXT,
  quote TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(party_id, question_id)
);

-- ========================================================================
-- 2. AJOUTER COLONNES AUX TABLES EXISTANTES
-- ========================================================================

-- Ajouter municipality_id aux tables utilisateur (si elles existent)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
    ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses') THEN
    ALTER TABLE user_responses ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results') THEN
    ALTER TABLE user_results ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
    ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS municipality_id VARCHAR;
  END IF;
END $$;

-- ========================================================================
-- 3. CRÉER LES INDEX POUR PERFORMANCE
-- ========================================================================

CREATE INDEX IF NOT EXISTS idx_municipalities_active ON municipalities(is_active);
CREATE INDEX IF NOT EXISTS idx_questions_municipality ON questions(municipality_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_parties_municipality ON parties(municipality_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_party ON party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_question ON party_positions(question_id);

-- Index sur les tables utilisateur (si elles existent)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
    CREATE INDEX IF NOT EXISTS idx_user_sessions_municipality ON user_sessions(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses') THEN
    CREATE INDEX IF NOT EXISTS idx_user_responses_municipality ON user_responses(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results') THEN
    CREATE INDEX IF NOT EXISTS idx_user_results_municipality ON user_results(municipality_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
    CREATE INDEX IF NOT EXISTS idx_user_profiles_municipality ON user_profiles(municipality_id);
  END IF;
END $$;

-- ========================================================================
-- 4. CONFIGURER RLS ET SÉCURITÉ
-- ========================================================================

-- Activer RLS
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_positions ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Municipalités publiquement lisibles" ON municipalities FOR SELECT USING (true);
CREATE POLICY "Questions publiquement lisibles" ON questions FOR SELECT USING (true);
CREATE POLICY "Partis publiquement lisibles" ON parties FOR SELECT USING (true);
CREATE POLICY "Positions publiquement lisibles" ON party_positions FOR SELECT USING (true);

-- ========================================================================
-- 5. INSÉRER LES MUNICIPALITÉS
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
-- 6. MIGRER LES DONNÉES UTILISATEUR EXISTANTES
-- ========================================================================

-- Mettre à jour vers Québec par défaut
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
    UPDATE user_sessions SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_responses') THEN
    UPDATE user_responses SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_results') THEN
    UPDATE user_results SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
    UPDATE user_profiles SET municipality_id = 'quebec' WHERE municipality_id IS NULL;
  END IF;
END $$;

-- ========================================================================
-- 7. INSÉRER LES 21 QUESTIONS
-- ========================================================================

INSERT INTO questions (id, text, category, response_type, description, response_format, agreement_options, importance_options, importance_direct_options, priority_options, custom_agreement_labels, custom_importance_direct_labels, order_index, municipality_id, is_generic) VALUES

('q1_tramway', 'La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 0, 'quebec', false),

('q2_pistes_cyclables', 'La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.', 'Mobilité et transport', 'agreement', 'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 1, 'quebec', true),

('q3_troisieme_lien', 'La Ville de Québec devrait activement soutenir la réalisation d''un troisième lien routier entre Québec et Lévis.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 2, 'quebec', false),

('q4_priorite_mobilite_active', 'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 3, 'quebec', true),

('q5_quotas_logements_abordables', 'La municipalité devrait imposer des quotas de logements abordables dans tous les nouveaux projets de développement résidentiel.', 'Logement et aménagement', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 4, 'quebec', true),

('q6_reduction_depenses_taxes', 'Il est prioritaire de réduire les dépenses municipales pour éviter une hausse des taxes foncières.', 'Finances municipales', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 5, 'quebec', true),

('q7_immeubles_grande_hauteur', 'La municipalité devrait autoriser la construction d''immeubles de plus grande hauteur pour répondre aux besoins en logement, même dans les quartiers historiques.', 'Logement et aménagement', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 6, 'quebec', true),

('q8_interdire_essence_centre_ville', 'La Ville devrait interdire l''accès des véhicules à essence dans certaines zones du centre-ville d''ici 2030.', 'Environnement et énergie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 7, 'quebec', true),

('q9_protection_espaces_verts', 'Il est important de protéger les espaces verts et les milieux naturels, même si cela limite le développement urbain.', 'Environnement et énergie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 8, 'quebec', true),

('q10_transition_carboneutre', 'La municipalité devrait exiger que tous les nouveaux bâtiments soient carboneutres d''ici 2030, même si cela augmente les coûts de construction.', 'Environnement et énergie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 9, 'quebec', true),

('q11_reduction_dechets', 'Améliorer la collecte des ordures et du recyclage devrait être une priorité, même si cela nécessite des investissements importants.', 'Environnement et énergie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 10, 'quebec', true),

('q12_augmentation_taxes', 'La municipalité devrait augmenter les taxes foncières pour financer des projets écoresponsables, même si cela affecte le budget des citoyens.', 'Environnement et énergie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 11, 'quebec', true),

('q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient avoir plus de pouvoir décisionnel sur les projets qui affectent leur secteur.', 'Gouvernance et participation', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 12, 'quebec', true),

('q14_reduction_dette', 'Réduire la dette municipale devrait être une priorité, même si cela nécessite de reporter certains projets.', 'Finances municipales', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 13, 'quebec', true),

('q15_avantages_fiscaux_entreprises', 'La municipalité devrait offrir des avantages fiscaux aux entreprises pour les attirer, même si cela réduit les revenus municipaux à court terme.', 'Développement économique', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 14, 'quebec', true),

('q16_limitation_touristes', 'La municipalité devrait limiter le nombre de touristes dans certains secteurs pour préserver la qualité de vie des résidents.', 'Développement économique', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 15, 'quebec', true),

('q17_soutien_organismes_communautaires', 'La municipalité devrait augmenter le financement des organismes communautaires, même si cela nécessite une hausse des taxes.', 'Services sociaux et communautaires', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 16, 'quebec', true),

('q18_augmentation_effectifs_policiers', 'La municipalité devrait augmenter les effectifs policiers pour améliorer la sécurité, même si cela nécessite des investissements importants.', 'Sécurité publique', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 17, 'quebec', true),

('q19_investissement_infrastructures_loisirs_sportives', 'Il est important d''investir davantage dans les parcs, arénas et installations sportives, même si cela augmente les dépenses municipales.', 'Services sociaux et communautaires', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 18, 'quebec', true),

('q20_protection_patrimoine', 'La protection du patrimoine architectural et historique devrait être une priorité, même si cela limite les possibilités de développement.', 'Logement et aménagement', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]', '[5, 4, 3, 2, 1]', NULL, NULL, NULL, NULL, 19, 'quebec', true),

('q21_priorites_municipales', 'Classez par ordre d''importance les enjeux suivants pour votre municipalité', 'Gouvernance et participation', 'priority_ranking', NULL, 'priority', NULL, NULL, NULL, '["Transport et mobilité", "Logement abordable", "Environnement et développement durable", "Sécurité publique", "Développement économique", "Services municipaux", "Finances municipales"]', NULL, NULL, 20, 'quebec', true)

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

-- ========================================================================
-- 8. INSÉRER LES 7 PARTIS POLITIQUES
-- ========================================================================

INSERT INTO parties (id, name, short_name, leader, logo_url, color, website_url, orientation, main_ideas_summary, strengths, reserves, priorities, municipality_id) VALUES

('equipe_labeaume', 'Équipe Labeaume', 'EL', 'Régis Labeaume', '/logos/equipe-labeaume.png', '#004b9f', 'https://www.equipelabeaume.com/', 'Centre-droit, pragmatique', 'Centre-droit, pragmatique avec une approche gestionnaire. Met l''accent sur les grands projets structurants, la rigueur budgétaire et le développement économique. Favorise une gouvernance efficace et des investissements ciblés.', '["Leadership reconnu", "Projets structurants", "Gestion rigoureuse"]', '["Participation citoyenne limitée", "Approche parfois autoritaire"]', '["Grands projets", "Développement économique", "Gestion des finances"]', 'quebec'),

('equipe_marie_josee_savard', 'Équipe Marie-Josée Savard', 'EMJS', 'Marie-Josée Savard', '/logos/equipe-marie-josee-savard.png', '#e74c3c', 'https://www.mariejoséesavard.ca/', 'Centre, continuité', 'Centre, continuité avec une approche consensuelle. Privilégie le dialogue, la concertation et la gestion prudente. Met l''accent sur les services aux citoyens et la qualité de vie.', '["Continuité et stabilité", "Dialogue et concertation", "Expérience administrative"]', '["Vision parfois floue", "Manque d''audace"]', '["Services aux citoyens", "Qualité de vie", "Gestion prudente"]', 'quebec'),

('democratie_quebec', 'Démocratie Québec', 'DQ', 'Jean-François Gosselin', '/logos/democratie-quebec.png', '#2ecc71', 'https://www.democratiequebec.qc.ca/', 'Centre-gauche, participatif', 'Centre-gauche, participatif avec un fort accent sur la démocratie participative. Prône la transparence, l''écoute citoyenne et une approche plus inclusive de la gouvernance municipale.', '["Démocratie participative", "Transparence", "Écoute citoyenne"]', '["Manque d''expérience", "Vision parfois idéaliste"]', '["Participation citoyenne", "Transparence", "Environnement"]', 'quebec'),

('transition_quebec', 'Transition Québec', 'TQ', 'Jackie Smith', '/logos/transition-quebec.png', '#27ae60', 'https://www.transitionquebec.ca/', 'Gauche, écologiste', 'Gauche, écologiste avec une vision progressive du développement urbain. Met l''accent sur la transition écologique, la justice sociale et l''innovation en matière de développement durable.', '["Vision écologique", "Innovation sociale", "Approche progressive"]', '["Manque d''expérience politique", "Vision parfois utopique"]', '["Transition écologique", "Justice sociale", "Transport collectif"]', 'quebec'),

('quebec_21', 'Québec 21', 'Q21', 'Jean Rousseau', '/logos/quebec-21.png', '#9b59b6', 'https://www.quebec21.org/', 'Centre-droit, conservateur', 'Centre-droit, conservateur avec une approche traditionaliste. Privilégie la prudence fiscale, le respect des valeurs traditionnelles et une gouvernance plus conservative.', '["Prudence fiscale", "Valeurs traditionnelles", "Gestion conservative"]', '["Vision parfois rigide", "Manque d''innovation"]', '["Finances municipales", "Sécurité publique", "Tradition"]', 'quebec'),

('quebec_dabord', 'Québec d''abord', 'QD', 'Claude Villeneuve', '/logos/quebec-dabord-new.png', '#00aef0', 'https://quebecdabord.com/', 'Centre, pragmatique', 'Centre, pragmatique avec une approche équilibrée. Met l''accent sur les besoins concrets des citoyens, la proximité et une gestion pragmatique des enjeux municipaux.', '["Continuité gestionnaire", "Proximité citoyenne"]', '["Positions peu documentées", "Visibilité limitée"]', '["Services municipaux", "Transport et mobilité", "Logement abordable"]', 'quebec'),

('renouveau_municipal_quebec', 'Renouveau municipal de Québec', 'RMQ', 'Sylvain Légaré', '/logos/renouveau-municipal-quebec.png', '#f39c12', 'https://www.renouveauquebec.org/', 'Centre-droit, réformiste', 'Centre-droit, réformiste avec une vision de modernisation. Prône le renouveau des pratiques municipales, l''efficacité gouvernementale et l''innovation dans la prestation de services.', '["Vision de renouveau", "Modernisation", "Efficacité"]', '["Manque d''expérience", "Vision parfois vague"]', '["Renouveau des pratiques", "Efficacité", "Innovation"]', 'quebec')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  leader = EXCLUDED.leader,
  logo_url = EXCLUDED.logo_url,
  color = EXCLUDED.color,
  website_url = EXCLUDED.website_url,
  orientation = EXCLUDED.orientation,
  main_ideas_summary = EXCLUDED.main_ideas_summary,
  strengths = EXCLUDED.strengths,
  reserves = EXCLUDED.reserves,
  priorities = EXCLUDED.priorities,
  municipality_id = EXCLUDED.municipality_id,
  updated_at = NOW();

-- ========================================================================
-- 9. INSÉRER TOUTES LES POSITIONS DES PARTIS (147 POSITIONS)
-- ========================================================================

-- Positions d'Équipe Labeaume
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('equipe_labeaume', 'q1_tramway', 'FA', 'Programme 2021 et déclarations publiques', 'Projet phare de l''administration, investissement majeur approuvé'),
('equipe_labeaume', 'q2_pistes_cyclables', 'PA', 'Réalisations et projets', 'Développement mesuré du réseau cyclable'),
('equipe_labeaume', 'q3_troisieme_lien', 'PA', 'Positions publiques récurrentes', 'Soutien au projet de tunnel'),
('equipe_labeaume', 'q4_priorite_mobilite_active', 'N', 'Approche équilibrée transport', 'Équilibre entre différents modes de transport'),
('equipe_labeaume', 'q5_quotas_logements_abordables', 'N', 'Politique de logement', 'Approche incitative plutôt que contraignante'),
('equipe_labeaume', 'q6_reduction_depenses_taxes', 'PA', 'Gestion budgétaire', 'Rigueur budgétaire avec croissance contrôlée des taxes'),
('equipe_labeaume', 'q7_immeubles_grande_hauteur', 'PA', 'Politique d''aménagement', 'Densification dans certains secteurs'),
('equipe_labeaume', 'q8_interdire_essence_centre_ville', 'N', 'Pas de position claire', 'Aucune initiative majeure annoncée'),
('equipe_labeaume', 'q9_protection_espaces_verts', 'PA', 'Projets de parcs', 'Investissements dans les espaces verts'),
('equipe_labeaume', 'q10_transition_carboneutre', 'N', 'Position modérée', 'Approche progressive sans contraintes strictes'),
('equipe_labeaume', 'q11_reduction_dechets', 'PA', 'Amélioration des services', 'Modernisation des services de collecte'),
('equipe_labeaume', 'q12_augmentation_taxes', 'PD', 'Politique fiscale', 'Préférence pour l''efficacité plutôt que l''augmentation'),
('equipe_labeaume', 'q13_pouvoir_conseils_quartier', 'PD', 'Style de gouvernance', 'Gouvernance centralisée'),
('equipe_labeaume', 'q14_reduction_dette', 'PA', 'Gestion financière', 'Contrôle de l''endettement municipal'),
('equipe_labeaume', 'q15_avantages_fiscaux_entreprises', 'PA', 'Développement économique', 'Politiques d''attraction des entreprises'),
('equipe_labeaume', 'q16_limitation_touristes', 'PD', 'Développement touristique', 'Promotion du tourisme'),
('equipe_labeaume', 'q17_soutien_organismes_communautaires', 'N', 'Financement communautaire', 'Soutien mesuré selon les priorités'),
('equipe_labeaume', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité publique', 'Maintien des effectifs actuels'),
('equipe_labeaume', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures sportives', 'Grands projets sportifs et récréatifs'),
('equipe_labeaume', 'q20_protection_patrimoine', 'PA', 'Patrimoine', 'Valorisation du patrimoine historique'),
('equipe_labeaume', 'q21_priorites_municipales', 'PA', 'Vision politique', 'Priorités: grands projets, économie, finances');

-- Positions d'Équipe Marie-Josée Savard
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('equipe_marie_josee_savard', 'q1_tramway', 'PA', 'Continuité des projets', 'Soutien au tramway avec ajustements'),
('equipe_marie_josee_savard', 'q2_pistes_cyclables', 'PA', 'Mobilité durable', 'Développement du réseau cyclable'),
('equipe_marie_josee_savard', 'q3_troisieme_lien', 'N', 'Position nuancée', 'Évaluation des options de transport'),
('equipe_marie_josee_savard', 'q4_priorite_mobilite_active', 'PA', 'Transport durable', 'Priorisation des transports actifs'),
('equipe_marie_josee_savard', 'q5_quotas_logements_abordables', 'PA', 'Logement inclusif', 'Mesures incitatives pour logement abordable'),
('equipe_marie_josee_savard', 'q6_reduction_depenses_taxes', 'N', 'Gestion équilibrée', 'Équilibre entre services et taxes'),
('equipe_marie_josee_savard', 'q7_immeubles_grande_hauteur', 'N', 'Développement mesuré', 'Densification respectueuse du caractère'),
('equipe_marie_josee_savard', 'q8_interdire_essence_centre_ville', 'N', 'Transition graduelle', 'Approche progressive'),
('equipe_marie_josee_savard', 'q9_protection_espaces_verts', 'PA', 'Environnement', 'Protection des milieux naturels'),
('equipe_marie_josee_savard', 'q10_transition_carboneutre', 'PA', 'Développement durable', 'Transition écologique planifiée'),
('equipe_marie_josee_savard', 'q11_reduction_dechets', 'PA', 'Services environnementaux', 'Amélioration de la gestion des matières'),
('equipe_marie_josee_savard', 'q12_augmentation_taxes', 'N', 'Financement responsable', 'Investissements selon les moyens'),
('equipe_marie_josee_savard', 'q13_pouvoir_conseils_quartier', 'PA', 'Démocratie locale', 'Renforcement de la participation'),
('equipe_marie_josee_savard', 'q14_reduction_dette', 'PA', 'Finances saines', 'Gestion prudente de la dette'),
('equipe_marie_josee_savard', 'q15_avantages_fiscaux_entreprises', 'N', 'Développement équilibré', 'Attraction mesurée des entreprises'),
('equipe_marie_josee_savard', 'q16_limitation_touristes', 'N', 'Tourisme durable', 'Gestion équilibrée du tourisme'),
('equipe_marie_josee_savard', 'q17_soutien_organismes_communautaires', 'PA', 'Milieu communautaire', 'Soutien aux organismes'),
('equipe_marie_josee_savard', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité adaptée', 'Sécurité selon les besoins'),
('equipe_marie_josee_savard', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Qualité de vie', 'Investissement dans les loisirs'),
('equipe_marie_josee_savard', 'q20_protection_patrimoine', 'PA', 'Patrimoine', 'Protection du caractère historique'),
('equipe_marie_josee_savard', 'q21_priorites_municipales', 'PA', 'Vision équilibrée', 'Priorités: services, qualité de vie, participation');

-- Positions de Démocratie Québec
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('democratie_quebec', 'q1_tramway', 'PD', 'Opposition au tramway actuel', 'Projet trop coûteux, alternatives préférées'),
('democratie_quebec', 'q2_pistes_cyclables', 'PA', 'Mobilité active', 'Soutien au développement cyclable'),
('democratie_quebec', 'q3_troisieme_lien', 'PD', 'Opposition au tunnel', 'Préférence pour transport en commun'),
('democratie_quebec', 'q4_priorite_mobilite_active', 'FA', 'Transport durable', 'Priorisation claire des transports actifs'),
('democratie_quebec', 'q5_quotas_logements_abordables', 'FA', 'Justice sociale', 'Mesures contraignantes pour l''abordabilité'),
('democratie_quebec', 'q6_reduction_depenses_taxes', 'PD', 'Services publics', 'Maintien des services même avec taxes'),
('democratie_quebec', 'q7_immeubles_grande_hauteur', 'PD', 'Préservation du caractère', 'Opposition à la sur-densification'),
('democratie_quebec', 'q8_interdire_essence_centre_ville', 'PA', 'Environnement', 'Soutien aux mesures écologiques'),
('democratie_quebec', 'q9_protection_espaces_verts', 'FA', 'Environnement prioritaire', 'Protection absolue des espaces verts'),
('democratie_quebec', 'q10_transition_carboneutre', 'FA', 'Urgence climatique', 'Transition rapide vers la carboneutralité'),
('democratie_quebec', 'q11_reduction_dechets', 'FA', 'Gestion environnementale', 'Priorité à la réduction des déchets'),
('democratie_quebec', 'q12_augmentation_taxes', 'PA', 'Financement vert', 'Taxes justifiées pour l''environnement'),
('democratie_quebec', 'q13_pouvoir_conseils_quartier', 'FA', 'Démocratie participative', 'Décentralisation du pouvoir'),
('democratie_quebec', 'q14_reduction_dette', 'N', 'Équilibre financier', 'Dette acceptable pour les investissements verts'),
('democratie_quebec', 'q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Opposition aux privilèges fiscaux'),
('democratie_quebec', 'q16_limitation_touristes', 'PA', 'Qualité de vie', 'Limitation pour préserver les quartiers'),
('democratie_quebec', 'q17_soutien_organismes_communautaires', 'FA', 'Milieu communautaire', 'Augmentation significative du soutien'),
('democratie_quebec', 'q18_augmentation_effectifs_policiers', 'PD', 'Sécurité alternative', 'Préférence pour la prévention sociale'),
('democratie_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Accessibilité', 'Investissement pour tous les citoyens'),
('democratie_quebec', 'q20_protection_patrimoine', 'FA', 'Patrimoine', 'Protection stricte du patrimoine'),
('democratie_quebec', 'q21_priorites_municipales', 'FA', 'Vision participative', 'Priorités: environnement, participation, transport durable');

-- Positions de Transition Québec
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('transition_quebec', 'q1_tramway', 'FA', 'Transport collectif électrique', 'Soutien fort au tramway électrique'),
('transition_quebec', 'q2_pistes_cyclables', 'FA', 'Mobilité verte', 'Réseau cyclable étendu prioritaire'),
('transition_quebec', 'q3_troisieme_lien', 'FD', 'Opposition ferme', 'Projet contraire aux objectifs climatiques'),
('transition_quebec', 'q4_priorite_mobilite_active', 'FA', 'Ville sans voiture', 'Vision de mobilité durable'),
('transition_quebec', 'q5_quotas_logements_abordables', 'FA', 'Droit au logement', 'Quotas obligatoires étendus'),
('transition_quebec', 'q6_reduction_depenses_taxes', 'FD', 'Investissement public', 'Services publics avant réduction'),
('transition_quebec', 'q7_immeubles_grande_hauteur', 'PA', 'Densification verte', 'Densification avec critères écologiques'),
('transition_quebec', 'q8_interdire_essence_centre_ville', 'FA', 'Zone zéro émission', 'Interdiction rapide des véhicules polluants'),
('transition_quebec', 'q9_protection_espaces_verts', 'FA', 'Priorité absolue', 'Protection maximale des écosystèmes'),
('transition_quebec', 'q10_transition_carboneutre', 'FA', 'Urgence climatique', 'Carboneutralité accélérée'),
('transition_quebec', 'q11_reduction_dechets', 'FA', 'Économie circulaire', 'Zéro déchet comme objectif'),
('transition_quebec', 'q12_augmentation_taxes', 'FA', 'Financement vert', 'Taxes justifiées pour la transition'),
('transition_quebec', 'q13_pouvoir_conseils_quartier', 'FA', 'Démocratie directe', 'Autonomie maximale des quartiers'),
('transition_quebec', 'q14_reduction_dette', 'PD', 'Investissement vert', 'Dette acceptable pour climat'),
('transition_quebec', 'q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Taxes équitables pour tous'),
('transition_quebec', 'q16_limitation_touristes', 'PA', 'Tourisme responsable', 'Limitation pour durabilité'),
('transition_quebec', 'q17_soutien_organismes_communautaires', 'FA', 'Économie sociale', 'Soutien massif au communautaire'),
('transition_quebec', 'q18_augmentation_effectifs_policiers', 'PD', 'Justice sociale', 'Prévention plutôt que répression'),
('transition_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Loisirs verts', 'Infrastructures écologiques'),
('transition_quebec', 'q20_protection_patrimoine', 'FA', 'Patrimoine vivant', 'Protection et rénovation écologique'),
('transition_quebec', 'q21_priorites_municipales', 'FA', 'Transition écologique', 'Priorité absolue: climat et social');

-- Positions de Québec 21
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('quebec_21', 'q1_tramway', 'PD', 'Coût excessif', 'Opposition au projet actuel'),
('quebec_21', 'q2_pistes_cyclables', 'PD', 'Priorité automobile', 'Préservation de l''espace automobile'),
('quebec_21', 'q3_troisieme_lien', 'PA', 'Infrastructure nécessaire', 'Soutien au développement routier'),
('quebec_21', 'q4_priorite_mobilite_active', 'PD', 'Équilibre transport', 'Maintien de la place de l''auto'),
('quebec_21', 'q5_quotas_logements_abordables', 'PD', 'Marché libre', 'Opposition aux quotas obligatoires'),
('quebec_21', 'q6_reduction_depenses_taxes', 'FA', 'Rigueur fiscale', 'Réduction prioritaire des dépenses'),
('quebec_21', 'q7_immeubles_grande_hauteur', 'PD', 'Préservation du caractère', 'Opposition à la densification'),
('quebec_21', 'q8_interdire_essence_centre_ville', 'PD', 'Liberté de circulation', 'Opposition aux restrictions'),
('quebec_21', 'q9_protection_espaces_verts', 'N', 'Équilibre développement', 'Protection selon les besoins'),
('quebec_21', 'q10_transition_carboneutre', 'PD', 'Coûts prohibitifs', 'Opposition aux exigences strictes'),
('quebec_21', 'q11_reduction_dechets', 'N', 'Services essentiels', 'Amélioration selon les moyens'),
('quebec_21', 'q12_augmentation_taxes', 'FD', 'Opposition fiscale', 'Réduction des taxes prioritaire'),
('quebec_21', 'q13_pouvoir_conseils_quartier', 'PD', 'Gouvernance centralisée', 'Efficacité administrative'),
('quebec_21', 'q14_reduction_dette', 'FA', 'Responsabilité fiscale', 'Réduction urgente de la dette'),
('quebec_21', 'q15_avantages_fiscaux_entreprises', 'PA', 'Compétitivité économique', 'Attraction des entreprises'),
('quebec_21', 'q16_limitation_touristes', 'PD', 'Développement économique', 'Maximisation du tourisme'),
('quebec_21', 'q17_soutien_organismes_communautaires', 'N', 'Soutien ciblé', 'Financement selon priorités'),
('quebec_21', 'q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Renforcement des effectifs'),
('quebec_21', 'q19_investissement_infrastructures_loisirs_sportives', 'N', 'Investissement mesuré', 'Selon les capacités financières'),
('quebec_21', 'q20_protection_patrimoine', 'PA', 'Valeurs traditionnelles', 'Préservation du patrimoine'),
('quebec_21', 'q21_priorites_municipales', 'PA', 'Priorités conservatrices', 'Finances, sécurité, tradition');

-- Positions de Québec d'abord
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('quebec_dabord', 'q1_tramway', 'N', 'Évaluation nécessaire', 'Position d''attente sur le tramway'),
('quebec_dabord', 'q2_pistes_cyclables', 'PA', 'Mobilité diversifiée', 'Développement mesuré du vélo'),
('quebec_dabord', 'q3_troisieme_lien', 'N', 'Étude des options', 'Analyse des besoins'),
('quebec_dabord', 'q4_priorite_mobilite_active', 'N', 'Équilibre des modes', 'Cohabitation des transports'),
('quebec_dabord', 'q5_quotas_logements_abordables', 'N', 'Mesures incitatives', 'Approche flexible'),
('quebec_dabord', 'q6_reduction_depenses_taxes', 'PA', 'Gestion responsable', 'Contrôle de la croissance'),
('quebec_dabord', 'q7_immeubles_grande_hauteur', 'N', 'Développement adapté', 'Selon les secteurs'),
('quebec_dabord', 'q8_interdire_essence_centre_ville', 'N', 'Transition graduelle', 'Approche progressive'),
('quebec_dabord', 'q9_protection_espaces_verts', 'PA', 'Qualité de vie', 'Protection des espaces verts'),
('quebec_dabord', 'q10_transition_carboneutre', 'N', 'Transition réaliste', 'Objectifs atteignables'),
('quebec_dabord', 'q11_reduction_dechets', 'PA', 'Services efficaces', 'Amélioration des services'),
('quebec_dabord', 'q12_augmentation_taxes', 'PD', 'Contrôle fiscal', 'Éviter les hausses importantes'),
('quebec_dabord', 'q13_pouvoir_conseils_quartier', 'PA', 'Proximité citoyenne', 'Renforcement de la participation'),
('quebec_dabord', 'q14_reduction_dette', 'PA', 'Gestion saine', 'Contrôle de l''endettement'),
('quebec_dabord', 'q15_avantages_fiscaux_entreprises', 'N', 'Développement équilibré', 'Mesures ciblées'),
('quebec_dabord', 'q16_limitation_touristes', 'N', 'Tourisme durable', 'Gestion équilibrée'),
('quebec_dabord', 'q17_soutien_organismes_communautaires', 'PA', 'Tissu social', 'Soutien au milieu communautaire'),
('quebec_dabord', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité adaptée', 'Selon les besoins'),
('quebec_dabord', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures de proximité', 'Amélioration des services'),
('quebec_dabord', 'q20_protection_patrimoine', 'PA', 'Identité municipale', 'Préservation du caractère'),
('quebec_dabord', 'q21_priorites_municipales', 'PA', 'Services et proximité', 'Priorités: services, mobilité, logement');

-- Positions de Renouveau municipal de Québec
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('renouveau_municipal_quebec', 'q1_tramway', 'N', 'Révision nécessaire', 'Réévaluation du projet'),
('renouveau_municipal_quebec', 'q2_pistes_cyclables', 'PA', 'Innovation transport', 'Solutions modernes'),
('renouveau_municipal_quebec', 'q3_troisieme_lien', 'N', 'Alternatives possibles', 'Étude de nouvelles options'),
('renouveau_municipal_quebec', 'q4_priorite_mobilite_active', 'PA', 'Modernisation transport', 'Transport du futur'),
('renouveau_municipal_quebec', 'q5_quotas_logements_abordables', 'PA', 'Innovation logement', 'Solutions créatives'),
('renouveau_municipal_quebec', 'q6_reduction_depenses_taxes', 'PA', 'Efficacité gouvernementale', 'Optimisation des dépenses'),
('renouveau_municipal_quebec', 'q7_immeubles_grande_hauteur', 'PA', 'Urbanisme moderne', 'Développement intelligent'),
('renouveau_municipal_quebec', 'q8_interdire_essence_centre_ville', 'PA', 'Innovation verte', 'Technologies propres'),
('renouveau_municipal_quebec', 'q9_protection_espaces_verts', 'PA', 'Ville verte', 'Intégration nature-ville'),
('renouveau_municipal_quebec', 'q10_transition_carboneutre', 'PA', 'Innovation écologique', 'Technologies vertes'),
('renouveau_municipal_quebec', 'q11_reduction_dechets', 'PA', 'Gestion moderne', 'Technologies de pointe'),
('renouveau_municipal_quebec', 'q12_augmentation_taxes', 'N', 'Financement innovant', 'Nouvelles sources de revenus'),
('renouveau_municipal_quebec', 'q13_pouvoir_conseils_quartier', 'PA', 'Démocratie 2.0', 'Participation numérique'),
('renouveau_municipal_quebec', 'q14_reduction_dette', 'PA', 'Gestion moderne', 'Optimisation financière'),
('renouveau_municipal_quebec', 'q15_avantages_fiscaux_entreprises', 'PA', 'Écosystème innovation', 'Attraction des startups'),
('renouveau_municipal_quebec', 'q16_limitation_touristes', 'N', 'Tourisme intelligent', 'Gestion par technologie'),
('renouveau_municipal_quebec', 'q17_soutien_organismes_communautaires', 'PA', 'Partenariats innovants', 'Collaboration renforcée'),
('renouveau_municipal_quebec', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité intelligente', 'Technologies de sécurité'),
('renouveau_municipal_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures modernes', 'Équipements de pointe'),
('renouveau_municipal_quebec', 'q20_protection_patrimoine', 'PA', 'Patrimoine numérique', 'Conservation moderne'),
('renouveau_municipal_quebec', 'q21_priorites_municipales', 'PA', 'Vision de renouveau', 'Priorités: innovation, efficacité, modernisation');

-- ========================================================================
-- 10. CRÉER LES VUES UTILES
-- ========================================================================

-- Vue pour récupérer tous les partis avec leurs positions
CREATE OR REPLACE VIEW party_complete_view AS
SELECT
  p.*,
  m.name as municipality_name,
  COUNT(DISTINCT pp.id) as total_positions
FROM parties p
LEFT JOIN municipalities m ON p.municipality_id = m.id
LEFT JOIN party_positions pp ON p.id = pp.party_id
GROUP BY p.id, p.name, p.short_name, p.leader, p.logo_url, p.color,
         p.website_url, p.orientation, p.main_ideas_summary, p.strengths,
         p.reserves, p.priorities, p.municipality_id, p.created_at,
         p.updated_at, m.name;

-- Vue pour récupérer les questions avec leur ordre
CREATE OR REPLACE VIEW questions_ordered_view AS
SELECT
  q.*,
  m.name as municipality_name
FROM questions q
LEFT JOIN municipalities m ON q.municipality_id = m.id
ORDER BY q.order_index, q.id;

-- ========================================================================
-- 11. VÉRIFICATION FINALE ET RAPPORTS
-- ========================================================================

-- Compter les résultats
DO $$
DECLARE
    municipality_count INTEGER;
    question_count INTEGER;
    party_count INTEGER;
    position_count INTEGER;
    avg_positions DECIMAL;
BEGIN
    SELECT COUNT(*) INTO municipality_count FROM municipalities;
    SELECT COUNT(*) INTO question_count FROM questions WHERE municipality_id = 'quebec';
    SELECT COUNT(*) INTO party_count FROM parties WHERE municipality_id = 'quebec';
    SELECT COUNT(*) INTO position_count FROM party_positions
    WHERE party_id IN (SELECT id FROM parties WHERE municipality_id = 'quebec');

    IF party_count > 0 THEN
        avg_positions := ROUND(position_count::DECIMAL / party_count, 1);
    ELSE
        avg_positions := 0;
    END IF;

    RAISE NOTICE '';
    RAISE NOTICE '🎉 MIGRATION COMPLÈTE TERMINÉE AVEC SUCCÈS !';
    RAISE NOTICE '';
    RAISE NOTICE '📊 RÉSULTATS FINAUX:';
    RAISE NOTICE '================================';
    RAISE NOTICE '✅ % municipalités créées', municipality_count;
    RAISE NOTICE '✅ % questions migrées pour Québec', question_count;
    RAISE NOTICE '✅ % partis politiques créés', party_count;
    RAISE NOTICE '✅ % positions des partis insérées', position_count;
    RAISE NOTICE '✅ % positions en moyenne par parti', avg_positions;
    RAISE NOTICE '';
    RAISE NOTICE '🚀 PROCHAINES ÉTAPES:';
    RAISE NOTICE '================================';
    RAISE NOTICE '1. Tester les API routes: /api/questions?municipality=quebec';
    RAISE NOTICE '2. Tester les API routes: /api/parties?municipality=quebec';
    RAISE NOTICE '3. Adapter les composants React pour utiliser les nouveaux hooks';
    RAISE NOTICE '4. Valider le flow complet de la boussole municipale';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Base de données prête pour l''architecture multi-municipalités !';
    RAISE NOTICE '';
END
$$;