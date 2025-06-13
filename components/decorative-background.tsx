"use client"

import Image from "next/image"

interface BackgroundDecorativeProps {
  variant?: 'home' | 'questionnaire' | 'results' | 'profile'
}

const backgroundConfigs = {
  home: [
    {
      src: "/Image_parc_jardinage.png",
      className: "absolute top-20 right-8 w-24 h-24 z-0",
      style: {}
    },
    {
      src: "/Image_voiture.png", 
      className: "absolute bottom-32 left-6 w-20 h-20 z-0",
      style: {}
    }
  ],
  questionnaire: [
    {
      src: "/Image_parc_crisp.png",
      className: "absolute top-40 right-4 w-22 h-22 z-0",
      style: {}
    },
    {
      src: "/Image_voiture.png",
      className: "absolute bottom-20 left-4 w-18 h-18 z-0",
      style: {}
    }
  ],
  results: [
    {
      src: "/Image_parc_chat_dort.png",
      className: "absolute top-16 right-6 w-20 h-20 z-0", 
      style: {}
    },
    {
      src: "/Image_famille.png",
      className: "absolute bottom-40 left-4 w-24 h-24 z-0",
      style: {}
    }
  ],
  profile: [
    {
      src: "/Image_parc_chien_maitre.png",
      className: "absolute top-32 right-8 w-22 h-22 z-0",
      style: {}
    },
    {
      src: "/Image_voiture.png",
      className: "absolute bottom-24 left-6 w-20 h-20 z-0",
      style: {}
    }
  ]
}

export default function BackgroundDecorative({ variant = 'home' }: BackgroundDecorativeProps) {
  const images = backgroundConfigs[variant] || backgroundConfigs.home

  return (
    <>
      {/* Images en background - petites et non transparentes - Mobile uniquement */}
      <div className="lg:hidden">
        {images.map((image, index) => (
          <div 
            key={`bg-${variant}-${index}`} 
            className={`${image.className} pointer-events-none`}
            style={image.style}
          >
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover rounded-xl"
              sizes="96px"
            />
          </div>
        ))}
      </div>
    </>
  )
} 