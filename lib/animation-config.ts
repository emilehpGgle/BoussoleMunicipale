/**
 * Configuration globale des animations
 * Implémente MUST #9 du plan interactions_transitions.md
 * Durées: 150-400ms, entrées ease-out, sorties ease-in
 */

import * as React from "react"

// Durées standardisées (en ms)
export const ANIMATION_DURATIONS = {
  // Micro-interactions (MUST #2)
  microPress: 120,
  tap: 150,
  
  // Interactions standards (MUST #1)
  hover: 200,
  focus: 180,
  
  // Transitions d'interface
  fast: 200,
  normal: 280,
  slow: 350,
  
  // Overlays et modales (MUST #7)
  overlay: 250,
  modal: 300,
  
  // Animations de contenu (MUST #6)
  fadeIn: 280,
  slideIn: 320,
  
  // Stagger delays (max 6 éléments)
  stagger: 70,
  maxStagger: 6 * 70, // 420ms max
} as const

// Courbes d'animation standardisées
export const ANIMATION_EASINGS = {
  // Entrées - ease-out pour naturel
  easeOut: "easeOut",
  easeOutStandard: [0.25, 0.8, 0.25, 1] as const,
  easeOutSoft: [0.2, 0.8, 0.2, 1] as const,
  
  // Sorties - ease-in pour disparition
  easeIn: "easeIn", 
  easeInStandard: [0.4, 0, 1, 1] as const,
  
  // Spring pour rebonds subtils
  spring: "backOut",
  springSoft: [0.2, 0.9, 0.2, 1.2] as const,
  
  // Linéaire pour looping
  linear: "linear",
} as const

// Configuration par type d'animation
export const ANIMATION_PRESETS = {
  // Boutons et éléments cliquables
  button: {
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        duration: ANIMATION_DURATIONS.hover / 1000,
        ease: ANIMATION_EASINGS.easeOut,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: ANIMATION_DURATIONS.microPress / 1000,
        ease: ANIMATION_EASINGS.easeIn,
      },
    },
  },
  
  // Cards interactives
  card: {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: ANIMATION_DURATIONS.normal / 1000,
        ease: ANIMATION_EASINGS.easeOut,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: ANIMATION_DURATIONS.tap / 1000,
        ease: ANIMATION_EASINGS.easeIn,
      },
    },
  },
  
  // Images
  image: {
    hover: {
      scale: 1.05,
      transition: {
        duration: ANIMATION_DURATIONS.normal / 1000,
        ease: ANIMATION_EASINGS.easeOut,
      },
    },
  },
  
  // Entrées au scroll
  fadeIn: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: ANIMATION_DURATIONS.fadeIn / 1000,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: ANIMATION_DURATIONS.slideIn / 1000,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: ANIMATION_EASINGS.spring,
    },
  },
  
  // Modales
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: ANIMATION_DURATIONS.overlay / 1000,
        ease: ANIMATION_EASINGS.easeOut,
      },
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: -10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -10 },
      transition: {
        duration: ANIMATION_DURATIONS.modal / 1000,
        ease: ANIMATION_EASINGS.easeOutStandard,
      },
    },
  },
  
  // Toasts
  toast: {
    slideInRight: {
      initial: { opacity: 0, x: 100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 100, scale: 0.9 },
      transition: {
        duration: ANIMATION_DURATIONS.fast / 1000,
        ease: ANIMATION_EASINGS.easeOut,
      },
    },
  },
} as const

// Hook pour respecter prefers-reduced-motion
export function useReducedMotionConfig() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Durées réduites si l'utilisateur préfère moins d'animations
  const reducedDurations = React.useMemo(() => {
    if (!prefersReducedMotion) return ANIMATION_DURATIONS

    return Object.fromEntries(
      Object.entries(ANIMATION_DURATIONS).map(([key, value]) => [
        key,
        Math.max(value * 0.5, 100), // Réduire de 50%, min 100ms
      ])
    )
  }, [prefersReducedMotion])

  return {
    prefersReducedMotion,
    durations: reducedDurations,
    // Désactiver les animations complexes si reduced motion
    shouldAnimate: !prefersReducedMotion,
    // Garder seulement les micro-interactions essentielles
    essentialOnly: prefersReducedMotion,
  }
}

// Utilitaires pour les classes CSS
export const FOCUS_CLASSES = {
  ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ringPrimary: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  ringDestructive: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2",
  
  // États focus pour différents éléments
  button: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
  input: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-all duration-200",
  link: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm transition-all duration-200",
  card: "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all duration-200",
} as const

// Performance monitoring
export function useAnimationPerformance() {
  const [fps, setFps] = React.useState(60)
  const [isLowPerformance, setIsLowPerformance] = React.useState(false)

  React.useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const now = performance.now()
      
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime))
        setFps(currentFps)
        setIsLowPerformance(currentFps < 45) // Seuil de performance
        
        frameCount = 0
        lastTime = now
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)
    
    return () => cancelAnimationFrame(animationId)
  }, [])

  return {
    fps,
    isLowPerformance,
    // Durées adaptatives selon la performance
    adaptiveDuration: isLowPerformance 
      ? ANIMATION_DURATIONS.fast 
      : ANIMATION_DURATIONS.normal,
  }
}
