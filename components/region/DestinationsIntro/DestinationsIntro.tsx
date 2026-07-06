import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import type { Locale } from '@/lib/i18n/settings'
import styles from './DestinationsIntro.module.css'

interface DestinationsIntroProps {
  lng: Locale
}

export async function DestinationsIntro({ lng }: DestinationsIntroProps) {
  const { t } = await getTranslation(lng, 'region')

  return (
    <Section tone="cream">
      <BotanicalAccent corner="tr" />
      <Container>
        <Reveal className={styles.header} duration={1.4}>
          <Eyebrow>{t('destinations.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('destinations.title')}</h2>
          <p className={styles.lead}>{t('destinations.lead')}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
