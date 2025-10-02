import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Vote, Clock, ExternalLink, Info, MapPin } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StartTestButton } from "@/components/ui/start-test-button"
import { CandidatesByMunicipality } from "@/components/elections-2025/candidates-by-municipality"

export const metadata: Metadata = {
  title: "Élections Municipales 2025 Québec | Guide Complet des Candidats et Enjeux",
  description: "Guide complet des élections municipales 2025 au Québec : dates importantes, candidats pour Québec, Montréal, Laval et plus, enjeux clés, et comment voter. Utilisez notre boussole électorale pour découvrir vos affinités politiques.",
  keywords: [
    "élections municipales 2025",
    "élections municipales québec 2025",
    "candidats maire 2025",
    "date élections municipales 2025",
    "comment voter québec 2025",
    "enjeux élections municipales",
    "partis politiques québec 2025",
    "boussole électorale 2025",
    "élections montréal 2025",
    "élections laval 2025"
  ],
  openGraph: {
    title: "Élections Municipales 2025 Québec | Guide Complet",
    description: "Tout savoir sur les élections municipales 2025 au Québec : candidats, enjeux, dates importantes. Découvrez vos affinités politiques avec notre boussole électorale.",
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
    canonical: "https://boussolemunicipale.com/elections-municipales-2025"
  }
}

// Informations générales sur les élections 2025
const electionInfo = {
  dateElection: "2 novembre 2025",
  dateInscription: "14 octobre 2025",
  heuresVote: "10h00 à 20h00",
  villesCouvertes: "Québec, Montréal, Laval, Gatineau, Longueuil, Lévis"
}

// Enjeux clés des élections municipales (partagés par toutes les villes)
const enjeuxCles = [
  {
    titre: "Transport et mobilité",
    description: "Projets de transport structurant, transport en commun, pistes cyclables et circulation automobile",
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
    "name": "Élections Municipales 2025 - Québec",
    "description": "Élections municipales 2025 dans les principales villes du Québec pour élire les maires et conseillers municipaux pour le mandat 2025-2029. Utilisez notre boussole électorale pour découvrir vos affinités politiques.",
    "startDate": "2025-11-02T10:00:00-05:00",
    "endDate": "2025-11-02T20:00:00-05:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Province de Québec",
      "address": {
        "@type": "PostalAddress",
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
          { label: "Élections Municipales 2025", href: "/elections-municipales-2025" }
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
            Guide des Élections Municipales 2025
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Tout ce qu&apos;il faut savoir sur les <strong>élections municipales 2025</strong> dans les principales villes du Québec :
            candidats à la mairie, enjeux prioritaires, dates importantes et comment voter. Utilisez notre <strong>boussole électorale</strong>
            pour découvrir quel parti correspond à vos valeurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <StartTestButton className="rounded-xl px-6 py-4 text-base font-semibold">
              🗳️ Découvrez vos affinités politiques
            </StartTestButton>
          </div>
        </div>

        {/* Informations générales sur les élections municipales au Québec */}
        <section className="mb-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Les Élections Municipales au Québec
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Portée provinciale</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Les élections municipales 2025 se déroulent simultanément dans toutes les municipalités du Québec.
                      Plus de <strong>1 100 municipalités</strong> éliront leur conseil municipal et leur maire le même jour.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Impact direct sur votre quotidien</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Les municipalités gèrent <strong>70% du budget</strong> consacré aux services de proximité :
                      transport, parcs, déneigement, bibliothèques, réglementation locale et développement urbain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Qui peut voter aux élections municipales 2025 ?
                  </h3>
                  <div className="text-blue-800 space-y-2">
                    <p>
                      Pour voter aux élections municipales 2025, vous devez être inscrit sur la liste électorale.
                      Sont admissibles :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Les citoyens canadiens de 18 ans et plus</li>
                      <li>Domiciliés dans la municipalité depuis au moins 6 mois</li>
                      <li>Les propriétaires d&apos;un immeuble ou occupants d&apos;un établissement d&apos;entreprise</li>
                    </ul>
                    <p className="mt-3">
                      Date limite d&apos;inscription : <strong>{electionInfo.dateInscription}</strong>
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100 mt-4">
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

        {/* Informations clés de l'élection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Dates Importantes - Élections 2025
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="font-semibold mb-2">Mandat</h3>
                <p className="text-2xl font-bold text-primary">4 ans</p>
                <p className="text-sm text-muted-foreground mt-1">2025-2029</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Villes couvertes</h3>
                <p className="text-sm font-bold text-primary mt-2">{electionInfo.villesCouvertes}</p>
                <p className="text-sm text-muted-foreground mt-1">+ 1100 municipalités</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Candidats par municipalité (composant client avec dropdown) */}
        <CandidatesByMunicipality />

        {/* Enjeux clés */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Enjeux Clés des Élections Municipales 2025
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Les grandes questions qui animent le débat politique municipal au Québec
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
            le mieux à vos convictions sur les enjeux municipaux de votre ville.
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
