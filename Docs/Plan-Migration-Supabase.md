# Plan de Migration vers Supabase - Boussole Municipale

## 📋 Vue d'ensemble

Ce document présente le plan complet de migration de l'application **Boussole Municipale** du stockage local (localStorage) vers **Supabase** comme backend.

### État Actuel
- ✅ **Frontend** : Next.js 15 avec TypeScript
- ✅ **Stockage** : localStorage uniquement
- ✅ **Données** : Questions et partis en fichiers statiques
- ❌ **Backend** : Aucun
- ❌ **Base de données** : Aucune

### État Cible
- ✅ **Frontend** : Next.js 15 avec TypeScript (inchangé)
- ✅ **Backend** : Supabase
- ✅ **Base de données** : PostgreSQL (Supabase)
- ✅ **Authentification** : Supabase Auth
- ✅ **API** : Supabase client + API Routes Next.js
- ✅ **Stockage** : Database + Edge Functions

---

## 🗂️ Structure des Données Actuelles

### localStorage actuel :
```typescript
localStorage: {
  "userAnswers": Record<string, AgreementOptionKey>,
  "userImportance": Record<string, ImportanceOptionKey>, 
  "userImportanceDirectAnswers": Record<string, ImportanceDirectOptionKey>,
  "userProfileData": Record<string, any>
}
```

### Fichiers statiques :
- `lib/boussole-data.ts` : Questions et partis
- `lib/political-map-calculator.ts` : Positions des partis

---

## 🎯 Phase 1 : Configuration et Préparation

### ✅ 1.1 Configuration Supabase

- [x] **Créer le nouveau projet Supabase**
  - ✅ Projet créé : `BoussoleMunicipale` (ID: cnvlxsstxnrnijifnqnz)
  - ✅ Organisation : EmilePprojects (ssejpvmvbhalueygzxic)
  - ✅ Région : ca-central-1
  - ✅ Statut : ACTIVE_HEALTHY
  - ✅ Coût : $0/mois (plan gratuit)
  - [ ] Configurer les variables d'environnement

- [x] **Installer les dépendances Supabase**
  ```bash
  pnpm add @supabase/supabase-js @supabase/ssr
  ```
  ✅ **Installé** : @supabase/supabase-js@2.50.0 et @supabase/ssr@0.6.1

- [x] **Configuration des variables d'environnement**
  ```bash
  # .env.local
  NEXT_PUBLIC_SUPABASE_URL=https://cnvlxsstxnrnijifnqnz.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudmx4c3N0eG5ybmlqaWZucW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzI1MjEsImV4cCI6MjA2NTA0ODUyMX0.5cYi10WuoBiMv5Smw-g2_DR0_EtW-mEl8UbSEjiHG9A
  SUPABASE_SERVICE_ROLE_KEY=...
  ```

### ✅ 1.2 Structure des Fichiers

- [x] **Créer la structure Supabase**
  ```
  lib/
  ├── supabase/
  │   ├── client.ts      # Client Supabase 
  │   ├── server.ts      # Server-side client
  │   └── types.ts       # Types générés
  └── api/
      ├── responses.ts   # API pour réponses
      ├── profiles.ts    # API pour profils
      ├── results.ts     # API pour résultats
      └── sessions.ts    # API pour sessions
  ```

---

## 🗄️ Phase 2 : Conception de la Base de Données

### ✅ 2.1 Schema de Base de Données

