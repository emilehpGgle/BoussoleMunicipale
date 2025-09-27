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
  getAgreementLabel,
  type Party,
  type Question,
  type AgreementOptionKey,
  type ImportanceDirectOptionKey,
  type PartyPosition,
} from "@/lib/boussole-data"
import { useQuestions } from "@/hooks/useQuestions"
import { useParties } from "@/hooks/useParties"
import { usePartyPositions } from "@/hooks/usePartyPositions"
import {
  calculatePoliticalDistance,
  calculatePriorityCompatibility,
} from "@/lib/political-map-calculator"
import {
  calculateUserPoliticalPosition,
} from "@/lib/political-calculator-db"
import { extractPartyPrioritiesSimple } from "@/lib/extract-priorities"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useResults } from "@/hooks/useResults"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import { usePriorities } from "@/hooks/usePriorities"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import Head from "next/head"
import { motion } from 'framer-motion'
import { ScrollReveal, AnimatedCard, AnimatedCounter } from "@/components/ui/animation-utils"
import { transformAllPartyPositionsToUserAnswers } from "@/lib/supabase-transform"

const PageWithGlow = dynamic(() => import("@/components/ui/background-glow").then(m => m.PageWithGlow), { ssr: false })

// Lazy loading des modals (pas critiques pour le first paint)
const ShareModal = lazy(() => import("@/components/share-modal"))
const ProgressiveResultsModal = lazy(() => import("@/components/ui/progressive-results-modal").then(module => ({ default: module.ProgressiveResultsModal })))
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
  // Extract municipality from params
  const params = useParams()
  const municipality = params.municipality as string
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showFloatingShare, setShowFloatingShare] = useState(false)
  const [showProgressiveResultsModal, setShowProgressiveResultsModal] = useState(false)

  // ✅ Utiliser correctement le hook useSession et récupérer ses valeurs
  const { isSessionValid, isLoading: sessionLoading } = useSession()

  // ✅ Charger les questions et partis depuis Supabase
  const { questions, isLoading: questionsLoading, error: questionsError } = useQuestions(municipality)
  const { parties: partiesData, loading: partiesLoading, error: partiesError } = useParties(municipality, true) // includePositions=true pour avoir les positions
  const { positionsByParty, isLoading: positionsLoading, error: positionsError } = usePartyPositions(municipality)

  // ✅ Attendre que la session soit prête avant de charger les données
  const {
    userAnswers,
    userImportanceDirectAnswers: userImportance,
    isLoading: responsesLoading,
    error: responsesError
  } = useUserResponses(municipality)

  // Debug temporairement désactivé pour nettoyer la console
  // console.log('🔍 [HOOK DEBUG] useUserResponses result:', { userAnswersKeys: userAnswers ? Object.keys(userAnswers).length : 0, responsesLoading })

  const {
    results,
    isLoading: resultsLoading,
    isCalculating,
    error: resultsError,
    calculateAndSaveResults,
    hasResults
  } = useResults(municipality)
  const { priorities: userPriorities } = usePriorities(municipality)

  // Debug temporairement désactivé pour nettoyer la console
  // console.log('🔍 [HOOK DEBUG] Other hooks:', { resultsLoading, hasResults })


  // ✅ État pour la gestion async des scores calculés
  const [calculatedScores, setCalculatedScores] = useState<CalculatedPartyScore[]>([])
  const [scoresLoading, setScoresLoading] = useState(false)
  const [scoresError, setScoresError] = useState<string | null>(null)

  // ✅ État consolidé de chargement - inclure le chargement des scores
  const isLoading = sessionLoading || responsesLoading || resultsLoading || questionsLoading || partiesLoading || positionsLoading || scoresLoading
  const globalError = responsesError || resultsError || questionsError || partiesError || positionsError || scoresError

  // ✅ Calculer les scores de façon asynchrone avec useEffect
  useEffect(() => {
    const calculateScoresAsync = async () => {
      try {
        setScoresLoading(true)
        setScoresError(null)

        // DEBUG désactivé pour nettoyer la console
        // console.log('🔍 [DEBUG] === DÉBUT CALCUL ===')
        // console.log('🔍 [DEBUG] Données:', { userAnswersKeys: Object.keys(userAnswers).length, partiesCount: partiesData?.length })

    // Vérifier que nous avons toutes les données nécessaires (inclure positionsByParty !)
    if (!userAnswers || Object.keys(userAnswers).length === 0 ||
        !partiesData || partiesData.length === 0 ||
        !questions || questions.length === 0 ||
        !positionsByParty || Object.keys(positionsByParty).length === 0) {
      // console.log('🚫 [DEBUG] Données manquantes:', { userAnswers: !!userAnswers, partiesData: partiesData?.length })
      setCalculatedScores([])
        setScoresLoading(false)
        return
    }

    // console.log('✅ [DEBUG] Calcul démarré')

    // IMPORTANTE: Utiliser TOUJOURS la même logique que dans useResults et la carte politique
    // pour garantir la cohérence des résultats

    // Calculer la position politique de l'utilisateur (même logique que la carte)
    console.log('🔍 [RESULTATS-DEBUG] userAnswers passé à calculateUserPoliticalPosition:', {
      count: Object.keys(userAnswers).length,
      sample: Object.entries(userAnswers).slice(0, 5).map(([k, v]) => `${k}: ${v}`)
    })
    const userPosition = await calculateUserPoliticalPosition(userAnswers, municipality)
    // console.log('🔍 [DEBUG] Position utilisateur calculée:', userPosition)

    // ✅ Transformer les positions depuis Supabase (même logique que l'API /api/results/calculate)
    const partyAnswers = positionsByParty ? transformAllPartyPositionsToUserAnswers(positionsByParty) : {}
    // console.log('🔍 [DEBUG] Transformation terminée')

        // ✅ Calculer les positions politiques dynamiquement pour chaque parti
        const dynamicPartyPositions: Record<string, { x: number; y: number }> = {}
        // console.log('🔍 [DEBUG] Calcul positions politiques...')
        for (const [partyId, answers] of Object.entries(partyAnswers)) {
          // console.log(`🔍 [DEBUG] Parti ${partyId} - calcul...`)
          const position = await calculateUserPoliticalPosition(answers, municipality)
          dynamicPartyPositions[partyId] = position
        }
    // console.log('🔍 [DEBUG] Positions calculées:', Object.keys(dynamicPartyPositions).length)

    // Les priorités sont maintenant récupérées via le hook usePriorities
    // console.log('🔍 [DEBUG] userPriorities:', userPriorities)

    const newCalculatedScores = await Promise.all(partiesData.map(async (party, _index) => {
      // console.log(`🔍 [DEBUG] === CALCUL PARTI ${index + 1}: ${party.name} ===`)

      // ✅ Utiliser les positions dynamiques calculées depuis Supabase (multi-municipalités)
      const partyPosition = dynamicPartyPositions[party.id]
      // console.log(`🔍 [DEBUG] Position du parti ${party.id}:`, partyPosition)
      let politicalScore = 0

      if (partyPosition) {
        // MÊME calcul que dans useResults.ts et la carte politique
        const distance = calculatePoliticalDistance(userPosition, partyPosition)
        // console.log(`🔍 [DEBUG] Distance pour ${party.id}:`, distance)
        // Distance maximale théorique = sqrt(200^2 + 200^2) ≈ 283
        const maxDistance = 283
        const compatibility = Math.max(0, Math.round(100 - (distance / maxDistance) * 100))
        // console.log(`🔍 [DEBUG] Compatibility pour ${party.id}:`, compatibility)
        politicalScore = compatibility
      } else {
        // Si pas de position politique définie pour ce parti, score de 0
        politicalScore = 0
        console.warn(`🔍 [DEBUG] Pas de position politique définie pour le parti: ${party.id}`)
      }

      // Calculer le score des priorités (extraction depuis DB)
      const partyPriorities = await extractPartyPrioritiesSimple(party.id, params.municipality as string)
      console.log(`🔍 [PRIORITIES] ${party.id}: DB priorities=`, partyPriorities)
      const priorityScore = calculatePriorityCompatibility(userPriorities, partyPriorities)
      console.log(`🔍 [PRIORITIES] Priority score pour ${party.id}:`, priorityScore)

      // Score final pondéré : 70% position politique, 30% priorités
      const finalScore = (politicalScore * 0.7) + (priorityScore * 0.3)
      // console.log(`🔍 [DEBUG] Score final pour ${party.id}:`, finalScore)

      // Calculer les détails pour l'accordéon (utilise la logique question par question pour l'affichage)
      const scoreDetails: CalculatedPartyScore["details"] = questions.map((question) => {
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
    }))

    // Trier par score décroissant
    newCalculatedScores.sort((a, b) => b.score - a.score)

    // console.log('🔍 [DEBUG] === RÉSULTATS FINAUX ===')
    // console.log('🔍 [DEBUG] Résultats:', newCalculatedScores.length, 'partis calculés')
        // console.log('🔍 [DEBUG] === FIN CALCUL ===')

        setCalculatedScores(newCalculatedScores)
      } catch (error) {
        console.error('🔍 [ERROR] Erreur lors du calcul des scores:', error)
        setScoresError(error instanceof Error ? error.message : 'Erreur lors du calcul des scores')
        setCalculatedScores([])
      } finally {
        setScoresLoading(false)
      }
    }

    // Déclencher le calcul si toutes les données sont disponibles
    if (!sessionLoading && !responsesLoading && !questionsLoading && !partiesLoading && !positionsLoading &&
        userAnswers && Object.keys(userAnswers).length > 0 &&
        partiesData && partiesData.length > 0 &&
        questions && questions.length > 0 &&
        positionsByParty && Object.keys(positionsByParty).length > 0 &&
        municipality) {
      calculateScoresAsync()
    }
  }, [userAnswers, userImportance, userPriorities, partiesData, questions, positionsByParty, municipality, sessionLoading, responsesLoading, questionsLoading, partiesLoading, positionsLoading, params.municipality])

  const topParties = useMemo(() => calculatedScores.slice(0, 3), [calculatedScores])

  // Calculer et sauvegarder les résultats si pas encore fait
  useEffect(() => {
    if (!isLoading && !hasResults && Object.keys(userAnswers).length > 0) {
      calculateAndSaveResults()
    }
  }, [isLoading, hasResults, userAnswers, calculateAndSaveResults])

  // Afficher le modal de révélation automatiquement (une seule fois par session)
  useEffect(() => {
    if (!isLoading && calculatedScores.length > 0 && !showProgressiveResultsModal) {
      // Vérifier si le modal a déjà été affiché dans cette session
      const hasSeenModal = sessionStorage.getItem('hasSeenProgressiveResultsModal')

      if (!hasSeenModal) {
        // Délai pour laisser la page se charger complètement
        const timer = setTimeout(() => {
          setShowProgressiveResultsModal(true)
          sessionStorage.setItem('hasSeenProgressiveResultsModal', 'true')
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [isLoading, calculatedScores.length, showProgressiveResultsModal])

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
          <Link href={`/${municipality}`}>Retour à l&apos;accueil</Link>
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

  // Gestion des erreurs de chargement des données Supabase
  if (!isLoading && globalError) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Une erreur est survenue lors du chargement des données.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          {globalError}
        </p>
        <Button asChild>
          <Link href={`/${municipality}`}>Retour à l&apos;accueil</Link>
        </Button>
      </div>
    )
  }

  // Vérifier si nous avons les questions et partis nécessaires
  if (!isLoading && (!questions || questions.length === 0 || !partiesData || partiesData.length === 0)) {
    return (
      <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Les données pour la municipalité {municipality} ne sont pas encore disponibles.
        </p>
        <Button asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
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
          <Link href={`/${municipality}/test-politique-municipal`}>Répondre au questionnaire</Link>
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
        // console.warn(`⚠️ Préchargement échoué pour ${party.name}: ${party.logoUrl}`)  // DEBUG: Supprimé logs non-pertinents
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
              // console.warn(`⚠️ Erreur de chargement du logo pour ${party.name}: ${party.logoUrl}`)  // DEBUG: Supprimé logs non-pertinents
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
    "description": "Questionnaire politique gratuit pour découvrir vos affinités avec les partis municipaux lors des élections 2025. 21 questions sur les enjeux locaux.",
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
      "url": "https://boussolemunicipale.com"
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

        <ScrollReveal>
          <Card className="shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle className="text-2xl">Vos meilleurs alignements (Partis)</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {topParties.map(({ party, score }, index) => (
                <AnimatedCard
                  key={party.id}
                  delay={index * 0.15}
                  className="p-6 flex flex-col items-center text-center border-2 border-border shadow-md hover:shadow-lg rounded-xl bg-white/90 backdrop-blur-sm hover:border-midnight-green/30 transition-all duration-300"
                >
                <PartyLogo party={party} size={{ width: 60, height: 60 }} className="w-20 h-20 mb-4" index={index} />
                {/* Container avec hauteur fixe pour assurer l'alignement des cartes */}
                <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">{party.shortName || party.name}</h3>
                  <p className="text-sm text-muted-foreground leading-tight">{party.name}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-teal-600 to-teal-500 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${score.toFixed(0)}%` }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                      delay: index * 0.15 + 0.5
                    }}
                  />
                </div>
                <p className="text-lg font-bold text-foreground mb-4">
                  <AnimatedCounter value={Math.round(score)} duration={1.5} suffix="% d'affinité" />
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10 btn-base-effects btn-hover-lift"
                >
                  <Link href={`/${municipality}/parti/${party.id}`}>Voir la fiche du parti</Link>
                </Button>
                </AnimatedCard>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="shadow-soft rounded-2xl subtle-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Votre position par rapport aux plateformes</CardTitle>
              <CardDescription>Comparaison de votre affinité globale avec chaque parti. Cliquez pour voir les détails.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calculatedScores.map(({ party, score }, index) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  <Link
                    href={`/${municipality}/parti/${party.id}`}
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
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Carte de positionnement politique 2D */}
        <Suspense fallback={<div className="h-full w-full bg-muted/30 rounded-lg flex items-center justify-center">Chargement de la carte politique...</div>}>
          <PoliticalCompassChart userAnswers={userAnswers} municipality={municipality} userImportance={userImportance} />
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
              {questions && questions.map((question, qIndex) => {
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
                            // Les priorités sont maintenant extraites via extractPartyPrioritiesSimple
                            // Pour l'affichage, on utilise un état local ou on fait l'appel ici
                            // Fallback temporaire en attendant une meilleure solution
                            const partyPriorities: string[] = []
                            const prioritiesText = partyPriorities.length > 0
                              ? partyPriorities.slice(0, 3).map((p, i) => `${i + 1}. ${p}`).join(' • ')
                              : "Priorités chargées depuis la base de données"
                            
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


        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2 rounded-lg px-6 py-3 btn-base-effects btn-hover-lift"
          >
            <Link href={`/${municipality}/test-politique-municipal`}>
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
            municipality={municipality}
          />
        </Suspense>

        {/* Modal de révélation progressive des résultats - avec lazy loading */}
        <Suspense fallback={<div />}>
          <ProgressiveResultsModal
            isOpen={showProgressiveResultsModal}
            onClose={() => setShowProgressiveResultsModal(false)}
            topMatch={topParties.length > 0 ? {
              partyId: topParties[0].party.id,
              score: topParties[0].score,
              percentage: topParties[0].score,
              rank: 1
            } : null}
            onViewPartyProfile={() => setShowProgressiveResultsModal(false)}
            results={results}
            userAnswers={userAnswers}
            userImportance={userImportance}
            calculatedScores={calculatedScores}
            topParties={topParties}
            municipality={municipality}
          />
        </Suspense>
      </div>
    </div>
    </PageWithGlow>
  )
}