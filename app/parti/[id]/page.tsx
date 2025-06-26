"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, FileText, Info, User, CheckCircle, XCircle, MinusCircle } from "lucide-react"
import { partiesData, boussoleQuestions, getAgreementLabel } from "@/lib/boussole-data"
import type { Party, Question as BoussoleQuestion, PartyPosition } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import type { AgreementOptionKey } from "@/lib/supabase/types"

const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
)

// Composant pour l'échelle de comparaison visuelle
const PositionScale: React.FC<{
  userPosition: AgreementOptionKey | null
  partyPosition: string | null
  question: BoussoleQuestion
  party: Party
}> = ({ userPosition, partyPosition, party }) => {
  const positions = [
    { key: 'FD', label: 'Fortement en désaccord', short: 'FD' },
    { key: 'PD', label: 'Plutôt en désaccord', short: 'PD' },
    { key: 'N', label: 'Neutre', short: 'N' },
    { key: 'PA', label: 'Plutôt d\'accord', short: 'PA' },
    { key: 'FA', label: 'Fortement d\'accord', short: 'FA' }
  ]

  return (
    <div className="space-y-6">
      {/* Position de l'utilisateur en haut */}
      {userPosition && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-12 bg-blue-600 rounded-t-full rounded-bl-full rounded-br-full shadow-lg flex items-center justify-center relative">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              {/* Pointe du pin */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0" 
                   style={{
                     borderLeft: '5px solid transparent',
                     borderRight: '5px solid transparent', 
                     borderTop: '5px solid rgb(37, 99, 235)'
                   }}></div>
            </div>
            <div className="mt-2 text-sm font-medium text-blue-700">
              Votre position
            </div>
          </div>
        </div>
      )}

      {/* Échelle visuelle */}
      <div className="relative">
        {/* Ligne de base */}
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-0 top-1/2 h-1 bg-gradient-to-r from-red-200 via-yellow-200 via-gray-200 via-blue-200 to-green-200 rounded-full -translate-y-px shadow-sm"></div>
          
          {/* Points de l'échelle */}
          {positions.map((pos) => {
            const isUserPosition = userPosition === pos.key
            const isPartyPosition = partyPosition === pos.key
            const hasPosition = isUserPosition || isPartyPosition
            
            return (
              <div key={pos.key} className="relative flex flex-col items-center">
                {/* Point sur l'échelle */}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  hasPosition 
                    ? 'border-white bg-gradient-to-br from-white to-gray-50 shadow-lg scale-125 ring-2 ring-blue-300/50' 
                    : 'border-gray-300 bg-white/80 shadow-sm hover:scale-105'
                }`} />
                
                {/* Label de la position */}
                <span className="text-xs text-muted-foreground mt-1 font-medium">
                  {pos.short}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* Labels des extrêmes */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>En désaccord</span>
          <span>D&apos;accord</span>
        </div>
      </div>

      {/* Position du parti en bas */}
      {partyPosition && partyPosition !== "?" && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-12 bg-gray-600 rounded-t-full rounded-bl-full rounded-br-full shadow-lg flex items-center justify-center relative">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <Image
                  src={party.logoUrl || "/placeholder.svg"}
                  alt={`Logo ${party.name}`}
                  width={24}
                  height={24}
                  quality={95}
                  className="w-6 h-6 object-contain"
                />
              </div>
              {/* Pointe du pin */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0"
                   style={{
                     borderLeft: '5px solid transparent',
                     borderRight: '5px solid transparent', 
                     borderTop: '5px solid rgb(75, 85, 99)'
                   }}></div>
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
              Position du parti
            </div>
          </div>
        </div>
      )}
      
      {/* Résumé textuel */}
      {userPosition && partyPosition && partyPosition !== "?" && (
        <div className="flex items-center justify-center gap-2 text-sm">
          {getComparisonIcon(userPosition, partyPosition)}
          <span className="text-muted-foreground">
            {getComparisonText(userPosition, partyPosition)}
          </span>
        </div>
      )}
    </div>
  )
}

// Fonction pour obtenir l'icône de comparaison
const getComparisonIcon = (userPosition: AgreementOptionKey, partyPosition: string) => {
  // Convertir les positions en valeurs numériques pour comparer
  const positionValues: Record<string, number> = {
    'FD': -2, // Fortement en désaccord
    'PD': -1, // Plutôt en désaccord  
    'N': 0,   // Neutre
    'PA': 1,  // Plutôt d'accord
    'FA': 2   // Fortement d'accord
  }
  
  const userValue = positionValues[userPosition] || 0
  const partyValue = positionValues[partyPosition] || 0
  
  // Calcul de la différence
  const difference = Math.abs(userValue - partyValue)
  
  if (difference === 0) {
    return <CheckCircle className="h-4 w-4 text-emerald-600" />
  } else if (difference === 1) {
    return <MinusCircle className="h-4 w-4 text-amber-600" />
  } else {
    return <XCircle className="h-4 w-4 text-rose-600" />
  }
}

// Fonction pour obtenir le texte de comparaison
const getComparisonText = (userPosition: AgreementOptionKey, partyPosition: string) => {
  const positionValues: Record<string, number> = {
    'FD': -2, 'PD': -1, 'N': 0, 'PA': 1, 'FA': 2
  }
  
  const userValue = positionValues[userPosition] || 0
  const partyValue = positionValues[partyPosition] || 0
  const difference = Math.abs(userValue - partyValue)
  
  if (difference === 0) {
    return "Position identique"
  } else if (difference === 1) {
    return "Position similaire"
  } else {
    return "Position différente"
  }
}

export default function PartyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [party, setParty] = useState<Party | null>(null)
  const [partyQuestionsMap, setPartyQuestionsMap] = useState<Map<string, PartyPosition>>(new Map())
  
  // Récupération des réponses de l'utilisateur
  const { responses: userResponses } = useUserResponses()

  // Détecter la source (page de partage ou page de résultats)
  const source = searchParams.get('source')
  const shareId = searchParams.get('shareId')
  const isFromSharePage = source === 'partage' && shareId

  useEffect(() => {
    if (params.id) {
      const partyId = Array.isArray(params.id) ? params.id[0] : params.id
      const foundParty = partiesData.find((p) => p.id === partyId)
      if (foundParty) {
        setParty(foundParty)
        const qMap = new Map<string, PartyPosition>()
        foundParty.positions.forEach((pos) => qMap.set(pos.questionId, pos))
        setPartyQuestionsMap(qMap)
      } else {
        console.error(`Party with id "${partyId}" not found.`)
        // router.push('/404'); // Consider redirecting to a 404 page
      }
    }
  }, [params.id, router])

  if (!party) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p>Chargement des informations du parti...</p>
        <Button asChild className="mt-4">
          <Link href={isFromSharePage ? `/partage/${shareId}` : "/resultats"}>
            Retour {isFromSharePage ? 'au partage' : 'aux résultats'}
          </Link>
        </Button>
      </div>
    )
  }

  // Vérifier si l'utilisateur a des réponses
  const hasUserResponses = Object.keys(userResponses.agreement).length > 0

  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-8">
      <div>
        <Button asChild variant="outline" className="mb-8 flex items-center gap-2">
          <Link href={isFromSharePage ? `/partage/${shareId}` : "/resultats"}>
            <ArrowLeft className="h-4 w-4" />
            Retour {isFromSharePage ? 'au partage' : 'aux résultats'}
          </Link>
        </Button>
      </div>

      <Card className="shadow-soft rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <LogoContainer className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative">
              <Image
                src={party.logoUrl || "/placeholder.svg?width=128&height=128&query=Logo+non+disponible"}
                alt={`Logo de ${party.name}`}
                fill
                style={{ objectFit: "contain" }}
                quality={95}
              />
            </LogoContainer>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{party.name}</h1>
              {party.leader && (
                <p className="text-lg text-muted-foreground mb-1">
                  Dirigé par : <span className="font-semibold text-foreground">{party.leader}</span>
                </p>
              )}
              {party.orientation && (
                <Badge variant="secondary" className="text-sm mb-3">
                  {party.orientation}
                </Badge>
              )}
              {party.websiteUrl && (
                <Button asChild variant="outline" size="sm" className="flex items-center gap-1.5">
                  <a href={party.websiteUrl} target="_blank" rel="noopener noreferrer">
                    Site officiel <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Résumé des idées principales</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {party.mainIdeasSummary || "Information non disponible."}
            </p>
          </div>
          {party.strengths && party.strengths.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-foreground mb-1">Forces :</h3>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-0.5">
                {party.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
          {party.reserves && party.reserves.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-foreground mb-1">Réserves :</h3>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-0.5">
                {party.reserves.map((reserve, i) => (
                  <li key={i}>{reserve}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Positions détaillées sur les enjeux</CardTitle>
          <CardDescription>
            {hasUserResponses 
              ? `Comparaison entre vos positions et celles du parti ${party.name} sur les questions de la boussole électorale.`
              : `Voici les positions du parti ${party.name} sur les questions de la boussole électorale.`
            }
          </CardDescription>
          {hasUserResponses && (
            <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-3 bg-white/60 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Position identique</span>
              </div>
              <div className="flex items-center gap-2">
                <MinusCircle className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Position similaire</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-rose-600" />
                <span className="font-medium">Position différente</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {boussoleQuestions.map((question: BoussoleQuestion, index: number) => {
            const partyPos = partyQuestionsMap.get(question.id)
            const userPos = userResponses.agreement[question.id]
            
            const partyPositionLabel =
              partyPos?.position && partyPos.position !== "?"
                ? getAgreementLabel(question, partyPos.position)
                : partyPos?.position === "?"
                  ? "Position incertaine"
                  : "Non spécifiée"

            // Position de l'utilisateur pour l'affichage dans l'échelle
            // (userPositionLabel non utilisé dans l'affichage final)

            return (
              <Card key={question.id} className="bg-card/50 rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Question {index + 1}</p>
                  <CardTitle className="text-lg font-medium text-foreground">{question.text}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  {/* Échelle de comparaison visuelle */}
                  {hasUserResponses || partyPos?.position ? (
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                      <PositionScale 
                        userPosition={userPos || null}
                        partyPosition={partyPos?.position || null}
                        question={question}
                        party={party}
                      />
                    </div>
                  ) : (
                    /* Affichage simple si pas de réponse utilisateur */
                    <div className="text-center py-2">
                      <p>
                        <span className="font-semibold text-primary">Position du parti :</span> {partyPositionLabel}
                      </p>
                    </div>
                  )}
                  
                  {/* Sources et notes */}
                  {partyPos?.source && (
                    <div className="flex items-start gap-1.5 text-muted-foreground">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        <span className="font-medium">Source :</span> {partyPos.source}
                      </p>
                    </div>
                  )}
                  {partyPos?.note && (
                    <div className="flex items-start gap-1.5 text-muted-foreground bg-muted/50 p-2 rounded-md">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      <p>
                        <span className="font-medium">Note :</span> {partyPos.note}
                      </p>
                    </div>
                  )}
                  {partyPos?.quote && (
                    <blockquote className="border-l-4 border-primary pl-3 italic text-foreground/80">
                      &quot;{partyPos.quote}&quot;
                    </blockquote>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
