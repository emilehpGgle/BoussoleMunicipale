import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccordionClient as Accordion, AccordionContentClient as AccordionContent, AccordionItemClient as AccordionItem, AccordionTriggerClient as AccordionTrigger } from "@/components/ui/accordion-client"
import { HelpCircle, CheckCircle, MessageSquare } from "lucide-react"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "FAQ | Questions Fréquentes - Boussole Électorale Municipale Québec 2025",
  description: "Réponses aux questions sur la boussole électorale municipale pour les élections 2025. Date des élections municipales, différence avec les boussoles provinciales, fonctionnement de notre boussole électorale locale et positions sur les enjeux municipaux.",
  keywords: [
    "boussole électorale",
    "boussole electorale",
    "test politique",
    "test politique municipal",
    "political compass",
    "test political compass",
    "political compass québec",
    "élections municipales 2025",
    "date élections municipales québec",
    "élections municipales québec 2025 date",
    "bruno marchand 2025",
    "sam hamad élections",
    "denis coderre montreal",
    "services municipaux",
    "comment voter municipales",
    "candidats municipaux 2025"
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
      category: "Calendrier Électoral 2025",
      questions: [
        {
          q: "Quand ont lieu les élections municipales 2025 au Québec ?",
          a: "Les élections municipales au Québec auront lieu le dimanche 2 novembre 2025. Cette date s'applique à toutes les municipalités du Québec, incluant Québec, Montréal, Gatineau, Sherbrooke et toutes les autres villes et municipalités de la province."
        },
        {
          q: "Comment s'inscrire pour voter aux élections municipales ?",
          a: "Pour voter aux élections municipales 2025, vous devez être inscrit sur la liste électorale de votre municipalité. L'inscription se fait automatiquement si vous êtes déjà inscrit au provincial/fédéral. Vous pouvez vérifier votre inscription sur le site d'Élections Québec ou auprès de votre municipalité."
        },
        {
          q: "Où et comment voter le jour des élections ?",
          a: "Le vote se déroule dans votre bureau de scrutin local de 10h00 à 20h00. Vous pouvez connaître l'emplacement de votre bureau de vote sur votre carte d'information ou sur le site de votre municipalité. Une pièce d'identité avec photo est requise pour voter."
        }
      ]
    },
    {
      category: "Partis et Leaders Politiques",
      questions: [
        {
          q: "Quels sont les principaux partis politiques municipaux de Québec ?",
          a: "Les principaux partis politiques de Québec pour 2025 incluent : Québec forte et fière (Bruno Marchand), Leadership Québec (Sam Hamad), Équipe priorité Québec (Stevens Mélançon), Québec d'Abord (Claude Villeneuve), Transition Québec (Jackie Smith), Respect Citoyens (Stéphane Lachance), et Alliance Citoyenne (Alain Giasson). Notre test analyse les positions de tous ces partis."
        },
        {
          q: "Qui sont les principaux candidats à la mairie de Québec en 2025 ?",
          a: "Les principaux candidats incluent Bruno Marchand (maire sortant avec Québec forte et fière), Sam Hamad (Leadership Québec), Stevens Mélançon (Équipe priorité Québec), et les autres chefs de parti. Consultez notre section Leaders pour découvrir leur profil détaillé et leurs positions politiques."
        },
        {
          q: "Quels sont les principaux enjeux municipaux pour 2025 ?",
          a: "Les enjeux municipaux clés incluent : le déneigement, l'entretien des rues, les pistes cyclables, le transport en commun (incluant le projet de tramway), la crise du logement, la densification urbaine, la transition écologique, les finances municipales, la démocratie participative, et la sécurité publique."
        }
      ]
    },
    {
      category: "Méthodologie et Fonctionnement",
      questions: [
        {
          q: "Comment interpréter mon positionnement politique sur la boussole ?",
          a: "Votre position sur la carte politique se base sur deux axes : libre marché vs interventionnisme municipal (gestion des services) et progressisme vs conservatisme (vision de la ville). Plus vous êtes du côté interventionnisme, plus vous favorisez une gestion publique des services municipaux."
        },
        {
          q: "Quelle est la différence entre gauche et droite en politique municipale ?",
          a: "En politique municipale, la gauche tend à favoriser l'interventionnisme public, les services municipaux étendus, la transition écologique et l'inclusion sociale. La droite privilégie la responsabilité fiscale, l'efficacité des services, le développement économique et la liberté de choix des citoyens. Ces orientations se reflètent dans les positions sur le transport, l'urbanisme et les finances municipales."
        },
        {
          q: "Comment fonctionne le calcul de compatibilité avec les partis ?",
          a: "Notre algorithme compare vos réponses aux positions officielles des partis sur chaque enjeu. Le pourcentage de compatibilité reflète votre alignement sur les questions importantes pour vous. Plus le pourcentage est élevé, plus vos positions concordent avec celles du parti politique."
        }
      ]
    },
    {
      category: "Test Politique et Political Compass",
      questions: [
        {
          q: "Qu'est-ce qu'un test politique municipal ?",
          a: "Un test politique municipal est un questionnaire qui évalue vos positions sur les enjeux locaux (transport, logement, services municipaux) pour déterminer vos affinités avec les partis municipaux. Notre test politique type 'political compass' analyse 21 questions spécifiques aux élections municipales 2025 de Québec."
        },
        {
          q: "Comment fonctionne votre political compass québécois ?",
          a: "Notre political compass (boussole politique) utilise un système à deux axes pour positionner vos convictions politiques : interventionnisme vs libre marché municipal, et progressisme vs conservatisme urbain. Ce test political compass est spécialement adapté aux enjeux municipaux québécois et aux positions des partis locaux."
        },
        {
          q: "Quelle est la différence entre boussole electorale et test politique ?",
          a: "Les termes 'boussole electorale', 'boussole électorale' et 'test politique' désignent le même outil : un questionnaire qui mesure vos affinités politiques. Notre plateforme utilise ces trois approches pour créer un political compass complet adapté aux élections municipales 2025 de Québec."
        },
        {
          q: "Pourquoi n'y a-t-il pas Denis Coderre dans les candidats ?",
          a: "Denis Coderre était maire de Montréal (2013-2017), pas de Québec. Il a récemment annoncé qu'il 'tourne la page' de sa carrière politique en 2025. Notre boussole se concentre actuellement sur les candidats aux élections municipales de Québec 2025, mais nous prévoyons d'ajouter Montréal (incluant l'histoire de Denis Coderre) dans une future version."
        },
        {
          q: "Le test fonctionne-t-il comme les autres political compass en ligne ?",
          a: "Notre test politique municipal se distingue des political compass génériques car il se concentre exclusivement sur les enjeux municipaux québécois. Contrairement aux tests politiques provinciaux ou fédéraux, nous analysons vos positions sur le déneigement, les pistes cyclables, la densification urbaine et autres sujets qui relèvent directement de la municipalité."
        }
      ]
    }
  ]

  // Génère le balisage FAQ JSON-LD pour les questions les plus recherchées
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quand ont lieu les élections municipales 2025 au Québec ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les élections municipales au Québec auront lieu le dimanche 2 novembre 2025. Cette date s'applique à toutes les municipalités du Québec, incluant Québec, Montréal, Gatineau, Sherbrooke et toutes les autres villes et municipalités de la province."
        }
      },
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
        "name": "Qui sont les principaux candidats à la mairie de Québec en 2025 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les principaux candidats incluent Bruno Marchand (maire sortant avec Québec forte et fière), Sam Hamad (Leadership Québec), Stevens Mélançon (Équipe priorité Québec), et les autres chefs de parti. Consultez notre section Leaders pour découvrir leur profil détaillé et leurs positions politiques."
        }
      },
      {
        "@type": "Question",
        "name": "Comment s'inscrire pour voter aux élections municipales ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour voter aux élections municipales 2025, vous devez être inscrit sur la liste électorale de votre municipalité. L'inscription se fait automatiquement si vous êtes déjà inscrit au provincial/fédéral. Vous pouvez vérifier votre inscription sur le site d'Élections Québec ou auprès de votre municipalité."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un test politique municipal ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un test politique municipal est un questionnaire qui évalue vos positions sur les enjeux locaux (transport, logement, services municipaux) pour déterminer vos affinités avec les partis municipaux. Notre test politique type 'political compass' analyse 21 questions spécifiques aux élections municipales 2025 de Québec."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne votre political compass québécois ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre political compass (boussole politique) utilise un système à deux axes pour positionner vos convictions politiques : interventionnisme vs libre marché municipal, et progressisme vs conservatisme urbain. Ce test political compass est spécialement adapté aux enjeux municipaux québécois et aux positions des partis locaux."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre boussole electorale et test politique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les termes 'boussole electorale', 'boussole électorale' et 'test politique' désignent le même outil : un questionnaire qui mesure vos affinités politiques. Notre plateforme utilise ces trois approches pour créer un political compass complet adapté aux élections municipales 2025 de Québec."
        }
      }
    ]
  }

  return (
    <>
      {/* Balisage FAQ JSON-LD pour SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageTransition>
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Breadcrumbs avec structured data */}
          <Breadcrumbs items={breadcrumbConfigs.faq} />
        {/* En-tête SEO optimisé */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Questions Fréquentes sur la Boussole Électorale 2025
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur notre boussole électorale pour les élections municipales de Québec 2025.
            </p>
          </div>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal delay={0.1}>
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
        </ScrollReveal>

        {/* FAQ par catégorie */}
        {faqs.map((category, categoryIndex) => (
          <ScrollReveal key={categoryIndex} delay={0.2 + categoryIndex * 0.1}>
            <AnimatedCard className="mb-6" delay={categoryIndex * 0.1}>
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
            </AnimatedCard>
          </ScrollReveal>
        ))}

        {/* Section d'aide */}
        <ScrollReveal delay={0.4}>
          <AnimatedCard>
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
                <h3 className="font-medium mb-1">Profils des Leaders</h3>
                <p className="text-sm text-muted-foreground">
                  Découvrez les <Link href="/leaders" className="text-primary hover:underline">profils détaillés des leaders</Link> politiques 
                  municipaux : biographies, expérience et vision pour 2025.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Questionnaire Politique</h3>
                <p className="text-sm text-muted-foreground">
                  Commencez dès maintenant votre <Link href="/test-politique-municipal" className="text-primary hover:underline">questionnaire gratuit</Link> pour 
                  découvrir vos affinités avec les partis municipaux.
                </p>
              </div>
            </div>
          </div>
            </CardContent>
          </AnimatedCard>
        </ScrollReveal>

        {/* Call to Action final */}
        <ScrollReveal delay={0.5}>
          <AnimatedCard className="text-center">
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
                  <Link href="/test-politique-municipal">
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
          </AnimatedCard>
        </ScrollReveal>

        {/* Lien retour vers l'accueil */}
        <ScrollReveal delay={0.6}>
          <div className="text-center mt-8">
            <Link href="/" className="text-primary underline hover:text-primary/80 text-base">
              Retour à la boussole électorale municipale
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
    </>
  )
} 