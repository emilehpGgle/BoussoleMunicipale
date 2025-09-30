-- ============================================================================
-- MISE À JOUR DES POSITIONS DE FUTUR MONTRÉAL
-- ============================================================================
-- Date: 30 septembre 2025
-- Source de recherche: /Docs/futur-montreal-positions-research.md
--
-- AVERTISSEMENT: Ce script contient 5 positions documentées avec sources solides
-- et 16 positions extrapolées qui nécessitent validation lorsque la plateforme
-- électorale complète sera publiée.
--
-- Positions documentées (citations + sources médias multiples):
--   - Q2: Pistes cyclables (PD)
--   - Q4: Mobilité active centre-ville (N)
--   - Q5: Quotas logements abordables (PD)
--   - Q17: Soutien organismes communautaires (PA)
--   - Q21: Priorités municipales (PA avec priority_list)
--
-- Positions extrapolées (16 questions - marquées "Position extrapolée - À valider"):
--   - Q1, Q3, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q18, Q19, Q20
-- ============================================================================

-- Q1 - Extension métro/REM
UPDATE party_positions
SET
  position = 'PA',
  source = 'CityNews 20 août 2025, NeoQuébec Radio 27 août 2025',
  note = 'Support probable à l''extension du métro/REM comme infrastructure structurante, cohérent avec priorité mobilité annoncée. Position extrapolée - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q1_metro_rem';

-- Q2 - Développement des pistes cyclables
UPDATE party_positions
SET
  position = 'PD',
  source = 'Communiqué Politique Commerce & Accès d''abord - 8 septembre 2025',
  note = 'Gel permanent des pistes cyclables dans artères commerciales, priorité à l''accès aux commerces locaux. Critique de l''approche idéologique pro-vélo au détriment de l''économie locale',
  quote = 'Nos petits commerces sont le cœur de l''économie montréalaise. Beaucoup sont familiaux depuis des générations, et ils sont aujourd''hui pénalisés par une administration qui refuse de penser autrement que par idéologie'
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q2_pistes_cyclables';

-- Q3 - Autonomie des arrondissements
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur expérience gestion municipale Percé',
  note = 'Position extrapolée - Support probable à l''autonomie des arrondissements avec coordination centralisée. Documentation limitée - À valider avec plateforme complète',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q3_autonomie_arrondissements';

-- Q4 - Priorité mobilité active centre-ville
UPDATE party_positions
SET
  position = 'N',
  source = 'NeoQuébec Radio 27 août 2025 - Programme mobilité',
  note = 'Approche équilibrée entre tous les modes de transport au centre-ville (vélo, auto, piéton, mobilité réduite, transport collectif) via concertation plutôt que priorité exclusive',
  quote = 'Instaurer une véritable concertation intégrant cyclistes, automobilistes, piétons, personnes à mobilité réduite et usagers des transports collectifs'
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q4_mobilite_active_centreville';

-- Q5 - Quotas logements abordables
UPDATE party_positions
SET
  position = 'PD',
  source = 'La Presse 20 août 2025, NeoQuébec Radio 27 août 2025',
  note = 'Opposition au règlement 20-20-20 jugé rigide. Proposition alternative : redevance sur logements de luxe pour financer directement les OBNL de logement social/abordable',
  quote = 'Remplacer la réglementation 20-20-20 par une redevance sur le logement de luxe, afin de financer directement les OBNL et de soutenir la construction de logements sociaux et abordables. L''idée clé : mettre fin à un système rigide et compliqué'
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q5_quotas_logements_abordables';

-- Q6 - Réduction dépenses et taxes
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur approche pragmatique générale',
  note = 'Position extrapolée - Approche probablement équilibrée entre services et fiscalité. Documentation absente - À valider avec plateforme fiscale complète',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q6_reduction_depenses_taxes';

-- Q7 - Immeubles de grande hauteur
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur priorité logement',
  note = 'Position extrapolée - Support probable à la densification équilibrée sans position tranchée. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q7_immeubles_grande_hauteur';

-- Q8 - Interdire essence centre-ville d'ici 2035
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur politique mobilité équilibrée',
  note = 'Position extrapolée - Approche probablement graduelle et pragmatique plutôt qu''interdiction stricte 2035. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q8_interdire_essence_2035';

-- Q9 - Protection espaces verts vs développement
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur Prix environnement Gaspésie (Percé)',
  note = 'Position extrapolée - Support probable à la protection environnementale basé sur réalisations passées, approche équilibrée. Documentation Montréal absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q9_protection_espaces_verts';

-- Q10 - Transition carboneutre d'ici 2040
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur expertise durabilité Percé',
  note = 'Position extrapolée - Support probable à la transition écologique avec approche pragmatique et réaliste. Documentation absente - À valider avec plateforme environnementale',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q10_transition_carboneutre_2040';

