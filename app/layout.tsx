import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import { Toaster } from "sonner"
import { Analytics } from "@/components/analytics"
import ConditionalFooter from "@/components/conditional-footer"
import CSSOptimizer from "@/components/css-optimizer"

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  variable: "--font-inter"
})

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
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/logo-main.svg",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/logo-main.svg",
        sizes: "180x180",
        type: "image/svg+xml",
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
        {/* Critical CSS optimisé - Variables essentielles + layout de base pour réduire CLS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: 27 60% 97%;
              --foreground: 0 0% 13%;
              --card: 0 100% 100%;
              --card-foreground: 0 0% 13%;
              --primary: 184 91% 14%;
              --primary-foreground: 0 100% 100%;
              --secondary: 180 75% 95%;
              --secondary-foreground: 0 0% 13%;
              --muted: 180 75% 95%;
              --muted-foreground: 0 0% 45%;
              --border: 180 75% 90%;
              --ring: 184 91% 14%;
              --radius: 0.75rem;
              --midnight-green: 184 91% 14%;
              --isabelline: 27 60% 97%;
              --eerie-black: 0 0% 13%;
            }
            .dark {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
              --card: 222.2 84% 4.9%;
              --card-foreground: 210 40% 98%;
              --primary: 184 91% 14%;
              --primary-foreground: 0 100% 100%;
              --ring: 184 91% 14%;
            }
            /* Layout critique pour éviter CLS */
            html { font-family: Inter, system-ui, -apple-system, sans-serif; }
            body { margin: 0; background: hsl(var(--background)); color: hsl(var(--foreground)); }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .min-h-screen { min-height: 100vh; }
            .flex-1 { flex: 1; }
            /* Header critique */
            header { position: sticky; top: 0; z-index: 50; }
            .container { width: 100%; max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
            @media (min-width: 640px) { .container { padding: 0 1.5rem; } }
            @media (min-width: 1024px) { .container { padding: 0 2rem; } }
          `
        }} />
        
        
        {/* Resource hints optimisés pour performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload du CSS critique pour éviter le FOUC */}
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style"
          onLoad={(e) => { e.currentTarget.rel = 'stylesheet' }}
        />
        
        {/* Preconnect analytics - non-blocking */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
              "logo": "https://boussole-municipale.vercel.app/logo-main.svg",
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
            <ConditionalFooter />
          </div>
          <CSSOptimizer />
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
