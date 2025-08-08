"use client"

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void
  }
}

// Configuration Google Analytics 4
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_TRACKING_ID) return

    // Tracker le changement de page
    const url = pathname + searchParams.toString()
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  // Événements personnalisés pour la boussole électorale
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (!GA_TRACKING_ID) return
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  return {
    // Événements spécifiques à la boussole électorale
    trackQuestionnaireStart: () => trackEvent('questionnaire_started', 'engagement'),
    trackQuestionnaireComplete: () => trackEvent('questionnaire_completed', 'conversion'),
    trackQuestionAnswer: (questionId: string, answer: string) => 
      trackEvent('question_answered', 'engagement', `${questionId}:${answer}`),
    trackResultsView: () => trackEvent('results_viewed', 'engagement'),
    trackPartyProfileView: (partyId: string) => 
      trackEvent('party_profile_viewed', 'engagement', partyId),
    trackShareClick: (shareType: string) => 
      trackEvent('share_clicked', 'engagement', shareType),
    trackPageTime: (pageName: string, timeSpent: number) => 
      trackEvent('page_time', 'engagement', pageName, timeSpent),
    trackCustomEvent: trackEvent,
  }
}

// Composant Analytics pour Next.js
export function Analytics() {
  if (!GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            custom_map: {
              'custom_parameter_1': 'questionnaire_progress',
              'custom_parameter_2': 'party_affinity_score'
            }
          });
        `}
      </Script>
    </>
  )
}

// Hook pour tracker le temps passé sur une page
export function usePageTimeTracker(pageName: string) {
  const { trackPageTime } = useAnalytics()

  useEffect(() => {
    const startTime = Date.now()

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000) // en secondes
      if (timeSpent > 5) { // Seulement si plus de 5 secondes
        trackPageTime(pageName, timeSpent)
      }
    }
  }, [pageName, trackPageTime])
} 