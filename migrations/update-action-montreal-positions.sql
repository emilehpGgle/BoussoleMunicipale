-- Mise à jour des positions d'Action Montréal basée sur la recherche du 30 septembre 2025
-- Source: actionmontreal.ca (pages programme officielles)

-- Q2 - Développement des pistes cyclables : N → FD
UPDATE "public"."party_positions"
SET
    "position" = 'FD',
    "source" = 'Page programme Pistes cyclables - actionmontreal.ca',
    "note" = 'Opposition ferme au développement des pistes cyclables : retrait des pistes improvisées, reconfiguration pour préserver stationnement, priorité à la circulation automobile',
    "quote" = 'Retirer ou reconfigurer les pistes cyclables nuisibles ou improvisées. Évaluer, ajuster ou retirer les pistes improvisées qui perturbent la circulation ou réduisent inutilement les places de stationnement',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q2_pistes_cyclables';

-- Q4 - Priorité mobilité active centre-ville : N → FD
UPDATE "public"."party_positions"
SET
    "position" = 'FD',
    "source" = 'Pages Stationnement et Pistes cyclables - actionmontreal.ca',
    "note" = 'Opposition ferme à la priorité mobilité active : augmentation offre stationnement, retrait pistes cyclables nuisibles, priorité circulation automobile au centre-ville',
    "quote" = 'Augmenter l''offre de stationnement. Évaluer et retirer les pistes cyclables improvisées qui compromettent indûment la circulation ou éliminent des espaces de stationnement essentiels',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q4_priorite_mobilite_active';

-- Q5 - Quotas logements abordables : N → PD
UPDATE "public"."party_positions"
SET
    "position" = 'PD',
    "source" = 'Page Le parc immobilier - actionmontreal.ca',
    "note" = 'Opposition aux quotas obligatoires actuels (règlement 20-20-20), volonté de réévaluer et réduire ces exigences pour favoriser la construction',
    "quote" = 'Le règlement 20-20-20, qui exige 20 % de logements sociaux, 20 % de logements abordables et 20 % de logements familiaux dans certains projets, peut alourdir les coûts pour les promoteurs. Nous réévaluerons ces exigences pour réduire les obstacles',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q5_quotas_logements_abordables';

-- Q6 - Réduction dépenses et taxes : PA → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Pages Réduction de la dette, Vignettes, Parcomètres, Taxe de bienvenue - actionmontreal.ca',
    "note" = 'Position très ferme : élimination dépenses inutiles, réduction dette (20% économies), réduction massive taxes municipales (vignettes 50$ max, parcomètres 2$/h, remboursement taxe bienvenue)',
    "quote" = 'Éliminer les dépenses inutiles en révisant les projets coûteux et mal planifiés, comme les initiatives improvisées ou les subventions mal ciblées',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q6_reduction_depenses_taxes';

-- Q8 - Interdire essence centre-ville d'ici 2035 : PD → FD
UPDATE "public"."party_positions"
SET
    "position" = 'FD',
    "source" = 'Orientation générale programme - actionmontreal.ca',
    "note" = 'Opposition inférée : programme fortement pro-automobile (augmentation stationnement, retrait pistes cyclables), aucune mention transition écologique automobile',
    "quote" = 'Augmenter l''offre de stationnement. Nous rejetons l''idée que la gestion du stationnement ne peut être dissociée de la qualité de vie ou de l''attractivité économique',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q8_interdire_essence_centre_ville';

-- Q10 - Transition carboneutre d'ici 2040 : N → FD
UPDATE "public"."party_positions"
SET
    "position" = 'FD',
    "source" = 'Orientation fiscale et absence environnementale - actionmontreal.ca',
    "note" = 'Opposition ferme inférée : aucune mention transition écologique/carboneutre, programme axé sur automobile sans considération environnementale, opposition systématique aux mesures augmentant coûts de construction',
    "quote" = 'Éliminer les dépenses inutiles en révisant les projets coûteux et mal planifiés',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q10_transition_carboneutre';

-- Q11 - Amélioration fréquence collecte ordures : N → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Page La propreté : une priorité - actionmontreal.ca',
    "note" = 'Position ferme : collecte hebdomadaire garantie avec possibilité de doubler la fréquence en été (juillet-août) pour combattre vermine et insalubrité',
    "quote" = 'Assurer la collecte des ordures chaque semaine dans tous les arrondissements, avec la possibilité d''augmenter à deux fois par semaine si nécessaire, notamment en juillet et août (les mois les plus chauds où les animaux nuisibles et la vermine prolifèrent)',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q11_reduction_dechets';

