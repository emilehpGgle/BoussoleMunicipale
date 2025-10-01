"use client"

import React from "react"
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from "@/lib/utils"

// Variants d'animation optimisées pour performance (réduit forced layouts)
// Utilise x/y au lieu de transform pour compatibilité framer-motion
const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24, // Réduit pour meilleure performance
      ease: "easeOut",
    },
  },
}

const slideVariants: Variants = {
  hidden: (direction: string) => ({
    opacity: 0,
    x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.28, // Réduit pour performance
      ease: "easeOut",
    },
  },
}

const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.26,
      ease: "easeOut", // Changé pour réduire forced layouts
    },
  },
}

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
  amount?: number
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale"
}

/**
 * FadeInSection - Animation d'entrée au scroll
 * Implémente MUST #6 du plan interactions_transitions.md
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
  variant = "fade",
}: ScrollAnimationProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, amount })

  const getVariants = () => {
    switch (variant) {
      case "scale":
        return scaleVariants
      case "slide-up":
      case "slide-down":
      case "slide-left":
      case "slide-right":
        return slideVariants
      default:
        return fadeInVariants
    }
  }

  const customValue = variant.includes("slide") ? variant.split("-")[1] : undefined

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      custom={customValue}
      transition={{ delay }}
      style={{ willChange: isInView ? "transform, opacity" : "auto" }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggeredList - Liste avec animation échelonnée
 * Stagger de 60-90ms comme recommandé
 */
export function StaggeredList({
  children,
  className,
  staggerDelay = 0.07, // 70ms par défaut
  once = true,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.26,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ willChange: isInView ? "opacity" : "auto" }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{ willChange: isInView ? "transform, opacity" : "auto" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

/**
 * ParallaxSection - Parallaxe légère pour headers/hero
 * SHOULD #14 - Déplacement max 8px
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
}) {
  const [offsetY, setOffsetY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      // Limite le déplacement à 8px max comme recommandé
      const offset = Math.min(window.scrollY * speed, 8)
      setOffsetY(offset)
    }

    // Vérifier prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    
    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <motion.div
      className={cn(className)}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
