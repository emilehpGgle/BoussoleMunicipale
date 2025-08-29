# 🚀 Migration des données Supabase - Boussole Municipale

## 🚨 SITUATION URGENTE
Vos données Supabase sont corrompues (noms de partis supprimés, questions désynchronisées). Ces scripts SQL vont restaurer toutes vos données depuis `lib/boussole-data.ts`.

## 📋 ORDRE D'EXÉCUTION
**⚠️ IMPORTANT : Exécuter dans l'ordre exact suivant :**

### 1. `01-clean-data.sql`
- 🗑️ Supprime toutes les données corrompues
- ⚡ Respecte l'ordre des dépendances (positions → partis → questions)
- ✅ Prépare la base pour les nouvelles données

### 2. `02-insert-questions.sql`
- 📝 Insère vos 21 questions actualisées
- ✅ Inclut toutes les modifications 2025
- ✅ Formatage JSON correct pour les options

### 3. `03-insert-parties.sql`  
- 🏛️ Restaure les 7 partis avec noms complets
- ✅ Données complètes : leaders, logos, orientations, forces/réserves
- ✅ Formatage JSON pour les arrays

### 4. `04-insert-party-positions.sql`
- 📊 Synchronise toutes les positions des partis (147 positions)
- ✅ Positions actualisées 2025
- ✅ Sources et notes détaillées

## 🖥️ MÉTHODES D'EXÉCUTION

### Option 1 : Interface Supabase (Recommandée)
1. Aller sur [supabase.com](https://supabase.com)
2. Sélectionner votre projet
3. Aller dans **SQL Editor**
4. Copier-coller le contenu de chaque fichier
5. Cliquer **Run** pour chaque script

### Option 2 : CLI Supabase
```bash
supabase db push --file scripts/01-clean-data.sql
supabase db push --file scripts/02-insert-questions.sql  
supabase db push --file scripts/03-insert-parties.sql
supabase db push --file scripts/04-insert-party-positions.sql
```

## ✅ VÉRIFICATIONS

Après chaque script, vérifiez les résultats :

**Après nettoyage (01):**
- Questions : 0
- Partis : 0  
- Positions : 0

**Après questions (02):**
- Questions : 21

**Après partis (03):**
- Partis : 7

**Après positions (04):**
- Positions : 147 (21 questions × 7 partis)

## 🎯 DONNÉES RESTAURÉES

### Questions (21)
- ✅ Toutes les questions révisées 2025
- ✅ Catégories correctes
- ✅ Types de réponse (agreement, priority_ranking)
- ✅ Options et labels personnalisés

### Partis (7)
- ✅ **Alliance citoyenne de Québec** (ACQ)
- ✅ **Équipe priorité Québec** (EPQ)  
- ✅ **Leadership Québec - Équipe Sam Hamad** (LQ)
- ✅ **Québec d'abord** (QD)
- ✅ **Québec forte et fière** (QFF)
- ✅ **Respect citoyens** (RC)
- ✅ **Transition Québec** (TQ)

### Positions (147)
- ✅ Position politique sur chaque question
- ✅ Sources documentées
- ✅ Notes explicatives
- ✅ Citations quand disponibles

## 🚨 EN CAS DE PROBLÈME

Si un script échoue :
1. **STOP** - N'exécutez pas les suivants
2. Vérifiez les erreurs SQL
3. Corrigez les apostrophes/guillemets si nécessaire
4. Recommencez depuis `01-clean-data.sql`

## 🎉 APRÈS LA MIGRATION

Votre application devrait fonctionner normalement :
- ✅ Questionnaire avec 21 questions
- ✅ 7 partis avec noms complets
- ✅ Calculs politiques fonctionnels
- ✅ Résultats et partage opérationnels

---

**⏰ Temps d'exécution estimé :** 2-5 minutes
**🔄 Source de vérité :** `lib/boussole-data.ts`
**📅 Données :** Actualisées janvier 2025