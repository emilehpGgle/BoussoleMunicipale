# Interactions & Transitions Essentielles pour un Site Moderne

## 1. Checklist Priorisée (MoSCoW)

### MUST (à faire en priorité)

1. **États hover/cohérents (boutons, liens, cards)**
   - Effort: S — Impact: 90%
   - Action: hover = légère élévation (+shadow-md), légère translation Y-1, +1–2% scale, underline animé pour liens.
   - Critères: aucun élément cliquable sans feedback visible; 200–250 ms, `ease-out`.

2. **Feedback au clic (tap/click ripple ou micro-press)**
   - Effort: S — Impact: 85%
   - Action: micro-scale 0.98 pendant 120–160 ms + retour élastique.
   - Critères: tous les boutons/CTA réagissent au clic; pas de “flash”.

3. **Skeletons + content shimmer (chargements)**
   - Effort: M — Impact: 88%
   - Action: skeletons sur cartes/listes/images; shimmer linéaire 1.5s.
   - Critères: jamais d’écran “vide” >150ms.

4. **Navbar sticky qui se compacte au scroll**
   - Effort: M — Impact: 80%
   - Action: passer de 72→56px, fond légèrement opaque (backdrop-blur).
   - Critères: transition fluide <250 ms, lisibilité conservée.

5. **Labels flottants pour formulaires + validation inline**
   - Effort: M — Impact: 82%
   - Action: placeholder → label flottant au focus; succès/erreur en temps réel.
   - Critères: focus visible (outline/anneau Tailwind); messages clairs.

6. **Transitions d’entrée au scroll (fade-in + translate)**
   - Effort: S — Impact: 78%
   - Action: `opacity 0→1` + `translateY 12→0px`, 240–320 ms, stagger 60–90 ms.
   - Critères: aucune animation lourde sur mobile bas de gamme.

7. **Modales/menus avec overlay et blur**
   - Effort: S — Impact: 76%
   - Action: overlay noir 20–40% + blur; modale = fade + scale 0.98→1.
   - Critères: évasion ESC/clic extérieur; focus trap.

8. **États focus/accessibilité unifiés**
   - Effort: S — Impact: 72%
   - Action: anneau focus Tailwind (`ring-2 ring-offset-2`).
   - Critères: tab-nav complet; contrastes AA.

9. **Vitesse et courbes d’animation globales**
   - Effort: S — Impact: 70%
   - Action: 150–400 ms; entrées `ease-out`, sorties `ease-in`.
   - Critères: pas d’incohérences; animations <500 ms.

10. **Images zoom-in léger (hover/tap)**
   - Effort: S — Impact: 68%
   - Action: scale 1.02 + shadow douce, 200 ms.
   - Critères: pas de crop gênant; perf OK.

### SHOULD (important après les MUST)

11. **Indicateur de progression de lecture (top bar)**
    - Effort: S — Impact: 60%
    - Critères: synchro fluide au scroll.

12. **Accordéons/lists avec hauteur auto animée**
    - Effort: M — Impact: 62%
    - Critères: transition hauteur ≈260 ms, icône chevron pivot.

13. **Page transitions (entre routes)**
    - Effort: M — Impact: 65%
    - Critères: fade/slide discret <280 ms; navbar persistante.

14. **Parallaxe légère sur headers/hero**
    - Effort: M — Impact: 58%
    - Critères: déplacement <8px; désactivée si perf faible.

15. **Toasters non intrusifs (succès/erreur)**
    - Effort: S — Impact: 55%
    - Critères: auto-dismiss 3–5s, focus-safe.

16. **Micro-animations d’icônes (hamburger ↔ croix)**
    - Effort: S — Impact: 50%
    - Critères: 180–220 ms, sans “saut”.

17. **États “empty”, “no results”, “error” illustrés**
    - Effort: M — Impact: 63%
    - Critères: CTA clair pour sortir de l’impasse.

18. **CTA principal avec “pulse” très léger au montage**
    - Effort: S — Impact: 48%
    - Critères: 1 seule fois; amplitude <4%.

### COULD (nice-to-have selon temps)

19. **Motion-tokens (durées, easings) centralisés**
    - Effort: S — Impact: 40%
    - Critères: variables Tailwind/TS exportées.

20. **Animations de listes (réordonner, ajouter/retirer)**
    - Effort: M — Impact: 42%
    - Critères: stagger et layout spring.

21. **“Pull to refresh” sur mobile (PWA)**
    - Effort: M — Impact: 38%
    - Critères: haptics si possible.

22. **Effet “ink ripple” matériel sur boutons secondaires**
    - Effort: M — Impact: 35%
    - Critères: discret, pas partout.

23. **Zoom image plein écran avec pinch/drag**
    - Effort: M — Impact: 37%
    - Critères: close clair; swipe-down pour fermer.

24. **Lottie/JSON pour micro-succès (check animé)**
    - Effort: S — Impact: 33%
    - Critères: <40 KB; fallback statique.

### WON’T (pour l’instant)

- Parallaxe lourde multi-couches sur toutes les sections (risque perf).
- Animations 3D/WebGL décoratives sans lien fonctionnel.
- Cursors personnalisés envahissants.
- Surcharge de glassmorphism réduisant la lisibilité.

## Directives Globales

