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

// Data for profile questions (remains the same)
const profileQuestions = [
  {
    id: "federal_vote_today",
    text: "Si une élection fédérale avait lieu aujourd’hui, pour quel parti voteriez-vous?",
    type: "select",
    options: ["Parti Libéral", "Parti Conservateur", "NPD", "Bloc Québécois", "Parti Vert", "Autre", "Ne sais pas"],
  },
  {
    id: "federal_vote_2021",
    text: "Pour quel parti avez-vous voté lors des élections fédérales canadiennes de 2021?",
    type: "select",
    options: [
      "Parti Libéral",
      "Parti Conservateur",
      "NPD",
      "Bloc Québécois",
      "Parti Vert",
      "Autre",
      "N'a pas voté",
      "Ne sais pas",
    ],
  },
  { id: "gender", text: "Quel est votre genre?", type: "radio", options: ["Masculin", "Féminin", "Autre"] },
  {
    id: "gender_identity",
    text: "Vous identifiez-vous à l’une des identités de genre suivantes?",
    type: "checkbox",
    options: [
      { id: "non_binary", label: "Non-binaire" },
      { id: "transgender", label: "Transgenre" },
      { id: "two_spirit", label: "Bispirituel" },
      { id: "none", label: "Aucune de ces options" },
    ],
  },
  { id: "birth_year", text: "En quelle année êtes-vous né(e)?", type: "year_select" },
  {
    id: "education_level",
    text: "Quel est le plus haut niveau d’études que vous avez obtenu?",
    type: "select",
    options: [
      "Moins que le diplôme d'études secondaires",
      "Diplôme d'études secondaires",
      "Formation professionnelle/métier",
      "CÉGEP/Collège",
      "Baccalauréat universitaire",
      "Maîtrise/Doctorat",
      "Autre",
    ],
  },
  {
    id: "attended_school_since_sep2024",
    text: "Depuis septembre 2024, avez-vous fréquenté une école (par exemple, une école secondaire, un collège, un cégep ou une université) à un moment ou à un autre?",
    type: "radio",
    options: ["Oui", "Non"],
  },
  {
    id: "employment_status",
    text: "Quelle est votre situation professionnelle actuelle?",
    type: "select",
    options: [
      "Employé(e) à temps plein",
      "Employé(e) à temps partiel",
      "Travailleur(se) autonome",
      "Sans emploi, à la recherche de travail",
      "Sans emploi, pas à la recherche de travail",
      "Étudiant(e)",
      "Retraité(e)",
      "Autre",
    ],
  },
  {
    id: "religion",
    text: "Quelle est votre religion?",
    type: "select",
    options: [
      "Christianisme",
      "Islam",
      "Hindouisme",
      "Sikhisme",
      "Bouddhisme",
      "Judaïsme",
      "Aucune religion/Athée/Agnostique",
      "Autre",
    ],
  },
  {
    id: "language_at_home",
    text: "Quelle langue parlez-vous régulièrement à la maison?",
    type: "select",
    options: ["Français", "Anglais", "Les deux", "Autre"],
  },
  { id: "canadian_citizen", text: "Êtes-vous citoyen canadien?", type: "radio", options: ["Oui", "Non"] },
  { id: "born_in_canada", text: "Êtes-vous né(e) au Canada?", type: "radio", options: ["Oui", "Non"] },
  {
    id: "indigenous_identity",
    text: "Êtes-vous Première Nation, Métis ou Inuk (Inuit)?",
    type: "radio",
    options: ["Première Nation", "Inuk (Inuit)", "Métis", "Aucune de ces options"],
  },
  {
    id: "ethnic_origins",
    text: "Quelles sont les origines ethniques ou culturelles de vos ancêtres? (Séparez par des virgules)",
    type: "textarea",
  },
  {
    id: "describes_you_best",
    text: "Laquelle des catégories suivantes vous décrit le mieux? (Séparez par des virgules)",
    type: "textarea",
  },
  {
    id: "sexual_orientation",
    text: "Lequel des termes suivant défini le mieux votre orientation sexuelle?",
    type: "radio",
    options: ["Hétérosexuel(le)", "Gai ou lesbienne", "Bisexuel(le)", "Autre", "Préfère ne pas répondre"],
  },
  {
    id: "household_income",
    text: "Laquelle des catégories suivantes décrit le mieux le salaire combiné des membres de votre ménage avant impôt?",
    type: "select",
    options: [
      "Moins de 30 000 $",
      "30 000 $ à 59 999 $",
      "60 000 $ à 89 999 $",
      "90 000 $ à 119 999 $",
      "120 000 $ à 149 999 $",
      "150 000 $ et plus",
      "Préfère ne pas répondre",
    ],
  },
  {
    id: "political_spectrum",
    text: "En politique, où vous placeriez-vous sur l'échelle suivante (0=gauche, 10=droite)?",
    type: "scale",
    options: Array.from({ length: 11 }, (_, i) => i.toString()),
  },
  {
    id: "political_interest",
    text: "En général, quel intérêt accordez-vous à la politique?",
    type: "radio",
    options: ["Pas intéressé du tout", "Pas vraiment intéressé", "Un peu intéressé", "Très intéressé"],
  },
  { id: "most_important_issue", text: "Quel est l'enjeu politique le plus important, selon vous?", type: "textarea" },
  {
    id: "contact_consent",
    text: "Accepteriez-vous d’être contacté occasionnellement par les créateurs de la Boussole électorale afin de participer à certains de leurs futurs projets?",
    type: "radio",
    options: ["Oui", "Non"],
  },
]

