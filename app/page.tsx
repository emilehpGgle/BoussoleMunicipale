"use client"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Users, Compass, Share2, HelpCircle } from "lucide-react" // Added Share2 and HelpCircle
import Image from "next/image"
import Link from "next/link"
import { ColoredText } from "@/components/ui/colored-text"
import StartQuestionnaireButton from "@/components/start-questionnaire-button"
import { GlowSection } from "@/components/ui/subtle-glow"
 

export default function HomePage() {
  return (
    <div className="mobile-constrained">

      {/* Section Hero avec glow subtil */}
      <GlowSection 
        glowProps={{ 
          mode: 'breathe', 
          intensity: 'subtle',
          colors: ['#3B82F6', '#06B6D4'],
          duration: 8
        }}
        className="section-contained w-full py-16 md:py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50"
      >
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col space-y-6 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
              <span className="text-sm font-semibold text-muted-foreground/80 flex items-center">
                <Compass className="w-5 h-5 mr-2" /> Votre boussole pour les élections municipales
              </span>
              <h1 className="tracking-tight text-foreground">
                <ColoredText variant="gradient" intensity="medium">Boussole Électorale Municipale</ColoredText>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Découvrez quel parti municipal vous correspond vraiment ! En 5 minutes, identifiez vos affinités politiques sur les enjeux qui touchent votre quotidien : transport, logement, services de proximité, fiscalité locale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <StartQuestionnaireButton
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Découvrez vos affinités politiques
                  </StartQuestionnaireButton>
                  <span className="text-xs text-muted-foreground text-center sm:text-left">⏱️ 5 minutes • 21 questions</span>
                  <Link href="/faq" className="text-sm text-primary underline hover:text-primary/80 mt-2 text-center sm:text-left">
                    Questions fréquentes
                  </Link>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-xl px-8 py-3 text-base font-semibold btn-base-effects btn-hover-lift border-2"
                >
                  <Link href="#comment-ca-marche" className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Comment ça marche ?
                  </Link>
                </Button>
              </div>
            </div>
            <div
              className="relative h-[350px] md:h-[450px] w-full max-w-full rounded-2xl overflow-hidden animate-fadeIn"
              style={{ 
                animationDelay: "0.3s",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <Image
                src="/hero-illustration-v2.webp"
                alt="Boussole électorale municipale Québec 2025 - Illustration de citoyens autour d'une boussole électorale municipale de Québec"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </GlowSection>

      {/* Section d'explication */}
      <section id="comment-ca-marche" className="section-contained w-full py-16 md:py-24 bg-background" aria-label="Comment ça marche">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-foreground animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Comment ça fonctionne ?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FileText,
                title: "1. Répondez aux questions",
                description: "Partagez vos opinions sur une série d'enjeux municipaux clés.",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: BarChart3,
                title: "2. Obtenez vos résultats",
                description: "Visualisez votre alignement avec chaque candidat de manière claire et détaillée.",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Users,
                title: "3. Prenez une décision éclairée",
                description:
                  "Utilisez vos résultats pour mieux comprendre quel candidat correspond à vos priorités avant de voter.",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Share2,
                title: "4. Partagez (si vous voulez!)",
                description: "Discutez de vos résultats avec vos amis et votre famille pour encourager le débat.",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col items-start text-left p-8 bg-card rounded-2xl shadow-soft animate-fadeIn card-interactive-effects group"
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className={`p-3.5 ${item.bgColor} rounded-full mb-5`}>
                  <item.icon className={`h-7 w-7 ${item.color} transition-colors`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section pourquoi c'est important */}
      <section className="section-contained w-full py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-center mb-8 text-foreground animate-slideInUp">
            Pourquoi vos élections municipales comptent autant ?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold mb-4 text-foreground text-lg">🚌 Transport quotidien</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Bus, métro, vélo, routes : votre municipalité décide comment vous vous déplacez au quotidien.
              </p>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold mb-4 text-foreground text-lg">🏠 Votre quartier</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Logement, parcs, bibliothèques, déneigement : les services qui façonnent votre qualité de vie locale.
              </p>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold mb-4 text-foreground text-lg">💰 Vos taxes</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                La plus grande part de vos impôts locaux. Comment ils sont utilisés dépend de qui vous élisez.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              <strong>Le problème ?</strong> Il n&apos;existait aucun moyen simple de comparer les partis municipaux sur ces enjeux. 
              C&apos;est pourquoi nous avons créé cette boussole.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/questionnaire">
                Découvrez vos affinités politiques
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section éducative avec glow subtil */}
      <GlowSection 
        glowProps={{ 
          mode: 'drift', 
          intensity: 'subtle',
          colors: ['#3B82F6', '#06B6D4'],
          duration: 12
        }}
        className="section-contained w-full py-16 md:py-20 bg-gradient-to-br from-primary/5 to-teal-special/5"
      >
        <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
          <div
            className="animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="mb-6 text-foreground">Votre vote municipal a plus d&apos;impact que vous pensez</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Transport, logement, parcs, déneigement, taxes : votre ville décide de tout ce qui façonne votre quotidien. 
              Pourtant, seulement <ColoredText variant="primary" intensity="bold">40% des citoyens</ColoredText> votent aux élections municipales. 
              Résultat ? Votre voix compte encore plus ! Notre boussole vous aide à faire un choix éclairé en quelques minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "70%",
                label: "du budget municipal",
                description: "va aux services de proximité (transport, parcs, voirie)"
              },
              {
                stat: "40%",
                label: "de participation",
                description: "taux de vote aux dernières municipales"
              },
              {
                stat: "1 vote",
                label: "peut faire la différence",
                description: "dans votre quartier ou arrondissement"
              }
            ].map((item, index) => (
              <div
                key={item.label}
                className="p-8 bg-card rounded-xl shadow-soft animate-slideInUp card-interactive-effects hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 0.15 + 0.4}s` }}
              >
                <div className="text-4xl font-bold text-primary mb-3">{item.stat}</div>
                <div className="text-lg font-semibold text-foreground mb-3">{item.label}</div>
                <div className="text-base text-muted-foreground leading-relaxed">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </GlowSection>

      {/* Section de confidentialité avec image - CORRIGÉE */}
      <section className="section-contained w-full py-16 md:py-24 bg-muted/30 overflow-hidden">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="grid gap-8 md:gap-12 items-center md:grid-cols-2 w-full">
            {/* Contenu textuel */}
            <div
              className="text-center md:text-left p-6 md:p-10 bg-card rounded-2xl shadow-soft animate-slideInUp card-interactive-effects order-2 md:order-1 w-full min-w-0"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="mb-6 text-foreground">Votre vie privée, notre priorité.</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Utilisez la Boussole Municipale en toute confiance. Vos réponses sont anonymes et ne sont utilisées que
                pour calculer vos résultats. Nous ne vendons ni ne partageons vos données personnelles.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-xl px-7 py-3 btn-base-effects btn-hover-lift"
              >
                <Link href="/confidentialite">Lire notre politique de confidentialité</Link>
              </Button>
            </div>
            {/* Image - OPTIMISÉE POUR MOBILE */}
            <div
              className="relative h-[200px] sm:h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden animate-fadeIn order-1 md:order-2 min-w-0"
              style={{ animationDelay: "0.6s" }}
            >
              <Image
                src="/Image_parc_crisp.webp"
                alt="Parc municipal de Québec - Illustration citoyens et espaces verts - Boussole électorale municipale 2025"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                quality={90}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="section-contained w-full py-16 md:py-20 bg-gradient-to-r from-primary to-teal-special">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
          <div className="animate-slideInUp" style={{ animationDelay: "0.2s" }}>
            <h2 className="mb-6 text-primary-foreground">Prêt à découvrir vos affinités politiques ?</h2>
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Participez à notre questionnaire interactif et obtenez une vue claire de votre positionnement politique municipal.
            </p>
            <StartQuestionnaireButton
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Découvrez vos affinités politiques
            </StartQuestionnaireButton>
          </div>
        </div>
      </section>

      {/* Modal déplacé dans StartQuestionnaireButton pour éviter charge du modal sur / */}
    </div>
  )
}