-- Q11 - Réduction déchets
UPDATE party_positions
SET
  position = 'N',
  source = 'Aucune documentation disponible',
  note = 'Position extrapolée - Documentation absente. Approche probablement équilibrée entre services et environnement - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q11_reduction_dechets';

-- Q12 - Augmentation taxes projets écoresponsables
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur approche fiscale ciblée (redevance luxe)',
  note = 'Position extrapolée - Approche probablement sélective : opposition taxes générales, support taxes ciblées sur luxe. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q12_augmentation_taxes_ecoresponsables';

-- Q13 - Pouvoir conseils de quartier
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur valeurs proximité/écoute citoyenne',
  note = 'Position extrapolée - Support probable au renforcement de la participation citoyenne locale cohérent avec valeurs d''écoute affichées. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q13_pouvoir_conseils_quartier';

-- Q14 - Réduction dette vs nouveaux projets
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur approche gestion efficace Percé',
  note = 'Position extrapolée - Approche probablement équilibrée entre services essentiels et projets d''avenir. Documentation absente - À valider avec plateforme financière',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q14_reduction_dette';

-- Q15 - Avantages fiscaux entreprises
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur Politique Commerce & Accès',
  note = 'Position extrapolée - Support probable aux commerces locaux/PME plutôt qu''avantages fiscaux généralisés grandes entreprises. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q15_avantages_fiscaux_entreprises';

-- Q16 - Limitation touristes
UPDATE party_positions
SET
  position = 'N',
  source = 'Extrapolation basée sur expérience tourisme Percé et Salon Chocolat',
  note = 'Position extrapolée - Support probable au développement touristique équilibré basé sur expérience. Pas d''opposition limitation si nécessaire. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q16_limitation_touristes';

-- Q17 - Soutien organismes communautaires
UPDATE party_positions
SET
  position = 'PA',
  source = 'La Presse 20 août 2025, NeoQuébec Radio 27 août 2025',
  note = 'Support fort au financement des organismes communautaires, particulièrement OBNL de logement, via redevance sur logements de luxe. Pilier central de la stratégie logement',
  quote = 'Investir revenus dans des organisations communautaires qui construisent des logements abordables et sociaux'
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q17_soutien_organismes_communautaires';

-- Q18 - Augmentation effectifs policiers
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur préoccupation sécurité (NeoQuébec)',
  note = 'Position extrapolée - Sécurité identifiée comme enjeu mais solutions non détaillées. Support probable modéré basé sur approche pragmatique. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q18_augmentation_effectifs_policiers';

-- Q19 - Investissement infrastructures loisirs/sport
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur priorité services municipaux',
  note = 'Position extrapolée - Support probable aux infrastructures récréatives dans cadre services de proximité. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q19_investissement_infrastructures_loisirs';

-- Q20 - Protection patrimoine vs développement
UPDATE party_positions
SET
  position = 'PA',
  source = 'Extrapolation basée sur engagement UNESCO (culture)',
  note = 'Position extrapolée - Support probable à la protection du patrimoine avec approche équilibrée vs développement, basé sur engagement culturel UNESCO. Documentation absente - À valider',
  quote = NULL
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q20_protection_patrimoine';

-- Q21 - Enjeux prioritaires (TOP 3)
UPDATE party_positions
SET
  position = 'PA',
  source = 'NeoQuébec Radio 27 août 2025, CityNews 20 août 2025, Politique 8 sept 2025',
  note = 'Trois priorités clairement documentées : Transport et mobilité (concertation multimodale), Logement abordable (refonte 20-20-20), Développement économique et social (support commerces/OBNL)',
  quote = NULL,
  priority_list = '{"Transport et mobilité": 1, "Logement abordable": 2, "Développement économique et social": 3}'::jsonb
WHERE party_id = 'futur-montreal' AND question_id = 'mtl_q21_priorites';

-- ============================================================================
-- FIN DU SCRIPT DE MISE À JOUR
-- ============================================================================
--
-- RÉSUMÉ DES MODIFICATIONS:
-- - 5 positions modifiées avec sources solides (Q2: PA→PD, Q4: PA→N, Q5: PA→PD)
-- - 16 positions conservées/ajustées avec extrapolations prudentes
-- - Q21 mise à jour avec priority_list JSON documenté
--
-- PROCHAINES ÉTAPES:
-- 1. Valider toutes les positions extrapolées lorsque plateforme complète disponible
-- 2. Mettre à jour quotes pour questions documentées si nouvelles déclarations
-- 3. Affiner notes avec détails additionnels campagne électorale
--
-- EXÉCUTION:
-- Ce script peut être exécuté directement dans Supabase SQL Editor
-- ou via psql avec la connexion appropriée.
-- ============================================================================
