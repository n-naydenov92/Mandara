'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './DayCycleBackground.module.css'

const STOPS = [0, 0.33, 0.66, 1]
const SUN_STOPS = [0, 0.5, 1]

export function DayCycleBackground() {
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()

  const top = useTransform(scrollYProgress, STOPS, ['#f8efe3', '#faf6ee', '#f4e7d0', '#ece1d4'])
  const bottom = useTransform(scrollYProgress, STOPS, ['#f1e4d2', '#f2e8d8', '#ead9bf', '#ddd0c9'])
  const sunX = useTransform(scrollYProgress, SUN_STOPS, ['80%', '58%', '26%'])
  const sunY = useTransform(scrollYProgress, SUN_STOPS, ['12%', '36%', '88%'])
  const sunColor = useTransform(scrollYProgress, SUN_STOPS, [
    'rgba(196, 147, 80, 0.22)',
    'rgba(181, 98, 62, 0.16)',
    'rgba(138, 146, 119, 0.14)',
  ])

  const background = useMotionTemplate`radial-gradient(42% 34% at ${sunX} ${sunY}, ${sunColor}, transparent 70%), linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`

  if (reduced) {
    return <div className={styles.static} aria-hidden="true" />
  }

  return <motion.div className={styles.layer} style={{ background }} aria-hidden="true" />
}
