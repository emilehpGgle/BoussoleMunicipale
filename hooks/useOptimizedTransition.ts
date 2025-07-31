import { useState, useCallback, useRef } from 'react'

interface UseOptimizedTransitionOptions {
  duration?: number
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

/**
 * Hook optimisé pour gérer les transitions fluides
 * Évite les états intermédiaires et minimise les re-renders
 */
export function useOptimizedTransition(options: UseOptimizedTransitionOptions = {}) {
  const { duration = 100, onTransitionStart, onTransitionEnd } = options
  
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startTransition = useCallback((callback?: () => void) => {
    // Annuler toute transition en cours
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsTransitioning(true)
    onTransitionStart?.()
    
    // Exécuter le callback immédiatement pour l'UX
    callback?.()
    
    // Incrémenter la clé pour forcer le re-render avec animation
    setTransitionKey(prev => prev + 1)
    
    // Terminer la transition rapidement
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      onTransitionEnd?.()
      timeoutRef.current = null
    }, duration)
  }, [duration, onTransitionStart, onTransitionEnd])

  const skipTransition = useCallback((callback?: () => void) => {
    // Annuler toute transition en cours
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    setIsTransitioning(false)
    callback?.()
    setTransitionKey(prev => prev + 1)
  }, [])

  // Cleanup au démontage
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return {
    isTransitioning,
    transitionKey,
    startTransition,
    skipTransition,
    cleanup
  }
}