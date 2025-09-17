import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Award } from "lucide-react"
import { partiesData } from "@/lib/boussole-data"
import type { Party } from "@/lib/boussole-data"

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

// Interface pour les données enrichies des leaders
interface LeaderProfile {
  party: Party
  slug: string
  biography: string
  experience: string[]
  vision2025: string
  achievements: string[]
  socialMedia?: {
    website?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

// Données enrichies des leaders (à étendre selon vos recherches)
const leadersProfiles: Record<string, Omit<LeaderProfile, 'party' | 'slug'>> = {
  "bruno-marchand": {
    biography: "Bruno Marchand est le maire sortant de la Ville de Québec depuis novembre 2021. Ancien journaliste et animateur radio reconnu, il a marqué le paysage médiatique québécois avant de se lancer en politique municipale. Diplômé en communications, il a développé une expertise dans la communication publique et l'engagement citoyen.",
    experience: [
      "Maire de Québec depuis novembre 2021",
      "Animateur radio à CHOI Radio X pendant plus de 15 ans",
      "Journaliste et communicateur expérimenté",
      "Fondateur de plusieurs initiatives communautaires"
    ],
    vision2025: "Pour les élections municipales 2025, Bruno Marchand mise sur la continuité et l'amélioration des services municipaux, avec un accent particulier sur le transport durable, la densification urbaine intelligente et la transition écologique de la ville de Québec.",
    achievements: [
      "Mise en œuvre du projet de tramway de Québec",
      "Amélioration des services de déneigement",
      "Développement de nouvelles pistes cyclables",
      "Renforcement de la démocratie participative"
    ],
    socialMedia: {
      website: "https://www.ville.quebec.qc.ca/"
    }
  },
  "sam-hamad": {
    biography: "Sam Hamad est un homme d'affaires et politicien québécois expérimenté. Ancien ministre dans le gouvernement du Québec, il possède une vaste expérience en gestion publique et en développement économique. Il dirige maintenant Leadership Québec avec une approche centriste et pragmatique.",
    experience: [
      "Chef de Leadership Québec",
      "Ancien ministre dans le gouvernement du Québec",
      "Homme d'affaires et entrepreneur",
      "Expert en développement économique régional"
    ],
    vision2025: "Sam Hamad propose une gestion prudente et efficace de la ville, en mettant l'accent sur le développement économique durable, l'optimisation des services municipaux et une approche équilibrée du développement urbain pour les élections municipales 2025.",
    achievements: [
      "Leadership en développement économique",
      "Expérience ministérielle au gouvernement provincial",
      "Création d'emplois dans la région de Québec",
      "Promotion de partenariats public-privé"
    ]
  },
  "stevens-melancon": {
    biography: "Stevens Mélançon dirige Équipe priorité Québec avec une vision axée sur les priorités citoyennes et l'amélioration de la qualité de vie. Il prône une approche collaborative et à l'écoute des besoins des résidents de tous les quartiers de Québec.",
    experience: [
      "Chef d'Équipe priorité Québec",
      "Militant communautaire engagé",
      "Défenseur des droits des citoyens",
      "Organisateur politique expérimenté"
    ],
    vision2025: "Stevens Mélançon met l'accent sur les priorités environnementales, l'amélioration du transport en commun et la protection des espaces verts, tout en maintenant des finances municipales saines pour les élections 2025.",
    achievements: [
      "Développement de l'engagement citoyen",
      "Promotion des enjeux environnementaux",
      "Advocacy pour l'amélioration des services municipaux",
      "Construction de coalitions politiques"
    ]
  },
  "claude-villeneuve": {
    biography: "Claude Villeneuve est le chef de Québec d'abord, un parti qui prône la priorité aux citoyens de Québec dans les décisions municipales. Il apporte une perspective axée sur les valeurs traditionnelles et la responsabilité fiscale.",
    experience: [
      "Chef de Québec d'abord",
      "Défenseur des valeurs citoyennes",
      "Promoteur de la responsabilité fiscale",
      "Militant pour la démocratie locale"
    ],
    vision2025: "Claude Villeneuve propose de remettre les citoyens de Québec au centre des priorités municipales, avec une gestion rigoureuse des finances publiques et une attention particulière aux besoins des résidents de longue date.",
    achievements: [
      "Défense des intérêts des citoyens de Québec",
      "Promotion de la transparence gouvernementale",
      "Advocacy pour une gestion fiscale responsable",
      "Développement de politiques pro-citoyens"
    ]
  },
  "stephane-lachance": {
    biography: "Stéphane Lachance dirige Respect citoyens avec une philosophie centrée sur le respect des droits et des préoccupations de tous les citoyens de Québec. Il prône une approche inclusive et démocratique de la gouvernance municipale.",
    experience: [
      "Chef de Respect citoyens",
      "Défenseur des droits civiques",
      "Promoteur de l'inclusion sociale",
      "Organisateur communautaire"
    ],
    vision2025: "Stéphane Lachance mise sur le respect des citoyens, l'amélioration de la sécurité publique et une approche équitable du développement urbain pour créer une ville où tous se sentent respectés et entendus.",
    achievements: [
      "Promotion des droits des citoyens",
      "Développement de l'inclusion sociale",
      "Amélioration des relations communautaires",
      "Advocacy pour la justice sociale"
    ]
  },
  "alain-giasson": {
    biography: "Alain Giasson mène l'Alliance citoyenne de Québec avec une vision citoyenne et collaborative. Il met l'accent sur l'importance de l'engagement communautaire et de la participation citoyenne dans les décisions municipales.",
    experience: [
      "Chef de l'Alliance citoyenne de Québec",
      "Organisateur communautaire",
      "Promoteur de la démocratie participative",
      "Militant pour l'engagement citoyen"
    ],
    vision2025: "Alain Giasson propose de renforcer l'alliance entre les citoyens et l'administration municipale, en favorisant la participation citoyenne et en créant des espaces de dialogue pour les élections municipales 2025.",
    achievements: [
      "Développement de la démocratie participative",
      "Création d'alliances citoyennes",
      "Promotion de l'engagement communautaire",
      "Facilitation du dialogue citoyen"
    ]
  },
  "jackie-smith": {
    biography: "Jackie Smith dirige Transition Québec avec une vision axée sur la transition écologique et le développement durable. Elle apporte une perspective environnementale forte et une expertise en développement communautaire durable.",
    experience: [
      "Cheffe de Transition Québec",
      "Militante écologiste reconnue",
      "Experte en développement durable",
      "Organisatrice communautaire"
    ],
    vision2025: "Jackie Smith propose une transition écologique ambitieuse pour Québec, avec un focus sur les énergies renouvelables, la protection de l'environnement et un développement urbain respectueux de la nature pour 2025.",
    achievements: [
      "Leadership en transition écologique",
      "Promotion des énergies renouvelables",
      "Développement de politiques environnementales",
      "Mobilisation citoyenne pour l'environnement"
    ]
  }
}

export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
  
  // Trouver le parti correspondant au leader
  const party = partiesData.find(p => generateSlug(p.leader) === slug)
  
  if (!party || !leadersProfiles[slug]) {
    notFound()
  }

  const leader: LeaderProfile = {
    party,
    slug,
    ...leadersProfiles[slug]
  }

  // Structured Data pour SEO
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": leader.party.leader,
    "jobTitle": `Chef de ${leader.party.name}`,
    "description": leader.biography,
    "affiliation": {
      "@type": "PoliticalParty",
      "name": leader.party.name,
      "url": leader.party.websiteUrl
    },
    "url": `https://boussole-municipale.vercel.app/leaders/${leader.slug}`,
    "image": leader.party.logoUrl,
    "knowsAbout": [
      "Politique municipale",
      "Gouvernance locale", 
      "Élections municipales 2025",
      "Administration publique",
      "Développement urbain"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Québec",
      "addressRegion": "QC", 
      "addressCountry": "CA"
    }
  }

