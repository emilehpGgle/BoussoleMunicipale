'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

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
  colors = ['#04454A', '#EAFCFC', '#76E3E7'], // Teal principal, teal clair, teal moyen
  mode = 'breathe',
  intensity = 'subtle',
  blur = 'medium',
  duration = 8,
}: SubtleGlowProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'easeInOut' as const,
  }

  // Intensités augmentées pour être plus visibles
  const intensitySettings = {
    minimal: {
      opacity: [0.08, 0.12, 0.08],
      scale: [0.8, 0.9, 0.8],
    },
    subtle: {
      opacity: [0.12, 0.18, 0.12],
      scale: [0.9, 1.0, 0.9],
    },
    soft: {
      opacity: [0.15, 0.25, 0.15],
      scale: [0.95, 1.05, 0.95],
    }
  }

  const animations = {
    static: {
      background: `radial-gradient(circle at 50% 50%, ${colors[0]}20, transparent 70%)`,
      opacity: intensitySettings[intensity].opacity[0],
    },
    breathe: {
      background: [
        `radial-gradient(circle at 50% 50%, ${colors[0]}20, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[1]}25, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[0]}20, transparent 70%)`,
      ],
      opacity: intensitySettings[intensity].opacity,
      scale: intensitySettings[intensity].scale,
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror' as const,
      },
    },
    pulse: {
      background: `radial-gradient(circle at 50% 50%, ${colors[0]}25, transparent 70%)`,
      opacity: intensitySettings[intensity].opacity,
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror' as const,
      },
    },
    drift: {
      background: [
        `radial-gradient(circle at 30% 40%, ${colors[0]}20, transparent 70%)`,
        `radial-gradient(circle at 70% 60%, ${colors[1]}25, transparent 70%)`,
        `radial-gradient(circle at 40% 70%, ${colors[2]}20, transparent 70%)`,
        `radial-gradient(circle at 60% 30%, ${colors[0]}25, transparent 70%)`,
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