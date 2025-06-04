"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import PostalCodeModal from "@/components/postal-code-modal"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function SiteHeader() {
  const [isPostalModalOpen, setIsPostalModalOpen] = useState(false)

  const openPostalModal = () => setIsPostalModalOpen(true)
  const closePostalModal = () => setIsPostalModalOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-soft">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
          {/* Logo - Updated with new image */}
          <Link href="/" className="flex items-center shrink-0 h-[56px]">
            {" "}
            {/* Adjusted height slightly for new logo aspect ratio */}
            <div className="relative h-full w-44 sm:w-48 md:w-[190px]">
              {" "}
              {/* Adjusted width slightly */}
              <Image
                src="/logo-main.png" // Updated logo path
                alt="Boussole Municipale Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation & Action Button */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/aide" className="text-sm font-medium text-foreground/80 hover:text-primary">
              Aide
            </Link>
            <Button
              onClick={openPostalModal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-7 py-3 text-sm font-semibold shadow-sm btn-base-effects btn-hover-lift btn-primary-hover-effects"
            >
              Commencer
            </Button>
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
                        {" "}
                        {/* Adjusted height */}
                        <div className="relative h-full w-36 sm:w-40">
                          <Image
                            src="/logo-main.png" // Updated logo path
                            alt="Boussole Municipale Logo"
                            fill
                            style={{ objectFit: "contain" }}
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
                  <SheetClose asChild>
                    <Button
                      onClick={openPostalModal}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 text-base font-semibold mt-4 btn-base-effects btn-hover-lift btn-primary-hover-effects"
                    >
                      Commencer
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <PostalCodeModal isOpen={isPostalModalOpen} onClose={closePostalModal} />
    </>
  )
}
