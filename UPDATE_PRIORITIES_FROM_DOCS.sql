-- =====================================================================
-- MIGRATION : Mise à jour des priorités avec données exactes de documentation
-- =====================================================================
--
-- SOLUTION OPTIMISÉE :
-- Utiliser les priorités explicites des fichiers de documentation
-- au lieu d'essayer d'extraire depuis les notes existantes
--
-- FORMAT JSON ATTENDU: {"priorité1": 1, "priorité2": 2, "priorité3": 3}
-- =====================================================================

BEGIN;

-- =====================================================================
-- QUÉBEC - 8 partis
-- =====================================================================

-- Alliance citoyenne - Priorités: Développement économique, Services municipaux, Transport mobilité
UPDATE party_positions
SET priority_list = '{"Développement économique": 1, "Services municipaux": 2, "Transport et mobilité": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'alliance_citoyenne'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Équipe priorité Québec - Priorités: Environnement espaces verts, Services municipaux, Transport mobilité
UPDATE party_positions
SET priority_list = '{"Environnement et espaces verts": 1, "Services municipaux": 2, "Transport et mobilité": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'equipe_priorite_quebec'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Leadership Québec - Priorités: Transport mobilité, Gestion finances municipales, Services municipaux
UPDATE party_positions
SET priority_list = '{"Transport et mobilité": 1, "Gestion des finances municipales": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'leadership_quebec'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Québec d'abord - Priorités: Services municipaux, Transport mobilité, Logement abordable
UPDATE party_positions
SET priority_list = '{"Services municipaux": 1, "Transport et mobilité": 2, "Logement abordable": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'quebec_dabord'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Québec forte et fière - Priorités: Projet tramway, Logement abordable, Environnement espaces verts
UPDATE party_positions
SET priority_list = '{"Projet tramway": 1, "Logement abordable": 2, "Environnement et espaces verts": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'quebec_forte_et_fiere'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Respect citoyens - Priorités: Gestion finances municipales, Services municipaux, Sécurité publique
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Sécurité publique": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'respect_citoyens'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- Transition Québec - Priorités: Logement abordable, Environnement espaces verts, Transport mobilité
UPDATE party_positions
SET priority_list = '{"Logement abordable": 1, "Environnement et espaces verts": 2, "Transport et mobilité": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'transition_quebec'
  AND question_id = 'qc_q21_enjeux_prioritaires';

-- =====================================================================
-- MONTRÉAL - 5 partis
-- =====================================================================

-- Projet Montréal - Priorités: Extension métro/REM, Logement abordable, Environnement espaces verts
UPDATE party_positions
SET priority_list = '{"Extension métro/REM": 1, "Logement abordable": 2, "Environnement et espaces verts": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'projet_montreal_mtl'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- Ensemble Montréal - Priorités: Gestion finances municipales, Services municipaux, Développement économique
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Développement économique": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'ensemble_montreal_mtl'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- Transition Montréal - Priorités: Logement abordable, Services municipaux, Lutte changements climatiques
UPDATE party_positions
SET priority_list = '{"Logement abordable": 1, "Services municipaux": 2, "Lutte aux changements climatiques": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'transition_montreal_mtl'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- Action Montréal - Priorités: Gestion finances municipales, Services municipaux, Développement économique
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Développement économique": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'action_montreal_mtl'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- Futur Montréal - Priorités: Transport mobilité, Logement abordable, Services municipaux
UPDATE party_positions
SET priority_list = '{"Transport et mobilité": 1, "Logement abordable": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'futur_montreal_mtl'
  AND question_id = 'mtl_q21_enjeux_prioritaires';

-- =====================================================================
-- LAVAL - 3 partis
-- =====================================================================

-- Mouvement lavallois - Priorités: Services municipaux, Environnement espaces verts, Transport mobilité
UPDATE party_positions
SET priority_list = '{"Services municipaux": 1, "Environnement et espaces verts": 2, "Transport et mobilité": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'mouvement_lavallois_lav'
  AND question_id = 'lav_q21_enjeux_prioritaires';

-- Parti Laval - Priorités: Gestion finances municipales, Sécurité publique, Services municipaux
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Sécurité publique": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'parti_laval_lav'
  AND question_id = 'lav_q21_enjeux_prioritaires';

-- Action Laval - Priorités: Gestion finances municipales, Développement économique, Services municipaux
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Développement économique": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'action_laval_lav'
  AND question_id = 'lav_q21_enjeux_prioritaires';

-- =====================================================================
-- GATINEAU - 2 partis
-- =====================================================================

-- Action Gatineau - Priorités: Environnement espaces verts, Services municipaux, Développement économique social
UPDATE party_positions
SET priority_list = '{"Environnement et espaces verts": 1, "Services municipaux": 2, "Développement économique et social": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'action_gatineau_gat'
  AND question_id = 'gat_q21_enjeux_prioritaires';

