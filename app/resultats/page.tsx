"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)

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

  // Calculer les scores localement (logique existante adaptée)
  const calculatedScores = useMemo(() => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      return []
    }

    // Si on a des résultats sauvegardés et récents, les utiliser
    if (results && results.sortedParties) {
      return results.sortedParties.map(partyScore => {
        const party = partiesData.find(p => p.id === partyScore.partyId)
        if (!party) return null

        // Calculer les détails pour l'accordéon
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
          score: partyScore.score,
          rawScore: partyScore.score,
          maxPossibleRawScoreForParty: 100,
          details: scoreDetails,
        }
      }).filter(Boolean) as CalculatedPartyScore[]
    }

    // Sinon, calculer localement (logique existante)
    const userPosition = calculateUserPoliticalPosition(userAnswers)

    const newCalculatedScores = partiesData.map((party) => {
      // Calculer la distance politique pour cette approche plus sophistiquée
      const partyPosition = partyPositions[party.id]
      let score = 0
      let rawScore = 0
      let maxPossibleRawScoreForParty = 100

      if (partyPosition) {
        // Calcul basé sur la distance politique (utilisé par la carte)
        const distance = calculatePoliticalDistance(userPosition, partyPosition)
        // Convertir la distance en score de compatibilité (distance max théorique = ~283 sur [-100,100] x [-100,100])
        const maxDistance = Math.sqrt(200 * 200 + 200 * 200) // ≈ 283
        
        // La formule est maintenant non-linéaire pour pénaliser plus sévèrement les grandes distances.
        // On utilise une puissance (ex: 1.5) pour que la pénalité augmente exponentiellement.
        const normalizedDistance = distance / maxDistance
        const penalty = Math.pow(normalizedDistance, 1.5) * 100
        score = Math.max(0, 100 - penalty)
        rawScore = score
      } else {
        // Fallback : utiliser l'ancienne méthode si pas de position politique
        let totalWeightedScore = 0
        let maxPossibleWeightedScore = 0

        boussoleQuestions.forEach((question) => {
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
          totalWeightedScore += weightedQuestionScore
          maxPossibleWeightedScore += MAX_AGREEMENT_MAGNITUDE * currentImportance
        })
        
        const normalizedScore = maxPossibleWeightedScore > 0 ? (totalWeightedScore / maxPossibleWeightedScore) * 100 : 0
        score = Math.max(0, Math.min(100, normalizedScore))
        rawScore = totalWeightedScore
        maxPossibleRawScoreForParty = maxPossibleWeightedScore
      }

      // Les détails pour l'accordéon sont maintenant calculés avec la même logique de base
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
          // Note: ce calcul de "match" est conservé pour les détails mais n'influence plus le score principal
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
        rawScore,
        maxPossibleRawScoreForParty,
        details: scoreDetails,
      }
    })

    newCalculatedScores.sort((a, b) => b.score - a.score)
    return newCalculatedScores
  }, [userAnswers, userImportance, results])

  // Calculer et sauvegarder les résultats si pas encore fait
  useEffect(() => {
    if (!isLoading && !hasResults && Object.keys(userAnswers).length > 0) {
      calculateAndSaveResults()
    }
  }, [isLoading, hasResults, userAnswers, calculateAndSaveResults])

  const topParties = useMemo(() => calculatedScores.slice(0, 3), [calculatedScores])

  // Amélioration 6: Gestion d'erreurs API et feedback utilisateur pour generateShareUrl
  const generateShareUrl = async () => {
    const shareId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Structure des données à partager
    const shareData = {
      id: shareId,
      userName: "Citoyen engagé", // Peut être personnalisé
      topParties: topParties.slice(0, 3).map(p => ({ party: p.party, score: p.score })),
      userPosition: calculatedScores.length > 0 ? calculateUserPoliticalPosition(userAnswers) : undefined,
      timestamp: Date.now()
    }
    
    try {
      // Appeler l'API pour sauvegarder les résultats
      const response = await fetch('/api/save-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shareId, data: shareData })
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API de sauvegarde:', error)
      toast.error("Erreur lors de la sauvegarde. Le partage pourrait ne pas fonctionner.")
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}/partage/${shareId}`
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Veuillez entrer une adresse email valide")
      return
    }

    try {
      // Préparer les données pour l'email
      const emailData = {
        topParties: topParties,
        userPosition: calculatedScores.length > 0 ? {
          economic: 0, // À calculer à partir des réponses si nécessaire
          social: 0    // À calculer à partir des réponses si nécessaire
        } : undefined,
        timestamp: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // Utiliser le service d'email (mailto pour l'instant)
      const success = await sendResultsByEmail(email, emailData)
      
      if (success) {
        toast.success("Client email ouvert ! Vérifiez votre application email.")
        setEmail("") // Reset le champ
      } else {
        toast.error("Erreur lors de l'ouverture du client email")
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error)
      toast.error("Une erreur est survenue lors de l'envoi")
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
          {sessionToken && <p className="text-xs text-muted-foreground mt-1">Synchronisation avec le cloud</p>}
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
    <div className="relative min-h-screen">
      {/* Affichage d'erreur si problème de synchronisation */}
      {(responsesError || resultsError) && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Problème de synchronisation</p>
          <p className="text-xs opacity-80">Affichage des données locales</p>
        </div>
      )}

      {/* Indicateur de calcul */}
      {isCalculating && (
        <div className="fixed top-4 left-4 bg-primary/10 border border-primary/20 text-primary px-3 py-2 rounded-lg text-sm z-50 flex items-center gap-2">
          <div className="animate-spin rounded-full h-3 w-3 border-b border-primary"></div>
          <span>Calcul des résultats...</span>
        </div>
      )}

      {/* Images décoratives positionnées selon la hauteur */}
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

      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-12 animate-fadeIn relative z-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-foreground mb-3">Vos Résultats</h1> {/* font-bold is now in globals.css for h1 */}
          <p className="text-muted-foreground">
            Voici comment vos opinions s'alignent avec celles des partis, basé sur vos réponses au questionnaire.
          </p>
          {/* Affichage du pourcentage de complétion si disponible */}
          {results && (
            <p className="text-sm text-muted-foreground mt-2">
              Basé sur {results.answeredQuestions}/{results.totalQuestions} réponses ({results.completionPercentage}% complété)
            </p>
          )}
        </div>
        <div className="sm:ml-auto sm:text-right">
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center sm:text-right">
            Partagez vos résultats
          </h3>
          <div className="flex justify-center sm:justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleTwitterShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Partager sur Twitter"
            >
              <Twitter className="h-5 w-5 text-sky-500" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleFacebookShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleMessengerShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Partager sur Messenger"
            >
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleLinkedInShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-sky-700" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Copier le lien"
            >
              <Download className="h-5 w-5 text-gray-600" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleGeneralShare}
              className="rounded-full btn-base-effects hover:bg-muted/80"
              aria-label="Partager"
            >
              <Share2 className="h-5 w-5 text-foreground" />
            </Button>
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
              
              // Obtenir la réponse directe d'importance si applicable
              let userResponseText = "Non répondue"
              if (userAnswer) {
                if (question.responseType === "importance_direct") {
                  // Pour les questions d'importance directe, utiliser les labels spéciaux
                  const importanceDirectAnswers = JSON.parse(localStorage.getItem("userImportanceDirectAnswers") || "{}")
                  const directAnswer = importanceDirectAnswers[question.id]
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
    </div>
  )
}
