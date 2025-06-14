'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface BackgroundGlowProps {
  className?: string;
  children: React.ReactNode;
  intensity?: 'minimal' | 'subtle' | 'soft';
}

export function BackgroundGlow({
  className,
  children,
  intensity = 'subtle',
}: BackgroundGlowProps) {
  
  // Paramètres d'intensité pour l'arrière-plan
  const intensitySettings = {
    minimal: { opacity: 0.02, scale: 0.8 },
    subtle: { opacity: 0.04, scale: 1.0 },
    soft: { opacity: 0.06, scale: 1.2 },
  };

  const currentIntensity = intensitySettings[intensity];

  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Background Glow Layer - Animation 1 */}
      <motion.div
        className="fixed inset-0 pointer-events-none blur-3xl transform-gpu"
        style={{
          background: `radial-gradient(circle at 20% 30%, #3B82F620 0%, transparent 50%), 
                       radial-gradient(circle at 80% 70%, #06B6D415 0%, transparent 50%),
                       radial-gradient(circle at 40% 90%, #8B5CF610 0%, transparent 50%)`,
          opacity: currentIntensity.opacity,
          scale: currentIntensity.scale,
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Background Glow Layer - Animation 2 */}
      <motion.div
        className="fixed inset-0 pointer-events-none blur-3xl transform-gpu"
        style={{
          background: `radial-gradient(circle at 70% 20%, #06B6D418 0%, transparent 50%), 
                       radial-gradient(circle at 30% 80%, #8B5CF612 0%, transparent 50%),
                       radial-gradient(circle at 90% 40%, #3B82F615 0%, transparent 50%)`,
          opacity: currentIntensity.opacity * 0.8,
          scale: currentIntensity.scale * 0.9,
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle overlay for better contrast */}
      <div className="fixed inset-0 bg-white/3 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Preset pour les pages principales
export function PageWithGlow({ 
  children, 
  className,
  intensity = 'subtle'
}: { 
  children: React.ReactNode;
  className?: string;
  intensity?: 'minimal' | 'subtle' | 'soft';
}) {
  return (
    <BackgroundGlow
      intensity={intensity}
      className={className}
    >
      {children}
    </BackgroundGlow>
  );
} 