"use client"

/*
 * 🔄 LEGACY RESULTS PAGE - INTELLIGENT ADAPTER
 *
 * Cette page sert d'adapter pour l'ancienne URL /resultats
 * Elle redirige automatiquement vers /{municipality}/resultats
 *
 * Architecture multi-municipalités:
 * - Détecte la municipalité via localStorage (lastMunicipality)
 * - Fallback sur 'quebec' par défaut
 * - Redirige vers /quebec/resultats ou /montreal/resultats selon le contexte
 */

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LegacyResultsPage() {
  const router = useRouter()

  useEffect(() => {
    // Détecter la municipalité avec plusieurs fallbacks
    let targetMunicipality = 'quebec' // Fallback par défaut

    // 1. Vérifier localStorage pour municipalité précédente
    if (typeof window !== 'undefined') {
      const storedMunicipality = localStorage.getItem('lastMunicipality')
      if (storedMunicipality && ['quebec', 'montreal', 'laval', 'gatineau', 'longueuil', 'levis'].includes(storedMunicipality)) {
        targetMunicipality = storedMunicipality
      }
    }

    // 2. Rediriger vers la nouvelle architecture
    console.log(`🔄 [Legacy Results] Redirection vers /${targetMunicipality}/resultats`)
    router.replace(`/${targetMunicipality}/resultats`)
  }, [router])

  // État de redirection - affichage minimal pendant transition
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-green mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirection vers vos résultats...</p>
      </div>
    </div>
  )
}