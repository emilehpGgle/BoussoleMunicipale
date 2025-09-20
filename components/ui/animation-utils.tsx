"use client"

import { motion, Variants } from 'framer-motion'
import { ReactNode } from "react"
import React from "react"

// Variants d'animation pour différents effets
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export const slideInFromLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export const slideInFromRight: Variants = {
  initial: {
    opacity: 0,
    x: 30
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// Micro-interactions
export const buttonTap = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 }
}

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Composants d'animation réutilisables

// Transition de page
export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// Liste avec animation en cascade
export const StaggeredList = ({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Carte animée avec effets hover
export const AnimatedCard = ({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => {
  return (
    <motion.div
      variants={fadeInScale}
      initial="initial"
      animate="animate"
      whileHover={{
        y: -4,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={{
        delay,
        duration: 0.3
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Barre de progression animée
export const AnimatedProgress = ({
  value,
  className = ""
}: {
  value: number
  className?: string
}) => {
  return (
    <div className={`relative w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-midnight-green to-teal-main-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
      />
    </div>
  )
}

// Animation déclenchée par le scroll
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Compteur animé
export const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = ""
}: {
  value: number
  duration?: number
  suffix?: string
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  )
}

// Bouton avec micro-interactions
export const AnimatedButton = ({
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  id,
  name,
  value,
  form,
  title,
  tabIndex,
  role,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  "aria-expanded": ariaExpanded,
  "aria-describedby": ariaDescribedBy
}: {
  children: ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  id?: string
  name?: string
  value?: string | ReadonlyArray<string> | number
  form?: string
  title?: string
  tabIndex?: number
  role?: string
  "aria-label"?: string
  "aria-pressed"?: boolean
  "aria-expanded"?: boolean
  "aria-describedby"?: string
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      id={id}
      name={name}
      value={value}
      form={form}
      title={title}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </motion.button>
  )
}