# Diagnostic Architecture Priorités - Boussole Municipale

**Date de création** : 2025-01-26
**Responsable** : Claude Code
**Version** : 1.0 - Diagnostic Initial
**Statut** : 🔴 PROBLÈME CRITIQUE IDENTIFIÉ

## 📋 RÉSUMÉ EXÉCUTIF

**Problème critique découvert** : Les calculs de compatibilité des priorités retournent des scores incorrects pour toutes les municipalités car les priorités des partis ne sont pas stockées correctement en base de données.

**Symptômes observés** :
- Scores de priorités toujours à ~50% (neutre) au lieu de valeurs différenciées
- Calculs politiques faussés pour toutes les municipalités
- Interface utilisateur montre "Aucune priorité définie" pour les partis

**Cause racine** : Architecture incohérente entre les données préparées (JSONs) et leur stockage en DB (positions = "N").

**Solution retenue** : Nouvelle colonne `priority_list` (JSON) dans `party_positions`. 

---

## 🔍 ANALYSE TECHNIQUE DÉTAILLÉE

### Problème #1 : Questions priorités correctes, positions partis incorrectes

**Questions `priority_ranking` correctement configurées** :
```json
{
  "id": "lng_enjeux_prioritaires",
  "response_type": "priority_ranking",
  "priority_options": [
    "Transport et mobilité",
    "Logement abordable",
    "Environnement et espaces verts",
    "Sécurité publique",
    "Gestion des finances municipales",
    "Services municipaux",
    "Lutte aux changements climatiques",
    "Patrimoine et identité",
    "Transport métropolitain",
    "Développement aéroportuaire"
  ]
}
```

**MAIS positions des partis incorrectes en DB** :
```json
{
  "party_id": "option_alliance_lng",
  "question_id": "lng_enjeux_prioritaires",
  "position": "N",  // ❌ PROBLÈME : devrait contenir les vraies priorités
  "note": "Question de classement des priorités selon les préférences des électeurs."
}
```

### Problème #2 : Code cherche données inexistantes

**Le code actuel cherche** :
```typescript
// Dans app/[municipality]/resultats/page.tsx ligne ~233
const priorityScore = calculatePriorityCompatibility(userPriorities, party.priorities || [])
//                                                                    ^^^^^^^^^^^^^
// ❌ PROBLÈME : colonne 'priorities' n'existe pas dans table 'parties'
```

**Résultat** : `party.priorities` = `undefined` → `[]` → score toujours neutre (50)

### Problème #3 : Données existantes mais mal stockées

**Nous AVONS les priorités dans les JSONs** (exemple Laval) :
```json
{
  "question_id": "lav_enjeux_prioritaires",
  "mouvement_lavallois": {
    "justification": "Priorités: Services municipaux, Environnement espaces verts, Transport mobilité"
  },
  "parti_laval": {
    "justification": "Priorités: Gestion finances municipales, Sécurité publique, Services municipaux"
  }
}
```

**MAIS** ces priorités ne sont pas transférées correctement en DB lors des migrations.

---

## 🏗️ ARCHITECTURE ACTUELLE VS ATTENDUE

### Architecture Actuelle (Problématique)

```
questions (✅ Correctes)
├── id: "mtl_enjeux_prioritaires"
├── response_type: "priority_ranking"
└── priority_options: ["Transport", "Logement", ...]

parties (❌ Manque colonne priorities)
├── id: "projet_montreal_mtl"
├── name: "Projet Montréal"
└── [PAS DE COLONNE PRIORITIES]

party_positions (❌ Priorités mal stockées)
├── party_id: "projet_montreal_mtl"
├── question_id: "mtl_enjeux_prioritaires"
├── position: "N"  // ❌ Devrait contenir les vraies priorités
└── note: "Question de classement..."

Code (❌ Cherche au mauvais endroit)
└── party.priorities // ❌ Cette colonne n'existe pas
```

### Architecture Cible (Solution)

```
questions (✅ Inchangées)
├── Identique à l'actuel
└── ...

parties (✅ Inchangées)
├── On garde la structure actuelle
└── ...

party_positions (✅ NOUVELLE COLONNE)
├── party_id: "projet_montreal_mtl"
├── question_id: "mtl_enjeux_prioritaires"
├── position: "N" // ✅ Garde l'ancien pour compatibilité
├── priority_list: ["Transport", "Logement", "Environnement"] // ✅ NOUVEAU
└── note: "..."

Code (✅ MODIFIÉ)
├── Cherche dans party_positions avec question_id priority_ranking
├── Extrait depuis nouvelle colonne priority_list
└── Calcule compatibilité avec vraies données
```

