-- ================================================================
-- INSERTION DES QUESTIONS MUNICIPALES DE GATINEAU
-- ================================================================
-- Date: 2025-09-23
-- Source: Adaptation des questions génériques + spécificités Gatineau
-- Total: 22 questions (21 agreement + 1 priority_ranking)

-- Insertion des 22 questions municipales de Gatineau
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

-- 1. Question générique adaptée - Pistes cyclables
(
    'gat_q1_pistes_cyclables',
    'La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l''espace pour les voitures.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux transports actifs versus l''automobile.',
    'standard',
    1,
    'gatineau',
    NULL
),

-- 2. Question générique adaptée - Priorité mobilité active
(
    'gat_q2_priorite_mobilite_active',
    'Pour améliorer l''attractivité du centre-ville de Gatineau, la priorité devrait être donnée aux piétons, cyclistes et au transport collectif, même si cela implique de réduire l''espace dédié à l''automobile (stationnements, voies de circulation, etc.).',
    'Mobilité et transport',
    'agreement',
    NULL,
    'standard',
    2,
    'gatineau',
    NULL
),

-- 3. Question générique adaptée - Quotas logements abordables
(
    'gat_q3_quotas_logements_abordables',
    'La Ville de Gatineau devrait obliger un nombre minimum de logements abordables dans chaque nouveau projet immobilier.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    3,
    'gatineau',
    NULL
),

-- 4. Question générique adaptée - Réduction dépenses taxes
(
    'gat_q4_reduction_depenses_taxes',
    'La municipalité devrait réduire ses dépenses et ses taxes pour respecter la capacité de payer des citoyens.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la réduction de la charge fiscale municipale.',
    'standard',
    4,
    'gatineau',
    NULL
),

-- 5. Question générique adaptée - Immeubles grande hauteur
(
    'gat_q5_immeubles_grande_hauteur',
    'Les immeubles de grande hauteur devraient être favorisés à Gatineau pour maximiser l''utilisation des terrains disponibles.',
    'Habitation et aménagement urbain',
    'agreement',
    NULL,
    'standard',
    5,
    'gatineau',
    NULL
),

-- 6. Question générique adaptée - Interdire essence centre-ville
(
    'gat_q6_interdire_essence_centre_ville',
    'La Ville de Gatineau devrait interdire les véhicules à essence dans le centre-ville d''ici 2035.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux mesures environnementales radicales en mobilité urbaine.',
    'standard',
    6,
    'gatineau',
    NULL
),

-- 7. Question générique adaptée - Protection espaces verts
(
    'gat_q7_protection_espaces_verts',
    'La Ville de Gatineau devrait mettre plus d''argent pour protéger et agrandir les espaces verts, même si cela nuit au développement de projets immobiliers.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux espaces verts face à la pression immobilière.',
    'standard',
    7,
    'gatineau',
    NULL
),

-- 8. Question générique adaptée - Transition carboneutre
(
    'gat_q8_transition_carboneutre',
    'La Ville de Gatineau devrait accélérer la transition des bâtiments "carboneutres" (qui n''ajoutent pas de pollution au climat), même si ça coûte plus cher.',
    'Environnement et développement durable',
    'agreement',
    NULL,
    'standard',
    8,
    'gatineau',
    NULL
),

-- 9. Question générique adaptée - Réduction déchets
(
    'gat_q9_reduction_dechets',
    'La Ville de Gatineau devrait améliorer la collecte des ordures au lieu de la réduire pour des raisons environnementales.',
    'Environnement et développement durable',
    'agreement',
    'Cette question évalue la priorité accordée aux services municipaux (collecte) par rapport à la réduction des collectes justifiée par l''environnement.',
    'standard',
    9,
    'gatineau',
    NULL
),

-- 10. Question générique adaptée - Augmentation taxes
(
    'gat_q10_augmentation_taxes',
    'La Ville de Gatineau devrait investir davantage dans des projets écoresponsables (énergie verte, transport durable, bâtiments écologiques), même si cela nécessite d''augmenter les taxes foncières (impôt sur la propriété).',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    10,
    'gatineau',
    NULL
),

-- 11. Question générique adaptée - Pouvoir conseils secteur
(
    'gat_q11_pouvoir_conseils_secteur',
    'La Ville de Gatineau devrait donner plus de pouvoir aux conseils de secteur pour décider des projets locaux.',
    'Gouvernance et finances municipales',
    'agreement',
    'Cette question évalue la priorité accordée à la décentralisation de la gouvernance municipale dans les secteurs de Gatineau.',
    'standard',
    11,
    'gatineau',
    NULL
),

-- 12. Question générique adaptée - Réduction dette
(
    'gat_q12_reduction_dette',
    'La Ville de Gatineau devrait prioriser l''amélioration des services essentiels (collecte des ordures, déneigement, etc.) avant d''investir dans des projets d''avenir.',
    'Gouvernance et finances municipales',
    'agreement',
    NULL,
    'standard',
    12,
    'gatineau',
    NULL
),

