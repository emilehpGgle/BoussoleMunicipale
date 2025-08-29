'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sparkles, X, Share2 } from 'lucide-react';
import { PartyScore, CalculatedResults } from '@/hooks/useResults';
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types';
import { partiesData, type Party } from '@/lib/boussole-data';
import Link from 'next/link';
import Image from 'next/image';
import ShareModal from '@/components/share-modal';

interface TopMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  topMatch: PartyScore | null;
  onViewPartyProfile: () => void;
  results: CalculatedResults | null;
  userAnswers: Record<string, AgreementOptionKey>;
  userImportance: Record<string, ImportanceDirectOptionKey>;
  calculatedScores: Array<{
    party: Party;
    score: number;
    rawScore: number;
    maxPossibleRawScoreForParty: number;
  }>;
  topParties: Array<{
    party: Party;
    score: number;
    rawScore: number;
    maxPossibleRawScoreForParty: number;
  }>;
}

// Composant LogoContainer identique à celui des résultats (carré avec coins arrondis)
const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 shadow-sm flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
)

// Composant PartyLogo avec gestion d'erreur robuste et préchargement
const PartyLogo: React.FC<{ party: Party; size: { width: number; height: number }; className?: string }> = ({ party, size, className = "" }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // Préchargement du logo pour le modal (priorité élevée)
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => setImageLoading(false)
    img.onerror = () => {
      console.warn(`⚠️ Préchargement échoué pour ${party.name}: ${party.logoUrl}`)
      setImageError(true)
      setImageLoading(false)
    }
    img.src = party.logoUrl
  }, [party.logoUrl, party.name])

  return (
    <LogoContainer className={className}>
      {imageLoading && !imageError && (
        <div className="w-full h-full bg-muted/30 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-xs text-muted-foreground font-medium">
            {party.shortName || party.name.substring(0, 3).toUpperCase()}
          </div>
        </div>
      )}
      {!imageError && (
        <Image
          src={party.logoUrl || "/placeholder.svg?width=80&height=80&query=Logo+non+disponible"}
          alt={`Logo ${party.name}`}
          width={size.width}
          height={size.height}
          style={{ 
            objectFit: "contain",
            display: imageLoading ? 'none' : 'block'
          }}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            console.warn(`⚠️ Erreur de chargement du logo pour ${party.name}: ${party.logoUrl}`)
            setImageError(true)
            setImageLoading(false)
          }}
          priority={true} // Priorité élevée pour le modal
          unoptimized={true}
          loading="eager" // Chargement immédiat pour le modal
        />
      )}
      {imageError && (
        <div className="w-full h-full bg-midnight-green/5 border border-midnight-green/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-midnight-green mb-1">
              {party.shortName || party.name.substring(0, 3).toUpperCase()}
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              {party.name.length > 15 ? party.name.substring(0, 15) + '...' : party.name}
            </div>
          </div>
        </div>
      )}
    </LogoContainer>
  )
}

export function TopMatchModal({
  isOpen,
  onClose,
  topMatch,
  onViewPartyProfile,
  results,
  userAnswers,
  userImportance,
  calculatedScores,
  topParties
}: TopMatchModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && topMatch) {
      // Animation d'entrée simple
      setTimeout(() => setShowContent(true), 200);
    } else {
      setShowContent(false);
    }
  }, [isOpen, topMatch]);

  if (!topMatch) return null;

  const party = partiesData.find(p => p.id === topMatch.partyId);
  if (!party) return null;

  const politicalPosition = results?.politicalPosition ? { x: results.politicalPosition.x, y: results.politicalPosition.y } : undefined

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm sm:max-w-md p-0 bg-white border border-border/50 overflow-hidden">
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 z-50 hover:bg-gray-100 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="p-6">
            {/* En-tête avec badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-midnight-green" />
                <Badge variant="secondary" className="bg-midnight-green/10 text-midnight-green border-midnight-green/20 text-xs px-2 py-1">
                  Votre meilleur match !
                </Badge>
                <Sparkles className="h-4 w-4 text-midnight-green" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Vos meilleurs alignements (Partis)
              </DialogTitle>
            </motion.div>

            {/* Carte du parti - Style identique à la page résultats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.95 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 flex flex-col items-center text-center border-2 border-border shadow-md hover:shadow-lg rounded-xl bg-white/90 backdrop-blur-sm hover:border-midnight-green/30 transition-all duration-300">
                {/* Logo du parti avec gestion d'erreur */}
                <PartyLogo party={party} size={{ width: 60, height: 60 }} className="w-20 h-20 mb-4" />

                {/* Nom du parti - Container avec hauteur fixe pour assurer l'alignement */}
                <div className="min-h-[4rem] flex flex-col justify-center mb-3">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {party.shortName || party.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-tight">
                    {party.name}
                  </p>
                </div>

                {/* Barre de progression - Identique à la page résultats */}
                <div className="w-full bg-muted rounded-full h-4 mb-1 overflow-hidden">
                  <motion.div
                    className="bg-midnight-green h-4 rounded-full transition-all duration-500 ease-out"
                    initial={{ width: "0%" }}
                    animate={{ width: showContent ? `${topMatch.percentage}%` : "0%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>

                {/* Pourcentage d'affinité - Identique à la page résultats */}
                <motion.p 
                  className="text-lg font-bold text-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showContent ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {topMatch.percentage}% d&apos;affinité
                </motion.p>

                {/* Boutons d'action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="w-full space-y-2 mt-4"
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10 transition-colors"
                    onClick={onViewPartyProfile}
                  >
                    <Link href={`/parti/${party.id}`}>
                      Voir la fiche du parti
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full rounded-lg"
                    onClick={() => setIsShareModalOpen(true)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager mes résultats
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Bouton pour voir l'analyse complète */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-4 text-center"
            >
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir l&apos;analyse complète →
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale de partage */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        results={results}
        politicalPosition={politicalPosition}
        userAnswers={userAnswers}
        userImportance={userImportance}
        calculatedScores={calculatedScores}
        topParties={topParties}
      />
    </>
  );
} 