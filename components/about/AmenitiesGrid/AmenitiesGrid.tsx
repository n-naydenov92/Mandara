import type { ComponentType } from 'react'
import {
  IconBed,
  IconArmchair,
  IconToolsKitchen2,
  IconAirConditioning,
  IconWifi,
  IconSwimming,
  IconLeaf,
  IconBath,
  IconFlame,
  IconMoodKid,
  IconChefHat,
  IconShoppingBag,
  IconMassage,
  IconBarbell,
} from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Icon } from '@/components/ui/Icon/Icon'
import { RevealGroup } from '@/components/motion/RevealGroup/RevealGroup'
import { AMENITY_GROUPS } from '@/lib/content/about'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AmenitiesGrid.module.css'

interface AmenitiesGridProps {
  lng: Locale
}

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

const AMENITY_ICON: Record<string, ComponentType<TablerIconProps>> = {
  rooms: IconBed,
  livingRoom: IconArmchair,
  kitchen: IconToolsKitchen2,
  heating: IconAirConditioning,
  wifi: IconWifi,
  pool: IconSwimming,
  gardenFire: IconFlame,
  sauna: IconBath,
  kids: IconMoodKid,
  chef: IconChefHat,
  shopping: IconShoppingBag,
  massage: IconMassage,
  gym: IconBarbell,
}

export async function AmenitiesGrid({ lng }: AmenitiesGridProps) {
  const { t } = await getTranslation(lng, 'about')

  return (
    <Section tone="ivory">
      <BotanicalAccent corner="tr" />
      <Container>
        <div className={styles.header}>
          <Eyebrow>{t('amenities.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('amenities.title')}</h2>
        </div>

        <RevealGroup className={styles.groups}>
          {AMENITY_GROUPS.map((group) => (
            <div key={group.key} className={styles.group}>
              <h3 className={styles.groupTitle}>{t(`amenities.groups.${group.key}.title`)}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.itemIcon}>
                      <Icon icon={AMENITY_ICON[item] ?? IconLeaf} size={20} />
                    </span>
                    <span className={styles.itemLabel}>
                      {t(`amenities.groups.${group.key}.items.${item}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
