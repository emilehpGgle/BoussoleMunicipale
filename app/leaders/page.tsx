import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react"
import { partiesData } from "@/lib/boussole-data"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Leaders Politiques | Profils des Chefs de Parti - Élections Municipales 2025",
  description: "Découvrez les profils complets des leaders politiques municipaux pour les élections 2025 à Québec : Bruno Marchand, Sam Hamad, Stevens Mélançon et tous les chefs de parti. Biographies, expérience et vision politique.",
  keywords: [
    "leaders politiques québec",
    "chefs de parti municipaux",
    "bruno marchand",
    "sam hamad", 
    "stevens melancon",
    "élections municipales 2025",
    "candidats maire québec",
    "profils politiques",
    "boussole électorale"
  ],
  openGraph: {
    title: "Leaders Politiques - Profils des Candidats | Élections Municipales Québec 2025",
    description: "Profils détaillés des leaders des partis municipaux de Québec pour les élections 2025. Découvrez leur expérience, vision et positions politiques.",
    type: "website",
    images: [
      {
        url: "/hero-illustration-v2.webp",
        width: 1200,
        height: 630,
        alt: "Leaders politiques municipaux - Élections Québec 2025"
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

// Descriptions courtes pour la page d'index
const leaderDescriptions: Record<string, string> = {
  "bruno-marchand": "Maire sortant de Québec depuis 2021, ancien journaliste et animateur radio reconnu, Bruno Marchand mise sur la continuité et l'amélioration des services municipaux.",
  "sam-hamad": "Homme d'affaires et ancien ministre provincial, Sam Hamad apporte une expertise en développement économique avec une approche centriste et pragmatique.",
  "stevens-melancon": "Leader d'Équipe priorité Québec, Stevens Mélançon prône une approche collaborative axée sur les priorités environnementales et citoyennes.",
  "claude-villeneuve": "Chef de Québec d'abord, Claude Villeneuve défend les intérêts des citoyens avec une vision axée sur la responsabilité fiscale et les valeurs traditionnelles.",
  "stephane-lachance": "Dirigeant de Respect citoyens, Stéphane Lachance met l'accent sur le respect des droits et une approche inclusive de la gouvernance municipale.",
  "alain-giasson": "Chef de l'Alliance citoyenne, Alain Giasson promeut l'engagement communautaire et la démocratie participative dans les décisions municipales.",
  "jackie-smith": "Cheffe de Transition Québec, Jackie Smith propose une vision ambitieuse de transition écologique et de développement durable pour la ville."
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
            Leaders Politiques Municipaux
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Découvrez les profils détaillés des chefs de parti pour les <strong>élections municipales 2025</strong> à Québec. 
            Biographies, expérience politique et vision pour l'avenir de la ville.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Élections 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Ville de Québec</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>{partiesData.length} Leaders</span>
            </div>
          </div>
        </div>

        {/* Grille des leaders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partiesData.map((party) => {
            const slug = generateSlug(party.leader)
            const description = leaderDescriptions[slug] || "Candidat aux élections municipales 2025 de Québec."
            
            return (
              <Card key={party.id} className="hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 relative bg-white rounded-lg p-2 shadow-sm flex-shrink-0">
                      <Image
                        src={party.logoUrl || "/placeholder.svg?width=64&height=64"}
                        alt={`Logo ${party.name} - ${party.leader}`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                        {party.leader}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Chef de {party.shortName || party.name}
                      </p>
                    </div>
                  </div>
                  {party.orientation && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      {party.orientation}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {description}
                  </CardDescription>
                  
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/leaders/${slug}`} className="flex items-center gap-2">
                        Voir le profil
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/parti/${party.id}`}>
                        Parti
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Section d'information */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>À propos des profils de leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ces profils présentent les leaders des principaux partis politiques municipaux de Québec 
              pour les élections 2025. Chaque profil inclut leur biographie, expérience politique, 
              réalisations principales et vision pour l'avenir de la ville.
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
              <Link href="/questionnaire">
                Faire le questionnaire politique
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