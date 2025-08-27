import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/parc-chat-dort.webp"
              alt="Parc municipal paisible - Prenez une décision éclairée"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Prêt à découvrir vos affinités politiques ?
            </h2>
            <p className="text-xl text-gray-600">
              Participez à notre questionnaire interactif et obtenez une vue claire de votre positionnement politique
              municipal.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Découvrez vos affinités politiques
              </Button>
              <p className="text-sm text-gray-500">
                Vos réponses sont anonymes et ne sont utilisées que pour calculer vos résultats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
