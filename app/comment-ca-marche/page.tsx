import Link from "next/link"
import { ArrowLeft, CheckCircle, Users, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Comment ça marche
        </h1>
        <p className="text-lg text-muted-foreground">
          Découvrez votre compatibilité politique municipale en 4 étapes simples.
        </p>
      </div>

      {/* Processus en étapes */}
      <div className="space-y-8 mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Étape 1 */}
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-midnight-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold mb-2">Profil</h3>
            <p className="text-sm text-muted-foreground">
              Créez votre profil anonyme avec quelques informations démographiques
            </p>
          </Card>

          {/* Étape 2 */}
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-midnight-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold mb-2">Questionnaire</h3>
            <p className="text-sm text-muted-foreground">
              Répondez à 21 questions sur les enjeux municipaux importants
            </p>
          </Card>

          {/* Étape 3 */}
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-midnight-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold mb-2">Analyse</h3>
            <p className="text-sm text-muted-foreground">
              Nos algorithmes calculent vos affinités avec chaque parti politique
            </p>
          </Card>

          {/* Étape 4 */}
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-midnight-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 className="font-semibold mb-2">Résultats</h3>
            <p className="text-sm text-muted-foreground">
              Obtenez votre boussole politique et vos matches avec les partis
            </p>
          </Card>
        </div>
      </div>

      {/* Fonctionnement détaillé */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Fonctionnement détaillé</h2>
          
          <div className="space-y-6">
            {/* Le questionnaire */}
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Le questionnaire municipal</h3>
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
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <BarChart3 className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">L&apos;analyse scientifique</h3>
                  <p className="text-muted-foreground mb-4">
                    Nos algorithmes analysent vos réponses selon plusieurs dimensions :
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li><strong>Compatibilité par enjeu</strong> : comparaison directe avec les positions des partis</li>
                    <li><strong>Pondération d&apos;importance</strong> : vos priorités influencent le calcul</li>
                    <li><strong>Position politique globale</strong> : votre place sur la boussole économique/sociale</li>
                    <li><strong>Distance idéologique</strong> : proximité avec chaque formation politique</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Le résultat : un pourcentage d&apos;affinité précis avec chaque parti municipal.
                  </p>
                </div>
              </div>
            </Card>

            {/* Les résultats */}
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-midnight-green mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Vos résultats personnalisés</h3>
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
          <h2 className="text-2xl font-bold mb-6">Notre engagement</h2>
          
          <Card className="p-6 bg-midnight-green/5">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">
                  🔒 Confidentialité totale
                </h3>
                <p className="text-muted-foreground text-sm">
                  Vos réponses sont anonymes. Aucune donnée personnelle identifiable 
                  n&apos;est collectée sans votre consentement explicite.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">
                  ⚖️ Neutralité politique
                </h3>
                <p className="text-muted-foreground text-sm">
                  Notre outil est strictement neutre. Nous ne favorisons aucun parti 
                  et présentons toutes les positions de manière équitable.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">
                  📊 Données à jour
                </h3>
                <p className="text-muted-foreground text-sm">
                  Les positions des partis sont extraites de leurs programmes officiels 
                  et mises à jour régulièrement.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">
                  🎯 Outil d&apos;aide à la décision
                </h3>
                <p className="text-muted-foreground text-sm">
                  Nos résultats sont une aide à la réflexion, pas une recommandation. 
                  La décision finale vous appartient toujours.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Call to action */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Prêt à découvrir vos affinités ?</h2>
          <p className="text-muted-foreground mb-6">
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
        </section>
      </div>
    </div>
  )
}