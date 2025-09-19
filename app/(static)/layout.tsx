export default function StaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout simple sans animations pour pages statiques avec metadata
  // Évite les problèmes d'hydratation avec Server Components
  return (
    <>
      {children}
    </>
  )
}