"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ShieldCheck, AlertCircle, Check, Loader2 } from "lucide-react"
import { useProfile } from "@/hooks/useProfile"

interface EmailConsentRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  onConsentGiven: () => void // Callback quand l'email consent est donné
  onContinueAnonymously: () => void // Callback pour recommencer anonymement
  responsesCount: number // Nombre de réponses trouvées
}

export default function EmailConsentRequiredModal({
  isOpen,
  onClose,
  onConsentGiven,
  onContinueAnonymously,
  responsesCount
}: EmailConsentRequiredModalProps) {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateContactAndConsents, validateEmail } = useProfile()

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) setEmailError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!email.trim()) {
      setEmailError("Veuillez entrer votre adresse courriel")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse courriel valide")
      return
    }

    setIsSubmitting(true)

    try {
      // Sauvegarder l'email et le consentement
      await updateContactAndConsents({
        email: email.trim(),
        emailConsent: true,
        marketingConsent: true, // Consentement marketing associé
      })

      // Notifier le parent que le consentement a été donné
      onConsentGiven()
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du consentement:", error)
      setEmailError("Erreur lors de la sauvegarde. Veuillez réessayer.")
      setIsSubmitting(false)
    }
  }

  const handleContinueAnonymously = () => {
    onContinueAnonymously()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-soft">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <Mail className="h-5 w-5 text-orange-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Récupérer vos réponses
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            Nous avons trouvé <strong>{responsesCount} réponse{responsesCount > 1 ? 's' : ''}</strong> précédente{responsesCount > 1 ? 's' : ''}.
            Pour y accéder et sauvegarder vos résultats, nous avons besoin de votre adresse courriel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Bénéfices de donner l'email */}
          <div className="bg-azure-web/20 border border-midnight-green/20 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-midnight-green mt-0.5" />
              <p className="text-sm font-medium text-midnight-green">
                En fournissant votre courriel, vous pourrez :
              </p>
            </div>
            <ul className="space-y-1.5 ml-6">
              <li className="text-xs text-midnight-green/80 flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Récupérer vos {responsesCount} réponses précédentes</span>
              </li>
              <li className="text-xs text-midnight-green/80 flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Recevoir votre rapport politique personnalisé permanent</span>
              </li>
              <li className="text-xs text-midnight-green/80 flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Accéder à vos résultats depuis n&apos;importe quel appareil</span>
              </li>
              <li className="text-xs text-midnight-green/80 flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Recevoir des communications ciblées selon votre profil</span>
              </li>
            </ul>
          </div>

          {/* Champ email */}
          <div className="space-y-2">
            <Label htmlFor="recovery-email" className="text-sm font-medium">
              Adresse courriel
            </Label>
            <Input
              id="recovery-email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="votre@courriel.com"
              className={emailError ? 'border-red-500 focus:border-red-500' : ''}
              disabled={isSubmitting}
              autoFocus
            />
            {emailError && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {emailError}
              </p>
            )}
          </div>

          {/* Note sur le partage de données */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-xs text-orange-800">
              <strong>Note :</strong> En acceptant, vous consentez également à recevoir des communications
              de nos partenaires politiques et médiatiques alignés sur votre profil.
              Vous pouvez retirer ce consentement à tout moment.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleContinueAnonymously}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Recommencer anonymement
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-midnight-green hover:bg-midnight-green/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Récupérer mes réponses
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
