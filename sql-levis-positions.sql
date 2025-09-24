-- ================================================================
-- INSERTION DES POSITIONS POLITIQUES - LÉVIS
-- ================================================================
-- Date: 2025-09-23
-- Source: Analyse basée sur recherches Radio-Canada, Le Devoir, Journal de Lévis, sites officiels
-- Total: 60 positions (3 partis × 20 questions)
-- Codes: FA=Fortement d'accord, PA=Plutôt d'accord, N=Neutre, PD=Plutôt en désaccord, FD=Fortement en désaccord, IDK=Ne sais pas

-- ================================================================
-- POSITIONS LÉVIS FORCE 10 (centre)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Lévis
('levis_force_10_lev', 'lev_q3_troisieme_lien', 'PA', 'Continuité politique', 'Continuité avec position Lehouillier favorable au 3e lien'),
('levis_force_10_lev', 'lev_traverse_quebec_levis', 'PA', 'Cohérence transport', 'Amélioration services transport collectif cohérente avec réalisations'),

-- Questions génériques adaptées
('levis_force_10_lev', 'lev_q2_pistes_cyclables', 'PA', 'Site web réalisations', 'Réalisations mobilité durable et transport actif documentées'),
('levis_force_10_lev', 'lev_q4_priorite_mobilite_active', 'N', 'Approche équilibrée', 'Position modérée entre développement urbain et mobilité active'),
('levis_force_10_lev', 'lev_q5_quotas_logements_abordables', 'N', 'Pas de position claire', 'Aucune position explicite sur quotas logements dans programme'),
('levis_force_10_lev', 'lev_q6_reduction_depenses_taxes', 'FA', 'Journal Lévis', 'Engagement central: hausse taxes limitée maximum à l''inflation'),
('levis_force_10_lev', 'lev_q7_immeubles_grande_hauteur', 'N', 'Équilibre développement', 'Approche pragmatique développement sans position radicale'),
('levis_force_10_lev', 'lev_q8_interdire_essence_centre_ville', 'PD', 'Approche modérée', 'Résistance aux mesures environnementales radicales'),
('levis_force_10_lev', 'lev_q9_protection_espaces_verts', 'PA', 'Site web réalisations', 'Réalisations environnementales et qualité de vie prioritaires'),
('levis_force_10_lev', 'lev_q10_transition_carboneutre', 'N', 'Position équilibrée', 'Transition écologique sans engagement radical'),
('levis_force_10_lev', 'lev_q11_reduction_dechets', 'N', 'Services municipaux', 'Maintien qualité services sans réduction drastique'),
('levis_force_10_lev', 'lev_q12_augmentation_taxes', 'PD', 'Engagement fiscal', 'Opposition hausses taxes au-delà inflation'),
('levis_force_10_lev', 'lev_q13_pouvoir_conseils_quartier', 'N', 'Gouvernance actuelle', 'Continuité structure gouvernance existante'),
('levis_force_10_lev', 'lev_q14_reduction_dette', 'PA', 'Gestion responsable', 'Priorité services essentiels dans gestion rigoureuse'),
('levis_force_10_lev', 'lev_q15_avantages_fiscaux_entreprises', 'PA', 'Croissance économique', 'Réalisations croissance économique documentées'),
('levis_force_10_lev', 'lev_q16_limitation_touristes', 'N', 'Équilibre développement', 'Position modérée entre développement et qualité de vie'),
('levis_force_10_lev', 'lev_q17_soutien_organismes_communautaires', 'N', 'Approche équilibrée', 'Soutien sans engagement spécifique augmentation'),
('levis_force_10_lev', 'lev_q18_augmentation_effectifs_policiers', 'N', 'Évaluation besoins', 'Approche pragmatique selon besoins locaux'),
('levis_force_10_lev', 'lev_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Qualité de vie', 'Réalisations qualité de vie et services proximité'),
('levis_force_10_lev', 'lev_q20_protection_patrimoine', 'PA', 'Équilibre développement', 'Protection patrimoine avec développement responsable');

