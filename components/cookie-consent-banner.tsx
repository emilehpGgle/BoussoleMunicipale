'use client';

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, Shield, Settings } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { ConsentModal, type ConsentFormData } from '@/components/consent-form'

const CONSENT_STORAGE_KEY = 'boussole-municipale-consent'
const CONSENT_VERSION = '1.0.0'

interface StoredConsent {
  version: string
  timestamp: string
  analyticsConsent: boolean
  marketingConsent?: boolean
  emailConsent?: boolean
  phoneConsent?: boolean
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { updateProfileFields } = useProfile()

  // Vérifier si le consentement a déjà été donné
  useEffect(() => {
    const checkConsent = () => {
      // Vérifier d'abord localStorage
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY)

      if (storedConsent) {
        try {
          const consent: StoredConsent = JSON.parse(storedConsent)

          // Vérifier la version du consentement
          if (consent.version === CONSENT_VERSION && consent.analyticsConsent) {
            // Consentement valide trouvé
            return
          }
        } catch (_e) {
          console.error('Erreur lors de la lecture du consentement:', _e)
        }
      }

      // Pas de consentement valide, afficher la bannière
      // Petit délai pour une meilleure UX
      setTimeout(() => setIsVisible(true), 1000)
    }

    checkConsent()
  }, [])

  const saveConsent = async (data: Partial<ConsentFormData>) => {
    const consent: StoredConsent = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      analyticsConsent: data.analyticsConsent ?? true,
      marketingConsent: data.marketingConsent,
      emailConsent: data.emailConsent,
      phoneConsent: data.phoneConsent,
    }

    // Sauvegarder dans localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))

    // Sauvegarder dans le profil utilisateur si une session existe
    try {
      await updateProfileFields({
        analyticsConsent: consent.analyticsConsent,
        analyticsConsentTimestamp: consent.timestamp,
        marketingConsent: consent.marketingConsent,
        emailConsent: consent.emailConsent,
        phoneConsent: consent.phoneConsent,
        consentVersion: CONSENT_VERSION,
      })
    } catch (_e) {
      // Si pas de session, c'est OK - on garde juste dans localStorage
      console.log('Consentement sauvegardé localement')
    }
  }

  const handleAcceptAll = async () => {
    setIsProcessing(true)

    await saveConsent({
      analyticsConsent: true,
      marketingConsent: true,
      emailConsent: false, // Pas d'email par défaut
      phoneConsent: false, // Pas de téléphone par défaut
    })

    setIsProcessing(false)
    setIsVisible(false)
  }

  const handleAcceptEssential = async () => {
    setIsProcessing(true)

    await saveConsent({
      analyticsConsent: true,
      marketingConsent: false,
      emailConsent: false,
      phoneConsent: false,
    })

    setIsProcessing(false)
    setIsVisible(false)
  }

  // Fonction handleReject commentée car non utilisée - les utilisateurs ne peuvent pas refuser les cookies essentiels
  // const handleReject = () => {
  //   alert('Les cookies analytiques sont nécessaires pour utiliser la Boussole Municipale. Vous pouvez personnaliser vos préférences ou quitter le site.')
  // }

  const handleCustomize = () => {
    setShowSettingsModal(true)
  }

  const handleSettingsSubmit = async (data: ConsentFormData) => {
    setIsProcessing(true)

    await saveConsent(data)

    // Sauvegarder aussi email/téléphone si fournis
    if (data.email || data.phone) {
      try {
        await updateProfileFields({
          email: data.email,
          phone: data.phone,
        })
      } catch (_e) {
        console.log('Coordonnées sauvegardées localement')
      }
    }

    setIsProcessing(false)
    setShowSettingsModal(false)
    setIsVisible(false)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <Card className="mx-auto max-w-6xl p-6 shadow-2xl border-2 border-midnight-green/20 bg-white backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Contenu principal */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-midnight-green/10 rounded-full">
                        <Cookie className="w-6 h-6 text-midnight-green" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Préférences de confidentialité
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      La Boussole Municipale utilise des cookies et technologies similaires pour :
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-midnight-green mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Essentiel (obligatoire)</p>
                          <p className="text-xs text-muted-foreground">
                            Supabase (authentification), Google Analytics (IP anonymisée)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Cookie className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Marketing (optionnel)</p>
                          <p className="text-xs text-muted-foreground">
                            Communications ciblées, partenaires politiques alignés
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Données conservées 2 ans, conformes à la Loi 25. Consultez notre{' '}
                      <Link href="/confidentialite" className="text-midnight-green hover:underline">
                        politique complète
                      </Link>
                      {' '}et gérez vos préférences via{' '}
                      <Link href="/preferences" className="text-midnight-green hover:underline">
                        votre compte
                      </Link>.
                    </p>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                  <Button
                    onClick={handleAcceptAll}
                    disabled={isProcessing}
                    className="flex-1 bg-midnight-green hover:bg-midnight-green/90"
                  >
                    Tout accepter
                  </Button>

                  <Button
                    onClick={handleAcceptEssential}
                    disabled={isProcessing}
                    variant="outline"
                    className="flex-1"
                  >
                    Essentiel seulement
                  </Button>

                  <Button
                    onClick={handleCustomize}
                    disabled={isProcessing}
                    variant="ghost"
                    className="flex-1 text-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personnaliser
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de personnalisation */}
      <ConsentModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSubmit={handleSettingsSubmit}
        isLoading={isProcessing}
        variant="initial"
      />
    </>
  )
}

// Hook pour accéder aux préférences de consentement
export function useConsentPreferences() {
  const [preferences, setPreferences] = useState<StoredConsent | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (stored) {
      try {
        setPreferences(JSON.parse(stored))
      } catch (_e) {
        console.error('Erreur lors de la lecture des préférences:', _e)
      }
    }
  }, [])

  const updatePreferences = async (updates: Partial<StoredConsent>) => {
    const newPrefs = {
      ...preferences,
      ...updates,
      timestamp: new Date().toISOString(),
    } as StoredConsent

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newPrefs))
    setPreferences(newPrefs)
  }

  const resetPreferences = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
    setPreferences(null)
    // Recharger la page pour afficher la bannière
    window.location.reload()
  }

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    hasValidConsent: preferences?.analyticsConsent === true,
  }
}