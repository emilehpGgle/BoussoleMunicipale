-- ================================================================
-- INSERTION DES POSITIONS POLITIQUES - LAVAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Analyse basée sur plateformes officielles, Courrier Laval, MCL Média Laval, Le Devoir
-- Total: 63 positions (3 partis × 21 questions)
-- Codes: FA=Fortement d'accord, PA=Plutôt d'accord, N=Neutre, PD=Plutôt en désaccord, FD=Fortement en désaccord, IDK=Ne sais pas

-- ================================================================
-- POSITIONS MOUVEMENT LAVALLOIS (centre-gauche) - Stéphane Boyer
-- ================================================================
INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Questions spécifiques Laval
('mouvement_lavallois_lav', 'lav_srb_transport_montreal', 'FA', 'Priorités infrastructures 2025', 'Le maire Boyer a développé plusieurs projets de transport structurant. Priorité infrastructure 2025 inclut amélioration transport.'),
('mouvement_lavallois_lav', 'lav_equilibre_developpement_espaces_verts', 'FA', 'Programme politique ML', 'Programme environnemental fort, protection milieux naturels. Vision 2035 priorise espaces verts.'),

-- Questions génériques adaptées
('mouvement_lavallois_lav', 'lav_q2_pistes_cyclables', 'PA', 'Plan mobilité active Laval', 'Plan mobilité active existant, bien que retards reconnus. Engagement environnemental fort.'),
('mouvement_lavallois_lav', 'lav_q4_priorite_mobilite_active', 'PA', 'Plan mobilité active', 'Engagement dans Plan mobilité active, bien que défis de mise en œuvre reconnus.'),
('mouvement_lavallois_lav', 'lav_q5_quotas_logements_abordables', 'FA', 'Le Devoir mai 2025', 'Utilisation superpouvoirs municipaux pour logement abordable. Politiques actives en cours.'),
('mouvement_lavallois_lav', 'lav_q6_reduction_depenses_taxes', 'PD', 'Priorités campagne 2025', 'Opération 440M$ infrastructures nécessite investissements. Priorité services qualité.'),
('mouvement_lavallois_lav', 'lav_q7_immeubles_grande_hauteur', 'PA', 'Politiques aménagement', 'Politiques densification avec superpouvoirs municipaux. Vision développement durable.'),
('mouvement_lavallois_lav', 'lav_q8_interdire_essence_centre_ville', 'PA', 'Programme politique ML', 'Engagement environnemental fort, transition écologique dans programme politique.'),
('mouvement_lavallois_lav', 'lav_q9_protection_espaces_verts', 'FA', 'Programme politique', 'Programme environnemental explicite, protection milieux naturels prioritaire.'),
('mouvement_lavallois_lav', 'lav_q10_transition_carboneutre', 'FA', 'Programme politique ML', 'Engagement transition écologique central dans programme politique 2023.'),
('mouvement_lavallois_lav', 'lav_q11_reduction_dechets', 'PD', 'Services municipaux qualité', 'Priorité services qualité citoyens vs réduction services pour environnement.'),
('mouvement_lavallois_lav', 'lav_q12_augmentation_taxes', 'PA', 'Investissements infrastructures', 'Opération 440M$ infrastructures nécessite investissements pour projets écoresponsables.'),
('mouvement_lavallois_lav', 'lav_q13_pouvoir_conseils_quartier', 'PA', 'Programme politique', 'Valeurs gouvernance participative et consultation citoyenne dans programme.'),
('mouvement_lavallois_lav', 'lav_q14_reduction_dette', 'PD', 'Opération 440M$', 'Priorité projets avenir et infrastructures modernes vs seulement services essentiels.'),
('mouvement_lavallois_lav', 'lav_q15_avantages_fiscaux_entreprises', 'PA', 'Valeurs développement économique', 'Développement économique durable prioritaire. Attraction entreprises pour emplois.'),
('mouvement_lavallois_lav', 'lav_q16_limitation_touristes', 'PA', 'Approche équilibrée', 'Équilibre développement touristique et qualité vie résidents dans gouvernance.'),
('mouvement_lavallois_lav', 'lav_q17_soutien_organismes_communautaires', 'FA', 'Valeurs fondamentales ML', 'Équité et justice sociale valeurs centrales. Support services sociaux essentiels.'),
('mouvement_lavallois_lav', 'lav_q18_augmentation_effectifs_policiers', 'PA', 'Programme politique', 'Sécurité population prioritaire dans réalisations et programme politique.'),
('mouvement_lavallois_lav', 'lav_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Services qualité', 'Services municipaux qualité prioritaires. Infrastructures proximité dans programme.'),
('mouvement_lavallois_lav', 'lav_q20_protection_patrimoine', 'PA', 'Programme développement durable', 'Développement durable inclut préservation patrimoine et identité locale.'),
('mouvement_lavallois_lav', 'lav_enjeux_prioritaires', 'FA', 'Programme politique 2025', 'Priorités: Services municipaux, Environnement espaces verts, Transport mobilité'),

