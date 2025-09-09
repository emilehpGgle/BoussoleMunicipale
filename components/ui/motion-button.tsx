"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-midnight-green text-white hover:bg-midnight-green/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-white hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-white text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-midnight-green underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Interface spécifique pour les props Motion-safe
interface MotionButtonProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  form?: string
  ariaLabel?: string
  // Ajoutez d'autres props nécessaires ici
}

// Animation configurations selon le plan interactions_transitions.md
const animationConfig = {
  hover: {
    scale: 1.02,
    y: -1,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.12, // 120ms micro-press
      ease: "easeIn" as const,
    },
  },
  transition: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
}

/**
 * MotionButton - Bouton avec animations Framer Motion fluides
 * Respecte le plan interactions_transitions.md MUST #1 et #2
 */
export const MotionButton = React.forwardRef<
  HTMLButtonElement,
  MotionButtonProps
>(({ 
  className, 
  variant, 
  size, 
  disabled = false, 
  children, 
  onClick,
  type = "button",
  form,
  ariaLabel,
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      form={form}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      whileHover={disabled ? undefined : animationConfig.hover}
      whileTap={disabled ? undefined : animationConfig.tap}
      transition={animationConfig.transition}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
})

MotionButton.displayName = "MotionButton"

/**
 * MotionCard - Card interactive avec animations
 * Pour les cards cliquables du site
 */
export const MotionCard = React.forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode
    className?: string
    onClick?: () => void
    interactive?: boolean
  }
>(({ children, className, onClick, interactive = true }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg bg-white shadow-sm",
        interactive && "cursor-pointer",
        className
      )}
      onClick={onClick}
      whileHover={
        interactive
          ? {
              scale: 1.02,
              y: -2,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      whileTap={
        interactive
          ? {
              scale: 0.98,
              transition: { duration: 0.15 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
})

MotionCard.displayName = "MotionCard"

/**
 * MotionLink - Lien avec animation subtile
 */
export const MotionLink = React.forwardRef<
  HTMLAnchorElement,
  {
    children?: React.ReactNode
    className?: string
    href: string
  }
>(({ children, className, href }, ref) => {
  return (
    <motion.a
      ref={ref}
      href={href}
      className={cn(
        "text-midnight-green underline-offset-4 transition-colors",
        className
      )}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.a>
  )
})

MotionLink.displayName = "MotionLink"
