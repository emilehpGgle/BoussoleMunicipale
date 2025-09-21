"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from "@/hooks/useProfile"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import ContinueOrRestartModal from "./existing-responses-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, MapPin, Check, X, CheckCircle, Info, Mail, Shield, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  getDistrictFromPostalCode, 
  isValidCanadianPostalCode, 
  formatPostalCode,
  quebecDistricts,
  getDistrictInfo,
  type DistrictInfo
} from '@/lib/postal-code-mapping'

type PostalCodeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EnhancedPostalCodeModal({ isOpen, onClose }: PostalCodeModalProps) {
  const [postalCode, setPostalCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'postal' | 'confirm' | 'consent'>('postal')
  const [estimatedDistrict, setEstimatedDistrict] = useState<string | null>(null)
  const [confirmedDistrict, setConfirmedDistrict] = useState<string>("")
  const [districtInfo, setDistrictInfo] = useState<DistrictInfo | null>(null)
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)

  // États pour le consentement
  const [analyticsConsent] = useState(true) // Toujours vrai, obligatoire
  const [emailConsent, setEmailConsent] = useState(false)
  const [email, setEmail] = useState("")
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const router = useRouter()
  
  // Intégration des hooks
  const { updateProfileFields, isSaving } = useProfile()
  const { getResponseCounts, isLoading: responsesLoading, responses } = useUserResponses()
  const { isSessionValid } = useSession()

  // Monitor response state changes
  React.useEffect(() => {
    if (isSessionValid && !responsesLoading) {
      // Les réponses sont déjà chargées via useUserResponses
    }
  }, [responsesLoading, responses, isSessionValid])

  // Nettoyage du composant
  React.useEffect(() => {
    return () => {
      // Cleanup si nécessaire
    }
  }, [])

  const handlePostalCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation du code postal
    if (!isValidCanadianPostalCode(postalCode)) {
      setError("Veuillez entrer un code postal valide (ex: G1A 1A1).")
      setIsLoading(false)
      return
    }

    // Simulation d'une vérification en ligne
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Déterminer l'arrondissement estimé
    const district = getDistrictFromPostalCode(postalCode)
    
    if (district) {
      setEstimatedDistrict(district)
      setConfirmedDistrict(district)
      setDistrictInfo(getDistrictInfo(district))
      setStep('confirm')
    } else {
      // Code postal non reconnu dans Québec
      setError("Ce code postal ne semble pas être dans la ville de Québec. Veuillez vérifier ou sélectionner votre arrondissement manuellement.")
      setStep('confirm')
      setEstimatedDistrict(null)
      setConfirmedDistrict(quebecDistricts[0])
      setDistrictInfo(getDistrictInfo(quebecDistricts[0]))
    }
    
    setIsLoading(false)
  }

  const handleDistrictConfirmation = async () => {
    // Passer à l'étape de consentement au lieu de fermer le modal
    setStep('consent')
  }

  const handleConsentConfirmation = async () => {
    try {
      console.log('💾 Sauvegarde du profil avec consentements...')

      // Préparer les données du profil avec consentements
      const profileData: Record<string, string | boolean | object> = {
        postalCode: formatPostalCode(postalCode),
        district: confirmedDistrict,
        residenceArea: confirmedDistrict,
        location: {
          postalCode: formatPostalCode(postalCode),
          district: confirmedDistrict,
          coordinates: districtInfo?.coordinates
        },
        analyticsConsent: true, // Toujours vrai
        emailConsent: emailConsent,
        marketingConsent: emailConsent
      }

      // Ajouter l'email si consentement donné
      if (emailConsent && email) {
        profileData.email = email
      }

      // Sauvegarder dans le profil unifié
      await updateProfileFields(profileData)

      console.log('✅ Profil et consentements sauvegardés')

      // Fermer ce modal d'abord
      onClose()

      // Attendre la fin du chargement des réponses avant de vérifier
      if (isSessionValid) {
        // Fonction pour vérifier les réponses existantes après le chargement
        const checkExistingResponses = () => {
          if (!responsesLoading) {
            const counts = getResponseCounts
            console.log('🔍 Vérification des réponses existantes:', counts)

            // Si l'utilisateur a déjà des réponses, ouvrir le modal de choix
            if (counts.total > 0) {
              console.log('📋 Réponses existantes détectées, ouverture du modal de choix')
              setIsExistingResponsesModalOpen(true)
              return
            }

            console.log('🆕 Aucune réponse existante, redirection vers le questionnaire')
            router.push("/test-politique-municipal")
          } else {
            // Réessayer après 100ms si encore en chargement
            console.log('⏳ Chargement des réponses en cours, nouvelle tentative...')
            setTimeout(checkExistingResponses, 100)
          }
        }

        // Démarrer la vérification avec un petit délai pour s'assurer que le modal est fermé
        setTimeout(checkExistingResponses, 50)
      } else {
        // Pas de session, aller directement au questionnaire
        router.push("/test-politique-municipal")
      }

    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde du profil:', error)

      // Plus de localStorage - session obligatoire pour sauvegarder
      console.warn('⚠️ Impossible de sauvegarder le code postal sans session valide')

      onClose()
      router.push("/test-politique-municipal")
    }
  }

  const handleDistrictChange = (newDistrict: string) => {
    setConfirmedDistrict(newDistrict)
    setDistrictInfo(getDistrictInfo(newDistrict))
  }

  const resetToPostalStep = () => {
    setStep('postal')
    setEstimatedDistrict(null)
    setConfirmedDistrict("")
    setDistrictInfo(null)
    setError("")
  }

  const goBackFromConsent = () => {
    setStep('confirm')
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={onClose} />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl bg-white border-2 border-primary/20 z-[9999] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-midnight-green" />
            {step === 'postal' && 'Entrez votre code postal'}
            {step === 'confirm' && 'Confirmez votre arrondissement'}
            {step === 'consent' && 'Consentement et transparence'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'postal' && "Votre code postal nous aide à personnaliser le questionnaire pour votre région."}
            {step === 'confirm' && "Vérifiez que l'arrondissement estimé correspond à votre lieu de résidence."}
            {step === 'consent' && "Avant de commencer, nous devons obtenir votre consentement pour la collecte de données."}
          </DialogDescription>
        </DialogHeader>

        {step === 'postal' && (
          <form onSubmit={handlePostalCodeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code" className="text-sm font-medium text-foreground">
                  Code Postal
                </Label>
                <Input
                  id="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  placeholder="G1A 1A1"
                  className="rounded-lg bg-background focus:ring-2 focus:ring-midnight-green focus:border-midnight-green focus-visible:ring-midnight-green focus-visible:border-midnight-green"
                  aria-describedby="postal-code-error"
                  maxLength={7}
                />
                <p className="text-xs text-muted-foreground">
                  Format: G1A 1A1 (codes postaux de la ville de Québec)
                </p>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    {error}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !postalCode.trim()}
                className="bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Continuer
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 'confirm' && (
          <div className="space-y-4 py-4">
            {/* Information sur l'estimation */}
            <div className="bg-azure-web/30 border border-midnight-green/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-midnight-green" />
                <span className="text-sm font-medium text-eerie-black">
                  Code postal analysé: {formatPostalCode(postalCode)}
                </span>
              </div>
              {estimatedDistrict ? (
                <p className="text-sm text-midnight-green/80">
                  Arrondissement estimé : <strong>{estimatedDistrict}</strong>
                </p>
              ) : (
                <p className="text-sm text-midnight-green/80">
                  Code postal non reconnu. Veuillez sélectionner votre arrondissement.
                </p>
              )}
            </div>

            {/* Sélection d'arrondissement */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Confirmez ou modifiez votre arrondissement :
              </Label>
              <div className="relative">
                <Select 
                  value={confirmedDistrict} 
                  onValueChange={handleDistrictChange}
                >
                  <SelectTrigger className="w-full rounded-lg bg-background border border-border focus:ring-midnight-green focus:border-midnight-green">
                    <SelectValue 
                      placeholder="Sélectionnez votre arrondissement"
                      className="text-foreground"
                    />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-background border border-border shadow-lg max-h-60 overflow-y-auto z-[10000]"
                    position="popper"
                    sideOffset={4}
                  >
                    {quebecDistricts.map((district) => (
                      <SelectItem 
                        key={district} 
                        value={district}
                        className="cursor-pointer hover:bg-white focus:bg-white px-3 py-2"
                      >
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Debug: Afficher le nombre d'arrondissements */}
              <p className="text-xs text-muted-foreground">
                {quebecDistricts.length} arrondissements disponibles
              </p>
            </div>

            {/* Information sur l'arrondissement sélectionné */}
            {districtInfo && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{districtInfo.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {districtInfo.area}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {districtInfo.description}
                  </p>
                  {districtInfo.population && (
                    <p className="text-xs text-muted-foreground">
                      Population : ~{districtInfo.population.toLocaleString()} habitants
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetToPostalStep}
                className="rounded-xl"
              >
                Retour
              </Button>
              <Button
                type="button"
                onClick={handleDistrictConfirmation}
                className="bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl"
                disabled={!confirmedDistrict || isSaving}
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirmer et continuer
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Étape de consentement */}
        {step === 'consent' && (
          <div className="space-y-4 py-4">
            {/* Case à cocher obligatoire pour collecte anonymisée */}
            <div className="p-4 bg-azure-web/30 rounded-lg border border-midnight-green/20">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Checkbox
                    checked={analyticsConsent}
                    disabled={true}
                    className="border-midnight-green bg-midnight-green"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-midnight-green">Collecte de données anonymisées</span>
                    <span className="text-xs bg-midnight-green/10 text-midnight-green px-2 py-0.5 rounded-full font-medium">
                      Obligatoire
                    </span>
                  </div>
                  <p className="text-xs text-midnight-green/70">
                    Vos réponses sont anonymisées et utilisées pour améliorer notre service et analyser les tendances politiques.
                  </p>
                </div>
              </div>
            </div>

            {/* Case à cocher optionnelle pour email et marketing - avec effet attractif */}
            <div className="space-y-4">
              <div className="relative group">
                {/* Effet glow inspiré du RainbowButton */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-midnight-green/20 via-azure-web/30 to-midnight-green/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-4 bg-gradient-to-br from-azure-web/20 to-azure-web/40 rounded-lg border-2 border-midnight-green/30 hover:border-midnight-green/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Checkbox
                        checked={emailConsent}
                        onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
                        className="border-midnight-green"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-semibold text-midnight-green cursor-pointer">
                        Recevoir mes résultats personnalisés et accéder aux avantages exclusifs
                      </Label>
                      <p className="text-xs text-midnight-green/70 mt-1">
                        Optionnel - Recevez votre rapport politique détaillé et des communications ciblées de partenaires sélectionnés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progressive disclosure du champ email */}
              <AnimatePresence>
                {emailConsent && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ml-7 space-y-3"
                  >
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Adresse courriel
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Avantages avec design attractif */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 bg-gradient-to-br from-azure-web/40 to-azure-web/60 rounded-lg border border-midnight-green/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-midnight-green" />
                        <span className="text-sm font-medium text-midnight-green">Cela vous donne accès à :</span>
                      </div>
                      <div className="space-y-1 text-xs text-midnight-green/80">
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>Votre rapport politique personnalisé permanent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>Actualités municipales ciblées selon VOS résultats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>Communications de partis politiques alignés sur votre profil</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>Analyses exclusives adaptées à vos intérêts</span>
                        </div>
                      </div>

                      <div className="mt-2 p-2 bg-midnight-green/10 rounded border border-midnight-green/20">
                        <p className="text-xs text-midnight-green/80 italic">
                          💡 Échange transparent : Nous partageons vos données avec des partenaires politiques et médiatiques pertinents.
                        </p>
                      </div>

                      {/* Lien vers modal détaillé */}
                      <div className="mt-3 pt-2 border-t border-midnight-green/20">
                        <button
                          onClick={() => setShowDetailsModal(true)}
                          className="flex items-center gap-1 text-xs text-midnight-green hover:text-midnight-green/80 underline"
                        >
                          <Info className="w-3 h-3" />
                          Voir tous les détails sur l&apos;utilisation de vos données
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Boutons alignés horizontalement */}
            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={goBackFromConsent}
                className="rounded-xl"
              >
                Retour
              </Button>

              <Button
                type="button"
                onClick={handleConsentConfirmation}
                className={`rounded-xl px-8 py-3 ${
                  !emailConsent || !email
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                    : "bg-midnight-green hover:bg-midnight-green/90 text-white"
                }`}
                disabled={isSaving || !emailConsent || !email}
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Accepter et commencer
              </Button>
            </div>

            {/* Lien discret "Continuer anonymement" - toujours présent */}
            <div className="text-center">
                <button
                  onClick={() => {
                    // Continuer anonymement - sans email
                    const anonymousHandler = async () => {
                      try {
                        const profileData: Record<string, string | boolean | object> = {
                          postalCode: formatPostalCode(postalCode),
                          district: confirmedDistrict,
                          residenceArea: confirmedDistrict,
                          location: {
                            postalCode: formatPostalCode(postalCode),
                            district: confirmedDistrict,
                            coordinates: districtInfo?.coordinates
                          },
                          analyticsConsent: true,
                          emailConsent: false,
                          marketingConsent: false
                        }

                        await updateProfileFields(profileData)
                        onClose()

                        if (isSessionValid) {
                          const checkExistingResponses = () => {
                            if (!responsesLoading) {
                              const counts = getResponseCounts
                              if (counts.total > 0) {
                                setIsExistingResponsesModalOpen(true)
                                return
                              }
                              router.push("/test-politique-municipal")
                            } else {
                              setTimeout(checkExistingResponses, 100)
                            }
                          }
                          setTimeout(checkExistingResponses, 50)
                        } else {
                          router.push("/test-politique-municipal")
                        }
                      } catch (error) {
                        console.error('Erreur mode anonyme:', error)
                        onClose()
                        router.push("/test-politique-municipal")
                      }
                    }
                    anonymousHandler()
                  }}
                  className="text-sm text-muted-foreground hover:text-midnight-green underline transition-colors"
                  disabled={isSaving}
                >
                  Continuer anonymement
                </button>
            </div>
          </div>
        )}

        {/* Option pour continuer sans géolocalisation - seulement sur les étapes postal et confirm */}
        {(step === 'postal' || step === 'confirm') && (
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-midnight-green"
              onClick={() => {
                onClose()

                // Vérifier s'il y a des réponses existantes avant de continuer
                if (isSessionValid && !responsesLoading) {
                  const counts = getResponseCounts

                  if (counts.total > 0) {
                    setIsExistingResponsesModalOpen(true)
                    return
                  }
                }

                router.push("/test-politique-municipal?skipLocation=true")
              }}
            >
              Continuer sans localisation
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
    
    {/* Modal pour les réponses existantes - séparé du modal principal */}
    <ContinueOrRestartModal
      isOpen={isExistingResponsesModalOpen}
      onClose={() => setIsExistingResponsesModalOpen(false)}
      targetPath="/test-politique-municipal"
    />

    {/* Modal d'information détaillée pour transparence complète */}
    <AnimatePresence>
      {showDetailsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
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
                  <h3 className="text-xl font-semibold">Qu&apos;est-ce que cela implique exactement ?</h3>
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
                {/* Échange de valeur transparent */}
                <div className="p-4 bg-azure-web/50 rounded-lg border border-midnight-green/30">
                  <h4 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Échange de valeur transparent
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-midnight-green/80">
                    <div>
                      <p className="font-medium mb-1">Votre contribution :</p>
                      <ul className="space-y-1">
                        <li>• Accès à votre email et résultats politiques</li>
                        <li>• Profil démographique anonymisé</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Ce que vous recevez :</p>
                      <ul className="space-y-1">
                        <li>• Rapport politique personnalisé permanent</li>
                        <li>• Communications ultra-ciblées (3-4 par an)</li>
                        <li>• Accès prioritaire aux analyses municipales</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Qui peut vous contacter */}
                <div className="p-4 bg-azure-web/40 rounded-lg border border-midnight-green/25">
                  <h4 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Qui vous contactera
                  </h4>
                  <ul className="space-y-1 text-sm text-midnight-green/80">
                    <li>• <strong>Partis politiques municipaux :</strong> seulement ceux alignés &gt;70% avec vos résultats</li>
                    <li>• <strong>Médias locaux :</strong> spécialisés en politique municipale de Québec</li>
                    <li>• <strong>Organisations civiques :</strong> pertinentes à vos enjeux prioritaires</li>
                    <li>• <strong>Notre équipe :</strong> analyses et conseils politiques personnalisés</li>
                  </ul>
                </div>

                {/* Comment ça marche */}
                <div className="p-4 bg-azure-web/35 rounded-lg border border-midnight-green/25">
                  <h4 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Comment ça marche
                  </h4>
                  <div className="text-sm text-midnight-green/80 space-y-2">
                    <p>
                      <strong>Ciblage intelligent :</strong> Nous partageons votre profil avec des organisations
                      sélectionnées qui correspondent à vos intérêts politiques. C&apos;est du ciblage personnalisé,
                      pas du spam générique.
                    </p>
                    <div className="p-2 bg-midnight-green/10 rounded">
                      <p className="font-medium">Fréquence des communications :</p>
                      <ul className="mt-1">
                        <li>• <strong>Temps normal :</strong> 3-4 envois par an maximum</li>
                        <li>• <strong>Périodes électorales :</strong> fréquence plus élevée (campagnes actives)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Protection des données */}
                <div className="p-4 bg-azure-web/30 rounded-lg border border-midnight-green/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-midnight-green" />
                    <h4 className="font-semibold text-midnight-green">Protection de vos données</h4>
                  </div>
                  <p className="text-sm text-midnight-green/80 mb-3">
                    Vos données sont protégées selon les standards RGPD et Loi 25 du Québec.
                    Elles ne sont partagées qu&apos;avec des partenaires approuvés et seulement
                    selon vos consentements explicites.
                  </p>
                  <div className="bg-midnight-green/10 p-2 rounded text-xs text-midnight-green/70">
                    <p className="font-medium mb-1">Vos droits :</p>
                    <ul>
                      <li>• Désinscription en 1 clic à tout moment</li>
                      <li>• Modification de vos préférences</li>
                      <li>• Suppression complète de vos données</li>
                    </ul>
                  </div>
                </div>

                {/* Footer avec action */}
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
    </>
  )
} 