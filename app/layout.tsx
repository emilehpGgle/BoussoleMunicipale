import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Boussole Électorale Municipale - La Boussole Électorale de Québec",
  description: "🗳️ Boussole électorale spécialisée pour les élections MUNICIPALES de Québec. Questionnaire gratuit de 5 minutes : découvrez quel parti municipal partage vos idées. Déneigement, transport en commun, services municipaux - votre boussole électorale locale !",
  keywords: [
    "boussole électorale",
    "élections municipales québec",
    "test politique",
    "partis politiques québec",
    "tramway quebec",
    "services municipaux",
    "déneigement québec",
    "pistes cyclables"
  ],
  authors: [{ name: "Boussole Électorale Québec" }],
  creator: "Boussole Électorale Québec",
  publisher: "Boussole Municipale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/logo-main_sans_ecriture.png",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/logo-main_sans_ecriture.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Boussole Électorale Municipale | Québec - Spécialisée Elections Locales",
    description: "🗳️ Questionnaire gratuit et anonyme en 5 minutes. Déneigement, transport en commun, services municipaux - votre boussole électorale municipale.",
    url: "https://boussole-municipale.vercel.app",
    siteName: "Boussole Électorale Municipale Québec",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/hero-illustration.png",
        width: 1200,
        height: 630,
        alt: "Boussole Électorale Municipale - Spécialisée pour les élections municipales de Québec"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Boussole Électorale Municipale Québec 🗳️", 
    description: "La boussole électorale spécialisée pour les élections municipales ! Questionnaire gratuit en 5 minutes pour découvrir vos affinités avec les partis locaux.",
    images: ["/hero-illustration.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Boussole Électorale 2025 - Élections Municipales Québec",
    "description": "Test politique gratuit pour découvrir vos affinités avec les partis municipaux de Québec lors des élections 2025. Questionnaire de 21 questions en 5 minutes.",
    "url": "https://boussole-municipale.vercel.app",
    "applicationCategory": "Political Tool",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization", 
      "name": "Boussole Électorale Québec",
      "url": "https://boussole-municipale.vercel.app"
    },
    "datePublished": "2025-01-14",
    "dateModified": new Date().toISOString(),
    "inLanguage": "fr-CA",
    "audience": {
      "@type": "Audience",
      "audienceType": "Citizens of Quebec City",
      "geographicArea": {
        "@type": "City",
        "name": "Quebec City",
        "addressCountry": "CA",
        "addressRegion": "QC"
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Élections municipales 2025"
      },
      {
        "@type": "Thing", 
        "name": "Partis politiques municipaux"
      },
      {
        "@type": "Thing",
        "name": "Test politique"
      },
      {
        "@type": "Thing",
        "name": "Affinités politiques"
      }
    ],
    "keywords": "boussole électorale, élections municipales québec 2025, test politique, partis politiques québec, tramway quebec, bruno marchand, politique gauche droite"
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Structured Data pour les Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-white">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
