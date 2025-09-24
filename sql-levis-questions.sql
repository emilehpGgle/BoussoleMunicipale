-- ================================================================
-- INSERTION DES QUESTIONS MUNICIPALES - LÉVIS
-- ================================================================
-- Date: 2025-09-23
-- Source: Adaptation template générique + 2 questions spécifiques Lévis
-- Total: 20 questions (18 génériques adaptées + 2 spécifiques Lévis)
-- Référence: Méthodologie Phase 2 (Montréal)

-- ================================================================
-- QUESTIONS GÉNÉRIQUES ADAPTÉES À LÉVIS
-- ================================================================
INSERT INTO public.questions (
    id,
    text,
    category,
    response_type,
    description,
    response_format,
    order_index,
    priority_options
) VALUES

-- Questions mobilité et transport (ordre 3-4)
(
    'lev_q2_pistes_cyclables',
    'La Ville de Lévis devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
    'standard',
    3,
    NULL
),
(
    'lev_q4_priorite_mobilite_active',
    'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
    'Mobilité et transport',
    'agreement',
    NULL,
    'standard',
    4,
    NULL
),

-- Questions habitation et aménagement urbain (ordre 5, 7)
(
    'lev_q5_quotas_logements_abordables',
    'La Ville de Lévis devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    5,
    NULL
),
(
    'lev_q7_immeubles_grande_hauteur',
    'Les immeubles de grande hauteur devraient être favorisés pour maximiser l''utilisation des terrains disponibles.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    7,
    NULL
),

-- Questions gouvernance et finances municipales (ordre 6, 12, 13, 14)
(
    'lev_q6_reduction_depenses_taxes',
    'La Ville de Lévis devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
    'standard',
    6,
    NULL
),
(
    'lev_q12_augmentation_taxes',
    'La Ville de Lévis devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    12,
    NULL
),
(
    'lev_q13_pouvoir_conseils_quartier',
    'La Ville de Lévis devrait donner plus de pouvoir aux conseils d''arrondissement pour décider des projets locaux.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.',
    'standard',
    13,
    NULL
),
(
    'lev_q14_reduction_dette',
    'La Ville de Lévis devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    14,
    NULL
),

-- Questions environnement et développement durable (ordre 8-11)
(
    'lev_q8_interdire_essence_centre_ville',
    'La Ville de Lévis devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
    'standard',
    8,
    NULL
),
(
    'lev_q9_protection_espaces_verts',
    'La Ville de Lévis devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
    'standard',
    9,
    NULL
),
(
    'lev_q10_transition_carboneutre',
    'La Ville de Lévis devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.',
    'Environnement et développement durable',
    'agreement',
    NULL,
    'standard',
    10,
    NULL
),
(
    'lev_q11_reduction_dechets',
    'La Ville de Lévis devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
    'standard',
    11,
    NULL
),

-- Questions développement économique et social (ordre 15-17)
(
    'lev_q15_avantages_fiscaux_entreprises',
    'La Ville de Lévis devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    15,
    NULL
),
(
    'lev_q16_limitation_touristes',
    'La Ville de Lévis devrait limiter le nombre de touristes dans certains arrondissements pour protéger la qualité de vie des résidents.',
    'Développement économique et social',
    'agreement',
    'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
    'standard',
    16,
    NULL
),
(
    'lev_q17_soutien_organismes_communautaires',
    'La Ville de Lévis devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    17,
    NULL
),

-- Questions sécurité publique et services municipaux (ordre 18-19)
(
    'lev_q18_augmentation_effectifs_policiers',
    'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les arrondissements.',
    'Sécurité publique et services municipaux',
    'agreement',
    NULL,
    'standard',
    18,
    NULL
),
(
    'lev_q19_investissement_infrastructures_loisirs_sportives',
    'La Ville de Lévis devrait investir plus dans les parcs, arénas et terrains de sport de quartier.',
    'Sécurité publique et services municipaux',
    'agreement',
    'Cette question évalue la priorité accordée aux services de proximité.',
    'standard',
    19,
    NULL
),

-- Question patrimoine et identité (ordre 20)
(
    'lev_q20_protection_patrimoine',
    'La Ville de Lévis devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.',
    'Patrimoine et identité',
    'agreement',
    NULL,
    'standard',
    20,
    NULL
);

-- ================================================================
-- QUESTIONS SPÉCIFIQUES LÉVIS (ordre 1-2)
-- ================================================================
INSERT INTO public.questions (
    id,
    text,
    category,
    response_type,
    description,
    response_format,
    order_index,
    priority_options
) VALUES

-- Question spécifique 1: Troisième lien routier
(
    'lev_q3_troisieme_lien',
    'La Ville de Lévis devrait soutenir activement la construction du troisième lien routier Québec-Lévis, même si le projet nécessite des investissements publics majeurs.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée au projet structurant du troisième lien entre Québec et Lévis.',
    'standard',
    1,
    NULL
),

-- Question spécifique 2: Traverse Québec-Lévis
(
    'lev_traverse_quebec_levis',
    'La Ville de Lévis devrait investir davantage pour améliorer la fréquence et la qualité du service de la traverse Québec-Lévis, même si cela augmente les coûts municipaux.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée à l''amélioration du transport maritime entre les deux rives.',
    'standard',
    2,
    NULL
);

-- ================================================================
-- QUESTION PRIORITÉS MUNICIPALES (ordre 21)
-- ================================================================
INSERT INTO public.questions (
    id,
    text,
    category,
    response_type,
    description,
    response_format,
    order_index,
    priority_options
) VALUES
(
    'lev_enjeux_prioritaires',
    'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)',
    'Priorités municipales',
    'priority_ranking',
    'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
    'standard',
    21,
    '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Troisième lien routier", "Traverse Québec-Lévis"]'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que toutes les 20 questions ont été insérées
SELECT
    COUNT(*) as total_questions_levis,
    COUNT(DISTINCT category) as nombre_categories
FROM public.questions
WHERE id LIKE 'lev_%';

-- Vérifier la répartition par catégorie
SELECT
    category,
    COUNT(*) as questions_par_categorie
FROM public.questions
WHERE id LIKE 'lev_%'
GROUP BY category
ORDER BY category;

-- Vérifier l'ordre des questions
SELECT
    id,
    text,
    category,
    order_index
FROM public.questions
WHERE id LIKE 'lev_%'
ORDER BY order_index;

-- Vérifier qu'aucune question n'a d'order_index manquant ou dupliqué
SELECT
    order_index,
    COUNT(*) as questions_avec_meme_ordre
FROM public.questions
WHERE id LIKE 'lev_%'
GROUP BY order_index
HAVING COUNT(*) > 1
ORDER BY order_index;

-- Vérifier les questions avec priority_options
SELECT
    id,
    text,
    priority_options
FROM public.questions
WHERE id LIKE 'lev_%' AND priority_options IS NOT NULL;