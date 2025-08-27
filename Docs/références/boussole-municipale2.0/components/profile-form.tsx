"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const profileQuestions = [
  {
    id: 1,
    text: "Dans quelle tranche d'âge vous situez-vous ?",
    options: ["18-24 ans", "25-34 ans", "35-44 ans", "45-54 ans", "55-64 ans", "65 ans et plus"],
  },
  {
    id: 2,
    text: "Comment vous identifiez-vous ?",
    options: ["Homme", "Femme", "Non-binaire", "Autre", "Préfère ne pas répondre"],
  },
  // Add more profile questions
]

export function ProfileForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})

  const progress = (Object.keys(responses).length / 6) * 100

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-sm text-muted-foreground mb-2">Étape 1/1 • 0% complété</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Votre profil</h1>
          <p className="text-gray-600">Aidez-nous à mieux comprendre votre situation à Québec</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/parc-chien-maitre.webp"
                alt="Illustration d'une personne dans un parc"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Profile Questions */}
          <div className="order-1 lg:order-2">
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">Progression globale: 0/6 questions • 0%</div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-6">
              {profileQuestions.map((question, index) => (
                <Card key={question.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {question.id}
                      </div>
                      <h3 className="font-medium text-gray-900">{question.text}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => setResponses((prev) => ({ ...prev, [question.id]: option }))}
                          className={`p-3 text-sm rounded-lg border transition-colors ${
                            responses[question.id] === option
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-right">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Suivant →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
