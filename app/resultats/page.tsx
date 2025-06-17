"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Share2, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  partiesData,
  boussoleQuestions,
  getAgreementLabel,
  type Party,
  type Question,
  type AgreementOptionKey,
  type ImportanceDirectOptionKey,
  type PartyPosition,
} from "@/lib/boussole-data"
import {
  calculatePoliticalDistance,
  calculateUserPoliticalPosition,
  partyPositions,
} from "@/lib/political-map-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PoliticalCompassChart from "@/components/political-compass-chart"
import { useResults } from "@/hooks/useResults"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import ShareModal from "@/components/share-modal"
import { PageWithGlow } from "@/components/ui/background-glow"
import { TopMatchModal } from "@/components/ui/top-match-modal"



interface CalculatedPartyScore {
  party: Party
  score: number
  rawScore: number
  maxPossibleRawScoreForParty: number
  details: Array<{
    question: Question
    userAnswer?: AgreementOptionKey
    userImportance?: ImportanceDirectOptionKey
    partyPosition?: PartyPosition
    matchValue: number
    weightedScore: number
  }>
}

const _agreementScoreValues: Record<AgreementOptionKey, number> = {
  FA: 2,
  PA: 1,
  N: 0,
  PD: -1,
  FD: -2,
  IDK: 0,
}
const MAX_AGREEMENT_MAGNITUDE = 2

// Fonction de conversion des valeurs d'importance directe en valeurs numériques
const convertImportanceDirectToNumeric = (importance: ImportanceDirectOptionKey): number => {
  switch (importance) {
    case "TI": return 5  // Très important
    case "AI": return 4  // Assez important  
    case "NI": return 3  // Neutre
    case "PI": return 2  // Peu important
    case "PTI": return 1 // Pas du tout important
    case "IDK": return 3 // Neutre par défaut
    default: return 3
  }
}

// Types pour Facebook SDK
interface FacebookShareParams {
  method: string;
  link: string;
  quote?: string;
}

interface FacebookResponse {
  post_id?: string;
  error?: unknown;
}

declare global {
  interface Window {
    FB?: {
      ui: (params: FacebookShareParams, callback?: (response: FacebookResponse) => void) => void
    }
  }
}

