-- Migration des questions vers Supabase
-- Généré automatiquement à partir de boussole-data.ts

-- Insérer toutes les questions
INSERT INTO public.questions (
  id, 
  text, 
  category, 
  response_type, 
  description, 
  response_format,
  agreement_options, 
  importance_options, 
  importance_direct_options,
  priority_options,
  custom_agreement_labels,
  custom_importance_direct_labels,
  order_index,
  created_at,
  updated_at
) VALUES
('q1_tramway', 'La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 1, NOW(), NOW()),

('q2_pistes_cyclables', 'La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.', 'Mobilité et transport', 'agreement', 'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 2, NOW(), NOW()),

('q3_troisieme_lien', 'La Ville de Québec devrait activement soutenir la réalisation d''un troisième lien routier entre Québec et Lévis.', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 3, NOW(), NOW()),

('q4_priorite_mobilite_active', 'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).', 'Mobilité et transport', 'agreement', 'Cette question porte sur la priorité à accorder aux différents modes de transport au centre-ville.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 4, NOW(), NOW()),

('q5_quotas_logements_abordables', 'La municipalité devrait imposer des quotas obligatoires de logements abordables dans tous les nouveaux développements résidentiels.', 'Logement et développement urbain', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 5, NOW(), NOW()),

('q6_reduction_depenses_taxes', 'La municipalité devrait réduire ses dépenses et ses taxes municipales, même si cela implique une réduction des services offerts aux citoyens.', 'Finances et économie', 'agreement', 'Cette question évalue l''équilibre entre la fiscalité municipale et le niveau de services publics.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 6, NOW(), NOW()),

('q7_immeubles_grande_hauteur', 'La municipalité devrait permettre davantage d''immeubles de grande hauteur pour densifier le territoire et optimiser l''utilisation des terrains.', 'Logement et développement urbain', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 7, NOW(), NOW()),

('q8_interdire_essence_centre_ville', 'Les véhicules à essence devraient être interdits au centre-ville de Québec d''ici 2035.', 'Environnement et développement durable', 'agreement', 'Cette question porte sur les mesures environnementales strictes pour réduire la pollution urbaine.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 8, NOW(), NOW()),

('q9_protection_espaces_verts', 'La protection et l''expansion des espaces verts devraient être prioritaires, même si cela limite les possibilités de développement immobilier.', 'Environnement et développement durable', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 9, NOW(), NOW()),

('q10_transition_carboneutre', 'La municipalité devrait exiger que tous les nouveaux bâtiments soient carboneutres d''ici 2030, même si cela augmente les coûts de construction.', 'Environnement et développement durable', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 10, NOW(), NOW()),

('q11_reduction_dechets', 'La collecte des ordures devrait passer de aux 2 semaines à aux 3 semaines pour encourager la réduction des déchets et le compostage.', 'Environnement et développement durable', 'agreement', 'Cette question évalue l''acceptabilité de mesures environnementales ayant un impact sur les services aux citoyens.', 'frequency', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 11, NOW(), NOW()),

('q12_augmentation_taxes', 'Il est acceptable d''augmenter les taxes municipales pour financer des projets écoresponsables et améliorer les services publics.', 'Finances et économie', 'agreement', 'Cette question porte sur l''acceptabilité d''augmenter la fiscalité pour des objectifs environnementaux et sociaux.', 'financing', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 12, NOW(), NOW()),

('q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient avoir plus de pouvoir décisionnel sur les enjeux locaux qui affectent directement leur communauté.', 'Gouvernance et participation citoyenne', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 13, NOW(), NOW()),

('q14_reduction_dette', 'La réduction de la dette municipale devrait être une priorité absolue, même si cela nécessite de reporter certains projets d''investissement.', 'Finances et économie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 14, NOW(), NOW()),

('q15_avantages_fiscaux_entreprises', 'La municipalité devrait offrir des avantages fiscaux aux entreprises pour stimuler l''économie locale et attirer de nouveaux investissements.', 'Finances et économie', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 15, NOW(), NOW()),

('q16_limitation_touristes', 'La municipalité devrait limiter le nombre de touristes dans certains secteurs pour préserver la qualité de vie des résidents et protéger le patrimoine.', 'Tourisme et patrimoine', 'agreement', 'Cette question porte sur l''équilibre entre développement touristique et qualité de vie des résidents.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 16, NOW(), NOW()),

('q17_soutien_organismes_communautaires', 'La municipalité devrait augmenter significativement son soutien financier aux organismes communautaires et aux initiatives citoyennes.', 'Services sociaux et communautaires', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 17, NOW(), NOW()),

('q18_augmentation_effectifs_policiers', 'La municipalité devrait augmenter les effectifs policiers pour améliorer la sécurité publique, même si cela augmente les dépenses.', 'Sécurité et ordre public', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 18, NOW(), NOW()),

('q19_investissement_infrastructures_loisirs_sportives', 'La municipalité devrait investir davantage dans les infrastructures de loisirs et sportives (parcs, arénas, terrains de sport).', 'Loisirs et culture', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 19, NOW(), NOW()),

('q20_protection_patrimoine', 'La protection du patrimoine architectural devrait être une priorité absolue, même si cela limite les possibilités de développement et de modernisation.', 'Tourisme et patrimoine', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 20, NOW(), NOW()),

('q21_enjeux_prioritaires', 'Quels sont les trois enjeux les plus importants pour vous lors des prochaines élections municipales ?', 'Enjeux prioritaires', 'priority_ranking', 'Classez par ordre de priorité les enjeux qui vous tiennent le plus à cœur pour la ville de Québec.', 'priority', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Finances municipales", "Développement économique", "Sécurité publique", "Services sociaux et communautaires", "Participation citoyenne", "Tourisme et patrimoine", "Infrastructure et services municipaux", "Patrimoine et identité"]'::jsonb, NULL, NULL, 21, NOW(), NOW())

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
  updated_at = NOW();

-- Vérifier les données insérées
SELECT COUNT(*) as total_questions FROM public.questions;
SELECT id, text, category, response_type FROM public.questions ORDER BY order_index;