-- ================================================================
-- POSITIONS PARTI LAVAL (centre-droit) - Claude Larochelle
-- ================================================================

-- Questions spécifiques Laval
('parti_laval_lav', 'lav_srb_transport_montreal', 'PA', 'Plateforme électorale 2025', 'Plateforme axée sur mobilité fluide et accessible. Support projets structurants qui désengorgent Laval.'),
('parti_laval_lav', 'lav_equilibre_developpement_espaces_verts', 'PA', 'Plateforme 2025', 'Plateforme valorise durabilité et protection environnement. Mention protection milieux naturels.'),

-- Questions génériques adaptées
('parti_laval_lav', 'lav_q2_pistes_cyclables', 'PA', 'Plateforme mobilité', 'Support transport actif mais priorité sécurité et efficacité. Approche plus modérée.'),
('parti_laval_lav', 'lav_q4_priorite_mobilite_active', 'N', 'Plateforme mobilité équitable', 'Priorité équilibre entre tous modes transport. Pas de favoritisme marqué mobilité active.'),
('parti_laval_lav', 'lav_q5_quotas_logements_abordables', 'PA', 'Plateforme habitation', 'Support logement abordable dans plateforme. Approche équilibrée développement.'),
('parti_laval_lav', 'lav_q6_reduction_depenses_taxes', 'FA', 'Plateforme 2025', 'Plateforme axée protection portefeuille citoyens, limitation hausses taxes, efficacité dépenses.'),
('parti_laval_lav', 'lav_q7_immeubles_grande_hauteur', 'N', 'Plateforme aménagement urbain', 'Position équilibrée entre développement et préservation. Pas de favoritisme hauteur.'),
('parti_laval_lav', 'lav_q8_interdire_essence_centre_ville', 'PD', 'Approche pragmatique', 'Approche plus pragmatique. Priorité efficacité vs mesures radicales environnementales.'),
('parti_laval_lav', 'lav_q9_protection_espaces_verts', 'PA', 'Plateforme 2025', 'Valeurs durabilité dans plateforme. Protection environnement mentionnée.'),
('parti_laval_lav', 'lav_q10_transition_carboneutre', 'PA', 'Plateforme environnement', 'Support général environnement mais priorité coûts et efficacité.'),
('parti_laval_lav', 'lav_q11_reduction_dechets', 'PA', 'Plateforme services essentiels', 'Amélioration services essentiels prioritaire dans plateforme. Services avant projets avenir.'),
('parti_laval_lav', 'lav_q12_augmentation_taxes', 'FD', 'Plateforme finances responsables', 'Opposition centrale aux hausses taxes. Protection portefeuille citoyens prioritaire.'),
('parti_laval_lav', 'lav_q13_pouvoir_conseils_quartier', 'PA', 'Valeurs plateforme', 'Valeur transparence et proximité citoyens. Remettre citoyens au cœur décisions.'),
('parti_laval_lav', 'lav_q14_reduction_dette', 'FA', 'Plateforme services essentiels', 'Services essentiels (collecte, déneigement) prioritaires avant investir projets avenir.'),
('parti_laval_lav', 'lav_q15_avantages_fiscaux_entreprises', 'N', 'Approche équilibrée', 'Équilibre entre développement économique et protection finances municipales.'),
('parti_laval_lav', 'lav_q16_limitation_touristes', 'N', 'Pas de position claire', 'Position non clairement définie sur limitation tourisme vs développement économique.'),
('parti_laval_lav', 'lav_q17_soutien_organismes_communautaires', 'PA', 'Plateforme services citoyens', 'Support services essentiels incluant aide organismes communautaires.'),
('parti_laval_lav', 'lav_q18_augmentation_effectifs_policiers', 'FA', 'Plateforme sécurité', 'Sécurité routière et quartiers priorité explicite. Augmentation présence policière.'),
('parti_laval_lav', 'lav_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Plateforme infrastructures', 'Infrastructures proximité prioritaires. Quartiers équipés et accueillants.'),
('parti_laval_lav', 'lav_q20_protection_patrimoine', 'FA', 'Plateforme culture et patrimoine', 'Valorisation culture, patrimoine et langue prioritaire dans plateforme.'),
('parti_laval_lav', 'lav_enjeux_prioritaires', 'FA', 'Plateforme 2025', 'Priorités: Gestion finances municipales, Sécurité publique, Services municipaux'),

-- ================================================================
-- POSITIONS ACTION LAVAL (centre) - Frédéric Mayer / Achille Cifelli
-- ================================================================

