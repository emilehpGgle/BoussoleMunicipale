'use client'

import { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useUserResponses } from '@/hooks/useUserResponses'
import { useSession } from '@/hooks/useSession'
import { boussoleQuestions } from '@/lib/boussole-data'

const ContinueOrRestartModal = lazy(() => import('@/components/existing-responses-modal'))

type StartQuestionnaireButtonProps = {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive'
  children?: React.ReactNode
}

export function StartQuestionnaireButton({ className, variant = 'default', children }: StartQuestionnaireButtonProps) {
  const { sessionToken } = useSession()
  const { getResponseCounts, isLoading } = useUserResponses()
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)

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

  return (
    <>
      <Button onClick={handleStartQuestionnaire} className={className} variant={variant}>
        {children}
      </Button>
      <Suspense fallback={<div />}> 
        <ContinueOrRestartModal
          isOpen={isExistingResponsesModalOpen}
          onClose={() => setIsExistingResponsesModalOpen(false)}
          targetPath="/"
        />
      </Suspense>
    </>
  )
}

export default StartQuestionnaireButton


