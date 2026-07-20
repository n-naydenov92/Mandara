'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { GalleryTile } from '@/components/gallery/GalleryTile/GalleryTile'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import type { GalleryImage } from '@/lib/content/gallery'
import styles from './BentoGrid.module.css'

interface BentoGridProps {
  items: readonly GalleryImage[]
  groupKey: string // активният таб — сменя ли се, цялата решетка прави спокойно затихване
  onOpen: (index: number) => void
}

const EASE = [0.22, 1, 0.36, 1] as const
const FADE_DURATION = 0.28
const TILE_SIZES = '(max-width: 960px) 50vw, 33vw'

// Смяната на таб затихва цялата решетка наведнъж (mode="wait"), вместо да плъзга/пренарежда
// отделните плочки — така bento подредбата не се „бие" с dense auto-flow при пренареждане.
export function BentoGrid({ items, groupKey, onOpen }: BentoGridProps) {
  const { t } = useTranslation('gallery')
  const reduced = useReducedMotionSafe()
  const transition = reduced ? { duration: 0 } : { duration: FADE_DURATION, ease: EASE }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={groupKey}
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        {items.map((item, index) => (
          <div key={item.id} className={styles.cell}>
            <GalleryTile
              src={item.src}
              caption={t(`captions.${item.captionKey}`)}
              index={index}
              sizes={TILE_SIZES}
              onOpen={onOpen}
            />
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
