"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void> | void
  disabled?: boolean
  threshold?: number
  className?: string
}

/**
 * Composant Pull-to-Refresh pour mobile
 * Optimisé pour les performances et accessible
 */
export function PullToRefresh({
  children,
  onRefresh,
  disabled = false,
  threshold = 80,
  className = ""
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  
  const startY = useRef<number>(0)
  const currentY = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const canPull = useRef<boolean>(false)

  // Vérifier si on peut déclencher le pull-to-refresh
  const checkCanPull = useCallback(() => {
    if (!containerRef.current) return false
    const scrollTop = containerRef.current.scrollTop || window.scrollY
    return scrollTop <= 5 // Seuil de tolérance pour être en haut de page
  }, [])

  // Gestionnaire de début de touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return
    
    canPull.current = checkCanPull()
    if (!canPull.current) return
    
    startY.current = e.touches[0].clientY
    currentY.current = startY.current
  }, [disabled, isRefreshing, checkCanPull])

  // Gestionnaire de mouvement touch
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing || !canPull.current) return
    
    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current
    
    if (deltaY > 0) {
      // Calcul de la distance avec résistance progressive
      const resistance = 0.5
      const adjustedDistance = Math.pow(deltaY * resistance, 0.8)
      
      setPullDistance(Math.min(adjustedDistance, threshold * 1.5))
      setIsPulling(deltaY > 10)
      
      // Empêcher le scroll natif pendant le pull
      if (deltaY > 10) {
        e.preventDefault()
      }
    }
  }, [disabled, isRefreshing, threshold])

  // Gestionnaire de fin de touch
  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing || !canPull.current) return
    
    if (pullDistance >= threshold && isPulling) {
      setIsRefreshing(true)
      
      try {
        await onRefresh()
      } catch (error) {
        console.error('Erreur lors du refresh:', error)
      } finally {
        // Délai minimum pour montrer l'animation
        setTimeout(() => {
          setIsRefreshing(false)
          setPullDistance(0)
          setIsPulling(false)
        }, 500)
      }
    } else {
      // Animation de retour
      setPullDistance(0)
      setIsPulling(false)
    }
    
    canPull.current = false
  }, [disabled, isRefreshing, pullDistance, threshold, isPulling, onRefresh])

  // Reset lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isPulling && pullDistance > 0) {
        setPullDistance(0)
        setIsPulling(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPulling, pullDistance])

  // Calculer l'opacité et la rotation de l'icône
  const iconOpacity = Math.min(pullDistance / threshold, 1)
  const iconRotation = (pullDistance / threshold) * 180
  const shouldTrigger = pullDistance >= threshold && isPulling

  return (
    <div
      ref={containerRef}
      className={`pull-to-refresh-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${isPulling ? Math.min(pullDistance * 0.5, 40) : 0}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Indicateur de pull-to-refresh */}
      <div
        className="pull-indicator"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: iconOpacity,
          transition: isPulling ? 'none' : 'opacity 0.3s ease-out',
          zIndex: 10
        }}
      >
        <div 
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg ${
            isRefreshing ? 'animate-spin' : ''
          }`}
          style={{
            transform: `rotate(${isRefreshing ? 0 : iconRotation}deg)`,
            transition: isRefreshing ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <RotateCcw 
            className={`w-6 h-6 ${shouldTrigger ? 'text-white' : 'text-primary-foreground'}`}
          />
        </div>
        
        {/* Message d'état */}
        <div className="text-center mt-2">
          <p className="text-xs font-medium text-muted-foreground">
            {isRefreshing 
              ? 'Actualisation...' 
              : shouldTrigger 
                ? 'Relâchez pour actualiser'
                : 'Tirez pour actualiser'
            }
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      {children}
    </div>
  )
}

/**
 * Hook pour détecter si le pull-to-refresh est supporté
 */
export function usePullToRefreshSupport() {
  const [isSupported, setIsSupported] = useState(false)
  
  useEffect(() => {
    // Détecter les appareils tactiles mobiles
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    setIsSupported(hasTouch && isMobile)
  }, [])
  
  return isSupported
}