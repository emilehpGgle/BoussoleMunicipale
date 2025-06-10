"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useProfile } from '@/hooks/useProfile'
import { useUserResponses } from '@/hooks/useUserResponses'
import { useResults } from '@/hooks/useResults'
import { useSession } from '@/hooks/useSession'

export default function DebugDataCleaner() {
  const { clearProfile } = useProfile()
  const { clearAllResponses } = useUserResponses()
  const { clearResults } = useResults()
  const { sessionToken } = useSession()

  const clearAllData = async () => {
    try {
      toast.loading('🧹 Nettoyage en cours...', { id: 'cleaning' })

      // Nettoyer toutes les données
      await Promise.all([
        clearProfile(),
        clearAllResponses(), 
        clearResults()
      ])

      // Nettoyer également les données localStorage directement
      const localStorageKeys = [
        'userProfile',
        'userAnswers', 
        'userImportanceDirectAnswers',
        'calculatedResults'
      ]
      
      localStorageKeys.forEach(key => {
        localStorage.removeItem(key)
      })

      toast.success('✅ Toutes les données ont été supprimées !', { id: 'cleaning' })
      
      // Recharger la page après un délai
      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (error) {
      console.error('Erreur lors du nettoyage:', error)
      toast.error('❌ Erreur lors du nettoyage', { id: 'cleaning' })
    }
  }

  const clearLocalStorageOnly = () => {
    try {
      const localStorageKeys = [
        'userProfile',
        'userAnswers', 
        'userImportanceDirectAnswers',
        'calculatedResults'
      ]
      
      localStorageKeys.forEach(key => {
        localStorage.removeItem(key)
      })

      toast.success('✅ LocalStorage nettoyé !')
      
    } catch (error) {
      console.error('Erreur lors du nettoyage localStorage:', error)
      toast.error('❌ Erreur lors du nettoyage localStorage')
    }
  }

  // Ne montrer ce composant qu'en développement
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          Debug - Nettoyage des données
        </CardTitle>
        <CardDescription className="text-red-600">
          Outils de développement pour nettoyer les données stockées.
          <br />
          <strong>Session actuelle :</strong> {sessionToken ? `${sessionToken.substring(0, 8)}...` : 'Aucune'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={clearAllData}
          variant="destructive" 
          size="sm"
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Nettoyer TOUT (Supabase + localStorage)
        </Button>
        
        <Button 
          onClick={clearLocalStorageOnly}
          variant="outline" 
          size="sm"
          className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Nettoyer seulement localStorage
        </Button>
        
        <p className="text-xs text-red-500 mt-2">
          ⚠️ Ces actions sont irréversibles et ne sont visibles qu'en développement.
        </p>
      </CardContent>
    </Card>
  )
} 