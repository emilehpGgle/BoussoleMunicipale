-- ========================================================================
-- MIGRATION 3: INSÉRER LES PARTIS POLITIQUES ET LEURS POSITIONS
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS 02_insert_questions_data.sql
-- Date: 2025-09-21
-- ========================================================================

-- ========================================================================
-- INSÉRER LES 7 PARTIS POLITIQUES DE QUÉBEC
-- ========================================================================

INSERT INTO parties (
  id, name, short_name, leader, logo_url, color, website_url,
  orientation, main_ideas_summary, strengths, reserves, priorities,
  municipality_id
) VALUES

-- Équipe Labeaume
('equipe_labeaume',
 'Équipe Labeaume',
 'EL',
 'Régis Labeaume',
 '/logos/equipe-labeaume.png',
 '#004b9f',
 'https://www.equipelabeaume.com/',
 'Centre-droit, pragmatique',
 'Centre-droit, pragmatique avec une approche gestionnaire. Met l''accent sur les grands projets structurants, la rigueur budgétaire et le développement économique. Favorise une gouvernance efficace et des investissements ciblés.',
 '["Leadership reconnu", "Projets structurants", "Gestion rigoureuse"]',
 '["Participation citoyenne limitée", "Approche parfois autoritaire"]',
 '["Grands projets", "Développement économique", "Gestion des finances"]',
 'quebec'),

-- Équipe Marie-Josée Savard
('equipe_marie_josee_savard',
 'Équipe Marie-Josée Savard',
 'EMJS',
 'Marie-Josée Savard',
 '/logos/equipe-marie-josee-savard.png',
 '#e74c3c',
 'https://www.mariejoséesavard.ca/',
 'Centre, continuité',
 'Centre, continuité avec une approche consensuelle. Privilégie le dialogue, la concertation et la gestion prudente. Met l''accent sur les services aux citoyens et la qualité de vie.',
 '["Continuité et stabilité", "Dialogue et concertation", "Expérience administrative"]',
 '["Vision parfois floue", "Manque d''audace"]',
 '["Services aux citoyens", "Qualité de vie", "Gestion prudente"]',
 'quebec'),

-- Démocratie Québec
('democratie_quebec',
 'Démocratie Québec',
 'DQ',
 'Jean-François Gosselin',
 '/logos/democratie-quebec.png',
 '#2ecc71',
 'https://www.democratiequebec.qc.ca/',
 'Centre-gauche, participatif',
 'Centre-gauche, participatif avec un fort accent sur la démocratie participative. Prône la transparence, l''écoute citoyenne et une approche plus inclusive de la gouvernance municipale.',
 '["Démocratie participative", "Transparence", "Écoute citoyenne"]',
 '["Manque d''expérience", "Vision parfois idéaliste"]',
 '["Participation citoyenne", "Transparence", "Environnement"]',
 'quebec'),

-- Transition Québec
('transition_quebec',
 'Transition Québec',
 'TQ',
 'Jackie Smith',
 '/logos/transition-quebec.png',
 '#27ae60',
 'https://www.transitionquebec.ca/',
 'Gauche, écologiste',
 'Gauche, écologiste avec une vision progressive du développement urbain. Met l''accent sur la transition écologique, la justice sociale et l''innovation en matière de développement durable.',
 '["Vision écologique", "Innovation sociale", "Approche progressive"]',
 '["Manque d''expérience politique", "Vision parfois utopique"]',
 '["Transition écologique", "Justice sociale", "Transport collectif"]',
 'quebec'),

-- Québec 21
('quebec_21',
 'Québec 21',
 'Q21',
 'Jean Rousseau',
 '/logos/quebec-21.png',
 '#9b59b6',
 'https://www.quebec21.org/',
 'Centre-droit, conservateur',
 'Centre-droit, conservateur avec une approche traditionaliste. Privilégie la prudence fiscale, le respect des valeurs traditionnelles et une gouvernance plus conservative.',
 '["Prudence fiscale", "Valeurs traditionnelles", "Gestion conservative"]',
 '["Vision parfois rigide", "Manque d''innovation"]',
 '["Finances municipales", "Sécurité publique", "Tradition"]',
 'quebec'),

