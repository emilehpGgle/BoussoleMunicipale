import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, CheckCircle, MessageSquare } from "lucide-react"
import Head from "next/head"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "FAQ | Questions Fréquentes - Boussole Électorale Municipale Québec",
  description: "Réponses aux questions sur la boussole électorale municipale pour les élections de Québec. Différence avec les boussoles provinciales ? Comment fonctionne notre boussole électorale locale ? Positions sur le déneigement, transport en commun et services municipaux ?",
  keywords: [
    "boussole électorale",
    "élections municipales québec",
    "services municipaux",
    "déneigement québec",
    "transport en commun",
    "pistes cyclables"
  ],
  openGraph: {
    title: "FAQ - Questions sur la Boussole Électorale Municipale Québec 2025",
    description: "Toutes vos questions sur notre boussole électorale spécialisée pour les élections municipales de Québec. Découvrez la différence avec les boussoles provinciales."
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/faq"
  }
}

export default function FAQPage() {
  const faqs = [
    {
      category: "La Boussole",
      questions: [
        {
          q: "Qu'est-ce que la Boussole Électorale Municipale ?",
          a: "La Boussole Électorale Municipale est un questionnaire politique gratuit et anonyme spécialisé pour les élections MUNICIPALES de Québec. Contrairement aux boussoles électorales généralistes (provinciales/fédérales), nous nous concentrons sur les enjeux qui vous touchent directement : déneigement, transport en commun, pistes cyclables, etc."
        },
        {
          q: "En quoi notre boussole est-elle différente ?",
          a: "Notre boussole électorale est la seule à se concentrer exclusivement sur les partis et candidats municipaux de Québec sur des enjeux hyperlocaux comme le déneigement, les pistes cyclables et les services municipaux. Les autres boussoles électorales traitent d'enjeux généraux (santé, éducation) qui ne relèvent pas du municipal."
        }
      ]
    },
    {
      category: "Élections Municipales",
      questions: [
        {
          q: "Quels sont les principaux partis politiques municipaux ?",
          a: "Les principaux partis politiques de Québec incluent : Équipe Priorité Québec, Québec d'Abord, Transition Québec, Leadership Québec, Respect Citoyens, Québec Forte et Fière, et Alliance Citoyenne. Notre test analyse les positions de tous ces partis."
        },
        {
          q: "Quels sont les principaux enjeux municipaux ?",
          a: "Les enjeux municipaux clés incluent : le déneigement, l'entretien des rues, les pistes cyclables, le transport en commun (incluant le projet de tramway), la crise du logement, la densification urbaine, la transition écologique, les finances municipales, la démocratie participative, et la sécurité publique."
        }
      ]
    },
    {
      category: "Méthodologie",
      questions: [
        {
          q: "Comment interpréter mon positionnement politique ?",
          a: "Votre position sur la carte politique se base sur deux axes : libre marché vs interventionnisme municipal (gestion des services) et progressisme vs conservatisme (vision de la ville). Plus vous êtes du côté interventionnisme, plus vous favorisez une gestion publique des services municipaux."
        }
      ]
    }
  ]

  // Génère le balisage FAQ JSON-LD pour les 3 premières questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que la Boussole Électorale Municipale ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La Boussole Électorale Municipale est un questionnaire politique gratuit et anonyme spécialisé pour les élections MUNICIPALES de Québec. Contrairement aux boussoles électorales généralistes (provinciales/fédérales), nous nous concentrons sur les enjeux qui vous touchent directement : déneigement, transport en commun, pistes cyclables, etc."
        }
      },
      {
        "@type": "Question",
        "name": "En quoi notre boussole est-elle différente ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre boussole électorale est la seule à se concentrer exclusivement sur les partis et candidats municipaux de Québec sur des enjeux hyperlocaux comme le déneigement, les pistes cyclables et les services municipaux. Les autres boussoles électorales traitent d'enjeux généraux (santé, éducation) qui ne relèvent pas du municipal."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les principaux partis politiques municipaux ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les principaux partis politiques de Québec incluent : Équipe Priorité Québec, Québec d'Abord, Transition Québec, Leadership Québec, Respect Citoyens, Québec Forte et Fière, et Alliance Citoyenne. Notre test analyse les positions de tous ces partis."
        }
      }
    ]
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumbs avec structured data */}
      <Breadcrumbs items={breadcrumbConfigs.faq} />
      
      {/* Balisage FAQ JSON-LD pour SEO Rich Snippets */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      {/* En-tête SEO optimisé */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Questions Fréquentes sur la Boussole Électorale 2025
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tout ce que vous devez savoir sur notre boussole électorale pour les élections municipales de Québec 2025.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Aide et Support
          </CardTitle>
          <CardDescription>
            Trouvez rapidement les réponses à vos questions sur la boussole électorale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette page répond aux questions les plus fréquentes sur notre <strong>boussole électorale</strong> pour les 
            <strong> élections municipales 2025</strong>. Si vous ne trouvez pas votre réponse, 
            n&apos;hésitez pas à nous contacter.
          </p>
        </CardContent>
      </Card>

      {/* FAQ par catégorie */}
      {faqs.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item, index) => (
                <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      {/* Section d'aide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2>Besoin d&apos;aide ?</h2>
          </CardTitle>
          <CardDescription>
            Ressources supplémentaires pour vous aider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Besoin d&apos;aide supplémentaire ?</h3>
                <p className="text-sm text-muted-foreground">
                  Consultez notre page <Link href="/a-propos" className="text-primary hover:underline">À Propos</Link> pour 
                  comprendre la méthodologie complète de la boussole électorale.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Questionnaire Politique</h3>
                <p className="text-sm text-muted-foreground">
                  Commencez dès maintenant votre <Link href="/questionnaire" className="text-primary hover:underline">questionnaire gratuit</Link> pour 
                  découvrir vos affinités avec les partis municipaux.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action final */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à découvrir vos affinités politiques ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Utilisez notre <strong>boussole électorale</strong> pour identifier quel parti municipal de Québec 
            partage le mieux vos idées pour les <strong>élections 2025</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/questionnaire">
                Commencer le Questionnaire
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/a-propos">
                En Savoir Plus
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/resultats">
                Voir les résultats boussole électorale municipale
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lien retour vers l'accueil */}
      <div className="text-center mt-8">
        <Link href="/" className="text-primary underline hover:text-primary/80 text-base">
          Retour à la boussole électorale municipale
        </Link>
      </div>
    </div>
  )
} 