-- ================================================================
-- INSERTION DES PARTIS MUNICIPAUX DE GATINEAU
-- ================================================================
-- Date: 2025-09-23
-- Source: Recherche Radio-Canada Outaouais, Le Droit, sites officiels, Wikipedia
-- Total: 2 partis pour les élections municipales de novembre 2025

-- Insertion des 2 partis municipaux de Gatineau
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

-- 1. Action Gatineau (parti au pouvoir)
(
    'action_gatineau_gat',
    'Action Gatineau',
    'AG',
    'Maude Marquis-Bissonnette',
    '/logos/action-gatineau.png',
    'https://actiongatineau.org',
    'Centre-gauche',
    'Orientation générale : Centre-gauche social-démocrate.
Forces : New Urbanism, Environnementalisme, Transition écologique, Participation citoyenne, Inclusion sociale.
Réserves : Projets coûteux sans considération capacité de payer, Approche parfois idéologique.',
    '["Logement abordable", "Transition écologique", "Participation citoyenne", "Services inclusifs", "Mobilité durable"]'::jsonb,
    '["Gestion des coûts", "Projets d''envergure", "Contraintes budgétaires"]'::jsonb,
    'gatineau'
),

-- 2. Équipe Mario Aubé (opposition)
(
    'equipe_mario_aube_gat',
    'Équipe Mario Aubé',
    'ÉMA',
    'Mario Aubé',
    '/logos/equipe-mario-aube.png',
    'https://equipemarioaube.ca',
    'Big tent, conservatisme fiscal',
    'Orientation générale : Big tent avec conservatisme fiscal et localisme.
Forces : Gestion responsable, Respect capacité de payer, Services de base, Transparence budgétaire, Renouveau politique.
Réserves : Projets environnementaux coûteux, Interventions gouvernementales excessives, Hausses de taxes.',
    '["Gestion fiscale responsable", "Services de base", "Infrastructures essentielles", "Transparence", "Renouveau"]'::jsonb,
    '["Projets environnementaux coûteux", "Augmentation taxes", "Projets non-prioritaires"]'::jsonb,
    'gatineau'
);