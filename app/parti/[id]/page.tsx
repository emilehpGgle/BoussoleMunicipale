"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, FileText, Info } from "lucide-react"
import { partiesData, boussoleQuestions, getAgreementLabel } from "@/lib/boussole-data"
import type { Party, Question as BoussoleQuestion, PartyPosition } from "@/lib/boussole-data"

const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
)

export default function PartyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [party, setParty] = useState<Party | null>(null)
  const [partyQuestionsMap, setPartyQuestionsMap] = useState<Map<string, PartyPosition>>(new Map())

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
            Voici les positions du parti {party.name} sur les questions de la boussole électorale.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {boussoleQuestions.map((question: BoussoleQuestion, index: number) => {
            const partyPos = partyQuestionsMap.get(question.id)
            const positionLabel =
              partyPos?.position && partyPos.position !== "?"
                ? getAgreementLabel(question, partyPos.position)
                : partyPos?.position === "?"
                  ? "Position incertaine"
                  : "Non spécifiée"

            return (
              <Card key={question.id} className="bg-card/50 rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Question {index + 1}</p>
                  <CardTitle className="text-lg font-medium text-foreground">{question.text}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold text-primary">Position du parti :</span> {positionLabel}
                  </p>
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
