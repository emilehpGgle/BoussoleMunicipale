# Plan de Peuplement des Données Multi-Municipalités 🏛️

> Document créé le 23 septembre 2025
> **Dernière mise à jour : 23 septembre 2025 - 17h45**

## 📊 Vue d'ensemble du projet

**Objectif :** Peupler les données politiques pour 5 municipalités québécoises restantes (Montréal, Laval, Gatineau, Longueuil, Lévis) dans les tables Supabase.

**État actuel :**
- ✅ Infrastructure multi-municipalités : 100% complète et fonctionnelle
- ✅ Québec : 21 questions + 7 partis + 147 positions (100% complété)
- ✅ **Montréal : 21 questions + 5 partis + 105 positions (100% complété)**
- ✅ **Laval : 21 questions + 3 partis + 63 positions (100% complété)**
- ✅ **Gatineau : 22 questions + 2 partis + 44 positions (100% complété)**
- ✅ **Lévis : 20 questions + 3 partis + 60 positions (100% complété)**
- ✅ **Longueuil : 21 questions + 2 partis + 42 positions (100% complété - NOUVEAU !)**

## 🎉 **AVANCÉES MAJEURES - PHASES 2, 3, 4, 5 & 6 COMPLÉTÉES**

**Données Montréal maintenant prêtes :**
- **21 questions adaptées** au contexte montréalais (18 génériques + 3 spécifiques)
- **5 partis municipaux** identifiés pour élections novembre 2025
- **105 positions politiques** calculées avec sources fiables
- **Scripts SQL** exécutés dans Supabase ✅

**Données Laval maintenant prêtes :**
- **21 questions adaptées** au contexte lavallois (18 génériques + 2 spécifiques + 1 priorité)
- **3 partis municipaux** identifiés : Mouvement lavallois, Parti Laval, Action Laval
- **63 positions politiques** calculées avec sources fiables
- **Scripts SQL** exécutés dans Supabase ✅

**Données Gatineau maintenant prêtes :**
- **22 questions adaptées** au contexte gatinois (18 génériques + 3 spécifiques + 1 priorité)
- **2 partis municipaux** identifiés : Action Gatineau, Équipe Mario Aubé
- **44 positions politiques** calculées avec sources fiables
- **Scripts SQL** exécutés dans Supabase ✅

**Données Lévis maintenant prêtes :**
- **20 questions adaptées** au contexte lévissien (18 génériques + 2 spécifiques)
- **3 partis municipaux** identifiés : Lévis Force 10, Repensons Lévis, Prospérité Lévis
- **60 positions politiques** calculées avec sources fiables
- **Scripts SQL** exécutés dans Supabase ✅

**Données Longueuil maintenant prêtes :**
- **21 questions adaptées** au contexte longueuillois (18 génériques + 2 spécifiques + 1 priorité)
- **2 partis municipaux** identifiés : Coalition Longueuil, Option Alliance
- **42 positions politiques** calculées avec sources fiables
- **Scripts SQL** exécutés dans Supabase ✅

**Sources de qualité** : Radio-Canada, Le Devoir, La Presse, Courrier Laval, MCL Média Laval, Le Droit, Radio-Canada Outaouais, Journal de Lévis

**Fichiers créés :**
- Phase 2 : `montreal-*`, `sql-montreal-*`
- Phase 3 : `laval-questions-adaptees.json`, `laval-positions-politiques-calculees.json`, `sql-laval-*`
- Phase 4 : `gatineau-questions-adaptees.json`, `gatineau-positions-politiques-calculees.json`, `sql-gatineau-*`
- Phase 5 : `longueuil-questions-adaptees.json`, `longueuil-positions-politiques-calculees.json`, `sql-longueuil-*`
- Phase 6 : `levis-questions-adaptees.json`, `levis-positions-politiques-calculees.json`, `sql-levis-*`

## 🔄 Stratégie de questions optimisée

