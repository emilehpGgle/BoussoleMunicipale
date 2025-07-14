import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, CheckCircle, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | Questions Fréquentes - Boussole Électorale Municipale Québec 2025",
  description: "Réponses aux questions sur la boussole électorale municipale pour les élections de Québec 2025. Différence avec les boussoles provinciales ? Comment fonctionne notre boussole électorale locale ? Bruno Marchand tramway position ?",
  keywords: [
    // Parasitage + différenciation municipale
    "boussole électorale",
    "boussole électorale municipale",
    "boussole électorale locale", 
    "boussole électorale 2025",
    "la boussole électorale",
    "bruno marchand",
    "bruno marchand tramway",
    "élections municipales 2025",
    "politique gauche droite",
    "maire de québec",
    "boussole électorale québec",
    "partis politiques québec",
    "boussole électorale jeunesse",
    "questionnaire politique municipal"
  ].join(", "),
  openGraph: {
    title: "FAQ - Questions sur la Boussole Électorale Municipale Québec 2025",
    description: "Toutes vos questions sur notre boussole électorale spécialisée pour les élections municipales de Québec. Découvrez la différence avec les boussoles provinciales."
  }
}

export default function FAQPage() {
  const faqData = [
    {
      category: "Généralités",
      questions: [
        {
          q: "Qu'est-ce que la Boussole Électorale Municipale 2025 ?",
          a: "La Boussole Électorale Municipale 2025 est un questionnaire politique gratuit et anonyme spécialisé pour les élections MUNICIPALES de Québec. Contrairement aux boussoles électorales généralistes (provinciales/fédérales), nous nous concentrons exclusivement sur les enjeux locaux qui affectent votre quotidien : tramway, logement, services municipaux."
        },
        {
          q: "Quelle est la différence avec les autres boussoles électorales ?",
          a: "Notre boussole électorale municipale se distingue des boussoles provinciales ou fédérales par sa spécialisation locale. Nous analysons uniquement les partis et candidats municipaux de Québec (Bruno Marchand, etc.) sur des enjeux hyperlocaux. Les autres boussoles électorales traitent d'enjeux généraux (santé, éducation) qui ne relèvent pas du municipal."
        },
        {
          q: "Comment fonctionne la boussole électorale ?",
          a: "Notre boussole électorale analyse vos réponses sur 21 enjeux municipaux (tramway, logement, environnement, finances). Vous indiquez votre niveau d'accord et l'importance de chaque enjeu. Notre algorithme compare vos positions avec celles des partis politiques québécois et calcule un pourcentage de compatibilité."
        },
        {
          q: "Combien de temps prend le questionnaire ?",
          a: "Le questionnaire de la boussole électorale prend environ 5 minutes à compléter. Il contient 21 questions sur les enjeux municipaux de Québec. Vous pouvez le faire à votre rythme et reprendre plus tard si nécessaire."
        }
      ]
    },
    {
      category: "Élections Municipales 2025",
      questions: [
        {
          q: "Quand ont lieu les élections municipales québec 2025 ?",
          a: "Les élections municipales de Québec auront lieu en novembre 2025. La date exacte sera confirmée par la Ville de Québec. Notre boussole électorale vous aide à vous préparer en identifiant vos affinités politiques avec les partis municipaux."
        },
        {
          q: "Quels sont les partis politiques municipaux de Québec ?",
          a: "Les principaux partis politiques québec pour les élections municipales 2025 incluent : Équipe Priorité Québec (Bruno Marchand), Québec d'Abord, Transition Québec, Leadership Québec, Respect Citoyens, Québec Forte et Fière, et Alliance Citoyenne. Notre test analyse les positions de tous ces partis."
        },
        {
          q: "Quelle est la position de Bruno Marchand sur le tramway ?",
          a: "Bruno Marchand, maire sortant avec Équipe Priorité Québec, soutient le projet de tramway québec. Sa position est généralement favorable au développement du transport en commun structurant. Notre boussole électorale vous permet de comparer votre opinion sur le tramway avec celle de tous les partis."
        }
      ]
    },
    {
      category: "Fonctionnement du Test",
      questions: [
        {
          q: "Comment interpréter mon positionnement politique gauche-droite ?",
          a: "Votre position sur la carte politique gauche-droite se base sur deux axes : économique (interventionnisme vs libéralisme) et social (progressisme vs conservatisme). Plus vous êtes à gauche, plus vous favorisez l'intervention publique et les valeurs progressistes. À droite, vous privilégiez le libre marché et des approches plus traditionnelles."
        },
        {
          q: "La boussole électorale est-elle fiable ?",
          a: "Notre boussole électorale se base sur les programmes officiels et déclarations publiques vérifiées des partis politiques québec. Nous mettons à jour régulièrement les positions. Cependant, c'est un outil d'aide à la décision qui ne remplace pas vos propres recherches sur les candidats et leurs programmes."
        },
        {
          q: "Mes données sont-elles privées ?",
          a: "Absolument ! Notre boussole électorale est entièrement anonyme. Nous ne collectons aucune donnée personnelle. Vos réponses restent sur votre appareil et ne sont jamais transmises ou stockées sur nos serveurs."
        }
      ]
    },
    {
      category: "Enjeux Municipaux",
      questions: [
        {
          q: "Quels sont les principaux enjeux municipaux québec 2025 ?",
          a: "Les enjeux municipaux clés pour 2025 incluent : le projet de tramway quebec, la crise du logement, la densification urbaine, la transition écologique, les finances municipales, la démocratie participative, et la sécurité publique. Notre boussole électorale couvre tous ces aspects pour identifier vos priorités."
        },
        {
          q: "Comment les partis se positionnent-ils sur l'environnement ?",
          a: "Les partis politiques québec ont des approches variées : certains priorisent la transition énergétique et les espaces verts, d'autres mettent l'accent sur l'équilibre avec le développement économique. Notre boussole électorale vous aide à identifier quel parti partage votre vision environnementale."
        },
        {
          q: "Qu'en est-il des finances municipales ?",
          a: "Les approches diffèrent entre les partis : gestion rigoureuse vs investissements publics, taxation vs services, endettement acceptable vs équilibre budgétaire. La boussole électorale évalue votre position sur ces questions financières cruciales."
        }
      ]
    },
    {
      category: "Résultats et Partage",
      questions: [
        {
          q: "Comment interpréter mes affinités politiques ?",
          a: "Vos affinités politiques sont exprimées en pourcentage de compatibilité avec chaque parti. Plus le pourcentage est élevé, plus vos réponses correspondent aux positions du parti. Un score de 70%+ indique une forte affinité, 50-70% une affinité modérée, moins de 50% une affinité faible."
        },
        {
          q: "Puis-je partager mes résultats ?",
          a: "Oui ! Vous pouvez partager vos résultats de la boussole électorale sur les réseaux sociaux ou par email. Cela peut encourager le débat démocratique et inciter vos proches à faire également le questionnaire."
        },
        {
          q: "Que faire si aucun parti ne me correspond ?",
          a: "C&apos;est normal ! La politique municipale est complexe. Vous pouvez : 1) Consulter les pages détaillées des partis les mieux classés, 2) Prioriser les enjeux les plus importants pour vous, 3) Considérer les candidats individuels qui peuvent différer de leur parti, 4) Vous informer davantage sur les programmes complets."
        }
      ]
    }
  ]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* En-tête SEO optimisé */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Questions Fréquentes sur la Boussole Électorale 2025
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tout ce que vous devez savoir sur notre boussole électorale pour les élections municipales de Québec 2025.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Aide et Support
          </CardTitle>
          <CardDescription>
            Trouvez rapidement les réponses à vos questions sur la boussole électorale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette page répond aux questions les plus fréquentes sur notre <strong>boussole électorale</strong> pour les 
            <strong> élections municipales 2025</strong>. Si vous ne trouvez pas votre réponse, 
            n&apos;hésitez pas à nous contacter.
          </p>
        </CardContent>
      </Card>

      {/* FAQ par catégorie */}
      {faqData.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item, index) => (
                <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      {/* Section aide supplémentaire */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Besoin d&apos;aide supplémentaire ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Besoin d&apos;aide supplémentaire ?</h4>
                <p className="text-sm text-muted-foreground">
                  Consultez notre page <Link href="/a-propos" className="text-primary hover:underline">À Propos</Link> pour 
                  comprendre la méthodologie complète de la boussole électorale.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Questionnaire Politique</h4>
                <p className="text-sm text-muted-foreground">
                  Commencez dès maintenant votre <Link href="/questionnaire" className="text-primary hover:underline">questionnaire gratuit</Link> pour 
                  découvrir vos affinités avec les partis municipaux.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action final */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à découvrir vos affinités politiques ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Utilisez notre <strong>boussole électorale</strong> pour identifier quel parti municipal de Québec 
            partage le mieux vos idées pour les <strong>élections 2025</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/questionnaire">
                Commencer le Questionnaire
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/a-propos">
                En Savoir Plus
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 