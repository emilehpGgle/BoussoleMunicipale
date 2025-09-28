'use client';

import { motion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';

interface AchievementStarsProps {
  show: boolean;
  rank: number;
}

// Variants pour les étoiles d'achievement
const starVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -45,
  },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: "backOut",
      delay: 0.8 + delay * 0.1, // Délai échelonné pour chaque étoile
    },
  }),
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

/**
 * Composant d'étoiles d'achievement pour la gamification discrète
 * Affiche quelques petites étoiles pour le premier rang uniquement
 */
export function AchievementStars({ show, rank }: AchievementStarsProps) {
  // Afficher seulement pour le premier rang
  if (!show || rank !== 1) return null;

  return (
    <motion.div
      className="absolute -top-2 -left-2 pointer-events-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Première étoile */}
      <motion.div
        className="absolute"
        style={{ top: '-8px', left: '2px' }}
        variants={starVariants}
        custom={0}
        animate={["visible", "pulse"]}
      >
        <Star
          size={12}
          color="#FCD34D"
          fill="#FCD34D"
          strokeWidth={2}
        />
      </motion.div>

      {/* Deuxième étoile */}
      <motion.div
        className="absolute"
        style={{ top: '2px', left: '-10px' }}
        variants={starVariants}
        custom={1}
        animate={["visible", "pulse"]}
      >
        <Star
          size={10}
          color="#FCD34D"
          fill="#FCD34D"
          strokeWidth={2}
        />
      </motion.div>

      {/* Troisième étoile */}
      <motion.div
        className="absolute"
        style={{ top: '-6px', left: '16px' }}
        variants={starVariants}
        custom={2}
        animate={["visible", "pulse"]}
      >
        <Star
          size={8}
          color="#FCD34D"
          fill="#FCD34D"
          strokeWidth={2}
        />
      </motion.div>
    </motion.div>
  );
}