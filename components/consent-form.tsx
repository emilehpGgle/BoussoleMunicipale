'use client';

import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Shield, Mail, Target, Phone, BarChart3, Info } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ConsentFormProps {
  onSubmit: (data: ConsentFormData) => void | Promise<void>
  isLoading?: boolean
  className?: string
  variant?: 'modal' | 'inline' | 'minimal' | 'initial'
  showTitle?: boolean
  initialEmail?: string
  initialPhone?: string
  initialEmailConsent?: boolean
  initialPhoneConsent?: boolean
  initialMarketingConsent?: boolean
  initialAnalyticsConsent?: boolean
}

export interface ConsentFormData {
  // Données de contact
  email: string
  phone: string

  // Consentements
  analyticsConsent: boolean // Collecte anonyme - obligatoire pour utiliser le service
  emailConsent: boolean // Recevoir résultats par email
  phoneConsent: boolean // Recevoir communications par SMS
  marketingConsent: boolean // Marketing et partage avec partenaires
}

export function ConsentForm({
  onSubmit,
  isLoading = false,
  className,
  variant = 'inline',
  showTitle = true,
  initialEmail = '',
  initialPhone = '',
  initialEmailConsent = false,
  initialPhoneConsent = false,
  initialMarketingConsent = false,
  initialAnalyticsConsent = true, // Pré-coché par défaut
}: ConsentFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [emailConsent, setEmailConsent] = useState(initialEmailConsent)
  const [phoneConsent, setPhoneConsent] = useState(initialPhoneConsent)
  const [marketingConsent, setMarketingConsent] = useState(initialMarketingConsent)
  const [analyticsConsent, setAnalyticsConsent] = useState(initialAnalyticsConsent)
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    // Format canadien : XXX-XXX-XXXX ou (XXX) XXX-XXXX ou XXXXXXXXXX
    const phoneRegex = /^(\+?1[-.\s]?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) {
      setEmailError('')
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value)
    if (phoneError) {
      setPhoneError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Le consentement analytique est obligatoire
    if (!analyticsConsent) {
      alert('Vous devez accepter la collecte de données analytiques pour utiliser ce service.')
      return
    }

    // Validation email si consent email est donné
    if (emailConsent) {
      if (!email.trim()) {
        setEmailError('Adresse courriel requise pour recevoir vos résultats')
        return
      }
      if (!validateEmail(email)) {
        setEmailError('Adresse courriel invalide')
        return
      }
    }

    // Validation téléphone si consent téléphone est donné
    if (phoneConsent) {
      if (!phone.trim()) {
        setPhoneError('Numéro de téléphone requis pour recevoir des communications SMS')
        return
      }
      if (!validatePhone(phone)) {
        setPhoneError('Numéro de téléphone invalide (format: XXX-XXX-XXXX)')
        return
      }
    }

    // Si pas de consent email mais email rempli, considérer comme consent implicite
    const finalEmailConsent = emailConsent || (!!email.trim() && validateEmail(email))
    // Même logique pour le téléphone
    const finalPhoneConsent = phoneConsent || (!!phone.trim() && validatePhone(phone))

    await onSubmit({
      email: email.trim(),
      phone: phone.trim(),
      analyticsConsent,
      emailConsent: finalEmailConsent,
      phoneConsent: finalPhoneConsent,
      marketingConsent,
    })
  }

  const isMinimal = variant === 'minimal'
  const isModal = variant === 'modal'
  const isInitial = variant === 'initial'

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
            {isInitial ? 'Préférences de confidentialité' : isModal ? 'Recevoir vos résultats' : 'Sauvegarder vos résultats'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isInitial ? 'Gérez vos préférences de collecte de données' : 'Optionnel : recevez vos résultats et gérez vos communications'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Consentement obligatoire pour données analytiques */}
        {(isInitial || !isMinimal) && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="analyticsConsent"
                checked={analyticsConsent}
                onCheckedChange={(checked) => setAnalyticsConsent(checked === true)}
                disabled={isLoading}
                className="mt-1"
              />
              <div className="space-y-1 flex-1">
                <Label
                  htmlFor="analyticsConsent"
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Collecte de données analytiques
                  <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-normal">
                    Obligatoire
                  </span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  J&apos;accepte la collecte anonyme de mes données de navigation et réponses à des fins
                  d&apos;analyse statistique et d&apos;amélioration du service. Ces données sont conservées
                  pendant 2 ans maximum.
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3 text-blue-600" />
                  <p className="text-xs text-blue-600">
                    Requis pour utiliser la Boussole Municipale
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Section 2: Informations de contact (optionnel) */}
        <div className="space-y-4">
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

          {/* Champ téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Numéro de téléphone {!isMinimal && <span className="text-muted-foreground">(optionnel)</span>}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="514-XXX-XXXX"
              className={cn(phoneError && 'border-red-500')}
              disabled={isLoading}
            />
            {phoneError && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {phoneError}
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Consentements optionnels pour communications */}
        <div className="space-y-4">
          {/* Consent email */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="emailConsent"
              checked={emailConsent}
              onCheckedChange={(checked) => setEmailConsent(checked === true)}
              disabled={isLoading || !email}
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

          {/* Consent SMS */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="phoneConsent"
              checked={phoneConsent}
              onCheckedChange={(checked) => setPhoneConsent(checked === true)}
              disabled={isLoading || !phone}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label
                htmlFor="phoneConsent"
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-green-600" />
                Recevoir des notifications SMS
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-normal">
                  Optionnel
                </span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Recevez des rappels importants sur les élections et vos résultats par texto.
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
                <Target className="w-4 h-4 text-orange-600" />
                Communications marketing et partenaires
                <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-normal">
                  Optionnel
                </span>
              </Label>
              <p className="text-xs text-muted-foreground">
                J&apos;accepte de recevoir des offres de nos partenaires sélectionnés et autorise le partage
                de mes données à des fins de marketing ciblé et de recherche commerciale.
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
          
          {!isMinimal && !isInitial && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => onSubmit({
                email: '',
                phone: '',
                analyticsConsent: true, // Toujours true par défaut
                emailConsent: false,
                phoneConsent: false,
                marketingConsent: false
              })}
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
      initialAnalyticsConsent={true}
    />
  )
}

// Composant pour modal
export function ConsentModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  variant = 'modal'
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ConsentFormData) => void | Promise<void>
  isLoading?: boolean
  variant?: 'modal' | 'initial'
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <ConsentForm
          onSubmit={async (data) => {
            await onSubmit(data)
            if (data.analyticsConsent) { // Ne fermer que si consent valide
              onClose()
            }
          }}
          isLoading={isLoading}
          variant={variant}
          initialAnalyticsConsent={true}
        />
      </Card>
    </div>
  )
}