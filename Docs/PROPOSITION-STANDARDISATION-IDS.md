# PROPOSITION : Standardisation nomenclature des IDs questions

**Date** : 2025-01-25
**Auteur** : Claude Code
**Statut** : ✅ DÉCISION FINALISÉE - Format avec types choisi
**Impact** : 🚨 CRITIQUE - Architecture évolutive avec scalabilité maximale

---

## 🎯 RÉSUMÉ EXÉCUTIF

**Problème** : Nomenclature incohérente des IDs questions créant dette technique et maintenance complexe

**Solution choisie** : ✅ Format universel avec types `{prefix}_{type}_{numero}_{description}`

**Avantages décisifs** : 🚀 Évolutivité maximale + Architecture scalable + Maintenance ultra-simplifiée

**Statut** : ✅ **APPROUVÉ ET EN COURS** d'implémentation

---

## 📊 ANALYSE DU PROBLÈME ACTUEL

### État des lieux : Format incohérent

| Municipalité | Format actuel | Problèmes identifiés |
|--------------|---------------|---------------------|
| **Quebec** | `q1_tramway`, `q12_augmentation_taxes` | Numérotation sans zéros, format mixte |
| **Montreal** | `mtl_metro_rem`, `mtl_q12_augmentation_taxes` | Mélange spécifique/générique |
| **Gatineau** | `gat_q1_pistes_cyclables`, `gat_q19_services_bilingues` | Plus cohérent, mais sans zéros |
| **Laval** | `lav_srb_transport_montreal`, `lav_q12_augmentation_taxes` | Format mixte problématique |

### Conséquences de l'incohérence

❌ **Maintenance complexe** : Logique spéciale pour chaque municipalité
❌ **Évolutivité limitée** : Nouvelles municipalités = nouveau format à inventer
❌ **Tri non-intuitif** : `q1, q10, q11, q2, q3` au lieu de `q01, q02, q03, q10, q11`
❌ **Documentation difficile** : Format non-prévisible
❌ **Erreurs développement** : IDs difficiles à deviner/valider

---

## 🎨 SOLUTION PROPOSÉE : FORMAT UNIVERSEL

### Nomenclature standardisée

```
FORMAT FINAL : {prefix}_{type}_{numero}_{description}

Composants :
- prefix      : Code municipalité (qc, mtl, gat, lav, lon, lev)
- type        : "q" (générique), "spec" (spécifique), "urgent", "seasonal", "survey"
- numero      : 01-21 (génériques), nom descriptif (spécifiques)
- description : Identificateur court et explicite

TYPES SUPPORTÉS :
- q        : Questions génériques communes à toutes municipalités (01-21)
- spec     : Questions spécifiques uniques par municipalité
- urgent   : Questions d'actualité temporaires (évolutivité future)
- seasonal : Questions saisonnières (évolutivité future)
- survey   : Sondages spéciaux (évolutivité future)
```

### Exemples concrets

#### Questions génériques (communes à toutes les villes) ✅ AVEC TYPES
```
AVANT → APRÈS (FORMAT AVEC TYPES)

Quebec:
q1_tramway → qc_q_01_tramway
q12_augmentation_taxes → qc_q_12_taxes
q5_quotas_logements_abordables → qc_q_05_logements

Montreal:
mtl_q2_pistes_cyclables → mtl_q_02_pistes_cyclables
mtl_q12_augmentation_taxes → mtl_q_12_taxes

Gatineau:
gat_q1_pistes_cyclables → gat_q_01_pistes_cyclables
gat_q10_augmentation_taxes → gat_q_10_taxes

Laval:
lav_q2_pistes_cyclables → lav_q_02_pistes_cyclables
lav_q12_augmentation_taxes → lav_q_12_taxes
```

#### Questions spécifiques (uniques à chaque ville) ✅ AVEC TYPES
```
AVANT → APRÈS (FORMAT AVEC TYPES)

Quebec:
q3_troisieme_lien → qc_spec_troisieme_lien

Montreal:
mtl_metro_rem → mtl_spec_rem
mtl_arrondissements_autonomie → mtl_spec_arrondissements
mtl_festivals_equilibre → mtl_spec_festivals

Gatineau:
gat_q19_services_bilingues → gat_spec_bilingue
gat_q20_coordination_ottawa → gat_spec_ottawa

Laval:
lav_srb_transport_montreal → lav_spec_srb
lav_equilibre_developpement_espaces_verts → lav_spec_espaces_verts
```

#### Questions futures (évolutivité avec types) 🚀
```
EXEMPLES DE SCALABILITÉ FUTURE

Questions urgentes d'actualité :
qc_urgent_budget_crise_2025
mtl_urgent_metro_panne_prolongee

Questions saisonnières :
all_seasonal_festivals_ete
mtl_seasonal_construction_periode

Sondages spéciaux :
all_survey_satisfaction_boussole
qc_survey_tramway_perception_2025
```

