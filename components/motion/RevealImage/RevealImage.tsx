'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './RevealImage.module.css'

interface RevealImageProps {
  src: string
  alt: string
  sizes?: string
  className?: string
  delay?: number
  priority?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

export function RevealImage({
  src,
  alt,
  sizes = '50vw',
  className,
  delay = 0,
  priority = false,
}: RevealImageProps) {
  const reduced = useReducedMotionSafe()
  const frameClass = className ? `${styles.frame} ${className}` : styles.frame

  if (reduced) {
    return (
      <div className={frameClass}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
      </div>
    )
  }

  return (
    <motion.div
      className={frameClass}
      initial={{ opacity: 0, y: 56, scale: 1.06 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
    </motion.div>
  )
}
