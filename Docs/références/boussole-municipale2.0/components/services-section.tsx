import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Home, Recycle, Car, Users, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"

const services = [
  {
    icon: FileText,
    title: "État civil",
    description: "Actes de naissance, mariage, décès et autres documents officiels",
    image: "/images/piscine-formulaires.png",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Home,
    title: "Urbanisme",
    description: "Permis de construire, déclarations de travaux et autorisations",
    image: "/images/famille.png",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Recycle,
    title: "Environnement",
    description: "Collecte des déchets, recyclage et espaces verts",
    image: "/images/quartier-ordures.png",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Car,
    title: "Transport",
    description: "Stationnement, transports en commun et mobilité douce",
    image: "/images/voiture.png",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Users,
    title: "Vie sociale",
    description: "Associations, événements communautaires et services aux citoyens",
    image: "/images/parc-chien-maitre.webp",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Calendar,
    title: "Loisirs",
    description: "Parcs, installations sportives et activités culturelles",
    image: "/images/cycliste-chien.png",
    color: "bg-pink-50 text-pink-600",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-foreground">Nos services à votre disposition</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Accédez facilement à tous vos services municipaux en ligne. Simplifiez vos démarches et gagnez du temps avec
            notre plateforme intuitive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border-border bg-card group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${service.color}`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="w-16 h-16 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={`Illustration ${service.title}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4">{service.description}</CardDescription>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Voir tous les services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
