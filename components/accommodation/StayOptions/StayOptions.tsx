import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { RevealGroup } from '@/components/motion/RevealGroup/RevealGroup'
import { StayOptionCard } from '@/components/accommodation/StayOptions/StayOptionCard'
import { PRICING, formatPrice, lowestRate } from '@/lib/content/pricing'
import type { Locale } from '@/lib/i18n/settings'
import styles from './StayOptions.module.css'

const VILLA_IMAGE = '/images/about/villa.jpg'

interface StayOptionsProps {
  lng: Locale
}

export async function StayOptions({ lng }: StayOptionsProps) {
  const { t } = await getTranslation(lng, 'accommodation')
  const priceFrom = (amount: number) => `${t('pricing.from')} ${formatPrice(amount)} ${t('pricing.perNight')}`

  return (
    <Section tone="ivory">
      <BotanicalAccent corner="bl" />
      <Container>
        <RevealGroup className={styles.grid} stagger={0.12}>
          <StayOptionCard
            variant="villa"
            href="#villa"
            image={VILLA_IMAGE}
            imageAlt={t('compare.villa.title')}
            tag={t('compare.villa.tag')}
            title={t('compare.villa.title')}
            price={priceFrom(lowestRate(PRICING.whole))}
            note={t('compare.villa.note')}
            ctaLabel={t('compare.villa.cta')}
          />
        </RevealGroup>
      </Container>
    </Section>
  )
}
