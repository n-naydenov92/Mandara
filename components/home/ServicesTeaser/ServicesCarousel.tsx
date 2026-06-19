'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './ServicesCarousel.module.css'

export interface ServiceSlide {
  src: string
  alt: string
  title: string
  meta: string
}

interface ServicesCarouselProps {
  items: ServiceSlide[]
  controlLabels: { prev: string; next: string }
  regionLabel: string
  className?: string
}

const IMAGE_SIZES = '(max-width: 900px) 80vw, 32vw'

function getStep(track: HTMLUListElement): number {
  const [first, second] = track.children
  if (!first) {
    return 0
  }
  if (second) {
    return (second as HTMLElement).offsetLeft - (first as HTMLElement).offsetLeft
  }
  return (first as HTMLElement).offsetWidth
}

export function ServicesCarousel({ items, controlLabels, regionLabel, className }: ServicesCarouselProps) {
  const reduced = useReducedMotionSafe()
  const trackRef = useRef<HTMLUListElement>(null)
  const frameRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const canPrev = activeIndex > 0
  const canNext = activeIndex < items.length - 1

  const scrollByStep = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) {
      return
    }
    track.scrollBy({ left: getStep(track) * direction, behavior: reduced ? 'auto' : 'smooth' })
  }

  const handleScroll = () => {
    if (frameRef.current !== null) {
      return
    }
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      const track = trackRef.current
      const step = track ? getStep(track) : 0
      if (track && step > 0) {
        setActiveIndex(Math.round(track.scrollLeft / step))
      }
    })
  }

  return (
    <div className={[styles.carousel, className].filter(Boolean).join(' ')}>
      <ul
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label={regionLabel}
        data-lenis-prevent
      >
        {items.map((item) => (
          <li className={styles.card} key={item.src}>
            <div className={styles.media}>
              <Image src={item.src} alt={item.alt} fill sizes={IMAGE_SIZES} className={styles.image} />
            </div>
            <div className={styles.caption}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.meta}>{item.meta}</span>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={() => scrollByStep(-1)}
        disabled={!canPrev}
        aria-label={controlLabels.prev}
      >
        <Icon icon={IconChevronLeft} size={20} />
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={() => scrollByStep(1)}
        disabled={!canNext}
        aria-label={controlLabels.next}
      >
        <Icon icon={IconChevronRight} size={20} />
      </button>
    </div>
  )
}
