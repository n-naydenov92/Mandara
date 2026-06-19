'use client'

import { Children, type ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
}

const EASE = [0.22, 1, 0.36, 1] as const

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export function RevealGroup({ children, className, stagger = 0.1 }: RevealGroupProps) {
  const reducedMotion = useReducedMotionSafe()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12%' }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={ITEM_VARIANTS}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
