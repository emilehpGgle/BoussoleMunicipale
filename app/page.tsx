"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Users, Compass, Share2 } from "lucide-react" // Added Share2
import Image from "next/image"
import Link from "next/link"
import { ColoredText } from "@/components/ui/colored-text"
import { GlowSection } from "@/components/ui/subtle-glow"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import { boussoleQuestions } from "@/lib/boussole-data"
import ContinueOrRestartModal from "@/components/existing-responses-modal"

export default function HomePage() {
  const { sessionToken } = useSession()
  const { getResponseCounts, isLoading } = useUserResponses()
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)

  // Fonction pour gérer le clic sur "Commencer" - vérifie le statut du questionnaire
  const handleStartQuestionnaire = async () => {
    try {
      // Si pas de session, ouvrir le modal du code postal
      if (!sessionToken) {
        const event = new CustomEvent('openPostalCodeModal')
        window.dispatchEvent(event)
        return
      }

      // Si on a une session, vérifier le statut du questionnaire
      if (!isLoading) {
        const counts = getResponseCounts()
        const totalQuestions = boussoleQuestions.length
        
        if (counts.total >= totalQuestions) {
          // Questionnaire terminé - ouvrir le modal pour choisir entre voir résultats ou recommencer
          setIsExistingResponsesModalOpen(true)
        } else if (counts.total > 0) {
          // Questionnaire en cours - ouvrir le modal pour choisir entre continuer ou recommencer
          setIsExistingResponsesModalOpen(true)
        } else {
          // Questionnaire pas commencé - ouvrir le modal du code postal
          const event = new CustomEvent('openPostalCodeModal')
          window.dispatchEvent(event)
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du questionnaire:', error)
      // En cas d'erreur, ouvrir le modal par défaut
      const event = new CustomEvent('openPostalCodeModal')
      window.dispatchEvent(event)
    }
  }



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
                <Compass className="w-5 h-5 mr-2" /> La boussole électorale MUNICIPALE 2025 de Québec
              </span>
              <h1 className="tracking-tight text-foreground">
                <ColoredText variant="gradient" intensity="medium">Boussole Électorale Municipale</ColoredText> - Spécialisée pour Québec
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                La seule boussole électorale dédiée aux <strong>élections municipales</strong> de Québec. Questionnaire gratuit de 5 minutes pour découvrir vos affinités avec les partis municipaux. Bruno Marchand, tramway, logement : votre boussole électorale locale !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <Button
                    size="lg"
                    onClick={handleStartQuestionnaire}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Commencer le questionnaire
                  </Button>
                  <span className="text-xs text-muted-foreground text-center sm:text-left">⏱️ 5 minutes • 21 questions</span>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-xl px-8 py-3 text-base font-semibold btn-base-effects btn-hover-lift"
                >
                  <Link href="#comment-ca-marche">Comment ça marche ?</Link>
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
                src="/hero-illustration.png"
                alt="Illustration de citoyens diversifiés autour d'une boussole"
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
      <section id="comment-ca-marche" className="section-contained w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-foreground animate-slideInUp" style={{ animationDelay: "0.2s" }}>
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
                className="flex flex-col items-start text-left p-8 bg-card rounded-2xl shadow-soft animate-slideInUp card-interactive-effects group"
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

      {/* Section de différenciation municipal vs autres niveaux */}
      <section className="section-contained w-full py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-center mb-8 text-foreground animate-slideInUp">
            Municipal vs Provincial/Fédéral : Pourquoi une boussole électorale spécialisée ?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 bg-card rounded-xl shadow-soft">
              <h3 className="font-semibold mb-3 text-foreground">🏛️ Fédéral/Provincial</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Enjeux généraux nationaux</li>
                <li>• Santé, éducation, économie</li>
                <li>• Boussole électorale généraliste</li>
                <li>• Impact indirect sur le quotidien</li>
              </ul>
            </div>
            <div className="p-6 bg-primary/10 border-2 border-primary rounded-xl shadow-lg">
              <h3 className="font-semibold mb-3 text-primary">🏘️ Municipal (Notre spécialité)</h3>
              <ul className="text-sm text-foreground space-y-2">
                <li>• <strong>Tramway et transport local</strong></li>
                <li>• <strong>Logement et zonage</strong></li>
                <li>• <strong>Parcs et services de proximité</strong></li>
                <li>• <strong>Impact direct quotidien</strong></li>
              </ul>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-soft">
              <h3 className="font-semibold mb-3 text-foreground">❓ Autres Boussoles</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Questions génériques</li>
                <li>• Partis provinciaux/fédéraux</li>
                <li>• Pas adaptées aux enjeux locaux</li>
                <li>• Bruno Marchand non inclus</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              <strong>C&apos;est pourquoi</strong> notre boussole électorale municipale existe : 
              pour les enjeux qui touchent vraiment votre quartier, votre ville, votre quotidien.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/questionnaire">
                Essayer Notre Boussole Municipale
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
            <h2 className="mb-6 text-foreground">Pourquoi une boussole électorale spécialisée pour le municipal ?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Contrairement aux boussoles électorales provinciales ou fédérales, notre boussole électorale municipale se concentre sur les enjeux qui affectent votre quotidien direct : transport local (tramway), logement abordable, services municipaux. 
              Les élections municipales 2025 de Québec nécessitent une boussole électorale locale adaptée aux réalités de votre ville. 
              Que vous soyez intéressé par les positions de Bruno Marchand ou d&apos;autres candidats municipaux, notre questionnaire politique municipal vous guide sur l&apos;axe politique gauche-droite spécifique aux enjeux locaux. 
              Pourtant, seulement <ColoredText variant="primary" intensity="bold">40% des citoyens</ColoredText> votent aux municipales. 
              Votre voix compte encore plus !
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
                className="p-6 bg-card rounded-xl shadow-soft animate-slideInUp card-interactive-effects"
                style={{ animationDelay: `${index * 0.15 + 0.4}s` }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <div className="text-lg font-semibold text-foreground mb-2">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
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
                src="/Image_parc_crisp.png"
                alt="Illustration d'un parc municipal avec des citoyens"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
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
            <Button
              size="lg"
              onClick={handleStartQuestionnaire}
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Commencer maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* Modal pour les réponses existantes */}
      <ContinueOrRestartModal
        isOpen={isExistingResponsesModalOpen}
        onClose={() => setIsExistingResponsesModalOpen(false)}
        targetPath="/"
      />
    </div>
  )
}
