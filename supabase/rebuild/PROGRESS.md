# 📊 Suivi de l'Avancement - Reconstruction Supabase

**Date de début:** 2025-10-03
**Statut global:** 🔄 En cours (21/30 fichiers créés - 70%)

---

## 🎯 Vue d'ensemble

| Phase | Fichiers | Statut | Progression |
|-------|----------|--------|-------------|
| **Structure** | 3 fichiers | ✅ Complété | 100% (3/3) |
| **RLS Policies** | 5 fichiers | ✅ Complété | 100% (5/5) |
| **Données** | 17 fichiers | 🔄 En cours | 76% (13/17) |
| **Performance** | 1 fichier | ⏳ À faire | 0% (0/1) |
| **Documentation** | 3 fichiers | ⏳ À faire | 0% (0/3) |
| **TOTAL** | **30 fichiers** | **🔄 En cours** | **70% (21/30)** |

---

## 📁 Phase 1: Structure de Base (✅ COMPLÉTÉ)

### ✅ Fichier 01: `01_create_core_tables.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 191
- **Tables:** municipalities, questions, parties, party_positions
- **Contenu:**
  - 4 tables avec foreign keys et contraintes
  - 14 index (municipalities: 1, questions: 7, parties: 2, party_positions: 4)
  - Fonction `update_updated_at_column()` + 4 triggers
  - 2 vues utilitaires (party_complete_view, questions_ordered_view)

### ✅ Fichier 02: `02_create_user_tables.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 130
- **Tables:** user_sessions, user_profiles, user_responses, user_results
- **Contenu:**
  - 4 tables avec CASCADE DELETE
  - 12 index total
  - 4 triggers pour updated_at
  - Contraintes CHECK sur response_type, agreement_value, importance_direct_value

### ✅ Fichier 03: `03_create_additional_tables.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 112
- **Tables:** shared_results, leaders
- **Modifications:** Ajout colonne `leader_id` dans table parties
- **Contenu:**
  - 2 tables avec 8 index total
  - Expiration automatique 30 jours pour shared_results
  - Vue leaders_complete_view
  - 2 triggers

---

## 🔒 Phase 2: RLS Policies (✅ COMPLÉTÉ)

### ✅ Fichier 04: `04_rls_public_tables.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 62
- **Tables sécurisées:** municipalities, questions, parties, party_positions
- **Politique:** Lecture publique uniquement (SELECT)

### ✅ Fichier 05: `05_rls_leaders.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 37
- **Tables sécurisées:** leaders
- **Politique:** Lecture publique

### ✅ Fichier 06: `06_rls_user_sessions.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 72
- **Tables sécurisées:** user_sessions
- **Politiques:** 4 politiques CRUD complètes pour utilisateurs anonymes

### ✅ Fichier 07: `07_rls_user_data.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 67
- **Tables sécurisées:** user_profiles, user_responses, user_results
- **Politiques:** 3 politiques permissives (gestion complète par session)

### ✅ Fichier 08: `08_rls_shared_results.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 67
- **Tables sécurisées:** shared_results
- **Politiques:** 4 politiques publiques (lecture, insertion, mise à jour)

---

## 📊 Phase 3: Données (🔄 EN COURS - 13/17)

### ✅ Fichier 09: `09_data_municipalities.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 42
- **Données:** 6 municipalités (Québec, Montréal, Laval, Gatineau, Longueuil, Lévis)
- **Vérification:** Comptage automatique après insertion

### ✅ Fichier 10: `10_data_questions_quebec.sql`
- **Statut:** ✅ Créé et vérifié (CORRIGÉ: catégories "Enjeu spécifique 1/2")
- **Lignes:** 386
- **Données:** 21 questions Québec
- **IDs standardisés:** qc_q_XX (génériques), qc_spec_XX (spécifiques)
- **Colonnes politiques:** Complètes (axis, weight, interpretation, inversion)
- **Enjeux spécifiques:**
  - Q1 (Tramway) : catégorie "Enjeu spécifique 1"
  - Q3 (Troisième lien) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques = 10 priorités

### ✅ Fichier 11: `11_data_questions_montreal.sql`
- **Statut:** ✅ Créé et vérifié (CORRIGÉ: catégories "Enjeu spécifique 1/2")
- **Lignes:** 367
- **Données:** 21 questions Montréal
- **IDs standardisés:** mtl_q_XX (génériques), mtl_spec_XX (spécifiques)
- **Enjeux spécifiques:**
  - Q1 (Métro/REM) : catégorie "Enjeu spécifique 1"
  - Q3 (Autonomie arrondissements) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques MTL = 10 priorités

### ✅ Fichier 12: `12_data_questions_laval.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 377
- **Données:** 21 questions Laval
- **IDs standardisés:** lav_q_XX (génériques), lav_spec_XX (spécifiques)
- **Enjeux spécifiques:**
  - Q1 (SRB transport) : catégorie "Enjeu spécifique 1"
  - Q3 (Équilibre développement) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques Laval = 10 priorités

