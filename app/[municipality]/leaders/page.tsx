import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Calendar, MapPin, Award, History } from "lucide-react"
import { Party } from "@/lib/boussole-data"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Fonction pour récupérer les partis par municipalité avec gestion gracieuse des erreurs
async function getPartiesByMunicipality(municipality: string): Promise<Party[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://boussolemunicipale.com'

    console.log(`[📡 LEADERS PAGE] Récupération partis pour ${municipality}`)
    console.log(`[📡 LEADERS PAGE] Base URL: ${baseUrl}`)

    const response = await fetch(
      `${baseUrl}/api/parties?municipality=${encodeURIComponent(municipality)}`,
      {
        next: { revalidate: 3600 }, // Cache avec revalidation toutes les heures
        headers: {
          'User-Agent': 'NextJS-Build-Leaders-Page'
        }
      }
    )

    console.log(`[📡 LEADERS PAGE] Response status: ${response.status} pour ${municipality}`)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[📡 LEADERS PAGE] ⚠️ Aucun parti trouvé pour ${municipality} (404) - Génération avec données vides`)

        // Pour debug : essayer de récupérer les détails de l'erreur
        try {
          const errorData = await response.json()
          if (errorData.debug) {
            console.log(`[📡 LEADERS PAGE] Debug info:`, {
              municipality,
              availableMunicipalities: errorData.debug.availableMunicipalities,
              totalPartiesInDB: errorData.debug.totalPartiesInDB
            })
          }
        } catch (_e) {
          console.log(`[📡 LEADERS PAGE] Impossible de parser les détails d'erreur pour ${municipality}`)
        }

        return [] // Retourner tableau vide au lieu de faire échouer le build
      }

      console.error(`[📡 LEADERS PAGE] ❌ Erreur ${response.status} pour ${municipality}`)
      return [] // Graceful degradation pour toutes les autres erreurs
    }

    const data = await response.json()
    const partiesCount = data.parties?.length || 0
    console.log(`[📡 LEADERS PAGE] ✅ ${partiesCount} partis récupérés pour ${municipality}`)

    return data.parties || []

  } catch (error) {
    console.error(`[📡 LEADERS PAGE] ❌ Erreur de connexion pour ${municipality}:`, error)

    // En cas d'erreur réseau pendant le build, continuer avec un tableau vide
    console.warn(`[📡 LEADERS PAGE] ⚠️ Graceful degradation: données vides pour ${municipality}`)
    return []
  }
}

// Génération statique des paramètres pour les municipalités connues
export async function generateStaticParams() {
  return [
    { municipality: 'quebec' },
    { municipality: 'montreal' },
    { municipality: 'laval' },
    { municipality: 'levis' },
    { municipality: 'longueuil' },
    { municipality: 'gatineau' }
  ]
}

