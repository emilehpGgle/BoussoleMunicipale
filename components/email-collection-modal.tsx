'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Shield, Sparkles, TrendingUp, Bell, X, Check, Info, ExternalLink, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { useToast } from '@/hooks/use-toast'

interface EmailCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

// Composant Tooltip simple
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 w-64 p-2 mt-1 text-xs bg-gray-900 text-white rounded-lg shadow-lg -translate-x-1/2 left-1/2">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
      )}
    </div>
  )
}

export function EmailCollectionModal({ isOpen, onClose, onSuccess }: EmailCollectionModalProps) {
  const [emailConsent, setEmailConsent] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false)
  const { updateContactAndConsents } = useProfile()
  const { toast } = useToast()

  // Validation email en temps réel
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

  const handleEmailConsentChange = (checked: boolean) => {
    setEmailConsent(checked)
    if (!checked) {
      setEmail('')
      setEmailError('')
    }
  }

  const canSubmit = emailConsent && email.trim() && validateEmail(email)

  const handleSaveResults = async () => {
    if (!canSubmit) {
      if (emailConsent && !email.trim()) {
        setEmailError('Adresse courriel requise')
        return
      }
      if (emailConsent && !validateEmail(email)) {
        setEmailError('Adresse courriel invalide')
        return
      }
      return
    }

    setIsProcessing(true)

    try {
      // Étape 1: Sauvegarder temporairement avec état "en attente de confirmation"
      await updateContactAndConsents({
        email: email.toLowerCase().trim(),
        analyticsConsent: true,
        emailConsent: false, // Sera activé après confirmation
        marketingConsent: false, // Sera activé après confirmation
        emailConfirmationPending: true, // Nouvel état
      })

      // Étape 2: Envoyer email de confirmation
      // TODO: Implémenter l'envoi d'email de confirmation
      // await sendConfirmationEmail(email.toLowerCase().trim())

      setEmailConfirmationSent(true)

      toast({
        title: 'Email de confirmation envoyé !',
        description: 'Vérifiez votre boîte de réception pour confirmer votre inscription.',
      })

      // Reset le flag TopMatchModal pour forcer l'affichage sur la page résultats
      sessionStorage.removeItem('hasSeenTopMatchModal')

      // Rediriger vers les résultats après 2 secondes
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (_error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer la confirmation. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleViewWithoutSaving = async () => {
    setIsProcessing(true)

    try {
      await updateContactAndConsents({
        analyticsConsent: true,
        emailConsent: false,
        marketingConsent: false,
      })

      // Reset le flag TopMatchModal pour forcer l'affichage sur la page résultats
      sessionStorage.removeItem('hasSeenTopMatchModal')

      setTimeout(() => {
        onSuccess()
      }, 300)
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

  return (
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
            className="w-full max-w-4xl max-h-[90vh] overflow-auto"
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
                      <div className="h-2 bg-gradient-to-r from-midnight-green/30 to-midnight-green/10 rounded-full w-full"></div>
                      <div className="h-2 bg-gradient-to-r from-midnight-green/25 to-midnight-green/8 rounded-full w-4/5"></div>
                      <div className="h-2 bg-gradient-to-r from-midnight-green/20 to-midnight-green/5 rounded-full w-3/5"></div>
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

                {/* Section droite - Formulaire simplifié */}
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold mb-2">Comment souhaitez-vous continuer ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Complètement optionnel mais fortement recommandé
                    </p>
                  </div>

                  {/* Checkbox analytiques (obligatoire, pré-cochée) */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Checkbox
                          checked={true}
                          disabled={true}
                          className="border-blue-500 bg-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-blue-700">Collecte de données analytiques</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Obligatoire</span>
                        </div>
                        <p className="text-xs text-blue-600">
                          Collecte anonyme pour améliorer le service - Requis pour utiliser la Boussole Municipale
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox principale - Enregistrer résultats */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Checkbox
                          checked={emailConsent}
                          onCheckedChange={handleEmailConsentChange}
                          className="border-midnight-green"
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-semibold text-foreground cursor-pointer">
                          Enregistrer mes résultats personnalisés
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recevez votre rapport complet par courriel et gardez un accès permanent à votre analyse
                        </p>
                      </div>
                    </div>

                    {/* Champ email conditionnel */}
                    <AnimatePresence>
                      {emailConsent && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="ml-7 space-y-2"
                        >
                          <Label htmlFor="email" className="text-sm font-medium">
                            Adresse courriel
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@courriel.ca"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            className={`transition-colors ${emailError ? 'border-red-500' : ''}`}
                          />
                          {emailError && (
                            <p className="text-xs text-red-500">{emailError}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bonus inclus - Version transparente */}
                    {emailConsent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="ml-7 p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-700">Cela vous donne aussi accès à :</span>
                        </div>
                        <div className="space-y-1 text-xs text-amber-600">
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <span>Actualités exclusives de la politique municipale</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <div className="flex items-center gap-1">
                              <span>Communications de partis politiques municipaux</span>
                              <Tooltip content="Les partis municipaux de Québec alignés sur vos résultats pourront vous contacter avec leurs propositions et événements">
                                <Info className="w-3 h-3 text-amber-500" />
                              </Tooltip>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <div className="flex items-center gap-1">
                              <span>Offres de partenaires locaux engagés</span>
                              <Tooltip content="Organisations civiques, médias locaux et services municipaux sélectionnés selon vos intérêts">
                                <Info className="w-3 h-3 text-amber-500" />
                              </Tooltip>
                            </div>
                          </div>
                        </div>

                        {/* Mention période électorale */}
                        <div className="mt-2 p-2 bg-orange-100 rounded border border-orange-200">
                          <div className="flex items-center gap-1 text-xs text-orange-700">
                            <AlertTriangle className="w-3 h-3" />
                            <span className="font-medium">Fréquence plus élevée pendant les périodes électorales</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs">
                          <span className="text-amber-600 italic">
                            (3-4 envois par an en temps normal - désinscription facile)
                          </span>
                        </div>

                        {/* Liens informatifs */}
                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-amber-200">
                          <button
                            onClick={() => setShowDetailsModal(true)}
                            className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 underline"
                          >
                            <Info className="w-3 h-3" />
                            Qu&apos;est-ce que cela implique ?
                          </button>
                          <a
                            href="/politique-confidentialite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 underline"
                          >
                            <Shield className="w-3 h-3" />
                            Politique de confidentialité
                            <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Status de confirmation email */}
                  {emailConfirmationSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center gap-2 text-blue-700">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email de confirmation envoyé !</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Vérifiez votre boîte de réception ({email}) pour confirmer votre inscription.
                      </p>
                    </motion.div>
                  )}

                  {/* Boutons d'action */}
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handleSaveResults}
                      disabled={!canSubmit || isProcessing || emailConfirmationSent}
                      className={`w-full py-3 text-white transition-all duration-200 ${
                        canSubmit && !emailConfirmationSent
                          ? 'bg-midnight-green hover:bg-midnight-green/90 shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                      size="lg"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {emailConfirmationSent
                        ? 'Confirmation envoyée ✓'
                        : isProcessing
                          ? 'Envoi de la confirmation...'
                          : 'Enregistrer mes résultats'
                      }
                    </Button>

                    <div className="text-center">
                      <button
                        onClick={handleViewWithoutSaving}
                        disabled={isProcessing}
                        className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                      >
                        Consulter sans enregistrer
                      </button>
                    </div>
                  </div>

                  {/* Footer rassurant */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-3 h-3" />
                      <span>100% confidentiel - Aucun spam, conformité RGPD complète</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Modal secondaire - Détails des implications */}
      {showDetailsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[80vh] overflow-auto"
          >
            <Card className="p-6 shadow-2xl bg-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-midnight-green" />
                  <h3 className="text-xl font-semibold">Qu&apos;est-ce que cela implique ?</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✓ En cochant cette option :</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Vous recevez votre rapport politique personnalisé par courriel</li>
                    <li>• Les partis politiques municipaux de Québec peuvent vous contacter</li>
                    <li>• Nos partenaires locaux engagés peuvent vous proposer des services</li>
                    <li>• Vous recevez nos analyses politiques exclusives</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📅 Fréquence des communications :</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• <strong>Temps normal :</strong> 3-4 envois par an maximum</li>
                    <li>• <strong>Périodes électorales :</strong> fréquence plus élevée (campagnes actives)</li>
                    <li>• <strong>Désinscription :</strong> possible à tout moment en un clic</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">👥 Qui peut vous contacter :</h4>
                  <ul className="space-y-1 text-sm text-amber-700">
                    <li>• <strong>Partis politiques municipaux :</strong> seulement ceux alignés sur vos résultats</li>
                    <li>• <strong>Partenaires locaux :</strong> organisations civiques, médias locaux, services municipaux</li>
                    <li>• <strong>Notre équipe :</strong> analyses et conseils politiques personnalisés</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-slate-600" />
                    <h4 className="font-semibold text-slate-800">🔒 Protection de vos données :</h4>
                  </div>
                  <p className="text-sm text-slate-700">
                    Vos données sont protégées selon les standards RGPD et Loi 25 du Québec.
                    Elles ne sont partagées qu&apos;avec des partenaires approuvés et seulement
                    selon vos consentements explicites.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <a
                    href="/politique-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-midnight-green hover:text-midnight-green/80 underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Lire notre politique complète
                  </a>
                  <Button
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-midnight-green hover:bg-midnight-green/90 text-white"
                  >
                    J&apos;ai compris
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}