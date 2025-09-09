"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

/**
 * Skeleton - Loader avec effet shimmer
 * Implémente MUST #3 du plan interactions_transitions.md
 */
function Skeleton({
  className,
  shimmer = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { shimmer?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </div>
  )
}

/**
 * SkeletonCard - Carte skeleton préfabriquée
 */
function SkeletonCard() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

/**
 * SkeletonText - Lignes de texte skeleton
 */
function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{
            width: `${100 - Math.random() * 20}%`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * SkeletonAvatar - Avatar skeleton
 */
function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return <Skeleton className={cn("rounded-full", sizeClasses[size])} />
}

/**
 * SkeletonButton - Bouton skeleton
 */
function SkeletonButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-20",
    md: "h-10 w-24",
    lg: "h-12 w-32",
  }

  return <Skeleton className={cn("rounded-md", sizeClasses[size])} />
}

/**
 * ContentLoader - Wrapper pour afficher skeleton pendant le chargement
 */
function ContentLoader({
  isLoading,
  children,
  skeleton,
  fadeDuration = 0.3,
}: {
  isLoading: boolean
  children: React.ReactNode
  skeleton: React.ReactNode
  fadeDuration?: number
}) {
  return (
    <>
      {isLoading ? (
        skeleton
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeDuration }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  ContentLoader,
}