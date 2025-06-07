"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, User, Home, Car, Target, X } from "lucide-react"

// Données pour les questions de profil (optimisées pour valeur commerciale + pertinence municipale)
const profileQuestions = [
  {
    id: "age_group",
    text: "Dans quelle tranche d'âge vous situez-vous ?",
    type: "select",
    category: "Démographie",
    icon: User,
    placeholder: "Sélectionnez votre tranche d'âge",
    options: ["18-24 ans", "25-34 ans", "35-44 ans", "45-54 ans", "55-64 ans", "65 ans et plus"],
  },
  {
    id: "gender",
    text: "Comment vous identifiez-vous ?",
    type: "select", 
    category: "Démographie",
    icon: User,
    placeholder: "Sélectionnez votre identité",
    options: ["Homme", "Femme", "Non-binaire", "Préfère ne pas dire"],
  },
  {
    id: "household_income",
    text: "Quel est le revenu annuel combiné de votre ménage (avant impôts) ?",
    type: "select",
    category: "Démographie", 
    icon: User,
    placeholder: "Sélectionnez votre tranche de revenu",
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
    type: "select",
    category: "Démographie",
    icon: User,
    placeholder: "Sélectionnez votre niveau de scolarité",
    options: [
      "Secondaire ou moins",
      "Formation professionnelle/DEP",
      "Cégep/DEC",
      "Université (Baccalauréat)",
      "Université (Maîtrise/Doctorat)",
    ],
  },
  {
    id: "housing_status", 
    text: "Quel est votre statut de logement ?",
    type: "select",
    category: "Contexte municipal",
    icon: Home,
    placeholder: "Sélectionnez votre statut de logement",
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
  {
    id: "municipal_priorities",
    text: "Sélectionnez et classez vos 3 priorités municipales (cliquez pour sélectionner, re-cliquez pour désélectionner)",
    type: "priority_ranking_enhanced",
    category: "Contexte municipal",
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
    text: "Partagez-nous ce qui vous préoccupe actuellement dans votre municipalité",
    type: "text_area",
    category: "Contexte municipal",
    icon: Target,
    placeholder: "Décrivez vos principales préoccupations municipales...",
    description: "Ces informations nous aideront à mieux comprendre les enjeux qui préoccupent les citoyens.",
  },
]

export default function ProfilePage() {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const router = useRouter()

  // Grouper les questions par catégorie pour l'affichage, mais tout afficher sur une page
  const categorizedQuestions = profileQuestions.reduce((acc, question) => {
    if (!acc[question.category]) acc[question.category] = []
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, typeof profileQuestions>)

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handlePriorityRanking = (questionId: string, rankings: Record<string, number>) => {
    setAnswers((prev) => ({ ...prev, [questionId]: rankings }))
  }

  const canSubmit = () => {
    return profileQuestions.every(q => {
      const answer = answers[q.id]
      
      // Pour les questions de sélection multiple, vérifier qu'au moins une option est sélectionnée
      if (q.type === "checkbox_multiple") {
        return Array.isArray(answer) && answer.length > 0
      }
      
      // Pour les questions de priorité, vérifier qu'au moins une priorité est définie
      if (q.type === "priority_ranking" || q.type === "priority_ranking_enhanced") {
        return answer && typeof answer === "object" && Object.keys(answer).length > 0
      }
      
      // Pour les text areas, permettre les réponses vides (optionnel)
      if (q.type === "text_area") {
        return true // Les préoccupations peuvent être optionnelles
      }
      
      // Pour les autres types, s'assurer qu'une réponse existe
      return answer !== undefined && answer !== ""
    })
  }

  const handleSubmit = () => {
    localStorage.setItem("userProfileData", JSON.stringify(answers))
    router.push("/resultats")
  }

  const renderPriorityRanking = (question: typeof profileQuestions[0]) => {
    const currentRankings = answers[question.id] || {}
    const rankedItems = Object.entries(currentRankings).sort(([,a], [,b]) => (a as number) - (b as number))
    const unrankedItems = question.options?.filter(option => !currentRankings[option]) || []

    const updateRanking = (item: string, rank: number) => {
      const newRankings = { ...currentRankings }
      
      // Remove item from previous ranking
      Object.keys(newRankings).forEach(key => {
        if (newRankings[key] >= rank) {
          newRankings[key] += 1
        }
      })
      
      // Clear item from any previous rank
      delete newRankings[item]
      
      // Set new rank
      newRankings[item] = rank
      
      // Clean up rankings to ensure 1,2,3
      const sortedEntries = Object.entries(newRankings).sort(([,a], [,b]) => (a as number) - (b as number))
      const cleanedRankings: Record<string, number> = {}
      sortedEntries.slice(0, 3).forEach(([key], index) => {
        cleanedRankings[key] = index + 1
      })
      
      handlePriorityRanking(question.id, cleanedRankings)
    }

    return (
      <div className="space-y-4 mt-4">
        {/* Ranked items */}
        <div className="space-y-2">
          {[1, 2, 3].map(rank => {
            const item = rankedItems.find(([, r]) => r === rank)?.[0]
            return (
              <div key={rank} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg border-2 border-secondary/30">
                <Badge variant="secondary" className="min-w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {rank}
                </Badge>
                {item ? (
                  <span className="flex-1 font-medium text-foreground">{item}</span>
                ) : (
                  <span className="flex-1 text-muted-foreground italic">Cliquez sur un enjeu ci-dessous</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Available items */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Enjeux disponibles :</p>
          <div className="grid gap-2">
            {unrankedItems.map(item => (
              <Button
                key={item}
                variant="outline"
                className="justify-start h-auto py-3 px-4 text-left bg-background hover:bg-secondary/20 hover:border-secondary transition-all duration-150"
                onClick={() => {
                  const nextRank = Object.keys(currentRankings).length + 1
                  if (nextRank <= 3) {
                    updateRanking(item, nextRank)
                  }
                }}
                disabled={Object.keys(currentRankings).length >= 3}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Reset button */}
        {Object.keys(currentRankings).length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handlePriorityRanking(question.id, {})}
            className="text-muted-foreground hover:text-foreground"
          >
            Recommencer le classement
          </Button>
        )}
      </div>
    )
  }

  const renderEnhancedPriorityRanking = (question: typeof profileQuestions[0]) => {
    const currentRankings = answers[question.id] || {}

    const toggleItemRanking = (item: string) => {
      const newRankings = { ...currentRankings }
      
      if (currentRankings[item]) {
        // Item est déjà classé, le retirer
        const removedRank = currentRankings[item]
        delete newRankings[item]
        
        // Réajuster les rangs supérieurs
        Object.keys(newRankings).forEach(key => {
          if (newRankings[key] > removedRank) {
            newRankings[key] = newRankings[key] - 1
          }
        })
      } else {
        // Item pas classé, l'ajouter au prochain rang disponible
        const nextRank = Object.keys(currentRankings).length + 1
        if (nextRank <= 3) {
          newRankings[item] = nextRank
        }
      }
      
      handlePriorityRanking(question.id, newRankings)
    }

    return (
      <div className="space-y-4 mt-4">
        {/* Instructions améliorées */}
        <div className="p-3 bg-muted/30 rounded-lg border border-muted">
          <p className="text-sm text-muted-foreground">
            Sélectionnez jusqu'à 3 priorités. Cliquez sur un enjeu pour le sélectionner (le numéro apparaîtra), re-cliquez pour le désélectionner.
          </p>
        </div>

        {/* Items avec numéros */}
        <div className="grid gap-2">
          {question.options?.map((option) => {
            const rank = currentRankings[option]
            const isSelected = !!rank
            const isDisabled = !isSelected && Object.keys(currentRankings).length >= 3
            
            return (
              <Button
                key={option}
                variant={isSelected ? "default" : "outline"}
                className={`justify-between h-auto py-3 px-4 text-left relative transition-all duration-200 ${
                  isSelected 
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-sm" 
                    : "bg-background hover:bg-secondary/10 hover:border-secondary"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !isDisabled && toggleItemRanking(option)}
                disabled={isDisabled}
              >
                <span className="flex-1 font-medium">{option}</span>
                {isSelected && (
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      {rank}
                    </Badge>
                  </div>
                )}
              </Button>
            )
          })}
        </div>

        {/* Summary */}
        {Object.keys(currentRankings).length > 0 && (
          <div className="flex items-center justify-between mt-4 p-3 bg-secondary/10 rounded-lg">
            <span className="text-sm text-muted-foreground">
              {Object.keys(currentRankings).length}/3 priorités sélectionnées
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handlePriorityRanking(question.id, {})}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Tout effacer
            </Button>
          </div>
        )}
      </div>
    )
  }

  const renderQuestionInput = (question: typeof profileQuestions[0]) => {
    switch (question.type) {
      case "select":
        return (
          <Select
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <SelectTrigger className="w-full border-2 rounded-lg p-3 text-sm">
              <SelectValue placeholder={question.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={option} className="text-sm">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "radio":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-2"
          >
            {question.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border-2 rounded-lg hover:bg-secondary/10 transition-all duration-200 cursor-pointer has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  handleAnswerChange(question.id, option)
                }}
              >
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-${index}`}
                  className="pointer-events-none"
                />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer text-sm font-medium pointer-events-none">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "priority_ranking":
        return renderPriorityRanking(question)
      case "priority_ranking_enhanced":
        return renderEnhancedPriorityRanking(question)
      case "checkbox_multiple":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => {
              const selectedOptions = Array.isArray(answers[question.id]) ? answers[question.id] : []
              const isChecked = selectedOptions.includes(option)
              
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border-2 rounded-lg hover:bg-secondary/10 transition-all duration-200 cursor-pointer has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary"
                  onClick={(e) => {
                    e.preventDefault()
                    const current = Array.isArray(answers[question.id]) ? answers[question.id] : []
                    const newSelected = current.includes(option)
                      ? current.filter((item: string) => item !== option)
                      : [...current, option]
                    handleAnswerChange(question.id, newSelected)
                  }}
                >
                  <Checkbox
                    checked={isChecked}
                    className="pointer-events-none"
                  />
                  <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer text-sm font-medium pointer-events-none">
                    {option}
                  </Label>
                </div>
              )
            })}
          </div>
        )
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

  // Calculer le progrès basé sur les réponses complétées
  const completedQuestions = profileQuestions.filter(q => {
    const answer = answers[q.id]
    if (q.type === "text_area") return true // Optionnel
    return answer !== undefined && answer !== ""
  }).length
  const progress = (completedQuestions / profileQuestions.length) * 100

  return (
    <div className="container max-w-4xl py-3 px-4 md:px-6 animate-fadeIn">
      {/* Header - Ultra compact */}
      <div className="mb-3 text-center">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
          Quelques questions sur vous
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Obligatoire pour des résultats précis.
        </p>
      </div>

      {/* Progress - Ultra compact */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {completedQuestions}/{profileQuestions.length} questions
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1">
          <div 
            className="bg-secondary h-1 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Questions organisées en une seule colonne compacte pour fluidité de navigation */}
      <div className="max-w-2xl mx-auto space-y-5">
        {Object.entries(categorizedQuestions).map(([category, questions]) => (
          <Card key={category} className="shadow-soft rounded-lg bg-card">
            <CardHeader className="pb-3 pt-4">
              <div className="flex items-center gap-2 mb-1">
                {questions[0]?.icon && (() => {
                  const IconComponent = questions[0].icon;
                  return (
                    <div className="p-1.5 bg-secondary/10 rounded-md">
                      <IconComponent className="h-3.5 w-3.5 text-secondary" />
                    </div>
                  );
                })()}
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {category}
                </Badge>
              </div>
              <CardTitle className="text-base font-semibold">
                {category === "Démographie" && "Informations de base"}
                {category === "Contexte municipal" && "Votre contexte à Québec"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-4">
              {questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label className="text-sm font-medium text-foreground leading-snug">
                    {question.text}
                  </Label>
                  {renderQuestionInput(question)}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation - Ultra compact */}
      <div className="flex justify-center mt-5">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 font-medium text-base"
        >
          Voir mes résultats
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
