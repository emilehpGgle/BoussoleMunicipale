"use client"

import { useEffect } from "react"

/**
 * Composant d'optimisation CSS pour le lazy loading des styles non-critiques
 * Améliore les Core Web Vitals en différant le chargement du CSS non essentiel
 */
export default function CSSOptimizer() {
  useEffect(() => {
    // Lazy load du CSS non-critique après que le contenu critique soit rendu
    const loadNonCriticalCSS = () => {
      const nonCriticalStylesheets = document.querySelectorAll('link[media="print"]')
      
      nonCriticalStylesheets.forEach((link) => {
        if (link instanceof HTMLLinkElement && link.getAttribute('data-onload-applied') !== 'true') {
          link.media = 'all'
          link.setAttribute('data-onload-applied', 'true')
        }
      })
    }

    // Chargement différé après que la page soit interactive
    if (document.readyState === 'complete') {
      setTimeout(loadNonCriticalCSS, 100)
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadNonCriticalCSS, 100)
      })
    }

    // Preload des ressources critiques pour les pages suivantes
    const preloadNextPageResources = () => {
      // Next.js 15 gère automatiquement le CSS chunking et prefetching
      // On peut prefetch les routes importantes au lieu du CSS direct
      const routePrefetchLink = document.createElement('link')
      routePrefetchLink.rel = 'prefetch'
      routePrefetchLink.href = '/test-politique-municipal'
      document.head.appendChild(routePrefetchLink)
    }

    // Preload intelligent basé sur l'interaction utilisateur
    const handleUserInteraction = () => {
      preloadNextPageResources()
      document.removeEventListener('mouseenter', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }

    document.addEventListener('mouseenter', handleUserInteraction, { once: true, passive: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })

    return () => {
      document.removeEventListener('mouseenter', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  return null // Ce composant ne rend rien visuellement
}