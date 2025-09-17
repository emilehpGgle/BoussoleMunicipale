"use client"

import { useState, useRef, ElementType } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, User, Home, Car, ChevronLeft, ChevronRight, Check, Edit3, ChevronDown, ChevronUp } from "lucide-react"
import { useProfile } from "@/hooks/useProfile"
import { useSession } from "@/hooks/useSession"
import { motion, AnimatePresence } from "motion/react"
import { fadeInUp } from "@/components/ui/animation-utils"

// Interface pour la structure d'une question de profil
interface ProfileQuestion {
  id: string
  text: string
  type: "button_horizontal" | "checkbox_multiple" | "priority_ranking_enhanced" | "text_area"
  category: "Informations de base" | "Contexte municipal" | "Enjeux"
  icon: ElementType
  options?: string[]
  placeholder?: string
  description?: string
}

// Données pour les questions de profil (organisées par page)
const profileQuestions: Record<'basic' | 'municipal' | 'issues', ProfileQuestion[]> = {
  // Page 1 - Informations de base
  basic: [
    {
      id: "age_group",
      text: "Dans quelle tranche d'âge vous situez-vous ?",
      type: "button_horizontal",
      category: "Informations de base",
      icon: User,
      options: ["18-24 ans", "25-34 ans", "35-44 ans", "45-54 ans", "55-64 ans", "65 ans et plus"],
    },
    {
      id: "gender",
      text: "Comment vous identifiez-vous ?",
      type: "button_horizontal", 
      category: "Informations de base",
      icon: User,
      options: ["Homme", "Femme", "Non-binaire", "Préfère ne pas dire"],
    },
    {
      id: "household_income",
      text: "Quel est le revenu annuel combiné de votre ménage (avant impôts) ?",
      type: "button_horizontal",
      category: "Informations de base", 
      icon: User,
      options: [
        "Moins de 30 000 $",
        "30 000 $ à 59 999 $", 
        "60 000 $ à 89 999 $",
        "90 000 $ à 119 999 $",
        "120 000 $ à 149 999 $",
        "150 000 $ et plus",
        "Préfère ne pas dire",
      ],
    },
    {
      id: "education_level",
      text: "Quel est votre plus haut niveau de scolarité complété ?",
      type: "button_horizontal",
      category: "Informations de base",
      icon: User,
      options: [
        "Secondaire ou moins",
        "Formation professionnelle/DEP",
        "Cégep/DEC",
        "Université (Baccalauréat)",
        "Université (Maîtrise/Doctorat)",
      ],
    },
  ],
  
  // Page 2 - Contexte municipal (logement d'abord, transport en dernier)
  municipal: [
    {
      id: "housing_status", 
      text: "Quel est votre statut de logement ?",
      type: "button_horizontal",
      category: "Contexte municipal",
      icon: Home,
      options: ["Propriétaire", "Locataire", "Logé chez famille/amis", "Autre"],
    },
    {
      id: "main_transport",
      text: "Quel(s) moyen(s) de transport utilisez-vous au quotidien ? (Sélectionnez tous ceux qui s'appliquent)",
      type: "button_horizontal",
      category: "Contexte municipal", 
      icon: Car,
      options: ["Automobile", "Transport en commun", "Vélo", "Marche", "Covoiturage", "Taxi/Uber", "Autre"],
    },
  ],
  
  // Page 3 - Enjeux (optionnel)
  issues: [
    // Note: Cette question est maintenant optionnelle et ne compte pas dans le total de progression
    // puisque les priorités municipales sont gérées dans le questionnaire principal (Q21)
  ]
}

