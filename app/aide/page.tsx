import Link from "next/link"
import { ArrowLeft, HelpCircle, Users, Share2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AidePage() {
  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Aide et Questions fréquentes
        </h1>
        <p className="text-muted-foreground">
          Trouvez des réponses aux questions les plus courantes sur la Boussole Municipale.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Comment fonctionne la Boussole Municipale ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              La Boussole Municipale compare vos réponses à 20 questions avec les positions 
              officielles des partis politiques municipaux de Québec. Un algorithme calcule 
              votre pourcentage d&apos;affinité avec chaque parti en fonction de vos réponses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Les résultats sont-ils fiables ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Les positions des partis sont basées sur leurs programmes officiels, déclarations 
              publiques et sites web. Cependant, cet outil est informatif et ne remplace pas 
              une recherche approfondie sur les candidats et leurs plateformes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Mes données sont-elles protégées ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Oui, vos données sont stockées de manière sécurisée et ne sont jamais partagées 
              avec des tiers. Vous pouvez consulter notre politique de confidentialité pour 
              plus de détails.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Comment partager mes résultats ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Depuis la page de résultats, cliquez sur &quot;Partager&quot; pour générer un lien unique 
              vers vos résultats. Vous pouvez le partager sur les réseaux sociaux ou vous 
              l&apos;envoyer par email.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions techniques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-1">Le site ne fonctionne pas correctement</h4>
              <p className="text-sm text-muted-foreground">
                Essayez de vider le cache de votre navigateur ou d&apos;utiliser un autre navigateur. 
                Le site fonctionne mieux sur Chrome, Firefox et Safari récents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Mes réponses ne se sauvegardent pas</h4>
              <p className="text-sm text-muted-foreground">
                Assurez-vous que les cookies sont activés dans votre navigateur. 
                Les données sont sauvegardées automatiquement pendant que vous répondez.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Problème d&apos;affichage sur mobile</h4>
              <p className="text-sm text-muted-foreground">
                Le site est optimisé pour tous les appareils. Si vous rencontrez des problèmes, 
                essayez de recharger la page ou de passer en mode paysage sur tablette.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Besoin d&apos;aide supplémentaire ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Si vous ne trouvez pas la réponse à votre question, consultez la page 
              <Link href="/a-propos" className="text-primary hover:underline">À Propos</Link> 
              pour plus d&apos;informations sur le projet et les contacts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 