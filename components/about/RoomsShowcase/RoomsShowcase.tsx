import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { RevealGroup } from '@/components/motion/RevealGroup/RevealGroup'
import { RoomDetailCard } from '@/components/about/RoomDetailCard/RoomDetailCard'
import { ROOMS } from '@/lib/content/rooms'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RoomsShowcase.module.css'

interface RoomsShowcaseProps {
  lng: Locale
}

export async function RoomsShowcase({ lng }: RoomsShowcaseProps) {
  const { t, i18n } = await getTranslation(lng, ['about', 'rooms'])
  const tRooms = i18n.getFixedT(lng, 'rooms')
  const specLabels = {
    beds: t('rooms.labels.beds'),
    area: t('rooms.labels.area'),
    areaUnit: t('rooms.labels.areaUnit'),
    view: t('rooms.labels.view'),
    herb: t('rooms.labels.herb'),
  }

  return (
    <Section id="rooms" tone="transparent">
      <BotanicalAccent corner="tr" />
      <Container>
        <div className={styles.header}>
          <Eyebrow>{t('rooms.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('rooms.title')}</h2>
          <p className={styles.lead}>{t('rooms.lead')}</p>
        </div>

        <RevealGroup className={styles.grid}>
          {ROOMS.map((room) => (
            <RoomDetailCard
              key={room.slug}
              room={room}
              name={tRooms(`${room.slug}.name`)}
              description={tRooms(`${room.slug}.description`)}
              specLabels={specLabels}
              view={t(`rooms.detail.${room.slug}.view`)}
              herb={t(`rooms.detail.${room.slug}.herb`)}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
