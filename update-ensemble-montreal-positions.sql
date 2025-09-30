-- =============================================================================
-- Script de mise à jour des positions politiques d'Ensemble Montréal
-- Date: 30 septembre 2025
-- Base de données: Supabase (party_positions table)
--
-- Documentation complète: ensemble-montreal-positions-research.md
-- =============================================================================

-- Q1: Extension métro/REM
-- Position: PA (conservée) - Position inférée par analyse contextuelle
UPDATE party_positions
SET
  source = 'Rapport minoritaire budget 2025 - Section transport collectif, Page programme mobilité 2021',
  note = 'Support conditionnel à l''extension du métro/REM sous réserve de bonne gestion financière et coordination efficace des chantiers. Critique de la gestion sous Projet Montréal sans opposition aux projets eux-mêmes',
  quote = 'Le transport collectif : le grand échec de Valérie Plante et de Projet Montréal',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q1_metro_rem';

-- Q2: Développement pistes cyclables
-- Position: N → PD (MODIFIÉE) - Moratoire 12-18 mois documenté
UPDATE party_positions
SET
  position = 'PD',
  source = 'Le Devoir, 25 septembre 2025 - Déclaration Claude Pinard',
  note = 'Moratoire de facto de 12-18 mois sur nouvelles pistes cyclables, priorisant la consolidation du réseau existant avec audit complet',
  quote = 'On veut d''abord consolider ce qu''on a. À terme, si on a besoin de nouvelles pistes cyclables, par exemple pour faire de nouveaux liens, ça viendra, mais ce n''est pas quelque chose qu''on va faire dans les premiers 12 à 18 mois',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q2_pistes_cyclables';

-- Q3: Autonomie des arrondissements
-- Position: FA (conservée) - Décentralisation forte
UPDATE party_positions
SET
  source = 'Plateforme Ensemble Montréal - Gouvernance locale',
  note = 'Décentralisation forte vers les arrondissements comme priorité de gouvernance, avec plus de pouvoirs décisionnels et budgétaires',
  quote = 'Décentralisation forte vers arrondissements prioritaire',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q3_arrondissements_autonomie';

-- Q4: Priorité mobilité active centre-ville
-- Position: PD (conservée) - Opposition réduction espace automobile
UPDATE party_positions
SET
  source = 'Position mobilité - Plateforme 2025',
  note = 'Approche équilibrée entre modes de transport, opposition à la réduction significative de l''espace automobile au centre-ville',
  quote = 'Réticence réduction espace automobile centre-ville',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q4_priorite_mobilite_active';

-- Q5: Quotas logements abordables
-- Position: PA (conservée) - Exemption permis ~100K$
UPDATE party_positions
SET
  source = 'Le Devoir, 25 juin 2025 - Annonce logements sociaux',
  note = 'Exemption de permis de construction pour promoteurs de logements sociaux/abordables (économie ~100K$ par projet), déblocage de 34 lots municipaux',
  quote = 'La cheffe d''Ensemble Montréal s''engage notamment à exempter les promoteurs de logements sociaux ou abordables du paiement de permis de construction',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q5_quotas_logements_abordables';

-- Q6: Réduction dépenses et taxes
-- Position: FA (conservée) - Réduction 1000 postes
UPDATE party_positions
SET
  source = 'Le Devoir, 12 septembre 2025 - Proposition réduction fonction publique',
  note = 'Réduction de 1000 postes fonction publique sur 4 ans via départs naturels/retraites, critique constante hausses taxes (38% sous Projet Montréal)',
  quote = 'On a embauché 18% plus de cadres et 39% de professionnels supplémentaires, tandis que le nombre de cols bleus a augmenté de 6%. Le résultat, c''est qu''on a une machine administrative qui est lourde, rigide et lente',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q6_reduction_depenses_taxes';

-- Q7: Immeubles de grande hauteur
-- Position: PA (conservée) - Support modéré densification
UPDATE party_positions
SET
  source = 'Plateforme Ensemble Montréal - Développement urbain',
  note = 'Support modéré à la densification urbaine, approche équilibrée respectant le caractère des quartiers',
  quote = 'Support modéré densification urbaine',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q7_immeubles_grande_hauteur';

