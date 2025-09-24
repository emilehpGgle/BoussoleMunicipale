-- ================================================================
-- INSERTION DES PARTIS MUNICIPAUX DE MONTRÉAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Recherche Radio-Canada, Le Devoir, La Presse, Élections Québec
-- Total: 5 partis pour les élections municipales de novembre 2025

-- Insertion des 5 partis municipaux de Montréal
INSERT INTO public.parties (
    id,
    name,
    short_name,
    leader,
    logo_url,
    website_url,
    orientation,
    main_ideas_summary,
    strengths,
    reserves,
    municipality_id
) VALUES
-- 1. Projet Montréal (parti au pouvoir)
(
    'projet_montreal_mtl',
    'Projet Montréal',
    'PM',
    'Luc Rabouin',
    '/logos/projet-montreal.png',
    'https://projetmontreal.org',
    'centre-gauche',
    'Continuité de la vision écologique et sociale avec une approche pragmatique. Focus sur la mobilité durable, le logement abordable et la transition écologique.',
    '["Expérience gouvernementale", "Vision environnementale", "Mobilité active", "Logement social"]',
    '["Gestion des chantiers", "Relations avec opposants", "Changement de leadership"]',
    'montreal'
),

-- 2. Ensemble Montréal (opposition officielle)
(
    'ensemble_montreal_mtl',
    'Ensemble Montréal',
    'EM',
    'Soraya Martinez Ferrada',
    '/logos/ensemble-montreal.png',
    'https://ensemblemtl.org',
    'centre-droit',
    'Gestion efficace, réduction des dépenses publiques et réconciliation avec le milieu des affaires. Focus sur la sécurité et les services municipaux.',
    '["Expérience fédérale", "Gestion rigoureuse", "Relations d''affaires", "Réduction bureaucratie"]',
    '["Opposition depuis 8 ans", "Changement récent leadership", "Vision économique"]',
    'montreal'
),

-- 3. Transition Montréal (nouveau parti)
(
    'transition_montreal_mtl',
    'Transition Montréal',
    'TM',
    'Craig Sauvé',
    '/logos/transition-montreal.png',
    'https://transitionmontreal.org',
    'centre-gauche',
    'Alternative progressiste au "système à deux partis". Justice sociale, tarification équitable et soutien aux organismes communautaires.',
    '["Expérience municipale", "Justice sociale", "Alternative crédible", "Lutte itinérance"]',
    '["Nouveau parti", "Ressources limitées", "Ancien Projet Montréal"]',
    'montreal'
),

-- 4. Action Montréal (parti établi)
(
    'action_montreal_mtl',
    'Action Montréal',
    'AM',
    'Gilbert Thibodeau',
    '/logos/action-montreal.png',
    'https://actionmontreal.org',
    'centre-droit',
    'Approche conservatrice et pragmatique pour la gouvernance municipale. Focus sur la sécurité et la gestion fiscale responsable.',
    '["Vision conservatrice", "Gestion fiscale", "Sécurité publique"]',
    '["Visibilité limitée", "Controverses récentes", "Ressources restreintes"]',
    'montreal'
),

-- 5. Futur Montréal (nouveau parti 2025)
(
    'futur_montreal_mtl',
    'Futur Montréal',
    'FM',
    'Jean-François Kacou',
    '/logos/futur-montreal.png',
    'https://futurmontreal.com',
    'centre',
    'Faire la politique différemment avec inclusion, équité et pragmatisme. Premier candidat afro-canadien à la mairie de Montréal.',
    '["Inclusion et diversité", "Expérience municipale", "Vision novatrice", "Cohésion sociale"]',
    '["Très nouveau parti", "Reconnaissance limitée", "Ressources initiales"]',
    'montreal'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 5 partis ont été insérés correctement
SELECT
    COUNT(*) as total_partis_montreal,
    string_agg(name, ', ' ORDER BY name) as noms_partis
FROM public.parties
WHERE municipality_id = 'montreal';

-- Vérifier les détails de chaque parti
SELECT
    id,
    name,
    leader,
    orientation,
    municipality_id
FROM public.parties
WHERE municipality_id = 'montreal'
ORDER BY name;