---

## 📊 DONNÉES DISPONIBLES PAR MUNICIPALITÉ

### Quebec ✅ **PRIORITÉS IDENTIFIÉES**
- **Statut** : Données extraites depuis architecture existante
- **Fichier source** : `lib/boussole-data.ts` (interface Party.priorities)
- **Priorités identifiées** :
  - **Alliance citoyenne de Québec** : Développement économique, Services municipaux, Transport et mobilité
  - **Équipe priorité Québec** : Environnement et espaces verts, Services municipaux, Transport et mobilité
  - **Leadership Québec** : Transport et mobilité, Gestion des finances municipales, Services municipaux
  - **Québec d'abord** : Services municipaux, Transport et mobilité, Logement abordable
  - **Québec forte et fière** : Projet de tramway, Logement abordable, Environnement et espaces verts
  - **Respect citoyens** : Gestion des finances municipales, Services municipaux, Sécurité publique
  - **Transition Québec** : Logement abordable, Environnement et espaces verts, Transport et mobilité
- **Action requise** : Migration depuis code TypeScript vers DB avec nouvelle colonne priority_list

### Montreal ✅ **PRIORITÉS IDENTIFIÉES**
- **Statut** : Données préparées dans JSONs mais pas en DB
- **Fichier source** : `montreal-positions-politiques-calculees.json`
- **Priorités identifiées** :
  - **Projet Montréal** : Transport et mobilité, Environnement et espaces verts, Logement abordable
  - **Ensemble Montréal** : Gestion des finances municipales, Coordination des arrondissements, Services municipaux
  - **Transition Montréal** : Logement abordable, Développement économique et social, Transport et mobilité
  - **Action Montréal** : Gestion des finances municipales, Services municipaux, Sécurité publique
  - **Futur Montréal** : Transport et mobilité, Logement abordable, Sécurité publique
- **Action requise** : Migration depuis JSON vers DB

### Laval ✅ **EXEMPLE COMPLET TROUVÉ**
- **Statut** : Données complètes dans `laval-positions-politiques-calculees.json`
- **Priorités identifiées** :
  - **Mouvement lavallois** : Services municipaux, Environnement espaces verts, Transport mobilité
  - **Parti Laval** : Gestion finances municipales, Sécurité publique, Services municipaux
  - **Action Laval** : Gestion finances municipales, Développement économique, Services municipaux
- **Action requise** : Migration depuis JSON ligne 468-487

### Gatineau ✅ **PRIORITÉS IDENTIFIÉES**
- **Statut** : Données analysées depuis fichiers SQL
- **Fichiers sources** : `sql-gatineau-parties.sql`, `sql-gatineau-positions.sql`, `sql-gatineau-questions.sql`
- **Priorités identifiées** :
  - **Action Gatineau** : Environnement et espaces verts, Services municipaux, Développement économique et social
  - **Équipe Mario Aubé** : Gestion des finances municipales, Services municipaux, Transport et mobilité
- **Action requise** : Migration depuis fichiers SQL vers DB avec nouvelle colonne priority_list

### Longueuil ✅ **PRIORITÉS IDENTIFIÉES**
- **Statut** : Données analysées depuis JSONs
- **Fichier source** : `longueuil-positions-politiques-calculees.json`
- **Priorités identifiées** :
  - **Coalition Longueuil** : Logement abordable, Environnement et espaces verts, Transport métropolitain
  - **Option Alliance** : Gestion des finances municipales, Services municipaux, Sécurité publique
- **Action requise** : Migration depuis JSON vers DB

### Lévis ✅ **PRIORITÉS IDENTIFIÉES**
- **Statut** : Données analysées depuis JSONs
- **Fichier source** : `levis-positions-politiques-calculees.json`
- **Priorités identifiées** :
  - **Lévis Force 10** : Gestion des finances municipales, Transport et mobilité, Services municipaux
  - **Repensons Lévis** : Gestion des finances municipales, Services municipaux, Développement économique et social
  - **Prospérité Lévis** : Transport et mobilité, Gestion des finances municipales, Services municipaux
- **Action requise** : Migration depuis JSON vers DB

---

