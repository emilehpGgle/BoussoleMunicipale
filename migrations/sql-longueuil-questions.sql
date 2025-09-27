-- ================================================================
-- INSERTION DES QUESTIONS MUNICIPALES DE LONGUEUIL
-- ================================================================
-- Date: 2025-09-23
-- Source: Adaptation des questions génériques + spécificités Longueuil
-- Total: 21 questions (20 agreement + 1 priority_ranking)

-- Insertion des 21 questions municipales de Longueuil
INSERT INTO public.questions (
    id,
    text,
    category,
    response_type,
    description,
    response_format,
    order_index,
    municipality_id,
    priority_options
) VALUES

-- 1. Question spécifique Longueuil - Transport métropolitain
(
    'lng_transport_metropolitain',
    'La Ville de Longueuil devrait investir davantage dans l''amélioration du transport collectif métropolitain vers Montréal (métro, autobus, REM), même si cela nécessite d''augmenter les taxes municipales.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée au transport métropolitain face aux contraintes budgétaires municipales.',
    'standard',
    1,
    'longueuil',
    NULL
),

-- 2. Question générique adaptée - Pistes cyclables
(
    'lng_q2_pistes_cyclables',
    'La Ville de Longueuil devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
    'standard',
    2,
    'longueuil',
    NULL
),

-- 3. Question spécifique Longueuil - Développement aéroportuaire
(
    'lng_aeroport_qualite_vie',
    'La Ville de Longueuil devrait limiter l''expansion aéroportuaire et le développement d''activités connexes pour préserver la qualité de vie des résidents, même si cela réduit les opportunités économiques locales.',
    'Développement économique et social',
    'agreement',
    'Cette question évalue l''équilibre entre le développement économique aéroportuaire et la protection de la qualité de vie résidentielle.',
    'standard',
    3,
    'longueuil',
    NULL
),

-- 4. Question générique adaptée - Mobilité active centre-ville
(
    'lng_q4_priorite_mobilite_active',
    'Pour améliorer l''attractivité du centre-ville de Longueuil, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
    'Mobilité et transport',
    'agreement',
    NULL,
    'standard',
    4,
    'longueuil',
    NULL
),

-- 5. Question générique adaptée - Quotas logements abordables
(
    'lng_q5_quotas_logements_abordables',
    'La Ville de Longueuil devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    5,
    'longueuil',
    NULL
),

-- 6. Question générique adaptée - Réduction dépenses taxes
(
    'lng_q6_reduction_depenses_taxes',
    'La Ville de Longueuil devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
    'standard',
    6,
    'longueuil',
    NULL
),

-- 7. Question générique adaptée - Immeubles grande hauteur
(
    'lng_q7_immeubles_grande_hauteur',
    'Les immeubles de grande hauteur devraient être favorisés à Longueuil pour maximiser l''utilisation des terrains disponibles.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    7,
    'longueuil',
    NULL
),

-- 8. Question générique adaptée - Interdire essence centre-ville
(
    'lng_q8_interdire_essence_centre_ville',
    'La Ville de Longueuil devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
    'standard',
    8,
    'longueuil',
    NULL
),

-- 9. Question générique adaptée - Protection espaces verts
(
    'lng_q9_protection_espaces_verts',
    'La Ville de Longueuil devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
    'standard',
    9,
    'longueuil',
    NULL
),

-- 10. Question générique adaptée - Transition carboneutre
(
    'lng_q10_transition_carboneutre',
    'La Ville de Longueuil devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.',
    'Environnement et développement durable',
    'agreement',
    NULL,
    'standard',
    10,
    'longueuil',
    NULL
),

-- 11. Question générique adaptée - Réduction déchets
(
    'lng_q11_reduction_dechets',
    'La Ville de Longueuil devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
    'standard',
    11,
    'longueuil',
    NULL
),

-- 12. Question générique adaptée - Augmentation taxes écologie
(
    'lng_q12_augmentation_taxes',
    'La Ville de Longueuil devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    12,
    'longueuil',
    NULL
),

-- 13. Question générique adaptée - Pouvoir conseils arrondissement
(
    'lng_q13_pouvoir_conseils_quartier',
    'La Ville de Longueuil devrait donner plus de pouvoir aux conseils d''arrondissement pour décider des projets locaux.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.',
    'standard',
    13,
    'longueuil',
    NULL
),

-- 14. Question générique adaptée - Services essentiels priorité
(
    'lng_q14_reduction_dette',
    'La Ville de Longueuil devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    14,
    'longueuil',
    NULL
),

-- 15. Question générique adaptée - Avantages fiscaux entreprises
(
    'lng_q15_avantages_fiscaux_entreprises',
    'La Ville de Longueuil devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    15,
    'longueuil',
    NULL
),

-- 16. Question générique adaptée - Limitation touristes
(
    'lng_q16_limitation_touristes',
    'La Ville de Longueuil devrait limiter le nombre de touristes dans certains arrondissements pour protéger la qualité de vie des résidents.',
    'Développement économique et social',
    'agreement',
    'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
    'standard',
    16,
    'longueuil',
    NULL
),

-- 17. Question générique adaptée - Soutien organismes communautaires
(
    'lng_q17_soutien_organismes_communautaires',
    'La Ville de Longueuil devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    17,
    'longueuil',
    NULL
),

-- 18. Question générique adaptée - Augmentation effectifs policiers
(
    'lng_q18_augmentation_effectifs_policiers',
    'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les arrondissements de Longueuil.',
    'Sécurité publique et services municipaux',
    'agreement',
    NULL,
    'standard',
    18,
    'longueuil',
    NULL
),

-- 19. Question générique adaptée - Investissement infrastructures loisirs
(
    'lng_q19_investissement_infrastructures_loisirs_sportives',
    'La Ville de Longueuil devrait investir plus dans les parcs, arénas et terrains de sport d''arrondissement.',
    'Sécurité publique et services municipaux',
    'agreement',
    'Cette question évalue la priorité accordée aux services de proximité.',
    'standard',
    19,
    'longueuil',
    NULL
),

-- 20. Question générique adaptée - Protection patrimoine
(
    'lng_q20_protection_patrimoine',
    'La Ville de Longueuil devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine de banlieue, même si cela limite certains projets.',
    'Patrimoine et identité',
    'agreement',
    NULL,
    'standard',
    20,
    'longueuil',
    NULL
),

-- 21. Question priorités Longueuil
(
    'lng_enjeux_prioritaires',
    'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)',
    'Priorités municipales',
    'priority_ranking',
    'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
    'standard',
    21,
    'longueuil',
    '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Transport métropolitain", "Développement aéroportuaire"]'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 21 questions ont été insérées correctement
SELECT
    COUNT(*) as total_questions_longueuil,
    COUNT(CASE WHEN response_type = 'agreement' THEN 1 END) as questions_agreement,
    COUNT(CASE WHEN response_type = 'priority_ranking' THEN 1 END) as questions_priorites
FROM public.questions
WHERE municipality_id = 'longueuil';

-- Vérifier les questions spécifiques à Longueuil
SELECT
    id,
    text,
    category,
    order_index
FROM public.questions
WHERE municipality_id = 'longueuil'
    AND id LIKE 'lng_%'
ORDER BY order_index;

-- Vérifier la question priorités
SELECT
    id,
    text,
    priority_options
FROM public.questions
WHERE municipality_id = 'longueuil'
    AND response_type = 'priority_ranking';