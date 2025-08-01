"use client"

import React, { useRef, useCallback, useEffect } from 'react'

interface SwipeContainerProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  disabled?: boolean
  threshold?: number
  className?: string
}

interface TouchPosition {
  x: number
  y: number
  time: number
}

/**
 * Composant container pour gérer les gestes de balayage tactiles
 * Optimisé pour les performances avec debouncing et seuils appropriés
 */
export function SwipeContainer({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  disabled = false,
  threshold = 50,
  className = ""
}: SwipeContainerProps) {
  const touchStartRef = useRef<TouchPosition | null>(null)
  const touchEndRef = useRef<TouchPosition | null>(null)
  const isSwipingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculer la distance et direction du swipe
  const calculateSwipe = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return null

    const deltaX = touchEndRef.current.x - touchStartRef.current.x
    const deltaY = touchEndRef.current.y - touchStartRef.current.y
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time
    
    // Ignorer les gestes trop rapides ou trop lents
    if (deltaTime < 50 || deltaTime > 1000) return null
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // Vérifier si le seuil minimum est atteint
    if (distance < threshold) return null
    
    // Déterminer la direction principale
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)
    
    if (isHorizontal) {
      return deltaX > 0 ? 'right' : 'left'
    } else {
      return deltaY > 0 ? 'down' : 'up'
    }
  }, [threshold])

  // Gestionnaire de début de touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isSwipingRef.current) return
    
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    touchEndRef.current = null
  }, [disabled])

  // Gestionnaire de mouvement touch
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return
    
    const touch = e.touches[0]
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    
    // Empêcher le scroll vertical pendant les gestes horizontaux
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)
    
    if (deltaX > deltaY && deltaX > 20) {
      e.preventDefault()
    }
  }, [disabled])

  // Gestionnaire de fin de touch
  const handleTouchEnd = useCallback(() => {
    if (disabled || !touchStartRef.current || isSwipingRef.current) return
    
    const direction = calculateSwipe()
    
    if (direction) {
      isSwipingRef.current = true
      
      // Déclencher le callback approprié
      switch (direction) {
        case 'left':
          onSwipeLeft?.()
          break
        case 'right':
          onSwipeRight?.()
          break
        case 'up':
          onSwipeUp?.()
          break
        case 'down':
          onSwipeDown?.()
          break
      }
      
      // Reset après un délai pour éviter les gestes multiples
      setTimeout(() => {
        isSwipingRef.current = false
      }, 300)
    }
    
    // Reset des positions
    touchStartRef.current = null
    touchEndRef.current = null
  }, [disabled, calculateSwipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  // Gestionnaire d'annulation du touch
  const handleTouchCancel = useCallback(() => {
    touchStartRef.current = null
    touchEndRef.current = null
    isSwipingRef.current = false
  }, [])

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      touchStartRef.current = null
      touchEndRef.current = null
      isSwipingRef.current = false
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`swipe-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        touchAction: disabled ? 'auto' : 'pan-y pinch-zoom',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {children}
    </div>
  )
}

/**
 * Hook pour détecter le support des gestes tactiles
 */
export function useTouchSupport() {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)
  
  React.useEffect(() => {
    const checkTouchSupport = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).msMaxTouchPoints > 0
      )
    }
    
    setIsTouchDevice(checkTouchSupport())
  }, [])
  
  return isTouchDevice
}