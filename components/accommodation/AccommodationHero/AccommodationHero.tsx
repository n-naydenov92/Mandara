import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AccommodationHero.module.css'

const HERO_IMAGE = '/images/accomodation/nastanqvane-banner.webp'

interface AccommodationHeroProps {
  lng: Locale
}

export async function AccommodationHero({ lng }: AccommodationHeroProps) {
  const { t } = await getTranslation(lng, 'accommodation')
  const stats = [
    t('stats.bedrooms'),
    t('stats.guests'),
    t('stats.sauna'),
    t('stats.pool'),
    t('stats.attractions'),
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
