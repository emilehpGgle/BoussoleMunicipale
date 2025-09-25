"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wrench, Clock, Mail } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PageWithGlow } from "@/components/ui/background-glow"
import { motion } from 'framer-motion'

export default function MaintenancePage() {
  // Extract municipality from params
  const params = useParams()
  const municipality = params.municipality as string

  return (
    <PageWithGlow
      intensity="subtle"
      className="relative questionnaire-compact mobile-constrained"
    >
      <div className="container max-w-4xl py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Card className="p-8 md:p-12 shadow-lg rounded-2xl bg-white w-full max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              {/* Icon with animation */}
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="flex items-center justify-center w-16 h-16 bg-midnight-green/10 rounded-full"
              >
                <Wrench className="w-8 h-8 text-midnight-green" />
              </motion.div>

              {/* Main message */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Améliorations en cours
                </h1>
                <p className="text-lg text-muted-foreground">
                  Nous apportons des améliorations à la Boussole Municipale pour vous offrir une meilleure expérience.
                </p>
              </div>

              {/* Status indicators */}
              <div className="flex items-center space-x-2 text-midnight-green">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">De retour sous peu</span>
              </div>

              {/* Contact info */}
              <div className="pt-4 border-t border-border w-full">
                <p className="text-sm text-muted-foreground mb-3">
                  Une question ? N&apos;hésitez pas à nous contacter :
                </p>
                <div className="flex items-center justify-center space-x-2 text-midnight-green">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:contact@boussolemunicipale.com"
                    className="text-sm hover:underline"
                  >
                    contact@boussolemunicipale.com
                  </a>
                </div>
              </div>

              {/* Return home button */}
              <div className="pt-6">
                <Button asChild className="bg-midnight-green hover:bg-midnight-green/90 text-white">
                  <Link href={`/${municipality}`} className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l&apos;accueil
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Additional reassurance */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-xs text-muted-foreground max-w-md mx-auto"
          >
            Merci pour votre patience. Nous travaillons à améliorer votre expérience de découverte politique municipale.
          </motion.p>
        </motion.div>
      </div>
    </PageWithGlow>
  )
}