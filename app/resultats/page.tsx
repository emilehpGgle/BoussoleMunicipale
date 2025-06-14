"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Share2, Info, Mail, Twitter, Facebook, Instagram, Linkedin, ArrowRight, Download, Link as LinkIcon, MessageCircle } from "lucide-react"
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
  type ImportanceDirectOptionKey,
  type PartyPosition,
} from "@/lib/boussole-data"
import {
  calculatePoliticalDistance,
  calculateUserPoliticalPosition,
  partyPositions,
  type UserAnswers as PoliticalUserAnswers,
} from "@/lib/political-map-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PoliticalCompassChart from "@/components/political-compass-chart"
import { sendResultsByEmail } from "@/lib/email-service"
import { toast } from "sonner"
import { useResults } from "@/hooks/useResults"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import ShareModal from "@/components/share-modal"
import { PageWithGlow } from "@/components/ui/background-glow"


interface UserAnswers {
  [questionId: string]: AgreementOptionKey | undefined
}

interface UserImportance {
  [questionId: string]: ImportanceDirectOptionKey | undefined
}

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

const agreementScoreValues: Record<AgreementOptionKey, number> = {
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

export default function ResultsPage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [hoveredParty, setHoveredParty] = useState<string | null>(null)
  const [showFloatingShare, setShowFloatingShare] = useState(false)

  // Intégration des hooks sécurisés
  const { sessionToken } = useSession()
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
          const userScore = agreementScoreValues[userAnswer]
          const partyScore = agreementScoreValues[partyPositionEntry.position]
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

  // Amélioration 6: Gestion d'erreurs API et feedback utilisateur pour generateShareUrl
  const generateShareUrl = async () => {
    const shareId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log(`🎯 [Results-generateShareUrl] Génération shareId: ${shareId}`)
    
    // Structure des données à partager
    const shareData = {
      id: shareId,
      userName: "Citoyen engagé", // Peut être personnalisé
      topParties: topParties.slice(0, 3).map(p => ({ party: p.party, score: p.score })),
      userPosition: calculatedScores.length > 0 ? calculateUserPoliticalPosition(userAnswers) : undefined,
      timestamp: Date.now(),
      // Ajouter les réponses utilisateur pour permettre l'affichage de la carte politique
      userAnswers: userAnswers,
      userImportance: userImportance
    }
    
    console.log(`📦 [Results-generateShareUrl] Données à sauvegarder:`, {
      id: shareData.id,
      topPartiesCount: shareData.topParties.length,
      hasUserAnswers: !!shareData.userAnswers,
      userAnswersCount: Object.keys(shareData.userAnswers || {}).length
    })
    
    try {
      console.log(`🚀 [Results-generateShareUrl] Appel API save-share`)
      // Appeler l'API pour sauvegarder les résultats
      const response = await fetch('/api/save-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shareId, data: shareData })
      })
      
      console.log(`📡 [Results-generateShareUrl] Réponse API statut: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ [Results-generateShareUrl] Erreur API:`, errorText)
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }
      
      const result = await response.json()
      console.log(`✅ [Results-generateShareUrl] Sauvegarde réussie:`, result)
      
    } catch (error) {
      console.error('💥 [Results-generateShareUrl] Erreur lors de l\'appel à l\'API de sauvegarde:', error)
      toast.error("Erreur lors de la sauvegarde. Le partage pourrait ne pas fonctionner.")
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const shareUrl = `${baseUrl}/partage/${shareId}`
    console.log(`🔗 [Results-generateShareUrl] URL finale générée: ${shareUrl}`)
    return shareUrl
  }

  // Génération d'un message de partage plus naturel et accrocheur
  const generateShareText = () => {
    if (topParties.length === 0) return "Je viens de découvrir mes affinités politiques municipales ! Fascinant de voir où on se situe 🧭"
    
    const topParty = topParties[0]
    const partyName = topParty.party.shortName || topParty.party.name
    const score = Math.round(topParty.score)
    
    return `${score}% d'alignement avec ${partyName} ! Surprenant ce qu'on apprend sur nos priorités municipales 🏛️ Découvrez mes résultats complets :`
  }

  // Fonction pour générer l'image de partage
  const generateShareImage = async () => {
    try {
      const response = await fetch('/api/generate-share-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topParties: topParties.map(party => ({
            party: {
              id: party.party.id,
              name: party.party.name,
              shortName: party.party.shortName,
              leader: party.party.leader,
              logoUrl: party.party.logoUrl
            },
            score: party.score
          })),
          userPosition: {
            economic: 0, // À calculer si nécessaire
            social: 0    // À calculer si nécessaire
          },
          userName: "Citoyen", // Peut être personnalisé plus tard
          format: 'png'
        })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'image')
      }

      const blob = await response.blob()
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error('Erreur génération image:', error)
      toast.error("Impossible de générer l'image. Partage du texte...")
      return null
    }
  }

  // Amélioration 3: Gestion d'erreurs Facebook avec extraction sécurisée
  const handleFacebookShare = async () => {
    try {
      const shareUrl = await generateShareUrl()
      const topParty = topParties[0]
      const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti'
      const score = Math.round(topParty?.score || 0)
      const text = encodeURIComponent(`Découvrez mes affinités politiques municipales ! ${partyName}: ${score}%`)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${text}`, '_blank')
    } catch (error) {
      console.error('Erreur lors du partage Facebook:', error)
      toast.error("Impossible de partager sur Facebook")
    }
  }

  // Amélioration 2: Gestion d'erreurs Twitter avec extraction sécurisée
  const handleTwitterShare = async () => {
    try {
      const shareUrl = await generateShareUrl()
      const topParty = topParties[0]
      const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti'
      const score = Math.round(topParty?.score || 0)
      const text = encodeURIComponent(`🗳️ Mes affinités politiques municipales révélées ! Top parti: ${partyName} (${score}%) #BoussoleElectorale #PolitiqueMunicipale`)
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    } catch (error) {
      console.error('Erreur lors du partage Twitter:', error)
      toast.error("Impossible de partager sur Twitter")
    }
  }

  // Amélioration 1: Gestion d'erreurs LinkedIn avec extraction sécurisée
  const handleLinkedInShare = async () => {
    try {
      const shareUrl = await generateShareUrl()
      const title = encodeURIComponent('Mes résultats de la Boussole Municipale')
      const topParty = topParties[0]
      const partyName = topParty?.party?.shortName || topParty?.party?.name || 'Parti'
      const score = Math.round(topParty?.score || 0)
      const summary = encodeURIComponent(`Découvrez mes affinités politiques locales ! Mon top parti: ${partyName} avec ${score}% d'affinité.`)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${title}&summary=${summary}`, '_blank')
    } catch (error) {
      console.error('Erreur lors du partage LinkedIn:', error)
      toast.error("Impossible de partager sur LinkedIn")
    }
  }

  // Amélioration 4: Gestion d'erreurs Messenger
  const handleMessengerShare = async () => {
    try {
      const shareUrl = await generateShareUrl()
      window.open(`https://www.messenger.com/t/?link=${encodeURIComponent(shareUrl)}`, '_blank')
    } catch (error) {
      console.error('Erreur lors du partage Messenger:', error)
      toast.error("Impossible de partager sur Messenger")
    }
  }

  const handleCopyShare = async () => {
    const shareUrl = await generateShareUrl()
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Lien de partage copié dans le presse-papiers !")
    } catch (err) {
      toast.error("Impossible de copier le lien.")
      console.error('Erreur de copie:', err)
    }
  }

  const handleGeneralShare = async () => {
    const shareUrl = await generateShareUrl()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mes résultats - Boussole Municipale',
          text: generateShareText(),
          url: shareUrl,
        })
      } catch (error) {
        console.error('Erreur partage natif:', error)
      }
    } else {
      // Fallback pour les navigateurs non compatibles (ex: desktop)
      handleCopyShare()
    }
  }

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
          Nous n'avons pas pu trouver vos réponses. Avez-vous complété le questionnaire ?
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
          Nous n'avons pas pu calculer vos résultats. Veuillez réessayer.
        </p>
        <Button onClick={() => calculateAndSaveResults()} disabled={isCalculating}>
          {isCalculating ? 'Calcul en cours...' : 'Recalculer'}
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
          <img 
            src="/Image_parc_chat_dort.png" 
            alt="" 
            className="w-full h-full object-cover decorative-image-left"
          />
        </div>
        
        {/* Famille - troisième tiers de la page */}
        <div className="absolute right-0 top-[75%] -translate-y-1/2 z-0 pointer-events-none w-72 h-auto decorative-frame-right">
          <img 
            src="/Image_famille.png" 
            alt="" 
            className="w-full h-full object-cover decorative-image-right"
          />
        </div>
      </div>

      {/* Contenu principal avec overlay mobile */}
      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-12 animate-fadeIn relative z-10 mobile-content-overlay mobile-gradient-bg lg:bg-none section-contained">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="flex-1 mobile-section-border lg:border-l-0 lg:pl-0">
            <h1 className="text-foreground mb-3">Vos Résultats</h1> {/* font-bold is now in globals.css for h1 */}
            <p className="text-muted-foreground">
              Voici comment vos opinions s'alignent avec celles des partis, basé sur vos réponses au questionnaire.
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
                <LogoContainer className="w-20 h-20 mb-4">
                  <Image
                    src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
                    alt={`Logo ${party.name}`}
                    width={60} // Adjusted to fit within padding
                    height={60} // Adjusted to fit within padding
                    style={{ objectFit: "contain" }}
                  />
                </LogoContainer>
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
                <p className="text-lg font-bold text-foreground mb-4">{score.toFixed(0)}% d'affinité</p>
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
            {calculatedScores.map(({ party, score }) => (
              <Link
                href={`/parti/${party.id}`}
                key={party.id}
                className="block p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-md"
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
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                    {party.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Voir les détails</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-full bg-muted rounded-full h-5 flex overflow-hidden border border-border group-hover:border-primary/30 transition-colors">
                    <div
                      className="bg-primary h-full flex items-center justify-center text-xs text-primary-foreground font-medium transition-all duration-500 ease-out"
                      style={{ width: `${score.toFixed(0)}%` }}
                    >
                      {score >= 15 ? `${score.toFixed(0)}%` : ""}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap ml-2">
                    {score.toFixed(0)}% d'affinité
                  </span>
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
                  Chacune des 20 questions influence votre score sur deux axes indépendants (économique et social). Votre position finale est la somme de ces influences, pondérée par l'importance que vous accordez à chaque question.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">📊 Calcul des affinités</h4>
                <p>
                  L'affinité est calculée à partir de la distance qui vous sépare de chaque parti sur la carte politique. Plus un parti est proche de vous, plus l'affinité est élevée. La formule a été ajustée pour que les partis éloignés soient plus sévèrement pénalisés, rendant le score plus intuitif.
                </p>
              </div>
              <div>
                <p className="text-xs italic pt-2 border-t border-muted-foreground/10">
                  <strong>Note méthodologique :</strong> Les positions des partis sont basées sur l'analyse de leurs programmes et déclarations publiques. Cette méthode scientifique garantit une représentation équitable du paysage politique municipal.
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
      </div>
    </div>
    </PageWithGlow>
  )
}
