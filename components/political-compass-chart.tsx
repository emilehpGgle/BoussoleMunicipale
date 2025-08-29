"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Info, Maximize2, X } from "lucide-react"
import { 
  type PoliticalPosition, 
  calculateUserPoliticalPosition, 
  getPoliticalPositionDescription,
  calculatePoliticalDistance,
  axisConfiguration,
  type UserAnswers,
  calculatePartyPositions,
  calculateMapBounds,
  normalizePositionForDisplay,
  calculateExactCompatibility
} from '@/lib/political-map-calculator'
import { partiesData } from '@/lib/boussole-data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePriorities } from '@/hooks/usePriorities'

interface PoliticalCompassChartProps {
  userAnswers: UserAnswers
  userImportance?: Record<string, unknown> // Paramètre optionnel pour compatibilité, mais non utilisé
}

export default function PoliticalCompassChart({ userAnswers }: PoliticalCompassChartProps) {
  const [hoveredParty, setHoveredParty] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const router = useRouter();
  const { priorities: userPriorities } = usePriorities()

  // Calcul des positions originales (sans compression)
  const userPosition = useMemo(() => {
    return calculateUserPoliticalPosition(userAnswers)
  }, [userAnswers])

  const partyPositions = useMemo(() => {
    return calculatePartyPositions()
  }, [])

  // Description de la position politique
  const positionDescription = useMemo(() => {
    return getPoliticalPositionDescription(userPosition)
  }, [userPosition])

  // Calcul des distances avec les partis (utilisant les positions originales et le calcul unifié)
  const partyDistances = useMemo(() => {
    return Object.entries(partyPositions).map(([partyId, position]) => {
      const party = partiesData.find(p => p.id === partyId)
      const distance = calculatePoliticalDistance(userPosition, position)
      
      // Utiliser le calcul exact identique à resultats/page.tsx
      const partyPriorities = party?.priorities || []
      const compatibility = calculateExactCompatibility(
        userPosition, 
        position, 
        userPriorities || {}, 
        partyPriorities
      )
      
      return {
        party,
        position,
        distance,
        compatibility,
        partyId
      }
    }).filter(item => item.party).sort((a, b) => b.compatibility - a.compatibility) // Trier par compatibilité décroissante
  }, [userPosition, partyPositions, userPriorities])

  // Calcul des limites de la carte pour l'affichage adaptatif
  const mapBounds = useMemo(() => {
    const allPositions = [userPosition, ...Object.values(partyPositions)]
    return calculateMapBounds(allPositions, 30) // Padding de 30 pour l'espacement
  }, [userPosition, partyPositions])

  // Fonction pour convertir les coordonnées politiques en coordonnées SVG
  // Utilise les positions originales sans compression
  const toSVGCoords = (position: PoliticalPosition, width: number, height: number) => {
    const padding = 40
    const canvasSize = Math.min(width, height) - 2 * padding
    
    // Normaliser la position pour l'affichage avec les nouvelles limites
    const normalized = normalizePositionForDisplay(position, mapBounds, canvasSize)
    
    // Centrer dans le SVG et inverser Y pour l'affichage SVG
    const x = normalized.x + padding + (width - canvasSize - 2 * padding) / 2
    const y = height - (normalized.y + padding + (height - canvasSize - 2 * padding) / 2)
    
    return { x, y }
  }

  // Composant SVG réutilisable
  const PoliticalMapSVG = ({ width, height, isFullscreenMode = false }: { width: number, height: number, isFullscreenMode?: boolean }) => (
    <svg 
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Carte politique municipale - Résultats boussole électorale municipale de Québec 2025"
      role="img"
      focusable="false"
      className={`w-full h-auto max-w-full overflow-visible ${isFullscreenMode ? 'min-h-[80vh]' : ''}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <desc>Carte politique municipale de Québec 2025 générée par la boussole électorale municipale. Affiche la position de l&apos;utilisateur et des partis sur deux axes : économique et social.</desc>
      {/* Grille de fond */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Axes principaux */}
      <line 
        x1={40} y1={height/2} 
        x2={width-40} y2={height/2} 
        stroke="hsl(var(--border))" 
        strokeWidth="2"
      />
      <line 
        x1={width/2} y1={40} 
        x2={width/2} y2={height-40} 
        stroke="hsl(var(--border))" 
        strokeWidth="2"
      />

      {/* Labels des axes - Responsive */}
      <text x={50} y={height/2 - 10} fontSize={isFullscreenMode ? "14" : "12"} fill="hsl(var(--muted-foreground))" className="font-medium">
        {axisConfiguration.economic.leftLabel}
      </text>
      <text x={width-40} y={height/2 - 10} fontSize={isFullscreenMode ? "14" : "12"} fill="hsl(var(--muted-foreground))" textAnchor="end" className="font-medium">
        {axisConfiguration.economic.rightLabel}
      </text>
      <text x={width/2 + 10} y={50} fontSize={isFullscreenMode ? "14" : "12"} fill="hsl(var(--muted-foreground))" className="font-medium">
        {axisConfiguration.social.rightLabel}
      </text>
      <text x={width/2 + 10} y={height-50} fontSize={isFullscreenMode ? "14" : "12"} fill="hsl(var(--muted-foreground))" className="font-medium">
        {axisConfiguration.social.leftLabel}
      </text>

      {/* Quadrants colorés avec couleurs vives et contrastées */}
      {/* Quadrant Haut-Gauche: Progressiste + Interventionnisme (Vert émeraude) */}
      <rect
        x={40}
        y={40}
        width={(width-80)/2}
        height={(height-80)/2}
        fill="#10b981"
        opacity="0.15"
      />
      {/* Quadrant Haut-Droite: Progressiste + Libre marché (Bleu cyan) */}
      <rect
        x={width/2}
        y={40}
        width={(width-80)/2}
        height={(height-80)/2}
        fill="#0891b2"
        opacity="0.15"
      />
      {/* Quadrant Bas-Gauche: Conservateur + Interventionnisme (Orange amber) */}
      <rect
        x={40}
        y={height/2}
        width={(width-80)/2}
        height={(height-80)/2}
        fill="#f59e0b"
        opacity="0.12"
      />
      {/* Quadrant Bas-Droite: Conservateur + Libre marché (Violet) */}
      <rect
        x={width/2}
        y={height/2}
        width={(width-80)/2}
        height={(height-80)/2}
        fill="#8b5cf6"
        opacity="0.12"
      />

      {/* Partis politiques */}
      {partyDistances.map(({ party, position, partyId }) => {
        if (!party) return null
        const coords = toSVGCoords(position, width, height)
        const isHovered = hoveredParty === partyId
        const radius = isFullscreenMode ? (isHovered ? 25 : 18) : (isHovered ? 18 : 12)
        
        return (
          <g key={partyId}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(`/parti/${partyId}`)}
            onMouseEnter={() => setHoveredParty(partyId)}
            onMouseLeave={() => setHoveredParty(null)}
            onTouchStart={() => setHoveredParty(partyId)}
            onTouchEnd={() => setHoveredParty(null)}
          >
            {/* Cercle du parti */}
            <circle
              cx={coords.x}
              cy={coords.y}
              r={radius}
              fill="white"
              stroke="#1e40af"
              strokeWidth={isHovered ? 3 : 2}
              className="transition-all duration-200 drop-shadow-md"
            />
            
            {/* Logo du parti (approximation avec initiales) */}
            <text 
              x={coords.x} 
              y={coords.y + (isFullscreenMode ? 6 : 4)} 
              textAnchor="middle" 
              fontSize={isFullscreenMode ? (isHovered ? "12" : "9") : (isHovered ? "8" : "6")} 
              fill="hsl(var(--foreground))"
              className="font-bold transition-all duration-200 pointer-events-none"
            >
              {party.shortName?.substring(0, 3) || party.name.substring(0, 3)}
            </text>
            
            {/* Label du parti */}
            {isHovered && (
              <text 
                x={coords.x} 
                y={coords.y - (isFullscreenMode ? 35 : 25)} 
                textAnchor="middle" 
                fontSize={isFullscreenMode ? "14" : "11"} 
                fill="hsl(var(--foreground))"
                className="font-medium bg-background"
              >
                {party.shortName || party.name}
              </text>
            )}
          </g>
        )
      })}

      {/* Position de l'utilisateur */}
      {(() => {
        const userCoords = toSVGCoords(userPosition, width, height)
        const userRadius = isFullscreenMode ? 15 : 10
        const animationRadius = isFullscreenMode ? 32 : 22
        
        return (
          <g>
            {/* Cercle extérieur animé */}
            <circle
              cx={userCoords.x}
              cy={userCoords.y}
              r={animationRadius}
              fill="none"
              stroke="#1e40af"
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from={`0 ${userCoords.x} ${userCoords.y}`}
                to={`360 ${userCoords.x} ${userCoords.y}`}
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Point principal de l'utilisateur */}
            <circle
              cx={userCoords.x}
              cy={userCoords.y}
              r={userRadius}
              fill="#1e40af"
              stroke="white"
              strokeWidth="4"
              className="drop-shadow-lg"
            />
            
            {/* Label utilisateur */}
            <text 
              x={userCoords.x} 
              y={userCoords.y - (isFullscreenMode ? 45 : 30)} 
              textAnchor="middle" 
              fontSize={isFullscreenMode ? "16" : "12"} 
              fill="hsl(var(--primary))"
              className="font-bold"
            >
              Vous
            </text>
          </g>
        )
      })()}
    </svg>
  )

  // Dimensions responsive : utiliser viewBox au lieu de dimensions fixes
  const svgWidth = 600
  const svgHeight = 400

  return (
    <>
      <Card className="shadow-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <span>Votre position dans le paysage politique</span>
                <Info className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                Positionnement basé sur vos réponses aux enjeux municipaux
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Badge de position avec indicateur de centrage dynamique */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Position économique: {userPosition.x > 0 ? 'Libre marché' : 'Interventionnisme'} ({Math.abs(userPosition.x).toFixed(1)})
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Position sociale: {userPosition.y > 0 ? 'Progressiste' : 'Conservateur'} ({Math.abs(userPosition.y).toFixed(1)})
            </Badge>
            {/* Badge raffiné pour la description de position politique */}
            {positionDescription && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 border border-midnight-green/20 bg-midnight-green/5 text-midnight-green font-medium rounded-full flex items-center gap-1 shadow-sm"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="inline-block mr-1">
                  <circle cx="12" cy="12" r="10" stroke="#60a5fa" strokeWidth="2" fill="#e0f2fe" />
                  <path d="M12 7v5l3 3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {positionDescription}
              </Badge>
            )}
          </div>

          {/* Graphique SVG responsive */}
          <div className="flex justify-center overflow-hidden">
            <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-2 sm:p-4 border w-full max-w-4xl">
              {/* Bouton plein écran repositionné juste au-dessus à droite de la carte */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="md:hidden absolute -top-3 -right-2 z-10 flex items-center gap-2 bg-background/95 backdrop-blur-sm border shadow-md"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Agrandir</span>
              </Button>
              <PoliticalMapSVG width={svgWidth} height={svgHeight} />
            </div>
          </div>

          {/* Parti le plus proche */}
          {partyDistances.length > 0 && (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <h4 className="font-semibold text-black mb-2">Parti le plus compatible :</h4>
              <div className="flex items-center gap-3">
                {partyDistances[0].party?.logoUrl && (
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <Image
                      src={partyDistances[0].party.logoUrl}
                      alt={`Logo ${partyDistances[0].party.name}`}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-black">
                    {partyDistances[0].party?.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Compatibilité : {partyDistances[0].compatibility}% (70% politique + 30% priorités)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Note méthodologique */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
            <strong>Note :</strong> Cette carte positionne votre profil politique selon deux axes principaux : 
            économique (interventionnisme ↔ libre marché) et social/environnemental (conservateur ↔ progressiste). 
            Les positions des partis sont basées sur leurs programmes publics et déclarations officielles.
            <br />
            <strong>📊 Calcul de compatibilité :</strong> Le score combine votre positionnement politique (70%) 
            et l&apos;alignement de vos priorités municipales (30%) pour une évaluation globale plus précise.
          </div>
        </CardContent>
      </Card>

      {/* Modal plein écran */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 sm:p-6">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-lg sm:text-xl font-bold">
              Carte politique - Vue étendue
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          {/* Badges dans la modal */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              Économique: {userPosition.x > 0 ? 'Libre marché' : 'Interventionnisme'} ({Math.abs(userPosition.x).toFixed(1)})
            </Badge>
            <Badge variant="secondary" className="text-xs px-2 py-1">
              Social: {userPosition.y > 0 ? 'Progressiste' : 'Conservateur'} ({Math.abs(userPosition.y).toFixed(1)})
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1 border-midnight-green text-midnight-green">
              {positionDescription}
            </Badge>

          </div>

          {/* Graphique en plein écran */}
          <div className="flex justify-center overflow-auto">
            <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-4 border w-full">
              <PoliticalMapSVG width={800} height={600} isFullscreenMode={true} />
            </div>
          </div>

          {/* Instructions tactiles pour mobile */}
          <div className="text-center text-xs text-muted-foreground mt-2">
            <p>💡 Touchez les cercles des partis pour voir leurs noms</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 