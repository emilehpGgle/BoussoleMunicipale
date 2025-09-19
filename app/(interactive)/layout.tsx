"use client"

import { RouteTransition } from "@/components/ui/page-transitions"

export default function InteractiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout avec animations pour pages interactives
  // Utilise RouteTransition pour les transitions fluides
  return (
    <RouteTransition>
      {children}
    </RouteTransition>
  )
}