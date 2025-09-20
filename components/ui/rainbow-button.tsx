import React from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "white"
  asChild?: boolean
}

export const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>((
  {
    children,
    className,
    variant = "default",
    asChild = false,
    ...props
  },
  ref
) => {
  // Filtrer les props qui pourraient causer des conflits avec motion
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDrag, onDragEnd, onDragStart, onAnimationStart, ...motionSafeProps } = props;

  const isWhite = variant === "white";
  const Comp = asChild ? Slot : motion.button;

  return (
    <Comp
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Base styles - conditional based on variant
        isWhite
          ? "bg-white border-2 border-white text-[#04454A]"
          : "bg-[#04454A] border-2 border-[#04454A] text-white",

        // Dark mode adjustments - conditional based on variant
        isWhite
          ? "dark:bg-white dark:border-white dark:text-[#04454A]"
          : "dark:bg-[#04454A] dark:border-[#04454A] dark:text-white",

        // Glow effect (before styles) - keeping the rainbow animation
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Hover effects - conditional based on variant
        isWhite
          ? "hover:shadow-lg hover:border-[#f0f0f0] hover:bg-[#f8f8f8]"
          : "hover:shadow-lg hover:border-[#033540] hover:bg-[#055662]",

        className,
      )}
      {...(asChild ? motionSafeProps : {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
        ...motionSafeProps
      })}
    >
      {children}
    </Comp>
  );
});

RainbowButton.displayName = "RainbowButton";
