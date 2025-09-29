-- ================================================================
-- INSERTION POSITIONS PARTI DU MONDE - QUÉBEC
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

-- Q1: Tramway
('parti-du-monde-quebec', 'qc_q1_tramway', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 5)', 'Favorable au tramway mais propose un tracé alternatif - Boucle Québec-Lévis au lieu du tracé actuel', 'Révision complète du tracé existant, optimisation des parcours actuels', NULL),

-- Q2: Pistes cyclables
('parti-du-monde-quebec', 'qc_q2_pistes_cyclables', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 5)', 'Amélioration pertinente du réseau cyclable - Promotion active de la mobilité douce et durable', 'Amélioration pertinente du réseau cyclable - Promotion active de la mobilité douce', NULL),

-- Q3: Troisième lien
('parti-du-monde-quebec', 'qc_q3_troisieme_lien', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 5)', 'Optimisation cohérente du troisième lien - Adaptation aux besoins actuels et futurs de mobilité', 'Optimisation cohérente du troisième lien - Adaptation aux besoins actuels et futurs', NULL),

-- Q4: Priorité mobilité active
('parti-du-monde-quebec', 'qc_q4_priorite_mobilite_active', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 4)', 'Développement réseau transport intégré favorisant la fluidité urbaine et accessibilité pour tous', 'Développement d''un réseau de transport intégré et durable', NULL),

-- Q5: Quotas logements abordables
('parti-du-monde-quebec', 'qc_q5_quotas_logements_abordables', 'FA', 'Plan de campagne 2025 - Parti du Monde (page 9)', 'États généraux sur habitation - Grande consultation publique pour élaborer des solutions réalistes', 'États généraux sur l''habitation - Grande consultation publique ouverte et transparente', NULL),

-- Q6: Réduction dépenses/taxes
('parti-du-monde-quebec', 'qc_q6_reduction_depenses_taxes', 'N', 'Plan de campagne 2025 - Parti du Monde (page 8)', 'Audits financiers rigoureux et transparence totale dans la gestion des finances publiques', 'Audits financiers rigoureux - Transparence totale dans la gestion des finances publiques', NULL),

-- Q7: Immeubles grande hauteur
('parti-du-monde-quebec', 'qc_q7_immeubles_grande_hauteur', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 9)', 'Révision plan urbanisme avec préservation patrimoines et protection paysages urbaines', 'Révision du plan d''urbanisme - Modernisation globale incluant usages, hauteurs', NULL),

-- Q8: Interdire essence centre-ville
('parti-du-monde-quebec', 'qc_q8_interdire_essence_centre_ville', 'N', 'Plan de campagne 2025 - Parti du Monde (page 10)', 'Position équilibrée sur règlements environnementaux avec économie respectueuse environnement', 'Développement respectueux de l''environnement', NULL),

-- Q9: Protection espaces verts
('parti-du-monde-quebec', 'qc_q9_protection_espaces_verts', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 9)', 'Préservation patrimoines naturels et intégration initiatives durables comme toits verts', 'Initiatives durables comme les toits verts et serres urbaines', NULL),

-- Q10: Transition carboneutre
('parti-du-monde-quebec', 'qc_q10_transition_carboneutre', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 10)', 'Économie respectueuse environnement et promotion initiatives économie circulaire', 'Économie innovante, inclusive et respectueuse de l''environnement', NULL),

-- Q11: Réduction déchets
('parti-du-monde-quebec', 'qc_q11_reduction_dechets', 'N', 'Plan de campagne 2025 - Parti du Monde', 'Approche équilibrée gestion déchets avec développement durable', 'Développement respectueux de l''environnement', NULL),

-- Q12: Augmentation taxes
('parti-du-monde-quebec', 'qc_q12_augmentation_taxes', 'N', 'Plan de campagne 2025 - Parti du Monde (page 8)', 'Transparence totale gestion finances publiques avec vérifications indépendantes optimiser ressources', 'Vérifications indépendantes pour optimiser l''utilisation des ressources', NULL),

