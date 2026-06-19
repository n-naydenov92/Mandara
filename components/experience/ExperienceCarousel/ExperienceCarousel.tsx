'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './ExperienceCarousel.module.css'

export interface CarouselItem {
  src: string
  alt: string
  label: string
}

interface ExperienceCarouselProps {
  items: CarouselItem[]
  controlLabels: { prev: string; next: string }
}

const SLIDE_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const
const COUNTER_PAD_LENGTH = 2

function formatCount(value: number): string {
  return String(value).padStart(COUNTER_PAD_LENGTH, '0')
}

export function ExperienceCarousel({ items, controlLabels }: ExperienceCarouselProps) {
  const reduced = useReducedMotionSafe()
  const [activeIndex, setActiveIndex] = useState(0)

  const total = items.length
  const activeLabel = items[activeIndex]?.label ?? ''

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + total) % total)
  }

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % total)
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <motion.div
          className={styles.track}
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={reduced ? { duration: 0 } : SLIDE_TRANSITION}
        >
          {items.map((item) => (
            <div className={styles.slide} key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={styles.image}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.controls}>
        <span className={styles.label} aria-live="polite">
          {activeLabel}
        </span>
        <div className={styles.nav}>
          <span className={styles.counter}>
            {formatCount(activeIndex + 1)} / {formatCount(total)}
          </span>
          <button
            type="button"
            className={styles.button}
            onClick={handlePrev}
            aria-label={controlLabels.prev}
          >
            <Icon icon={IconArrowLeft} size={18} />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleNext}
            aria-label={controlLabels.next}
          >
            <Icon icon={IconArrowRight} size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
