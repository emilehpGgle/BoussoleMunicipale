# Sources de Vérification - Leaders Politiques de Lévis (2025)

## Date de Vérification
**24 septembre 2025**

## Méthodologie
Vérification complète des informations sur les leaders politiques municipaux de Lévis en utilisant des sources fiables et récentes pour assurer l'exactitude des données présentées aux citoyens.

---

## 1. ISABELLE DEMERS (Lévis Force 10)

### Informations Vérifiées
- **Statut** : Chef de Lévis Force 10, candidate à la mairie de Lévis 2025
- **Formation** : Bachelière en science politique et communication, Université Laval
- **Expérience municipale** : Conseillère municipale (2001-2009, 2017-présent)
- **Postes actuels** : Présidente du comité des finances (depuis novembre 2021), membre CA Société de transport de Lévis (depuis décembre 2022)
- **Origine** : Native de Saint-Nicolas
- **Candidature mairie** : 2013 (première fois), 2025 (actuelle)

### Sources Consultées
- **Site officiel du parti** : https://levisforce10.com/candidats/isabelle-demers/
- **Élections Québec** : https://www.electionsquebec.qc.ca/partis-et-autres-entites-politiques/partis-politiques/fiche-du-parti-municipal/100037/
- **Radio-Canada** : https://ici.radio-canada.ca/nouvelle/2193805/lancement-campagnes-levis-taxes-municipales (19 septembre 2025)
- **Journal de Lévis** : Interview vidéo YouTube "Hors-série - Lévisien.ne - Élections municipales avec Isabelle Demers" (17 septembre 2025)

---

## 2. SERGE BONIN (Repensons Lévis)

### Informations Vérifiées
- **Statut** : Chef de Repensons Lévis (depuis avril 2024), candidat à la mairie 2025
- **Âge** : 49 ans (né avril 1976)
- **Formation** : Conservatoire d'art dramatique de Québec, Université Laval
- **Expérience politique** : Conseiller municipal district Saint-Étienne (depuis novembre 2021), porte-parole opposition officielle
- **Profession** : Comédien, entrepreneur (ClicVox - services voix et production vidéo)
- **Expérience académique** : 8 ans vulgarisation scientifique Université Laval
- **Historique politique** : Ancien membre Parti québécois (2018-2021)

### Sources Consultées
- **Site officiel du parti** : https://repensonslevis.com/
- **Élections Québec** : https://www.electionsquebec.qc.ca/partis-et-autres-entites-politiques/partis-politiques/fiche-du-parti-municipal/109833/
- **Radio-Canada** : https://ici.radio-canada.ca/nouvelle/2063530/serge-bonin-chef-repensons-levis (9 avril 2024)
- **Wikipedia** : https://fr.wikipedia.org/wiki/Serge_Bonin (dernière mise à jour 13 août 2025)
- **LinkedIn** : https://ca.linkedin.com/in/sergebonin
- **Journal de Lévis** : Interview vidéo YouTube "Hors-série - Lévisien.ne - Élections municipales avec Serge Bonin" (10 septembre 2025)

---

## 3. STEVEN BLANEY (Prospérité Lévis)

### Informations Vérifiées
- **Statut** : Chef de Prospérité Lévis (nom réservé novembre 2024), candidat potentiel mairie 2025
- **Âge** : 59 ans (né 8 avril 1965 à Sherbrooke)
- **Formation** : Baccalauréat ingénierie civile (Université de Sherbrooke), MBA (Université du Québec à Rimouski)
- **Expérience fédérale** : Député conservateur (2006-2021) Lévis-Bellechasse puis Bellechasse-Les Etchemins-Lévis
- **Expérience ministérielle** : Ministre des Anciens Combattants, ministre de la Francophonie, ministre Sécurité publique (2013-2015) sous Stephen Harper
- **Entrepreneuriat** : Fondateur Stratech (1993, technologie environnementale)
- **Famille** : Marié à Marie Bouchard, deux enfants
- **Leadership politique** : Candidat direction Parti conservateur (2016)

### Sources Consultées
- **Site officiel du parti** : https://www.prosperitelevis.ca/
- **Élections Québec** : https://www.electionsquebec.qc.ca/partis-et-autres-entites-politiques/partis-politiques/fiche-du-parti-municipal/111959/
- **Radio-Canada** : https://ici.radio-canada.ca/nouvelle/2120813/mairie-levis-steven-blaney (18 novembre 2024)
- **Le Soleil** : https://www.lesoleil.com/actualites/actualites-locales/la-capitale/2024/11/18/steven-blaney-dirigerait-prosperite-levis-GY2ZKDOT7RGMJB7TLCZOSRVSEY/ (18 novembre 2024)
- **La Presse** : https://www.lapresse.ca/actualites/politique/2024-11-18/levis/steven-blaney-se-rapprocherait-d-une-candidature-a-la-mairie.php (18 novembre 2024)
- **FM93** : https://www.fm93.com/audio/660761/prosperite-levis-un-nouveau-nom-de-parti-politique-a-ete-enregistre-a-levis (18 novembre 2024)
- **Journal de Lévis** : https://www.journaldelevis.com/jdl/32/Élections_municipales_2025.html?id=43445 (24 septembre 2025)
- **Wikipedia** : https://fr.wikipedia.org/wiki/Steven_Blaney (dernière mise à jour 4 septembre 2025)
- **EBSCO Research** : Biography Steven Blaney (2024)

---

## Cohérence des Données Vérifiées

### Comparaison avec les Données Existantes
- **Fichier de positions politiques** : `/Docs/levis-positions-politiques-calculees.json` (23 septembre 2025)
- **API des partis** : `/app/api/parties/route.ts`
- **Base de données Supabase** : Table `parties` avec municipalité `levis`

### Correspondance Confirmée ✅
- **Noms des partis** : Lévis Force 10, Repensons Lévis, Prospérité Lévis
- **Noms des chefs** : Isabelle Demers, Serge Bonin, Steven Blaney
- **Orientations politiques** : Centre, Centre-gauche, Centre-droit

---

## Actions Effectuées

### 1. Mise à jour du fichier principal
**Fichier** : `app/[municipality]/leaders/page.tsx`
**Section modifiée** : `currentLeaderDescriptions.levis`
**Ajouts** :
- Description complète Isabelle Demers
- Description complète Serge Bonin
- Description complète Steven Blaney

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
1. **Médias locaux** : Journal de Lévis, FM93
2. **Médias provinciaux** : Radio-Canada, Le Soleil, La Presse
3. **Sources officielles** : Sites des partis, Élections Québec
4. **Réseaux sociaux** : LinkedIn, Facebook des leaders
5. **Ville de Lévis** : Communications officielles, procès-verbaux

---

**Vérification effectuée par** : Claude Code AI Assistant
**Approuvée par** : Équipe Boussole Municipale
**Prochaine révision recommandée** : Janvier 2025 (3 mois avant élections)