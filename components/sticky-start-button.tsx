"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { useUserResponses } from '@/hooks/useUserResponses'
import { useSession } from '@/hooks/useSession'
import { boussoleQuestions } from '@/lib/boussole-data'

const ContinueOrRestartModal = lazy(() => import('@/components/existing-responses-modal'))

export default function StickyStartButton() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)
  const pathname = usePathname()
  const { sessionToken } = useSession()
  const { getResponseCounts, isLoading } = useUserResponses()

  // Masquer le bouton sur certaines pages où il n'est pas pertinent
  const shouldHide = pathname === '/test-politique-municipal' ||
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

  const handleStartQuestionnaire = async () => {
    try {
      if (!sessionToken) {
        const event = new CustomEvent('openPostalCodeModal')
        window.dispatchEvent(event)
        return
      }

      if (!isLoading) {
        const counts = getResponseCounts
        const totalQuestions = boussoleQuestions.length

        if (counts.total >= totalQuestions) {
          setIsExistingResponsesModalOpen(true)
        } else if (counts.total > 0) {
          setIsExistingResponsesModalOpen(true)
        } else {
          const event = new CustomEvent('openPostalCodeModal')
          window.dispatchEvent(event)
        }
      }
    } catch {
      const event = new CustomEvent('openPostalCodeModal')
      window.dispatchEvent(event)
    }
  }

  if (shouldHide) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {!isMinimized ? (
        <div className="flex flex-col items-end gap-2">
          {/* Bouton principal avec effet rainbow */}
          <RainbowButton 
            className="text-white rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2"
            onClick={handleStartQuestionnaire}
          >
            <Play className="w-4 h-4" />
            Commencer
          </RainbowButton>
          
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
        <RainbowButton
          onClick={handleStartQuestionnaire}
          className="text-white rounded-full px-4 py-3 text-sm font-semibold flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Commencer
        </RainbowButton>
      )}
      <Suspense fallback={<div />}> 
        <ContinueOrRestartModal
          isOpen={isExistingResponsesModalOpen}
          onClose={() => setIsExistingResponsesModalOpen(false)}
          targetPath="/"
        />
      </Suspense>
    </div>
  )
}