-- Q13: Pouvoir conseils quartier
('parti-du-monde-quebec', 'qc_q13_pouvoir_conseils_quartier', 'FA', 'Plan de campagne 2025 - Parti du Monde (page 8)', 'Conseils de quartier dynamisés - Redéfinition rôle instances locales rapprocher prise décision citoyens', 'Conseils de quartier dynamisés - Redéfinition du rôle des instances locales', NULL),

-- Q14: Réduction dette
('parti-du-monde-quebec', 'qc_q14_reduction_dette', 'N', 'Plan de campagne 2025 - Parti du Monde (page 8)', 'Planification stratégique repensée avec approche prospective anticipant besoins futurs ville', 'Planification stratégique repensée - Approche prospective qui anticipe les besoins futurs', NULL),

-- Q15: Avantages fiscaux entreprises
('parti-du-monde-quebec', 'qc_q15_avantages_fiscaux_entreprises', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 10)', 'Fédération forces économiques - Mobilisation acteurs monde affaires synergie productive secteurs', 'Fédération des forces économiques - Mobilisation et consultation de tous les acteurs', NULL),

-- Q16: Limitation touristes
('parti-du-monde-quebec', 'qc_q16_limitation_touristes', 'N', 'Plan de campagne 2025 - Parti du Monde (page 11)', 'Grands événements culturels - Investissement création événements mettent valeur territoire patrimoine', 'Grands événements culturels - Investissement dans la création d''\u00e9vénements qui mettent en valeur notre territoire', NULL),

-- Q17: Soutien organismes communautaires
('parti-du-monde-quebec', 'qc_q17_soutien_organismes_communautaires', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 9)', 'Solutions intégrées humaines répondre enjeux itinérance, santé mentale, toxicomanie participation communauté', 'Solutions intégrées et humaines pour répondre aux enjeux d''itinérance, de santé mentale et de toxicomanie', NULL),

-- Q18: Augmentation effectifs policiers
('parti-du-monde-quebec', 'qc_q18_augmentation_effectifs_policiers', 'N', 'Plan de campagne 2025 - Parti du Monde', 'Position équilibrée sur effectifs sécurité publique avec approche collaborative', 'Solutions intégrées et humaines pour répondre aux enjeux', NULL),

-- Q19: Investissement infrastructures loisirs
('parti-du-monde-quebec', 'qc_q19_investissement_infrastructures_loisirs_sportives', 'PA', 'Plan de campagne 2025 - Parti du Monde (page 11)', 'Investissement création événements territoire + commerce proximité programmes soutien tissu local', 'Grands événements culturels - Investissement dans la création d''\u00e9vénements qui mettent en valeur notre territoire', NULL),

-- Q20: Protection patrimoine
('parti-du-monde-quebec', 'qc_q20_protection_patrimoine', 'FA', 'Plan de campagne 2025 - Parti du Monde (page 9)', 'Préservation patrimoines naturels et bâtis, protection paysages et perspectives urbaines priorité', 'Préservation des patrimoines naturels et bâtis, protection des paysages', NULL),

-- Q21: Enjeux prioritaires
('parti-du-monde-quebec', 'qc_q21_enjeux_prioritaires', 'FA', 'Plan de campagne 2025 - Parti du Monde (page 4)', 'Priorités: Transport et mobilité, Logement abordable, Gouvernance et participation citoyenne', 'Se déplacer intelligemment, Se loger dignement, Se gouverner efficacement, Se développer durablement', '{"Transport et mobilité": 1, "Logement abordable": 2, "Gouvernance et participation citoyenne": 3}');

-- ================================================================
-- VÉRIFICATIONS
-- ================================================================

-- Vérifier le nombre total de positions insérées
SELECT
    'Positions Parti du Monde insérées:' as info,
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

-- Vérifier quelques exemples de positions
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

-- Compter total positions tous partis Québec
SELECT
    'Total positions tous partis Québec:' as info,
    COUNT(*) as total_positions,
    COUNT(DISTINCT party_id) as nombre_partis
FROM public.party_positions pp
JOIN public.parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'quebec';

SELECT 'INSERTION PARTI DU MONDE TERMINÉE AVEC SUCCÈS' as status;