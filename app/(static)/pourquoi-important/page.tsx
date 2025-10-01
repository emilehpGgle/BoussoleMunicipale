import Link from "next/link"
import { ArrowLeft, Home, Car, Leaf, DollarSign, Shield, Building2, Users, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ServiceCard } from "@/components/ui/uniform-card"
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedTitle,
  AnimatedStats,
  AnimatedCTA
} from "@/components/ui/animated-wrappers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pourquoi c'est important | Boussole Municipale Québec",
  description: "Découvrez pourquoi les élections municipales sont cruciales pour votre quotidien. L'impact direct de la politique municipale sur votre vie à Québec.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/pourquoi-important"
  }
}

export default function PourquoiImportantPage() {
  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6 lg:px-8">
      {/* Hero Section - Enhanced Typography */}
      <div className="mb-12 md:mb-16">
        <Button variant="ghost" asChild className="mb-6 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <AnimatedTitle>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Pourquoi c&apos;est important
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Les élections municipales façonnent votre quotidien plus que vous ne le pensez.
          </p>
        </AnimatedTitle>
      </div>

      {/* Impact direct */}
      <AnimatedSection delay={0.05} className="mb-16 md:mb-20">
        <AnimatedTitle delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">
            La municipalité : votre gouvernement le plus proche
          </h2>
        </AnimatedTitle>

        <AnimatedGrid className="card-grid-services mb-10">
          <ServiceCard
            icon={<Car className="w-10 h-10 md:w-12 md:h-12" />}
            title="Transport"
            items={[
              "• Réseau de transport en commun",
              "• Pistes cyclables et trottoirs",
              "• Stationnement et circulation",
              "• Réfection des routes"
            ]}
          />
          <ServiceCard
            icon={<Home className="w-10 h-10 md:w-12 md:h-12" />}
            title="Logement"
            items={[
              "• Logement social et abordable",
              "• Réglementation urbaine",
              "• Développement de quartiers",
              "• Protection locataires"
            ]}
          />
          <ServiceCard
            icon={<Leaf className="w-10 h-10 md:w-12 md:h-12" />}
            title="Environnement"
            items={[
              "• Gestion des déchets",
              "• Parcs et espaces verts",
              "• Qualité de l&apos;air et de l&apos;eau",
              "• Lutte aux îlots de chaleur"
            ]}
          />
          <ServiceCard
            icon={<DollarSign className="w-10 h-10 md:w-12 md:h-12" />}
            title="Économie"
            items={[
              "• Taxes municipales",
              "• Soutien aux commerces",
              "• Développement économique",
              "• Tarifs services municipaux"
            ]}
          />
          <ServiceCard
            icon={<Shield className="w-10 h-10 md:w-12 md:h-12" />}
            title="Sécurité"
            items={[
              "• Services policiers",
              "• Prévention incendies",
              "• Sécurité des quartiers",
              "• Services d&apos;urgence"
            ]}
          />
          <ServiceCard
            icon={<Building2 className="w-10 h-10 md:w-12 md:h-12" />}
            title="Services"
            items={[
              "• Bibliothèques et loisirs",
              "• Centres communautaires",
              "• Services aux aînés",
              "• Programmes jeunesse"
            ]}
          />
        </AnimatedGrid>

        <AnimatedStats delay={0.1}>
          <Card className="p-8 md:p-10 bg-gradient-to-br from-midnight-green/10 via-midnight-green/5 to-transparent border-2 border-midnight-green/20">
            <div className="flex items-start space-x-6">
              <Users className="w-12 h-12 md:w-14 md:h-14 text-midnight-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-midnight-green">
                  Le niveau de gouvernement le plus proche de vous
                </h3>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Contrairement aux gouvernements provincial et fédéral, la municipalité gère les services
                  que vous utilisez <strong className="text-midnight-green">quotidiennement</strong>.
                  Vos décisions d&apos;aujourd&apos;hui façonnent directement votre cadre de vie pour les <strong className="text-midnight-green">4 prochaines années</strong>.
                </p>
              </div>
            </div>
          </Card>
        </AnimatedStats>
      </AnimatedSection>

      {/* Statistiques participation - Enhanced Visual Impact */}
      <AnimatedSection delay={0.05} className="mb-16 md:mb-20">
        <AnimatedTitle delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">
            La réalité de la participation
          </h2>
        </AnimatedTitle>

        <AnimatedGrid staggerDelay={0.1} className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 md:p-10 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Taux de participation historique</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-sm md:text-base text-muted-foreground">Élections municipales 2021</span>
                  <span className="text-4xl md:text-5xl font-bold text-destructive">42%</span>
                </div>
                <Progress value={42} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-sm md:text-base text-muted-foreground">Élections provinciales 2022</span>
                  <span className="text-4xl md:text-5xl font-bold text-midnight-green">66%</span>
                </div>
                <Progress value={66} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-sm md:text-base text-muted-foreground">Élections fédérales 2021</span>
                  <span className="text-4xl md:text-5xl font-bold text-midnight-green">62%</span>
                </div>
                <Progress value={62} className="h-3" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-midnight-green/10 rounded-lg border-l-4 border-midnight-green">
              <p className="text-sm md:text-base font-semibold text-midnight-green">
                Pourtant, c&apos;est au municipal que votre vote a le plus d&apos;impact !
              </p>
            </div>
          </Card>

          <Card className="p-8 md:p-10 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Pourquoi cette faible participation ?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-base md:text-lg">
                  <strong className="text-foreground">Méconnaissance des enjeux</strong>
                  <span className="text-muted-foreground"> municipaux spécifiques</span>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-base md:text-lg">
                  <strong className="text-foreground">Complexité</strong>
                  <span className="text-muted-foreground"> des programmes et positions</span>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-base md:text-lg">
                  <strong className="text-foreground">Impression</strong>
                  <span className="text-muted-foreground"> que &quot;ça ne change rien&quot;</span>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-base md:text-lg">
                  <strong className="text-foreground">Manque d&apos;outils</strong>
                  <span className="text-muted-foreground"> pour s&apos;informer facilement</span>
                </span>
              </li>
            </ul>
            <div className="mt-6 p-5 bg-gradient-to-br from-midnight-green via-midnight-green to-midnight-green/90 rounded-lg shadow-md">
              <p className="text-base md:text-lg font-bold text-white text-center">
                C&apos;est exactement pourquoi la Boussole Municipale existe !
              </p>
            </div>
          </Card>
        </AnimatedGrid>
      </AnimatedSection>

      {/* Impact de votre vote - Hero Statistics */}
      <AnimatedSection delay={0.05} className="mb-16 md:mb-20">
        <AnimatedTitle delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">
            Votre vote compte vraiment
          </h2>
        </AnimatedTitle>

        <AnimatedStats delay={0.1}>
          <Card className="p-8 md:p-12 mb-10 bg-gradient-to-br from-midnight-green/5 to-transparent shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-midnight-green mb-4 tracking-tight">
                  15,000
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Électeurs moyens par district à Québec
                </p>
              </div>
              <div className="text-center border-x-0 md:border-x border-midnight-green/20 py-4 md:py-0">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-green mb-4 tracking-tight">
                  1/15,000
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Le poids de votre vote municipal
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-midnight-green mb-4 tracking-tight">
                  4 ans
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Durée d&apos;impact de votre choix
                </p>
              </div>
            </div>
          </Card>
        </AnimatedStats>

        <AnimatedGrid staggerDelay={0.08} className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-midnight-green mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-5">Exemples d&apos;impact direct</h3>
            <ul className="text-base md:text-lg text-foreground/70 space-y-3">
              <li><strong className="text-midnight-green">2017-2021</strong> : Expansion du réseau de pistes cyclables</li>
              <li><strong className="text-midnight-green">2018-2022</strong> : Programme de revitalisation des quartiers</li>
              <li><strong className="text-midnight-green">2019-2023</strong> : Réforme de la collecte des matières organiques</li>
              <li><strong className="text-midnight-green">2020-2024</strong> : Nouvelles mesures de circulation</li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-midnight-green via-midnight-green to-midnight-green/90 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold mb-5 text-white">
              Chaque vote influence directement :
            </h3>
            <ul className="text-base md:text-lg text-white/90 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <span>Le développement de votre quartier</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <span>Le montant de vos taxes municipales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🚌</span>
                <span>Les services de transport près de chez vous</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌳</span>
                <span>Les espaces verts dans votre secteur</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <span>La sécurité dans votre communauté</span>
              </li>
            </ul>
          </Card>
        </AnimatedGrid>
      </AnimatedSection>

      {/* Visual Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-midnight-green/30 to-transparent mb-16 md:mb-20" />

      {/* Call to action - Enhanced */}
      <AnimatedCTA delay={0.1} className="text-center pb-8">
        <Card className="p-10 md:p-14 bg-gradient-to-br from-midnight-green/10 via-midnight-green/5 to-transparent border-2 border-midnight-green/20 shadow-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Votez en connaissance de cause
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Ne laissez pas les autres décider pour vous. Découvrez quels partis correspondent
            vraiment à vos valeurs et priorités municipales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button asChild size="lg" className="w-full sm:w-fit text-base md:text-lg px-8 py-6">
              <Link href="/profil">
                Découvrir mes affinités
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-fit text-base md:text-lg px-8 py-6">
              <Link href="/comment-ca-marche">
                Comment ça marche ?
              </Link>
            </Button>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Anonyme par défaut • 10 minutes • Résultats instantanés
          </p>
        </Card>
      </AnimatedCTA>
    </div>
  )
}