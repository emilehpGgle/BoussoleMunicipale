-- ================================================================
-- MISE À JOUR POSITIONS PARTI DU MONDE - QUÉBEC
-- ================================================================
-- Date: 29 septembre 2025
-- Source: Plan de campagne 2025 - Parti du Monde (PDF 13 pages) + partidumonde.com
-- Total: 21 positions basées sur analyse détaillée du plan de campagne
-- Chefs: Anne Guérette + Frédéric Imbeault
-- Codes: FA=Fortement d'accord, PA=Plutôt d'accord, N=Neutre, PD=Plutôt en désaccord, FD=Fortement en désaccord

-- ================================================================
-- MISE À JOUR DES 21 POSITIONS
-- ================================================================

-- Q1: Tramway
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 5)',
    note = 'Favorable au tramway mais propose un tracé alternatif - Boucle Québec-Lévis au lieu du tracé actuel',
    quote = 'Révision complète du tracé existant, optimisation des parcours actuels',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q1_tramway';

-- Q2: Pistes cyclables
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 5)',
    note = 'Amélioration pertinente du réseau cyclable - Promotion active de la mobilité douce et durable',
    quote = 'Amélioration pertinente du réseau cyclable - Promotion active de la mobilité douce',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q2_pistes_cyclables';

-- Q3: Troisième lien
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 5)',
    note = 'Optimisation cohérente du troisième lien - Adaptation aux besoins actuels et futurs de mobilité',
    quote = 'Optimisation cohérente du troisième lien - Adaptation aux besoins actuels et futurs',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q3_troisieme_lien';

-- Q4: Priorité mobilité active
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 4)',
    note = 'Développement réseau transport intégré favorisant la fluidité urbaine et accessibilité pour tous',
    quote = 'Développement d''un réseau de transport intégré et durable',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q4_priorite_mobilite_active';

-- Q5: Quotas logements abordables
UPDATE public.party_positions
SET position = 'FA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 9)',
    note = 'États généraux sur habitation - Grande consultation publique pour élaborer des solutions réalistes',
    quote = 'États généraux sur l''habitation - Grande consultation publique ouverte et transparente',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q5_quotas_logements_abordables';

-- Q6: Réduction dépenses/taxes
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde (page 8)',
    note = 'Audits financiers rigoureux et transparence totale dans la gestion des finances publiques',
    quote = 'Audits financiers rigoureux - Transparence totale dans la gestion des finances publiques',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q6_reduction_depenses_taxes';

-- Q7: Immeubles grande hauteur
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 9)',
    note = 'Révision plan urbanisme avec préservation patrimoines et protection paysages urbaines',
    quote = 'Révision du plan d''urbanisme - Modernisation globale incluant usages, hauteurs',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q7_immeubles_grande_hauteur';

-- Q8: Interdire essence centre-ville
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde (page 10)',
    note = 'Position équilibrée sur règlements environnementaux avec économie respectueuse environnement',
    quote = 'Développement respectueux de l''environnement',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q8_interdire_essence_centre_ville';

-- Q9: Protection espaces verts
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 9)',
    note = 'Préservation patrimoines naturels et intégration initiatives durables comme toits verts',
    quote = 'Initiatives durables comme les toits verts et serres urbaines',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q9_protection_espaces_verts';

-- Q10: Transition carboneutre
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 10)',
    note = 'Économie respectueuse environnement et promotion initiatives économie circulaire',
    quote = 'Économie innovante, inclusive et respectueuse de l''environnement',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q10_transition_carboneutre';

-- Q11: Réduction déchets
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde',
    note = 'Approche équilibrée gestion déchets avec développement durable',
    quote = 'Développement respectueux de l''environnement',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q11_reduction_dechets';

-- Q12: Augmentation taxes
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde (page 8)',
    note = 'Transparence totale gestion finances publiques avec vérifications indépendantes optimiser ressources',
    quote = 'Vérifications indépendantes pour optimiser l''utilisation des ressources',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q12_augmentation_taxes';

-- Q13: Pouvoir conseils quartier
UPDATE public.party_positions
SET position = 'FA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 8)',
    note = 'Conseils de quartier dynamisés - Redéfinition rôle instances locales rapprocher prise décision citoyens',
    quote = 'Conseils de quartier dynamisés - Redéfinition du rôle des instances locales',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q13_pouvoir_conseils_quartier';

