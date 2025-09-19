import Link from "next/link"
import { ArrowLeft, Search, MessageSquare, Shield, BarChart3, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AccordionClient as Accordion, AccordionContentClient as AccordionContent, AccordionItemClient as AccordionItem, AccordionTriggerClient as AccordionTrigger } from "@/components/ui/accordion-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Centre d'aide | Boussole Municipale Québec",
  description: "Trouvez des réponses à vos questions sur la Boussole Municipale : fonctionnement, confidentialité, résultats et élections municipales de Québec 2025.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/centre-aide"
  }
}

export default function CentreAidePage() {
  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Centre d&apos;aide
        </h1>
        <p className="text-lg text-muted-foreground">
          Trouvez rapidement des réponses à vos questions sur la Boussole Municipale.
        </p>
      </div>

      {/* Barre de recherche */}
      <Card className="p-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher une question..." 
            className="pl-10"
          />
        </div>
      </Card>

      {/* Catégories d'aide */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <BarChart3 className="w-8 h-8 text-midnight-green mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Questionnaire</h3>
          <p className="text-sm text-muted-foreground">
            Questions sur le fonctionnement du questionnaire
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Users className="w-8 h-8 text-midnight-green mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Résultats</h3>
          <p className="text-sm text-muted-foreground">
            Comprendre et interpréter vos résultats
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Shield className="w-8 h-8 text-midnight-green mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Confidentialité</h3>
          <p className="text-sm text-muted-foreground">
            Protection de vos données personnelles
          </p>
        </Card>
      </div>

      {/* FAQ détaillée */}
      <div className="space-y-6">
        {/* Section Général */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-midnight-green" />
            Questions générales
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="quest-1">
              <AccordionTrigger>Qu&apos;est-ce que la Boussole Municipale ?</AccordionTrigger>
              <AccordionContent>
                La Boussole Municipale est un outil d&apos;aide à la décision pour les élections municipales 
                de Québec. Elle vous permet de découvrir vos affinités avec les différents partis politiques 
                municipaux en répondant à un questionnaire sur les enjeux locaux importants.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="quest-2">
              <AccordionTrigger>Est-ce que c&apos;est gratuit ?</AccordionTrigger>
              <AccordionContent>
                Oui, la Boussole Municipale est entièrement gratuite. Aucun frais n&apos;est exigé pour 
                utiliser l&apos;outil, consulter vos résultats ou partager vos résultats.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="quest-3">
              <AccordionTrigger>Qui a créé cet outil ?</AccordionTrigger>
              <AccordionContent>
                La Boussole Municipale a été développée par une équipe indépendante de citoyens engagés, 
                sans affiliation politique. Notre objectif est de promouvoir une participation citoyenne 
                éclairée aux élections municipales.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Questionnaire */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-midnight-green" />
            Le questionnaire
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="questionnaire-1">
              <AccordionTrigger>Combien de questions y a-t-il ?</AccordionTrigger>
              <AccordionContent>
                Le questionnaire comprend 21 questions couvrant 6 domaines clés de la politique municipale : 
                transport, logement, environnement, gouvernance, économie et sécurité.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="questionnaire-2">
              <AccordionTrigger>Combien de temps cela prend-il ?</AccordionTrigger>
              <AccordionContent>
                En moyenne, il faut 8 à 12 minutes pour compléter le questionnaire et consulter vos résultats. 
                Vous pouvez prendre votre temps et revenir sur vos réponses si nécessaire.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="questionnaire-3">
              <AccordionTrigger>Puis-je modifier mes réponses ?</AccordionTrigger>
              <AccordionContent>
                Oui, vous pouvez revenir sur vos réponses à tout moment pendant que vous complétez 
                le questionnaire. Une fois terminé, vous devrez recommencer si vous souhaitez changer 
                des réponses significatives.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="questionnaire-4">
              <AccordionTrigger>Que signifient les niveaux d&apos;importance ?</AccordionTrigger>
              <AccordionContent>
                Pour chaque question, vous indiquez non seulement votre position (accord/désaccord) 
                mais aussi l&apos;importance que vous accordez à cet enjeu. Cela permet de pondérer 
                les calculs selon vos priorités personnelles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Résultats */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-midnight-green" />
            Comprendre vos résultats
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="resultats-1">
              <AccordionTrigger>Comment sont calculés les pourcentages d&apos;affinité ?</AccordionTrigger>
              <AccordionContent>
                Les pourcentages d&apos;affinité sont calculés en comparant vos réponses avec les positions 
                officielles de chaque parti. Plus vos positions convergent avec celles d&apos;un parti, 
                plus votre pourcentage d&apos;affinité est élevé. L&apos;importance que vous accordez 
                à chaque enjeu influence également le calcul.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="resultats-2">
              <AccordionTrigger>Qu&apos;est-ce que la boussole politique ?</AccordionTrigger>
              <AccordionContent>
                La boussole politique est un graphique à deux dimensions qui positionne votre profil 
                politique selon deux axes : économique (interventionnisme ↔ libre marché) et 
                social/environnemental (conservateur ↔ progressiste). Cela vous aide à visualiser 
                votre positionnement politique global.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="resultats-3">
              <AccordionTrigger>Un faible pourcentage signifie-t-il que je ne devrais pas voter pour ce parti ?</AccordionTrigger>
              <AccordionContent>
                Pas nécessairement. Les résultats sont un outil d&apos;aide à la réflexion, pas une 
                recommandation absolue. Un parti avec un pourcentage plus faible pourrait quand même 
                vous convenir si ses positions sur vos enjeux prioritaires vous importent plus que 
                l&apos;alignement global. Consultez les détails par enjeu.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="resultats-4">
              <AccordionTrigger>Puis-je sauvegarder ou partager mes résultats ?</AccordionTrigger>
              <AccordionContent>
                Oui, vous pouvez générer un lien de partage pour vos résultats (de façon anonyme) 
                ou les recevoir par courriel. Vous pouvez aussi prendre une capture d&apos;écran 
                pour vos propres archives.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section Confidentialité */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-midnight-green" />
            Confidentialité et sécurité
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="confidentialite-1">
              <AccordionTrigger>Mes réponses sont-elles anonymes ?</AccordionTrigger>
              <AccordionContent>
                Oui, toutes vos réponses au questionnaire sont anonymes par défaut. Nous ne collectons aucune 
                information personnelle identifiable sans votre consentement explicite. Vous pouvez choisir 
                de fournir votre email pour recevoir vos résultats et accepter des communications ciblées.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="confidentialite-2">
              <AccordionTrigger>Vendez-vous mes données à des tiers ?</AccordionTrigger>
              <AccordionContent>
                Nous ne vendons jamais vos données personnelles sans votre consentement explicite. 
                Si vous choisissez de partager votre adresse courriel ou de consentir à des communications 
                marketing, ces choix sont entièrement volontaires et vous pouvez les retirer à tout moment.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="confidentialite-3">
              <AccordionTrigger>Comment puis-je supprimer mes données ?</AccordionTrigger>
              <AccordionContent>
                Vous pouvez supprimer toutes vos données à tout moment depuis votre profil ou en nous 
                contactant directement. La suppression est définitive et irréversible.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="confidentialite-4">
              <AccordionTrigger>Utilisez-vous des cookies ?</AccordionTrigger>
              <AccordionContent>
                Nous utilisons uniquement des cookies techniques essentiels au fonctionnement de 
                l&apos;application (sauvegarde de session, préférences d&apos;affichage). Aucun cookie 
                de suivi publicitaire n&apos;est utilisé.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      {/* Contact pour plus d'aide */}
      <Card className="p-6 mt-12 text-center">
        <Mail className="w-8 h-8 text-midnight-green mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Besoin d&apos;aide supplémentaire ?</h3>
        <p className="text-muted-foreground mb-4">
          Si vous ne trouvez pas la réponse à votre question, n&apos;hésitez pas à nous contacter.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild className="w-fit">
            <Link href="/contact">
              Nous contacter
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/faq">
              Voir la FAQ simple
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}