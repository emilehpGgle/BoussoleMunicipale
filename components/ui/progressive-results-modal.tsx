'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
// Dialog remplacé par modal custom pour containment
import { Button } from '@/components/ui/button';
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


// Composant MiniCompass avec palette cohérente - mémorisé pour performance
const MiniCompass: React.FC<{
  userAnswers: UserAnswers;
  municipality: string;
  topParties: Array<{ party: Party; score: number; }>;
  onUserPositionChange?: (position: PoliticalPosition) => void;
}> = memo(function MiniCompass({ userAnswers, municipality, topParties, onUserPositionChange }) {
  const { parties, loading: partiesLoading } = useParties(municipality);
  const { positionsByParty, isLoading: positionsLoading } = usePartyPositions(municipality);

  // Calcul des positions
  const [userPosition, setUserPosition] = useState<PoliticalPosition>({ x: 0, y: 0 });
  const [partyPositions, setPartyPositions] = useState<Record<string, PoliticalPosition>>({});

  useEffect(() => {
    // Debug: Vérifier les données d'entrée comme sur la page principale
    console.log('🔍 [MODAL-DEBUG] userAnswers passé à calculateUserPoliticalPosition:', {
      count: Object.keys(userAnswers).length,
      sample: Object.entries(userAnswers).slice(0, 5).map(([k, v]) => `${k}: ${v}`)
    });

    calculateUserPoliticalPosition(userAnswers, municipality)
      .then(position => {
        console.log('🔍 [MODAL-DEBUG] Position utilisateur calculée:', position);
        setUserPosition(position);
        // Notifier le parent de la nouvelle position
        onUserPositionChange?.(position);
      })
      .catch(err => console.error('Erreur calcul position utilisateur:', err));
  }, [userAnswers, municipality, onUserPositionChange]);

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
    const padding = 25;
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

  const svgWidth = 400;
  const svgHeight = 280;

  return (
    <div className="bg-white rounded-xl p-1 border-2 border-midnight-green shadow-soft">
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
        <line x1={25} y1={svgHeight/2} x2={svgWidth-25} y2={svgHeight/2} stroke="#04454A" strokeWidth="2" opacity="0.6"/>
        <line x1={svgWidth/2} y1={25} x2={svgWidth/2} y2={svgHeight-25} stroke="#04454A" strokeWidth="2" opacity="0.6"/>

        {/* Labels des axes avec couleurs cohérentes */}
        <text x={35} y={svgHeight/2 - 8} fontSize="11" fill="#04454A" className="font-medium">
          {axisConfiguration.economic.leftLabel}
        </text>
        <text x={svgWidth-25} y={svgHeight/2 - 8} fontSize="11" fill="#04454A" textAnchor="end" className="font-medium">
          {axisConfiguration.economic.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={35} fontSize="11" fill="#04454A" className="font-medium">
          {axisConfiguration.social.rightLabel}
        </text>
        <text x={svgWidth/2 + 8} y={svgHeight-35} fontSize="11" fill="#04454A" className="font-medium">
          {axisConfiguration.social.leftLabel}
        </text>

        {/* Quadrants colorés avec palette cohérente */}
        <rect x={25} y={25} width={(svgWidth-50)/2} height={(svgHeight-50)/2} fill="#10b981" opacity="0.12"/>
        <rect x={svgWidth/2} y={25} width={(svgWidth-50)/2} height={(svgHeight-50)/2} fill="#0891b2" opacity="0.12"/>
        <rect x={25} y={svgHeight/2} width={(svgWidth-50)/2} height={(svgHeight-50)/2} fill="#f59e0b" opacity="0.10"/>
        <rect x={svgWidth/2} y={svgHeight/2} width={(svgWidth-50)/2} height={(svgHeight-50)/2} fill="#8b5cf6" opacity="0.10"/>

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
});

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<ReturnType<typeof import('embla-carousel-react').default>[1] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset state when modal opens/closes - stabilisé
  useEffect(() => {
    if (isOpen && topMatch) {
      // Reset d'abord tout l'état
      setCurrentSlide(0);
      setShowContent(false);

      // Puis animer avec délai
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // Nettoyage immédiat à la fermeture
      setShowContent(false);
      setCurrentSlide(0);
    }
  }, [isOpen, topMatch]);

  // Update carousel state - sécurisé contre les crashes
  useEffect(() => {
    if (!carouselApi || !isOpen) return;

    const handleSelect = () => {
      try {
        const selectedIndex = carouselApi.selectedScrollSnap();
        if (typeof selectedIndex === 'number' && selectedIndex >= 0) {
          setCurrentSlide(selectedIndex);
        }
      } catch (_error) {
        console.warn('Erreur carousel select:', _error);
        // Fallback silencieux
      }
    };

    // Sécuriser l'événement
    try {
      carouselApi.on('select', handleSelect);
      // Initialiser le slide courant
      handleSelect();
    } catch (_error) {
      console.warn('Erreur initialisation carousel:', _error);
    }

    return () => {
      try {
        carouselApi.off('select', handleSelect);
      } catch (_error) {
        // Nettoyage silencieux
      }
    };
  }, [carouselApi, isOpen]);

  // Mémorisation des partis pour éviter les re-calculs (doit être avant tout return conditionnel)
  const { topParty, secondParty, thirdParty } = useMemo(() => ({
    topParty: topParties[0],
    secondParty: topParties[1],
    thirdParty: topParties[2]
  }), [topParties]);

  const politicalPosition = useMemo(() =>
    results?.politicalPosition ? { x: results.politicalPosition.x, y: results.politicalPosition.y } : undefined
  , [results?.politicalPosition]);

  if (!topMatch || !topParties.length) return null;

  // Composant carte de parti - design professionnel et moderne
  const PartyCard: React.FC<{
    party: Party;
    score: number;
    rank: number;
    isChampion?: boolean;
    delay?: number;
  }> = memo(function PartyCard({ party, score, rank, isChampion = false, delay = 0 }) {
    const getRankConfig = (rank: number) => {
      switch (rank) {
        case 1:
          return {
            rankLabel: '1er',
            bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
            borderColor: 'border-amber-200',
            accentColor: 'bg-amber-500',
            textColor: 'text-amber-700',
            ringColor: 'ring-amber-200'
          };
        case 2:
          return {
            rankLabel: '2e',
            bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
            borderColor: 'border-slate-200',
            accentColor: 'bg-slate-500',
            textColor: 'text-slate-700',
            ringColor: 'ring-slate-200'
          };
        case 3:
          return {
            rankLabel: '3e',
            bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
            borderColor: 'border-orange-200',
            accentColor: 'bg-orange-500',
            textColor: 'text-orange-700',
            ringColor: 'ring-orange-200'
          };
        default:
          return {
            rankLabel: `${rank}e`,
            bgColor: 'bg-white',
            borderColor: 'border-gray-200',
            accentColor: 'bg-gray-500',
            textColor: 'text-gray-700',
            ringColor: 'ring-gray-200'
          };
      }
    };

    const rankConfig = getRankConfig(rank);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.5, delay }}
        className="w-full max-w-md mx-auto px-6 py-8"
      >
        {/* Container principal avec design moderne */}
        <div className={`${rankConfig.bgColor} ${rankConfig.borderColor} border-2 rounded-3xl p-8 relative shadow-lg hover:shadow-xl transition-all duration-300 ${isChampion ? rankConfig.ringColor + ' ring-4' : ''}`}>

          {/* Badge de rang moderne */}
          <div className="absolute -top-3 -right-3">
            <div className={`${rankConfig.accentColor} text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg font-bold text-lg transform rotate-12`}>
              {rankConfig.rankLabel}
            </div>
          </div>

          {/* Logo avec container moderne */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <PartyLogo
                party={party}
                size={{ width: 120, height: 120 }}
                className="w-30 h-30"
              />
            </div>
          </div>

          {/* Nom du parti */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {party.shortName || party.name}
            </h3>
            {party.shortName && (
              <p className="text-sm text-gray-600">
                {party.name}
              </p>
            )}
          </div>

          {/* Score avec design moderne */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Affinité politique</span>
              <span className={`text-lg font-bold ${rankConfig.textColor}`}>{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`${rankConfig.accentColor} h-3 rounded-full shadow-sm`}
                initial={{ width: "0%" }}
                animate={{ width: showContent ? `${score}%` : "0%" }}
                transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Action pour le champion */}
          {isChampion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
              transition={{ duration: 0.4, delay: delay + 0.8 }}
              className="text-center"
            >
              <Button
                asChild
                className="bg-midnight-green hover:bg-midnight-green/90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
              >
                <Link href={`/${municipality}/parti/${party.id}`}>
                  Voir la fiche complète
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  });

  // Composant pour la slide de la carte politique - design moderne
  const CompassSlide: React.FC = memo(function CompassSlide() {
    // État pour la position utilisateur calculée dynamiquement
    const [dynamicUserPosition, setDynamicUserPosition] = useState<PoliticalPosition>({ x: 0, y: 0 });

    const handleUserPositionChange = useCallback((position: PoliticalPosition) => {
      setDynamicUserPosition(position);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mx-auto px-6 py-8"
      >
        {/* En-tête moderne */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-midnight-green/10 p-3 rounded-full">
              <Compass className="h-6 w-6 text-midnight-green" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Votre Position Politique
          </h3>
          <p className="text-gray-600 text-sm">
            Positionnement sur la boussole municipale
          </p>
        </div>

        {/* Indicateurs de position modernes */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-1">Économique</div>
            <div className="text-lg font-bold text-gray-900">
              {(dynamicUserPosition.x || 0) > 0 ? 'Marché' : 'Interv.'}
            </div>
            <div className="text-xs text-gray-500">
              {Math.abs(dynamicUserPosition.x || 0).toFixed(1)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-1">Social</div>
            <div className="text-lg font-bold text-gray-900">
              {(dynamicUserPosition.y || 0) > 0 ? 'Progressiste' : 'Conservateur'}
            </div>
            <div className="text-xs text-gray-500">
              {Math.abs(dynamicUserPosition.y || 0).toFixed(1)}
            </div>
          </div>
        </div>

        {/* Description de position */}
        {(dynamicUserPosition.x !== 0 || dynamicUserPosition.y !== 0) && (
          <div className="text-center mb-6">
            <div className="bg-midnight-green/5 border border-midnight-green/20 rounded-2xl px-4 py-3">
              <div className="text-sm font-medium text-midnight-green">
                {getPoliticalPositionDescription(dynamicUserPosition)}
              </div>
            </div>
          </div>
        )}

        {/* Mini Compass avec design moderne */}
        <div className="mb-6">
          <MiniCompass
            userAnswers={userAnswers as UserAnswers}
            municipality={municipality}
            topParties={topParties}
            onUserPositionChange={handleUserPositionChange}
          />
        </div>

        {/* Légende moderne */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-2">Légende</div>
            <div className="text-xs text-gray-500">
              Les bordures colorées indiquent votre top 3 des affinités politiques
            </div>
          </div>
        </div>
      </motion.div>
    );
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay avec centrage CSS Grid moderne */}
      <div
        className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal container - design professionnel */}
        <div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl
                     min-h-[600px] max-h-[85vh] flex flex-col
                     border border-gray-200/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton fermer - design moderne */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 hover:bg-gray-100 rounded-full h-10 w-10 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* En-tête professionnel */}
          <div className="text-center px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50 flex-shrink-0">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-midnight-green/10 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-midnight-green" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vos Résultats Politiques
            </h2>
            <p className="text-gray-600 text-sm">
              Découvrez vos affinités et votre positionnement politique
            </p>
          </div>

          {/* Navigation moderne et discrète */}
          <div className="flex justify-center gap-3 py-4 border-b border-gray-100 flex-shrink-0">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  try {
                    if (carouselApi && typeof carouselApi.scrollTo === 'function') {
                      carouselApi.scrollTo(index);
                    }
                  } catch (error) {
                    console.warn('Erreur navigation carousel:', error);
                  }
                }}
                disabled={!carouselApi}
                className={`transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  currentSlide === index
                    ? 'bg-midnight-green w-8 h-2 rounded-full shadow-sm'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2 rounded-full'
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Contenu principal */}
          <div className="relative flex-1 overflow-hidden">
            <Carousel
              setApi={setCarouselApi}
              className="w-full h-full"
              opts={{
                align: 'center',
                loop: false,
                skipSnaps: false,
                dragFree: false,
              }}
            >
              <CarouselContent className="h-full ml-0">
                {/* Slide 1: Premier parti */}
                <CarouselItem className="flex items-center justify-center py-4">
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
                  <CarouselItem className="flex items-center justify-center py-4">
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
                  <CarouselItem className="flex items-center justify-center py-4">
                    <PartyCard
                      party={thirdParty.party}
                      score={thirdParty.score}
                      rank={3}
                      delay={0.1}
                    />
                  </CarouselItem>
                )}

                {/* Slide 4: Carte politique */}
                <CarouselItem className="flex items-center justify-center py-4">
                  <CompassSlide />
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="left-4 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:scale-105 h-10 w-10 shadow-lg transition-all duration-200" />
              <CarouselNext className="right-4 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:scale-105 h-10 w-10 shadow-lg transition-all duration-200" />
            </Carousel>
          </div>

          {/* Actions finales modernisées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 space-y-4 flex-shrink-0"
          >
            <div className="grid grid-cols-2 gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium py-3"
              >
                <Link href={`/${municipality}/parti/${topParty.party.id}`}>
                  Fiche détaillée
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium py-3"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 py-3"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
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