-- Positions des partis politiques de Longueuil
-- Extraction depuis POSITIONS-PARTIS-LONGUEUIL.md
-- 2 partis × 21 questions = 42 positions

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES

-- Coalition Longueuil (14 positions)
('coalition-longueuil', 'lng_q1_transport_metropolitain', 'FA', 'Ville de Longueuil - Programme triennal 2025-2027, Recherche Exa - Transport métropolitain', 'Lobby actif pour extension REM Rive-Sud, études de faisabilité en partenariat avec Brossard, route express Taschereau pilote lancée'),
('coalition-longueuil', 'lng_q2_pistes_cyclables', 'PA', 'Ville de Longueuil - Plan mobilité active, Le Courrier du Sud - Consultation mobilité durable', 'Sous Fournier, Longueuil a complété plus de 20 km de nouvelles pistes cyclables protégées et priorise les transports actifs'),
('coalition-longueuil', 'lng_q3_developpement_aeroportuaire', 'PD', 'Recherche Exa - Développement aéroportuaire 2023', 'Partenariat avec Aéroports de Montréal pour moderniser pistes (50M$ provincial), voit l''aéroport comme moteur économique régional'),
('coalition-longueuil', 'lng_q4_priorite_mobilite_active', 'PA', 'Recherche Exa - Rapport complet positions Coalition Longueuil', 'Le parti favorise la mobilité active au centre-ville avec des aménagements pour piétons et cyclistes, tout en maintenant un équilibre avec l''automobile'),
('coalition-longueuil', 'lng_q5_quotas_logements_abordables', 'FA', 'Le Devoir - Politique logement Longueuil, Communiqué municipal 2024', 'Coalition Longueuil a établi un quota de 25% de logements abordables pour les tours de 12+ étages, premier parmi les banlieues du Grand Montréal'),
('coalition-longueuil', 'lng_q6_reduction_depenses_taxes', 'PA', 'Recherche Exa - Gestion finances municipales', 'L''administration Fournier a maintenu les hausses de taxes sous le taux d''inflation (plafonné à 1.8% annuellement) tout en équilibrant les budgets'),
('coalition-longueuil', 'lng_q7_immeubles_grande_hauteur', 'FA', 'Recherche Exa - Politique aménagement urbain', 'Soutient activement les immeubles haute densité dans des zones ciblées comme le Vieux-Longueuil, avec des incitatifs financiers pour développeurs'),
('coalition-longueuil', 'lng_q8_interdire_essence_centre_ville', 'PA', 'Recherche Exa - Objectifs environnementaux', 'Soutient l''interdiction des véhicules à essence au centre-ville d''ici 2030, avec installation de bornes de recharge rapide'),
('coalition-longueuil', 'lng_q9_protection_espaces_verts', 'FA', 'Ville de Longueuil Plan directeur 2023, Recherche Exa - Initiatives vertes', 'Campagne de plantation de 5000+ arbres, création de deux zones de conservation, mandat de 50% de couverture verte sur toits publics'),
('coalition-longueuil', 'lng_q10_transition_carboneutre', 'FA', 'Recherche Exa - Plan environnemental 2023', 'Objectif de carboneutralité d''ici 2050, avec crédits fiscaux de 3M$ pour rénovations écoresponsables via obligations vertes'),
('coalition-longueuil', 'lng_q11_reduction_dechets', 'PD', 'Recherche Exa - Réforme gestion déchets', 'A introduit la collecte de compost organique à l''échelle municipale en 2022, réduisant les déchets de 35%. Oppose tout retour en arrière des services verts'),
('coalition-longueuil', 'lng_q12_augmentation_taxes', 'PA', 'Recherche Exa - Politique fiscale verte', 'Soutient les investissements écoresponsables financés par des hausses de taxes modérées, comme démontré par les obligations vertes de 3M$'),
('coalition-longueuil', 'lng_q13_pouvoir_conseils_quartier', 'N', 'Recherche Exa - Réformes gouvernance 2022', 'A doublé l''autonomie budgétaire des conseils d''arrondissement mais maintient la planification stratégique centralisée. Approche hybride équilibrée'),
('coalition-longueuil', 'lng_q14_reduction_dette', 'PA', 'Recherche Exa - Gestion budgétaire', 'Priorise les services essentiels tout en maintenant des investissements stratégiques dans l''infrastructure et l''environnement'),
('coalition-longueuil', 'lng_q15_avantages_fiscaux_entreprises', 'PA', 'Recherche Exa - Stratégie développement économique', 'Utilise des crédits fiscaux ciblés pour attirer des PME, particulièrement dans l''aérospatiale et la technologie'),
('coalition-longueuil', 'lng_q16_limitation_touristes', 'PD', 'Recherche Exa - Initiatives touristiques', 'Promotion touristique active avec budget annuel de 2M$, focus sur développement riverain et festivals culturels'),
('coalition-longueuil', 'lng_q17_soutien_organismes_communautaires', 'FA', 'Recherche Exa - Programme subventions communautaires 2024', 'Nouveau programme de subventions communautaires de 1.5M$ en 2024, finançant plus de 60 projets locaux'),
('coalition-longueuil', 'lng_q18_augmentation_effectifs_policiers', 'PA', 'Recherche Exa - Réformes sécurité publique', 'Augmentation de 30 policiers de 2021 à 2024, favorisant le modèle de police communautaire avec amélioration de l''éclairage urbain'),
('coalition-longueuil', 'lng_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Recherche Exa - Investissements infrastructures 2021-2024', '8M$ investis dans la réfection de centres communautaires et construction de deux nouveaux complexes multisports à Saint-Hubert et Greenfield Park'),
('coalition-longueuil', 'lng_q20_protection_patrimoine', 'N', 'Recherche Exa - Politique patrimoine vs développement', 'Maintient des règles strictes de patrimoine mais permet des exemptions stratégiques pour répondre aux besoins de logement. Approche équilibrée'),
('coalition-longueuil', 'lng_q21_enjeux_prioritaires', 'FA', 'Orientations politiques du parti', 'Priorités: Transport métropolitain, Environnement et espaces verts, Services municipaux'),

