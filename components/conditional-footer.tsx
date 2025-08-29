"use client"

import { usePathname } from "next/navigation"
import SiteFooter from "./site-footer"

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Afficher le footer seulement sur la page d'accueil
  if (pathname === "/") {
    return <SiteFooter />
  }
  
  // Ne pas afficher de footer sur les autres pages
  return null
}