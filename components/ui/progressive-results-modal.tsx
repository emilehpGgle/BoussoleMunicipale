'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { X, Share2 } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MedalFirstPlaceIcon,
  MedalSecondPlaceIcon,
  MedalThirdPlaceIcon
} from '@hugeicons/core-free-icons';
import { PartyScore, CalculatedResults } from '@/hooks/useResults';
import { AgreementOptionKey, ImportanceDirectOptionKey } from '@/lib/supabase/types';
import { type Party } from '@/lib/boussole-data';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ShareModal from '@/components/share-modal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '@/components/ui/carousel';
import {
  type PoliticalPosition,
  axisConfiguration,
  calculateMapBounds,
  normalizePositionForDisplay
} from '@/lib/political-map-calculator';
import { calculateUserPoliticalPosition } from '@/lib/political-calculator-db';
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
  <div className={`bg-white rounded-xl p-3 shadow-xl border-2 border-[#EAFCFC] flex items-center justify-center ${className || ""}`}>
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
        <div className="w-full h-full bg-[#04454A]/10 border border-[#04454A]/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-[#04454A] mb-1">
              {party.shortName || party.name.substring(0, 3).toUpperCase()}
            </div>
            <div className="text-xs text-[#222222]/60 leading-tight">
              {party.name.length > 15 ? party.name.substring(0, 15) + '...' : party.name}
            </div>
          </div>
        </div>
      )}
    </LogoContainer>
  );
};

