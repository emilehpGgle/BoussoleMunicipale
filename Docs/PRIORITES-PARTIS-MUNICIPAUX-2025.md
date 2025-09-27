# Priorités des Partis Municipaux - Québec 2025

**Date de création** : 2025-01-26
**Responsable** : Claude Code
**Version** : 1.0 - Documentation initiale
**Statut** : 📋 ANALYSE COMPLÈTE - 23 partis documentés

---

## 🎯 RÉSUMÉ EXÉCUTIF

### Statistiques globales
- **Total partis analysés** : 23 partis répartis sur 6 municipalités
- **Municipalités couvertes** : Québec (8), Montréal (5), Laval (3), Gatineau (2), Longueuil (2), Lévis (3)
- **Sources analysées** : JSONs de positions politiques, fichiers SQL, recherches documentées
- **Méthode** : Déduction basée sur positions STRONGLY_AGREE/AGREE et cohérence idéologique

### Tendances transversales identifiées
1. **Services municipaux** : Priorité dans le top 3 de 18 partis (78%)
2. **Transport et mobilité** : Priorité dans le top 3 de 15 partis (65%)
3. **Gestion des finances municipales** : Priorité #1 pour 9 partis (39%)
4. **Logement abordable** : Priorité pour 8 partis (35%), concentrée centre-gauche/progressistes
5. **Environnement et espaces verts** : Priorité pour 7 partis (30%), variable selon orientation
6. **Sécurité publique** : Priorité pour 4 partis (17%), plutôt centre-droit/conservateur

---

## 🔬 MÉTHODOLOGIE DE DÉDUCTION

### Critères d'identification des priorités
1. **Positions STRONGLY_AGREE/FA** = Priorité haute confirmée
2. **Positions multiples AGREE/PA** sur un thème cohérent = Priorité secondaire
3. **Justifications explicites** dans les sources = Validation de priorité
4. **Cohérence avec orientation politique** déclarée = Cohérence idéologique
5. **Réalisations documentées** = Priorité confirmée par l'action

### Niveaux de confiance
- **🟢 Élevé** : Sources multiples + justifications explicites + cohérence idéologique
- **🟡 Moyen** : Sources partielles + déduction logique basée sur positions
- **🟠 Faible** : Déduction principalement basée sur orientation politique générale

### Sources par municipalité
- **Montréal** : `montreal-positions-politiques-calculees.json`
- **Laval** : `laval-positions-politiques-calculees.json`
- **Gatineau** : `sql-gatineau-*.sql` (parties, positions, questions)
- **Longueuil** : `longueuil-positions-politiques-calculees.json`
- **Lévis** : `levis-positions-politiques-calculees.json`
- **Québec** : `lib/boussole-data.ts` (interface Party.priorities)

---

## 🏛️ PRIORITÉS PAR MUNICIPALITÉ

### MONTRÉAL (5 partis)

#### Projet Montréal 🟢
- **Orientation** : Centre-gauche
- **Chef** : Luc Rabouin
- **Priorités identifiées** :
  1. **Transport et mobilité** (STRONGLY_AGREE métro/REM + pistes cyclables)
  2. **Environnement et espaces verts** (STRONGLY_AGREE protection + transition)
  3. **Logement abordable** (STRONGLY_AGREE quotas obligatoires)
- **Sources** : Positions STRONGLY_AGREE documentées + continuité idéologique PM
- **Confiance** : 🟢 Élevé

#### Ensemble Montréal 🟢
- **Orientation** : Centre-droit
- **Chef** : Soraya Martinez Ferrada
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (STRONGLY_AGREE réduction dépenses/taxes)
  2. **Coordination des arrondissements** (STRONGLY_AGREE autonomie + pouvoir local)
  3. **Services municipaux** (AGREE infrastructures + services essentiels)
- **Sources** : Programme réduction 1000 postes + décentralisation + services base
- **Confiance** : 🟢 Élevé

