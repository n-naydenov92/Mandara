'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { HerbSprig } from './HerbSprig'
import styles from './Branch.module.css'

export type BranchCorner = 'tl' | 'tr' | 'bl' | 'br'

interface BranchProps {
  corner: BranchCorner
  // Подаден → паралакс на скрол; пропуснат → статична клонка.
  progress?: MotionValue<number>
}

const CORNER_MOTION: Record<BranchCorner, { x: string; y: string; rotate: number }> = {
  tl: { x: '-38vw', y: '-12vh', rotate: -7 },
  tr: { x: '38vw', y: '-12vh', rotate: 7 },
  bl: { x: '-26vw', y: '14vh', rotate: 6 },
  br: { x: '26vw', y: '14vh', rotate: -6 },
}

function StaticBranch({ corner }: { corner: BranchCorner }) {
  return (
    <div className={`${styles.branch} ${styles[corner]}`} aria-hidden="true">
      <HerbSprig className={styles.svg} />
    </div>
  )
}

function MovingBranch({ corner, progress }: { corner: BranchCorner; progress: MotionValue<number> }) {
  const target = CORNER_MOTION[corner]
  const x = useTransform(progress, [0, 1], ['0vw', target.x])
  const y = useTransform(progress, [0, 1], ['0vh', target.y])
  const rotate = useTransform(progress, [0, 1], [0, target.rotate])

  return (
    <motion.div className={`${styles.branch} ${styles[corner]}`} style={{ x, y, rotate }} aria-hidden="true">
      <HerbSprig className={styles.svg} />
    </motion.div>
  )
}

export function Branch({ corner, progress }: BranchProps) {
  if (!progress) {
    return <StaticBranch corner={corner} />
  }
  return <MovingBranch corner={corner} progress={progress} />
}
