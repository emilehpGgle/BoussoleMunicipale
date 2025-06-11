"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserResponses } from "@/hooks/useUserResponses"
import { useResults } from "@/hooks/useResults"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, BarChart3, CheckCircle2, Clock, Loader2 } from "lucide-react"

type ExistingResponsesModalProps = {
  isOpen: boolean
  onClose: () => void
  onContinueNew: () => void // Callback pour continuer avec nouveau questionnaire
}

export default function ExistingResponsesModal({ 
  isOpen, 
  onClose, 
  onContinueNew 
}: ExistingResponsesModalProps) {
  const [isClearing, setIsClearing] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  
  // Utiliser nos hooks pour obtenir les données existantes
  const { getResponseCounts, clearAllResponses, lastSaved } = useUserResponses()
  const { hasResults, results, clearResults } = useResults()
  
  // Obtenir les statistiques des réponses
  const responseCounts = getResponseCounts()
  const completionPercentage = Math.round((responseCounts.total / 20) * 100) // 20 questions totales

  // Formater la date de dernière sauvegarde
  const formatLastSaved = () => {
    if (!lastSaved) return "Date inconnue"
    
    const now = new Date()
    const diff = now.getTime() - lastSaved.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return "Aujourd'hui"
    } else if (days === 1) {
      return "Hier"
    } else if (days < 7) {
      return `Il y a ${days} jours`
    } else {
      return lastSaved.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }

  // Gérer la consultation des résultats existants
  const handleViewResults = async () => {
    setIsNavigating(true)
    try {
      onClose()
      router.push("/resultats")
    } catch (error) {
      console.error('Erreur lors de la navigation vers les résultats:', error)
      setIsNavigating(false)
    }
  }

  // Gérer le redémarrage à zéro
  const handleStartFresh = async () => {
    setIsClearing(true)
    try {
      // Effacer toutes les réponses existantes
      await clearAllResponses()
      
      // Effacer les résultats existants
      if (hasResults) {
        await clearResults()
      }
      
      // Fermer le modal et continuer avec le nouveau questionnaire
      onClose()
      onContinueNew()
      
    } catch (error) {
      console.error('Erreur lors de l\'effacement des données:', error)
      // En cas d'erreur, on peut quand même continuer
      onClose()
      onContinueNew()
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl bg-white border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            Questionnaire déjà complété !
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Nous avons trouvé des réponses existantes. Que souhaitez-vous faire ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Résumé des réponses existantes */}
          <Card className="bg-green-50 border border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Dernière sauvegarde : {formatLastSaved()}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {completionPercentage}% complété
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-green-700">
                <p>
                  <strong>{responseCounts.total}</strong> questions répondues sur 20
                </p>
                {hasResults && (
                  <p className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Résultats disponibles
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Options disponibles */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground mb-2">
              Choisissez une option :
            </div>
            
            {/* Option 1: Voir les résultats */}
            <Button
              onClick={handleViewResults}
              disabled={isNavigating || isClearing}
              className="w-full justify-start h-auto p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isNavigating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <BarChart3 className="h-5 w-5" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold">Consulter mes résultats</div>
                  <div className="text-sm opacity-90">
                    Voir mes affinités politiques et comparaisons avec les partis
                  </div>
                </div>
              </div>
            </Button>

            {/* Option 2: Recommencer à zéro */}
            <Button
              onClick={handleStartFresh}
              disabled={isNavigating || isClearing}
              variant="outline"
              className="w-full justify-start h-auto p-4 border-2 hover:bg-muted/50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isClearing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-5 w-5" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold">Recommencer à zéro</div>
                  <div className="text-sm text-muted-foreground">
                    Effacer mes réponses et refaire le questionnaire complet
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="rounded-xl"
            disabled={isNavigating || isClearing}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 