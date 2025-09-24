# 🔧 Instructions d'Exécution - Scripts Montréal

## 🚨 Problèmes Résolus

**1. Erreur Foreign Key corrigée** : Le script des positions échouait car les questions de Montréal n'existaient pas encore dans la base de données.

**2. Conflit IDs génériques résolu** : Les questions génériques (`q2_`, `q4_`, etc.) existaient déjà pour Quebec, causant des erreurs de clés dupliquées.

**Solution appliquée :** Préfixage systématique avec `mtl_` pour toutes les questions génériques de Montréal.

## 📋 Ordre d'Exécution CORRECT

### Étape 1: Insérer les Questions Montréal (CRITIQUE)

```sql
-- Se connecter à Supabase et exécuter :
\i sql-montreal-questions.sql
```

**Résultat attendu :**
- ✅ 22 questions insérées (21 agreement + 1 priority_ranking)
- ✅ 3 questions spécifiques Montréal : `mtl_metro_rem`, `mtl_arrondissements_autonomie`, `mtl_festivals_equilibre`
- ✅ 18 questions génériques préfixées : `mtl_q2_pistes_cyclables`, `mtl_q4_priorite_mobilite_active`, etc.

### Étape 2: Insérer les Positions des Partis

```sql
-- Maintenant les Foreign Keys vont fonctionner :
\i sql-montreal-positions.sql
```

**Résultat attendu :**
- ✅ 105 positions insérées (5 partis × 21 questions)
- ✅ Aucune erreur Foreign Key
- ✅ Toutes les références question_id existantes

## 🔍 Vérification Post-Exécution

### Vérifier les Questions
```sql
SELECT COUNT(*) as total_questions_montreal
FROM public.questions
WHERE municipality_id = 'montreal';
-- Résultat attendu: 22
```

### Vérifier les Partis
```sql
SELECT COUNT(*) as total_partis_montreal
FROM public.parties
WHERE municipality_id = 'montreal';
-- Résultat attendu: 5
```

### Vérifier les Positions
```sql
SELECT COUNT(*) as total_positions_montreal
FROM public.party_positions pp
JOIN public.parties p ON pp.party_id = p.id
WHERE p.municipality_id = 'montreal';
-- Résultat attendu: 105
```

### Test d'Isolation
```sql
-- Vérifier que Quebec ≠ Montreal
SELECT
    municipality_id,
    COUNT(*) as total_questions
FROM public.questions
GROUP BY municipality_id;
-- Résultat attendu:
-- quebec: 21 ou 22
-- montreal: 22
```

## 🧪 Test Infrastructure

### 1. Test API Montreal
Visiter : `http://localhost:3000/montreal/test-politique-municipal`

**Vérifications :**
- ✅ 22 questions s'affichent
- ✅ Questions spécifiques Montréal présentes
- ✅ Aucune erreur de chargement

### 2. Test Isolation Données
- Naviguer vers Quebec : questions différentes
- Naviguer vers Montreal : questions spécifiques
- Vérifier aucun mélange entre municipalités

## 🎯 État Final Attendu

**Infrastructure Montreal Complète :**
- ✅ 22 questions avec textes adaptés
- ✅ 5 partis politiques avec positions calculées
- ✅ 105 positions basées sur recherche approfondie
- ✅ Isolation complète des données
- ✅ Infrastructure prête pour tests utilisateur

## 📊 Fichiers Créés/Corrigés Aujourd'hui

1. `sql-montreal-questions.sql` - **NOUVEAU** - 22 questions avec IDs préfixés `mtl_`
2. `sql-montreal-parties.sql` - **EXISTANT** - 5 partis
3. `sql-montreal-positions.sql` - **CORRIGÉ** - 105 positions avec IDs `mtl_` mis à jour
4. `Docs/montreal-questions-adaptees.json` - **CORRIGÉ** - IDs préfixés
5. `Docs/montreal-positions-politiques-calculees.json` - **CORRIGÉ** - IDs préfixés

## 🚀 Prochaines Étapes

Après exécution réussie :
1. Tester flow complet Montreal
2. Marquer Phase 2 comme 100% complétée
3. Commencer Phase 3 (Laval) avec méthodologie validée