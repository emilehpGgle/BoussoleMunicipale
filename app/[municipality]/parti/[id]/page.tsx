"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, FileText, Info, CheckCircle, XCircle, MinusCircle, User, Calendar } from "lucide-react"
import { boussoleQuestions, getAgreementLabel } from "@/lib/boussole-data"
import type { Question as BoussoleQuestion, PartyPosition } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import { usePriorities } from "@/hooks/usePriorities"
import { useParty } from "@/hooks/useParties"
import { getPartyLogo, getLeaderPhoto } from "@/lib/party-assets"
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
    return <CheckCircle className="h-6 w-6 text-green-700" />
  } else if (difference === 1) {
    return <MinusCircle className="h-6 w-6 text-yellow-600" />
  } else {
    return <XCircle className="h-6 w-6 text-red-700" />
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
  const searchParams = useSearchParams()
  const municipality = params.municipality as string
  const partyId = Array.isArray(params.id) ? params.id[0] : params.id as string

  // Utiliser le hook useParty pour charger les données depuis l'API
  const { party, loading, error, notFound } = useParty(municipality, partyId)
  const [partyQuestionsMap, setPartyQuestionsMap] = useState<Map<string, PartyPosition>>(new Map())

  // Récupération des réponses de l'utilisateur
  const { responses: userResponses } = useUserResponses(municipality)
  const { priorities: userPriorities } = usePriorities(municipality)

  // Détecter la source (page de partage ou page de résultats)
  const source = searchParams.get('source')
  const shareId = searchParams.get('shareId')
  const isFromSharePage = source === 'partage' && shareId

  // Créer la map des positions quand le parti est chargé
  useEffect(() => {
    if (party && party.positions) {
      const qMap = new Map<string, PartyPosition>()
      party.positions.forEach((pos) => qMap.set(pos.questionId, pos))
      setPartyQuestionsMap(qMap)
    }
  }, [party])

  // État de chargement
  if (loading) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p>Chargement des informations du parti...</p>
        <Button asChild className="mt-4">
          <Link href={isFromSharePage ? `/partage/${shareId}` : `/${municipality}/resultats`}>
            Retour {isFromSharePage ? 'au partage' : 'aux résultats'}
          </Link>
        </Button>
      </div>
    )
  }

  // État d'erreur
  if (error || notFound) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Parti non trouvé</h1>
        <p className="text-muted-foreground mb-4">
          {error || `Le parti "${partyId}" n'a pas été trouvé dans ${municipality}.`}
        </p>
        <Button asChild className="mt-4">
          <Link href={isFromSharePage ? `/partage/${shareId}` : `/${municipality}/resultats`}>
            Retour {isFromSharePage ? 'au partage' : 'aux résultats'}
          </Link>
        </Button>
      </div>
    )
  }

  // Aucun parti trouvé
  if (!party) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p>Aucune information disponible pour ce parti.</p>
        <Button asChild className="mt-4">
          <Link href={isFromSharePage ? `/partage/${shareId}` : `/${municipality}/resultats`}>
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
          <Link href={isFromSharePage ? `/partage/${shareId}` : `/${municipality}/resultats`}>
            <ArrowLeft className="h-4 w-4" />
            Retour {isFromSharePage ? 'au partage' : 'aux résultats'}
          </Link>
        </Button>
      </div>

      <Card className="shadow-soft rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo et Photo côte à côte */}
            <div className="flex gap-4 flex-shrink-0">
              <LogoContainer className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative">
                <Image
                  src={party.logoUrl || getPartyLogo(party.id)}
                  alt={`Logo ${party.name} - ${party.leader} - Élections municipales 2025`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </LogoContainer>
              {getLeaderPhoto(party.leader) && (
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative bg-white rounded-xl shadow-sm overflow-hidden">
                  <Image
                    src={getLeaderPhoto(party.leader)!}
                    alt={`Photo de ${party.leader} - Chef de ${party.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
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
                      href={`/${municipality}/leaders/${generateSlug(party.leader)}`}
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
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 bg-muted/20 p-3 rounded-lg">
              <span className="font-medium text-foreground">Légende :</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-700" />
                <span>Identique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MinusCircle className="h-4 w-4 text-yellow-600" />
                <span>Similaire</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-red-700" />
                <span>Différente</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {boussoleQuestions.map((question: BoussoleQuestion, index: number) => {
            // Afficher séparateur de catégorie si nouvelle catégorie
            const isFirstQuestionOfCategory =
              index === 0 ||
              (index > 0 && boussoleQuestions[index - 1].category !== question.category)

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
                <div key={question.id}>
                  {isFirstQuestionOfCategory && (
                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-3">
                        {question.category}
                      </h3>
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                    </div>
                  )}
                  <Card className="bg-white border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
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
                </div>
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
              <div key={question.id}>
                {isFirstQuestionOfCategory && (
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-3">
                      {question.category}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                  </div>
                )}
                <Card className="bg-white border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
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
                              <span className="text-xs text-muted-foreground">{getComparisonText(userPos, partyPos.position)}</span>
                              {getComparisonIcon(userPos, partyPos.position)}
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
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Appel à l'action avec contexte élections 2025 - Déplacé en fin de page */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Élections Municipales 2025</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Découvrez vos affinités politiques
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vous avez consulté les positions de {party.name}. Faites le questionnaire complet pour comparer vos réponses avec celles de tous les partis et leaders municipaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href={`/${municipality}/test-politique-municipal`}>
                Faire le questionnaire politique
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${municipality}/leaders`}>
                Voir tous les leaders
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
