# Optimisation Logo SVG - Guide Critique

## ⚠️ PROBLÈME CRITIQUE IDENTIFIÉ

Le fichier `public/logo-main.svg` fait **384 KiB** - c'est ÉNORME pour un logo et cause **95% des problèmes de performance mobile**.

### Impact Performance Actuel
- **LCP Mobile: 4.4s** (doit être <2.5s)
- **Resource Load Delay: 650ms** - Le logo bloque le rendu initial
- **Resource Load Duration: 480ms** - Téléchargement du fichier 384 KiB
- **Total Impact: ~1.1s de latence** causée uniquement par le logo

### Pourquoi 384 KiB?
Le SVG contient:
- ✗ Images PNG embedded en base64 (`data:image/png;base64,...`)
- ✗ Filtres inutiles (`feColorMatrix`, masques)
- ✗ Métadonnées d'export Illustrator/Inkscape non nettoyées
- ✗ Paths non optimisés

## 🎯 SOLUTION: Optimiser à ~15 KiB (-97%)

### Option 1: SVGO (Recommandé - Conservation du format)

**Installation:**
```bash
npm install -g svgo
# ou
pnpm add -D svgo
```

**Commande d'optimisation:**
```bash
cd "C:\Users\EPelletier\Desktop\Boussole municipale\public"

# Créer backup
copy logo-main.svg logo-main.backup.svg

# Optimiser (réduction estimée 384 KiB → 15-20 KiB)
svgo logo-main.svg -o logo-main-optimized.svg --multipass

# Si satisfait, remplacer l'original
move /Y logo-main-optimized.svg logo-main.svg
```

**Configuration SVGO avancée** (si nécessaire):
```bash
svgo logo-main.svg \
  --multipass \
  --precision=2 \
  --remove-dimensions \
  --remove-metadata \
  --remove-comments \
  --remove-hidden-elems \
  --remove-empty-attrs \
  --clean-ids \
  --convert-colors \
  -o logo-main-optimized.svg
```

### Option 2: Convertir en PNG (Alternative)

**Si SVGO ne réduit pas assez:**

1. **Exporter en PNG haute résolution:**
   - Ouvrir `logo-main.svg` dans Illustrator/Inkscape
   - Exporter 380px width (2x la taille affichée max: 190px)
   - Format PNG-24 avec transparence

2. **Optimiser avec TinyPNG:**
   - Aller sur https://tinypng.com/
   - Upload le PNG exporté
   - Télécharger version optimisée (~8-12 KiB estimé)

3. **Remplacer dans le code:**
```tsx
// components/site-header.tsx ligne 116-127
<Image
  src="/logo-main.png"  // Changer de .svg à .png
  alt="Boussole Municipale Logo"
  fill
  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 190px"
  style={{ objectFit: "contain", objectPosition: "left center" }}
  priority
  fetchPriority="high"
  loading="eager"
  quality={95}
  className="transition-opacity duration-200"
/>
```

### Option 3: Optimisation Manuelle (Avancé)

**Si vous avez Illustrator/Inkscape:**

1. Ouvrir `logo-main.svg`
2. Supprimer calques cachés
3. Convertir images embedded en paths vectoriels
4. Simplifier les paths (Object → Path → Simplify)
5. Supprimer filtres et effets inutiles
6. Exporter en SVG optimisé:
   - ☑ Responsive (remove width/height)
   - ☑ Minimize (inline styles)
   - ☑ Decimal places: 2

## 📊 Résultats Attendus

**Avant optimisation:**
- Taille: 384 KiB
- Téléchargement mobile: 480ms
- LCP: 4.4s

**Après optimisation (SVGO):**
- Taille: ~15 KiB (-97%)
- Téléchargement mobile: ~25ms (-95%)
- **LCP estimé: ~2.3s (-48%)**

**Après optimisation (PNG):**
- Taille: ~10 KiB (-97%)
- Téléchargement mobile: ~18ms (-96%)
- **LCP estimé: ~2.2s (-50%)**

## ✅ Validation Post-Optimisation

Après optimisation, vérifier:

```bash
# 1. Vérifier taille finale
ls -lh public/logo-main.*

# 2. Build Next.js
pnpm build

# 3. Tester visuellement (vérifier que le logo s'affiche correctement)
pnpm dev
# Naviguer vers http://localhost:3000

# 4. PageSpeed Insights Mobile
# https://pagespeed.web.dev/analysis?url=https://boussolemunicipale.com
```

**Critères de succès:**
- ✅ Logo < 20 KiB
- ✅ LCP Mobile < 2.5s
- ✅ Resource Load Duration < 50ms
- ✅ Visual identique à l'original

## 🚨 URGENT - À faire MAINTENANT

Le logo **DOIT** être optimisé avant tout autre travail de performance. C'est le goulot d'étranglement #1 du site mobile.

**Étapes recommandées:**
1. Installer SVGO
2. Exécuter l'optimisation
3. Vérifier visuellement
4. Commit + deploy
5. Re-tester PageSpeed Insights

**Temps estimé:** 10-15 minutes
**Impact:** -1s sur LCP mobile (50% d'amélioration)
