import Link from "next/link"
import { ArrowLeft, Target, Users, Code, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AProposPage() {
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
          À Propos de la Boussole Municipale
        </h1>
        <p className="text-muted-foreground text-lg">
          Un outil citoyen pour mieux comprendre le paysage politique municipal de Québec.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Notre Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              La Boussole Municipale a été créée pour aider les citoyens de Québec à mieux 
              comprendre les enjeux municipaux et à identifier leurs affinités avec les différents 
              partis politiques. Notre objectif est de promouvoir une participation citoyenne 
              éclairée aux élections municipales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Comment ça fonctionne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-1">Questionnaire ciblé</h4>
              <p className="text-sm text-muted-foreground">
                20 questions sur les enjeux municipaux clés : transport, logement, environnement, 
                développement économique et plus.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Positions des partis</h4>
              <p className="text-sm text-muted-foreground">
                Les positions sont recherchées et compilées à partir des programmes officiels, 
                déclarations publiques et sites web des partis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Calcul des affinités</h4>
              <p className="text-sm text-muted-foreground">
                Un algorithme compare vos réponses avec les positions des partis pour calculer 
                votre pourcentage d'affinité avec chacun.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enjeux couverts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Transport et mobilité</h4>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Projet de tramway</li>
                  <li>• Pistes cyclables</li>
                  <li>• Troisième lien</li>
                  <li>• Transport en commun</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Logement</h4>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Logement abordable</li>
                  <li>• Densification</li>
                  <li>• Airbnb</li>
                  <li>• Zonage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Environnement</h4>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Espaces verts</li>
                  <li>• Transition carboneutre</li>
                  <li>• Gestion des déchets</li>
                  <li>• Développement durable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Économie et gouvernance</h4>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Fiscalité municipale</li>
                  <li>• Dette publique</li>
                  <li>• Développement économique</li>
                  <li>• Démocratie participative</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Transparence et neutralité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-3">
              Cet outil est développé de manière indépendante et ne favorise aucun parti politique. 
              Nous nous efforçons de présenter les positions de chaque parti de manière équitable 
              et factuelle.
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Sources</h4>
                <p className="text-muted-foreground">
                  Programmes officiels, sites web des partis, déclarations publiques, 
                  couverture médiatique vérifiée.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Mise à jour</h4>
                <p className="text-muted-foreground">
                  Les informations sont régulièrement mises à jour pour refléter l'évolution 
                  des positions des partis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-amber-800 mb-2">Avertissement</p>
              <p className="text-amber-700 mb-2">
                La Boussole Municipale est un outil informatif qui ne remplace pas une recherche 
                personnelle approfondie sur les candidats et leurs programmes.
              </p>
              <ul className="text-amber-700 space-y-1 text-xs">
                <li>• Les positions peuvent évoluer pendant la campagne</li>
                <li>• Certaines nuances ne peuvent être capturées dans un questionnaire</li>
                <li>• Les candidats individuels peuvent avoir des positions différentes de leur parti</li>
                <li>• Cet outil ne constitue pas une recommandation de vote</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact et feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Nous accueillons vos commentaires, suggestions et corrections. Si vous remarquez 
              une erreur dans les positions des partis ou si vous avez des suggestions 
              d'amélioration, n'hésitez pas à nous en faire part.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Ce projet est open source et développé par des bénévoles passionnés de démocratie 
                locale et de technologie civique.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 