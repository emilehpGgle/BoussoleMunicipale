-- ================================================================
-- INSERTION DES PARTIS MUNICIPAUX DE LONGUEUIL
-- ================================================================
-- Date: 2025-09-23
-- Source: Recherche Radio-Canada, Le Devoir, Élections Québec, recherche approfondie
-- Total: 2 partis actifs pour les élections municipales de novembre 2025

-- Insertion des 2 partis municipaux de Longueuil
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
-- 1. Coalition Longueuil (parti au pouvoir)
(
    'coalition_longueuil_lng',
    'Coalition Longueuil',
    'CL',
    'Catherine Fournier',
    '/logos/coalition-longueuil.png',
    'https://www.coalitionlongueuil.quebec',
    'centre-gauche',
    'Gouvernance collaborative, développement durable et croissance responsable. Focus sur la transition écologique, le logement abordable et l''amélioration du transport métropolitain.',
    '["Bilan mandat 2021-2025", "Gestion fiscale équilibrée", "Leadership environnemental", "Coopération métropolitaine"]',
    '["Manque opposition démocratique", "Défis transport régional", "Pression développement aéroportuaire"]',
    'longueuil'
),

-- 2. Option Alliance (nouveau parti - opposition)
(
    'option_alliance_lng',
    'Option Alliance',
    'OA',
    'Susan Rasmussen',
    '/logos/option-alliance.png',
    'https://optionalliance.quebec',
    'centre-droit',
    'Participation citoyenne, justice sociale et développement durable. Nouvelle alternative politique axée sur la proximité et les valeurs communautaires.',
    '["Approche proximité", "Justice sociale", "Participation citoyenne", "Alternative démocratique"]',
    '["Parti très récent", "Candidatures limitées", "Visibilité restreinte", "Programme en développement"]',
    'longueuil'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 2 partis ont été insérés correctement
SELECT
    COUNT(*) as total_partis_longueuil,
    string_agg(name, ', ' ORDER BY name) as noms_partis
FROM public.parties
WHERE municipality_id = 'longueuil';

-- Vérifier les détails de chaque parti
SELECT
    id,
    name,
    leader,
    orientation,
    municipality_id
FROM public.parties
WHERE municipality_id = 'longueuil'
ORDER BY name;