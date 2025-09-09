"use client"

import * as React from "react"
import { motion } from "motion/react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { ANIMATION_PRESETS } from "@/lib/animation-config"

interface MotionImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  enableHover?: boolean
  enableZoom?: boolean
  containerClassName?: string
  overlayContent?: React.ReactNode
  onImageLoad?: () => void
  onImageError?: () => void
}

/**
 * MotionImage - Image avec animations hover et zoom
 * Implémente MUST #10 du plan interactions_transitions.md
 * Zoom-in léger (scale 1.02-1.05) avec shadow douce, 200ms
 */
export const MotionImage = React.forwardRef<HTMLDivElement, MotionImageProps>(
  ({
    src,
    alt,
    className,
    containerClassName,
    enableHover = true,
    enableZoom = false,
    overlayContent,
    onImageLoad,
    onImageError,
    ...imageProps
  }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [isZoomed, setIsZoomed] = React.useState(false)

    const handleLoad = () => {
      setIsLoaded(true)
      onImageLoad?.()
    }

    const handleError = () => {
      setHasError(true)
      onImageError?.()
    }

    const handleZoomToggle = () => {
      if (enableZoom) {
        setIsZoomed(!isZoomed)
      }
    }

    return (
      <>
        <motion.div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-lg",
            enableZoom && "cursor-zoom-in",
            containerClassName
          )}
          whileHover={
            enableHover && !hasError
              ? ANIMATION_PRESETS.image.hover
              : undefined
          }
          whileTap={enableZoom ? { scale: 0.98 } : undefined}
          onClick={handleZoomToggle}
          layout
        >
          {/* Image principale */}
          <Image
            src={src}
            alt={alt}
            className={cn(
              "transition-all duration-300",
              !isLoaded && "opacity-0",
              isLoaded && "opacity-100",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...imageProps}
          />

          {/* Skeleton pendant le chargement */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            </div>
          )}

          {/* État d'erreur */}
          {hasError && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Image non disponible</span>
            </div>
          )}

          {/* Overlay content */}
          {overlayContent && isLoaded && (
            <motion.div
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100"
              transition={{ duration: 0.2 }}
            >
              {overlayContent}
            </motion.div>
          )}

          {/* Indicateur zoom */}
          {enableZoom && isLoaded && (
            <motion.div
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100"
              transition={{ duration: 0.2 }}
            >
              Cliquer pour agrandir
            </motion.div>
          )}
        </motion.div>

        {/* Modal zoom plein écran */}
        {enableZoom && isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                className="max-w-full max-h-full object-contain"
                width={1200}
                height={800}
                quality={95}
              />
              
              {/* Bouton fermer */}
              <motion.button
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm"
                onClick={() => setIsZoomed(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </>
    )
  }
)

MotionImage.displayName = "MotionImage"

/**
 * ImageGallery - Galerie d'images avec navigation
 */
export function ImageGallery({
  images,
  className,
}: {
  images: Array<{ src: string; alt: string }>
  className?: string
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={cn("relative", className)}>
      <MotionImage
        key={currentIndex}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        enableHover
        enableZoom
        fill
        className="object-cover"
      />
      
      {/* Navigation */}
      {images.length > 1 && (
        <>
          <motion.button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
          
          {/* Indicateurs */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-white" : "bg-white/50"
                )}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
