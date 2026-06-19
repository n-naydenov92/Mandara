import type { ReactNode } from 'react'
import styles from './Section.module.css'

type SectionTone = 'cream' | 'ivory' | 'olive' | 'forest' | 'night' | 'transparent' | 'panel'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  tone?: SectionTone
}

export function Section({ children, id, className, tone = 'cream' }: SectionProps) {
  const classNames = [styles.section, styles[tone], className].filter(Boolean).join(' ')
  return (
    <section id={id} className={classNames}>
      {children}
    </section>
  )
}
