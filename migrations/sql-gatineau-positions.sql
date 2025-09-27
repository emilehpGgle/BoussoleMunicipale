-- ================================================================
-- INSERTION DES POSITIONS POLITIQUES - GATINEAU
-- ================================================================
-- Date: 2025-09-23
-- Source: Analyse basée sur recherches Radio-Canada Outaouais, Le Droit, sites officiels des partis
-- Total: 44 positions (2 partis × 22 questions)
-- Codes: FA=Fortement d'accord, PA=Plutôt d'accord, N=Neutre, PD=Plutôt en désaccord, FD=Fortement en désaccord, IDK=Ne sais pas

-- ================================================================
-- POSITIONS ACTION GATINEAU (centre-gauche)
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions génériques adaptées
('action_gatineau_gat', 'gat_q1_pistes_cyclables', 'PA', 'Orientations environnementales AG', 'Parti centre-gauche avec forte orientation environnementale et New Urbanism'),
('action_gatineau_gat', 'gat_q2_priorite_mobilite_active', 'PA', 'Idéologie New Urbanism', 'New Urbanism favorise mobilité active en centre-ville, transition écologique ambitieuse'),
('action_gatineau_gat', 'gat_q3_quotas_logements_abordables', 'FA', 'Réalisations annoncées', 'Plus de logements sociaux et abordables pour répondre à la crise du logement'),
('action_gatineau_gat', 'gat_q4_reduction_depenses_taxes', 'N', 'Diversification revenus', 'Diversification des sources de revenus pour réduire pression sur portefeuilles'),
('action_gatineau_gat', 'gat_q5_immeubles_grande_hauteur', 'N', 'Position non documentée', 'Aucune position claire trouvée dans les sources consultées'),
('action_gatineau_gat', 'gat_q6_interdire_essence_centre_ville', 'PA', 'Transition écologique', 'Engagement pour transition écologique ambitieuse suggère ouverture mesures environnementales'),
('action_gatineau_gat', 'gat_q7_protection_espaces_verts', 'FA', 'Idéologie environnementale', 'Environnementalisme au cœur de l''idéologie, protection espaces verts prioritaire'),
('action_gatineau_gat', 'gat_q8_transition_carboneutre', 'FA', 'Programme électoral', 'Engagement explicite pour promouvoir une transition écologique ambitieuse'),
('action_gatineau_gat', 'gat_q9_reduction_dechets', 'PA', 'Services municipaux', 'Services municipaux renforcés suggère maintien/amélioration collecte'),
('action_gatineau_gat', 'gat_q10_augmentation_taxes', 'PA', 'Idéologie sociale-démocrate', 'Parti social-démocrate accepterait augmentation pour projets environnementaux'),
('action_gatineau_gat', 'gat_q11_pouvoir_conseils_secteur', 'FA', 'Participation citoyenne', 'Engagement renforcer participation citoyenne et idéologie localisme'),
('action_gatineau_gat', 'gat_q12_reduction_dette', 'PA', 'Gestion rigoureuse', 'Équilibre entre gestion rigoureuse et services municipaux renforcés'),
('action_gatineau_gat', 'gat_q13_avantages_fiscaux_entreprises', 'PA', 'Économie inclusive', 'Développement économie locale dynamique et inclusive'),
('action_gatineau_gat', 'gat_q14_limitation_touristes', 'N', 'Position non documentée', 'Pas de position claire sur cette question spécifique'),
('action_gatineau_gat', 'gat_q15_soutien_organismes_communautaires', 'FA', 'Vision inclusive', 'Ville bienveillante qui ne laisse personne derrière et idéologie sociale-démocrate'),
('action_gatineau_gat', 'gat_q16_augmentation_effectifs_policiers', 'PA', 'Sécurité routière', 'Priorité sécurité routière avec radars photo près écoles'),
('action_gatineau_gat', 'gat_q17_investissement_infrastructures_loisirs_sportives', 'FA', 'Infrastructures essentielles', 'Infrastructures essentielles consolidées et services municipaux renforcés'),
('action_gatineau_gat', 'gat_q18_protection_patrimoine', 'PA', 'Orientation générale', 'Orientation du parti suggère attention au patrimoine'),