### Structure par municipalité (21 questions chacune)
- **18 questions génériques** adaptées de Québec (excluant q1_tramway et partiellement q3_troisieme_lien)
- **2-3 questions spécifiques** aux enjeux locaux prioritaires
- **1 question priorités** (8 options génériques + 2-3 spécifiques locales)

### ❌ Questions Québec à exclure/adapter
1. **q1_tramway** → Remplacer par question spécifique locale
2. **q3_troisieme_lien** → Garder pour Lévis, remplacer ailleurs
3. **q21_enjeux_prioritaires** → Adapter avec priorités locales

### ✅ Questions génériques réutilisables (18)
- q2_pistes_cyclables
- q4_priorite_mobilite_active
- q5_quotas_logements_abordables
- q6_reduction_depenses_taxes
- q7_immeubles_grande_hauteur
- q8_interdire_essence_centre_ville
- q9_protection_espaces_verts
- q10_transition_carboneutre
- q11_reduction_dechets
- q12_augmentation_taxes
- q13_pouvoir_conseils_quartier
- q14_reduction_dette
- q15_avantages_fiscaux_entreprises
- q16_limitation_touristes
- q17_soutien_organismes_communautaires
- q18_augmentation_effectifs_policiers
- q19_investissement_infrastructures_loisirs_sportives
- q20_protection_patrimoine

### 🎯 Priorités génériques communes (8)
1. Transport et mobilité
2. Logement abordable
3. Environnement et espaces verts
4. Sécurité publique
5. Gestion des finances municipales
6. Services municipaux
7. Lutte aux changements climatiques
8. Patrimoine et identité

## 🎯 Questions et priorités spécifiques par municipalité

### MONTRÉAL ✅ **COMPLÉTÉ**
**Questions spécifiques (3) :**
- Extension du métro et développement du REM
- Gestion des festivals et grands événements vs qualité de vie résidentielle
- Autonomie des arrondissements vs coordination centralisée

**Priorités spécifiques :**
- Extension du métro et REM
- Gestion des festivals et événements
- Coordination des arrondissements

**Partis identifiés (5) :**
1. **Projet Montréal** (centre-gauche) - Luc Rabouin (parti au pouvoir)
2. **Ensemble Montréal** (centre-droit) - Soraya Martinez Ferrada (opposition)
3. **Transition Montréal** (centre-gauche) - Craig Sauvé (nouveau parti)
4. **Action Montréal** (centre-droit) - Gilbert Thibodeau
5. **Futur Montréal** (centre) - Jean-François Kacou (nouveau parti 2025)

### LAVAL ✅ **COMPLÉTÉ**
**Questions spécifiques (2) :**
- Développement du SRB et amélioration transport vers Montréal
- Équilibre développement résidentiel vs préservation espaces verts

**Priorités spécifiques :**
- Développement du SRB
- Transport vers Montréal

**Partis identifiés (3) :**
1. **Mouvement lavallois** (centre-gauche) - Stéphane Boyer (parti au pouvoir)
2. **Parti Laval** (centre-droit) - Claude Larochelle (opposition principale)
3. **Action Laval** (centre) - Frédéric Mayer/Achille Cifelli (opposition avec élus)

### GATINEAU ✅ **COMPLÉTÉ**
**Questions spécifiques (3) :**
- Services municipaux bilingues et équité linguistique
- Coordination avec Ottawa pour projets interprovincialité
- Amélioration transport interprovincial et gestion des ponts

**Priorités spécifiques :**
- Services bilingues
- Relations avec Ottawa
- Transport interprovincial

**Partis identifiés (2) :**
1. **Action Gatineau** (centre-gauche) - Maude Marquis-Bissonnette (parti au pouvoir)
2. **Équipe Mario Aubé** (big tent, conservatisme fiscal) - Mario Aubé (opposition nouvelle)

### LONGUEUIL ✅ **COMPLÉTÉ**
**Questions spécifiques (2) :**
- Amélioration transport métropolitain et accès Montréal
- Gestion impact développement aéroportuaire vs qualité de vie

