-- ========================================================================
-- REBUILD 11: INSÉRER LES QUESTIONS MONTREAL (21 QUESTIONS)
-- ========================================================================
-- Données: 21 questions Montréal avec colonnes politiques
-- IDs standardisés: mtl_q_XX, mtl_spec_XX
-- Ordre d'exécution: 11/16
-- Dépendances: 01_create_core_tables.sql + 09_data_municipalities.sql
-- ========================================================================

-- Note: Questions spécifiques Montréal (Q1, Q3) + 18 questions génériques adaptées

INSERT INTO questions (
  id, text, category, response_type, description, response_format,
  agreement_options, order_index, municipality_id,
  political_axis, political_weight, political_interpretation, score_inversion
) VALUES

-- Q1 - Extension métro et REM (SPÉCIFIQUE MONTRÉAL)
('mtl_spec_metro_rem',
 'Faut-il poursuivre l''extension du métro et du REM pour améliorer le transport structurant ?',
 'Enjeu spécifique 1',
 'agreement',
 'Cette question évalue la priorité accordée au développement du transport collectif structurant face aux contraintes budgétaires.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 0,
 'montreal',
 'social',
 1.5,
 'progressive',
 false),

-- Q2 - Pistes cyclables (GÉNÉRIQUE)
('mtl_q_02_pistes_cyclables',
 'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
 'Mobilité et transport',
 'agreement',
 'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 1,
 'montreal',
 'social',
 1.2,
 'progressive',
 false),

-- Q3 - Autonomie des arrondissements (SPÉCIFIQUE MONTRÉAL)
('mtl_spec_autonomie_arrondissements',
 'Faut-il donner plus d''autonomie aux arrondissements plutôt que de privilégier la coordination centralisée ?',
 'Enjeu spécifique 2',
 'agreement',
 'Cette question évalue la priorité accordée à la décentralisation versus la cohérence administrative.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 2,
 'montreal',
 'economic',
 0.9,
 'decentralization',
 false),

-- Q4 - Priorité mobilité active (GÉNÉRIQUE)
('mtl_q_04_mobilite_active',
 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?',
 'Mobilité et transport',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 3,
 'montreal',
 'social',
 1.1,
 'progressive',
 false),

-- Q5 - Quotas logements abordables (GÉNÉRIQUE)
('mtl_q_05_logements_abordables',
 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?',
 'Logement et aménagement',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 4,
 'montreal',
 'economic',
 1.3,
 'interventionist',
 true),

-- Q6 - Réduction dépenses et taxes (GÉNÉRIQUE)
('mtl_q_06_reduction_depenses',
 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?',
 'Finances et fiscalité',
 'agreement',
 'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 5,
 'montreal',
 'economic',
 1.2,
 'free_market',
 false),

-- Q7 - Immeubles grande hauteur (GÉNÉRIQUE)
('mtl_q_07_immeubles_hauteur',
 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?',
 'Logement et aménagement',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 6,
 'montreal',
 'social',
 0.9,
 'progressive',
 false),

-- Q8 - Interdire essence centre-ville (GÉNÉRIQUE)
('mtl_q_08_interdire_essence',
 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?',
 'Environnement et développement durable',
 'agreement',
 'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 7,
 'montreal',
 'social',
 1.0,
 'progressive',
 false),

-- Q9 - Protection espaces verts (GÉNÉRIQUE)
('mtl_q_09_espaces_verts',
 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?',
 'Environnement et développement durable',
 'agreement',
 'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 8,
 'montreal',
 'social',
 1.1,
 'progressive',
 false),

-- Q10 - Transition carboneutre (GÉNÉRIQUE)
('mtl_q_10_transition_carbone',
 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?',
 'Environnement et développement durable',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 9,
 'montreal',
 'social',
 1.0,
 'progressive',
 false),

-- Q11 - Collecte ordures (GÉNÉRIQUE)
('mtl_q_11_collecte_ordures',
 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?',
 'Environnement et développement durable',
 'agreement',
 'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 10,
 'montreal',
 'social',
 0.8,
 'conservative',
 true),