-- Q12 - Augmentation taxes projets écoresponsables : PD → FD
UPDATE "public"."party_positions"
SET
    "position" = 'FD',
    "source" = 'Orientation fiscale générale - actionmontreal.ca',
    "note" = 'Opposition ferme à toute hausse taxes (remboursement taxe bienvenue, réduction vignettes/parcomètres), aucun projet écoresponsable mentionné',
    "quote" = 'Éliminer les dépenses inutiles en révisant les projets coûteux et mal planifiés',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q12_augmentation_taxes';

-- Q14 - Priorité services essentiels vs projets d'avenir : PA → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Pages La propreté, Réduction de la dette - actionmontreal.ca',
    "note" = 'Priorité absolue aux services essentiels : garantie collecte hebdomadaire + doublement été, déneigement irréprochable, propreté toute l''année, financés par élimination projets mal planifiés et gestion rigoureuse',
    "quote" = 'Grâce à une gestion rigoureuse des finances, nous pourrons non seulement garantir des collectes hebdomadaires, mais aussi doubler la fréquence en été. Éliminer les dépenses inutiles en révisant les projets coûteux et mal planifiés',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q14_reduction_dette';

-- Q15 - Avantages fiscaux entreprises : PA → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Pages Le parc immobilier, Logements vacants, Stationnement - actionmontreal.ca',
    "note" = 'Support ferme aux avantages fiscaux : incitatifs fiscaux promoteurs, réductions permis développeurs, préservation stationnement pour commerces',
    "quote" = 'Simplifier les règles de zonage dans certains arrondissements à Montréal et offrir des incitatifs fiscaux aux promoteurs encourageront le développement de projets accessibles',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q15_avantages_fiscaux_entreprises';

-- Q17 - Soutien organismes communautaires : N → PA
UPDATE "public"."party_positions"
SET
    "position" = 'PA',
    "source" = 'Pages Logements abordables, Itinérance, SPVM - actionmontreal.ca',
    "note" = 'Support modéré aux organismes communautaires : facilitation accès terrains, promotion initiatives, tables de concertation, sans engagement de financement massif',
    "quote" = 'Faciliter l''accès aux terrains : Collaboration de la Ville de Montréal pour rendre des terrains disponibles à des conditions très avantageuses, soutenant les projets de logements abordables des organismes communautaires',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q17_soutien_organismes_communautaires';

-- Q18 - Augmentation effectifs policiers : PA → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Pages Informatisation du SPVM, Une ville Sécuritaire - actionmontreal.ca',
    "note" = 'Support ferme augmentation effectifs : budget SPVM revu à la hausse, effectifs renforcés, augmentation patrouilles zones à risque, outils modernes',
    "quote" = 'Leur budget ne doit pas être menacé, mais revu à la hausse pour leur donner les moyens d''agir vite et fort. Nos agents sont en première ligne : ils méritent des outils modernes, des effectifs renforcés et une administration qui les soutient sans faille',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q18_augmentation_effectifs_policiers';

-- Q19 - Investissement infrastructures loisirs/sport : N → FA
UPDATE "public"."party_positions"
SET
    "position" = 'FA',
    "source" = 'Page Centres sportifs - actionmontreal.ca',
    "note" = 'Engagement ferme : construction/rénovation centres sportifs modernes, programmes jeunesse gratuits/faible coût, infrastructures arrondissements défavorisés',
    "quote" = 'Action Montréal s''engage à transformer les centres sportifs en espaces vibrants d''inclusion, de santé et de cohésion. Soutenir la construction ou la rénovation de centres sportifs modernes (piscines, patinoires, gymnases) dans des arrondissements comme L''Île-Bizard–Sainte-Geneviève, Anjou et Montréal-Nord',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q19_investissement_infrastructures_loisirs_sportives';

-- Q21 - Enjeux prioritaires : Mise à jour priority_list
UPDATE "public"."party_positions"
SET
    "source" = 'Analyse programme complet actionmontreal.ca',
    "note" = 'Trois priorités centrales : gestion finances municipales (réduction dette/taxes, élimination gaspillage), sécurité publique (budget SPVM à la hausse, effectifs renforcés), services municipaux de base (propreté, stationnement, infrastructures)',
    "priority_list" = '{"Gestion des finances municipales": 1, "Sécurité publique": 2, "Services municipaux": 3}',
    "updated_at" = NOW()
WHERE
    "party_id" = 'action-montreal'
    AND "question_id" = 'mtl_q21_enjeux_prioritaires';

-- Vérification des modifications
SELECT
    question_id,
    position,
    source,
    LEFT(note, 100) as note_preview,
    updated_at
FROM "public"."party_positions"
WHERE
    party_id = 'action-montreal'
ORDER BY question_id;
