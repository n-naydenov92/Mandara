import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { ArchImage } from '@/components/ui/ArchImage/ArchImage'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AboutSplit.module.css'

interface AboutSplitProps {
  lng: Locale
}

export async function AboutSplit({ lng }: AboutSplitProps) {
  const { t } = await getTranslation(lng, 'home')

  return (
    <Section id="about-intro" tone="transparent">
      <BotanicalAccent corner="tr" />
      <Container className={styles.grid}>
        <div className={styles.text}>
          <Reveal>
            <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.title}>{t('about.title')}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.body}>{t('about.body1')}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className={styles.body}>{t('about.body2')}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className={styles.closing}>{t('about.closing')}</p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className={styles.media}>
          <ArchImage
            src="/images/about/villa.jpg"
            alt={t('about.title')}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </Reveal>
      </Container>
    </Section>
  )
}
