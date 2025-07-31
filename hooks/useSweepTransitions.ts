import { useState, useCallback, useRef, useEffect } from 'react'

interface UseSweepTransitionsOptions {
  duration?: number
  exitDuration?: number
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
  preloadNext?: boolean
}

interface TransitionState {
  isTransitioning: boolean
  direction: 'enter' | 'exit' | 'idle'
  transitionKey: number
}

/**
 * Hook optimisé pour gérer les transitions de balayage fluides
 * avec préchargement et optimisations de performance
 */
export function useSweepTransitions(options: UseSweepTransitionsOptions = {}) {
  const { 
    duration = 350, 
    exitDuration = 250,
    onTransitionStart, 
    onTransitionEnd,
    preloadNext = true
  } = options
  
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    direction: 'idle',
    transitionKey: 0
  })
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const nextContentRef = useRef<any>(null)
  
  // Cleanup des timeouts
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current)
      preloadTimeoutRef.current = null
    }
  }, [])

  // Préchargement du contenu suivant
  const preloadContent = useCallback((nextContent: any) => {
    if (preloadNext && nextContent) {
      nextContentRef.current = nextContent
    }
  }, [preloadNext])

  // Démarrer une transition de balayage
  const startSweepTransition = useCallback((
    callback?: () => void,
    direction: 'forward' | 'backward' = 'forward'
  ) => {
    cleanup()
    
    // Phase de sortie
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      direction: 'exit'
    }))
    
    onTransitionStart?.()
    
    // Attendre la fin de l'animation de sortie avant l'entrée
    timeoutRef.current = setTimeout(() => {
      // Exécuter le callback (changement de contenu)
      callback?.()
      
      // Phase d'entrée avec nouvelle clé
      setState(prev => ({
        isTransitioning: true,
        direction: 'enter',
        transitionKey: prev.transitionKey + 1
      }))
      
      // Fin de la transition d'entrée
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isTransitioning: false,
          direction: 'idle'
        }))
        
        onTransitionEnd?.()
        timeoutRef.current = null
      }, duration)
      
    }, exitDuration)
  }, [duration, exitDuration, onTransitionStart, onTransitionEnd, cleanup])

  // Transition instantanée (sans animation)
  const skipTransition = useCallback((callback?: () => void) => {
    cleanup()
    setState(prev => ({
      isTransitioning: false,
      direction: 'idle',
      transitionKey: prev.transitionKey + 1
    }))
    callback?.()
  }, [cleanup])

  // Reset des transitions
  const resetTransition = useCallback(() => {
    cleanup()
    setState({
      isTransitioning: false,
      direction: 'idle',
      transitionKey: 0
    })
  }, [cleanup])

  // Cleanup au démontage
  useEffect(() => {
    return cleanup
  }, [cleanup])

  // Classes CSS pour les animations
  const getAnimationClasses = useCallback(() => {
    if (!state.isTransitioning) {
      return {
        containerClass: 'question-sweep-enter',
        contentClass: 'question-content-enter',
        optionClass: 'option-button-enter'
      }
    }
    
    if (state.direction === 'exit') {
      return {
        containerClass: 'question-sweep-exit',
        contentClass: '',
        optionClass: ''
      }
    }
    
    if (state.direction === 'enter') {
      return {
        containerClass: 'question-sweep-enter',
        contentClass: 'question-content-enter',
        optionClass: 'option-button-enter'
      }
    }
    
    return {
      containerClass: '',
      contentClass: '',
      optionClass: ''
    }
  }, [state.direction, state.isTransitioning])

  return {
    // État de transition
    isTransitioning: state.isTransitioning,
    direction: state.direction,
    transitionKey: state.transitionKey,
    
    // Actions
    startSweepTransition,
    skipTransition,
    resetTransition,
    preloadContent,
    cleanup,
    
    // Classes CSS
    animationClasses: getAnimationClasses(),
    
    // Utilitaires pour optimisation
    shouldPreload: preloadNext && !state.isTransitioning,
    canInteract: !state.isTransitioning || state.direction === 'enter'
  }
}

/**
 * Hook utilitaire pour détecter les préférences de mouvement réduit
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}

/**
 * Hook pour optimiser les performances d'animation
 */
export function useAnimationPerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    // Détecter les appareils peu performants
    const checkPerformance = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isOldDevice = /android [1-4]|iphone os [1-9]_|cpu os [1-9]_/.test(userAgent)
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
      const hasSlowConnection = (navigator as any).connection && 
        ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType)
      
      setIsLowPerformance(isOldDevice || hasLowMemory || hasSlowConnection)
    }
    
    checkPerformance()
  }, [])
  
  return {
    isLowPerformance,
    shouldReduceAnimations: isLowPerformance,
    optimizedDuration: isLowPerformance ? 200 : 350
  }
}