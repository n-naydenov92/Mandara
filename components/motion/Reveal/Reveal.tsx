'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

const REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, duration = 1, className }: RevealProps) {
  const reducedMotion = useReducedMotionSafe()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={REVEAL_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
