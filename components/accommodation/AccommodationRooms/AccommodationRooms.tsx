import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { PartHeader } from '@/components/accommodation/PartHeader/PartHeader'
import { RoomFeature } from '@/components/accommodation/RoomFeature/RoomFeature'
import { ROOMS } from '@/lib/content/rooms'
import { PRICING, formatPrice, lowestRate } from '@/lib/content/pricing'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AccommodationRooms.module.css'

const ROOM_REVEAL_DURATION = 1.5

interface AccommodationRoomsProps {
  lng: Locale
}

export async function AccommodationRooms({ lng }: AccommodationRoomsProps) {
  const { t, i18n } = await getTranslation(lng, ['accommodation', 'rooms', 'about'])
  const tRooms = i18n.getFixedT(lng, 'rooms')
  const tAbout = i18n.getFixedT(lng, 'about')

  const galleryLabels = {
    prev: t('gallery.prev'),
    next: t('gallery.next'),
    open: t('gallery.open'),
  }
  const areaUnit = tAbout('rooms.labels.areaUnit')
  const priceValue = formatPrice(lowestRate(PRICING.perRoom), PRICING.currency)

  return (
    <Section id="rooms" tone="transparent">
      <BotanicalAccent corner="bl" />
      <Container>
        <PartHeader index={t('parts.rooms.index')} label={t('parts.rooms.label')} tag={t('parts.rooms.tag')} />
        <Reveal className={styles.leadWrap}>
          <p className={styles.lead}>{t('rooms.lead')}</p>
        </Reveal>

        <div className={styles.list}>
          {ROOMS.map((room) => {
            const metaItems = [
              t('rooms.beds', { count: room.specs.beds }),
              tAbout(`rooms.detail.${room.slug}.view`),
              `${room.specs.area} ${areaUnit}`,
            ]
            const features = t(`rooms.items.${room.slug}.features`, { returnObjects: true }) as unknown as string[]

            return (
              <Reveal key={room.slug} duration={ROOM_REVEAL_DURATION}>
                <RoomFeature
                  room={room}
                  lng={lng}
                  name={tRooms(`${room.slug}.name`)}
                  description={tRooms(`${room.slug}.description`)}
                  metaItems={metaItems}
                  features={features}
                  featuresTitle={t('rooms.featuresTitle')}
                  sharedNote={t('rooms.sharedNote')}
                  fromLabel={t('pricing.from')}
                  priceValue={priceValue}
                  perNight={t('pricing.perNight')}
                  ctaLabel={t('cta.room')}
                  galleryLabels={galleryLabels}
                />
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
