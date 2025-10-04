import type { Metadata } from "next"
import { partiesData } from "@/lib/boussole-data"

// Fonction pour générer les métadonnées dynamiquement
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const partyId = params.id
  const party = partiesData.find(p => p.id === partyId)
  
  if (!party) {
    return {
      title: "Parti non trouvé - Boussole Électorale Municipale Québec",
      description: "Le parti politique recherché n'existe pas dans notre base de données.",
      alternates: {
        canonical: `https://boussolemunicipale.com/parti/${partyId}`
      }
    }
  }

  return {
    title: `${party.name} | Positions Politiques Municipales Québec 2025`,
    description: `Découvrez les positions de ${party.name} sur les enjeux municipaux de Québec : services municipaux, déneigement, transport en commun, aménagement urbain. Comparez avec vos propres positions grâce à notre boussole électorale.`,
    keywords: [
      party.name.toLowerCase(),
      "élections municipales québec",
      "partis politiques québec",
      "positions municipales",
      "services municipaux",
      "déneigement québec"
    ],
    openGraph: {
      title: `${party.name} - Positions Municipales Québec 2025`,
      description: `Positions de ${party.name} sur les enjeux municipaux de Québec. Découvrez leurs propositions et comparez avec vos opinions.`
    },
    alternates: {
      canonical: `https://boussolemunicipale.com/parti/${partyId}`
    }
  }
}