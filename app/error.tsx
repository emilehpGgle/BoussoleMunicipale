"use client"

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Logger l'erreur pour le debug
    console.error('[ERROR BOUNDARY] Erreur capturée:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    })

    // Si c'est une erreur d'hydratation, logger plus de détails
    if (error.message.includes('hydration') || error.message.includes('Hydration')) {
      console.error('[HYDRATION ERROR] Détails supplémentaires:', {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
        readyState: typeof document !== 'undefined' ? document.readyState : 'N/A',
      })
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h2 className="mb-2 text-2xl font-bold">Une erreur est survenue</h2>
        <p className="mb-4 text-muted-foreground">
          La page n&apos;a pas pu se charger correctement. Cela peut être temporaire.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-4 text-left text-sm">
            <summary className="cursor-pointer text-muted-foreground">
              Détails techniques (dev only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => {
              // Forcer un rechargement complet de la page
              if (typeof window !== 'undefined') {
                window.location.reload()
              }
            }}
            variant="default"
          >
            Recharger la page
          </Button>
          <Button
            onClick={reset}
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      </div>
    </div>
  )
}