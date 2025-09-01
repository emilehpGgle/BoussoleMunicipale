import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Shield, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "À Propos | Boussole Électorale - Test Politique Municipal Québec",
  description: "Découvrez comment fonctionne notre boussole électorale pour les élections municipales de Québec. Méthodologie, calcul des affinités politiques, positionnement sur les axes du libre marché et de l'interventionnisme municipal.",
  keywords: [
    "élections municipales québec",
    "test politique municipal",
    "services municipaux",
    "déneigement québec",
    "transport en commun"
  ],
  openGraph: {
    title: "Comment fonctionne la Boussole Électorale Municipale Québec 2025",
    description: "Méthodologie transparente de notre test politique pour les élections municipales. Découvrez comment nous calculons vos affinités avec les partis politiques."
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/a-propos"
  }
}

export default function AboutPage() {
  // Structured Data pour l'organisation
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Boussole Électorale Québec",
    "description": "Boussole électorale spécialisée pour les élections municipales de Québec 2025. Outil gratuit et anonyme par défaut pour découvrir vos affinités avec les partis politiques municipaux.",
    "url": "https://boussole-municipale.vercel.app",
    "logo": "https://boussole-municipale.vercel.app/logo-main.webp",
    "foundingDate": "2025-01-01",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "QC",
      "availableLanguage": ["French"]
    },
    "areaServed": {
      "@type": "City",
      "name": "Quebec City",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://boussole-municipale.vercel.app"
    ],
    "knowsAbout": [
      "élections municipales Québec",
      "partis politiques municipaux",
      "boussole électorale",
      "test politique municipal",
      "services municipaux Québec"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Boussole Électorale Municipale",
        "description": "Test politique gratuit pour découvrir vos affinités avec les partis municipaux de Québec"
      },
      "price": "0",
      "priceCurrency": "CAD"
    }
  }

  return (
    <>
      {/* Balisage Organization JSON-LD pour SEO */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumbs avec structured data */}
      <Breadcrumbs items={breadcrumbConfigs.about} />
      
      {/* En-tête avec titre SEO optimisé */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          À Propos de la Boussole Électorale 2025
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez comment notre test politique vous aide à identifier vos affinités avec les partis municipaux de Québec pour les élections 2025.
        </p>
      </div>

      {/* Section Mission */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Notre Mission pour les Élections Municipales 2025
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground mb-4">
            La Boussole électorale municipale de Québec est un outil d&apos;aide à la décision qui permet aux citoyens de comparer leurs positions avec celles des partis politiques municipaux.
          </p>

          <p className="text-muted-foreground mb-4">
            L&apos;outil a été développé par une équipe indépendante de chercheurs et d&apos;experts en politique municipale.
          </p>

          <p className="text-muted-foreground mb-4">
            Notre objectif est d&apos;aider les citoyens à mieux comprendre les enjeux et les positions des différents partis politiques municipaux.
          </p>
        </CardContent>
      </Card>

      {/* Section Méthodologie */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2>Méthodologie du Test Politique</h2>
          </CardTitle>
          <CardDescription>
            Comment nous calculons vos affinités politiques avec les partis municipaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. Questions sur les Enjeux Municipaux</h3>
            <p className="text-muted-foreground">
              21 questions couvrent les grands enjeux des <strong>élections municipales québec 2025</strong> : 
              transport (tramway), logement, environnement, gouvernance, développement économique et sécurité publique.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Positions des Partis Politiques</h3>
            <p className="text-muted-foreground">
              Nous analysons les programmes officiels et déclarations publiques des <strong>partis politiques québec</strong> 
              pour positionner chaque parti sur chaque enjeu municipal.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">3. Calcul des Affinités Politiques</h3>
            <p className="text-muted-foreground">
              Notre algorithme compare vos réponses avec les positions des partis en pondérant selon l&apos;importance 
              que vous accordez à chaque enjeu. Le résultat : un pourcentage d&apos;affinité avec chaque parti municipal.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">4. Positionnement sur les Axes Municipaux</h3>
            <p className="text-muted-foreground mb-6">
              Notre boussole électorale utilise deux axes principaux pour positionner les partis et les citoyens :
              <br />- L&apos;axe du libre marché vs interventionnisme municipal (gestion des services)
              <br />- L&apos;axe progressiste vs conservateur (vision de la ville)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section Fiabilité */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h2>Fiabilité et Transparence</h2>
          </CardTitle>
          <CardDescription>
            Pourquoi faire confiance à notre boussole électorale municipale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Sources Vérifiées</h4>
                <p className="text-sm text-muted-foreground">
                  Positions basées sur les programmes officiels et déclarations publiques vérifiées
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Respect de la Vie Privée</h4>
                <p className="text-sm text-muted-foreground">
                  Test anonyme par défaut, utilisation avec consentement uniquement
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Outil Indépendant</h4>
                <p className="text-sm text-muted-foreground">
                  Non affilié à aucun parti politique, développé de manière indépendante
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Mise à Jour Continue</h4>
                <p className="text-sm text-muted-foreground">
                  Positions mises à jour selon l&apos;évolution des programmes électoraux
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Enjeux */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h2>Enjeux Couverts</h2>
          </CardTitle>
          <CardDescription>
            Les domaines municipaux analysés par notre boussole électorale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">🚊 Transport et Mobilité</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Projet de <strong>tramway quebec</strong>, transport en commun, circulation automobile, 
                pistes cyclables, stationnement
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">🏠 Logement et Urbanisme</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Crise du logement, densification urbaine, patrimoine, développement des quartiers
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">🌱 Environnement</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Lutte aux changements climatiques, espaces verts, gestion des déchets, protection des milieux naturels
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">💰 Finances Municipales</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Taxation municipale, gestion budgétaire, investissements publics, endettement
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">🏛️ Gouvernance</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Démocratie participative, transparence, conseils de quartier, consultation citoyenne
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">👮 Sécurité et Services</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Sécurité publique, services municipaux, itinérance, inclusion sociale
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à découvrir vos affinités politiques ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Commencez votre <strong>test politique gratuit</strong> maintenant et découvrez quel parti municipal 
            de Québec partage le mieux vos idées pour les élections 2025.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/questionnaire">
              Commencer le Test Politique
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
    </>
  )
} 