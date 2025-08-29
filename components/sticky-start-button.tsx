"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { usePathname } from "next/navigation"
import StartQuestionnaireButton from "@/components/start-questionnaire-button"

export default function StickyStartButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const pathname = usePathname()

  // Masquer le bouton sur certaines pages où il n'est pas pertinent
  const shouldHide = pathname === '/questionnaire' || 
                     pathname === '/resultats' || 
                     pathname === '/profil' ||
                     pathname.startsWith('/partage/')

  // Cacher automatiquement après 10 secondes sur la page d'accueil
  useEffect(() => {
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setIsMinimized(true)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  if (shouldHide || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {!isMinimized ? (
        <div className="flex flex-col items-end gap-2">
          {/* Bouton principal */}
          <StartQuestionnaireButton
            className="bg-midnight-green hover:bg-midnight-green/90 text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2 btn-touch-optimized"
          >
            <Play className="w-4 h-4" />
            Commencer
          </StartQuestionnaireButton>
          
          {/* Bouton pour minimiser */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="w-8 h-8 p-0 rounded-full bg-black/10 hover:bg-black/20 text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        /* Version minimisée - juste l'icône */
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 bg-midnight-green hover:bg-midnight-green/90 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center btn-touch-optimized"
        >
          <Play className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