-- Q14: Réduction dette
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde (page 8)',
    note = 'Planification stratégique repensée avec approche prospective anticipant besoins futurs ville',
    quote = 'Planification stratégique repensée - Approche prospective qui anticipe les besoins futurs',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q14_reduction_dette';

-- Q15: Avantages fiscaux entreprises
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 10)',
    note = 'Fédération forces économiques - Mobilisation acteurs monde affaires synergie productive secteurs',
    quote = 'Fédération des forces économiques - Mobilisation et consultation de tous les acteurs',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q15_avantages_fiscaux_entreprises';

-- Q16: Limitation touristes
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde (page 11)',
    note = 'Grands événements culturels - Investissement création événements mettent valeur territoire patrimoine',
    quote = 'Grands événements culturels - Investissement dans la création d''événements qui mettent en valeur notre territoire',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q16_limitation_touristes';

-- Q17: Soutien organismes communautaires
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 9)',
    note = 'Solutions intégrées humaines répondre enjeux itinérance, santé mentale, toxicomanie participation communauté',
    quote = 'Solutions intégrées et humaines pour répondre aux enjeux d''itinérance, de santé mentale et de toxicomanie',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q17_soutien_organismes_communautaires';

-- Q18: Augmentation effectifs policiers
UPDATE public.party_positions
SET position = 'N',
    source = 'Plan de campagne 2025 - Parti du Monde',
    note = 'Position équilibrée sur effectifs sécurité publique avec approche collaborative',
    quote = 'Solutions intégrées et humaines pour répondre aux enjeux',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q18_augmentation_effectifs_policiers';

-- Q19: Investissement infrastructures loisirs
UPDATE public.party_positions
SET position = 'PA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 11)',
    note = 'Investissement création événements territoire + commerce proximité programmes soutien tissu local',
    quote = 'Grands événements culturels - Investissement dans la création d''événements qui mettent en valeur notre territoire',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q19_investissement_infrastructures_loisirs_sportives';

-- Q20: Protection patrimoine
UPDATE public.party_positions
SET position = 'FA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 9)',
    note = 'Préservation patrimoines naturels et bâtis, protection paysages et perspectives urbaines priorité',
    quote = 'Préservation des patrimoines naturels et bâtis, protection des paysages',
    priority_list = NULL,
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q20_protection_patrimoine';

-- Q21: Enjeux prioritaires
UPDATE public.party_positions
SET position = 'FA',
    source = 'Plan de campagne 2025 - Parti du Monde (page 4)',
    note = 'Priorités: Transport et mobilité, Logement abordable, Gouvernance et participation citoyenne',
    quote = 'Se déplacer intelligemment, Se loger dignement, Se gouverner efficacement, Se développer durablement',
    priority_list = '{"Transport et mobilité": 1, "Logement abordable": 2, "Gouvernance et participation citoyenne": 3}',
    updated_at = NOW()
WHERE party_id = 'parti-du-monde-quebec' AND question_id = 'qc_q21_enjeux_prioritaires';

-- ================================================================
-- VÉRIFICATIONS
-- ================================================================

-- Vérifier le nombre total de positions mises à jour
SELECT
    'Positions Parti du Monde mises à jour:' as info,
    COUNT(*) as nombre_positions
FROM public.party_positions
WHERE party_id = 'parti-du-monde-quebec';

-- Vérifier la répartition des positions par valeur
SELECT
    position,
    COUNT(*) as occurrences,
    ROUND(COUNT(*) * 100.0 / 21, 1) as pourcentage
FROM public.party_positions
WHERE party_id = 'parti-du-monde-quebec'
GROUP BY position
ORDER BY occurrences DESC;

-- Vérifier quelques exemples de positions mises à jour
SELECT
    'Exemples positions Parti du Monde:' as info,
    LEFT(q.text, 50) || '...' as question,
    pp.position,
    LEFT(pp.source, 40) || '...' as source
FROM public.party_positions pp
JOIN public.questions q ON pp.question_id = q.id
WHERE pp.party_id = 'parti-du-monde-quebec'
ORDER BY q.order_index
LIMIT 5;

SELECT 'MISE À JOUR PARTI DU MONDE TERMINÉE AVEC SUCCÈS' as status;