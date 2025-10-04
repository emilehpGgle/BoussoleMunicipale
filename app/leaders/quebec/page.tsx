import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Calendar, MapPin, Award, History } from "lucide-react"
import { partiesData } from "@/lib/boussole-data"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Leaders Politiques Québec | Actuels & Marquants - Élections Municipales 2025",
  description: "Découvrez les leaders politiques de Québec : Bruno Marchand, Sam Hamad et les candidats actuels 2025, plus les figures marquantes comme Régis Labeaume, Jean-Paul L'Allier. Biographies complètes et positions politiques.",
  keywords: [
    "leaders politiques québec",
    "chefs de parti municipaux québec",
    "bruno marchand maire québec",
    "sam hamad leadership québec",
    "régis labeaume ancien maire",
    "jean-paul lallier",
    "andrée boucher première femme maire",
    "élections municipales québec 2025",
    "candidats maire québec",
    "histoire politique québec"
  ],
  openGraph: {
    title: "Leaders Politiques Québec - Actuels & Marquants | Élections 2025",
    description: "Profils complets des leaders politiques de Québec pour 2025 et les figures historiques marquantes de la politique municipale québécoise.",
    type: "website",
    images: [
      {
        url: "/hero-illustration-v2.webp",
        width: 1200,
        height: 630,
        alt: "Leaders politiques de Québec - Actuels et marquants"
      }
    ]
  },
  alternates: {
    canonical: "https://boussolemunicipale.com/leaders/quebec"
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

// Descriptions courtes pour les leaders actuels
const currentLeaderDescriptions: Record<string, string> = {
  "bruno-marchand": "Maire sortant de Québec depuis 2021, ancien président-directeur général de Centraide Québec, Bruno Marchand mise sur la continuité et l'amélioration des services municipaux pour les élections 2025.",
  "sam-hamad": "Homme d'affaires et ancien ministre provincial, Sam Hamad apporte une expertise en développement économique avec une approche centriste et pragmatique pour Leadership Québec.",
  "stevens-melancon": "Leader intérimaire d'Équipe priorité Québec depuis mars 2025 et conseiller municipal, Stevens Mélançon apporte 34 ans d'expérience en éducation avec une approche collaborative axée sur les priorités environnementales et citoyennes.",
  "claude-villeneuve": "Chef de Québec d'abord, Claude Villeneuve défend les intérêts des citoyens avec une vision axée sur la responsabilité fiscale et les valeurs traditionnelles.",
  "stephane-lachance": "Chef de Respect citoyens depuis mars 2025, Stéphane Lachance est co-fondateur du mouvement 'Tramway, non merci' et prône une approche participative de la gouvernance municipale.",
  "alain-giasson": "Chef de l'Alliance citoyenne de Québec depuis 2017, Alain Giasson représente une alternative politique municipale axée sur la responsabilité fiscale et les enjeux d'infrastructure.",
  "jackie-smith": "Cheffe de Transition Québec depuis 2019 et conseillère municipale de Limoilou, Jackie Smith est une militante écologiste proposant une transition environnementale ambitieuse pour la ville."
}

// Leaders marquants de l'histoire de Québec
const historicalLeaders = [
  {
    name: "Régis Labeaume",
    period: "2007-2021",
    description: "Maire emblématique de Québec pendant 14 ans, Régis Labeaume a marqué la ville par ses grands projets d'infrastructure, son franc-parler et sa vision du développement urbain. Il a notamment lancé le projet de tramway et transformé le paysage événementiel de la capitale.",
    achievements: [
      "Maire le plus longtemps en poste dans l'histoire moderne de Québec",
      "Lanceur du projet de tramway de Québec",
      "Développement de l'amphithéâtre de Québec",
      "Transformation du centre-ville et revitalisation urbaine"
    ],
    imageUrl: "/leaders/regis-labeaume.webp"
  },
  {
    name: "Jean-Paul L'Allier",
    period: "1989-2005",
    description: "Visionnaire et bâtisseur, Jean-Paul L'Allier a profondément transformé Québec en tant que maire pendant 16 ans. Il est reconnu pour avoir modernisé la ville tout en préservant son patrimoine historique, notamment dans le Vieux-Québec.",
    achievements: [
      "Revitalisation du Vieux-Québec et protection du patrimoine",
      "Modernisation de l'administration municipale",
      "Développement du réseau de transport en commun",
      "Promotion de Québec sur la scène internationale"
    ],
    imageUrl: "/leaders/jean-paul-lallier.webp"
  },
  {
    name: "Andrée Boucher",
    period: "2005-2007",
    description: "Première femme élue maire de Québec, Andrée Boucher a marqué l'histoire politique municipale québécoise. Bien que son mandat ait été écourté par son décès en 2007, elle reste une figure respectée pour son dévouement et sa vision inclusive.",
    achievements: [
      "Première femme maire de Québec",
      "Promotion de l'égalité des genres en politique municipale",
      "Approche consensuelle et inclusive",
      "Engagement communautaire remarquable"
    ],
    imageUrl: "/leaders/andree-boucher.webp"
  },
  {
    name: "Jean Pelletier",
    period: "1977-1989",
    description: "Maire de Québec pendant 12 ans, Jean Pelletier a été un acteur clé de la modernisation de la ville dans les années 1980. Il a ensuite poursuivi une carrière politique notable au niveau fédéral comme chef de cabinet du Premier ministre Jean Chrétien.",
    achievements: [
      "Modernisation des infrastructures municipales",
      "Développement économique de la région",
      "Transition vers une administration moderne",
      "Carrière politique fédérale distinguée"
    ],
    imageUrl: "/leaders/jean-pelletier.webp"
  }
]

// Autres figures politiques municipales marquantes du Québec
const otherNotableLeaders = [
  {
    name: "Denis Coderre",
    city: "Montréal",
    period: "2013-2017",
    description: "Ancien maire de Montréal, Denis Coderre reste une figure politique influente au Québec. Connu pour son style flamboyant et sa présence médiatique, il a marqué la scène politique municipale québécoise.",
    achievements: [
      "Maire de Montréal pendant 4 ans",
      "Candidat aux élections municipales 2017 et 2021",
      "Carrière fédérale comme député et ministre",
      "Figure médiatique influente"
    ],
    imageUrl: "/leaders/denis-coderre.webp"
  },
  {
    name: "Gérald Tremblay",
    city: "Montréal",
    period: "2002-2012",
    description: "Maire de Montréal pendant 10 ans, Gérald Tremblay a dirigé la métropole durant une période importante de son développement, malgré les controverses qui ont marqué la fin de son mandat.",
    achievements: [
      "Développement du transport collectif",
      "Modernisation des infrastructures",
      "Promotion de Montréal à l'international"
    ],
    imageUrl: "/leaders/gerald-tremblay.webp"
  },
  {
    name: "Pierre Bourque",
    city: "Montréal",
    period: "1994-2001",
    description: "Ancien directeur du Jardin botanique devenu maire de Montréal, Pierre Bourque a apporté une vision environnementale unique à la gestion municipale.",
    achievements: [
      "Maire de Montréal pendant 7 ans",
      "Fusion municipale de l'île de Montréal",
      "Vision environnementale avant-gardiste"
    ],
    imageUrl: "/leaders/pierre-bourque.webp"
  }
]

export default function LeadersQuebecPage() {
  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Leaders Politiques de Québec - Actuels et Marquants",
    "description": "Collection complète des leaders politiques municipaux de Québec : candidats actuels pour 2025 et figures historiques marquantes",
    "url": "https://boussolemunicipale.com/leaders/quebec",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": partiesData.length + historicalLeaders.length,
      "itemListElement": [
        // Leaders actuels
        ...partiesData.map((party, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Person",
            "name": party.leader,
            "jobTitle": `Chef de ${party.name}`,
            "affiliation": {
              "@type": "PoliticalParty",
              "name": party.name
            }
          }
        })),
        // Leaders marquants
        ...historicalLeaders.map((leader, index) => ({
          "@type": "ListItem",
          "position": partiesData.length + index + 1,
          "item": {
            "@type": "Person",
            "name": leader.name,
            "jobTitle": `Ancien maire de Québec (${leader.period})`
          }
        }))
      ]
    }
  }

  return (
    <>
      {/* Structured Data pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Leaders", href: "/leaders" },
          { label: "Québec", href: "/leaders/quebec" }
        ]} />

        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Leaders Politiques de Québec
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
            Découvrez les <strong>leaders politiques de Québec</strong> : candidats actuels pour les élections municipales 2025
            et figures marquantes qui ont façonné l&apos;histoire politique de la capitale.
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
              <span>{partiesData.length} Candidats Actuels</span>
            </div>
          </div>
        </div>

        {/* Section Leaders Actuels 2025 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Leaders Actuels - Élections 2025</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partiesData.map((party) => {
              const slug = generateSlug(party.leader)
              const description = currentLeaderDescriptions[slug] || "Candidat aux élections municipales 2025 de Québec."

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
        </section>

        {/* Section Leaders Marquants */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Leaders Marquants de l&apos;Histoire</h2>
          </div>
          <p className="text-muted-foreground mb-8 text-lg">
            Découvrez les <strong>maires qui ont marqué l&apos;histoire de Québec</strong> et façonné la ville d&apos;aujourd&apos;hui
            par leurs réalisations et leur vision politique.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {historicalLeaders.map((leader) => (
              <Card key={leader.name} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative bg-white rounded-lg shadow-sm flex-shrink-0 overflow-hidden">
                      <Image
                        src={leader.imageUrl}
                        alt={`${leader.name} - Ancien maire de Québec`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="grayscale hover:grayscale-0 transition-all duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold">
                        {leader.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <History className="h-4 w-4" />
                        <span className="text-sm font-medium">Maire {leader.period}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Figure historique
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {leader.description}
                  </p>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Principales réalisations :</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {leader.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Autres figures marquantes du Québec */}
        {otherNotableLeaders.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Autres Figures Municipales Marquantes du Québec
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
              Au-delà de Québec, d&apos;autres leaders ont marqué la politique municipale québécoise,
              notamment à Montréal, deuxième ville en importance de la province.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherNotableLeaders.map((leader) => (
                <Card key={leader.name} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{leader.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {leader.city} • {leader.period}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {leader.city}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {leader.description}
                    </p>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Faits marquants :</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {leader.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Trouvez vos affinités avec les leaders actuels
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Maintenant que vous connaissez les leaders politiques de Québec,
            utilisez notre boussole électorale pour découvrir quel parti correspond le mieux à vos convictions.
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