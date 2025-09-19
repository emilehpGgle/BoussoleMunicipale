"use client"

import {
  PageTransition,
  ScrollReveal,
  AnimatedCard,
  StaggeredList,
  AnimatedProgress,
  AnimatedCounter,
  AnimatedButton
} from "./animation-utils"

// Wrapper Client Components pour animation-utils
// Permet l'utilisation dans des Server Components tout en préservant les animations
export {
  PageTransition as PageTransitionClient,
  ScrollReveal as ScrollRevealClient,
  AnimatedCard as AnimatedCardClient,
  StaggeredList as StaggeredListClient,
  AnimatedProgress as AnimatedProgressClient,
  AnimatedCounter as AnimatedCounterClient,
  AnimatedButton as AnimatedButtonClient
}