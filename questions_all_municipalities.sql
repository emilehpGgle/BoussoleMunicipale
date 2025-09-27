-- Insertion de toutes les questions pour les 6 municipalités (126 questions total)
-- Basé sur la synthèse des 21 questions standardisées
-- Format : 18 questions communes + 2 spécifiques + 1 priorités par municipalité

-- ============================================================================
-- MUNICIPALITÉ : QUÉBEC (21 questions)
-- ============================================================================

-- Q1 - Spécifique Québec : Tramway
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q1_tramway',
  'Faut-il investir dans le projet de tramway même si cela nécessite une hausse des taxes ?',
  'Transport et mobilité',
  'agreement',
  'Projet tramway et investissement (hausse taxes)',
  'standard',
  1,
  'quebec',
  'economic',
  1.5,
  'interventionist',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'quebec',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Québec : Troisième lien
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q3_troisieme_lien',
  'Faut-il construire un troisième lien routier entre Québec et Lévis ?',
  'Transport et mobilité',
  'agreement',
  'Troisième lien routier Québec-Lévis',
  'standard',
  3,
  'quebec',
  'economic',
  1.8,
  'free_market',
  false
);

-- Q4 - Commune : Priorité mobilité active centre-ville
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q4_priorite_mobilite_active',
  'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?',
  'Transport et mobilité',
  'agreement',
  'Priorité mobilité active vs stationnements',
  'standard',
  4,
  'quebec',
  'social',
  1.2,
  'progressive',
  false
);

-- Q5 - Commune : Quotas logements abordables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q5_quotas_logements_abordables',
  'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?',
  'Logement et aménagement urbain',
  'agreement',
  'Quotas obligatoires logements abordables',
  'standard',
  5,
  'quebec',
  'economic',
  1.4,
  'interventionist',
  false
);

-- Q6 - Commune : Réduction dépenses/taxes
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q6_reduction_depenses_taxes',
  'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?',
  'Finances municipales',
  'agreement',
  'Réduction dépenses/taxes selon capacité de payer',
  'standard',
  6,
  'quebec',
  'economic',
  1.6,
  'free_market',
  false
);

-- Q7 - Commune : Immeubles grande hauteur
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q7_immeubles_grande_hauteur',
  'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?',
  'Logement et aménagement urbain',
  'agreement',
  'Immeubles grande hauteur pour densification',
  'standard',
  7,
  'quebec',
  'economic',
  1.1,
  'free_market',
  false
);

-- Q8 - Commune : Interdire véhicules essence centre-ville
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q8_interdire_essence_centre_ville',
  'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?',
  'Environnement et développement durable',
  'agreement',
  'Interdire véhicules essence centre-ville 2035',
  'standard',
  8,
  'quebec',
  'social',
  1.3,
  'progressive',
  false
);

-- Q9 - Commune : Protection espaces verts
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q9_protection_espaces_verts',
  'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?',
  'Environnement et développement durable',
  'agreement',
  'Protection espaces verts vs immobilier',
  'standard',
  9,
  'quebec',
  'social',
  1.4,
  'progressive',
  false
);

-- Q10 - Commune : Transition bâtiments carboneutres
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q10_transition_carboneutre',
  'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?',
  'Environnement et développement durable',
  'agreement',
  'Transition bâtiments carboneutres coûts',
  'standard',
  10,
  'quebec',
  'economic',
  1.2,
  'interventionist',
  false
);

-- Q11 - Commune : Amélioration vs réduction collecte ordures
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q11_reduction_dechets',
  'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?',
  'Services municipaux',
  'agreement',
  'Amélioration vs réduction collecte ordures',
  'standard',
  11,
  'quebec',
  'neutral',
  1.0,
  'neutral',
  false
);

-- Q12 - Commune : Augmentation taxes projets écoresponsables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q12_augmentation_taxes',
  'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?',
  'Finances municipales',
  'agreement',
  'Augmentation taxes projets écoresponsables',
  'standard',
  12,
  'quebec',
  'economic',
  1.5,
  'interventionist',
  false
);

-- Q13 - Commune : Pouvoir conseils quartier
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q13_pouvoir_conseils_quartier',
  'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?',
  'Gouvernance et participation',
  'agreement',
  'Pouvoir conseils quartier projets locaux',
  'standard',
  13,
  'quebec',
  'social',
  1.1,
  'decentralization',
  false
);

