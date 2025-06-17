'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState, useCallback } from 'react';

interface ButtonEffectsProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'minimal' | 'subtle' | 'standard';
  disabled?: boolean;
}

export function ButtonWithEffects({
  children,
  className,
  onClick,
  variant = 'standard',
  disabled = false,
  ...props
}: ButtonEffectsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  const handleClick = useCallback((_e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Animation de feedback immédiat
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 120);

    // Effet spark pour les boutons standards
    if (variant === 'standard') {
      setShowSparks(true);
      setTimeout(() => setShowSparks(false), 400);
    }

    // Appeler la fonction onClick après un délai minimal pour le feedback visuel
    if (onClick) {
      setTimeout(() => onClick(), 50);
    }
  }, [onClick, disabled, variant]);

  // Configuration simplifiée selon la variante
  const effectConfig = {
    minimal: {
      glowOpacity: 0.15,
      scale: 0.99,
      shadowIntensity: '0 2px 8px rgba(var(--primary), 0.15)'
    },
    subtle: {
      glowOpacity: 0.25,
      scale: 0.98,
      shadowIntensity: '0 4px 12px rgba(var(--primary), 0.2)'
    },
    standard: {
      glowOpacity: 0.35,
      scale: 0.97,
      shadowIntensity: '0 6px 16px rgba(var(--primary), 0.25)'
    }
  };

  const config = effectConfig[variant];

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden transition-all duration-150 ease-out',
        // Bordures nettes et définies
        'border-2 border-border/70 hover:border-primary/60',
        // Ombre subtile
        'shadow-sm hover:shadow-md',
        // États de focus et active optimisés
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        'active:scale-[0.98]',
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      // Animation de scale légère mais perceptible
      animate={{
        scale: isClicked ? config.scale : 1,
      }}
      transition={{
        type: "tween",
        duration: 0.1,
        ease: "easeOut"
      }}
      style={{
        // Ombre dynamique pour feedback visuel
        boxShadow: isClicked ? config.shadowIntensity : undefined,
      }}
      {...props}
    >
      {/* Effet de glow optimisé - seulement au clic */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isClicked ? config.glowOpacity : 0,
        }}
        transition={{
          duration: 0.12,
          ease: "easeOut"
        }}
      />

      {/* Effet spark/particules optimisées - uniquement pour variant='standard' */}
      {variant === 'standard' && showSparks && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 4) * 25,
                y: Math.sin((i * Math.PI * 2) / 4) * 25,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: i * 0.03,
              }}
            />
          ))}
        </>
      )}

      {/* Contenu du bouton */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}

// Hook pour ajouter les effets à des boutons existants
export function useButtonEffects(variant: 'glow' | 'ripple' | 'pulse' | 'spark' | 'all' = 'all') {
  const [isClicked, setIsClicked] = useState(false);

  const triggerEffect = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  }, []);

  const effectProps = {
    className: cn(
      'transition-all duration-200 relative overflow-hidden',
      (variant === 'glow' || variant === 'all') && [
        'hover:shadow-lg hover:shadow-primary/25',
        isClicked && 'shadow-xl shadow-primary/40'
      ]
    ),
    onMouseDown: triggerEffect,
  };

  return { effectProps, isClicked };
} 