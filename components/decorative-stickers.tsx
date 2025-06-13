"use client"

import Image from "next/image"

interface StickerProps {
  src: string
  alt?: string
  className?: string
  size?: number
}

interface DecorativeStickersProps {
  variant?: 'home' | 'questionnaire' | 'results' | 'profile'
}

const stickerConfigs = {
  home: [
    {
      src: "/Image_parc_jardinage.png",
      className: "decorative-sticker sticker-top-right sticker-animated",
      size: 80
    },
    {
      src: "/Image_parc_chat_dort.png", 
      className: "decorative-sticker sticker-center-right sticker-animated",
      size: 85
    },
    {
      src: "/Image_famille.png",
      className: "decorative-sticker sticker-bottom-left sticker-animated", 
      size: 75
    }
  ],
  questionnaire: [
    {
      src: "/Image_parc_jardinage.png",
      className: "decorative-sticker sticker-top-right sticker-animated",
      size: 70
    },
    {
      src: "/Image_parc_crisp.png",
      className: "decorative-sticker sticker-bottom-left sticker-animated",
      size: 65
    }
  ],
  results: [
    {
      src: "/Image_parc_chat_dort.png",
      className: "decorative-sticker sticker-top-right sticker-animated",
      size: 75
    },
    {
      src: "/Image_famille.png",
      className: "decorative-sticker sticker-bottom-left sticker-animated",
      size: 80
    }
  ],
  profile: [
    {
      src: "/Image_parc_chien_maitre.png",
      className: "decorative-sticker sticker-top-right sticker-animated",
      size: 75
    },
    {
      src: "/Image_parc_crisp.png",
      className: "decorative-sticker sticker-bottom-right sticker-animated",
      size: 70
    }
  ]
}

function Sticker({ src, alt = "", className, size = 80 }: StickerProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-2xl"
        sizes={`${size}px`}
      />
    </div>
  )
}

export default function DecorativeStickers({ variant = 'home' }: DecorativeStickersProps) {
  const stickers = stickerConfigs[variant] || stickerConfigs.home

  return (
    <>
      {/* Autocollants décoratifs pour mobile uniquement */}
      <div className="lg:hidden pointer-events-none">
        {stickers.map((sticker, index) => (
          <Sticker
            key={`${variant}-sticker-${index}`}
            src={sticker.src}
            className={sticker.className}
            size={sticker.size}
          />
        ))}
      </div>
    </>
  )
} 