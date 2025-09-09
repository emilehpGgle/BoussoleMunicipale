"use client"

import { useInView } from "motion/react"
import { useRef } from "react"

export function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px" 
  })

  const getScrollConfig = (delay = 0) => ({
    ref,
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }
  })

  const getFadeConfig = (delay = 0) => ({
    ref,
    initial: { opacity: 0 },
    animate: isInView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" }
  })

  const getSlideConfig = (direction: "left" | "right" | "up" | "down" = "up", delay = 0) => {
    const directions = {
      left: { x: -20, y: 0 },
      right: { x: 20, y: 0 },
      up: { x: 0, y: 20 },
      down: { x: 0, y: -20 }
    }
    
    const offset = directions[direction]
    
    return {
      ref,
      initial: { opacity: 0, ...offset },
      animate: isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset },
      transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  return {
    ref,
    isInView,
    getScrollConfig,
    getFadeConfig,
    getSlideConfig
  }
}