"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { usePathname } from "next/navigation"
import StartQuestionnaireButton from "@/components/start-questionnaire-button"
import { RainbowButton } from "@/components/ui/rainbow-button"

export default function StickyStartButton() {
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

  if (shouldHide) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {!isMinimized ? (
        <div className="flex flex-col items-end gap-2">
          {/* Bouton principal avec effet rainbow */}
          <div className="relative overflow-hidden rounded-full">
            <StartQuestionnaireButton asChild>
              <RainbowButton className="text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2 btn-touch-optimized">
                <Play className="w-4 h-4" />
                Commencer
              </RainbowButton>
            </StartQuestionnaireButton>
          </div>
          
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
        /* Version minimisée - avec effet rainbow */
        <div className="relative overflow-hidden rounded-full">
          <RainbowButton
            onClick={() => setIsMinimized(false)}
            className="text-white rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2 btn-touch-optimized"
          >
            <Play className="w-4 h-4" />
            Commencer
          </RainbowButton>
        </div>
      )}
    </div>
  )
}
