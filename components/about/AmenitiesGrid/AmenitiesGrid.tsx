import type { ComponentType } from 'react'
import {
  IconBed,
  IconHanger,
  IconArmchair,
  IconToolsKitchen2,
  IconAirConditioning,
  IconWifi,
  IconSwimming,
  IconLeaf,
  IconBath,
  IconSun,
  IconPlant2,
  IconMountain,
  IconFlame,
  IconParking,
  IconChefHat,
  IconCar,
  IconBell,
  IconSparkles,
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
  sixRooms: IconBed,
  linens: IconHanger,
  livingRoom: IconArmchair,
  kitchen: IconToolsKitchen2,
  heating: IconAirConditioning,
  wifi: IconWifi,
  pool: IconSwimming,
  herbalRituals: IconLeaf,
  sauna: IconBath,
  loungers: IconSun,
  garden: IconPlant2,
  terrace: IconMountain,
  firePit: IconFlame,
  parking: IconParking,
  chef: IconChefHat,
  transfer: IconCar,
  concierge: IconBell,
  cleaning: IconSparkles,
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
