# Guide Configuration Google Analytics 4 + Search Console

## 📊 Google Analytics 4 (GA4)

### 1. Créer un compte Google Analytics 4

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Cliquez sur "Commencer"
3. Créez un compte :
   - **Nom du compte** : "Boussole Électorale Québec"
   - **Nom de la propriété** : "Boussole Municipale"
   - **Secteur d'activité** : Gouvernement et secteur public
   - **Taille de l'entreprise** : Petite (1-10 employés)

4. Configurez le flux de données :
   - **Plateforme** : Web
   - **URL du site Web** : `https://boussole-municipale.vercel.app`
   - **Nom du flux** : "Boussole Municipale - Production"

### 2. Récupérer l'ID de suivi

1. Dans GA4, allez dans **Administration** > **Flux de données**
2. Cliquez sur votre flux de données Web
3. Copiez l'**ID de mesure** (format : `G-XXXXXXXXXX`)

### 3. Configurer l'ID dans votre projet

1. Créez un fichier `.env.local` à la racine du projet :
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Redémarrez votre serveur de développement :
```bash
pnpm dev
```

### 4. Événements personnalisés configurés

Le composant Analytics est déjà configuré pour tracker :

- **Conversions** :
  - `questionnaire_started` : Début du questionnaire
  - `questionnaire_completed` : Questionnaire terminé
  - `results_viewed` : Consultation des résultats

- **Engagement** :
  - `question_answered` : Réponse à une question
  - `party_profile_viewed` : Consultation fiche parti
  - `share_clicked` : Clic sur partage
  - `page_time` : Temps passé sur chaque page

### 5. Configurer les objectifs de conversion

Dans GA4, allez dans **Configurer** > **Événements** :

1. Marquez `questionnaire_completed` comme **Conversion**
2. Marquez `results_viewed` comme **Conversion**
3. Créez un objectif personnalisé :
   - **Nom** : "Engagement élevé"
   - **Condition** : `page_time` > 60 secondes

---

## 🔍 Google Search Console

### 1. Ajouter votre propriété

1. Allez sur [Google Search Console](https://search.google.com/search-console/)
2. Cliquez sur "Ajouter une propriété"
3. Choisissez **Préfixe d'URL** : `https://boussole-municipale.vercel.app`

### 2. Vérifier la propriété

**Méthode recommandée : Balise HTML**

1. Copiez la balise meta de vérification
2. Ajoutez-la dans `app/layout.tsx` :

```tsx
<head>
  <meta name="google-site-verification" content="VOTRE_CODE_VERIFICATION" />
  <Analytics />
  ...
</head>
```

### 3. Soumettre votre sitemap

1. Dans Search Console, allez dans **Sitemaps**
2. Ajoutez l'URL : `https://boussole-municipale.vercel.app/sitemap.xml`
3. Cliquez sur "Soumettre"

### 4. Configurer les mots-clés cibles

Dans **Performance** > **Requêtes**, surveillez :

- `boussole électorale`
- `élections municipales québec`
- `test politique municipal`
- `partis politiques québec`
- `bruno marchand`

---

## 📈 Métriques SEO à surveiller

### KPIs principaux

1. **Trafic organique** : Objectif 6,500+/mois
2. **Taux de conversion** : Visiteurs → Questionnaire complet
3. **Positions moyennes** : Top 18 mots-clés
4. **CTR organique** : Par mot-clé et page
5. **Pages par session** : Engagement utilisateur

### Alertes à configurer

1. **Chute de trafic** : -20% semaine/semaine
2. **Erreurs d'indexation** : Nouvelles erreurs 404
3. **Performance Core Web Vitals** : Dégradation LCP/FID/CLS
4. **Positions perdues** : Mots-clés hors Top 10

---

## 🎯 Rapports mensuels recommandés

### Rapport trafic organique
```
- Visiteurs uniques : [nombre]
- Pages vues : [nombre]
- Taux de rebond : [pourcentage]
- Durée moyenne session : [temps]
- Top 10 pages d'entrée
- Top 10 mots-clés
```

### Rapport conversions
```
- Questionnaires commencés : [nombre]
- Questionnaires terminés : [nombre]
- Taux de conversion : [pourcentage]
- Partages sociaux : [nombre]
- Consultations fiches partis : [nombre]
```

### Rapport positions
```
- Mots-clés Top 3 : [liste]
- Mots-clés Top 10 : [liste]
- Évolution positions : [graphique]
- Nouvelles opportunités : [liste]
```

---

## 🔧 Intégration avec le code

### Tracker les événements dans vos composants

```tsx
import { useAnalytics } from '@/components/analytics'

export function MonComposant() {
  const { trackQuestionnaireStart, trackQuestionAnswer } = useAnalytics()

  const handleStart = () => {
    trackQuestionnaireStart()
    // ... logique du questionnaire
  }

  const handleAnswer = (questionId: string, answer: string) => {
    trackQuestionAnswer(questionId, answer)
    // ... logique de sauvegarde
  }

  return (
    <button onClick={handleStart}>Commencer le questionnaire</button>
  )
}
```

### Tracker le temps passé sur une page

```tsx
import { usePageTimeTracker } from '@/components/analytics'

export function MaPage() {
  usePageTimeTracker('questionnaire')

  return (
    <div>Contenu de la page</div>
  )
}
```

---

## ⚠️ Notes importantes

1. **Conformité RGPD** : Les cookies GA4 nécessitent un consentement
2. **Données anonymes** : Configurez GA4 pour anonymiser les IPs
3. **Période de transition** : Prévoyez 24-48h pour voir les premières données
4. **Sauvegarde** : Exportez régulièrement vos données Analytics

---

## 🚀 Prochaines étapes

1. [ ] Créer les comptes GA4 et Search Console
2. [ ] Configurer les variables d'environnement
3. [ ] Tester les événements en mode développement
4. [ ] Déployer en production
5. [ ] Vérifier les données après 48h
6. [ ] Configurer les alertes et rapports

**Dernière mise à jour** : Janvier 2025 