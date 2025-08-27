import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, BarChart3, Vote, Share2 } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Répondez aux questions",
      description: "Partagez vos opinions sur une série d'enjeux municipaux clés.",
    },
    {
      icon: BarChart3,
      title: "Obtenez vos résultats",
      description: "Visualisez votre alignement avec chaque candidat de manière claire et détaillée.",
    },
    {
      icon: Vote,
      title: "Prenez une décision éclairée",
      description:
        "Utilisez vos résultats pour mieux comprendre quel candidat correspond à vos priorités avant de voter.",
    },
    {
      icon: Share2,
      title: "Partagez (si vous voulez!)",
      description: "Discutez de vos résultats avec vos amis et votre famille pour encourager le débat.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment ça fonctionne ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple en 4 étapes pour découvrir vos affinités politiques municipales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
