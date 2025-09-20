'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AdaptiveQuestionTitleProps {
  children: string
  className?: string
  minFontSize?: number
  maxFontSize?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Hook personnalisé pour calculer la taille de police adaptative
 * basée sur la longueur du texte et la taille de l'écran
 */
function useAdaptiveFontSize(
  text: string,
  minSize: number = 14,
  maxSize: number = 24
) {
  const [fontSize, setFontSize] = useState(maxSize)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const calculateFontSize = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerWidth = container.offsetWidth || 300 // fallback
      const textLength = text.length

      // Calcul basé sur plusieurs facteurs
      let calculatedSize = maxSize

      // Facteur 1: Longueur du texte
      // Réduire la police progressivement pour les textes longs
      if (textLength > 120) {
        calculatedSize = Math.max(minSize, maxSize * 0.7) // 70% pour textes très longs
      } else if (textLength > 80) {
        calculatedSize = Math.max(minSize, maxSize * 0.8) // 80% pour textes longs
      } else if (textLength > 50) {
        calculatedSize = Math.max(minSize, maxSize * 0.9) // 90% pour textes moyens
      }

      // Facteur 2: Largeur du conteneur (responsive)
      const screenWidth = window.innerWidth
      if (screenWidth < 640) { // mobile
        calculatedSize = Math.max(minSize, calculatedSize * 0.85)
      } else if (screenWidth < 768) { // small tablet
        calculatedSize = Math.max(minSize, calculatedSize * 0.9)
      }

      // Facteur 3: Ajustement fin basé sur le nombre de mots
      const wordCount = text.split(' ').length
      if (wordCount > 20) {
        calculatedSize = Math.max(minSize, calculatedSize * 0.9)
      }

      // S'assurer que la taille reste dans les limites
      const finalSize = Math.max(minSize, Math.min(maxSize, calculatedSize))

      setFontSize(finalSize)
    }

    // Calculer immédiatement
    calculateFontSize()

    // Recalculer lors du redimensionnement
    const handleResize = () => {
      requestAnimationFrame(calculateFontSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [text, minSize, maxSize])

  return { fontSize, containerRef }
}

/**
 * Composant de titre adaptatif qui ajuste automatiquement sa taille de police
 * en fonction de la longueur du texte et de la taille de l'écran
 */
export function AdaptiveQuestionTitle({
  children,
  className,
  minFontSize = 14,
  maxFontSize = 24,
  as: Component = 'h2',
  ...props
}: AdaptiveQuestionTitleProps) {
  const { fontSize, containerRef } = useAdaptiveFontSize(
    children,
    minFontSize,
    maxFontSize
  )

  const baseClasses = 'text-foreground font-semibold leading-tight transition-all duration-300'

  return (
    <Component
      ref={containerRef}
      className={cn(baseClasses, className)}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: fontSize > 18 ? '1.3' : '1.4', // Meilleur line-height pour petites polices
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Hook pour obtenir des tailles de police recommandées selon le contexte
 */
export function useContextualFontSizes() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const sizes = {
    mobile: { min: 14, max: 20 },
    tablet: { min: 16, max: 22 },
    desktop: { min: 18, max: 24 },
  }

  return sizes[screenSize]
}