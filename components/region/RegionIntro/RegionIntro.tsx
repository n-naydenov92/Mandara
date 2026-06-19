import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RegionIntro.module.css'

interface RegionIntroProps {
  lng: Locale
}

export async function RegionIntro({ lng }: RegionIntroProps) {
  const { t } = await getTranslation(lng, 'region')

  return (
    <Section tone="cream">
      <BotanicalAccent corner="tl" />
      <BotanicalAccent corner="br" />
      <Container>
        <Reveal className={styles.lead} duration={1.4}>
          <p>{t('intro.lead')}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
