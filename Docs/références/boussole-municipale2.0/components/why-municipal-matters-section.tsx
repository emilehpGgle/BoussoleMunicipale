import { Card, CardContent } from "@/components/ui/card"
import { Bus, Home, DollarSign } from "lucide-react"
import Image from "next/image"

export function WhyMunicipalMattersSection() {
  const impacts = [
    {
      icon: Bus,
      title: "Transport quotidien",
      description: "Bus, métro, vélo, routes : votre municipalité décide comment vous vous déplacez au quotidien.",
      image: "/images/cycliste-chien.png",
    },
    {
      icon: Home,
      title: "Votre quartier",
      description:
        "Logement, parcs, bibliothèques, déneigement : les services qui façonnent votre qualité de vie locale.",
      image: "/images/quartier-ordures.png",
    },
    {
      icon: DollarSign,
      title: "Vos taxes",
      description: "La plus grande part de vos impôts locaux. Comment ils sont utilisés dépend de qui vous élisez.",
      image: "/images/voiture.png",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi vos élections municipales comptent autant ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le problème ? Il n'existait aucun moyen simple de comparer les partis municipaux sur ces enjeux. C'est
            pourquoi nous avons créé cette boussole.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={impact.image || "/placeholder.svg"}
                    alt={impact.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <impact.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{impact.title}</h3>
                <p className="text-gray-600">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
