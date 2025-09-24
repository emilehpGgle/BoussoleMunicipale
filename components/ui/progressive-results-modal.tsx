'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { X, Share2, Trophy, Medal, Award, ChevronRight, ArrowRight } from 'lucide-react';
import { PartyScore, CalculatedResults } from '@/hooks/useResults';
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types';
import { type Party } from '@/lib/boussole-data';
import Link from 'next/link';
import Image from 'next/image';
import ShareModal from '@/components/share-modal';
import {
  type PoliticalPosition,
  calculateUserPoliticalPosition,
  getPoliticalPositionDescription,
  axisConfiguration,
  type UserAnswers,
  calculateMapBounds,
  normalizePositionForDisplay
} from '@/lib/political-map-calculator';
import { transformAllPartyPositionsToUserAnswers } from '@/lib/supabase-transform';
import { useParties } from '@/hooks/useParties';
import { usePartyPositions } from '@/hooks/usePartyPositions';

interface ProgressiveResultsModalProps {
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
  municipality: string;
}

type ModalStep = 'champion' | 'podium' | 'compass';

// Composant LogoContainer identique à celui des résultats
const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-2 flex items-center justify-center ${className || ""}`}>
    {children}
  </div>
);

// Composant PartyLogo avec gestion d'erreur robuste
const PartyLogo: React.FC<{ party: Party; size: { width: number; height: number }; className?: string }> = ({ party, size, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageLoading(false);
    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
    };
    img.src = party.logoUrl;
  }, [party.logoUrl]);

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
            setImageError(true);
            setImageLoading(false);
          }}
          priority={true}
          unoptimized={true}
          loading="eager"
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
  );
};

// Composant Confetti avec animation
const ConfettiParticle: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute w-2 h-2 rounded"
      style={{ backgroundColor: color }}
      initial={{
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1
      }}
      animate={{
        x: (Math.random() - 0.5) * 400,
        y: Math.random() * -300 - 100,
        rotate: Math.random() * 720,
        opacity: 0
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
        delay: index * 0.05
      }}
    />
  );
};

const ConfettiExplosion: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  if (!trigger) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }, (_, i) => (
        <ConfettiParticle key={i} index={i} />
      ))}
    </div>
  );
};

// Composant MiniCompass simplifié
const MiniCompass: React.FC<{
  userAnswers: UserAnswers;
  municipality: string;
  topParties: Array<{ party: Party; score: number; }>;
}> = ({ userAnswers, municipality, topParties }) => {
  const { parties, isLoading: partiesLoading } = useParties(municipality);
  const { positionsByParty, isLoading: positionsLoading } = usePartyPositions(municipality);

  // Calcul des positions
  const userPosition = calculateUserPoliticalPosition(userAnswers);

  const partyPositions = positionsByParty ? (() => {
    const partyAnswers = transformAllPartyPositionsToUserAnswers(positionsByParty);
    const positions: Record<string, PoliticalPosition> = {};
    Object.entries(partyAnswers).forEach(([partyId, answers]) => {
      positions[partyId] = calculateUserPoliticalPosition(answers);
    });
    return positions;
  })() : {};

  const allPositions = [userPosition, ...Object.values(partyPositions)];
  const mapBounds = calculateMapBounds(allPositions, 30);

  const toSVGCoords = (position: PoliticalPosition, width: number, height: number) => {
    const padding = 30;
    const canvasSize = Math.min(width, height) - 2 * padding;
    const normalized = normalizePositionForDisplay(position, mapBounds, canvasSize);
    const x = normalized.x + padding + (width - canvasSize - 2 * padding) / 2;
    const y = height - (normalized.y + padding + (height - canvasSize - 2 * padding) / 2);
    return { x, y };
  };

  if (partiesLoading || positionsLoading) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted/10 rounded-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  const svgWidth = 350;
  const svgHeight = 250;

  return (
    <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-4 border">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ aspectRatio: `${svgWidth}/${svgHeight}` }}
      >
        {/* Grille de fond */}
        <defs>
          <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mini-grid)" />

        {/* Axes principaux */}
        <line x1={30} y1={svgHeight/2} x2={svgWidth-30} y2={svgHeight/2} stroke="hsl(var(--border))" strokeWidth="1.5"/>
        <line x1={svgWidth/2} y1={30} x2={svgWidth/2} y2={svgHeight-30} stroke="hsl(var(--border))" strokeWidth="1.5"/>

        {/* Labels des axes */}
        <text x={40} y={svgHeight/2 - 8} fontSize="10" fill="hsl(var(--muted-foreground))" className="font-medium">
          {axisConfiguration.economic.leftLabel}
        </text>
        <text x={svgWidth-30} y={svgHeight/2 - 8} fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="end" className="font-medium">
          {axisConfiguration.economic.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={40} fontSize="10" fill="hsl(var(--muted-foreground))" className="font-medium">
          {axisConfiguration.social.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={svgHeight-40} fontSize="10" fill="hsl(var(--muted-foreground))" className="font-medium">
          {axisConfiguration.social.leftLabel}
        </text>

        {/* Quadrants colorés */}
        <rect x={30} y={30} width={(svgWidth-60)/2} height={(svgHeight-60)/2} fill="#10b981" opacity="0.12"/>
        <rect x={svgWidth/2} y={30} width={(svgWidth-60)/2} height={(svgHeight-60)/2} fill="#0891b2" opacity="0.12"/>
        <rect x={30} y={svgHeight/2} width={(svgWidth-60)/2} height={(svgHeight-60)/2} fill="#f59e0b" opacity="0.10"/>
        <rect x={svgWidth/2} y={svgHeight/2} width={(svgWidth-60)/2} height={(svgHeight-60)/2} fill="#8b5cf6" opacity="0.10"/>

        {/* Tous les partis */}
        {parties?.map((party) => {
          if (!partyPositions[party.id]) return null;

          const coords = toSVGCoords(partyPositions[party.id], svgWidth, svgHeight);
          const isTopThree = topParties.some(tp => tp.party.id === party.id);
          const topThreeIndex = topParties.findIndex(tp => tp.party.id === party.id);

          let strokeColor = "#1e40af";
          let strokeWidth = 1.5;

          if (isTopThree) {
            if (topThreeIndex === 0) { strokeColor = "#FFD700"; strokeWidth = 3; } // Or
            else if (topThreeIndex === 1) { strokeColor = "#C0C0C0"; strokeWidth = 2.5; } // Argent
            else if (topThreeIndex === 2) { strokeColor = "#CD7F32"; strokeWidth = 2.5; } // Bronze
          }

          return (
            <g key={party.id}>
              <circle
                cx={coords.x}
                cy={coords.y}
                r={isTopThree ? 12 : 8}
                fill="white"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className="transition-all duration-200 drop-shadow-sm"
              />
              <text
                x={coords.x}
                y={coords.y + 3}
                textAnchor="middle"
                fontSize="7"
                fill="hsl(var(--foreground))"
                className="font-bold pointer-events-none"
              >
                {party.shortName?.substring(0, 3) || party.name.substring(0, 3)}
              </text>
            </g>
          );
        })}

        {/* Position de l'utilisateur */}
        {(() => {
          const userCoords = toSVGCoords(userPosition, svgWidth, svgHeight);
          return (
            <g>
              <circle
                cx={userCoords.x}
                cy={userCoords.y}
                r={18}
                fill="none"
                stroke="#1e40af"
                strokeWidth="2"
                strokeDasharray="4,2"
                opacity="0.6"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${userCoords.x} ${userCoords.y}`}
                  to={`360 ${userCoords.x} ${userCoords.y}`}
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={userCoords.x}
                cy={userCoords.y}
                r={8}
                fill="#1e40af"
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              <text
                x={userCoords.x}
                y={userCoords.y - 25}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--primary))"
                className="font-bold"
              >
                Vous
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