- [x] **Table `questions`**
  ```sql
  CREATE TABLE questions (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    category TEXT NOT NULL,
    response_type TEXT NOT NULL CHECK (response_type IN ('agreement', 'importance_direct')),
    description TEXT,
    response_format TEXT CHECK (response_format IN ('standard', 'priority', 'frequency', 'financing')),
    agreement_options JSONB NOT NULL DEFAULT '["FA", "PA", "N", "PD", "FD", "IDK"]',
    importance_options JSONB NOT NULL DEFAULT '[5, 4, 3, 2, 1]',
    importance_direct_options JSONB,
    custom_agreement_labels JSONB,
    custom_importance_direct_labels JSONB,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- [x] **Table `parties`**
  ```sql
  CREATE TABLE parties (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT,
    leader TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    orientation TEXT,
    main_ideas_summary TEXT,
    strengths JSONB DEFAULT '[]',
    reserves JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

- [x] **Table `party_positions`**
  ```sql
  CREATE TABLE party_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    party_id TEXT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    position TEXT NOT NULL CHECK (position IN ('FA', 'PA', 'N', 'PD', 'FD', 'IDK', '?')),
    source TEXT,
    note TEXT,
    quote TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(party_id, question_id)
  );
  ```

- [x] **Table `user_sessions`**
  ```sql
  CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
  );
  ```

- [x] **Table `user_responses`**
  ```sql
  CREATE TABLE user_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    response_type TEXT NOT NULL CHECK (response_type IN ('agreement', 'importance', 'importance_direct')),
    agreement_value TEXT CHECK (agreement_value IN ('FA', 'PA', 'N', 'PD', 'FD', 'IDK')),
    importance_value INTEGER CHECK (importance_value BETWEEN 1 AND 5),
    importance_direct_value TEXT CHECK (importance_direct_value IN ('TI', 'AI', 'NI', 'PI', 'PTI', 'IDK')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, question_id, response_type)
  );
  ```

- [x] **Table `user_profiles`**
  ```sql
  CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    profile_data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id)
  );
  ```

- [x] **Table `user_results`**
  ```sql
  CREATE TABLE user_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES user_sessions(id) ON DELETE CASCADE,
    results_data JSONB NOT NULL,
    political_position JSONB, -- {x: number, y: number}
    completion_status TEXT DEFAULT 'partial' CHECK (completion_status IN ('partial', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id)
  );
  ```

### ✅ 2.2 Index et Optimisations

- [x] **Index de performance**
  ```sql
  -- Index pour les requêtes fréquentes
  CREATE INDEX idx_user_responses_session_id ON user_responses(session_id);
  CREATE INDEX idx_user_responses_question_id ON user_responses(question_id);
  CREATE INDEX idx_party_positions_party_id ON party_positions(party_id);
  CREATE INDEX idx_party_positions_question_id ON party_positions(question_id);
  CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
  CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
  ```

### ✅ 2.3 Sécurité RLS (Row Level Security)

- [x] **Activer RLS**
  ```sql
  ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_results ENABLE ROW LEVEL SECURITY;
  ```

- [x] **Politiques RLS**
  ```sql
  -- Sessions : accès uniquement avec le bon token
  CREATE POLICY "Users can access their own session" ON user_sessions
    FOR ALL USING (session_token = current_setting('request.jwt.claims', true)::json->>'session_token');

  -- Réponses : accès uniquement à sa propre session
  CREATE POLICY "Users can access their own responses" ON user_responses
    FOR ALL USING (session_id IN (
      SELECT id FROM user_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
    ));

  -- Profils : accès uniquement à son propre profil
  CREATE POLICY "Users can access their own profile" ON user_profiles
    FOR ALL USING (session_id IN (
      SELECT id FROM user_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
    ));

  -- Résultats : accès uniquement à ses propres résultats
  CREATE POLICY "Users can access their own results" ON user_results
    FOR ALL USING (session_id IN (
      SELECT id FROM user_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
    ));

  -- Tables publiques en lecture seule
  CREATE POLICY "Public read access" ON questions FOR SELECT USING (true);
  CREATE POLICY "Public read access" ON parties FOR SELECT USING (true);
  CREATE POLICY "Public read access" ON party_positions FOR SELECT USING (true);
  ```

---

## 🔧 Phase 3 : Migration des Données

### ✅ 3.1 Migration des Questions

- [x] **Script de migration des questions** ✅ **TERMINÉ** - 20 questions migrées
- [x] **Validation des données migrées** ✅ **TERMINÉ** - 14 agreement + 6 importance_direct

### ✅ 3.2 Migration des Partis

- [x] **Script de migration des partis et positions** ✅ **TERMINÉ** - 7 partis + 140 positions
- [x] **Validation de l'intégrité des relations** ✅ **TERMINÉ** - Toutes les relations validées

---

## 💻 Phase 4 : Refactoring du Code Frontend

### ✅ 4.1 Configuration Supabase Client

- [x] **Créer le client Supabase** ✅ **TERMINÉ** - Clients browser/server configurés
- [x] **Configuration côté serveur** ✅ **TERMINÉ** - Gestion cookies Next.js

### ✅ 4.2 Service de Gestion des Sessions

- [x] **Créer le service de session** ✅ **TERMINÉ** - SessionsAPI complet
- [x] **Gérer les tokens de session** ✅ **TERMINÉ** - Génération UUID + expiration

### ✅ 4.3 API Routes Next.js

- [x] **API pour sauvegarder les réponses** ✅ **TERMINÉ** - /api/responses
- [x] **API pour récupérer les profils** ✅ **TERMINÉ** - /api/profile  
- [x] **API pour calculer les résultats** ✅ **TERMINÉ** - /api/results
- [x] **API pour gérer les sessions** ✅ **TERMINÉ** - /api/sessions

### ✅ 4.4 Hooks Personnalisés

- [ ] **Hook pour les réponses utilisateur**
- [ ] **Hook pour les profils**
- [ ] **Hook pour les résultats**

### ✅ 4.5 Refactoring des Composants

- [ ] **Modifier `app/questionnaire/page.tsx`**
  - [ ] Remplacer localStorage par le hook `useUserResponses`
  - [ ] Sauvegarder en temps réel chaque réponse
  - [ ] Gérer les états de chargement

- [ ] **Modifier `app/profil/page.tsx`**
  - [ ] Utiliser l'API pour sauvegarder le profil
  - [ ] Remplacer localStorage par Supabase

- [ ] **Modifier `app/resultats/page.tsx`**
  - [ ] Charger les données depuis Supabase
  - [ ] Calculer les résultats côté serveur
  - [ ] Sauvegarder les résultats calculés

---

## 🧪 Phase 5 : Tests et Validation

### ✅ 5.1 Tests de Migration

- [ ] **Tester la migration des données**
- [ ] **Tests d'API**

### ✅ 5.2 Tests d'Intégration

- [ ] **Parcours utilisateur complet**
- [ ] **Vérifier la persistence des données**

### ✅ 5.3 Tests de Performance

- [ ] **Performance de la base de données**
- [ ] **Optimiser les requêtes si nécessaire**

---

## 🚀 Phase 6 : Déploiement et Migration

### ✅ 6.1 Préparation du Déploiement

- [ ] **Variables d'environnement de production**
- [ ] **Sauvegarde de sécurité**

### ✅ 6.2 Déploiement Progressif

- [ ] **Déploiement en staging**
- [ ] **Déploiement en production**

### ✅ 6.3 Suivi Post-Migration

- [ ] **Monitoring**
- [ ] **Optimisations**

---

## 📊 Phase 7 : Améliorations Futures

### ✅ 7.1 Fonctionnalités Avancées

- [ ] **Authentification utilisateur optionnelle**
- [ ] **Analytics et Insights**

### ✅ 7.2 Performance et Scalabilité

- [ ] **Optimisations avancées**
- [ ] **Monitoring avancé**

---

## 🔍 Checklist de Validation Finale

### ✅ Fonctionnalités Core
- [ ] ✅ Questionnaire fonctionne avec Supabase
- [ ] ✅ Profil utilisateur sauvegardé en DB
- [ ] ✅ Résultats calculés et affichés correctement
- [ ] ✅ Comparaison avec les partis fonctionne
- [ ] ✅ Graphiques politiques affichés

### ✅ Performance
- [ ] ✅ Temps de chargement < 3 secondes
- [ ] ✅ Sauvegarde en temps réel rapide
- [ ] ✅ Calculs de résultats optimisés

### ✅ Sécurité
- [ ] ✅ RLS configuré correctement
- [ ] ✅ Sessions sécurisées
- [ ] ✅ Données anonymisées

### ✅ UX/UI
- [ ] ✅ Aucune régression visuelle
- [ ] ✅ Même expérience utilisateur
- [ ] ✅ Gestion d'erreurs gracieuse

---

## 📝 Notes Importantes

1. **Rétrocompatibilité** : Pendant la migration, maintenir la compatibilité avec localStorage comme fallback.

2. **Performance** : Optimiser les requêtes dès le début pour éviter les problèmes de performance.

3. **Sécurité** : Utiliser RLS et ne jamais exposer de données sensibles.

4. **Monitoring** : Mettre en place un monitoring dès le début pour détecter les problèmes rapidement.

5. **Tests** : Tester chaque étape de la migration avant de passer à la suivante.

---

**📅 Estimation de durée : 2-3 semaines**
**👥 Ressources : 1 développeur full-stack**
**�� Priorité : Haute** 