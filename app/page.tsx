"use client"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Users, Compass, Share2 } from "lucide-react" // Added Share2
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  // Fonction pour déclencher l'ouverture du modal depuis le header
  const openModal = () => {
    console.log('🔥 [HERO] Bouton cliqué - Début de openModal()')
    console.log('🔥 [HERO] window object:', typeof window)
    console.log('🔥 [HERO] dispatchEvent function:', typeof window.dispatchEvent)
    
    try {
      const event = new CustomEvent('openPostalCodeModal')
      console.log('🔥 [HERO] Event créé:', event)
      window.dispatchEvent(event)
      console.log('🔥 [HERO] Event émis avec succès')
    } catch (error) {
      console.error('🔥 [HERO] Erreur lors de l\'émission de l\'événement:', error)
    }
  }

  return (
    <>
      {/* Section Hero */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden">
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col space-y-6 animate-slideInUp" style={{ animationDelay: "0.1s" }}>
              <span className="text-sm font-semibold text-muted-foreground/80 flex items-center">
                <Compass className="w-5 h-5 mr-2" /> Votre boussole citoyenne
              </span>
              <h1 className="tracking-tight text-foreground">
                Découvrez quel candidat municipal partage <span className="text-primary">vos idées.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Notre boussole interactive vous aide à comprendre les enjeux locaux et à trouver les candidats qui
                correspondent à vos priorités. Simple, neutre et personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <Button
                    size="lg"
                    onClick={openModal}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                  >
                    Commencer le questionnaire
                  </Button>
                  <span className="text-xs text-muted-foreground text-center sm:text-left">⏱️ 5 minutes • 20 questions</span>
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
              className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden animate-fadeIn"
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
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section d'explication */}
      <section id="comment-ca-marche" className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
          <h2 className="text-center mb-12 text-foreground animate-slideInUp" style={{ animationDelay: "0.2s" }}>
            Comment ça fonctionne ?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {" "}
            {/* Changed to lg:grid-cols-4 */}
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
                icon: Users, // Could be CheckSquare or similar for "decision"
                title: "3. Prenez une décision éclairée", // Clarified title
                description:
                  "Utilisez vos résultats pour mieux comprendre quel candidat correspond à vos priorités avant de voter.", // Clarified description
                color: "text-primary", // Uniformisé avec les autres icônes
                bgColor: "bg-primary/10", // Uniformisé avec les autres icônes
              },
              {
                icon: Share2, // New icon for sharing
                title: "4. Partagez (si vous voulez!)", // New step
                description: "Discutez de vos résultats avec vos amis et votre famille pour encourager le débat.",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col items-start text-left p-8 bg-card rounded-2xl shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slideInUp card-interactive-effects group"
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className={`p-3.5 ${item.bgColor} rounded-full mb-5 transition-transform group-hover:scale-110`}>
                  <item.icon className={`h-7 w-7 ${item.color} transition-colors`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section éducative */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/5 to-teal-special/5">
        <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
          <div
            className="animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="mb-6 text-foreground">Pourquoi les élections municipales sont-elles importantes ?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Votre ville influence directement votre quotidien : transports, parcs, taxes, services de proximité. 
              Pourtant, seulement <span className="font-semibold text-primary">40% des citoyens</span> votent aux municipales. 
              Votre voix compte encore plus !
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "85%",
                label: "de votre quotidien",
                description: "est influencé par les décisions municipales"
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
      </section>

      {/* Section de confidentialité avec image */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenu textuel */}
            <div
              className="text-center md:text-left p-10 bg-card rounded-2xl shadow-soft animate-slideInUp card-interactive-effects"
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
            {/* Image */}
            <div
              className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              <Image
                src="/Image_parc_crisp.png"
                alt="Illustration d'un parc municipal avec des citoyens"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-primary to-teal-special">
        <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
          <div className="animate-slideInUp" style={{ animationDelay: "0.2s" }}>
            <h2 className="mb-6 text-primary-foreground">Prêt à découvrir vos affinités politiques ?</h2>
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Participez à notre questionnaire interactif et obtenez une vue claire de votre positionnement politique municipal.
            </p>
            <Button
              size="lg"
              onClick={openModal}
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Commencer maintenant
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