-- Questions spécifiques Laval
('action_laval_lav', 'lav_srb_transport_montreal', 'PA', 'LinkedIn Action Laval', 'Support au développement économique nécessite amélioration transport. Candidats parlent accessibilité.'),
('action_laval_lav', 'lav_equilibre_developpement_espaces_verts', 'N', 'Communications publiques', 'Position non clairement définie dans sources disponibles. Focus sur économie et finances.'),

-- Questions génériques adaptées
('action_laval_lav', 'lav_q2_pistes_cyclables', 'N', 'Communications publiques', 'Pas de position claire trouvée sur développement pistes cyclables spécifiquement.'),
('action_laval_lav', 'lav_q4_priorite_mobilite_active', 'N', 'Communications disponibles', 'Position non définie clairement sur priorisation mobilité active vs automobile.'),
('action_laval_lav', 'lav_q5_quotas_logements_abordables', 'N', 'Communications publiques', 'Pas de position claire sur quotas obligatoires trouvée dans sources.'),
('action_laval_lav', 'lav_q6_reduction_depenses_taxes', 'FA', 'Courrier Laval février 2025', 'Frédéric Mayer veut mettre ordre dans finances. Focus gestion efficace ressources.'),
('action_laval_lav', 'lav_q7_immeubles_grande_hauteur', 'N', 'Communications analysées', 'Pas de position claire sur immeubles grande hauteur dans sources disponibles.'),
('action_laval_lav', 'lav_q8_interdire_essence_centre_ville', 'PD', 'Orientation économique', 'Focus économie et praticité. Mesures radicales incompatibles avec approche économique.'),
('action_laval_lav', 'lav_q9_protection_espaces_verts', 'N', 'Communications disponibles', 'Position non définie clairement sur équilibre espaces verts vs développement.'),
('action_laval_lav', 'lav_q10_transition_carboneutre', 'PD', 'Priorités financières', 'Focus gestion financière rigide. Réticence coûts supplémentaires pour transition.'),
('action_laval_lav', 'lav_q11_reduction_dechets', 'PA', 'Priorités services municipaux', 'Focus services de base efficaces. Amélioration services vs considérations environnementales.'),
('action_laval_lav', 'lav_q12_augmentation_taxes', 'FD', 'Positions financières', 'Mayer veut ordre dans finances. Opposition augmentation taxes pour projets.'),
('action_laval_lav', 'lav_q13_pouvoir_conseils_quartier', 'PA', 'Description parti LinkedIn', 'Parti opposition prône ouverture et écoute citoyens selon description LinkedIn.'),
('action_laval_lav', 'lav_q14_reduction_dette', 'PA', 'Priorités gestion financière', 'Gestion financière rigoureuse et efficacité avant projets coûteux.'),
('action_laval_lav', 'lav_q15_avantages_fiscaux_entreprises', 'FA', 'Orientation économique parti', 'Focus dynamisme économique central. Attraction entreprises pour emplois et croissance.'),
('action_laval_lav', 'lav_q16_limitation_touristes', 'PD', 'Focus développement économique', 'Priorité développement économique inclurait tourism sans limitations restrictives.'),
('action_laval_lav', 'lav_q17_soutien_organismes_communautaires', 'N', 'Pas de position claire', 'Position non clairement définie sur financement organismes vs priorités financières.'),
('action_laval_lav', 'lav_q18_augmentation_effectifs_policiers', 'PA', 'Priorités développement', 'Sécurité publique importante pour développement économique et qualité vie.'),
('action_laval_lav', 'lav_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Focus services municipaux', 'Services municipaux de base incluent infrastructures sportives et loisirs.'),
('action_laval_lav', 'lav_q20_protection_patrimoine', 'N', 'Pas de position claire', 'Position non clairement définie sur équilibre patrimoine vs développement économique.'),
('action_laval_lav', 'lav_enjeux_prioritaires', 'FA', 'Orientations parti', 'Priorités: Gestion finances municipales, Développement économique, Services municipaux');

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 63 positions ont été insérées correctement
SELECT
    COUNT(*) as total_positions_laval,
    COUNT(DISTINCT party_id) as nb_partis,
    COUNT(DISTINCT question_id) as nb_questions
FROM public.party_positions pp
JOIN public.parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'laval';

-- Vérifier la répartition des positions par parti
SELECT
    p.name as parti,
    COUNT(*) as nb_positions,
    COUNT(CASE WHEN pp.position = 'FA' THEN 1 END) as fortement_accord,
    COUNT(CASE WHEN pp.position = 'PA' THEN 1 END) as plutot_accord,
    COUNT(CASE WHEN pp.position = 'N' THEN 1 END) as neutre,
    COUNT(CASE WHEN pp.position = 'PD' THEN 1 END) as plutot_desaccord,
    COUNT(CASE WHEN pp.position = 'FD' THEN 1 END) as fortement_desaccord
FROM public.party_positions pp
JOIN public.parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'laval'
GROUP BY p.name
ORDER BY p.name;