-- Q14 - Commune : Services essentiels vs projets avenir
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q14_reduction_dette',
  'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?',
  'Gestion des priorités',
  'agreement',
  'Services essentiels vs projets avenir',
  'standard',
  14,
  'quebec',
  'economic',
  1.3,
  'conservative',
  false
);

-- Q15 - Commune : Avantages fiscaux entreprises
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q15_avantages_fiscaux_entreprises',
  'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?',
  'Développement économique',
  'agreement',
  'Avantages fiscaux attraction entreprises',
  'standard',
  15,
  'quebec',
  'economic',
  1.2,
  'free_market',
  false
);

-- Q16 - Commune : Limitation touristes
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q16_limitation_touristes',
  'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?',
  'Équilibre développement/qualité de vie',
  'agreement',
  'Limitation touristes qualité vie',
  'standard',
  16,
  'quebec',
  'social',
  1.0,
  'conservative',
  false
);

-- Q17 - Commune : Financement organismes communautaires
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q17_soutien_organismes_communautaires',
  'La ville devrait-elle augmenter le financement des organismes communautaires ?',
  'Services sociaux',
  'agreement',
  'Financement organismes communautaires',
  'standard',
  17,
  'quebec',
  'economic',
  1.2,
  'interventionist',
  false
);

-- Q18 - Commune : Augmentation effectifs policiers
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q18_augmentation_effectifs_policiers',
  'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?',
  'Sécurité publique',
  'agreement',
  'Augmentation effectifs policiers sécurité',
  'standard',
  18,
  'quebec',
  'social',
  1.1,
  'conservative',
  false
);

-- Q19 - Commune : Investissement infrastructures loisirs/sport
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q19_investissement_infrastructures_loisirs_sportives',
  'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?',
  'Services municipaux',
  'agreement',
  'Investissement infrastructures loisirs/sport',
  'standard',
  19,
  'quebec',
  'economic',
  1.0,
  'interventionist',
  false
);

-- Q20 - Commune : Protection patrimoine
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'qc_q20_protection_patrimoine',
  'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?',
  'Patrimoine et développement',
  'agreement',
  'Protection patrimoine vs développement',
  'standard',
  20,
  'quebec',
  'social',
  1.1,
  'conservative',
  false
);

-- Q21 - Priorités Québec
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'qc_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Québec',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "Projet tramway", "Troisième lien"]'::jsonb,
  21,
  'quebec',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- MUNICIPALITÉ : MONTRÉAL (21 questions)
-- ============================================================================

-- Q1 - Spécifique Montréal : Extension métro/REM
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'mtl_q1_metro_rem',
  'Faut-il poursuivre l''extension du métro et du REM pour améliorer le transport structurant ?',
  'Transport et mobilité',
  'agreement',
  'Extension métro/REM transport structurant',
  'standard',
  1,
  'montreal',
  'economic',
  1.6,
  'interventionist',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'mtl_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'montreal',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Montréal : Autonomie arrondissements
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'mtl_q3_arrondissements_autonomie',
  'Faut-il donner plus d''autonomie aux arrondissements plutôt que de privilégier la coordination centralisée ?',
  'Gouvernance et participation',
  'agreement',
  'Autonomie arrondissements vs coordination',
  'standard',
  3,
  'montreal',
  'social',
  1.4,
  'decentralization',
  false
);

