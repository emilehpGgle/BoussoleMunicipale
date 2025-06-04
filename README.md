# 🧭 Boussole Municipale

Une application web interactive pour aider les citoyens de Québec à identifier leur affinité politique avec les partis municipaux lors des élections.

## 📋 Description

La Boussole Municipale est un outil démocratique qui permet aux électeurs de :
- Répondre à un questionnaire de 20 questions sur des enjeux municipaux
- Découvrir leur positionnement politique sur une carte 2D
- Comparer leurs opinions avec les positions des partis politiques
- Identifier les partis les plus alignés avec leurs valeurs

## ✨ Fonctionnalités

### 🏠 **Géolocalisation intelligente**
- Saisie de code postal avec validation
- Détection automatique de l'arrondissement
- Carte interactive pour confirmer la localisation

### 📊 **Questionnaire interactif**
- 20 questions sur 6 thématiques municipales :
  - Mobilité et transport
  - Habitation et aménagement urbain
  - Environnement et développement durable
  - Gouvernance et finances municipales
  - Développement économique et social
  - Sécurité publique et services municipaux
  - Patrimoine et identité

### 🎯 **Types de questions adaptés**
- **Questions d'accord/désaccord** : "Fortement d'accord" → "Fortement en désaccord"
- **Questions d'importance directe** : "Très important" → "Pas du tout important"
- **Labels personnalisés** : Adaptés au contexte (priorités, fréquence, etc.)

### 📈 **Visualisation des résultats**
- Carte politique 2D interactive
- Positionnement de l'utilisateur et des partis
- Calcul de compatibilité en pourcentage
- Pages détaillées pour chaque parti

### 🎨 **Interface utilisateur moderne**
- Design responsive et accessible
- Animations fluides
- Thème sombre/clair
- Composants UI optimisés

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15.2.4
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Radix UI + Shadcn/ui
- **Charts** : Recharts
- **Icons** : Lucide React
- **Package Manager** : PNPM

## 🚀 Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd boussole-municipale

# Installer les dépendances
pnpm install

# Lancer en mode développement
pnpm run dev

# Ouvrir http://localhost:3000
```

## 📁 Structure du projet

```
boussole-municipale/
├── app/                    # Pages Next.js (App Router)
│   ├── parti/[id]/        # Pages détaillées des partis
│   ├── profil/            # Page de profil utilisateur
│   ├── questionnaire/     # Questionnaire interactif
│   ├── resultats/         # Résultats et carte politique
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React réutilisables
│   └── ui/               # Composants UI de base
├── lib/                  # Logique métier et données
│   ├── boussole-data.ts  # Questions et positions des partis
│   └── postal-code-mapping.ts # Mapping codes postaux → arrondissements
├── public/               # Assets statiques
│   └── logos/           # Logos des partis
└── styles/              # Styles globaux
```

## 🎯 Fonctionnalités détaillées

### Questionnaire intelligent
- **20 questions** couvrant tous les enjeux municipaux importants
- **Ordre logique** : réponses positives en haut, négatives en bas
- **Types de réponses adaptés** selon le contexte de la question
- **Section d'importance** pour les questions d'accord/désaccord
- **Validation** : impossible de passer à la question suivante sans répondre

### Géolocalisation précise
- **Validation de format** : Codes postaux de Québec uniquement (G1A-G3K)
- **Détection d'arrondissement** : Mapping intelligent code postal → arrondissement
- **Confirmation visuelle** : Carte avec limites d'arrondissement
- **Option alternative** : "Continuer sans localisation"

### Carte politique 2D
- **Axes** : Économique (gauche/droite) & Social (progressiste/conservateur)
- **Algorithme de positionnement** : Calcul basé sur les réponses pondérées
- **Visualisation interactive** : Points cliquables pour chaque parti
- **Distances calculées** : Compatibilité en pourcentage

## 📊 Données des partis

L'application inclut les positions détaillées de tous les principaux partis municipaux de Québec :
- Équipe Marie-Josée Savard
- Transition Québec
- Québec Forte et Fière
- Alliance citoyenne de Québec
- Et d'autres partis locaux

Chaque position est documentée avec :
- **Source** : Lien vers le document officiel
- **Citation** : Extrait exact du programme
- **Note explicative** : Contexte si nécessaire

## 🔧 Scripts disponibles

```bash
pnpm run dev        # Développement local
pnpm run build      # Build de production
pnpm run start      # Démarrer en production
pnpm run lint       # Vérification ESLint
pnpm run type-check # Vérification TypeScript
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation dans le dossier `/Docs`

---

**Fait avec ❤️ pour la démocratie municipale de Québec** 