export default function ProfilePage() {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const router = useRouter()

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxChange = (questionId: string, optionId: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentSelection = { ...(prev[questionId] || {}) } // Ensure currentSelection is an object
      return { ...prev, [questionId]: { ...currentSelection, [optionId]: checked } }
    })
  }

  const handleSubmit = () => {
    localStorage.setItem("userProfileData", JSON.stringify(answers))
    router.push("/resultats")
  }

  const skipProfile = () => {
    localStorage.removeItem("userProfileData")
    router.push("/resultats")
  }

  const renderQuestionInput = (question: (typeof profileQuestions)[0]) => {
    // Helper function to render individual question inputs
    switch (question.type) {
      case "select":
        return (
          <Select value={answers[question.id] || ""} onValueChange={(value) => handleAnswerChange(question.id, value)}>
            <SelectTrigger className="w-full rounded-lg mt-2">
              <SelectValue placeholder="Sélectionnez une option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={typeof option === "string" ? option : option.id}>
                  {typeof option === "string" ? option : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "radio":
      case "scale":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-2 mt-2"
          >
            {question.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary"
              >
                <RadioGroupItem
                  value={typeof option === "string" ? option : option.id}
                  id={`${question.id}-${index}`}
                />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {typeof option === "string" ? option : option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "checkbox":
        return (
          <div className="space-y-2 mt-2">
            {question.options?.map((option: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary"
              >
                <Checkbox
                  id={`${question.id}-${option.id}`}
                  checked={!!(answers[question.id] && answers[question.id][option.id])}
                  onCheckedChange={(checked) => handleCheckboxChange(question.id, option.id, !!checked)}
                />
                <Label htmlFor={`${question.id}-${option.id}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )
      case "year_select":
        const currentYear = new Date().getFullYear()
        const years = Array.from({ length: 100 }, (_, i) => (currentYear - 15 - i).toString())
        return (
          <Select value={answers[question.id] || ""} onValueChange={(value) => handleAnswerChange(question.id, value)}>
            <SelectTrigger className="w-full rounded-lg mt-2">
              <SelectValue placeholder="Sélectionnez une année" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "textarea":
        return (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
            className="rounded-lg min-h-[100px] mt-2"
          />
        )
      default:
        return <p>Type de question non supporté.</p>
    }
  }

  return (
    <div className="container max-w-3xl py-12 px-4 md:px-6 animate-fadeIn">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Votre profil (Facultatif)</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Les questions suivantes sont facultatives et n'auront aucun effet sur vos résultats. Elles sont utilisées pour
          s'assurer que différents groupes de la société sont correctement représentés. Voir l'aide pour plus de détails
          ou sautez cette section si vous préférez.
        </p>
        <Button variant="link" onClick={skipProfile} className="text-primary hover:text-primary/80 mt-4 text-base">
          Sauter cette section et voir mes résultats
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="space-y-10">
          {profileQuestions.map((question, index) => (
            <div key={question.id} className="p-6 border rounded-xl shadow-sm bg-card">
              <Label className="text-lg font-semibold text-foreground mb-1 block">
                Question {index + 1} sur {profileQuestions.length}
              </Label>
              <p className="text-md text-muted-foreground mb-4">{question.text}</p>
              {renderQuestionInput(question)}
              {question.id === "contact_consent" && (
                <p className="text-xs text-muted-foreground mt-3">
                  Votre adresse électronique ne sera jamais communiquée à un tiers ni utilisée pour vous envoyer des
                  courriers électroniques à caractère commercial ou promotionnel. Voir notre Politique de
                  confidentialité pour plus de détails.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={skipProfile}
            className="rounded-xl px-8 py-3 text-base w-full sm:w-auto"
          >
            Sauter et voir mes résultats
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 text-base shadow-soft w-full sm:w-auto"
          >
            Enregistrer et voir mes résultats
          </Button>
        </div>
      </form>

      <div className="mt-12 text-center space-x-4">
        <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary">
          <Link href="/a-propos">À Propos</Link>
        </Button>
        <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary">
          <Link href="/aide">Aide</Link>
        </Button>
        <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary">
          <Link href="/confidentialite">Confidentialité</Link>
        </Button>
      </div>
    </div>
  )
}
