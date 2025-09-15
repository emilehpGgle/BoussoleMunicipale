"use client"

import React, { forwardRef } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import Image, { ImageProps } from "next/image"

interface MotionSectionProps {
  variant?: "default" | "fade" | "slideLeft" | "slideRight" | "slideUp" | "slideDown"
  delay?: number
  className?: string
  children: React.ReactNode
}

/**
 * Section avec animation d'entrée au scroll - wrapper simple autour de motion.div
 */
export const MotionSection = forwardRef<HTMLDivElement, MotionSectionProps & Omit<HTMLMotionProps<"div">, keyof MotionSectionProps>>(({
  children,
  className,
  variant = "default",
  delay = 0,
  ...props
}, ref) => {
  const { getScrollConfig, getFadeConfig, getSlideConfig } = useScrollAnimation()

  const getAnimationConfig = () => {
    switch (variant) {
      case "fade":
        return getFadeConfig(delay)
      case "slideLeft":
        return getSlideConfig("left", delay)
      case "slideRight":
        return getSlideConfig("right", delay)
      case "slideUp":
        return getSlideConfig("up", delay)
      case "slideDown":
        return getSlideConfig("down", delay)
      default:
        return getScrollConfig(delay)
    }
  }

  const { ref: animationRef, ...animationProps } = getAnimationConfig()

  return (
    <motion.div
      ref={ref || animationRef}
      className={cn(className)}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  )
})

MotionSection.displayName = "MotionSection"

interface MotionCardProps {
  interactive?: boolean
  delay?: number
  className?: string
  children: React.ReactNode
}

/**
 * Card avec animation d'entrée et interactions hover - wrapper motion.div
 */
export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps & Omit<HTMLMotionProps<"div">, keyof MotionCardProps>>(({
  children,
  className,
  interactive = false,
  delay = 0,
  ...props
}, ref) => {
  const { getScrollConfig } = useScrollAnimation()

  const interactiveProps = interactive ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}

  const { ref: animationRef, ...animationProps } = getScrollConfig(delay)

  return (
    <motion.div
      ref={ref || animationRef}
      className={cn(className)}
      {...animationProps}
      {...interactiveProps}
      {...props}
    >
      {children}
    </motion.div>
  )
})

MotionCard.displayName = "MotionCard"

interface MotionImageWrapperProps {
  src: string
  alt: string
  delay?: number
  enableHover?: boolean
  className?: string
  imageProps?: Omit<ImageProps, "src" | "alt">
}

/**
 * Wrapper Motion autour de Next.js Image - évite les conflits de types
 */
export const MotionImageWrapper = forwardRef<HTMLDivElement, MotionImageWrapperProps & Omit<HTMLMotionProps<"div">, keyof MotionImageWrapperProps>>(({
  src,
  alt,
  delay = 0,
  enableHover = false,
  className,
  imageProps = {},
  ...props
}, ref) => {
  const { getScrollConfig } = useScrollAnimation()

  const hoverProps = enableHover ? {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 }
  } : {}

  const { ref: animationRef, ...animationProps } = getScrollConfig(delay)

  return (
    <motion.div
      ref={ref || animationRef}
      className={cn("overflow-hidden", className)}
      {...animationProps}
      {...hoverProps}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        {...imageProps}
      />
    </motion.div>
  )
})

MotionImageWrapper.displayName = "MotionImageWrapper"