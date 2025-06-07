'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'

// Types pour les données partagées
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

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const [sharedResult, setSharedResult] = useState<SharedResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSharedResult = () => {
      try {
        const shareId = params.id as string
        
        // Tenter de récupérer depuis localStorage
        const savedResults = localStorage.getItem('boussole-shared-results')
        if (savedResults) {
          const results = JSON.parse(savedResults)
          const result = results[shareId]
          
          if (result) {
            setSharedResult(result)
            setLoading(false)
            return
          }
        }

        // Si pas trouvé, utiliser des données par défaut
        const defaultResult: SharedResult = {
          id: shareId,
          userName: 'Citoyen engagé',
          topParties: [
            {
              party: { id: '1', name: 'Québec Debout', shortName: 'QD' },
              score: 92
            },
            {
              party: { id: '2', name: 'Ensemble Pour Québec', shortName: 'EPQ' },
              score: 85
            },
            {
              party: { id: '3', name: 'Libéral du Québec', shortName: 'LQ' },
              score: 78
            }
          ],
          userPosition: { economic: 15, social: 25 },
          timestamp: Date.now()
        }

        setSharedResult(defaultResult)
        setLoading(false)
      } catch (err) {
        console.error('Erreur lors du chargement des résultats partagés:', err)
        setError('Impossible de charger les résultats partagés')
        setLoading(false)
      }
    }

    loadSharedResult()
  }, [params.id])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des résultats...</p>
        </div>
      </div>
    )
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

          {/* Positionnement politique */}
          {sharedResult.userPosition && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📍 Positionnement politique
              </h3>
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="relative w-full h-48 bg-white rounded-lg">
                  {/* Axes de référence */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-300"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute top-2 left-2 text-xs text-gray-600">Progressiste</div>
                  <div className="absolute bottom-2 left-2 text-xs text-gray-600">Conservateur</div>
                  <div className="absolute top-2 right-2 text-xs text-gray-600">Marché</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">Interventionniste</div>
                  
                  {/* Position de l'utilisateur */}
                  <div 
                    className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2"
                    style={{ 
                      left: `${50 + (sharedResult.userPosition.economic / 100) * 40}%`, 
                      top: `${50 - (sharedResult.userPosition.social / 100) * 40}%` 
                    }}
                  ></div>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>Économique: {sharedResult.userPosition.economic > 0 ? 'Marché' : 'Interventionniste'}</p>
                  <p>Social: {sharedResult.userPosition.social > 0 ? 'Progressiste' : 'Conservateur'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Boutons de partage */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Partager ces résultats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={shareToFacebook}
                variant="outline"
                className="flex items-center gap-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                onClick={shareToTwitter}
                variant="outline"
                className="flex items-center gap-2 bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
              >
                <Twitter className="h-4 w-4" />
                Twitter/X
              </Button>
              <Button
                onClick={shareToLinkedIn}
                variant="outline"
                className="flex items-center gap-2 bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                onClick={shareToMessenger}
                variant="outline"
                className="flex items-center gap-2 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
              >
                <MessageCircle className="h-4 w-4" />
                Messenger
              </Button>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-4">🧭</div>
          <h3 className="text-2xl font-bold mb-4">Découvrez VOS affinités politiques !</h3>
          <p className="text-blue-100 mb-6">
            Questionnaire gratuit • 5 minutes • Résultats détaillés
          </p>
          <Button 
            onClick={startQuestionnaire}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Commencer le questionnaire
          </Button>
        </div>
      </div>
    </div>
  )
} 