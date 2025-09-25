-- ================================================================
-- INSERTION DES PARTIS MUNICIPAUX DE LÉVIS
-- ================================================================
-- Date: 2025-09-23
-- Source: Recherche Radio-Canada, Le Devoir, Journal de Lévis, Élections Québec
-- Total: 3 partis pour les élections municipales de novembre 2025

-- Insertion des 3 partis municipaux de Lévis
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

-- 1. Lévis Force 10 (parti au pouvoir, continuité)
(
    'levis_force_10_lev',
    'Lévis Force 10',
    'LF10',
    'Isabelle Demers',
    '/logos/Levis_Force_10.png',
    'https://levisforce10.com',
    'centre',
    'Continuité avec Gilles Lehouillier et finances responsables. Hausse de taxes limitée à l''inflation et transparence budgétaire pour une gestion prévisible.',
    '["Expérience gouvernementale", "Gestion financière responsable", "Réalisations concrètes", "Continuité éprouvée"]',
    '["Continuité peut limiter innovation", "Défis moratoire développement", "Pression croissance urbaine"]',
    'levis'
),

-- 2. Repensons Lévis (opposition officielle, centre-gauche)
(
    'repensons_levis_lev',
    'Repensons Lévis',
    'RL',
    'Serge Bonin',
    '/logos/Repensons_Levis.png',
    'https://repensonslevis.com',
    'centre-gauche',
    'Opposition constructive axée sur la participation citoyenne et la transparence. Plafonnement des taxes à l''IPC et renforcement du pouvoir des arrondissements.',
    '["Expérience opposition", "Participation citoyenne", "Transparence governance", "Vision sociale"]',
    '["Parti d''opposition", "Ressources limitées", "Défis gouvernance practical"]',
    'levis'
),

-- 3. Prospérité Lévis (nouveau parti, centre-droit)
(
    'prosperite_levis_lev',
    'Prospérité Lévis',
    'PL',
    'Steven Blaney',
    '/logos/Prosperite_Levis.png',
    'https://prosperitelevis.ca',
    'centre-droit',
    'Gestion rigoureuse avec expertise d''ingénieur. Focus sur mobilité (3e lien à l''est), responsabilité fiscale intergénérationnelle et sécurité des quartiers.',
    '["Expertise technique ingénieur", "Expérience politique fédérale", "Vision mobilité claire", "Gestion rigoureuse"]',
    '["Nouveau parti municipal", "Transition fédéral-municipal", "Positionnement conservateur"]',
    'levis'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 3 partis ont été insérés correctement
SELECT
    COUNT(*) as total_partis_levis,
    string_agg(name, ', ' ORDER BY name) as noms_partis
FROM public.parties
WHERE municipality_id = 'levis';

-- Vérifier les détails de chaque parti
SELECT
    id,
    name,
    leader,
    orientation,
    municipality_id
FROM public.parties
WHERE municipality_id = 'levis'
ORDER BY name;