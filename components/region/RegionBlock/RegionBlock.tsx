import { IconBuildingCottage, IconTrees, IconMapPin } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { RevealImage } from '@/components/motion/RevealImage/RevealImage'
import type { RegionBlockKey } from '@/lib/content/region'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RegionBlock.module.css'

type BlockTone = 'ivory' | 'transparent'

interface RegionBlockProps {
  lng: Locale
  blockKey: RegionBlockKey
  src: string
  tone?: BlockTone
  reversed?: boolean
}

const MEDIA_SIZES = '(max-width: 860px) 100vw, 62vw'
const EYEBROW_ICON_SIZE = 22

const BLOCK_ICON = {
  village: IconBuildingCottage,
  nature: IconTrees,
  nearby: IconMapPin,
} as const satisfies Record<RegionBlockKey, typeof IconTrees>

export async function RegionBlock({
  lng,
  blockKey,
  src,
  tone = 'transparent',
  reversed = false,
}: RegionBlockProps) {
  const { t } = await getTranslation(lng, 'region')
  const title = t(`blocks.${blockKey}.title`)
  const accentCorner = reversed ? 'br' : 'bl'

  return (
    <Section id={blockKey} tone={tone}>
      <BotanicalAccent corner={accentCorner} />
      <Container className={styles.grid}>
        <Reveal className={styles.text} duration={1.4}>
          <span className={styles.eyebrowRow}>
            <Icon icon={BLOCK_ICON[blockKey]} size={EYEBROW_ICON_SIZE} className={styles.eyebrowIcon} />
            <Eyebrow>{t(`blocks.${blockKey}.eyebrow`)}</Eyebrow>
          </span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{t(`blocks.${blockKey}.body`)}</p>
        </Reveal>

        <RevealImage src={src} alt={title} className={styles.media} delay={0.12} sizes={MEDIA_SIZES} />
      </Container>
    </Section>
  )
}