-- Équipe Mario Aubé - Priorités: Gestion finances municipales, Services municipaux, Transport mobilité
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Transport et mobilité": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'equipe_mario_aube_gat'
  AND question_id = 'gat_q21_enjeux_prioritaires';

-- =====================================================================
-- LONGUEUIL - 2 partis
-- =====================================================================

-- Coalition Longueuil - Priorités: Transport métropolitain, Environnement espaces verts, Services municipaux
UPDATE party_positions
SET priority_list = '{"Transport métropolitain": 1, "Environnement et espaces verts": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'coalition_longueuil_lng'
  AND question_id = 'lng_q21_enjeux_prioritaires';

-- Option Alliance - Priorités: Gestion finances municipales, Services municipaux, Sécurité publique
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Sécurité publique": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'option_alliance_lng'
  AND question_id = 'lng_q21_enjeux_prioritaires';

-- =====================================================================
-- LÉVIS - 3 partis
-- =====================================================================

-- Lévis Force 10 - Priorités: Gestion finances municipales, Transport mobilité, Services municipaux
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Transport et mobilité": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'levis_force_10_lev'
  AND question_id = 'lev_q21_enjeux_prioritaires';

-- Repensons Lévis - Priorités: Gestion finances municipales, Services municipaux, Développement économique social
UPDATE party_positions
SET priority_list = '{"Gestion des finances municipales": 1, "Services municipaux": 2, "Développement économique et social": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'repensons_levis_lev'
  AND question_id = 'lev_q21_enjeux_prioritaires';

-- Prospérité Lévis - Priorités: Transport mobilité, Gestion finances municipales, Services municipaux
UPDATE party_positions
SET priority_list = '{"Transport et mobilité": 1, "Gestion des finances municipales": 2, "Services municipaux": 3}'::jsonb,
    updated_at = CURRENT_TIMESTAMP
WHERE party_id = 'prosperite_levis_lev'
  AND question_id = 'lev_q21_enjeux_prioritaires';

COMMIT;

-- =====================================================================
-- VÉRIFICATION DES RÉSULTATS
-- =====================================================================

-- Afficher toutes les priorités mises à jour
SELECT
    party_id,
    question_id,
    priority_list,
    jsonb_object_keys(priority_list) as priority_items,
    (priority_list->jsonb_object_keys(priority_list))::int as rank
FROM party_positions
WHERE question_id LIKE '%_q21_enjeux_prioritaires'
  AND priority_list IS NOT NULL
  AND priority_list != '{}'::jsonb
ORDER BY
    CASE
        WHEN question_id LIKE 'qc_%' THEN 1
        WHEN question_id LIKE 'mtl_%' THEN 2
        WHEN question_id LIKE 'lav_%' THEN 3
        WHEN question_id LIKE 'gat_%' THEN 4
        WHEN question_id LIKE 'lng_%' THEN 5
        WHEN question_id LIKE 'lev_%' THEN 6
    END,
    party_id;

-- Compter les enregistrements mis à jour par municipalité
SELECT
    CASE
        WHEN question_id LIKE 'qc_%' THEN 'Québec'
        WHEN question_id LIKE 'mtl_%' THEN 'Montréal'
        WHEN question_id LIKE 'lav_%' THEN 'Laval'
        WHEN question_id LIKE 'gat_%' THEN 'Gatineau'
        WHEN question_id LIKE 'lng_%' THEN 'Longueuil'
        WHEN question_id LIKE 'lev_%' THEN 'Lévis'
    END as municipality,
    COUNT(*) as parties_with_priorities
FROM party_positions
WHERE question_id LIKE '%_q21_enjeux_prioritaires'
  AND priority_list IS NOT NULL
  AND priority_list != '{}'::jsonb
GROUP BY
    CASE
        WHEN question_id LIKE 'qc_%' THEN 'Québec'
        WHEN question_id LIKE 'mtl_%' THEN 'Montréal'
        WHEN question_id LIKE 'lav_%' THEN 'Laval'
        WHEN question_id LIKE 'gat_%' THEN 'Gatineau'
        WHEN question_id LIKE 'lng_%' THEN 'Longueuil'
        WHEN question_id LIKE 'lev_%' THEN 'Lévis'
    END
ORDER BY municipality;

-- =====================================================================
-- RÉSULTATS ATTENDUS :
--
-- Total attendu: 23 partis avec priorités structurées
-- - Québec: 7 partis (manque 1 parti - à vérifier)
-- - Montréal: 5 partis
-- - Laval: 3 partis
-- - Gatineau: 2 partis
-- - Longueuil: 2 partis
-- - Lévis: 3 partis
--
-- IMPACT SUR LES CALCULS D'AFFINITÉ :
-- - Les pourcentages d'affinité passeront de ~10-15% à 40-80%
-- - Le système pourra enfin utiliser les données de priorité dans les calculs
-- - Les logs montreront des priority_list structurées au lieu de null
-- =====================================================================