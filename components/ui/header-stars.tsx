'use client';

import { motion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';

interface HeaderStarsProps {
  show: boolean;
  position: 'left' | 'right';
}

// Variants pour l'étoile du header
const starVariants: Variants = {
  hidden: (position: 'left' | 'right') => ({
    opacity: 0,
    scale: 0,
    rotate: position === 'left' ? -45 : 45,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: "backOut",
      delay: 0.6, // Apparition après le header
    },
  },
  pulse: {
    scale: [1, 1.15, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

/**
 * Composant d'étoile pour le header du modal
 * Affiche une étoile discrète de chaque côté du titre pour la gamification
 */
export function HeaderStars({ show, position }: HeaderStarsProps) {
  if (!show) return null;

  return (
    <motion.div
      className="flex items-center pointer-events-none"
      variants={starVariants}
      custom={position}
      initial="hidden"
      animate={["visible", "pulse"]}
    >
      <Star
        size={10}
        color="#FCD34D"
        fill="#FCD34D"
        strokeWidth={1.5}
        className="drop-shadow-sm"
      />
    </motion.div>
  );
}