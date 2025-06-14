'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sparkles, Star, ArrowRight, X } from 'lucide-react';
import { PartyScore } from '@/hooks/useResults';
import { partiesData } from '@/lib/boussole-data';
import Link from 'next/link';

interface TopMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  topMatch: PartyScore | null;
  onViewPartyProfile: () => void;
}

export function TopMatchModal({
  isOpen,
  onClose,
  topMatch,
  onViewPartyProfile
}: TopMatchModalProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen && topMatch) {
      // Séquence d'animation
      const steps = [
        () => setAnimationStep(1), // Apparition du modal
        () => setAnimationStep(2), // Révélation du parti
        () => setAnimationStep(3), // Affichage du pourcentage
        () => setAnimationStep(4), // Boutons d'action
      ];

      steps.forEach((step, index) => {
        setTimeout(step, index * 600);
      });
    } else {
      setAnimationStep(0);
    }
  }, [isOpen, topMatch]);

  if (!topMatch) return null;

  const party = partiesData.find(p => p.id === topMatch.partyId);
  if (!party) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg p-0 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 overflow-hidden">
        {/* Bouton fermer customisé */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 z-50 hover:bg-white/20 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative p-8 text-center space-y-6">
          {/* Particules décoratives en arrière-plan */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>

          {/* Titre de révélation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: animationStep >= 1 ? 0 : -20, 
              opacity: animationStep >= 1 ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Votre meilleur match !
              </Badge>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Révélation de vos affinités politiques
            </h2>
          </motion.div>

          {/* Logo et nom du parti */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: animationStep >= 2 ? 1 : 0.5, 
              opacity: animationStep >= 2 ? 1 : 0 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "backOut",
              delay: 0.2 
            }}
            className="space-y-4"
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-primary/30 shadow-lg">
              <div className="space-y-4">
                {/* Logo du parti */}
                <motion.div
                  className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl font-bold text-primary">
                    {party.name.charAt(0)}
                  </span>
                </motion.div>

                {/* Nom du parti */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {party.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {party.leader && `Dirigé par ${party.leader}`}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pourcentage de compatibilité */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: animationStep >= 3 ? 1 : 0, 
              rotate: animationStep >= 3 ? 0 : -180 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "backOut" 
            }}
            className="space-y-2"
          >
            <div className="relative">
              <motion.div
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl"
                animate={{
                  boxShadow: animationStep >= 3 ? [
                    '0 0 0 0 rgba(var(--primary), 0.4)',
                    '0 0 0 20px rgba(var(--primary), 0)',
                  ] : '0 0 0 0 rgba(var(--primary), 0.4)'
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <span className="text-2xl font-bold text-white">
                  {topMatch.percentage}%
                </span>
              </motion.div>
              <Star className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-base font-medium text-foreground">
              Compatibilité avec vos valeurs
            </p>
            <p className="text-sm text-muted-foreground">
              Basé sur vos réponses aux questions de la boussole
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: animationStep >= 4 ? 0 : 20, 
              opacity: animationStep >= 4 ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-3 pt-4"
          >
            <Link href={`/parti/${party.id}`} passHref>
              <Button 
                onClick={onViewPartyProfile}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                Découvrir ce parti
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-border/60 hover:border-primary/60 transition-colors"
            >
              Voir l'analyse complète
            </Button>
          </motion.div>

          {/* Message encourageant */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 4 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs text-muted-foreground pt-2"
          >
            💡 N'hésitez pas à explorer tous les résultats pour une vue d'ensemble
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 