export default function ProfilePage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const router = useRouter()
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Intégration des hooks sécurisés
  const { sessionToken: _sessionToken, isInitializing } = useSession()
  const {
    // État du profil
    profile,
    isLoading,
    error,
    
    // Actions pour sauvegarder
    updateProfileField,
    
    // Utilitaires
    getCompletionPercentage,
    
    // Alias pour compatibilité
  } = useProfile()

  // Obtenir toutes les questions dans l'ordre
  const getAllQuestions = () => [
    ...profileQuestions.basic,
    ...profileQuestions.municipal,
    ...profileQuestions.issues
  ]
  
  const allQuestions = getAllQuestions()

  // Vérifier si une question est complétée (pour l'affichage visuel)
  const isQuestionComplete = (question: ProfileQuestion) => {
    const answer = profile[question.id]
    
    if (question.type === "checkbox_multiple" || question.id === "main_transport") {
      return Array.isArray(answer) && answer.length > 0
    }
    
    if (question.type === "priority_ranking_enhanced") {
      return answer && typeof answer === "object" && Object.keys(answer).length > 0
    }
    
    if (question.type === "text_area") {
      // Pour l'affichage visuel : complété seulement si il y a du contenu
      return answer && answer.trim().length > 0
    }
    
    return answer !== undefined && answer !== ""
  }

  // Calculer le nombre de questions complétées
  const completedQuestions = allQuestions.filter(q => isQuestionComplete(q)).length
  const globalProgress = (completedQuestions / allQuestions.length) * 100

  const currentInfo = {
    title: "Votre profil",
    description: "Aidez-nous à mieux comprendre votre situation à Québec",
    step: "1/1"
  }

  const handleAnswerChange = async (questionId: string, value: string | string[] | Record<string, number>) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await updateProfileField(questionId, value)
      
      // Auto-passer à la question suivante après une réponse (sauf pour les text areas, questions multiples et la question transport)
      const currentQuestion = allQuestions[activeQuestionIndex]
      
      if (
        currentQuestion &&
        !["text_area", "priority_ranking_enhanced", "checkbox_multiple"].includes(
          currentQuestion.type
        ) &&
        currentQuestion.id !== "main_transport" // Exception pour la question transport qui permet sélections multiples
      ) {
        setTimeout(() => {
          if (activeQuestionIndex < allQuestions.length - 1) {
            const nextIndex = activeQuestionIndex + 1
            setActiveQuestionIndex(nextIndex)
            
            // Scroll doux vers la question suivante après un petit délai
            setTimeout(() => {
              const nextQuestion = allQuestions[nextIndex]
              const nextQuestionElement = questionRefs.current[nextQuestion.id]
              if (nextQuestionElement) {
                nextQuestionElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center', // Centre la question dans la vue
                  inline: 'nearest'
                })
              }
            }, 100) // Délai pour laisser l'accordéon s'ouvrir
          } else {
            // C'est la dernière question - soumettre le profil
            if (canSubmit()) {
              handleSubmit()
            }
          }
        }, 300) // Petit délai pour voir la sélection
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du profil:', err)
      // L'erreur est déjà gérée par le hook, on peut continuer l'UI
    }
  }



  const handlePriorityRanking = async (questionId: string, rankings: Record<string, number>) => {
    try {
      // Sauvegarder via notre hook sécurisé
      await updateProfileField(questionId, rankings)
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du ranking:', err)
      // L'erreur est déjà gérée par le hook, on peut continuer l'UI
    }
  }

  // Vérifier si une question est requise pour la progression (différent de l'affichage visuel)
  const isQuestionRequiredForProgression = (question: ProfileQuestion) => {
    const answer = profile[question.id]
    
    if (question.type === "checkbox_multiple" || question.id === "main_transport") {
      return Array.isArray(answer) && answer.length > 0
    }
    
    if (question.type === "priority_ranking_enhanced") {
      return answer && typeof answer === "object" && Object.keys(answer).length > 0
    }
    
    if (question.type === "text_area") {
      return true // Toujours optionnel pour la progression
    }
    
    return answer !== undefined && answer !== ""
  }

  // Vérifier si toutes les questions requises sont complétées
  const isCurrentPageComplete = () => {
    return allQuestions.every(q => isQuestionRequiredForProgression(q))
  }

  // Vérifier si tout le questionnaire est complété
  const canSubmit = () => {
    return allQuestions.every(q => isQuestionRequiredForProgression(q))
  }

  const handleNext = () => {
    if (activeQuestionIndex < allQuestions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1)
      // Scroll vers la question suivante
      setTimeout(() => {
        const nextQuestion = allQuestions[activeQuestionIndex + 1]
        if (nextQuestion && questionRefs.current[nextQuestion.id]) {
          questionRefs.current[nextQuestion.id]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 100)
    } else {
      // Dernière question - soumettre
      if (canSubmit()) {
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1)
      // Scroll vers la question précédente
      setTimeout(() => {
        const prevQuestion = allQuestions[activeQuestionIndex - 1]
        if (prevQuestion && questionRefs.current[prevQuestion.id]) {
          questionRefs.current[prevQuestion.id]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 100)
    }
  }

  const handleSubmit = () => {
    console.log('📋 [Profil] Profil complété, redirection vers les résultats')
    router.push("/resultats")
  }

  // Obtenir l'aperçu d'une réponse pour affichage compact
  const getAnswerPreview = (question: ProfileQuestion) => {
    const answer = profile[question.id]
    
    if (!answer) return "Non répondu"
    
    if (question.type === "checkbox_multiple" || question.id === "main_transport") {
      return Array.isArray(answer) ? `${answer.length} sélection(s)` : "Non répondu"
    }
    
    if (question.type === "priority_ranking_enhanced") {
      const count = Object.keys(answer).length
      return count > 0 ? `${count} priorité(s) classée(s)` : "Non répondu"
    }
    
    if (question.type === "text_area") {
      return answer && answer.trim().length > 0 ? "Réponse fournie" : "Pas encore rempli"
    }
    
    return answer.toString()
  }

  // Composant pour les boutons horizontaux (gère sélection simple et multiple)
  const renderHorizontalButtons = (question: ProfileQuestion) => {
    // Pour la question transport, permettre sélections multiples
    const isMultipleSelect = question.id === "main_transport"
    
    if (isMultipleSelect) {
      const selectedValues = (profile[question.id] as string[]) || []
      
      const handleMultipleSelection = (option: string) => {
        const newValues = selectedValues.includes(option)
          ? selectedValues.filter((v) => v !== option)
          : [...selectedValues, option]
        handleAnswerChange(question.id, newValues)
      }

      return (
        <motion.div className="flex flex-wrap gap-2" initial="initial" animate="animate" variants={{
          animate: { transition: { staggerChildren: 0.05 } }
        }}>
          {question.options?.map((option, index) => (
            <motion.div
              key={option}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={selectedValues.includes(option) ? "default" : "outline"}
                onClick={() => handleMultipleSelection(option)}
                className={`
                  p-3 h-auto text-left justify-start text-sm font-medium transition-all duration-200
                  ${selectedValues.includes(option)
                    ? "bg-midnight-green text-white border-midnight-green shadow-sm"
                    : "hover:bg-white/50 hover:border-secondary"
                  }
                `}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )
    } else {
      // Sélection simple pour les autres questions
      const selectedValue = profile[question.id] as string

      return (
        <motion.div className="flex flex-wrap gap-2" initial="initial" animate="animate" variants={{
          animate: { transition: { staggerChildren: 0.05 } }
        }}>
          {question.options?.map((option, index) => (
            <motion.div
              key={option}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={selectedValue === option ? "default" : "outline"}
                onClick={() => handleAnswerChange(question.id, option)}
                className={`
                  p-3 h-auto text-left justify-start text-sm font-medium transition-all duration-200
                  ${selectedValue === option
                    ? "bg-midnight-green text-white border-midnight-green shadow-sm"
                    : "hover:bg-white/50 hover:border-secondary"
                  }
                `}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )
    }
  }

  const renderCheckboxMultiple = (question: ProfileQuestion) => {
    const selectedValues = (profile[question.id] as string[]) || []
    
    const handleCheckboxChange = (option: string) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option]
      handleAnswerChange(question.id, newValues)
    }

    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <div key={`${question.id}-${index}`} className="flex items-center space-x-2">
            <Checkbox
              id={`${question.id}-${index}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <Label htmlFor={`${question.id}-${index}`} className="font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
    )
  }

  const renderEnhancedPriorityRanking = (question: ProfileQuestion) => {
    const currentRankings = profile[question.id] || {}
    
    const toggleItemRanking = (item: string) => {
      const newRankings = { ...currentRankings }
      
      if (newRankings[item]) {
        // Remove item and shift others down
        const removedRank = newRankings[item]
        delete newRankings[item]
        
        Object.keys(newRankings).forEach(key => {
          if (newRankings[key] > removedRank) {
            newRankings[key] -= 1
          }
        })
      } else {
        // Add item with next available rank (max 3)
        const existingRanks = Object.values(newRankings) as number[]
        const maxRank = Math.max(0, ...existingRanks)
        
        if (maxRank < 3) {
          newRankings[item] = maxRank + 1
        }
      }
      
      handlePriorityRanking(question.id, newRankings)
    }

    const getRankForItem = (item: string): number | null => {
      return currentRankings[item] || null
    }

    const getRankColor = (rank: number) => {
      switch (rank) {
        case 1: return "bg-green-500 border-green-600"
        case 2: return "bg-yellow-500 border-yellow-600"
        case 3: return "bg-orange-500 border-orange-600"
        default: return "bg-gray-400 border-gray-500"
      }
    }

    const getRankEmoji = (rank: number) => {
      switch (rank) {
        case 1: return "🥇"
        case 2: return "🥈"
        case 3: return "🥉"
        default: return ""
      }
    }

    const selectedCount = Object.keys(currentRankings).length

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {selectedCount}/3 priorités sélectionnées
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options?.map((option: string, index: number) => {
            const rank = getRankForItem(option)
            const isSelected = rank !== null
            
            return (
              <Button
                key={index}
                variant={isSelected ? "default" : "outline"}
                onClick={() => toggleItemRanking(option)}
                className={`
                  p-3 h-auto text-left justify-between text-sm font-medium transition-all duration-200 relative
                  ${isSelected 
                    ? "bg-midnight-green text-white border-midnight-green shadow-sm" 
                    : "hover:bg-white/50 hover:border-secondary"
                  }
                `}
              >
                <span className="flex-1">{option}</span>
                {isSelected && (
                  <div className={`
                    inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ml-2
                    ${getRankColor(rank!)}
                  `}>
                    {rank}
                  </div>
                )}
              </Button>
            )
          })}
        </div>
        
        {selectedCount > 0 && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Vos priorités :</p>
            <div className="space-y-1">
              {Object.entries(currentRankings)
                .sort(([,a], [,b]) => (a as number) - (b as number))
                .map(([item, rank]) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{getRankEmoji(rank as number)}</span>
                    <span>{item}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderTextArea = (question: ProfileQuestion) => {
    return (
      <div className="space-y-2">
        {question.description && (
          <p className="text-sm text-muted-foreground">
            {question.description}
          </p>
        )}
        <Textarea
          id={question.id}
          value={profile[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full min-h-[100px] p-3 border-2 rounded-lg resize-vertical text-sm"
          rows={3}
        />
      </div>
    )
  }

  const renderQuestionInput = (question: ProfileQuestion) => {
    switch (question.type) {
      case "button_horizontal":
        return renderHorizontalButtons(question)
        
      case "checkbox_multiple":
        return renderCheckboxMultiple(question)
        
      case "priority_ranking_enhanced":
        return renderEnhancedPriorityRanking(question)
        
      case "text_area":
        return renderTextArea(question)
        
      default:
        return <p>Type de question non supporté.</p>
    }
  }

  // État de chargement pendant l'initialisation - plus patient
  if (isLoading || isInitializing) {
    return (
      <div className="container max-w-4xl py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-green mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {isInitializing ? 'Initialisation de votre session...' : 'Chargement de votre profil...'}
          </p>
          {_sessionToken && !isInitializing && (
            <p className="text-xs text-muted-foreground mt-1">Synchronisation avec le cloud</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mobile-constrained">

      {/* Affichage d'erreur uniquement si problème critique et après chargement initial */}
      {error && !isLoading && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm z-50 animate-slideInFromRight">
          <p>⚠️ Problème de connexion</p>
          <p className="text-xs opacity-80">Vos données sont sauvegardées localement</p>
        </div>
      )}

      {/* Image décorative - chien et maître centrée à gauche (réduite) (desktop) */}
      <div className="hidden lg:block">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none decorative-frame-left">
          <Image 
            src="/Image_parc_chien_maitre.png" 
            alt="" 
            width={256}
            height={192}
            quality={90}
            className="object-contain decorative-image-left"
          />
        </div>
      </div>

      {/* Contenu principal avec overlay mobile */}
      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-8 animate-fadeIn relative z-10 mobile-content-overlay mobile-gradient-bg lg:bg-none section-contained">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Étape {currentInfo.step}
          </Badge>
          {/* Affichage du pourcentage de complétion */}
          <Badge variant="outline" className="text-xs px-2 py-1">
            {getCompletionPercentage()}% complété
          </Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {currentInfo.title}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {currentInfo.description}
        </p>
        

      </div>

      {/* Progress global */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progression globale: {completedQuestions}/{allQuestions.length} questions
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(globalProgress)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-midnight-green to-teal-main-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${globalProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Questions - Accordéon intelligent pour toutes les questions */}
      <div className="space-y-3 mb-6">
        {allQuestions.map((question, index) => {

          const isCompleted = isQuestionComplete(question)
          const isActive = index === activeQuestionIndex
          const isFuture = index > activeQuestionIndex && !isCompleted

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
              <Card
                ref={(el) => { questionRefs.current[question.id] = el }}
                className={`shadow-soft rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white border-midnight-green/50 shadow-lg"
                    : isCompleted
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-white/30 border-muted"
                }`}
              >
                {/* En-tête de question (toujours visible) */}
                <CardHeader 
                  className={`pb-3 pt-4 cursor-pointer transition-all duration-200 ${
                    !isFuture ? "hover:bg-white/10" : ""
                  }`}
                  onClick={() => !isFuture && setActiveQuestionIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icône d'état */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${isCompleted 
                          ? "bg-green-500 text-white" 
                          : isActive 
                            ? "bg-midnight-green text-white" 
                            : "bg-white text-muted-foreground"
                        }
                      `}>
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : isActive ? (
                          <span className="text-sm font-bold">{index + 1}</span>
                        ) : (
                          <span className="text-sm">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Titre de la question */}
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium transition-all duration-200 ${
                          isActive ? "text-foreground" : isFuture ? "text-muted-foreground" : "text-foreground/80"
                        }`}>
                          {question.text}
                        </h3>
                        
                        {/* Aperçu de la réponse si complétée et pas active */}
                        {isCompleted && !isActive && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {getAnswerPreview(question)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Indicateurs visuels */}
                    <div className="flex items-center gap-2">
                      {isCompleted && !isActive && (
                        <Edit3 className="h-3 w-3 text-muted-foreground" />
                      )}
                      {!isFuture && (
                        isActive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Contenu de la question (accordéon) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          {renderQuestionInput(question)}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
              </motion.div>
            )
          })}
        </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
          )}
        </div>
        
        <div>
          {activeQuestionIndex === allQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit()}
              className="flex items-center gap-2 bg-midnight-green hover:bg-midnight-green/90 text-white"
            >
              Voir mes résultats
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isCurrentPageComplete()}
              className="flex items-center gap-2 bg-midnight-green hover:bg-midnight-green/90 text-white"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
