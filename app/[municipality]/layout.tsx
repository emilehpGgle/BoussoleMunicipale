import { notFound } from 'next/navigation'
import { supportedMunicipalities } from '@/lib/postal-code-mapping'

interface MunicipalityLayoutProps {
  children: React.ReactNode
  params: Promise<{ municipality: string }>
}

export async function generateStaticParams() {
  return supportedMunicipalities.map((municipality) => ({
    municipality: municipality.id,
  }))
}

export default async function MunicipalityLayout({
  children,
  params,
}: MunicipalityLayoutProps) {
  const { municipality } = await params
  // Vérifier si la municipalité est supportée
  const isValidMunicipality = supportedMunicipalities.some(
    m => m.id === municipality
  )

  if (!isValidMunicipality) {
    notFound()
  }

  return children
}