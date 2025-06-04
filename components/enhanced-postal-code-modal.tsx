"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

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

  const handleDistrictConfirmation = () => {
    // Sauvegarder les données dans localStorage
    localStorage.setItem("userPostalCode", formatPostalCode(postalCode))
    localStorage.setItem("userDistrict", confirmedDistrict)
    
    onClose()
    router.push("/questionnaire")
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-soft-md bg-card">
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
              <Select value={confirmedDistrict} onValueChange={handleDistrictChange}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Sélectionnez votre arrondissement" />
                </SelectTrigger>
                <SelectContent>
                  {quebecDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!confirmedDistrict}
              >
                Confirmer et continuer
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Option pour continuer sans géolocalisation */}
        <div className="mt-4 text-center border-t pt-4">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => {
              onClose()
              router.push("/questionnaire?skipLocation=true")
            }}
          >
            Continuer sans localisation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 