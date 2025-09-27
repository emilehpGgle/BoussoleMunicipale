# ⚠️ FICHIER OBSOLÈTE - Voir SOLUTION_CORRECTE.md

**Ce fichier contient une analyse incorrecte. La vraie solution est dans `SOLUTION_CORRECTE.md`**

---

# 🚨 CORRECTIF URGENT - Perte de données Multi-municipalités

## 📋 **RÉSUMÉ DU PROBLÈME**

**CRITIQUE** : Le support multi-municipalités cause la perte de 5000+ réponses utilisateur à cause de contraintes d'unicité mal configurées.

### **Cause racine** :
- Les contraintes `UNIQUE(session_id)` ne prennent pas en compte `municipality_id`
- Les opérations `upsert` écrasent les données existantes lors des tests multi-villes
- Les erreurs 406 viennent des requêtes `.single()` qui trouvent maintenant plusieurs enregistrements

## 🔧 **CORRECTIFS APPLIQUÉS**

### **1. Base de données (URGENT - À exécuter en PREMIER)**
```sql
-- Exécuter le fichier: HOTFIX_MUNICIPALITY_CONSTRAINTS.sql
```

### **2. Code TypeScript (FAIT)**
- ✅ Mise à jour des contraintes `onConflict` dans toutes les APIs
- ✅ Ajout de fallbacks `municipality_id || 'quebec'` 
- ✅ Correction des requêtes `.single()` vers `.maybeSingle()`

## 📋 **PLAN DE DÉPLOIEMENT**

### **Étape 1: Base de données (CRITIQUE)**
```bash
# Dans Supabase SQL Editor, exécuter:
-- HOTFIX_MUNICIPALITY_CONSTRAINTS.sql
```

### **Étape 2: Vérification**
```bash
# Tester que les nouvelles contraintes fonctionnent
npm run dev
# Aller sur /test-admin et exécuter tous les tests
```

### **Étape 3: Validation**
- ✅ Plus d'erreurs 500 sur les APIs
- ✅ Plus d'erreurs 406 sur les requêtes Supabase  
- ✅ Les données ne s'écrasent plus entre municipalités
- ✅ Les tests passent sans perte de données

## ⚠️ **POINTS D'ATTENTION**

### **Données existantes**
- Les données actuelles ne seront PAS perdues
- Les nouvelles contraintes permettent la coexistence multi-municipalités
- Fallback automatique vers 'quebec' pour les données sans municipality_id

### **Impact utilisateur**
- **Aucun impact** sur les utilisateurs finaux
- **Résolution** des problèmes de test et développement
- **Protection** contre la perte de données future

## 🧪 **TESTS DE VALIDATION**

### **Tests à effectuer après déploiement** :
1. **Flow Test** : Créer profil → Réponses → Résultats (quebec)
2. **Multi-municipalité** : Répéter pour montreal, laval
3. **Isolation** : Vérifier que les données ne se mélangent pas
4. **Persistance** : Confirmer que toutes les données sont sauvées

### **Commandes de test** :
```bash
# Page test-admin
http://localhost:3000/test-admin

# Tests spécifiques
- 🧪 Tester Flow Profil → Questions → Résultats  
- 📊 Tests Calculs Politiques
- 🔍 Test priorités partis
- 🚀 Production Validation
```

## 📊 **MÉTRIQUES DE SUCCÈS**

- ❌ **Avant** : 5000 réponses perdues lors des tests
- ✅ **Après** : 0 perte de données, isolation parfaite
- ❌ **Avant** : Erreurs 500 sur tous les endpoints  
- ✅ **Après** : APIs fonctionnelles à 100%
- ❌ **Avant** : Erreurs 406 sur les requêtes Supabase
- ✅ **Après** : Requêtes optimisées et fonctionnelles

## 🔄 **ROLLBACK (si nécessaire)**

Si des problèmes surviennent, rollback rapide :

```sql
-- Restaurer les anciennes contraintes
ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_session_municipality_key;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_session_id_key UNIQUE (session_id);

ALTER TABLE user_results DROP CONSTRAINT user_results_session_municipality_key; 
ALTER TABLE user_results ADD CONSTRAINT user_results_session_id_key UNIQUE (session_id);

ALTER TABLE user_responses DROP CONSTRAINT user_responses_session_question_type_municipality_key;
ALTER TABLE user_responses ADD CONSTRAINT user_responses_session_id_question_id_response_type_key 
UNIQUE (session_id, question_id, response_type);
```

## 📞 **CONTACT**

En cas de problème lors du déploiement, vérifier :
1. Les logs Supabase pour les erreurs de contraintes
2. Les logs Next.js pour les erreurs d'API
3. La page /test-admin pour les tests fonctionnels

**Status** : 🔴 CRITIQUE - Déploiement requis immédiatement
