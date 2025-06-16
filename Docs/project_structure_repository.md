# Structure du Projet Boussole Municipale - Architecture Next.js

Ce document sert de répertoire centralisé pour la structure des dossiers et des fichiers du projet Boussole Municipale, une application web interactive pour aider les citoyens de Québec à identifier leur affinité politique avec les partis municipaux.

**📅 STATUT:** En production active ✅ | Migration Supabase terminée 🚀

## Légende
*   `(D)`: Dossier
*   `(F)`: Fichier
*   `🌐`: Page/Route Next.js
*   `⚙️`: API Route
*   `🎨`: Composant UI
*   `🔧`: Configuration
*   `📊`: Données et logique métier

## Structure Globale du Projet

```
Boussole municipale/
├── 🌐 app/                     # Pages et routes Next.js (App Router)
├── 🎨 components/              # Composants React réutilisables
├── 🔧 hooks/                   # Hooks React personnalisés
├── 📊 lib/                     # Logique métier et utilitaires
├── 📁 public/                  # Assets statiques
├── 📁 Docs/                    # Documentation du projet
├── ⚙️ Configuration            # Fichiers de configuration
└── 📁 .git/                    # Versionnement Git
```

---

## 🌐 Application Next.js (`/app/`)

### Structure App Router Next.js 15.2.4

L'application utilise le système App Router de Next.js avec TypeScript et Tailwind CSS.

#### Pages Principales

*   `/app/` - Application principale avec App Router
    *   `├── (F) layout.tsx` - Layout racine avec providers (ThemeProvider, fonts DM Sans)
    *   `├── (F) page.tsx` - Page d'accueil avec hero section et call-to-action
    *   `├── (F) globals.css` - Styles CSS globaux avec Tailwind et variables thème
    *   `├── (D) questionnaire/` - 📋 Module questionnaire interactif
    *   │   ├── (F) page.tsx` - Interface questionnaire avec 20 questions politiques
    *   │   └── (F) loading.tsx` - Composant de chargement
    *   `├── (D) resultats/` - 📊 Module résultats et carte politique
    *   │   └── (F) page.tsx` - Visualisation résultats avec carte 2D interactive
    *   `├── (D) profil/` - 👤 Module profil utilisateur
    *   │   └── (F) page.tsx` - Page profil avec géolocalisation et préférences
    *   `├── (D) parti/[id]/` - 🏛️ Pages dynamiques des partis politiques
    *   │   └── (F) page.tsx` - Détails parti avec positions et programmes
    *   `├── (D) partage/[id]/` - 🔗 Module partage de résultats
    *   │   ├── (F) layout.tsx` - Layout spécifique pour les pages partagées
    *   │   ├── (F) page.tsx` - Page de visualisation des résultats partagés
    *   │   └── (F) share-page-client.tsx` - Composant client pour l'affichage
    *   `├── (D) a-propos/` - ℹ️ Page d'information
    *   │   └── (F) page.tsx` - À propos du projet et méthodologie
    *   `├── (D) aide/` - ❓ Page d'aide
    *   │   └── (F) page.tsx` - Guide d'utilisation et FAQ
    *   `├── (D) conditions/` - 📋 Conditions d'utilisation
    *   │   └── (F) page.tsx` - Termes et conditions légales
    *   `└── (D) confidentialite/` - 🔒 Politique de confidentialité
    *       └── (F) page.tsx` - Politique de protection des données

#### API Routes (`/app/api/`)

