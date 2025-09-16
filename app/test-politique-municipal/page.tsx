"use client"

import { Suspense } from "react"
import { QuestionnaireForm } from "@/components/questionnaire-form"
import { Container } from "@/components/ui/container"

export default function TestPolitiqueMunicipalPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        {/* Hero Section avec mots-clés SEO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Test Politique Municipal - Political Compass Québec
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Notre <strong>test politique municipal</strong> type <strong>political compass</strong> vous aide à découvrir vos affinités politiques pour les élections municipales 2025 à Québec.
            Répondez à 21 questions pour identifier quel parti correspond le mieux à vos convictions.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Test politique gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>21 questions</span>
            </div>
          </div>
        </div>

        {/* Formulaire du questionnaire */}
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <QuestionnaireForm />
        </Suspense>

        {/* Section informative sur le test politique */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            À propos de notre test politique municipal
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">Comment fonctionne ce political compass ?</h3>
              <p>
                Notre test politique utilise un algorithme de calcul sophistiqué pour analyser vos réponses
                et les comparer aux positions officielles des partis municipaux de Québec pour 2025.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Quels sujets sont couverts ?</h3>
              <p>
                Transport, logement, environnement, fiscalité locale, services municipaux,
                et tous les enjeux importants des élections municipales québécoises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}