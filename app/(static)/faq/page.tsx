import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AccordionClient as Accordion, AccordionContentClient as AccordionContent, AccordionItemClient as AccordionItem, AccordionTriggerClient as AccordionTrigger } from "@/components/ui/accordion-client"
import { MessageSquare } from "lucide-react"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedCTA
} from "@/components/ui/animated-wrappers"

// Import Hugeicons - using lucide-react alternatives
import {
  Compass,
  Calendar,
  Users,
  Settings,
  Target,
  HelpCircle,
  Menu,
  CheckCircle2
} from 'lucide-react'

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
    canonical: "https://boussolemunicipale.com/faq"
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

  // Configuration des catégories avec Hugeicons
  const categoryConfig: Record<string, {
    iconData: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
  }> = {
    "La Boussole": {
      iconData: Compass,
      color: "text-midnight-green",
      bgColor: "bg-azure-web/40"
    },
    "Calendrier Électoral 2025": {
      iconData: Calendar,
      color: "text-teal-main-700",
      bgColor: "bg-teal-main-100/40"
    },
    "Partis et Leaders Politiques": {
      iconData: Users,
      color: "text-midnight-green",
      bgColor: "bg-teal-main-200/40"
    },
    "Méthodologie et Fonctionnement": {
      iconData: Settings,
      color: "text-teal-main-800",
      bgColor: "bg-teal-main-300/40"
    },
    "Test Politique et Political Compass": {
      iconData: Target,
      color: "text-teal-main-900",
      bgColor: "bg-teal-main-400/40"
    }
  }

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

  const totalQuestions = faqs.reduce((acc, cat) => acc + cat.questions.length, 0)

  return (
    <React.Fragment>
      {/* Balisage FAQ JSON-LD pour SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container max-w-5xl mx-auto py-12 px-4">
        {/* Breadcrumbs avec structured data */}
        <Breadcrumbs items={breadcrumbConfigs.faq} />

        {/* En-tête SEO optimisé */}
        <AnimatedTitle>
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Questions Fréquentes sur la Boussole Électorale 2025
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Tout ce que vous devez savoir sur notre boussole électorale pour les élections municipales de Québec 2025.
            </p>
          </div>
        </AnimatedTitle>

        {/* Statistiques visuelles */}
        <AnimatedSection delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6 bg-gradient-to-br from-azure-web to-white border-midnight-green/20">
              <div className="text-5xl font-black text-midnight-green mb-2">
                {totalQuestions}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Questions Répondues
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-teal-main-50 to-white border-midnight-green/20">
              <div className="text-5xl font-black text-midnight-green mb-2">
                {faqs.length}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Catégories Couvertes
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-teal-main-100 to-white border-midnight-green/20">
              <div className="text-5xl font-black text-midnight-green mb-2">
                100%
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Gratuité &amp; Anonymat
              </div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Table des matières - Navigation rapide */}
        <AnimatedSection delay={0}>
          <Card className="bg-azure-web/30 border-midnight-green/20 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl">
                <Menu className="w-7 h-7 text-midnight-green" />
                Navigation Rapide
              </CardTitle>
              <CardDescription className="text-base">
                Accédez directement à la catégorie qui vous intéresse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {faqs.map((cat, idx) => {
                  const config = categoryConfig[cat.category]
                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      asChild
                      className="justify-start gap-3 h-auto py-3 px-4 hover:bg-midnight-green/5 hover:border-midnight-green/40 transition-all"
                    >
                      <a href={`#category-${idx}`}>
                        <div className={`p-2 rounded-lg bg-white shadow-sm ${config.color}`}>
                          {React.createElement(config.iconData, { className: "w-5 h-5" })}
                        </div>
                        <span className="truncate flex-1 text-left font-medium">
                          {cat.category}
                        </span>
                        <Badge variant="secondary" className="ml-auto shrink-0">
                          {cat.questions.length}
                        </Badge>
                      </a>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Introduction */}
        <AnimatedSection delay={0}>
          <Card className="mb-10 border-l-4 border-l-midnight-green shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <HelpCircle className="w-7 h-7 text-primary" />
                Aide et Support
              </CardTitle>
              <CardDescription className="text-base">
                Trouvez rapidement les réponses à vos questions sur la boussole électorale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Cette page répond aux questions les plus fréquentes sur notre <strong>boussole électorale</strong> pour les
                <strong> élections municipales 2025</strong>. Si vous ne trouvez pas votre réponse,
                n&apos;hésitez pas à nous contacter.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* FAQ par catégorie */}
        <div className="space-y-10">
          {faqs.map((category, categoryIndex) => {
            const config = categoryConfig[category.category]

            return (
              <AnimatedSection key={categoryIndex} delay={0}>
                <Card
                  id={`category-${categoryIndex}`}
                  className="border-l-4 border-l-midnight-green/60 shadow-md"
                >
                  <CardHeader className={`${config.bgColor} pb-6`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white shadow-sm ${config.color}`}>
                          {React.createElement(config.iconData, { className: "w-7 h-7" })}
                        </div>
                        <div>
                          <CardTitle className="text-2xl lg:text-3xl font-bold mb-2">
                            {category.category}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {category.questions.length} {category.questions.length === 1 ? 'question fréquente' : 'questions fréquentes'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-lg px-4 py-2 bg-white border-midnight-green/30 text-midnight-green font-semibold"
                      >
                        {category.questions.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="space-y-3">
                      {category.questions.map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${categoryIndex}-${index}`}
                          className="border rounded-lg px-4 transition-all duration-200 hover:border-midnight-green/40 hover:shadow-sm focus-within:border-midnight-green focus-within:ring-2 focus-within:ring-midnight-green/20 data-[state=open]:bg-azure-web/20 data-[state=open]:border-midnight-green/60"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-5 group">
                            <div className="flex items-start gap-3 w-full pr-4">
                              <Badge
                                variant="outline"
                                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-midnight-green text-white font-semibold border-0"
                              >
                                {index + 1}
                              </Badge>
                              <span className="text-base lg:text-lg font-semibold text-foreground group-hover:text-midnight-green transition-colors">
                                {item.q}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-base leading-relaxed text-muted-foreground pl-11 pr-4 pb-5">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Section d'aide */}
        <AnimatedSection delay={0}>
          <Card className="mt-10 border-l-4 border-l-midnight-green shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl">
                <MessageSquare className="h-7 w-7 text-primary" strokeWidth={2} />
                <h2>Besoin d&apos;aide ?</h2>
              </CardTitle>
              <CardDescription className="text-base">
                Ressources supplémentaires pour vous aider
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-base">Besoin d&apos;aide supplémentaire ?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Consultez notre page <Link href="/a-propos" className="text-primary hover:underline font-medium">À Propos</Link> pour
                      comprendre la méthodologie complète de la boussole électorale.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-base">Profils des Leaders</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Découvrez les <Link href="/leaders" className="text-primary hover:underline font-medium">profils détaillés des leaders</Link> politiques
                      municipaux : biographies, expérience et vision pour 2025.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-base">Questionnaire Politique</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Commencez dès maintenant votre <Link href="/test-politique-municipal" className="text-primary hover:underline font-medium">questionnaire gratuit</Link> pour
                      découvrir vos affinités avec les partis municipaux.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Call to Action final */}
        <AnimatedCTA delay={0} className="text-center mt-10">
          <Card className="border-2 border-midnight-green/20 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Prêt à découvrir vos affinités politiques ?
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                Utilisez notre <strong>boussole électorale</strong> pour identifier quel parti municipal de Québec
                partage le mieux vos idées pour les <strong>élections 2025</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base">
                  <Link href="/test-politique-municipal">
                    Commencer le Questionnaire
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="/a-propos">
                    En Savoir Plus
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-base">
                  <Link href="/resultats">
                    Voir les résultats boussole électorale municipale
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedCTA>

        {/* Lien retour vers l'accueil */}
        <AnimatedSection delay={0}>
          <div className="text-center mt-8">
            <Link href="/" className="text-primary underline hover:text-primary/80 text-base font-medium">
              Retour à la boussole électorale municipale
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </React.Fragment>
  )
}
