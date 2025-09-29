-- ================================================================
-- INSERTION PARTI DU MONDE - QUÉBEC
-- ================================================================
-- Date: 29 septembre 2025
-- Source: Plan de campagne 2025 - Parti du Monde + partidumonde.com
-- Nouveau parti pour les élections municipales de novembre 2025

-- ================================================================
-- NETTOYAGE PRÉALABLE (SI NÉCESSAIRE)
-- ================================================================

-- Supprimer le parti existant s'il existe déjà (supprimera aussi les positions via CASCADE)
DELETE FROM public.parties WHERE id = 'parti-du-monde-quebec';

-- ================================================================
-- INSERTION DU PARTI
-- ================================================================

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
) VALUES (
    'parti-du-monde-quebec',
    'Parti du Monde',
    'PDM',
    'Anne Guérette',
    '/logos/parti-du-monde.png',
    'https://partidumonde.com/',
    'Centre participatif, gouvernance collaborative',
    'Coalition municipale avec philosophie "Travailler avec notre monde". Vision structurante de développement durable et gouvernance collaborative. Quatre piliers : transport intelligent, gouvernance efficace, logement digne, développement durable.',
    '["Consultation citoyenne renforcée", "Transparence financière totale", "Vision transport innovante (Boucle Québec-Lévis)", "Approche collaborative multi-secteurs", "États généraux habitation", "Révision plan urbanisme", "Leadership économique métropolitain"]',
    '["Nouveau parti sans expérience", "Positions encore en développement", "Équipe en formation", "Vision ambitieuse à concrétiser"]',
    'quebec'
);

-- ================================================================
-- VÉRIFICATION DE L'INSERTION
-- ================================================================

-- Vérifier que le parti a été inséré correctement
SELECT
    'Parti du Monde inséré avec succès' as status,
    id,
    name,
    leader,
    municipality_id
FROM public.parties
WHERE id = 'parti-du-monde-quebec';

-- Compter le nombre total de partis pour Québec
SELECT
    'Total partis Québec après insertion:' as info,
    COUNT(*) as nombre_partis
FROM public.parties
WHERE municipality_id = 'quebec';

-- Lister tous les partis de Québec
SELECT
    id,
    name,
    leader,
    orientation
FROM public.parties
WHERE municipality_id = 'quebec'
ORDER BY name;