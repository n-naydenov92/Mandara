'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface SceneItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

const EASE = [0.22, 1, 0.36, 1] as const
const DURATION = 0.8
const Y_OFFSET = 28
const BLUR_PX = 6

// Таймингът се носи в самия item (а не от staggerChildren), за да е надеждно
// подреждането „едно по едно" дори когато item-ите са вложени в layout div-ове.
function buildVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: Y_OFFSET, filter: `blur(${BLUR_PX}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: DURATION, ease: EASE, delay },
    },
  }
}

export function SceneItem({ children, className, delay = 0 }: SceneItemProps) {
  const reducedMotion = useReducedMotionSafe()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={buildVariants(delay)}>
      {children}
    </motion.div>
  )
}