  return (
    <>
      {/* Structured Data pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd)
        }}
      />

      <div className="container max-w-4xl py-12 px-4 md:px-6 space-y-8">
        <div>
          <Button asChild variant="outline" className="mb-8 flex items-center gap-2">
            <Link href="/parti">
              <ArrowLeft className="h-4 w-4" />
              Retour aux partis
            </Link>
          </Button>
        </div>

        {/* Header avec photo et informations principales */}
        <Card className="shadow-soft rounded-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 relative bg-white rounded-xl p-3 shadow-sm">
                <Image
                  src={leader.party.logoUrl || "/placeholder.svg?width=160&height=160"}
                  alt={`Photo de ${leader.party.leader} - ${leader.party.name} - Élections municipales 2025`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {leader.party.leader}
                </h1>
                <p className="text-xl text-muted-foreground mb-3">
                  Chef de {leader.party.name}
                </p>
                <Badge variant="secondary" className="text-sm mb-4">
                  {leader.party.orientation || "Candidat aux élections municipales 2025"}
                </Badge>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ville de Québec
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Élections 2025
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {leader.party.shortName || leader.party.name}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {leader.biography}
            </p>
          </CardContent>
        </Card>

        {/* Expérience et réalisations */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Expérience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leader.experience.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réalisations principales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leader.achievements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Vision pour 2025 */}
        <Card>
          <CardHeader>
            <CardTitle>Vision pour les élections municipales 2025</CardTitle>
            <CardDescription>
              Les priorités et objectifs de {leader.party.leader} pour la ville de Québec
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {leader.vision2025}
            </p>
          </CardContent>
        </Card>

        {/* Liens vers le parti et site officiel */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link href={`/parti/${leader.party.id}`}>
              Voir le profil complet du parti
            </Link>
          </Button>
          
          {leader.party.websiteUrl && (
            <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
              <a href={leader.party.websiteUrl} target="_blank" rel="noopener noreferrer">
                Site officiel <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}

          <Button asChild variant="ghost" size="lg">
            <Link href="/test-politique-municipal">
              Faire le questionnaire politique
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

// Génération des métadonnées dynamiques pour chaque leader
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
  const party = partiesData.find(p => generateSlug(p.leader) === slug)
  
  if (!party) {
    return {
      title: "Leader non trouvé",
      description: "Ce profil de leader n'existe pas."
    }
  }

  return {
    title: `${party.leader} - Chef de ${party.name} | Profil Élections Municipales 2025`,
    description: `Découvrez le profil complet de ${party.leader}, chef de ${party.name} pour les élections municipales de Québec 2025. Biographie, expérience, vision politique et réalisations.`,
    keywords: [
      party.leader.toLowerCase(),
      party.name.toLowerCase(),
      "élections municipales 2025",
      "québec",
      "maire",
      "chef politique",
      "candidat municipal",
      "politique québec",
      "boussole électorale"
    ],
    openGraph: {
      title: `${party.leader} - Profil Politique | Élections Municipales Québec 2025`,
      description: `Profil complet de ${party.leader}, chef de ${party.name}. Découvrez son expérience, sa vision et ses positions pour les élections municipales 2025.`,
      type: "profile",
      images: [
        {
          url: party.logoUrl || "/hero-illustration-v2.webp",
          width: 1200,
          height: 630,
          alt: `${party.leader} - ${party.name} - Élections municipales 2025`
        }
      ]
    },
    alternates: {
      canonical: `https://boussole-municipale.vercel.app/leaders/${slug}`
    }
  }
}

// Génération des routes statiques pour tous les leaders
export async function generateStaticParams() {
  return partiesData.map((party) => ({
    slug: generateSlug(party.leader)
  }))
}