**Priorités spécifiques :**
- Transport métropolitain
- Développement aéroportuaire

**Partis identifiés (2) :**
1. **Coalition Longueuil** (centre-gauche) - Catherine Fournier (parti au pouvoir)
2. **Option Alliance** (centre-droit) - Susan Rasmussen (opposition émergente)

### LÉVIS ✅ **COMPLÉTÉ**
**Questions spécifiques (2) :**
- Troisième lien routier Québec-Lévis (perspective Lévis)
- Amélioration fréquence et service traverse Québec-Lévis

**Priorités spécifiques :**
- Troisième lien routier
- Traverse Québec-Lévis

**Partis identifiés (3) :**
1. **Lévis Force 10** (centre) - Isabelle Demers (continuité parti au pouvoir)
2. **Repensons Lévis** (centre-gauche) - Serge Bonin (opposition officielle)
3. **Prospérité Lévis** (centre-droit) - Steven Blaney (nouveau parti, ex-député fédéral)

## 🔍 Sources de recherche fiables

### Médias et actualités
- Radio-Canada (ici.radio-canada.ca)
- TVA Nouvelles (tvanouvelles.ca)
- La Presse (lapresse.ca)
- Le Devoir (ledevoir.com)
- Journaux locaux par municipalité

### Sources officielles
- Élections Québec (electionsquebec.qc.ca)
- Sites web officiels des municipalités
- Sites web des partis politiques municipaux
- Documents électoraux et plateformes

### Outils de recherche
- Exa Search pour recherches web avancées
- Crawling de sites officiels
- Recherche de documents électoraux récents (2021, 2025)

---

## 📋 Plan de peuplement détaillé par municipalité

## 🏙️ Phase 1: Préparation base commune ✅ **COMPLÉTÉE**

### 1.1 Extraction questions génériques ✅
- [x] Identifier les 18 questions génériques de Québec
- [x] Créer template d'adaptation terminologique (`template-adaptation-municipalite.md`)
- [x] Préparer mapping des termes (ex: "Ville de Québec" → "Ville de [Municipality]")
- [x] Définir les 8 priorités génériques communes

### 1.2 Création structure de données ✅
- [x] Créer template JSON pour questions (`questions-generiques-base.json`)
- [x] Créer template JSON pour partis (structure définie)
- [x] Créer template JSON pour positions (structure définie)
- [x] Préparer scripts SQL d'insertion (templates créés)

---

## 🏙️ Phase 2: MONTRÉAL ✅ **COMPLÉTÉE** (Priority: HAUTE)
**Population:** 1,704,000 | **Codes postaux:** H1A-H4Z | **Arrondissements:** 19

### 2.1 Nettoyage données existantes ✅
- [x] Supprimer les 3 questions test montreal existantes dans Supabase
- [x] Vérifier qu'aucune donnée résiduelle n'existe pour Montréal
- [x] Documenter les suppressions effectuées

### 2.2 Recherche et identification des partis politiques ✅
- [x] Rechercher tous les partis municipaux actifs de Montréal (5 identifiés)
- [x] Identifier le parti au pouvoir actuel (Projet Montréal - Luc Rabouin)
- [x] Identifier les partis d'opposition (Ensemble Montréal, Transition, Action, Futur)
- [x] Collecter informations de base (noms complets, leaders, sites web)
- [x] Vérifier logos et assets visuels disponibles
- [x] Documenter orientations politiques principales

### 2.3 Création questions spécifiques Montréal ✅
- [x] Formuler question sur extension métro/REM
- [x] Formuler question sur festivals vs résidents
- [x] Formuler question sur gouvernance arrondissements
- [x] Valider formulations pour neutralité politique

### 2.4 Adaptation questions génériques ✅
- [x] Adapter les 18 questions au contexte montréalais
- [x] Remplacer références géographiques spécifiques
- [x] Ajuster terminologie ("arrondissements" vs "secteurs")
- [x] Créer question priorités avec options Montréal

