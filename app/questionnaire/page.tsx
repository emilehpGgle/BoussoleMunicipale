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
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"

// questions constant is already defined from boussoleQuestions

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0) // Pour forcer le re-render avec animations
  const router = useRouter()
  const searchParams = useSearchParams()

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

  useEffect(() => {
    // Logic for postal code check can be added here if needed
  }, [searchParams, router])

  const currentQuestion = boussoleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / boussoleQuestions.length) * 100

  const handleAnswer = async (optionKey: AgreementOptionKey) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await saveAgreementResponse(currentQuestion.id, optionKey)
      
      // Auto-progression avec animation "swoosh" (sauf dernière question)
      if (currentQuestionIndex < boussoleQuestions.length - 1) {
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
      
      // Auto-progression avec animation "swoosh" (sauf dernière question)  
      if (currentQuestionIndex < boussoleQuestions.length - 1) {
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
      <div className="container max-w-3xl py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de vos réponses...</p>
          {sessionToken && <p className="text-xs text-muted-foreground mt-1">Synchronisation avec le cloud</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Affichage d'erreur si problème de synchronisation */}
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Synchronisation échouée</p>
          <p className="text-xs opacity-80">Vos réponses sont sauvegardées localement</p>
        </div>
      )}

      {/* Indicateur de sauvegarde */}
      {isSaving && (
        <div className="fixed top-4 left-4 bg-primary/10 border border-primary/20 text-primary px-3 py-2 rounded-lg text-sm z-50 flex items-center gap-2">
          <div className="animate-spin rounded-full h-3 w-3 border-b border-primary"></div>
          <span>Sauvegarde...</span>
        </div>
      )}

      {/* Image décorative - jardinage centrée à droite */}
      <div className="hidden lg:block">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none w-80 h-auto decorative-frame-right">
          <img 
            src="/Image_parc_jardinage.png" 
            alt="" 
            className="w-full h-full object-cover decorative-image-right"
          />
        </div>
      </div>

      <div className="container max-w-3xl py-2 px-4 md:px-6 animate-fadeIn flex flex-col min-h-screen relative z-10">
        <div className="mb-4">
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

        <Card key={questionKey} className={`p-4 md:p-6 shadow-soft rounded-2xl bg-card flex-1 flex flex-col ${isTransitioning ? 'question-exit' : 'question-enter'}`}>
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

          <div className={`grid gap-2 mb-4 flex-1 ${!isTransitioning ? 'question-content-enter' : ''}`}>
            {currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
              // Questions d'importance directe
              currentQuestion.importanceDirectOptions.map((optionKey, index) => {
                const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
                const isSelected = userImportanceDirectAnswers[currentQuestion.id] === optionKey;
                
                return (
                  <Button
                    key={optionKey}
                    variant={isSelected ? "default" : "outline"}
                    className={`justify-start py-4 px-4 text-left rounded-xl text-base font-medium min-h-0
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-soft border-2 border-primary"
                          : "bg-background hover:bg-primary/20 hover:border-primary hover:text-foreground text-foreground border-border transition-all duration-150 active:scale-[0.99]"
                      } btn-base-effects ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleImportanceDirectAnswer(optionKey)}
                  >
                    {isSelected && (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />
                    )}
                    {labelText}
                  </Button>
                )
              })
            ) : (
              // Questions d'accord/désaccord (standard)
              currentQuestion.agreementOptions.map((optionKey, index) => {
                const labelText = getAgreementLabel(currentQuestion, optionKey);
                const isSelected = userAnswers[currentQuestion.id] === optionKey;
                
                return (
                  <Button
                    key={optionKey}
                    variant={isSelected ? "default" : "outline"}
                    className={`justify-start py-4 px-4 text-left rounded-xl text-base font-medium min-h-0
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-soft border-2 border-primary"
                          : "bg-background hover:bg-primary/20 hover:border-primary hover:text-foreground text-foreground border-border transition-all duration-150 active:scale-[0.99]"
                      } btn-base-effects ${!isTransitioning ? 'option-button-enter' : ''}`}
                    onClick={() => handleAnswer(optionKey)}
                  >
                    {isSelected && (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary-foreground/80" />
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
    </div>
  )
}
