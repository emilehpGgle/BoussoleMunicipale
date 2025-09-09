"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from "@/lib/animation-config"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  variant?: "fade" | "slide" | "scale" | "none"
  duration?: number
}

/**
 * PageTransition - Transitions entre pages/routes  
 * Implémente SHOULD #13 du plan interactions_transitions.md
 * Fade/slide discret <280ms, navbar persistante
 */
export function PageTransition({
  children,
  className,
  variant = "fade",
  duration = ANIMATION_DURATIONS.normal,
}: PageTransitionProps) {
  const pathname = usePathname()

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  }

  const selectedVariant = variants[variant]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={cn("w-full", className)}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{
          duration: duration / 1000,
          ease: ANIMATION_EASINGS.easeOut,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * RouteTransition - Transition spécifique pour changements de route
 */
export function RouteTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  
  // Différents types de transitions selon les routes
  const getTransitionVariant = (path: string) => {
    if (path === "/") return "fade"
    if (path.startsWith("/questionnaire")) return "slide"
    if (path.startsWith("/resultats")) return "scale"
    return "fade"
  }

  return (
    <PageTransition
      variant={getTransitionVariant(pathname)}
      className={className}
      duration={250} // Plus rapide pour les routes
    >
      {children}
    </PageTransition>
  )
}

/**
 * ModalTransition - Transition pour modales et overlays
 */
export function ModalTransition({
  isOpen,
  children,
  onClose,
  position = "center",
}: {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
  position?: "center" | "top" | "bottom" | "right" | "left"
}) {
  const variants = {
    center: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    top: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
    bottom: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    right: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
    left: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.overlay / 1000 }}
            onClick={onClose}
          />
          
          {/* Contenu */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            {...variants[position]}
            transition={{
              duration: ANIMATION_DURATIONS.modal / 1000,
              ease: ANIMATION_EASINGS.easeOutStandard,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * TabTransition - Transition pour onglets
 */
export function TabTransition({
  activeTab,
  children,
  direction = "horizontal",
}: {
  activeTab: string
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
}) {
  const variants = {
    horizontal: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    vertical: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        {...variants[direction]}
        transition={{
          duration: ANIMATION_DURATIONS.fast / 1000,
          ease: ANIMATION_EASINGS.easeOut,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * ListTransition - Transition pour listes (ajout/suppression)
 */
export function ListTransition<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  staggerDelay = ANIMATION_DURATIONS.stagger,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay / 1000,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={keyExtractor(item)}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: ANIMATION_DURATIONS.normal / 1000,
              ease: ANIMATION_EASINGS.easeOut,
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * ProgressTransition - Transition de progression (étapes)
 */
export function ProgressTransition({
  currentStep,
  totalSteps,
  children,
  className,
}: {
  currentStep: number
  totalSteps: number
  children: React.ReactNode
  className?: string
}) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("relative", className)}>
      {/* Barre de progression */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: ANIMATION_DURATIONS.normal / 1000,
          ease: ANIMATION_EASINGS.easeOut,
        }}
      />
      
      {/* Contenu avec transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{
            duration: ANIMATION_DURATIONS.fast / 1000,
            ease: ANIMATION_EASINGS.easeOut,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