### ✅ Fichier 13: `13_data_questions_gatineau.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 379
- **Données:** 21 questions Gatineau
- **IDs standardisés:** gat_q_XX (génériques), gat_spec_XX (spécifiques)
- **Enjeux spécifiques:**
  - Q1 (Services bilingues) : catégorie "Enjeu spécifique 1"
  - Q3 (Transport interprovincial) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques Gatineau = 10 priorités

### ✅ Fichier 14: `14_data_questions_longueuil.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 383
- **Données:** 21 questions Longueuil
- **IDs standardisés:** lon_q_XX (génériques), lon_spec_XX (spécifiques)
- **Enjeux spécifiques:**
  - Q1 (Transport métropolitain) : catégorie "Enjeu spécifique 1"
  - Q3 (Développement aéroportuaire) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques Longueuil = 10 priorités

### ✅ Fichier 15: `15_data_questions_levis.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 378
- **Données:** 21 questions Lévis
- **IDs standardisés:** lev_q_XX (génériques), lev_spec_XX (spécifiques)
- **Enjeux spécifiques:**
  - Q1 (Troisième lien routier) : catégorie "Enjeu spécifique 1"
  - Q3 (Traverse Québec-Lévis) : catégorie "Enjeu spécifique 2"
- **Q21 priorités:** 8 universels + 2 spécifiques Lévis = 10 priorités

### ✅ Fichier 16: `16_data_parties_quebec.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 130
- **Données:** 6 partis Quebec
- **Contenu:**
  - **Leadership Québec (LQ)** - Sam Hamad
  - **Parti du Monde (PDM)** - Anne Guérette
  - **Québec d'abord (QD)** - Claude Villeneuve
  - **Québec forte et fière (QFF)** - Bruno Marchand
  - **Respect citoyens (RC)** - Stéphane Lachance
  - **Transition Québec (TQ)** - Jackie Smith
- **IDs standardisés:** {parti}_qc
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ✅ Fichier 17: `17_data_parties_montreal.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 100
- **Données:** 5 partis Montreal
- **Contenu:**
  - **Action Montréal (AM)** - Gilbert Thibodeau
  - **Ensemble Montréal (EM)** - Soraya Martinez Ferrada
  - **Futur Montréal (FM)** - Jean-François Kacou
  - **Projet Montréal (PM)** - Luc Rabouin
  - **Transition Montréal (TM)** - Craig Sauvé
- **IDs standardisés:** {parti}_mtl
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ✅ Fichier 18: `18_data_parties_laval.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 87
- **Données:** 3 partis Laval
- **Contenu:**
  - **Mouvement lavallois (ML)** - Stéphane Boyer
  - **Parti Laval (PL)** - Claude Larochelle
  - **Action Laval (AL)** - Frédéric Mayer/Achille Cifelli
- **IDs standardisés:** {parti}_lav
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ✅ Fichier 19: `19_data_parties_gatineau.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 74
- **Données:** 2 partis Gatineau
- **Contenu:**
  - **Action Gatineau (AG)** - Maude Marquis-Bissonnette
  - **Équipe Mario Aubé (ÉMA)** - Mario Aubé
- **IDs standardisés:** {parti}_gat
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ✅ Fichier 20: `20_data_parties_longueuil.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 71
- **Données:** 2 partis Longueuil
- **Contenu:**
  - **Coalition Longueuil (CL)** - Catherine Fournier
  - **Option Alliance (OA)** - Susan Rasmussen
- **IDs standardisés:** {parti}_lng
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ✅ Fichier 21: `21_data_parties_levis.sql`
- **Statut:** ✅ Créé et vérifié
- **Lignes:** 87
- **Données:** 3 partis Lévis
- **Contenu:**
  - **Lévis Force 10 (LF10)** - Isabelle Demers
  - **Repensons Lévis (RL)** - Serge Bonin
  - **Prospérité Lévis (PL)** - Steven Blaney
- **IDs standardisés:** {parti}_lev
- **Colonnes complètes:** orientation, main_ideas_summary, strengths, reserves (JSONB)

### ⏳ Fichier 22: `22_data_positions_quebec.sql`
- **Statut:** ⏳ À créer
- **Données prévues:** ~126 lignes (6 partis × 21 questions)
- **Inclut:** position, source, note, quote

### ⏳ Fichier 23: `23_data_positions_montreal.sql`
- **Statut:** ⏳ À créer
- **Données prévues:** ~105 lignes (5 partis × 21 questions)

### ⏳ Fichier 24: `24_data_positions_autres_villes.sql`
- **Statut:** ⏳ À créer
- **Données prévues:** Positions pour Laval, Gatineau, Longueuil, Lévis

