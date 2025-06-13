'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ColoredTextProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'gradient' | 'rainbow'
  className?: string
  intensity?: 'subtle' | 'medium' | 'bold'
}

export function ColoredText({ 
  children, 
  variant = 'primary', 
  className,
  intensity = 'medium'
}: ColoredTextProps) {
  const baseClasses = "transition-colors duration-300"
  
  const variantClasses = {
    primary: {
      subtle: "text-primary/70",
      medium: "text-primary",
      bold: "text-primary font-semibold"
    },
    secondary: {
      subtle: "text-blue-500/70",
      medium: "text-blue-500",
      bold: "text-blue-600 font-semibold"
    },
    accent: {
      subtle: "text-teal-500/70",
      medium: "text-teal-500",
      bold: "text-teal-600 font-semibold"
    },
    gradient: {
      subtle: "bg-gradient-to-r from-primary/70 to-blue-500/70 bg-clip-text text-transparent",
      medium: "bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent",
      bold: "bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-semibold"
    },
    rainbow: {
      subtle: "bg-gradient-to-r from-primary/70 via-blue-500/70 to-teal-500/70 bg-clip-text text-transparent",
      medium: "bg-gradient-to-r from-primary via-blue-500 to-teal-500 bg-clip-text text-transparent",
      bold: "bg-gradient-to-r from-primary via-blue-500 to-teal-600 bg-clip-text text-transparent font-semibold"
    }
  }

  return (
    <span className={cn(
      baseClasses,
      variantClasses[variant][intensity],
      className
    )}>
      {children}
    </span>
  )
}

// Composant pour des mots-clés avec effet de surbrillance subtile
export function HighlightText({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <span className={cn(
      "relative inline-block",
      "before:absolute before:inset-0 before:-z-10",
      "before:bg-gradient-to-r before:from-primary/10 before:to-blue-500/10",
      "before:rounded-md before:px-1 before:-mx-1",
      "text-primary font-medium",
      className
    )}>
      {children}
    </span>
  )
} 