-- Questions spécifiques Gatineau
('action_gatineau_gat', 'gat_q19_services_bilingues', 'FA', 'Vision inclusive', 'Services municipaux accessibles et de qualité, vision inclusive'),
('action_gatineau_gat', 'gat_q20_coordination_ottawa', 'FA', 'Approche collaborative', 'Approche collaborative avec tous les acteurs de la région'),
('action_gatineau_gat', 'gat_q21_transport_interprovincial', 'PA', 'Mobilité améliorée', 'Transports et mobilité améliorée adaptés aux besoins'),

-- ================================================================
-- POSITIONS ÉQUIPE MARIO AUBÉ (big tent, conservatisme fiscal)
-- ================================================================

-- Questions génériques adaptées
('equipe_mario_aube_gat', 'gat_q1_pistes_cyclables', 'N', 'Position à préciser', 'Parti récent, approche big tent suggère position équilibrée'),
('equipe_mario_aube_gat', 'gat_q2_priorite_mobilite_active', 'N', 'Approche pragmatique', 'Équilibre entre différents modes transport selon besoins concrets'),
('equipe_mario_aube_gat', 'gat_q3_quotas_logements_abordables', 'PD', 'Conservatisme fiscal', 'Réticence aux quotas obligatoires, préférence pour incitatifs'),
('equipe_mario_aube_gat', 'gat_q4_reduction_depenses_taxes', 'FA', 'Programme central', 'Décisions budgétaires respecteront la capacité de payer des citoyens'),
('equipe_mario_aube_gat', 'gat_q5_immeubles_grande_hauteur', 'N', 'Approche cas par cas', 'Évaluation au cas par cas selon contexte local'),
('equipe_mario_aube_gat', 'gat_q6_interdire_essence_centre_ville', 'PD', 'Approche pragmatique', 'Mesures radicales vues comme non-prioritaires vs services de base'),
('equipe_mario_aube_gat', 'gat_q7_protection_espaces_verts', 'PA', 'Ville durable', 'Vision ville durable équilibrée avec développement économique'),
('equipe_mario_aube_gat', 'gat_q8_transition_carboneutre', 'N', 'Capacité de payer', 'Soutien durabilité conditionné à capacité financière'),
('equipe_mario_aube_gat', 'gat_q9_reduction_dechets', 'FA', 'Services de base', 'Services publics efficaces incluent collecte efficace'),
('equipe_mario_aube_gat', 'gat_q10_augmentation_taxes', 'FD', 'Conservatisme fiscal', 'Opposition aux augmentations taxes même pour projets environnementaux'),
('equipe_mario_aube_gat', 'gat_q11_pouvoir_conseils_secteur', 'FA', 'Localisme', 'Localisme au cœur idéologie, donner pouvoir aux citoyens'),
('equipe_mario_aube_gat', 'gat_q12_reduction_dette', 'FA', 'Services essentiels', 'Priorité infrastructures essentielles et services de base'),
('equipe_mario_aube_gat', 'gat_q13_avantages_fiscaux_entreprises', 'PA', 'Ville prospère', 'Prospérité économique peut justifier incitatifs ciblés'),
('equipe_mario_aube_gat', 'gat_q14_limitation_touristes', 'PD', 'Développement économique', 'Ouverture au tourisme plutôt que limitations'),
('equipe_mario_aube_gat', 'gat_q15_soutien_organismes_communautaires', 'PA', 'Bien-être citoyen', 'Bien-être citoyen inclut soutien conditionné aux priorités budgétaires'),
('equipe_mario_aube_gat', 'gat_q16_augmentation_effectifs_policiers', 'PA', 'Services essentiels', 'Sécurité fait partie des services essentiels si justifié'),
('equipe_mario_aube_gat', 'gat_q17_investissement_infrastructures_loisirs_sportives', 'FA', 'Programme explicite', 'Investir dans infrastructures incluant installations sportives et communautaires'),
('equipe_mario_aube_gat', 'gat_q18_protection_patrimoine', 'N', 'Position à développer', 'Pas de position claire, évaluation probable au cas par cas'),

-- Questions spécifiques Gatineau
('equipe_mario_aube_gat', 'gat_q19_services_bilingues', 'PA', 'Services accessibles', 'Services publics accessibles inclut dimension bilingue'),
('equipe_mario_aube_gat', 'gat_q20_coordination_ottawa', 'PA', 'Approche pragmatique', 'Coopération si bénéfique pour priorités municipales Gatineau'),
('equipe_mario_aube_gat', 'gat_q21_transport_interprovincial', 'PA', 'Infrastructure essentielle', 'Transport interprovincial répond besoins concrets travailleurs gatinois');