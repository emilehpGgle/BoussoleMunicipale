import Link from "next/link"
import Image from "next/image"

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container max-w-screen-2xl">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="block relative h-[62.5px] w-[50px] md:h-[75px] md:w-[60px]">
              {" "}
              {/* Aspect ratio 4:5 */}
              <Image
                src="/boussole-municipale-logo-footer.svg"
                alt="Boussole Municipale Logo Footer"
                fill
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          <nav className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/confidentialite" className="hover:text-primary-foreground/70 transition-colors">
              Confidentialité
            </Link>
            <Link href="/conditions" className="hover:text-primary-foreground/70 transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/aide" className="hover:text-primary-foreground/70 transition-colors">
              Aide
            </Link>
            <Link href="/a-propos" className="hover:text-primary-foreground/70 transition-colors">
              À Propos
            </Link>
          </nav>

          <div className="text-center md:text-right text-sm text-primary-foreground/80">
            &copy; {currentYear} BoussoleMunicipale.
            <br />
            Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}