### ⏳ Fichier 25: `25_data_leaders.sql`
- **Statut:** ⏳ À créer
- **Données prévues:** Tous les leaders (6 villes)
- **Inclut:** Biographies complètes, liens bidirectionnels parti ↔ leader

---

## ⚡ Phase 4: Performance (⏳ À FAIRE)

### ⏳ Fichier 21: `21_performance_indexes.sql`
- **Statut:** ⏳ À créer
- **Contenu prévu:** Index additionnels pour optimisation requêtes

---

## 📚 Phase 5: Documentation (⏳ À FAIRE)

### ⏳ Fichier 22: `README.md`
- **Statut:** ⏳ À créer
- **Contenu prévu:**
  - Ordre d'exécution séquentielle (01 → 21)
  - Checklist de validation après chaque fichier
  - Commandes de vérification
  - Troubleshooting

### ⏳ Fichier 23: `VALIDATION.sql`
- **Statut:** ⏳ À créer
- **Contenu prévu:**
  - Comptage lignes toutes tables
  - Vérification foreign keys
  - Test politiques RLS
  - Vérification indexes

### ⏳ Fichier 24: `/Docs/Tables/leaders.md`
- **Statut:** ⏳ À créer
- **Contenu prévu:** Documentation structure table leaders (manquante actuellement)

---

## 🔄 Prochaine Étape

**Fichier 22:** `22_data_positions_quebec.sql` - Insertion positions partis Québec (6 partis × 21 questions)

**Actions requises:**
1. ✅ ~~Créer fichiers partis pour 4 autres villes (Laval, Gatineau, Longueuil, Lévis)~~ - COMPLÉTÉ
2. Créer fichiers positions (Quebec, Montreal, autres villes)
3. Créer fichier leaders avec biographies complètes
4. Créer fichier performance indexes
5. Créer fichiers documentation (README, VALIDATION, leaders.md)

---

## 📝 Notes de Configuration

### Structure des Priorités (Mise à jour 2025-10-03)
- **8 enjeux universels:**
  1. Transport et mobilité
  2. Logement abordable
  3. Environnement et espaces verts
  4. Sécurité publique
  5. Gestion des finances municipales
  6. Services municipaux
  7. Lutte aux changements climatiques
  8. Patrimoine et identité

- **2 enjeux spécifiques par ville:**
  - **Québec:** Tramway, Troisième lien
  - **Montréal:** Extension métro/REM, Autonomie arrondissements
  - **Laval:** SRB et transport vers Montréal, Équilibre développement/espaces verts
  - **Gatineau:** Services bilingues, Transport interprovincial
  - **Longueuil:** Transport métropolitain, Développement aéroportuaire
  - **Lévis:** Troisième lien routier, Traverse Québec-Lévis

### Catégories des Enjeux Spécifiques
- **IMPORTANT:** Les questions spécifiques doivent avoir la catégorie `"Enjeu spécifique 1"` ou `"Enjeu spécifique 2"`
- Cette catégorie permet au code TypeScript de détecter automatiquement les enjeux spécifiques
- Le code applique un bonus de rareté ×1.5 aux enjeux spécifiques

### IDs Standardisés
- Format: `{prefix}_{type}_{numero}_{description}`
- Préfixes: qc, mtl, gat, lav, lon, lev
- Types: q (générique), spec (spécifique)

---

## ✅ Checklist de Validation Globale

- [x] Tables core créées
- [x] Tables utilisateurs créées
- [x] Tables additionnelles créées
- [x] RLS activé sur toutes les tables
- [x] Politiques RLS configurées
- [x] Données municipalités insérées
- [x] Questions Québec insérées (catégories corrigées)
- [x] Questions Montréal insérées (catégories corrigées)
- [x] Questions Laval insérées
- [x] Questions Gatineau insérées
- [x] Questions Longueuil insérées
- [x] Questions Lévis insérées
- [x] Partis Quebec insérés (6 partis)
- [x] Partis Montreal insérés (5 partis)
- [x] Partis Laval insérés (3 partis)
- [x] Partis Gatineau insérés (2 partis)
- [x] Partis Longueuil insérés (2 partis)
- [x] Partis Lévis insérés (3 partis)
- [ ] Positions partis insérées
- [ ] Leaders insérés
- [ ] Indexes performance créés
- [ ] Documentation complète

---

**Dernière mise à jour:** 2025-10-03 - Fichiers 1-21 créés et vérifiés (70% complété)
**Plan révisé:** 30 fichiers total (17 fichiers données: 1 municipalities + 6 questions + 6 partis + 3 positions + 1 leaders)
**Toutes les questions:** 6 municipalités × 21 questions = 126 questions insérées
**Tous les partis:** 6 municipalités, 21 partis insérés (Québec: 6, Montréal: 5, Laval: 3, Gatineau: 2, Longueuil: 2, Lévis: 3)
**Enjeux Gatineau:** Services bilingues + Transport interprovincial (Option B confirmée)
