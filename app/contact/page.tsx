import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Boussole Municipale Québec",
  description: "Contactez l'équipe de la Boussole Municipale pour toute question concernant les élections municipales de Québec 2025.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boussole-municipale.vercel.app/contact"
  }
}

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Contactez-nous
        </h1>
        <p className="text-lg text-muted-foreground">
          Nous sommes là pour répondre à vos questions sur la Boussole Municipale.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
          
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Adresse courriel</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="votre@courriel.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input 
                id="subject" 
                type="text" 
                placeholder="Objet de votre message"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Décrivez votre question ou commentaire..."
                rows={6}
                required
              />
            </div>
            
            <Button type="submit" className="w-full sm:w-auto px-8">
              <Mail className="mr-2 h-4 w-4" />
              Envoyer le message
            </Button>
          </form>
        </Card>

        {/* Informations de contact */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-midnight-green mt-1" />
                <div>
                  <h3 className="font-medium">Adresse courriel</h3>
                  <a 
                    href="mailto:contact@boussolemunicipale.com" 
                    className="text-midnight-green hover:underline"
                  >
                    contact@boussolemunicipale.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-midnight-green mt-1" />
                <div>
                  <h3 className="font-medium">Temps de réponse</h3>
                  <p className="text-muted-foreground text-sm">
                    Nous répondons généralement sous 24 à 48 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-midnight-green mt-1" />
                <div>
                  <h3 className="font-medium">Région</h3>
                  <p className="text-muted-foreground text-sm">
                    Ville de Québec, Québec, Canada
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Questions fréquentes</h3>
            <p className="text-muted-foreground mb-4">
              Avant de nous contacter, consultez notre section d&apos;aide qui répond 
              aux questions les plus courantes.
            </p>
            <Button variant="outline" asChild>
              <Link href="/aide">
                Voir l&apos;aide
              </Link>
            </Button>
          </Card>

          <Card className="p-6 bg-midnight-green/5">
            <h3 className="text-lg font-semibold mb-3 text-midnight-green">
              Urgences électorales
            </h3>
            <p className="text-sm text-muted-foreground">
              Pour des questions urgentes concernant les élections municipales, 
              contactez directement <strong>Élections Québec</strong> ou le bureau 
              du <strong>Directeur général des élections de la Ville de Québec</strong>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}