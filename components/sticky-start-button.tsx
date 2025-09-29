"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { PrimaryButton } from "@/components/ui/primary-button"
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

  // Afficher le bouton UNIQUEMENT sur la page d'accueil
  const shouldShow = pathname === '/'

  // Cacher automatiquement après 10 secondes sur la page d'accueil
  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsMinimized(true)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [shouldShow])

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

  if (!shouldShow) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {!isMinimized ? (
        <div className="flex flex-col items-end gap-2">
          {/* Bouton principal avec effet rainbow */}
          <PrimaryButton
            className="rounded-full flex items-center gap-2"
            size="md"
            onClick={handleStartQuestionnaire}
          >
            <Play className="w-4 h-4" />
            Commencer
          </PrimaryButton>
          
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
        <PrimaryButton
          onClick={handleStartQuestionnaire}
          className="rounded-full flex items-center gap-2"
          size="md"
        >
          <Play className="w-4 h-4" />
          Commencer
        </PrimaryButton>
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
