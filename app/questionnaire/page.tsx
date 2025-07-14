"use client"

import type { Metadata } from "next"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSearchParams, useRouter } from "next/navigation"
import { boussoleQuestions, getAgreementLabel, getImportanceDirectLabel } from "@/lib/boussole-data"
import type { AgreementOptionKey, ImportanceDirectOptionKey } from "@/lib/boussole-data"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import { useResults } from "@/hooks/useResults"
import { usePriorities } from "@/hooks/usePriorities"
import { PageWithGlow } from "@/components/ui/background-glow"
import { ButtonWithEffects } from "@/components/ui/button-effects"


// questions constant is already defined from boussoleQuestions

// Métadonnées SEO optimisées pour la page questionnaire
export const metadata: Metadata = {
  title: "Questionnaire Boussole Électorale Municipale 2025 | Québec",
  description: "Questionnaire de la boussole électorale spécialisée MUNICIPALE : 21 questions sur les enjeux locaux de Québec 2025. Bruno Marchand, tramway, logement, environnement. Découvrez vos affinités avec les partis municipaux en 5 minutes !",
  keywords: [
    // Parasitage + spécialisation municipale
    "boussole électorale",
    "boussole électorale municipale", 
    "boussole électorale locale",
    "boussole électorale 2025",
    "la boussole électorale",
    "boussole électorale québec",
    "bruno marchand",
    "élections municipales 2025",
    "politique gauche droite",
    "bruno marchand tramway",
    "maire de québec",
    "questionnaire politique municipal"
  ].join(", "),
  openGraph: {
    title: "Questionnaire Boussole Électorale Municipale Québec 2025",
    description: "La seule boussole électorale dédiée aux élections municipales. 21 questions sur les enjeux locaux de votre ville.",
    type: "website"
  }
}

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0) // Pour forcer le re-render avec animations
  const [hasInitialized, setHasInitialized] = useState(false) // Nouveau: pour éviter les doubles initialisations
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Référence pour le bouton "Terminer"
  const terminateButtonRef = useRef<HTMLButtonElement>(null)

  // ✅ Intégration des hooks (simplifié)
  const { sessionToken, isSessionValid, isLoading: sessionLoading, error: sessionError } = useSession()
  const {
    // État des réponses
    isLoading: responsesLoading,
    error: responsesError,
    
    // Actions pour sauvegarder
    saveAgreementResponse,
    saveImportanceDirectResponse,
    
    // Utilitaires
    getResponseCounts,
    
    // Aliases pour compatibilité
    userAnswers,
    userImportanceDirectAnswers
  } = useUserResponses()

  useResults()

  // ✅ Hook pour gérer les priorités (simplifié)
  const { 
    priorities: selectedPriorities, 
    savePriorities,
    isLoading: prioritiesLoading,
    error: prioritiesError
  } = usePriorities()

  // ✅ État de chargement global (combiné)
  const isLoading = sessionLoading || responsesLoading || prioritiesLoading
  const globalError = sessionError || responsesError || prioritiesError

  // ✅ Calculer quelle question afficher basée sur les réponses existantes (simplifié)
  const calculateNextQuestionIndex = useCallback(() => {
    // Parcourir toutes les questions pour trouver la première non répondue
    for (let i = 0; i < boussoleQuestions.length; i++) {
      const question = boussoleQuestions[i]
      
      // ✅ Vérifier si cette question a été répondue (logique simplifiée)
      let hasResponse = false
      if (question.responseType === "importance_direct") {
        hasResponse = userImportanceDirectAnswers[question.id] !== undefined
      } else if (question.responseType === "priority_ranking") {
        // ✅ Pour les questions de priorité, vérifier les priorités sélectionnées
        hasResponse = Object.keys(selectedPriorities).length === 3
      } else {
        hasResponse = userAnswers[question.id] !== undefined
      }
      
      // Si cette question n'a pas de réponse, c'est celle qu'on doit afficher
      if (!hasResponse) {
        return i
      }
    }
    
    // Si toutes les questions ont été répondues, aller à la dernière
    return boussoleQuestions.length - 1
  }, [userAnswers, userImportanceDirectAnswers, selectedPriorities])

  // ✅ Initialiser l'index de question une fois que les données sont chargées (simplifié)
  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      const nextQuestionIndex = calculateNextQuestionIndex()
      
      console.log('🔍 [Questionnaire] Vérification position:', {
        userAnswersCount: Object.keys(userAnswers).length,
        prioritiesCount: Object.keys(selectedPriorities).length,
        nextQuestionIndex,
        totalQuestions: boussoleQuestions.length
      })
      
      // ✅ Continuer là où on en était
      setCurrentQuestionIndex(nextQuestionIndex)
      setHasInitialized(true)
      console.log('🎯 [Questionnaire] Reprise à la question', nextQuestionIndex + 1)
    }
  }, [isLoading, hasInitialized, userAnswers, selectedPriorities, calculateNextQuestionIndex])

  // ✅ Re-calculer si les données changent après l'initialisation (simplifié)
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
  const isAnswered = (() => {
    if (currentQuestion.responseType === "importance_direct") {
      return userImportanceDirectAnswers[currentQuestion.id] !== undefined
    } else if (currentQuestion.responseType === "priority_ranking") {
      // Pour les questions de priorité, vérifier qu'on a bien 3 priorités sélectionnées
      return Object.keys(selectedPriorities).length === 3
    } else {
      return userAnswers[currentQuestion.id] !== undefined
    }
  })()

  // Calculer le nombre de questions réellement répondues
  const answeredQuestionsCount = getResponseCounts().agreement
  const totalQuestions = boussoleQuestions.length
  const progress = (answeredQuestionsCount / totalQuestions) * 100

  const handleAnswer = async (optionKey: AgreementOptionKey) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await saveAgreementResponse(currentQuestion.id, optionKey)
      
      console.log('📝 [Questionnaire] Réponse d\'accord sauvegardée pour Q' + (currentQuestionIndex + 1))
      
      // ✅ Navigation normale vers la question suivante
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
      
    } catch (error) {
      console.error('❌ [Questionnaire] Erreur sauvegarde réponse d\'accord:', error)
    }
  }

  const handleImportanceDirectAnswer = async (optionKey: ImportanceDirectOptionKey) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await saveImportanceDirectResponse(currentQuestion.id, optionKey)
      
      console.log('📝 [Questionnaire] Réponse d\'importance directe sauvegardée pour Q' + (currentQuestionIndex + 1))
      
      // ✅ Navigation normale vers la question suivante
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
      
    } catch (error) {
      console.error('❌ [Questionnaire] Erreur sauvegarde réponse d\'importance:', error)
    }
  }

  // Handler pour les questions de priorité avec mise à jour locale immédiate
  const handlePrioritySelection = async (priority: string) => {
    console.log('🎯 Sélection de priorité:', priority)
    console.log('📊 Priorités actuelles:', selectedPriorities)
    const currentRank = selectedPriorities[priority]
    const newPriorities = { ...selectedPriorities }

    if (currentRank) {
      // Si déjà sélectionné, on le désélectionne et on réorganise
      console.log('🗑️ Désélection de:', priority, 'rang actuel:', currentRank)
      delete newPriorities[priority]
      // Réorganiser les rangs
      Object.keys(newPriorities).forEach(key => {
        if (newPriorities[key] > currentRank) {
          newPriorities[key]--
        }
      })
    } else {
      // Ajouter la nouvelle priorité
      const nextRank = Object.keys(newPriorities).length + 1
      if (nextRank <= 3) {
        console.log('✅ Ajout de:', priority, 'au rang:', nextRank)
        newPriorities[priority] = nextRank
      } else {
        console.log('❌ Impossible d\'ajouter:', priority, 'limite de 3 atteinte')
        return // Ne pas continuer si on ne peut pas ajouter
      }
    }

    console.log('💾 Nouvelles priorités à sauvegarder:', newPriorities)
    console.log('📈 Comparaison avant/après:', {
      avant: selectedPriorities,
      après: newPriorities,
      différence: Object.keys(newPriorities).length - Object.keys(selectedPriorities).length
    })
    
    // Sauvegarder dans Supabase en arrière-plan sans bloquer l'UI
    // IMPORTANT: savePriorities met déjà à jour l'état local dans usePriorities
    savePriorities(newPriorities).then(() => {
      console.log('✅ Priorités sauvegardées avec succès')
    }).catch(error => {
      console.error('❌ Erreur lors de la sauvegarde des priorités:', error)
      // Même en cas d'erreur, l'état local devrait rester mis à jour
    })
      
      // Si on vient de sélectionner la 3ème priorité, scroller vers le bouton "Terminer"
      if (Object.keys(newPriorities).length === 3) {
        setTimeout(() => {
          if (terminateButtonRef.current) {
            terminateButtonRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            })
            // Petit effet de mise en évidence du bouton
            terminateButtonRef.current.style.transform = 'scale(1.05)'
            setTimeout(() => {
              if (terminateButtonRef.current) {
                terminateButtonRef.current.style.transform = 'scale(1)'
              }
            }, 200)
          }
        }, 300) // Délai pour laisser l'animation de sélection se terminer
    }
  }

  // ✅ Handler pour sauvegarder les priorités (simplifié et robuste)
  const handlePrioritySave = async () => {
    console.log('💾 [Questionnaire] Sauvegarde des priorités:', selectedPriorities)
    console.log('🔍 [Questionnaire] Position actuelle:', {
      currentQuestionIndex,
      totalQuestions: boussoleQuestions.length,
      isLastQuestion: currentQuestionIndex === boussoleQuestions.length - 1
    })
    
    try {
      // ✅ Vérification simple des priorités
      if (Object.keys(selectedPriorities).length !== 3) {
        console.warn('⚠️ [Questionnaire] Tentative de sauvegarde avec moins de 3 priorités')
        return
      }

      // ✅ Vérification de la session
      if (!sessionToken || !isSessionValid) {
        console.error('❌ [Questionnaire] Session invalide pour sauvegarde priorités')
        return
      }

      // ✅ Sauvegarder via le hook
      await savePriorities(selectedPriorities)
      console.log('✅ [Questionnaire] Priorités sauvegardées avec succès')
      
      // ✅ Navigation après la Q21 → Profil (pas résultats!)
      console.log('🎯 [Questionnaire] Q21 complétée, redirection vers le profil')
      
      // Délai pour permettre à l'utilisateur de voir ses sélections
      setTimeout(() => {
        router.push('/profil')
      }, 1000)
      
    } catch (error) {
      console.error('❌ [Questionnaire] Erreur sauvegarde priorités:', error)
    }
  }

  const goToNextQuestion = () => {
    console.log('➡️ [Questionnaire] goToNextQuestion appelée:', {
      currentQuestionIndex,
      totalQuestions: boussoleQuestions.length,
      isLastQuestion: currentQuestionIndex === boussoleQuestions.length - 1
    })
    
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      console.log('📝 [Questionnaire] Passage à la question suivante')
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
    } else {
      // ✅ Questionnaire terminé → Résultats !
      console.log('🎯 [Questionnaire] Questionnaire complet, redirection vers les résultats')
      router.push("/resultats")
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


      return (
      <PageWithGlow 
        intensity="subtle"
        className="relative questionnaire-compact mobile-constrained"
      >

      {/* Affichage d&apos;erreur uniquement si problème critique */}
      {globalError && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50">
          <p>⚠️ Problème de connexion</p>
          <p className="text-xs opacity-80">Vos réponses sont sauvegardées localement</p>
        </div>
      )}

      {/* Image décorative - jardinage centrée à droite (desktop) */}
      <div className="hidden lg:block">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none decorative-frame-right">
          <Image 
            src="/Image_parc_jardinage.png" 
            alt="" 
            width={320}
            height={240}
            quality={90}
            className="object-contain decorative-image-right"
          />
        </div>
      </div>

      {/* Contenu principal optimisé pour l&apos;espace vertical */}
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
                      <span className="sr-only">Plus d&apos;informations</span>
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
            {currentQuestion.responseType === "priority_ranking" && currentQuestion.priorityOptions ? (
              // Questions de priorité
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Sélectionnez vos 3 enjeux les plus importants dans l&apos;ordre de priorité
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {Object.keys(selectedPriorities).length}/3 priorités sélectionnées
                  </p>
                </div>
                {/* Layout en 2 colonnes pour les écrans md et plus, 1 colonne sur mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {currentQuestion.priorityOptions.map((priority) => {
                    const rank = selectedPriorities[priority]
                    const isSelected = rank !== undefined
                    const canSelect = !isSelected && Object.keys(selectedPriorities).length < 3
                    
                    const getRankEmoji = (rank: number) => {
                      switch(rank) {
                        case 1: return "🥇"
                        case 2: return "🥈" 
                        case 3: return "🥉"
                        default: return ""
                      }
                    }
                    
                    return (
                      <ButtonWithEffects
                        key={priority}
                        variant={isSelected ? "standard" : "subtle"}
                        disabled={!canSelect && !isSelected}
                        className={`option-button justify-between py-3 md:py-4 px-3 md:px-4 text-left rounded-xl text-sm md:text-base font-medium min-h-0 w-full
                          ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-soft border-2 border-primary"
                              : canSelect 
                                ? "bg-background hover:bg-primary/20 hover:text-foreground text-foreground transition-all duration-150 border-2 border-transparent hover:border-primary/30"
                                : "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60"
                          } ${!isTransitioning ? 'option-button-enter' : ''}`}
                        onClick={() => handlePrioritySelection(priority)}
                      >
                        <span className="flex-1 leading-tight">{priority}</span>
                        {isSelected && (
                          <span className="ml-2 flex items-center gap-1 md:gap-2 flex-shrink-0">
                            <span className="text-base md:text-lg">{getRankEmoji(rank)}</span>
                            <span className="text-xs font-bold">#{rank}</span>
                          </span>
                        )}
                      </ButtonWithEffects>
                    )
                  })}
                </div>

              </div>
            ) : currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
              // Questions d'importance directe
              currentQuestion.importanceDirectOptions.map((optionKey) => {
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
              currentQuestion.agreementOptions.map((optionKey) => {
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

            {/* Bouton "Terminer" seulement sur la dernière question */}
            {currentQuestionIndex === boussoleQuestions.length - 1 && (
              <Button
                ref={terminateButtonRef}
                onClick={() => {
                  if (currentQuestion.responseType === "priority_ranking") {
                    // Pour les questions de priorité, sauvegarder les priorités sélectionnées
                    if (Object.keys(selectedPriorities).length === 3) {
                      handlePrioritySave()
                    }
                  } else {
                    // Pour les autres types de questions, utiliser la logique normale
                    goToNextQuestion()
                  }
                }}
                disabled={
                  currentQuestion.responseType === "priority_ranking" 
                    ? Object.keys(selectedPriorities).length !== 3
                    : !isAnswered
                }
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 shadow-soft btn-base-effects btn-hover-lift btn-primary-hover-effects font-medium text-sm transition-transform duration-200"
              >
                Terminer
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
