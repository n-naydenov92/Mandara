import {
  IconBuildingChurch,
  IconBuildingBank,
  IconDroplet,
  IconRipple,
  IconMountain,
} from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { DistanceChips, type DistanceUnits } from '@/components/ui/DistanceChips/DistanceChips'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { RevealImage } from '@/components/motion/RevealImage/RevealImage'
import type { Destination, DestinationIconKey } from '@/lib/content/region'
import type { Locale } from '@/lib/i18n/settings'
import styles from './DestinationBlock.module.css'

interface DestinationBlockProps {
  lng: Locale
  destination: Destination
}

const MEDIA_SIZES = '(max-width: 860px) 100vw, 62vw'
const EYEBROW_ICON_SIZE = 22

const DESTINATION_ICON = {
  monastery: IconBuildingChurch,
  museum: IconBuildingBank,
  waterfall: IconDroplet,
  lake: IconRipple,
  cave: IconMountain,
} as const satisfies Record<DestinationIconKey, typeof IconBuildingChurch>

export async function DestinationBlock({ lng, destination }: DestinationBlockProps) {
  const { t } = await getTranslation(lng, 'region')
  const { key, iconKey, distanceKm, timeMin, src, reversed } = destination
  const title = t(`destinations.items.${key}.title`)
  const units = t('destinations.units', { returnObjects: true }) as DistanceUnits
  const tone = reversed ? 'ivory' : 'transparent'
  const accentCorner = reversed ? 'br' : 'bl'

  return (
    <Section id={key} tone={tone}>
      <BotanicalAccent corner={accentCorner} />
      <Container className={styles.grid}>
        <Reveal className={styles.text} duration={1.4}>
          <span className={styles.eyebrowRow}>
            <Icon icon={DESTINATION_ICON[iconKey]} size={EYEBROW_ICON_SIZE} className={styles.eyebrowIcon} />
            <Eyebrow>{t(`destinations.items.${key}.eyebrow`)}</Eyebrow>
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.body}>{t(`destinations.items.${key}.body`)}</p>
          <DistanceChips
            distanceKm={distanceKm}
            timeMin={timeMin}
            units={units}
            className={styles.chips}
          />
        </Reveal>

        <RevealImage src={src} alt={title} className={styles.media} delay={0.12} sizes={MEDIA_SIZES} />
      </Container>
    </Section>
  )
}
