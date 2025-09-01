'use client';

import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Shield, Mail, Marketing, Info } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ConsentFormProps {
  onSubmit: (data: ConsentFormData) => void | Promise<void>
  isLoading?: boolean
  className?: string
  variant?: 'modal' | 'inline' | 'minimal'
  showTitle?: boolean
  initialEmail?: string
  initialEmailConsent?: boolean
  initialMarketingConsent?: boolean
}

export interface ConsentFormData {
  email: string
  emailConsent: boolean
  marketingConsent: boolean
}

export function ConsentForm({
  onSubmit,
  isLoading = false,
  className,
  variant = 'inline',
  showTitle = true,
  initialEmail = '',
  initialEmailConsent = false,
  initialMarketingConsent = false,
}: ConsentFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [emailConsent, setEmailConsent] = useState(initialEmailConsent)
  const [marketingConsent, setMarketingConsent] = useState(initialMarketingConsent)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation email si consent email est donné
    if (emailConsent) {
      if (!email.trim()) {
        setEmailError('Adresse email requise pour recevoir vos résultats')
        return
      }
      if (!validateEmail(email)) {
        setEmailError('Adresse email invalide')
        return
      }
    }

    // Si pas de consent email mais email rempli, considérer comme consent implicite
    const finalEmailConsent = emailConsent || (!!email.trim() && validateEmail(email))
    
    await onSubmit({
      email: email.trim(),
      emailConsent: finalEmailConsent,
      marketingConsent,
    })
  }

  const isMinimal = variant === 'minimal'
  const isModal = variant === 'modal'

  const containerClasses = cn(
    "space-y-4",
    {
      'p-6': !isMinimal,
      'p-4': isMinimal,
      'max-w-md': isModal,
    },
    className
  )

  return (
    <div className={containerClasses}>
      {showTitle && !isMinimal && (
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {isModal ? 'Recevoir vos résultats' : 'Sauvegarder vos résultats'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Optionnel : recevez vos résultats par courriel et aidez-nous à améliorer notre service
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Adresse courriel {!isMinimal && <span className="text-muted-foreground">(optionnel)</span>}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="votre@courriel.com"
            className={cn(emailError && 'border-red-500')}
            disabled={isLoading}
          />
          {emailError && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {emailError}
            </p>
          )}
        </div>

        {/* Consentements */}
        <div className="space-y-4">
          {/* Consent email */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="emailConsent"
              checked={emailConsent}
              onCheckedChange={(checked) => setEmailConsent(checked === true)}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="emailConsent" 
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-midnight-green" />
                Recevoir mes résultats par courriel
              </Label>
              <p className="text-xs text-muted-foreground">
                Recevez un résumé de vos affinités politiques et un lien permanent vers vos résultats.
              </p>
            </div>
          </div>

          {/* Consent marketing */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketingConsent"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked === true)}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="marketingConsent" 
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <Marketing className="w-4 h-4 text-orange-600" />
                Communications et recherche marketing
                <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-normal">
                  Optionnel
                </span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Recevez des informations sur les enjeux municipaux et autorisez l&apos;utilisation 
                anonymisée de vos données à des fins de recherche et marketing ciblé.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Vous pouvez retirer ce consentement à tout moment.
              </p>
            </div>
          </div>
        </div>

        {/* Note légale */}
        {!isMinimal && (
          <Card className="p-3 bg-gray-50 border-l-4 border-midnight-green">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-midnight-green mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Vos données sont protégées.</strong> Nous ne vendons jamais vos informations 
                  personnelles sans votre consentement explicite.
                </p>
                <p>
                  Consultez notre{' '}
                  <Link href="/confidentialite" className="text-midnight-green hover:underline">
                    politique de confidentialité
                  </Link>
                  {' '}pour plus de détails.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Bouton de soumission */}
        <div className="flex flex-col gap-3">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
            size={isMinimal ? "sm" : "default"}
          >
            {isLoading ? 'Sauvegarde...' : 'Continuer'}
          </Button>
          
          {!isMinimal && (
            <Button 
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => onSubmit({ email: '', emailConsent: false, marketingConsent: false })}
              disabled={isLoading}
            >
              Passer cette étape
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

// Composant simplifié pour usage rapide
export function QuickConsentForm({ onSubmit, isLoading }: { 
  onSubmit: (data: ConsentFormData) => void | Promise<void>
  isLoading?: boolean 
}) {
  return (
    <ConsentForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      variant="minimal"
      showTitle={false}
    />
  )
}

// Composant pour modal
export function ConsentModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading 
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ConsentFormData) => void | Promise<void>
  isLoading?: boolean 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <ConsentForm
          onSubmit={async (data) => {
            await onSubmit(data)
            onClose()
          }}
          isLoading={isLoading}
          variant="modal"
        />
      </Card>
    </div>
  )
}