-- Positions des partis politiques de Gatineau
-- Extraction depuis POSITIONS-PARTIS-GATINEAU.md
-- 2 partis × 21 questions = 42 positions

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Action Gatineau (21 positions)
('action-gatineau', 'gat_q1_services_bilingues', 'FA', 'Vision inclusive', 'Services municipaux accessibles et de qualité, vision inclusive'),
('action-gatineau', 'gat_q2_pistes_cyclables', 'PA', 'Orientations environnementales Action Gatineau', 'Parti centre-gauche avec forte orientation environnementale et New Urbanism'),
('action-gatineau', 'gat_q3_partenariats_ottawa', 'FA', 'Approche collaborative', 'Approche collaborative avec tous les acteurs de la région'),
('action-gatineau', 'gat_q4_priorite_mobilite_active', 'PA', 'Idéologie New Urbanism', 'New Urbanism favorise mobilité active en centre-ville, transition écologique ambitieuse'),
('action-gatineau', 'gat_q5_quotas_logements_abordables', 'FA', 'Réalisations annoncées', 'Plus de logements sociaux et abordables pour répondre à la crise du logement'),
('action-gatineau', 'gat_q6_reduction_depenses_taxes', 'N', 'Diversification revenus', 'Diversification des sources de revenus pour réduire pression sur portefeuilles'),
('action-gatineau', 'gat_q7_immeubles_grande_hauteur', 'N', 'Position non documentée', 'Aucune position claire trouvée dans les sources consultées'),
('action-gatineau', 'gat_q8_interdire_essence_centre_ville', 'PA', 'Transition écologique', 'Engagement pour transition écologique ambitieuse suggère ouverture mesures environnementales'),
('action-gatineau', 'gat_q9_protection_espaces_verts', 'FA', 'Idéologie environnementale', 'Environnementalisme au cœur de l''idéologie, protection espaces verts prioritaire'),
('action-gatineau', 'gat_q10_transition_carboneutre', 'FA', 'Programme électoral', 'Engagement explicite pour promouvoir une transition écologique ambitieuse'),
('action-gatineau', 'gat_q11_reduction_dechets', 'PA', 'Services municipaux', 'Services municipaux renforcés suggère maintien/amélioration collecte'),
('action-gatineau', 'gat_q12_augmentation_taxes', 'PA', 'Idéologie sociale-démocrate', 'Parti social-démocrate accepterait augmentation pour projets environnementaux'),
('action-gatineau', 'gat_q13_pouvoir_conseils_quartier', 'FA', 'Participation citoyenne', 'Engagement renforcer participation citoyenne et idéologie localisme'),
('action-gatineau', 'gat_q14_reduction_dette', 'PA', 'Gestion rigoureuse', 'Équilibre entre gestion rigoureuse et services municipaux renforcés'),
('action-gatineau', 'gat_q15_avantages_fiscaux_entreprises', 'PA', 'Économie inclusive', 'Développement économie locale dynamique et inclusive'),
('action-gatineau', 'gat_q16_limitation_touristes', 'N', 'Position non documentée', 'Pas de position claire sur cette question spécifique'),
('action-gatineau', 'gat_q17_soutien_organismes_communautaires', 'FA', 'Vision inclusive', 'Ville bienveillante qui ne laisse personne derrière et idéologie sociale-démocrate'),
('action-gatineau', 'gat_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité routière', 'Priorité sécurité routière avec radars photo près écoles'),
('action-gatineau', 'gat_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Infrastructures essentielles', 'Infrastructures essentielles consolidées et services municipaux renforcés'),
('action-gatineau', 'gat_q20_protection_patrimoine', 'PA', 'Orientation générale', 'Orientation du parti suggère attention au patrimoine'),
('action-gatineau', 'gat_q21_enjeux_prioritaires', 'FA', 'Programme politique', 'Priorités: Environnement et espaces verts, Services municipaux, Développement économique et social'),

-- Équipe Mario Aubé (21 positions)
('equipe-mario-aube', 'gat_q1_services_bilingues', 'PA', 'Services accessibles', 'Services publics accessibles inclut dimension bilingue'),
('equipe-mario-aube', 'gat_q2_pistes_cyclables', 'N', 'Position à préciser', 'Parti récent, approche big tent suggère position équilibrée'),
('equipe-mario-aube', 'gat_q3_partenariats_ottawa', 'PA', 'Approche pragmatique', 'Coopération si bénéfique pour priorités municipales Gatineau'),
('equipe-mario-aube', 'gat_q4_priorite_mobilite_active', 'N', 'Approche pragmatique', 'Équilibre entre différents modes transport selon besoins concrets'),
('equipe-mario-aube', 'gat_q5_quotas_logements_abordables', 'PD', 'Conservatisme fiscal', 'Réticence aux quotas obligatoires, préférence pour incitatifs'),
('equipe-mario-aube', 'gat_q6_reduction_depenses_taxes', 'FA', 'Programme central', 'Décisions budgétaires respecteront la capacité de payer des citoyens'),
('equipe-mario-aube', 'gat_q7_immeubles_grande_hauteur', 'N', 'Approche cas par cas', 'Évaluation au cas par cas selon contexte local'),
('equipe-mario-aube', 'gat_q8_interdire_essence_centre_ville', 'PD', 'Approche pragmatique', 'Mesures radicales vues comme non-prioritaires vs services de base'),
('equipe-mario-aube', 'gat_q9_protection_espaces_verts', 'PA', 'Ville durable', 'Vision ville durable équilibrée avec développement économique'),
('equipe-mario-aube', 'gat_q10_transition_carboneutre', 'N', 'Capacité de payer', 'Soutien durabilité conditionné à capacité financière'),
('equipe-mario-aube', 'gat_q11_reduction_dechets', 'FA', 'Services de base', 'Services publics efficaces incluent collecte efficace'),
('equipe-mario-aube', 'gat_q12_augmentation_taxes', 'FD', 'Conservatisme fiscal', 'Opposition aux augmentations taxes même pour projets environnementaux'),
('equipe-mario-aube', 'gat_q13_pouvoir_conseils_quartier', 'FA', 'Localisme', 'Localisme au cœur idéologie, donner pouvoir aux citoyens'),
('equipe-mario-aube', 'gat_q14_reduction_dette', 'FA', 'Services essentiels', 'Priorité infrastructures essentielles et services de base'),
('equipe-mario-aube', 'gat_q15_avantages_fiscaux_entreprises', 'PA', 'Ville prospère', 'Prospérité économique peut justifier incitatifs ciblés'),
('equipe-mario-aube', 'gat_q16_limitation_touristes', 'PD', 'Développement économique', 'Ouverture au tourisme plutôt que limitations'),
('equipe-mario-aube', 'gat_q17_soutien_organismes_communautaires', 'PA', 'Bien-être citoyen', 'Bien-être citoyen inclut soutien conditionné aux priorités budgétaires'),
('equipe-mario-aube', 'gat_q18_augmentation_effectifs_policiers', 'PA', 'Services essentiels', 'Sécurité fait partie des services essentiels si justifié'),
('equipe-mario-aube', 'gat_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Programme explicite', 'Investir dans infrastructures incluant installations sportives et communautaires'),
('equipe-mario-aube', 'gat_q20_protection_patrimoine', 'N', 'Position à développer', 'Pas de position claire, évaluation probable au cas par cas'),
('equipe-mario-aube', 'gat_q21_enjeux_prioritaires', 'FA', 'Programme politique', 'Priorités: Gestion des finances municipales, Services municipaux, Transport et mobilité');