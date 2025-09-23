-- ========================================================================
-- MIGRATION 4: INSÉRER LES POSITIONS DES PARTIS RESTANTS
-- ========================================================================
-- À exécuter dans Supabase SQL Editor APRÈS 03_insert_parties_data.sql
-- Date: 2025-09-21
-- ========================================================================

-- ========================================================================
-- POSITIONS DE TRANSITION QUÉBEC
-- ========================================================================

INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('transition_quebec', 'q1_tramway', 'FA', 'Transport collectif électrique', 'Soutien fort au tramway électrique'),
('transition_quebec', 'q2_pistes_cyclables', 'FA', 'Mobilité verte', 'Réseau cyclable étendu prioritaire'),
('transition_quebec', 'q3_troisieme_lien', 'FD', 'Opposition ferme', 'Projet contraire aux objectifs climatiques'),
('transition_quebec', 'q4_priorite_mobilite_active', 'FA', 'Ville sans voiture', 'Vision de mobilité durable'),
('transition_quebec', 'q5_quotas_logements_abordables', 'FA', 'Droit au logement', 'Quotas obligatoires étendus'),
('transition_quebec', 'q6_reduction_depenses_taxes', 'FD', 'Investissement public', 'Services publics avant réduction'),
('transition_quebec', 'q7_immeubles_grande_hauteur', 'PA', 'Densification verte', 'Densification avec critères écologiques'),
('transition_quebec', 'q8_interdire_essence_centre_ville', 'FA', 'Zone zéro émission', 'Interdiction rapide des véhicules polluants'),
('transition_quebec', 'q9_protection_espaces_verts', 'FA', 'Priorité absolue', 'Protection maximale des écosystèmes'),
('transition_quebec', 'q10_transition_carboneutre', 'FA', 'Urgence climatique', 'Carboneutralité accélérée'),
('transition_quebec', 'q11_reduction_dechets', 'FA', 'Économie circulaire', 'Zéro déchet comme objectif'),
('transition_quebec', 'q12_augmentation_taxes', 'FA', 'Financement vert', 'Taxes justifiées pour la transition'),
('transition_quebec', 'q13_pouvoir_conseils_quartier', 'FA', 'Démocratie directe', 'Autonomie maximale des quartiers'),
('transition_quebec', 'q14_reduction_dette', 'PD', 'Investissement vert', 'Dette acceptable pour climat'),
('transition_quebec', 'q15_avantages_fiscaux_entreprises', 'PD', 'Justice fiscale', 'Taxes équitables pour tous'),
('transition_quebec', 'q16_limitation_touristes', 'PA', 'Tourisme responsable', 'Limitation pour durabilité'),
('transition_quebec', 'q17_soutien_organismes_communautaires', 'FA', 'Économie sociale', 'Soutien massif au communautaire'),
('transition_quebec', 'q18_augmentation_effectifs_policiers', 'PD', 'Justice sociale', 'Prévention plutôt que répression'),
('transition_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Loisirs verts', 'Infrastructures écologiques'),
('transition_quebec', 'q20_protection_patrimoine', 'FA', 'Patrimoine vivant', 'Protection et rénovation écologique'),
('transition_quebec', 'q21_priorites_municipales', 'FA', 'Transition écologique', 'Priorité absolue: climat et social');

-- ========================================================================
-- POSITIONS DE QUÉBEC 21
-- ========================================================================

INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('quebec_21', 'q1_tramway', 'PD', 'Coût excessif', 'Opposition au projet actuel'),
('quebec_21', 'q2_pistes_cyclables', 'PD', 'Priorité automobile', 'Préservation de l''espace automobile'),
('quebec_21', 'q3_troisieme_lien', 'PA', 'Infrastructure nécessaire', 'Soutien au développement routier'),
('quebec_21', 'q4_priorite_mobilite_active', 'PD', 'Équilibre transport', 'Maintien de la place de l''auto'),
('quebec_21', 'q5_quotas_logements_abordables', 'PD', 'Marché libre', 'Opposition aux quotas obligatoires'),
('quebec_21', 'q6_reduction_depenses_taxes', 'FA', 'Rigueur fiscale', 'Réduction prioritaire des dépenses'),
('quebec_21', 'q7_immeubles_grande_hauteur', 'PD', 'Préservation du caractère', 'Opposition à la densification'),
('quebec_21', 'q8_interdire_essence_centre_ville', 'PD', 'Liberté de circulation', 'Opposition aux restrictions'),
('quebec_21', 'q9_protection_espaces_verts', 'N', 'Équilibre développement', 'Protection selon les besoins'),
('quebec_21', 'q10_transition_carboneutre', 'PD', 'Coûts prohibitifs', 'Opposition aux exigences strictes'),
('quebec_21', 'q11_reduction_dechets', 'N', 'Services essentiels', 'Amélioration selon les moyens'),
('quebec_21', 'q12_augmentation_taxes', 'FD', 'Opposition fiscale', 'Réduction des taxes prioritaire'),
('quebec_21', 'q13_pouvoir_conseils_quartier', 'PD', 'Gouvernance centralisée', 'Efficacité administrative'),
('quebec_21', 'q14_reduction_dette', 'FA', 'Responsabilité fiscale', 'Réduction urgente de la dette'),
('quebec_21', 'q15_avantages_fiscaux_entreprises', 'PA', 'Compétitivité économique', 'Attraction des entreprises'),
('quebec_21', 'q16_limitation_touristes', 'PD', 'Développement économique', 'Maximisation du tourisme'),
('quebec_21', 'q17_soutien_organismes_communautaires', 'N', 'Soutien ciblé', 'Financement selon priorités'),
('quebec_21', 'q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Renforcement des effectifs'),
('quebec_21', 'q19_investissement_infrastructures_loisirs_sportives', 'N', 'Investissement mesuré', 'Selon les capacités financières'),
('quebec_21', 'q20_protection_patrimoine', 'PA', 'Valeurs traditionnelles', 'Préservation du patrimoine'),
('quebec_21', 'q21_priorites_municipales', 'PA', 'Priorités conservatrices', 'Finances, sécurité, tradition');

-- ========================================================================
-- POSITIONS DE QUÉBEC D'ABORD
-- ========================================================================

INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('quebec_dabord', 'q1_tramway', 'N', 'Évaluation nécessaire', 'Position d''attente sur le tramway'),
('quebec_dabord', 'q2_pistes_cyclables', 'PA', 'Mobilité diversifiée', 'Développement mesuré du vélo'),
('quebec_dabord', 'q3_troisieme_lien', 'N', 'Étude des options', 'Analyse des besoins'),
('quebec_dabord', 'q4_priorite_mobilite_active', 'N', 'Équilibre des modes', 'Cohabitation des transports'),
('quebec_dabord', 'q5_quotas_logements_abordables', 'N', 'Mesures incitatives', 'Approche flexible'),
('quebec_dabord', 'q6_reduction_depenses_taxes', 'PA', 'Gestion responsable', 'Contrôle de la croissance'),
('quebec_dabord', 'q7_immeubles_grande_hauteur', 'N', 'Développement adapté', 'Selon les secteurs'),
('quebec_dabord', 'q8_interdire_essence_centre_ville', 'N', 'Transition graduelle', 'Approche progressive'),
('quebec_dabord', 'q9_protection_espaces_verts', 'PA', 'Qualité de vie', 'Protection des espaces verts'),
('quebec_dabord', 'q10_transition_carboneutre', 'N', 'Transition réaliste', 'Objectifs atteignables'),
('quebec_dabord', 'q11_reduction_dechets', 'PA', 'Services efficaces', 'Amélioration des services'),
('quebec_dabord', 'q12_augmentation_taxes', 'PD', 'Contrôle fiscal', 'Éviter les hausses importantes'),
('quebec_dabord', 'q13_pouvoir_conseils_quartier', 'PA', 'Proximité citoyenne', 'Renforcement de la participation'),
('quebec_dabord', 'q14_reduction_dette', 'PA', 'Gestion saine', 'Contrôle de l''endettement'),
('quebec_dabord', 'q15_avantages_fiscaux_entreprises', 'N', 'Développement équilibré', 'Mesures ciblées'),
('quebec_dabord', 'q16_limitation_touristes', 'N', 'Tourisme durable', 'Gestion équilibrée'),
('quebec_dabord', 'q17_soutien_organismes_communautaires', 'PA', 'Tissu social', 'Soutien au milieu communautaire'),
('quebec_dabord', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité adaptée', 'Selon les besoins'),
('quebec_dabord', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures de proximité', 'Amélioration des services'),
('quebec_dabord', 'q20_protection_patrimoine', 'PA', 'Identité municipale', 'Préservation du caractère'),
('quebec_dabord', 'q21_priorites_municipales', 'PA', 'Services et proximité', 'Priorités: services, mobilité, logement');

-- ========================================================================
-- POSITIONS DE RENOUVEAU MUNICIPAL DE QUÉBEC
-- ========================================================================

INSERT INTO party_positions (party_id, question_id, position, source, note) VALUES
('renouveau_municipal_quebec', 'q1_tramway', 'N', 'Révision nécessaire', 'Réévaluation du projet'),
('renouveau_municipal_quebec', 'q2_pistes_cyclables', 'PA', 'Innovation transport', 'Solutions modernes'),
('renouveau_municipal_quebec', 'q3_troisieme_lien', 'N', 'Alternatives possibles', 'Étude de nouvelles options'),
('renouveau_municipal_quebec', 'q4_priorite_mobilite_active', 'PA', 'Modernisation transport', 'Transport du futur'),
('renouveau_municipal_quebec', 'q5_quotas_logements_abordables', 'PA', 'Innovation logement', 'Solutions créatives'),
('renouveau_municipal_quebec', 'q6_reduction_depenses_taxes', 'PA', 'Efficacité gouvernementale', 'Optimisation des dépenses'),
('renouveau_municipal_quebec', 'q7_immeubles_grande_hauteur', 'PA', 'Urbanisme moderne', 'Développement intelligent'),
('renouveau_municipal_quebec', 'q8_interdire_essence_centre_ville', 'PA', 'Innovation verte', 'Technologies propres'),
('renouveau_municipal_quebec', 'q9_protection_espaces_verts', 'PA', 'Ville verte', 'Intégration nature-ville'),
('renouveau_municipal_quebec', 'q10_transition_carboneutre', 'PA', 'Innovation écologique', 'Technologies vertes'),
('renouveau_municipal_quebec', 'q11_reduction_dechets', 'PA', 'Gestion moderne', 'Technologies de pointe'),
('renouveau_municipal_quebec', 'q12_augmentation_taxes', 'N', 'Financement innovant', 'Nouvelles sources de revenus'),
('renouveau_municipal_quebec', 'q13_pouvoir_conseils_quartier', 'PA', 'Démocratie 2.0', 'Participation numérique'),
('renouveau_municipal_quebec', 'q14_reduction_dette', 'PA', 'Gestion moderne', 'Optimisation financière'),
('renouveau_municipal_quebec', 'q15_avantages_fiscaux_entreprises', 'PA', 'Écosystème innovation', 'Attraction des startups'),
('renouveau_municipal_quebec', 'q16_limitation_touristes', 'N', 'Tourisme intelligent', 'Gestion par technologie'),
('renouveau_municipal_quebec', 'q17_soutien_organismes_communautaires', 'PA', 'Partenariats innovants', 'Collaboration renforcée'),
('renouveau_municipal_quebec', 'q18_augmentation_effectifs_policiers', 'N', 'Sécurité intelligente', 'Technologies de sécurité'),
('renouveau_municipal_quebec', 'q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures modernes', 'Équipements de pointe'),
('renouveau_municipal_quebec', 'q20_protection_patrimoine', 'PA', 'Patrimoine numérique', 'Conservation moderne'),
('renouveau_municipal_quebec', 'q21_priorites_municipales', 'PA', 'Vision de renouveau', 'Priorités: innovation, efficacité, modernisation');

-- ========================================================================
-- VÉRIFICATION FINALE
-- ========================================================================

-- Compter le nombre total de positions par parti
DO $$
DECLARE
    parti_count INTEGER;
    position_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO parti_count FROM parties WHERE municipality_id = 'quebec';
    SELECT COUNT(*) INTO position_count FROM party_positions
    WHERE party_id IN (SELECT id FROM parties WHERE municipality_id = 'quebec');

    RAISE NOTICE '✅ Migration des positions terminée';
    RAISE NOTICE '📊 Résumé:';
    RAISE NOTICE '  • % partis politiques insérés', parti_count;
    RAISE NOTICE '  • % positions insérées', position_count;
    RAISE NOTICE '  • % positions par parti en moyenne', ROUND(position_count::DECIMAL / parti_count, 1);
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Base de données prête pour l''architecture multi-municipalités!';
    RAISE NOTICE '📋 Prochaine étape: Créer les API routes et hooks';
END
$$;