-- Québec d''abord
('quebec_dabord',
 'Québec d''abord',
 'QD',
 'Claude Villeneuve',
 '/logos/quebec-dabord-new.png',
 '#00aef0',
 'https://quebecdabord.com/',
 'Centre, pragmatique',
 'Centre, pragmatique avec une approche équilibrée. Met l''accent sur les besoins concrets des citoyens, la proximité et une gestion pragmatique des enjeux municipaux.',
 '["Continuité gestionnaire", "Proximité citoyenne"]',
 '["Positions peu documentées", "Visibilité limitée"]',
 '["Services municipaux", "Transport et mobilité", "Logement abordable"]',
 'quebec'),

-- Renouveau municipal de Québec
('renouveau_municipal_quebec',
 'Renouveau municipal de Québec',
 'RMQ',
 'Sylvain Légaré',
 '/logos/renouveau-municipal-quebec.png',
 '#f39c12',
 'https://www.renouveauquebec.org/',
 'Centre-droit, réformiste',
 'Centre-droit, réformiste avec une vision de modernisation. Prône le renouveau des pratiques municipales, l''efficacité gouvernementale et l''innovation dans la prestation de services.',
 '["Vision de renouveau", "Modernisation", "Efficacité"]',
 '["Manque d''expérience", "Vision parfois vague"]',
 '["Renouveau des pratiques", "Efficacité", "Innovation"]',
 'quebec')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  leader = EXCLUDED.leader,
  logo_url = EXCLUDED.logo_url,
  color = EXCLUDED.color,
  website_url = EXCLUDED.website_url,
  orientation = EXCLUDED.orientation,
  main_ideas_summary = EXCLUDED.main_ideas_summary,
  strengths = EXCLUDED.strengths,
  reserves = EXCLUDED.reserves,
  priorities = EXCLUDED.priorities,
  municipality_id = EXCLUDED.municipality_id,
  updated_at = NOW();

-- ========================================================================
-- INSÉRER LES POSITIONS DES PARTIS SUR TOUTES LES QUESTIONS
-- ========================================================================

