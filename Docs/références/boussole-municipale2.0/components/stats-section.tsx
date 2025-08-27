import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Vote, Shield } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "70%",
    label: "du budget municipal",
    description: "va aux services de proximité (transport, parcs, voirie)",
  },
  {
    icon: Users,
    value: "40%",
    label: "de participation",
    description: "taux de vote aux dernières municipales",
  },
  {
    icon: Vote,
    value: "1 vote",
    label: "peut faire la différence",
    description: "dans votre quartier ou arrondissement",
  },
  {
    icon: Shield,
    value: "100%",
    label: "anonyme et sécurisé",
    description: "Vos réponses restent privées",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-foreground">Votre vote municipal a plus d'impact que vous pensez</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transport, logement, parcs, déneigement, taxes : votre ville décide de tout ce qui façonne votre quotidien.
            Pourtant, seulement 40% des citoyens votent aux élections municipales. Résultat ? Votre voix compte encore
            plus !
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="font-semibold text-card-foreground">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