### Codes municipalités proposés

| Municipalité | Code actuel | Code standardisé | Justification |
|--------------|-------------|------------------|---------------|
| Quebec | `q_` | `qc_` | Quebec = QC (code postal) |
| Montreal | `mtl_` | `mtl_` | Conservé (reconnu) |
| Gatineau | `gat_` | `gat_` | Conservé (court et clair) |
| Laval | `lav_` | `lav_` | Conservé (court et clair) |
| Longueuil | `lon_` | `lon_` | Nouveau |
| Lévis | `lev_` | `lev_` | Nouveau |

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### Script de migration IDs

```sql
-- Script : migrations/000_standardize_question_ids.sql
-- ATTENTION : À exécuter AVANT toutes les autres migrations

-- ==============================================================================
-- MIGRATION NOMENCLATURE DES IDs QUESTIONS
-- ==============================================================================

BEGIN;

-- 1. QUEBEC : q* → qc_*
UPDATE questions SET id = 'qc_q01_tramway' WHERE id = 'q1_tramway' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q02_pistes_cyclables' WHERE id = 'q2_pistes_cyclables' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_spec_troisieme_lien' WHERE id = 'q3_troisieme_lien' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q04_mobilite_active' WHERE id = 'q4_priorite_mobilite_active' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q05_logements_abordables' WHERE id = 'q5_quotas_logements_abordables' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q06_reduction_depenses' WHERE id = 'q6_reduction_depenses_taxes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q07_immeubles_hauteur' WHERE id = 'q7_immeubles_grande_hauteur' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q08_interdire_essence' WHERE id = 'q8_interdire_essence_centre_ville' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q09_espaces_verts' WHERE id = 'q9_protection_espaces_verts' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q10_carboneutre' WHERE id = 'q10_transition_carboneutre' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q11_reduction_dechets' WHERE id = 'q11_reduction_dechets' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q12_taxes' WHERE id = 'q12_augmentation_taxes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q13_conseils_quartier' WHERE id = 'q13_pouvoir_conseils_quartier' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q14_reduction_dette' WHERE id = 'q14_reduction_dette' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q15_avantages_fiscaux' WHERE id = 'q15_avantages_fiscaux_entreprises' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q16_limitation_touristes' WHERE id = 'q16_limitation_touristes' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q17_organismes_communautaires' WHERE id = 'q17_soutien_organismes_communautaires' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q18_effectifs_policiers' WHERE id = 'q18_augmentation_effectifs_policiers' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q19_infrastructures_loisirs' WHERE id = 'q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'quebec';
UPDATE questions SET id = 'qc_q20_patrimoine' WHERE id = 'q20_protection_patrimoine' AND municipality_id = 'quebec';

-- 2. MONTREAL : mtl_* standardisation
UPDATE questions SET id = 'mtl_spec_rem' WHERE id = 'mtl_metro_rem' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_spec_arrondissements' WHERE id = 'mtl_arrondissements_autonomie' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_spec_festivals' WHERE id = 'mtl_festivals_equilibre' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q02_pistes_cyclables' WHERE id = 'mtl_q2_pistes_cyclables' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q04_mobilite_active' WHERE id = 'mtl_q4_priorite_mobilite_active' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q05_logements_abordables' WHERE id = 'mtl_q5_quotas_logements_abordables' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q06_reduction_depenses' WHERE id = 'mtl_q6_reduction_depenses_taxes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q07_immeubles_hauteur' WHERE id = 'mtl_q7_immeubles_grande_hauteur' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q08_interdire_essence' WHERE id = 'mtl_q8_interdire_essence_centre_ville' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q09_espaces_verts' WHERE id = 'mtl_q9_protection_espaces_verts' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q10_carboneutre' WHERE id = 'mtl_q10_transition_carboneutre' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q11_reduction_dechets' WHERE id = 'mtl_q11_reduction_dechets' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q12_taxes' WHERE id = 'mtl_q12_augmentation_taxes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q13_conseils_quartier' WHERE id = 'mtl_q13_pouvoir_conseils_quartier' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q14_reduction_dette' WHERE id = 'mtl_q14_reduction_dette' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q15_avantages_fiscaux' WHERE id = 'mtl_q15_avantages_fiscaux_entreprises' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q16_limitation_touristes' WHERE id = 'mtl_q16_limitation_touristes' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q17_organismes_communautaires' WHERE id = 'mtl_q17_soutien_organismes_communautaires' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q18_effectifs_policiers' WHERE id = 'mtl_q18_augmentation_effectifs_policiers' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q19_infrastructures_loisirs' WHERE id = 'mtl_q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'montreal';
UPDATE questions SET id = 'mtl_q20_patrimoine' WHERE id = 'mtl_q20_protection_patrimoine' AND municipality_id = 'montreal';

-- 3. GATINEAU : gat_* standardisation
UPDATE questions SET id = 'gat_q01_pistes_cyclables' WHERE id = 'gat_q1_pistes_cyclables' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q02_mobilite_active' WHERE id = 'gat_q2_priorite_mobilite_active' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q03_logements_abordables' WHERE id = 'gat_q3_quotas_logements_abordables' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q04_reduction_depenses' WHERE id = 'gat_q4_reduction_depenses_taxes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q05_immeubles_hauteur' WHERE id = 'gat_q5_immeubles_grande_hauteur' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q06_interdire_essence' WHERE id = 'gat_q6_interdire_essence_centre_ville' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q07_espaces_verts' WHERE id = 'gat_q7_protection_espaces_verts' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q08_carboneutre' WHERE id = 'gat_q8_transition_carboneutre' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q09_reduction_dechets' WHERE id = 'gat_q9_reduction_dechets' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q10_taxes' WHERE id = 'gat_q10_augmentation_taxes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q11_conseils_secteur' WHERE id = 'gat_q11_pouvoir_conseils_secteur' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q12_reduction_dette' WHERE id = 'gat_q12_reduction_dette' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q13_avantages_fiscaux' WHERE id = 'gat_q13_avantages_fiscaux_entreprises' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q14_limitation_touristes' WHERE id = 'gat_q14_limitation_touristes' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q15_organismes_communautaires' WHERE id = 'gat_q15_soutien_organismes_communautaires' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q16_effectifs_policiers' WHERE id = 'gat_q16_augmentation_effectifs_policiers' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q17_infrastructures_loisirs' WHERE id = 'gat_q17_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_q18_patrimoine' WHERE id = 'gat_q18_protection_patrimoine' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_spec_bilingue' WHERE id = 'gat_q19_services_bilingues' AND municipality_id = 'gatineau';
UPDATE questions SET id = 'gat_spec_ottawa' WHERE id = 'gat_q20_coordination_ottawa' AND municipality_id = 'gatineau';

-- 4. LAVAL : lav_* standardisation
UPDATE questions SET id = 'lav_spec_srb' WHERE id = 'lav_srb_transport_montreal' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_spec_espaces_verts' WHERE id = 'lav_equilibre_developpement_espaces_verts' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q02_pistes_cyclables' WHERE id = 'lav_q2_pistes_cyclables' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q04_mobilite_active' WHERE id = 'lav_q4_priorite_mobilite_active' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q05_logements_abordables' WHERE id = 'lav_q5_quotas_logements_abordables' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q06_reduction_depenses' WHERE id = 'lav_q6_reduction_depenses_taxes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q07_immeubles_hauteur' WHERE id = 'lav_q7_immeubles_grande_hauteur' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q08_interdire_essence' WHERE id = 'lav_q8_interdire_essence_centre_ville' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q09_espaces_verts' WHERE id = 'lav_q9_protection_espaces_verts' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q10_carboneutre' WHERE id = 'lav_q10_transition_carboneutre' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q11_reduction_dechets' WHERE id = 'lav_q11_reduction_dechets' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q12_taxes' WHERE id = 'lav_q12_augmentation_taxes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q13_conseils_quartier' WHERE id = 'lav_q13_pouvoir_conseils_quartier' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q14_reduction_dette' WHERE id = 'lav_q14_reduction_dette' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q15_avantages_fiscaux' WHERE id = 'lav_q15_avantages_fiscaux_entreprises' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q16_limitation_touristes' WHERE id = 'lav_q16_limitation_touristes' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q17_organismes_communautaires' WHERE id = 'lav_q17_soutien_organismes_communautaires' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q18_effectifs_policiers' WHERE id = 'lav_q18_augmentation_effectifs_policiers' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q19_infrastructures_loisirs' WHERE id = 'lav_q19_investissement_infrastructures_loisirs_sportives' AND municipality_id = 'laval';
UPDATE questions SET id = 'lav_q20_patrimoine' WHERE id = 'lav_q20_protection_patrimoine' AND municipality_id = 'laval';

-- 5. Mettre à jour les tables dépendantes (positions des partis)
-- ATTENTION : Cette partie nécessite une analyse des données existantes
UPDATE party_positions SET question_id = REPLACE(question_id, 'q1_tramway', 'qc_q01_tramway');
UPDATE party_positions SET question_id = REPLACE(question_id, 'q12_augmentation_taxes', 'qc_q12_taxes');
-- [... Toutes les correspondances nécessaires ...]

-- 6. Mettre à jour les réponses utilisateurs existantes (si applicable)
-- ATTENTION : Si des réponses utilisateurs existent
UPDATE user_responses SET question_id = REPLACE(question_id, 'q1_tramway', 'qc_q01_tramway');
UPDATE user_responses SET question_id = REPLACE(question_id, 'q12_augmentation_taxes', 'qc_q12_taxes');
-- [... Toutes les correspondances nécessaires ...]

COMMIT;

-- Validation post-migration
SELECT
    municipality_id,
    COUNT(*) as total_questions,
    COUNT(CASE WHEN id LIKE '%_q___%' THEN 1 END) as standardized_generic,
    COUNT(CASE WHEN id LIKE '%_spec_%' THEN 1 END) as standardized_specific,
    array_agg(id ORDER BY id) as sample_ids
FROM questions
GROUP BY municipality_id
ORDER BY municipality_id;
```

