'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Dialog remplacé par modal custom pour containment
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { X, Share2, Trophy, ArrowRight, Compass } from 'lucide-react';
import { PartyScore, CalculatedResults } from '@/hooks/useResults';
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types';
import { type Party } from '@/lib/boussole-data';
import Link from 'next/link';
import Image from 'next/image';
import ShareModal from '@/components/share-modal';
import {
  type PoliticalPosition,
  getPoliticalPositionDescription,
  axisConfiguration,
  type UserAnswers,
  calculateMapBounds,
  normalizePositionForDisplay
} from '@/lib/political-map-calculator';
import {
  calculateUserPoliticalPosition
} from '@/lib/political-calculator-db';
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

// Composant LogoContainer avec palette cohérente
const LogoContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl p-1 shadow-md border border-azure-web flex items-center justify-center ${className || ""}`}>
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
        <div className="w-full h-full bg-midnight-green/10 border border-midnight-green/30 rounded-lg flex items-center justify-center">
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

// Composant Confetti avec couleurs de la palette
const ConfettiParticle: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#04454A', '#EAFCFC', '#FCF7F3', '#0891b2', '#10b981', '#f59e0b']; // Palette cohérente
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
        rotate: Math.random() * 180,
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

// Composant MiniCompass avec palette cohérente
const MiniCompass: React.FC<{
  userAnswers: UserAnswers;
  municipality: string;
  topParties: Array<{ party: Party; score: number; }>;
}> = ({ userAnswers, municipality, topParties }) => {
  const { parties, loading: partiesLoading } = useParties(municipality);
  const { positionsByParty, isLoading: positionsLoading } = usePartyPositions(municipality);

  // Calcul des positions
  const [userPosition, setUserPosition] = useState<PoliticalPosition>({ x: 0, y: 0 });
  const [partyPositions, setPartyPositions] = useState<Record<string, PoliticalPosition>>({});

  useEffect(() => {
    calculateUserPoliticalPosition(userAnswers, municipality)
      .then(position => setUserPosition(position))
      .catch(err => console.error('Erreur calcul position utilisateur:', err));
  }, [userAnswers, municipality]);

  useEffect(() => {
    if (!positionsByParty) {
      setPartyPositions({});
      return;
    }

    const partyAnswers = transformAllPartyPositionsToUserAnswers(positionsByParty);
    const calculateAllPositions = async () => {
      const positions: Record<string, PoliticalPosition> = {};
      for (const [partyId, answers] of Object.entries(partyAnswers)) {
        try {
          positions[partyId] = await calculateUserPoliticalPosition(answers, municipality);
        } catch (err) {
          console.error(`Erreur calcul position pour ${partyId}:`, err);
          positions[partyId] = { x: 0, y: 0 };
        }
      }
      setPartyPositions(positions);
    };

    calculateAllPositions();
  }, [positionsByParty, municipality]);

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
      <div className="flex items-center justify-center h-48 bg-azure-web/20 rounded-lg border border-midnight-green/10">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-midnight-green"></div>
      </div>
    );
  }

  const svgWidth = 350;
  const svgHeight = 250;

  return (
    <div className="bg-gradient-to-br from-azure-web/30 to-isabelline/20 rounded-xl p-4 border border-midnight-green/20 shadow-soft">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ aspectRatio: `${svgWidth}/${svgHeight}` }}
      >
        {/* Grille de fond */}
        <defs>
          <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#04454A" strokeWidth="0.3" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mini-grid)" />

        {/* Axes principaux avec couleurs de la palette */}
        <line x1={30} y1={svgHeight/2} x2={svgWidth-30} y2={svgHeight/2} stroke="#04454A" strokeWidth="2" opacity="0.6"/>
        <line x1={svgWidth/2} y1={30} x2={svgWidth/2} y2={svgHeight-30} stroke="#04454A" strokeWidth="2" opacity="0.6"/>

        {/* Labels des axes avec couleurs cohérentes */}
        <text x={40} y={svgHeight/2 - 8} fontSize="10" fill="#04454A" className="font-medium">
          {axisConfiguration.economic.leftLabel}
        </text>
        <text x={svgWidth-30} y={svgHeight/2 - 8} fontSize="10" fill="#04454A" textAnchor="end" className="font-medium">
          {axisConfiguration.economic.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={40} fontSize="10" fill="#04454A" className="font-medium">
          {axisConfiguration.social.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={svgHeight-40} fontSize="10" fill="#04454A" className="font-medium">
          {axisConfiguration.social.leftLabel}
        </text>

        {/* Quadrants colorés avec palette cohérente */}
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

          let strokeColor = "#04454A";
          let strokeWidth = 1.5;

          if (isTopThree) {
            if (topThreeIndex === 0) { strokeColor = "#04454A"; strokeWidth = 3; } // Midnight green pour champion
            else if (topThreeIndex === 1) { strokeColor = "#0891b2"; strokeWidth = 2.5; } // Teal pour argent
            else if (topThreeIndex === 2) { strokeColor = "#FCF7F3"; strokeWidth = 2.5; } // Isabelline pour bronze
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
                fill="#04454A"
                className="font-bold pointer-events-none"
              >
                {party.shortName?.substring(0, 3) || party.name.substring(0, 3)}
              </text>
            </g>
          );
        })}

        {/* Position de l'utilisateur avec couleur cohérente */}
        {(() => {
          const userCoords = toSVGCoords(userPosition, svgWidth, svgHeight);
          return (
            <g>
              <circle
                cx={userCoords.x}
                cy={userCoords.y}
                r={18}
                fill="none"
                stroke="#04454A"
                strokeWidth="2"
                strokeDasharray="4,2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="18;22;18"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.3;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={userCoords.x}
                cy={userCoords.y}
                r={8}
                fill="#04454A"
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              <text
                x={userCoords.x}
                y={userCoords.y - 25}
                textAnchor="middle"
                fontSize="11"
                fill="#04454A"
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
  onViewPartyProfile: _onViewPartyProfile,
  results,
  userAnswers,
  userImportance,
  calculatedScores,
  topParties,
  municipality
}: ProgressiveResultsModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<ReturnType<typeof import('embla-carousel-react').default>[1] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && topMatch) {
      setTimeout(() => {
        setShowContent(true);
        setShowConfetti(true);
      }, 300);
    } else {
      setShowContent(false);
      setShowConfetti(false);
      setCurrentSlide(0);
    }
  }, [isOpen, topMatch]);

  // Update carousel state
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
    };
  }, [carouselApi]);

  if (!topMatch || !topParties.length) return null;

  const topParty = topParties[0];
  const secondParty = topParties[1];
  const thirdParty = topParties[2];

  const politicalPosition = results?.politicalPosition ? { x: results.politicalPosition.x, y: results.politicalPosition.y } : undefined;
  const positionDescription = results?.politicalPosition ? getPoliticalPositionDescription(results.politicalPosition) : '';

  // Composant pour une carte de parti avec badge de rang
  const PartyCard: React.FC<{
    party: Party;
    score: number;
    rank: number;
    isChampion?: boolean;
    delay?: number;
  }> = ({ party, score, rank, isChampion = false, delay = 0 }) => {
    const getBadgeConfig = (rank: number) => {
      switch (rank) {
        case 1:
          return {
            emoji: '🥇',
            bgClass: 'bg-gradient-to-r from-midnight-green to-teal-main-600',
            borderClass: 'border-midnight-green',
            textClass: 'text-white',
            glowClass: 'shadow-md'
          };
        case 2:
          return {
            emoji: '🥈',
            bgClass: 'bg-gradient-to-r from-teal-main-400 to-teal-main-500',
            borderClass: 'border-teal-main-400',
            textClass: 'text-white',
            glowClass: 'shadow-md'
          };
        case 3:
          return {
            emoji: '🥉',
            bgClass: 'bg-gradient-to-r from-teal-main-200 to-isabelline',
            borderClass: 'border-teal-main-200',
            textClass: 'text-midnight-green',
            glowClass: 'shadow-md'
          };
        default:
          return {
            emoji: `${rank}`,
            bgClass: 'bg-azure-web',
            borderClass: 'border-midnight-green/20',
            textClass: 'text-midnight-green',
            glowClass: 'shadow-md'
          };
      }
    };

    const badgeConfig = getBadgeConfig(rank);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.6, delay }}
        className="relative m-2"
      >
        {/* Badge de rang en haut à droite */}
        <motion.div
          className={`absolute -top-2 -right-2 z-20 w-12 h-12 rounded-full ${badgeConfig.bgClass} ${badgeConfig.borderClass} border-2 flex items-center justify-center ${badgeConfig.glowClass}`}
          whileHover={{
            scale: 1.1,
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          <span className={`text-lg font-bold ${badgeConfig.textClass}`}>
            {badgeConfig.emoji}
          </span>
        </motion.div>

        <Card className={`p-4 flex flex-col items-center text-center border-2 ${badgeConfig.borderClass} shadow-xl rounded-xl bg-gradient-to-br from-azure-web/30 to-white relative overflow-hidden transition-all duration-300 hover:shadow-2xl min-w-[280px]`}>
          {/* Confetti pour le premier parti */}
          {isChampion && <ConfettiExplosion trigger={showConfetti} />}

          {/* Logo */}
          <div className="relative mb-2">
            <PartyLogo
              party={party}
              size={{ width: isChampion ? 140 : 120, height: isChampion ? 140 : 120 }}
              className={`${isChampion ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-24 h-24 sm:w-28 sm:h-28'} relative z-10`}
            />
          </div>

          {/* Nom du parti */}
          <div className="min-h-[3rem] flex flex-col justify-center mb-3">
            <h3 className={`${isChampion ? 'text-xl' : 'text-lg'} font-bold text-foreground leading-tight mb-1`}>
              {party.shortName || party.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-tight">
              {party.name}
            </p>
          </div>

          {/* Score avec animation */}
          <div className="w-full bg-muted rounded-full h-5 mb-3 overflow-hidden relative border border-midnight-green/20">
            <motion.div
              className={`${badgeConfig.bgClass} h-5 rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: showContent ? `${score}%` : "0%" }}
              transition={{ duration: 1.2, delay: delay + 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          <motion.p
            className={`${isChampion ? 'text-xl' : 'text-lg'} font-bold text-midnight-green mb-4`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {score}% d&apos;affinité
          </motion.p>

          {isChampion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.4, delay: delay + 1.2 }}
            >
              <Button
                asChild
                className="bg-midnight-green hover:bg-midnight-green/90 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm"
              >
                <Link href={`/${municipality}/parti/${party.id}`}>
                  Voir la fiche détaillée
                </Link>
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    );
  };

  // Composant pour la slide de la carte politique
  const CompassSlide: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="px-4 py-3"
    >
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            <Compass className="h-6 w-6 text-midnight-green" />
          </motion.div>
          <Badge className="bg-midnight-green text-white text-sm px-3 py-1 font-bold">
            🧭 Votre position politique
          </Badge>
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Compass className="h-6 w-6 text-midnight-green" />
          </motion.div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Positionnement dans le paysage municipal
        </h3>
        <p className="text-muted-foreground text-sm mb-3">
          Voici où vous vous situez par rapport aux partis
        </p>

        {/* Badges de position avec palette cohérente */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-3">
          <Badge variant="secondary" className="text-xs px-1 py-1 sm:px-2 bg-azure-web text-midnight-green border-midnight-green/20">
            Éco: {(results?.politicalPosition?.x || 0) > 0 ? 'Marché' : 'Interv.'}
            ({Math.abs(results?.politicalPosition?.x || 0).toFixed(1)})
          </Badge>
          <Badge variant="secondary" className="text-xs px-1 py-1 sm:px-2 bg-azure-web text-midnight-green border-midnight-green/20">
            Social: {(results?.politicalPosition?.y || 0) > 0 ? 'Prog.' : 'Cons.'}
            ({Math.abs(results?.politicalPosition?.y || 0).toFixed(1)})
          </Badge>
          {positionDescription && (
            <Badge variant="outline" className="text-xs px-2 py-1 border-midnight-green text-midnight-green bg-isabelline">
              {positionDescription}
            </Badge>
          )}
        </div>
      </div>

      {/* Mini Compass avec couleurs harmonisées */}
      <div className="mb-4">
        <MiniCompass
          userAnswers={userAnswers as UserAnswers}
          municipality={municipality}
          topParties={topParties}
        />
      </div>

      {/* Légende avec design cohérent */}
      <div className="text-center text-xs text-muted-foreground bg-azure-web/50 rounded-lg p-2 mb-4 border border-midnight-green/10">
        <p><strong>Légende:</strong> Bordures dorées 🥇, argentées 🥈 et bronze 🥉 = votre top 3</p>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay de fond */}
      <div
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal container */}
        <div
          className="relative max-w-sm sm:max-w-md w-full bg-gradient-to-br from-azure-web/30 to-white border border-midnight-green/20 rounded-lg shadow-xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 z-50 hover:bg-midnight-green/10 rounded-full h-8 w-8 text-midnight-green"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* En-tête du modal */}
          <div className="text-center p-2 border-b border-midnight-green/10 bg-gradient-to-r from-azure-web/50 to-isabelline/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-midnight-green" />
              <Badge className="bg-midnight-green text-white text-sm px-3 py-1 font-bold">
                🏆 Vos résultats politiques
              </Badge>
              <Trophy className="h-5 w-5 text-midnight-green" />
            </div>
            <h2 className="text-lg font-bold text-midnight-green">
              Découvrez vos affinités et votre positionnement
            </h2>
          </div>

          {/* Indicateur de slide */}
          <div className="flex justify-center gap-2 p-2 border-b bg-azure-web/20">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${
                  currentSlide === index
                    ? 'bg-midnight-green w-8 h-3 shadow-md'
                    : index < currentSlide
                    ? 'bg-midnight-green/70 w-3 h-3 hover:bg-midnight-green/80'
                    : 'bg-midnight-green/30 w-3 h-3 hover:bg-midnight-green/50'
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel des résultats */}
          <div className="relative overflow-hidden h-fit">
            <Carousel
              setApi={setCarouselApi}
              className="w-full h-fit"
              opts={{
                align: 'start',
                loop: false,
              }}
            >
              <CarouselContent className="h-fit">
                {/* Slide 1: Premier parti */}
                <CarouselItem className="h-fit flex justify-center p-1">
                  <PartyCard
                    party={topParty.party}
                    score={topParty.score}
                    rank={1}
                    isChampion={true}
                    delay={0.2}
                  />
                </CarouselItem>

                {/* Slide 2: Deuxième place */}
                {secondParty && (
                  <CarouselItem className="h-fit flex justify-center p-1">
                    <PartyCard
                      party={secondParty.party}
                      score={secondParty.score}
                      rank={2}
                      delay={0.1}
                    />
                  </CarouselItem>
                )}

                {/* Slide 3: Troisième place */}
                {thirdParty && (
                  <CarouselItem className="h-fit flex justify-center p-1">
                    <PartyCard
                      party={thirdParty.party}
                      score={thirdParty.score}
                      rank={3}
                      delay={0.1}
                    />
                  </CarouselItem>
                )}

                {/* Slide 4: Carte politique */}
                <CarouselItem className="h-fit p-1">
                  <CompassSlide />
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="left-2 sm:left-3 bg-midnight-green text-white border-2 border-midnight-green hover:bg-midnight-green/90 hover:border-midnight-green/90 hover:scale-105 h-12 w-12 shadow-lg transition-all duration-200" />
              <CarouselNext className="right-2 sm:right-3 bg-midnight-green text-white border-2 border-midnight-green hover:bg-midnight-green/90 hover:border-midnight-green/90 hover:scale-105 h-12 w-12 shadow-lg transition-all duration-200" />
            </Carousel>
          </div>

          {/* Actions finales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="p-1 border-t border-midnight-green/10 bg-gradient-to-r from-azure-web/20 to-isabelline/20 space-y-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <Button
                asChild
                variant="outline"
                className="rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10 font-medium text-sm py-1"
              >
                <Link href={`/${municipality}/parti/${topParty.party.id}`}>
                  Fiche détaillée
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-lg border-midnight-green text-midnight-green hover:bg-midnight-green/10 font-medium text-sm py-1"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-midnight-green hover:bg-midnight-green/90 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 text-sm py-1"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Voir l&apos;analyse complète
            </Button>
          </motion.div>
        </div>
      </div>

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