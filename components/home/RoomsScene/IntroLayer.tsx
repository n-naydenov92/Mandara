'use client'

import { useTranslation } from 'react-i18next'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import styles from './RoomsScene.module.css'

interface IntroLayerProps {
  eyebrow: string
  title: string
  subtitle: string
  isActive: boolean
}

const SLOGAN_INDEX = 0

// Слоганът е slide 0 в pinned сиквенса: картата му се качва и избледнява,
// после HARD CUT към първата стая — същият преход като между снимките.
export function IntroLayer({ eyebrow, title, subtitle, isActive }: IntroLayerProps) {
  const { t: tCommon } = useTranslation('common')
  const slideClass = isActive ? `${styles.slide} ${styles.isActive}` : styles.slide

  return (
    <article className={slideClass} data-index={SLOGAN_INDEX} aria-label={title}>
      <div className={`${styles.bg} ${styles.sloganBg}`} aria-hidden="true" />
      <BotanicalAccent corner="tl" tone="cream" />
      <BotanicalAccent corner="br" tone="cream" />
      <div className={`${styles.card} ${styles.sloganCard}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={styles.sloganTitle}>{title}</h2>
        <p className={styles.sloganSubtitle}>{subtitle}</p>
      </div>
      <div className={styles.scroll}>
        <span className={styles.scrollLabel}>{tCommon('scroll')}</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </div>
    </article>
  )
}