interface LeadersPageProps {
  params: Promise<{
    municipality: string
  }>
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

// Descriptions courtes pour les leaders actuels par municipalité
const currentLeaderDescriptions: Record<string, Record<string, string>> = {
  quebec: {
    "bruno-marchand": "Maire sortant de Québec depuis 2021, ancien président-directeur général de Centraide Québec, Bruno Marchand mise sur la continuité et l'amélioration des services municipaux pour les élections 2025.",
    "sam-hamad": "Homme d&apos;affaires et ancien ministre provincial, Sam Hamad apporte une expertise en développement économique avec une approche centriste et pragmatique pour Leadership Québec.",
    "stevens-melancon": "Leader intérimaire d&apos;Équipe priorité Québec depuis mars 2025 et conseiller municipal, Stevens Mélançon apporte 34 ans d&apos;expérience en éducation avec une approche collaborative axée sur les priorités environnementales et citoyennes.",
    "claude-villeneuve": "Chef de Québec d&apos;abord, Claude Villeneuve défend les intérêts des citoyens avec une vision axée sur la responsabilité fiscale et les valeurs traditionnelles.",
    "stephane-lachance": "Chef de Respect citoyens depuis mars 2025, Stéphane Lachance est co-fondateur du mouvement 'Tramway, non merci' et prône une approche participative de la gouvernance municipale.",
    "alain-giasson": "Chef de l&apos;Alliance citoyenne de Québec depuis 2017, Alain Giasson représente une alternative politique municipale axée sur la responsabilité fiscale et les enjeux d&apos;infrastructure.",
    "jackie-smith": "Cheffe de Transition Québec depuis 2019 et conseillère municipale de Limoilou, Jackie Smith est une militante écologiste proposant une transition environnementale ambitieuse pour la ville."
  },
  montreal: {
    "luc-rabouin": "Chef de Projet Montréal depuis mars 2025, président du comité exécutif et maire d'arrondissement du Plateau-Mont-Royal depuis 2019, Luc Rabouin apporte une expertise en développement économique communautaire et démocratie participative avec une vision de continuité écologique et sociale.",
    "soraya-martinez-ferrada": "Ancienne ministre fédérale du Tourisme et députée de Hochelaga, ex-conseillère municipale de Montréal (2005-2009), Soraya Martinez Ferrada combine expérience gouvernementale et vision municipale avec une approche axée sur la gestion efficace et l'inclusion.",
    "gilbert-thibodeau": "Chef d&apos;Action Montréal depuis 2022 et candidat à la mairie en 2017 et 2021, Gilbert Thibodeau apporte une expertise en finance et gestion d&apos;entreprise avec une vision conservatrice axée sur la responsabilité fiscale et la sécurité publique.",
    "jean-francois-kacou": "Chef et fondateur de Futur Montréal depuis 2025, ancien directeur général de Percé et expert en développement économique, Jean-François Kacou représente la première candidature afro-canadienne à la mairie avec une vision centriste axée sur l'inclusion, l'équité et le pragmatisme.",
    "craig-sauve": "Conseiller municipal depuis 2013 et fondateur de Transition Montréal en juillet 2025, ancien membre de Projet Montréal, Craig Sauvé propose une alternative progressiste axée sur l&apos;itinérance, la crise du logement et l&apos;équité fiscale avec des solutions innovantes."
  },
  levis: {
    "isabelle-demers": "Chef de Lévis Force 10 et candidate à la mairie de Lévis en 2025, Isabelle Demers apporte une riche expérience municipale comme conseillère (2001-2009, 2017-présent) et présidente du comité des finances depuis 2021. Bachelière en science politique et communication de l'Université Laval, elle est reconnue pour son engagement auprès des jeunes et des organismes lévisiens.",
    "serge-bonin": "Chef de Repensons Lévis depuis avril 2024 et candidat à la mairie en 2025, Serge Bonin est conseiller municipal de Saint-Étienne depuis 2021 et porte-parole de l'opposition officielle à l'Hôtel de Ville. Comédien et entrepreneur (ClicVox), il apporte une approche participative et citoyenne avec 8 ans d'expérience en vulgarisation scientifique à l'Université Laval.",
    "steven-blaney": "Chef de Prospérité Lévis et candidat potentiel à la mairie en 2025, Steven Blaney apporte une vaste expérience politique comme ancien député fédéral conservateur (2006-2021) et ministre sous Stephen Harper (2013-2015). Ingénieur civil de formation et entrepreneur (fondateur de Stratech), il mise sur la responsabilité fiscale intergénérationnelle et le développement économique."
  },
  laval: {
    "stephane-boyer": "Maire sortant de Laval depuis 2021 et chef du Mouvement lavallois, Stéphane Boyer sollicite un deuxième mandat en 2025. Élu à 33 ans comme le plus jeune maire de l'histoire de Laval, il est diplômé en communication et en droit, ancien travailleur en aide internationale (Afrique du Sud, Mexique) et ancien conseiller (2013-2017). Reconnu personnalité de la relève municipale par l'UMQ (2016) et désigné l'un des 50 leaders mondiaux de demain par le gouvernement français.",
    "claude-larochelle": "Chef de Parti Laval depuis sa fondation en 2016 et conseiller municipal depuis 2017, Claude Larochelle est le principal opposant au maire Boyer pour les élections 2025. Ingénieur de formation, il dirige l&apos;opposition municipale avec une approche pragmatique axée sur la gestion responsable des finances et l&apos;efficacité administrative. Soutenu par d&apos;anciens élus d&apos;expérience dont Francine Charbonneau (ex-ministre) et Louise Lortie (ex-présidente Commission scolaire).",
    "frederic-mayer": "Candidat d&apos;Action Laval à la mairie en 2025, Frédéric Mayer est docteur en administration et professeur réputé dans le milieu politique. Il représente le principal groupe d&apos;opposition avec Achille Cifelli comme chef intérimaire et 3 conseillers municipaux élus. Motivé par les défis de gestion financière et les infrastructures, il propose une alternative axée sur la gouvernance efficace et la proximité citoyenne."
  },
  gatineau: {
    "maude-marquis-bissonnette": "Mairesse sortante de Gatineau depuis 2024 et cheffe d&apos;Action Gatineau, Maude Marquis-Bissonnette a été élue lors d&apos;une élection partielle avec près de 42% des voix après la démission de France Bélisle. En une année au pouvoir, elle s&apos;est concentrée sur les logements sociaux et abordables, l&apos;amélioration des transports et la mobilité, le renforcement des services municipaux et la consolidation des infrastructures essentielles avec une approche collaborative et inclusive.",
    "mario-aube": "Conseiller municipal sortant du district de Masson-Angers et chef d&apos;Équipe Mario Aubé depuis janvier 2025, Mario Aubé représente l&apos;opposition principale avec une approche axée sur le localisme et le conservatisme fiscal. Fondateur de son parti en 2025, il propose un renouveau politique centré sur la gestion responsable, les services de base et la transparence budgétaire. Il a 2 sièges au conseil municipal et refuse par principe le système de colistier."
  },
  longueuil: {
    "catherine-fournier": "Mairesse sortante de Longueuil depuis novembre 2021 et cheffe de Coalition Longueuil, Catherine Fournier sollicite un deuxième mandat après avoir été élue avec plus de 60% des voix en 2021. Économiste de formation et ancienne députée provinciale de Marie-Victorin (2016-2021), elle est devenue la plus jeune femme de l&apos;histoire du Québec à siéger à l&apos;Assemblée nationale. Reconnue pour son approche non-partisane et collaborative, elle a co-organisé le Sommet national sur l&apos;habitation en 2022.",
    "susan-rasmussen": "Conseillère d&apos;arrondissement sortante à Greenfield Park et fondatrice d&apos;Option Alliance en juin 2025, Susan Rasmussen dirige le principal parti d&apos;opposition avec des candidats dans 8 des 18 districts de Longueuil. Son nouveau parti, officiellement reconnu par Élections Québec, mise sur la justice sociale, la participation citoyenne et le développement durable avec une approche axée sur la représentation des districts électoraux et la liberté d&apos;expression de chaque élu."
  }
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

export async function generateMetadata({ params }: LeadersPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { municipality } = resolvedParams

  const municipalityDisplay = municipality.charAt(0).toUpperCase() + municipality.slice(1)

  return {
    title: `Leaders Politiques ${municipalityDisplay} | Candidats & Profils - Élections Municipales 2025`,
    description: `Découvrez les leaders politiques de ${municipalityDisplay} pour les élections municipales 2025. Profils complets des candidats à la mairie, leurs parcours, visions et positions politiques détaillées.`,
    keywords: [
      `leaders politiques ${municipality}`,
      `chefs de parti municipaux ${municipality}`,
      `candidats maire ${municipality}`,
      `élections municipales ${municipality} 2025`,
      `politique municipale ${municipality}`,
      `profils politiques ${municipality}`,
      "élections municipales 2025",
      "candidats municipaux",
      `partis politiques ${municipality}`
    ],
    openGraph: {
      title: `Leaders Politiques ${municipalityDisplay} - Candidats & Profils | Élections 2025`,
      description: `Profils complets des leaders politiques de ${municipalityDisplay} pour les élections municipales 2025. Découvrez les candidats, leurs parcours et positions politiques.`,
      type: "website",
      images: [
        {
          url: "/hero-illustration-v2.webp",
          width: 1200,
          height: 630,
          alt: `Leaders politiques de ${municipalityDisplay} - Candidats et profils`
        }
      ]
    },
    alternates: {
      canonical: `https://boussolemunicipale.com/${municipality}/leaders`
    }
  }
}

export default async function LeadersPage({ params }: LeadersPageProps) {
  const resolvedParams = await params
  const { municipality } = resolvedParams

  // Récupérer les partis pour cette municipalité
  const partiesData = await getPartiesByMunicipality(municipality)

  // Capitalize first letter for display
  const municipalityDisplay = municipality.charAt(0).toUpperCase() + municipality.slice(1)

  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Leaders Politiques de ${municipalityDisplay} - Candidats et Profils`,
    "description": `Collection complète des leaders politiques municipaux de ${municipalityDisplay} : candidats pour les élections 2025 avec leurs profils et positions politiques`,
    "url": `https://boussolemunicipale.com/${municipality}/leaders`,
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
            "jobTitle": `Ancien maire de ${municipalityDisplay} (${leader.period})`
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
          { label: municipalityDisplay, href: `/${municipality}/leaders` }
        ]} />

        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Leaders Politiques de {municipalityDisplay}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
            Découvrez les <strong>leaders politiques de {municipalityDisplay}</strong> : candidats actuels pour les élections municipales 2025
            et figures marquantes qui ont façonné l&apos;histoire politique de la capitale.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Élections 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Ville de {municipalityDisplay}</span>
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