-- ================================================================
-- POSITIONS REPENSONS LÉVIS (centre-gauche)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Lévis
('repensons_levis_lev', 'lev_q3_troisieme_lien', 'N', 'Position opposition', 'Position non claire de l''opposition, approche prudente'),
('repensons_levis_lev', 'lev_traverse_quebec_levis', 'PA', 'Transport collectif', 'Cohérent avec vision transport durable et services'),

-- Questions génériques adaptées
('repensons_levis_lev', 'lev_q2_pistes_cyclables', 'PA', 'Vision progressiste', 'Orientation centre-gauche favorable transport actif'),
('repensons_levis_lev', 'lev_q4_priorite_mobilite_active', 'PA', 'Mobilité durable', 'Soutien priorité transports actifs et durables'),
('repensons_levis_lev', 'lev_q5_quotas_logements_abordables', 'PA', 'Justice sociale', 'Cohérent avec réduction iniquités et justice sociale'),
('repensons_levis_lev', 'lev_q6_reduction_depenses_taxes', 'FA', 'Journal Lévis', 'Engagement central: plafonnement taxes résidentielles à l''IPC'),
('repensons_levis_lev', 'lev_q7_immeubles_grande_hauteur', 'N', 'Développement encadré', 'Pilier développement encadré sans position extrême'),
('repensons_levis_lev', 'lev_q8_interdire_essence_centre_ville', 'N', 'Transition progressive', 'Approche environnementale progressive sans radicalisme'),
('repensons_levis_lev', 'lev_q9_protection_espaces_verts', 'PA', 'Enjeux environnementaux', 'Enjeux environnementaux dans mandat du parti'),
('repensons_levis_lev', 'lev_q10_transition_carboneutre', 'PA', 'Vision environnementale', 'Soutien transition écologique cohérent orientation'),
('repensons_levis_lev', 'lev_q11_reduction_dechets', 'N', 'Services équilibrés', 'Équilibre entre services municipaux et environnement'),
('repensons_levis_lev', 'lev_q12_augmentation_taxes', 'N', 'Fiscalité équilibrée', 'Acceptation sélective hausses pour projets prioritaires'),
('repensons_levis_lev', 'lev_q13_pouvoir_conseils_quartier', 'FA', 'Site web RL', 'Participation citoyenne et pouvoir aux arrondissements prioritaire'),
('repensons_levis_lev', 'lev_q14_reduction_dette', 'PA', 'Programme 4 piliers', 'Pilier prioriser entretien infrastructures existantes'),
('repensons_levis_lev', 'lev_q15_avantages_fiscaux_entreprises', 'PD', 'Vision sociale', 'Résistance avantages fiscaux sans contreparties sociales'),
('repensons_levis_lev', 'lev_q16_limitation_touristes', 'N', 'Équilibre local', 'Position modérée développement vs qualité vie locale'),
('repensons_levis_lev', 'lev_q17_soutien_organismes_communautaires', 'FA', 'Programme social', 'Réduction iniquités et enjeux sociaux dans mandat'),
('repensons_levis_lev', 'lev_q18_augmentation_effectifs_policiers', 'N', 'Sécurité alternative', 'Pilier sécurité sans focus exclusif sur policiers'),
('repensons_levis_lev', 'lev_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Services proximité', 'Priorité infrastructures et services de proximité'),
('repensons_levis_lev', 'lev_q20_protection_patrimoine', 'PA', 'Patrimoine citoyen', 'Protection patrimoine cohérente avec participation citoyenne');

-- ================================================================
-- POSITIONS PROSPÉRITÉ LÉVIS (centre-droit)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Lévis
('prosperite_levis_lev', 'lev_q3_troisieme_lien', 'FA', 'Radio-Canada', 'Position très claire pour 3e lien à l''est, opposition au tracé central'),
('prosperite_levis_lev', 'lev_traverse_quebec_levis', 'PA', 'Mobilité globale', 'Amélioration mobilité cohérente avec focus circulation'),

