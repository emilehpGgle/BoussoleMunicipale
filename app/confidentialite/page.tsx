import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Politique de confidentialité
        </h1>
        <p className="text-muted-foreground">
          Dernière mise à jour : 2 octobre 2025
        </p>
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">

        <section className="p-4 bg-midnight-green/5 border-l-4 border-midnight-green rounded">
          <p className="text-base font-semibold mb-2">
            La Boussole Municipale s&apos;engage à protéger votre vie privée.
          </p>
          <p>
            Cette politique explique de manière transparente comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
        </section>

        {/* Section 1 : Collecte d'informations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Informations que nous collectons</h2>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Données anonymisées (Obligatoire)</h3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-blue-800">
                <li><strong>Vos réponses au questionnaire</strong> : Nécessaires pour calculer vos affinités politiques</li>
                <li><strong>Google Analytics avec IP anonymisée</strong> : Pour améliorer notre service</li>
                <li><strong>Données techniques</strong> : Type d&apos;appareil, navigateur, durée de session</li>
              </ul>
              <p className="mt-2 text-xs text-blue-700 italic">
                Ces données sont essentielles au fonctionnement du service et ne permettent pas de vous identifier personnellement.
              </p>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
              <h3 className="font-semibold text-amber-900 mb-2">📧 Données personnelles (Optionnel)</h3>
              <ul className="list-disc list-inside ml-2 space-y-1 text-amber-800">
                <li><strong>Adresse courriel</strong> : Uniquement si vous choisissez de recevoir vos résultats et des communications ciblées</li>
              </ul>
              <p className="mt-2 text-xs text-amber-700 italic">
                Vous gardez le contrôle total sur cette information et pouvez retirer votre consentement à tout moment.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 : Niveaux de consentement */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Vos choix de consentement</h2>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 border border-slate-300 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded font-medium">OBLIGATOIRE</span>
                <h3 className="text-lg font-semibold">Collecte anonyme et analytics</h3>
              </div>
              <p className="mb-3">
                Pour utiliser la Boussole Municipale, vous devez accepter la collecte anonymisée de vos données de navigation et réponses à des fins d&apos;analyse statistique et d&apos;amélioration du service.
              </p>
              <div className="text-xs text-slate-600 space-y-1">
                <p>✓ Vos réponses sont anonymisées</p>
                <p>✓ Google Analytics avec IP anonymisée</p>
                <p>✓ Conservation : 2 ans maximum</p>
                <p>✓ Aucune identification personnelle</p>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded font-medium">OPTIONNEL</span>
                <h3 className="text-lg font-semibold">Résultats personnalisés et communications ciblées</h3>
              </div>
              <p className="mb-3 font-medium">
                En fournissant votre adresse courriel, vous consentez à recevoir :
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">✓</span>
                  <p><strong>Votre rapport politique personnalisé permanent</strong> : Accès à vos résultats détaillés</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">✓</span>
                  <p><strong>Communications de vos 3 partis les mieux classés</strong> : Les partis alignés avec votre profil (top 1, 2 et 3) peuvent vous contacter</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">✓</span>
                  <p><strong>Actualités municipales ciblées</strong> : Informations adaptées à vos intérêts et résultats</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">✓</span>
                  <p><strong>Analyses exclusives</strong> : Contenu premium basé sur vos priorités politiques</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-amber-300 rounded">
                <p className="text-sm font-semibold text-amber-900 mb-1">🔄 Échange transparent</p>
                <p className="text-xs text-amber-800">
                  Nous partageons vos données (email, résultats, profil anonymisé) avec des partenaires politiques et médiatiques pertinents pour vous offrir des communications ciblées de qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Qui peut vous contacter */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Qui peut vous contacter ?</h2>

          <p className="mb-4">
            Si vous consentez à recevoir des communications, les entités suivantes peuvent vous contacter :
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-midnight-green/5 border border-midnight-green/20 rounded">
              <h3 className="font-semibold text-midnight-green mb-2">🏛️ Partis politiques</h3>
              <p className="text-xs">
                Uniquement vos <strong>3 meilleurs matchs</strong> (top 1, 2 et 3 dans votre classement d&apos;affinités)
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-semibold text-blue-700 mb-2">📰 Médias</h3>
              <p className="text-xs">
                Médias spécialisés en politique municipale et journalisme d&apos;enquête local
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-semibold text-green-700 mb-2">🤝 Organisations</h3>
              <p className="text-xs">
                Organisations civiques et services municipaux pertinents à vos priorités
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground italic">
            Tous nos partenaires sont soigneusement sélectionnés pour garantir la pertinence et la qualité des communications.
          </p>
        </section>

        {/* Section 4 : Utilisation des données */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Comment nous utilisons vos données</h2>

          <h3 className="text-lg font-semibold mb-2 text-midnight-green">Utilisations principales</h3>
          <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
            <li>Calculer vos affinités politiques municipales</li>
            <li>Générer vos résultats personnalisés</li>
            <li>Améliorer notre algorithme et notre service</li>
            <li>Produire des statistiques anonymisées sur les tendances politiques</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2 text-midnight-green">Avec votre consentement explicite (email fourni)</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Vous envoyer votre rapport politique personnalisé</li>
            <li>Partager votre profil avec vos 3 partis les mieux classés</li>
            <li>Vous transmettre des actualités et analyses ciblées</li>
            <li>Permettre à nos partenaires sélectionnés de vous contacter</li>
          </ul>
        </section>

        {/* Section 5 : Protection et sécurité */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Protection et sécurité de vos données</h2>

          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded mb-4">
            <h3 className="font-semibold text-green-900 mb-2">🔒 Mesures de sécurité</h3>
            <ul className="list-disc list-inside ml-2 space-y-1 text-green-800 text-sm">
              <li><strong>Chiffrement HTTPS/TLS</strong> pour toutes les communications</li>
              <li><strong>Chiffrement AES-256</strong> pour le stockage des données</li>
              <li><strong>Hébergement sécurisé</strong> chez Supabase (certifié SOC 2)</li>
              <li><strong>Accès restreint</strong> avec authentification à deux facteurs</li>
              <li><strong>Audits de sécurité réguliers</strong></li>
              <li><strong>Conformité Loi 25</strong> (Québec) et RGPD (Europe)</li>
            </ul>
          </div>

          <p className="mb-2">
            <strong>Conservation des données :</strong> 2 ans maximum après votre dernière utilisation
          </p>
          <p>
            Pour plus de détails techniques, consultez notre page <Link href="/donnees-protegees" className="text-midnight-green hover:underline">Données protégées</Link>.
          </p>
        </section>

        {/* Section 6 : Vos droits */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Vos droits</h2>

          <p className="mb-4">
            Conformément aux lois sur la protection des données (Loi 25, RGPD, PIPEDA), vous disposez des droits suivants :
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit d&apos;accès</h4>
                  <p className="text-xs text-muted-foreground">Consulter toutes vos données</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit de rectification</h4>
                  <p className="text-xs text-muted-foreground">Corriger des informations erronées</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit à l&apos;effacement</h4>
                  <p className="text-xs text-muted-foreground">Supprimer définitivement vos données</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit de portabilité</h4>
                  <p className="text-xs text-muted-foreground">Récupérer vos données dans un format lisible</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit d&apos;opposition</h4>
                  <p className="text-xs text-muted-foreground">Refuser certains traitements</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit de retrait</h4>
                  <p className="text-xs text-muted-foreground">Annuler vos consentements à tout moment</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit de limitation</h4>
                  <p className="text-xs text-muted-foreground">Restreindre l&apos;utilisation de vos données</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-midnight-green font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Droit de réclamation</h4>
                  <p className="text-xs text-muted-foreground">Déposer une plainte auprès d&apos;une autorité</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="sm">
              <Link href="/preferences">Gérer mes préférences</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Exercer mes droits</Link>
            </Button>
          </div>
        </section>

        {/* Section 7 : Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Cookies et technologies de suivi</h2>

          <p className="mb-3">
            Nous utilisons des cookies pour améliorer votre expérience :
          </p>

          <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
            <li><strong>Cookies essentiels</strong> : Maintenir votre session et progression dans le questionnaire</li>
            <li><strong>Cookies de préférence</strong> : Sauvegarder vos paramètres d&apos;affichage</li>
            <li><strong>Cookies analytiques</strong> : Google Analytics avec IP anonymisée (obligatoire)</li>
          </ul>

          <p className="text-sm">
            Pour plus d&apos;informations, consultez notre <Link href="/cookies" className="text-midnight-green hover:underline">politique de cookies</Link>.
          </p>
        </section>

        {/* Section 8 : Retrait du consentement */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Comment retirer votre consentement</h2>

          <div className="p-4 bg-amber-50 border border-amber-300 rounded">
            <p className="mb-3 font-semibold">
              Vous pouvez retirer votre consentement à tout moment, facilement et gratuitement :
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-600">→</span>
                <p><strong>En ligne</strong> : Via votre <Link href="/preferences" className="text-midnight-green hover:underline">page de préférences</Link></p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600">→</span>
                <p><strong>Par email</strong> : Lien de désinscription dans chaque communication</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600">→</span>
                <p><strong>Par contact direct</strong> : privacy@boussolemunicipale.com</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-amber-700">
              <strong>Délai de traitement :</strong> Votre retrait est effectif immédiatement. Vous ne recevrez plus aucune communication de notre part ni de nos partenaires.
            </p>
          </div>
        </section>

        {/* Section 9 : Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact et questions</h2>

          <p className="mb-3">
            Pour toute question concernant cette politique ou pour exercer vos droits :
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
            <div>
              <span className="font-semibold">Email principal :</span>{' '}
              <a href="mailto:contact@boussolemunicipale.com" className="text-midnight-green hover:underline">
                contact@boussolemunicipale.com
              </a>
            </div>
            <div>
              <span className="font-semibold">Protection des données :</span>{' '}
              <a href="mailto:privacy@boussolemunicipale.com" className="text-midnight-green hover:underline">
                privacy@boussolemunicipale.com
              </a>
            </div>
            <div>
              <span className="font-semibold">Formulaire de contact :</span>{' '}
              <Link href="/contact" className="text-midnight-green hover:underline">
                Page de contact
              </Link>
            </div>
          </div>

          <p className="mt-4 text-sm bg-gray-50 p-3 rounded">
            <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans les 30 jours suivant votre demande.
          </p>
        </section>

        {/* Section 10 : Modifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Modifications de cette politique</h2>

          <p className="mb-3">
            Cette politique peut être mise à jour pour refléter les changements dans nos pratiques ou la législation.
          </p>

          <p className="mb-3">
            Les modifications importantes vous seront notifiées par courriel (si vous nous avez fourni votre adresse)
            ou par un avis visible sur notre site web au moins <strong>30 jours à l&apos;avance</strong>.
          </p>

          <div className="p-3 bg-midnight-green/5 border-l-4 border-midnight-green rounded">
            <p className="text-sm">
              <strong>Dernière mise à jour :</strong> 2 octobre 2025
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Version 2.0 - Simplification du système de consentement
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
