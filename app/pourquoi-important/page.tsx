import Link from "next/link"
import { ArrowLeft, Home, Car, Leaf, DollarSign, Shield, Building2, Users, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ServiceCard } from "@/components/ui/uniform-card"
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
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Pourquoi c&apos;est important
        </h1>
        <p className="text-lg text-muted-foreground">
          Les élections municipales façonnent votre quotidien plus que vous ne le pensez.
        </p>
      </div>

      {/* Impact direct */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">La municipalité : votre gouvernement le plus proche</h2>
        
        <div className="card-grid-services mb-8">
          <ServiceCard
            icon={<Car className="icon-large" />}
            title="Transport"
            items={[
              "• Réseau de transport en commun",
              "• Pistes cyclables et trottoirs",
              "• Stationnement et circulation",
              "• Réfection des routes"
            ]}
          />
          <ServiceCard
            icon={<Home className="icon-large" />}
            title="Logement"
            items={[
              "• Logement social et abordable",
              "• Réglementation urbaine",
              "• Développement de quartiers",
              "• Protection locataires"
            ]}
          />
          <ServiceCard
            icon={<Leaf className="icon-large" />}
            title="Environnement"
            items={[
              "• Gestion des déchets",
              "• Parcs et espaces verts",
              "• Qualité de l'air et de l'eau",
              "• Lutte aux îlots de chaleur"
            ]}
          />
          <ServiceCard
            icon={<DollarSign className="icon-large" />}
            title="Économie"
            items={[
              "• Taxes municipales",
              "• Soutien aux commerces",
              "• Développement économique",
              "• Tarifs services municipaux"
            ]}
          />
          <ServiceCard
            icon={<Shield className="icon-large" />}
            title="Sécurité"
            items={[
              "• Services policiers",
              "• Prévention incendies",
              "• Sécurité des quartiers",
              "• Services d'urgence"
            ]}
          />
          <ServiceCard
            icon={<Building2 className="icon-large" />}
            title="Services"
            items={[
              "• Bibliothèques et loisirs",
              "• Centres communautaires",
              "• Services aux aînés",
              "• Programmes jeunesse"
            ]}
          />
        </div>

        <Card className="p-6 bg-midnight-green/5">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 text-midnight-green mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-3 text-midnight-green">
                Le niveau de gouvernement le plus proche de vous
              </h3>
              <p className="text-muted-foreground">
                Contrairement aux gouvernements provincial et fédéral, la municipalité gère les services 
                que vous utilisez <strong>quotidiennement</strong>. Vos décisions d&apos;aujourd&apos;hui 
                façonnent directement votre cadre de vie pour les 4 prochaines années.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Statistiques participation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">La réalité de la participation</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Taux de participation historique</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Élections municipales 2021</span>
                  <span className="font-semibold">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Élections provinciales 2022</span>
                  <span className="font-semibold">66%</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Élections fédérales 2021</span>
                  <span className="font-semibold">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Pourtant, c&apos;est au municipal que votre vote a le plus d&apos;impact !
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Pourquoi cette faible participation ?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Méconnaissance des enjeux</strong> municipaux spécifiques</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Complexité</strong> des programmes et positions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Impression</strong> que &quot;ça ne change rien&quot;</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-midnight-green rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Manque d&apos;outils</strong> pour s&apos;informer facilement</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-midnight-green/10 rounded-lg">
              <p className="text-sm font-semibold text-midnight-green">
                C&apos;est exactement pourquoi la Boussole Municipale existe !
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Impact de votre vote */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Votre vote compte vraiment</h2>
        
        <Card className="p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-midnight-green mb-2">15,000</div>
              <p className="text-sm text-muted-foreground">
                Électeurs moyens par district à Québec
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-green mb-2">1 sur 15,000</div>
              <p className="text-sm text-muted-foreground">
                Le poids de votre vote municipal
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold text-midnight-green mb-2">4 ans</div>
              <p className="text-sm text-muted-foreground">
                Durée d&apos;impact de votre choix
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-midnight-green mb-4" />
            <h3 className="text-lg font-semibold mb-3">Exemples d&apos;impact direct</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>2017-2021</strong> : Expansion du réseau de pistes cyclables</li>
              <li><strong>2018-2022</strong> : Programme de revitalisation des quartiers</li>
              <li><strong>2019-2023</strong> : Réforme de la collecte des matières organiques</li>
              <li><strong>2020-2024</strong> : Nouvelles mesures de circulation</li>
            </ul>
          </Card>

          <Card className="p-6 bg-midnight-green/5">
            <h3 className="text-lg font-semibold mb-3 text-midnight-green">
              Chaque vote influence directement :
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>🏠 Le développement de votre quartier</li>
              <li>💰 Le montant de vos taxes municipales</li>
              <li>🚌 Les services de transport près de chez vous</li>
              <li>🌳 Les espaces verts dans votre secteur</li>
              <li>🛡️ La sécurité dans votre communauté</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center py-8">
        <Card className="p-8 bg-gradient-to-r from-midnight-green/10 to-midnight-green/5">
          <h2 className="text-2xl font-bold mb-4">Votez en connaissance de cause</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ne laissez pas les autres décider pour vous. Découvrez quels partis correspondent 
            vraiment à vos valeurs et priorités municipales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-fit">
              <Link href="/profil">
                Découvrir mes affinités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-fit">
              <Link href="/comment-ca-marche">
                Comment ça marche ?
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Anonyme par défaut • 10 minutes • Résultats instantanés
          </p>
        </Card>
      </section>
    </div>
  )
}