-- Q12 - Augmentation taxes projets écoresponsables (GÉNÉRIQUE)
('mtl_q_12_taxes_ecoresponsables',
 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?',
 'Finances et fiscalité',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 11,
 'montreal',
 'economic',
 1.4,
 'interventionist',
 true),

-- Q13 - Pouvoir conseils quartier (GÉNÉRIQUE)
('mtl_q_13_pouvoir_quartiers',
 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?',
 'Gouvernance et participation',
 'agreement',
 'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 12,
 'montreal',
 'economic',
 0.7,
 'decentralization',
 false),

-- Q14 - Services essentiels vs projets avenir (GÉNÉRIQUE)
('mtl_q_14_services_essentiels',
 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?',
 'Finances et fiscalité',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 13,
 'montreal',
 'economic',
 0.8,
 'free_market',
 false),

-- Q15 - Avantages fiscaux entreprises (GÉNÉRIQUE)
('mtl_q_15_avantages_fiscaux',
 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?',
 'Développement économique',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 14,
 'montreal',
 'economic',
 0.9,
 'free_market',
 false),

-- Q16 - Limitation touristes (GÉNÉRIQUE)
('mtl_q_16_limitation_touristes',
 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?',
 'Développement économique',
 'agreement',
 'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 15,
 'montreal',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q17 - Financement organismes communautaires (GÉNÉRIQUE)
('mtl_q_17_organismes_communautaires',
 'La ville devrait-elle augmenter le financement des organismes communautaires ?',
 'Services sociaux et communautaires',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 16,
 'montreal',
 'economic',
 1.1,
 'interventionist',
 true),

-- Q18 - Effectifs policiers (GÉNÉRIQUE)
('mtl_q_18_effectifs_policiers',
 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?',
 'Sécurité publique',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 17,
 'montreal',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q19 - Infrastructures loisirs sportives (GÉNÉRIQUE)
('mtl_q_19_infrastructures_loisirs',
 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?',
 'Services sociaux et communautaires',
 'agreement',
 'Cette question évalue la priorité accordée aux services de proximité.',
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 18,
 'montreal',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q20 - Protection patrimoine (GÉNÉRIQUE)
('mtl_q_20_patrimoine',
 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?',
 'Patrimoine et culture',
 'agreement',
 NULL,
 'standard',
 '["FA", "PA", "N", "PD", "FD", "IDK"]',
 19,
 'montreal',
 'neutral',
 1.0,
 'neutral',
 false),

-- Q21 - Priorités municipales (QUESTION DE PRIORITÉ)
('mtl_q_21_priorites',
 'Classez par ordre d''importance les enjeux suivants pour votre municipalité',
 'Enjeux spécifiques',
 'priority_ranking',
 'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
 'priority',
 NULL,
 20,
 'montreal',
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
-- 8 enjeux universels + 2 enjeux spécifiques Montréal (Métro/REM, Arrondissements)
UPDATE questions SET
  priority_options = '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Extension du métro et REM", "Autonomie des arrondissements"]'::jsonb
WHERE id = 'mtl_q_21_priorites' AND municipality_id = 'montreal';

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
  SELECT COUNT(*) INTO question_count FROM questions WHERE municipality_id = 'montreal';
  SELECT COUNT(*) INTO economic_count FROM questions WHERE municipality_id = 'montreal' AND political_axis = 'economic';
  SELECT COUNT(*) INTO social_count FROM questions WHERE municipality_id = 'montreal' AND political_axis = 'social';
  SELECT COUNT(*) INTO neutral_count FROM questions WHERE municipality_id = 'montreal' AND political_axis = 'neutral';

  RAISE NOTICE '✅ Fichier 11: Questions Montréal insérées!';
  RAISE NOTICE '   - Total: % questions', question_count;
  RAISE NOTICE '   - Axe économique: % questions', economic_count;
  RAISE NOTICE '   - Axe social: % questions', social_count;
  RAISE NOTICE '   - Neutres: % questions', neutral_count;
  RAISE NOTICE '   - IDs standardisés (mtl_q_XX, mtl_spec_XX)';
  RAISE NOTICE '   - Colonnes politiques configurées';
  RAISE NOTICE '   - 10 priorités: 8 universels + 2 spécifiques MTL';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 12_data_parties.sql';
END
$$;
