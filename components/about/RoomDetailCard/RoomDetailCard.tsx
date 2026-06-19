import type { ComponentType, CSSProperties } from 'react'
import Image from 'next/image'
import { IconPlant, IconPlant2, IconLeaf, IconLeaf2, IconFlower, IconSeeding } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import { ROOM_TIME_ICON, ROOM_TIME_ICON_FALLBACK } from '@/lib/content/roomIcons'
import type { Room } from '@/lib/content/rooms'
import styles from './RoomDetailCard.module.css'

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

interface RoomSpecLabels {
  beds: string
  area: string
  areaUnit: string
  view: string
  herb: string
}

interface RoomDetailCardProps {
  room: Room
  name: string
  description: string
  specLabels: RoomSpecLabels
  view: string
  herb: string
}

// Различна билка за всяка стая — за характер и емоция.
const ROOM_HERB_ICON: Record<string, ComponentType<TablerIconProps>> = {
  dawn: IconPlant2,
  sunrise: IconPlant,
  noon: IconLeaf,
  sunset: IconLeaf2,
  dusk: IconFlower,
  night: IconSeeding,
}

function buildSpecs(room: Room, labels: RoomSpecLabels, view: string, herb: string) {
  return [
    { key: 'beds', label: labels.beds, value: String(room.specs.beds) },
    { key: 'area', label: labels.area, value: `${room.specs.area} ${labels.areaUnit}` },
    { key: 'view', label: labels.view, value: view },
    { key: 'herb', label: labels.herb, value: herb },
  ]
}

export function RoomDetailCard({ room, name, description, specLabels, view, herb }: RoomDetailCardProps) {
  const TimeIcon = ROOM_TIME_ICON[room.slug] ?? ROOM_TIME_ICON_FALLBACK
  const HerbIcon = ROOM_HERB_ICON[room.slug] ?? IconLeaf
  const cardStyle = { '--room-accent': room.accent } as CSSProperties
  const specs = buildSpecs(room, specLabels, view, herb)

  return (
    <article className={styles.card} style={cardStyle}>
      <div className={styles.media}>
        <Image src={room.image} alt={name} fill sizes="(max-width: 900px) 100vw, 33vw" className={styles.img} />
        <span className={styles.herb} title={herb}>
          <Icon icon={HerbIcon} size={20} />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.names}>
          <span className={styles.timeIcon} aria-hidden="true">
            <Icon icon={TimeIcon} size={22} />
          </span>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <p className={styles.desc}>{description}</p>
        <dl className={styles.specs}>
          {specs.map((spec) => (
            <div key={spec.key} className={styles.spec}>
              <dt className={styles.specLabel}>{spec.label}</dt>
              <dd className={styles.specValue}>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
