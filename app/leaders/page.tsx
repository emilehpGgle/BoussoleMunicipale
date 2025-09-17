import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react"
import { partiesData } from "@/lib/boussole-data"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Leaders Politiques Municipaux | Hub Provincial - Élections 2025",
  description: "Hub central des leaders politiques municipaux du Québec. Découvrez les profils des candidats et figures marquantes de Québec, Montréal et autres grandes villes pour les élections municipales 2025.",
  keywords: [
    "leaders politiques municipaux",
    "chefs de parti municipaux québec",
    "élections municipales 2025",
    "candidats maire québec",
    "leaders politiques québec",
    "bruno marchand",
    "sam hamad",
    "denis coderre montréal",
    "profils politiques municipaux"
  ],
  openGraph: {
    title: "Leaders Politiques Municipaux | Hub Provincial - Élections 2025",
    description: "Hub central des leaders politiques municipaux du Québec pour les élections 2025. Découvrez les candidats de Québec, Montréal et autres villes.",
    type: "website",
    images: [
      {
        url: "/hero-illustration-v2.webp",
        width: 1200,
        height: 630,
        alt: "Hub des leaders politiques municipaux du Québec 2025"
      }
    ]
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/leaders"
  }
}

// Fonction pour générer le slug à partir du nom du leader
function generateSlug(leaderName: string): string {
  return leaderName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprime les caractères spéciaux
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Remplace les tirets multiples par un seul
    .trim()
}


export default function LeadersIndexPage() {
  // Structured Data pour la page d'index
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Leaders Politiques Municipaux - Élections Québec 2025",
    "description": "Liste des chefs de parti pour les élections municipales de Québec 2025",
    "url": "https://boussole-municipale.vercel.app/leaders",
    "numberOfItems": partiesData.length,
    "itemListElement": partiesData.map((party, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": party.leader,
        "jobTitle": `Chef de ${party.name}`,
        "affiliation": {
          "@type": "PoliticalParty",
          "name": party.name
        },
        "url": `https://boussole-municipale.vercel.app/leaders/${generateSlug(party.leader)}`
      }
    }))
  }

  return (
    <>
      {/* Structured Data pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd)
        }}
      />

      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Leaders Politiques", href: "/leaders" }
        ]} />
        
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Leaders Politiques Municipaux du Québec
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
            Hub central des <strong>leaders politiques municipaux</strong> pour les élections 2025.
            Découvrez les candidats actuels et les figures marquantes qui ont façonné les grandes villes du Québec.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Élections 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Grandes villes du Québec</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Leaders Actuels & Historiques</span>
            </div>
          </div>
        </div>

        {/* Sélection par ville */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Ville de Québec - Disponible maintenant */}
          <Card className="hover:shadow-lg transition-all duration-200 group cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    Ville de Québec
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Capitale du Québec • Population: ~540,000
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Disponible
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Découvrez les <strong>{partiesData.length} candidats aux élections municipales 2025</strong> et les figures marquantes
                de l&apos;histoire politique de la capitale : Régis Labeaume, Jean-Paul L&apos;Allier, Andrée Boucher.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>• {partiesData.length} candidats 2025</span>
                <span>• 4 figures historiques</span>
                <span>• Biographies complètes</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/leaders/quebec" className="flex items-center gap-2">
                  Voir les leaders de Québec
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Montréal - Bientôt disponible */}
          <Card className="hover:shadow-lg transition-all duration-200 group opacity-75">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Ville de Montréal
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Métropole du Québec • Population: ~1,780,000
                  </p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Bientôt
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Prochainement : candidats aux élections municipales de Montréal et figures marquantes
                comme <strong>Denis Coderre</strong>, Valérie Plante, Gérald Tremblay, Jean Drapeau.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>• Candidats 2025</span>
                <span>• Denis Coderre et autres</span>
                <span>• Histoire politique</span>
              </div>
              <Button disabled className="w-full">
                Prochainement disponible
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Aperçu des leaders actuels de Québec */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Aperçu des candidats 2025 - Ville de Québec
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partiesData.slice(0, 6).map((party) => {
              return (
                <Card key={party.id} className="hover:shadow-md transition-all duration-200 group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative bg-white rounded-lg p-1 shadow-sm flex-shrink-0">
                        <Image
                          src={party.logoUrl || "/placeholder.svg?width=48&height=48"}
                          alt={`Logo ${party.name}`}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold group-hover:text-primary transition-colors text-sm">
                          {party.leader}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {party.shortName || party.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link href="/leaders/quebec">
                Voir tous les leaders de Québec
              </Link>
            </Button>
          </div>
        </section>

        {/* Section d'information */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>À propos des profils de leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ces profils présentent les leaders des principaux partis politiques municipaux de Québec 
              pour les élections 2025. Chaque profil inclut leur biographie, expérience politique, 
              réalisations principales et vision pour l&apos;avenir de la ville.
            </p>
            <p className="text-muted-foreground text-sm">
              Les informations sont compilées à partir de sources publiques et des communications 
              officielles des partis politiques.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Trouvez vos affinités politiques
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Maintenant que vous connaissez les leaders, utilisez notre boussole électorale 
            pour découvrir quel parti correspond le mieux à vos convictions politiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/test-politique-municipal">
                Faire le test politique municipal
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/parti">
                Voir tous les partis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}