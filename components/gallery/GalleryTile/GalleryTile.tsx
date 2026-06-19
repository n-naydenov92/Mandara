'use client'

import { IconArrowUpRight } from '@tabler/icons-react'
import { ImageReveal } from '@/components/motion/ImageReveal/ImageReveal'
import { Icon } from '@/components/ui/Icon/Icon'
import styles from './GalleryTile.module.css'

interface GalleryTileProps {
  src: string
  caption: string
  index: number
  revealDelay?: number
  sizes?: string
  onOpen: (index: number) => void
}

const DEFAULT_SIZES = '(max-width: 640px) 50vw, 33vw'

export function GalleryTile({
  src,
  caption,
  index,
  revealDelay = 0,
  sizes = DEFAULT_SIZES,
  onOpen,
}: GalleryTileProps) {
  const handleClick = () => {
    onOpen(index)
  }

  return (
    <button type="button" className={styles.tile} onClick={handleClick} aria-label={caption}>
      <ImageReveal
        src={src}
        alt={caption}
        sizes={sizes}
        kenburns
        hoverZoom
        revealDelay={revealDelay}
        className={styles.image}
      />
      <span className={styles.gradient} aria-hidden="true" />
      <span className={styles.caption}>{caption}</span>
      <span className={styles.action} aria-hidden="true">
        <Icon icon={IconArrowUpRight} size={18} />
      </span>
    </button>
  )
}
