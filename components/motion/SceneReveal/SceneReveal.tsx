'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface SceneRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}

const DEFAULT_STAGGER = 0.12
const DEFAULT_DELAY_CHILDREN = 0.05
const VIEWPORT_MARGIN = '-12%'

export function SceneReveal({
  children,
  className,
  stagger = DEFAULT_STAGGER,
  delayChildren = DEFAULT_DELAY_CHILDREN,
}: SceneRevealProps) {
  const reducedMotion = useReducedMotionSafe()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
    >
      {children}
    </motion.div>
  )
}
