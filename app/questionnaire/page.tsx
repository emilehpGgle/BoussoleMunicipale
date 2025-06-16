"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams, useRouter } from "next/navigation"
import { boussoleQuestions, getAgreementLabel, getImportanceDirectLabel } from "@/lib/boussole-data"
import type { AgreementOptionKey, ImportanceDirectOptionKey } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import { PageWithGlow } from "@/components/ui/background-glow"
import { ButtonWithEffects } from "@/components/ui/button-effects"


export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0) // Pour forcer le re-render avec animations
  const [hasInitialized, setHasInitialized] = useState(false) // Nouveau: pour éviter les doubles initialisations
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    isLoading,
    error,
    saveAgreementResponse,
    saveImportanceDirectResponse,
    getResponseCounts,
    userAnswers,
    userImportanceDirectAnswers
  } = useUserResponses()

  const calculateNextQuestionIndex = useCallback(() => {
    for (let i = 0; i < boussoleQuestions.length; i++) {
      const question = boussoleQuestions[i]
      const hasResponse = question.responseType === "importance_direct" 
        ? userImportanceDirectAnswers[question.id] !== undefined
        : userAnswers[question.id] !== undefined
      if (!hasResponse) return i
    }
    return boussoleQuestions.length - 1
  }, [userAnswers, userImportanceDirectAnswers])

  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      const nextQuestionIndex = calculateNextQuestionIndex()
      if (nextQuestionIndex > 0) {
        setCurrentQuestionIndex(nextQuestionIndex)
      }
      setHasInitialized(true)
    }
  }, [isLoading, hasInitialized, calculateNextQuestionIndex])

  const currentQuestion = boussoleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / boussoleQuestions.length) * 100

  const handleAnswer = async (optionKey: AgreementOptionKey) => {
    await saveAgreementResponse(currentQuestion.id, optionKey)
    if (currentQuestionIndex === boussoleQuestions.length - 1) {
      setTimeout(() => router.push('/profil'), 800)
    } else {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
    }
  }

  const handleImportanceDirectAnswer = async (optionKey: ImportanceDirectOptionKey) => {
    await saveImportanceDirectResponse(currentQuestion.id, optionKey)
    if (currentQuestionIndex === boussoleQuestions.length - 1) {
      setTimeout(() => router.push('/profil'), 800)
    } else {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
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

  return (
    <PageWithGlow 
      intensity="subtle"
      className="relative questionnaire-compact mobile-constrained"
    >
      <div className="container max-w-4xl py-4 md:py-6 px-4 md:px-6 mobile-content-overlay section-contained flex flex-col questionnaire-compact">
        <div className="mb-3 progress-container">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} sur {boussoleQuestions.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {getResponseCounts().total} / {boussoleQuestions.length} répondues
            </div>
          </div>
          <Progress value={progress} className="w-full h-2" />
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
              currentQuestion.importanceDirectOptions.map((optionKey) => {
                const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
                const isSelected = userImportanceDirectAnswers[currentQuestion.id] === optionKey;
                return (
                  <ButtonWithEffects
                    key={optionKey}
                    variant={isSelected ? "standard" : "subtle"}
                    className={`option-button justify-start py-3 px-4 text-left rounded-xl text-sm md:text-base font-medium min-h-0 w-full ${isSelected ? "bg-primary text-primary-foreground shadow-soft" : "bg-background hover:bg-primary/20 hover:text-foreground text-foreground transition-all duration-150"} ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleImportanceDirectAnswer(optionKey)}
                  >
                    {isSelected && <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />}
                    {labelText}
                  </ButtonWithEffects>
                )
              })
            ) : (
              currentQuestion.agreementOptions.map((optionKey) => {
                const labelText = getAgreementLabel(currentQuestion, optionKey);
                const isSelected = userAnswers[currentQuestion.id] === optionKey;
                return (
                  <ButtonWithEffects
                    key={optionKey}
                    variant={isSelected ? "standard" : "subtle"}
                    className={`option-button justify-start py-3 px-4 text-left rounded-xl text-sm md:text-base font-medium min-h-0 w-full ${isSelected ? "bg-primary text-primary-foreground shadow-soft" : "bg-background hover:bg-primary/20 hover:text-foreground text-foreground transition-all duration-150"} ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleAnswer(optionKey)}
                  >
                    {isSelected && <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />}
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
            {currentQuestionIndex === boussoleQuestions.length - 1 && (
              <Button
                onClick={goToNextQuestion}
                disabled={!isAnswered}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 shadow-soft btn-base-effects btn-hover-lift btn-primary-hover-effects font-medium text-sm"
              >
                Continuer
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
