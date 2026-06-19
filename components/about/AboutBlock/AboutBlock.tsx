import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { RevealImage } from '@/components/motion/RevealImage/RevealImage'
import type { AboutBlockKey } from '@/lib/content/about'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AboutBlock.module.css'

type BlockTone = 'ivory' | 'transparent'

interface AboutBlockProps {
  lng: Locale
  blockKey: AboutBlockKey
  src: string
  tone?: BlockTone
  reversed?: boolean
}

const MEDIA_SIZES = '(max-width: 860px) 100vw, 62vw'

export async function AboutBlock({
  lng,
  blockKey,
  src,
  tone = 'transparent',
  reversed = false,
}: AboutBlockProps) {
  const { t } = await getTranslation(lng, 'about')
  const gridClass = reversed ? `${styles.grid} ${styles.reversed}` : styles.grid
  const title = t(`blocks.${blockKey}.title`)

  return (
    <Section id={blockKey} tone={tone}>
      <BotanicalAccent corner={reversed ? 'br' : 'bl'} />
      <Container className={gridClass}>
        <Reveal className={styles.text} duration={1.4}>
          <Eyebrow>{t(`blocks.${blockKey}.eyebrow`)}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{t(`blocks.${blockKey}.body`)}</p>
        </Reveal>

        <RevealImage src={src} alt={title} className={styles.media} delay={0.12} sizes={MEDIA_SIZES} />
      </Container>
    </Section>
  )
}
