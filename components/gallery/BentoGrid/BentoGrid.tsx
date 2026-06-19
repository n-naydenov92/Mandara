'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { GalleryTile } from '@/components/gallery/GalleryTile/GalleryTile'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import type { GalleryImage } from '@/lib/content/gallery'
import styles from './BentoGrid.module.css'

interface BentoGridProps {
  items: readonly GalleryImage[]
  onOpen: (index: number) => void
}

const EASE = [0.22, 1, 0.36, 1] as const
const FILTER_DURATION = 0.22
const TILE_SIZES = '(max-width: 960px) 50vw, 33vw'

export function BentoGrid({ items, onOpen }: BentoGridProps) {
  const { t } = useTranslation('gallery')
  const reduced = useReducedMotionSafe()
  const transition = reduced ? { duration: 0 } : { duration: FILTER_DURATION, ease: EASE }
  const scaleFrom = reduced ? 1 : 0.96

  return (
    <div className={styles.grid}>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            className={styles.cell}
            initial={{ opacity: 0, scale: scaleFrom }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: scaleFrom }}
            transition={transition}
          >
            <GalleryTile
              src={item.src}
              caption={t(`captions.${item.captionKey}`)}
              index={index}
              sizes={TILE_SIZES}
              onOpen={onOpen}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
