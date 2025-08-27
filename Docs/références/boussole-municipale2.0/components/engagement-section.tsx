import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Vote, Lightbulb, Users, ArrowRight } from "lucide-react"
import Image from "next/image"

const engagementOptions = [
  {
    icon: MessageSquare,
    title: "Donnez votre avis",
    description: "Participez aux consultations publiques et exprimez votre opinion sur les projets municipaux",
    action: "Participer aux consultations",
  },
  {
    icon: Vote,
    title: "Votez sur les projets",
    description: "Influencez les décisions locales en votant sur les initiatives communautaires",
    action: "Voir les votes en cours",
  },
  {
    icon: Lightbulb,
    title: "Proposez des idées",
    description: "Soumettez vos suggestions pour améliorer la vie dans votre commune",
    action: "Soumettre une idée",
  },
  {
    icon: Users,
    title: "Rejoignez la communauté",
    description: "Connectez-vous avec vos voisins et participez aux événements locaux",
    action: "Découvrir les événements",
  },
]

export function EngagementSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="section-title text-foreground">Participez à la vie de votre commune</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Votre voix compte ! Engagez-vous activement dans les décisions qui façonnent votre quotidien et celui de
                votre communauté.
              </p>
            </div>

            <div className="grid gap-6">
              {engagementOptions.map((option, index) => (
                <Card key={index} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <option.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-card-foreground">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                          {option.action}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/images/carre-sable.png"
                alt="Illustration d'un élu inaugurant un nouveau projet municipal"
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