-- Q8: Interdiction essence centre-ville d'ici 2030
-- Position: PD (conservée) - Opposition mesures radicales
UPDATE party_positions
SET
  source = 'Rapports minoritaires - Position environnement',
  note = 'Opposition aux mesures environnementales jugées trop radicales, préférence pour approche graduelle et pragmatique',
  quote = 'Opposition mesures environnementales radicales',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q8_interdire_essence_centre_ville';

-- Q9: Protection espaces verts vs développement
-- Position: N (conservée) - Équilibre
UPDATE party_positions
SET
  source = 'Plateforme Ensemble Montréal - Développement durable',
  note = 'Recherche d''équilibre entre protection des espaces verts et besoins de développement urbain',
  quote = 'Position neutre espaces verts vs développement',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q9_protection_espaces_verts';

-- Q10: Transition carboneutre d'ici 2040
-- Position: N (conservée) - Approche pragmatique
UPDATE party_positions
SET
  source = 'Plateforme environnement - Ensemble Montréal',
  note = 'Approche pragmatique de la transition écologique, sans engagement strict sur échéancier 2040',
  quote = 'Approche pragmatique transition écologique',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q10_transition_carboneutre';

-- Q11: Programme réduction déchets 25% d'ici 2030
-- Position: PA (conservée) - Amélioration services collecte
UPDATE party_positions
SET
  source = 'Actualités Ensemble Montréal, mars 2024 - Propreté',
  note = 'Amélioration des services de collecte des matières résiduelles comme priorité, critique de la dégradation de la propreté',
  quote = 'Montreal''s state of cleanliness is at a record low',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q11_reduction_dechets';

-- Q12: Augmentation taxes projets écoresponsables
-- Position: PD (conservée) - Opposition hausses taxes
UPDATE party_positions
SET
  source = 'Rapports minoritaires budgétaires 2022-2025',
  note = 'Opposition aux hausses de taxes pour projets écoresponsables, préférence pour réallocation budgétaire existante',
  quote = 'Opposition hausses taxes projets écoresponsables',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q12_augmentation_taxes';

-- Q13: Augmenter pouvoir conseils de quartier
-- Position: FA (conservée) - Décentralisation démocratique
UPDATE party_positions
SET
  source = 'Plateforme gouvernance - Ensemble Montréal',
  note = 'Renforcement des conseils de quartier dans le cadre de la décentralisation municipale et démocratie participative',
  quote = 'Forte décentralisation gouvernance locale',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q13_pouvoir_conseils_quartier';

-- Q14: Priorité réduction dette vs nouveaux projets
-- Position: FA (conservée) - Dette passée de 89% à 120%
UPDATE party_positions
SET
  source = 'Rapports minoritaires budgétaires - Cadre financier 2021',
  note = 'Priorité absolue à la réduction de la dette municipale (passée de 89% à 120%) et aux services essentiels avant nouveaux projets',
  quote = 'Focus services essentiels et gestion rigoureuse',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q14_reduction_dette';

-- Q15: Avantages fiscaux entreprises
-- Position: FA (conservée) - Réconciliation milieu affaires
UPDATE party_positions
SET
  source = 'Plateforme développement économique - Rapports minoritaires 2024-2025',
  note = 'Réconciliation avec le milieu des affaires comme priorité, soutien fiscal aux entreprises et commerces',
  quote = 'Réconciliation avec milieu des affaires prioritaire',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q15_avantages_fiscaux_entreprises';

-- Q16: Limitation touristes zones patrimoniales
-- Position: PD (conservée) - Pro-développement touristique
UPDATE party_positions
SET
  source = 'Plateforme développement économique',
  note = 'Opposition à la limitation du développement touristique, considéré comme moteur économique important',
  quote = 'Opposition limitation développement touristique',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q16_limitation_touristes';

