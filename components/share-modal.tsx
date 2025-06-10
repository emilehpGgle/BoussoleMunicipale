"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Link as LinkIcon, MessageCircle, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { partiesData, type Party, type AgreementOptionKey, type ImportanceDirectOptionKey } from '@/lib/boussole-data'
import PoliticalCompassChart from "@/components/political-compass-chart"
import Image from 'next/image'
import Link from 'next/link'

interface TopParty {
  partyId: string
  score: number
  percentage: number
  rank: number
  party: Party
}

interface CalculatedPartyScore {
  party: Party
  score: number
  rawScore: number
  maxPossibleRawScoreForParty: number
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  results: any
  politicalPosition?: { x: number; y: number }
  userAnswers: Record<string, AgreementOptionKey>
  userImportance: Record<string, ImportanceDirectOptionKey>
  calculatedScores: CalculatedPartyScore[]
  topParties: CalculatedPartyScore[]
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  results, 
  politicalPosition, 
  userAnswers, 
  userImportance,
  calculatedScores,
  topParties
}: ShareModalProps) {
  const [isSharing, setIsSharing] = useState(false)

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
    
    const shareData = {
      id: shareId,
      userName: "Citoyen engagé",
      topParties: topParties.slice(0, 3).map(p => ({ party: p.party, score: p.score })),
      userPosition: politicalPosition,
      timestamp: Date.now()
    }
    
    try {
      const response = await fetch('/api/save-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shareId, data: shareData })
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API de sauvegarde:', error)
      toast.error("Erreur lors de la sauvegarde. Le partage pourrait ne pas fonctionner.")
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}/partage/${shareId}`
  }

  // Fonctions de partage
  const handleTwitterShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const text = generateShareText()
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
      window.open(url, '_blank')
      toast.success("Partagé sur Twitter !")
    } catch (error) {
      toast.error("Erreur lors du partage sur Twitter")
    }
    setIsSharing(false)
  }

  const handleFacebookShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(generateShareText())}`
      window.open(url, '_blank')
      toast.success("Partagé sur Facebook !")
    } catch (error) {
      toast.error("Erreur lors du partage sur Facebook")
    }
    setIsSharing(false)
  }

  const handleLinkedInShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Ma Boussole Municipale')}&summary=${encodeURIComponent(generateShareText())}`
      window.open(url, '_blank')
      toast.success("Partagé sur LinkedIn !")
    } catch (error) {
      toast.error("Erreur lors du partage sur LinkedIn")
    }
    setIsSharing(false)
  }

  const handleMessengerShare = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      const url = `https://www.messenger.com/t/?link=${encodeURIComponent(shareUrl)}`
      window.open(url, '_blank')
      toast.success("Partagé sur Messenger !")
    } catch (error) {
      toast.error("Erreur lors du partage sur Messenger")
    }
    setIsSharing(false)
  }

  const handleCopyLink = async () => {
    setIsSharing(true)
    try {
      const shareUrl = await generateShareUrl()
      await navigator.clipboard.writeText(`${generateShareText()}\n\n${shareUrl}`)
      toast.success("Lien copié dans le presse-papiers !")
    } catch (error) {
      toast.error("Erreur lors de la copie")
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
            Partagez vos résultats et invitez vos amis !
          </h4>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleTwitterShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm font-medium">Twitter</span>
            </button>
            
            <button
              onClick={handleFacebookShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Facebook className="w-4 h-4" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
            
            <button
              onClick={handleLinkedInShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006199] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm font-medium">LinkedIn</span>
            </button>
            
            <button
              onClick={handleMessengerShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 bg-[#00B2FF] hover:bg-[#0099e5] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Messenger</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Copier</span>
            </button>
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
                  <p className="text-lg font-bold text-foreground mb-4">{score.toFixed(0)}% d'affinité</p>
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
  )
} 