### 2.5 Recherche positions politiques ✅
- [x] Analyser plateformes électorales 2021 et récentes
- [x] Rechercher positions sur transport et mobilité
- [x] Rechercher positions sur logement et développement
- [x] Rechercher positions sur environnement
- [x] Rechercher positions sur gouvernance
- [x] Rechercher positions sur économie locale
- [x] Rechercher positions sur sécurité publique
- [x] Collecter citations et sources pour chaque position
- [x] Documenter les sources dans `montreal-positions-politiques-calculees.json`

### 2.6 Population données Montréal ✅
- [x] Créer fichier SQL questions Montréal (21 questions)
- [x] Créer fichier SQL partis Montréal (`sql-montreal-parties.sql`)
- [x] Calculer positions pour chaque parti sur chaque question
- [x] Créer fichier SQL positions 105 entrées (`sql-montreal-positions.sql`)
- [x] Exécuter insertions dans Supabase
- [x] Valider intégrité des données

### 2.7 Tests et validation Montréal 🔄 **PROCHAINE ÉTAPE**
- [ ] Tester l'infrastructure via `/montreal/test-politique-municipal`
- [ ] Valider que les 21 questions s'affichent correctement
- [ ] Vérifier calculs politiques et graphique compass
- [ ] Tester isolation des données (Montréal ≠ Québec)
- [ ] Documenter résultats et métriques
- [ ] Corriger erreurs éventuelles

**🎯 Statut Phase 2 :** Données insérées avec succès dans Supabase, prêt pour tests

---

## 🌉 Phase 3: LAVAL ✅ **COMPLÉTÉE** (Priority: HAUTE)
**Population:** 438,000 | **Codes postaux:** H7A-H7Y | **Secteurs:** 13

### 3.1 Recherche partis politiques Laval ✅
- [x] Identifier partis municipaux de Laval (Mouvement lavallois, Parti Laval, Action Laval)
- [x] Collecter informations leaders et orientations
- [x] Analyser spécificités politiques lavalloises
- [x] Documenter enjeux locaux prioritaires (SRB, espaces verts)
- [x] Vérifier logos et ressources visuelles

### 3.2 Création questions spécifiques Laval ✅
- [x] Formuler question sur développement SRB et transport Montréal
- [x] Formuler question sur équilibre développement/espaces verts
- [x] Valider formulations pour neutralité

### 3.3 Adaptation questions génériques ✅
- [x] Adapter 18 questions pour contexte lavallois
- [x] Utiliser terminologie "secteurs" (vs arrondissements)
- [x] Intégrer enjeux transport vers Montréal
- [x] Créer question priorités avec options Laval spécifiques

### 3.4 Recherche positions politiques Laval ✅
- [x] Analyser plateformes électorales lavalloises
- [x] Rechercher positions sur SRB et transport
- [x] Rechercher positions sur développement urbain
- [x] Rechercher positions sur espaces verts
- [x] Rechercher positions sur services municipaux
- [x] Rechercher positions sur économie locale
- [x] Rechercher positions sur sécurité
- [x] Collecter sources et citations (Courrier Laval, MCL Média, Le Devoir)

### 3.5 Population données Laval ✅
- [x] Créer fichier SQL questions Laval (21 questions)
- [x] Créer fichier SQL partis Laval (3 partis)
- [x] Calculer et créer fichier SQL positions (63 positions)
- [x] Exécuter insertions Supabase
- [x] Valider intégrité données

### 3.6 Tests Laval 🔄 **PROCHAINE ÉTAPE**
- [ ] Tests infrastructure `/laval/test-politique-municipal`
- [ ] Validation calculs et isolation données
- [ ] Documentation résultats
- [ ] Corrections si nécessaire

**🎯 Statut Phase 3 :** Données insérées avec succès dans Supabase, prêt pour tests

---

## 🏛️ Phase 4: GATINEAU ✅ **COMPLÉTÉE** (Priority: MOYENNE)
**Population:** 291,000 | **Codes postaux:** J8A-J9J | **Secteurs:** 5

