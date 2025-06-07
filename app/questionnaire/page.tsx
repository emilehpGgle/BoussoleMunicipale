"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams, useRouter } from "next/navigation"
import { boussoleQuestions, agreementLabels, importanceDirectLabels, getAgreementLabel, getImportanceDirectLabel } from "@/lib/boussole-data"
import type { AgreementOptionKey, ImportanceOptionKey, ImportanceDirectOptionKey } from "@/lib/boussole-data"

// questions constant is already defined from boussoleQuestions

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AgreementOptionKey | undefined>>({})
  const [importance, setImportance] = useState<Record<string, ImportanceOptionKey | undefined>>({})
  const [importanceDirectAnswers, setImportanceDirectAnswers] = useState<Record<string, ImportanceDirectOptionKey | undefined>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0) // Pour forcer le re-render avec animations
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Logic for postal code check can be added here if needed
  }, [searchParams, router])

  const currentQuestion = boussoleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / boussoleQuestions.length) * 100

  const handleAnswer = (optionKey: AgreementOptionKey) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionKey })
    // Définir automatiquement l'importance à une valeur par défaut pour simplifier l'UX
    if (!importance[currentQuestion.id]) {
      setImportance({ ...importance, [currentQuestion.id]: 3 })
    }
    
    // Auto-progression avec animation "swoosh" (sauf dernière question)
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1) // Force la réanimation
        setIsTransitioning(false)
      }, 250) // Délai pour permettre l'animation de sortie (légèrement plus rapide)
    }
  }

  const handleImportanceDirectAnswer = (optionKey: ImportanceDirectOptionKey) => {
    setImportanceDirectAnswers({ ...importanceDirectAnswers, [currentQuestion.id]: optionKey })
    
    // Auto-progression avec animation "swoosh" (sauf dernière question)  
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1) // Force la réanimation
        setIsTransitioning(false)
      }, 250) // Délai pour permettre l'animation de sortie (légèrement plus rapide)
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
      localStorage.setItem("userAnswers", JSON.stringify(answers))
      localStorage.setItem("userImportance", JSON.stringify(importance))
      localStorage.setItem("userImportanceDirectAnswers", JSON.stringify(importanceDirectAnswers))
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
    ? importanceDirectAnswers[currentQuestion.id] !== undefined
    : answers[currentQuestion.id] !== undefined

  return (
    <div className="container max-w-3xl py-2 px-4 md:px-6 animate-fadeIn flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} sur {boussoleQuestions.length}
          </div>
        </div>
        <Progress
          value={progress}
          className="h-2 rounded-full bg-muted"
          indicatorClassName="bg-secondary transition-all duration-500 ease-out"
        />
      </div>

      <Card key={questionKey} className={`p-4 md:p-6 shadow-soft rounded-2xl bg-card flex flex-col ${isTransitioning ? 'question-exit' : 'question-enter'}`}>
        <div className="flex items-start gap-3 mb-4">
          <h2 className={`text-xl md:text-2xl text-foreground leading-tight font-semibold ${!isTransitioning ? 'question-content-enter' : ''}`}>{currentQuestion.text}</h2>
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

        <div className={`grid gap-3 mb-4 items-start ${!isTransitioning ? 'question-content-enter' : ''}`}>
          {currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
            // Questions d'importance directe
            currentQuestion.importanceDirectOptions.map((optionKey, index) => {
              const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
              const isSelected = importanceDirectAnswers[currentQuestion.id] === optionKey;
              
              return (
                <Button
                  key={optionKey}
                  variant={isSelected ? "default" : "outline"}
                  className={`justify-start py-3 px-4 text-left rounded-xl text-base font-medium min-h-0
                    ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground shadow-soft border-2 border-secondary"
                        : "bg-background hover:bg-secondary/20 hover:border-secondary hover:text-foreground text-foreground border-border transition-all duration-150 active:scale-[0.99]"
                    } btn-base-effects ${!isTransitioning ? 'option-button-enter' : ''}`}
                  onClick={() => handleImportanceDirectAnswer(optionKey)}
                >
                  {isSelected && (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-secondary-foreground/80" />
                  )}
                  {labelText}
                </Button>
              )
            })
          ) : (
            // Questions d'accord/désaccord (standard)
            currentQuestion.agreementOptions.map((optionKey, index) => {
              const labelText = getAgreementLabel(currentQuestion, optionKey);
              const isSelected = answers[currentQuestion.id] === optionKey;
              
              return (
                <Button
                  key={optionKey}
                  variant={isSelected ? "default" : "outline"}
                  className={`justify-start py-3 px-4 text-left rounded-xl text-base font-medium min-h-0
                    ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground shadow-soft border-2 border-secondary"
                        : "bg-background hover:bg-secondary/20 hover:border-secondary hover:text-foreground text-foreground border-border transition-all duration-150 active:scale-[0.99]"
                    } btn-base-effects ${!isTransitioning ? 'option-button-enter' : ''}`}
                  onClick={() => handleAnswer(optionKey)}
                >
                  {isSelected && (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-secondary-foreground/80" />
                  )}
                  {labelText}
                </Button>
              )
            })
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-auto">
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

      <div className="mt-2 text-center">
        <Button variant="link" asChild className="text-xs text-muted-foreground hover:text-primary btn-base-effects py-1">
          <Link href="/">Quitter</Link>
        </Button>
      </div>
    </div>
  )
}
