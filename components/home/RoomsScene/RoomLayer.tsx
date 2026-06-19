import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import type { Room } from '@/lib/content/rooms'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RoomsScene.module.css'

interface RoomLayerProps {
  room: Room
  lng: Locale
  name: string
  description: string
  cta: string
  index: number
  total: number
  isFirst: boolean
  isActive: boolean
}

const LABEL_PAD = 2
const ICON_SIZE = 16

// Само първата снимка е priority; останалите се зареждат eager, за да са
// декодирани преди hard cut-а (visibility:hidden ги държи в композитора).
function loadProps(isFirst: boolean) {
  return isFirst ? { priority: true } : { loading: 'eager' as const }
}

export function RoomLayer({
  room,
  lng,
  name,
  description,
  cta,
  index,
  total,
  isFirst,
  isActive,
}: RoomLayerProps) {
  const slideClass = isActive ? `${styles.slide} ${styles.isActive}` : styles.slide
  const label = `${String(index + 1).padStart(LABEL_PAD, '0')} / ${String(total).padStart(LABEL_PAD, '0')}`

  return (
    <article className={slideClass} data-index={index}>
      <div className={styles.bg}>
        <Image src={room.image} alt={name} fill sizes="100vw" className={styles.img} {...loadProps(isFirst)} />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.card}>
        <span className={styles.index}>{label}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>
        <LocaleLink lng={lng} href="/accommodation" className={styles.cta}>
          {cta}
          <Icon icon={IconArrowRight} size={ICON_SIZE} />
        </LocaleLink>
      </div>
    </article>
  )
}
