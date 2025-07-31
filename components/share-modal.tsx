"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Facebook, MessageCircle, LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { type Party, type AgreementOptionKey, type ImportanceDirectOptionKey } from '@/lib/boussole-data'
import { type CalculatedResults } from '@/hooks/useResults'
import PoliticalCompassChart from "@/components/political-compass-chart"
import { sendResultsByEmail } from '@/lib/email-service'
import Image from 'next/image'


interface CalculatedPartyScore {
  party: Party
  score: number
  rawScore: number
  maxPossibleRawScoreForParty: number
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  results: CalculatedResults | null
  politicalPosition?: { x: number; y: number }
  userAnswers: Record<string, AgreementOptionKey>
  userImportance: Record<string, ImportanceDirectOptionKey>
  calculatedScores: CalculatedPartyScore[]
  topParties: CalculatedPartyScore[]
}

// Types pour Facebook SDK
interface FacebookShareParams {
  method: string;
  link: string;
  quote?: string;
}

interface FacebookResponse {
  post_id?: string;
  error?: unknown;
}

declare global {
  interface Window {
    FB?: {
      ui: (params: FacebookShareParams, callback?: (response: FacebookResponse) => void) => void
    }
  }
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  results, 
  politicalPosition, 
  userAnswers, 
  userImportance,
  topParties
}: ShareModalProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  // Générer le texte de partage simple et clair
  const generateShareText = () => {
    const topMatch = topParties[0]
    const partyName = topMatch?.party?.shortName || topMatch?.party?.name || 'mon parti préféré'
    const score = Math.round(topMatch?.score || 0)
    
    return `🏛️ Ma Boussole Municipale révèle: ${score}% d'affinité avec ${partyName} ! Découvrez la vôtre à Québec 🗳️ #BoussoleMunicipale #Québec2025`
  }

  // Générer le lien de partage
  const generateShareUrl = async () => {
    const shareId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log(`🎯 [generateShareUrl] Génération shareId: ${shareId}`)
    
    const shareData = {
      id: shareId,
      userName: "Citoyen engagé",
      topParties: topParties.slice(0, 3).map(p => ({ party: p.party, score: p.score })),
      userPosition: politicalPosition,
      timestamp: Date.now(),
      userAnswers: userAnswers,
      userImportance: userImportance
    }
    
    console.log(`📦 [generateShareUrl] Données à sauvegarder:`, {
      id: shareData.id,
      topPartiesCount: shareData.topParties.length,
      hasUserAnswers: !!shareData.userAnswers,
      userAnswersCount: Object.keys(shareData.userAnswers || {}).length
    })
    
    try {
      console.log(`🚀 [generateShareUrl] Appel API save-share`)
      const response = await fetch('/api/save-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shareId, data: shareData })
      })
      
      console.log(`📡 [generateShareUrl] Réponse API statut: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ [generateShareUrl] Erreur API:`, errorText)
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }
      
      const result = await response.json()
      console.log(`✅ [generateShareUrl] Sauvegarde réussie:`, result)
      
    } catch (error) {
      console.error('💥 [generateShareUrl] Erreur lors de l\'appel à l\'API de sauvegarde:', error)
      toast.error("Erreur lors de la sauvegarde. Le partage pourrait ne pas fonctionner.")
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const shareUrl = `${baseUrl}/partage/${shareId}`
    console.log(`🔗 [generateShareUrl] URL finale générée: ${shareUrl}`)
    return shareUrl
  }

  // Fonctions de partage
  const handleTwitterShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const text = generateShareText()
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
      window.open(url, '_blank')
      toast.success("Partagé sur X !")
    } catch {
      toast.error("Erreur lors du partage sur X")
    }
    setIsSharing(false)
  }

  const handleFacebookShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const text = generateShareText()
      // Utilisation du sharer standard, plus simple et fiable
      const params = new URLSearchParams({
        u: shareUrl,
        quote: text
      })
      window.open(`https://www.facebook.com/sharer/sharer.php?${params}`, '_blank')
      toast.success("Partage Facebook ouvert !")
    } catch (error) {
      console.error('Erreur lors du partage Facebook:', error)
      toast.error("Erreur lors du partage sur Facebook")
    }
    setIsSharing(false)
  }

  const handleMessengerShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      
      
      // Ouvrir Messenger avec le message et lien
      const messengerUrl = `https://www.messenger.com/t/?link=${encodeURIComponent(shareUrl)}`
      window.open(messengerUrl, '_blank')
      toast.success("Messenger ouvert !")
    } catch (error) {
      console.error('Erreur lors du partage Messenger:', error)
      toast.error("Impossible de partager sur Messenger")
    }
    setIsSharing(false)
  }

  const handleCopyLink = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      await navigator.clipboard.writeText(`${generateShareText()}\n\n${shareUrl}`)
      toast.success("Lien copié dans le presse-papiers !")
    } catch {
      toast.error("Erreur lors de la copie")
    }
    setIsSharing(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Veuillez entrer une adresse email valide")
      return
    }

    setIsSharing(true)
    try {
      // Générer l'URL de partage des résultats
      const shareUrl = await generateShareUrl()
      
      // Préparer les données pour l'email
      const emailData = {
        topParties: topParties,
        userPosition: politicalPosition ? {
          economic: politicalPosition.x,
          social: politicalPosition.y
        } : undefined,
        timestamp: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // Utiliser le service d'email avec l'URL de partage
      const success = await sendResultsByEmail(email, emailData, shareUrl)
      
      if (success) {
        toast.success("Client email ouvert ! Vérifiez votre application email.")
        setEmail("") // Reset le champ
        setConsent(false) // Reset le consentement
      } else {
        toast.error("Erreur lors de l'ouverture du client email")
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error)
      toast.error("Une erreur est survenue lors de l'envoi")
    }
    setIsSharing(false)
  }

  if (!results || !topParties.length) {
    return null
  }

  // Composant LogoContainer identique à celui de la page principale
  const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-full bg-white shadow-sm border border-border/40 flex items-center justify-center p-2 ${className}`}>
      {children}
    </div>
  )

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            🏛️ Partagez vos résultats
          </DialogTitle>
        </DialogHeader>
        
        {/* Boutons de partage modernes en haut */}
        <div className="space-y-4 border-b pb-6">
          <h4 className="text-center font-medium text-gray-700">
            Partagez vos résultats et encouragez vos proches à découvrir leurs propres affinités politiques.
          </h4>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Partager via</h3>
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={handleFacebookShare} disabled={isSharing} className="flex flex-col items-center text-center gap-1 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-110">
                  <Facebook className="w-7 h-7" />
                </div>
                <span className="text-xs">Facebook</span>
              </button>
              <button onClick={handleTwitterShare} disabled={isSharing} className="flex flex-col items-center text-center gap-1 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white transition-transform group-hover:scale-110 overflow-hidden">
                  <Image src="/X.png" alt="X Logo" width={48} height={48} loading="lazy" />
                </div>
                <span className="text-xs">X</span>
              </button>
              <button onClick={handleMessengerShare} disabled={isSharing} className="flex flex-col items-center text-center gap-1 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white transition-transform group-hover:scale-110">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <span className="text-xs">Messenger</span>
              </button>
              <button onClick={handleCopyLink} disabled={isSharing} className="flex flex-col items-center text-center gap-1 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 text-white transition-transform group-hover:scale-110">
                  <LinkIcon className="w-7 h-7" />
                </div>
                <span className="text-xs">Copier le lien</span>
              </button>
              <button onClick={() => setIsEmailModalOpen(true)} disabled={isSharing} className="flex flex-col items-center text-center gap-1 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 text-white transition-transform group-hover:scale-110">
                  <Mail className="w-7 h-7" />
                </div>
                <span className="text-xs">Email</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* COPIE EXACTE: Module "Vos meilleurs alignements (Partis)" */}
          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Vos meilleurs alignements (Partis)</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {topParties.slice(0, 3).map(({ party, score }, index: number) => (
                <Card
                  key={party.id}
                  className="p-6 flex flex-col items-center text-center border-border shadow-sm rounded-xl card-interactive-effects animate-fadeIn"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <LogoContainer className="w-20 h-20 mb-4">
                    <Image
                      src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
                      alt={`Logo ${party.name}`}
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  </LogoContainer>
                  <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">{party.shortName || party.name}</h3>
                    <p className="text-sm text-muted-foreground leading-tight">{party.name}</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                    <div
                      className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${score.toFixed(0)}%` }}
                    ></div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-4">{score.toFixed(0)}% d&apos;affinité</p>
                  {/* Pas de bouton dans le partage pour éviter la complexité */}
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Section "Votre position par rapport aux plateformes" retirée du modal de partage */}

          {/* COPIE EXACTE: Carte de positionnement politique 2D */}
          <PoliticalCompassChart userAnswers={userAnswers} userImportance={userImportance} />

          {/* Anciens boutons de partage supprimés */}

          {/* Call to action */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Découvrez votre compatibilité politique municipale
            </p>
            <p className="text-xs text-blue-600 font-medium">
              boussolemunicipalequebec.ca
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Modal séparé pour l'envoi par email */}
    <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-800">
            📧 Sauvegardez vos résultats
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Conservez une trace de vos résultats en vous les envoyant par courriel.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email-results" className="text-foreground">
              Votre adresse courriel
            </Label>
            <Input
              type="email"
              id="email-results"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="consent-results" 
              checked={consent} 
              onCheckedChange={(checked) => setConsent(!!checked)} 
            />
            <Label htmlFor="consent-results" className="text-sm text-muted-foreground">
              J&apos;aimerais être invité(e) à participer aux futures initiatives de la Boussole électorale.
            </Label>
          </div>
          <Button
            type="submit"
            disabled={isSharing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          >
            <Mail className="mr-2 h-4 w-4" /> 
            {isSharing ? "Envoi en cours..." : "M'envoyer mes résultats par courriel"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
} 