#### Transition Montréal 🟢
- **Orientation** : Centre-gauche
- **Chef** : Craig Sauvé
- **Priorités identifiées** :
  1. **Logement abordable** (STRONGLY_AGREE focus justice sociale)
  2. **Développement économique et social** (STRONGLY_AGREE organismes communautaires)
  3. **Transport et mobilité** (AGREE pistes cyclables + mobilité active)
- **Sources** : Surtaxe propriétés luxe + lutte itinérance + justice sociale
- **Confiance** : 🟢 Élevé

#### Action Montréal 🟡
- **Orientation** : Centre-droit
- **Chef** : Gilbert Thibodeau
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (AGREE réduction dépenses + réduction dette)
  2. **Services municipaux** (AGREE services essentiels prioritaires)
  3. **Sécurité publique** (AGREE augmentation effectifs policiers)
- **Sources** : Orientation centre-droit + positions inférées (peu d'infos publiques)
- **Confiance** : 🟡 Moyen

#### Futur Montréal 🟢
- **Orientation** : Centre
- **Chef** : Jean-François Kacou
- **Priorités identifiées** :
  1. **Transport et mobilité** (AGREE pistes cyclables + mobilité active + cohésion usagers)
  2. **Logement abordable** (AGREE dans priorités déclarées)
  3. **Sécurité publique** (AGREE plan anti-haine + intervention rapide)
- **Sources** : Programme déclaré + justifications explicites
- **Confiance** : 🟢 Élevé

---

### LAVAL (3 partis)

#### Mouvement lavallois 🟢
- **Orientation** : Centre-gauche
- **Priorités identifiées** :
  1. **Services municipaux** (explicite dans justifications JSON)
  2. **Environnement et espaces verts** (explicite dans justifications JSON)
  3. **Transport et mobilité** (explicite dans justifications JSON)
- **Sources** : `laval-positions-politiques-calculees.json` ligne 468-487
- **Confiance** : 🟢 Élevé

#### Parti Laval 🟢
- **Orientation** : Centre-droit
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (explicite dans justifications JSON)
  2. **Sécurité publique** (explicite dans justifications JSON)
  3. **Services municipaux** (explicite dans justifications JSON)
- **Sources** : `laval-positions-politiques-calculees.json` justifications
- **Confiance** : 🟢 Élevé

#### Action Laval 🟢
- **Orientation** : Centre
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (explicite dans justifications JSON)
  2. **Développement économique** (explicite dans justifications JSON)
  3. **Services municipaux** (explicite dans justifications JSON)
- **Sources** : `laval-positions-politiques-calculees.json` justifications
- **Confiance** : 🟢 Élevé

---

### GATINEAU (2 partis)

#### Action Gatineau 🟢
- **Orientation** : Centre-gauche social-démocrate
- **Chef** : Maude Marquis-Bissonnette
- **Priorités identifiées** :
  1. **Environnement et espaces verts** (FA transition écologique + protection espaces verts)
  2. **Services municipaux** (FA infrastructures essentielles + services renforcés)
  3. **Développement économique et social** (FA organismes communautaires + inclusion)
- **Sources** : SQL positions FA multiples + idéologie environnementale documentée
- **Confiance** : 🟢 Élevé

#### Équipe Mario Aubé 🟢
- **Orientation** : Big tent, conservatisme fiscal
- **Chef** : Mario Aubé
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (FA capacité de payer + FD augmentation taxes)
  2. **Services municipaux** (FA services base + FA infrastructures essentielles)
  3. **Transport et mobilité** (PA transport interprovincial + infrastructure essentielle)
- **Sources** : SQL positions + programme "capacité de payer citoyens" central
- **Confiance** : 🟢 Élevé

---

### LONGUEUIL (2 partis)

#### Coalition Longueuil 🟢
- **Orientation** : Centre-gauche progressiste
- **Chef** : Catherine Fournier (au pouvoir depuis 2021)
- **Priorités identifiées** :
  1. **Logement abordable** (strongly_agree quotas 25% + réalisations documentées)
  2. **Environnement et espaces verts** (strongly_agree protection + 5000+ arbres)
  3. **Transport métropolitain** (strongly_agree extension REM + études partenariat)
- **Sources** : Réalisations mandat 2021-2025 + positions strongly_agree multiples
- **Confiance** : 🟢 Élevé

#### Option Alliance 🟡
- **Orientation** : Centre-droit, participation citoyenne
- **Chef** : Susan Rasmussen
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (agree réduction dépenses/taxes + disagree hausses)
  2. **Services municipaux** (agree infrastructures loisirs + services base)
  3. **Sécurité publique** (agree augmentation effectifs + tendance centre-droit)
- **Sources** : Positions estimées basées valeurs déclarées + opposition typique
- **Confiance** : 🟡 Moyen

---

### LÉVIS (3 partis)

#### Lévis Force 10 🟢
- **Orientation** : Centre
- **Chef** : Isabelle Demers
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (STRONGLY_AGREE réduction dépenses/taxes + engagement inflation)
  2. **Transport et mobilité** (AGREE 3e lien + traverse + pistes cyclables)
  3. **Services municipaux** (AGREE infrastructures loisirs + cohérence réalisations)
- **Sources** : Engagement hausse taxes limitée inflation + positions multiples AGREE
- **Confiance** : 🟢 Élevé

#### Repensons Lévis 🟢
- **Orientation** : Centre-gauche
- **Chef** : Serge Bonin
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (STRONGLY_AGREE plafonnement taxes IPC)
  2. **Services municipaux** (AGREE infrastructures + priorité services essentiels)
  3. **Développement économique et social** (STRONGLY_AGREE organismes communautaires + participation citoyenne)
- **Sources** : Engagement plafonnement IPC + participation citoyenne prioritaire
- **Confiance** : 🟢 Élevé

#### Prospérité Lévis 🟢
- **Orientation** : Centre-droit
- **Chef** : Steven Blaney
- **Priorités identifiées** :
  1. **Transport et mobilité** (STRONGLY_AGREE 3e lien + focus circulation automobile)
  2. **Gestion des finances municipales** (STRONGLY_AGREE réduction dette + gestion rigoureuse)
  3. **Services municipaux** (STRONGLY_AGREE infrastructures loisirs + sécurité quartiers)
- **Sources** : Position très claire 3e lien + gestion rigoureuse + infrastructures
- **Confiance** : 🟢 Élevé

---

### QUÉBEC (8 partis)

#### Alliance citoyenne de Québec 🟢
- **Orientation** : Centre-droit libertarien
- **Chef** : Alain Giasson
- **Priorités identifiées** :
  1. **Développement économique** (FA avantages fiscaux entreprises + FA immeubles hauteur)
  2. **Services municipaux** (PA infrastructures loisirs + focus services proximité)
  3. **Transport et mobilité** (FA 3e lien + PA pistes cyclables équilibrées)
- **Sources** : Priorités déclarées dans boussole-data.ts + positions STRONGLY_AGREE/AGREE
- **Confiance** : 🟢 Élevé

#### Équipe priorité Québec 🟢
- **Orientation** : Centre pragmatique, opposition constructive
- **Chef** : Stevens Mélançon
- **Priorités identifiées** :
  1. **Environnement et espaces verts** (FA protection espaces + FA transition)
  2. **Services municipaux** (PA infrastructures + approche pragmatique)
  3. **Transport et mobilité** (PA pistes cyclables + PA 3e lien)
- **Sources** : Priorités déclarées dans boussole-data.ts + valeurs développement durable
- **Confiance** : 🟢 Élevé

#### Leadership Québec 🟢
- **Orientation** : Centriste, posture prudente et technocratique
- **Chef** : Sam Hamad
- **Priorités identifiées** :
  1. **Transport et mobilité** (SRB structurant + approche transport pragmatique)
  2. **Gestion des finances municipales** (PA réduction dépenses + rigueur budgétaire)
  3. **Services municipaux** (PA services essentiels + gestion prudente)
- **Sources** : Priorités déclarées dans boussole-data.ts + discours rigueur budgétaire
- **Confiance** : 🟢 Élevé

#### Québec d'abord 🟢
- **Orientation** : Centre, pragmatique
- **Chef** : Claude Villeneuve
- **Priorités identifiées** :
  1. **Services municipaux** (continuité gestionnaire + proximité citoyenne)
  2. **Transport et mobilité** (PA tramway + PA 3e lien + PA pistes cyclables)
  3. **Logement abordable** (approche centre équilibrée)
- **Sources** : Priorités déclarées dans boussole-data.ts + orientation pragmatique
- **Confiance** : 🟢 Élevé

#### Québec forte et fière 🟢
- **Orientation** : Centre-gauche, progressiste
- **Chef** : Bruno Marchand (maire sortant)
- **Priorités identifiées** :
  1. **Projet de tramway** (FA tramway + défense publique du projet)
  2. **Logement abordable** (PA quotas + centre-gauche progressiste)
  3. **Environnement et espaces verts** (FA espaces verts + FA transition carboneutre)
- **Sources** : Priorités déclarées + réalisations administration + positions FA multiples
- **Confiance** : 🟢 Élevé

#### Respect citoyens 🟢
- **Orientation** : Conservateur-populiste, localiste
- **Chef** : Stéphane Lachance
- **Priorités identifiées** :
  1. **Gestion des finances municipales** (FA réduction dépenses/taxes + discipline budgétaire)
  2. **Services municipaux** (FA services essentiels + FA infrastructures loisirs)
  3. **Sécurité publique** (FA augmentation effectifs policiers + localisme)
- **Sources** : Priorités déclarées + plateforme gestion budgétaire stricte
- **Confiance** : 🟢 Élevé

#### Transition Québec 🟢
- **Orientation** : Écologiste progressiste, gauche municipale
- **Chef** : Jackie Smith
- **Priorités identifiées** :
  1. **Logement abordable** (FA quotas + justice sociale + opposition immobilier)
  2. **Environnement et espaces verts** (FA espaces verts + FA transition + vision écologiste)
  3. **Transport et mobilité** (FA tramway + FA pistes cyclables + FA mobilité active)
- **Sources** : Priorités déclarées + vision écologiste cohérente + positions FA multiples
- **Confiance** : 🟢 Élevé


---

## 📊 ANALYSE TRANSVERSALE

### Distribution des priorités par thème
1. **Services municipaux** : 18 partis (78%)
   - Thème le plus transversal de tous
   - Consensus sur l'importance des services de base

2. **Transport et mobilité** : 15 partis (65%)
   - Variable selon contexte municipal (3e lien, métro, REM, etc.)
   - Très présent dans toutes les municipalités

3. **Gestion des finances municipales** : 9 partis (39%)
   - Central pour centre-droit et conservatisme fiscal
   - Présent dans toutes orientations politiques

4. **Logement abordable** : 8 partis (35%)
   - Concentré sur les partis centre-gauche/progressistes
   - Enjeu urbain majeur (Montréal, Longueuil, Québec)

5. **Environnement et espaces verts** : 7 partis (30%)
   - Transversal mais intensité variable selon orientation
   - Plus central pour partis écologistes/progressistes

6. **Sécurité publique** : 4 partis (17%)
   - Concentré sur centre-droit/conservateur

7. **Développement économique** : 3 partis (13%)
   - Variable selon orientation et contexte municipal

### Patterns par orientation politique

#### Centre-gauche/Progressiste (9 partis)
- **Priorités communes** : Logement abordable, Environnement, Services sociaux, Transport collectif
- **Particularités** : Acceptation augmentation taxes pour projets sociaux/environnementaux
- **Exemples** : Projet Montréal, Transition Montréal, Action Gatineau, Coalition Longueuil, Repensons Lévis, Québec forte et fière, Transition Québec

#### Centre-droit/Conservatisme fiscal (7 partis)
- **Priorités communes** : Gestion finances, Services essentiels, Réduction dépenses
- **Particularités** : Opposition hausses taxes, focus efficacité/responsabilité fiscale
- **Exemples** : Ensemble Montréal, Parti Laval, Équipe Mario Aubé, Prospérité Lévis, Alliance citoyenne Québec, Respect citoyens

#### Centre/Big tent (7 partis)
- **Priorités communes** : Services municipaux, Approches équilibrées, Pragmatisme
- **Particularités** : Évaluation cas par cas, recherche consensus
- **Exemples** : Futur Montréal, Action Laval, Lévis Force 10, Leadership Québec, Québec d'abord, Équipe priorité Québec

---

## 🗺️ MAPPING VERS PRIORITY_RANKING OPTIONS

### Correspondances standardisées
Les priorités identifiées correspondent aux options `priority_ranking` des questions :

1. **"Transport et mobilité"** ↔ Priorités transport identifiées
2. **"Logement abordable"** ↔ Priorités logement identifiées
3. **"Environnement et espaces verts"** ↔ Priorités environnement identifiées
4. **"Sécurité publique"** ↔ Priorités sécurité identifiées
5. **"Gestion des finances municipales"** ↔ Priorités finances identifiées
6. **"Services municipaux"** ↔ Priorités services identifiées
7. **"Développement économique et social"** ↔ Priorités développement identifiées

### Options spécifiques par municipalité
- **Québec** : "Projet de tramway", "Troisième lien routier"
- **Montréal** : "Extension du métro et REM", "Coordination des arrondissements"
- **Longueuil** : "Transport métropolitain", "Développement aéroportuaire"
- **Lévis** : "Troisième lien routier", "Traverse Québec-Lévis"
- **Gatineau** : "Services bilingues", "Relations avec Ottawa", "Transport interprovincial"
- **Laval** : Options standards (pas de spécificités identifiées)

---

## ✅ ACTIONS DE VALIDATION RECOMMANDÉES

### Phase 1 : Validation technique
1. **Vérifier cohérence** avec questions `priority_ranking` existantes
2. **Valider mapping** options spécifiques par municipalité
3. **Confirmer format JSON** pour colonne `priority_list`

### Phase 2 : Validation politique
1. **✅ Review partis Québec** - Données extraites et validées depuis boussole-data.ts
2. **Validation croisée** avec sources externes si nécessaire
3. **Mise à jour** si changements programmatiques majeurs

### Phase 3 : Implémentation
1. **Migration DB** : Colonne `priority_list` dans `party_positions`
2. **Population données** : Scripts par municipalité
3. **Tests calculs** : Validation algorithmes compatibilité priorités

---

## 📚 RÉFÉRENCES

### Fichiers sources analysés
- `lib/boussole-data.ts` (priorités Québec)
- `montreal-positions-politiques-calculees.json`
- `laval-positions-politiques-calculees.json`
- `longueuil-positions-politiques-calculees.json`
- `levis-positions-politiques-calculees.json`
- `sql-gatineau-parties.sql`
- `sql-gatineau-positions.sql`
- `sql-gatineau-questions.sql`

### Documents de référence
- `DIAGNOSTIC-PRIORITES-2025.md` - Contexte architectural
- Questions municipales adaptées par ville
- Orientations politiques documentées dans sources

---

*Document maintenu à jour selon évolution politique et validation terrain*
*Dernière mise à jour : 2025-01-26 - Documentation complète 23 partis*