-- Positions d'Équipe Labeaume
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('equipe_labeaume', 'q1_tramway', 'FA', 'Programme 2021 et déclarations publiques', 'Projet phare de l''administration, investissement majeur approuvé'),
('equipe_labeaume', 'q2_pistes_cyclables', 'PA', 'Réalisations et projets', 'Développement mesuré du réseau cyclable'),
('equipe_labeaume', 'q3_troisieme_lien', 'PA', 'Positions publiques récurrentes', 'Soutien au projet de tunnel'),
('equipe_labeaume', 'q4_priorite_mobilite_active', 'N', 'Approche équilibrée transport', 'Équilibre entre différents modes de transport'),
('equipe_labeaume', 'q5_quotas_logements_abordables', 'N', 'Politique de logement', 'Approche incitative plutôt que contraignante'),
('equipe_labeaume', 'q6_reduction_depenses_taxes', 'PA', 'Gestion budgétaire', 'Rigueur budgétaire avec croissance contrôlée des taxes'),
('equipe_labeaume', 'q7_immeubles_grande_hauteur', 'PA', 'Politique d''aménagement', 'Densification dans certains secteurs'),
('equipe_labeaume', 'q8_interdire_essence_centre_ville', 'N', 'Pas de position claire', 'Aucune initiative majeure annoncée'),
('equipe_labeaume', 'q9_protection_espaces_verts', 'PA', 'Projets de parcs', 'Investissements dans les espaces verts'),
('equipe_labeaume', 'q10_transition_carboneutre', 'N', 'Position modérée', 'Approche progressive sans contraintes strictes'),
('equipe_labeaume', 'q11_reduction_dechets', 'PA', 'Amélioration des services', 'Modernisation des services de collecte'),
('equipe_labeaume', 'q12_augmentation_taxes', 'PD', 'Politique fiscale', 'Préférence pour l''efficacité plutôt que l''augmentation'),
('equipe_labeaume', 'q13_pouvoir_conseils_quartier', 'PD', 'Style de gouvernance', 'Gouvernance centralisée'),
('equipe_labeaume', 'q14_reduction_dette', 'PA', 'Gestion financière', 'Contrôle de l''endettement municipal'),
('equipe_labeaume', 'q15_avantages_fiscaux_entreprises', 'PA', 'Développement économique', 'Politiques d''attraction des entreprises'),
('equipe_labeaume', 'q16_limitation_touristes', 'PD', 'Développement touristique', 'Promotion du tourisme'),
('equipe_labeaume', 'q17_soutien_organismes_communautaires', 'N', 'Financement communautaire', 'Soutien mesuré selon les priorités'),
('equipe_labeaume', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité publique', 'Maintien des effectifs actuels'),
('equipe_labeaume', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures sportives', 'Grands projets sportifs et récréatifs'),
('equipe_labeaume', 'q20_protection_patrimoine', 'PA', 'Patrimoine', 'Valorisation du patrimoine historique'),
('equipe_labeaume', 'q21_priorites_municipales', 'PA', 'Vision politique', 'Priorités: grands projets, économie, finances');

-- Positions d'Équipe Marie-Josée Savard
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('equipe_marie_josee_savard', 'q1_tramway', 'PA', 'Continuité des projets', 'Soutien au tramway avec ajustements'),
('equipe_marie_josee_savard', 'q2_pistes_cyclables', 'PA', 'Mobilité durable', 'Développement du réseau cyclable'),
('equipe_marie_josee_savard', 'q3_troisieme_lien', 'N', 'Position nuancée', 'Évaluation des options de transport'),
('equipe_marie_josee_savard', 'q4_priorite_mobilite_active', 'PA', 'Transport durable', 'Priorisation des transports actifs'),
('equipe_marie_josee_savard', 'q5_quotas_logements_abordables', 'PA', 'Logement inclusif', 'Mesures incitatives pour logement abordable'),
('equipe_marie_josee_savard', 'q6_reduction_depenses_taxes', 'N', 'Gestion équilibrée', 'Équilibre entre services et taxes'),
('equipe_marie_josee_savard', 'q7_immeubles_grande_hauteur', 'N', 'Développement mesuré', 'Densification respectueuse du caractère'),
('equipe_marie_josee_savard', 'q8_interdire_essence_centre_ville', 'N', 'Transition graduelle', 'Approche progressive'),
('equipe_marie_josee_savard', 'q9_protection_espaces_verts', 'PA', 'Environnement', 'Protection des milieux naturels'),
('equipe_marie_josee_savard', 'q10_transition_carboneutre', 'PA', 'Développement durable', 'Transition écologique planifiée'),
('equipe_marie_josee_savard', 'q11_reduction_dechets', 'PA', 'Services environnementaux', 'Amélioration de la gestion des matières'),
('equipe_marie_josee_savard', 'q12_augmentation_taxes', 'N', 'Financement responsable', 'Investissements selon les moyens'),
('equipe_marie_josee_savard', 'q13_pouvoir_conseils_quartier', 'PA', 'Démocratie locale', 'Renforcement de la participation'),
('equipe_marie_josee_savard', 'q14_reduction_dette', 'PA', 'Finances saines', 'Gestion prudente de la dette'),
('equipe_marie_josee_savard', 'q15_avantages_fiscaux_entreprises', 'N', 'Développement équilibré', 'Attraction mesurée des entreprises'),
('equipe_marie_josee_savard', 'q16_limitation_touristes', 'N', 'Tourisme durable', 'Gestion équilibrée du tourisme'),
('equipe_marie_josee_savard', 'q17_soutien_organismes_communautaires', 'PA', 'Milieu communautaire', 'Soutien aux organismes'),
('equipe_marie_josee_savard', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité adaptée', 'Sécurité selon les besoins'),
('equipe_marie_josee_savard', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Qualité de vie', 'Investissement dans les loisirs'),
('equipe_marie_josee_savard', 'q20_protection_patrimoine', 'PA', 'Patrimoine', 'Protection du caractère historique'),
('equipe_marie_josee_savard', 'q21_priorites_municipales', 'PA', 'Vision équilibrée', 'Priorités: services, qualité de vie, participation');

-- Positions de Démocratie Québec
INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('democratie_quebec', 'q1_tramway', 'PD', 'Opposition au tramway actuel', 'Projet trop coûteux, alternatives préférées'),
('democratie_quebec', 'q2_pistes_cyclables', 'PA', 'Mobilité active', 'Soutien au développement cyclable'),
('democratie_quebec', 'q3_troisieme_lien', 'PD', 'Opposition au tunnel', 'Préférence pour transport en commun'),
('democratie_quebec', 'q4_priorite_mobilite_active', 'FA', 'Transport durable', 'Priorisation claire des transports actifs'),
('democratie_quebec', 'q5_quotas_logements_abordables', 'FA', 'Justice sociale', 'Mesures contraignantes pour l''abordabilité'),
('democratie_quebec', 'q6_reduction_depenses_taxes', 'PD', 'Services publics', 'Maintien des services même avec taxes'),
('democratie_quebec', 'q7_immeubles_grande_hauteur', 'PD', 'Préservation du caractère', 'Opposition à la sur-densification'),
('democratie_quebec', 'q8_interdire_essence_centre_ville', 'PA', 'Environnement', 'Soutien aux mesures écologiques'),
('democratie_quebec', 'q9_protection_espaces_verts', 'FA', 'Environnement prioritaire', 'Protection absolue des espaces verts'),
('democratie_quebec', 'q10_transition_carboneutre', 'FA', 'Urgence climatique', 'Transition rapide vers la carboneutralité'),
('democratie_quebec', 'q11_reduction_dechets', 'FA', 'Gestion environnementale', 'Priorité à la réduction des déchets'),
('democratie_quebec', 'q12_augmentation_taxes', 'PA', 'Financement vert', 'Taxes justifiées pour l''environnement'),
('democratie_quebec', 'q13_pouvoir_conseils_quartier', 'FA', 'Démocratie participative', 'Décentralisation du pouvoir'),
('democratie_quebec', 'q14_reduction_dette', 'N', 'Équilibre financier', 'Dette acceptable pour les investissements verts'),
('democratie_quebec', 'q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Opposition aux privilèges fiscaux'),
('democratie_quebec', 'q16_limitation_touristes', 'PA', 'Qualité de vie', 'Limitation pour préserver les quartiers'),
('democratie_quebec', 'q17_soutien_organismes_communautaires', 'FA', 'Milieu communautaire', 'Augmentation significative du soutien'),
('democratie_quebec', 'q18_augmentation_effectifs_policiers', 'PD', 'Sécurité alternative', 'Préférence pour la prévention sociale'),
('democratie_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Accessibilité', 'Investissement pour tous les citoyens'),
('democratie_quebec', 'q20_protection_patrimoine', 'FA', 'Patrimoine', 'Protection stricte du patrimoine'),
('democratie_quebec', 'q21_priorites_municipales', 'FA', 'Vision participative', 'Priorités: environnement, participation, transport durable');

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Partis politiques insérés';
  RAISE NOTICE '✅ Positions des 3 premiers partis insérées';
  RAISE NOTICE '📋 Prochaine étape: Exécuter 04_insert_remaining_positions.sql';
END
$$;