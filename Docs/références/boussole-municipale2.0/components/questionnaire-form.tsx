"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const questions = [
  {
    id: 1,
    text: "La municipalité devrait investir davantage dans le projet de tramway, même si cela implique une hausse des taxes municipales.",
    illustration: "/images/voiture.png",
  },
  {
    id: 2,
    text: "La municipalité devrait développer davantage les pistes cyclables, même si cela réduit l'espace pour les voitures.",
    illustration: "/images/cycliste-chien.png",
  },
  // Add more questions as needed
]

const responseOptions = [
  "Fortement d'accord",
  "Plutôt d'accord",
  "Neutre / Position mitigée",
  "Plutôt en désaccord",
  "Fortement en désaccord",
  "Ne sais pas",
]

export function QuestionnaireForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})

  const progress = ((currentQuestion + 1) / 21) * 100

  const handleResponse = (response: string) => {
    setResponses((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: response,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>🏠 Accueil</span>
          <span>•</span>
          <span className="text-primary font-medium">Questionnaire</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Question {currentQuestion + 1} sur 21</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complété</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Question Card */}
          <Card className="bg-white">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">{questions[currentQuestion]?.text}</h2>

              <div className="space-y-3">
                {responseOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(option)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      responses[questions[currentQuestion]?.id] === option
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
                <Button onClick={nextQuestion} disabled={!responses[questions[currentQuestion]?.id]}>
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image
                src={questions[currentQuestion]?.illustration || "/placeholder.svg"}
                alt="Illustration de la question"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
