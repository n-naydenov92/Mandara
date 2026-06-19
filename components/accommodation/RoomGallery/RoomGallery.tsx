'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { IconChevronLeft, IconChevronRight, IconArrowsMaximize } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import { useLightbox, type LightboxItem } from '@/components/gallery/Lightbox/useLightbox'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './RoomGallery.module.css'

interface RoomGalleryLabels {
  prev: string
  next: string
  open: string
}

interface RoomGalleryProps {
  images: readonly string[]
  alt: string
  labels: RoomGalleryLabels
  sizes?: string
}

const LIGHTBOX_WIDTH = 1600
const LIGHTBOX_HEIGHT = 1067
const FADE_DURATION = 0.4
const EASE = [0.22, 1, 0.36, 1] as const
const DEFAULT_SIZES = '(max-width: 960px) 100vw, 60vw'

export function RoomGallery({ images, alt, labels, sizes = DEFAULT_SIZES }: RoomGalleryProps) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotionSafe()

  const items = useMemo<LightboxItem[]>(
    () => images.map((src) => ({ src, width: LIGHTBOX_WIDTH, height: LIGHTBOX_HEIGHT, alt })),
    [images, alt],
  )
  const { open } = useLightbox(items)

  const count = images.length
  const hasMultiple = count > 1
  const current = images[index] ?? images[0]

  const goTo = (next: number) => {
    setIndex((next + count) % count)
  }

  if (current === undefined) {
    return null
  }

  return (
    <div className={styles.gallery}>
      <button type="button" className={styles.frame} onClick={() => open(index)} aria-label={labels.open}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className={styles.slide}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: EASE }}
          >
            <Image src={current} alt={alt} fill sizes={sizes} className={styles.img} />
          </motion.span>
        </AnimatePresence>
        <span className={styles.expand} aria-hidden="true">
          <Icon icon={IconArrowsMaximize} size={18} />
        </span>
      </button>

      {hasMultiple ? (
        <div className={styles.controls}>
          <span className={styles.counter} aria-live="polite">
            {index + 1} / {count}
          </span>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => goTo(index - 1)} aria-label={labels.prev}>
              <Icon icon={IconChevronLeft} size={22} />
            </button>
            <button type="button" className={styles.arrow} onClick={() => goTo(index + 1)} aria-label={labels.next}>
              <Icon icon={IconChevronRight} size={22} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
