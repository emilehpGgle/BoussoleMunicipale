'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PoliticalCompassChart from '@/components/political-compass-chart'
import { type AgreementOptionKey } from '@/lib/boussole-data'
// import { calculateUserPoliticalPosition } from '@/lib/political-map-calculator' // Unused

// Fonction simplifiée pour obtenir la municipality depuis les données partagées
function getMunicipalityFromSharedResult(sharedResult: SharedResult): string {
  // 1. Priorité: municipality_id depuis la base de données (après migration)
  if (sharedResult.municipality_id) {
    console.log(`✅ [SharePageClient] Municipality depuis DB: ${sharedResult.municipality_id}`)
    return sharedResult.municipality_id
  }

  // 2. Fallback: municipality depuis shareData (données JSON)
  if (sharedResult.municipality) {
    console.log(`✅ [SharePageClient] Municipality depuis shareData: ${sharedResult.municipality}`)
    return sharedResult.municipality
  }

  // 3. Fallback d'urgence: détecter depuis les partis (pour compatibilité anciens partages)
  if (sharedResult.topParties && sharedResult.topParties.length > 0) {
    const firstPartyId = sharedResult.topParties[0].party.id
    console.log(`🔍 [SharePageClient] Fallback détection par parti: ${firstPartyId}`)

    // Détection simple par mots-clés dans les IDs
    if (firstPartyId.includes('quebec') || firstPartyId.includes('labeaume')) {
      return 'quebec'
    }
    if (firstPartyId.includes('montreal')) {
      return 'montreal'
    }
    // Ajouter d'autres selon besoins
  }

  // 4. Fallback final par défaut
  console.warn('⚠️ [SharePageClient] Aucune municipality trouvée, fallback vers quebec')
  return 'quebec'
}


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
  // Ajouter les réponses utilisateur pour la carte politique
  userAnswers?: Record<string, AgreementOptionKey>
  userImportance?: Record<string, unknown>
  // Ajouter municipality depuis les nouvelles données
  municipality?: string
  municipality_id?: string // Depuis la base de données après migration
}

interface SharePageClientProps {
  sharedResult: SharedResult | null
}

export default function SharePageClient({ sharedResult }: SharePageClientProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log(`🎭 [SharePageClient] Initialisation avec:`, {
      hasSharedResult: !!sharedResult,
      sharedResultId: sharedResult?.id,
      topPartiesCount: sharedResult?.topParties?.length,
      hasUserAnswers: !!sharedResult?.userAnswers,
      userAnswersCount: Object.keys(sharedResult?.userAnswers || {}).length
    })
    
    if (!sharedResult) {
      console.error(`❌ [SharePageClient] Aucun résultat partagé reçu`)
      setError('Impossible de charger les résultats partagés')
    } else {
      console.log(`✅ [SharePageClient] Résultats reçus avec succès pour ID: ${sharedResult.id}`)
    }
  }, [sharedResult])

  // Composant LogoContainer identique à celui du modal
  const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-full bg-white shadow-sm border border-border/40 flex items-center justify-center p-2 ${className}`}>
      {children}
    </div>
  )



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
      {/* Header complètement supprimé comme demandé */}
      
      {/* Contenu principal avec conteneur approprié */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          
          {/* Module &quot;Meilleurs alignements (Partis)&quot; avec liens vers fiches */}
          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Meilleurs alignements (Partis)</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {sharedResult.topParties && sharedResult.topParties.length > 0 ? (
                sharedResult.topParties.slice(0, 3).map((topParty, index: number) => (
                  // CORRECTION 2: Ajouter les liens vers les fiches des partis avec source=partage
                  <Link
                    key={topParty.party.id}
                    href={`/parti/${topParty.party.id}?source=partage&shareId=${sharedResult.id}`}
                    className="group"
                  >
                    <Card
                      className="p-6 flex flex-col items-center text-center border-border shadow-sm rounded-xl card-interactive-effects animate-fadeIn group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <LogoContainer className="w-20 h-20 mb-4 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={topParty.party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
                          alt={`Logo ${topParty.party.name}`}
                          width={60}
                          height={60}
                          style={{ objectFit: "contain" }}
                        />
                      </LogoContainer>
                      <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                        <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">{topParty.party.shortName || topParty.party.name}</h3>
                        <p className="text-sm text-muted-foreground leading-tight">{topParty.party.name}</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                        <div
                          className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${topParty.score.toFixed(0)}%` }}
                        ></div>
                      </div>
                      <p className="text-lg font-bold text-foreground mb-4">{topParty.score.toFixed(0)}% d&apos;affinité</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-xs font-medium">
                        Voir la fiche <ArrowRight className="inline h-3 w-3" />
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <p>Aucun résultat disponible</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CORRECTION 3: Ajouter la carte des positions politiques */}
          {sharedResult.userAnswers && Object.keys(sharedResult.userAnswers).length > 0 && (
            <PoliticalCompassChart
              userAnswers={sharedResult.userAnswers}
              municipality={getMunicipalityFromSharedResult(sharedResult)}
              userImportance={sharedResult.userImportance || {}}
            />
          )}



          {/* Call to action */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Découvrez votre compatibilité politique municipale
            </p>
            <p className="text-xs text-blue-600 font-medium">
              boussolemunicipale.com
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