### 4.1 Recherche partis Gatineau ✅
- [x] Identifier partis municipaux gatinois (Action Gatineau, Équipe Mario Aubé)
- [x] Analyser particularités (bilinguisme, proximité Ottawa)
- [x] Collecter orientations et programmes
- [x] Documenter leadership local (Maude Marquis-Bissonnette, Mario Aubé)
- [x] Vérifier ressources visuelles

### 4.2 Création questions spécifiques Gatineau ✅
- [x] Formuler question sur services bilingues
- [x] Formuler question sur coordination Ottawa
- [x] Formuler question sur transport interprovincial
- [x] Valider neutralité politique

### 4.3 Adaptation questions génériques ✅
- [x] Adapter pour contexte bilingue et interprovincial
- [x] Intégrer enjeux spécifiques région
- [x] Utiliser terminologie appropriée ("secteurs")
- [x] Créer question priorités Gatineau (11 options)

### 4.4 Recherche positions politiques ✅
- [x] Rechercher positions sur bilinguisme
- [x] Rechercher positions sur relations Ottawa
- [x] Rechercher positions sur transport interprovincial
- [x] Rechercher positions sur développement économique
- [x] Rechercher positions sur environnement
- [x] Rechercher positions sur services municipaux
- [x] Collecter sources et citations (Radio-Canada Outaouais, Le Droit)

### 4.5 Population données Gatineau ✅
- [x] Créer fichier SQL questions (22 questions)
- [x] Créer fichier SQL partis (2 partis)
- [x] Créer fichier SQL positions (44 positions)
- [x] Exécuter insertions dans Supabase
- [x] Valider intégrité des données

### 4.6 Tests Gatineau 🔄 **PROCHAINE ÉTAPE**
- [ ] Tests complets infrastructure `/gatineau/test-politique-municipal`
- [ ] Validation isolation et calculs
- [ ] Documentation résultats

**🎯 Statut Phase 4 :** Données insérées avec succès dans Supabase, prêt pour tests

---

## 🌊 Phase 5: LONGUEUIL ✅ **COMPLÉTÉE** (Priority: MOYENNE)
**Population:** 246,000 | **Codes postaux:** J4A-J4Z | **Arrondissements:** 3

### 5.1 Recherche partis Longueuil ✅
- [x] Identifier partis municipaux longueuillois (Coalition Longueuil, Option Alliance)
- [x] Analyser enjeux banlieue métropolitaine
- [x] Collecter programmes et orientations
- [x] Documenter spécificités locales (transport métropolitain, aéroport)

### 5.2 Création questions spécifiques ✅
- [x] Formuler question transport métropolitain
- [x] Formuler question développement aéroportuaire
- [x] Valider neutralité

### 5.3 Adaptation questions génériques ✅
- [x] Adapter pour contexte banlieue métropolitaine
- [x] Intégrer enjeux inter-municipaux
- [x] Créer question priorités Longueuil

### 5.4 Recherche positions politiques ✅
- [x] Rechercher positions sur transport métropolitain
- [x] Rechercher positions sur développement résidentiel
- [x] Rechercher positions sur aéroport
- [x] Rechercher positions sur services municipaux
- [x] Rechercher positions sur environnement
- [x] Collecter sources (recherche approfondie Exa AI)

### 5.5 Population données ✅
- [x] Créer fichiers SQL (21 questions avec préfixes lng_)
- [x] Créer fichiers SQL partis (2 partis)
- [x] Créer fichiers SQL positions (42 positions)
- [x] Insérer données Supabase
- [x] Valider cohérence

### 5.6 Tests Longueuil 🔄 **PROCHAINE ÉTAPE**
- [ ] Tests infrastructure `/longueuil/test-politique-municipal`
- [ ] Validation isolation données et calculs politiques

**🎯 Statut Phase 5 :** Données insérées avec succès dans Supabase, prêt pour tests

---

