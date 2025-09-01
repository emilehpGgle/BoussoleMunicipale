import Link from "next/link"
import { ArrowLeft, Shield, Lock, Server, Eye, Database, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Données protégées | Boussole Municipale Québec",
  description: "Découvrez les mesures de sécurité techniques mises en place pour protéger vos données personnelles sur la Boussole Municipale.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/donnees-protegees"
  }
}

export default function DonneesProtegeesPage() {
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
          Données protégées
        </h1>
        <p className="text-lg text-muted-foreground">
          Votre sécurité et confidentialité sont nos priorités absolues.
        </p>
      </div>

      {/* Vue d'ensemble de la sécurité */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-midnight-green/5 to-midnight-green/10">
        <div className="flex items-start space-x-4">
          <Shield className="w-12 h-12 text-midnight-green mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-3 text-midnight-green">
              Sécurité par conception
            </h2>
            <p className="text-muted-foreground mb-4">
              La Boussole Municipale a été conçue dès le départ avec la protection des données 
              comme priorité fondamentale. Nos mesures de sécurité respectent et dépassent 
              les standards de l&apos;industrie.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-midnight-green">100%</div>
                <div className="text-xs text-muted-foreground">Chiffrement HTTPS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-midnight-green">0</div>
                <div className="text-xs text-muted-foreground">Fuite de données</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-midnight-green">RGPD</div>
                <div className="text-xs text-muted-foreground">Conformité complète</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Mesures de sécurité techniques */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Mesures de sécurité techniques</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chiffrement */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-midnight-green" />
              <h3 className="text-lg font-semibold">Chiffrement de bout en bout</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 mb-4">
              <li><strong>HTTPS/TLS 1.3</strong> : Toutes les communications chiffrées</li>
              <li><strong>Chiffrement AES-256</strong> : Données au repos sécurisées</li>
              <li><strong>Certificats SSL</strong> : Vérification d&apos;identité du serveur</li>
              <li><strong>HSTS</strong> : Protection contre les attaques de rétrogradation</li>
            </ul>
            <Badge variant="outline" className="text-xs">
              🔒 Niveau militaire
            </Badge>
          </Card>

          {/* Infrastructure */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Server className="w-8 h-8 text-midnight-green" />
              <h3 className="text-lg font-semibold">Infrastructure sécurisée</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 mb-4">
              <li><strong>Supabase</strong> : Base de données certifiée SOC 2</li>
              <li><strong>Vercel</strong> : Hébergement avec protection DDoS</li>
              <li><strong>CDN global</strong> : Distribution sécurisée des contenus</li>
              <li><strong>Sauvegarde automatique</strong> : Réplication multi-région</li>
            </ul>
            <Badge variant="outline" className="text-xs">
              ⚡ Haute disponibilité
            </Badge>
          </Card>

          {/* Accès et authentification */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Key className="w-8 h-8 text-midnight-green" />
              <h3 className="text-lg font-semibold">Contrôle d&apos;accès</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 mb-4">
              <li><strong>Sessions chiffrées</strong> : Tokens JWT sécurisés</li>
              <li><strong>Expiration automatique</strong> : Sessions à durée limitée</li>
              <li><strong>Principe du moindre privilège</strong> : Accès minimal nécessaire</li>
              <li><strong>Audit des accès</strong> : Journalisation complète</li>
            </ul>
            <Badge variant="outline" className="text-xs">
              🔑 Accès contrôlé
            </Badge>
          </Card>

          {/* Protection des données */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-midnight-green" />
              <h3 className="text-lg font-semibold">Protection des données</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 mb-4">
              <li><strong>Anonymisation</strong> : Aucune donnée personnelle par défaut</li>
              <li><strong>Pseudonymisation</strong> : Identifiants non-réversibles</li>
              <li><strong>Chiffrement des champs</strong> : Données sensibles protégées</li>
              <li><strong>Purge automatique</strong> : Suppression programmée</li>
            </ul>
            <Badge variant="outline" className="text-xs">
              🛡️ Privacy by design
            </Badge>
          </Card>
        </div>
      </section>

      {/* Conformité et certifications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Conformité et standards</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-midnight-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-midnight-green" />
            </div>
            <h3 className="font-semibold mb-2">RGPD/GDPR</h3>
            <p className="text-sm text-muted-foreground">
              Conformité complète au Règlement Général sur la Protection des Données
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-midnight-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-midnight-green" />
            </div>
            <h3 className="font-semibold mb-2">PIPEDA</h3>
            <p className="text-sm text-muted-foreground">
              Respect de la Loi sur la protection des renseignements personnels du Canada
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-midnight-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-midnight-green" />
            </div>
            <h3 className="font-semibold mb-2">Loi 25</h3>
            <p className="text-sm text-muted-foreground">
              Conformité à la Loi modernisant des dispositions du Québec
            </p>
          </Card>
        </div>
      </section>

      {/* Vos droits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Vos droits sur vos données</h2>
        
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-midnight-green">Droits garantis</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><strong>Droit d&apos;accès</strong> : Consulter toutes vos données</li>
                <li><strong>Droit de rectification</strong> : Corriger vos informations</li>
                <li><strong>Droit à l&apos;effacement</strong> : Supprimer vos données</li>
                <li><strong>Droit à la portabilité</strong> : Récupérer vos données</li>
                <li><strong>Droit d&apos;opposition</strong> : Refuser certains traitements</li>
                <li><strong>Droit de retrait</strong> : Annuler vos consentements</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-midnight-green">Exercer vos droits</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Vous pouvez exercer ces droits à tout moment, gratuitement et sans justification.
              </p>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Link href="/profil" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Gérer mes données
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Contacter le délégué
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Transparence */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Transparence totale</h2>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nos engagements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-midnight-green">✅ Ce que nous faisons</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Chiffrement de toutes vos données</li>
                <li>• Anonymisation par défaut</li>
                <li>• Audits de sécurité réguliers</li>
                <li>• Suppression automatique des sessions</li>
                <li>• Notifications en cas d&apos;incident</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">❌ Ce que nous ne faisons jamais</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vendre vos données sans consentement</li>
                <li>• Partager avec des tiers malveillants</li>
                <li>• Utiliser des cookies de tracking</li>
                <li>• Conserver des données inutilement</li>
                <li>• Accéder à vos données sans raison</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Contact sécurité */}
      <Card className="p-6 text-center bg-midnight-green/5">
        <h3 className="text-lg font-semibold mb-2">Questions de sécurité ?</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Vous avez identifié une vulnérabilité ou avez des questions sur nos pratiques de sécurité ?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild variant="default" className="w-fit">
            <Link href="mailto:security@boussolemunicipale.com">
              <Shield className="mr-2 h-4 w-4" />
              Signaler une vulnérabilité
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/confidentialite">
              Politique de confidentialité
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}