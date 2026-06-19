'use client'

import { motion } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './HamburgerIcon.module.css'

interface HamburgerIconProps {
  open: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

export function HamburgerIcon({ open }: HamburgerIconProps) {
  const reduced = useReducedMotionSafe()
  const transition = reduced ? { duration: 0 } : { duration: 0.35, ease: EASE }

  return (
    <span className={styles.bars} aria-hidden="true">
      <motion.span
        className={styles.bar}
        animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
        transition={transition}
      />
      <motion.span
        className={styles.bar}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.span
        className={styles.bar}
        animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
        transition={transition}
      />
    </span>
  )
}
