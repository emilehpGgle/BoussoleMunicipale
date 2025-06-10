'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import Image from 'next/image'

// Types pour les données partagées (doivent correspondre à ce qui est sauvegardé)
interface SharedResult {
  id: string
  userName: string
  topParties: Array<{
    party: {
      id: string
      name: string
      shortName?: string
      leader?: string
      logoUrl?: string
    }
    score: number
  }>
  userPosition?: {
    economic: number
    social: number
  }
  timestamp: number
}

interface SharePageClientProps {
  sharedResult: SharedResult | null
}

export default function SharePageClient({ sharedResult }: SharePageClientProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sharedResult) {
      setError('Impossible de charger les résultats partagés')
    }
  }, [sharedResult])

  // Composant LogoContainer identique à celui du modal
  const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-full bg-white shadow-sm border border-border/40 flex items-center justify-center p-2 ${className}`}>
      {children}
    </div>
  )

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const topParty = sharedResult?.topParties?.[0]
    const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti inconnu'
    const score = Math.round(topParty?.score || 0)
    const text = encodeURIComponent(`Découvrez mes affinités politiques municipales ! ${partyName}: ${score}%`)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const topParty = sharedResult?.topParties?.[0]
    const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti inconnu'
    const score = Math.round(topParty?.score || 0)
    const text = encodeURIComponent(`🗳️ Mes affinités politiques municipales révélées ! Top parti: ${partyName} (${score}%) #BoussoleElectorale #PolitiqueMunicipale`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent('Mes résultats de la Boussole Municipale')
    const topParty = sharedResult?.topParties?.[0]
    const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti inconnu'
    const score = Math.round(topParty?.score || 0)
    const summary = encodeURIComponent(`Découvrez mes affinités politiques locales ! Mon top parti: ${partyName} avec ${score}% d'affinité.`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank')
  }

  const shareToMessenger = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.messenger.com/t/?link=${url}`, '_blank')
  }

  const startQuestionnaire = () => {
    router.push('/')
  }

  if (error || !sharedResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Résultats introuvables</h1>
          <p className="text-gray-600 mb-6">Ces résultats ne sont plus disponibles ou ont expiré.</p>
          <Button onClick={startQuestionnaire} className="bg-blue-600 hover:bg-blue-700">
            Faire le questionnaire
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* En-tête simplifié */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-lg">🧭</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">BOUSSOLE MUNICIPALE</h1>
                <p className="text-sm text-gray-600">Résultats de {sharedResult.userName}</p>
              </div>
            </div>
            <Button 
              onClick={startQuestionnaire}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Faire mon test
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal - IDENTIQUE au modal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          
          {/* IDENTIQUE AU MODAL: Module "Vos meilleurs alignements (Partis)" */}
          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Meilleurs alignements (Partis)</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {sharedResult.topParties && sharedResult.topParties.length > 0 ? (
                sharedResult.topParties.slice(0, 3).map((topParty, index: number) => (
                  <Card
                    key={topParty.party.id}
                    className="p-6 flex flex-col items-center text-center border-border shadow-sm rounded-xl card-interactive-effects animate-fadeIn"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <LogoContainer className="w-20 h-20 mb-4">
                      <Image
                        src={topParty.party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
                        alt={`Logo ${topParty.party.name}`}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                    </LogoContainer>
                    <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                      <h3 className="text-lg font-semibold text-foreground leading-tight">{topParty.party.shortName || topParty.party.name}</h3>
                      <p className="text-sm text-muted-foreground leading-tight">{topParty.party.name}</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                      <div
                        className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${topParty.score.toFixed(0)}%` }}
                      ></div>
                    </div>
                    <p className="text-lg font-bold text-foreground mb-4">{topParty.score.toFixed(0)}% d'affinité</p>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <p>Aucun résultat disponible</p>
                </div>
              )}
            </CardContent>
          </Card>

                     {/* Boutons de partage modernes - IDENTIQUE au modal */}
           <div className="space-y-4 border-t pt-6">
             <h4 className="text-center font-medium text-gray-700">
               Partagez ces résultats et invitez vos amis !
             </h4>
             
             <div className="flex flex-wrap justify-center gap-3">
               <button
                 onClick={shareToTwitter}
                 className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
               >
                 <Twitter className="w-4 h-4" />
                 <span className="text-sm font-medium">Twitter</span>
               </button>
               
               <button
                 onClick={shareToFacebook}
                 className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
               >
                 <Facebook className="w-4 h-4" />
                 <span className="text-sm font-medium">Facebook</span>
               </button>
               
               <button
                 onClick={shareToLinkedIn}
                 className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006199] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
               >
                 <Linkedin className="w-4 h-4" />
                 <span className="text-sm font-medium">LinkedIn</span>
               </button>
               
               <button
                 onClick={shareToMessenger}
                 className="flex items-center gap-2 px-4 py-2 bg-[#00B2FF] hover:bg-[#0099e5] text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
               >
                 <MessageCircle className="w-4 h-4" />
                 <span className="text-sm font-medium">Messenger</span>
               </button>
               
               <button
                 onClick={() => navigator.clipboard.writeText(window.location.href)}
                 className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
               >
                 <Share2 className="w-4 h-4" />
                 <span className="text-sm font-medium">Copier lien</span>
               </button>
             </div>
           </div>

          {/* Call to action - IDENTIQUE au modal */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Découvrez votre compatibilité politique municipale
            </p>
            <p className="text-xs text-blue-600 font-medium">
              boussolemunicipalequebec.ca
            </p>
            <Button 
              onClick={startQuestionnaire}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              Faire mon test maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 