### Impact sur les données existantes

| Table | Impact | Action requise |
|-------|--------|----------------|
| `questions` | 🔴 MAJEUR | Renommer tous les IDs |
| `party_positions` | 🔴 MAJEUR | Mettre à jour question_id |
| `user_responses` | 🟡 MOYEN | Migrer si données existent |
| Migrations créées | 🟡 MOYEN | Refactoriser les 5 scripts |
| Code TypeScript | 🟢 FAIBLE | Fallback gère transition |

---

## 📅 PLAN D'IMPLÉMENTATION

### Option A : 🚫 **NE PAS STANDARDISER**

**Conséquences** :
- ✅ Pas de migration immédiate nécessaire
- ❌ Dette technique permanente
- ❌ Complexité croissante avec nouvelles municipalités
- ❌ Maintenance difficile à long terme

### Option B : ✅ **STANDARDISER MAINTENANT** (RECOMMANDÉ)

**Étapes** :

1. **🔧 Phase 0 : Migration IDs** (2-3h)
   - Créer script `000_standardize_question_ids.sql`
   - Appliquer migration IDs AVANT toutes les autres
   - Valider cohérence données

2. **🔄 Phase 1-2 : Refactorisation** (1-2h)
   - Adapter les 5 migrations créées avec nouveaux IDs
   - Vérifier toutes les correspondances
   - Tests unitaires scripts migration

