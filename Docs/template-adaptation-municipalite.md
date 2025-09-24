# Template d'Adaptation Terminologique Multi-Municipalités

## 🔄 Règles de transformation automatique

### Adaptation du nom de municipalité
- **"La Ville de Québec"** → **"La Ville de [MUNICIPALITY_NAME]"**
- **"La Ville"** → **"La Ville de [MUNICIPALITY_NAME]"** (si contexte ambigu)
- **"La municipalité"** → **"La municipalité de [MUNICIPALITY_NAME]"** (si spécification nécessaire)

### Adaptation de la terminologie territoriale

**Québec :**
- "conseils de quartier" → **CONSERVÉ** (terme existant)

**Montréal :**
- "conseils de quartier" → **"conseils d'arrondissement"**
- "quartiers" → **"arrondissements"** (si contexte administratif)

**Laval :**
- "conseils de quartier" → **"conseils de secteur"**
- "quartiers" → **"secteurs"**

**Gatineau :**
- "conseils de quartier" → **"conseils de secteur"**
- "quartiers" → **"secteurs"**

**Longueuil :**
- "conseils de quartier" → **"conseils d'arrondissement"**
- "quartiers" → **"arrondissements"**

**Lévis :**
- "conseils de quartier" → **"conseils d'arrondissement"**
- "quartiers" → **"arrondissements"**

### Adaptation géographique spécifique

#### Questions centre-ville
- **"centre-ville"** → Conservé pour toutes (terme universel)
- Contexte adapté selon la réalité de chaque municipalité

#### Questions transport
- **"transport collectif"** → Conservé (terme universel)
- **"pistes cyclables"** → Conservé (terme universel)

#### Questions patrimoine
- **"vieux bâtiments et patrimoine"** → Adapté selon contexte local
  - Québec : Vieux-Québec, patrimoine mondial
  - Montréal : Architecture victorienne, patrimoine industriel
  - Laval : Patrimoine agricole et résidentiel
  - Gatineau : Patrimoine forestier et résidentiel
  - Longueuil : Patrimoine de banlieue et industriel
  - Lévis : Patrimoine maritime et historique

## 🎯 Priorités génériques communes (8)

Base utilisée pour la question q21_enjeux_prioritaires de toutes les municipalités :

1. **"Transport et mobilité"**
2. **"Logement abordable"**
3. **"Environnement et espaces verts"**
4. **"Sécurité publique"**
5. **"Gestion des finances municipales"**
6. **"Services municipaux"**
7. **"Lutte aux changements climatiques"**
8. **"Patrimoine et identité"**

## 🏗️ Structure des priorités par municipalité

### Format final q21_enjeux_prioritaires :
**[8 priorités génériques] + [2-3 priorités spécifiques locales]**

### Priorités spécifiques par municipalité

**MONTRÉAL (3 spécifiques) :**
- "Extension du métro et REM"
- "Gestion des festivals et événements"
- "Coordination des arrondissements"

**LAVAL (2 spécifiques) :**
- "Développement du SRB"
- "Transport vers Montréal"

**GATINEAU (3 spécifiques) :**
- "Services bilingues"
- "Relations avec Ottawa"
- "Transport interprovincial"

**LONGUEUIL (2 spécifiques) :**
- "Transport métropolitain"
- "Développement aéroportuaire"

**LÉVIS (3 spécifiques) :**
- "Troisième lien routier" *(réutilisé de Québec)*
- "Traverse Québec-Lévis"
- "Patrimoine vs développement moderne"

## 📝 Instructions d'application

### Pour chaque municipalité :

1. **Prendre les 18 questions génériques de base**
2. **Appliquer les transformations terminologiques appropriées**
3. **Ajouter 2-3 questions spécifiques selon les enjeux locaux**
4. **Créer la question priorités avec 8 génériques + spécifiques locales**
5. **Valider la cohérence du tout**

### Exemples de transformation :

**Question originale (Québec) :**
> "La Ville devrait donner plus de pouvoir aux conseils de quartier pour décider des projets locaux."

**Adaptations :**
- **Montréal :** "La Ville de Montréal devrait donner plus de pouvoir aux conseils d'arrondissement pour décider des projets locaux."
- **Laval :** "La Ville de Laval devrait donner plus de pouvoir aux conseils de secteur pour décider des projets locaux."
- **Gatineau :** "La Ville de Gatineau devrait donner plus de pouvoir aux conseils de secteur pour décider des projets locaux."

## ✅ Validation finale

Chaque question adaptée doit :
- [ ] Être grammaticalement correcte
- [ ] Utiliser la terminologie appropriée à la municipalité
- [ ] Conserver le sens et l'intention originale
- [ ] Être pertinente pour le contexte local
- [ ] Respecter les catégories existantes