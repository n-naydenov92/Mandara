'use client'

import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import styles from './Footer.module.css'

interface FooterRevealProps {
  children: ReactNode
}

// Завеса: съдържанието стартира 12% надолу (clip-нато от footer overflow) + opacity 0,
// после се „wipe-ва" нагоре до resting докато футърът влиза в края на страницата.
// startYPercent е нисък, за да няма голяма празна зелена ивица над съдържанието.
// runwayRatio = частта от височината на футъра (в scroll), за която reveal-ът завършва;
// ≤ 1, защото това е максималното разстояние, което футърът може да измине до дъното.
const REVEAL = { startYPercent: 12, runwayRatio: 0.85 }
const OPACITY_PRECISION = 3
const TRANSFORM_PRECISION = 2

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Vanilla scroll + RAF engine (като RoomsScene): мери нетрансформирания root, пише imperative
// на трансформирания content — без React state на кадър и без feedback loop от getBoundingClientRect.
function useFooterReveal(
  rootRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const root = rootRef.current
    const content = contentRef.current
    if (reducedMotion || !root || !content) {
      return
    }

    let ticking = false
    let frameId = 0

    const update = () => {
      ticking = false
      const runway = root.offsetHeight * REVEAL.runwayRatio
      if (!Number.isFinite(runway) || runway <= 0) {
        return
      }
      let progress = (window.innerHeight - root.getBoundingClientRect().top) / runway
      if (!Number.isFinite(progress)) {
        progress = 0
      }
      progress = clamp(progress, 0, 1)
      content.style.opacity = progress.toFixed(OPACITY_PRECISION)
      const y = REVEAL.startYPercent * (1 - progress)
      content.style.transform = `translate3d(0, ${y.toFixed(TRANSFORM_PRECISION)}%, 0)`
    }

    const onScroll = () => {
      if (ticking) {
        return
      }
      frameId = requestAnimationFrame(update)
      ticking = true
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    frameId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frameId)
    }
  }, [rootRef, contentRef, reducedMotion])
}

export function FooterReveal({ children }: FooterRevealProps) {
  const reducedMotion = useReducedMotionSafe()
  const rootRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useFooterReveal(rootRef, contentRef, reducedMotion)

  return (
    <footer ref={rootRef} className={styles.footer}>
      <div ref={contentRef} className={reducedMotion ? styles.content : styles.contentHidden}>
        {children}
      </div>
    </footer>
  )
}
