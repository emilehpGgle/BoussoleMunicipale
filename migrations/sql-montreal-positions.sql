-- ================================================================
-- INSERTION DES POSITIONS POLITIQUES - MONTRÉAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Analyse basée sur recherches Radio-Canada, Le Devoir, La Presse, sites officiels
-- Total: 105 positions (5 partis × 21 questions)
-- Codes: FA=Fortement d'accord, PA=Plutôt d'accord, N=Neutre, PD=Plutôt en désaccord, FD=Fortement en désaccord, IDK=Ne sais pas

-- ================================================================
-- POSITIONS PROJET MONTRÉAL (centre-gauche)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Montréal
('projet_montreal_mtl', 'mtl_metro_rem', 'FA', 'Radio-Canada', 'Luc Rabouin soutient fortement la mobilité structurante et les investissements en transport collectif'),
('projet_montreal_mtl', 'mtl_arrondissements_autonomie', 'PA', 'Le Devoir', 'Approche équilibrée entre autonomie locale et coordination centrale'),
('projet_montreal_mtl', 'mtl_festivals_equilibre', 'PA', 'Plateformes électorales', 'Équilibre entre attractivité culturelle et qualité de vie résidentielle'),

-- Questions génériques adaptées
('projet_montreal_mtl', 'mtl_q2_pistes_cyclables', 'FA', 'Continuité PM', 'Continuité de la vision Projet Montréal pro-vélo et mobilité active'),
('projet_montreal_mtl', 'mtl_q4_priorite_mobilite_active', 'FA', 'Programmes 2025', 'Priorité maintenue pour piétons, cyclistes et transport collectif'),
('projet_montreal_mtl', 'mtl_q5_quotas_logements_abordables', 'FA', 'Radio-Canada', 'Création fonds d''investissement logement, 1000 logements transitoires itinérance'),
('projet_montreal_mtl', 'mtl_q6_reduction_depenses_taxes', 'PD', 'Le Devoir', 'Approche interventionniste maintenue malgré virage pragmatique'),
('projet_montreal_mtl', 'mtl_q7_immeubles_grande_hauteur', 'PA', 'Politiques urbaines', 'Densification responsable pour optimiser l''espace urbain'),
('projet_montreal_mtl', 'mtl_q8_interdire_essence_centre_ville', 'PA', 'Engagement écologique', 'Transition écologique progressive vers véhicules propres'),
('projet_montreal_mtl', 'mtl_q9_protection_espaces_verts', 'FA', 'Plateforme environnementale', 'Protection et expansion des espaces verts prioritaires'),
('projet_montreal_mtl', 'mtl_q10_transition_carboneutre', 'FA', 'Engagements climatiques', 'Accélération transition écologique malgré coûts'),
('projet_montreal_mtl', 'mtl_q11_reduction_dechets', 'PD', 'Vision environnementale', 'Priorité à la réduction plutôt qu''augmentation collectes'),
('projet_montreal_mtl', 'mtl_q12_augmentation_taxes', 'PA', 'Financement projets', 'Acceptation hausses pour projets écoresponsables prioritaires'),
('projet_montreal_mtl', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Décentralisation', 'Renforcement autonomie arrondissements avec coordination'),
('projet_montreal_mtl', 'mtl_q14_reduction_dette', 'PD', 'Vision long terme', 'Priorité aux projets d''avenir plutôt que services de base seulement'),
('projet_montreal_mtl', 'mtl_q15_avantages_fiscaux_entreprises', 'PD', 'Approche sociale', 'Résistance aux avantages fiscaux sans contreparties sociales'),
('projet_montreal_mtl', 'mtl_q16_limitation_touristes', 'PA', 'Équilibre résidentiel', 'Gestion équilibrée entre tourisme et qualité de vie locale'),
('projet_montreal_mtl', 'mtl_q17_soutien_organismes_communautaires', 'FA', 'Priorité sociale', 'Augmentation soutien organismes services sociaux essentiels'),
('projet_montreal_mtl', 'mtl_q18_augmentation_effectifs_policiers', 'N', 'Approche équilibrée', 'Évaluation case-by-case selon besoins locaux'),
('projet_montreal_mtl', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Services proximité', 'Investissements parcs, arénas et terrains de quartier'),
('projet_montreal_mtl', 'mtl_q20_protection_patrimoine', 'PA', 'Patrimoine urbain', 'Protection patrimoine avec développement responsable');

-- ================================================================
-- POSITIONS ENSEMBLE MONTRÉAL (centre-droit)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Montréal
('ensemble_montreal_mtl', 'mtl_metro_rem', 'PA', 'Déclarations publiques', 'Soutien transport collectif avec gestion financière rigoureuse'),
('ensemble_montreal_mtl', 'mtl_arrondissements_autonomie', 'FA', 'Plateforme décentralisation', 'Forte décentralisation pour efficacité administrative'),
('ensemble_montreal_mtl', 'mtl_festivals_equilibre', 'N', 'Position équilibrée', 'Équilibre économie touristique et qualité vie résidents'),

-- Questions génériques
('ensemble_montreal_mtl', 'mtl_q2_pistes_cyclables', 'N', 'Approche pragmatique', 'Développement cyclable avec consultation usagers route'),
('ensemble_montreal_mtl', 'mtl_q4_priorite_mobilite_active', 'PD', 'Équilibre modal', 'Résistance réduction drastique espace automobile'),
('ensemble_montreal_mtl', 'mtl_q5_quotas_logements_abordables', 'PA', 'Le Devoir', 'Exemption permis construction logements sociaux/abordables'),
('ensemble_montreal_mtl', 'mtl_q6_reduction_depenses_taxes', 'FA', 'La Presse', 'Proposition réduction 1000 postes fonction publique'),
('ensemble_montreal_mtl', 'mtl_q7_immeubles_grande_hauteur', 'PA', 'Développement économique', 'Densification pour attractivité économique'),
('ensemble_montreal_mtl', 'mtl_q8_interdire_essence_centre_ville', 'PD', 'Réalisme économique', 'Opposition mesures trop restrictives mobilité'),
('ensemble_montreal_mtl', 'mtl_q9_protection_espaces_verts', 'N', 'Équilibre développement', 'Balance espaces verts et développement économique'),
('ensemble_montreal_mtl', 'mtl_q10_transition_carboneutre', 'N', 'Pragmatisme économique', 'Transition écologique avec considération coûts'),
('ensemble_montreal_mtl', 'mtl_q11_reduction_dechets', 'PA', 'Services municipaux', 'Amélioration services collecte prioritaire'),
('ensemble_montreal_mtl', 'mtl_q12_augmentation_taxes', 'PD', 'Gestion fiscale', 'Résistance hausses taxes, préférence efficacité'),
('ensemble_montreal_mtl', 'mtl_q13_pouvoir_conseils_quartier', 'FA', 'Décentralisation forte', 'Autonomie maximale arrondissements pour efficacité'),
('ensemble_montreal_mtl', 'mtl_q14_reduction_dette', 'FA', 'Priorités services', 'Services essentiels avant projets d''avenir'),
('ensemble_montreal_mtl', 'mtl_q15_avantages_fiscaux_entreprises', 'FA', 'Attractivité économique', 'Incitations fiscales pour attirer grandes entreprises'),
('ensemble_montreal_mtl', 'mtl_q16_limitation_touristes', 'PD', 'Économie touristique', 'Opposition limitations nuisant économie locale'),
('ensemble_montreal_mtl', 'mtl_q17_soutien_organismes_communautaires', 'N', 'Approche sélective', 'Soutien ciblé avec évaluation efficacité'),
('ensemble_montreal_mtl', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Renforcement sécurité avec plus d''effectifs'),
('ensemble_montreal_mtl', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Services population', 'Investissements infrastructures communautaires'),
('ensemble_montreal_mtl', 'mtl_q20_protection_patrimoine', 'N', 'Équilibre développement', 'Protection patrimoniale avec flexibilité développement');

-- ================================================================
-- POSITIONS TRANSITION MONTRÉAL (centre-gauche)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Montréal
('transition_montreal_mtl', 'mtl_metro_rem', 'PA', 'Positions Craig Sauvé', 'Soutien transport collectif avec gestion démocratique'),
('transition_montreal_mtl', 'mtl_arrondissements_autonomie', 'PA', 'Gouvernance participative', 'Décentralisation avec participation citoyenne'),
('transition_montreal_mtl', 'mtl_festivals_equilibre', 'N', 'Équilibre social', 'Consultation citoyenne pour équilibre événements'),

-- Questions génériques
('transition_montreal_mtl', 'mtl_q2_pistes_cyclables', 'PA', 'Mobilité durable', 'Développement cyclable avec consultation communautaire'),
('transition_montreal_mtl', 'mtl_q4_priorite_mobilite_active', 'PA', 'Transport actif', 'Priorité mobilité active avec transition graduelle'),
('transition_montreal_mtl', 'mtl_q5_quotas_logements_abordables', 'FA', 'Justice logement', 'Forte obligation logements abordables projets immobiliers'),
('transition_montreal_mtl', 'mtl_q6_reduction_depenses_taxes', 'N', 'Justice fiscale', 'Réforme fiscale progressive plutôt que réduction globale'),
('transition_montreal_mtl', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Développement humain', 'Densification avec considération qualité vie'),
('transition_montreal_mtl', 'mtl_q8_interdire_essence_centre_ville', 'N', 'Transition graduelle', 'Transition écologique avec soutien citoyens'),
('transition_montreal_mtl', 'mtl_q9_protection_espaces_verts', 'PA', 'Environnement urbain', 'Protection espaces verts priorité sociale'),
('transition_montreal_mtl', 'mtl_q10_transition_carboneutre', 'PA', 'Justice climatique', 'Transition écologique avec équité sociale'),
('transition_montreal_mtl', 'mtl_q11_reduction_dechets', 'N', 'Gestion durable', 'Amélioration collecte avec réduction déchets'),
('transition_montreal_mtl', 'mtl_q12_augmentation_taxes', 'PA', 'Le Devoir', 'Surtaxe propriétés luxe 3,5M+ pour financer lutte itinérance'),
('transition_montreal_mtl', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Démocratie locale', 'Autonomie arrondissements avec participation citoyenne'),
('transition_montreal_mtl', 'mtl_q14_reduction_dette', 'N', 'Vision équilibrée', 'Balance services essentiels et projets d''avenir'),
('transition_montreal_mtl', 'mtl_q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Opposition avantages sans contreparties sociales'),
('transition_montreal_mtl', 'mtl_q16_limitation_touristes', 'N', 'Équilibre communautaire', 'Gestion touristique avec consultation locale'),
('transition_montreal_mtl', 'mtl_q17_soutien_organismes_communautaires', 'FA', 'Solidarité sociale', 'Augmentation majeure soutien organismes communautaires'),
('transition_montreal_mtl', 'mtl_q18_augmentation_effectifs_policiers', 'N', 'Sécurité alternative', 'Approche sécurité communautaire diversifiée'),
('transition_montreal_mtl', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Services communautaires', 'Investissements infrastructures proximité'),
('transition_montreal_mtl', 'mtl_q20_protection_patrimoine', 'N', 'Patrimoine vivant', 'Protection patrimoniale avec développement communautaire');

-- ================================================================
-- POSITIONS ACTION MONTRÉAL (centre-droit)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Montréal (positions inférées - informations limitées)
('action_montreal_mtl', 'mtl_metro_rem', 'N', 'Position inférée', 'Soutien conditionnel selon gestion financière'),
('action_montreal_mtl', 'mtl_arrondissements_autonomie', 'PA', 'Tendance conservatrice', 'Décentralisation pour efficacité administrative'),
('action_montreal_mtl', 'mtl_festivals_equilibre', 'N', 'Position inférée', 'Équilibre économique et qualité vie'),

-- Questions génériques (positions largement inférées)
('action_montreal_mtl', 'mtl_q2_pistes_cyclables', 'N', 'Position inférée', 'Développement cyclable avec équilibre modal'),
('action_montreal_mtl', 'mtl_q4_priorite_mobilite_active', 'N', 'Position inférée', 'Approche équilibrée mobilité urbaine'),
('action_montreal_mtl', 'mtl_q5_quotas_logements_abordables', 'N', 'Position inférée', 'Soutien conditionnel logement abordable'),
('action_montreal_mtl', 'mtl_q6_reduction_depenses_taxes', 'PA', 'Tendance conservatrice', 'Gestion fiscale responsable et réduction dépenses'),
('action_montreal_mtl', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Position inférée', 'Développement selon besoins économiques'),
('action_montreal_mtl', 'mtl_q8_interdire_essence_centre_ville', 'PD', 'Approche conservatrice', 'Opposition mesures restrictives mobilité'),
('action_montreal_mtl', 'mtl_q9_protection_espaces_verts', 'N', 'Position inférée', 'Équilibre espaces verts et développement'),
('action_montreal_mtl', 'mtl_q10_transition_carboneutre', 'N', 'Position inférée', 'Transition écologique graduelle'),
('action_montreal_mtl', 'mtl_q11_reduction_dechets', 'N', 'Position inférée', 'Amélioration services municipaux'),
('action_montreal_mtl', 'mtl_q12_augmentation_taxes', 'PD', 'Conservatisme fiscal', 'Résistance hausses taxes municipales'),
('action_montreal_mtl', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Décentralisation', 'Autonomie arrondissements pour efficacité'),
('action_montreal_mtl', 'mtl_q14_reduction_dette', 'PA', 'Priorités conservatrices', 'Services essentiels avant projets coûteux'),
('action_montreal_mtl', 'mtl_q15_avantages_fiscaux_entreprises', 'PA', 'Pro-business', 'Incitations économiques pour attractivité'),
('action_montreal_mtl', 'mtl_q16_limitation_touristes', 'N', 'Position inférée', 'Équilibre économie touristique et résidents'),
('action_montreal_mtl', 'mtl_q17_soutien_organismes_communautaires', 'N', 'Position inférée', 'Soutien sélectif selon efficacité'),
('action_montreal_mtl', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Renforcement effectifs pour sécurité'),
('action_montreal_mtl', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'N', 'Position inférée', 'Investissements selon priorités budgétaires'),
('action_montreal_mtl', 'mtl_q20_protection_patrimoine', 'N', 'Position inférée', 'Protection patrimoniale équilibrée');

-- ================================================================
-- POSITIONS FUTUR MONTRÉAL (centre)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Montréal
('futur_montreal_mtl', 'mtl_metro_rem', 'PA', 'Site officiel', 'Soutien transport collectif avec gestion novatrice'),
('futur_montreal_mtl', 'mtl_arrondissements_autonomie', 'PA', 'Inclusion locale', 'Autonomie avec participation communautaire diverse'),
('futur_montreal_mtl', 'mtl_festivals_equilibre', 'N', 'Équilibre inclusif', 'Gestion événements avec consultation diversifiée'),

-- Questions génériques
('futur_montreal_mtl', 'mtl_q2_pistes_cyclables', 'PA', 'Fugues.com', 'Développement cyclable avec cohésion tous usagers route'),
('futur_montreal_mtl', 'mtl_q4_priorite_mobilite_active', 'PA', 'Cohésion urbaine', 'Mobilité active avec harmonie entre usagers'),
('futur_montreal_mtl', 'mtl_q5_quotas_logements_abordables', 'PA', 'CityNews', 'Logement abordable priorité avec approche inclusive'),
('futur_montreal_mtl', 'mtl_q6_reduction_depenses_taxes', 'N', 'Gestion équilibrée', 'Approche équilibrée finances publiques'),
('futur_montreal_mtl', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Développement humain', 'Densification avec considération communautaire'),
('futur_montreal_mtl', 'mtl_q8_interdire_essence_centre_ville', 'N', 'Transition inclusive', 'Transition écologique avec soutien diversité'),
('futur_montreal_mtl', 'mtl_q9_protection_espaces_verts', 'PA', 'Qualité vie', 'Protection espaces verts pour toutes communautés'),
('futur_montreal_mtl', 'mtl_q10_transition_carboneutre', 'PA', 'Durabilité inclusive', 'Transition écologique avec équité sociale'),
('futur_montreal_mtl', 'mtl_q11_reduction_dechets', 'N', 'Gestion moderne', 'Amélioration services avec innovation'),
('futur_montreal_mtl', 'mtl_q12_augmentation_taxes', 'N', 'Justice fiscale', 'Fiscalité équitable selon capacité payer'),
('futur_montreal_mtl', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Site officiel', 'Autonomie avec écoute et dialogue citoyens prioritaires'),
('futur_montreal_mtl', 'mtl_q14_reduction_dette', 'N', 'Vision équilibrée', 'Balance services essentiels et innovation'),
('futur_montreal_mtl', 'mtl_q15_avantages_fiscaux_entreprises', 'N', 'Équilibre économique', 'Incitations avec contreparties communautaires'),
('futur_montreal_mtl', 'mtl_q16_limitation_touristes', 'N', 'Tourisme inclusif', 'Gestion touristique avec bénéfices communautaires'),
('futur_montreal_mtl', 'mtl_q17_soutien_organismes_communautaires', 'PA', 'Solidarité diverse', 'Soutien organismes services diversifiés'),
('futur_montreal_mtl', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Site officiel', 'Plan anti-haine avec intervention rapide et communautaire'),
('futur_montreal_mtl', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Inclusion sociale', 'Infrastructures loisirs accessibles toutes communautés'),
('futur_montreal_mtl', 'mtl_q20_protection_patrimoine', 'PA', 'Patrimoine inclusif', 'Protection patrimoine avec reconnaissance diversité');

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier le nombre total de positions
SELECT
    COUNT(*) as total_positions,
    COUNT(DISTINCT party_id) as nombre_partis,
    COUNT(DISTINCT question_id) as nombre_questions
FROM public.party_positions
WHERE party_id LIKE '%_mtl';

-- Vérifier la répartition par parti
SELECT
    p.name as parti,
    COUNT(pp.id) as positions_definies
FROM public.parties p
LEFT JOIN public.party_positions pp ON p.id = pp.party_id
WHERE p.municipality_id = 'montreal'
GROUP BY p.id, p.name
ORDER BY p.name;

-- Vérifier la répartition des positions par valeur
SELECT
    position,
    COUNT(*) as occurrences,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM party_positions WHERE party_id LIKE '%_mtl'), 1) as pourcentage
FROM public.party_positions
WHERE party_id LIKE '%_mtl'
GROUP BY position
ORDER BY occurrences DESC;