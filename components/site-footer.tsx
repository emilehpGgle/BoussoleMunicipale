import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Shield, HelpCircle } from "lucide-react"
import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="bg-isabelline border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo-main.svg" alt="Boussole Municipale Logo" width={32} height={32} className="w-8 h-8" />
              <span className="font-bold text-xl text-foreground">Boussole Municipale</span>
            </div>
            <p className="text-muted-foreground">
              Votre boussole pour découvrir vos affinités politiques municipales et faire un choix éclairé.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/comment-ca-marche" className="hover:text-midnight-green transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/pourquoi-important" className="hover:text-midnight-green transition-colors">
                  Pourquoi c&apos;est important
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-midnight-green transition-colors">
                  Questions fréquentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Vie locale */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/a-propos" className="hover:text-midnight-green transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-midnight-green transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-midnight-green transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-midnight-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/centre-aide" className="flex items-center space-x-2 hover:text-midnight-green transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span>Centre d&apos;aide</span>
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:contact@boussolemunicipale.com" 
                  className="flex items-center space-x-2 hover:text-midnight-green transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@boussolemunicipale.com</span>
                </a>
              </li>
              <li>
                <Link href="/donnees-protegees" className="flex items-center space-x-2 hover:text-midnight-green transition-colors">
                  <Shield className="w-4 h-4" />
                  <span>Données protégées</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 BoussoleMunicipale. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
