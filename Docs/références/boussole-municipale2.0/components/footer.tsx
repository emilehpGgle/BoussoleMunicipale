import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Shield, HelpCircle } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.png" alt="Boussole Municipale Logo" width={32} height={32} className="w-8 h-8" />
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
                <a href="#comment-ca-marche" className="hover:text-primary transition-colors">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#pourquoi-important" className="hover:text-primary transition-colors">
                  Pourquoi c'est important
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  Questions fréquentes
                </a>
              </li>
              <li>
                <a href="#aide" className="hover:text-primary transition-colors">
                  Aide
                </a>
              </li>
            </ul>
          </div>

          {/* Vie locale */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#a-propos" className="hover:text-primary transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#confidentialite" className="hover:text-primary transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#conditions" className="hover:text-primary transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Centre d'aide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@boussolemunicipale.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Données protégées</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 BoussoleMunicipale. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
