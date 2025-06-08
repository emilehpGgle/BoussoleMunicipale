"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, User, Home, Car, Target, X, ChevronLeft, ChevronRight, Check, Edit3, ChevronDown, ChevronUp } from "lucide-react"

// Données pour les questions de profil (organisées par page)
const profileQuestions = {
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
  
  // Page 2 - Contexte municipal
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
      type: "checkbox_multiple",
      category: "Contexte municipal", 
      icon: Car,
      options: ["Automobile", "Transport en commun", "Vélo", "Marche", "Covoiturage", "Taxi/Uber", "Autre"],
    },
  ],
  
  // Page 3 - Enjeux
  issues: [
    {
      id: "municipal_priorities",
      text: "Sélectionnez et classez vos 3 priorités municipales (cliquez pour sélectionner, re-cliquez pour désélectionner)",
      type: "priority_ranking_enhanced",
      category: "Enjeux",
      icon: Target, 
      options: [
        "Transport et mobilité",
        "Logement abordable", 
        "Environnement et espaces verts",
        "Sécurité publique",
        "Développement économique",
        "Services municipaux",
        "Projet de tramway",
        "Troisième lien routier",
        "Lutte aux changements climatiques",
        "Autres",
      ],
    },
    {
      id: "citizen_concerns",
      text: "Précisez vos autres priorités municipales",
      type: "text_area",
      category: "Enjeux",
      icon: Target,
      placeholder: "Décrivez les autres enjeux municipaux qui vous tiennent à cœur...",
      description: "Puisque vous avez sélectionné 'Autres', aidez-nous à comprendre quelles sont vos priorités spécifiques.",
    },
  ]
}

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState<'basic' | 'municipal' | 'issues'>('basic')
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const router = useRouter()
  const citizenConcernsRef = useRef<HTMLDivElement>(null)

  // Obtenir les questions de la page actuelle
  const getCurrentQuestions = () => profileQuestions[currentPage]
  
  // Obtenir toutes les questions pour la validation
  const getAllQuestions = () => [
    ...profileQuestions.basic,
    ...profileQuestions.municipal,
    ...profileQuestions.issues
  ]

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    
    // Auto-passer à la question suivante après une réponse (sauf pour les text areas et questions multiples)
    const currentQuestions = getCurrentQuestions()
    const currentQuestion = currentQuestions[activeQuestionIndex]
    
    if (currentQuestion && currentQuestion.type !== "text_area" && currentQuestion.type !== "priority_ranking_enhanced") {
      setTimeout(() => {
        if (activeQuestionIndex < currentQuestions.length - 1) {
          setActiveQuestionIndex(activeQuestionIndex + 1)
        }
      }, 300) // Petit délai pour voir la sélection
    }
  }

  const handlePriorityRanking = (questionId: string, rankings: Record<string, number>) => {
    const previousAnswers = answers[questionId] || {}
    setAnswers((prev) => ({ ...prev, [questionId]: rankings }))
    
    const previousCount = Object.keys(previousAnswers).length
    const currentCount = Object.keys(rankings).length
    const wasOthersSelected = previousAnswers['Autres'] !== undefined
    const isOthersSelected = rankings['Autres'] !== undefined
    
    // Si l'utilisateur vient de compléter ses 3 priorités (de 2 à 3)
    if (previousCount === 2 && currentCount === 3) {
      setTimeout(() => {
        if (isOthersSelected) {
          // Si "Autres" est sélectionné, scroller vers la zone de texte
          citizenConcernsRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
        } else {
          // Sinon, scroller vers le bas de la page (bouton "Voir mes résultats")
          window.scrollTo({ 
            top: document.documentElement.scrollHeight,
            behavior: 'smooth' 
          })
        }
      }, 300) // Petit délai pour laisser le DOM se mettre à jour
    }
    // Si "Autres" vient d'être ajouté après avoir déjà 3 sélections
    else if (!wasOthersSelected && isOthersSelected && currentCount === 3) {
      setTimeout(() => {
        citizenConcernsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
      }, 300)
    }
  }

  // Vérifier si une question est complétée (pour l'affichage visuel)
  const isQuestionComplete = (question: any) => {
    const answer = answers[question.id]
    
    if (question.type === "checkbox_multiple") {
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

  // Vérifier si une question est requise pour la progression (différent de l'affichage visuel)
  const isQuestionRequiredForProgression = (question: any) => {
    const answer = answers[question.id]
    
    if (question.type === "checkbox_multiple") {
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

  // Vérifier si la page actuelle est complète
  const isCurrentPageComplete = () => {
    const currentQuestions = getCurrentQuestions()
    return currentQuestions.every(q => isQuestionRequiredForProgression(q))
  }

  // Vérifier si tout le questionnaire est complété
  const canSubmit = () => {
    const allQuestions = getAllQuestions()
    return allQuestions.every(q => isQuestionRequiredForProgression(q))
  }

  const handleNext = () => {
    if (currentPage === 'basic') {
      setCurrentPage('municipal')
      setActiveQuestionIndex(0)
    } else if (currentPage === 'municipal') {
      setCurrentPage('issues')
      setActiveQuestionIndex(0)
    }
  }

  const handlePrevious = () => {
    if (currentPage === 'municipal') {
      setCurrentPage('basic')
      setActiveQuestionIndex(0)
    } else if (currentPage === 'issues') {
      setCurrentPage('municipal')
      setActiveQuestionIndex(0)
    }
  }

  const handleSubmit = () => {
    localStorage.setItem("userProfileData", JSON.stringify(answers))
    router.push("/resultats")
  }

  // Obtenir l'aperçu d'une réponse pour affichage compact
  const getAnswerPreview = (question: any) => {
    const answer = answers[question.id]
    
    if (!answer) return "Non répondu"
    
    if (question.type === "checkbox_multiple") {
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

  // Composant pour les boutons horizontaux
  const renderHorizontalButtons = (question: any) => {
    const selectedValue = answers[question.id]
    
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.options.map((option: string, index: number) => (
            <Button
              key={index}
              variant={selectedValue === option ? "default" : "outline"}
              onClick={() => handleAnswerChange(question.id, option)}
              className={`
                p-3 h-auto text-left justify-start text-sm font-medium transition-all duration-200
                ${selectedValue === option 
                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                  : "hover:bg-secondary/50 hover:border-secondary"
                }
              `}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  const renderEnhancedPriorityRanking = (question: any) => {
    const currentRankings = answers[question.id] || {}
    
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
        case 1: return "bg-yellow-500 text-white"
        case 2: return "bg-gray-400 text-white"  
        case 3: return "bg-amber-600 text-white"
        default: return "bg-muted"
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
          {question.options.map((option: string, index: number) => {
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
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "hover:bg-secondary/50 hover:border-secondary"
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

  const renderQuestionInput = (question: any) => {
    switch (question.type) {
      case "button_horizontal":
        return renderHorizontalButtons(question)
        
      case "checkbox_multiple":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options?.map((option: string, index: number) => {
              const selectedOptions = Array.isArray(answers[question.id]) ? answers[question.id] : []
              const isChecked = selectedOptions.includes(option)
              
              return (
                <Button
                  key={index}
                  variant={isChecked ? "default" : "outline"}
                  onClick={() => {
                    const current = Array.isArray(answers[question.id]) ? answers[question.id] : []
                    const newSelected = current.includes(option)
                      ? current.filter((item: string) => item !== option)
                      : [...current, option]
                    handleAnswerChange(question.id, newSelected)
                  }}
                  className={`
                    p-3 h-auto text-left justify-start text-sm font-medium transition-all duration-200
                    ${isChecked 
                      ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                      : "hover:bg-secondary/50 hover:border-secondary"
                    }
                  `}
                >
                  {option}
                </Button>
              )
            })}
          </div>
        )
        
      case "priority_ranking_enhanced":
        return renderEnhancedPriorityRanking(question)
        
      case "text_area":
        return (
          <div className="space-y-2">
            {question.description && (
              <p className="text-sm text-muted-foreground">
                {question.description}
              </p>
            )}
            <Textarea
              id={question.id}
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="w-full min-h-[100px] p-3 border-2 rounded-lg resize-vertical text-sm"
              rows={3}
            />
          </div>
        )
        
      default:
        return <p>Type de question non supporté.</p>
    }
  }

  // Calculer le progrès global
  const allQuestions = getAllQuestions()
  const completedQuestions = allQuestions.filter(q => isQuestionComplete(q)).length
  const globalProgress = (completedQuestions / allQuestions.length) * 100

  // Définir les titres et descriptions pour chaque page
  const pageInfo = {
    basic: {
      title: "Informations de base",
      description: "Quelques questions rapides pour mieux vous connaître",
      step: "1/3"
    },
    municipal: {
      title: "Contexte municipal", 
      description: "Parlons de votre situation à Québec",
      step: "2/3"
    },
    issues: {
      title: "Enjeux",
      description: "Exprimez vos priorités et préoccupations municipales",
      step: "3/3" 
    }
  }

  const currentInfo = pageInfo[currentPage]
  const currentQuestions = getCurrentQuestions()

  return (
    <div className="container max-w-3xl py-6 px-4 md:px-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Étape {currentInfo.step}
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
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${globalProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Questions - Accordéon intelligent pour pages 1-2, affichage simple pour page 3 */}
      {currentPage === 'issues' ? (
        // Page 3 : Affichage simple sans accordéon
        <div className="space-y-6 mb-6">
          {currentQuestions.map((question, index) => {
            // Pour la question des préoccupations, ne l'afficher que si "Autres" est sélectionné
            if (question.id === 'citizen_concerns') {
              const prioritiesAnswer = answers['municipal_priorities'] || {}
              const hasSelectedOthers = prioritiesAnswer['Autres'] !== undefined
              
              if (!hasSelectedOthers) {
                return null // Ne pas afficher cette question
              }
            }
            
            return (
              <Card 
                key={question.id} 
                className="shadow-soft rounded-xl bg-card"
                ref={question.id === 'citizen_concerns' ? citizenConcernsRef : undefined}
              >
                <CardContent className="p-6 space-y-4">
                  <Label className="text-base font-medium text-foreground leading-snug block">
                    {question.text}
                  </Label>
                  {renderQuestionInput(question)}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        // Pages 1-2 : Accordéon intelligent
        <div className="space-y-3 mb-6">
          {currentQuestions.map((question, index) => {
            const isCompleted = isQuestionComplete(question)
            const isActive = index === activeQuestionIndex
            const isFuture = index > activeQuestionIndex && !isCompleted
            
            return (
              <Card 
                key={question.id} 
                className={`shadow-soft rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-card border-primary/50 shadow-lg" 
                    : isCompleted 
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-muted/30 border-muted"
                }`}
              >
                {/* En-tête de question (toujours visible) */}
                <CardHeader 
                  className={`pb-3 pt-4 cursor-pointer transition-all duration-200 ${
                    !isFuture ? "hover:bg-secondary/10" : ""
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
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
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
                {isActive && (
                  <CardContent className="p-6 pt-0 animate-fadeIn">
                    <div className="space-y-3">
                      {renderQuestionInput(question)}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {currentPage !== 'basic' && (
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
          {currentPage === 'issues' ? (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit()}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Voir mes résultats
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isCurrentPageComplete()}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
