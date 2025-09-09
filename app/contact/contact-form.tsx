"use client"

import { ArrowLeft, Mail, MapPin, Clock, User, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input"
import { MotionButton, MotionCard } from "@/components/ui/motion-button"
import { FadeInSection, StaggeredList } from "@/components/ui/scroll-animations"
import { ToastProvider, useToast } from "@/components/ui/toast-modern"
import Link from "next/link"

function ContactContent() {
  const { addToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addToast({
      type: "success",
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })
  }

  const validateEmail = async (value: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return "Format d'email invalide"
    }
    return true
  }

  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <FadeInSection className="mb-6">
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
      </FadeInSection>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <FadeInSection variant="slide-left">
          <MotionCard className="p-6">
            <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="Prénom"
                  icon={<User className="w-4 h-4" />}
                  required
                />
                <FloatingInput
                  label="Nom"
                  icon={<User className="w-4 h-4" />}
                  required
                />
              </div>
              
              <FloatingInput
                label="Adresse courriel"
                type="email"
                icon={<Mail className="w-4 h-4" />}
                onValidate={validateEmail}
                required
              />
              
              <FloatingInput
                label="Sujet"
                helperText="Décrivez brièvement votre demande"
                required
              />
              
              <FloatingTextarea
                label="Message"
                rows={6}
                helperText="Détaillez votre question ou commentaire"
                required
              />
              
              <MotionButton type="submit" className="w-full sm:w-auto px-8">
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </MotionButton>
            </form>
          </MotionCard>
        </FadeInSection>

        {/* Informations de contact */}
        <FadeInSection variant="slide-right" delay={0.2}>
          <StaggeredList className="space-y-6">
            <MotionCard className="p-6">
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
            </MotionCard>

            <MotionCard className="p-6">
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
            </MotionCard>

            <MotionCard className="p-6 bg-midnight-green/5">
              <h3 className="text-lg font-semibold mb-3 text-midnight-green">
                Urgences électorales
              </h3>
              <p className="text-sm text-muted-foreground">
                Pour des questions urgentes concernant les élections municipales, 
                contactez directement <strong>Élections Québec</strong> ou le bureau 
                du <strong>Directeur général des élections de la Ville de Québec</strong>.
              </p>
            </MotionCard>
          </StaggeredList>
        </FadeInSection>
      </div>
    </div>
  )
}

export default function ContactFormWithProvider() {
  return (
    <ToastProvider>
      <ContactContent />
    </ToastProvider>
  )
}
