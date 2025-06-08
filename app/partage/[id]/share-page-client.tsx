'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'

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

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 55) return 'text-orange-600'
    if (score >= 40) return 'text-purple-600'
    return 'text-gray-600'
  }

  const getScoreBackground = (score: number): string => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-blue-500'
    if (score >= 55) return 'bg-orange-500'
    if (score >= 40) return 'bg-purple-500'
    return 'bg-gray-500'
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Découvrez mes affinités politiques municipales ! ${sharedResult?.topParties[0]?.party.shortName}: ${Math.round(sharedResult?.topParties[0]?.score || 0)}%`)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`🗳️ Mes affinités politiques municipales révélées ! Top parti: ${sharedResult?.topParties[0]?.party.shortName} (${Math.round(sharedResult?.topParties[0]?.score || 0)}%) #BoussoleElectorale #PolitiqueMunicipale`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent('Mes résultats de la Boussole Municipale')
    const summary = encodeURIComponent(`Découvrez mes affinités politiques locales ! Mon top parti: ${sharedResult?.topParties[0]?.party.shortName} avec ${Math.round(sharedResult?.topParties[0]?.score || 0)}% d'affinité.`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank')
  }

  const shareToMessenger = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.messenger.com/t/?link=${url}`, '_blank')
  }

  const startQuestionnaire = () => {
    router.push('/questionnaire')
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
      {/* En-tête */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-lg">🧭</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">BOUSSOLE MUNICIPALE</h1>
                  <p className="text-sm text-gray-600">Résultats partagés</p>
                </div>
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

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Carte de présentation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🗳️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Résultats de {sharedResult.userName}
            </h2>
            <p className="text-gray-600">
              Découvrez leurs affinités politiques municipales
            </p>
          </div>

          {/* Top 3 des affinités */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🏆 Top 3 des affinités
            </h3>
            <div className="space-y-4">
              {sharedResult.topParties.slice(0, 3).map((party, index) => (
                <div 
                  key={party.party.id}
                  className="bg-gray-50 rounded-xl p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-10 h-10 ${getScoreBackground(party.score)} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {party.party.shortName || party.party.name}
                      </h4>
                      {party.party.shortName && (
                        <p className="text-sm text-gray-600">{party.party.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${getScoreColor(party.score)}`}>
                      {Math.round(party.score)}%
                    </span>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`${getScoreBackground(party.score)} h-2 rounded-full`}
                        style={{ width: `${Math.max(party.score, 5)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 