"use client"

import Image from "next/image"

interface BackgroundDecorativeProps {
  variant?: 'home' | 'questionnaire' | 'results' | 'profile'
}

const backgroundConfigs = {
  home: [
    {
      src: "/Image_parc_jardinage.png",
      className: "absolute top-1/3 right-2 w-20 h-20",
      style: {}
    },
    {
      src: "/Image_voiture.png", 
      className: "absolute bottom-1/4 left-2 w-16 h-16",
      style: {}
    }
  ],
  questionnaire: [
    {
      src: "/Image_parc_crisp.png",
      className: "absolute top-1/2 right-2 w-16 h-16",
      style: {}
    },
    {
      src: "/Image_voiture.png",
      className: "absolute bottom-32 left-2 w-14 h-14",
      style: {}
    }
  ],
  results: [
    {
      src: "/Image_parc_chat_dort.png",
      className: "absolute top-1/4 right-2 w-18 h-18", 
      style: {}
    },
    {
      src: "/Image_famille.png",
      className: "absolute bottom-1/5 left-2 w-20 h-20",
      style: {}
    }
  ],
  profile: [
    {
      src: "/Image_parc_chien_maitre.png",
      className: "absolute top-1/3 right-2 w-16 h-16",
      style: {}
    },
    {
      src: "/Image_voiture.png",
      className: "absolute bottom-1/3 left-2 w-16 h-16",
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
            style={{ ...image.style, zIndex: 1 }}
          >
            <Image
              src={image.src}
              alt=""
              fill
              className="object-cover rounded-xl opacity-100"
              sizes="96px"
              style={{ opacity: 1 }}
            />
          </div>
        ))}
      </div>
    </>
  )
} 