-- Q17: Soutien organismes communautaires
-- Position: N → PA (MODIFIÉE) - Demande active 3M$
UPDATE party_positions
SET
  position = 'PA',
  source = 'Le Devoir, 10 mars 2021 - Financement organismes',
  note = 'Support au financement des organismes communautaires de terrain, demande de 3M$ pour prévention violence dans arrondissements',
  quote = 'Nous avions demandé il y a plusieurs semaines que la Ville investisse 3 000 000$ pour financer les organismes sur le terrain',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q17_soutien_organismes_communautaires';

-- Q18: Augmentation effectifs policiers
-- Position: PA (conservée) - Renforcement sécurité
UPDATE party_positions
SET
  source = 'Rapport minoritaire budget 2025',
  note = 'Support au renforcement de la sécurité incluant effectifs policiers, particulièrement dans secteurs à enjeux (nord-est)',
  quote = 'Se donner les moyens pour retrouver le sentiment de sécurité',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q18_augmentation_effectifs_policiers';

-- Q19: Investissement infrastructures loisirs/sport
-- Position: PA (conservée) - Infrastructures de proximité
UPDATE party_positions
SET
  source = 'Plateforme services municipaux',
  note = 'Investissement dans infrastructures récréatives et sportives de proximité, critique des coupes budgétaires arrondissements',
  quote = 'Investissement infrastructures récréatives',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q19_investissement_infrastructures_loisirs_sportives';

-- Q20: Protection patrimoine vs développement économique
-- Position: N (conservée) - Équilibre pragmatique
UPDATE party_positions
SET
  source = 'Plateforme développement urbain',
  note = 'Recherche d''équilibre entre préservation du patrimoine architectural et besoins de développement économique',
  quote = 'Équilibre patrimoine vs développement économique',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q20_protection_patrimoine';

-- Q21: Enjeux prioritaires (TOP 3)
-- Position: FA (conservée) - Mise à jour priority_list avec TOP 3 documenté
UPDATE party_positions
SET
  source = 'Rapports minoritaires 2022-2025, plateforme électorale 2025',
  note = 'Trois priorités centrales : réduction dette et assainissement finances, amélioration services municipaux de base, soutien développement économique et milieu affaires',
  quote = NULL,
  priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Développement économique": 3}',
  updated_at = NOW()
WHERE party_id = 'ensemble-montreal'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- =============================================================================
-- Vérification des mises à jour
-- =============================================================================

-- Compter le nombre de positions mises à jour (devrait être 21)
SELECT COUNT(*) as positions_mises_a_jour
FROM party_positions
WHERE party_id = 'ensemble-montreal'
  AND updated_at > NOW() - INTERVAL '5 minutes';

-- Afficher toutes les positions d'Ensemble Montréal pour vérification
SELECT
  question_id,
  position,
  source,
  LEFT(note, 50) as note_preview,
  CASE WHEN quote IS NOT NULL THEN 'Oui' ELSE 'Non' END as a_citation
FROM party_positions
WHERE party_id = 'ensemble-montreal'
ORDER BY question_id;

-- Vérifier les 2 positions modifiées
SELECT
  question_id,
  position,
  source
FROM party_positions
WHERE party_id = 'ensemble-montreal'
  AND question_id IN ('mtl_q2_pistes_cyclables', 'mtl_q17_soutien_organismes_communautaires');

-- =============================================================================
-- RÉSUMÉ DES MODIFICATIONS
-- =============================================================================
--
-- Positions MODIFIÉES (2):
-- 1. Q2 (mtl_q2_pistes_cyclables): N → PD
--    Raison: Moratoire 12-18 mois documenté par Claude Pinard
--
-- 2. Q17 (mtl_q17_soutien_organismes_communautaires): N → PA
--    Raison: Demande active de 3M$ pour organismes terrain
--
-- Positions CONSERVÉES avec ajout source/note/quote (19):
-- Q1, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q18, Q19, Q20, Q21
--
-- TOTAL: 21 questions mises à jour
-- =============================================================================
