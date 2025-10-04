import Link from "next/link"
import { ArrowLeft, ArrowRight, Search, MessageSquare, Shield, BarChart3, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AccordionClient as Accordion, AccordionContentClient as AccordionContent, AccordionItemClient as AccordionItem, AccordionTriggerClient as AccordionTrigger } from "@/components/ui/accordion-client"
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedTitle,
  AnimatedCTA
} from "@/components/ui/animated-wrappers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Centre d'aide | Boussole Municipale Québec",
  description: "Trouvez des réponses à vos questions sur la Boussole Municipale : fonctionnement, confidentialité, résultats et élections municipales de Québec 2025.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussolemunicipale.com/centre-aide"
  }
}

export default function CentreAidePage() {
  return (
    <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <div className="mb-12">
        <Button variant="ghost" asChild className="mb-8 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 md:py-16 -mx-4 md:-mx-6 px-4 md:px-6 rounded-3xl">
          <AnimatedTitle>
            <h1 className="text-fluid-hero font-black text-foreground mb-6 md:mb-8 leading-tight text-center">
              Centre d&apos;aide
            </h1>
            <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto text-center">
              Trouvez rapidement des réponses à vos questions sur la Boussole Municipale.
            </p>
          </AnimatedTitle>
        </div>
      </div>

      {/* Barre de recherche */}
      <AnimatedSection delay={0.1}>
        <Card className="p-6 mb-8 bg-gradient-to-r from-white via-secondary/5 to-white shadow-soft-md border-2 border-primary/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60" />
            <Input
              placeholder="Rechercher une question..."
              className="pl-12 h-12 text-base border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            <Badge variant="secondary" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
              Prochainement
            </Badge>
          </div>
        </Card>
      </AnimatedSection>

      {/* Catégories d'aide */}
      <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="#questionnaire" scroll={true} className="group">
          <Card className="p-6 text-center transition-all duration-300 hover:shadow-soft-md hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-white to-secondary/20">
            <BarChart3 className="w-10 h-10 text-midnight-green mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Questionnaire</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Questions sur le fonctionnement du questionnaire
            </p>
            <ArrowRight className="w-4 h-4 mx-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Card>
        </Link>

        <Link href="#resultats" scroll={true} className="group">
          <Card className="p-6 text-center transition-all duration-300 hover:shadow-soft-md hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-white to-secondary/20">
            <Users className="w-10 h-10 text-teal-main-600 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Résultats</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Comprendre et interpréter vos résultats
            </p>
            <ArrowRight className="w-4 h-4 mx-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Card>
        </Link>

        <Link href="#confidentialite" scroll={true} className="group">
          <Card className="p-6 text-center transition-all duration-300 hover:shadow-soft-md hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-white to-secondary/20">
            <Shield className="w-10 h-10 text-teal-main-700 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Confidentialité</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Protection de vos données personnelles
            </p>
            <ArrowRight className="w-4 h-4 mx-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </Card>
        </Link>
      </AnimatedGrid>

      {/* FAQ détaillée */}
      <AnimatedSection delay={0.1} className="space-y-12">
        {/* Section Général */}
        <section id="generale" className="bg-secondary/20 -mx-4 md:-mx-6 px-4 md:px-6 py-12 rounded-2xl">
          <AnimatedTitle delay={0}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black flex items-center gap-3">
              <MessageSquare className="w-10 h-10 text-midnight-green" />
              Questions générales
            </h2>
          </AnimatedTitle>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="quest-1" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Qu&apos;est-ce que la Boussole Municipale ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                La Boussole Municipale est un outil d&apos;aide à la décision pour les élections municipales
                de Québec. Elle vous permet de découvrir vos affinités avec les différents partis politiques
                municipaux en répondant à un questionnaire sur les enjeux locaux importants.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="quest-2" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Est-ce que c&apos;est gratuit ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Oui, la Boussole Municipale est entièrement gratuite. Aucun frais n&apos;est exigé pour
                utiliser l&apos;outil, consulter vos résultats ou partager vos résultats.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="quest-3" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Qui a créé cet outil ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                La Boussole Municipale a été développée par une équipe indépendante de citoyens engagés,
                sans affiliation politique. Notre objectif est de promouvoir une participation citoyenne
                éclairée aux élections municipales.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Questionnaire */}
        <section id="questionnaire" className="py-12">
          <AnimatedTitle delay={0}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-midnight-green" />
              Le questionnaire
            </h2>
          </AnimatedTitle>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="questionnaire-1" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Combien de questions y a-t-il ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Le questionnaire comprend 21 questions couvrant 6 domaines clés de la politique municipale :
                transport, logement, environnement, gouvernance, économie et sécurité.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="questionnaire-2" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Combien de temps cela prend-il ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                En moyenne, il faut 8 à 12 minutes pour compléter le questionnaire et consulter vos résultats.
                Vous pouvez prendre votre temps et revenir sur vos réponses si nécessaire.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="questionnaire-3" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Puis-je modifier mes réponses ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Oui, vous pouvez revenir sur vos réponses à tout moment pendant que vous complétez
                le questionnaire. Une fois terminé, vous devrez recommencer si vous souhaitez changer
                des réponses significatives.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="questionnaire-4" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Que signifient les niveaux d&apos;importance ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Pour chaque question, vous indiquez non seulement votre position (accord/désaccord)
                mais aussi l&apos;importance que vous accordez à cet enjeu. Cela permet de pondérer
                les calculs selon vos priorités personnelles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Résultats */}
        <section id="resultats" className="bg-gradient-to-br from-teal-main-50/30 to-azure-web/50 -mx-4 md:-mx-6 px-4 md:px-6 py-12 rounded-2xl">
          <AnimatedTitle delay={0}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black flex items-center gap-3">
              <Users className="w-10 h-10 text-midnight-green" />
              Comprendre vos résultats
            </h2>
          </AnimatedTitle>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="resultats-1" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Comment sont calculés les pourcentages d&apos;affinité ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Les pourcentages d&apos;affinité sont calculés en comparant vos réponses avec les positions
                officielles de chaque parti. Plus vos positions convergent avec celles d&apos;un parti,
                plus votre pourcentage d&apos;affinité est élevé. L&apos;importance que vous accordez
                à chaque enjeu influence également le calcul.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resultats-2" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Qu&apos;est-ce que la boussole politique ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                La boussole politique est un graphique à deux dimensions qui positionne votre profil
                politique selon deux axes : économique (interventionnisme ↔ libre marché) et
                social/environnemental (conservateur ↔ progressiste). Cela vous aide à visualiser
                votre positionnement politique global.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resultats-3" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Un faible pourcentage signifie-t-il que je ne devrais pas voter pour ce parti ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Pas nécessairement. Les résultats sont un outil d&apos;aide à la réflexion, pas une
                recommandation absolue. Un parti avec un pourcentage plus faible pourrait quand même
                vous convenir si ses positions sur vos enjeux prioritaires vous importent plus que
                l&apos;alignement global. Consultez les détails par enjeu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resultats-4" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Puis-je sauvegarder ou partager mes résultats ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Oui, vous pouvez générer un lien de partage pour vos résultats (de façon anonyme)
                ou les recevoir par courriel. Vous pouvez aussi prendre une capture d&apos;écran
                pour vos propres archives.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Confidentialité */}
        <section id="confidentialite" className="py-12">
          <AnimatedTitle delay={0}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black flex items-center gap-3">
              <Shield className="w-10 h-10 text-midnight-green" />
              Confidentialité et sécurité
            </h2>
          </AnimatedTitle>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="confidentialite-1" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Mes réponses sont-elles anonymes ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Oui, toutes vos réponses au questionnaire sont anonymes par défaut. Nous ne collectons aucune
                information personnelle identifiable sans votre consentement explicite. Vous pouvez choisir
                de fournir votre email pour recevoir vos résultats et accepter des communications ciblées.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="confidentialite-2" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Vendez-vous mes données à des tiers ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Nous ne vendons jamais vos données personnelles sans votre consentement explicite.
                Si vous choisissez de partager votre adresse courriel ou de consentir à des communications
                marketing, ces choix sont entièrement volontaires et vous pouvez les retirer à tout moment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="confidentialite-3" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Comment puis-je supprimer mes données ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Vous pouvez supprimer toutes vos données à tout moment depuis votre profil ou en nous
                contactant directement. La suppression est définitive et irréversible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="confidentialite-4" className="border-2 border-border/50 rounded-xl px-4 bg-white hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-base font-semibold hover:text-primary py-4">
                Utilisez-vous des cookies ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                Nous utilisons uniquement des cookies techniques essentiels au fonctionnement de
                l&apos;application (sauvegarde de session, préférences d&apos;affichage). Aucun cookie
                de suivi publicitaire n&apos;est utilisé.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </AnimatedSection>

      {/* Contact pour plus d'aide */}
      <AnimatedCTA delay={0.1} className="mt-16">
        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/20 border-2 border-primary/20 shadow-primary-glow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Besoin d&apos;aide supplémentaire ?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Si vous ne trouvez pas la réponse à votre question, n&apos;hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-fit shadow-soft">
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-fit">
              <Link href="/faq">
                Voir la FAQ simple
              </Link>
            </Button>
          </div>
        </Card>
      </AnimatedCTA>
    </div>
  )
}