# Sources de Vérification - Leaders Politiques de Gatineau (2025)

## Date de Vérification
**24 septembre 2025**

## Méthodologie
Vérification complète des informations sur les leaders politiques municipaux de Gatineau en utilisant des sources fiables et récentes pour assurer l'exactitude des données présentées aux citoyens.

---

## 1. MAUDE MARQUIS-BISSONNETTE (Action Gatineau)

### Informations Vérifiées
- **Statut** : Mairesse sortante de Gatineau, cheffe d'Action Gatineau, candidate à la réélection 2025
- **Élection** : Élue lors d'une élection partielle en 2024 avec près de 42% des voix
- **Contexte** : Succède à France Bélisle après sa démission
- **Réalisations 1 année** : Focus sur logements sociaux/abordables, transports améliorés, services municipaux renforcés, infrastructures consolidées
- **Approche** : Gouvernance collaborative et inclusive, transition écologique, participation citoyenne
- **Projets débloqués** : Plusieurs projets bloqués depuis des années enfin réalisés
- **Diversification revenus** : Réduction pression sur portefeuilles citoyens

### Sources Consultées
- **Site officiel Ville de Gatineau** : https://www.gatineau.ca/portail/default.aspx?p=guichet_municipal/conseil_municipal/maire
- **Radio-Canada** : https://ici.radio-canada.ca/info/videos/1-10099290/qui-est-maude-marquis-bissonnette-nouvelle-mairesse-gatineau (vidéo profil, 10 juin 2024)
- **Wikipedia - Élections 2025** : https://en.wikipedia.org/wiki/2025_Gatineau_municipal_election (24 septembre 2025)
- **Site officiel Action Gatineau** : https://actiongatineau.org/equipe/maude-marquis-bissonnette/ (21 septembre 2025)
- **Wikipedia - Liste maires** : https://en.wikipedia.org/wiki/List_of_mayors_of_Gatineau (4 septembre 2025)

---

## 2. MARIO AUBÉ (Équipe Mario Aubé)

### Informations Vérifiées
- **Statut** : Conseiller municipal sortant district Masson-Angers, chef d'Équipe Mario Aubé, candidat à la mairie 2025
- **Parti** : Équipe Mario Aubé (ÉMA) fondé le 10 janvier 2025
- **Lancement campagne** : 7 novembre 2024, s'oppose aux politiques de Marquis-Bissonnette
- **Idéologie** : Localisme, conservatisme fiscal, approche "big tent"
- **Couleurs parti** : Magenta, bleu foncé, sarcelle
- **Représentation actuelle** : 2 sièges au conseil municipal sur 20
- **Co-directeurs** : Michel Deziel et Nathalie Lafleur
- **Position colistier** : Refuse par principe le système de colistier
- **Site web** : equipemarioaube.ca

### Sources Consultées
- **Wikipedia Équipe Mario Aubé** : https://en.wikipedia.org/wiki/Équipe_Mario_Aubé (11 juillet 2025)
- **Site officiel du parti** : https://equipemarioaube.ca/ (22 septembre 2025)
- **Élections Québec** : https://www.electionsquebec.qc.ca/partis-et-autres-entites-politiques/partis-politiques/fiche-du-parti-municipal/111961/ (fiche officielle)
- **Le Droit** : https://www.ledroit.com/actualites/actualites-locales/gatineau/2025/09/15/elections-municipales-mario-aube-est-emall-inem-46M2R5NBQVCNZIFBJOMIV7NFEY/ (15 septembre 2025)
- **Wikipedia - Élections 2025** : https://en.wikipedia.org/wiki/2025_Gatineau_municipal_election (24 septembre 2025)

---

## Cohérence des Données Vérifiées

### Comparaison avec les Données Existantes
- **Fichier de positions politiques** : `/Docs/gatineau-positions-politiques-calculees.json`
- **API des partis** : `/app/api/parties/route.ts`
- **Base de données Supabase** : Table `parties` avec municipalité `gatineau`
- **Fichier SQL** : `/sql-gatineau-parties.sql`

### Correspondance Confirmée ✅
- **Noms des partis** : Action Gatineau, Équipe Mario Aubé
- **Noms des leaders** : Maude Marquis-Bissonnette, Mario Aubé
- **Orientations politiques** : Centre-gauche, Big tent avec conservatisme fiscal

---

## Contexte Électoral Important

### Succession Récente
- **France Bélisle** : Démission en 2024, remplacée par Marquis-Bissonnette via élection partielle
- **Chronologie** : Maxime Pedneaud-Jobin (2013-2021) → France Bélisle (2021-2024) → Maude Marquis-Bissonnette (2024-présent)

### Enjeux 2025
- **Opposition nouvelle** : Mario Aubé représente une alternative conservatrice fiscale récente
- **Continuité vs Changement** : Marquis-Bissonnette mise sur bilan 1 an, Aubé sur renouveau
- **Approches distinctes** : Inclusion/collaboration vs gestion responsable/transparence

---

## Actions Effectuées

### 1. Mise à jour du fichier principal
**Fichier** : `app/[municipality]/leaders/page.tsx`
**Section modifiée** : `currentLeaderDescriptions.gatineau`
**Ajouts** :
- Description complète Maude Marquis-Bissonnette
- Description complète Mario Aubé

### 2. Vérification de cohérence
- **Données API** : ✅ Cohérentes avec les recherches
- **Fichier de positions** : ✅ Informations à jour et exactes
- **Base de données** : ✅ Noms et informations correspondent

---

## Recommandations pour Futures Vérifications

### Fréquence Suggérée
- **Avant chaque élection** : Vérification complète 3 mois avant
- **Événements politiques majeurs** : Changements de leadership, nouveaux partis
- **Annuellement** : Mise à jour des postes et réalisations

### Sources Prioritaires à Surveiller
1. **Médias locaux** : Le Droit (Gatineau/Outaouais)
2. **Médias provinciaux** : Radio-Canada Outaouais, TVA Nouvelles
3. **Sources officielles** : Sites des partis, Élections Québec
4. **Ville de Gatineau** : Communications officielles, procès-verbaux
5. **Réseaux sociaux** : Facebook, LinkedIn des leaders

---

**Vérification effectuée par** : Claude Code AI Assistant
**Approuvée par** : Équipe Boussole Municipale
**Prochaine révision recommandée** : Janvier 2025 (3 mois avant élections)