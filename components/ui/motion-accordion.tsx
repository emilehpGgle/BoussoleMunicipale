"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from "@/lib/animation-config"

interface AccordionItemData {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface MotionAccordionProps {
  items: AccordionItemData[]
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  className?: string
  itemClassName?: string
  contentClassName?: string
  triggerClassName?: string
  iconPosition?: "left" | "right"
  animationDuration?: number
}

/**
 * MotionAccordion - Accordéon avec hauteur auto animée
 * Implémente SHOULD #12 du plan interactions_transitions.md
 * Transition hauteur ≈260ms, icône chevron pivot
 */
export function MotionAccordion({
  items,
  type = "single",
  defaultValue,
  className,
  itemClassName,
  contentClassName,
  triggerClassName,
  iconPosition = "right",
  animationDuration = ANIMATION_DURATIONS.normal,
}: MotionAccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (type === "single" && typeof defaultValue === "string") {
      return new Set([defaultValue])
    }
    if (type === "multiple" && Array.isArray(defaultValue)) {
      return new Set(defaultValue)
    }
    return new Set()
  })

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      
      if (type === "single") {
        // Mode single : fermer tous les autres
        if (newSet.has(itemId)) {
          newSet.clear()
        } else {
          newSet.clear()
          newSet.add(itemId)
        }
      } else {
        // Mode multiple : toggle individuel
        if (newSet.has(itemId)) {
          newSet.delete(itemId)
        } else {
          newSet.add(itemId)
        }
      }
      
      return newSet
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          className={itemClassName}
          contentClassName={contentClassName}
          triggerClassName={triggerClassName}
          iconPosition={iconPosition}
          animationDuration={animationDuration}
        />
      ))}
    </div>
  )
}

/**
 * AccordionItem - Item individuel d'accordéon
 */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  className,
  contentClassName,
  triggerClassName,
  iconPosition,
  animationDuration,
}: {
  item: AccordionItemData
  isOpen: boolean
  onToggle: () => void
  className?: string
  contentClassName?: string
  triggerClassName?: string
  iconPosition?: "left" | "right"
  animationDuration?: number
}) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = React.useState<number | "auto">(0)

  // Mesurer la hauteur du contenu
  React.useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const height = contentRef.current.scrollHeight
        setContentHeight(height)
      } else {
        setContentHeight(0)
      }
    }
  }, [isOpen, item.content])

  // Animation de l'icône chevron
  const iconVariants = {
    closed: { rotate: iconPosition === "left" ? 0 : 0 },
    open: { rotate: iconPosition === "left" ? 90 : 180 },
  }

  return (
    <motion.div
      className={cn(
        "border border-border rounded-lg overflow-hidden",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
        className
      )}
      layout
    >
      {/* Trigger Button */}
      <motion.button
        className={cn(
          "w-full px-4 py-3 text-left font-medium",
          "hover:bg-accent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:bg-accent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "flex items-center justify-between gap-3",
          triggerClassName
        )}
        onClick={onToggle}
        disabled={item.disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
        whileHover={{ backgroundColor: "hsl(var(--accent))" }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.15 }}
      >
        {/* Icône à gauche */}
        {iconPosition === "left" && (
          <motion.div
            variants={iconVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: (animationDuration || ANIMATION_DURATIONS.normal) / 1000, ease: ANIMATION_EASINGS.easeOut }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}

        {/* Titre */}
        <span className="flex-1">{item.title}</span>

        {/* Icône à droite */}
        {iconPosition === "right" && (
          <motion.div
            variants={iconVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: (animationDuration || ANIMATION_DURATIONS.normal) / 1000, ease: ANIMATION_EASINGS.easeOut }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </motion.button>

      {/* Content avec animation de hauteur */}
      <motion.div
        className="overflow-hidden"
        animate={{
          height: contentHeight,
        }}
        transition={{
          duration: (animationDuration || ANIMATION_DURATIONS.normal) / 1000,
          ease: ANIMATION_EASINGS.easeOut,
        }}
      >
        <div
          ref={contentRef}
          id={`accordion-content-${item.id}`}
          className={cn("px-4 pb-4", contentClassName)}
        >
          {/* Animation du contenu */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: ((animationDuration || ANIMATION_DURATIONS.normal) * 0.8) / 1000, // Légèrement plus rapide
                  ease: ANIMATION_EASINGS.easeOut,
                  delay: 0.1, // Petit délai pour l'ouverture
                }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * FAQ Accordion - Accordéon préconfiguré pour FAQ
 */
export function FAQAccordion({
  faqs,
  className,
}: {
  faqs: Array<{ question: string; answer: React.ReactNode }>
  className?: string
}) {
  const items: AccordionItemData[] = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: (
      <div className="text-muted-foreground leading-relaxed">
        {faq.answer}
      </div>
    ),
  }))

  return (
    <MotionAccordion
      items={items}
      type="single"
      className={className}
      itemClassName="border-border/50"
      triggerClassName="hover:bg-accent/50"
    />
  )
}

/**
 * FeatureAccordion - Accordéon pour présenter des fonctionnalités
 */
export function FeatureAccordion({
  features,
  className,
}: {
  features: Array<{
    title: string
    description: string
    details: React.ReactNode
    icon?: React.ReactNode
  }>
  className?: string
}) {
  const items: AccordionItemData[] = features.map((feature, index) => ({
    id: `feature-${index}`,
    title: feature.title,
    content: feature.details,
  }))

  return (
    <MotionAccordion
      items={items}
      type="multiple"
      className={className}
      itemClassName="bg-card"
      iconPosition="right"
    />
  )
}
