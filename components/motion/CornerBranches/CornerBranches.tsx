'use client'

import { useRef, type CSSProperties } from 'react'
import { useScroll } from 'motion/react'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import { Branch, type BranchCorner } from './Branch'
import styles from './CornerBranches.module.css'

type BranchTone = 'light' | 'dark'

interface CornerBranchesProps {
  // Светъл тон за тъмен фон (hero), тъмен за светли секции.
  tone?: BranchTone
  // Паралакс на скрол; за статичните секции остава false.
  parallax?: boolean
  // Слой спрямо съдържанието на секцията-домакин.
  zIndex?: number
  // Кои ъгли да се покажат; по подразбиране и четирите.
  corners?: BranchCorner[]
}

const ALL_CORNERS: BranchCorner[] = ['tl', 'tr', 'bl', 'br']
const DEFAULT_Z_INDEX = 0

export function CornerBranches({
  tone = 'light',
  parallax = false,
  zIndex = DEFAULT_Z_INDEX,
  corners = ALL_CORNERS,
}: CornerBranchesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const animate = parallax && !reducedMotion

  return (
    <div
      ref={ref}
      className={styles.branches}
      data-tone={tone}
      style={{ zIndex } as CSSProperties}
      aria-hidden="true"
    >
      {corners.map((corner) => (
        <Branch key={corner} corner={corner} progress={animate ? scrollYProgress : undefined} />
      ))}
    </div>
  )
}
