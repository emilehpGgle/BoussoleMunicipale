"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useUserStatus } from "@/hooks/useUserStatus"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useResults } from "@/hooks/useResults"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { CheckCircle2, Play, RotateCcw, BarChart3, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

interface UserStatusCardProps {
  className?: string
  showOnHomepage?: boolean // Si affiché sur la homepage ou ailleurs
}

export default function UserStatusCard({ className = "", showOnHomepage = true }: UserStatusCardProps) {
  const router = useRouter()
  const status = useUserStatus()
  const { clearAllResponses } = useUserResponses()
  const { clearResults } = useResults()
  const [isRestarting, setIsRestarting] = useState(false)

  // Fonction pour recommencer à zéro
  const handleRestart = async () => {
    setIsRestarting(true)
    try {
      // Effacer toutes les données
      await clearAllResponses()
      await clearResults()
      
      // Rediriger vers le questionnaire
      router.push('/questionnaire')
    } catch (error) {
      console.error('Erreur lors du redémarrage:', error)
    } finally {
      setIsRestarting(false)
    }
  }

  // Fonction pour voir les résultats
  const handleViewResults = () => {
    router.push('/resultats')
  }

  // Fonction pour continuer le questionnaire
  const handleContinue = () => {
    router.push('/questionnaire')
  }

  // État de chargement
  if (status.isLoading) {
    return (
      <Card className={`${className} animate-pulse`}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Chargement de vos données...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Première visite - affichage simple
  if (status.isFirstTime) {
    if (!showOnHomepage) return null // Ne pas afficher sur d'autres pages si première visite
    
    return (
      <Card className={`${className} border-primary/20 bg-primary/5`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Découvrez vos affinités politiques
          </CardTitle>
          <CardDescription>
            {status.statusMessage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full" size="lg">
            <Link href="/questionnaire">
              Commencer le questionnaire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Questionnaire en cours
  if (status.hasPartialResponses) {
    return (
      <Card className={`${className} border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-orange-600" />
              Questionnaire en cours
            </CardTitle>
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
              {status.completionPercentage}% terminé
            </Badge>
          </div>
          <CardDescription>
            {status.statusMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={status.completionPercentage} className="w-full" />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleContinue} className="flex-1" size="lg">
              Continuer le questionnaire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Recommencer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Recommencer le questionnaire ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera vos {status.responseCount} réponses actuelles et vous recommencerez depuis le début.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleRestart}
                    disabled={isRestarting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isRestarting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Recommencer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Questionnaire terminé avec résultats
  if (status.hasCompleteResponses && status.hasResults) {
    return (
      <Card className={`${className} border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Questionnaire terminé
            </CardTitle>
            <Badge className="bg-green-100 text-green-700 border-green-300">
              Résultats disponibles
            </Badge>
          </div>
          <CardDescription>
            {status.statusMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleViewResults} className="flex-1" size="lg">
              <BarChart3 className="mr-2 h-4 w-4" />
              Voir mes résultats
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Refaire le test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Refaire le questionnaire ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera vos réponses et résultats actuels. Vous recommencerez le questionnaire depuis le début.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleRestart}
                    disabled={isRestarting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isRestarting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Refaire le test
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Cas par défaut (ne devrait pas arriver)
  return null
} 