-- Option Alliance (21 positions)
('option-alliance', 'lng_q1_transport_metropolitain', 'PA', 'Estimation équilibre transport/fiscalité', 'Soutien probable au transport métropolitain mais avec préoccupations sur les coûts municipaux'),
('option-alliance', 'lng_q2_pistes_cyclables', 'N', 'Estimation basée sur orientation centre-droit', 'Position modérée probable sur les pistes cyclables, favorisant l''équilibre entre transports actifs et automobile'),
('option-alliance', 'lng_q3_developpement_aeroportuaire', 'N', 'Estimation centre-droit équilibre', 'Position équilibrée probable entre développement économique aéroportuaire et qualité de vie'),
('option-alliance', 'lng_q4_priorite_mobilite_active', 'N', 'Estimation basée sur profil politique', 'Approche équilibrée probable entre mobilité active et besoins automobilistes'),
('option-alliance', 'lng_q5_quotas_logements_abordables', 'N', 'Estimation basée sur tendances centre-droit', 'Soutien probable aux logements abordables mais avec approche moins interventionniste que Coalition Longueuil'),
('option-alliance', 'lng_q6_reduction_depenses_taxes', 'PA', 'Tendance typique partis opposition municipaux', 'Parti d''opposition probable de favoriser la réduction des dépenses et taxes municipales'),
('option-alliance', 'lng_q7_immeubles_grande_hauteur', 'N', 'Estimation centre-droit', 'Position équilibrée probable sur la densification urbaine'),
('option-alliance', 'lng_q8_interdire_essence_centre_ville', 'PD', 'Tendance centre-droit sur enjeux automobiles', 'Opposition probable aux mesures restrictives sur l''automobile, approche plus graduelle'),
('option-alliance', 'lng_q9_protection_espaces_verts', 'PA', 'Valeur développement durable déclarée', 'Soutien probable aux espaces verts, enjeu consensuel, mais avec approche moins interventionniste'),
('option-alliance', 'lng_q10_transition_carboneutre', 'N', 'Estimation équilibre environnement/économie', 'Soutien modéré à la transition environnementale mais avec préoccupations sur les coûts'),
('option-alliance', 'lng_q11_reduction_dechets', 'N', 'Estimation', 'Position équilibrée sur les services de collecte'),
('option-alliance', 'lng_q12_augmentation_taxes', 'PD', 'Tendance centre-droit fiscalité', 'Opposition probable aux hausses de taxes, même pour projets écologiques'),
('option-alliance', 'lng_q13_pouvoir_conseils_quartier', 'PA', 'Valeur participation citoyenne déclarée', 'Parti axé sur participation citoyenne, favoriserait plus d''autonomie locale'),
('option-alliance', 'lng_q14_reduction_dette', 'PA', 'Tendance opposition fiscale', 'Priorité probable aux services essentiels avant nouveaux projets'),
('option-alliance', 'lng_q15_avantages_fiscaux_entreprises', 'PA', 'Orientation centre-droit économique', 'Soutien probable aux incitatifs économiques pour entreprises'),
('option-alliance', 'lng_q16_limitation_touristes', 'PD', 'Tendance pro-développement économique', 'Favorise probablement le développement touristique pour l''économie locale'),
('option-alliance', 'lng_q17_soutien_organismes_communautaires', 'PA', 'Valeur justice sociale déclarée', 'Soutien probable aux organismes communautaires, aligné avec justice sociale déclarée'),
('option-alliance', 'lng_q18_augmentation_effectifs_policiers', 'PA', 'Tendance centre-droit sécurité', 'Soutien probable au renforcement de la sécurité publique'),
('option-alliance', 'lng_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Consensus municipal général', 'Soutien probable aux infrastructures de loisirs, services de base populaires'),
('option-alliance', 'lng_q20_protection_patrimoine', 'PA', 'Valeur conservation modérée', 'Soutien probable à la protection du patrimoine avec équilibre développement'),
('option-alliance', 'lng_q21_enjeux_prioritaires', 'PA', 'Orientations estimées du parti', 'Priorités: Gestion des finances municipales, Services municipaux, Sécurité publique');