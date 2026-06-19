import type { CSSProperties } from 'react'
import Image from 'next/image'
import { IconLeaf, IconLeaf2, IconPlant, IconPlant2 } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import type { Room } from '@/lib/content/rooms'
import type { Season } from '@/lib/content/seasons'
import styles from './RoomCard.module.css'

interface RoomCardProps {
  room: Room
  name: string
  description: string
  season: Season
}

const SEASON_ICON = {
  spring: IconPlant2,
  summer: IconLeaf,
  autumn: IconLeaf2,
  winter: IconPlant,
} as const

export function RoomCard({ room, name, description, season }: RoomCardProps) {
  const HerbIcon = SEASON_ICON[season]
  const cardStyle = { '--room-accent': room.accent } as CSSProperties

  return (
    <article className={styles.card} style={cardStyle}>
      <div className={styles.media}>
        <Image
          src={room.image}
          alt={name}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={styles.img}
        />
        <span className={styles.herb}>
          <Icon icon={HerbIcon} size={20} />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.names}>
          <span className={styles.dot} aria-hidden="true" />
          <h3 className={styles.name}>{name}</h3>
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  )
}