*   `/app/api/` - Routes API Next.js pour la logique serveur
    *   `├── (D) generate-share-image/` - 🖼️ Génération d'images de partage
    *   │   └── (F) route.tsx` - API pour créer des images OG dynamiques
    *   `├── (D) migrate/` - 🔄 Scripts de migration base de données
    *   │   └── (F) route.ts` - API de migration Supabase
    *   `├── (D) profile/` - 👤 Gestion des profils utilisateur
    *   │   └── (F) route.ts` - CRUD profils avec géolocalisation
    *   `├── (D) responses/` - 📝 Gestion des réponses questionnaire
    *   │   └── (F) route.ts` - Sauvegarde et récupération réponses
    *   `├── (D) results/` - 📊 Calcul et sauvegarde des résultats
    *   │   └── (F) route.ts` - Algorithme de calcul politique
    *   `├── (D) send-email/` - 📧 Service d'envoi d'emails
    *   │   └── (F) route.ts` - Notifications et partage par email
    *   `├── (D) sessions/` - 🔐 Gestion des sessions utilisateur
    *   │   └── (F) route.ts` - Sessions anonymes et tracking
    *   `├── (D) save-share/` - 💾 Sauvegarde pour partage
    *   │   └── (F) route.ts` - Création de liens de partage persistants
    *   `└── (D) create-share-entry/` - 🔗 Création d'entrées de partage
    *       └── (F) route.ts` - Génération d'IDs uniques pour partage

---

## 🎨 Composants React (`/components/`)

### Composants Métier

*   `/components/` - Composants React réutilisables
    *   `├── (F) enhanced-postal-code-modal.tsx` - Modale géolocalisation avancée (6.2KB)
    *   `├── (F) existing-responses-modal.tsx` - Modale récupération réponses existantes
    *   `├── (F) political-compass-chart.tsx` - Composant carte politique interactive
    *   `├── (F) postal-code-modal.tsx` - Modale simple de saisie code postal
    *   `├── (F) share-modal.tsx` - Modale de partage des résultats
    *   `├── (F) site-footer.tsx` - Footer du site avec liens utiles
    *   `├── (F) site-header.tsx` - Header avec navigation principale
    *   `└── (F) theme-provider.tsx` - Provider pour gestion thème sombre/clair

### Composants UI (`/components/ui/`)

**Système de design basé sur shadcn/ui et Radix UI - 46 composants**

*   `├── (F) accordion.tsx` - Composant accordéon pliable
*   `├── (F) alert-dialog.tsx` - Dialogues d'alerte et confirmation
*   `├── (F) alert.tsx` - Alertes et notifications
*   `├── (F) aspect-ratio.tsx` - Contrôle ratio d'aspect
*   `├── (F) aurora-background.tsx` - **[CUSTOM]** Effet aurora pour arrière-plans
*   `├── (F) avatar.tsx` - Composant avatar utilisateur
*   `├── (F) background-glow.tsx` - **[CUSTOM]** Effet glow d'arrière-plan
*   `├── (F) badge.tsx` - Badges et étiquettes
*   `├── (F) breadcrumb.tsx` - Navigation breadcrumb
*   `├── (F) button-effects.tsx` - **[CUSTOM]** Effets visuels pour boutons
*   `├── (F) button.tsx` - Boutons avec variantes
*   `├── (F) calendar.tsx` - Composant calendrier
*   `├── (F) card.tsx` - Cartes de contenu
*   `├── (F) carousel.tsx` - Carrousel d'images/contenu
*   `├── (F) chart.tsx` - Composants graphiques recharts
*   `├── (F) checkbox.tsx` - Cases à cocher
*   `├── (F) collapsible.tsx` - Sections repliables
*   `├── (F) colored-text.tsx` - **[CUSTOM]** Texte avec couleurs personnalisées
*   `├── (F) command.tsx` - Interface commande/recherche
*   `├── (F) context-menu.tsx` - Menus contextuels
*   `├── (F) dialog.tsx` - Boîtes de dialogue modales
*   `├── (F) drawer.tsx` - Tiroirs latéraux
*   `├── (F) dropdown-menu.tsx` - Menus déroulants
*   `├── (F) form.tsx` - Composants de formulaire
*   `├── (F) glow-effect.tsx` - **[CUSTOM]** Effets lumineux
*   `├── (F) hover-card.tsx` - Cartes au survol
*   `├── (F) input-otp.tsx` - Saisie code OTP
*   `├── (F) input.tsx` - Champs de saisie
*   `├── (F) label.tsx` - Étiquettes de formulaire
*   `├── (F) menubar.tsx` - Barres de menu
*   `├── (F) navigation-menu.tsx` - Navigation principale
*   `├── (F) pagination.tsx` - Pagination de contenu
*   `├── (F) popover.tsx` - Popups informatifs
*   `├── (F) progress.tsx` - Barres de progression
*   `├── (F) radio-group.tsx` - Groupes de boutons radio
*   `├── (F) resizable.tsx` - Panneaux redimensionnables
*   `├── (F) scroll-area.tsx` - Zones de défilement
*   `├── (F) select.tsx` - Sélecteurs déroulants
*   `├── (F) separator.tsx` - Séparateurs visuels
*   `├── (F) sheet.tsx` - Panneaux latéraux
*   `├── (F) sidebar.tsx` - Barres latérales
*   `├── (F) skeleton.tsx` - Placeholders de chargement
*   `├── (F) slider.tsx` - Curseurs de valeur
*   `├── (F) sonner.tsx` - Notifications toast
*   `├── (F) subtle-glow.tsx` - **[CUSTOM]** Effets glow subtils
*   `├── (F) switch.tsx` - Interrupteurs on/off
*   `├── (F) table.tsx` - Tableaux de données
*   `├── (F) tabs.tsx` - Onglets de navigation
*   `├── (F) textarea.tsx` - Zones de texte multilignes
*   `├── (F) toast.tsx` - Notifications temporaires
*   `├── (F) toaster.tsx` - Gestionnaire de toasts
*   `├── (F) toggle-group.tsx` - Groupes de bascules
*   `├── (F) toggle.tsx` - Boutons bascule
*   `├── (F) tooltip.tsx` - Info-bulles
*   `├── (F) top-match-modal.tsx` - **[CUSTOM]** Modale meilleur match politique
*   `├── (F) use-mobile.tsx` - Hook détection mobile
*   `└── (F) use-toast.ts` - Hook gestion toasts

---

## 🔧 Hooks React (`/hooks/`)

### Hooks Personnalisés

*   `/hooks/` - Hooks React pour la logique métier
    *   `├── (F) index.ts` - Exports centralisés des hooks
    *   `├── (F) use-mobile.tsx` - Détection responsive mobile/desktop
    *   `├── (F) use-toast.ts` - Gestion notifications toast
    *   `├── (F) useProfile.ts` - Gestion profil utilisateur avec Supabase
    *   `├── (F) useResults.ts` - Calcul et sauvegarde résultats politiques
    *   `├── (F) useSession.ts` - Gestion sessions anonymes
    *   `└── (F) useUserResponses.ts` - Gestion réponses questionnaire

---

## 📊 Logique Métier (`/lib/`)

### Données et Algorithmes

*   `/lib/` - Utilitaires et logique métier centrale
    *   `├── (F) boussole-data.ts` - **[CŒUR]** Questions et positions partis (complexe)
    *   `├── (F) email-service.ts` - Service d'envoi d'emails
    *   `├── (F) migration-script.ts` - Scripts migration base de données
    *   `├── (F) political-map-calculator.ts` - Algorithme calcul carte politique
    *   `├── (F) postal-code-mapping.ts` - Mapping codes postaux → arrondissements
    *   `├── (F) utils.ts` - Fonctions utilitaires générales
    *   `├── (D) api/` - **[NOUVEAU]** Couche d'abstraction API
    *   │   ├── (F) index.ts` - Exports centralisés API
    *   │   ├── (F) profiles.ts` - API profils utilisateur
    *   │   ├── (F) responses.ts` - API gestion réponses
    *   │   ├── (F) results.ts` - API calcul résultats
    *   │   └── (F) sessions.ts` - API gestion sessions
    *   `├── (D) supabase/` - Configuration Supabase
    *   │   ├── (F) client.ts` - Client Supabase côté client
    *   │   ├── (F) server.ts` - Client Supabase côté serveur
    *   │   └── (F) types.ts` - Types TypeScript base de données
    *   `└── (D) fonts/` - Polices personnalisées (DM Sans)

---

## 📁 Assets Statiques (`/public/`)

### Ressources Visuelles

*   `/public/` - Assets statiques du projet
    *   `├── (F) hero-illustration.png` - Illustration page d'accueil
    *   `├── (F) logo-main.png` - Logo principal application
    *   `├── (F) boussole-municipale-logo-footer.svg` - Logo footer
    *   `├── (F) X.png` - Logo plateforme X (Twitter)
    *   `├── (D) logos/` - **[NOUVEAU]** Logos des partis politiques
    *   │   ├── (F) alliance-citoyenne.png` - Alliance citoyenne de Québec
    *   │   ├── (F) alliance-citoyenne-white-bg.svg` - Version fond blanc
    *   │   ├── (F) equipe-priorite-quebec-new.png` - Équipe Priorité Québec
    *   │   ├── (F) leadership-quebec-new.png` - Leadership Québec
    *   │   ├── (F) quebec-dabord-new.png` - Québec d'Abord
    *   │   ├── (F) quebec-forte-et-fiere-new.png` - Québec Forte et Fière
    *   │   ├── (F) respect-citoyens-new.png` - Respect des Citoyens
    *   │   └── (F) transition-quebec-new.png` - Transition Québec
    *   `├── (D) partage/` - **[ACTIF]** Données de partage sauvegardées
    *   │   ├── (F) test-debug.json` - Données de test
    *   │   └── (F) [timestamp]-[id].json` - Résultats partagés utilisateurs
    *   `└── Images contextuelles` - Photos thématiques municipales
    *       ├── (F) Image_autobus.png`, Image_famille.png`, Image_parc.png`
    *       ├── (F) Image_parc_cerfvolant.png`, Image_parc_chat_dort.png`
    *       ├── (F) Image_parc_chien_maitre.png`, Image_parc_crisp.png`
    *       ├── (F) Image_parc_jardinage.png`, Image_voiture.png`
    *       └── (F) placeholder-*.jpg/.svg` - Images de remplacement

---

## ⚙️ Configuration du Projet

*   `├── (F) package.json` - Configuration NPM avec dépendances Next.js 15.2.4
*   `├── (F) pnpm-lock.yaml` - Fichier de verrouillage PNPM
*   `├── (F) next.config.mjs` - Configuration Next.js avec optimisations
*   `├── (F) tailwind.config.ts` - Configuration Tailwind CSS personnalisée
*   `├── (F) postcss.config.mjs` - Configuration PostCSS
*   `├── (F) tsconfig.json` - Configuration TypeScript avec alias `@/*`
*   `├── (F) tsconfig.tsbuildinfo` - Cache TypeScript
*   `├── (F) components.json` - Configuration shadcn/ui
*   `├── (F) .eslintrc.json` - Configuration ESLint Next.js
*   `├── (F) next-env.d.ts` - Types Next.js
*   `└── (F) .gitignore` - Exclusions Git

---

## 📁 Documentation (`/Docs/`)

*   `/Docs/` - Documentation technique et fonctionnelle
    *   `├── (F) project_structure_repository.md` - **[CE DOCUMENT]** Structure détaillée
    *   `├── (F) Project Requirements Document (PRD) - boussolle.md` - Spécifications
    *   `├── (F) methodology.md` - Méthodologie et sources
    *   `├── (F) Phase5-Tests-Results.md` - Résultats de tests
    *   `├── (F) Plan-Migration-Supabase.md` - Plan migration base de données
    *   `├── (F) Sources_Positions_Partis_Verification.md` - Vérification sources
    *   `└── Documents annexes` - Analyses partis et questions

---

## 🔄 Technologies & Stack Technique

### 🚀 Frontend
- **Next.js 15.2.4** - App Router, SSR/SSG, optimisations
- **React 19** - Dernière version avec Server Components
- **TypeScript 5.x** - Types stricts, configuration moderne
- **Tailwind CSS 3.4.17** - Utility-first, thème personnalisé
- **shadcn/ui** - 46 composants UI basés Radix (versions stables)

### 🔐 Backend & Database
- **Supabase** - **[PRODUCTION]** PostgreSQL, Auth, Storage
  - `@supabase/ssr: 0.6.1` - Authentification SSR
  - `@supabase/supabase-js: 2.50.0` - Client JavaScript

### 🎨 UI/UX & Interactions
- **Radix UI** - Primitives accessibles pour composants
- **Lucide React** - Icônes SVG optimisées (454+ icônes)
- **next-themes** - Gestion thème sombre/clair
- **class-variance-authority** - Variantes CSS type-safe
- **tailwind-merge** - Fusion intelligente classes Tailwind

### 📊 Visualisation & Données
- **recharts 2.15.0** - Graphiques et carte politique interactive
- **date-fns 4.1.0** - Manipulation dates optimisée
- **react-day-picker 8.10.1** - Sélecteur dates moderne

### 🔧 Outils & Utilitaires
- **PNPM** - Package manager performant
- **ESLint** - Linting avec config Next.js
- **PostCSS** - Transformations CSS
- **Zod 3.24.1** - Validation schémas TypeScript

---

## 🚧 Architecture & Fonctionnalités

### ✅ **FONCTIONNALITÉS PRINCIPALES**
- **Questionnaire Politique** - 20 questions sur 6 thématiques municipales
- **Géolocalisation** - Mapping codes postaux Québec → arrondissements
- **Carte Politique 2D** - Visualisation interactive avec algorithme de positionnement
- **Calcul Compatibilité** - Algorithme de matching avec partis politiques
- **Partage Résultats** - Génération liens persistants + images OG
- **Interface Responsive** - Design adaptatif mobile/desktop

### 🎯 **DONNÉES POLITIQUES**
- **7 Partis Municipaux** - Positions documentées et sourcées
- **Thématiques Couvertes** - Transport, Logement, Environnement, Gouvernance, etc.
- **Sources Vérifiées** - Programmes officiels et déclarations publiques
- **Mise à Jour** - Données alignées élections municipales Québec 2025

### 🔒 **SÉCURITÉ & PERFORMANCE**
- **Sessions Anonymes** - Tracking sans données personnelles
- **Validation Inputs** - Zod schemas pour toutes les données
- **Optimisations Build** - Next.js 15 avec App Router
- **SEO Optimisé** - Meta tags, images OG, sitemap

---

## 📈 Bénéfices Architecture Actuelle

### 🚀 **Performance & Scalabilité**
- **App Router Next.js** - Server Components, streaming, cache
- **Supabase Edge** - Base de données distribuée, cache intelligent
- **Image Optimization** - Next.js Image component avec lazy loading
- **Bundle Splitting** - Chargement optimisé par route

### 👥 **Expérience Utilisateur**
- **Interface Intuitive** - Design cohérent avec shadcn/ui
- **Feedback Immédiat** - Toasts, loading states, validation temps réel
- **Accessibilité** - Composants Radix UI conformes WCAG
- **Responsive Design** - Expérience optimisée tous appareils

### 🔧 **Maintenabilité**
- **TypeScript Strict** - Types sécurisés, IntelliSense complet
- **Architecture Modulaire** - Séparation claire responsabilités
- **Hooks Personnalisés** - Logique réutilisable et testable
- **Documentation Complète** - Guides techniques et fonctionnels

---

**📅 Dernière Mise à Jour:** Application en production avec migration Supabase terminée
**🎯 Version Actuelle:** 0.1.0 - Élections Municipales Québec 2025
**🏗️ Architecture:** Next.js 15 App Router + Supabase + TypeScript Production-Ready