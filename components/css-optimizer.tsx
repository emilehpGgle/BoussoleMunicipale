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

    // Next.js 15 gère automatiquement le CSS chunking et prefetching
    // Suppression du prefetch manuel pour éviter les conflits
  }, [])

  return null // Ce composant ne rend rien visuellement
}