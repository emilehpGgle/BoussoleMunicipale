-- ================================================================
-- INSERTION DES QUESTIONS MUNICIPALES DE MONTRÉAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Adaptation des questions génériques + spécificités Montreal
-- Total: 22 questions (21 agreement + 1 priority_ranking)

-- Insertion des 22 questions municipales de Montréal
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

-- 1. Question spécifique Montréal - Métro/REM
(
    'mtl_metro_rem',
    'La Ville de Montréal devrait prioriser l''extension du métro et l''intégration du REM, même si cela nécessite des investissements majeurs.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée au développement du transport collectif structurant face aux contraintes budgétaires.',
    'standard',
    1,
    'montreal',
    NULL
),

-- 2. Question spécifique Montréal - Arrondissements autonomie
(
    'mtl_arrondissements_autonomie',
    'Les arrondissements devraient avoir plus d''autonomie pour décider de leurs priorités locales, même si cela complique la coordination à l''échelle de la ville.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation versus la cohérence administrative.',
    'standard',
    2,
    'montreal',
    NULL
),

-- 3. Question spécifique Montréal - Festivals équilibre
(
    'mtl_festivals_equilibre',
    'La Ville devrait mieux encadrer les festivals et grands événements pour protéger la qualité de vie des résidents, même si cela réduit leur ampleur.',
    'Développement économique et social',
    'agreement',
    'Cette question évalue l''équilibre entre l''attractivité touristique/culturelle et la qualité de vie résidentielle.',
    'standard',
    3,
    'montreal',
    NULL
),

-- 4-21. Questions génériques adaptées pour Montréal (avec préfixe mtl_)
(
    'mtl_q2_pistes_cyclables',
    'La Ville de Montréal devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
    'standard',
    4,
    'montreal',
    NULL
),

(
    'mtl_q4_priorite_mobilite_active',
    'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
    'Mobilité et transport',
    'agreement',
    NULL,
    'standard',
    5,
    'montreal',
    NULL
),

(
    'mtl_q5_quotas_logements_abordables',
    'La Ville de Montréal devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    6,
    'montreal',
    NULL
),

(
    'mtl_q6_reduction_depenses_taxes',
    'La Ville de Montréal devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
    'standard',
    7,
    'montreal',
    NULL
),

(
    'mtl_q7_immeubles_grande_hauteur',
    'Les immeubles de grande hauteur devraient être favorisés pour maximiser l''utilisation des terrains disponibles.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    8,
    'montreal',
    NULL
),

(
    'mtl_q8_interdire_essence_centre_ville',
    'La Ville de Montréal devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
    'standard',
    9,
    'montreal',
    NULL
),

(
    'mtl_q9_protection_espaces_verts',
    'La Ville de Montréal devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
    'standard',
    10,
    'montreal',
    NULL
),

(
    'mtl_q10_transition_carboneutre',
    'La Ville de Montréal devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.',
    'Environnement et développement durable',
    'agreement',
    NULL,
    'standard',
    11,
    'montreal',
    NULL
),

(
    'mtl_q11_reduction_dechets',
    'La Ville de Montréal devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
    'standard',
    12,
    'montreal',
    NULL
),

(
    'mtl_q12_augmentation_taxes',
    'La Ville de Montréal devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    13,
    'montreal',
    NULL
),

(
    'mtl_q13_pouvoir_conseils_quartier',
    'La Ville de Montréal devrait donner plus de pouvoir aux conseils d''arrondissement pour décider des projets locaux.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.',
    'standard',
    14,
    'montreal',
    NULL
),

(
    'mtl_q14_reduction_dette',
    'La Ville de Montréal devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    15,
    'montreal',
    NULL
),

(
    'mtl_q15_avantages_fiscaux_entreprises',
    'La Ville de Montréal devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    16,
    'montreal',
    NULL
),

(
    'mtl_q16_limitation_touristes',
    'La Ville de Montréal devrait limiter le nombre de touristes dans certains quartiers pour protéger la qualité de vie des résidents.',
    'Développement économique et social',
    'agreement',
    'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
    'standard',
    17,
    'montreal',
    NULL
),

(
    'mtl_q17_soutien_organismes_communautaires',
    'La Ville de Montréal devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    18,
    'montreal',
    NULL
),

(
    'mtl_q18_augmentation_effectifs_policiers',
    'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les arrondissements.',
    'Sécurité publique et services municipaux',
    'agreement',
    NULL,
    'standard',
    19,
    'montreal',
    NULL
),

(
    'mtl_q19_investissement_infrastructures_loisirs_sportives',
    'La Ville de Montréal devrait investir plus dans les parcs, arénas et terrains de sport de quartier.',
    'Sécurité publique et services municipaux',
    'agreement',
    'Cette question évalue la priorité accordée aux services de proximité.',
    'standard',
    20,
    'montreal',
    NULL
),

(
    'mtl_q20_protection_patrimoine',
    'La Ville de Montréal devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.',
    'Patrimoine et identité',
    'agreement',
    NULL,
    'standard',
    21,
    'montreal',
    NULL
),

-- 22. Question priorités spécifique Montréal
(
    'mtl_enjeux_prioritaires',
    'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)',
    'Priorités municipales',
    'priority_ranking',
    'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
    'standard',
    22,
    'montreal',
    '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Extension du métro et REM", "Gestion des festivals et événements", "Coordination des arrondissements"]'
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 22 questions ont été insérées correctement
SELECT
    COUNT(*) as total_questions_montreal,
    string_agg(DISTINCT category, ', ' ORDER BY category) as categories
FROM public.questions
WHERE municipality_id = 'montreal';

-- Vérifier les questions spécifiques Montréal
SELECT
    id,
    LEFT(text, 80) as text_preview,
    category,
    response_type
FROM public.questions
WHERE municipality_id = 'montreal'
AND id LIKE 'mtl_%'
ORDER BY order_index;