-- Questions génériques adaptées
('prosperite_levis_lev', 'lev_q2_pistes_cyclables', 'N', 'Mobilité automobile', 'Focus circulation automobile, position neutre sur vélo'),
('prosperite_levis_lev', 'lev_q4_priorite_mobilite_active', 'PD', 'Circulation auto', 'Opposition réduction espace automobile pour mobilité active'),
('prosperite_levis_lev', 'lev_q5_quotas_logements_abordables', 'N', 'Développement marché', 'Développement responsable sans contraintes réglementaires'),
('prosperite_levis_lev', 'lev_q6_reduction_depenses_taxes', 'PA', 'Responsabilité fiscale', 'Gestion rigoureuse et responsabilité fiscale intergénérationnelle'),
('prosperite_levis_lev', 'lev_q7_immeubles_grande_hauteur', 'PA', 'Développement efficace', 'Optimisation utilisation terrains pour développement'),
('prosperite_levis_lev', 'lev_q8_interdire_essence_centre_ville', 'FD', 'Vision circulation', 'Opposition aux mesures environnementales radicales, focus mobilité automobile'),
('prosperite_levis_lev', 'lev_q9_protection_espaces_verts', 'N', 'Équilibre développement', 'Équilibre entre développement et espaces verts'),
('prosperite_levis_lev', 'lev_q10_transition_carboneutre', 'N', 'Coûts-bénéfices', 'Transition écologique avec considération coûts'),
('prosperite_levis_lev', 'lev_q11_reduction_dechets', 'PA', 'Services efficaces', 'Maintien et amélioration services municipaux'),
('prosperite_levis_lev', 'lev_q12_augmentation_taxes', 'PD', 'Gestion rigoureuse', 'Opposition hausses taxes, priorité gestion efficace'),
('prosperite_levis_lev', 'lev_q13_pouvoir_conseils_quartier', 'N', 'Gouvernance efficace', 'Focus efficacité administrative sur décentralisation'),
('prosperite_levis_lev', 'lev_q14_reduction_dette', 'FA', 'Site web PL', 'Gestion rigoureuse et responsabilité fiscale intergénérationnelle'),
('prosperite_levis_lev', 'lev_q15_avantages_fiscaux_entreprises', 'PA', 'Développement économique', 'Attraction entreprises pour développement économique'),
('prosperite_levis_lev', 'lev_q16_limitation_touristes', 'PD', 'Développement économique', 'Opposition limitations développement économique et touristique'),
('prosperite_levis_lev', 'lev_q17_soutien_organismes_communautaires', 'N', 'Efficacité services', 'Soutien ciblé sans engagement augmentation systématique'),
('prosperite_levis_lev', 'lev_q18_augmentation_effectifs_policiers', 'PA', 'Radio-Canada', 'Engagement assurer sécurité dans les quartiers'),
('prosperite_levis_lev', 'lev_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Radio-Canada', 'Engagement soutien infrastructures sportives et communautaires'),
('prosperite_levis_lev', 'lev_q20_protection_patrimoine', 'PA', 'Site web PL', 'Sentiment d''appartenance et valorisation patrimoine');

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que toutes les positions ont été insérées
SELECT
    COUNT(*) as total_positions_levis,
    COUNT(DISTINCT party_id) as nombre_partis,
    COUNT(DISTINCT question_id) as nombre_questions
FROM public.party_positions
WHERE party_id LIKE '%_lev';

-- Vérifier la répartition par parti
SELECT
    party_id,
    COUNT(*) as positions_par_parti
FROM public.party_positions
WHERE party_id LIKE '%_lev'
GROUP BY party_id
ORDER BY party_id;

-- Vérifier qu'aucune position n'est manquante
SELECT
    q.id as question_id,
    COUNT(pp.party_id) as partis_avec_position
FROM public.questions q
LEFT JOIN public.party_positions pp ON q.id = pp.question_id AND pp.party_id LIKE '%_lev'
WHERE q.id LIKE 'lev_%'
GROUP BY q.id
HAVING COUNT(pp.party_id) < 3
ORDER BY q.id;