-- Questions communes Q4-Q20 pour Montréal (même texte, IDs différents)
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES
  ('mtl_q4_priorite_mobilite_active', 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?', 'Transport et mobilité', 'agreement', 'Priorité mobilité active vs stationnements', 'standard', 4, 'montreal', 'social', 1.2, 'progressive', false),
  ('mtl_q5_quotas_logements_abordables', 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?', 'Logement et aménagement urbain', 'agreement', 'Quotas obligatoires logements abordables', 'standard', 5, 'montreal', 'economic', 1.4, 'interventionist', false),
  ('mtl_q6_reduction_depenses_taxes', 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?', 'Finances municipales', 'agreement', 'Réduction dépenses/taxes selon capacité de payer', 'standard', 6, 'montreal', 'economic', 1.6, 'free_market', false),
  ('mtl_q7_immeubles_grande_hauteur', 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?', 'Logement et aménagement urbain', 'agreement', 'Immeubles grande hauteur pour densification', 'standard', 7, 'montreal', 'economic', 1.1, 'free_market', false),
  ('mtl_q8_interdire_essence_centre_ville', 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?', 'Environnement et développement durable', 'agreement', 'Interdire véhicules essence centre-ville 2035', 'standard', 8, 'montreal', 'social', 1.3, 'progressive', false),
  ('mtl_q9_protection_espaces_verts', 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?', 'Environnement et développement durable', 'agreement', 'Protection espaces verts vs immobilier', 'standard', 9, 'montreal', 'social', 1.4, 'progressive', false),
  ('mtl_q10_transition_carboneutre', 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?', 'Environnement et développement durable', 'agreement', 'Transition bâtiments carboneutres coûts', 'standard', 10, 'montreal', 'economic', 1.2, 'interventionist', false),
  ('mtl_q11_reduction_dechets', 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?', 'Services municipaux', 'agreement', 'Amélioration vs réduction collecte ordures', 'standard', 11, 'montreal', 'neutral', 1.0, 'neutral', false),
  ('mtl_q12_augmentation_taxes', 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?', 'Finances municipales', 'agreement', 'Augmentation taxes projets écoresponsables', 'standard', 12, 'montreal', 'economic', 1.5, 'interventionist', false),
  ('mtl_q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?', 'Gouvernance et participation', 'agreement', 'Pouvoir conseils quartier projets locaux', 'standard', 13, 'montreal', 'social', 1.1, 'decentralization', false),
  ('mtl_q14_reduction_dette', 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?', 'Gestion des priorités', 'agreement', 'Services essentiels vs projets avenir', 'standard', 14, 'montreal', 'economic', 1.3, 'conservative', false),
  ('mtl_q15_avantages_fiscaux_entreprises', 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?', 'Développement économique', 'agreement', 'Avantages fiscaux attraction entreprises', 'standard', 15, 'montreal', 'economic', 1.2, 'free_market', false),
  ('mtl_q16_limitation_touristes', 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?', 'Équilibre développement/qualité de vie', 'agreement', 'Limitation touristes qualité vie', 'standard', 16, 'montreal', 'social', 1.0, 'conservative', false),
  ('mtl_q17_soutien_organismes_communautaires', 'La ville devrait-elle augmenter le financement des organismes communautaires ?', 'Services sociaux', 'agreement', 'Financement organismes communautaires', 'standard', 17, 'montreal', 'economic', 1.2, 'interventionist', false),
  ('mtl_q18_augmentation_effectifs_policiers', 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?', 'Sécurité publique', 'agreement', 'Augmentation effectifs policiers sécurité', 'standard', 18, 'montreal', 'social', 1.1, 'conservative', false),
  ('mtl_q19_investissement_infrastructures_loisirs_sportives', 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?', 'Services municipaux', 'agreement', 'Investissement infrastructures loisirs/sport', 'standard', 19, 'montreal', 'economic', 1.0, 'interventionist', false),
  ('mtl_q20_protection_patrimoine', 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?', 'Patrimoine et développement', 'agreement', 'Protection patrimoine vs développement', 'standard', 20, 'montreal', 'social', 1.1, 'conservative', false);

-- Q21 - Priorités Montréal
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'mtl_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Montréal',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "Extension métro/REM", "Coordination arrondissements"]'::jsonb,
  21,
  'montreal',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- MUNICIPALITÉ : LONGUEUIL (21 questions)
-- ============================================================================

-- Q1 - Spécifique Longueuil : Transport métropolitain
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lng_q1_transport_metropolitain',
  'Faut-il développer davantage le transport métropolitain, notamment l''extension du REM vers la Rive-Sud ?',
  'Transport et mobilité',
  'agreement',
  'Transport métropolitain extension REM',
  'standard',
  1,
  'longueuil',
  'economic',
  1.5,
  'interventionist',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lng_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'longueuil',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Longueuil : Développement aéroportuaire
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lng_q3_developpement_aeroportuaire',
  'Faut-il limiter le développement aéroportuaire pour préserver la qualité de vie des résidents ?',
  'Équilibre développement/qualité de vie',
  'agreement',
  'Développement aéroportuaire vs qualité vie',
  'standard',
  3,
  'longueuil',
  'social',
  1.3,
  'conservative',
  false
);

-- Questions communes Q4-Q20 pour Longueuil
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES
  ('lng_q4_priorite_mobilite_active', 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?', 'Transport et mobilité', 'agreement', 'Priorité mobilité active vs stationnements', 'standard', 4, 'longueuil', 'social', 1.2, 'progressive', false),
  ('lng_q5_quotas_logements_abordables', 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?', 'Logement et aménagement urbain', 'agreement', 'Quotas obligatoires logements abordables', 'standard', 5, 'longueuil', 'economic', 1.4, 'interventionist', false),
  ('lng_q6_reduction_depenses_taxes', 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?', 'Finances municipales', 'agreement', 'Réduction dépenses/taxes selon capacité de payer', 'standard', 6, 'longueuil', 'economic', 1.6, 'free_market', false),
  ('lng_q7_immeubles_grande_hauteur', 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?', 'Logement et aménagement urbain', 'agreement', 'Immeubles grande hauteur pour densification', 'standard', 7, 'longueuil', 'economic', 1.1, 'free_market', false),
  ('lng_q8_interdire_essence_centre_ville', 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?', 'Environnement et développement durable', 'agreement', 'Interdire véhicules essence centre-ville 2035', 'standard', 8, 'longueuil', 'social', 1.3, 'progressive', false),
  ('lng_q9_protection_espaces_verts', 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?', 'Environnement et développement durable', 'agreement', 'Protection espaces verts vs immobilier', 'standard', 9, 'longueuil', 'social', 1.4, 'progressive', false),
  ('lng_q10_transition_carboneutre', 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?', 'Environnement et développement durable', 'agreement', 'Transition bâtiments carboneutres coûts', 'standard', 10, 'longueuil', 'economic', 1.2, 'interventionist', false),
  ('lng_q11_reduction_dechets', 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?', 'Services municipaux', 'agreement', 'Amélioration vs réduction collecte ordures', 'standard', 11, 'longueuil', 'neutral', 1.0, 'neutral', false),
  ('lng_q12_augmentation_taxes', 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?', 'Finances municipales', 'agreement', 'Augmentation taxes projets écoresponsables', 'standard', 12, 'longueuil', 'economic', 1.5, 'interventionist', false),
  ('lng_q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?', 'Gouvernance et participation', 'agreement', 'Pouvoir conseils quartier projets locaux', 'standard', 13, 'longueuil', 'social', 1.1, 'decentralization', false),
  ('lng_q14_reduction_dette', 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?', 'Gestion des priorités', 'agreement', 'Services essentiels vs projets avenir', 'standard', 14, 'longueuil', 'economic', 1.3, 'conservative', false),
  ('lng_q15_avantages_fiscaux_entreprises', 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?', 'Développement économique', 'agreement', 'Avantages fiscaux attraction entreprises', 'standard', 15, 'longueuil', 'economic', 1.2, 'free_market', false),
  ('lng_q16_limitation_touristes', 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?', 'Équilibre développement/qualité de vie', 'agreement', 'Limitation touristes qualité vie', 'standard', 16, 'longueuil', 'social', 1.0, 'conservative', false),
  ('lng_q17_soutien_organismes_communautaires', 'La ville devrait-elle augmenter le financement des organismes communautaires ?', 'Services sociaux', 'agreement', 'Financement organismes communautaires', 'standard', 17, 'longueuil', 'economic', 1.2, 'interventionist', false),
  ('lng_q18_augmentation_effectifs_policiers', 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?', 'Sécurité publique', 'agreement', 'Augmentation effectifs policiers sécurité', 'standard', 18, 'longueuil', 'social', 1.1, 'conservative', false),
  ('lng_q19_investissement_infrastructures_loisirs_sportives', 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?', 'Services municipaux', 'agreement', 'Investissement infrastructures loisirs/sport', 'standard', 19, 'longueuil', 'economic', 1.0, 'interventionist', false),
  ('lng_q20_protection_patrimoine', 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?', 'Patrimoine et développement', 'agreement', 'Protection patrimoine vs développement', 'standard', 20, 'longueuil', 'social', 1.1, 'conservative', false);

-- Q21 - Priorités Longueuil
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'lng_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Longueuil',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "Transport métropolitain", "Développement aéroportuaire"]'::jsonb,
  21,
  'longueuil',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- MUNICIPALITÉ : LÉVIS (21 questions)
-- ============================================================================

-- Q1 - Spécifique Lévis : Troisième lien
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lev_q1_troisieme_lien',
  'Quel tracé devrait-on privilégier pour le troisième lien routier ?',
  'Transport et mobilité',
  'agreement',
  'Troisième lien routier (tracé)',
  'standard',
  1,
  'levis',
  'economic',
  1.7,
  'free_market',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lev_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'levis',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Lévis : Traverse Québec-Lévis
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lev_q3_traverse_quebec_levis',
  'Faut-il améliorer la traverse Québec-Lévis pour le transport collectif ?',
  'Transport et mobilité',
  'agreement',
  'Traverse Québec-Lévis transport collectif',
  'standard',
  3,
  'levis',
  'economic',
  1.3,
  'interventionist',
  false
);

-- Questions communes Q4-Q20 pour Lévis
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES
  ('lev_q4_priorite_mobilite_active', 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?', 'Transport et mobilité', 'agreement', 'Priorité mobilité active vs stationnements', 'standard', 4, 'levis', 'social', 1.2, 'progressive', false),
  ('lev_q5_quotas_logements_abordables', 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?', 'Logement et aménagement urbain', 'agreement', 'Quotas obligatoires logements abordables', 'standard', 5, 'levis', 'economic', 1.4, 'interventionist', false),
  ('lev_q6_reduction_depenses_taxes', 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?', 'Finances municipales', 'agreement', 'Réduction dépenses/taxes selon capacité de payer', 'standard', 6, 'levis', 'economic', 1.6, 'free_market', false),
  ('lev_q7_immeubles_grande_hauteur', 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?', 'Logement et aménagement urbain', 'agreement', 'Immeubles grande hauteur pour densification', 'standard', 7, 'levis', 'economic', 1.1, 'free_market', false),
  ('lev_q8_interdire_essence_centre_ville', 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?', 'Environnement et développement durable', 'agreement', 'Interdire véhicules essence centre-ville 2035', 'standard', 8, 'levis', 'social', 1.3, 'progressive', false),
  ('lev_q9_protection_espaces_verts', 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?', 'Environnement et développement durable', 'agreement', 'Protection espaces verts vs immobilier', 'standard', 9, 'levis', 'social', 1.4, 'progressive', false),
  ('lev_q10_transition_carboneutre', 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?', 'Environnement et développement durable', 'agreement', 'Transition bâtiments carboneutres coûts', 'standard', 10, 'levis', 'economic', 1.2, 'interventionist', false),
  ('lev_q11_reduction_dechets', 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?', 'Services municipaux', 'agreement', 'Amélioration vs réduction collecte ordures', 'standard', 11, 'levis', 'neutral', 1.0, 'neutral', false),
  ('lev_q12_augmentation_taxes', 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?', 'Finances municipales', 'agreement', 'Augmentation taxes projets écoresponsables', 'standard', 12, 'levis', 'economic', 1.5, 'interventionist', false),
  ('lev_q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?', 'Gouvernance et participation', 'agreement', 'Pouvoir conseils quartier projets locaux', 'standard', 13, 'levis', 'social', 1.1, 'decentralization', false),
  ('lev_q14_reduction_dette', 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?', 'Gestion des priorités', 'agreement', 'Services essentiels vs projets avenir', 'standard', 14, 'levis', 'economic', 1.3, 'conservative', false),
  ('lev_q15_avantages_fiscaux_entreprises', 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?', 'Développement économique', 'agreement', 'Avantages fiscaux attraction entreprises', 'standard', 15, 'levis', 'economic', 1.2, 'free_market', false),
  ('lev_q16_limitation_touristes', 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?', 'Équilibre développement/qualité de vie', 'agreement', 'Limitation touristes qualité vie', 'standard', 16, 'levis', 'social', 1.0, 'conservative', false),
  ('lev_q17_soutien_organismes_communautaires', 'La ville devrait-elle augmenter le financement des organismes communautaires ?', 'Services sociaux', 'agreement', 'Financement organismes communautaires', 'standard', 17, 'levis', 'economic', 1.2, 'interventionist', false),
  ('lev_q18_augmentation_effectifs_policiers', 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?', 'Sécurité publique', 'agreement', 'Augmentation effectifs policiers sécurité', 'standard', 18, 'levis', 'social', 1.1, 'conservative', false),
  ('lev_q19_investissement_infrastructures_loisirs_sportives', 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?', 'Services municipaux', 'agreement', 'Investissement infrastructures loisirs/sport', 'standard', 19, 'levis', 'economic', 1.0, 'interventionist', false),
  ('lev_q20_protection_patrimoine', 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?', 'Patrimoine et développement', 'agreement', 'Protection patrimoine vs développement', 'standard', 20, 'levis', 'social', 1.1, 'conservative', false);

-- Q21 - Priorités Lévis
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'lev_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Lévis',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "Troisième lien routier", "Traverse Québec-Lévis"]'::jsonb,
  21,
  'levis',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- MUNICIPALITÉ : LAVAL (21 questions)
-- ============================================================================

-- Q1 - Spécifique Laval : SRB vers Montréal
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lav_q1_srb_montreal',
  'Faut-il développer le SRB (Service rapide par bus) pour améliorer le transport vers Montréal ?',
  'Transport et mobilité',
  'agreement',
  'SRB transport vers Montréal',
  'standard',
  1,
  'laval',
  'economic',
  1.4,
  'interventionist',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lav_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'laval',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Laval : Équilibre développement/espaces verts
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'lav_q3_equilibre_developpement_espaces_verts',
  'Comment trouver l''équilibre entre développement urbain et préservation des espaces verts ?',
  'Environnement et développement durable',
  'agreement',
  'Équilibre développement/espaces verts',
  'standard',
  3,
  'laval',
  'social',
  1.5,
  'progressive',
  false
);

-- Questions communes Q4-Q20 pour Laval
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES
  ('lav_q4_priorite_mobilite_active', 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?', 'Transport et mobilité', 'agreement', 'Priorité mobilité active vs stationnements', 'standard', 4, 'laval', 'social', 1.2, 'progressive', false),
  ('lav_q5_quotas_logements_abordables', 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?', 'Logement et aménagement urbain', 'agreement', 'Quotas obligatoires logements abordables', 'standard', 5, 'laval', 'economic', 1.4, 'interventionist', false),
  ('lav_q6_reduction_depenses_taxes', 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?', 'Finances municipales', 'agreement', 'Réduction dépenses/taxes selon capacité de payer', 'standard', 6, 'laval', 'economic', 1.6, 'free_market', false),
  ('lav_q7_immeubles_grande_hauteur', 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?', 'Logement et aménagement urbain', 'agreement', 'Immeubles grande hauteur pour densification', 'standard', 7, 'laval', 'economic', 1.1, 'free_market', false),
  ('lav_q8_interdire_essence_centre_ville', 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?', 'Environnement et développement durable', 'agreement', 'Interdire véhicules essence centre-ville 2035', 'standard', 8, 'laval', 'social', 1.3, 'progressive', false),
  ('lav_q9_protection_espaces_verts', 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?', 'Environnement et développement durable', 'agreement', 'Protection espaces verts vs immobilier', 'standard', 9, 'laval', 'social', 1.4, 'progressive', false),
  ('lav_q10_transition_carboneutre', 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?', 'Environnement et développement durable', 'agreement', 'Transition bâtiments carboneutres coûts', 'standard', 10, 'laval', 'economic', 1.2, 'interventionist', false),
  ('lav_q11_reduction_dechets', 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?', 'Services municipaux', 'agreement', 'Amélioration vs réduction collecte ordures', 'standard', 11, 'laval', 'neutral', 1.0, 'neutral', false),
  ('lav_q12_augmentation_taxes', 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?', 'Finances municipales', 'agreement', 'Augmentation taxes projets écoresponsables', 'standard', 12, 'laval', 'economic', 1.5, 'interventionist', false),
  ('lav_q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?', 'Gouvernance et participation', 'agreement', 'Pouvoir conseils quartier projets locaux', 'standard', 13, 'laval', 'social', 1.1, 'decentralization', false),
  ('lav_q14_reduction_dette', 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?', 'Gestion des priorités', 'agreement', 'Services essentiels vs projets avenir', 'standard', 14, 'laval', 'economic', 1.3, 'conservative', false),
  ('lav_q15_avantages_fiscaux_entreprises', 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?', 'Développement économique', 'agreement', 'Avantages fiscaux attraction entreprises', 'standard', 15, 'laval', 'economic', 1.2, 'free_market', false),
  ('lav_q16_limitation_touristes', 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?', 'Équilibre développement/qualité de vie', 'agreement', 'Limitation touristes qualité vie', 'standard', 16, 'laval', 'social', 1.0, 'conservative', false),
  ('lav_q17_soutien_organismes_communautaires', 'La ville devrait-elle augmenter le financement des organismes communautaires ?', 'Services sociaux', 'agreement', 'Financement organismes communautaires', 'standard', 17, 'laval', 'economic', 1.2, 'interventionist', false),
  ('lav_q18_augmentation_effectifs_policiers', 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?', 'Sécurité publique', 'agreement', 'Augmentation effectifs policiers sécurité', 'standard', 18, 'laval', 'social', 1.1, 'conservative', false),
  ('lav_q19_investissement_infrastructures_loisirs_sportives', 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?', 'Services municipaux', 'agreement', 'Investissement infrastructures loisirs/sport', 'standard', 19, 'laval', 'economic', 1.0, 'interventionist', false),
  ('lav_q20_protection_patrimoine', 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?', 'Patrimoine et développement', 'agreement', 'Protection patrimoine vs développement', 'standard', 20, 'laval', 'social', 1.1, 'conservative', false);

-- Q21 - Priorités Laval
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'lav_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Laval',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "SRB vers Montréal", "Équilibre développement/espaces verts"]'::jsonb,
  21,
  'laval',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- MUNICIPALITÉ : GATINEAU (21 questions)
-- ============================================================================

-- Q1 - Spécifique Gatineau : Services bilingues
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'gat_q1_services_bilingues',
  'Faut-il offrir des services municipaux bilingues français-anglais ?',
  'Services municipaux',
  'agreement',
  'Services bilingues municipaux français-anglais',
  'standard',
  1,
  'gatineau',
  'social',
  1.3,
  'progressive',
  false
);

-- Q2 - Commune : Pistes cyclables
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'gat_q2_pistes_cyclables',
  'Faut-il prioriser le développement des pistes cyclables même si cela réduit l''espace pour l''automobile ?',
  'Transport et mobilité',
  'agreement',
  'Équilibre mobilité active vs circulation automobile',
  'standard',
  2,
  'gatineau',
  'social',
  1.2,
  'progressive',
  false
);

-- Q3 - Spécifique Gatineau : Partenariats Ottawa
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES (
  'gat_q3_partenariats_ottawa',
  'Faut-il développer davantage la coordination et les partenariats avec Ottawa ?',
  'Gouvernance et participation',
  'agreement',
  'Coordination/partenariats avec Ottawa',
  'standard',
  3,
  'gatineau',
  'social',
  1.2,
  'collaborative',
  false
);

-- Questions communes Q4-Q20 pour Gatineau
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  order_index, municipality_id, political_axis, political_weight,
  political_interpretation, score_inversion
) VALUES
  ('gat_q4_priorite_mobilite_active', 'La ville devrait-elle donner la priorité à la mobilité active (vélo, marche) au centre-ville, même si cela signifie réduire les stationnements ?', 'Transport et mobilité', 'agreement', 'Priorité mobilité active vs stationnements', 'standard', 4, 'gatineau', 'social', 1.2, 'progressive', false),
  ('gat_q5_quotas_logements_abordables', 'La ville devrait-elle imposer des quotas obligatoires de logements abordables dans les nouveaux développements ?', 'Logement et aménagement urbain', 'agreement', 'Quotas obligatoires logements abordables', 'standard', 5, 'gatineau', 'economic', 1.4, 'interventionist', false),
  ('gat_q6_reduction_depenses_taxes', 'La ville devrait-elle réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens ?', 'Finances municipales', 'agreement', 'Réduction dépenses/taxes selon capacité de payer', 'standard', 6, 'gatineau', 'economic', 1.6, 'free_market', false),
  ('gat_q7_immeubles_grande_hauteur', 'Faut-il encourager la construction d''immeubles de grande hauteur pour optimiser l''utilisation des terrains ?', 'Logement et aménagement urbain', 'agreement', 'Immeubles grande hauteur pour densification', 'standard', 7, 'gatineau', 'economic', 1.1, 'free_market', false),
  ('gat_q8_interdire_essence_centre_ville', 'La ville devrait-elle interdire les véhicules à essence au centre-ville d''ici 2035 ?', 'Environnement et développement durable', 'agreement', 'Interdire véhicules essence centre-ville 2035', 'standard', 8, 'gatineau', 'social', 1.3, 'progressive', false),
  ('gat_q9_protection_espaces_verts', 'Faut-il protéger davantage les espaces verts, même si cela limite le développement immobilier ?', 'Environnement et développement durable', 'agreement', 'Protection espaces verts vs immobilier', 'standard', 9, 'gatineau', 'social', 1.4, 'progressive', false),
  ('gat_q10_transition_carboneutre', 'La ville devrait-elle exiger que tous les nouveaux bâtiments soient carboneutres, même si cela augmente les coûts ?', 'Environnement et développement durable', 'agreement', 'Transition bâtiments carboneutres coûts', 'standard', 10, 'gatineau', 'economic', 1.2, 'interventionist', false),
  ('gat_q11_reduction_dechets', 'Faut-il améliorer la fréquence de collecte des ordures plutôt que la réduire pour des raisons environnementales ?', 'Services municipaux', 'agreement', 'Amélioration vs réduction collecte ordures', 'standard', 11, 'gatineau', 'neutral', 1.0, 'neutral', false),
  ('gat_q12_augmentation_taxes', 'Accepteriez-vous une augmentation de taxes pour financer des projets écoresponsables ?', 'Finances municipales', 'agreement', 'Augmentation taxes projets écoresponsables', 'standard', 12, 'gatineau', 'economic', 1.5, 'interventionist', false),
  ('gat_q13_pouvoir_conseils_quartier', 'Les conseils de quartier devraient-ils avoir plus de pouvoir décisionnel sur les projets locaux ?', 'Gouvernance et participation', 'agreement', 'Pouvoir conseils quartier projets locaux', 'standard', 13, 'gatineau', 'social', 1.1, 'decentralization', false),
  ('gat_q14_reduction_dette', 'La ville devrait-elle prioriser le maintien des services essentiels plutôt que d''investir dans des projets d''avenir ?', 'Gestion des priorités', 'agreement', 'Services essentiels vs projets avenir', 'standard', 14, 'gatineau', 'economic', 1.3, 'conservative', false),
  ('gat_q15_avantages_fiscaux_entreprises', 'La ville devrait-elle offrir plus d''avantages fiscaux pour attirer les entreprises ?', 'Développement économique', 'agreement', 'Avantages fiscaux attraction entreprises', 'standard', 15, 'gatineau', 'economic', 1.2, 'free_market', false),
  ('gat_q16_limitation_touristes', 'Faut-il limiter le nombre de touristes pour préserver la qualité de vie des résidents ?', 'Équilibre développement/qualité de vie', 'agreement', 'Limitation touristes qualité vie', 'standard', 16, 'gatineau', 'social', 1.0, 'conservative', false),
  ('gat_q17_soutien_organismes_communautaires', 'La ville devrait-elle augmenter le financement des organismes communautaires ?', 'Services sociaux', 'agreement', 'Financement organismes communautaires', 'standard', 17, 'gatineau', 'economic', 1.2, 'interventionist', false),
  ('gat_q18_augmentation_effectifs_policiers', 'Faut-il augmenter les effectifs policiers pour améliorer la sécurité ?', 'Sécurité publique', 'agreement', 'Augmentation effectifs policiers sécurité', 'standard', 18, 'gatineau', 'social', 1.1, 'conservative', false),
  ('gat_q19_investissement_infrastructures_loisirs_sportives', 'La ville devrait-elle investir davantage dans les infrastructures de loisirs et sportives ?', 'Services municipaux', 'agreement', 'Investissement infrastructures loisirs/sport', 'standard', 19, 'gatineau', 'economic', 1.0, 'interventionist', false),
  ('gat_q20_protection_patrimoine', 'Faut-il renforcer les règles de protection du patrimoine, même si cela limite le développement ?', 'Patrimoine et développement', 'agreement', 'Protection patrimoine vs développement', 'standard', 20, 'gatineau', 'social', 1.1, 'conservative', false);

-- Q21 - Priorités Gatineau
INSERT INTO public.questions (
  id, text, category, response_type, description, response_format,
  priority_options, order_index, municipality_id, political_axis,
  political_weight, political_interpretation, score_inversion
) VALUES (
  'gat_q21_enjeux_prioritaires',
  'Classez par ordre de priorité les enjeux suivants pour Gatineau',
  'Enjeux prioritaires',
  'priority_ranking',
  'Classement priorités municipales',
  'priority',
  '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Gestion des finances municipales", "Services municipaux", "Sécurité publique", "Développement économique et social", "Gouvernance et participation citoyenne", "Services bilingues", "Partenariats Ottawa"]'::jsonb,
  21,
  'gatineau',
  'neutral',
  2.0,
  'neutral',
  false
);

-- ============================================================================
-- FIN - 126 questions insérées (21 × 6 municipalités)
-- ============================================================================