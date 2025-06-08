"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, RefreshCw } from "lucide-react"
import { 
  type PoliticalPosition, 
  calculateUserPoliticalPosition, 
  getPoliticalPositionDescription,
  calculatePoliticalDistance,
  partyPositions,
  axisConfiguration,
  type UserAnswers,
  type UserImportance
} from '@/lib/political-map-calculator'
import { partiesData } from '@/lib/boussole-data'
import Image from 'next/image'

interface PoliticalCompassChartProps {
  userAnswers: UserAnswers
  userImportance: UserImportance
}

export default function PoliticalCompassChart({ userAnswers, userImportance }: PoliticalCompassChartProps) {
  const [selectedAxis, setSelectedAxis] = useState<'default' | 'alternative'>('default')
  const [hoveredParty, setHoveredParty] = useState<string | null>(null)

  // Calcul de la position de l'utilisateur
  const userPosition = useMemo(() => {
    return calculateUserPoliticalPosition(userAnswers, userImportance)
  }, [userAnswers, userImportance])

  // Description de la position politique
  const positionDescription = useMemo(() => {
    return getPoliticalPositionDescription(userPosition)
  }, [userPosition])

  // Calcul des distances avec les partis
  const partyDistances = useMemo(() => {
    return Object.entries(partyPositions).map(([partyId, position]) => {
      const party = partiesData.find(p => p.id === partyId)
      const distance = calculatePoliticalDistance(userPosition, position)
      return {
        party,
        position,
        distance,
        partyId
      }
    }).filter(item => item.party).sort((a, b) => a.distance - b.distance)
  }, [userPosition])

  // Fonction pour convertir les coordonnées politiques en coordonnées SVG
  const toSVGCoords = (position: PoliticalPosition, width: number, height: number) => {
    const padding = 40
    const x = ((position.x + 100) / 200) * (width - 2 * padding) + padding
    const y = height - (((position.y + 100) / 200) * (height - 2 * padding) + padding)
    return { x, y }
  }

  const svgWidth = 600
  const svgHeight = 400

  return (
    <Card className="shadow-soft rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>Votre position dans le paysage politique</span>
              <Info className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>
              Positionnement basé sur vos réponses aux enjeux municipaux
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedAxis(selectedAxis === 'default' ? 'alternative' : 'default')}
            className="hidden md:flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Changer d'axes
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Badge de position */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Position économique: {userPosition.x > 0 ? 'Libre marché' : 'Interventionnisme'} ({Math.abs(userPosition.x).toFixed(0)})
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Position sociale: {userPosition.y > 0 ? 'Progressiste' : 'Conservateur'} ({Math.abs(userPosition.y).toFixed(0)})
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1 border-primary text-primary">
            {positionDescription}
          </Badge>
        </div>

        {/* Graphique SVG */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl p-4 border">
            <svg width={svgWidth} height={svgHeight} className="overflow-visible">
              {/* Grille de fond */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Axes principaux */}
              <line 
                x1={40} y1={svgHeight/2} 
                x2={svgWidth-40} y2={svgHeight/2} 
                stroke="hsl(var(--border))" 
                strokeWidth="2"
              />
              <line 
                x1={svgWidth/2} y1={40} 
                x2={svgWidth/2} y2={svgHeight-40} 
                stroke="hsl(var(--border))" 
                strokeWidth="2"
              />

              {/* Labels des axes */}
              <text x={50} y={svgHeight/2 - 10} fontSize="12" fill="hsl(var(--muted-foreground))" className="font-medium">
                {axisConfiguration.economic.leftLabel}
              </text>
              <text x={svgWidth-40} y={svgHeight/2 - 10} fontSize="12" fill="hsl(var(--muted-foreground))" textAnchor="end" className="font-medium">
                {axisConfiguration.economic.rightLabel}
              </text>
              <text x={svgWidth/2 + 10} y={50} fontSize="12" fill="hsl(var(--muted-foreground))" className="font-medium">
                {axisConfiguration.social.rightLabel}
              </text>
              <text x={svgWidth/2 + 10} y={svgHeight-50} fontSize="12" fill="hsl(var(--muted-foreground))" className="font-medium">
                {axisConfiguration.social.leftLabel}
              </text>

              {/* Quadrants colorés avec couleurs vives et contrastées */}
              {/* Quadrant Haut-Gauche: Progressiste + Interventionnisme (Vert émeraude) */}
              <rect
                x={40}
                y={40}
                width={(svgWidth-80)/2}
                height={(svgHeight-80)/2}
                fill="#10b981"
                opacity="0.15"
              />
              {/* Quadrant Haut-Droite: Progressiste + Libre marché (Bleu cyan) */}
              <rect
                x={svgWidth/2}
                y={40}
                width={(svgWidth-80)/2}
                height={(svgHeight-80)/2}
                fill="#0891b2"
                opacity="0.15"
              />
              {/* Quadrant Bas-Gauche: Conservateur + Interventionnisme (Orange amber) */}
              <rect
                x={40}
                y={svgHeight/2}
                width={(svgWidth-80)/2}
                height={(svgHeight-80)/2}
                fill="#f59e0b"
                opacity="0.12"
              />
              {/* Quadrant Bas-Droite: Conservateur + Libre marché (Violet) */}
              <rect
                x={svgWidth/2}
                y={svgHeight/2}
                width={(svgWidth-80)/2}
                height={(svgHeight-80)/2}
                fill="#8b5cf6"
                opacity="0.12"
              />

              {/* Partis politiques */}
              {partyDistances.map(({ party, position, partyId }) => {
                if (!party) return null
                const coords = toSVGCoords(position, svgWidth, svgHeight)
                const isHovered = hoveredParty === partyId
                
                return (
                  <g key={partyId}>
                    {/* Cercle du parti */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 18 : 12}
                      fill="white"
                      stroke="#1e40af"
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all duration-200 cursor-pointer drop-shadow-md"
                      onMouseEnter={() => setHoveredParty(partyId)}
                      onMouseLeave={() => setHoveredParty(null)}
                    />
                    
                    {/* Logo du parti (approximation avec initiales) */}
                    <text 
                      x={coords.x} 
                      y={coords.y + 4} 
                      textAnchor="middle" 
                      fontSize={isHovered ? "8" : "6"} 
                      fill="hsl(var(--foreground))"
                      className="font-bold transition-all duration-200 pointer-events-none"
                    >
                      {party.shortName?.substring(0, 3) || party.name.substring(0, 3)}
                    </text>
                    
                    {/* Label du parti */}
                    {isHovered && (
                      <text 
                        x={coords.x} 
                        y={coords.y - 25} 
                        textAnchor="middle" 
                        fontSize="11" 
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
                const userCoords = toSVGCoords(userPosition, svgWidth, svgHeight)
                return (
                  <g>
                    {/* Cercle extérieur animé */}
                    <circle
                      cx={userCoords.x}
                      cy={userCoords.y}
                      r="22"
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
                      r="10"
                      fill="#1e40af"
                      stroke="white"
                      strokeWidth="4"
                      className="drop-shadow-lg"
                    />
                    
                    {/* Label utilisateur */}
                    <text 
                      x={userCoords.x} 
                      y={userCoords.y - 30} 
                      textAnchor="middle" 
                      fontSize="12" 
                      fill="hsl(var(--primary))"
                      className="font-bold"
                    >
                      Vous
                    </text>
                  </g>
                )
              })()}
            </svg>
          </div>
        </div>

        {/* Parti le plus proche */}
        {partyDistances.length > 0 && (
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Parti le plus proche idéologiquement :</h4>
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
                <p className="font-medium text-primary">
                  {partyDistances[0].party?.name}
                </p>
                <p className="text-sm text-primary/80">
                  Distance idéologique : {partyDistances[0].distance.toFixed(1)} points
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Note méthodologique */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <strong>Note :</strong> Cette carte positionne votre profil politique selon deux axes principaux : 
          économique (interventionnisme ↔ libre marché) et social/environnemental (conservateur ↔ progressiste). 
          Les positions des partis sont approximatives et basées sur leurs programmes publics.
        </div>
      </CardContent>
    </Card>
  )
} 