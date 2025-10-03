import Link from "next/link"
import { ArrowLeft, ShieldCheck, Lock, UserCheck, Eye, Bell, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/breadcrumbs"
import { AnimatedSection, AnimatedTitle } from "@/components/ui/animated-wrappers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Boussole Électorale Municipale Québec",
  description: "Politique de confidentialité de la Boussole Électorale Municipale. Protection des données personnelles et informations de collecte pour les élections municipales de Québec 2025.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://boussolemunicipale.com/confidentialite"
  }
}

export default function ConfidentialitePage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <AnimatedTitle>
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6 w-fit hover:bg-midnight-green/5">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-10 h-10 text-midnight-green" />
              <h1 className="text-4xl lg:text-5xl font-black text-foreground">
                Politique de confidentialité
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Dernière mise à jour : 2 octobre 2025
            </p>
          </div>
        </div>
      </AnimatedTitle>

      <div className="space-y-8">

        <AnimatedSection delay={0.1}>
          <Card className="bg-azure-web/30 border-l-4 border-l-midnight-green shadow-sm">
            <CardContent className="pt-6">
              <p className="text-base font-semibold mb-2 text-foreground">
                La Boussole Municipale s&apos;engage à protéger votre vie privée.
              </p>
              <p className="text-muted-foreground">
                Cette politique explique de manière transparente comment nous collectons, utilisons et protégeons vos données personnelles.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 1 : Collecte d'informations */}
        <AnimatedSection delay={0.2}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Eye className="w-6 h-6 text-midnight-green" />
                1. Informations que nous collectons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-midnight-green/5 border-l-4 border-l-midnight-green">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-midnight-green text-white">OBLIGATOIRE</Badge>
                    <h3 className="font-semibold text-foreground">📊 Données anonymisées</h3>
                  </div>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li><strong>Vos réponses au questionnaire</strong> : Nécessaires pour calculer vos affinités politiques</li>
                    <li><strong>Google Analytics avec IP anonymisée</strong> : Pour améliorer notre service</li>
                    <li><strong>Données techniques</strong> : Type d&apos;appareil, navigateur, durée de session</li>
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    Ces données sont essentielles au fonctionnement du service et ne permettent pas de vous identifier personnellement.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-isabelline/30 border-l-4 border-l-midnight-green/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-midnight-green text-midnight-green">OPTIONNEL</Badge>
                    <h3 className="font-semibold text-foreground">📧 Données personnelles</h3>
                  </div>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li><strong>Adresse courriel</strong> : Uniquement si vous choisissez de recevoir vos résultats et des communications ciblées</li>
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    Vous gardez le contrôle total sur cette information et pouvez retirer votre consentement à tout moment.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 2 : Niveaux de consentement */}
        <AnimatedSection delay={0.3}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <UserCheck className="w-6 h-6 text-midnight-green" />
                2. Vos choix de consentement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-muted/50 border border-midnight-green/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-eerie-black text-white">OBLIGATOIRE</Badge>
                    <h3 className="text-lg font-semibold text-foreground">Collecte anonyme et analytics</h3>
                  </div>
                  <p className="mb-3 text-muted-foreground">
                    Pour utiliser la Boussole Municipale, vous devez accepter la collecte anonymisée de vos données de navigation et réponses à des fins d&apos;analyse statistique et d&apos;amélioration du service.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>✓ Vos réponses sont anonymisées</p>
                    <p>✓ Google Analytics avec IP anonymisée</p>
                    <p>✓ Conservation : 2 ans maximum</p>
                    <p>✓ Aucune identification personnelle</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-isabelline/40 border-2 border-midnight-green/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-midnight-green text-midnight-green">OPTIONNEL</Badge>
                    <h3 className="text-lg font-semibold text-foreground">Résultats personnalisés et communications ciblées</h3>
                  </div>
                  <p className="mb-3 font-medium text-foreground">
                    En fournissant votre adresse courriel, vous consentez à recevoir :
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">✓</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Votre rapport politique personnalisé permanent</strong> : Accès à vos résultats détaillés</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">✓</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Communications de vos 3 partis les mieux classés</strong> : Les partis alignés avec votre profil (top 1, 2 et 3) peuvent vous contacter</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">✓</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Actualités municipales ciblées</strong> : Informations adaptées à vos intérêts et résultats</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">✓</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Analyses exclusives</strong> : Contenu premium basé sur vos priorités politiques</p>
                    </div>
                  </div>

                  <Card className="bg-white border border-midnight-green/30">
                    <CardContent className="pt-4">
                      <p className="text-sm font-semibold text-foreground mb-1">🔄 Échange transparent</p>
                      <p className="text-xs text-muted-foreground">
                        Nous partageons vos données (email, résultats, profil anonymisé) avec des partenaires politiques et médiatiques pertinents pour vous offrir des communications ciblées de qualité.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 3 : Qui peut vous contacter */}
        <AnimatedSection delay={0.4}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Bell className="w-6 h-6 text-midnight-green" />
                3. Qui peut vous contacter ?
              </CardTitle>
              <CardDescription className="text-base">
                Si vous consentez à recevoir des communications, les entités suivantes peuvent vous contacter :
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <Card className="bg-midnight-green/5 border border-midnight-green/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                      <span>🏛️</span> Partis politiques
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Uniquement vos <strong className="text-foreground">3 meilleurs matchs</strong> (top 1, 2 et 3 dans votre classement d&apos;affinités)
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-azure-web/30 border border-midnight-green/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                      <span>📰</span> Médias
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Médias spécialisés en politique municipale et journalisme d&apos;enquête local
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-isabelline/30 border border-midnight-green/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-midnight-green mb-2 flex items-center gap-2">
                      <span>🤝</span> Organisations
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Organisations civiques et services municipaux pertinents à vos priorités
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Tous nos partenaires sont soigneusement sélectionnés pour garantir la pertinence et la qualité des communications.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 4 : Utilisation des données */}
        <AnimatedSection delay={0.5}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-midnight-green" />
                4. Comment nous utilisons vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">Utilisations principales</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                  <li>Calculer vos affinités politiques municipales</li>
                  <li>Générer vos résultats personnalisés</li>
                  <li>Améliorer notre algorithme et notre service</li>
                  <li>Produire des statistiques anonymisées sur les tendances politiques</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-midnight-green">Avec votre consentement explicite (email fourni)</h3>
                <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                  <li>Vous envoyer votre rapport politique personnalisé</li>
                  <li>Partager votre profil avec vos 3 partis les mieux classés</li>
                  <li>Vous transmettre des actualités et analyses ciblées</li>
                  <li>Permettre à nos partenaires sélectionnés de vous contacter</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 5 : Protection et sécurité */}
        <AnimatedSection delay={0.6}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="w-6 h-6 text-midnight-green" />
                5. Protection et sécurité de vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-midnight-green/5 border-l-4 border-l-midnight-green">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span>🔒</span> Mesures de sécurité
                  </h3>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground text-sm">
                    <li><strong className="text-foreground">Chiffrement HTTPS/TLS</strong> pour toutes les communications</li>
                    <li><strong className="text-foreground">Chiffrement AES-256</strong> pour le stockage des données</li>
                    <li><strong className="text-foreground">Hébergement sécurisé</strong> chez Supabase (certifié SOC 2)</li>
                    <li><strong className="text-foreground">Accès restreint</strong> avec authentification à deux facteurs</li>
                    <li><strong className="text-foreground">Audits de sécurité réguliers</strong></li>
                    <li><strong className="text-foreground">Conformité Loi 25</strong> (Québec) et RGPD (Europe)</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-muted-foreground">
                <p className="mb-2">
                  <strong className="text-foreground">Conservation des données :</strong> 2 ans maximum après votre dernière utilisation
                </p>
                <p>
                  Pour plus de détails techniques, consultez notre page <Link href="/donnees-protegees" className="text-midnight-green hover:underline font-medium">Données protégées</Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 6 : Vos droits */}
        <AnimatedSection delay={0.7}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <UserCheck className="w-6 h-6 text-midnight-green" />
                6. Vos droits
              </CardTitle>
              <CardDescription className="text-base">
                Conformément aux lois sur la protection des données (Loi 25, RGPD, PIPEDA), vous disposez des droits suivants :
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit d&apos;accès</h4>
                      <p className="text-xs text-muted-foreground">Consulter toutes vos données</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit de rectification</h4>
                      <p className="text-xs text-muted-foreground">Corriger des informations erronées</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit à l&apos;effacement</h4>
                      <p className="text-xs text-muted-foreground">Supprimer définitivement vos données</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit de portabilité</h4>
                      <p className="text-xs text-muted-foreground">Récupérer vos données dans un format lisible</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit d&apos;opposition</h4>
                      <p className="text-xs text-muted-foreground">Refuser certains traitements</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit de retrait</h4>
                      <p className="text-xs text-muted-foreground">Annuler vos consentements à tout moment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit de limitation</h4>
                      <p className="text-xs text-muted-foreground">Restreindre l&apos;utilisation de vos données</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-midnight-green font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Droit de réclamation</h4>
                      <p className="text-xs text-muted-foreground">Déposer une plainte auprès d&apos;une autorité</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="sm" className="bg-midnight-green hover:bg-midnight-green/90">
                  <Link href="/preferences">Gérer mes préférences</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-midnight-green text-midnight-green hover:bg-midnight-green/5">
                  <Link href="/contact">Exercer mes droits</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 7 : Cookies */}
        <AnimatedSection delay={0.8}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-midnight-green" />
                7. Cookies et technologies de suivi
              </CardTitle>
              <CardDescription className="text-base">
                Nous utilisons des cookies pour améliorer votre expérience :
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Cookies essentiels</strong> : Maintenir votre session et progression dans le questionnaire</li>
                <li><strong className="text-foreground">Cookies de préférence</strong> : Sauvegarder vos paramètres d&apos;affichage</li>
                <li><strong className="text-foreground">Cookies analytiques</strong> : Google Analytics avec IP anonymisée (obligatoire)</li>
              </ul>

              <p className="text-sm text-muted-foreground">
                Pour plus d&apos;informations, consultez notre <Link href="/cookies" className="text-midnight-green hover:underline font-medium">politique de cookies</Link>.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 8 : Retrait du consentement */}
        <AnimatedSection delay={0.9}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <UserCheck className="w-6 h-6 text-midnight-green" />
                8. Comment retirer votre consentement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="bg-isabelline/30 border border-midnight-green/30">
                <CardContent className="pt-6">
                  <p className="mb-4 font-semibold text-foreground">
                    Vous pouvez retirer votre consentement à tout moment, facilement et gratuitement :
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">→</span>
                      <p><strong className="text-foreground">En ligne</strong> : Via votre <Link href="/preferences" className="text-midnight-green hover:underline font-medium">page de préférences</Link></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">→</span>
                      <p><strong className="text-foreground">Par email</strong> : Lien de désinscription dans chaque communication</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-midnight-green">→</span>
                      <p><strong className="text-foreground">Par contact direct</strong> : privacy@boussolemunicipale.com</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    <strong className="text-foreground">Délai de traitement :</strong> Votre retrait est effectif immédiatement. Vous ne recevrez plus aucune communication de notre part ni de nos partenaires.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 9 : Contact */}
        <AnimatedSection delay={1.0}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Bell className="w-6 h-6 text-midnight-green" />
                9. Contact et questions
              </CardTitle>
              <CardDescription className="text-base">
                Pour toute question concernant cette politique ou pour exercer vos droits :
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-muted/50 border border-midnight-green/20">
                <CardContent className="pt-6 space-y-2 text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Email principal :</span>{' '}
                    <a href="mailto:contact@boussolemunicipale.com" className="text-midnight-green hover:underline font-medium">
                      contact@boussolemunicipale.com
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Protection des données :</span>{' '}
                    <a href="mailto:privacy@boussolemunicipale.com" className="text-midnight-green hover:underline font-medium">
                      privacy@boussolemunicipale.com
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Formulaire de contact :</span>{' '}
                    <Link href="/contact" className="text-midnight-green hover:underline font-medium">
                      Page de contact
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-azure-web/30 border border-midnight-green/20">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Délai de réponse :</strong> Nous nous engageons à répondre dans les 30 jours suivant votre demande.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Section 10 : Modifications */}
        <AnimatedSection delay={1.1}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-midnight-green" />
                10. Modifications de cette politique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground space-y-3">
                <p>
                  Cette politique peut être mise à jour pour refléter les changements dans nos pratiques ou la législation.
                </p>

                <p>
                  Les modifications importantes vous seront notifiées par courriel (si vous nous avez fourni votre adresse)
                  ou par un avis visible sur notre site web au moins <strong className="text-foreground">30 jours à l&apos;avance</strong>.
                </p>
              </div>

              <Card className="bg-midnight-green/5 border-l-4 border-l-midnight-green">
                <CardContent className="pt-4">
                  <p className="text-sm text-foreground">
                    <strong>Dernière mise à jour :</strong> 2 octobre 2025
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Version 2.0 - Simplification du système de consentement
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </AnimatedSection>

      </div>
    </div>
  )
}
