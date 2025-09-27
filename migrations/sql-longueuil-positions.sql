-- ================================================================
-- INSERTION DES POSITIONS POLITIQUES LONGUEUIL
-- ================================================================
-- Date: 2025-09-23
-- Source: Recherche approfondie Catherine Fournier/Coalition Longueuil + estimations Option Alliance
-- Total: 42 positions (2 partis × 21 questions)

-- Insertion des positions politiques pour Longueuil
INSERT INTO public.party_positions (
    party_id,
    question_id,
    position,
    source,
    note
) VALUES

-- ================================================================
-- COALITION LONGUEUIL - Catherine Fournier (21 positions)
-- ================================================================

-- Transport métropolitain
('coalition_longueuil_lng', 'lng_transport_metropolitain', 'FA', 'Ville de Longueuil - Programme triennal 2025-2027, Recherche Exa - Transport métropolitain', 'Lobby actif pour extension REM Rive-Sud, études de faisabilité en partenariat avec Brossard, route express Taschereau pilote lancée.'),

-- Pistes cyclables
('coalition_longueuil_lng', 'lng_q2_pistes_cyclables', 'PA', 'Ville de Longueuil - Plan mobilité active, Le Courrier du Sud - Consultation mobilité durable', 'Sous Fournier, Longueuil a complété plus de 20 km de nouvelles pistes cyclables protégées et priorise les transports actifs.'),

-- Développement aéroportuaire
('coalition_longueuil_lng', 'lng_aeroport_qualite_vie', 'PD', 'Recherche Exa - Développement aéroportuaire 2023', 'Partenariat avec Aéroports de Montréal pour moderniser pistes (50M$ provincial), voit l''aéroport comme moteur économique régional.'),

-- Mobilité active centre-ville
('coalition_longueuil_lng', 'lng_q4_priorite_mobilite_active', 'PA', 'Recherche Exa - Rapport complet positions Coalition Longueuil', 'Le parti favorise la mobilité active au centre-ville avec des aménagements pour piétons et cyclistes, tout en maintenant un équilibre avec l''automobile.'),

-- Quotas logements abordables
('coalition_longueuil_lng', 'lng_q5_quotas_logements_abordables', 'FA', 'Le Devoir - Politique logement Longueuil, Communiqué municipal 2024', 'Coalition Longueuil a établi un quota de 25% de logements abordables pour les tours de 12+ étages, premier parmi les banlieues du Grand Montréal.'),

-- Réduction dépenses taxes
('coalition_longueuil_lng', 'lng_q6_reduction_depenses_taxes', 'PA', 'Recherche Exa - Gestion finances municipales', 'L''administration Fournier a maintenu les hausses de taxes sous le taux d''inflation (plafonné à 1.8% annuellement) tout en équilibrant les budgets.'),

-- Immeubles grande hauteur
('coalition_longueuil_lng', 'lng_q7_immeubles_grande_hauteur', 'FA', 'Recherche Exa - Politique aménagement urbain', 'Soutient activement les immeubles haute densité dans des zones ciblées comme le Vieux-Longueuil, avec des incitatifs financiers pour développeurs.'),

-- Interdire essence centre-ville
('coalition_longueuil_lng', 'lng_q8_interdire_essence_centre_ville', 'PA', 'Recherche Exa - Objectifs environnementaux', 'Soutient l''interdiction des véhicules à essence au centre-ville d''ici 2030, avec installation de bornes de recharge rapide.'),

-- Protection espaces verts
('coalition_longueuil_lng', 'lng_q9_protection_espaces_verts', 'FA', 'Ville de Longueuil Plan directeur 2023, Recherche Exa - Initiatives vertes', 'Campagne de plantation de 5000+ arbres, création de deux zones de conservation, mandat de 50% de couverture verte sur toits publics.'),

-- Transition carboneutre
('coalition_longueuil_lng', 'lng_q10_transition_carboneutre', 'FA', 'Recherche Exa - Plan environnemental 2023', 'Objectif de carboneutralité d''ici 2050, avec crédits fiscaux de 3M$ pour rénovations écoresponsables via obligations vertes.'),

-- Réduction déchets
('coalition_longueuil_lng', 'lng_q11_reduction_dechets', 'PD', 'Recherche Exa - Réforme gestion déchets', 'A introduit la collecte de compost organique à l''échelle municipale en 2022, réduisant les déchets de 35%. Oppose tout retour en arrière des services verts.'),

