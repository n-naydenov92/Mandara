'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { ROOMS } from '@/lib/content/rooms'
import { IntroLayer } from './IntroLayer'
import { RoomLayer } from './RoomLayer'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RoomsScene.module.css'

interface RoomsSceneProps {
  lng: Locale
}

// Крива на текстовата карта по сегмент (local progress 0→1):
// fade-in 0–12%, travel up 12–78%, fade-out 78–100%; Y от +80px до −260px.
const CURVE = { fadeInUntil: 0.12, fadeOutFrom: 0.78, startY: 80, travelY: -260 }
const FADE_OUT_DRIFT = 0.25
const INTRO_SLIDE_INDEX = 0
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const OPACITY_PRECISION = 3
const TRANSFORM_PRECISION = 2

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function resolveCurve(local: number, isIntro: boolean): { opacity: number; y: number } {
  if (local < CURVE.fadeInUntil) {
    // Слоганът е първият slide — няма предходен кадър, от който да изплува;
    // стои видим и на място, докато не дойде travel/fade-out на изхода.
    if (isIntro) {
      return { opacity: 1, y: 0 }
    }
    const t = local / CURVE.fadeInUntil
    return { opacity: t, y: CURVE.startY * (1 - t) }
  }
  if (local < CURVE.fadeOutFrom) {
    const t = (local - CURVE.fadeInUntil) / (CURVE.fadeOutFrom - CURVE.fadeInUntil)
    return { opacity: 1, y: CURVE.travelY * t }
  }
  const t = (local - CURVE.fadeOutFrom) / (1 - CURVE.fadeOutFrom)
  return { opacity: 1 - t, y: CURVE.travelY + CURVE.travelY * FADE_OUT_DRIFT * t }
}

function restingTransform(): string {
  return `translate3d(0, ${CURVE.startY}px, 0)`
}

// Vanilla scroll+RAF engine: чете реалната scroll позиция и кара pinned секцията.
// Никакъв React state на кадър — записите са императивни през cache-натите refs.
function useStickySlides(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return
    }

    const slideClass = styles.slide
    const activeClass = styles.isActive
    const cardClass = styles.card
    if (!slideClass || !activeClass || !cardClass) {
      return
    }

    const slides = Array.from(section.querySelectorAll<HTMLElement>(`.${slideClass}`))
    const cards = slides.map((slide) => slide.querySelector<HTMLElement>(`.${cardClass}`))
    const count = slides.length
    if (count === 0) {
      return
    }

    let lastActive = 0
    let ticking = false
    let frameId = 0

    const resetCard = (card: HTMLElement | null | undefined) => {
      if (!card) {
        return
      }
      card.style.opacity = '0'
      card.style.transform = restingTransform()
    }

    const activate = (index: number) => {
      slides.forEach((slide, i) => slide.classList.toggle(activeClass, i === index))
      resetCard(cards[lastActive])
      lastActive = index
    }

    const update = () => {
      ticking = false
      const runway = section.offsetHeight - window.innerHeight
      if (!Number.isFinite(runway) || runway <= 0) {
        return
      }
      let progress = -section.getBoundingClientRect().top / runway
      if (!Number.isFinite(progress)) {
        progress = 0
      }
      progress = clamp(progress, 0, 1)

      const segment = 1 / count
      let active = Math.floor(progress / segment)
      if (!Number.isFinite(active)) {
        active = 0
      }
      active = clamp(active, 0, count - 1)
      if (active !== lastActive) {
        activate(active)
      }

      const card = cards[active]
      if (!card) {
        return
      }
      const local = (progress - active * segment) / segment
      const { opacity, y } = resolveCurve(local, active === INTRO_SLIDE_INDEX)
      card.style.opacity = opacity.toFixed(OPACITY_PRECISION)
      card.style.transform = `translate3d(0, ${y.toFixed(TRANSFORM_PRECISION)}px, 0)`
    }

    const onScroll = () => {
      if (ticking) {
        return
      }
      frameId = requestAnimationFrame(update)
      ticking = true
    }

    cards.forEach(resetCard)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    frameId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frameId)
    }
  }, [sectionRef])
}

export function RoomsScene({ lng }: RoomsSceneProps) {
  const { t } = useTranslation('rooms')
  const { t: tHome } = useTranslation('home')
  const sectionRef = useRef<HTMLElement>(null)
  const total = ROOMS.length
  // Слоганът е slide 0, стаите са slide 1..N → общо N+1 slide-а.
  const slideCount = total + 1
  const title = tHome('rooms.title')
  const cta = tHome('rooms.cta')

  useStickySlides(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className={styles.wrapper}
      style={{ '--slide-count': slideCount } as CSSProperties}
      aria-label={title}
    >
      <div className={styles.pin}>
        <IntroLayer eyebrow={tHome('rooms.eyebrow')} title={title} subtitle={tHome('rooms.subtitle')} isActive />
        {ROOMS.map((room, index) => (
          <RoomLayer
            key={room.slug}
            room={room}
            lng={lng}
            name={t(`${room.slug}.name`)}
            description={t(`${room.slug}.description`)}
            cta={cta}
            index={index}
            total={total}
            isFirst={index === 0}
            isActive={false}
          />
        ))}
      </div>
    </section>
  )
}