          {partiesData.length === 0 ? (
            // Affichage quand aucun parti n'est trouvé
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center border border-blue-200">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Données en cours de préparation pour {municipalityDisplay}
              </h3>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                Les informations sur les candidats et partis politiques pour {municipalityDisplay}
                sont actuellement en cours d&apos;intégration dans notre système.
                Cette section sera mise à jour dès que les données seront disponibles.
              </p>
              <div className="bg-white rounded-md p-4 inline-block border border-blue-100">
                <p className="text-sm text-blue-600 font-medium">
                  💡 En attendant, vous pouvez consulter les leaders des autres municipalités disponibles
                </p>
              </div>
            </div>
          ) : (
            // Affichage normal avec les partis
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partiesData.map((party) => {
              const slug = generateSlug(party.leader)
              const description = currentLeaderDescriptions[municipality]?.[slug] || "Candidat aux élections municipales 2025."

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
                        <Link href={`/${municipality}/leaders/${slug}`} className="flex items-center gap-2">
                          Voir le profil
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/${municipality}/parti/${party.id}`}>
                          Parti
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            </div>
          )}
        </section>

        {/* Section Leaders Marquants - Only for Quebec */}
        {municipality === 'quebec' && (
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
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Trouvez vos affinités avec les leaders actuels
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Maintenant que vous connaissez les leaders politiques de {municipalityDisplay},
            utilisez notre boussole électorale pour découvrir quel parti correspond le mieux à vos convictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={`/${municipality}/test-politique-municipal`}>
                Faire le test politique municipal
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${municipality}/parti`}>
                Voir tous les partis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}