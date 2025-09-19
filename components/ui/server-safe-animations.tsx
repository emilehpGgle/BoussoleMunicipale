import React from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'

// Wrappers Server-safe pour animations - fallbacks statiques
// Permettent aux Server Components avec metadata d'utiliser la "structure" animation
// sans les dépendances Client Component

interface ServerSafeProps {
  children: React.ReactNode
  className?: string
}

interface ServerSafeDelayProps extends ServerSafeProps {
  delay?: number
}

/**
 * Wrapper Server-safe pour PageTransition
 * Fallback: Simple div wrapper
 */
export function ServerSafePageTransition({ children, className }: ServerSafeProps) {
  return <div className={cn("w-full", className)}>{children}</div>
}

/**
 * Wrapper Server-safe pour ScrollReveal
 * Fallback: Div sans animation mais visible
 */
export function ServerSafeScrollReveal({
  children,
  className,
  delay: _delay = 0
}: ServerSafeDelayProps) {
  return (
    <div className={cn("opacity-100", className)}>
      {children}
    </div>
  )
}

/**
 * Wrapper Server-safe pour AnimatedCard
 * Fallback: Card normale sans animation
 */
export function ServerSafeAnimatedCard({
  children,
  className,
  delay: _delay = 0
}: ServerSafeDelayProps) {
  return (
    <Card className={className}>
      {children}
    </Card>
  )
}

// Exports avec noms compatibles pour remplacement facile
export {
  ServerSafePageTransition as PageTransition,
  ServerSafeScrollReveal as ScrollReveal,
  ServerSafeAnimatedCard as AnimatedCard
}