-- ========================================================================
-- REBUILD 10: INSÉRER LES QUESTIONS QUEBEC (21 QUESTIONS)
-- ========================================================================
-- Données: 21 questions Québec avec colonnes politiques
-- IDs standardisés: qc_q_XX, qc_spec_XX
-- Ordre d'exécution: 10/16
-- Dépendances: 01_create_core_tables.sql + 09_data_municipalities.sql
-- ========================================================================

-- Note: Ce fichier utilise les IDs standardisés (qc_q_01, qc_spec_XX, etc.)
-- et inclut les colonnes politiques (political_axis, political_weight, etc.)

INSERT INTO questions (
  id, text, category, response_type, description, response_format,
  agreement_options, order_index, municipality_id,
  political_axis, political_weight, political_interpretation, score_inversion
) VALUES

-- Q1 - Tramway (SPÉCIFIQUE QUÉBEC)
('qc_q_01_tramway',
 'La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.',
 'Enjeu spécifique 1',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 0,
 'quebec',
 'social',  -- Axe social/environnemental
 1.5,       -- Poids FORT
 'progressive',
 false),    -- Progressiste (pas d'inversion)

-- Q2 - Pistes cyclables (GÉNÉRIQUE)
('qc_q_02_pistes_cyclables',
 'La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
 'Mobilité et transport',
 'agreement',
 'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 1,
 'quebec',
 'social',
 1.2,
 'progressive',
 false),

-- Q3 - Troisième lien (SPÉCIFIQUE QUÉBEC)
('qc_spec_troisieme_lien',
 'La Ville de Québec devrait activement soutenir la réalisation d''un troisième lien routier entre Québec et Lévis.',
 'Enjeu spécifique 2',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 2,
 'quebec',
 'social',
 1.3,
 'conservative',
 true),     -- Conservateur (avec inversion)

-- Q4 - Priorité mobilité active (GÉNÉRIQUE)
('qc_q_04_priorite_mobilite_active',
 'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
 'Mobilité et transport',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 3,
 'quebec',
 'social',
 1.1,
 'progressive',
 false),

-- Q5 - Quotas logements abordables (GÉNÉRIQUE)
('qc_q_05_logements_abordables',
 'La municipalité devrait imposer des quotas de logements abordables dans tous les nouveaux projets de développement résidentiel.',
 'Logement et aménagement',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 4,
 'quebec',
 'economic',
 1.3,
 'interventionist',
 true),     -- Interventionniste (avec inversion)

-- Q6 - Réduction dépenses et taxes (GÉNÉRIQUE)
('qc_q_06_reduction_depenses',
 'La municipalité devrait prioriser la réduction des taxes et des dépenses plutôt que d''augmenter les services offerts aux citoyens.',
 'Finances et fiscalité',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 5,
 'quebec',
 'economic',
 1.2,
 'free_market',
 false),    -- Libre marché (pas d'inversion)

-- Q7 - Immeubles grande hauteur (GÉNÉRIQUE)
('qc_q_07_immeubles_hauteur',
 'La municipalité devrait autoriser davantage d''immeubles de grande hauteur pour densifier les quartiers existants.',
 'Logement et aménagement',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 6,
 'quebec',
 'social',
 0.9,
 'progressive',
 false),

-- Q8 - Interdire essence centre-ville (GÉNÉRIQUE)
('qc_q_08_interdire_essence',
 'La municipalité devrait interdire la circulation des véhicules à essence dans le centre-ville d''ici 2030.',
 'Environnement et développement durable',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 7,
 'quebec',
 'social',
 1.0,
 'progressive',
 false),

-- Q9 - Protection espaces verts (GÉNÉRIQUE)
('qc_q_09_espaces_verts',
 'La protection des espaces verts devrait toujours primer sur le développement immobilier, même si cela limite la construction de nouveaux logements.',
 'Environnement et développement durable',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 8,
 'quebec',
 'social',
 1.1,
 'progressive',
 false),

-- Q10 - Transition carboneutre (GÉNÉRIQUE)
('qc_q_10_transition_carbone',
 'La municipalité devrait accélérer la transition vers la carboneutralité, même si cela implique des coûts importants à court terme.',
 'Environnement et développement durable',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 9,
 'quebec',
 'social',
 1.0,
 'progressive',
 false),

-- Q11 - Réduction déchets (GÉNÉRIQUE)
('qc_q_11_reduction_dechets',
 'La municipalité devrait imposer des règlements plus stricts pour la réduction des déchets et l''augmentation du recyclage et du compostage.',
 'Environnement et développement durable',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 10,
 'quebec',
 'social',
 0.8,
 'progressive',
 false),

-- Q12 - Augmentation taxes (GÉNÉRIQUE)
('qc_q_12_taxes',
 'La municipalité devrait être prête à augmenter les taxes si cela permet d''améliorer la qualité des services publics.',
 'Finances et fiscalité',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 11,
 'quebec',
 'economic',
 1.4,
 'interventionist',
 true),     -- Interventionniste FORT (avec inversion)

-- Q13 - Pouvoir conseils quartier (GÉNÉRIQUE)
('qc_q_13_pouvoir_quartiers',
 'Les conseils de quartier devraient avoir plus de pouvoir décisionnel sur le développement de leur secteur.',
 'Gouvernance et participation',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 12,
 'quebec',
 'economic',
 0.7,
 'decentralization',
 false),

-- Q14 - Réduction dette (GÉNÉRIQUE)
('qc_q_14_reduction_dette',
 'La municipalité devrait se concentrer davantage sur la réduction de la dette municipale plutôt que sur de nouveaux investissements.',
 'Finances et fiscalité',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 13,
 'quebec',
 'economic',
 0.8,
 'free_market',
 false),

-- Q15 - Avantages fiscaux entreprises (GÉNÉRIQUE)
('qc_q_15_avantages_fiscaux',
 'La municipalité devrait offrir davantage d''avantages fiscaux aux entreprises pour stimuler l''économie locale.',
 'Développement économique',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 14,
 'quebec',
 'economic',
 0.9,
 'free_market',
 false),

-- Q16 - Limitation touristes (GÉNÉRIQUE)
('qc_q_16_limitation_touristes',
 'La municipalité devrait limiter le nombre de touristes dans certains quartiers pour préserver la qualité de vie des résidents.',
 'Développement économique',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 15,
 'quebec',
 'neutral',  -- Neutre
 1.0,
 'neutral',
 false),

-- Q17 - Soutien organismes communautaires (GÉNÉRIQUE)
('qc_q_17_organismes_communautaires',
 'La municipalité devrait augmenter le financement des organismes communautaires, même si cela nécessite d''augmenter les taxes.',
 'Services sociaux et communautaires',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 16,
 'quebec',
 'economic',
 1.1,
 'interventionist',
 true),

-- Q18 - Augmentation effectifs policiers (GÉNÉRIQUE)
('qc_q_18_effectifs_policiers',
 'La municipalité devrait augmenter les effectifs policiers pour améliorer la sécurité publique.',
 'Sécurité publique',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 17,
 'quebec',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q19 - Investissement infrastructures loisirs sportives (GÉNÉRIQUE)
('qc_q_19_infrastructures_loisirs',
 'La municipalité devrait investir davantage dans les infrastructures de loisirs et sportives, même si cela nécessite d''augmenter les taxes.',
 'Services sociaux et communautaires',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 18,
 'quebec',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q20 - Protection patrimoine (GÉNÉRIQUE)
('qc_q_20_patrimoine',
 'La municipalité devrait imposer des règles plus strictes pour protéger le patrimoine architectural, même si cela limite les possibilités de rénovation pour les propriétaires.',
 'Patrimoine et culture',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 19,
 'quebec',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q21 - Priorités municipales (QUESTION DE PRIORITÉ)
('qc_q_21_priorites',
 'Classez par ordre d''importance les enjeux suivants pour votre municipalité',
 'Enjeux spécifiques',
 'priority_ranking',
 NULL,
 'priority',
 NULL,  -- Pas d'agreement_options pour priority_ranking
 20,
 'quebec',
 'neutral',
 1.0,
 'neutral',
 false)

ON CONFLICT (id) DO UPDATE SET
  text = EXCLUDED.text,
  category = EXCLUDED.category,
  response_type = EXCLUDED.response_type,
  description = EXCLUDED.description,
  response_format = EXCLUDED.response_format,
  agreement_options = EXCLUDED.agreement_options,
  order_index = EXCLUDED.order_index,
  municipality_id = EXCLUDED.municipality_id,
  political_axis = EXCLUDED.political_axis,
  political_weight = EXCLUDED.political_weight,
  political_interpretation = EXCLUDED.political_interpretation,
  score_inversion = EXCLUDED.score_inversion,
  updated_at = NOW();

-- ========================================================================
-- AJOUT DES OPTIONS DE PRIORITÉ POUR Q21
-- ========================================================================
-- 8 enjeux universels + 2 enjeux spécifiques Québec (Tramway, Troisième lien)
UPDATE questions SET
  priority_options = '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Tramway", "Troisième lien"]'::jsonb
WHERE id = 'qc_q_21_priorites' AND municipality_id = 'quebec';

-- ========================================================================
-- VÉRIFICATION DES DONNÉES
-- ========================================================================
DO $$
DECLARE
  question_count INTEGER;
  economic_count INTEGER;
  social_count INTEGER;
  neutral_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO question_count FROM questions WHERE municipality_id = 'quebec';
  SELECT COUNT(*) INTO economic_count FROM questions WHERE municipality_id = 'quebec' AND political_axis = 'economic';
  SELECT COUNT(*) INTO social_count FROM questions WHERE municipality_id = 'quebec' AND political_axis = 'social';
  SELECT COUNT(*) INTO neutral_count FROM questions WHERE municipality_id = 'quebec' AND political_axis = 'neutral';

  RAISE NOTICE '✅ Fichier 10: Questions Québec insérées!';
  RAISE NOTICE '   - Total: % questions', question_count;
  RAISE NOTICE '   - Axe économique: % questions', economic_count;
  RAISE NOTICE '   - Axe social: % questions', social_count;
  RAISE NOTICE '   - Neutres: % questions', neutral_count;
  RAISE NOTICE '   - IDs standardisés (qc_q_XX, qc_spec_XX)';
  RAISE NOTICE '   - Colonnes politiques configurées';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 11_data_questions_montreal.sql';
END
$$;
