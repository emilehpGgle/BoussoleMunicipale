'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
}

/**
 * Composant de compteur animé pour la gamification
 * Anime un nombre de 0 vers la valeur finale
 */
export function AnimatedCounter({
  value,
  duration = 0.8,
  delay = 0.9,
  className = "",
  suffix = "%"
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, value, duration, delay]);

  return (
    <motion.span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}