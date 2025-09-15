"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Search, 
  FileX, 
  WifiOff, 
  AlertTriangle, 
  RefreshCw, 
  Plus,
  Inbox
} from "lucide-react"
import { MotionButton } from "./motion-button"
import { FadeInSection } from "./scroll-animations"

interface EmptyStateProps {
  type?: "no-results" | "no-data" | "error" | "offline" | "loading" | "404" | "custom"
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: "ghost" | "link"
  }
  illustration?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

/**
 * EmptyState - États empty/error illustrés avec CTA clairs
 * Implémente SHOULD #17 du plan interactions_transitions.md
 */
export function EmptyState({
  type = "no-data",
  title,
  description,
  icon,
  action,
  secondaryAction,
  illustration,
  className,
  size = "md",
}: EmptyStateProps) {
  // Icônes par défaut selon le type
  const defaultIcons = {
    "no-results": <Search className="w-12 h-12 text-muted-foreground" />,
    "no-data": <Inbox className="w-12 h-12 text-muted-foreground" />,
    "error": <AlertTriangle className="w-12 h-12 text-destructive" />,
    "offline": <WifiOff className="w-12 h-12 text-muted-foreground" />,
    "loading": <RefreshCw className="w-12 h-12 text-muted-foreground animate-spin" />,
    "404": <FileX className="w-12 h-12 text-muted-foreground" />,
    "custom": null,
  }

  // Tailles
  const sizeClasses = {
    sm: "py-8 px-4",
    md: "py-12 px-6", 
    lg: "py-16 px-8",
  }

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <FadeInSection
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizeClasses[size],
        className
      )}
    >
      {/* Illustration ou icône */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "backOut", delay: 0.1 }}
      >
        {illustration || (
          <div className={cn(
            "flex items-center justify-center rounded-full bg-muted/50 p-6",
            iconSizes[size]
          )}>
            {icon || defaultIcons[type]}
          </div>
        )}
      </motion.div>

      {/* Contenu textuel */}
      <motion.div
        className="max-w-md mx-auto space-y-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
      >
        <h3 className={cn(
          "font-semibold text-foreground",
          size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground leading-relaxed",
          size === "sm" ? "text-sm" : "text-base"
        )}>
          {description}
        </p>
      </motion.div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
        >
          {action && (
            <MotionButton
              onClick={action.onClick}
              variant={action.variant}
              className="min-w-[120px]"
            >
              {action.label}
            </MotionButton>
          )}
          
          {secondaryAction && (
            <MotionButton
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || "ghost"}
              className="min-w-[120px]"
            >
              {secondaryAction.label}
            </MotionButton>
          )}
        </motion.div>
      )}
    </FadeInSection>
  )
}

/**
 * LoadingState - État de chargement avec animation
 */
export function LoadingState({
  message = "Chargement en cours...",
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <EmptyState
      type="loading"
      title={message}
      description="Veuillez patienter quelques instants"
      className={className}
      icon={
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-8 h-8 text-primary" />
        </motion.div>
      }
    />
  )
}

/**
 * ErrorState - État d'erreur avec retry
 */
export function ErrorState({
  title = "Une erreur est survenue",
  description = "Nous n'avons pas pu charger ces informations.",
  onRetry,
  onGoBack,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  onGoBack?: () => void
  className?: string
}) {
  return (
    <EmptyState
      type="error"
      title={title}
      description={description}
      className={className}
      action={onRetry ? {
        label: "Réessayer",
        onClick: onRetry,
        variant: "default"
      } : undefined}
      secondaryAction={onGoBack ? {
        label: "Retour",
        onClick: onGoBack,
        variant: "ghost"
      } : undefined}
    />
  )
}

/**
 * NoResultsState - Aucun résultat trouvé
 */
export function NoResultsState({
  query,
  onClearSearch,
  onGoBack,
  className,
}: {
  query?: string
  onClearSearch?: () => void
  onGoBack?: () => void
  className?: string
}) {
  return (
    <EmptyState
      type="no-results"
      title={query ? `Aucun résultat pour "${query}"` : "Aucun résultat trouvé"}
      description="Essayez avec d'autres mots-clés ou vérifiez l'orthographe."
      className={className}
      action={onClearSearch ? {
        label: "Effacer la recherche",
        onClick: onClearSearch,
        variant: "outline"
      } : undefined}
      secondaryAction={onGoBack ? {
        label: "Retour",
        onClick: onGoBack,
        variant: "ghost"
      } : undefined}
    />
  )
}

/**
 * EmptyDataState - Aucune donnée disponible
 */
export function EmptyDataState({
  entityName = "éléments",
  onCreateNew,
  onRefresh,
  className,
}: {
  entityName?: string
  onCreateNew?: () => void
  onRefresh?: () => void
  className?: string
}) {
  return (
    <EmptyState
      type="no-data"
      title={`Aucun ${entityName} pour le moment`}
      description={`Vous n'avez pas encore de ${entityName}. Commencez par en créer un !`}
      className={className}
      action={onCreateNew ? {
        label: `Créer ${entityName}`,
        onClick: onCreateNew,
        variant: "default"
      } : undefined}
      secondaryAction={onRefresh ? {
        label: "Actualiser",
        onClick: onRefresh,
        variant: "ghost"
      } : undefined}
      icon={<Plus className="w-12 h-12 text-muted-foreground" />}
    />
  )
}

/**
 * Page404State - Page non trouvée
 */
export function Page404State({
  onGoHome,
  onGoBack,
  className,
}: {
  onGoHome?: () => void
  onGoBack?: () => void
  className?: string
}) {
  return (
    <EmptyState
      type="404"
      title="Page non trouvée"
      description="La page que vous recherchez n'existe pas ou a été déplacée."
      className={className}
      size="lg"
      action={onGoHome ? {
        label: "Retour à l'accueil",
        onClick: onGoHome,
        variant: "default"
      } : undefined}
      secondaryAction={onGoBack ? {
        label: "Page précédente",
        onClick: onGoBack,
        variant: "ghost"
      } : undefined}
      illustration={
        <motion.div
          className="text-8xl font-bold text-muted-foreground/20"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          404
        </motion.div>
      }
    />
  )
}
