import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import Head from 'next/head'

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Structured data JSON-LD pour les breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://boussole-municipale.vercel.app${item.href}`
    }))
  }

  return (
    <>
      {/* Structured data pour les breadcrumbs */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <nav 
        aria-label="Fil d'Ariane" 
        className={`mb-4 ${className}`}
      >
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 mx-2 text-muted-foreground/60" />
              )}
              
              {item.isActive ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {index === 0 && <Home className="h-3 w-3 mr-1 inline" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Configurations prédéfinies pour les pages principales
export const breadcrumbConfigs = {
  questionnaire: [
    { label: "Accueil", href: "/" },
    { label: "Questionnaire", href: "/questionnaire", isActive: true }
  ],
  results: [
    { label: "Accueil", href: "/" },
    { label: "Questionnaire", href: "/questionnaire" },
    { label: "Résultats", href: "/resultats", isActive: true }
  ],
  party: (partyName: string, partyId: string) => [
    { label: "Accueil", href: "/" },
    { label: "Résultats", href: "/resultats" },
    { label: partyName, href: `/parti/${partyId}`, isActive: true }
  ],
  faq: [
    { label: "Accueil", href: "/" },
    { label: "FAQ", href: "/faq", isActive: true }
  ],
  about: [
    { label: "Accueil", href: "/" },
    { label: "À Propos", href: "/a-propos", isActive: true }
  ]
} 