import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Award } from "lucide-react"

interface LeaderPageProps {
  params: Promise<{
    municipality: string
    slug: string
  }>
}

// Interface pour les données de leader depuis l'API
interface Leader {
  id: string
  name: string
  slug: string
  party_id: string
  municipality_id: string
  biography?: string
  photo_url?: string
  experience: string[]
  vision_2025?: string
  achievements: string[]
  website_url?: string
  facebook_url?: string
  twitter_url?: string
  linkedin_url?: string
  party?: {
    id: string
    name: string
    short_name?: string
    logo_url?: string
    orientation?: string
    website_url?: string
  }
}

/**
 * Fonction pour récupérer un leader depuis l'API (Server-Side)
 */
async function getLeader(municipality: string, slug: string): Promise<Leader | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const url = new URL('/api/leaders', baseUrl)
    url.searchParams.set('municipality', municipality)
    url.searchParams.set('slug', slug)

    const response = await fetch(url.toString(), {
      cache: 'no-store', // Always fresh data for leaders
    })

    if (!response.ok) {
      console.error(`[Leader Page] Failed to fetch leader: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.leader || null
  } catch (error) {
    console.error('[Leader Page] Error fetching leader:', error)
    return null
  }
}

export default async function LeaderPage({ params }: LeaderPageProps) {
  const resolvedParams = await params
  const { municipality, slug } = resolvedParams

  // Récupérer le leader depuis l'API
  const leader = await getLeader(municipality, slug)

  if (!leader) {
    notFound()
  }

  const municipalityDisplay = municipality.charAt(0).toUpperCase() + municipality.slice(1)

  // Structured Data pour SEO
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": leader.name,
    "jobTitle": `Chef de ${leader.party?.name || 'parti municipal'}`,
    "description": leader.biography || `Leader politique municipal à ${municipalityDisplay}`,
    "affiliation": leader.party ? {
      "@type": "PoliticalParty",
      "name": leader.party.name,
      "url": leader.party.website_url || leader.website_url
    } : undefined,
    "url": `https://boussolemunicipale.com/${municipality}/leaders/${leader.slug}`,
    "image": leader.photo_url || leader.party?.logo_url,
    "knowsAbout": [
      "Politique municipale",
      "Gouvernance locale",
      "Élections municipales 2025",
      "Administration publique",
      "Développement urbain"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": municipalityDisplay,
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
            <Link href={`/${municipality}/leaders`}>
              <ArrowLeft className="h-4 w-4" />
              Retour aux leaders
            </Link>
          </Button>
        </div>

        {/* Header avec photo et informations principales */}
        <Card className="shadow-soft rounded-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 relative bg-white rounded-xl p-3 shadow-sm">
                <Image
                  src={leader.photo_url || leader.party?.logo_url || "/placeholder.svg?width=160&height=160"}
                  alt={`Photo de ${leader.name} - ${leader.party?.name || 'parti municipal'} - Élections municipales 2025`}
                  fill
                  style={{ objectFit: leader.photo_url ? "cover" : "contain" }}
                  className={leader.photo_url ? "rounded-lg" : ""}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {leader.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-3">
                  Chef de {leader.party?.name || 'parti municipal'}
                </p>
                {leader.party?.orientation && (
                  <Badge variant="secondary" className="text-sm mb-4">
                    {leader.party.orientation}
                  </Badge>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ville de {municipalityDisplay}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Élections 2025
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {leader.party?.short_name || leader.party?.name || 'Parti municipal'}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          {leader.biography && (
            <CardContent className="p-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {leader.biography}
              </p>
            </CardContent>
          )}
        </Card>

        {/* Expérience et réalisations */}
        {(leader.experience.length > 0 || leader.achievements.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {leader.experience.length > 0 && (
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
            )}

            {leader.achievements.length > 0 && (
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
            )}
          </div>
        )}

        {/* Vision pour 2025 */}
        {leader.vision_2025 && (
          <Card>
            <CardHeader>
              <CardTitle>Vision pour les élections municipales 2025</CardTitle>
              <CardDescription>
                Les priorités et objectifs de {leader.name} pour la ville de {municipalityDisplay}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {leader.vision_2025}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Liens vers le parti et site officiel */}
        <div className="flex flex-col sm:flex-row gap-4">
          {leader.party && (
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link href={`/${municipality}/parti/${leader.party.id}`}>
                Voir le profil complet du parti
              </Link>
            </Button>
          )}

          {(leader.website_url || leader.party?.website_url) && (
            <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
              <a href={leader.website_url || leader.party?.website_url || '#'} target="_blank" rel="noopener noreferrer">
                Site officiel <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}

          <Button asChild variant="ghost" size="lg">
            <Link href={`/${municipality}/test-politique-municipal`}>
              Faire le questionnaire politique
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

// Génération des métadonnées dynamiques pour chaque leader
export async function generateMetadata({ params }: LeaderPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { municipality, slug } = resolvedParams

  const leader = await getLeader(municipality, slug)

  if (!leader) {
    return {
      title: "Leader non trouvé",
      description: "Ce profil de leader n'existe pas."
    }
  }

  const municipalityDisplay = municipality.charAt(0).toUpperCase() + municipality.slice(1)

  return {
    title: `${leader.name} - Chef de ${leader.party?.name || 'parti municipal'} | Profil Élections Municipales ${municipalityDisplay} 2025`,
    description: leader.biography || `Découvrez le profil complet de ${leader.name}, chef de ${leader.party?.name || 'parti municipal'} pour les élections municipales de ${municipalityDisplay} 2025. Biographie, expérience, vision politique et réalisations.`,
    keywords: [
      leader.name.toLowerCase(),
      leader.party?.name.toLowerCase() || 'parti municipal',
      `élections municipales ${municipality} 2025`,
      municipality,
      "maire",
      "chef politique",
      "candidat municipal",
      `politique ${municipality}`,
      "boussole électorale"
    ],
    openGraph: {
      title: `${leader.name} - Profil Politique | Élections Municipales ${municipalityDisplay} 2025`,
      description: leader.biography || `Profil complet de ${leader.name}, chef de ${leader.party?.name || 'parti municipal'}. Découvrez son expérience, sa vision et ses positions pour les élections municipales ${municipalityDisplay} 2025.`,
      type: "profile",
      images: [
        {
          url: leader.photo_url || leader.party?.logo_url || "/hero-illustration-v2.webp",
          width: 1200,
          height: 630,
          alt: `${leader.name} - ${leader.party?.name || 'parti municipal'} - Élections municipales ${municipalityDisplay} 2025`
        }
      ]
    },
    alternates: {
      canonical: `https://boussolemunicipale.com/${municipality}/leaders/${slug}`
    }
  }
}

// Génération des routes statiques pour tous les leaders
export async function generateStaticParams() {
  // Pour l'instant, retourner un tableau vide pour que Next.js génère dynamiquement
  // Vous pouvez améliorer ceci en récupérant tous les leaders depuis l'API
  return []
}

// OLD HARDCODED DATA REMOVED - Now using Supabase API
// Les données hardcodées ont été supprimées et remplacées par l'API Supabase
// qui charge dynamiquement les leaders depuis la table `leaders`

// Dummy placeholder to maintain structure
const __OLD_HARDCODED_PROFILES_REMOVED = {
}