import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion de la confidentialité | Boussole Électorale Municipale',
  description: 'Gérez vos préférences de confidentialité, vos consentements et vos données personnelles pour la Boussole Électorale Municipale.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function PreferencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}