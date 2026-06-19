'use client'

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { REGION_KEYS, REGION_DESTINATIONS } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RegionTeaser.module.css'

interface RegionTeaserProps {
  lng: Locale
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ICON_SIZE = 16
// Dwell: всеки сегмент „почива“ върху дестинация през първите 60%, после мек swap.
const DWELL = 0.6
const SWAP = 1 - DWELL
const MIN_COUNT = 2
// Damping: current лерпва към target всеки кадър → плавно изменение независимо от
// честотата на scroll събитията (Lenis ги подава разредено).
const DAMP = 0.16
const SETTLE = 0.0005
const OPACITY_PRECISION = 3

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// „Почивка → мек swap → почивка“ вместо linear мъгла. Изисква count >= 2.
function computeSmoothIndex(progress: number, count: number): number {
  const segWidth = 1 / (count - 1)
  const rawSeg = progress / segWidth
  const segInt = Math.floor(rawSeg)
  if (segInt >= count - 1) {
    return count - 1
  }
  const frac = rawSeg - segInt
  if (frac < DWELL) {
    return segInt
  }
  return segInt + easeInOut((frac - DWELL) / SWAP)
}

// Текст: симетричен crossfade — старият избледнява, докато новият се появява.
function fadeOpacity(smoothIndex: number, index: number): number {
  return clamp(1 - Math.abs(smoothIndex - index), 0, 1)
}

// Снимки: слоест fade — долната снимка остава плътна (покрива фона),
// само входящата избледнява отгоре → без премигване на cream-а.
function layeredOpacity(smoothIndex: number, index: number): number {
  return clamp(smoothIndex - index + 1, 0, 1)
}

// Vanilla scroll+RAF engine. Прогресът се чете през getBoundingClientRect (Lenis-safe),
// не през window.scrollY. Само opacity на кадър — без layout, императивно през cache-нати refs.
function useRegionScroll(sectionRef: RefObject<HTMLElement | null>, count: number): void {
  useEffect(() => {
    const section = sectionRef.current
    if (!section || count < MIN_COUNT || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return
    }

    const titles = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.title}`))
    const bodies = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.body}`))
    const images = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.img}`))
    if (titles.length === 0) {
      return
    }

    let current = 0
    let target = 0
    let running = false
    let frameId = 0

    const applyFrame = (smoothIndex: number) => {
      titles.forEach((title, index) => {
        title.style.opacity = fadeOpacity(smoothIndex, index).toFixed(OPACITY_PRECISION)
      })
      bodies.forEach((body, index) => {
        body.style.opacity = fadeOpacity(smoothIndex, index).toFixed(OPACITY_PRECISION)
      })
      images.forEach((image) => {
        image.style.opacity = layeredOpacity(smoothIndex, Number(image.dataset.i)).toFixed(OPACITY_PRECISION)
      })
    }

    const readTarget = (): number => {
      const runway = section.offsetHeight - window.innerHeight
      if (!Number.isFinite(runway) || runway <= 0) {
        return target
      }
      let progress = -section.getBoundingClientRect().top / runway
      if (!Number.isFinite(progress)) {
        progress = 0
      }
      return computeSmoothIndex(clamp(progress, 0, 1), count)
    }

    const tick = () => {
      target = readTarget()
      const diff = target - current
      if (Math.abs(diff) < SETTLE) {
        current = target
        applyFrame(current)
        running = false
        return
      }
      current += diff * DAMP
      applyFrame(current)
      frameId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) {
        return
      }
      running = true
      frameId = requestAnimationFrame(tick)
    }

    current = target = readTarget()
    applyFrame(current)
    window.addEventListener('scroll', start, { passive: true })
    window.addEventListener('resize', start)

    return () => {
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', start)
      cancelAnimationFrame(frameId)
    }
  }, [sectionRef, count])
}

export function RegionTeaser({ lng }: RegionTeaserProps) {
  const { t } = useTranslation('home')
  const sectionRef = useRef<HTMLElement>(null)
  const count = REGION_KEYS.length

  useRegionScroll(sectionRef, count)

  return (
    <section
      ref={sectionRef}
      id="region"
      className={styles.section}
      style={{ '--region-count': count } as CSSProperties}
      aria-label={t('region.eyebrow')}
    >
      <div className={styles.pin}>
        <div className={styles.layout}>
          <div className={styles.titleArea}>
            <Eyebrow>{t('region.eyebrow')}</Eyebrow>
            <div className={styles.titleStack}>
              {REGION_KEYS.map((key) => (
                <div className={styles.title} key={key}>
                  {t(`region.points.${key}.title`)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bodyArea}>
            {REGION_KEYS.map((key, index) => (
              <div className={styles.body} data-i={index} key={key}>
                <span className={styles.meta}>{t(`region.points.${key}.meta`)}</span>
                <p className={styles.bodyText}>{t(`region.points.${key}.body`)}</p>
                <LocaleLink lng={lng} href={REGION_DESTINATIONS[key].href} className={styles.cta}>
                  {t('region.cta')}
                  <Icon icon={IconArrowRight} size={ICON_SIZE} />
                </LocaleLink>
              </div>
            ))}
          </div>

          <div className={styles.imagesRow}>
            <div className={styles.imgColWide}>
              {REGION_KEYS.map((key, index) => (
                <div className={styles.img} data-i={index} key={key}>
                  <Image
                    src={REGION_DESTINATIONS[key].images[0].src}
                    alt={t(`region.points.${key}.title`)}
                    fill
                    sizes="(max-width: 820px) 100vw, 45vw"
                    className={styles.imgInner}
                    {...(index === 0 ? { priority: true } : { loading: 'eager' as const })}
                  />
                </div>
              ))}
            </div>
            <div className={styles.imgColNarrow}>
              {REGION_KEYS.map((key, index) => (
                <div className={styles.img} data-i={index} key={key}>
                  <Image
                    src={REGION_DESTINATIONS[key].images[1].src}
                    alt={t(`region.points.${key}.title`)}
                    fill
                    sizes="(max-width: 820px) 100vw, 30vw"
                    className={styles.imgInner}
                    {...(index === 0 ? { priority: true } : { loading: 'eager' as const })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
