"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Share, 
  Copy, 
  Download,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  MapPin,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react"
import { toast } from "sonner"
import { useProfile } from "@/hooks/useProfile"

interface TopParty {
  party: {
    id: string
    name: string
    shortName?: string
    leader?: string
    logoUrl?: string
  }
  score: number
  rank: number
}

interface ShareCardProps {
  topParties: TopParty[]
  userPosition?: { x: number; y: number }
  className?: string
}

export default function EnhancedShareCard({ topParties, userPosition, className }: ShareCardProps) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const { profile } = useProfile()
  
  // Données formatées pour le partage
  const topMatch = topParties[0]
  const district = profile?.district || "Ville de Québec"
  const shareData = {
    topParty: {
      name: topMatch?.party.shortName || topMatch?.party.name || "Parti",
      score: Math.round(topMatch?.score || 0)
    },
    district,
    timestamp: new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  // Génération d'URLs de partage optimisées
  const generateShareUrl = async () => {
    try {
      const response = await fetch('/api/save-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topParties: topParties.slice(0, 3),
          userPosition,
          userProfile: {
            district: profile?.district,
            postalCode: profile?.postalCode
          },
          metadata: {
            createdAt: new Date().toISOString(),
            platform: 'web'
          }
        })
      })
      
      if (!response.ok) throw new Error('Erreur API')
      
      const { shareId } = await response.json()
      if (!shareId) {
        throw new Error('ShareId manquant dans la réponse API')
      }
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      return `${baseUrl}/partage/${shareId}`
    } catch (error) {
      console.error('Erreur génération URL:', error)
      toast.error("Erreur lors de la génération du lien")
      return window.location.href
    }
  }

  // Messages de partage optimisés par plateforme
  const getShareMessage = (platform: 'twitter' | 'facebook' | 'linkedin' | 'general') => {
    const { name, score } = shareData.topParty
    
    const messages = {
      twitter: `🗳️ Ma Boussole Municipale révèle: ${score}% d'affinité avec ${name} ! Découvrez votre compatibilité politique à Québec 🧭 #BoussoleMunicipale #Québec2025`,
      facebook: `Résultats surprenants de ma Boussole Municipale ! ${score}% d'affinité avec ${name}. Et vous, quel parti correspond le mieux à vos priorités pour Québec ?`,
      linkedin: `Intéressant de découvrir ses affinités politiques municipales. ${score}% de compatibilité avec ${name} selon la Boussole Municipale. Un outil utile pour s'informer avant les élections.`,
      general: `${score}% d'affinité avec ${name} selon ma Boussole Municipale ! Découvrez vos compatibilités politiques pour Québec :`
    }
    
    return messages[platform]
  }

  // Partage spécialisé par plateforme
  const handleTwitterShare = async () => {
    const shareUrl = await generateShareUrl()
    const text = encodeURIComponent(getShareMessage('twitter'))
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleFacebookShare = async () => {
    const shareUrl = await generateShareUrl()
    const quote = encodeURIComponent(getShareMessage('facebook'))
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${quote}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleLinkedInShare = async () => {
    const shareUrl = await generateShareUrl()
    const title = encodeURIComponent('Ma Boussole Municipale - Résultats')
    const summary = encodeURIComponent(getShareMessage('linkedin'))
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${title}&summary=${summary}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleCopyLink = async () => {
    const shareUrl = await generateShareUrl()
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Lien copié ! Partagez vos résultats")
    } catch {
      toast.error("Impossible de copier le lien")
    }
  }

  const handleNativeShare = async () => {
    const shareUrl = await generateShareUrl()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ma Boussole Municipale - Résultats',
          text: getShareMessage('general'),
          url: shareUrl,
        })
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          handleCopyLink()
        }
      }
    } else {
      handleCopyLink()
    }
  }

  // Génération d'image de partage personnalisée
  const generateShareImage = async () => {
    setIsGeneratingImage(true)
    try {
      const response = await fetch('/api/generate-share-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topParties: topParties.slice(0, 3).map(p => ({
            party: {
              id: p.party.id,
              name: p.party.name,
              shortName: p.party.shortName,
              leader: p.party.leader,
              logoUrl: p.party.logoUrl
            },
            score: p.score
          })),
          userProfile: {
            district: profile?.district || "Citoyen de Québec",
            name: "Citoyen" // Anonyme par défaut
          },
          format: 'png'
        })
      })

      if (!response.ok) throw new Error('Erreur génération image')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // Téléchargement automatique
      const a = document.createElement('a')
      a.href = url
      a.download = `boussole-municipale-${shareData.topParty.name.toLowerCase()}-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("Image de partage téléchargée !")
    } catch (error) {
      console.error('Erreur génération image:', error)
      toast.error("Impossible de générer l'image")
    } finally {
      setIsGeneratingImage(false)
    }
  }

  if (!topMatch) return null

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-primary/20 shadow-lg ${className}`}>
      <CardContent className="p-6 space-y-4">
        {/* Header avec résultat principal */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{district}</span>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary">
              {shareData.topParty.score}%
            </div>
            <div className="text-sm font-medium text-foreground">
              d'affinité avec
            </div>
            <div className="text-lg font-semibold text-foreground">
              {shareData.topParty.name}
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 gap-2 py-2">
          <div className="text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Top Match
            </div>
            <div className="font-semibold text-sm">#{topMatch.rank}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              Calculé
            </div>
            <div className="font-semibold text-sm">{shareData.timestamp}</div>
          </div>
        </div>

        {/* Top 3 aperçu */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground text-center">
            Mes top 3 partis
          </div>
          {topParties.slice(0, 3).map((party, index) => (
            <div key={party.party.id} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Badge variant={index === 0 ? "default" : "secondary"} className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                  {index + 1}
                </Badge>
                <span className="text-sm font-medium truncate">
                  {party.party.shortName || party.party.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">
                {Math.round(party.score)}%
              </span>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="pt-2 border-t border-primary/10">
          <div className="text-xs text-center text-muted-foreground mb-3">
            Partagez vos résultats et invitez vos amis !
          </div>
          
          {/* Boutons de partage */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleNativeShare}
              size="sm"
              className="w-full"
            >
              <Share className="h-4 w-4 mr-2" />
              Partager
            </Button>
            
            <Button
              onClick={generateShareImage}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={isGeneratingImage}
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingImage ? "..." : "Image"}
            </Button>
          </div>
          
          {/* Partage social détaillé */}
          <div className="grid grid-cols-4 gap-1 mt-2">
            <Button
              onClick={handleTwitterShare}
              variant="ghost"
              size="sm"
              className="p-2 h-auto"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleFacebookShare}
              variant="ghost"
              size="sm"
              className="p-2 h-auto"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleLinkedInShare}
              variant="ghost"
              size="sm"
              className="p-2 h-auto"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="sm"
              className="p-2 h-auto"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 