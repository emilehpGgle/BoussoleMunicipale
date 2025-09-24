import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Cookie, BarChart3, Database, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de Cookies | Boussole Municipale",
  description: "Documentation complète sur l'utilisation des cookies et technologies similaires par la Boussole Municipale. Conformité RGPD et Loi 25.",
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://boussolemunicipale.com/cookies"
  }
}

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: <Shield className="w-5 h-5" />,
      name: "Cookies Essentiels",
      required: true,
      purpose: "Fonctionnement de base du service",
      cookies: [
        {
          name: "sb-cnvlxsstxnrnijifnqnz-auth-token",
          provider: "Supabase",
          purpose: "Authentification utilisateur et gestion des sessions",
          duration: "1 an",
          type: "Technique"
        }
      ]
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      name: "Cookies Analytiques",
      required: true,
      purpose: "Amélioration du service et analyse d'usage",
      cookies: [
        {
          name: "_ga, _ga_*",
          provider: "Google Analytics",
          purpose: "Analyse du comportement des visiteurs (IP anonymisée)",
          duration: "2 ans",
          type: "Analytique"
        },
        {
          name: "boussole-municipale-consent",
          provider: "Local",
          purpose: "Mémorisation de vos préférences de consentement",
          duration: "2 ans",
          type: "Technique"
        }
      ]
    },
    {
      icon: <Cookie className="w-5 h-5" />,
      name: "Cookies Marketing",
      required: false,
      purpose: "Communications personnalisées et partenariats",
      cookies: [
        {
          name: "Cookies réseaux sociaux",
          provider: "Facebook, LinkedIn, Twitter",
          purpose: "Boutons de partage et intégrations sociales",
          duration: "Variable",
          type: "Marketing"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-azure-web/20 to-midnight-green/10">
      <div className="container mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 p-3 bg-midnight-green/10 rounded-full mb-4">
              <Cookie className="w-8 h-8 text-midnight-green" />
            </div>
            <h1 className="text-4xl font-bold text-midnight-green mb-4">
              Politique de Cookies
            </h1>
            <p className="text-lg text-midnight-green/80 max-w-2xl mx-auto">
              Transparence complète sur l&apos;utilisation des cookies et technologies similaires
              par la Boussole Municipale.
            </p>
          </div>

          {/* Résumé rapide */}
          <Card className="mb-8 border-midnight-green/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-midnight-green" />
                En résumé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">3</div>
                  <div className="text-sm text-green-600">Types de cookies</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">2 ans</div>
                  <div className="text-sm text-blue-600">Durée maximale</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">100%</div>
                  <div className="text-sm text-purple-600">Conformité Loi 25</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Nous utilisons uniquement les cookies nécessaires au fonctionnement du service
                et à l&apos;amélioration de votre expérience. Aucune donnée personnelle n&apos;est
                transmise à des tiers sans votre consentement explicite.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Types de cookies */}
        <div className="max-w-4xl mx-auto space-y-8">
          {cookieTypes.map((category, index) => (
            <Card key={index} className="border-midnight-green/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </div>
                  <Badge variant={category.required ? "default" : "secondary"}>
                    {category.required ? "Obligatoire" : "Optionnel"}
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">{category.purpose}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.cookies.map((cookie, cookieIndex) => (
                    <div
                      key={cookieIndex}
                      className="p-4 border rounded-lg bg-gray-50/50"
                    >
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="font-medium text-sm mb-1">Cookie</div>
                          <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {cookie.name}
                          </code>
                        </div>
                        <div>
                          <div className="font-medium text-sm mb-1">Fournisseur</div>
                          <div className="text-sm text-muted-foreground">
                            {cookie.provider}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm mb-1">Durée</div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3" />
                            {cookie.duration}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm mb-1">Type</div>
                          <Badge variant="outline">{cookie.type}</Badge>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="font-medium text-sm mb-1">Finalité</div>
                        <p className="text-sm text-muted-foreground">
                          {cookie.purpose}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gestion des cookies */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="border-midnight-green/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-midnight-green" />
                Gestion de vos préférences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Modifier vos préférences</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Vous pouvez modifier vos préférences de cookies à tout moment :
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Via votre <Link href="/preferences" className="text-midnight-green hover:underline">compte utilisateur</Link></li>
                    <li>• En supprimant les cookies de votre navigateur</li>
                    <li>• En nous contactant directement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vos droits</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Conformément à la Loi 25, vous disposez des droits suivants :
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Retrait du consentement en un clic</li>
                    <li>• Accès à vos données stockées</li>
                    <li>• Suppression complète de votre profil</li>
                    <li>• Portabilité de vos données</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-midnight-green/5 rounded-lg">
                <h4 className="font-semibold mb-2 text-midnight-green">Contact & Questions</h4>
                <p className="text-sm">
                  Pour toute question concernant notre utilisation des cookies ou pour exercer vos droits :
                  <br />
                  📧 <strong>support@boussolemunicipale.com</strong>
                  <br />
                  📄 Consultez notre <Link href="/confidentialite" className="text-midnight-green hover:underline">politique de confidentialité complète</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}
            <br />
            Cette politique est conforme au RGPD européen et à la Loi 25 du Québec.
          </p>
        </div>
      </div>
    </div>
  )
}