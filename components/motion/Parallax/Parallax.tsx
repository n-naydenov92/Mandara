'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface ParallaxProps {
  children: ReactNode
  className?: string
  // Амплитуда на дрейфа в px — елементът се движи от +strength до -strength при скрол.
  strength?: number
}

const DEFAULT_STRENGTH = 40

export function Parallax({ children, className, strength = DEFAULT_STRENGTH }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
