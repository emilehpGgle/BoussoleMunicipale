"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Check, X, AlertCircle, Eye, EyeOff } from "lucide-react"

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
  helperText?: string
  icon?: React.ReactNode
  onValidate?: (value: string) => Promise<boolean | string>
}

/**
 * FloatingInput - Input avec label flottant et validation inline
 * Implémente MUST #5 du plan interactions_transitions.md
 */
export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, success, helperText, icon, type, onValidate, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const [isValidating, setIsValidating] = React.useState(false)
    const [validationError, setValidationError] = React.useState<string>("")
    const [isValid, setIsValid] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    
    const inputRef = React.useRef<HTMLInputElement>(null)
    const mergedRef = React.useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node
        if (ref) {
          if (typeof ref === "function") {
            ref(node)
          } else {
            ref.current = node
          }
        }
      },
      [ref]
    )

    const isPassword = type === "password"
    const actualType = isPassword && showPassword ? "text" : type

    // Check if input has value
    React.useEffect(() => {
      if (inputRef.current) {
        setHasValue(!!inputRef.current.value)
      }
    }, [props.value, props.defaultValue])

    // Handle validation
    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      
      if (onValidate && e.target.value) {
        setIsValidating(true)
        try {
          const result = await onValidate(e.target.value)
          if (typeof result === "string") {
            setValidationError(result)
            setIsValid(false)
          } else {
            setIsValid(result)
            setValidationError("")
          }
        } catch {
          setValidationError("Erreur de validation")
          setIsValid(false)
        } finally {
          setIsValidating(false)
        }
      }

      props.onBlur?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      // Clear validation on change
      if (validationError) {
        setValidationError("")
        setIsValid(false)
      }
      props.onChange?.(e)
    }

    const displayError = error || validationError
    const showSuccess = success || isValid

    return (
      <div className="relative">
        <div className="relative">
          {/* Icon gauche */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            type={actualType}
            className={cn(
              "peer w-full rounded-md border px-3 pb-2 pt-6 text-sm",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              icon && "pl-10",
              isPassword && "pr-10",
              // États
              displayError && "border-destructive focus:ring-destructive/20",
              showSuccess && "border-green-500 focus:ring-green-500/20",
              !displayError && !showSuccess && "border-input focus:ring-ring",
              className
            )}
            ref={mergedRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=" "
            {...props}
          />

          {/* Label flottant */}
          <motion.label
            className={cn(
              "absolute left-3 text-muted-foreground transition-all duration-200 pointer-events-none",
              icon && "left-10",
              isFocused || hasValue || props.value || props.defaultValue
                ? "top-2 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm"
            )}
            animate={{
              y: isFocused || hasValue || props.value || props.defaultValue ? 0 : 0,
              color: isFocused 
                ? displayError 
                  ? "hsl(var(--destructive))" 
                  : showSuccess 
                  ? "#22c55e" 
                  : "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>

          {/* Validation icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Password toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Validation state */}
            <AnimatePresence mode="wait">
              {isValidating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </motion.div>
              )}
              {!isValidating && displayError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-4 h-4 text-destructive" />
                </motion.div>
              )}
              {!isValidating && showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Helper text / Error message */}
        <AnimatePresence mode="wait">
          {(displayError || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "mt-1 text-xs flex items-center gap-1",
                displayError ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {displayError && <AlertCircle className="w-3 h-3" />}
              {displayError || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

FloatingInput.displayName = "FloatingInput"

/**
 * FloatingTextarea - Textarea avec label flottant
 */
export const FloatingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string
    error?: string
    helperText?: string
  }
>(({ className, label, error, helperText, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  return (
    <div className="relative">
      <textarea
        className={cn(
          "peer w-full rounded-md border px-3 pb-2 pt-6 text-sm resize-none",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          error ? "border-destructive focus:ring-destructive/20" : "border-input focus:ring-ring",
          className
        )}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          setHasValue(!!e.target.value)
          props.onChange?.(e)
        }}
        placeholder=" "
        {...props}
      />

      <motion.label
        className={cn(
          "absolute left-3 text-muted-foreground transition-all duration-200 pointer-events-none",
          isFocused || hasValue || props.value || props.defaultValue
            ? "top-2 text-xs"
            : "top-4 text-sm"
        )}
        animate={{
          color: isFocused 
            ? error 
              ? "hsl(var(--destructive))" 
              : "hsl(var(--primary))"
            : "hsl(var(--muted-foreground))",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>

      {(error || helperText) && (
        <p className={cn(
          "mt-1 text-xs",
          error ? "text-destructive" : "text-muted-foreground"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

FloatingTextarea.displayName = "FloatingTextarea"
