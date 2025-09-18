import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Vote, Clock, ExternalLink, Info } from "lucide-react"
import { partiesData } from "@/lib/boussole-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StartTestButton } from "@/components/ui/start-test-button"

export const metadata: Metadata = {
  title: "Élections Municipales 2025 Québec | Guide Complet des Candidats et Enjeux",
  description: "Guide complet des élections municipales 2025 à Québec : dates importantes, candidats (Bruno Marchand, Sam Hamad), enjeux clés, et comment voter. Utilisez notre boussole électorale pour découvrir vos affinités politiques.",
  keywords: [
    "élections municipales 2025",
    "élections municipales québec 2025",
    "élections municipales 2025 quebec",
    "bruno marchand 2025",
    "sam hamad élections",
    "candidats maire québec 2025",
    "date élections municipales 2025",
    "comment voter québec 2025",
    "enjeux élections municipales",
    "partis politiques québec 2025",
    "boussole électorale 2025"
  ],
  openGraph: {
    title: "Élections Municipales 2025 Québec | Guide Complet",
    description: "Tout savoir sur les élections municipales 2025 à Québec : candidats, enjeux, dates importantes. Découvrez vos affinités politiques avec notre boussole électorale.",
    type: "website",
    images: [
      {
        url: "/hero-illustration-v2.webp",
        width: 1200,
        height: 630,
        alt: "Élections Municipales 2025 Québec - Guide complet"
      }
    ]
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/elections-municipales-2025-quebec"
  }
}

// Données sur les élections 2025
const electionInfo = {
  dateElection: "2 novembre 2025",
  dateInscription: "14 octobre 2025",
  heuresVote: "10h00 à 20h00",
  nombrePostes: "Maire + 21 conseillers",
  electeursInscrits: "~400,000"
}

// Enjeux clés des élections 2025
const enjeuxCles = [
  {
    titre: "Transport et mobilité",
    description: "Projet de tramway, transport en commun, pistes cyclables et circulation automobile",
    icon: "🚊"
  },
  {
    titre: "Logement abordable",
    description: "Crise du logement, développement résidentiel et accessibilité financière",
    icon: "🏠"
  },
  {
    titre: "Environnement",
    description: "Transition écologique, espaces verts, gestion des déchets et qualité de l'air",
    icon: "🌱"
  },
  {
    titre: "Fiscalité municipale",
    description: "Niveau de taxation, services municipaux et optimisation des dépenses publiques",
    icon: "💰"
  },
  {
    titre: "Services de proximité",
    description: "Bibliothèques, parcs, déneigement, sécurité publique et services aux citoyens",
    icon: "🏛️"
  },
  {
    titre: "Développement économique",
    description: "Attraction d'entreprises, création d'emplois et dynamisme économique régional",
    icon: "📈"
  }
]

