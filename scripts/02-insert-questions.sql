-- Insertion des 21 questions de la Boussole Municipale
-- Données extraites de lib/boussole-data.ts

INSERT INTO questions (
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

('q4_priorite_mobilite_active', 'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).', 'Mobilité et transport', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 4, NOW(), NOW()),

('q5_quotas_logements_abordables', 'La Ville devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.', 'Habitation et aménagement urbain', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 5, NOW(), NOW()),

('q6_reduction_depenses_taxes', 'La municipalité devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.', 'Gouvernance et finances municipales', 'agreement', 'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 6, NOW(), NOW()),

('q7_immeubles_grande_hauteur', 'Les immeubles de grande hauteur devraient être favorisés pour maximiser l''utilisation des terrains disponibles.', 'Habitation et aménagement urbain', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 7, NOW(), NOW()),

('q8_interdire_essence_centre_ville', 'La Ville devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.', 'Environnement et développement durable', 'agreement', 'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 8, NOW(), NOW()),

('q9_protection_espaces_verts', 'La Ville devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.', 'Environnement et développement durable', 'agreement', 'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 9, NOW(), NOW()),

('q10_transition_carboneutre', 'La Ville devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.', 'Environnement et développement durable', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 10, NOW(), NOW()),

('q11_reduction_dechets', 'La Ville devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.', 'Environnement et développement durable', 'agreement', 'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 11, NOW(), NOW()),

('q12_augmentation_taxes', 'La Ville devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).', 'Gouvernance et finances municipales', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 12, NOW(), NOW()),

('q13_pouvoir_conseils_quartier', 'La Ville devrait donner plus de pouvoir aux conseils de quartier pour décider des projets locaux.', 'Gouvernance et finances municipales', 'agreement', 'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 13, NOW(), NOW()),

('q14_reduction_dette', 'La Ville devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.', 'Gouvernance et finances municipales', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 14, NOW(), NOW()),

('q15_avantages_fiscaux_entreprises', 'La Ville devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.', 'Développement économique et social', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 15, NOW(), NOW()),

('q16_limitation_touristes', 'La Ville devrait limiter le nombre de touristes dans certains quartiers pour protéger la qualité de vie des résidents.', 'Développement économique et social', 'agreement', 'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 16, NOW(), NOW()),

('q17_soutien_organismes_communautaires', 'La Ville devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).', 'Développement économique et social', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 17, NOW(), NOW()),

('q18_augmentation_effectifs_policiers', 'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les quartiers.', 'Sécurité publique et services municipaux', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 18, NOW(), NOW()),

('q19_investissement_infrastructures_loisirs_sportives', 'La Ville devrait investir plus dans les parcs, arénas et terrains de sport de quartier.', 'Sécurité publique et services municipaux', 'agreement', 'Cette question évalue la priorité accordée aux services de proximité.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 19, NOW(), NOW()),

('q20_protection_patrimoine', 'La Ville devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.', 'Patrimoine et identité', 'agreement', NULL, 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, NULL, NULL, NULL, 20, NOW(), NOW()),

('q21_enjeux_prioritaires', 'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)', 'Priorités municipales', 'priority_ranking', 'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.', 'standard', '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb, '[5, 4, 3, 2, 1]'::jsonb, NULL, '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Projet de tramway", "Troisième lien routier", "Lutte aux changements climatiques", "Patrimoine et identité"]'::jsonb, NULL, NULL, 21, NOW(), NOW());

-- Vérification de l'insertion
SELECT 
  'Questions insérées' as status,
  COUNT(*) as count,
  NOW() as timestamp
FROM questions;