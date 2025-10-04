-- Positions des partis politiques municipaux de Québec (7 partis × 21 questions = 147 positions)
-- Basé sur POSITIONS-PARTIS-QUEBEC.md

-- ============================================================================
-- ALLIANCE CITOYENNE DE QUÉBEC (Chef: Alain Giasson - Centre-droit libertarien)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('alliance-citoyenne-quebec', 'qc_q1_tramway', 'PD', 'Déclarations publiques', 'Révision complète projet transport structurant avec approche consensuelle'),
('alliance-citoyenne-quebec', 'qc_q2_pistes_cyclables', 'PA', 'Programme politique', 'Développement réseau cyclable équilibré pour tous usagers'),
('alliance-citoyenne-quebec', 'qc_q3_troisieme_lien', 'FA', 'Plateforme électorale', 'Projet jetée Beauport à Île d''Orléans puis pont vers Lévis, 1-3 milliards'),
('alliance-citoyenne-quebec', 'qc_q4_priorite_mobilite_active', 'PA', 'Position politique', 'Soutient réduction stationnements pour transport collectif'),
('alliance-citoyenne-quebec', 'qc_q5_quotas_logements_abordables', 'PA', 'Programme logement', 'Mesures pour augmenter offre logements abordables'),
('alliance-citoyenne-quebec', 'qc_q6_reduction_depenses_taxes', 'FD', 'Philosophie politique', 'Philosophie libertarienne, réduction taxes et dépenses municipales'),
('alliance-citoyenne-quebec', 'qc_q7_immeubles_grande_hauteur', 'FD', 'Développement urbain', 'Favorise immeubles hauteur pour optimisation terrains et développement économique'),
('alliance-citoyenne-quebec', 'qc_q8_interdire_essence_centre_ville', 'FA', 'Position climatique', 'Position climato-réaliste sceptique des mesures environnementales'),
('alliance-citoyenne-quebec', 'qc_q9_protection_espaces_verts', 'PA', 'Environnement', 'Soutien modéré protection espaces verts'),
('alliance-citoyenne-quebec', 'qc_q10_transition_carboneutre', 'PD', 'Politique climatique', 'Approche sceptique politiques climatiques coûteuses'),
('alliance-citoyenne-quebec', 'qc_q11_reduction_dechets', 'FA', 'Services municipaux', 'Privilégie autonomie citoyenne plutôt que règlements stricts'),
('alliance-citoyenne-quebec', 'qc_q12_augmentation_taxes', 'FD', 'Politique fiscale', 'Opposition mesures contraignantes, privilégie autonomie citoyenne'),
('alliance-citoyenne-quebec', 'qc_q13_pouvoir_conseils_quartier', 'FA', 'Gouvernance locale', 'Soutien autonomie et participation locale'),
('alliance-citoyenne-quebec', 'qc_q14_reduction_dette', 'PD', 'Gestion budgétaire', 'Priorité services essentiels'),
('alliance-citoyenne-quebec', 'qc_q15_avantages_fiscaux_entreprises', 'PA', 'Développement économique', 'Développement économique et attraction entreprises'),
('alliance-citoyenne-quebec', 'qc_q16_limitation_touristes', 'FD', 'Politique économique', 'Programme abolition parcomètres et taxes, réduction dépenses'),
('alliance-citoyenne-quebec', 'qc_q17_soutien_organismes_communautaires', 'PD', 'Services sociaux', 'Réserves sur financement public organismes'),
('alliance-citoyenne-quebec', 'qc_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité publique', 'Soutien sécurité publique modéré'),
('alliance-citoyenne-quebec', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures', 'Soutien infrastructures proximité'),
('alliance-citoyenne-quebec', 'qc_q20_protection_patrimoine', 'PD', 'Patrimoine', 'Équilibre patrimoine et développement'),
('alliance-citoyenne-quebec', 'qc_q21_enjeux_prioritaires', 'PA', 'Priorités politiques', 'Priorités: Développement économique, Services municipaux, Transport mobilité');

-- ============================================================================
-- ÉQUIPE PRIORITÉ QUÉBEC (Chef: Stevens Mélançon - Centre pragmatique)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('equipe-priorite-quebec', 'qc_q1_tramway', 'FD', 'Position politique', 'Approche pragmatique, demande acceptabilité sociale et évaluations responsables'),
('equipe-priorite-quebec', 'qc_q2_pistes_cyclables', 'PA', 'Programme développement', 'Combine développement et environnement pour prospérité ville'),
('equipe-priorite-quebec', 'qc_q3_troisieme_lien', 'PA', 'Position constituants', 'Déception pour citoyens est, position nuancée représentant constituants'),
('equipe-priorite-quebec', 'qc_q4_priorite_mobilite_active', 'PA', 'Transport collectif', 'Soutient mesures transport collectif si socialement acceptables'),
('equipe-priorite-quebec', 'qc_q5_quotas_logements_abordables', 'FA', 'Valeurs équité', 'Valeur équité mentionnée, favorable accès logement'),
('equipe-priorite-quebec', 'qc_q6_reduction_depenses_taxes', 'PA', 'Opposition constructive', 'Opposition constructive aux dépenses excessives'),
('equipe-priorite-quebec', 'qc_q7_immeubles_grande_hauteur', 'PA', 'Aménagement urbain', 'Opposé immeubles nuisant caractère quartiers'),
('equipe-priorite-quebec', 'qc_q8_interdire_essence_centre_ville', 'PA', 'Acceptabilité sociale', 'Réserves réglementations excessives sans acceptabilité sociale'),
('equipe-priorite-quebec', 'qc_q9_protection_espaces_verts', 'FA', 'Environnement', 'Priorité environnement et développement durable'),
('equipe-priorite-quebec', 'qc_q10_transition_carboneutre', 'FA', 'Transition écologique', 'Soutien transition environnementale équilibrée'),
('equipe-priorite-quebec', 'qc_q11_reduction_dechets', 'PD', 'Services qualité', 'Priorité services de qualité'),
('equipe-priorite-quebec', 'qc_q12_augmentation_taxes', 'FD', 'Consensus social', 'Opposition aux mesures contraignantes sans consensus'),
('equipe-priorite-quebec', 'qc_q13_pouvoir_conseils_quartier', 'PA', 'Participation citoyenne', 'Soutien participation citoyenne locale'),
('equipe-priorite-quebec', 'qc_q14_reduction_dette', 'N', 'Priorités budgétaires', 'Position équilibrée sur priorités budgétaires'),
('equipe-priorite-quebec', 'qc_q15_avantages_fiscaux_entreprises', 'N', 'Développement économique', 'Approche pragmatique développement économique'),
('equipe-priorite-quebec', 'qc_q16_limitation_touristes', 'N', 'Tourisme vs résidents', 'Position équilibrée tourisme vs résidents'),
('equipe-priorite-quebec', 'qc_q17_soutien_organismes_communautaires', 'PA', 'Acceptabilité sociale', 'Soutien modéré selon acceptabilité sociale'),
('equipe-priorite-quebec', 'qc_q18_augmentation_effectifs_policiers', 'N', 'Sécurité publique', 'Position mesurée sur sécurité publique'),
('equipe-priorite-quebec', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Planification', 'Soutien infrastructures si bien planifiées'),
('equipe-priorite-quebec', 'qc_q20_protection_patrimoine', 'N', 'Équilibre', 'Équilibre patrimoine et développement'),
('equipe-priorite-quebec', 'qc_q21_enjeux_prioritaires', 'PA', 'Priorités politiques', 'Priorités: Environnement espaces verts, Services municipaux, Transport mobilité');

-- ============================================================================
-- LEADERSHIP QUÉBEC (Chef: Sam Hamad - Centriste, technocratique)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('leadership-quebec', 'qc_q1_tramway', 'PD', 'Position politique', 'Plutôt opposé au projet tramway'),
('leadership-quebec', 'qc_q2_pistes_cyclables', 'PD', 'Transport', 'Plutôt opposé priorisation pistes cyclables vs automobile'),
('leadership-quebec', 'qc_q3_troisieme_lien', 'N', 'Position neutre', 'Position neutre sur troisième lien routier'),
('leadership-quebec', 'qc_q4_priorite_mobilite_active', 'PD', 'Stationnements', 'Plutôt opposé réduction stationnements'),
('leadership-quebec', 'qc_q5_quotas_logements_abordables', 'N', 'Logement', 'Position neutre quotas logements abordables'),
('leadership-quebec', 'qc_q6_reduction_depenses_taxes', 'PA', 'Finances', 'Plutôt favorable réduction dépenses et taxes'),
('leadership-quebec', 'qc_q7_immeubles_grande_hauteur', 'N', 'Développement', 'Position neutre immeubles grande hauteur'),
('leadership-quebec', 'qc_q8_interdire_essence_centre_ville', 'N', 'Environnement', 'Position neutre interdiction véhicules essence'),
('leadership-quebec', 'qc_q9_protection_espaces_verts', 'PD', 'Développement', 'Plutôt opposé protection si nuit développement'),
('leadership-quebec', 'qc_q10_transition_carboneutre', 'N', 'Carboneutralité', 'Position neutre transition bâtiments carboneutres'),
('leadership-quebec', 'qc_q11_reduction_dechets', 'N', 'Services', 'Position neutre amélioration collecte ordures'),
('leadership-quebec', 'qc_q12_augmentation_taxes', 'PD', 'Taxes', 'Plutôt opposé projets écoresponsables si augmente taxes'),
('leadership-quebec', 'qc_q13_pouvoir_conseils_quartier', 'N', 'Gouvernance', 'Valorise écoute citoyenne sans structures formelles'),
('leadership-quebec', 'qc_q14_reduction_dette', 'PA', 'Discipline financière', 'Tendance prioriser discipline financière et contrôle dette'),
('leadership-quebec', 'qc_q15_avantages_fiscaux_entreprises', 'PA', 'Économie', 'Plutôt favorable avantages fiscaux attraction entreprises'),
('leadership-quebec', 'qc_q16_limitation_touristes', 'N', 'Tourisme', 'Pas de position claire limitation tourisme'),
('leadership-quebec', 'qc_q17_soutien_organismes_communautaires', 'N', 'Organismes', 'Position neutre financement organismes communautaires'),
('leadership-quebec', 'qc_q18_augmentation_effectifs_policiers', 'N', 'Sécurité', 'Neutre sur effectifs policiers'),
('leadership-quebec', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'PD', 'Infrastructures', 'Plutôt opposé investissement parcs et arénas'),
('leadership-quebec', 'qc_q20_protection_patrimoine', 'N', 'Patrimoine', 'Pas de position claire protection patrimoine'),
('leadership-quebec', 'qc_q21_enjeux_prioritaires', 'PA', 'Priorités politiques', 'Priorités: Transport mobilité, Gestion finances municipales, Services municipaux');

-- ============================================================================
-- QUÉBEC D'ABORD (Chef: Claude Villeneuve - Centre, pragmatique)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('quebec-dabord', 'qc_q1_tramway', 'PA', 'Position favorable', 'Fortement favorable au tramway'),
('quebec-dabord', 'qc_q2_pistes_cyclables', 'PA', 'Transport actif', 'Plutôt favorable développement pistes cyclables'),
('quebec-dabord', 'qc_q3_troisieme_lien', 'PA', 'Infrastructure', 'Plutôt favorable troisième lien routier'),
('quebec-dabord', 'qc_q4_priorite_mobilite_active', 'N', 'Stationnements', 'Plutôt opposé réduction stationnements centre-ville'),
('quebec-dabord', 'qc_q5_quotas_logements_abordables', 'N', 'Logement', 'Position neutre quotas logements abordables'),
('quebec-dabord', 'qc_q6_reduction_depenses_taxes', 'N', 'Finances', 'Position neutre réduction dépenses selon capacité payer'),
('quebec-dabord', 'qc_q7_immeubles_grande_hauteur', 'PD', 'Développement', 'Plutôt opposé immeubles grande hauteur'),
('quebec-dabord', 'qc_q8_interdire_essence_centre_ville', 'PA', 'Environnement', 'Plutôt favorable interdiction véhicules essence 2035'),
('quebec-dabord', 'qc_q9_protection_espaces_verts', 'N', 'Espaces verts', 'Position neutre protection espaces verts'),
('quebec-dabord', 'qc_q10_transition_carboneutre', 'PA', 'Transition', 'Plutôt opposé transition bâtiments carboneutres'),
('quebec-dabord', 'qc_q11_reduction_dechets', 'N', 'Services', 'Plutôt favorable collecte ordures aux 3 semaines'),
('quebec-dabord', 'qc_q12_augmentation_taxes', 'N', 'Taxes environnement', 'Plutôt opposé projets écoresponsables'),
('quebec-dabord', 'qc_q13_pouvoir_conseils_quartier', 'PA', 'Gouvernance locale', 'Plutôt favorable plus pouvoir conseils quartier'),
('quebec-dabord', 'qc_q14_reduction_dette', 'PA', 'Gestion financière', 'Position neutre réduction dépenses selon capacité payer'),
('quebec-dabord', 'qc_q15_avantages_fiscaux_entreprises', 'N', 'Économie', 'Position neutre réductions taxes'),
('quebec-dabord', 'qc_q16_limitation_touristes', 'PD', 'Tourisme', 'Plutôt favorable limiter tourisme'),
('quebec-dabord', 'qc_q17_soutien_organismes_communautaires', 'N', 'Services sociaux', 'Position neutre financement organismes communautaires'),
('quebec-dabord', 'qc_q18_augmentation_effectifs_policiers', 'PD', 'Sécurité', 'Plutôt opposé augmenter effectifs policiers'),
('quebec-dabord', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'N', 'Infrastructures', 'Position neutre investissement parcs, arénas, terrains sport'),
('quebec-dabord', 'qc_q20_protection_patrimoine', 'N', 'Patrimoine', 'Position neutre protection patrimoine'),
('quebec-dabord', 'qc_q21_enjeux_prioritaires', 'PA', 'Priorités politiques', 'Priorités: Services municipaux, Transport mobilité, Logement abordable');

-- ============================================================================
-- QUÉBEC FORTE ET FIÈRE (Chef: Bruno Marchand - Centre-gauche, progressiste)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('quebec-forte-et-fiere', 'qc_q1_tramway', 'FA', 'Réalisations mandat', 'Défendu projet tramway comme essentiel pour ville'),
('quebec-forte-et-fiere', 'qc_q2_pistes_cyclables', 'FA', 'Réalisations', 'Augmenté significativement réseau cyclable pendant mandat'),
('quebec-forte-et-fiere', 'qc_q3_troisieme_lien', 'PD', 'Position nuancée', 'Exprimé réserves tout en reconnaissant certains besoins'),
('quebec-forte-et-fiere', 'qc_q4_priorite_mobilite_active', 'PA', 'Transport collectif', 'Fortement favorable réduction stationnements pour transport collectif'),
('quebec-forte-et-fiere', 'qc_q5_quotas_logements_abordables', 'PA', 'Logement social', 'Plutôt favorable quotas logements abordables'),
('quebec-forte-et-fiere', 'qc_q6_reduction_depenses_taxes', 'PD', 'Investissements publics', 'Opposé réduction dépenses, préfère investir services et projets'),
('quebec-forte-et-fiere', 'qc_q7_immeubles_grande_hauteur', 'FD', 'Aménagement', 'Fortement opposé immeubles grande hauteur'),
('quebec-forte-et-fiere', 'qc_q8_interdire_essence_centre_ville', 'PA', 'Transition écologique', 'Plutôt favorable interdiction véhicules essence, transition écologique'),
('quebec-forte-et-fiere', 'qc_q9_protection_espaces_verts', 'FA', 'Environnement', 'Fortement favorable protection espaces verts'),
('quebec-forte-et-fiere', 'qc_q10_transition_carboneutre', 'FA', 'Carboneutralité', 'Plutôt favorable transition bâtiments carboneutres'),
('quebec-forte-et-fiere', 'qc_q11_reduction_dechets', 'FD', 'Services collecte', 'Plutôt opposé collecte ordures aux 3 semaines'),
('quebec-forte-et-fiere', 'qc_q12_augmentation_taxes', 'PA', 'Projets verts', 'Plutôt favorable projets écoresponsables'),
('quebec-forte-et-fiere', 'qc_q13_pouvoir_conseils_quartier', 'FD', 'Gouvernance', 'Fortement opposé donner plus pouvoir conseils quartier'),
('quebec-forte-et-fiere', 'qc_q14_reduction_dette', 'N', 'Gestion équilibrée', 'Position neutre réduction dépenses selon capacité payer'),
('quebec-forte-et-fiere', 'qc_q15_avantages_fiscaux_entreprises', 'FD', 'Justice fiscale', 'Fortement opposé offrir plus réductions taxes'),
('quebec-forte-et-fiere', 'qc_q16_limitation_touristes', 'FD', 'Développement touristique', 'Position neutre limitation touristes'),
('quebec-forte-et-fiere', 'qc_q17_soutien_organismes_communautaires', 'N', 'Services sociaux', 'Position neutre financement organismes communautaires'),
('quebec-forte-et-fiere', 'qc_q18_augmentation_effectifs_policiers', 'PA', 'Sécurité', 'Plutôt favorable augmenter effectifs policiers'),
('quebec-forte-et-fiere', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Infrastructures publiques', 'Plutôt favorable investir parcs, arénas, terrains sport'),
('quebec-forte-et-fiere', 'qc_q20_protection_patrimoine', 'PA', 'Conservation', 'Plutôt favorable protection patrimoine'),
('quebec-forte-et-fiere', 'qc_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Projet tramway, Logement abordable, Environnement espaces verts');

-- ============================================================================
-- RESPECT CITOYENS (Chef: Stéphane Lachance - Conservateur-populiste)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('respect-citoyens', 'qc_q1_tramway', 'FD', 'Opposition grands projets', 'Opposition grands projets jugés coûteux comme tramway'),
('respect-citoyens', 'qc_q2_pistes_cyclables', 'FD', 'Automobile priorité', 'Fortement opposé priorisation pistes cyclables vs automobile'),
('respect-citoyens', 'qc_q3_troisieme_lien', 'FA', 'Projet prioritaire', 'Projet prioritaire parti, essentiel développement régional'),
('respect-citoyens', 'qc_q4_priorite_mobilite_active', 'FD', 'Transport automobile', 'Fortement opposé réduction stationnements pour transport collectif'),
('respect-citoyens', 'qc_q5_quotas_logements_abordables', 'FD', 'Marché libre', 'Fortement opposé quotas obligatoires logements abordables'),
('respect-citoyens', 'qc_q6_reduction_depenses_taxes', 'FA', 'Gestion rigoureuse', 'Fortement favorable réduction dépenses et taxes municipales'),
('respect-citoyens', 'qc_q7_immeubles_grande_hauteur', 'FA', 'Optimisation terrains', 'Fortement favorable immeubles grande hauteur pour maximiser terrains'),
('respect-citoyens', 'qc_q8_interdire_essence_centre_ville', 'FD', 'Opposition mesures vertes', 'Fortement opposé mesures environnementales contraignantes'),
('respect-citoyens', 'qc_q9_protection_espaces_verts', 'FD', 'Développement priorité', 'Fortement opposé espaces verts si nuit développement immobilier'),
('respect-citoyens', 'qc_q10_transition_carboneutre', 'FD', 'Coûts transition', 'Fortement opposé transition bâtiments carboneutres si coûteuse'),
('respect-citoyens', 'qc_q11_reduction_dechets', 'FA', 'Services efficaces', 'Fortement favorable améliorer collecte ordures plutôt que réduire'),
('respect-citoyens', 'qc_q12_augmentation_taxes', 'FD', 'Opposition taxes', 'Fortement opposé projets écoresponsables si augmente taxes'),
('respect-citoyens', 'qc_q13_pouvoir_conseils_quartier', 'FA', 'Pouvoir local', 'Fortement favorable donner plus pouvoir conseils quartier'),
('respect-citoyens', 'qc_q14_reduction_dette', 'FA', 'Discipline budgétaire', 'Objectif majeur parti: saine gestion et discipline budgétaire'),
('respect-citoyens', 'qc_q15_avantages_fiscaux_entreprises', 'FA', 'Stimulation économique', 'Pour stimuler économie locale et attirer investisseurs'),
('respect-citoyens', 'qc_q16_limitation_touristes', 'PA', 'Qualité de vie', 'Plutôt favorable limiter tourisme pour protéger qualité vie'),
('respect-citoyens', 'qc_q17_soutien_organismes_communautaires', 'PD', 'Priorités budgétaires', 'Plutôt opposé augmenter financement organismes communautaires'),
('respect-citoyens', 'qc_q18_augmentation_effectifs_policiers', 'FA', 'Sécurité priorité', 'Fortement favorable augmenter effectifs policiers'),
('respect-citoyens', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'FA', 'Infrastructures communautaires', 'Fortement favorable investir parcs, arénas, terrains sport'),
('respect-citoyens', 'qc_q20_protection_patrimoine', 'FD', 'Développement libre', 'Fortement opposé renforcement règles protection patrimoine'),
('respect-citoyens', 'qc_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Gestion finances municipales, Services municipaux, Sécurité publique');

-- ============================================================================
-- TRANSITION QUÉBEC (Chef: Jackie Smith - Écologiste progressiste)
-- ============================================================================

INSERT INTO public.party_positions (party_id, question_id, position, source, note) VALUES
('transition-quebec', 'qc_q1_tramway', 'FA', 'Transport durable', 'Fortement favorable tramway'),
('transition-quebec', 'qc_q2_pistes_cyclables', 'FA', 'Mobilité active', 'Fortement favorable pistes cyclables'),
('transition-quebec', 'qc_q3_troisieme_lien', 'FD', 'Opposition route', 'Fortement opposé troisième lien routier'),
('transition-quebec', 'qc_q4_priorite_mobilite_active', 'FA', 'Centre-ville vert', 'Fortement favorable réduction stationnements centre-ville'),
('transition-quebec', 'qc_q5_quotas_logements_abordables', 'FA', 'Justice sociale', 'Fortement favorable quotas logements abordables'),
('transition-quebec', 'qc_q6_reduction_depenses_taxes', 'FD', 'Services publics', 'Fortement opposé réduction dépenses selon capacité payer'),
('transition-quebec', 'qc_q7_immeubles_grande_hauteur', 'FD', 'Densification réfléchie', 'Fortement opposé immeubles grande hauteur, préfère densification réfléchie'),
('transition-quebec', 'qc_q8_interdire_essence_centre_ville', 'FA', 'Transition écologique', 'Fortement favorable interdire véhicules essence centre-ville 2035'),
('transition-quebec', 'qc_q9_protection_espaces_verts', 'FA', 'Environnement priorité', 'Fortement favorable protection espaces verts'),
('transition-quebec', 'qc_q10_transition_carboneutre', 'FA', 'Lutte climatique', 'Fortement favorable transition bâtiments carboneutres'),
('transition-quebec', 'qc_q11_reduction_dechets', 'FD', 'Services verts', 'Fortement opposé collecte ordures aux 3 semaines'),
('transition-quebec', 'qc_q12_augmentation_taxes', 'FA', 'Financement vert', 'Fortement favorable projets écoresponsables'),
('transition-quebec', 'qc_q13_pouvoir_conseils_quartier', 'PD', 'Démocratie participative', 'Fortement favorable donner plus pouvoir conseils quartier'),
('transition-quebec', 'qc_q14_reduction_dette', 'FD', 'Investissements futurs', 'Plutôt opposé réduire dépenses selon capacité payer'),
('transition-quebec', 'qc_q15_avantages_fiscaux_entreprises', 'FD', 'Justice fiscale', 'Fortement opposé offrir plus réductions taxes'),
('transition-quebec', 'qc_q16_limitation_touristes', 'N', 'Équilibre', 'Position neutre limitation touristes'),
('transition-quebec', 'qc_q17_soutien_organismes_communautaires', 'PA', 'Solidarité sociale', 'Plutôt favorable financement organismes communautaires'),
('transition-quebec', 'qc_q18_augmentation_effectifs_policiers', 'FD', 'Approche communautaire', 'Plutôt opposé augmenter effectifs policiers'),
('transition-quebec', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'FD', 'Espaces publics', 'Fortement favorable investir parcs, arénas, terrains sport'),
('transition-quebec', 'qc_q20_protection_patrimoine', 'PA', 'Héritage culturel', 'Plutôt favorable protection patrimoine'),
('transition-quebec', 'qc_q21_enjeux_prioritaires', 'FA', 'Priorités politiques', 'Priorités: Logement abordable, Environnement espaces verts, Transport mobilité');

-- ============================================================================
-- FIN - 147 positions insérées (7 partis × 21 questions)
-- ============================================================================