import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConfidentialitePage() {
  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Politique de confidentialité
        </h1>
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">Collecte d'informations</h2>
          <p>
            La Boussole Municipale collecte uniquement les informations nécessaires au fonctionnement 
            du questionnaire et à l'affichage de vos résultats. Cela inclut vos réponses aux questions 
            et les informations de profil optionnelles que vous choisissez de partager.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Utilisation des données</h2>
          <p>
            Vos données sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Calculer vos affinités politiques municipales</li>
            <li>Générer vos résultats personnalisés</li>
            <li>Permettre le partage de vos résultats si vous le souhaitez</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Protection des données</h2>
          <p>
            Nous ne vendons, ne louons, ni ne partageons vos informations personnelles avec des tiers. 
            Vos données sont stockées de manière sécurisée et ne sont accessibles qu'à vous.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires au fonctionnement de l'application. 
            Aucun cookie de suivi ou publicitaire n'est utilisé.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Vos droits</h2>
          <p>
            Vous pouvez à tout moment supprimer vos données depuis votre profil ou nous contacter 
            pour exercer vos droits relatifs à la protection des données.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité, 
            vous pouvez nous contacter via les informations disponibles sur la page À Propos.
          </p>
        </section>
      </div>
    </div>
  )
} 