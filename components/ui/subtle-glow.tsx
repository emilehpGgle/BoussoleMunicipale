'use client'

import { cn } from '@/lib/utils'
import { motion, Transition } from 'motion/react'

export type SubtleGlowProps = {
  className?: string
  style?: React.CSSProperties
  colors?: string[]
  mode?: 'static' | 'breathe' | 'pulse' | 'drift'
  intensity?: 'minimal' | 'subtle' | 'soft'
  blur?: 'soft' | 'medium' | 'strong'
  duration?: number
}

export function SubtleGlow({
  className,
  style,
  colors = ['#3B82F6', '#06B6D4', '#8B5CF6'], // Bleu, teal, violet subtils
  mode = 'breathe',
  intensity = 'subtle',
  blur = 'medium',
  duration = 8,
}: SubtleGlowProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'easeInOut',
  }

  // Intensités très réduites pour un effet discret
  const intensitySettings = {
    minimal: {
      opacity: [0.02, 0.04, 0.02],
      scale: [0.8, 0.85, 0.8],
    },
    subtle: {
      opacity: [0.03, 0.06, 0.03],
      scale: [0.9, 0.95, 0.9],
    },
    soft: {
      opacity: [0.05, 0.08, 0.05],
      scale: [0.95, 1.0, 0.95],
    }
  }

  const animations = {
    static: {
      background: `radial-gradient(circle at 50% 50%, ${colors[0]}15, transparent 70%)`,
      opacity: intensitySettings[intensity].opacity[0],
    },
    breathe: {
      background: [
        `radial-gradient(circle at 50% 50%, ${colors[0]}15, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[1]}15, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[0]}15, transparent 70%)`,
      ],
      opacity: intensitySettings[intensity].opacity,
      scale: intensitySettings[intensity].scale,
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror' as const,
      },
    },
    pulse: {
      background: `radial-gradient(circle at 50% 50%, ${colors[0]}15, transparent 70%)`,
      opacity: intensitySettings[intensity].opacity,
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror' as const,
      },
    },
    drift: {
      background: [
        `radial-gradient(circle at 30% 40%, ${colors[0]}15, transparent 70%)`,
        `radial-gradient(circle at 70% 60%, ${colors[1]}15, transparent 70%)`,
        `radial-gradient(circle at 40% 70%, ${colors[2]}15, transparent 70%)`,
        `radial-gradient(circle at 60% 30%, ${colors[0]}15, transparent 70%)`,
      ],
      opacity: intensitySettings[intensity].opacity,
      transition: {
        ...BASE_TRANSITION,
        duration: duration * 1.5,
      },
    },
  }

  const getBlurClass = (blur: SubtleGlowProps['blur']) => {
    const presets = {
      soft: 'blur-sm',
      medium: 'blur-md',
      strong: 'blur-lg',
    }
    return presets[blur as keyof typeof presets]
  }

  return (
    <motion.div
      style={{
        ...style,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      } as React.CSSProperties}
      animate={animations[mode]}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'transform-gpu',
        getBlurClass(blur),
        className
      )}
    />
  )
}

// Composant wrapper pour ajouter facilement un glow subtil à une section
export function GlowSection({ 
  children, 
  glowProps,
  className 
}: { 
  children: React.ReactNode
  glowProps?: Partial<SubtleGlowProps>
  className?: string 
}) {
  return (
    <div className={cn("relative", className)}>
      <SubtleGlow {...glowProps} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 