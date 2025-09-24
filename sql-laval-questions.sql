-- ================================================================
-- INSERTION DES QUESTIONS MUNICIPALES DE LAVAL
-- ================================================================
-- Date: 2025-09-23
-- Source: Adaptation des questions génériques + spécificités Laval
-- Total: 21 questions (20 agreement + 1 priority_ranking)

-- Insertion des 21 questions municipales de Laval
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

-- 1. Question spécifique Laval - SRB et transport vers Montréal
(
    'lav_srb_transport_montreal',
    'La Ville de Laval devrait prioriser le développement d''un système rapide par bus (SRB) et l''amélioration des liens de transport collectif vers Montréal, même si cela nécessite des investissements majeurs.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée au développement du transport collectif structurant face aux contraintes budgétaires.',
    'standard',
    1,
    'laval',
    NULL
),

-- 2. Question spécifique Laval - Équilibre développement/espaces verts
(
    'lav_equilibre_developpement_espaces_verts',
    'Dans le développement de nouveaux projets résidentiels, la Ville de Laval devrait prioriser la préservation des espaces verts et des milieux naturels, même si cela limite les possibilités de densification.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue l''équilibre entre développement urbain et préservation environnementale face à la croissance démographique.',
    'standard',
    2,
    'laval',
    NULL
),

-- 3. Question générique adaptée - Pistes cyclables
(
    'lav_q2_pistes_cyclables',
    'La Ville de Laval devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
    'standard',
    3,
    'laval',
    NULL
),

-- 4. Question générique adaptée - Priorité mobilité active
(
    'lav_q4_priorite_mobilite_active',
    'Pour améliorer l''attractivité du centre-ville, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
    'Mobilité et transport',
    'agreement',
    NULL,
    'standard',
    4,
    'laval',
    NULL
),

-- 5. Question générique adaptée - Quotas logements abordables
(
    'lav_q5_quotas_logements_abordables',
    'La Ville de Laval devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    5,
    'laval',
    NULL
),

-- 6. Question générique adaptée - Réduction dépenses taxes
(
    'lav_q6_reduction_depenses_taxes',
    'La Ville de Laval devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
    'standard',
    6,
    'laval',
    NULL
),

-- 7. Question générique adaptée - Immeubles grande hauteur
(
    'lav_q7_immeubles_grande_hauteur',
    'Les immeubles de grande hauteur devraient être favorisés pour maximiser l''utilisation des terrains disponibles.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    7,
    'laval',
    NULL
),

-- 8. Question générique adaptée - Interdire essence centre-ville
(
    'lav_q8_interdire_essence_centre_ville',
    'La Ville de Laval devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
    'standard',
    8,
    'laval',
    NULL
),

-- 9. Question générique adaptée - Protection espaces verts
(
    'lav_q9_protection_espaces_verts',
    'La Ville de Laval devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
    'standard',
    9,
    'laval',
    NULL
),

-- 10. Question générique adaptée - Transition carboneutre
(
    'lav_q10_transition_carboneutre',
    'La Ville de Laval devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.',
    'Environnement et développement durable',
    'agreement',
    NULL,
    'standard',
    10,
    'laval',
    NULL
),

-- 11. Question générique adaptée - Réduction déchets
(
    'lav_q11_reduction_dechets',
    'La Ville de Laval devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
    'standard',
    11,
    'laval',
    NULL
),

-- 12. Question générique adaptée - Augmentation taxes
(
    'lav_q12_augmentation_taxes',
    'La Ville de Laval devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    12,
    'laval',
    NULL
),

-- 13. Question générique adaptée - Pouvoir conseils secteur (adaptation Laval)
(
    'lav_q13_pouvoir_conseils_quartier',
    'La Ville de Laval devrait donner plus de pouvoir aux conseils de secteur pour décider des projets locaux.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale.',
    'standard',
    13,
    'laval',
    NULL
),

-- 14. Question générique adaptée - Réduction dette
(
    'lav_q14_reduction_dette',
    'La Ville de Laval devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    14,
    'laval',
    NULL
),

-- 15. Question générique adaptée - Avantages fiscaux entreprises
(
    'lav_q15_avantages_fiscaux_entreprises',
    'La Ville de Laval devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    15,
    'laval',
    NULL
),

-- 16. Question générique adaptée - Limitation touristes (adaptation secteurs)
(
    'lav_q16_limitation_touristes',
    'La Ville de Laval devrait limiter le nombre de touristes dans certains secteurs pour protéger la qualité de vie des résidents.',
    'Développement économique et social',
    'agreement',
    'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
    'standard',
    16,
    'laval',
    NULL
),

-- 17. Question générique adaptée - Soutien organismes communautaires
(
    'lav_q17_soutien_organismes_communautaires',
    'La Ville de Laval devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    17,
    'laval',
    NULL
),

-- 18. Question générique adaptée - Augmentation effectifs policiers (adaptation secteurs)
(
    'lav_q18_augmentation_effectifs_policiers',
    'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les secteurs.',
    'Sécurité publique et services municipaux',
    'agreement',
    NULL,
    'standard',
    18,
    'laval',
    NULL
),

-- 19. Question générique adaptée - Investissement infrastructures loisirs (adaptation secteurs)
(
    'lav_q19_investissement_infrastructures_loisirs_sportives',
    'La Ville de Laval devrait investir plus dans les parcs, arénas et terrains de sport de secteur.',
    'Sécurité publique et services municipaux',
    'agreement',
    'Cette question évalue la priorité accordée aux services de proximité.',
    'standard',
    19,
    'laval',
    NULL
),

-- 20. Question générique adaptée - Protection patrimoine
(
    'lav_q20_protection_patrimoine',
    'La Ville de Laval devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.',
    'Patrimoine et identité',
    'agreement',
    NULL,
    'standard',
    20,
    'laval',
    NULL
),

-- 21. Question priorités avec options spécifiques Laval
(
    'lav_enjeux_prioritaires',
    'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)',
    'Priorités municipales',
    'priority_ranking',
    'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
    'standard',
    21,
    'laval',
    '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Développement du SRB", "Transport vers Montréal"]'::jsonb
);

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier que les 21 questions ont été insérées correctement
SELECT
    COUNT(*) as total_questions_laval,
    COUNT(CASE WHEN response_type = 'agreement' THEN 1 END) as questions_agreement,
    COUNT(CASE WHEN response_type = 'priority_ranking' THEN 1 END) as questions_priority
FROM public.questions
WHERE municipality_id = 'laval';

-- Vérifier les détails des questions par catégorie
SELECT
    category,
    COUNT(*) as nb_questions,
    string_agg(SUBSTRING(text FROM 1 FOR 50) || '...', '; ' ORDER BY order_index) as exemples
FROM public.questions
WHERE municipality_id = 'laval'
GROUP BY category
ORDER BY category;