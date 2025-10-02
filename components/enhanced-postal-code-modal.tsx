"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from "@/hooks/useProfile"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import ContinueOrRestartModal from "./existing-responses-modal"
import EmailConsentRequiredModal from "./email-consent-required-modal"
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
import { Loader2, MapPin, Check, X, CheckCircle, Info, Mail, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  detectMunicipalityFromPostalCode,
  isValidCanadianPostalCode,
  formatPostalCode,
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
  const [detectedMunicipality, setDetectedMunicipality] = useState<{
    id: string;
    name: string;
    population: number;
    postalCode: string;
    district: string | null;
    terminology: string;
    availableDistricts: string[];
  } | null>(null)
  const [estimatedDistrict, setEstimatedDistrict] = useState<string | null>(null)
  const [confirmedDistrict, setConfirmedDistrict] = useState<string>("")
  const [districtInfo, setDistrictInfo] = useState<DistrictInfo | null>(null)
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [districtTerminology, setDistrictTerminology] = useState<string>('arrondissement')
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)
  const [isEmailConsentRequiredModalOpen, setIsEmailConsentRequiredModalOpen] = useState(false)

  // États pour le consentement
  const [analyticsConsent] = useState(true) // Toujours vrai, obligatoire
  const [emailConsent, setEmailConsent] = useState(false)
  const [email, setEmail] = useState("")
  const [showDetails, setShowDetails] = useState(false) // Remplace showDetailsModal
  const [emailError, setEmailError] = useState("")
  const [emailSuggestion, setEmailSuggestion] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  // Intégration des hooks
  const { profile, updateProfileFields, isSaving } = useProfile()
  const { getResponseCounts, isLoading: responsesLoading, responses } = useUserResponses()
  const { isSessionValid } = useSession()

  // Dictionnaire des typos communes pour domaines email
  const commonTypos: Record<string, string> = {
    // Gmail variants
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmil.com': 'gmail.com',
    'gmail.con': 'gmail.com',

    // Hotmail/Outlook variants
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'hotmial.ca': 'hotmail.ca',
    'outloo.com': 'outlook.com',
    'outlook.co': 'outlook.com',
    'outlok.com': 'outlook.com',

    // Yahoo variants
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'yahooo.ca': 'yahoo.ca',

    // Domaines québécois/canadiens
    'videotro.ca': 'videotron.ca',
    'videotron.c': 'videotron.ca',
    'sympatico.c': 'sympatico.ca',
    'sympatico.com': 'sympatico.ca',
    'bell.c': 'bell.ca',
    'rogers.c': 'rogers.ca',
    'telus.c': 'telus.ca'
  }

  // Validation d'email améliorée avec détection de typos
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Fonction pour détecter et suggérer des corrections de typos
  const detectEmailTypo = (email: string): string => {
    const parts = email.split('@')
    if (parts.length !== 2) return ''

    const domain = parts[1].toLowerCase()
    return commonTypos[domain] || ''
  }

  // Handler pour changement d'email avec validation en temps réel et détection de typos
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail)
    setEmailError("")
    setEmailSuggestion("")

    if (newEmail && newEmail.includes('@')) {
      // Détecter les typos communes
      const suggestion = detectEmailTypo(newEmail)
      if (suggestion) {
        const correctedEmail = newEmail.split('@')[0] + '@' + suggestion
        setEmailSuggestion(correctedEmail)
      }

      // Validation du format
      if (!validateEmail(newEmail)) {
        setEmailError("Veuillez entrer une adresse courriel valide")
      }
    }
  }

  // Fonction pour accepter la suggestion de correction
  const acceptSuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion)
      setEmailSuggestion("")
      setEmailError("")
    }
  }

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

    // Détecter automatiquement la municipalité et l'arrondissement/secteur
    const detectedInfo = detectMunicipalityFromPostalCode(postalCode)

    if (detectedInfo) {
      setDetectedMunicipality(detectedInfo)
      setEstimatedDistrict(detectedInfo.district)
      setConfirmedDistrict(detectedInfo.district || detectedInfo.availableDistricts[0])
      setAvailableDistricts(detectedInfo.availableDistricts)
      setDistrictTerminology(detectedInfo.terminology)

      // Mettre à jour les infos du district sélectionné
      const districtToUse = detectedInfo.district || detectedInfo.availableDistricts[0]
      if (districtToUse) {
        setDistrictInfo(getDistrictInfo(districtToUse))
      }

      setStep('confirm')
    } else {
      // Code postal non reconnu dans aucune municipalité supportée
      setError("Ce code postal ne semble pas être dans une municipalité supportée. Veuillez vérifier.")
      setEstimatedDistrict(null)
      setDetectedMunicipality(null)
    }
    
    setIsLoading(false)
  }

  const handleDistrictConfirmation = async () => {
    // Passer à l'étape de consentement au lieu de fermer le modal
    setStep('consent')
  }

  const handleConsentConfirmation = async () => {
    try {
      // Réinitialiser les erreurs
      setEmailError("")

      // Validation si email requis
      if (emailConsent) {
        if (!email.trim()) {
          setEmailError("Veuillez entrer votre adresse courriel")
          return
        }
        if (!validateEmail(email)) {
          setEmailError("Veuillez entrer une adresse courriel valide")
          return
        }
      }

      console.log('💾 Sauvegarde du profil avec consentements...')

      // Préparer les données du profil avec consentements
      const profileData: Record<string, string | boolean | object> = {
        postalCode: formatPostalCode(postalCode),
        district: confirmedDistrict,
        residenceArea: confirmedDistrict,
        municipality: detectedMunicipality?.id || '',
        municipalityName: detectedMunicipality?.name || '',
        location: {
          postalCode: formatPostalCode(postalCode),
          district: confirmedDistrict,
          municipality: detectedMunicipality?.id || '',
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

      // Afficher message de succès
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)

      // Fermer ce modal d'abord
      onClose()

      // Déterminer l'URL de redirection selon la municipalité
      const targetUrl = detectedMunicipality?.id
        ? `/${detectedMunicipality.id}/test-politique-municipal`
        : "/test-politique-municipal"

      // Attendre la fin du chargement des réponses avant de vérifier
      if (isSessionValid) {
        // Fonction pour vérifier les réponses existantes après le chargement
        const checkExistingResponses = () => {
          if (!responsesLoading) {
            const counts = getResponseCounts
            console.log('🔍 Vérification des réponses existantes:', counts)

            // Si l'utilisateur a déjà des réponses, vérifier le consentement email
            if (counts.total > 0) {
              console.log('📋 Réponses existantes détectées:', counts.total)

              // Vérifier si l'utilisateur a donné son consentement email
              if (profile.emailConsent === true) {
                console.log('✅ Email consent donné, ouverture du modal de choix')
                setIsExistingResponsesModalOpen(true)
              } else {
                console.log('❌ Pas de email consent, demande de consentement requise')
                setIsEmailConsentRequiredModalOpen(true)
              }
              return
            }

            console.log(`🆕 Aucune réponse existante, redirection vers ${targetUrl}`)
            router.push(targetUrl)
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
        router.push(targetUrl)
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
    setDetectedMunicipality(null)
    setAvailableDistricts([])
    setDistrictTerminology('arrondissement')
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
            {step === 'consent' && 'Personnalisez votre expérience'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'postal' && "Votre code postal nous aide à personnaliser le questionnaire pour votre région."}
            {step === 'confirm' && "Vérifiez que l'arrondissement estimé correspond à votre lieu de résidence."}
            {step === 'consent' && "Choisissez comment vous souhaitez utiliser la Boussole Municipale."}
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
                  Format: G1A 1A1 (codes postaux de la province de Québec)
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
              {detectedMunicipality ? (
                <div className="space-y-1">
                  <p className="text-sm text-midnight-green font-medium">
                    Municipalité détectée : <strong>{detectedMunicipality.name}</strong>
                  </p>
                  {estimatedDistrict ? (
                    <p className="text-sm text-midnight-green/80">
                      {districtTerminology.charAt(0).toUpperCase() + districtTerminology.slice(1)} estimé : <strong>{estimatedDistrict}</strong>
                    </p>
                  ) : (
                    <p className="text-sm text-midnight-green/80">
                      {districtTerminology.charAt(0).toUpperCase() + districtTerminology.slice(1)} non déterminé. Veuillez sélectionner.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-midnight-green/80">
                  Municipalité non reconnue. Veuillez vérifier votre code postal.
                </p>
              )}
            </div>

            {/* Sélection d'arrondissement/secteur */}
            {availableDistricts.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Confirmez ou modifiez votre {districtTerminology} :
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
                    {availableDistricts.map((district) => (
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
              
              {/* Info: Afficher le nombre d'options disponibles */}
              <p className="text-xs text-muted-foreground">
                {availableDistricts.length} {districtTerminology}s disponibles pour {detectedMunicipality?.name}
              </p>
            </div>
            )}

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
            <div className="relative group">
              {/* Effet glow subtil pour cohérence avec la section optionnelle */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-midnight-green/10 via-azure-web/20 to-midnight-green/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-4 bg-azure-web/30 rounded-lg border border-midnight-green/20">
                <span className="absolute top-3 right-3 text-xs sm:text-xs bg-midnight-green/10 text-midnight-green px-2 py-0.5 rounded-full font-medium">
                  Obligatoire
                </span>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Checkbox
                      checked={analyticsConsent}
                      disabled={true}
                      className="border-midnight-green bg-midnight-green"
                    />
                  </div>
                  <div className="flex-1 pr-12 sm:pr-16">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-midnight-green">Données anonymisées et analytics</span>
                    </div>
                    <p className="text-xs text-midnight-green/70 mb-3 leading-relaxed">
                      Vos réponses au questionnaire sont anonymisées. Nous utilisons aussi Google Analytics (avec IP anonymisée) pour améliorer notre service.
                    </p>
                    <p className="text-xs text-midnight-green/60 leading-relaxed">
                      Durée de conservation: 2 ans • <a href="/confidentialite" target="_blank" className="underline hover:text-midnight-green">Politique complète</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case à cocher optionnelle pour email et marketing - avec effet attractif */}
            <div className="space-y-4">
              <div className="relative group">
                {/* Effet glow inspiré du RainbowButton */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-midnight-green/20 via-azure-web/30 to-midnight-green/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div
                  className="relative p-4 bg-gradient-to-br from-azure-web/20 to-azure-web/40 rounded-lg border-2 border-midnight-green/30 hover:border-midnight-green/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setEmailConsent(!emailConsent)}
                >
                  <span className="absolute top-3 right-3 text-xs sm:text-xs bg-midnight-green/10 text-midnight-green px-2 py-0.5 rounded-full font-medium">
                    Optionnel
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={emailConsent}
                        onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
                        className="border-midnight-green"
                      />
                    </div>
                    <div className="flex-1 pr-12 sm:pr-16">
                      <div className="mb-2">
                        <Label className="text-sm font-semibold text-midnight-green cursor-pointer">
                          Recevoir mes résultats personnalisés et communications ciblées
                        </Label>
                      </div>
                      <p className="text-xs text-midnight-green/70 leading-relaxed">
                        Recevez vos résultats personnalisés et des communications ciblées de nos partenaires politiques alignés sur votre profil.
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
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`mt-1 ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {emailError && (
                        <p className="text-xs text-red-600 mt-1">{emailError}</p>
                      )}
                      {emailSuggestion && !emailError && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-xs text-blue-700 mb-1">Vouliez-vous dire :</p>
                          <button
                            type="button"
                            onClick={acceptSuggestion}
                            className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            {emailSuggestion}
                          </button>
                        </div>
                      )}
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

                      {/* Lien vers détails intégrés */}
                      <div className="mt-3 pt-2 border-t border-midnight-green/20">
                        <button
                          type="button"
                          onClick={() => setShowDetails(!showDetails)}
                          className="flex items-center gap-1 text-xs text-midnight-green hover:text-midnight-green/80 underline"
                        >
                          <Info className="w-3 h-3" />
                          {showDetails ? 'Masquer' : 'Voir tous'} les détails sur l&apos;utilisation de vos données
                        </button>
                      </div>

                      {/* Détails intégrés avec animation */}
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-3 p-3 bg-white/50 rounded-lg border border-midnight-green/20">
                              {/* Échange de valeur transparent */}
                              <div className="space-y-2">
                                <h5 className="font-semibold text-xs text-midnight-green flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Échange de valeur transparent
                                </h5>
                                <div className="grid grid-cols-2 gap-2 text-xs text-midnight-green/70">
                                  <div>
                                    <p className="font-medium mb-1">Votre contribution:</p>
                                    <ul className="space-y-0.5">
                                      <li>• Email et résultats</li>
                                      <li>• Profil anonymisé</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-1">Vous recevez:</p>
                                    <ul className="space-y-0.5">
                                      <li>• Rapport permanent</li>
                                      <li>• Communications ciblées</li>
                                      <li>• Analyses prioritaires</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Qui peut vous contacter */}
                              <div className="space-y-2">
                                <h5 className="font-semibold text-xs text-midnight-green flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  Qui vous contactera
                                </h5>
                                <ul className="space-y-0.5 text-xs text-midnight-green/70">
                                  <li>• <strong>Partis alignés:</strong> {'>'}70% avec vos résultats</li>
                                  <li>• <strong>Médias:</strong> spécialisés en politique municipale</li>
                                  <li>• <strong>Organisations:</strong> pertinentes à vos priorités</li>
                                </ul>
                              </div>

                              {/* Protection des données */}
                              <div className="space-y-2">
                                <h5 className="font-semibold text-xs text-midnight-green flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  Protection de vos données
                                </h5>
                                <p className="text-xs text-midnight-green/70">
                                  Vos données sont conservées 2 ans, chiffrées et conformes à la Loi 25.
                                  Vous pouvez retirer votre consentement à tout moment via <Link href="/preferences" className="underline">vos préférences</Link>.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DialogFooter className="gap-2 pt-4">
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
                  !emailConsent || !email || emailError
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                    : "bg-midnight-green hover:bg-midnight-green/90 text-white"
                }`}
                disabled={isSaving || !emailConsent || !email || !!emailError}
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {showSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Sauvegardé !
                  </>
                ) : (
                  "Accepter et commencer"
                )}
              </Button>
            </DialogFooter>

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
                          municipality: detectedMunicipality?.id || '',
                          municipalityName: detectedMunicipality?.name || '',
                          location: {
                            postalCode: formatPostalCode(postalCode),
                            district: confirmedDistrict,
                            municipality: detectedMunicipality?.id || '',
                            coordinates: districtInfo?.coordinates
                          },
                          analyticsConsent: true,
                          emailConsent: false,
                          marketingConsent: false
                        }

                        await updateProfileFields(profileData)
                        onClose()

                        const targetUrl = detectedMunicipality?.id
                          ? `/${detectedMunicipality.id}/test-politique-municipal`
                          : "/test-politique-municipal"

                        if (isSessionValid) {
                          const checkExistingResponses = () => {
                            if (!responsesLoading) {
                              const counts = getResponseCounts
                              if (counts.total > 0) {
                                setIsExistingResponsesModalOpen(true)
                                return
                              }
                              router.push(targetUrl)
                            } else {
                              setTimeout(checkExistingResponses, 100)
                            }
                          }
                          setTimeout(checkExistingResponses, 50)
                        } else {
                          router.push(targetUrl)
                        }
                      } catch (error) {
                        console.error('Erreur mode anonyme:', error)
                        onClose()
                        const targetUrl = detectedMunicipality?.id
                          ? `/${detectedMunicipality.id}/test-politique-municipal`
                          : "/test-politique-municipal"
                        router.push(targetUrl)
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


      </DialogContent>
    </Dialog>
    
    {/* Modal pour les réponses existantes - séparé du modal principal */}
    <ContinueOrRestartModal
      isOpen={isExistingResponsesModalOpen}
      onClose={() => setIsExistingResponsesModalOpen(false)}
      targetPath={detectedMunicipality?.id ? `/${detectedMunicipality.id}/test-politique-municipal` : "/test-politique-municipal"}
      municipality={detectedMunicipality?.id}
    />

    {/* Modal pour demander le consentement email si réponses trouvées sans consentement */}
    <EmailConsentRequiredModal
      isOpen={isEmailConsentRequiredModalOpen}
      onClose={() => setIsEmailConsentRequiredModalOpen(false)}
      onConsentGiven={() => {
        // Une fois le consentement donné, fermer ce modal et ouvrir le modal normal
        setIsEmailConsentRequiredModalOpen(false)
        setIsExistingResponsesModalOpen(true)
      }}
      onContinueAnonymously={async () => {
        // Recommencer anonymement : effacer les réponses et redémarrer
        setIsEmailConsentRequiredModalOpen(false)
        onClose()

        // Rediriger vers le questionnaire
        const targetUrl = detectedMunicipality?.id
          ? `/${detectedMunicipality.id}/test-politique-municipal`
          : "/test-politique-municipal"
        router.push(targetUrl)
      }}
      responsesCount={getResponseCounts.total}
    />

    </>
  )
} 