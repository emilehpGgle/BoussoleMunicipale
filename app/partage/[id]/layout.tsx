import { Metadata } from 'next'

// Interface pour les props
interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

// Fonction pour générer les métadonnées dynamiques
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: shareId } = await params
  
  // URL de l'image générée dynamiquement
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-share-image?shareId=${shareId}&userName=Citoyen&topParties=${encodeURIComponent(JSON.stringify([
    { party: { id: '1', name: 'Québec Debout', shortName: 'QD' }, score: 92 },
    { party: { id: '2', name: 'Ensemble Pour Québec', shortName: 'EPQ' }, score: 85 },
    { party: { id: '3', name: 'Libéral du Québec', shortName: 'LQ' }, score: 78 }
  ]))}&userPosition=${encodeURIComponent(JSON.stringify({ economic: 15, social: 25 }))}`

  return {
    title: 'Résultats Boussole Municipale | Découvrez vos affinités politiques',
    description: 'Découvrez les affinités politiques municipales révélées par la Boussole Municipale. Top parti: Québec Debout (92%). Faites votre propre test en 5 minutes !',
    
    // Open Graph pour Facebook, LinkedIn, etc.
    openGraph: {
      title: 'Mes résultats de la Boussole Municipale 🗳️',
      description: 'Découvrez mes affinités politiques municipales ! Top parti: Québec Debout (92%). Faites votre propre test gratuit en 5 minutes.',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/partage/${shareId}`,
      siteName: 'Boussole Municipale',
      type: 'website',
      locale: 'fr_CA',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Résultats de la Boussole Municipale - Affinités politiques municipales',
          type: 'image/png',
        }
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: 'Mes résultats de la Boussole Municipale 🗳️',
      description: 'Découvrez mes affinités politiques municipales ! Top parti: Québec Debout (92%). #BoussoleElectorale #PolitiqueMunicipale',
      images: [imageUrl],
      creator: '@BoussoleQC',
      site: '@BoussoleQC',
    },

    // Métadonnées supplémentaires
    keywords: [
      'élections municipales',
      'affinités politiques',
      'boussole électorale',
      'politique municipale',
      'Québec',
      'questionnaire politique',
      'orientation politique'
    ],
    
    // Autres métadonnées
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    
    // Canonical URL
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/partage/${shareId}`,
    },

    // Métadonnées pour le référencement
    other: {
      'og:image:alt': 'Résultats personnalisés de la Boussole Municipale avec top 3 des affinités politiques',
      'twitter:image:alt': 'Résultats de la Boussole Municipale - Affinités politiques municipales',
    }
  }
}

export default function ShareLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Script pour améliorer le partage sur les réseaux sociaux */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Boussole Municipale',
            description: 'Découvrez vos affinités politiques municipales avec notre questionnaire gratuit en 5 minutes.',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
            applicationCategory: 'Political Tool',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CAD'
            },
            creator: {
              '@type': 'Organization',
              name: 'Boussole Municipale',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            }
          })
        }}
      />
      {children}
    </>
  )
} 