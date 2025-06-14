'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState, useCallback } from 'react';

interface ButtonEffectsProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'glow' | 'ripple' | 'pulse' | 'spark' | 'all';
  disabled?: boolean;
}

export function ButtonWithEffects({
  children,
  className,
  onClick,
  variant = 'all',
  disabled = false,
  ...props
}: ButtonEffectsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Effet de clic global
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    // Effet ripple à la position du clic
    if (variant === 'ripple' || variant === 'all') {
      const rect = e.currentTarget.getBoundingClientRect();
      const newRipple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.();
  }, [onClick, disabled, variant]);

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        // Effet glow au hover et clic
        (variant === 'glow' || variant === 'all') && [
          'hover:shadow-lg hover:shadow-primary/25',
          isClicked && 'shadow-xl shadow-primary/40'
        ],
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      // Animation de scale au clic
      animate={{
        scale: isClicked ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      // Effet de pulse
      whileTap={
        (variant === 'pulse' || variant === 'all') ? {
          scale: 0.96,
          transition: { duration: 0.1 }
        } : {}
      }
      {...props}
    >
      {/* Contenu du bouton */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Effet de glow instantané au clic */}
      {(variant === 'glow' || variant === 'all') && (
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isClicked ? 1 : 0,
            scale: isClicked ? 1.1 : 0.8,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut"
          }}
        />
      )}
      
      {/* Effet ripple */}
      {(variant === 'ripple' || variant === 'all') && ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{
            scale: 0,
            opacity: 0.8,
          }}
          animate={{
            scale: 8,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Effet spark/particules subtiles */}
      {(variant === 'spark' || variant === 'all') && isClicked && (
        <>
          {[...Array(6)].map((_, i) => (
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
                x: Math.cos((i * Math.PI * 2) / 6) * 30,
                y: Math.sin((i * Math.PI * 2) / 6) * 30,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: i * 0.02,
              }}
            />
          ))}
        </>
      )}
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