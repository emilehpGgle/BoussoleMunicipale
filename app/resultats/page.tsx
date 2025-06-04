"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Share2, Info, Mail, Twitter, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  partiesData,
  boussoleQuestions,
  agreementLabels,
  importanceLabels,
  getAgreementLabel,
  type Party,
  type Question,
  type AgreementOptionKey,
  type ImportanceOptionKey,
  type PartyPosition,
} from "@/lib/boussole-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PoliticalCompassChart from "@/components/political-compass-chart"

interface UserAnswers {
  [questionId: string]: AgreementOptionKey | undefined
}

interface UserImportance {
  [questionId: string]: ImportanceOptionKey | undefined
}

interface CalculatedPartyScore {
  party: Party
  score: number
  rawScore: number
  maxPossibleRawScoreForParty: number
  details: Array<{
    question: Question
    userAnswer?: AgreementOptionKey
    userImportance?: ImportanceOptionKey
    partyPosition?: PartyPosition
    matchValue: number
    weightedScore: number
  }>
}

const agreementScoreValues: Record<AgreementOptionKey, number> = {
  FA: 2,
  PA: 1,
  N: 0,
  PD: -1,
  FD: -2,
  IDK: 0,
}
const MAX_AGREEMENT_MAGNITUDE = 2

export default function ResultsPage() {
  const [calculatedScores, setCalculatedScores] = useState<CalculatedPartyScore[]>([])
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [userImportance, setUserImportance] = useState<UserImportance>({})

  useEffect(() => {
    const userAnswersJSON = localStorage.getItem("userAnswers")
    const userImportanceJSON = localStorage.getItem("userImportance")

    if (!userAnswersJSON || !userImportanceJSON) {
      console.warn("User answers or importance not found in localStorage.")
      setIsLoading(false)
      return
    }

    try {
      const parsedUserAnswers: UserAnswers = JSON.parse(userAnswersJSON)
      const parsedUserImportance: UserImportance = JSON.parse(userImportanceJSON)
      
      // Sauvegarder les données pour la carte politique
      setUserAnswers(parsedUserAnswers)
      setUserImportance(parsedUserImportance)

      const newCalculatedScores = partiesData.map((party) => {
        let totalWeightedScore = 0
        let maxPossibleWeightedScore = 0
        const scoreDetails: CalculatedPartyScore["details"] = []

        boussoleQuestions.forEach((question) => {
          const userAnswer = parsedUserAnswers[question.id]
          const partyPositionEntry = party.positions.find((p) => p.questionId === question.id)
          const currentImportance = parsedUserImportance[question.id] || 3
          let questionMatchValue = 0
          let weightedQuestionScore = 0

          if (userAnswer && userAnswer !== "IDK" && partyPositionEntry && partyPositionEntry.position !== "?") {
            const userScore = agreementScoreValues[userAnswer]
            const partyScore = agreementScoreValues[partyPositionEntry.position]
            const diff = Math.abs(userScore - partyScore)
            questionMatchValue = MAX_AGREEMENT_MAGNITUDE - diff / 2
            weightedQuestionScore = questionMatchValue * currentImportance
          }
          totalWeightedScore += weightedQuestionScore
          maxPossibleWeightedScore += MAX_AGREEMENT_MAGNITUDE * currentImportance
          scoreDetails.push({
            question,
            userAnswer,
            userImportance: currentImportance,
            partyPosition: partyPositionEntry,
            matchValue: questionMatchValue,
            weightedScore: weightedQuestionScore,
          })
        })
        const normalizedScore = maxPossibleWeightedScore > 0 ? (totalWeightedScore / maxPossibleWeightedScore) * 100 : 0
        return {
          party,
          score: Math.max(0, Math.min(100, normalizedScore)),
          rawScore: totalWeightedScore,
          maxPossibleRawScoreForParty: maxPossibleWeightedScore,
          details: scoreDetails,
        }
      })

      newCalculatedScores.sort((a, b) => b.score - a.score)
      setCalculatedScores(newCalculatedScores)
    } catch (error) {
      console.error("Error processing results:", error)
    }
    setIsLoading(false)
  }, [])

  const topParties = useMemo(() => calculatedScores.slice(0, 3), [calculatedScores])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email, "Consent:", consent)
    alert("Vos résultats seraient envoyés à " + email)
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p>Calcul de vos résultats...</p>
      </div>
    )
  }
  if (!isLoading && calculatedScores.length === 0) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Nous n'avons pas pu calculer vos résultats. Avez-vous complété le questionnaire ?
        </p>
        <Button asChild>
          <Link href="/questionnaire">Répondre au questionnaire</Link>
        </Button>
      </div>
    )
  }

  const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
      {children}
    </div>
  )

  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-foreground mb-3">Vos Résultats</h1> {/* font-bold is now in globals.css for h1 */}
          <p className="text-muted-foreground">
            Voici comment vos opinions s'alignent avec celles des partis, basé sur vos réponses au questionnaire.
          </p>
        </div>
        <div className="sm:ml-auto sm:text-right">
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center sm:text-right">
            Partagez vos résultats
          </h3>
          <div className="flex justify-center sm:justify-end gap-2">
            {[Twitter, Facebook, Instagram, Linkedin, Share2].map((Icon, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="icon"
                className="rounded-full btn-base-effects hover:bg-muted/80"
                aria-label={`Partager ${Icon === Share2 ? "" : "sur " + Icon.displayName?.replace("Icon", "")}`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    Icon === Twitter
                      ? "text-sky-500"
                      : Icon === Facebook
                        ? "text-blue-600"
                        : Icon === Instagram
                          ? "text-pink-500"
                          : Icon === Linkedin
                            ? "text-sky-700"
                            : "text-foreground"
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Vos meilleurs alignements (Partis)</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {topParties.map(({ party, score }, index) => (
            <Card
              key={party.id}
              className="p-6 flex flex-col items-center text-center border-border shadow-sm rounded-xl card-interactive-effects animate-fadeIn" // Added card-interactive-effects & animate-fadeIn
              style={{ animationDelay: `${index * 0.15}s` }} // Staggered delay
            >
              <LogoContainer className="w-20 h-20 mb-4">
                <Image
                  src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
                  alt={`Logo ${party.name}`}
                  width={60} // Adjusted to fit within padding
                  height={60} // Adjusted to fit within padding
                  style={{ objectFit: "contain" }}
                />
              </LogoContainer>
              <h3 className="text-lg font-semibold text-foreground">{party.shortName || party.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{party.name}</p>
              <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${score.toFixed(0)}%` }}
                ></div>
              </div>
              <p className="text-lg font-bold text-primary mb-4">{score.toFixed(0)}% d'affinité</p>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-lg border-primary text-primary hover:bg-primary/10 btn-base-effects btn-hover-lift"
              >
                <Link href={`/parti/${party.id}`}>Voir la fiche du parti</Link>
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Votre position par rapport aux plateformes</CardTitle>
          <CardDescription>Comparaison de votre affinité globale avec chaque parti.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {calculatedScores.map(({ party, score }) => (
            <Link
              href={`/parti/${party.id}`}
              key={party.id}
              className="block p-4 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <LogoContainer className="w-9 h-9 group-hover:shadow-md transition-shadow">
                  <Image
                    src={party.logoUrl || "/placeholder.svg?width=32&height=32&query=Logo+non+disponible"}
                    alt={`${party.name} logo`}
                    width={28}
                    height={28}
                    style={{ objectFit: "contain" }}
                  />
                </LogoContainer>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {party.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-full bg-muted rounded-full h-5 flex overflow-hidden border border-border">
                  <div
                    className="bg-primary h-full flex items-center justify-center text-xs text-primary-foreground font-medium transition-all duration-500 ease-out"
                    style={{ width: `${score.toFixed(0)}%` }}
                  >
                    {score.toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5 px-1">
                <span>Affinité: {score.toFixed(0)}%</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-xs font-medium">
                  Voir la fiche <ArrowRight className="inline h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Carte de positionnement politique 2D */}
      <PoliticalCompassChart userAnswers={userAnswers} userImportance={userImportance} />

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Votre alignement détaillé par enjeu</CardTitle>
          <CardDescription>
            Explorez comment vos réponses se comparent à celles des partis pour chaque question.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {boussoleQuestions.map((question, qIndex) => {
              const userAnswer = calculatedScores[0]?.details.find((d) => d.question.id === question.id)?.userAnswer
              const userImportance = calculatedScores[0]?.details.find(
                (d) => d.question.id === question.id,
              )?.userImportance
              return (
                <AccordionItem value={`item-${qIndex}`} key={question.id}>
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {qIndex + 1}. {question.text}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-2 space-y-3">
                    <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                      <p className="text-sm font-semibold text-primary mb-1">Votre Réponse :</p>
                      <p className="text-sm text-primary-dark">
                        {userAnswer ? agreementLabels[userAnswer] : "Non répondue"}
                      </p>
                      {userAnswer !== "IDK" && userImportance && (
                        <p className="text-xs text-primary-dark/80 mt-1">
                          Importance accordée : {importanceLabels[userImportance]} ({userImportance}/5)
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-muted-foreground">Positions des partis :</h5>
                      {calculatedScores.map(({ party, details }) => {
                        const detail = details.find((d) => d.question.id === question.id)
                        const partyPos = detail?.partyPosition
                        const positionText =
                          partyPos?.position && partyPos.position !== "?"
                            ? getAgreementLabel(question, partyPos.position)
                            : partyPos?.position === "?"
                              ? "Position incertaine"
                              : "Non spécifiée"
                        return (
                          <div
                            key={party.id}
                            className="text-xs p-2 border rounded-md bg-card hover:bg-muted/30 transition-colors"
                          >
                            <span className="font-semibold text-foreground">{party.shortName || party.name}:</span>{" "}
                            <span className="text-muted-foreground">{positionText}</span>
                            {partyPos?.source && (
                              <em className="block text-gray-500 text-[11px] truncate">Source: {partyPos.source}</em>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Sauvegardez vos résultats</CardTitle>
          <CardDescription>Conservez une trace de vos résultats en vous les envoyant par courriel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email-results" className="text-foreground">
                Votre adresse courriel
              </Label>
              <Input
                type="email"
                id="email-results"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="consent-results" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
              <Label htmlFor="consent-results" className="text-sm text-muted-foreground">
                J'aimerais être invité(e) à participer aux futures initiatives de la Boussole électorale.
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg btn-base-effects btn-hover-lift btn-primary-hover-effects"
            >
              <Mail className="mr-2 h-4 w-4" /> M'envoyer mes résultats par courriel
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" /> Méthodologie (Simplifiée)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <div>
            <h4 className="font-medium text-foreground mb-2">🧭 Positionnement politique</h4>
            <p>
              Votre position politique est calculée sur deux axes indépendants basés sur vos réponses aux 20 questions :
            </p>
            <ul className="mt-2 space-y-1 text-xs">
              <li><strong>Axe économique</strong> : De l'interventionnisme municipal (gauche) au libre marché (droite)</li>
              <li><strong>Axe social/environnemental</strong> : Des positions conservatrices (bas) aux progressistes (haut)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">📊 Calcul des affinités</h4>
            <p>
              La distance entre votre position et celle de chaque parti détermine l'affinité. Plus vous êtes proches sur la carte politique, plus l'affinité est élevée. Les questions marquées comme importantes ont plus d'influence sur votre positionnement final.
            </p>
          </div>
          
          <div className="text-xs border-l-2 border-muted pl-3">
            <strong>Note méthodologique :</strong> Les positions des partis sont basées sur l'analyse de leurs programmes et déclarations publiques. Cette méthode scientifique garantit une représentation équitable du paysage politique municipal.
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 rounded-lg px-6 py-3 btn-base-effects btn-hover-lift"
        >
          <Link href="/questionnaire">
            <ArrowLeft className="h-4 w-4" /> Refaire le questionnaire
          </Link>
        </Button>
      </div>
    </div>
  )
}
