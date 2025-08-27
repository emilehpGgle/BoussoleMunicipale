"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"

const parties = [
  { name: "LQ", fullName: "Leadership Québec - Équipe Sam Hamad", affinity: 77, logo: "/placeholder.svg" },
  { name: "EPQ", fullName: "Équipe priorité Québec", affinity: 74, logo: "/placeholder.svg" },
  { name: "QD", fullName: "Québec d'abord", affinity: 71, logo: "/placeholder.svg" },
]

const detailedQuestions = [
  "La Ville devrait limiter le nombre de touristes dans certains quartiers pour protéger la qualité de vie des résidents.",
  "La Ville devrait donner plus d'argent aux organismes communautaires qui aident pour des services sociaux essentiels (itinérance, aide alimentaire, etc).",
  "Il faudrait augmenter le nombre de policiers pour améliorer la sécurité dans les quartiers.",
  // Add more questions...
]

export function ResultsDisplay() {
  const [showMethodology, setShowMethodology] = useState(false)
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  const toggleQuestion = (index: number) => {
    setExpandedQuestions((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>🏠 Accueil</span>
          <span>•</span>
          <span>Questionnaire</span>
          <span>•</span>
          <span className="text-primary font-medium">Résultats</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vos Résultats</h1>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
        </div>

        <p className="text-gray-600 mb-8">
          Voici comment vos opinions s'alignent avec celles des partis, basé sur vos réponses au questionnaire.
        </p>

        {/* Party Results */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Vos meilleurs alignements (Partis)</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {parties.map((party, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-gray-600">{party.name}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-2">{party.fullName}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">{party.affinity}% d'affinité</div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Voir la fiche du parti
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Questions */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Votre alignement détaillé par enjeu</h2>
            <p className="text-gray-600 mb-6">
              Explorez comment vos réponses se comparent à celles des partis pour chaque question.
            </p>

            <div className="space-y-4">
              {detailedQuestions.slice(0, 5).map((question, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="text-sm">
                      {index + 16}. {question}
                    </span>
                    {expandedQuestions.includes(index) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedQuestions.includes(index) && (
                    <div className="p-4 border-t bg-gray-50">
                      <p className="text-sm text-gray-600">Détails de comparaison avec les partis...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              ℹ️ Méthodologie (Simplifiée)
              {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMethodology && (
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-red-600 mb-2">📍 Positionnement politique</h4>
                  <p>
                    Chacune des 20 questions influence votre score sur deux axes indépendants (économique et social).
                    Votre position finale est la somme de ces influences, pondérée par l'importance que vous accordez à
                    chaque question.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-blue-600 mb-2">🧮 Calcul des affinités</h4>
                  <p>
                    L'affinité est calculée à partir de la distance qui vous sépare de chaque parti sur la carte
                    politique. Plus un parti est proche de vous, plus l'affinité est élevée. La formule a été ajustée
                    pour que les partis éloignés soient plus sévèrement pénalisés, rendant le score plus intuitif.
                  </p>
                </div>

                <p className="text-xs italic">
                  <strong>Note méthodologique :</strong> Les positions des partis sont basées sur l'analyse de leurs
                  programmes et déclarations politiques. Cette méthode scientifique garantit une représentation
                  équitable du paysage politique municipal.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to questionnaire */}
        <div className="text-center">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Refaire le questionnaire
          </Button>
        </div>
      </div>
    </section>
  )
}
