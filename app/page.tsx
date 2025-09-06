"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, BarChart3, Users, Compass, Share2, HelpCircle } from "lucide-react" // Added Share2 and HelpCircle
import Image from "next/image"
import Link from "next/link"
import { ColoredText } from "@/components/ui/colored-text"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { GlowSection } from "@/components/ui/subtle-glow"
 

export default function HomePage() {
  return (
    <div className="mobile-constrained">

      {/* Section Hero avec glow subtil */}
      <GlowSection 
        glowProps={{ 
          mode: 'breathe', 
          intensity: 'subtle',
          colors: ['#04454A', '#EAFCFC'],
          duration: 8
        }}
        className="section-contained w-full py-fluid-lg bg-gradient-to-br from-isabelline to-azure-web/20"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-fluid-md items-center">
            <div className="flex flex-col space-y-fluid-sm animate-slideInUp" style={{ animationDelay: "0.1s" }}>
              <span className="text-sm font-semibold text-muted-foreground/80 flex items-center">
                <Compass className="w-5 h-5 mr-2" /> Votre boussole pour les élections municipales
              </span>
              <h1 className="text-fluid-hero font-black leading-tight tracking-tight text-foreground w-full max-w-full break-words">
                Votre{" "}
                <span className="text-midnight-green relative inline-block">
                  boussole
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-midnight-green via-teal-main-400 to-orange-400 rounded-full opacity-60" />
                </span>{" "}
                électorale municipale
              </h1>
              <p className="text-fluid-base text-muted-foreground max-w-lg w-full break-words">
                Découvrez quel parti municipal vous correspond vraiment ! En 5 minutes, identifiez vos affinités politiques sur les enjeux qui touchent votre quotidien : transport, logement, services de proximité, fiscalité locale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-midnight-green text-midnight-green hover:bg-midnight-green/10 hover:text-midnight-green rounded-xl px-6 py-4 text-base font-semibold btn-base-effects btn-hover-lift border-2 w-fit"
                >
                  <Link href="#comment-ca-marche" className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Comment ça marche ?
                  </Link>
                </Button>
                <div className="flex flex-col gap-2">
                  <RainbowButton 
                    className="text-white rounded-xl px-6 py-4 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl w-fit"
                    onClick={() => {
                      const event = new CustomEvent('openPostalCodeModal')
                      window.dispatchEvent(event)
                    }}
                  >
                    Découvrez vos affinités politiques
                  </RainbowButton>
                  <span className="text-xs text-muted-foreground text-center sm:text-left">⏱️ 5 minutes • 21 questions</span>
                  <Link href="/faq" className="text-sm text-midnight-green underline hover:text-midnight-green/80 mt-2 text-center sm:text-left">
                    Questions fréquentes
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/10] max-w-full rounded-2xl overflow-hidden animate-fadeIn"
              style={{ 
                animationDelay: "0.3s",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <Image
                src="/Image_parc_crisp.webp"
                alt="Parc municipal de Québec - Illustration citoyens et espaces verts - Boussole électorale municipale 2025"
                fill
                className="rounded-2xl object-cover object-center"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </GlowSection>

      {/* Section d'explication */}
      <section id="comment-ca-marche" className="py-fluid-xl bg-gray-50">
        <div className="container">
          <div className="text-center mb-fluid-lg">
            <h2 className="text-fluid-3xl font-bold text-eerie-black mb-fluid-xs">Comment ça fonctionne ?</h2>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto">
              Un processus simple en 4 étapes pour découvrir vos affinités politiques municipales
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-fluid-sm">
            {[
              {
                icon: FileText,
                title: "Répondez aux questions",
                description: "Partagez vos opinions sur une série d'enjeux municipaux clés.",
              },
              {
                icon: BarChart3,
                title: "Obtenez vos résultats",
                description: "Visualisez votre alignement avec chaque candidat de manière claire et détaillée.",
              },
              {
                icon: Users,
                title: "Prenez une décision éclairée",
                description:
                  "Utilisez vos résultats pour mieux comprendre quel candidat correspond à vos priorités avant de voter.",
              },
              {
                icon: Share2,
                title: "Partagez (si vous voulez!)",
                description: "Discutez de vos résultats avec vos amis et votre famille pour encourager le débat.",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-6 flex flex-col justify-center items-center min-h-[320px]">
                  <div className="w-12 h-12 bg-midnight-green/10 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-6 h-6 text-midnight-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-eerie-black">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section pourquoi c'est important */}
      <section className="section-contained w-full py-fluid-lg bg-azure-web/40">
        <div className="container">
          <h2 className="text-fluid-3xl text-center mb-fluid-md text-foreground animate-slideInUp">
            Pourquoi vos élections municipales comptent autant ?
          </h2>
          <div className="grid gap-fluid-md md:grid-cols-3">
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col h-full min-h-[400px]">
                <div className="h-1/2 flex items-center justify-center mb-4">
                  <div className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/Image_cycliste_chien.webp" 
                      alt="Transport quotidien - cycliste avec chien" 
                      width={200} 
                      height={200} 
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>
                </div>
                <div className="h-1/2 flex flex-col justify-center text-center">
                  <h3 className="font-semibold mb-3 text-foreground text-lg">Transport quotidien</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Bus, métro, vélo, routes : votre municipalité décide comment vous vous déplacez au quotidien.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col h-full min-h-[400px]">
                <div className="h-1/2 flex items-center justify-center mb-4">
                  <div className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/Image_quartier_ordures.webp" 
                      alt="Votre quartier - services municipaux" 
                      width={200} 
                      height={200} 
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>
                </div>
                <div className="h-1/2 flex flex-col justify-center text-center">
                  <h3 className="font-semibold mb-3 text-foreground text-lg">Votre quartier</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Parcs, collecte des déchets, bibliothèques, déneigement : les services qui façonnent votre qualité de vie locale.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col h-full min-h-[400px]">
                <div className="h-1/2 flex items-center justify-center mb-4">
                  <div className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/Image_parc_jardinage.webp" 
                      alt="Vos taxes - investissement municipal" 
                      width={200} 
                      height={200} 
                      className="w-full h-full object-center rounded-xl" 
                    />
                  </div>
                </div>
                <div className="h-1/2 flex flex-col justify-center text-center">
                  <h3 className="font-semibold mb-3 text-foreground text-lg">Vos taxes</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    La plus grande part de vos impôts locaux. Comment ils sont utilisés dépend de qui vous élisez.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              <strong>Le problème ?</strong> Il n&apos;existait aucun moyen simple de comparer les partis municipaux sur ces enjeux. 
              C&apos;est pourquoi nous avons créé cette boussole.
            </p>
            <RainbowButton 
              className="text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openPostalCodeModal')
                window.dispatchEvent(event)
              }}
            >
              Découvrez vos affinités politiques
            </RainbowButton>
          </div>
        </div>
      </section>

      {/* Section éducative avec glow subtil */}
      <GlowSection 
        glowProps={{ 
          mode: 'drift', 
          intensity: 'subtle',
          colors: ['#04454A', '#EAFCFC'],
          duration: 12
        }}
        className="section-contained w-full py-16 md:py-20 bg-gradient-to-br from-azure-web to-isabelline"
      >
        <div className="container px-4 md:px-6 max-w-[1200px] mx-auto text-center">
          <div
            className="animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="mb-6 text-foreground">Votre vote municipal a plus d&apos;impact que vous pensez</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Transport, logement, parcs, déneigement, taxes : votre ville décide de tout ce qui façonne votre quotidien. 
              Pourtant, seulement <ColoredText variant="accent" intensity="bold">40% des citoyens</ColoredText> votent aux élections municipales. 
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
                <div className="text-4xl font-bold text-midnight-green mb-3">{item.stat}</div>
                <div className="text-lg font-semibold text-foreground mb-3">{item.label}</div>
                <div className="text-base text-muted-foreground leading-relaxed">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </GlowSection>

      {/* Section de confidentialité avec image - PROFESSIONAL QUALITY */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image - PROFESSIONAL SIZE */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Image_famille.webp"
                  alt="Famille dans la municipalité de Québec - Illustration vie de quartier - Boussole électorale municipale 2025"
                  fill
                  className="object-cover"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Contenu textuel */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-eerie-black leading-tight mb-6 max-w-full break-words">
                  Votre vie privée, notre priorité.
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl w-full break-words">
                  Utilisez la Boussole Municipale en toute confiance. Vos réponses sont anonymes par défaut.
                  Vous pouvez choisir de recevoir vos résultats par email et accepter des communications ciblées.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="inline-flex items-center px-4 md:px-8 py-4 text-sm md:text-base font-medium border-2 border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-white transition-all duration-200 rounded-xl w-full sm:w-auto justify-center"
              >
                <Link href="/confidentialite" className="text-center">Lire notre politique de confidentialité</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="section-contained w-full py-12 md:py-16 bg-gradient-to-r from-midnight-green to-teal-main">
        <div className="container px-4 md:px-6 max-w-[1200px] mx-auto text-center">
          <div className="animate-slideInUp" style={{ animationDelay: "0.2s" }}>
            <h2 className="mb-6 text-primary-foreground">Prêt à découvrir vos affinités politiques ?</h2>
            <p className="text-base sm:text-lg text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed w-full break-words px-4">
              Participez à notre questionnaire interactif et obtenez une vue claire de votre positionnement politique municipal.
            </p>
            <RainbowButton 
              className="text-white rounded-xl px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openPostalCodeModal')
                window.dispatchEvent(event)
              }}
            >
              Découvrez vos affinités politiques
            </RainbowButton>
          </div>
        </div>
      </section>

      {/* Modal déplacé dans StartQuestionnaireButton pour éviter charge du modal sur / */}
    </div>
  )
}
