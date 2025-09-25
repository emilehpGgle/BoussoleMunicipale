-- ================================================================
-- INSERTION DES PARTIS MUNICIPAUX DE LAVAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Sites officiels partis, Courrier Laval, MCL Média Laval, Le Devoir
-- Total: 3 partis pour les élections municipales de novembre 2025

-- Insertion des 3 partis municipaux de Laval
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

-- 1. Mouvement lavallois – Équipe Stéphane Boyer (parti au pouvoir)
(
    'mouvement_lavallois_lav',
    'Mouvement lavallois – Équipe Stéphane Boyer',
    'ML',
    'Stéphane Boyer',
    '/logos/Mouvement_Lavallois.png',
    'https://mouvementlavallois.org',
    'centre-gauche',
    'Bonne gouvernance, développement économique durable et services municipaux de qualité. Priorité 2025: Opération 440M$ pour modernisation des infrastructures.',
    '["Expérience gouvernementale", "Bilan 94% engagements", "Vision environnementale", "Services qualité"]',
    '["12 ans même parti", "Défis mobilité active", "Gestion grands projets"]',
    'laval'
),

-- 2. Parti Laval – Équipe Claude Larochelle (opposition principale)
(
    'parti_laval_lav',
    'Parti Laval – Équipe Claude Larochelle',
    'PL',
    'Claude Larochelle',
    '/logos/Parti_Laval.png',
    'https://partilaval.com',
    'centre-droit',
    'Responsabilité fiscale et efficacité administrative. Plateforme "Responsable et efficace, dès maintenant" axée sur la sécurité, propreté et gestion rigoureuse.',
    '["Expérience ingénieur", "30 ans gestion", "Opposition crédible", "Rigueur financière"]',
    '["Opposition depuis 2017", "Ressources limitées", "Défis visibilité"]',
    'laval'
),

-- 3. Action Laval (opposition avec élus)
(
    'action_laval_lav',
    'Action Laval',
    'AL',
    'Frédéric Mayer (candidat mairie), Achille Cifelli (chef intérimaire)',
    '/logos/Action_Laval.png',
    'https://actionlaval.com',
    'centre',
    'Dynamisme économique et renouveau politique. Focus sur la gestion efficace des finances et l''attraction d''entreprises pour redynamiser Laval.',
    '["3 élus actuels", "Équipe complète 22 districts", "Vision économique", "Gestion financière"]',
    '["Changement leadership", "Ressources limitées", "Reconnaissance publique"]',
    'laval'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 3 partis ont été insérés correctement
SELECT
    COUNT(*) as total_partis_laval,
    string_agg(name, ', ' ORDER BY name) as noms_partis
FROM public.parties
WHERE municipality_id = 'laval';

-- Vérifier les détails de chaque parti
SELECT
    id,
    name,
    leader,
    orientation,
    municipality_id
FROM public.parties
WHERE municipality_id = 'laval'
ORDER BY name;