-- 13. Question générique adaptée - Avantages fiscaux entreprises
(
    'gat_q13_avantages_fiscaux_entreprises',
    'La Ville de Gatineau devrait offrir plus de réductions de taxes ou autres avantages fiscaux pour attirer de grandes entreprises.',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    13,
    'gatineau',
    NULL
),

-- 14. Question générique adaptée - Limitation touristes
(
    'gat_q14_limitation_touristes',
    'La Ville de Gatineau devrait limiter le nombre de touristes dans certains secteurs pour protéger la qualité de vie des résidents.',
    'Développement économique et social',
    'agreement',
    'Cette question mesure la priorité accordée à l''équilibre entre tourisme et vie locale.',
    'standard',
    14,
    'gatineau',
    NULL
),

-- 15. Question générique adaptée - Soutien organismes communautaires
(
    'gat_q15_soutien_organismes_communautaires',
    'La Ville de Gatineau devrait donner plus d''argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).',
    'Développement économique et social',
    'agreement',
    NULL,
    'standard',
    15,
    'gatineau',
    NULL
),

-- 16. Question générique adaptée - Augmentation effectifs policiers
(
    'gat_q16_augmentation_effectifs_policiers',
    'Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les secteurs de Gatineau.',
    'Sécurité publique et services municipaux',
    'agreement',
    NULL,
    'standard',
    16,
    'gatineau',
    NULL
),

-- 17. Question générique adaptée - Investissement infrastructures loisirs sportives
(
    'gat_q17_investissement_infrastructures_loisirs_sportives',
    'La Ville de Gatineau devrait investir plus dans les parcs, arénas et terrains de sport de secteur.',
    'Sécurité publique et services municipaux',
    'agreement',
    'Cette question évalue la priorité accordée aux services de proximité.',
    'standard',
    17,
    'gatineau',
    NULL
),

-- 18. Question générique adaptée - Protection patrimoine
(
    'gat_q18_protection_patrimoine',
    'La Ville de Gatineau devrait renforcer les règles qui protègent les vieux bâtiments et le patrimoine, même si cela limite certains projets.',
    'Patrimoine et identité',
    'agreement',
    NULL,
    'standard',
    18,
    'gatineau',
    NULL
),

-- 19. Question spécifique Gatineau - Services bilingues
(
    'gat_q19_services_bilingues',
    'La municipalité devrait renforcer l''offre de services municipaux en français et en anglais pour répondre aux besoins de la population bilingue de Gatineau.',
    'Gouvernance et services municipaux',
    'agreement',
    'Cette question évalue l''importance accordée au bilinguisme dans les services municipaux, enjeu spécifique à Gatineau en raison de sa proximité avec Ottawa et sa population bilingue.',
    'standard',
    19,
    'gatineau',
    NULL
),

-- 20. Question spécifique Gatineau - Coordination Ottawa
(
    'gat_q20_coordination_ottawa',
    'La Ville de Gatineau devrait développer davantage de partenariats et de projets conjoints avec la Ville d''Ottawa pour des enjeux interproviciaux.',
    'Gouvernance et services municipaux',
    'agreement',
    'Cette question évalue l''approche collaborative avec Ottawa pour les enjeux qui dépassent les frontières provinciales, spécifique à la région de la capitale nationale.',
    'standard',
    20,
    'gatineau',
    NULL
),

-- 21. Question spécifique Gatineau - Transport interprovincial
(
    'gat_q21_transport_interprovincial',
    'La municipalité devrait investir davantage dans l''amélioration du transport interprovincial (ponts, traverse, transport en commun) entre Gatineau et Ottawa.',
    'Mobilité et transport',
    'agreement',
    'Cette question évalue la priorité accordée aux infrastructures de transport interprovincial, enjeu critique pour les nombreux travailleurs qui traversent quotidiennement entre le Québec et l''Ontario.',
    'standard',
    21,
    'gatineau',
    NULL
),

-- 22. Question priorités municipales adaptée Gatineau
(
    'gat_q22_enjeux_prioritaires',
    'Parmi les enjeux suivants, lesquels sont vos 3 priorités municipales les plus importantes ? (Classez par ordre d''importance : 1er, 2e et 3e choix)',
    'Priorités municipales',
    'priority_ranking',
    'Sélectionnez vos 3 enjeux municipaux prioritaires et classez-les par ordre d''importance.',
    'priority',
    22,
    'gatineau',
    '["Transport et mobilité", "Logement abordable", "Environnement et espaces verts", "Sécurité publique", "Gestion des finances municipales", "Services municipaux", "Lutte aux changements climatiques", "Patrimoine et identité", "Services bilingues", "Relations avec Ottawa", "Transport interprovincial"]'::jsonb
);