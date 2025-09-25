"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface AutoResizeTextProps {
  text: string
  className?: string
  minSize?: number
  maxSize?: number
}

export function AutoResizeText({
  text,
  className,
  minSize: _minSize = 12,
  maxSize: _maxSize = 16
}: AutoResizeTextProps) {

  // Calculer la taille de police basée sur la longueur du texte
  const getFontSizeClass = () => {
    const length = text.length

    // Pour mobile (par défaut)
    if (length <= 15) {
      return "text-sm md:text-base" // 14px mobile, 16px desktop
    } else if (length <= 25) {
      return "text-xs md:text-sm" // 12px mobile, 14px desktop
    } else if (length <= 35) {
      return "text-xs md:text-xs" // 12px mobile, 12px desktop
    } else {
      return "text-[11px] md:text-xs" // 11px mobile, 12px desktop
    }
  }

  return (
    <span
      className={cn(
        getFontSizeClass(),
        "font-medium leading-tight text-center flex-1",
        className
      )}
    >
      {text}
    </span>
  )
}