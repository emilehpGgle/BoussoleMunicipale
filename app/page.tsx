"use client"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, BarChart3, Users, Compass, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import UserStatusCard from "@/components/user-status-card"

export default function HomePage() {
  // Fonction pour déclencher l'ouverture du modal depuis le header
  const openModal = () => {
    try {
      const event = new CustomEvent('openPostalCodeModal')
      window.dispatchEvent(event)
    } catch (error) {
      console.error('Erreur lors de l\'émission de l\'événement:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Section principale */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 px-4">
        {/* Conteneur principal */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Contenu textuel */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Votre Boussole Municipale
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Découvrez vos affinités politiques avec les partis municipaux. Répondez à notre questionnaire et obtenez vos résultats personnalisés.
                </p>
              </div>

              {/* Intégration du composant de statut utilisateur intelligent */}
              <UserStatusCard className="max-w-md" showOnHomepage={true} />

              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Partis</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5min</div>
                  <div className="text-sm text-muted-foreground">Durée</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              <Image
                src="/Image_parc_crisp.png"
                alt="Illustration d'un parc municipal avec des citoyens"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section des caractéristiques */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça fonctionne</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre boussole politique vous aide à comprendre vos affinités avec les différents partis municipaux
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Répondez au questionnaire</h3>
                <p className="text-muted-foreground">
                  20 questions sur les enjeux municipaux importants pour vous
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Analysez vos résultats</h3>
                <p className="text-muted-foreground">
                  Découvrez vos affinités avec chaque parti et votre position politique
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Partagez et comparez</h3>
                <p className="text-muted-foreground">
                  Partagez vos résultats et comparez avec vos proches
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section de confidentialité */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              <Image
                src="/Image_parc_crisp.png"
                alt="Illustration d'un parc municipal avec des citoyens"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Contenu */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Vos données sont protégées
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous respectons votre vie privée. Vos réponses sont anonymes et utilisées uniquement pour calculer vos affinités politiques. 
                Aucune donnée personnelle n'est partagée avec des tiers.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Données anonymes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Aucun partage de données</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Cryptage sécurisé</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Conforme RGPD</span>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link href="/confidentialite">
                    Politique de confidentialité
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
