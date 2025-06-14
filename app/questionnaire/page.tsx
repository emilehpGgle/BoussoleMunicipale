"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2, Home, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams, useRouter } from "next/navigation"
import { boussoleQuestions, agreementLabels, importanceDirectLabels, getAgreementLabel, getImportanceDirectLabel } from "@/lib/boussole-data"
import type { AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import { useResults } from "@/hooks/useResults"
import { ColoredText, HighlightText } from "@/components/ui/colored-text"
import { GlowSection } from "@/components/ui/subtle-glow"
import { PageWithGlow } from "@/components/ui/background-glow"
import { ButtonWithEffects } from "@/components/ui/button-effects"


// questions constant is already defined from boussoleQuestions

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0) // Pour forcer le re-render avec animations
  const [hasInitialized, setHasInitialized] = useState(false) // Nouveau: pour éviter les doubles initialisations
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentScreen, setCurrentScreen] = useState<'questionnaire' | 'results'>('questionnaire')

  // Intégration des hooks sécurisés
  const { sessionToken } = useSession()
  const {
    // État des réponses
    responses,
    isLoading,
    isSaving,
    error,
    
    // Actions pour sauvegarder
    saveAgreementResponse,
    saveImportanceDirectResponse,
    
    // Plus besoin des actions de nettoyage ici
    
    // Utilitaires
    getResponseCounts,
    
    // Aliases pour compatibilité
    userAnswers,
    userImportanceDirectAnswers
  } = useUserResponses()

  const { hasResults } = useResults()

  // Calculer quelle question afficher basée sur les réponses existantes
  const calculateNextQuestionIndex = useCallback(() => {
    // Parcourir toutes les questions pour trouver la première non répondue
    for (let i = 0; i < boussoleQuestions.length; i++) {
      const question = boussoleQuestions[i]
      
      // Vérifier si cette question a été répondue
      const hasResponse = question.responseType === "importance_direct" 
        ? userImportanceDirectAnswers[question.id] !== undefined
        : userAnswers[question.id] !== undefined
      
      // Si cette question n'a pas de réponse, c'est celle qu'on doit afficher
      if (!hasResponse) {
        return i
      }
    }
    
    // Si toutes les questions ont été répondues, aller à la dernière
    return boussoleQuestions.length - 1
  }, [userAnswers, userImportanceDirectAnswers])

  // Initialiser l'index de question une fois que les réponses sont chargées
  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      const nextQuestionIndex = calculateNextQuestionIndex()
      
      // Si on a des réponses et qu'on n'est pas à la première question
      if (nextQuestionIndex > 0) {
        console.log(`🎯 Reprendre au questionnaire à la question ${nextQuestionIndex + 1}/${boussoleQuestions.length}`)
        setCurrentQuestionIndex(nextQuestionIndex)
      }
      
      setHasInitialized(true)
    }
  }, [isLoading, hasInitialized, userAnswers, userImportanceDirectAnswers, calculateNextQuestionIndex])

  // Nouvelle logique: re-calculer si les données changent après l'initialisation
  useEffect(() => {
    if (hasInitialized && !isLoading) {
      const responseCount = getResponseCounts().total
      if (responseCount > 0 && currentQuestionIndex === 0) {
        const newIndex = calculateNextQuestionIndex()
        if (newIndex > 0) {
          console.log(`🎯 Correction: aller à la question ${newIndex + 1}`)
          setCurrentQuestionIndex(newIndex)
        }
      }
    }
  }, [hasInitialized, isLoading, currentQuestionIndex, calculateNextQuestionIndex, getResponseCounts])

  useEffect(() => {
    // Logic for postal code check can be added here if needed
  }, [searchParams, router])

  const currentQuestion = boussoleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / boussoleQuestions.length) * 100

  const handleAnswer = async (optionKey: AgreementOptionKey) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await saveAgreementResponse(currentQuestion.id, optionKey)
      
      // Si c'est la dernière question, rediriger automatiquement vers les résultats
      if (currentQuestionIndex === boussoleQuestions.length - 1) {
        // Délai pour permettre à l'utilisateur de voir sa sélection
        setTimeout(() => {
          router.push('/resultats')
        }, 800) // Délai légèrement plus long pour la dernière question
      } else {
        // Auto-progression avec animation "swoosh" pour les autres questions
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setQuestionKey(prev => prev + 1) // Force la réanimation
          setIsTransitioning(false)
        }, 250) // Délai pour permettre l'animation de sortie (légèrement plus rapide)
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la réponse:', err)
      // L'erreur est déjà gérée par le hook, on peut continuer l'UI
    }
  }

  const handleImportanceDirectAnswer = async (optionKey: ImportanceDirectOptionKey) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await saveImportanceDirectResponse(currentQuestion.id, optionKey)
      
      // Si c'est la dernière question, rediriger automatiquement vers les résultats
      if (currentQuestionIndex === boussoleQuestions.length - 1) {
        // Délai pour permettre à l'utilisateur de voir sa sélection
        setTimeout(() => {
          router.push('/resultats')
        }, 800) // Délai légèrement plus long pour la dernière question
      } else {
        // Auto-progression avec animation "swoosh" pour les autres questions
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setQuestionKey(prev => prev + 1) // Force la réanimation
          setIsTransitioning(false)
        }, 250) // Délai pour permettre l'animation de sortie (légèrement plus rapide)
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la réponse importance directe:', err)
      // L'erreur est déjà gérée par le hook, on peut continuer l'UI
    }
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
    } else {
      // Sauvegarde automatique dans Supabase via les hooks
      // Les données sont déjà synchronisées via nos hooks
      router.push("/profil")
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
    }
  }

  const isAnswered = currentQuestion.responseType === "importance_direct" 
    ? userImportanceDirectAnswers[currentQuestion.id] !== undefined
    : userAnswers[currentQuestion.id] !== undefined

  // État de chargement pendant l'initialisation
  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de vos réponses...</p>
        </div>
      </div>
    )
  }

  const showResults = () => {
    setCurrentScreen('results')
  }

  const backToQuestionnaire = () => {
    setCurrentScreen('questionnaire')
  }

      return (
      <PageWithGlow 
        intensity="subtle"
        className="relative questionnaire-compact mobile-constrained"
      >

      {/* Affichage d'erreur uniquement si problème critique */}
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Problème de connexion</p>
          <p className="text-xs opacity-80">Vos réponses sont sauvegardées localement</p>
        </div>
      )}

      {/* Image décorative - jardinage centrée à droite (desktop) */}
      <div className="hidden lg:block">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none w-80 h-auto decorative-frame-right">
          <img 
            src="/Image_parc_jardinage.png" 
            alt="" 
            className="w-full h-full object-cover decorative-image-right"
          />
        </div>
      </div>

      {/* Contenu principal optimisé pour l'espace vertical */}
      <div className="container max-w-4xl py-4 md:py-6 px-4 md:px-6 mobile-content-overlay section-contained flex flex-col questionnaire-compact">
        <div className="mb-3 progress-container">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} sur {boussoleQuestions.length}
            </div>
            {/* Affichage du nombre de réponses */}
            <div className="text-xs text-muted-foreground">
              {getResponseCounts().total} réponses enregistrées
            </div>
          </div>
          <Progress
            value={progress}
            className="h-2 rounded-full bg-muted"
            indicatorClassName="bg-primary transition-all duration-500 ease-out"
          />
        </div>

        <Card 
          key={questionKey} 
          className={`card-question p-4 md:p-5 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-border/60 flex-1 flex flex-col ${isTransitioning ? 'question-exit' : 'question-enter'} transition-all duration-300`}
        >
          <div className="flex items-start gap-3 mb-3 question-header">
            <h2 className={`question-title text-lg md:text-xl text-foreground leading-snug font-semibold ${!isTransitioning ? 'question-content-enter' : ''}`}>
              {currentQuestion.text}
            </h2>
            {currentQuestion.description && (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-1 text-muted-foreground hover:text-secondary btn-base-effects"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Plus d'informations</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-card p-3 rounded-lg shadow-soft border">
                    <p className="text-sm text-foreground">{currentQuestion.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className={`question-grid grid gap-1.5 mb-3 flex-1 ${!isTransitioning ? 'question-content-enter' : ''}`}>
            {currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
              // Questions d'importance directe
              currentQuestion.importanceDirectOptions.map((optionKey, index) => {
                const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
                const isSelected = userImportanceDirectAnswers[currentQuestion.id] === optionKey;
                
                return (
                  <ButtonWithEffects
                    key={optionKey}
                    variant={isSelected ? "standard" : "subtle"}
                    className={`option-button justify-start py-3 px-4 text-left rounded-xl text-sm md:text-base font-medium min-h-0 w-full
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-background hover:bg-primary/20 hover:text-foreground text-foreground transition-all duration-150"
                      } ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleImportanceDirectAnswer(optionKey)}
                  >
                    {isSelected && (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />
                    )}
                    {labelText}
                  </ButtonWithEffects>
                )
              })
            ) : (
              // Questions d'accord/désaccord (standard)
              currentQuestion.agreementOptions.map((optionKey, index) => {
                const labelText = getAgreementLabel(currentQuestion, optionKey);
                const isSelected = userAnswers[currentQuestion.id] === optionKey;
                
                return (
                  <ButtonWithEffects
                    key={optionKey}
                    variant={isSelected ? "standard" : "subtle"}
                    className={`option-button justify-start py-3 px-4 text-left rounded-xl text-sm md:text-base font-medium min-h-0 w-full
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-background hover:bg-primary/20 hover:text-foreground text-foreground transition-all duration-150"
                      } ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleAnswer(optionKey)}
                  >
                    {isSelected && (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />
                    )}
                    {labelText}
                  </ButtonWithEffects>
                )
              })
            )}
          </div>

          <div className="navigation-buttons flex flex-col sm:flex-row justify-between gap-2 mt-auto pt-2">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/50 border-border btn-base-effects btn-hover-lift text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>

            {/* Bouton "Voir mes résultats" seulement sur la dernière question */}
            {currentQuestionIndex === boussoleQuestions.length - 1 && (
              <Button
                onClick={goToNextQuestion}
                disabled={!isAnswered}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 shadow-soft btn-base-effects btn-hover-lift btn-primary-hover-effects font-medium text-sm"
              >
                Voir mes résultats
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-1 text-center">
          <Button variant="link" asChild className="text-xs text-muted-foreground hover:text-primary btn-base-effects py-1">
            <Link href="/">Quitter</Link>
          </Button>
        </div>
      </div>
    </PageWithGlow>
  )
}
