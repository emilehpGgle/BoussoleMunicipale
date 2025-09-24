"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Compass } from "lucide-react"

interface PrimaryButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "white"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
  showCompass?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  form?: string
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>((
  {
    children,
    className,
    variant = "default",
    size = "md",
    asChild = false,
    showCompass = false,
    ...props
  },
  ref
) => {
  // Pas besoin de filtrer - Slot et motion.button gèrent les props automatiquement

  const Comp = asChild ? Slot : motion.button

  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group"

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  }

  const variantStyles = {
    default: cn(
      // Base gradient background
      "bg-gradient-to-r from-midnight-green to-teal-main-600",
      "text-white",
      // Hover effect with shadow elevation
      "hover:shadow-xl hover:shadow-midnight-green/20",
      "hover:from-midnight-green hover:to-teal-main-500",
      // Focus states
      "focus-visible:ring-midnight-green",
      // Subtle inner glow on hover
      "before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
    ),
    outline: cn(
      "border-2 border-midnight-green text-midnight-green",
      "bg-white hover:bg-gradient-to-r hover:from-midnight-green hover:to-teal-main-600",
      "hover:text-white hover:border-transparent",
      "hover:shadow-lg hover:shadow-midnight-green/20",
      "focus-visible:ring-midnight-green"
    ),
    white: cn(
      "bg-white text-midnight-green",
      "border-2 border-white",
      "hover:bg-gray-50 hover:shadow-lg hover:shadow-black/10",
      "focus-visible:ring-white",
      "dark:bg-white dark:text-midnight-green"
    )
  }

  const motionProps = !asChild ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  } : {}

  // Logique conditionnelle intelligente : pas de compass avec asChild pour éviter React.Children.only
  const shouldShowCompass = showCompass && !asChild

  return (
    <Comp
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...(asChild ? props : { ...props, ...motionProps })}
    >
      {shouldShowCompass && (
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        >
          <Compass className={cn(
            "w-5 h-5",
            size === "sm" && "w-4 h-4",
            size === "lg" && "w-6 h-6"
          )} />
        </motion.div>
      )}
      {children}
      {/* Subtle shimmer effect on hover - only for default variant and not asChild */}
      {variant === "default" && !asChild && (
        <div className="absolute inset-0 -top-2 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Comp>
  )
})

PrimaryButton.displayName = "PrimaryButton"