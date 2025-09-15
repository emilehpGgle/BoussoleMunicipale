"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { MotionButton } from "./motion-button"

interface StickyNavbarProps {
  children?: React.ReactNode
  className?: string
  logo?: React.ReactNode
  links?: Array<{ href: string; label: string }>
  cta?: React.ReactNode
}

/**
 * StickyNavbar - Navbar qui se compacte au scroll
 * Implémente MUST #4 du plan interactions_transitions.md
 * Passe de 72px → 56px avec backdrop-blur
 */
export function StickyNavbar({
  children,
  className,
  logo = <span className="font-bold text-xl">Boussole</span>,
  links = [],
  cta,
}: StickyNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  // Fermer le menu mobile au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation configs
  const navbarVariants = {
    top: {
      height: 72,
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    scrolled: {
      height: 56,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
  }

  const logoVariants = {
    top: { scale: 1 },
    scrolled: { scale: 0.9 },
  }

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 flex items-center",
          isScrolled && "shadow-sm backdrop-blur-md",
          className
        )}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={navbarVariants}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            transition={{ duration: 0.25 }}
          >
            <Link href="/" className="flex items-center gap-2">
              {logo}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta || (
              <MotionButton size="sm">
                Commencer
              </MotionButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Custom Children */}
        {children}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden",
          !isMobileMenuOpen && "pointer-events-none"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <motion.div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden"
        )}
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t">
            {cta}
          </div>
        </div>
      </motion.div>

      {/* Spacer pour éviter que le contenu passe sous la navbar */}
      <div className={cn("transition-all duration-250", isScrolled ? "h-14" : "h-[72px]")} />
    </>
  )
}
