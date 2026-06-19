import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { PRICING } from '@/lib/content/pricing'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AccommodationHero.module.css'

const HERO_IMAGE = '/images/about/villa.jpg'

interface AccommodationHeroProps {
  lng: Locale
}

export async function AccommodationHero({ lng }: AccommodationHeroProps) {
  const { t } = await getTranslation(lng, 'accommodation')
  const stats = [
    t('stats.rooms', { n: PRICING.bedrooms }),
    t('stats.guests', { n: PRICING.capacity }),
    t('stats.shared'),
  ]

  return (
    <>
      <PageHero
        image={HERO_IMAGE}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        scrollLabel={t('hero.scroll')}
        kenBurns
      />
      <section className={styles.intro}>
        <BotanicalAccent corner="tr" />
        <Container>
          <Reveal>
            <p className={styles.lead}>{t('hero.lead')}</p>
            <ul className={styles.stats}>
              {stats.map((stat) => (
                <li key={stat} className={styles.stat}>
                  {stat}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
