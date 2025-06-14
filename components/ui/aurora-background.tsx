"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  intensity?: 'minimal' | 'subtle' | 'soft';
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  intensity = 'subtle',
  ...props
}: AuroraBackgroundProps) => {
  const intensitySettings = {
    minimal: { opacity: 0.3, blur: 'blur-[8px]' },
    subtle: { opacity: 0.5, blur: 'blur-[10px]' },
    soft: { opacity: 0.7, blur: 'blur-[12px]' },
  };

  const currentIntensity = intensitySettings[intensity];

  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-slate-950 dark:text-slate-50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] will-change-transform`,
            currentIntensity.blur,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
          style={{ opacity: currentIntensity.opacity }}
        ></div>
      </div>
      
      {/* Contenu avec z-index pour être au-dessus de l'aurora */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </div>
  );
};

// Preset pour remplacer PageWithGlow
export function PageWithAurora({ 
  children, 
  className,
  intensity = 'subtle',
  showRadialGradient = true
}: { 
  children: React.ReactNode;
  className?: string;
  intensity?: 'minimal' | 'subtle' | 'soft';
  showRadialGradient?: boolean;
}) {
  return (
    <AuroraBackground
      intensity={intensity}
      showRadialGradient={showRadialGradient}
      className={className}
    >
      {children}
    </AuroraBackground>
  );
} 