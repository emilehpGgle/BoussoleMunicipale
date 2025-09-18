'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function CountdownBadge() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const calculateDays = () => {
      const electionDate = new Date('2025-11-02T00:00:00-05:00')
      const today = new Date()
      const diffTime = electionDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }

    setDaysLeft(calculateDays())

    // Mise à jour quotidienne à minuit
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(() => {
      setDaysLeft(calculateDays())
      // Puis mise à jour toutes les 24h
      const interval = setInterval(() => {
        setDaysLeft(calculateDays())
      }, 1000 * 60 * 60 * 24)

      return () => clearInterval(interval)
    }, msUntilMidnight)

    return () => clearTimeout(timeout)
  }, [])

  if (daysLeft === null) return null

  return (
    <Link href="/elections-municipales-2025-quebec" className="inline-flex items-center group">
      <Badge
        variant="secondary"
        className="bg-[#EAFCFC] text-[#04454A] border-[#04454A]/20 hover:bg-[#04454A]/5 transition-colors cursor-pointer px-3 py-1"
      >
        <Calendar className="w-4 h-4 mr-1.5" />
        <span className="font-semibold">plus que {daysLeft} jours</span>
        <span className="ml-1.5 hidden sm:inline">avant les élections municipales 2025</span>
        <span className="ml-1.5 sm:hidden">élections 2025</span>
      </Badge>
    </Link>
  )
}