"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="Boussole Municipale Logo" width={40} height={40} className="w-10 h-10" />
            <span className="font-bold text-xl text-foreground">Boussole Municipale</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#comment-ca-marche" className="text-foreground hover:text-primary transition-colors">
              Comment ça marche
            </a>
            <a href="#pourquoi-important" className="text-foreground hover:text-primary transition-colors">
              Pourquoi c'est important
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#aide" className="text-foreground hover:text-primary transition-colors">
              Aide
            </a>
          </div>

          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Commencer le questionnaire
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#comment-ca-marche" className="text-foreground hover:text-primary transition-colors">
                Comment ça marche
              </a>
              <a href="#pourquoi-important" className="text-foreground hover:text-primary transition-colors">
                Pourquoi c'est important
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#aide" className="text-foreground hover:text-primary transition-colors">
                Aide
              </a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Commencer le questionnaire
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