export default function ElectionsMunicipales2025Page() {
  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Élections Municipales 2025 - Ville de Québec",
    "description": "Élections municipales de la Ville de Québec pour élire le maire et les conseillers municipaux pour le mandat 2025-2029. Utilisez notre boussole électorale pour découvrir vos affinités politiques.",
    "startDate": "2025-11-02T10:00:00-05:00",
    "endDate": "2025-11-02T20:00:00-05:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Ville de Québec",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Québec",
        "addressRegion": "QC",
        "addressCountry": "CA"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Élections Québec",
      "url": "https://www.electionsquebec.qc.ca/"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock",
      "description": "Le vote est gratuit et ouvert à tous les citoyens inscrits"
    },
    "performer": [
      {
        "@type": "Person",
        "name": "Bruno Marchand",
        "jobTitle": "Candidat à la mairie - Québec forte et fière"
      },
      {
        "@type": "Person",
        "name": "Sam Hamad",
        "jobTitle": "Candidat à la mairie - Québec renouveau municipal"
      }
    ],
    "about": {
      "@type": "Thing",
      "name": "Enjeux électoraux municipaux",
      "description": "Transport, logement, environnement, fiscalité municipale, services de proximité"
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
          { label: "Élections Municipales 2025 Québec", href: "/elections-municipales-2025-quebec" }
        ]} />

        {/* En-tête héro */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Vote className="h-8 w-8 text-primary" />
            <Badge className="bg-red-100 text-red-800 border-red-200 text-sm">
              2 novembre 2025
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guide Complet des Élections Municipales 2025
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Tout ce qu'il faut savoir sur les <strong>élections municipales à Québec</strong> : candidats à la mairie,
            enjeux prioritaires, dates importantes et comment voter. Utilisez notre <strong>boussole électorale</strong>
            pour découvrir quel parti correspond à vos valeurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <StartTestButton className="rounded-xl px-6 py-4 text-base font-semibold">
              🗳️ Découvrez vos affinités politiques
            </StartTestButton>
            <Button asChild variant="outline" size="lg">
              <Link href="/leaders/quebec">
                Voir tous les candidats
              </Link>
            </Button>
          </div>
        </div>

        {/* Informations clés de l'élection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Informations Clés - Élections 2025
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Date de l&apos;élection</h3>
                <p className="text-2xl font-bold text-primary">{electionInfo.dateElection}</p>
                <p className="text-sm text-muted-foreground mt-1">{electionInfo.heuresVote}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Inscription limite</h3>
                <p className="text-2xl font-bold text-primary">{electionInfo.dateInscription}</p>
                <p className="text-sm text-muted-foreground mt-1">Pour nouveaux électeurs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Postes à pourvoir</h3>
                <p className="text-2xl font-bold text-primary">{electionInfo.nombrePostes}</p>
                <p className="text-sm text-muted-foreground mt-1">Sur l&apos;ensemble de la ville</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Comment participer aux élections municipales 2025 ?
                  </h3>
                  <p className="text-blue-800 mb-3">
                    Pour voter aux élections municipales 2025 de Québec, vous devez être inscrit sur la liste électorale.
                    La date limite d&apos;inscription est le {electionInfo.dateInscription}.
                  </p>
                  <Button asChild variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Link href="https://www.electionsquebec.qc.ca/" target="_blank" rel="noopener noreferrer">
                      S&apos;inscrire sur la liste électorale
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Candidats principaux */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Candidats aux Élections Municipales 2025
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Découvrez les <strong>{partiesData.length} candidats</strong> en lice pour devenir maire de Québec
            et leurs positions sur les enjeux municipaux qui vous touchent.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {partiesData.slice(0, 6).map((party) => (
              <Card key={party.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 relative bg-white rounded-lg p-1 shadow-sm">
                      <Image
                        src={party.logoUrl || "/placeholder.svg?width=48&height=48"}
                        alt={`Logo ${party.name}`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{party.leader}</CardTitle>
                      <p className="text-sm text-muted-foreground">{party.shortName}</p>
                    </div>
                  </div>
                  {party.orientation && (
                    <Badge variant="secondary" className="w-fit text-xs">
                      {party.orientation}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/parti/${party.id}`}>
                      Voir le programme
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/leaders/quebec">
                Voir tous les candidats et leur biographie
              </Link>
            </Button>
          </div>
        </section>

        {/* Enjeux clés */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Enjeux Clés des Élections Municipales 2025
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Les grandes questions qui animent le débat politique municipal à Québec
            et qui influenceront votre qualité de vie pour les quatre prochaines années.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enjeuxCles.map((enjeu, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{enjeu.icon}</div>
                  <h3 className="font-semibold mb-2 text-lg">{enjeu.titre}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {enjeu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action principal */}
        <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Prêt pour les Élections Municipales 2025 ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Utilisez notre <strong>boussole électorale</strong> pour découvrir quel candidat correspond
            le mieux à vos convictions sur les enjeux municipaux de Québec.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StartTestButton className="rounded-xl px-8 py-4 text-lg font-semibold">
              Faire le test politique municipal
            </StartTestButton>
            <Button asChild variant="outline" size="lg">
              <Link href="/a-propos">
                En savoir plus sur notre méthode
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}