-- Augmentation taxes écologie
('coalition_longueuil_lng', 'lng_q12_augmentation_taxes', 'PA', 'Recherche Exa - Politique fiscale verte', 'Soutient les investissements écoresponsables financés par des hausses de taxes modérées, comme démontré par les obligations vertes de 3M$.'),

-- Pouvoir conseils arrondissement
('coalition_longueuil_lng', 'lng_q13_pouvoir_conseils_quartier', 'N', 'Recherche Exa - Réformes gouvernance 2022', 'A doublé l''autonomie budgétaire des conseils d''arrondissement mais maintient la planification stratégique centralisée. Approche hybride équilibrée.'),

-- Services essentiels priorité
('coalition_longueuil_lng', 'lng_q14_reduction_dette', 'PA', 'Recherche Exa - Gestion budgétaire', 'Priorise les services essentiels tout en maintenant des investissements stratégiques dans l''infrastructure et l''environnement.'),

-- Avantages fiscaux entreprises
('coalition_longueuil_lng', 'lng_q15_avantages_fiscaux_entreprises', 'PA', 'Recherche Exa - Stratégie développement économique', 'Utilise des crédits fiscaux ciblés pour attirer des PME, particulièrement dans l''aérospatiale et la technologie.'),

-- Limitation touristes
('coalition_longueuil_lng', 'lng_q16_limitation_touristes', 'PD', 'Recherche Exa - Initiatives touristiques', 'Promotion touristique active avec budget annuel de 2M$, focus sur développement riverain et festivals culturels.'),

-- Soutien organismes communautaires
('coalition_longueuil_lng', 'lng_q17_soutien_organismes_communautaires', 'FA', 'Recherche Exa - Programme subventions communautaires 2024', 'Nouveau programme de subventions communautaires de 1.5M$ en 2024, finançant plus de 60 projets locaux.'),

-- Augmentation effectifs policiers
('coalition_longueuil_lng', 'lng_q18_augmentation_effectifs_policiers', 'PA', 'Recherche Exa - Réformes sécurité publique', 'Augmentation de 30 policiers de 2021 à 2024, favorisant le modèle de police communautaire avec amélioration de l''éclairage urbain.'),

-- Investissement infrastructures loisirs
('coalition_longueuil_lng', 'lng_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Recherche Exa - Investissements infrastructures 2021-2024', '8M$ investis dans la réfection de centres communautaires et construction de deux nouveaux complexes multisports à Saint-Hubert et Greenfield Park.'),

-- Protection patrimoine
('coalition_longueuil_lng', 'lng_q20_protection_patrimoine', 'N', 'Recherche Exa - Politique patrimoine vs développement', 'Maintient des règles strictes de patrimoine mais permet des exemptions stratégiques pour répondre aux besoins de logement. Approche équilibrée.'),

-- Enjeux prioritaires (pas de position spécifique pour priority_ranking)
('coalition_longueuil_lng', 'lng_enjeux_prioritaires', 'N', 'Structure question priorité ranking', 'Question de classement des priorités selon les préférences des électeurs.'),

-- ================================================================
-- OPTION ALLIANCE - Susan Rasmussen (21 positions estimées)
-- ================================================================

-- Transport métropolitain
('option_alliance_lng', 'lng_transport_metropolitain', 'PA', 'Estimation équilibre transport/fiscalité', 'Soutien probable au transport métropolitain mais avec préoccupations sur les coûts municipaux.'),

-- Pistes cyclables
('option_alliance_lng', 'lng_q2_pistes_cyclables', 'N', 'Estimation basée sur orientation centre-droit', 'Position modérée probable sur les pistes cyclables, favorisant l''équilibre entre transports actifs et automobile.'),

-- Développement aéroportuaire
('option_alliance_lng', 'lng_aeroport_qualite_vie', 'N', 'Estimation centre-droit équilibre', 'Position équilibrée probable entre développement économique aéroportuaire et qualité de vie.'),

-- Mobilité active centre-ville
('option_alliance_lng', 'lng_q4_priorite_mobilite_active', 'N', 'Estimation basée sur profil politique', 'Approche équilibrée probable entre mobilité active et besoins automobilistes.'),

-- Quotas logements abordables
('option_alliance_lng', 'lng_q5_quotas_logements_abordables', 'N', 'Estimation basée sur tendances centre-droit', 'Soutien probable aux logements abordables mais avec approche moins interventionniste que Coalition Longueuil.'),

-- Réduction dépenses taxes
('option_alliance_lng', 'lng_q6_reduction_depenses_taxes', 'PA', 'Tendance typique partis opposition municipaux', 'Parti d''opposition probable de favoriser la réduction des dépenses et taxes municipales.'),

