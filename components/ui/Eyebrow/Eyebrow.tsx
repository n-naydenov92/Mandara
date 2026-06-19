import type { ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type EyebrowTone = 'terra' | 'ember' | 'olive' | 'stone' | 'cream'

interface EyebrowProps {
  children: ReactNode
  tone?: EyebrowTone
  className?: string
}

export function Eyebrow({ children, tone = 'terra', className }: EyebrowProps) {
  const classNames = [styles.eyebrow, styles[tone], className].filter(Boolean).join(' ')
  return <span className={classNames}>{children}</span>
}