## 🔧 SOLUTION TECHNIQUE RETENUE

### Choix Architecture : Nouvelle Colonne `priority_list` dans `party_positions`

**Avantages** :
- ✅ Cohérent avec architecture existante (toutes positions au même endroit)
- ✅ Permet métadonnées riches (source, note, quote)
- ✅ Support naturel multi-municipalités
- ✅ Pas de modification structure tables principales
- ✅ Rollback facile si problème

**Format de données** :
```json
{
  "priority_list": [
    "Transport et mobilité",
    "Logement abordable",
    "Environnement et espaces verts"
  ]
}
```

### Rejet Alternative : Colonne dans `parties`

**Pourquoi rejeté** :
- ❌ Moins flexible (une seule priorité par parti vs par municipalité)
- ❌ Plus de modifications structurelles
- ❌ Perd cohérence avec architecture positions
- ❌ Migration plus complexe

---

## 🚀 PLAN D'IMPLÉMENTATION

### Phase 1 : Migration DB Sécuritaire
1. **Nouvelle colonne** : `ALTER TABLE party_positions ADD COLUMN priority_list JSON`
2. **Scripts par municipalité** : 007_quebec, 008_montreal, 009_laval, etc.
3. **Validation** : Requêtes pour vérifier population correcte

### Phase 2 : Code Adaptation
1. **Fonction extraction** : `extractPartyPriorities()` dans `/lib/extract-priorities.ts`
2. **Modification calculs** : `app/[municipality]/resultats/page.tsx`
3. **Logs debug** : Pour tracer extraction priorités

### Phase 3 : Validation & Tests
1. **Tests unitaires** : Fonction extraction
2. **Tests intégration** : Calculs avec vraies données
3. **Validation utilisateur** : Scores différenciés attendus

---

## ⚠️ RISQUES ET MITIGATION

### Risques Identifiés
1. **Données incomplètes** : Certaines municipalités peuvent manquer de priorités
2. **Format inconsistant** : JSONs sources peuvent avoir formats différents
3. **Régression Quebec** : Modification peut casser calculs existants

### Stratégies Mitigation
1. **Fallback robuste** : Si priority_list vide, utiliser ancien système
2. **Migration incrémentale** : Une municipalité à la fois
3. **Validation croisée** : Comparer avant/après pour Quebec
4. **Logs extensifs** : Tracer chaque étape extraction priorités

---

## 📋 CHECKLIST IMPLÉMENTATION

### Phase 1 : DB Migration
- [ ] Créer migration 006_add_priority_list_column.sql
- [ ] Créer migration 007_populate_quebec_priorities.sql
- [ ] Créer migration 008_populate_montreal_priorities.sql
- [ ] Créer migration 009_populate_laval_priorities.sql
- [ ] Appliquer migrations en sequence
- [ ] Valider population avec requêtes SQL

### Phase 2 : Code Changes
- [ ] Créer `/lib/extract-priorities.ts`
- [ ] Modifier `/app/[municipality]/resultats/page.tsx`
- [ ] Ajouter logs debug extensifs
- [ ] Tests unitaires fonction extraction

### Phase 3 : Validation
- [ ] Test Quebec non-régression
- [ ] Test Montreal/Laval scores différenciés
- [ ] Validation interface utilisateur
- [ ] Documentation résultats

---

## 📚 RÉFÉRENCES

### Fichiers Clés
- `laval-positions-politiques-calculees.json` : Exemple complet priorités
- `party_positions_rows_100_200.json` : État actuel DB (positions = "N")
- `app/[municipality]/resultats/page.tsx` : Code calculs priorités
- `lib/political-map-calculator.ts` : Fonction calculatePriorityCompatibility

### Migrations Existantes
- 001_add_political_columns.sql
- 002_populate_quebec_political_data.sql
- 003_populate_montreal_political_data.sql
- 004_populate_gatineau_political_data.sql
- 005_populate_laval_political_data.sql

---

## 📞 PROCHAINES ÉTAPES

1. **IMMÉDIAT** : Analyser tous les JSONs municipalités pour extraire priorités
2. **CRITIQUE** : Créer migrations DB avec priorités correctes
3. **URGENT** : Adapter code pour lire nouvelles données
4. **VALIDATION** : Tests complets avant déploiement

---

*Document maintenu à jour au fur et à mesure de l'implémentation*
*Dernière mise à jour : 2025-01-26 - Diagnostic initial complet*