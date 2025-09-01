"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { lazy, Suspense } from "react"
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
  calculatePriorityCompatibility,
  partyPositions,
} from "@/lib/political-map-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useResults } from "@/hooks/useResults"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import { usePriorities } from "@/hooks/usePriorities"
import dynamic from "next/dynamic"
import Head from "next/head"
import { ConsentForm, type ConsentFormData } from "@/components/consent-form"
import { useProfile } from "@/hooks/useProfile"

const PageWithGlow = dynamic(() => import("@/components/ui/background-glow").then(m => m.PageWithGlow), { ssr: false })

// Lazy loading des modals (pas critiques pour le first paint)
const ShareModal = lazy(() => import("@/components/share-modal"))
const TopMatchModal = lazy(() => import("@/components/ui/top-match-modal").then(module => ({ default: module.TopMatchModal })))
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"


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

// Lazy loading du composant PoliticalCompassChart (lourd et pas critique)
const PoliticalCompassChart = lazy(() => import("@/components/political-compass-chart"))

export default function ResultsPage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showFloatingShare, setShowFloatingShare] = useState(false)
  const [showTopMatchModal, setShowTopMatchModal] = useState(false)

  // ✅ Utiliser correctement le hook useSession et récupérer ses valeurs
  const { isSessionValid, isLoading: sessionLoading } = useSession()
  
  // ✅ Attendre que la session soit prête avant de charger les données
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
  const { priorities: userPriorities } = usePriorities()
  const { 
    updateEmailAndConsent, 
    getConsentStatus, 
    hasValidConsent,
    isSaving: profileSaving 
  } = useProfile()

  // États pour la collecte d'email
  const [showConsentForm, setShowConsentForm] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  
  // Vérifier si l'utilisateur a déjà un email et des consentements
  const consentStatus = getConsentStatus()
  
  // Gérer la soumission du formulaire de consentement
  const handleConsentSubmit = async (data: ConsentFormData) => {
    try {
      if (data.email && data.emailConsent) {
        await updateEmailAndConsent(data.email, data.emailConsent, data.marketingConsent)
        setEmailSubmitted(true)
        
        // Optionnel : envoyer les résultats par email immédiatement
        // TODO: Intégrer avec le service d'email
        console.log('Email et consentements sauvegardés:', data)
      }
      setShowConsentForm(false)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des consentements:', error)
    }
  }
  
  // Afficher le formulaire de consentement automatiquement si pas d'email
  useEffect(() => {
    if (!isLoading && hasResults && !consentStatus.hasEmail && !emailSubmitted && !showConsentForm) {
      // Attendre un peu après l'affichage du TopMatchModal
      const timer = setTimeout(() => {
        setShowConsentForm(true)
      }, 3000) // 3 secondes après les résultats
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, hasResults, consentStatus.hasEmail, emailSubmitted, showConsentForm])

  // ✅ État consolidé de chargement - inclure le chargement de session
  const isLoading = sessionLoading || responsesLoading || resultsLoading

  // ✅ Calculer les scores en utilisant TOUJOURS la même logique que la carte politique
  const calculatedScores = useMemo(() => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      console.log('🚫 [ResultsPage] Pas de réponses utilisateur disponibles:', {
        userAnswers: !!userAnswers,
        userAnswersKeys: userAnswers ? Object.keys(userAnswers).length : 0
      })
      return []
    }

    // IMPORTANTE: Utiliser TOUJOURS la même logique que dans useResults et la carte politique
    // pour garantir la cohérence des résultats
    
    // Calculer la position politique de l'utilisateur (même logique que la carte)
    const userPosition = calculateUserPoliticalPosition(userAnswers)

    // Les priorités sont maintenant récupérées via le hook usePriorities

    const newCalculatedScores = partiesData.map((party) => {
      // Utiliser la position politique du parti (partyPositions provient de political-map-calculator)
      const partyPosition = partyPositions[party.id]
      let politicalScore = 0

      if (partyPosition) {
        // MÊME calcul que dans useResults.ts et la carte politique
        const distance = calculatePoliticalDistance(userPosition, partyPosition)
        // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
        const maxDistance = 283
        const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
        politicalScore = compatibility
      } else {
        // Si pas de position politique définie pour ce parti, score de 0
        politicalScore = 0
        console.warn(`Pas de position politique définie pour le parti: ${party.id}`)
      }

      // Calculer le score des priorités
      const priorityScore = calculatePriorityCompatibility(userPriorities, party.priorities || [])

      // Score final pondéré : 70% position politique, 30% priorités
      const finalScore = (politicalScore * 0.7) + (priorityScore * 0.3)

      // Calculer les détails pour l'accordéon (utilise la logique question par question pour l'affichage)
      const scoreDetails: CalculatedPartyScore["details"] = boussoleQuestions.map((question) => {
        let userAnswer: AgreementOptionKey | undefined
        
        // Gestion spéciale pour les questions de priorité - pas de réponse d'accord/désaccord
        if (question.responseType === "priority_ranking") {
          userAnswer = undefined // Les priorités ne sont pas stockées dans userAnswers
        } else {
          userAnswer = userAnswers[question.id] || 'N'
        }
        
        const partyPositionEntry = party.positions.find((p) => p.questionId === question.id)
        const currentImportance = userImportance[question.id] ? convertImportanceDirectToNumeric(userImportance[question.id]!) : 3
        let questionMatchValue = 0
        let weightedQuestionScore = 0

        // Calculer les scores seulement pour les questions qui ne sont pas de type priority_ranking
        if (question.responseType !== "priority_ranking" && userAnswer && userAnswer !== "IDK" && partyPositionEntry && partyPositionEntry.position !== "?") {
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
        score: Math.round(finalScore),
        rawScore: finalScore,
        maxPossibleRawScoreForParty: 100,
        details: scoreDetails,
      }
    })

    // Trier par score décroissant
    newCalculatedScores.sort((a, b) => b.score - a.score)
    return newCalculatedScores
  }, [userAnswers, userImportance, userPriorities])

  const topParties = useMemo(() => calculatedScores.slice(0, 3), [calculatedScores])

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

  // ✅ Afficher un message différent si la session n'est pas valide
  if (!sessionLoading && !isSessionValid) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Problème de session. Veuillez retourner à l&apos;accueil et recommencer.
        </p>
        <Button asChild className="w-fit">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-green mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {responsesLoading ? 'Chargement de vos réponses...' : 
             isCalculating ? 'Calcul de vos résultats...' : 
             'Chargement...'}
          </p>
        </div>
      </div>
    )
  }

  if (!isLoading && (!userAnswers || Object.keys(userAnswers).length === 0)) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Aucune réponse disponible pour calculer les résultats. Veuillez d&apos;abord répondre au questionnaire.
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
    <div className={`bg-white rounded-xl p-2 shadow-md border border-gray-300 flex items-center justify-center ${className || ""}`}>
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
          <div className="w-full h-full bg-white/30 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-xs text-muted-foreground font-medium">
              {party.shortName || party.name.substring(0, 3).toUpperCase()}
            </div>
          </div>
        )}
        {!imageError && (
          <Image
            src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
            alt={`Logo ${party.name} élections municipales Québec 2025`}
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
          <div className="w-full h-full bg-midnight-green/5 border border-midnight-green/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-midnight-green mb-1">
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

  // Balisage Quiz/Survey JSON-LD pour SEO
  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Boussole Électorale Municipale de Québec 2025",
    "description": "Questionnaire politique gratuit pour découvrir vos affinités avec les partis municipaux de Québec lors des élections 2025. 21 questions sur les enjeux locaux.",
    "about": [
      "élections municipales Québec 2025",
      "partis politiques municipaux",
      "affinités politiques locales"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Citoyens de la Ville de Québec"
    },
    "numberOfQuestions": 21,
    "educationalLevel": "Adultes",
    "provider": {
      "@type": "Organization",
      "name": "Boussole Électorale Québec",
      "url": "https://boussole-municipale.vercel.app"
    },
    "hasPart": [
      {
        "@type": "Question",
        "name": "Êtes-vous favorable au projet de tramway à Québec ?",
        "text": "Êtes-vous favorable au projet de tramway à Québec ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Non, Ne sais pas"
        }
      }
    ]
  }

  return (
    <PageWithGlow intensity="subtle">
      {/* Balisage Quiz/Survey JSON-LD pour SEO Rich Snippets */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />
      </Head>
      <div className="relative min-h-screen mobile-constrained">

      {/* Affichage d'erreur uniquement si problème critique */}
      {(responsesError || resultsError) && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Problème de connexion</p>
          <p className="text-xs opacity-80">Vos données sont sauvegardées localement</p>
        </div>
      )}


      {/* Contenu principal avec overlay mobile */}
      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-12 animate-fadeIn relative z-10 mobile-content-overlay mobile-gradient-bg lg:bg-none section-contained">
        {/* Breadcrumbs avec structured data */}
        <Breadcrumbs items={breadcrumbConfigs.results} />
        
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
              className="bg-midnight-green hover:bg-midnight-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg px-6 py-2 flex items-center gap-2"
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
              className="bg-midnight-green hover:bg-midnight-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full p-4"
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
                className="p-6 flex flex-col items-center text-center border-2 border-border shadow-md hover:shadow-lg rounded-xl card-interactive-effects animate-fadeIn bg-white/90 backdrop-blur-sm hover:border-midnight-green/30 transition-all duration-300" // Added card-color-accent for mobile
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
                    className="bg-teal-600 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${score.toFixed(0)}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold text-foreground mb-4">{score.toFixed(0)}% d&apos;affinité</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10 btn-base-effects btn-hover-lift"
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
                className="block p-4 rounded-lg hover:bg-white/50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-midnight-green/20 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <PartyLogo party={party} size={{ width: 28, height: 28 }} className="w-9 h-9 group-hover:shadow-md transition-shadow" index={index} />
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-midnight-green transition-colors flex-1">
                    {party.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-midnight-green transition-colors">
                    <span className="text-sm font-medium">Voir les détails</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-5 overflow-hidden border border-border group-hover:border-midnight-green/30 transition-colors">
                  <div
                    className="bg-teal-600 h-full flex items-center justify-center text-xs text-white font-medium transition-all duration-500 ease-out"
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
        <Suspense fallback={<div className="h-full w-full bg-muted/30 rounded-lg flex items-center justify-center">Chargement de la carte politique...</div>}>
          <PoliticalCompassChart userAnswers={userAnswers} userImportance={userImportance} />
        </Suspense>

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
                if (question.responseType === "priority_ranking") {
                  // Pour la question de priorité, utiliser les données depuis Supabase
                  if (userPriorities && Object.keys(userPriorities).length > 0) {
                    const sortedPriorities = Object.entries(userPriorities)
                      .sort(([,a], [,b]) => (a as number) - (b as number))
                      .map(([priority, rank]) => `${rank}. ${priority}`)
                    userResponseText = sortedPriorities.join(' • ')
                  } else {
                    userResponseText = "Aucune priorité sélectionnée"
                  }
                } else if (userAnswer) {
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
                      <span className="text-sm font-medium text-foreground group-hover:text-midnight-green">
                        {qIndex + 1}. {question.text}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 px-2 space-y-3">
                      <div className="p-3 bg-midnight-green/10 rounded-md border border-midnight-green/20">
                        <p className="text-sm font-semibold text-midnight-green mb-1">Votre Réponse :</p>
                        <p className="text-sm text-midnight-green/80">
                          {userResponseText}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-muted-foreground">
                          {question.responseType === "priority_ranking" ? "Priorités des partis :" : "Positions des partis :"}
                        </h4>
                        {question.responseType === "priority_ranking" ? (
                          // Affichage spécial pour la question de priorité
                          calculatedScores.map(({ party }) => {
                            const partyPriorities = party.priorities || []
                            const prioritiesText = partyPriorities.length > 0 
                              ? partyPriorities.slice(0, 3).map((p, i) => `${i + 1}. ${p}`).join(' • ')
                              : "Aucune priorité définie"
                            
                            return (
                              <div
                                key={party.id}
                                className="text-xs p-2 border rounded-md bg-white hover:bg-white/50 transition-colors"
                              >
                                <span className="font-semibold text-foreground">{party.shortName || party.name}:</span>{" "}
                                <span className="text-muted-foreground">{prioritiesText}</span>
                              </div>
                            )
                          })
                        ) : (
                          // Affichage standard pour les autres questions
                          calculatedScores.map(({ party, details }) => {
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
                                className="text-xs p-2 border rounded-md bg-white hover:bg-white/50 transition-colors"
                              >
                                <span className="font-semibold text-foreground">{party.shortName || party.name}:</span>{" "}
                                <span className="text-muted-foreground">{positionText}</span>
                                {partyPos?.source && (
                                  <em className="block text-gray-500 text-[11px] truncate">Source: {partyPos.source}</em>
                                )}
                              </div>
                            )
                          })
                        )}
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

        {/* Section de collecte d'email - affichée si l'utilisateur n'a pas d'email */}
        {showConsentForm && !isLoading && (
          <div className="mt-12">
            <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-midnight-green/5 to-midnight-green/10 border-2 border-midnight-green/20">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-midnight-green mb-2">
                  💾 Sauvegarder vos résultats
                </h3>
                <p className="text-muted-foreground">
                  Recevez vos résultats par courriel et aidez-nous à améliorer la démocratie municipale
                </p>
              </div>
              
              <ConsentForm
                onSubmit={handleConsentSubmit}
                isLoading={profileSaving}
                variant="inline"
                showTitle={false}
                initialEmailConsent={true} // Par défaut, consent pour recevoir les résultats
              />
              
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConsentForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Passer cette étape
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Message de confirmation si email déjà fourni */}
        {(consentStatus.hasEmail || emailSubmitted) && !isLoading && (
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto p-4 bg-green-50 border border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-medium">Résultats sauvegardés !</p>
                  <p className="text-sm">
                    {consentStatus.emailConsent 
                      ? "Vos résultats vous ont été envoyés par courriel"
                      : "Vos résultats sont disponibles dans votre profil"
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

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

        {/* Modal de partage - avec lazy loading */}
        <Suspense fallback={<div />}>
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
        </Suspense>

        {/* Modal pour le "Top Match" - avec lazy loading */}
        <Suspense fallback={<div />}>
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
        </Suspense>
      </div>
    </div>
    </PageWithGlow>
  )
}