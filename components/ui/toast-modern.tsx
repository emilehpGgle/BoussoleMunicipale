"use client"

import * as React from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

// Types
export type ToastType = "success" | "error" | "warning" | "info"
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  position: ToastPosition
  setPosition: (position: ToastPosition) => void
}

// Context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

/**
 * ToastProvider - Provider pour le système de toasts
 * Implémente SHOULD #15 du plan interactions_transitions.md
 */
export function ToastProvider({
  children,
  defaultPosition = "bottom-right",
}: {
  children: React.ReactNode
  defaultPosition?: ToastPosition
}) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const [position, setPosition] = React.useState<ToastPosition>(defaultPosition)

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss après la durée spécifiée (3-5s par défaut)
    const duration = toast.duration || (toast.type === "error" ? 5000 : 3000)
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, position, setPosition }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

/**
 * useToast - Hook pour utiliser le système de toasts
 */
export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

/**
 * ToastContainer - Container pour afficher les toasts
 */
function ToastContainer() {
  const { toasts, removeToast, position } = useToast()

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }

  const animationVariants = {
    "top-right": {
      initial: { opacity: 0, x: 100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 100, scale: 0.9 },
    },
    "top-left": {
      initial: { opacity: 0, x: -100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -100, scale: 0.9 },
    },
    "bottom-right": {
      initial: { opacity: 0, x: 100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 100, scale: 0.9 },
    },
    "bottom-left": {
      initial: { opacity: 0, x: -100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -100, scale: 0.9 },
    },
    "top-center": {
      initial: { opacity: 0, y: -50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -50, scale: 0.9 },
    },
    "bottom-center": {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 50, scale: 0.9 },
    },
  }

  return (
    <div
      className={cn(
        "fixed z-[100] flex flex-col gap-3 pointer-events-none",
        positionClasses[position],
        position.includes("center") ? "items-center" : ""
      )}
      style={{ maxWidth: position.includes("center") ? "90vw" : "420px" }}
    >
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
            animation={animationVariants[position]}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * ToastItem - Composant pour un toast individuel
 */
function ToastItem({
  toast,
  onClose,
  animation,
}: {
  toast: Toast
  onClose: () => void
  animation: {
    initial: { opacity: number; x?: number; y?: number; scale: number }
    animate: { opacity: number; x?: number; y?: number; scale: number }
    exit: { opacity: number; x?: number; y?: number; scale: number }
  }
}) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors = {
    success: "text-green-600 bg-green-50 border-green-200",
    error: "text-red-600 bg-red-50 border-red-200",
    warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
    info: "text-blue-600 bg-blue-50 border-blue-200",
  }

  return (
    <motion.div
      layout
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "pointer-events-auto flex items-start gap-3 w-full max-w-md p-4 rounded-lg border shadow-lg bg-white",
        colors[toast.type]
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {icons[toast.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">
          {toast.title}
        </p>
        {toast.description && (
          <p className="mt-1 text-sm opacity-90">
            {toast.description}
          </p>
        )}
        {toast.action && (
          <motion.button
            className="mt-2 text-sm font-medium underline-offset-2 hover:underline"
            onClick={toast.action.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {toast.action.label}
          </motion.button>
        )}
      </div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

/**
 * Fonction helper pour créer des toasts rapidement
 */
export const toast = {
  success: (title: string, description?: string) => {
    // Cette fonction sera remplacée par le provider
    console.log("Toast success:", title, description)
  },
  error: (title: string, description?: string) => {
    console.log("Toast error:", title, description)
  },
  warning: (title: string, description?: string) => {
    console.log("Toast warning:", title, description)
  },
  info: (title: string, description?: string) => {
    console.log("Toast info:", title, description)
  },
}
