import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Boussole Municipale - Trouvez votre parti municipal",
  description: "Découvrez quel parti municipal de Québec partage vos idées. Questionnaire de 5 minutes sur les enjeux locaux : transport, logement, environnement, finances municipales.",
  keywords: "élections municipales, Québec, politique municipale, questionnaire politique, boussole politique, partis municipaux, vote municipal",
  authors: [{ name: "Boussole Municipale" }],
  creator: "Boussole Municipale",
  publisher: "Boussole Municipale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Boussole Municipale - Trouvez votre parti municipal",
    description: "Découvrez quel parti municipal de Québec partage vos idées. Questionnaire gratuit et anonyme.",
    url: "https://boussole-municipale.vercel.app",
    siteName: "Boussole Municipale",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boussole Municipale - Trouvez votre parti municipal", 
    description: "Découvrez quel parti municipal de Québec partage vos idées.",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-white">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
