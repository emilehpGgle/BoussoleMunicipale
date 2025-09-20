'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Shield, Sparkles, TrendingUp, Bell, Settings, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { useToast } from '@/hooks/use-toast'
import { ConsentForm, type ConsentFormData } from '@/components/consent-form'

interface EmailCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EmailCollectionModal({ isOpen, onClose, onSuccess }: EmailCollectionModalProps) {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { updateContactAndConsents } = useProfile()
  const { toast } = useToast()

  const handleReceiveResults = async () => {
    setIsProcessing(true)

    try {
      // Juste sauvegarder les consents analytiques déjà donnés
      // L'utilisateur ira vers les résultats mais pourra ajouter email plus tard
      await updateContactAndConsents({
        analyticsConsent: true,
        emailConsent: false,
        marketingConsent: false,
      })

      toast({
        title: 'Parfait !',
        description: 'Redirection vers vos résultats personnalisés...',
      })

      setTimeout(() => {
        onSuccess()
      }, 800)
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de continuer. Réessayez.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEssentialOnly = async () => {
    setIsProcessing(true)

    try {
      await updateContactAndConsents({
        analyticsConsent: true,
        emailConsent: false,
        marketingConsent: false,
      })

      toast({
        title: 'Préférences sauvegardées',
        description: 'Redirection vers vos résultats...',
      })

      setTimeout(() => {
        onSuccess()
      }, 800)
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de continuer. Réessayez.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCustomize = () => {
    setShowCustomizeModal(true)
  }

  const handleCustomizeSubmit = async (data: ConsentFormData) => {
    setIsProcessing(true)

    try {
      await updateContactAndConsents({
        email: data.email,
        phone: data.phone,
        analyticsConsent: data.analyticsConsent,
        emailConsent: data.emailConsent,
        phoneConsent: data.phoneConsent,
        marketingConsent: data.marketingConsent,
      })

      toast({
        title: 'Parfait !',
        description: 'Vos préférences ont été sauvegardées. Redirection vers vos résultats...',
      })

      setTimeout(() => {
        setShowCustomizeModal(false)
        onSuccess()
      }, 1000)
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder vos préférences. Réessayez.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <Card className="p-8 shadow-2xl border-2 border-midnight-green/20 bg-white">
                {/* En-tête avec bouton fermer */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-midnight-green/10 to-midnight-green/5 rounded-full">
                      <Sparkles className="w-8 h-8 text-midnight-green" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Conservez vos résultats
                      </h2>
                      <p className="text-muted-foreground">
                        Votre analyse politique personnalisée vous attend
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Section gauche - Value propositions */}
                  <div className="space-y-6">
                    {/* Aperçu des résultats */}
                    <div className="p-4 bg-gradient-to-br from-midnight-green/5 to-midnight-green/10 rounded-lg border border-midnight-green/20">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-5 h-5 text-midnight-green" />
                        <h3 className="font-semibold">Vos résultats personnalisés</h3>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="h-3 bg-gradient-to-r from-midnight-green/20 to-midnight-green/5 rounded-full"></div>
                        <div className="h-3 bg-gradient-to-r from-midnight-green/15 to-transparent rounded-full w-3/4"></div>
                        <div className="h-3 bg-gradient-to-r from-midnight-green/10 to-transparent rounded-full w-1/2"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        🎯 Analyse complète de vos affinités politiques municipales
                      </p>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-midnight-green/10 rounded-full mt-1">
                          <Mail className="w-4 h-4 text-midnight-green" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Accès permanent à vos résultats</h4>
                          <p className="text-xs text-muted-foreground">
                            Recevez votre rapport personnalisé et gardez un accès à votre analyse politique.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-full mt-1">
                          <Bell className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Actualités municipales ciblées</h4>
                          <p className="text-xs text-muted-foreground">
                            Analyses adaptées à vos intérêts politiques et enjeux qui vous préoccupent.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-full mt-1">
                          <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">100% confidentiel</h4>
                          <p className="text-xs text-muted-foreground">
                            Aucun spam, désinscription en un clic, conformité RGPD complète.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section droite - Actions */}
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold mb-2">Comment souhaitez-vous continuer ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Complètement optionnel mais fortement recommandé
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleReceiveResults}
                        disabled={isProcessing}
                        className="w-full bg-midnight-green hover:bg-midnight-green/90 text-white py-3"
                        size="lg"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Recevoir mes résultats par courriel
                      </Button>

                      <Button
                        onClick={handleEssentialOnly}
                        disabled={isProcessing}
                        variant="outline"
                        className="w-full py-3"
                        size="lg"
                      >
                        Voir mes résultats maintenant
                      </Button>

                      <Button
                        onClick={handleCustomize}
                        disabled={isProcessing}
                        variant="ghost"
                        className="w-full text-sm py-2"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Personnaliser mes préférences
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-center text-muted-foreground">
                        Vous pourrez toujours ajouter votre courriel plus tard dans vos préférences
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de personnalisation des consents */}
      {showCustomizeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCustomizeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <Card className="p-6 shadow-2xl bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Personnaliser mes préférences</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomizeModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <ConsentForm
                onSubmit={handleCustomizeSubmit}
                isLoading={isProcessing}
                variant="inline"
                showTitle={false}
                initialAnalyticsConsent={true}
                initialEmailConsent={true}
                initialMarketingConsent={false}
              />
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}