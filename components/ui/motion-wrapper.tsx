"use client"

import React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import Image, { ImageProps } from "next/image"

interface MotionSectionProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "fade" | "slideLeft" | "slideRight" | "slideUp" | "slideDown"
  delay?: number
  className?: string
  children: React.ReactNode
}

/**
 * Section avec animation d'entrée au scroll - wrapper simple autour de motion.div
 */
export function MotionSection({
  children,
  className,
  variant = "default",
  delay = 0,
  ...props
}: MotionSectionProps) {
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

  const animationProps = getAnimationConfig()

  return (
    <motion.div
      className={cn(className)}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface MotionCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  interactive?: boolean
  delay?: number
  className?: string
  children: React.ReactNode
}

/**
 * Card avec animation d'entrée et interactions hover - wrapper motion.div
 */
export function MotionCard({
  children,
  className,
  interactive = false,
  delay = 0,
  ...props
}: MotionCardProps) {
  const { getScrollConfig } = useScrollAnimation()

  const interactiveProps = interactive ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <motion.div
      className={cn(className)}
      {...getScrollConfig(delay)}
      {...interactiveProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}

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
export function MotionImageWrapper({
  src,
  alt,
  delay = 0,
  enableHover = false,
  className,
  imageProps = {},
  ...props
}: MotionImageWrapperProps) {
  const { getScrollConfig } = useScrollAnimation()

  const hoverProps = enableHover ? {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      {...getScrollConfig(delay)}
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
}