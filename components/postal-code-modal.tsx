"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Loader2 } from "lucide-react"

type PostalCodeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function PostalCodeModal({ isOpen, onClose }: PostalCodeModalProps) {
  const [postalCode, setPostalCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
    if (!postalCodeRegex.test(postalCode)) {
      setError("Veuillez entrer un code postal valide (ex: A1A 1A1).")
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    // ATTENTION: Ce composant est obsolète - utiliser enhanced-postal-code-modal.tsx
    // localStorage.setItem("userPostalCode", postalCode.toUpperCase().replace(/\s+/g, ""))
    setIsLoading(false)
    onClose()
    router.push("/questionnaire")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl shadow-soft-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">Entrez votre code postal</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Votre code postal nous aide à personnaliser le questionnaire pour votre municipalité.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postal-code" className="text-right text-sm text-muted-foreground">
                Code Postal
              </Label>
              <Input
                id="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="A1A 1A1"
                className="col-span-3 rounded-lg bg-background focus:ring-midnight-green"
                aria-describedby="postal-code-error"
              />
            </div>
            {error && (
              <p id="postal-code-error" className="col-span-4 text-sm text-red-600 text-center">
                {" "}
                {/* Destructive color for error */}
                {error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-muted-foreground hover:border-midnight-green hover:text-midnight-green"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-midnight-green hover:bg-midnight-green/90 text-white rounded-xl"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Continuer
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-midnight-green"
            onClick={() => {
              onClose()
              router.push("/questionnaire?skipPostal=true")
            }}
          >
            Continuer sans code postal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