- **Durées**: 200–280 ms par défaut; 120–160 ms pour micro-press; 280–360 ms pour overlays/modales.
- **Easings** (tokens à définir):
  - `--ease-out-standard: cubic-bezier(.2,.8,.2,1)`
  - `--ease-in-standard: cubic-bezier(.4,0,1,1)`
  - `--ease-spring-soft: cubic-bezier(.2, .9, .2, 1.2)` (rebond subtil)
- **Stagger**: 60–90 ms par élément, max 6 éléments consécutifs.
- **Accessibilité**: respecter `prefers-reduced-motion` (désactiver ou réduire les animations).
- **Performance**: animer uniquement `transform`/`opacity`; éviter layout/reflow.

## Plan d’Implémentation (10 jours indicatif)

- **J1–J2**: Tokens motion + Hover/Click/Focus unifiés (MUST 1,2,8,9).
- **J3**: Skeletons + Toasters (MUST 3 + SHOULD 15).
- **J4**: Navbar sticky + Modales (MUST 4,7).
- **J5**: Formulaires (MUST 5).
- **J6**: Entrées au scroll (MUST 6).
- **J7**: Images zoom (MUST 10) + Accordéons (SHOULD 12).
- **J8**: Page transitions (SHOULD 13).
- **J9**: Empty/error states (SHOULD 17).
- **J10**: QA accessibilité + perf + `prefers-reduced-motion`.

## Mesures de Succès (avant/après)

- **Taux de clic sur CTA primaire**: +10–20% (prob. 60–70%).
- **Temps jusqu’à interaction (TTI) perçu**: −15–25% (prob. 65%).
- **Form completion rate**: +8–15% (prob. 55–65%).
- **Bounce rate pages clés**: −5–12% (prob. 50–60%).

---

## 2. Snippets (React + Tailwind + Framer Motion)

### 2.1 Hover States (boutons, cards, liens)

```tsx
import { motion } from "framer-motion";

export function ModernButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="px-4 py-2 rounded-lg bg-teal-600 text-white font-medium shadow-md hover:shadow-lg"
    >
      {children}
    </motion.button>
  );
}
```

---

### 2.2 Feedback au clic (micro-press)

```tsx
<motion.div
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
  className="p-4 rounded-xl bg-white shadow cursor-pointer"
>
  Carte cliquable
</motion.div>
```

---

### 2.3 Skeleton Loader (avec shimmer)

```tsx
export function SkeletonCard() {
  return (
    <div className="w-full h-40 rounded-lg bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
```

**Ajouter cette animation dans `tailwind.config.js`** :

```js
extend: {
  keyframes: {
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
}
```

---

### 2.4 Navbar sticky qui se compacte

```tsx
"use client";
import { useEffect, useState } from "react";

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full transition-all ${
        scrolled ? "h-14 bg-white/70 backdrop-blur shadow" : "h-20 bg-transparent"
      } flex items-center px-6`}
    >
      <span className="font-bold">Logo</span>
    </div>
  );
}
```

---

### 2.5 Label flottant (formulaire)

```tsx
import { useState } from "react";

export function FloatingLabelInput() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        id="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full border rounded-md px-3 pt-5 pb-2"
        placeholder=" "
      />
      <label
        htmlFor="name"
        className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600"
      >
        Nom
      </label>
    </div>
  );
}
```

---

### 2.6 Entrées au scroll (Fade-in + translate)

```tsx
import { motion } from "framer-motion";

export function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

### 2.7 Modale avec overlay et blur

```tsx
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold">Titre</h2>
              <p className="text-gray-600">Contenu de la modale...</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

### 2.8 Image zoom-in léger (hover/tap)

```tsx
<motion.img
  src="/image.jpg"
  alt="Exemple"
  className="rounded-lg shadow"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
/>
```

---

## 3. Références de sites modernes (à étudier)

> Objectif: observer les patterns de vitesse, lisibilité, transitions sobres, et feedback clair.

- **Stripe — ressources UX checkout & vitesse**
  - Voir leurs guides récents sur hiérarchie visuelle, flows multi-étapes, et instant payment.
  - Points à noter: densité d’info maîtrisée, états focus/erreur exemplaires, transitions rapides.
  - Réfs: articles 2025 sur Checkout UI et instant payment, comparatif one-page vs multistep.

- **Vercel — sites & plateformes d’événements (Ship)**
  - Page rapides, transitions discrètes, visuels generative/3D intégrés sans gêner l’UX.
  - Noter header sticky avec animations fines, cohérence motion.

- **Framer — blog d’exemples interactifs**
  - Études de cas d’interactions (parallaxe légère, entrée au scroll, curseurs custom modérés).

- **Raycast — ergonomie, vitesse perçue**
  - Minimalisme, focus sur productivité, animations sobres; bon référentiel de micro-motion.

- **Superhuman — clarté et vitesse côté contenu**
  - Lisibilité, contrastes, focus states; patterns de collaboration et mise en page.

- **Pitch — présentations web animées**
  - Animations/Transitions élégantes, structure d’info, gabarits propres.

- **Notion — design system & guidelines**
  - Documentation claire sur éléments d’interface et principes (couleurs, typographie, interactions).

- **Réflexion critique — "You Don’t Need Animations"**
  - Lignes directrices pour éviter la sur-animation; rappeler le “pourquoi” de chaque motion.

*(Voir la conversation pour les liens et sources.)*

