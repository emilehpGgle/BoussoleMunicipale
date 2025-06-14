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
  
  // Paramètres d'intensité pour l'arrière-plan (augmentés pour être plus visibles)
  const intensitySettings = {
    minimal: { opacity: 0.15, scale: 0.8 },
    subtle: { opacity: 0.25, scale: 1.0 },
    soft: { opacity: 0.35, scale: 1.2 },
  };

  const currentIntensity = intensitySettings[intensity];

  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Background Glow Layer - Animation 1 */}
      <motion.div
        className="fixed inset-0 pointer-events-none blur-3xl transform-gpu"
        style={{
          background: `radial-gradient(circle at 20% 30%, #3B82F640 0%, transparent 60%), 
                       radial-gradient(circle at 80% 70%, #06B6D430 0%, transparent 60%),
                       radial-gradient(circle at 40% 90%, #8B5CF625 0%, transparent 60%)`,
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
          background: `radial-gradient(circle at 70% 20%, #06B6D435 0%, transparent 60%), 
                       radial-gradient(circle at 30% 80%, #8B5CF630 0%, transparent 60%),
                       radial-gradient(circle at 90% 40%, #3B82F625 0%, transparent 60%)`,
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
      
      {/* Subtle overlay pour améliorer le contraste (réduit) */}
      <div className="fixed inset-0 bg-white/5 pointer-events-none" />
      
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