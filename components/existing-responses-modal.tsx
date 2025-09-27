"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RotateCcw, Play, FileText, BarChart3 } from "lucide-react"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useRouter, useParams } from "next/navigation"
import { boussoleQuestions } from "@/lib/boussole-data"

interface ContinueOrRestartModalProps {
  isOpen: boolean
  onClose: () => void
  targetPath?: string // "/" par défaut pour l'accueil, mais peut être "/test-politique-municipal" etc.
}

export default function ContinueOrRestartModal({ 
  isOpen, 
  onClose, 
  targetPath = "/" 
}: ContinueOrRestartModalProps) {
  const [isClearing, setIsClearing] = useState(false)
  const { clearAllResponses, getResponseCounts, responses } = useUserResponses()
  const router = useRouter()
  const params = useParams()
  const municipality = params.municipality as string
  
  const responseCounts = getResponseCounts
  const hasResponses = responseCounts.total > 0
  const isCompleted = responseCounts.total >= boussoleQuestions.length

  // Calculer à quelle question reprendre
  const calculateNextQuestionIndex = () => {
    // Parcourir toutes les questions pour trouver la première non répondue
    for (let i = 0; i < boussoleQuestions.length; i++) {
      const question = boussoleQuestions[i]
      
      // Vérifier si cette question a été répondue
      const hasResponse = question.responseType === "importance_direct" 
        ? responses.importanceDirect[question.id] !== undefined
        : responses.agreement[question.id] !== undefined
      
      // Si cette question n'a pas de réponse, c'est celle qu'on doit afficher
      if (!hasResponse) {
        return i
      }
    }
    
    // Si toutes les questions ont été répondues, aller à la dernière
    return boussoleQuestions.length - 1
  }

  const nextQuestionIndex = calculateNextQuestionIndex()
  const nextQuestionNumber = nextQuestionIndex + 1

  // Si pas de réponses, fermer le modal avec useEffect
  React.useEffect(() => {
    if (!hasResponses && isOpen) {
      onClose()
      router.push(targetPath)
    }
  }, [hasResponses, isOpen, onClose, router, targetPath])

  const handleContinueQuestionnaire = () => {
    onClose()
    router.push(`/${municipality}/test-politique-municipal`)
  }

  const handleViewResults = () => {
    onClose()
    router.push(`/${municipality}/resultats`)
  }

  const handleRestartFromScratch = async () => {
    try {
      setIsClearing(true)
      
      // Fermer le modal immédiatement pour éviter les conflits de rendu
      onClose()
      
      // Effacer toutes les réponses
      await clearAllResponses()
      
      // Toujours déclencher l'ouverture du modal de code postal après effacement
      setTimeout(() => {
        // Aller à l'accueil d'abord
        if (targetPath === "/") {
          router.push("/")
        }
        
        // Puis déclencher l'événement pour ouvrir le modal de code postal FORCEMENT
        setTimeout(() => {
          const event = new CustomEvent('openPostalCodeModalForced')
          window.dispatchEvent(event)
        }, 150) // Petit délai pour que la redirection se fasse d'abord
        
      }, 100)
      
    } catch (error) {
      console.error("Erreur lors de l'effacement des réponses:", error)
      // En cas d'erreur, fermer quand même le modal et déclencher le modal postal FORCEMENT
      onClose()
      setTimeout(() => {
        const event = new CustomEvent('openPostalCodeModalForced')
        window.dispatchEvent(event)
      }, 100)
    } finally {
      setIsClearing(false)
    }
  }

  const handleGoToDestination = () => {
    onClose()
    router.push(targetPath)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-soft">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-midnight-green/10 rounded-full">
              <FileText className="h-5 w-5 text-midnight-green" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              {isCompleted ? "Questionnaire terminé !" : "Questionnaire en cours"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            {isCompleted 
              ? "Félicitations ! Vous avez répondu à toutes les questions. Consultez vos résultats maintenant."
              : `Vous avez déjà répondu à ${responseCounts.total} question${responseCounts.total > 1 ? 's' : ''} sur ${boussoleQuestions.length}. Que souhaitez-vous faire ?`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {isCompleted ? (
             <Button
              onClick={handleViewResults}
              className="w-full justify-start h-auto p-4 bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-white/20 rounded-full">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">Consulter les résultats</div>
                  <div className="text-xs opacity-90">Voir votre alignement avec les partis</div>
                </div>
              </div>
            </Button>
          ) : (
            <Button
              onClick={handleContinueQuestionnaire}
              className="w-full justify-start h-auto p-4 bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-white/20 rounded-full">
                  <Play className="h-4 w-4" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">Continuer le questionnaire</div>
                  <div className="text-xs opacity-90">
                    Reprendre à la question {nextQuestionNumber} sur {boussoleQuestions.length}
                  </div>
                </div>
              </div>
            </Button>
          )}

          {/* Option 2: Recommencer à zéro */}
          <Button
            onClick={handleRestartFromScratch}
            disabled={isClearing}
            variant="outline"
            className="w-full justify-start h-auto p-4 border-midnight-green/20 hover:bg-azure-web/20 hover:border-midnight-green/30 rounded-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 bg-azure-web/50 rounded-full">
                {isClearing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
                ) : (
                  <RotateCcw className="h-4 w-4 text-midnight-green" />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm text-eerie-black">Recommencer à zéro</div>
                <div className="text-xs text-midnight-green/70">Effacer toutes vos réponses</div>
              </div>
            </div>
          </Button>

          {/* Option 3: Aller à la destination sans toucher aux réponses */}
          {targetPath === "/" && (
            <Button
              onClick={handleGoToDestination}
              variant="ghost"
              className="w-full justify-start h-auto p-4 hover:bg-white/50 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="text-left flex-1">
                  <div className="font-medium text-sm text-muted-foreground">Retourner à l&apos;accueil</div>
                  <div className="text-xs text-muted-foreground/80">Garder vos réponses pour plus tard</div>
                </div>
              </div>
            </Button>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Export du hook personnalisé pour faciliter l'utilisation
export function useContinueOrRestartModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  
  return {
    isOpen,
    openModal,
    closeModal,
    ContinueOrRestartModal
  }
} 