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
    canonical: "https://boussole-municipale.vercel.app/confidentialite"
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
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">Collecte d&apos;informations</h2>
          <p className="mb-4">
            La Boussole Municipale collecte différents types d&apos;informations selon vos choix :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Données essentielles (obligatoires)</strong> : Vos réponses au questionnaire politique pour calculer vos affinités</li>
            <li><strong>Données de profil (optionnelles)</strong> : Âge, secteur de résidence, situation professionnelle pour des analyses démographiques</li>
            <li><strong>Adresse courriel (optionnelle)</strong> : Pour recevoir vos résultats et communications si vous y consentez</li>
            <li><strong>Données techniques</strong> : Informations de session, adresse IP anonymisée, cookies techniques</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Utilisation des données</h2>
          <h3 className="text-lg font-semibold mb-2 text-midnight-green">Utilisations principales</h3>
          <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
            <li>Calculer vos affinités politiques municipales</li>
            <li>Générer vos résultats personnalisés</li>
            <li>Permettre le partage de vos résultats si vous le souhaitez</li>
            <li>Vous envoyer vos résultats par courriel (si demandé)</li>
            <li>Améliorer notre service et développer de nouvelles fonctionnalités</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2 text-midnight-green">Utilisations avec votre consentement explicite</h3>
          <p className="mb-2">
            <strong>Uniquement si vous y consentez expressément</strong>, nous pouvons également :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Vous envoyer des communications sur les enjeux politiques municipaux</li>
            <li>Partager des données anonymisées et agrégées avec des partenaires de recherche</li>
            <li>Utiliser vos données à des fins de marketing ciblé et personnalisation</li>
            <li>Inclure vos données dans des analyses commerciales (toujours anonymisées)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Partage et vente de données</h2>
          <div className="bg-midnight-green/5 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2 text-midnight-green">Principe de consentement explicite</h3>
            <p>
              <strong>Nous ne vendons jamais vos données personnelles sans votre consentement explicite et éclairé.</strong> 
              Toute utilisation commerciale de vos informations nécessite votre accord préalable, que vous pouvez 
              donner ou retirer à tout moment.
            </p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Avec votre consentement, nous pouvons :</h3>
          <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
            <li><strong>Données anonymisées</strong> : Vendre des statistiques et tendances agrégées à des organismes de recherche, médias ou institutions académiques</li>
            <li><strong>Profils marketing</strong> : Partager des segments démographiques anonymisés avec des partenaires commerciaux</li>
            <li><strong>Analyses politiques</strong> : Fournir des analyses de tendances politiques à des organisations intéressées par la recherche électorale</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Garanties importantes :</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Aucune donnée personnelle identifiable n&apos;est jamais vendue</li>
            <li>Vous gardez le contrôle total sur vos consentements</li>
            <li>Retrait du consentement possible à tout moment</li>
            <li>Transparence complète sur nos partenaires commerciaux</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Consentement et choix</h2>
          <p className="mb-4">
            Nous vous demandons explicitement votre consentement pour différentes utilisations de vos données :
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-midnight-green pl-4">
              <h3 className="font-semibold text-midnight-green">✅ Consentement pour recevoir vos résultats</h3>
              <p className="text-muted-foreground text-sm">
                Permet l&apos;envoi de vos résultats par courriel et la sauvegarde de votre profil.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-orange-600">⚠️ Consentement pour marketing ciblé</h3>
              <p className="text-muted-foreground text-sm">
                Permet l&apos;utilisation de vos données à des fins commerciales et marketing. 
                <strong>Entièrement optionnel</strong> et peut être retiré à tout moment.
              </p>
            </div>
          </div>
          
          <p className="mt-4 text-sm bg-gray-100 p-3 rounded">
            <strong>Important :</strong> Vous pouvez modifier ou retirer tous vos consentements à tout moment 
            depuis votre profil ou en nous contactant directement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Protection et sécurité</h2>
          <p className="mb-4">
            Vos données sont protégées par des mesures de sécurité de niveau professionnel :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Chiffrement HTTPS/TLS pour toutes les communications</li>
            <li>Chiffrement AES-256 pour le stockage des données</li>
            <li>Hébergement sécurisé chez Supabase (certifié SOC 2)</li>
            <li>Accès restreint et authentification à deux facteurs pour l&apos;équipe</li>
            <li>Audits de sécurité réguliers</li>
            <li>Sauvegarde automatique et réplication des données</li>
          </ul>
          <p className="mt-4">
            Pour plus de détails techniques, consultez notre page <Link href="/donnees-protegees" className="text-midnight-green hover:underline">Données protégées</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Cookies et technologies de suivi</h2>
          <p className="mb-4">
            Nous utilisons uniquement des cookies essentiels au fonctionnement du site :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Cookies de session</strong> : Maintenir votre progression dans le questionnaire</li>
            <li><strong>Cookies de préférence</strong> : Sauvegarder vos paramètres d&apos;affichage</li>
            <li><strong>Cookies de sécurité</strong> : Protéger contre les attaques malveillantes</li>
          </ul>
          <p className="mt-3">
            <strong>Aucun cookie de suivi publicitaire</strong> n&apos;est utilisé sans votre consentement explicite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Vos droits</h2>
          <p className="mb-4">
            Conformément aux lois sur la protection des données (RGPD, PIPEDA, Loi 25), vous avez les droits suivants :
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Droit d&apos;accès</strong> : Consulter toutes vos données</li>
              <li><strong>Droit de rectification</strong> : Corriger des informations erronées</li>
              <li><strong>Droit à l&apos;effacement</strong> : Supprimer définitivement vos données</li>
              <li><strong>Droit de portabilité</strong> : Récupérer vos données dans un format lisible</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Droit d&apos;opposition</strong> : Refuser certains traitements</li>
              <li><strong>Droit de retrait</strong> : Annuler vos consentements</li>
              <li><strong>Droit de limitation</strong> : Restreindre l&apos;utilisation de vos données</li>
              <li><strong>Droit de réclamation</strong> : Déposer une plainte auprès d&apos;une autorité</li>
            </ul>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button asChild size="sm">
              <Link href="/profil">Gérer mes données</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Exercer mes droits</Link>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Conservation des données</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Données de questionnaire</strong> : Conservées 2 ans après votre dernière utilisation</li>
            <li><strong>Adresse courriel</strong> : Conservée tant que vous maintenez votre consentement</li>
            <li><strong>Données de profil</strong> : Supprimées automatiquement après 3 ans d&apos;inactivité</li>
            <li><strong>Données anonymisées</strong> : Peuvent être conservées indéfiniment pour la recherche</li>
          </ul>
          <p className="mt-3 text-sm">
            Vous pouvez demander la suppression immédiate de toutes vos données à tout moment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact et réclamations</h2>
          <p className="mb-3">
            Pour toute question concernant cette politique ou pour exercer vos droits :
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
            <li><strong>Email</strong> : <a href="mailto:privacy@boussolemunicipale.com" className="text-midnight-green hover:underline">privacy@boussolemunicipale.com</a></li>
            <li><strong>Délégué à la protection des données</strong> : <a href="mailto:dpo@boussolemunicipale.com" className="text-midnight-green hover:underline">dpo@boussolemunicipale.com</a></li>
            <li><strong>Formulaire de contact</strong> : <Link href="/contact" className="text-midnight-green hover:underline">Page de contact</Link></li>
          </ul>
          <p className="text-sm bg-gray-50 p-3 rounded">
            <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans les 30 jours suivant votre demande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Modifications de cette politique</h2>
          <p>
            Cette politique peut être mise à jour pour refléter les changements dans nos pratiques ou 
            la législation. Les modifications importantes vous seront notifiées par courriel (si vous 
            nous avez fourni votre adresse) ou par un avis sur notre site web au moins 30 jours à l&apos;avance.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>Dernière mise à jour :</strong> 30 janvier 2025
          </p>
        </section>
      </div>
    </div>
  )
} 