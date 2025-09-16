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
import StickyStartButton from "@/components/sticky-start-button"
import { RouteTransition } from "@/components/ui/page-transitions"

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Boussole Électorale | Test Politique Municipal Québec 2025",
  description: "La boussole electorale (boussole électorale) officielle pour les élections municipales 2025 à Québec. Test politique gratuit en 5 minutes pour découvrir vos affinités avec Bruno Marchand, Sam Hamad et tous les partis municipaux. Political compass québécois.",
  keywords: [
    "boussole électorale",
    "boussole electorale",
    "boussole electorale 2025",
    "boussole électorale québec",
    "test politique",
    "test political compass",
    "political compass québec",
    "élections municipales 2025",
    "élections municipales québec",
    "bruno marchand",
    "sam hamad",
    "partis politiques québec",
    "maire québec 2025",
    "denis coderre",
    "test politique municipal"
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
    title: "Boussole Électorale 2025 | Test Politique Municipal Québec",
    description: "Boussole electorale officielle pour découvrir vos affinités politiques. Test politique gratuit pour les élections municipales 2025. Bruno Marchand, Sam Hamad et tous les partis.",
    url: "https://boussole-municipale.vercel.app",
    siteName: "Boussole Électorale Québec",
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
    title: "Boussole Électorale 2025 | Test Politique Québec",
    description: "Boussole electorale gratuite pour les élections municipales 2025. Découvrez vos affinités avec Bruno Marchand, Sam Hamad et tous les partis municipaux.",
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
    "name": "Boussole Électorale | Test Politique Municipal Québec 2025",
    "description": "Boussole electorale (boussole électorale) officielle pour les élections municipales 2025 à Québec. Test politique gratuit type political compass pour découvrir vos affinités avec Bruno Marchand, Sam Hamad et tous les partis municipaux.",
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
    "keywords": "boussole électorale, boussole electorale, boussole electorale 2025, test politique, test political compass, political compass québec, élections municipales québec 2025, bruno marchand, sam hamad, denis coderre, partis politiques québec, maire québec 2025"
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Viewport meta tag AGGRESSIVE pour neutraliser scaling automatique */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no"
        />
        <Analytics />
        {/* Domain detection script for debugging layout differences */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const hostname = window.location.hostname;
              const isDomainCustom = hostname.includes('boussolemunicipale.com');
              const isVercelDomain = hostname.includes('vercel.app');
              
              console.log('[DOMAIN DEBUG] Current domain:', hostname);
              console.log('[DOMAIN DEBUG] Is custom domain:', isDomainCustom);
              console.log('[DOMAIN DEBUG] Is Vercel domain:', isVercelDomain);
              console.log('[DOMAIN DEBUG] Viewport size:', window.innerWidth, 'x', window.innerHeight);
              console.log('[DOMAIN DEBUG] Device pixel ratio:', window.devicePixelRatio);
              
              // ADVANCED SCALING DEBUGGING
              const htmlEl = document.documentElement;
              const bodyEl = document.body;
              const computedHtml = window.getComputedStyle(htmlEl);
              const computedBody = window.getComputedStyle(bodyEl);
              
              console.log('[SCALE DEBUG] HTML font-size:', computedHtml.fontSize);
              console.log('[SCALE DEBUG] Body font-size:', computedBody.fontSize);
              console.log('[SCALE DEBUG] HTML zoom:', computedHtml.zoom || 'undefined');
              console.log('[SCALE DEBUG] Body zoom:', computedBody.zoom || 'undefined');
              console.log('[SCALE DEBUG] Window.devicePixelRatio:', window.devicePixelRatio);
              console.log('[SCALE DEBUG] Screen dimensions:', screen.width, 'x', screen.height);
              console.log('[SCALE DEBUG] Visual viewport:', window.visualViewport?.width || 'undefined', 'x', window.visualViewport?.height || 'undefined');
              
              // Browser zoom detection et compensation
              const zoomLevel = Math.round(((window.outerWidth / window.innerWidth) * 100) * 100) / 100;
              console.log('[SCALE DEBUG] Browser zoom level:', zoomLevel + '%');
              
              // Force zoom compensation sur domaine custom
              if (isDomainCustom && zoomLevel !== 100) {
                const compensationFactor = 100 / zoomLevel;
                console.log('[SCALE FIX] Applying zoom compensation factor:', compensationFactor);
                document.body.style.transform = \`scale(\${compensationFactor})\`;
                document.body.style.transformOrigin = 'top left';
              }
              
              // Debug headers présents
              fetch('/api/debug-headers', { method: 'HEAD' }).then(response => {
                console.log('[DOMAIN DEBUG] Response headers:');
                for (let [key, value] of response.headers.entries()) {
                  console.log('[DOMAIN DEBUG] -', key + ':', value);
                }
              }).catch(() => console.log('[DOMAIN DEBUG] Could not fetch debug headers'));
              
              // DOMAIN-SPECIFIC FIXES
              if (isDomainCustom) {
                document.documentElement.style.setProperty('--debug-domain', '"custom"');
                document.documentElement.setAttribute('data-domain', 'custom');
                
                // Force scaling correction for custom domain
                setTimeout(() => {
                  // Agressive scaling fix
                  document.documentElement.style.fontSize = '16px';
                  document.documentElement.style.zoom = '1';
                  document.body.style.fontSize = '1rem';
                  document.body.style.zoom = '1';
                  document.body.style.minWidth = '100vw';
                  document.body.style.maxWidth = '100vw';
                  document.body.style.transform = 'scale(1)';
                  
                  console.log('[DOMAIN FIX] Applied aggressive custom domain scaling fix');
                }, 100);
              } else {
                document.documentElement.style.setProperty('--debug-domain', '"vercel"');
                document.documentElement.setAttribute('data-domain', 'vercel');
              }
            })();
          `
        }} />
        {/* Critical CSS optimisé v2.2 - Normalisation globale pour consistance domaines */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* AGGRESSIVE GLOBAL RESET - Force domain consistency */
            * { 
              box-sizing: border-box !important; 
            }
            html { 
              font-size: 16px !important; 
              zoom: 1 !important; 
              -webkit-text-size-adjust: 100% !important;
              -ms-text-size-adjust: 100% !important;
              text-size-adjust: 100% !important;
            }
            body { 
              width: 100% !important; 
              max-width: 100vw !important; 
              min-width: 100vw !important;
              font-size: 1rem !important;
              line-height: 1.5 !important;
              margin: 0 !important;
              padding: 0 !important;
              zoom: 1 !important;
            }
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
            /* Container responsive système unifié - FORCE CONSISTENCY */
            .container { 
              width: 100% !important; 
              margin: 0 auto !important; 
              padding: 0 1rem !important; 
              box-sizing: border-box !important;
            }
            /* Mobile : 320px - 639px */
            @media (min-width: 320px) { 
              .container { padding: 0 1rem !important; max-width: 100% !important; } 
            }
            /* Tablet : 640px - 1023px */
            @media (min-width: 640px) { 
              .container { padding: 0 1.5rem !important; max-width: 100% !important; } 
            }
            /* Laptop : 1024px - 1279px */
            @media (min-width: 1024px) { 
              .container { padding: 0 2rem !important; max-width: 1200px !important; } 
            }
            /* Desktop 16" : 1280px - 1535px */
            @media (min-width: 1280px) { 
              .container { padding: 0 2rem !important; max-width: 1400px !important; } 
            }
            /* Large Desktop : 1536px - 1919px */
            @media (min-width: 1536px) { 
              .container { padding: 0 3rem !important; max-width: 1600px !important; } 
            }
            /* Ultra-wide : 1920px+ */
            @media (min-width: 1920px) { 
              .container { padding: 0 4rem !important; max-width: 1800px !important; } 
            }
            
            /* DOMAIN-SPECIFIC OVERRIDES */
            [data-domain="custom"] {
              font-size: 16px !important;
              zoom: 1 !important;
            }
            [data-domain="custom"] body {
              font-size: 1rem !important;
              transform: scale(1) !important;
              zoom: 1 !important;
            }
            [data-domain="custom"] .container {
              transform: scale(1) !important;
              zoom: 1 !important;
            }
            [data-domain="custom"] * {
              zoom: 1 !important;
              transform-origin: top left !important;
            }
          `
        }} />
        
        
        {/* Resource hints optimisés pour performance - Google Fonts gérés par next/font */}
        
        {/* Preload du CSS critique pour éviter le FOUC */}
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style"
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
            <main className="flex-1" id="main">
              <RouteTransition>
                {children}
              </RouteTransition>
            </main>
            <ConditionalFooter />
          </div>
          <CSSOptimizer />
          <StickyStartButton />
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
