import type { ComponentType } from 'react'
import { IconMapPin, IconBuildingChurch, IconMountain, IconDroplet, IconBuildingStore } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { LOCATION_NEARBY_KEYS, type LocationNearbyKey } from '@/lib/content/about'
import type { Locale } from '@/lib/i18n/settings'
import styles from './LocationBlock.module.css'

interface LocationBlockProps {
  lng: Locale
}

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

const NEARBY_ICON = {
  monastery: IconBuildingChurch,
  trails: IconMountain,
  springs: IconDroplet,
  town: IconBuildingStore,
} as const satisfies Record<LocationNearbyKey, ComponentType<TablerIconProps>>

export async function LocationBlock({ lng }: LocationBlockProps) {
  const { t, i18n } = await getTranslation(lng, ['about', 'common'])
  const tCommon = i18n.getFixedT(lng, 'common')

  return (
    <Section tone="forest">
      <BotanicalAccent corner="br" tone="cream" />
      <Container className={styles.grid}>
        <Reveal className={styles.text} duration={1.4}>
          <Eyebrow tone="cream">{t('location.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('location.title')}</h2>
          <p className={styles.body}>{t('location.body')}</p>
          <p className={styles.address}>
            <span className={styles.pin} aria-hidden="true">
              <Icon icon={IconMapPin} size={20} />
            </span>
            {tCommon('location')}
          </p>
          <Button href="/region" lng={lng} variant="outline" className={styles.cta}>
            {t('location.cta')}
          </Button>
        </Reveal>

        <Reveal className={styles.card} delay={0.12} duration={1.4}>
          <h3 className={styles.cardTitle}>{t('location.nearby.title')}</h3>
          <ul className={styles.list}>
            {LOCATION_NEARBY_KEYS.map((key) => (
              <li key={key} className={styles.item}>
                <span className={styles.place}>
                  <span className={styles.itemIcon} aria-hidden="true">
                    <Icon icon={NEARBY_ICON[key]} size={20} />
                  </span>
                  {t(`location.nearby.items.${key}.place`)}
                </span>
                <span className={styles.time}>{t(`location.nearby.items.${key}.time`)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
