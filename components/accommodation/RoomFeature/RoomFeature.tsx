import type { CSSProperties } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { RoomGallery } from '@/components/accommodation/RoomGallery/RoomGallery'
import { ROOM_TIME_ICON, ROOM_TIME_ICON_FALLBACK } from '@/lib/content/roomIcons'
import type { Room } from '@/lib/content/rooms'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RoomFeature.module.css'

interface RoomGalleryLabels {
  prev: string
  next: string
  open: string
}

interface RoomFeatureProps {
  room: Room
  lng: Locale
  name: string
  description: string
  metaItems: string[]
  features: string[]
  featuresTitle: string
  sharedNote: string
  fromLabel: string
  priceValue: string
  perNight: string
  ctaLabel: string
  galleryLabels: RoomGalleryLabels
}

export function RoomFeature({
  room,
  lng,
  name,
  description,
  metaItems,
  features,
  featuresTitle,
  sharedNote,
  fromLabel,
  priceValue,
  perNight,
  ctaLabel,
  galleryLabels,
}: RoomFeatureProps) {
  const accentStyle = { '--room-accent': room.accent } as CSSProperties
  const TimeIcon = ROOM_TIME_ICON[room.slug] ?? ROOM_TIME_ICON_FALLBACK

  return (
    <article className={styles.room} style={accentStyle}>
      <header className={styles.head}>
        <h3 className={styles.name}>
          <span className={styles.timeIcon} aria-hidden="true">
            <Icon icon={TimeIcon} size={28} />
          </span>
          {name}
        </h3>
        <ul className={styles.meta}>
          {metaItems.map((item) => (
            <li key={item} className={styles.metaItem}>
              {item}
            </li>
          ))}
        </ul>
      </header>

      <RoomGallery images={room.images} alt={name} labels={galleryLabels} />

      <div className={styles.body}>
        <div className={styles.textCol}>
          <p className={styles.desc}>{description}</p>
          <p className={styles.price}>
            <span className={styles.from}>{fromLabel}</span>
            <span className={styles.priceValue}>{priceValue}</span>
            <span className={styles.perNight}>{perNight}</span>
          </p>
          <Button href={`/reservations?room=${room.slug}`} lng={lng} variant="solid" className={styles.cta}>
            {ctaLabel}
            <Icon icon={IconArrowRight} size={18} />
          </Button>
        </div>

        <div className={styles.featuresCol}>
          <h4 className={styles.featuresTitle}>{featuresTitle}</h4>
          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature} className={styles.feature}>
                {feature}
              </li>
            ))}
          </ul>
          <p className={styles.sharedNote}>{sharedNote}</p>
        </div>
      </div>
    </article>
  )
}
