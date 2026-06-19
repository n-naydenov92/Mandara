'use client'

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { CornerBranches } from '@/components/motion/CornerBranches/CornerBranches'
import { REGION_KEYS, REGION_DESTINATIONS } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RegionTeaser.module.css'

interface RegionTeaserProps {
  lng: Locale
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ICON_SIZE = 16
// Dwell: всеки сегмент „почива“ върху дестинация през първите 45%, после мек swap.
const DWELL = 0.45
const SWAP = 1 - DWELL
const MIN_COUNT = 2
// Damping: current лерпва към target всеки кадър → плавно изменение независимо от
// честотата на scroll събитията (Lenis ги подава разредено).
const DAMP = 0.16
const SETTLE = 0.0005
const OPACITY_PRECISION = 3
const FR_PRECISION = 3
// Width-swap: лявата колона започва широка (COL_WIDE), дясната тясна (COL_NARROW);
// на скрол се разменят. Стойностите са в fr — ~63/37 → 37/63.
const COL_WIDE = 1.7
const COL_NARROW = 1

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

// Vanilla scroll+RAF engine. Прогресът се чете през getBoundingClientRect (Lenis-safe),
// не през window.scrollY. Текст = opacity crossfade, снимки = hard cut, колони = width-swap.
// current е damped СУРОВ прогрес (0→1); dwell-ът се прилага само върху crossfade-а.
function useRegionScroll(sectionRef: RefObject<HTMLElement | null>, count: number): void {
  useEffect(() => {
    const section = sectionRef.current
    if (!section || count < MIN_COUNT || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return
    }

    const titles = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.title}`))
    const bodies = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.body}`))
    const images = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.img}`))
    const imagesRow = section.querySelector<HTMLElement>(`.${styles.imagesRow}`)
    const pin = section.querySelector<HTMLElement>(`.${styles.pin}`)
    if (titles.length === 0) {
      return
    }

    let current = 0
    let target = 0
    let running = false
    let frameId = 0
    // Runway = геометрия на елементите, НЕ window.innerHeight. На мобилно innerHeight
    // осцилира с показването/скриването на адрес-бара → трептене. pin е 100vh (стабилен).
    let runway = 0
    const measure = () => {
      const pinHeight = pin ? pin.offsetHeight : window.innerHeight
      runway = section.offsetHeight - pinHeight
    }

    // Разменя ширините на двете колони според общия прогрес (0 → 1).
    const applyBalance = (progress: number) => {
      if (!imagesRow) {
        return
      }
      const span = COL_WIDE - COL_NARROW
      imagesRow.style.setProperty('--col-left', `${(COL_WIDE - span * progress).toFixed(FR_PRECISION)}fr`)
      imagesRow.style.setProperty('--col-right', `${(COL_NARROW + span * progress).toFixed(FR_PRECISION)}fr`)
    }

    const applyFrame = (progress: number) => {
      const smoothIndex = computeSmoothIndex(progress, count)
      titles.forEach((title, index) => {
        title.style.opacity = fadeOpacity(smoothIndex, index).toFixed(OPACITY_PRECISION)
      })
      bodies.forEach((body, index) => {
        body.style.opacity = fadeOpacity(smoothIndex, index).toFixed(OPACITY_PRECISION)
      })
      // Снимки: рязка смяна (hard cut) — без opacity, без наслагване.
      const active = clamp(Math.round(smoothIndex), 0, count - 1)
      images.forEach((image) => {
        image.style.visibility = Number(image.dataset.i) === active ? 'visible' : 'hidden'
      })
      // Width-swap следва суровия прогрес → реагира веднага, без dwell забавяне.
      applyBalance(progress)
    }

    const readProgress = (): number => {
      if (!Number.isFinite(runway) || runway <= 0) {
        return target
      }
      let progress = -section.getBoundingClientRect().top / runway
      if (!Number.isFinite(progress)) {
        progress = 0
      }
      return clamp(progress, 0, 1)
    }

    const tick = () => {
      target = readProgress()
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

    const onResize = () => {
      measure()
      start()
    }

    measure()
    current = target = readProgress()
    applyFrame(current)
    window.addEventListener('scroll', start, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', onResize)
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
        <CornerBranches tone="dark" corners={['bl']} />
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