## ⛵ Phase 6: LÉVIS ✅ **COMPLÉTÉE** (Priority: MOYENNE)
**Population:** 149,000 | **Codes postaux:** G6A-G7A | **Arrondissements:** 3

### 6.1 Recherche partis Lévis ✅
- [x] Identifier partis municipaux lévissiens (Lévis Force 10, Repensons Lévis, Prospérité Lévis)
- [x] Analyser dynamiques politiques locales
- [x] Collecter orientations et programmes
- [x] Documenter leadership (Isabelle Demers, Serge Bonin, Steven Blaney)

### 6.2 Questions spécifiques Lévis ✅
- [x] Adapter q3_troisieme_lien pour perspective Lévis
- [x] Formuler question sur traverse Québec-Lévis
- [x] Valider neutralité politique

### 6.3 Adaptation questions génériques ✅
- [x] Adapter 18 questions pour contexte Lévis
- [x] Intégrer enjeux spécifiques (arrondissements)
- [x] Créer question priorités avec "Troisième lien routier"

### 6.4 Recherche positions politiques ✅
- [x] Rechercher positions sur 3e lien (sources Radio-Canada, Journal Lévis)
- [x] Rechercher positions sur traverse
- [x] Rechercher positions sur développement urbain
- [x] Rechercher positions sur patrimoine et environnement
- [x] Collecter sources fiables et justifications

### 6.5 Population données Lévis ✅
- [x] Créer fichiers SQL questions (20 questions incluant 3e lien)
- [x] Créer fichiers SQL partis (3 partis municipaux)
- [x] Créer fichiers SQL positions (60 positions)
- [x] Exécuter insertions dans Supabase
- [x] Valider cohérence et intégrité

### 6.6 Tests Lévis 🔄 **PROCHAINE ÉTAPE**
- [ ] Tests infrastructure `/levis/test-politique-municipal`
- [ ] Validation isolation données
- [ ] Tests calculs politiques et graphique compass

**🎯 Statut Phase 6 :** Données insérées avec succès dans Supabase, prêt pour tests

---

## 🔧 Phase 7: Validation globale et optimisation

### 7.1 Tests d'intégration multi-municipalités
- [ ] Tester navigation entre toutes les municipalités
- [ ] Valider isolation complète des données
- [ ] Vérifier performance avec 6 municipalités actives
- [ ] Tester redirections et middleware
- [ ] Valider calculs politiques pour chaque municipalité

### 7.2 Qualité et cohérence des données
- [ ] Audit qualité des 5 nouvelles municipalités
- [ ] Validation cohérence des positions politiques
- [ ] Vérification sources et citations
- [ ] Tests de régression complets
- [ ] Validation questions spécifiques pertinentes

### 7.3 Documentation et livraison
- [ ] Documenter méthodologie de recherche
- [ ] Créer guide de maintenance des données
- [ ] Documenter toutes les sources par municipalité
- [ ] Préparer guide d'ajout de nouvelles municipalités
- [ ] Archiver tous les fichiers SQL créés

---

## 📊 Métriques de succès

### Objectifs quantitatifs
- [x] 5 municipalités avec données complètes (100% - 5/5 municipalités : Montréal, Laval, Gatineau, Lévis, Longueuil)
- [x] ~127 questions total (21 Québec + 21 Montréal + 21 Laval + 22 Gatineau + 20 Lévis + 21 Longueuil = 126)
- [x] ~19 partis municipaux total (19 partis créés)
- [x] ~401+ positions politiques total (401+ positions créées)
- [ ] 100% isolation des données validée
- [ ] 0 erreurs de navigation ou calculs

### Objectifs qualitatifs
- [ ] Données politiques précises et à jour (2021-2025)
- [ ] Sources fiables documentées pour chaque position
- [ ] Questions adaptées au contexte local de chaque municipalité
- [ ] Positions reflétant la réalité politique municipale
- [ ] UX cohérente sur toutes les municipalités
- [ ] Neutralité politique maintenue dans toutes les questions

---

## 📝 Notes et considérations

