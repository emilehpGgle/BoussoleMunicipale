import { notFound } from 'next/navigation'
import { supportedMunicipalities } from '@/lib/postal-code-mapping'

interface MunicipalityLayoutProps {
  children: React.ReactNode
  params: { municipality: string }
}

export async function generateStaticParams() {
  return supportedMunicipalities.map((municipality) => ({
    municipality: municipality.id,
  }))
}

export default function MunicipalityLayout({
  children,
  params,
}: MunicipalityLayoutProps) {
  // Vérifier si la municipalité est supportée
  const isValidMunicipality = supportedMunicipalities.some(
    m => m.id === params.municipality
  )

  if (!isValidMunicipality) {
    notFound()
  }

  return children
}