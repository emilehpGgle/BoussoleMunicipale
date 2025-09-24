'use client'

import { PrimaryButton } from './primary-button'

interface StartTestButtonProps {
  children: React.ReactNode
  className?: string
}

/**
 * Composant Client spécialisé pour démarrer le test politique
 * Encapsule l'action d'ouverture du modal postal code
 * Utilisé dans les pages SEO (Server Components) pour respecter l'architecture Next.js 15
 */
export function StartTestButton({ children, className }: StartTestButtonProps) {
  const handleStartTest = () => {
    const event = new CustomEvent('openPostalCodeModal')
    window.dispatchEvent(event)
  }

  return (
    <PrimaryButton
      className={className}
      onClick={handleStartTest}
      size="lg"
      showCompass
    >
      {children}
    </PrimaryButton>
  )
}