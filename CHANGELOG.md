# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-20

### ✨ Ajouté
- **Questionnaire interactif** avec 20 questions sur les enjeux municipaux de Québec
- **Géolocalisation intelligente** avec validation de code postal et détection d'arrondissement  
- **Carte politique 2D** interactive avec positionnement des partis et de l'utilisateur
- **Calcul de compatibilité** en pourcentage avec chaque parti politique
- **Pages détaillées des partis** avec positions documentées et sources
- **Design responsive** avec composants UI modernes (Shadcn/ui + Tailwind CSS)
- **Types de questions adaptés** :
  - Questions d'accord/désaccord avec ordre logique (positif → négatif)
  - Questions d'importance directe avec labels appropriés
  - Labels personnalisés selon le contexte (priorités, fréquence, etc.)

### 🏛️ Données des partis
- **Équipe Marie-Josée Savard** - Positions complètes avec sources
- **Transition Québec** - Programme politique documenté
- **Québec Forte et Fière** - Orientations politiques détaillées
- **Alliance citoyenne de Québec** - Positions et propositions
- **Autres partis municipaux** - Coverage complète des options électorales

### 🛠️ Technique
- **Next.js 15.2.4** avec TypeScript pour la performance et la sécurité de type
- **Algorithme de positionnement politique** basé sur les réponses pondérées
- **Validation de données** robuste pour les codes postaux de Québec (G1A-G3K)
- **Mapping postal** intelligent code postal → arrondissement
- **Architecture modulaire** avec composants réutilisables

### 🎨 Interface utilisateur
- **Modal avancée de code postal** avec processus en 2 étapes
- **Animations fluides** et transitions réactives
- **Accessibilité** optimisée avec support clavier et lecteur d'écran
- **Design cohérent** avec système de couleurs et typographie harmonieux
- **Tooltips informatifs** pour l'aide contextuelle

### 📊 Fonctionnalités avancées
- **Sauvegarde des réponses** en localStorage pour récupération
- **Calcul de distance politique** multi-dimensionnel
- **Visualisation des résultats** avec graphiques interactifs
- **Profil utilisateur** personnalisable
- **Navigation intuitive** entre les sections

### 📁 Structure du projet
- **Documentation complète** dans le dossier `/Docs`
- **Composants UI** organisés et réutilisables
- **Logique métier** séparée dans `/lib`
- **Assets optimisés** avec logos des partis
- **Configuration standardisée** (ESLint, TypeScript, Tailwind)

### 🔧 Outils de développement
- **PNPM** pour la gestion des dépendances
- **Git** avec .gitignore optimisé pour Next.js
- **Scripts npm** pour le développement et la production
- **README détaillé** avec instructions d'installation

---

**Légende :**
- ✨ Nouvelles fonctionnalités
- 🔧 Améliorations
- 🐛 Corrections de bugs
- 📚 Documentation
- ⚡ Performance
- 🔒 Sécurité 