### Points d'attention
1. **Neutralité politique** : Toutes les questions doivent être formulées de manière neutre
2. **Sources fiables** : Privilégier sources officielles et médias reconnus
3. **Actualité** : Prioriser informations récentes (2021-2025)
4. **Cohérence** : Maintenir structure similaire entre municipalités
5. **3e lien** : Question partagée entre Québec et Lévis avec perspectives adaptées

### Risques identifiés
- Manque de données publiques pour certains partis mineurs
- Positions ambiguës nécessitant interprétation
- Changements de positions politiques récents non documentés
- Partis nouveaux sans historique clair

### Stratégies de mitigation
- Utiliser "IDK" (Ne sais pas) quand position non claire
- Documenter toutes les sources pour traçabilité
- Prioriser déclarations officielles et plateformes électorales
- Valider avec plusieurs sources quand possible

---

## 🚀 État d'avancement global

**Progression totale : 95%** 🚀

- [x] Plan détaillé créé et documenté
- [x] **Phase 1 : Préparation base commune (100%)**
- [x] **Phase 2 : Montréal (95% - données en base, tests restants)**
- [x] **Phase 3 : Laval (95% - données en base, tests restants)**
- [x] **Phase 4 : Gatineau (95% - données en base, tests restants)**
- [x] **Phase 5 : Longueuil (95% - données en base, tests restants)**
- [x] **Phase 6 : Lévis (95% - données en base, tests restants)**
- [ ] Phase 7 : Validation globale (0%)

## 📈 **Détail progression Phases 2-3-4-5-6**
**Montréal :**
- ✅ Recherche partis : 100% (5 partis identifiés)
- ✅ Questions adaptées : 100% (21 questions)
- ✅ Positions calculées : 100% (105 positions)
- ✅ Scripts SQL créés et exécutés : 100%
- ⏳ Tests finaux : 0% (prochaine étape)

**Laval :**
- ✅ Recherche partis : 100% (3 partis identifiés)
- ✅ Questions adaptées : 100% (21 questions)
- ✅ Positions calculées : 100% (63 positions)
- ✅ Scripts SQL créés et exécutés : 100%
- ⏳ Tests finaux : 0% (prochaine étape)

**Gatineau :**
- ✅ Recherche partis : 100% (2 partis identifiés)
- ✅ Questions adaptées : 100% (22 questions)
- ✅ Positions calculées : 100% (44 positions)
- ✅ Scripts SQL créés et exécutés : 100%
- ⏳ Tests finaux : 0% (prochaine étape)

**Lévis :**
- ✅ Recherche partis : 100% (3 partis identifiés)
- ✅ Questions adaptées : 100% (20 questions)
- ✅ Positions calculées : 100% (60 positions)
- ✅ Scripts SQL créés et exécutés : 100%
- ⏳ Tests finaux : 0% (prochaine étape)

**Longueuil :**
- ✅ Recherche partis : 100% (2 partis identifiés)
- ✅ Questions adaptées : 100% (21 questions)
- ✅ Positions calculées : 100% (42 positions)
- ✅ Scripts SQL créés et exécutés : 100%
- ⏳ Tests finaux : 0% (prochaine étape)

## 🔄 **Méthodologie éprouvée et finalisée**
Les Phases 2-3-4-5-6 ont validé notre approche complète :
1. **Recherche web** avec sources fiables (Radio-Canada, Le Devoir, La Presse, médias locaux)
2. **Adaptation terminologique** selon contexte municipal
3. **Questions spécifiques** adaptées aux enjeux locaux prioritaires
4. **Analyse positions** basée sur plateformes officielles et déclarations récentes
5. **Scripts SQL** structurés pour insertion massive avec préfixes municipaux
6. **Documentation** complète avec sources traçables pour chaque position

**Prochaines étapes suggérées :** Tests via `/montreal/`, `/laval/`, `/gatineau/`, `/longueuil/` et `/levis/test-politique-municipal`

---

*Document de travail - Mise à jour continue pendant l'exécution du projet*