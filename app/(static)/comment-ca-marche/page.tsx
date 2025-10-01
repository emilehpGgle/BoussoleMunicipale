import Link from "next/link"
import { ArrowLeft, CheckCircle, Users, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StepCard, EngagementCard } from "@/components/ui/uniform-card"
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedTitle,
  AnimatedCTA
} from "@/components/ui/animated-wrappers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comment ça marche | Boussole Municipale Québec",
  description: "Découvrez comment fonctionne la Boussole Municipale : questionnaire, analyse des affinités politiques et résultats personnalisés pour les élections municipales de Québec 2025.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/comment-ca-marche"
  }
}

export default function CommentCaMarchePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16 px-4 md:px-6">
      {/* Hero section with gradient background */}
      <div className="-mx-4 md:-mx-6 mb-12 md:mb-16 px-4 md:px-6 py-8 md:py-12 bg-gradient-to-br from-azure-web to-isabelline rounded-2xl">
        <Button variant="ghost" asChild className="mb-6 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <AnimatedTitle>
          <h1 className="text-fluid-hero font-black text-foreground mb-6 md:mb-8 leading-tight">
            Comment ça marche
          </h1>
          <p className="text-fluid-lg text-muted-foreground max-w-2xl">
            Découvrez votre compatibilité politique municipale en 4 étapes simples.
          </p>
        </AnimatedTitle>
      </div>

      {/* Processus en étapes */}
      <AnimatedSection delay={0.2} className="space-y-12 md:space-y-16 mb-16 md:mb-20">
        <AnimatedGrid className="card-grid-standard">
          <StepCard
            step={1}
            title="Profil"
            description="Créez votre profil anonyme avec quelques informations démographiques"
          />
          <StepCard
            step={2}
            title="Questionnaire"
            description="Répondez à 21 questions sur les enjeux municipaux importants"
          />
          <StepCard
            step={3}
            title="Analyse"
            description="Nos algorithmes calculent vos affinités avec chaque parti politique"
          />
          <StepCard
            step={4}
            title="Résultats"
            description="Obtenez votre boussole politique et vos matches avec les partis"
          />
        </AnimatedGrid>
      </AnimatedSection>

      {/* Fonctionnement détaillé */}
      <AnimatedSection delay={0.4} className="space-y-12 md:space-y-16">
        <section>
          <AnimatedTitle delay={0.1}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black">Fonctionnement détaillé</h2>
          </AnimatedTitle>
          
          <div className="space-y-6">
            {/* Le questionnaire */}
            <Card className="p-6 md:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-fluid-2xl font-bold mb-4 text-foreground">Le questionnaire municipal</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre questionnaire couvre <strong>6 domaines clés</strong> de la politique municipale :
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Transport</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Logement</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Environnement</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Gouvernance</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Économie</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Sécurité</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Chaque question vous demande votre niveau d&apos;accord et d&apos;importance, 
                    pour une analyse nuancée de vos positions.
                  </p>
                </div>
              </div>
            </Card>

            {/* L'analyse */}
            <Card className="p-6 md:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <BarChart3 className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-fluid-2xl font-bold mb-4 text-foreground">L&apos;analyse scientifique</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre système utilise une <strong>double approche</strong> pour vous offrir une vision complète :
                  </p>

                  <div className="space-y-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">📍 Carte politique (Positionnement idéologique)</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Analyse votre position sur deux axes : économique et social</li>
                        <li>Calcule la distance pure entre vous et chaque parti</li>
                        <li>Outil éducatif pour comprendre le paysage politique</li>
                        <li><strong>Sans influence de vos priorités personnelles</strong></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">🎯 Scores d&apos;affinité (Décision de vote)</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Comparaison question par question avec chaque parti</li>
                        <li><strong>Pondération selon VOS 3 priorités sélectionnées :</strong>
                          <ul className="list-none ml-6 mt-1 space-y-0.5 text-sm">
                            <li>→ 1ère priorité : poids ×2.0</li>
                            <li>→ 2ème priorité : poids ×1.75</li>
                            <li>→ 3ème priorité : poids ×1.5</li>
                          </ul>
                        </li>
                        <li>Les résultats s&apos;adaptent aux enjeux qui comptent le plus pour vous</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Le résultat : <strong>deux perspectives complémentaires</strong> pour un choix éclairé.
                  </p>
                </div>
              </div>
            </Card>

            {/* Les résultats */}
            <Card className="p-6 md:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-fluid-2xl font-bold mb-4 text-foreground">Vos résultats personnalisés</h3>
                  <p className="text-muted-foreground mb-4">
                    À la fin du processus, vous recevez :
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Votre <strong>classement des partis</strong> par ordre d&apos;affinité</li>
                    <li>Votre <strong>position sur la boussole politique</strong> (axe économique/social)</li>
                    <li>Une <strong>analyse détaillée</strong> de vos convergences et divergences</li>
                    <li>Des <strong>liens vers les programmes</strong> des partis qui vous correspondent</li>
                    <li>La possibilité de <strong>partager vos résultats</strong> (anonymement)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Fiabilité et objectivité */}
        <section>
          <AnimatedTitle delay={0.3}>
            <h2 className="text-fluid-3xl font-bold mb-8 md:mb-12 text-eerie-black">Notre engagement</h2>
          </AnimatedTitle>

          <AnimatedGrid staggerDelay={0.15} className="card-grid-two-cols">
            <EngagementCard
              title="🔒 Confidentialité totale"
              description="Vos réponses sont anonymes. Aucune donnée personnelle identifiable n'est collectée sans votre consentement explicite."
            />
            <EngagementCard
              title="⚖️ Neutralité politique"
              description="Notre outil est strictement neutre. Nous ne favorisons aucun parti et présentons toutes les positions de manière équitable."
            />
            <EngagementCard
              title="📊 Données à jour"
              description="Les positions des partis sont extraites de leurs programmes officiels et mises à jour régulièrement."
            />
            <EngagementCard
              title="🎯 Outil d'aide à la décision"
              description="Nos résultats sont une aide à la réflexion, pas une recommandation. La décision finale vous appartient toujours."
            />
          </AnimatedGrid>
        </section>

        {/* Call to action */}
        <AnimatedCTA delay={0.5} className="text-center py-8">
          <h2 className="text-fluid-3xl font-bold mb-6 text-foreground">Prêt à découvrir vos affinités ?</h2>
          <p className="text-fluid-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Le processus complet prend environ 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-fit">
              <Link href="/profil">
                Commencer le questionnaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-fit">
              <Link href="/pourquoi-important">
                Pourquoi c&apos;est important ?
              </Link>
            </Button>
          </div>
        </AnimatedCTA>
      </AnimatedSection>
    </div>
  )
}