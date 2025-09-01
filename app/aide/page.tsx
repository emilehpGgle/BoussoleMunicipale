'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AideRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirection automatique vers le centre d'aide
    router.replace('/centre-aide')
  }, [router])
  
  // Affichage pendant la redirection
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6 text-center">
      <p className="text-lg text-muted-foreground">
        Redirection vers le centre d'aide...
      </p>
    </div>
  )
}