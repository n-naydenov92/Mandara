'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './ImageReveal.module.css'

interface ImageRevealProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  kenburns?: boolean
  hoverZoom?: boolean
  revealDelay?: number
}

const EASE = [0.22, 1, 0.36, 1] as const

export function ImageReveal({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  kenburns = true,
  hoverZoom = false,
  revealDelay = 0,
}: ImageRevealProps) {
  const reduced = useReducedMotionSafe()
  const frameClass = [styles.frame, hoverZoom ? styles.hoverZoom : '', className ?? '']
    .filter(Boolean)
    .join(' ')
  const imgClass = kenburns && !reduced ? `${styles.img} ${styles.kenburns}` : styles.img

  const inner = (
    <div className={styles.zoom}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={imgClass} />
    </div>
  )

  if (reduced) {
    return (
      <div className={frameClass}>
        <div className={styles.mask}>{inner}</div>
      </div>
    )
  }

  return (
    <div className={frameClass}>
      <motion.div
        className={styles.mask}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.1, ease: EASE, delay: revealDelay }}
      >
        {inner}
      </motion.div>
    </div>
  )
}
