"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from "@/hooks/useProfile"
import { useUserResponses } from "@/hooks/useUserResponses"
import { useSession } from "@/hooks/useSession"
import ContinueOrRestartModal from "./existing-responses-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, Check, X } from "lucide-react"
import { 
  getDistrictFromPostalCode, 
  isValidCanadianPostalCode, 
  formatPostalCode,
  quebecDistricts,
  getDistrictInfo,
  type DistrictInfo
} from '@/lib/postal-code-mapping'

type PostalCodeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EnhancedPostalCodeModal({ isOpen, onClose }: PostalCodeModalProps) {
  const [postalCode, setPostalCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'postal' | 'confirm'>('postal')
  const [estimatedDistrict, setEstimatedDistrict] = useState<string | null>(null)
  const [confirmedDistrict, setConfirmedDistrict] = useState<string>("")
  const [districtInfo, setDistrictInfo] = useState<DistrictInfo | null>(null)
  const [isExistingResponsesModalOpen, setIsExistingResponsesModalOpen] = useState(false)
  const router = useRouter()
  
  // Intégration des hooks
  const { updateProfileFields, isSaving } = useProfile()
  const { getResponseCounts, isLoading: responsesLoading, responses } = useUserResponses()
  const { isSessionValid } = useSession()

  // Monitor response state changes
  React.useEffect(() => {
    if (isSessionValid && !responsesLoading) {
      getResponseCounts
    }
  }, [responsesLoading, responses, isSessionValid, getResponseCounts])

  // Nettoyage du composant
  React.useEffect(() => {
    return () => {
      // Cleanup si nécessaire
    }
  }, [])

  const handlePostalCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation du code postal
    if (!isValidCanadianPostalCode(postalCode)) {
      setError("Veuillez entrer un code postal valide (ex: G1A 1A1).")
      setIsLoading(false)
      return
    }

    // Simulation d'une vérification en ligne
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Déterminer l'arrondissement estimé
    const district = getDistrictFromPostalCode(postalCode)
    
    if (district) {
      setEstimatedDistrict(district)
      setConfirmedDistrict(district)
      setDistrictInfo(getDistrictInfo(district))
      setStep('confirm')
    } else {
      // Code postal non reconnu dans Québec
      setError("Ce code postal ne semble pas être dans la ville de Québec. Veuillez vérifier ou sélectionner votre arrondissement manuellement.")
      setStep('confirm')
      setEstimatedDistrict(null)
      setConfirmedDistrict(quebecDistricts[0])
      setDistrictInfo(getDistrictInfo(quebecDistricts[0]))
    }
    
    setIsLoading(false)
  }

  const handleDistrictConfirmation = async () => {
    try {
      console.log('💾 Sauvegarde du code postal dans le profil...')
      
      // Sauvegarder dans le profil unifié (Supabase uniquement)
      await updateProfileFields({
        postalCode: formatPostalCode(postalCode),
        district: confirmedDistrict,
        // Informations supplémentaires utiles pour l'analyse
        residenceArea: confirmedDistrict, // Compatible avec les autres champs de profil
        location: {
          postalCode: formatPostalCode(postalCode),
          district: confirmedDistrict,
          coordinates: districtInfo?.coordinates
        }
      })
      
      console.log('✅ Code postal sauvegardé dans le profil utilisateur')
      
      // Fermer ce modal d'abord
      onClose()
      
      // Attendre la fin du chargement des réponses avant de vérifier
      if (isSessionValid) {
        // Fonction pour vérifier les réponses existantes après le chargement
        const checkExistingResponses = () => {
          if (!responsesLoading) {
            const counts = getResponseCounts
            console.log('🔍 Vérification des réponses existantes:', counts)
            
            // Si l'utilisateur a déjà des réponses, ouvrir le modal de choix
            if (counts.total > 0) {
              console.log('📋 Réponses existantes détectées, ouverture du modal de choix')
              setIsExistingResponsesModalOpen(true)
              return
            }
            
            console.log('🆕 Aucune réponse existante, redirection vers le questionnaire')
            router.push("/questionnaire")
          } else {
            // Réessayer après 100ms si encore en chargement
            console.log('⏳ Chargement des réponses en cours, nouvelle tentative...')
            setTimeout(checkExistingResponses, 100)
          }
        }
        
        // Démarrer la vérification avec un petit délai pour s'assurer que le modal est fermé
        setTimeout(checkExistingResponses, 50)
      } else {
        // Pas de session, aller directement au questionnaire
        router.push("/questionnaire")
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde du profil:', error)
      
      // Plus de localStorage - session obligatoire pour sauvegarder
      console.warn('⚠️ Impossible de sauvegarder le code postal sans session valide')
      
      onClose()
      router.push("/questionnaire")
    }
  }

  const handleDistrictChange = (newDistrict: string) => {
    setConfirmedDistrict(newDistrict)
    setDistrictInfo(getDistrictInfo(newDistrict))
  }

  const resetToPostalStep = () => {
    setStep('postal')
    setEstimatedDistrict(null)
    setConfirmedDistrict("")
    setDistrictInfo(null)
    setError("")
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={onClose} />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl bg-white border-2 border-primary/20 z-[9999] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            {step === 'postal' ? 'Entrez votre code postal' : 'Confirmez votre arrondissement'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'postal' 
              ? "Votre code postal nous aide à personnaliser le questionnaire pour votre région."
              : "Vérifiez que l'arrondissement estimé correspond à votre lieu de résidence."
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'postal' && (
          <form onSubmit={handlePostalCodeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code" className="text-sm font-medium text-foreground">
                  Code Postal
                </Label>
                <Input
                  id="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  placeholder="G1A 1A1"
                  className="rounded-lg bg-background focus:ring-primary"
                  aria-describedby="postal-code-error"
                  maxLength={7}
                />
                <p className="text-xs text-muted-foreground">
                  Format: G1A 1A1 (codes postaux de la ville de Québec)
                </p>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    {error}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !postalCode.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Continuer
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 'confirm' && (
          <div className="space-y-4 py-4">
            {/* Information sur l'estimation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Code postal analysé: {formatPostalCode(postalCode)}
                </span>
              </div>
              {estimatedDistrict ? (
                <p className="text-sm text-blue-700">
                  Arrondissement estimé : <strong>{estimatedDistrict}</strong>
                </p>
              ) : (
                <p className="text-sm text-blue-700">
                  Code postal non reconnu. Veuillez sélectionner votre arrondissement.
                </p>
              )}
            </div>

            {/* Sélection d'arrondissement */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Confirmez ou modifiez votre arrondissement :
              </Label>
              <div className="relative">
                <Select 
                  value={confirmedDistrict} 
                  onValueChange={handleDistrictChange}
                >
                  <SelectTrigger className="w-full rounded-lg bg-background border border-border">
                    <SelectValue 
                      placeholder="Sélectionnez votre arrondissement"
                      className="text-foreground"
                    />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-background border border-border shadow-lg max-h-60 overflow-y-auto z-[10000]"
                    position="popper"
                    sideOffset={4}
                  >
                    {quebecDistricts.map((district) => (
                      <SelectItem 
                        key={district} 
                        value={district}
                        className="cursor-pointer hover:bg-muted focus:bg-muted px-3 py-2"
                      >
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Debug: Afficher le nombre d'arrondissements */}
              <p className="text-xs text-muted-foreground">
                {quebecDistricts.length} arrondissements disponibles
              </p>
            </div>

            {/* Information sur l'arrondissement sélectionné */}
            {districtInfo && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{districtInfo.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {districtInfo.area}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {districtInfo.description}
                  </p>
                  {districtInfo.population && (
                    <p className="text-xs text-muted-foreground">
                      Population : ~{districtInfo.population.toLocaleString()} habitants
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetToPostalStep}
                className="rounded-xl"
              >
                Retour
              </Button>
              <Button
                type="button"
                onClick={handleDistrictConfirmation}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                disabled={!confirmedDistrict || isSaving}
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirmer et continuer
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Option pour continuer sans géolocalisation */}
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => {
              onClose()
              
              // Vérifier s'il y a des réponses existantes avant de continuer
              if (isSessionValid && !responsesLoading) {
                const counts = getResponseCounts
                
                if (counts.total > 0) {
                  setIsExistingResponsesModalOpen(true)
                  return
                }
              }
              
              router.push("/questionnaire?skipLocation=true")
            }}
          >
            Continuer sans localisation
          </Button>
        </div>

      </DialogContent>
    </Dialog>
    
    {/* Modal pour les réponses existantes - séparé du modal principal */}
    <ContinueOrRestartModal
      isOpen={isExistingResponsesModalOpen}
      onClose={() => setIsExistingResponsesModalOpen(false)}
      targetPath="/questionnaire"
    />
    </>
  )
} 