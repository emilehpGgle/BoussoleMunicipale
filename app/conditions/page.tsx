import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConditionsPage() {
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
          Conditions d&apos;utilisation
        </h1>
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">Acceptation des conditions</h2>
          <p>
            En utilisant la Boussole Municipale, vous acceptez les présentes conditions d&apos;utilisation. 
            Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Description du service</h2>
          <p>
            La Boussole Municipale est un outil éducatif conçu pour aider les citoyens à comprendre 
            leurs affinités politiques avec les partis municipaux de Québec. Cet outil est fourni 
            à des fins d&apos;information uniquement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Exactitude des informations</h2>
          <p>
            Nous nous efforçons de maintenir l&apos;exactitude des informations sur les partis politiques, 
            mais nous ne garantissons pas que toutes les informations sont complètes ou entièrement 
            à jour. Les utilisateurs sont encouragés à vérifier les informations auprès des sources officielles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Utilisation appropriée</h2>
          <p>
            Vous vous engagez à utiliser ce service de manière appropriée et légale. 
            Il est interdit de :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Utiliser le service à des fins illégales</li>
            <li>Tenter de compromettre la sécurité du système</li>
            <li>Publier du contenu offensant ou inapproprié</li>
            <li>Utiliser des moyens automatisés pour accéder au service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Limitation de responsabilité</h2>
          <p>
            La Boussole Municipale est fournie &quot;en l&apos;état&quot; sans garantie d&apos;aucune sorte. 
            Nous ne sommes pas responsables des décisions prises sur la base des résultats obtenus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Modification des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions d&apos;utilisation à tout moment. 
            Les modifications prendront effet dès leur publication sur le site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            Pour toute question concernant ces conditions d&apos;utilisation, 
            consultez notre page À Propos pour les informations de contact.
          </p>
        </section>
      </div>
    </div>
  )
} 