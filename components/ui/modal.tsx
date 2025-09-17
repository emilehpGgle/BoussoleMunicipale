"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  position?: "center" | "top" | "bottom"
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
}

/**
 * Modal - Système de modales avec overlay et blur
 * Implémente MUST #7 du plan interactions_transitions.md
 */
export function Modal({
  open,
  onClose,
  children,
  title,
  description,
  size = "md",
  position = "center",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false)

  // Gérer la touche Escape
  React.useEffect(() => {
    if (!closeOnEscape || !open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose, closeOnEscape])

  // Focus trap
  React.useEffect(() => {
    if (!open) return

    const previousActiveElement = document.activeElement as HTMLElement
    
    // Focus le premier élément focusable
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        const focusable = modal.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.focus()
      }
    }, 100)

    return () => {
      previousActiveElement?.focus()
    }
  }, [open])

  // Bloquer le scroll du body
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  // Portal mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[90vw]",
  }

  const positionClasses = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-20",
    bottom: "items-end justify-center pb-20",
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Overlay avec blur */}
          <motion.div
            className={cn(
              "fixed inset-0 bg-black/40 backdrop-blur-sm z-50",
              overlayClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Container Modal */}
          <div
            className={cn(
              "fixed inset-0 z-50 flex p-4",
              positionClasses[position]
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          >
            {/* Modal Content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
              aria-describedby={description ? "modal-description" : undefined}
              className={cn(
                "relative w-full bg-white rounded-xl shadow-xl",
                sizeClasses[size],
                className
              )}
              initial={{ 
                opacity: 0, 
                scale: position === "center" ? 0.95 : 1,
                y: position === "top" ? -20 : position === "bottom" ? 20 : 0
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: position === "center" ? 0.95 : 1,
                y: position === "top" ? -20 : position === "bottom" ? 20 : 0
              }}
              transition={{ 
                duration: 0.2, 
                ease: [0.25, 0.8, 0.25, 1]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b">
                  <div className="flex-1">
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-description" className="mt-1 text-sm text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className="ml-4 p-1 rounded-md hover:bg-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Fermer"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={cn(
                "p-6",
                !title && !showCloseButton && "relative"
              )}>
                {!title && showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-md hover:bg-accent transition-colors z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )

  // Utiliser un portal pour rendre la modal en dehors du DOM parent
  if (!mounted) return null
  
  return createPortal(modalContent, document.body)
}

/**
 * ModalFooter - Footer pour les actions de la modal
 */
export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      "flex items-center justify-end gap-3 px-6 py-4 border-t",
      className
    )}>
      {children}
    </div>
  )
}

/**
 * useModal - Hook pour gérer l'état d'une modal
 */
export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), [])

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}