// Composant pour afficher la médaille selon le rang
const RankMedal: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) {
    return <HugeiconsIcon icon={MedalFirstPlaceIcon} size={32} color="#FCD34D" strokeWidth={1.5} />;
  } else if (rank === 2) {
    return <HugeiconsIcon icon={MedalSecondPlaceIcon} size={28} color="#9CA3AF" strokeWidth={1.5} />;
  } else if (rank === 3) {
    return <HugeiconsIcon icon={MedalThirdPlaceIcon} size={24} color="#F97316" strokeWidth={1.5} />;
  }
  return null;
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [hoveredParty, setHoveredParty] = useState<string | null>(null);
  const router = useRouter();

  // États pour la boussole politique
  const [userPosition, setUserPosition] = useState<PoliticalPosition>({ x: 0, y: 0 });
  const [partyPositions, setPartyPositions] = useState<Record<string, PoliticalPosition>>({});

  // Hooks pour données des partis
  const { parties } = useParties(municipality);
  const { positionsByParty } = usePartyPositions(municipality);

  // Calculer la position de l'utilisateur
  useEffect(() => {
    calculateUserPoliticalPosition(userAnswers, municipality)
      .then(position => setUserPosition(position))
      .catch(err => console.error('Erreur calcul position utilisateur:', err))
  }, [userAnswers, municipality]);

  // Calculer les positions des partis
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

  if (!isOpen || !topMatch || !topParties.length) return null;

  // Prendre les top 3 partis
  const top3Parties = topParties.slice(0, 3);

  // Calculs pour la boussole politique
  const mapBounds = useMemo(() => {
    const allPositions = [userPosition, ...Object.values(partyPositions)];
    return calculateMapBounds(allPositions, 30);
  }, [userPosition, partyPositions]);

  // Fonction pour convertir les coordonnées politiques en coordonnées SVG
  const toSVGCoords = (position: PoliticalPosition, width: number, height: number) => {
    const padding = 40;
    const canvasSize = Math.min(width, height) - 2 * padding;

    const normalized = normalizePositionForDisplay(position, mapBounds, canvasSize);

    const x = normalized.x + padding + (width - canvasSize - 2 * padding) / 2;
    const y = height - (normalized.y + padding + (height - canvasSize - 2 * padding) / 2);

    return { x, y };
  };

  // Calcul des données des partis pour la carte
  const partyMapData = useMemo(() => {
    if (!parties || Object.keys(partyPositions).length === 0) return [];

    return Object.entries(partyPositions).map(([partyId, position]) => {
      const party = parties.find(p => p.id === partyId);
      return party ? { party, position, partyId } : null;
    }).filter(item => item !== null);
  }, [parties, partyPositions]);

  // Obtient les initiales d'un parti
  const getPartyInitials = (party: { name: string; shortName?: string }): string => {
    if (party.shortName) return party.shortName;

    const stopWords = ['de', 'du', 'la', 'le', 'des', 'et', 'pour', 'avec', 'sans'];
    return party.name
      .split(' ')
      .filter(word => word.length > 0 && !stopWords.includes(word.toLowerCase()))
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };


  return (
    <>
      {/* Overlay avec z-index élevé */}
      <div
        className="fixed inset-0 bg-[#222222]/70 z-[9999] flex items-center justify-center p-6"
        onClick={onClose}
      >
        {/* Modal monolithique adapté à l'écran - hauteur drastiquement réduite */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] sm:max-h-[80vh] min-h-[400px] sm:min-h-[450px] flex flex-col relative overflow-visible"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header unifié avec titre centré */}
          <div className="p-4 border-b border-[#EAFCFC]/50 flex-shrink-0">
            <div className="relative flex items-center">
              {/* Titre centré */}
              <div className="flex-1 text-center">
                <h2 className="text-xl font-bold text-[#04454A]">Vos Résultats Politiques</h2>
              </div>
              {/* Boutons à droite */}
              <div className="absolute right-0 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShareModalOpen(true)}
                  className="h-8 w-8 hover:bg-[#EAFCFC] transition-colors"
                >
                  <Share2 className="h-4 w-4 text-[#04454A]" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 hover:bg-[#EAFCFC] transition-colors"
                >
                  <X className="h-4 w-4 text-[#04454A]" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-[#222222]/70 mt-1 text-center">Découvrez vos affinités avec les partis</p>
          </div>

          {/* Carousel pour les top 3 partis - sans padding horizontal */}
          <div className="flex-1 relative min-h-0 p-1">
            <Carousel key={`carousel-${top3Parties.length}`} className="w-full h-full relative" initialIndex={0}>
              <CarouselContent className="ml-0">
                {top3Parties.map((party, index) => (
                  <CarouselItem key={party.party.id} className="pl-0">
                    <div className="flex flex-col items-center justify-center py-1 px-1 space-y-1 h-full">
                      {/* Logo du parti cliquable avec médaille badge */}
                      <div className="flex justify-center">
                        <Link href={`/${municipality}/parti/${party.party.id}`}>
                          <div className="relative inline-block">
                            <PartyLogo
                              party={party.party}
                              size={{ width: 180, height: 180 }}
                              className="w-40 h-40 cursor-pointer hover:scale-105 transition-transform"
                            />
                            {/* Médaille badge superposée */}
                            <div className="absolute -top-1 -right-1 z-10">
                              <RankMedal rank={index + 1} />
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Nom du parti */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-[#04454A] mb-1">
                          {party.party.name}
                        </h3>
                        {index === 0 && (
                          <span className="inline-block px-2 py-1 bg-[#04454A] text-white text-xs font-semibold rounded-full">
                            Meilleur match
                          </span>
                        )}
                      </div>

                      {/* Score avec animation */}
                      <div className="w-full max-w-xs space-y-2">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#04454A] mb-1">
                            {party.score}%
                          </div>
                          <div className="text-sm text-[#222222]/60">d&apos;affinité politique</div>
                        </div>

                        {/* Barre de progression */}
                        <div className="w-full bg-[#EAFCFC] rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#04454A] to-[#04454A]/70 h-3 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${party.score}%` }}
                          />
                        </div>
                      </div>

                      {/* Description du match */}
                      <p className="text-center text-sm text-[#222222]/70 px-2">
                        {index === 0
                          ? `Vos opinions s'alignent fortement avec celles de ${party.party.name}.`
                          : index === 1
                          ? `${party.party.name} partage plusieurs de vos priorités.`
                          : `Une bonne compatibilité existe avec ${party.party.name}.`
                        }
                      </p>

                    </div>
                  </CarouselItem>
                ))}

                {/* Page boussole politique */}
                <CarouselItem key="political-compass" className="pl-0">
                  <div className="flex flex-col items-center justify-center py-2 px-2 space-y-2 h-full">
                    {/* Titre minimal */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-[#04454A]">
                        Votre Position Politique
                      </h3>
                    </div>

                    {/* Carte politique simplifiée */}
                    <div className="w-full flex-1 flex items-center justify-center min-h-0">
                      <svg
                        viewBox="0 0 400 300"
                        className="w-full h-full max-w-full max-h-full"
                        style={{ aspectRatio: '400/300' }}
                      >
                        {/* Grille de fond */}
                        <defs>
                          <pattern id="grid-modal" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-modal)" />

                        {/* Axes principaux */}
                        <line x1={30} y1={150} x2={370} y2={150} stroke="#94a3b8" strokeWidth="2"/>
                        <line x1={200} y1={30} x2={200} y2={270} stroke="#94a3b8" strokeWidth="2"/>

                        {/* Labels des axes */}
                        <text x={35} y={145} fontSize="9" fill="#64748b" className="font-medium">
                          {axisConfiguration.economic.leftLabel.split(' ')[0]}
                        </text>
                        <text x={365} y={145} fontSize="9" fill="#64748b" textAnchor="end" className="font-medium">
                          {axisConfiguration.economic.rightLabel.split(' ')[0]}
                        </text>
                        <text x={205} y={40} fontSize="9" fill="#64748b" className="font-medium">
                          {axisConfiguration.social.rightLabel}
                        </text>
                        <text x={205} y={265} fontSize="9" fill="#64748b" className="font-medium">
                          {axisConfiguration.social.leftLabel}
                        </text>

                        {/* Quadrants colorés */}
                        <rect x={30} y={30} width={170} height={120} fill="#10b981" opacity="0.1"/>
                        <rect x={200} y={30} width={170} height={120} fill="#0891b2" opacity="0.1"/>
                        <rect x={30} y={150} width={170} height={120} fill="#f59e0b" opacity="0.1"/>
                        <rect x={200} y={150} width={170} height={120} fill="#8b5cf6" opacity="0.1"/>

                        {/* Partis politiques - non-survolés (arrière-plan) */}
                        {partyMapData.filter(({ partyId }) => partyId !== hoveredParty).map(({ party, position, partyId }) => {
                          const coords = toSVGCoords(position, 400, 300);

                          return (
                            <g
                              key={partyId}
                              style={{ cursor: 'pointer' }}
                              onClick={() => router.push(`/${municipality}/parti/${partyId}`)}
                              onMouseEnter={() => setHoveredParty(partyId)}
                              onMouseLeave={() => setHoveredParty(null)}
                              onTouchStart={() => setHoveredParty(partyId)}
                              onTouchEnd={() => setHoveredParty(null)}
                            >
                              <circle
                                cx={coords.x}
                                cy={coords.y}
                                r={8}
                                fill="white"
                                stroke="#1e40af"
                                strokeWidth={1.5}
                                className="drop-shadow-sm transition-all duration-200"
                              />
                              <text
                                x={coords.x}
                                y={coords.y + 3}
                                textAnchor="middle"
                                fontSize="6"
                                fill="#0f172a"
                                className="font-bold transition-all duration-200 pointer-events-none"
                              >
                                {getPartyInitials(party)}
                              </text>
                            </g>
                          );
                        })}

                        {/* Cercles de l'utilisateur (au-dessus des partis normaux) */}
                        {(() => {
                          const userCoords = toSVGCoords(userPosition, 400, 300);
                          return (
                            <g>
                              {/* Cercle extérieur animé */}
                              <circle
                                cx={userCoords.x}
                                cy={userCoords.y}
                                r={15}
                                fill="none"
                                stroke="#1e40af"
                                strokeWidth="2"
                                strokeDasharray="6,3"
                                opacity="0.8"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  attributeType="XML"
                                  type="rotate"
                                  from={`0 ${userCoords.x} ${userCoords.y}`}
                                  to={`360 ${userCoords.x} ${userCoords.y}`}
                                  dur="8s"
                                  repeatCount="indefinite"
                                />
                              </circle>

                              {/* Point principal de l'utilisateur */}
                              <circle
                                cx={userCoords.x}
                                cy={userCoords.y}
                                r={6}
                                fill="#1e40af"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-lg"
                              />
                            </g>
                          );
                        })()}

                        {/* Parti survolé (premier plan absolu) */}
                        {hoveredParty && (() => {
                          const hoveredData = partyMapData.find(({ partyId }) => partyId === hoveredParty);
                          if (!hoveredData) return null;

                          const coords = toSVGCoords(hoveredData.position, 400, 300);

                          return (
                            <g
                              key={`${hoveredParty}-hovered`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => router.push(`/${municipality}/parti/${hoveredParty}`)}
                              onMouseEnter={() => setHoveredParty(hoveredParty)}
                              onMouseLeave={() => setHoveredParty(null)}
                              onTouchStart={() => setHoveredParty(hoveredParty)}
                              onTouchEnd={() => setHoveredParty(null)}
                            >
                              <circle
                                cx={coords.x}
                                cy={coords.y}
                                r={12}
                                fill="white"
                                stroke="#1e40af"
                                strokeWidth={2}
                                className="drop-shadow-lg transition-all duration-200"
                              />
                              <text
                                x={coords.x}
                                y={coords.y + 3}
                                textAnchor="middle"
                                fontSize="7"
                                fill="#0f172a"
                                className="font-bold transition-all duration-200 pointer-events-none"
                              >
                                {getPartyInitials(hoveredData.party)}
                              </text>
                            </g>
                          );
                        })()}

                        {/* Tous les labels (premier plan absolu) */}
                        <g className="all-labels">
                          {/* Label utilisateur (toujours visible) */}
                          {(() => {
                            const userCoords = toSVGCoords(userPosition, 400, 300);
                            return (
                              <text
                                x={userCoords.x}
                                y={userCoords.y - 22}
                                textAnchor="middle"
                                fontSize="8"
                                fill="#1e40af"
                                className="font-bold"
                              >
                                Vous
                              </text>
                            );
                          })()}

                          {/* Labels de hover des partis */}
                          {hoveredParty && (() => {
                            const hoveredData = partyMapData.find(({ partyId }) => partyId === hoveredParty);
                            if (!hoveredData) return null;

                            const coords = toSVGCoords(hoveredData.position, 400, 300);
                            const partyName = hoveredData.party.shortName || hoveredData.party.name;

                            // Calcul approximatif de la largeur du texte (8px par caractère pour fontSize 10)
                            const textWidth = partyName.length * 7;
                            const rectWidth = textWidth + 12; // Padding de 6px de chaque côté
                            const rectHeight = 18;

                            return (
                              <g className="label-with-background">
                                {/* Rectangle background */}
                                <rect
                                  x={coords.x - rectWidth/2}
                                  y={coords.y - 32}
                                  width={rectWidth}
                                  height={rectHeight}
                                  fill="white"
                                  opacity="0.95"
                                  rx="4"
                                  ry="4"
                                  stroke="#e2e8f0"
                                  strokeWidth="0.5"
                                  className="drop-shadow-sm"
                                />
                                {/* Texte par-dessus */}
                                <text
                                  x={coords.x}
                                  y={coords.y - 20}
                                  textAnchor="middle"
                                  fontSize="10"
                                  fill="#0f172a"
                                  className="font-medium pointer-events-none"
                                >
                                  {partyName}
                                </text>
                              </g>
                            );
                          })()}
                        </g>
                      </svg>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Navigation du carousel - pattern par défaut */}
              <CarouselNavigation
                alwaysShow
                classNameButton="bg-white/90 hover:bg-white border-2 border-[#04454A]/20 shadow-lg backdrop-blur-sm"
              />

            </Carousel>
          </div>

          {/* Actions simplifiées */}
          <div className="p-4 border-t border-[#EAFCFC]/50 flex-shrink-0">
            <Button
              onClick={onClose}
              className="w-full bg-[#04454A] hover:bg-[#04454A]/90 text-white py-2 text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Voir l&apos;analyse complète
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de partage */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        results={results}
        politicalPosition={results?.politicalPosition}
        userAnswers={userAnswers}
        userImportance={userImportance}
        calculatedScores={calculatedScores}
        topParties={topParties}
        municipality={municipality}
      />
    </>
  );
}