3. **🧪 Phase 3 : Validation** (1h)
   - Tests en environnement développement
   - Validation positions calculées correctement
   - Vérification aucune donnée perdue

**Total estimé** : 4-6h vs dette technique permanente

---

## 🎯 RECOMMANDATION FINALE

### 🌟 **VERDICT : STANDARDISER MAINTENANT**

**Justification** :
1. **Timing optimal** : Avant intégration Phase 3
2. **Coût contrôlé** : 4-6h vs complexité permanente
3. **Bénéfice durable** : Architecture propre pour toujours
4. **Évolutivité** : Nouvelles municipalités = copier pattern

### ✅ **DÉCISION PRISE ET APPROUVÉE**

**STATUT FINAL** : ✅ **FORMAT AVEC TYPES CHOISI** pour scalabilité maximale

**Actions en cours** :
- ✅ Format final défini : `{prefix}_{type}_{numero}_{description}`
- ✅ Avantages types validés : évolutivité + maintenance + analytics
- 🔄 **EN COURS** : Création script migration avec types
- 📋 **SUIVANT** : Refactorisation 5 migrations existantes

**Timeline** : Phase 2.5 Standardisation → Phase 3 Intégration

---

## 📊 COMPARAISON FINALE

| Critère | Format actuel | **Format avec types ✅** |
|---------|---------------|-------------------|
| **Cohérence** | ❌ Incohérent | ✅ 100% cohérent |
| **Maintenance** | ❌ Complexe | ✅ Ultra-simplifié |
| **Évolutivité** | ❌ Limitée | ✅ **MAXIMALE** (urgent, seasonal, survey) |
| **Analytics** | ❌ Impossible | ✅ **Groupement automatique par type** |
| **Filtrage DB** | ❌ Complexe | ✅ **`WHERE id LIKE '%_q_%'`** |
| **Documentation** | ❌ Difficile | ✅ Auto-documenté |
| **Dette technique** | ❌ Permanente | ✅ **Éliminée à vie** |

**Score final** : Format actuel (1/7) vs **Format avec types (7/7)** 🏆

**Décision** : ✅ **FORMAT AVEC TYPES CHOISI** - Architecture évolutive optimale !

---

*Document créé le : 2025-01-25*
*Responsable : Claude Code*
*Version : 1.0 - Proposition initiale*