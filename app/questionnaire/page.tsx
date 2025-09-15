"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
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
import { useSession } from "@/hooks/useSession"
import { useResults } from "@/hooks/useResults"
import { usePriorities } from "@/hooks/usePriorities"
import { useSweepTransitions, useReducedMotion, useAnimationPerformance } from "@/hooks/useSweepTransitions"
import { PageWithGlow } from "@/components/ui/background-glow"
import './styles.css'
import { ButtonWithEffects } from "@/components/ui/button-effects"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"
import { SwipeContainer, useTouchSupport } from "@/components/ui/swipe-container"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp } from "@/components/ui/animation-utils"


// questions constant is already defined from boussoleQuestions

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hasInitialized, setHasInitialized] = useState(false) // Nouveau: pour éviter les doubles initialisations
  
  // Hooks pour les animations optimisées
  const prefersReducedMotion = useReducedMotion()
  const { isLowPerformance, optimizedDuration } = useAnimationPerformance()
  const isTouchDevice = useTouchSupport()
  
  // Hook pour les transitions de balayage
  const {
    startSweepTransition,
    animationClasses,
    canInteract,
    cleanup
  } = useSweepTransitions({
    duration: prefersReducedMotion ? 150 : optimizedDuration,
    exitDuration: prefersReducedMotion ? 100 : Math.max(optimizedDuration - 100, 200),
    preloadNext: !isLowPerformance
  })
  
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

  // ✅ Calculer quelle question afficher (optimisé avec useMemo)
  const nextQuestionIndex = useMemo(() => {
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

  // ✅ Initialiser l'index de question une fois que les données sont chargées (optimisé)
  useEffect(() => {
    if (!isLoading && !hasInitialized) {
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
  }, [isLoading, hasInitialized, nextQuestionIndex, selectedPriorities, userAnswers])

  // ✅ Ne plus forcer la redirection automatique après l'initialisation
  // Ceci permettra à l'utilisateur de naviguer librement avec le bouton Précédent
  // La redirection automatique n'a lieu que lors de l'initialisation initiale
  
  // Désactivé car cela empêche la navigation manuelle vers les questions précédentes
  /*
  useEffect(() => {
    if (hasInitialized && !isLoading && nextQuestionIndex > currentQuestionIndex) {
      console.log(`🎯 Correction: aller à la question ${nextQuestionIndex + 1}`)
      setCurrentQuestionIndex(nextQuestionIndex)
    }
  }, [hasInitialized, isLoading, currentQuestionIndex, nextQuestionIndex])
  */

  useEffect(() => {
    // Logic for postal code check can be added here if needed
  }, [searchParams, router])

  // Cleanup des transitions au démontage
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

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

  // Calculer la progression basée sur la position actuelle dans le questionnaire
  const totalQuestions = boussoleQuestions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswer = async (optionKey: AgreementOptionKey) => {
    if (!canInteract) return // Empêcher les clics multiples pendant la transition
    
    try {
      // Démarrer la transition de balayage avec navigation
      startSweepTransition(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 'forward')
      
      // Sauvegarder en arrière-plan (non-bloquant)
      saveAgreementResponse(currentQuestion.id, optionKey).then(() => {
        console.log('📝 [Questionnaire] Réponse d\'accord sauvegardée pour Q' + (currentQuestionIndex + 1))
      }).catch(error => {
        console.error('❌ [Questionnaire] Erreur sauvegarde réponse d\'accord:', error)
      })
      
    } catch (error) {
      console.error('❌ [Questionnaire] Erreur navigation:', error)
    }
  }

  const handleImportanceDirectAnswer = async (optionKey: ImportanceDirectOptionKey) => {
    if (!canInteract) return // Empêcher les clics multiples pendant la transition
    
    try {
      // Démarrer la transition de balayage avec navigation
      startSweepTransition(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 'forward')
      
      // Sauvegarder en arrière-plan (non-bloquant)
      saveImportanceDirectResponse(currentQuestion.id, optionKey).then(() => {
        console.log('📝 [Questionnaire] Réponse d\'importance directe sauvegardée pour Q' + (currentQuestionIndex + 1))
      }).catch(error => {
        console.error('❌ [Questionnaire] Erreur sauvegarde réponse d\'importance:', error)
      })
      
    } catch (error) {
      console.error('❌ [Questionnaire] Erreur navigation:', error)
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

  const goToNextQuestion = useCallback(() => {
    if (!canInteract) return // Empêcher les clics multiples pendant la transition
    
    console.log('➡️ [Questionnaire] goToNextQuestion appelée:', {
      currentQuestionIndex,
      totalQuestions: boussoleQuestions.length,
      isLastQuestion: currentQuestionIndex === boussoleQuestions.length - 1
    })
    
    if (currentQuestionIndex < boussoleQuestions.length - 1) {
      console.log('📝 [Questionnaire] Passage à la question suivante')
      startSweepTransition(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 'forward')
    } else {
      // ✅ Questionnaire terminé → Résultats !
      console.log('🎯 [Questionnaire] Questionnaire complet, redirection vers les résultats')
      router.push("/resultats")
    }
  }, [canInteract, currentQuestionIndex, startSweepTransition, router])

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0 && canInteract) {
      startSweepTransition(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }, 'backward')
    }
  }, [currentQuestionIndex, canInteract, startSweepTransition])

  // Gestionnaires pour les gestes de balayage tactiles
  const handleSwipeLeft = useCallback(() => {
    // Balayage vers la gauche = question suivante (uniquement si répondue)
    if (isAnswered && canInteract && currentQuestionIndex < boussoleQuestions.length - 1) {
      goToNextQuestion()
    }
  }, [isAnswered, canInteract, currentQuestionIndex, goToNextQuestion])

  const handleSwipeRight = useCallback(() => {
    // Balayage vers la droite = question précédente
    if (canInteract && currentQuestionIndex > 0) {
      goToPreviousQuestion()
    }
  }, [canInteract, currentQuestionIndex, goToPreviousQuestion])

  // État de chargement pendant l'initialisation
  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-green mx-auto mb-4"></div>
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


      {/* Contenu principal optimisé pour l&apos;espace vertical */}
      <div className="container max-w-4xl py-4 md:py-6 px-4 md:px-6 mobile-content-overlay section-contained flex flex-col questionnaire-compact">
        {/* Titre principal pour la hiérarchie des headings */}
        <h1 className="sr-only">Questionnaire Boussole Électorale Municipale Québec 2025</h1>
        
        {/* Breadcrumbs avec structured data */}
        <Breadcrumbs items={breadcrumbConfigs.questionnaire} />
        
        <div className="mb-3 progress-container">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} sur {boussoleQuestions.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(progress)}% complété
            </div>
          </div>
          <Progress
            value={progress}
            className="h-2 rounded-full bg-muted"
            indicatorClassName="bg-midnight-green transition-all duration-500 ease-out"
          />
        </div>

        <SwipeContainer
          onSwipeLeft={isTouchDevice ? handleSwipeLeft : undefined}
          onSwipeRight={isTouchDevice ? handleSwipeRight : undefined}
          disabled={!isTouchDevice || !canInteract}
          threshold={60}
          className="swipe-wrapper flex-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{
                duration: prefersReducedMotion ? 0.15 : 0.4,
                ease: "easeInOut"
              }}
            >
              <Card className="card-question p-4 md:p-5 shadow-lg rounded-2xl bg-white w-full max-w-2xl mx-auto flex flex-col will-change-transform">
                <div className="flex items-start gap-3 mb-3 question-header">
            <h2 className={`question-title text-lg md:text-xl text-foreground leading-snug font-semibold ${animationClasses.contentClass}`}>
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

          <motion.div
            className="question-grid grid gap-1.5 mb-3 flex-1"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {currentQuestion.responseType === "priority_ranking" && currentQuestion.priorityOptions ? (
              // Questions de priorité
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Sélectionnez vos 3 enjeux les plus importants dans l&apos;ordre de priorité
                  </p>
                  <p className="text-xs text-midnight-green font-medium">
                    {Object.keys(selectedPriorities).length}/3 priorités sélectionnées
                  </p>
                </div>
                {/* Layout en 2 colonnes pour les écrans md et plus, 1 colonne sur mobile */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
                  initial="initial"
                  animate="animate"
                  variants={{
                    animate: {
                      transition: { staggerChildren: 0.06 }
                    }
                  }}
                >
                  {currentQuestion.priorityOptions.map((priority, index) => {
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
                      <motion.div
                        key={priority}
                        variants={fadeInUp}
                        custom={index}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ButtonWithEffects
                          variant={isSelected ? "standard" : "subtle"}
                          disabled={!canSelect && !isSelected}
                          className={`option-button justify-between py-4 md:py-5 px-4 md:px-5 text-center rounded-xl text-sm md:text-base font-medium min-h-[48px] md:min-h-[52px] w-full touch-manipulation
                            ${
                              isSelected
                                ? "bg-midnight-green text-white shadow-soft !border !border-midnight-green focus:outline-none focus:ring-2 focus:ring-midnight-green"
                                : canSelect
                                  ? "bg-white hover:bg-midnight-green/20 hover:text-foreground text-foreground transition-all duration-150 !border !border-midnight-green focus:outline-none focus:ring-2 focus:ring-midnight-green"
                                  : "bg-white/50 text-muted-foreground cursor-not-allowed opacity-60 !border !border-midnight-green/30"
                            }`}
                          onClick={() => handlePrioritySelection(priority)}
                        >
                          <span className="flex-1 leading-tight text-center">{priority}</span>
                          {isSelected && (
                            <span className="ml-2 flex items-center gap-1 md:gap-2 flex-shrink-0">
                              <span className="text-base md:text-lg">{getRankEmoji(rank)}</span>
                              <span className="text-xs font-bold">#{rank}</span>
                            </span>
                          )}
                        </ButtonWithEffects>
                      </motion.div>
                    )
                  })}
                </motion.div>

              </div>
            ) : currentQuestion.responseType === "importance_direct" && currentQuestion.importanceDirectOptions ? (
              // Questions d'importance directe
              currentQuestion.importanceDirectOptions.map((optionKey, index) => {
                const labelText = getImportanceDirectLabel(currentQuestion, optionKey);
                const isSelected = userImportanceDirectAnswers[currentQuestion.id] === optionKey;

                return (
                  <motion.div
                    key={optionKey}
                    variants={fadeInUp}
                    custom={index}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ButtonWithEffects
                      variant={isSelected ? "standard" : "subtle"}
                      className={`option-button justify-center py-4 md:py-5 px-4 md:px-5 text-center rounded-xl text-sm md:text-base font-medium min-h-[48px] md:min-h-[52px] w-full touch-manipulation
                        ${
                          isSelected
                            ? "bg-midnight-green text-white !border !border-midnight-green shadow-soft focus:outline-none focus:ring-2 focus:ring-midnight-green"
                            : "bg-white hover:bg-midnight-green/20 hover:text-foreground !border !border-midnight-green hover:shadow-md hover:shadow-midnight-green/20 text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-midnight-green"
                        }`}
                      onClick={() => handleImportanceDirectAnswer(optionKey)}
                    >
                      {isSelected && (
                        <CheckCircle2 className="mr-2 h-4 w-4 text-white/80" />
                      )}
                      {labelText}
                    </ButtonWithEffects>
                  </motion.div>
                )
              })
            ) : (
              // Questions d'accord/désaccord (standard)
              currentQuestion.agreementOptions.map((optionKey, index) => {
                const labelText = getAgreementLabel(currentQuestion, optionKey);
                const isSelected = userAnswers[currentQuestion.id] === optionKey;

                return (
                  <motion.div
                    key={optionKey}
                    variants={fadeInUp}
                    custom={index}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ButtonWithEffects
                      variant={isSelected ? "standard" : "subtle"}
                    className={`option-button justify-center py-4 md:py-5 px-4 md:px-5 text-center rounded-xl text-sm md:text-base font-medium min-h-[48px] md:min-h-[52px] w-full touch-manipulation
                      ${
                        isSelected
                          ? "bg-midnight-green text-white !border !border-midnight-green shadow-soft focus:outline-none focus:ring-2 focus:ring-midnight-green"
                          : "bg-white hover:bg-midnight-green/20 hover:text-foreground !border !border-midnight-green hover:shadow-md hover:shadow-midnight-green/20 text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-midnight-green"
                      } ${animationClasses.optionClass}`}
                    onClick={() => handleAnswer(optionKey)}
                  >
                    {isSelected && (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-white/80" />
                    )}
                      {labelText}
                    </ButtonWithEffects>
                  </motion.div>
                )
              })
            )}
          </motion.div>

          <div className="navigation-buttons flex flex-col xs:flex-row justify-between gap-3 mt-auto pt-4">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 rounded-xl px-5 py-3 md:px-6 md:py-4 text-muted-foreground hover:text-foreground hover:border-foreground/50 border-border btn-base-effects btn-hover-lift text-sm md:text-base min-h-[48px] md:min-h-[52px] w-full xs:w-auto touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
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
                className="flex items-center gap-2 bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl px-5 py-3 md:px-6 md:py-4 shadow-soft btn-base-effects btn-hover-lift btn-primary-hover-effects font-medium text-sm md:text-base min-h-[48px] md:min-h-[52px] w-full xs:w-auto transition-transform duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-midnight-green"
              >
                Terminer
              </Button>
            )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </SwipeContainer>

        <div className="mt-1 text-center">
          <Button variant="link" asChild className="text-xs text-muted-foreground hover:text-midnight-green btn-base-effects py-1">
            <Link href="/">Quitter</Link>
          </Button>
        </div>
      </div>
    </PageWithGlow>
  )
}
