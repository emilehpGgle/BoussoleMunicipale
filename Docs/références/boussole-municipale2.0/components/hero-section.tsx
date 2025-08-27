import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, TrendingUp, Vote } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/8 via-background to-accent/5 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,78,99,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,119,6,0.03)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10 animate-fade-in min-w-0 w-full">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight text-foreground w-full">
                Votre{" "}
                <span className="text-primary relative">
                  boussole
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
                </span>{" "}
                pour les élections municipales
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-medium-contrast leading-relaxed max-w-2xl font-medium w-full">
                Découvrez quel parti municipal vous correspond vraiment ! En 5 minutes, identifiez vos affinités
                politiques sur les enjeux qui touchent votre quotidien : transport, logement, services de proximité,
                fiscalité locale.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="btn-primary text-lg px-8 py-4 group">
                Découvrez vos affinités politiques
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex items-center text-medium-contrast bg-card/50 px-6 py-4 rounded-xl border border-border/50">
                <Clock className="mr-3 w-5 h-5 text-primary" />
                <span className="font-semibold">5 minutes • 21 questions</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10">
              <div className="card-premium text-center group">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-primary mb-2">70%</div>
                <div className="text-sm text-medium-contrast font-medium">du budget municipal</div>
              </div>
              <div className="card-premium text-center group">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-primary mb-2">40%</div>
                <div className="text-sm text-medium-contrast font-medium">de participation</div>
              </div>
              <div className="card-premium text-center group">
                <div className="flex justify-center mb-3">
                  <Vote className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-primary mb-2">1 vote</div>
                <div className="text-sm text-medium-contrast font-medium">peut faire la différence</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative animate-slide-up">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border/20">
              <Image
                src="/images/parc-crisp.webp"
                alt="Illustration d'une communauté active dans un parc municipal"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}
