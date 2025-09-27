-- Positions des partis politiques municipaux de Montréal (5 partis × 21 questions = 105 positions)
-- Basé sur POSITIONS-PARTIS-MTL.md

-- ============================================================================
-- PROJET MONTRÉAL (Chef: Luc Rabouin - Centre-gauche)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('projet-montreal', 'mtl_q1_metro_rem', 'FA', 'Plateforme transport', 'Luc Rabouin soutient fortement la mobilité structurante et les investissements en transport collectif'),
('projet-montreal', 'mtl_q2_pistes_cyclables', 'FA', 'Vision pro-vélo', 'Continuité de la vision Projet Montréal pro-vélo'),
('projet-montreal', 'mtl_q3_arrondissements_autonomie', 'PA', 'Gouvernance', 'Accord modéré avec l''autonomie des arrondissements'),
('projet-montreal', 'mtl_q4_priorite_mobilite_active', 'FA', 'Centre-ville', 'Priorité forte à la mobilité active au centre-ville'),
('projet-montreal', 'mtl_q5_quotas_logements_abordables', 'FA', 'Logement social', 'Création fonds d''investissement logement, 1000 logements transitoires'),
('projet-montreal', 'mtl_q6_reduction_depenses_taxes', 'PD', 'Intervention publique', 'Approche interventionniste maintenue malgré virage pragmatique'),
('projet-montreal', 'mtl_q7_immeubles_grande_hauteur', 'PA', 'Densification', 'Support modéré à la densification par hauteur'),
('projet-montreal', 'mtl_q8_interdire_essence_centre_ville', 'PA', 'Environnement', 'Favorable aux mesures environnementales progressives'),
('projet-montreal', 'mtl_q9_protection_espaces_verts', 'FA', 'Protection environnementale', 'Protection environnementale priorité absolue'),
('projet-montreal', 'mtl_q10_transition_carboneutre', 'FA', 'Transition écologique', 'Engagement fort pour transition écologique'),
('projet-montreal', 'mtl_q11_reduction_dechets', 'PD', 'Services collecte', 'Maintien services collecte vs réduction environnementale'),
('projet-montreal', 'mtl_q12_augmentation_taxes', 'PA', 'Projets sociaux', 'Acceptation hausses taxes pour projets sociaux/environnementaux'),
('projet-montreal', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Décentralisation', 'Support modéré décentralisation gouvernance'),
('projet-montreal', 'mtl_q14_reduction_dette', 'PD', 'Investissements', 'Priorité investissements vs réduction dette'),
('projet-montreal', 'mtl_q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Réticence privilèges fiscaux entreprises'),
('projet-montreal', 'mtl_q16_limitation_touristes', 'PA', 'Équilibre', 'Équilibre développement touristique et qualité vie'),
('projet-montreal', 'mtl_q17_soutien_organismes_communautaires', 'FA', 'Services sociaux', 'Support fort organismes sociaux essentiels'),
('projet-montreal', 'mtl_q18_augmentation_effectifs_policiers', 'N', 'Sécurité', 'Position neutre sur effectifs policiers'),
('projet-montreal', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures proximité', 'Support infrastructures récréatives proximité'),
('projet-montreal', 'mtl_q20_protection_patrimoine', 'PA', 'Développement équilibré', 'Protection patrimoine avec développement équilibré'),
('projet-montreal', 'mtl_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Extension métro/REM, Logement abordable, Environnement et espaces verts');

-- ============================================================================
-- ENSEMBLE MONTRÉAL (Chef: Soraya Martinez Ferrada - Centre-droit)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('ensemble-montreal', 'mtl_q1_metro_rem', 'PA', 'Transport', 'Support modéré extension métro/REM'),
('ensemble-montreal', 'mtl_q2_pistes_cyclables', 'N', 'Équilibre', 'Approche équilibrée développement cyclable'),
('ensemble-montreal', 'mtl_q3_arrondissements_autonomie', 'FA', 'Décentralisation', 'Décentralisation forte vers arrondissements prioritaire'),
('ensemble-montreal', 'mtl_q4_priorite_mobilite_active', 'PD', 'Automobile', 'Réticence réduction espace automobile centre-ville'),
('ensemble-montreal', 'mtl_q5_quotas_logements_abordables', 'PA', 'Logement', 'Exemption permis construction logements sociaux/abordables'),
('ensemble-montreal', 'mtl_q6_reduction_depenses_taxes', 'FA', 'Réduction fonction publique', 'Proposition de réduction 1000 postes fonction publique'),
('ensemble-montreal', 'mtl_q7_immeubles_grande_hauteur', 'PA', 'Densification urbaine', 'Support modéré densification urbaine'),
('ensemble-montreal', 'mtl_q8_interdire_essence_centre_ville', 'PD', 'Mesures radicales', 'Opposition mesures environnementales radicales'),
('ensemble-montreal', 'mtl_q9_protection_espaces_verts', 'N', 'Développement', 'Position neutre espaces verts vs développement'),
('ensemble-montreal', 'mtl_q10_transition_carboneutre', 'N', 'Pragmatisme', 'Approche pragmatique transition écologique'),
('ensemble-montreal', 'mtl_q11_reduction_dechets', 'PA', 'Services collecte', 'Amélioration services collecte prioritaire'),
('ensemble-montreal', 'mtl_q12_augmentation_taxes', 'PD', 'Opposition taxes', 'Opposition hausses taxes projets écoresponsables'),
('ensemble-montreal', 'mtl_q13_pouvoir_conseils_quartier', 'FA', 'Gouvernance locale', 'Forte décentralisation gouvernance locale'),
('ensemble-montreal', 'mtl_q14_reduction_dette', 'FA', 'Services essentiels', 'Focus services essentiels et gestion rigoureuse'),
('ensemble-montreal', 'mtl_q15_avantages_fiscaux_entreprises', 'FA', 'Milieu affaires', 'Réconciliation avec milieu des affaires prioritaire'),
('ensemble-montreal', 'mtl_q16_limitation_touristes', 'PD', 'Développement touristique', 'Opposition limitation développement touristique'),
('ensemble-montreal', 'mtl_q17_soutien_organismes_communautaires', 'N', 'Organismes', 'Position neutre financement organismes'),
('ensemble-montreal', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité', 'Support modéré renforcement sécurité'),
('ensemble-montreal', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures', 'Investissement infrastructures récréatives'),
('ensemble-montreal', 'mtl_q20_protection_patrimoine', 'N', 'Équilibre économique', 'Équilibre patrimoine vs développement économique'),
('ensemble-montreal', 'mtl_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Gestion des finances municipales, Services municipaux, Développement économique');

-- ============================================================================
-- TRANSITION MONTRÉAL (Chef: Craig Sauvé - Centre-gauche)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('transition-montreal', 'mtl_q1_metro_rem', 'PA', 'Transport collectif', 'Support transport collectif structurant'),
('transition-montreal', 'mtl_q2_pistes_cyclables', 'PA', 'Transport actif', 'Développement transport actif'),
('transition-montreal', 'mtl_q3_arrondissements_autonomie', 'PA', 'Coordination', 'Autonomie arrondissements avec coordination'),
('transition-montreal', 'mtl_q4_priorite_mobilite_active', 'PA', 'Mobilité active', 'Priorité mobilité active centre-ville'),
('transition-montreal', 'mtl_q5_quotas_logements_abordables', 'FA', 'Justice sociale', 'Focus fort sur logement abordable et justice sociale'),
('transition-montreal', 'mtl_q6_reduction_depenses_taxes', 'N', 'Gestion fiscale', 'Position nuancée gestion fiscale'),
('transition-montreal', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Densification équilibrée', 'Approche équilibrée densification'),
('transition-montreal', 'mtl_q8_interdire_essence_centre_ville', 'N', 'Transition automobile', 'Position modérée transition automobile'),
('transition-montreal', 'mtl_q9_protection_espaces_verts', 'PA', 'Environnement', 'Protection environnementale importante'),
('transition-montreal', 'mtl_q10_transition_carboneutre', 'PA', 'Transition écologique', 'Support transition écologique'),
('transition-montreal', 'mtl_q11_reduction_dechets', 'N', 'Services environnement', 'Position équilibrée services/environnement'),
('transition-montreal', 'mtl_q12_augmentation_taxes', 'PA', 'Surtaxe luxe', 'Surtaxe propriétés luxe 3,5M+ pour financer lutte itinérance'),
('transition-montreal', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Décentralisation', 'Décentralisation gouvernance'),
('transition-montreal', 'mtl_q14_reduction_dette', 'N', 'Équilibre', 'Équilibre services essentiels/projets'),
('transition-montreal', 'mtl_q15_avantages_fiscaux_entreprises', 'PD', 'Privilèges fiscaux', 'Réticence privilèges fiscaux entreprises'),
('transition-montreal', 'mtl_q16_limitation_touristes', 'N', 'Développement touristique', 'Position neutre développement touristique'),
('transition-montreal', 'mtl_q17_soutien_organismes_communautaires', 'FA', 'Lutte itinérance', 'Priorité soutien social et lutte itinérance'),
('transition-montreal', 'mtl_q18_augmentation_effectifs_policiers', 'N', 'Effectifs policiers', 'Position neutre effectifs policiers'),
('transition-montreal', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures communautaires', 'Support infrastructures communautaires'),
('transition-montreal', 'mtl_q20_protection_patrimoine', 'N', 'Patrimoine développement', 'Équilibre patrimoine vs développement'),
('transition-montreal', 'mtl_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Logement abordable, Services municipaux, Lutte aux changements climatiques');

-- ============================================================================
-- ACTION MONTRÉAL (Chef: Gilbert Thibodeau - Centre-droit)
-- Note: Positions largement inférées (peu d'infos publiques disponibles)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('action-montreal', 'mtl_q1_metro_rem', 'N', 'Position inférée', 'Position neutre transport collectif structurant'),
('action-montreal', 'mtl_q2_pistes_cyclables', 'N', 'Position inférée', 'Approche équilibrée développement cyclable'),
('action-montreal', 'mtl_q3_arrondissements_autonomie', 'PA', 'Position inférée', 'Support modéré autonomie arrondissements'),
('action-montreal', 'mtl_q4_priorite_mobilite_active', 'N', 'Position inférée', 'Position neutre mobilité active centre-ville'),
('action-montreal', 'mtl_q5_quotas_logements_abordables', 'N', 'Position inférée', 'Position neutre quotas logements'),
('action-montreal', 'mtl_q6_reduction_depenses_taxes', 'PA', 'Orientation centre-droit', 'Tendance centre-droit réduction dépenses'),
('action-montreal', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Position inférée', 'Position neutre densification'),
('action-montreal', 'mtl_q8_interdire_essence_centre_ville', 'PD', 'Opposition mesures contraignantes', 'Opposition mesures environnementales contraignantes'),
('action-montreal', 'mtl_q9_protection_espaces_verts', 'N', 'Position inférée', 'Position neutre espaces verts'),
('action-montreal', 'mtl_q10_transition_carboneutre', 'N', 'Position inférée', 'Approche neutre transition écologique'),
('action-montreal', 'mtl_q11_reduction_dechets', 'N', 'Position inférée', 'Position neutre services collecte'),
('action-montreal', 'mtl_q12_augmentation_taxes', 'PD', 'Orientation centre-droit', 'Opposition hausses taxes (orientation centre-droit)'),
('action-montreal', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Gouvernance locale', 'Support gouvernance locale'),
('action-montreal', 'mtl_q14_reduction_dette', 'PA', 'Services essentiels', 'Priorité services essentiels vs projets'),
('action-montreal', 'mtl_q15_avantages_fiscaux_entreprises', 'PA', 'Développement économique', 'Favorable développement économique'),
('action-montreal', 'mtl_q16_limitation_touristes', 'N', 'Position inférée', 'Position neutre développement touristique'),
('action-montreal', 'mtl_q17_soutien_organismes_communautaires', 'N', 'Position inférée', 'Position neutre organismes communautaires'),
('action-montreal', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Support sécurité publique'),
('action-montreal', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'N', 'Position inférée', 'Position neutre infrastructures loisirs'),
('action-montreal', 'mtl_q20_protection_patrimoine', 'N', 'Position inférée', 'Position neutre protection patrimoine'),
('action-montreal', 'mtl_q21_enjeux_prioritaires', 'PA', 'Priorités inférées', 'Priorités: Gestion des finances municipales, Services municipaux, Développement économique');

-- ============================================================================
-- FUTUR MONTRÉAL (Chef: Jean-François Kacou - Centre)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('futur-montreal', 'mtl_q1_metro_rem', 'PA', 'Transport collectif', 'Support transport collectif structurant'),
('futur-montreal', 'mtl_q2_pistes_cyclables', 'PA', 'Cohésion usagers', 'Volonté de cohésion entre tous usagers de la route'),
('futur-montreal', 'mtl_q3_arrondissements_autonomie', 'PA', 'Coordination', 'Autonomie avec coordination'),
('futur-montreal', 'mtl_q4_priorite_mobilite_active', 'PA', 'Mobilité équilibrée', 'Priorité mobilité active équilibrée'),
('futur-montreal', 'mtl_q5_quotas_logements_abordables', 'PA', 'Logement priorité', 'Mobilité, logement abordable dans priorités'),
('futur-montreal', 'mtl_q6_reduction_depenses_taxes', 'N', 'Gestion fiscale', 'Position neutre gestion fiscale'),
('futur-montreal', 'mtl_q7_immeubles_grande_hauteur', 'N', 'Densification équilibrée', 'Approche équilibrée densification'),
('futur-montreal', 'mtl_q8_interdire_essence_centre_ville', 'N', 'Transition automobile', 'Position modérée transition automobile'),
('futur-montreal', 'mtl_q9_protection_espaces_verts', 'PA', 'Environnement', 'Protection environnementale importante'),
('futur-montreal', 'mtl_q10_transition_carboneutre', 'PA', 'Transition écologique', 'Support transition écologique'),
('futur-montreal', 'mtl_q11_reduction_dechets', 'N', 'Services collecte', 'Position équilibrée services collecte'),
('futur-montreal', 'mtl_q12_augmentation_taxes', 'N', 'Hausses taxes', 'Approche neutre hausses taxes'),
('futur-montreal', 'mtl_q13_pouvoir_conseils_quartier', 'PA', 'Écoute citoyenne', 'Écoute et dialogue avec citoyens prioritaires'),
('futur-montreal', 'mtl_q14_reduction_dette', 'N', 'Services projets', 'Équilibre services/projets'),
('futur-montreal', 'mtl_q15_avantages_fiscaux_entreprises', 'N', 'Développement économique', 'Position neutre développement économique'),
('futur-montreal', 'mtl_q16_limitation_touristes', 'N', 'Développement touristique', 'Position neutre développement touristique'),
('futur-montreal', 'mtl_q17_soutien_organismes_communautaires', 'PA', 'Organismes communautaires', 'Support organismes communautaires'),
('futur-montreal', 'mtl_q18_augmentation_effectifs_policiers', 'PA', 'Plan anti-haine', 'Plan anti-haine avec intervention rapide'),
('futur-montreal', 'mtl_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures récréatives', 'Support infrastructures récréatives'),
('futur-montreal', 'mtl_q20_protection_patrimoine', 'PA', 'Protection équilibrée', 'Protection patrimoine équilibrée'),
('futur-montreal', 'mtl_q21_enjeux_prioritaires', 'PA', 'Priorités politiques', 'Priorités: Transport et mobilité, Logement abordable, Services municipaux');

-- ============================================================================
-- FIN - 105 positions insérées (5 partis × 21 questions)
-- ============================================================================