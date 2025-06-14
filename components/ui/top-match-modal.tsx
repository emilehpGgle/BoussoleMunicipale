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
import Image from 'next/image';

interface TopMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  topMatch: PartyScore | null;
  onViewPartyProfile: () => void;
}

// Composant LogoContainer identique à celui des résultats
const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
)

export function TopMatchModal({
  isOpen,
  onClose,
  topMatch,
  onViewPartyProfile
}: TopMatchModalProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen && topMatch) {
      // Séquence d'animation plus rapide et plus compacte
      const steps = [
        () => setAnimationStep(1), // Apparition du modal
        () => setAnimationStep(2), // Révélation du parti
        () => setAnimationStep(3), // Affichage du pourcentage
        () => setAnimationStep(4), // Boutons d'action
      ];

      steps.forEach((step, index) => {
        setTimeout(step, index * 400); // Réduit de 600ms à 400ms
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
      <DialogContent className="max-w-sm sm:max-w-md p-0 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Bouton fermer customisé */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 z-50 hover:bg-white/20 rounded-full h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative p-6 text-center space-y-4">
          {/* Particules décoratives réduites */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
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
                  duration: 2.5,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>

          {/* Titre de révélation plus compact */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: animationStep >= 1 ? 0 : -20, 
              opacity: animationStep >= 1 ? 1 : 0 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1">
                Votre meilleur match !
              </Badge>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground leading-tight">
              Révélation de vos affinités politiques
            </h2>
          </motion.div>

          {/* Logo et nom du parti - Style identique aux résultats */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: animationStep >= 2 ? 1 : 0.5, 
              opacity: animationStep >= 2 ? 1 : 0 
            }}
            transition={{ 
              duration: 0.6, 
              ease: "backOut",
              delay: 0.1 
            }}
            className="space-y-3"
          >
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-primary/30 shadow-lg">
              <div className="space-y-3">
                {/* Logo du parti - Carré avec coins arrondis comme dans les résultats */}
                <LogoContainer className="w-16 h-16 mx-auto">
                  <Image
                    src={party.logoUrl || "/placeholder.svg?width=48&height=48&query=Logo+non+disponible"}
                    alt={`${party.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </LogoContainer>

                {/* Nom du parti */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
                    {party.shortName || party.name}
                  </h3>
                  {party.leader && (
                    <p className="text-sm text-muted-foreground">
                      Dirigé par {party.leader}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pourcentage de compatibilité plus compact */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: animationStep >= 3 ? 1 : 0, 
              rotate: animationStep >= 3 ? 0 : -180 
            }}
            transition={{ 
              duration: 0.6, 
              ease: "backOut" 
            }}
            className="space-y-2"
          >
            <div className="relative">
              <motion.div
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: animationStep >= 3 ? [
                    '0 0 0 0 rgba(var(--primary), 0.4)',
                    '0 0 0 15px rgba(var(--primary), 0)',
                  ] : '0 0 0 0 rgba(var(--primary), 0.4)'
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <span className="text-xl font-bold text-white">
                  {topMatch.percentage}%
                </span>
              </motion.div>
            </div>
            <p className="text-sm font-medium text-foreground">
              Compatibilité avec vos valeurs
            </p>
            <p className="text-xs text-muted-foreground">
              Basé sur vos réponses aux questions
            </p>
          </motion.div>

          {/* Boutons d'action plus compacts */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: animationStep >= 4 ? 0 : 20, 
              opacity: animationStep >= 4 ? 1 : 0 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-2 pt-2"
          >
            <Link href={`/parti/${party.id}`} passHref>
              <Button 
                onClick={onViewPartyProfile}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2 py-2"
              >
                <ArrowRight className="h-4 w-4" />
                Découvrir ce parti
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-border/60 hover:border-primary/60 transition-colors py-2"
            >
              Voir l'analyse complète
            </Button>
          </motion.div>

          {/* Message encourageant plus compact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-muted-foreground pt-1"
          >
            💡 Explorez tous les résultats pour une vue d'ensemble
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 