export default function ResultsPage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showFloatingShare, setShowFloatingShare] = useState(false)
  const [showTopMatchModal, setShowTopMatchModal] = useState(false)

  // Intégration des hooks sécurisés
  useSession()
  const { 
    userAnswers, 
    userImportanceDirectAnswers: userImportance, 
    isLoading: responsesLoading,
    error: responsesError 
  } = useUserResponses()
  const {
    results,
    isLoading: resultsLoading,
    isCalculating,
    error: resultsError,
    calculateAndSaveResults,
    hasResults
  } = useResults()

  // État consolidé de chargement
  const isLoading = responsesLoading || resultsLoading

  // Calculer les scores en utilisant TOUJOURS la même logique que la carte politique
  const calculatedScores = useMemo(() => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      return []
    }

    // IMPORTANTE: Utiliser TOUJOURS la même logique que dans useResults et la carte politique
    // pour garantir la cohérence des résultats
    
    // Calculer la position politique de l'utilisateur (même logique que la carte)
    const userPosition = calculateUserPoliticalPosition(userAnswers)

    const newCalculatedScores = partiesData.map((party) => {
      // Utiliser la position politique du parti (partyPositions provient de political-map-calculator)
      const partyPosition = partyPositions[party.id]
      let score = 0

      if (partyPosition) {
        // MÊME calcul que dans useResults.ts et la carte politique
        const distance = calculatePoliticalDistance(userPosition, partyPosition)
        // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
        const maxDistance = 283
        const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
        score = compatibility
      } else {
        // Si pas de position politique définie pour ce parti, score de 0
        score = 0
        console.warn(`Pas de position politique définie pour le parti: ${party.id}`)
      }

      // Calculer les détails pour l'accordéon (utilise la logique question par question pour l'affichage)
      const scoreDetails: CalculatedPartyScore["details"] = boussoleQuestions.map((question) => {
        const userAnswer = userAnswers[question.id]
        const partyPositionEntry = party.positions.find((p) => p.questionId === question.id)
        const currentImportance = userImportance[question.id] ? convertImportanceDirectToNumeric(userImportance[question.id]!) : 3
        let questionMatchValue = 0
        let weightedQuestionScore = 0

        if (userAnswer && userAnswer !== "IDK" && partyPositionEntry && partyPositionEntry.position !== "?") {
          const userScore = _agreementScoreValues[userAnswer]
          const partyScore = _agreementScoreValues[partyPositionEntry.position]
          const diff = Math.abs(userScore - partyScore)
          questionMatchValue = MAX_AGREEMENT_MAGNITUDE - diff / 2
          weightedQuestionScore = questionMatchValue * currentImportance
        }
        
        return {
          question,
          userAnswer,
          userImportance: userImportance[question.id],
          partyPosition: partyPositionEntry,
          matchValue: questionMatchValue,
          weightedScore: weightedQuestionScore,
        }
      })

      return {
        party,
        score: Math.round(score),
        rawScore: score,
        maxPossibleRawScoreForParty: 100,
        details: scoreDetails,
      }
    })

    // Trier par score décroissant
    newCalculatedScores.sort((a, b) => b.score - a.score)
    return newCalculatedScores
  }, [userAnswers, userImportance])

  // Calculer et sauvegarder les résultats si pas encore fait
  useEffect(() => {
    if (!isLoading && !hasResults && Object.keys(userAnswers).length > 0) {
      calculateAndSaveResults()
    }
  }, [isLoading, hasResults, userAnswers, calculateAndSaveResults])

  // Afficher le modal de révélation automatiquement (une seule fois par session)
  useEffect(() => {
    if (!isLoading && calculatedScores.length > 0 && !showTopMatchModal) {
      // Vérifier si le modal a déjà été affiché dans cette session
      const hasSeenModal = sessionStorage.getItem('hasSeenTopMatchModal')
      
      if (!hasSeenModal) {
        // Délai pour laisser la page se charger complètement
        const timer = setTimeout(() => {
          setShowTopMatchModal(true)
          sessionStorage.setItem('hasSeenTopMatchModal', 'true')
        }, 1000)
        
        return () => clearTimeout(timer)
      }
    }
  }, [isLoading, calculatedScores.length, showTopMatchModal])

  // Observer pour détecter si le bouton header est visible
  useEffect(() => {
    const headerButton = document.getElementById('header-share-button')
    if (!headerButton) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si le bouton header n'est pas visible, montrer le bouton flottant
        setShowFloatingShare(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    )

    observer.observe(headerButton)

    return () => {
      observer.unobserve(headerButton)
    }
  }, [isLoading]) // Re-observer après le chargement

  const topParties = useMemo(() => calculatedScores.slice(0, 3), [calculatedScores])




  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {responsesLoading ? 'Chargement de vos réponses...' : 
             isCalculating ? 'Calcul de vos résultats...' : 
             'Chargement...'}
          </p>
        </div>
      </div>
    )
  }

  if (!isLoading && Object.keys(userAnswers).length === 0) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Nous n&apos;avons pas pu trouver vos réponses. Avez-vous complété le questionnaire ?
        </p>
        <Button asChild>
          <Link href="/questionnaire">Répondre au questionnaire</Link>
        </Button>
      </div>
    )
  }

  if (!isLoading && calculatedScores.length === 0) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Nous n&apos;avons pas pu calculer vos résultats. Veuillez réessayer.
        </p>
        <Button onClick={() => calculateAndSaveResults()} disabled={isCalculating}>
          {isCalculating ? 'Calcul en cours...' : 'Recalculer'}
        </Button>
      </div>
    )
  }

  // Composant LogoContainer avec gestion d'erreur améliorée
  const LogoContainer: React.FC<{ children: React.ReactNode; className?: string; party?: Party }> = ({ children, className }) => (
    <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
      {children}
    </div>
  )

  // Composant PartyLogo avec gestion d'erreur robuste et préchargement
  const PartyLogo: React.FC<{ party: Party; size: { width: number; height: number }; className?: string; index?: number }> = ({ party, size, className = "", index = 0 }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    // Préchargement des logos pour éviter les problèmes de chargement
    useEffect(() => {
      const img = new window.Image()
      img.onload = () => setImageLoading(false)
      img.onerror = () => {
        console.warn(`⚠️ Préchargement échoué pour ${party.name}: ${party.logoUrl}`)
        setImageError(true)
        setImageLoading(false)
      }
      img.src = party.logoUrl
    }, [party.logoUrl, party.name])

    return (
      <LogoContainer className={className} party={party}>
        {imageLoading && !imageError && (
          <div className="w-full h-full bg-muted/30 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-xs text-muted-foreground font-medium">
              {party.shortName || party.name.substring(0, 3).toUpperCase()}
            </div>
          </div>
        )}
        {!imageError && (
          <Image
            src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
            alt={`Logo ${party.name}`}
            width={size.width}
            height={size.height}
            style={{ 
              objectFit: "contain",
              display: imageLoading ? 'none' : 'block'
            }}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              console.warn(`⚠️ Erreur de chargement du logo pour ${party.name}: ${party.logoUrl}`)
              setImageError(true)
              setImageLoading(false)
            }}
            priority={index < 3} // Priorité pour les 3 premières cartes
            unoptimized={true}
            loading={index < 3 ? "eager" : "lazy"} // Chargement immédiat pour les 3 premières
          />
        )}
        {imageError && (
          <div className="w-full h-full bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-primary mb-1">
                {party.shortName || party.name.substring(0, 3).toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                {party.name.length > 15 ? party.name.substring(0, 15) + '...' : party.name}
              </div>
            </div>
          </div>
        )}
      </LogoContainer>
    )
  }

      return (
      <PageWithGlow intensity="subtle">
      <div className="relative min-h-screen mobile-constrained">

      {/* Affichage d'erreur uniquement si problème critique */}
      {(responsesError || resultsError) && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Problème de connexion</p>
          <p className="text-xs opacity-80">Vos données sont sauvegardées localement</p>
        </div>
      )}

      {/* Images décoratives positionnées selon la hauteur (desktop) */}
      <div className="hidden lg:block">
        {/* Chat qui dort - premier tiers de la page */}
        <div className="absolute left-0 top-[25%] -translate-y-1/2 z-0 pointer-events-none w-64 h-auto decorative-frame-left">
          <Image 
            src="/Image_parc_chat_dort.png" 
            alt="" 
            fill
            className="object-cover decorative-image-left"
          />
        </div>
        
        {/* Famille - troisième tiers de la page */}
        <div className="absolute right-0 top-[75%] -translate-y-1/2 z-0 pointer-events-none w-72 h-auto decorative-frame-right">
          <Image 
            src="/Image_famille.png" 
            alt="" 
            fill
            className="object-cover decorative-image-right"
          />
        </div>
      </div>

      {/* Contenu principal avec overlay mobile */}
      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-12 animate-fadeIn relative z-10 mobile-content-overlay mobile-gradient-bg lg:bg-none section-contained">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="flex-1 mobile-section-border lg:border-l-0 lg:pl-0">
            <h1 className="text-foreground mb-3">Vos Résultats</h1> {/* font-bold is now in globals.css for h1 */}
            <p className="text-muted-foreground">
              Voici comment vos opinions s&apos;alignent avec celles des partis, basé sur vos réponses au questionnaire.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3" id="header-share-button">
            <span className="text-lg font-semibold text-foreground">Partagez vos résultats !</span>
            <Button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg px-6 py-2 flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>

        {/* Floating Share Button - Apparaît seulement quand le header n'est pas visible */}
        {showFloatingShare && (
          <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
            <Button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full p-4"
              size="lg"
              aria-label="Partager vos résultats"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        )}

                 <Card className="shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm border border-border/50">
           <CardHeader>
             <CardTitle className="text-2xl">Vos meilleurs alignements (Partis)</CardTitle>
           </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            {topParties.map(({ party, score }, index) => (
              <Card
                key={party.id}
                className="p-6 flex flex-col items-center text-center border-2 border-border shadow-md hover:shadow-lg rounded-xl card-interactive-effects animate-fadeIn bg-white/90 backdrop-blur-sm hover:border-primary/30 transition-all duration-300" // Added card-color-accent for mobile
                style={{ animationDelay: `${index * 0.15}s` }} // Staggered delay
              >
                                 <PartyLogo party={party} size={{ width: 60, height: 60 }} className="w-20 h-20 mb-4" index={index} />
                {/* Container avec hauteur fixe pour assurer l'alignement des cartes */}
                <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">{party.shortName || party.name}</h3>
                  <p className="text-sm text-muted-foreground leading-tight">{party.name}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                  <div
                    className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${score.toFixed(0)}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold text-foreground mb-4">{score.toFixed(0)}% d&apos;affinité</p>
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

                 <Card className="shadow-soft rounded-2xl subtle-glow">
           <CardHeader>
             <CardTitle className="text-2xl">Votre position par rapport aux plateformes</CardTitle>
            <CardDescription>Comparaison de votre affinité globale avec chaque parti. Cliquez pour voir les détails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculatedScores.map(({ party, score }, index) => (
              <Link
                href={`/parti/${party.id}`}
                key={party.id}
                className="block p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                                     <PartyLogo party={party} size={{ width: 28, height: 28 }} className="w-9 h-9 group-hover:shadow-md transition-shadow" index={index} />
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                    {party.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Voir les détails</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-5 overflow-hidden border border-border group-hover:border-primary/30 transition-colors">
                  <div
                    className="bg-primary h-full flex items-center justify-center text-xs text-primary-foreground font-medium transition-all duration-500 ease-out"
                    style={{ width: `${score.toFixed(0)}%` }}
                  >
                    {score >= 15 ? `${score.toFixed(0)}%` : ""}
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Carte de positionnement politique 2D */}
        <PoliticalCompassChart userAnswers={userAnswers} userImportance={userImportance} />

                 <Card className="shadow-soft rounded-2xl subtle-glow">
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
                
                // Obtenir la réponse directe d'importance si applicable
                let userResponseText = "Non répondue"
                if (userAnswer) {
                  if (question.responseType === "importance_direct") {
                    // Pour les questions d'importance directe, utiliser les réponses du hook
                    const directAnswer = userImportance[question.id]
                    if (directAnswer) {
                      const importanceDirectLabels: Record<string, string> = {
                        "TI": "Très important",
                        "AI": "Assez important", 
                        "NI": "Neutre",
                        "PI": "Peu important",
                        "PTI": "Pas du tout important",
                        "IDK": "Ne sais pas"
                      }
                      userResponseText = importanceDirectLabels[directAnswer] || directAnswer
                    }
                  } else {
                    // Pour les questions d'accord/désaccord standard
                    userResponseText = getAgreementLabel(question, userAnswer)
                  }
                }
                
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
                          {userResponseText}
                        </p>
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

        <div className="mt-8">
          <Card className="bg-muted/30 border-muted-foreground/20 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Info className="h-5 w-5" />
                Méthodologie (Simplifiée)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-1">📍 Positionnement politique</h4>
                <p>
                  Chacune des 20 questions influence votre score sur deux axes indépendants (économique et social). Votre position finale est la somme de ces influences, pondérée par l&apos;importance que vous accordez à chaque question.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">📊 Calcul des affinités</h4>
                <p>
                  L&apos;affinité est calculée à partir de la distance qui vous sépare de chaque parti sur la carte politique. Plus un parti est proche de vous, plus l&apos;affinité est élevée. La formule a été ajustée pour que les partis éloignés soient plus sévèrement pénalisés, rendant le score plus intuitif.
                </p>
              </div>
              <div>
                <p className="text-xs italic pt-2 border-t border-muted-foreground/10">
                  <strong>Note méthodologique :</strong> Les positions des partis sont basées sur l&apos;analyse de leurs programmes et déclarations publiques. Cette méthode scientifique garantit une représentation équitable du paysage politique municipal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex justify-center">
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

        {/* Modal de partage */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          results={results}
          politicalPosition={results?.politicalPosition}
          userAnswers={userAnswers}
          userImportance={userImportance}
          calculatedScores={calculatedScores}
          topParties={topParties}
        />

        {/* Modal pour le "Top Match" */}
        <TopMatchModal
          isOpen={showTopMatchModal}
          onClose={() => setShowTopMatchModal(false)}
          topMatch={topParties.length > 0 ? {
            partyId: topParties[0].party.id,
            score: topParties[0].score,
            percentage: topParties[0].score,
            rank: 1
          } : null}
          onViewPartyProfile={() => setShowTopMatchModal(false)}
          results={results}
          userAnswers={userAnswers}
          userImportance={userImportance}
          calculatedScores={calculatedScores}
          topParties={topParties}
        />
      </div>
    </div>
    </PageWithGlow>
  )
}
