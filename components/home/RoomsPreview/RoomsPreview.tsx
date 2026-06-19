import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { RevealGroup } from '@/components/motion/RevealGroup/RevealGroup'
import { RoomCard } from '@/components/home/RoomCard/RoomCard'
import { ROOMS } from '@/lib/content/rooms'
import { getCurrentSeason } from '@/lib/content/seasons'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RoomsPreview.module.css'

interface RoomsPreviewProps {
  lng: Locale
}

export async function RoomsPreview({ lng }: RoomsPreviewProps) {
  const { t, i18n } = await getTranslation(lng, ['home', 'rooms'])
  const tRooms = i18n.getFixedT(lng, 'rooms')
  const season = getCurrentSeason()

  return (
    <Section id="rooms" tone="transparent">
      <BotanicalAccent corner="bl" />
      <Container>
        <div className={styles.header}>
          <Eyebrow>{t('rooms.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('rooms.title')}</h2>
          <p className={styles.subtitle}>{t('rooms.subtitle')}</p>
        </div>

        <RevealGroup className={styles.grid}>
          {ROOMS.map((room) => (
            <RoomCard
              key={room.slug}
              room={room}
              name={tRooms(`${room.slug}.name`)}
              description={tRooms(`${room.slug}.description`)}
              season={season}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
