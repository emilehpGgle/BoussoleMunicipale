import { Metadata } from "next"
import ContactFormWithProvider from "./contact-form"

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
  return <ContactFormWithProvider />
}