-- Immeubles grande hauteur
('option_alliance_lng', 'lng_q7_immeubles_grande_hauteur', 'N', 'Estimation centre-droit', 'Position équilibrée probable sur la densification urbaine.'),

-- Interdire essence centre-ville
('option_alliance_lng', 'lng_q8_interdire_essence_centre_ville', 'PD', 'Tendance centre-droit sur enjeux automobiles', 'Opposition probable aux mesures restrictives sur l''automobile, approche plus graduelle.'),

-- Protection espaces verts
('option_alliance_lng', 'lng_q9_protection_espaces_verts', 'PA', 'Valeur développement durable déclarée', 'Soutien probable aux espaces verts, enjeu consensuel, mais avec approche moins interventionniste.'),

-- Transition carboneutre
('option_alliance_lng', 'lng_q10_transition_carboneutre', 'N', 'Estimation équilibre environnement/économie', 'Soutien modéré à la transition environnementale mais avec préoccupations sur les coûts.'),

-- Réduction déchets
('option_alliance_lng', 'lng_q11_reduction_dechets', 'N', 'Estimation', 'Position équilibrée sur les services de collecte.'),

-- Augmentation taxes écologie
('option_alliance_lng', 'lng_q12_augmentation_taxes', 'PD', 'Tendance centre-droit fiscalité', 'Opposition probable aux hausses de taxes, même pour projets écologiques.'),

-- Pouvoir conseils arrondissement
('option_alliance_lng', 'lng_q13_pouvoir_conseils_quartier', 'PA', 'Valeur participation citoyenne déclarée', 'Parti axé sur participation citoyenne, favoriserait plus d''autonomie locale.'),

-- Services essentiels priorité
('option_alliance_lng', 'lng_q14_reduction_dette', 'PA', 'Tendance opposition fiscale', 'Priorité probable aux services essentiels avant nouveaux projets.'),

-- Avantages fiscaux entreprises
('option_alliance_lng', 'lng_q15_avantages_fiscaux_entreprises', 'PA', 'Orientation centre-droit économique', 'Soutien probable aux incitatifs économiques pour entreprises.'),

-- Limitation touristes
('option_alliance_lng', 'lng_q16_limitation_touristes', 'PD', 'Tendance pro-développement économique', 'Favorise probablement le développement touristique pour l''économie locale.'),

-- Soutien organismes communautaires
('option_alliance_lng', 'lng_q17_soutien_organismes_communautaires', 'PA', 'Valeur justice sociale déclarée', 'Soutien probable aux organismes communautaires, aligné avec justice sociale déclarée.'),

-- Augmentation effectifs policiers
('option_alliance_lng', 'lng_q18_augmentation_effectifs_policiers', 'PA', 'Tendance centre-droit sécurité', 'Soutien probable au renforcement de la sécurité publique.'),

-- Investissement infrastructures loisirs
('option_alliance_lng', 'lng_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Consensus municipal général', 'Soutien probable aux infrastructures de loisirs, services de base populaires.'),

-- Protection patrimoine
('option_alliance_lng', 'lng_q20_protection_patrimoine', 'PA', 'Valeur conservation modérée', 'Soutien probable à la protection du patrimoine avec équilibre développement.'),

-- Enjeux prioritaires (pas de position spécifique pour priority_ranking)
('option_alliance_lng', 'lng_enjeux_prioritaires', 'N', 'Structure question priorité ranking', 'Question de classement des priorités selon les préférences des électeurs.');

-- ================================================================
-- VÉRIFICATION DES INSERTIONS
-- ================================================================
-- Vérifier le nombre total de positions par parti
SELECT
    p.name as parti,
    COUNT(*) as nombre_positions
FROM public.party_positions pp
JOIN public.parties p ON pp.party_id = p.id
WHERE pp.party_id LIKE '%_lng'
GROUP BY p.name
ORDER BY p.name;

-- Vérifier la distribution des positions pour Coalition Longueuil
SELECT
    position,
    COUNT(*) as nombre
FROM public.party_positions
WHERE party_id = 'coalition_longueuil_lng'
GROUP BY position
ORDER BY position;

-- Vérifier la distribution des positions pour Option Alliance
SELECT
    position,
    COUNT(*) as nombre
FROM public.party_positions
WHERE party_id = 'option_alliance_lng'
GROUP BY position
ORDER BY position;

-- Vérifier le nombre total de positions Longueuil
SELECT
    COUNT(*) as total_positions_longueuil
FROM public.party_positions
WHERE party_id LIKE '%_lng';