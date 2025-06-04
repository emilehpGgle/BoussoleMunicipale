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
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Logic for postal code check can be added here if needed
  }, [searchParams, router])

  const currentQuestion = boussoleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / boussoleQuestions.length) * 100

  const handleAnswer = (optionKey: AgreementOptionKey) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionKey })
  }

  const handleImportance = (value: ImportanceOptionKey) => {
    setImportance({ ...importance, [currentQuestion.id]: value })
  }

  const handleImportanceDirectAnswer = (optionKey: ImportanceDirectOptionKey) => {
    setImportanceDirectAnswers({ ...importanceDirectAnswers, [currentQuestion.id]: optionKey })
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      localStorage.setItem("userAnswers", JSON.stringify(answers))
      localStorage.setItem("userImportance", JSON.stringify(importance))
      localStorage.setItem("userImportanceDirectAnswers", JSON.stringify(importanceDirectAnswers))
      router.push("/profil")
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const isAnswered = currentQuestion.responseType === "importance_direct" 
    ? importanceDirectAnswers[currentQuestion.id] !== undefined
    : answers[currentQuestion.id] !== undefined

  return (
    <div className="container max-w-3xl py-12 px-4 md:px-6 animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} sur {boussoleQuestions.length}
          </div>
        </div>
        <Progress
          value={progress}
          className="h-2.5 rounded-full bg-muted"
          indicatorClassName="bg-secondary transition-all duration-500 ease-out"
        />
      </div>

      <Card className="p-6 md:p-10 shadow-soft rounded-2xl bg-card">
        <div className="flex items-start gap-3 mb-6">
          <h2 className="text-2xl text-foreground leading-tight">{currentQuestion.text}</h2>{" "}
          {/* font-semibold is now in globals.css for h2 */}
          {currentQuestion.description && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-0.5 text-muted-foreground hover:text-secondary btn-base-effects"
                  >
                    <HelpCircle className="h-5 w-5" />
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

        <div className="grid gap-3 mb-8">
          {currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
            // Questions d'importance directe
            currentQuestion.importanceDirectOptions.map((optionKey) => {
              const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
              const isSelected = importanceDirectAnswers[currentQuestion.id] === optionKey;
              
              return (
                <Button
                  key={optionKey}
                  variant={isSelected ? "default" : "outline"}
                  className={`justify-start h-auto py-4 px-5 text-left rounded-xl 
                    ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground shadow-soft ring-2 ring-secondary/50"
                        : "bg-background hover:bg-secondary/10 hover:border-secondary/50 text-foreground border-border"
                    } btn-base-effects`}
                  onClick={() => handleImportanceDirectAnswer(optionKey)}
                >
                  {isSelected && (
                    <CheckCircle2 className="mr-3 h-5 w-5 text-secondary-foreground/80" />
                  )}
                  {labelText}
                </Button>
              )
            })
          ) : (
            // Questions d'accord/désaccord (standard)
            currentQuestion.agreementOptions.map((optionKey) => {
              const labelText = getAgreementLabel(currentQuestion, optionKey);
              const isSelected = answers[currentQuestion.id] === optionKey;
              
              return (
                <Button
                  key={optionKey}
                  variant={isSelected ? "default" : "outline"}
                  className={`justify-start h-auto py-4 px-5 text-left rounded-xl 
                    ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground shadow-soft ring-2 ring-secondary/50"
                        : "bg-background hover:bg-secondary/10 hover:border-secondary/50 text-foreground border-border"
                    } btn-base-effects`}
                  onClick={() => handleAnswer(optionKey)}
                >
                  {isSelected && (
                    <CheckCircle2 className="mr-3 h-5 w-5 text-secondary-foreground/80" />
                  )}
                  {labelText}
                </Button>
              )
            })
          )}
        </div>

        {isAnswered && currentQuestion.responseType !== "importance_direct" && answers[currentQuestion.id] !== "IDK" && (
          <div className="mb-8 animate-fadeIn">
            <h3 className="text-lg font-medium text-foreground mb-3">
              Quelle importance accordez-vous à cette question?
            </h3>
            <div className="flex justify-between gap-2">
              {currentQuestion.importanceOptions.map((value) => (
                <Button
                  key={value}
                  variant={importance[currentQuestion.id] === value ? "default" : "outline"}
                  className={`flex-1 rounded-xl btn-base-effects ${
                    // Added btn-base-effects
                    importance[currentQuestion.id] === value
                      ? "bg-accent text-accent-foreground shadow-soft"
                      : "bg-background hover:bg-accent/10 hover:border-accent/50 text-foreground border-border"
                  }`}
                  onClick={() => handleImportance(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-muted-foreground px-1">
              <span>Peu important</span>
              <span>Très important</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-muted-foreground hover:text-foreground hover:border-foreground/50 border-border btn-base-effects btn-hover-lift"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>

          <Button
            onClick={goToNextQuestion}
            disabled={!isAnswered}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 shadow-soft btn-base-effects btn-hover-lift btn-primary-hover-effects"
          >
            {currentQuestionIndex < boussoleQuestions.length - 1 ? (
              <>
                Suivant
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Voir mes résultats"
            )}
          </Button>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary btn-base-effects">
          <Link href="/">Quitter</Link>
        </Button>
      </div>
    </div>
  )
}