export function ProgressiveResultsModal({
  isOpen,
  onClose,
  topMatch,
  onViewPartyProfile,
  results,
  userAnswers,
  userImportance,
  calculatedScores,
  topParties,
  municipality
}: ProgressiveResultsModalProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>('champion');
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && topMatch) {
      setCurrentStep('champion');
      setTimeout(() => {
        setShowContent(true);
        setShowConfetti(true);
      }, 300);
    } else {
      setShowContent(false);
      setShowConfetti(false);
      setCurrentStep('champion');
    }
  }, [isOpen, topMatch]);

  if (!topMatch || !topParties.length) return null;

  const champion = topParties[0];
  const challenger1 = topParties[1];
  const challenger2 = topParties[2];

  const politicalPosition = results?.politicalPosition ? { x: results.politicalPosition.x, y: results.politicalPosition.y } : undefined;
  const positionDescription = results?.politicalPosition ? getPoliticalPositionDescription(results.politicalPosition) : '';

  const handleNext = () => {
    if (currentStep === 'champion') {
      setCurrentStep('podium');
    } else if (currentStep === 'podium') {
      setCurrentStep('compass');
    }
  };

  const renderChampionStep = () => (
    <motion.div
      key="champion"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      {/* Confetti */}
      <ConfettiExplosion trigger={showConfetti} />

      {/* En-tête dramatique */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />
          <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-2 border-yellow-400 text-sm px-3 py-1 font-bold">
            🏆 Votre champion !
          </Badge>
          <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />
        </div>
        <DialogTitle className="text-2xl font-bold text-foreground mb-2">
          Votre meilleur match politique
        </DialogTitle>
        <p className="text-muted-foreground text-sm">
          Basé sur votre positionnement et vos priorités
        </p>
      </motion.div>

      {/* Carte du champion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6 flex flex-col items-center text-center border-4 border-gradient-to-r from-yellow-400 to-yellow-600 shadow-xl rounded-2xl bg-gradient-to-br from-yellow-50 to-white relative overflow-hidden">
          {/* Effet brillant */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>

          {/* Logo avec effet doré */}
          <div className="relative mb-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full opacity-75 blur-sm animate-pulse"></div>
            <PartyLogo
              party={champion.party}
              size={{ width: 192, height: 192 }}
              className="w-36 h-36 sm:w-44 sm:h-44 relative z-10"
            />
          </div>

          {/* Nom du parti */}
          <div className="min-h-[4rem] flex flex-col justify-center mb-4">
            <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
              {champion.party.shortName || champion.party.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-tight">
              {champion.party.name}
            </p>
          </div>

          {/* Score avec animation */}
          <div className="w-full bg-muted rounded-full h-6 mb-3 overflow-hidden relative">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-6 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: showContent ? `${champion.score}%` : "0%" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>

          <motion.p
            className="text-2xl font-bold text-yellow-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            🥇 {champion.score}% d&apos;affinité
          </motion.p>

          {/* Bouton suivant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            >
              Voir le podium complet <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderPodiumStep = () => (
    <motion.div
      key="podium"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* En-tête */}
      <div className="text-center mb-6">
        <DialogTitle className="text-xl font-bold text-foreground mb-2">
          🏆 Votre Top 3 - Podium des partis
        </DialogTitle>
        <p className="text-muted-foreground text-sm">
          Vos trois meilleures correspondances politiques
        </p>
      </div>

      {/* Champion en haut */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-4"
      >
        <Card className="p-4 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full font-bold">1</div>
            <PartyLogo party={champion.party} size={{ width: 48, height: 48 }} className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{champion.party.shortName || champion.party.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{champion.party.name}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-yellow-700">{champion.score}%</p>
              <Trophy className="h-4 w-4 text-yellow-500 mx-auto" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Challengers côte à côte */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Deuxième place */}
        {challenger1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="p-3 border-2 border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 bg-gray-500 text-white rounded-full font-bold text-sm">2</div>
                <PartyLogo party={challenger1.party} size={{ width: 40, height: 40 }} className="w-10 h-10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs truncate">{challenger1.party.shortName || challenger1.party.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{challenger1.party.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-700 text-sm">{challenger1.score}%</p>
                  <Medal className="h-3 w-3 text-gray-500 mx-auto" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Troisième place */}
        {challenger2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className="p-3 border-2 border-orange-400 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 bg-orange-600 text-white rounded-full font-bold text-sm">3</div>
                <PartyLogo party={challenger2.party} size={{ width: 40, height: 40 }} className="w-10 h-10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs truncate">{challenger2.party.shortName || challenger2.party.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{challenger2.party.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-orange-700 text-sm">{challenger2.score}%</p>
                  <Award className="h-3 w-3 text-orange-600 mx-auto" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Bouton suivant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="text-center"
      >
        <Button
          onClick={handleNext}
          className="bg-primary hover:bg-primary/90 font-semibold px-6 py-2 rounded-lg transition-all duration-200"
        >
          Voir votre position politique <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );

  const renderCompassStep = () => (
    <motion.div
      key="compass"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* En-tête */}
      <div className="text-center mb-4">
        <DialogTitle className="text-xl font-bold text-foreground mb-2">
          🧭 Votre position politique
        </DialogTitle>
        <p className="text-muted-foreground text-sm mb-3">
          Positionnement dans le paysage municipal
        </p>

        {/* Badges de position */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Économique: {(results?.politicalPosition?.x || 0) > 0 ? 'Libre marché' : 'Interventionnisme'}
            ({Math.abs(results?.politicalPosition?.x || 0).toFixed(1)})
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Social: {(results?.politicalPosition?.y || 0) > 0 ? 'Progressiste' : 'Conservateur'}
            ({Math.abs(results?.politicalPosition?.y || 0).toFixed(1)})
          </Badge>
          {positionDescription && (
            <Badge variant="outline" className="text-xs px-2 py-1 border-midnight-green text-midnight-green">
              {positionDescription}
            </Badge>
          )}
        </div>
      </div>

      {/* Mini Compass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <MiniCompass
          userAnswers={userAnswers as UserAnswers}
          municipality={municipality}
          topParties={topParties}
        />
      </motion.div>

      {/* Légende */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 mb-6"
      >
        <p><strong>Légende:</strong> Bordures dorées 🥇, argentées 🥈 et bronze 🥉 = votre top 3</p>
      </motion.div>

      {/* Actions finales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10"
            onClick={onViewPartyProfile}
          >
            <Link href={`/${municipality}/parti/${champion.party.id}`}>
              Fiche du champion
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>

        <Button
          variant="default"
          onClick={onClose}
          className="w-full rounded-lg font-semibold"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Voir l&apos;analyse complète
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 bg-white border border-border/50 overflow-hidden max-h-[95vh] overflow-y-auto">
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 z-50 hover:bg-gray-100 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Indicateur d'étape */}
          <div className="flex justify-center gap-2 p-3 border-b bg-gray-50">
            {(['champion', 'podium', 'compass'] as ModalStep[]).map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentStep === step
                    ? 'bg-primary w-6'
                    : index < (['champion', 'podium', 'compass'] as ModalStep[]).indexOf(currentStep)
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Contenu avec transitions */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 'champion' && renderChampionStep()}
              {currentStep === 'podium' && renderPodiumStep()}
              {currentStep === 'compass' && renderCompassStep()}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de partage */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        results={results}
        politicalPosition={politicalPosition}
        userAnswers={userAnswers}
        userImportance={userImportance}
        calculatedScores={calculatedScores}
        topParties={topParties}
        municipality={municipality}
      />
    </>
  );
}