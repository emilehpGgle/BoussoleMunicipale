'use client'

import { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useUserResponses } from '@/hooks/useUserResponses'
import { useSession } from '@/hooks/useSession'
import { boussoleQuestions } from '@/lib/boussole-data'
import { PrimaryButton } from '@/components/ui/primary-button'

const ContinueOrRestartModal = lazy(() => import('@/components/existing-responses-modal'))

type StartQuestionnaireButtonProps = {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function StartQuestionnaireButton({ className, variant = 'default', size, children, onClick, ...props }: StartQuestionnaireButtonProps) {
  const { sessionToken } = useSession()
  const { getResponseCounts, isLoading } = useUserResponses()
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)

  const handleStartQuestionnaire = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call the passed onClick handler first if it exists
    onClick?.(event)

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

  // Use PrimaryButton for primary variant, regular Button for others
  const ButtonComponent = variant === 'primary' ? (
    <PrimaryButton
      onClick={handleStartQuestionnaire}
      className={className}
      size={size}
      showCompass
      {...props}
    >
      {children}
    </PrimaryButton>
  ) : (
    <Button onClick={handleStartQuestionnaire} className={className} variant={variant} {...props}>
      {children}
    </Button>
  )

  return (
    <>
      {ButtonComponent}
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


