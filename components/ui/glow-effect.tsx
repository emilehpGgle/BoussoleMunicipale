'use client';

import { cn } from '@/lib/utils';
import { motion, Transition } from 'framer-motion';

export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | 'rotate'
    | 'pulse'
    | 'breathe'
    | 'colorShift'
    | 'flowHorizontal'
    | 'static'
    | 'drift';
  blur?:
    | number
    | 'softest'
    | 'soft'
    | 'medium'
    | 'strong'
    | 'stronger'
    | 'strongest'
    | 'none';
  transition?: Transition;
  scale?: number;
  duration?: number;
  intensity?: 'minimal' | 'subtle' | 'soft' | 'medium';
};

export function GlowEffect({
  className,
  style,
  colors = ['#3B82F6', '#06B6D4', '#8B5CF6', '#0EA5E9'], // Couleurs Boussole Municipale
  mode = 'breathe',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 8,
  intensity = 'subtle',
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'easeInOut' as const,
  };

  // Intensités réduites pour un effet plus subtil
  const intensitySettings = {
    minimal: { opacity: [0.15, 0.25, 0.15], scale: [0.95, 1.0, 0.95] },
    subtle: { opacity: [0.2, 0.35, 0.2], scale: [0.98, 1.02, 0.98] },
    soft: { opacity: [0.25, 0.4, 0.25], scale: [1.0, 1.05, 1.0] },
    medium: { opacity: [0.3, 0.5, 0.3], scale: [1.0, 1.08, 1.0] },
  };

  const currentIntensity = intensitySettings[intensity];

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      opacity: currentIntensity.opacity[1],
      transition: {
        ...(transition ?? BASE_TRANSITION),
        ease: 'linear' as const,
      },
    },
    pulse: {
      background: `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, ${colors[1]} 50%, transparent 100%)`,
      scale: currentIntensity.scale,
      opacity: currentIntensity.opacity,
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror' as const,
        }),
      },
    },
    breathe: {
      background: [
        `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[1]} 0%, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 70%)`,
      ],
      scale: currentIntensity.scale,
      opacity: currentIntensity.opacity,
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror' as const,
        }),
      },
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
      }),
      opacity: currentIntensity.opacity,
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror' as const,
        }),
      },
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
        return `linear-gradient(90deg, ${color}, ${nextColor})`;
      }),
      opacity: currentIntensity.opacity,
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror' as const,
        }),
      },
    },
    drift: {
      background: [
        `radial-gradient(circle at 30% 40%, ${colors[0]} 0%, transparent 70%)`,
        `radial-gradient(circle at 70% 60%, ${colors[1]} 0%, transparent 70%)`,
        `radial-gradient(circle at 40% 70%, ${colors[2]} 0%, transparent 70%)`,
        `radial-gradient(circle at 60% 30%, ${colors[0]} 0%, transparent 70%)`,
      ],
      opacity: currentIntensity.opacity,
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          duration: duration * 1.5,
        }),
      },
    },
    static: {
      background: `linear-gradient(135deg, ${colors.join(', ')})`,
      opacity: currentIntensity.opacity[1],
    },
  };

  const getBlurClass = (blur: GlowEffectProps['blur']) => {
    if (typeof blur === 'number') {
      return `blur-[${blur}px]`;
    }

    const presets = {
      softest: 'blur-sm',
      soft: 'blur',
      medium: 'blur-md',
      strong: 'blur-lg',
      stronger: 'blur-xl',
      strongest: 'blur-2xl',
      none: 'blur-none',
    };

    return presets[blur as keyof typeof presets];
  };

  return (
    <motion.div
      style={
        {
          ...style,
          '--scale': scale,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        } as React.CSSProperties
      }
      animate={animations[mode]}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-[var(--scale)] transform-gpu',
        getBlurClass(blur),
        className
      )}
    />
  );
}

// Composant wrapper pour faciliter l'intégration
export function GlowCard({ 
  children, 
  glowProps,
  className,
  ...props
}: { 
  children: React.ReactNode
  glowProps?: Partial<GlowEffectProps>
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <GlowEffect 
        colors={['#3B82F6', '#06B6D4', '#8B5CF6']}
        mode="breathe"
        intensity="subtle"
        duration={10}
        {...glowProps} 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 