"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, FileText, Info, CheckCircle, XCircle, MinusCircle, User, Calendar } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { partiesData, boussoleQuestions, getAgreementLabel } from "@/lib/boussole-data"
import type { Party, Question as BoussoleQuestion, PartyPosition } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import { usePriorities } from "@/hooks/usePriorities"
import type { AgreementOptionKey } from "@/lib/supabase/types"

const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
)

// Fonction pour générer le slug à partir du nom du leader
function generateSlug(leaderName: string): string {
  return leaderName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprime les caractères spéciaux
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Remplace les tirets multiples par un seul
    .trim()
}

// Fonction pour obtenir l'icône de comparaison

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
    return <CheckCircle className="h-5 w-5 text-green-600" />
  } else if (difference === 1) {
    return <MinusCircle className="h-5 w-5 text-yellow-600" />
  } else {
    return <XCircle className="h-5 w-5 text-red-600" />
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
  const { priorities: userPriorities } = usePriorities()

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

  // Vérifier si l'utilisateur a des réponses (incluant les priorités)
  const hasUserResponses = Object.keys(userResponses.agreement).length > 0 || (userPriorities && Object.keys(userPriorities).length > 0)

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
                alt={`Logo ${party.name} - ${party.leader} - Élections municipales 2025`}
                fill
                style={{ objectFit: "contain" }}
              />
            </LogoContainer>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{party.name}</h1>
              {party.leader && (
                <div className="mb-3">
                  <p className="text-lg text-muted-foreground mb-2">
                    Dirigé par : <span className="font-semibold text-foreground">{party.leader}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Link 
                      href={`/leaders/${generateSlug(party.leader)}`}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Voir le profil détaillé du leader
                    </Link>
                  </div>
                </div>
              )}
              {party.orientation && (
                <Badge variant="secondary" className="text-sm mb-3">
                  {party.orientation}
                </Badge>
              )}
              <div className="flex flex-wrap gap-2">
                {party.websiteUrl && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-1.5">
                    <a href={party.websiteUrl} target="_blank" rel="noopener noreferrer">
                      Site officiel <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
                {party.leader && (
                  <Button asChild variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Link href={`/leaders/${generateSlug(party.leader)}`}>
                      <User className="h-3.5 w-3.5" />
                      Profil du leader
                    </Link>
                  </Button>
                )}
              </div>
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

      {/* Appel à l'action avec contexte élections 2025 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Élections Municipales 2025</span>
          </div>
          <h3 className="text-xl font-bold mb-3">
            Découvrez vos affinités politiques
          </h3>
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            Comparez vos positions avec celles de {party.name} et {party.leader} sur les enjeux municipaux qui vous concernent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/questionnaire">
                Faire le questionnaire politique
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/leaders">
                Voir tous les leaders
              </Link>
            </Button>
          </div>
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
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>Position identique</span>
              </div>
              <div className="flex items-center gap-1">
                <MinusCircle className="h-3 w-3 text-yellow-600" />
                <span>Position similaire</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-red-600" />
                <span>Position différente</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {boussoleQuestions.map((question: BoussoleQuestion, index: number) => {
            // Gestion spéciale pour la question de priorités (Q21)
            if (question.responseType === "priority_ranking") {
              // Pour la Q21, afficher les priorités au lieu des positions d'accord/désaccord
              const hasUserPriorities = userPriorities && Object.keys(userPriorities).length > 0
              const partyPriorities = party.priorities || []
              
              // Formater les priorités utilisateur
              let userPrioritiesText = "Aucune priorité sélectionnée"
              if (hasUserPriorities) {
                const sortedPriorities = Object.entries(userPriorities)
                  .sort(([,a], [,b]) => (a as number) - (b as number))
                  .map(([priority, rank]) => `${rank}. ${priority}`)
                userPrioritiesText = sortedPriorities.join(' • ')
              }
              
              // Formater les priorités du parti
              const partyPrioritiesText = partyPriorities.length > 0 
                ? partyPriorities.slice(0, 3).map((p, i) => `${i + 1}. ${p}`).join(' • ')
                : "Aucune priorité définie"

              return (
                <Card key={question.id} className="bg-white border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">Question {index + 1}</p>
                    </div>
                    <CardTitle className="text-base font-medium text-foreground leading-snug">{question.text}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 space-y-4">
                    {hasUserPriorities ? (
                      <div className="space-y-3">
                        <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-semibold text-blue-800 mb-0.5">Vos priorités</p>
                          <p className="text-foreground">{userPrioritiesText}</p>
                        </div>
                        
                        <div className="bg-muted/30 border rounded-lg p-3">
                          <p className="text-sm font-semibold text-foreground mb-1">Priorités du parti</p>
                          <p className="text-foreground font-medium text-blue-700">{partyPrioritiesText}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/30 border rounded-lg p-3">
                        <p className="text-sm font-semibold text-foreground mb-1">Priorités du parti</p>
                        <p className="font-medium text-blue-700">{partyPrioritiesText}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            }
            
            // Logique normale pour les autres questions (Q1-Q20)
            const partyPos = partyQuestionsMap.get(question.id)
            const userPos = userResponses.agreement[question.id]
            
            const partyPositionLabel =
              partyPos?.position && partyPos.position !== "?"
                ? getAgreementLabel(question, partyPos.position)
                : partyPos?.position === "?"
                  ? "Position incertaine"
                  : "Non spécifiée"

            return (
              <Card key={question.id} className="bg-white border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground">Question {index + 1}</p>
                  </div>
                  <CardTitle className="text-base font-medium text-foreground leading-snug">{question.text}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-4">
                  {/* Affichage simple inspiré de la page résultats */}
                  {hasUserResponses && userPos ? (
                    <div className="space-y-3">
                      <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-800 mb-0.5">Votre réponse</p>
                        <p className="text-foreground">{getAgreementLabel(question, userPos)}</p>
                      </div>
                      
                      {partyPos?.position && partyPos.position !== "?" ? (
                         <div className="bg-muted/30 border rounded-lg p-3 space-y-2">
                           <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-foreground">Position du parti</p>
                            <div className="flex items-center gap-2">
                               <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    {getComparisonIcon(userPos, partyPos.position)}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{getComparisonText(userPos, partyPos.position)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                           </div>
                           <p className="text-foreground font-medium text-blue-700">{partyPositionLabel}</p>
                         </div>
                      ) : (
                        <div className="bg-muted/30 border rounded-lg p-3 text-center">
                          <p className="text-sm text-muted-foreground italic">
                            {partyPos?.position === "?" ? "Position incertaine" : "Position non spécifiée"}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : partyPos?.position && partyPos.position !== "?" ? (
                    /* Affichage simple si pas de réponse utilisateur */
                     <div className="bg-muted/30 border rounded-lg p-3">
                        <p className="text-sm font-semibold text-foreground">Position du parti</p>
                        <p className="font-medium text-blue-700">{partyPositionLabel}</p>
                     </div>
                  ) : (
                    <div className="bg-muted/30 border rounded-lg p-3 text-center">
                      <p className="text-sm text-muted-foreground italic">Position non spécifiée</p>
                    </div>
                  )}

                  {/* Sources et notes */}
                  {partyPos?.source && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2 border-t border-dashed">
                      <FileText className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <p>
                        <span className="font-medium">Source :</span> {partyPos.source}
                      </p>
                    </div>
                  )}
                  {partyPos?.note && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <p>
                        <span className="font-medium">Note :</span> {partyPos.note}
                      </p>
                    </div>
                  )}
                  {partyPos?.quote && (
                    <blockquote className="border-l-2 border-primary pl-3 italic text-xs text-foreground/80">
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
