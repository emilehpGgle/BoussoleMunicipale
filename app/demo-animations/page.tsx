"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MotionButton, MotionCard } from "@/components/ui/motion-button"
import { 
  FadeInSection, 
  StaggeredList, 
  ParallaxSection 
} from "@/components/ui/scroll-animations"
import {
  SkeletonCard,
  SkeletonText,
  ContentLoader,
} from "@/components/ui/skeleton"
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react"

export default function DemoAnimationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLoadDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero avec parallaxe légère */}
      <ParallaxSection className="relative h-[50vh] bg-gradient-to-br from-midnight-green to-midnight-green/80 flex items-center justify-center text-white">
        <div className="text-center">
          <FadeInSection variant="scale">
            <h1 className="text-5xl font-bold mb-4">
              Animations Modernes
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-xl opacity-90">
              Avec Framer Motion & Tailwind CSS
            </p>
          </FadeInSection>
        </div>
      </ParallaxSection>

      <div className="container mx-auto px-4 py-16 space-y-24">
        
        {/* Section Boutons */}
        <FadeInSection>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">1. Boutons Interactifs (MUST #1 & #2)</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="font-semibold">Button Standard (avec Motion)</h3>
                <Button>
                  <Sparkles className="w-4 h-4" />
                  Cliquez-moi
                </Button>
                <Button variant="outline">
                  Bouton Outline
                </Button>
                <Button variant="ghost">
                  Bouton Ghost
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">MotionButton Custom</h3>
                <MotionButton>
                  <Zap className="w-4 h-4" />
                  Motion Button
                </MotionButton>
                <MotionButton variant="outline">
                  Motion Outline
                </MotionButton>
                <MotionButton disabled>
                  Désactivé
                </MotionButton>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Variations de Button</h3>
                <Button variant="destructive">
                  Destructive
                </Button>
                <Button variant="secondary">
                  Secondary
                </Button>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Section Cards */}
        <FadeInSection variant="slide-up">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">2. Cards Interactives</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <MotionCard className="p-6">
                <Star className="w-8 h-8 text-midnight-green mb-3" />
                <h3 className="font-semibold mb-2">Card Interactive</h3>
                <p className="text-muted-foreground">
                  Survolez ou cliquez pour voir les animations fluides
                </p>
              </MotionCard>

              <MotionCard className="p-6" interactive={false}>
                <h3 className="font-semibold mb-2">Card Statique</h3>
                      <p className="text-muted-foreground">
                        Cette carte n&apos;a pas d&apos;animations au hover
                      </p>
              </MotionCard>

              <MotionCard className="p-6 bg-midnight-green text-white">
                <h3 className="font-semibold mb-2">Card Colorée</h3>
                <p className="opacity-90">
                  Avec un fond personnalisé
                </p>
              </MotionCard>
            </div>
          </div>
        </FadeInSection>

        {/* Section Skeleton Loaders */}
        <FadeInSection variant="fade">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">3. Skeleton Loaders (MUST #3)</h2>
            
            <div className="space-y-4">
              <Button onClick={handleLoadDemo}>
                Simuler un chargement
              </Button>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-4">Skeleton Card</h3>
                  <ContentLoader
                    isLoading={isLoading}
                    skeleton={<SkeletonCard />}
                  >
                    <MotionCard className="p-6">
                      <h3 className="font-semibold mb-2">Contenu Chargé!</h3>
                      <p className="text-muted-foreground">
                        Le contenu apparaît avec une animation fade-in
                      </p>
                    </MotionCard>
                  </ContentLoader>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Skeleton Text</h3>
                  <ContentLoader
                    isLoading={isLoading}
                    skeleton={<SkeletonText lines={4} />}
                  >
                    <div className="space-y-2">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                      <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </ContentLoader>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Section Animations au Scroll */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">4. Animations au Scroll (MUST #6)</h2>
          
          <div className="grid gap-12 md:grid-cols-2">
            <FadeInSection variant="slide-left">
              <MotionCard className="p-8 h-full">
                <h3 className="text-xl font-semibold mb-3">Slide depuis la gauche</h3>
                <p className="text-muted-foreground">
                  Cette carte glisse depuis la gauche quand elle entre dans le viewport
                </p>
              </MotionCard>
            </FadeInSection>

            <FadeInSection variant="slide-right">
              <MotionCard className="p-8 h-full">
                <h3 className="text-xl font-semibold mb-3">Slide depuis la droite</h3>
                <p className="text-muted-foreground">
                  Cette carte glisse depuis la droite avec une animation fluide
                </p>
              </MotionCard>
            </FadeInSection>
          </div>

          <FadeInSection variant="scale">
            <MotionCard className="p-12 text-center bg-gradient-to-br from-midnight-green/5 to-midnight-green/10">
              <h3 className="text-2xl font-bold mb-4">Animation Scale</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cette section apparaît avec un effet de zoom subtil,
                parfait pour mettre en valeur du contenu important
              </p>
            </MotionCard>
          </FadeInSection>
        </div>

        {/* Section Liste avec Stagger */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">5. Liste avec Stagger</h2>
          
          <StaggeredList className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <MotionCard key={item} className="p-6">
                <div className="w-12 h-12 bg-midnight-green/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-midnight-green font-bold">{item}</span>
                </div>
                <h3 className="font-semibold mb-2">Élément {item}</h3>
                <p className="text-sm text-muted-foreground">
                  Apparaît avec un délai de 70ms
                </p>
              </MotionCard>
            ))}
          </StaggeredList>
        </div>

        {/* Récapitulatif */}
        <FadeInSection variant="fade">
          <div className="bg-gradient-to-br from-midnight-green to-midnight-green/90 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              ✨ Animations Implémentées
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="space-y-2">
                <p>✅ États hover cohérents (MUST #1)</p>
                <p>✅ Feedback au clic (MUST #2)</p>
                <p>✅ Skeletons + shimmer (MUST #3)</p>
              </div>
              <div className="space-y-2">
                <p>✅ Transitions d&apos;entrée au scroll (MUST #6)</p>
                <p>✅ Animations fluides avec Framer Motion</p>
                <p>✅ Respect de prefers-reduced-motion</p>
              </div>
            </div>
            <div className="mt-8">
              <MotionButton size="lg" className="bg-white text-midnight-green hover:bg-white/90">
                <ArrowRight className="w-5 h-5" />
                Retour à l&apos;accueil
              </MotionButton>
            </div>
          </div>
        </FadeInSection>

      </div>
    </div>
  )
}
