import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  // Filtrer les props qui pourraient causer des conflits avec motion
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDrag, onDragEnd, onDragStart, onAnimationStart, ...motionSafeProps } = props;
  return (
    <motion.button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Base styles with cornsilk background and castleton green border
        "bg-[#FDF3D0] border-2 border-[#005940] text-black",

        // Dark mode adjustments
        "dark:bg-[#FDF3D0] dark:border-[#005940] dark:text-black",

        // Glow effect (before styles) - keeping the rainbow animation
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Hover effects
        "hover:shadow-lg hover:border-[#004030] hover:bg-[#FFF5DC]",

        className,
      )}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      {...motionSafeProps}
    >
      {children}
    </motion.button>
  );
}
