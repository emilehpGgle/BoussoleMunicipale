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
      subtle: "text-teal-main-400/70",
      medium: "text-teal-main-400",
      bold: "text-teal-main-500 font-semibold"
    },
    accent: {
      subtle: "text-teal-special/70",
      medium: "text-teal-special",
      bold: "text-teal-special font-semibold"
    },
    gradient: {
      subtle: "bg-gradient-to-r from-midnight-green/70 to-teal-main-400/70 bg-clip-text text-transparent",
      medium: "bg-gradient-to-r from-midnight-green to-teal-main-400 bg-clip-text text-transparent",
      bold: "bg-gradient-to-r from-midnight-green to-teal-main-500 bg-clip-text text-transparent font-semibold"
    },
    rainbow: {
      subtle: "bg-gradient-to-r from-midnight-green/70 via-teal-main-400/70 to-teal-special/70 bg-clip-text text-transparent",
      medium: "bg-gradient-to-r from-midnight-green via-teal-main-400 to-teal-special bg-clip-text text-transparent",
      bold: "bg-gradient-to-r from-midnight-green via-teal-main-400 to-teal-special bg-clip-text text-transparent font-semibold"
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
      "before:bg-gradient-to-r before:from-midnight-green/10 before:to-teal-main-400/10",
      "before:rounded-md before:px-1 before:-mx-1",
      "text-midnight-green font-medium",
      className
    )}>
      {children}
    </span>
  )
} 