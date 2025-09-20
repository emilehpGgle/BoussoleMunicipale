"use client"

import * as React from "react"
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

/**
 * FocusRing - Anneau de focus unifié pour l'accessibilité
 * Implémente MUST #8 du plan interactions_transitions.md
 */
export function FocusRing({
  children,
  className,
  variant = "default",
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "destructive"
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isFocused, setIsFocused] = React.useState(false)

  const variants = {
    default: "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    primary: "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2", 
    destructive: "focus-within:ring-2 focus-within:ring-destructive focus-within:ring-offset-2",
  }

  return (
    <div
      className={cn(
        "relative transition-all duration-200",
        variants[variant],
        className
      )}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      {...props}
    >
      {children}
      
      {/* Anneau de focus animé */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isFocused ? 0.1 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        transition={{ duration: 0.15 }}
        style={{
          background: variant === "primary" 
            ? "hsl(var(--primary))" 
            : variant === "destructive"
            ? "hsl(var(--destructive))"
            : "hsl(var(--ring))",
        }}
      />
    </div>
  )
}

/**
 * AccessibleButton - Bouton avec états focus optimisés
 */
export const AccessibleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "primary" | "destructive"
    children: React.ReactNode
  }
>(({ className, variant = "default", children, onClick, disabled, type }, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2",
        "font-medium text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variants
        variant === "primary" && "bg-primary text-primary-foreground focus-visible:ring-primary",
        variant === "destructive" && "bg-destructive text-destructive-foreground focus-visible:ring-destructive",
        variant === "default" && "bg-secondary text-secondary-foreground focus-visible:ring-ring",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  )
})

AccessibleButton.displayName = "AccessibleButton"

/**
 * SkipLink - Lien de navigation pour accessibilité
 */
export function SkipLink({ href = "#main", children = "Aller au contenu principal" }) {
  return (
    <motion.a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md z-50",
        "font-medium text-sm transition-all duration-200"
      )}
      initial={{ y: -50, opacity: 0 }}
      whileFocus={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  )
}

/**
 * useFocusManagement - Hook pour gérer le focus programmatiquement
 */
export function useFocusManagement() {
  const focusElement = React.useCallback((selector: string, delay = 0) => {
    setTimeout(() => {
      const element = document.querySelector<HTMLElement>(selector)
      if (element) {
        element.focus()
      }
    }, delay)
  }, [])

  const focusFirstError = React.useCallback(() => {
    const errorElement = document.querySelector<HTMLElement>('[aria-invalid="true"], .error input, [data-error="true"]')
    if (errorElement) {
      errorElement.focus()
    }
  }, [])

  const trapFocus = React.useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  return {
    focusElement,
    focusFirstError,
    trapFocus,
  }
}
