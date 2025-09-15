import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "white"
}

export function RainbowButton({
  children,
  className,
  variant = "default",
  ...props
}: RainbowButtonProps) {
  // Filtrer les props qui pourraient causer des conflits avec motion
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDrag, onDragEnd, onDragStart, onAnimationStart, ...motionSafeProps } = props;

  const isWhite = variant === "white";

  return (
    <motion.button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Base styles - conditional based on variant
        isWhite
          ? "bg-white border-2 border-white text-[#005940]"
          : "bg-[#005940] border-2 border-[#005940] text-white",

        // Dark mode adjustments - conditional based on variant
        isWhite
          ? "dark:bg-white dark:border-white dark:text-[#005940]"
          : "dark:bg-[#005940] dark:border-[#005940] dark:text-white",

        // Glow effect (before styles) - keeping the rainbow animation
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Hover effects - conditional based on variant
        isWhite
          ? "hover:shadow-lg hover:border-[#f0f0f0] hover:bg-[#f8f8f8]"
          : "hover:shadow-lg hover:border-[#004030] hover:bg-[#006B4A]",

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
