"use client"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { FileText, BarChart3, Users, Compass, Share2, HelpCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ColoredText } from "@/components/ui/colored-text"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { GlowSection } from "@/components/ui/subtle-glow"
import { CountdownBadge } from "@/components/ui/countdown-badge"
import { MotionCard } from "@/components/ui/motion-button"
import { FadeInSection, StaggeredList, ParallaxSection } from "@/components/ui/scroll-animations"
 

export default function HomePage() {
  return (
    <div>

      {/* Section Hero avec parallaxe et animations modernes */}
      <ParallaxSection className="section-contained w-full py-fluid-lg bg-gradient-to-br from-isabelline to-azure-web/20 relative overflow-hidden">
        {/* Glow effect en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-green/5 to-transparent pointer-events-none" />
        
        <div className="container relative">
          <div className="grid md:grid-cols-2 gap-fluid-md items-center">
            <FadeInSection 
              variant="slide-up" 
              delay={0.1}
              className="flex flex-col space-y-fluid-sm"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-muted-foreground/80 flex items-center">
                  <Compass className="w-5 h-5 mr-2" /> Élections municipales
                </span>
                <CountdownBadge />
              </div>
              <h1 className="text-fluid-hero font-black leading-tight tracking-tight text-foreground w-full max-w-full break-words">
                Votre <span className="text-midnight-green relative inline-block">
                  boussole électorale
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-midnight-green via-teal-main-400 to-orange-400 rounded-full opacity-60" />
                </span>{" "}
                municipale
              </h1>
              <p className="text-lg font-medium text-midnight-green/80 -mt-2 mb-2">
                Élections municipales Québec 2025
              </p>
              <p className="text-fluid-base text-muted-foreground max-w-lg w-full break-words">
                Découvrez quel parti municipal vous correspond vraiment ! En 5 minutes, identifiez vos affinités politiques sur les enjeux qui touchent votre quotidien : transport, logement, services de proximité, fiscalité locale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-midnight-green text-midnight-green hover:bg-midnight-green/10 hover:text-midnight-green rounded-xl px-6 py-4 text-base font-semibold border-2 w-fit"
                >
                  <Link href="#comment-ca-marche" className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Comment ça marche ?
                  </Link>
                </Button>
                <div className="flex flex-col gap-2">
                  <RainbowButton
                    className="rounded-xl px-6 py-4 text-base font-semibold w-fit"
                    onClick={() => {
                      const event = new CustomEvent('openPostalCodeModal')
                      window.dispatchEvent(event)
                    }}
                  >
                    Découvrez vos affinités politiques
                  </RainbowButton>
                  <span className="text-xs text-muted-foreground text-center sm:text-left">⏱️ Test politique rapide • 5 minutes • 21 questions</span>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 text-center sm:text-left">
                    <Link href="/elections-municipales-2025-quebec" className="text-sm text-midnight-green underline hover:text-midnight-green/80">
                      📅 Guide Élections 2025
                    </Link>
                    <Link href="/faq" className="text-sm text-midnight-green underline hover:text-midnight-green/80">
                      Questions fréquentes
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection
              variant="slide-right"
              delay={0.3}
              className="relative"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-w-full rounded-2xl overflow-hidden">
                <Image
                  src="/Image_parc_crisp.webp"
                  alt="Parc municipal de Québec - Illustration citoyens et espaces verts - Boussole électorale municipale 2025"
                  fill
                  className="rounded-2xl object-cover object-center transition-transform duration-300 hover:scale-105"
                  priority={true}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </ParallaxSection>

      {/* Section d'explication */}
      <section id="comment-ca-marche" className="py-fluid-xl bg-gray-50">
        <div className="container">
          <FadeInSection className="text-center mb-fluid-lg">
            <h2 className="text-fluid-3xl font-bold text-eerie-black mb-fluid-xs">Comment fonctionne notre boussole électorale ?</h2>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto">
              Notre <strong>boussole electorale municipale</strong> utilise un processus simple en 4 étapes pour découvrir vos affinités politiques pour les élections 2025
            </p>
          </FadeInSection>
          <StaggeredList className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-fluid-sm">
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
              <MotionCard 
                key={index} 
                className="text-center hover:shadow-lg transition-shadow"
                interactive={true}
              >
                <CardContent className="p-8 space-y-6 flex flex-col justify-center items-center">
                  <div className="w-12 h-12 bg-midnight-green/10 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-6 h-6 text-midnight-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-eerie-black">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">{step.description}</p>
                </CardContent>
              </MotionCard>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Section pourquoi c'est important */}
      <section className="section-contained-rainbow w-full py-fluid-lg bg-azure-web/40">
        <div className="container-rainbow">
          <FadeInSection 
            variant="slide-up" 
            delay={0.1}
            className="text-center mb-fluid-md"
          >
            <h2 className="text-fluid-3xl text-foreground">
              Pourquoi vos élections municipales comptent autant ?
            </h2>
          </FadeInSection>
          <StaggeredList className="grid gap-fluid-md md:grid-cols-3">
            {[
              {
                image: "/Image_cycliste_chien.webp",
                alt: "Transport quotidien - cycliste avec chien",
                title: "Transport quotidien",
                description: "Bus, métro, vélo, routes : votre municipalité décide comment vous vous déplacez au quotidien."
              },
              {
                image: "/Image_quartier_ordures.webp",
                alt: "Votre quartier - services municipaux",
                title: "Votre quartier",
                description: "Parcs, collecte des déchets, bibliothèques, déneigement : les services qui façonnent votre qualité de vie locale."
              },
              {
                image: "/Image_parc_jardinage.webp",
                alt: "Vos taxes - investissement municipal",
                title: "Vos taxes",
                description: "La plus grande part de vos impôts locaux. Comment ils sont utilisés dépend de qui vous élisez."
              }
            ].map((item) => (
              <MotionCard 
                key={item.title}
                className="p-8 bg-card rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200"
                interactive={true}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden">
                      <Image 
                        src={item.image}
                        alt={item.alt}
                        width={200} 
                        height={200} 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-center">
                    <h3 className="font-semibold mb-3 text-foreground text-lg">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionCard>
            ))}
          </StaggeredList>
          <FadeInSection delay={0.6} className="mt-8">
            <p className="text-muted-foreground mb-4 text-center">
              <strong>Le problème ?</strong> Il n&apos;existait aucun moyen simple de comparer les partis municipaux sur ces enjeux. 
              C&apos;est pourquoi nous avons créé cette boussole.
            </p>
            <div className="flex justify-center">
              <RainbowButton
                className="rounded-xl px-6 py-4 text-base font-semibold"
                onClick={() => {
                  const event = new CustomEvent('openPostalCodeModal')
                  window.dispatchEvent(event)
                }}
              >
                Découvrez vos affinités politiques
              </RainbowButton>
            </div>
          </FadeInSection>
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
          <FadeInSection 
            variant="slide-up" 
            delay={0.2}
          >
            <h2 className="mb-6 text-foreground">Votre vote municipal a plus d&apos;impact que vous pensez</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Transport, logement, parcs, déneigement, taxes : votre ville décide de tout ce qui façonne votre quotidien. 
              Pourtant, seulement <ColoredText variant="accent" intensity="bold">40% des citoyens</ColoredText> votent aux élections municipales. 
              Résultat ? Votre voix compte encore plus ! Notre boussole vous aide à faire un choix éclairé en quelques minutes.
            </p>
          </FadeInSection>
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
            ].map((item) => (
              <MotionCard
                key={item.label}
                className="p-8 bg-card rounded-xl shadow-soft card-interactive-effects hover:shadow-md transition-shadow duration-200"
                interactive={true}
              >
                <div className="text-4xl font-bold text-midnight-green mb-3">{item.stat}</div>
                <div className="text-lg font-semibold text-foreground mb-3">{item.label}</div>
                <div className="text-base text-muted-foreground leading-relaxed">{item.description}</div>
              </MotionCard>
            ))}
          </div>
        </div>
      </GlowSection>

      {/* Section de confidentialité avec image - PROFESSIONAL QUALITY */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image - PROFESSIONAL SIZE */}
            <FadeInSection
              variant="slide-right"
              delay={0.2}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/Image_famille.webp"
                  alt="Famille dans la municipalité de Québec - Illustration vie de quartier - Boussole électorale municipale 2025"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeInSection>
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
      <section className="section-contained-rainbow w-full py-12 md:py-16 bg-gradient-to-r from-midnight-green to-teal-main">
        <div className="container-rainbow px-4 md:px-6 max-w-[1200px] mx-auto text-center">
          <FadeInSection 
            variant="slide-up" 
            delay={0.2}
          >
            <h2 className="mb-6 text-primary-foreground">Prêt à découvrir vos affinités politiques ?</h2>
            <p className="text-base sm:text-lg text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed w-full break-words px-4">
              Participez à notre questionnaire interactif et obtenez une vue claire de votre positionnement politique municipal.
            </p>
            <RainbowButton
              variant="white"
              className="rounded-xl px-6 py-4 text-base font-semibold w-fit"
              onClick={() => {
                const event = new CustomEvent('openPostalCodeModal')
                window.dispatchEvent(event)
              }}
            >
              Découvrez vos affinités politiques
            </RainbowButton>
          </FadeInSection>
        </div>
      </section>

      {/* Modal déplacé dans StartQuestionnaireButton pour éviter charge du modal sur / */}
    </div>
  )
}
