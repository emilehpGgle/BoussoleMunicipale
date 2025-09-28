'use client';

import { useState, useEffect } from 'react';
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
import ShareModal from '@/components/share-modal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '@/components/ui/carousel';

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

  if (!isOpen || !topMatch || !topParties.length) return null;

  // Prendre les top 3 partis
  const top3Parties = topParties.slice(0, 3);


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