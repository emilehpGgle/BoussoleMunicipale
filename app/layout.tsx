import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Toaster } from "sonner"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Boussole Électorale Municipale - Votre guide pour les élections municipales 2025",
  description: "🗳️ Découvrez quel parti municipal vous correspond vraiment ! Notre boussole électorale gratuite vous guide en 5 minutes à travers les enjeux locaux qui comptent. Services municipaux, troisième lien, aménagement urbain, fiscalité locale : trouvez vos affinités politiques sur ce qui vous touche au quotidien.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover'
  },
  keywords: [
    "boussole électorale",
    "élections municipales québec",
    "test politique",
    "partis politiques québec",
    "troisième lien",
    "services municipaux",
    "déneigement québec",
    "pistes cyclables",
    "fiscalité locale",
    "aménagement urbain"
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
    title: "Boussole Électorale Municipale - Votre guide pour les élections municipales 2025",
    description: "Découvrez quel parti municipal vous correspond vraiment ! Services municipaux, troisième lien, aménagement urbain, fiscalité locale : trouvez vos affinités politiques.",
    url: "https://boussole-municipale.vercel.app",
    siteName: "Boussole Électorale Municipale Québec",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/hero-illustration-v2.webp",
        width: 1200,
        height: 630,
        alt: "Boussole Électorale Municipale - Spécialisée pour les élections municipales de Québec"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Boussole Électorale Municipale - Votre guide 2025 🗳️",
    description: "Découvrez quel parti municipal vous correspond vraiment ! Services municipaux, troisième lien, aménagement urbain, fiscalité locale.",
    images: ["/hero-illustration-v2.webp"]
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
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseOrigin = (() => {
    try {
      return supabaseUrl ? new URL(supabaseUrl).origin : undefined
    } catch {
      return undefined
    }
  })()
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
        <Analytics />
        {/* Critical CSS - Variables de couleurs pour rendu immédiat */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: 0 0% 100%;
              --foreground: 222.2 84% 4.9%;
              --card: 0 0% 100%;
              --card-foreground: 222.2 84% 4.9%;
              --popover: 0 0% 100%;
              --popover-foreground: 222.2 84% 4.9%;
              --primary: 221.2 83.2% 53.3%;
              --primary-foreground: 210 40% 98%;
              --secondary: 210 40% 96%;
              --secondary-foreground: 222.2 84% 4.9%;
              --accent: 210 40% 96%;
              --accent-foreground: 222.2 84% 4.9%;
              --teal-special: 181 84% 28%;
              --teal-special-foreground: 0 0% 100%;
              --muted: 210 40% 96%;
              --muted-foreground: 215.4 16.3% 46.9%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 210 40% 98%;
              --border: 214.3 31.8% 91.4%;
              --input: 214.3 31.8% 91.4%;
              --ring: 221.2 83.2% 53.3%;
              --radius: 0.75rem;
              --chart-1: 12 76% 61%;
              --chart-2: 173 58% 39%;
              --chart-3: 197 37% 24%;
              --chart-4: 43 74% 66%;
              --chart-5: 27 87% 67%;
            }
            .dark {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
              --card: 222.2 84% 4.9%;
              --card-foreground: 210 40% 98%;
              --popover: 222.2 84% 4.9%;
              --popover-foreground: 210 40% 98%;
              --primary: 217.2 91.2% 59.8%;
              --primary-foreground: 222.2 84% 4.9%;
              --secondary: 217.2 32.6% 17.5%;
              --secondary-foreground: 210 40% 98%;
              --muted: 217.2 32.6% 17.5%;
              --muted-foreground: 215 20.2% 65.1%;
              --accent: 217.2 32.6% 17.5%;
              --accent-foreground: 210 40% 98%;
              --destructive: 0 62.8% 30.6%;
              --destructive-foreground: 210 40% 98%;
              --border: 217.2 32.6% 17.5%;
              --input: 217.2 32.6% 17.5%;
              --ring: 224.3 76.3% 94.1%;
              --chart-1: 220 70% 50%;
              --chart-2: 160 60% 45%;
              --chart-3: 30 80% 55%;
              --chart-4: 280 65% 60%;
              --chart-5: 340 75% 55%;
            }
          `
        }} />
        
        {/* Script pour optimiser le chargement CSS non-critique */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Observer pour intercepter les CSS chunks Next.js avant qu'ils bloquent
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.tagName === 'LINK' && 
                          node.rel === 'stylesheet' && 
                          node.href && 
                          node.href.includes('/_next/static/css/')) {
                        // Applique la technique media="print" pour CSS non-critique
                        node.media = 'print';
                        node.onload = function() {
                          this.onload = null;
                          this.media = 'all';
                        };
                      }
                    });
                  }
                });
              });
              // Observe les changements dans le head
              observer.observe(document.head, { childList: true });
            })();
          `
        }} />
        
        {/* Preconnect to Google Fonts pour optimiser la performance */}
        <link 
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link 
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        
        {/* Preconnect to analytics origins to shave connection time (non-blocking) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        {supabaseOrigin ? (
          <>
            <link rel="preconnect" href={supabaseOrigin} crossOrigin="" />
            <link rel="dns-prefetch" href={supabaseOrigin} />
          </>
        ) : null}
        {/* Structured Data pour les Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {/* Organization Schema pour SEO local et Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Boussole Électorale Québec",
              "url": "https://boussole-municipale.vercel.app",
              "logo": "https://boussole-municipale.vercel.app/logo-main_sans_ecriture.png",
              "description": "Boussole électorale municipale de Québec 2025 : test politique gratuit pour découvrir vos affinités avec les partis municipaux.",
              "sameAs": [
                "https://www.facebook.com/boussolemunicipale",
                "https://twitter.com/boussoleqc",
                "https://www.linkedin.com/company/boussole-municipale/"
              ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "info@boussolemunicipale.ca",
                "url": "https://boussole-municipale.vercel.app/a-propos"
              }],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Québec",
                "addressRegion": "QC",
                "addressCountry": "CA"
              }
            })
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
