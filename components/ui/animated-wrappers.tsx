"use client"

import React from "react"
import { FadeInSection, StaggeredList, ParallaxSection } from "./scroll-animations"
import { cn } from "@/lib/utils"

// Types pour les props des wrappers
interface AnimatedWrapperProps {
  children: React.ReactNode
  className?: string
}

interface AnimatedDelayProps extends AnimatedWrapperProps {
  delay?: number
}

interface AnimatedVariantProps extends AnimatedWrapperProps {
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale"
  delay?: number
}

interface AnimatedStaggerProps extends AnimatedWrapperProps {
  staggerDelay?: number
}

interface AnimatedParallaxProps extends AnimatedWrapperProps {
  speed?: number
}

/**
 * Client Component wrappers pour animations
 * Pattern Next.js 15 : "Client Components to the leaves"
 *
 * Ces wrappers permettent aux Server Components d'avoir des animations
 * en passant le contenu server-rendered via children
 */

/**
 * Wrapper pour section hero avec animation parallaxe
 */
export function AnimatedHero({
  children,
  className,
  speed = 0.5,
}: AnimatedParallaxProps) {
  return (
    <ParallaxSection className={cn(className)} speed={speed}>
      {children}
    </ParallaxSection>
  )
}

/**
 * Wrapper pour sections avec animation fade-in
 */
export function AnimatedSection({
  children,
  className,
  variant = "fade",
  delay = 0,
}: AnimatedVariantProps) {
  return (
    <FadeInSection
      className={cn(className)}
      variant={variant}
      delay={delay}
    >
      {children}
    </FadeInSection>
  )
}

/**
 * Wrapper pour listes avec animation en cascade
 */
export function AnimatedCardList({
  children,
  className,
  staggerDelay = 0.07,
}: AnimatedStaggerProps) {
  return (
    <StaggeredList
      className={cn(className)}
      staggerDelay={staggerDelay}
    >
      {children}
    </StaggeredList>
  )
}

/**
 * Wrapper pour titre avec animation slide-up
 */
export function AnimatedTitle({
  children,
  className,
  delay = 0.1,
}: AnimatedDelayProps) {
  return (
    <FadeInSection
      className={cn(className)}
      variant="slide-up"
      delay={delay}
    >
      {children}
    </FadeInSection>
  )
}

/**
 * Wrapper pour contenu avec animation slide-right
 */
export function AnimatedContent({
  children,
  className,
  delay = 0.3,
}: AnimatedDelayProps) {
  return (
    <FadeInSection
      className={cn(className)}
      variant="slide-right"
      delay={delay}
    >
      {children}
    </FadeInSection>
  )
}

/**
 * Wrapper pour grille de cartes avec animation échelonnée
 */
export function AnimatedGrid({
  children,
  className,
  staggerDelay = 0.1,
}: AnimatedStaggerProps) {
  return (
    <StaggeredList
      className={cn("card-grid-standard", className)}
      staggerDelay={staggerDelay}
    >
      {children}
    </StaggeredList>
  )
}

/**
 * Wrapper pour statistiques avec animation scale
 */
export function AnimatedStats({
  children,
  className,
  delay = 0.2,
}: AnimatedDelayProps) {
  return (
    <FadeInSection
      className={cn(className)}
      variant="scale"
      delay={delay}
    >
      {children}
    </FadeInSection>
  )
}

/**
 * Wrapper pour call-to-action avec animation fade
 */
export function AnimatedCTA({
  children,
  className,
  delay = 0.4,
}: AnimatedDelayProps) {
  return (
    <FadeInSection
      className={cn(className)}
      variant="fade"
      delay={delay}
    >
      {children}
    </FadeInSection>
  )
}