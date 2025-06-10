import Link from "next/link"

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-border">
      <div className="container max-w-7xl py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <Link href="/conditions" className="text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/aide" className="text-muted-foreground hover:text-foreground transition-colors">
              Aide
            </Link>
            <Link href="/a-propos" className="text-muted-foreground hover:text-foreground transition-colors">
              À Propos
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-muted-foreground">
            &copy; {currentYear} BoussoleMunicipale. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}
