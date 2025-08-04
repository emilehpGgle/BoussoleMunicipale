"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EnhancedPostalCodeModal from "@/components/enhanced-postal-code-modal"
import ContinueOrRestartModal from "@/components/existing-responses-modal"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useUserResponses } from "@/hooks/useUserResponses"

export default function SiteHeader() {
  const [isPostalModalOpen, setIsPostalModalOpen] = useState(false)
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false)
  const pathname = usePathname()
  const { getResponseCounts } = useUserResponses()

  // Déterminer si on est dans le questionnaire ou les résultats
  const isInQuestionnaire = pathname === '/questionnaire'
  const isInResults = pathname === '/resultats'
  const isInProfile = pathname === '/profil'
  
  // Contextes où le bouton "Commencer" n'est pas pertinent
  const shouldHideStartButton = isInQuestionnaire || isInResults || isInProfile

  const openPostalModal = () => {
    setIsPostalModalOpen(true)
  }
  
  const closePostalModal = () => {
    setIsPostalModalOpen(false)
  }

  const openContinueModal = () => {
    setIsContinueModalOpen(true)
  }
  
  const closeContinueModal = () => {
    setIsContinueModalOpen(false)
  }

  // Gérer le clic sur "Commencer" - vérifier s'il y a des réponses existantes
  const handleStartQuestionnaire = () => {
    const responseCounts = getResponseCounts
    
    console.log('📊 [handleStartQuestionnaire] Response counts:', responseCounts)
    
    if (responseCounts && responseCounts.total > 0) {
      // Il y a des réponses, ouvrir le modal de choix
      console.log('🔄 [handleStartQuestionnaire] Réponses trouvées - ouvrir modal continuation')
      openContinueModal()
    } else {
      // Pas de réponses, ouvrir le modal de code postal pour commencer
      console.log('🆕 [handleStartQuestionnaire] Pas de réponses - ouvrir modal code postal')
      openPostalModal()
    }
  }

  // Gérer le clic sur "Accueil" - aller simplement à l'accueil
  const handleGoHome = () => {
    window.location.href = "/"
  }

  // Écouter l'événement personnalisé depuis d'autres composants (pour le bouton de la page d'accueil)
  useEffect(() => {
    const handleOpenModal = () => {
      // Quand on vient de la page d'accueil, vérifier s'il y a des réponses existantes
      const responseCounts = getResponseCounts
      
      console.log('📊 [handleOpenModal] Response counts from home page:', responseCounts)
      
      if (responseCounts && responseCounts.total > 0) {
        // Il y a des réponses, ouvrir le modal de choix
        console.log('🔄 [handleOpenModal] Réponses trouvées - ouvrir modal continuation')
        openContinueModal()
      } else {
        // Pas de réponses, ouvrir le modal de code postal pour commencer
        console.log('🆕 [handleOpenModal] Pas de réponses - ouvrir modal code postal')
        openPostalModal()
      }
    }

    window.addEventListener('openPostalCodeModal', handleOpenModal)
    
    return () => {
      window.removeEventListener('openPostalCodeModal', handleOpenModal)
    }
  }, [getResponseCounts])

  // Surveiller les changements d'état du modal
  useEffect(() => {
    // Modal state logic if needed
  }, [isPostalModalOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-soft">
        <div className="container flex h-20 max-w-7xl items-center">
          {/* Logo - Parfaitement aligné à gauche */}
          <Link href="/" className="flex items-center shrink-0 h-[56px]">
            <div className="relative h-full w-36 sm:w-40 md:w-44">
                                <Image
                    src="/logo-main.webp"
                    alt="Boussole Municipale Logo"
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 190px"
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                    priority
                    quality={95}
                    className="transition-opacity duration-200"
                  />
            </div>
          </Link>

          {/* Spacer flexible pour pousser les éléments à droite */}
          <div className="flex-1" />

          {/* Desktop Navigation & Conditional Action Button */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/aide" className="text-sm font-medium text-foreground/80 hover:text-primary">
              Aide
            </Link>
            
            {/* Affichage conditionnel du bouton selon le contexte */}
            {!shouldHideStartButton ? (
              <Button
                onClick={handleStartQuestionnaire}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-7 py-3 text-sm font-semibold shadow-sm btn-base-effects btn-hover-lift btn-primary-hover-effects"
              >
                Commencer
              </Button>
            ) : (
              // Bouton &quot;Accueil&quot; simple - pas de modal
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="border-primary/20 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-xl px-7 py-3 text-sm font-medium shadow-sm btn-base-effects btn-hover-lift"
              >
                Accueil
              </Button>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Ouvrir le menu"
                  className="text-foreground btn-base-effects"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background p-6">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link href="/" className="block h-[50px]">
                        <div className="relative h-full w-36 sm:w-40">
                          <Image
                            src="/logo-main.webp"
                            alt="Boussole Municipale Logo"
                            fill
                            style={{ objectFit: "contain" }}
                            quality={95}
                          />
                        </div>
                      </Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link href="/aide" className="text-lg text-foreground/80 hover:text-primary py-2">
                      Aide
                    </Link>
                  </SheetClose>
                  
                  {/* Navigation conditionnelle pour mobile aussi */}
                  {!shouldHideStartButton ? (
                    <Button
                      onClick={() => {
                        // Fermer le sheet d'abord
                        const closeButton = document.querySelector('[data-sheet-close]') as HTMLButtonElement
                        closeButton?.click()
                        // Puis gérer le commencement
                        setTimeout(() => handleStartQuestionnaire(), 100)
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 text-base font-semibold mt-4 btn-base-effects btn-hover-lift btn-primary-hover-effects"
                    >
                      Commencer
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // Fermer le sheet d'abord
                        const closeButton = document.querySelector('[data-sheet-close]') as HTMLButtonElement
                        closeButton?.click()
                        // Puis aller à l'accueil (simple)
                        setTimeout(() => handleGoHome(), 100)
                      }}
                      variant="outline"
                      className="w-full border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl py-3 text-base font-medium mt-4 btn-base-effects btn-hover-lift"
                    >
                      Retour à l&apos;accueil
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Modals */}
      <EnhancedPostalCodeModal isOpen={isPostalModalOpen} onClose={closePostalModal} />
      <ContinueOrRestartModal 
        isOpen={isContinueModalOpen} 
        onClose={closeContinueModal}
        targetPath="/"
      />
    </>
  )
}
