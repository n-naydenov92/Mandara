import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { PartHeader } from '@/components/accommodation/PartHeader/PartHeader'
import { RoomGallery } from '@/components/accommodation/RoomGallery/RoomGallery'
import { VillaOffer } from '@/components/accommodation/VillaOffer/VillaOffer'
import { VILLA_GALLERY } from '@/lib/content/villa'
import type { Locale } from '@/lib/i18n/settings'
import styles from './WholeVillaSection.module.css'

interface WholeVillaSectionProps {
  lng: Locale
}

export async function WholeVillaSection({ lng }: WholeVillaSectionProps) {
  const { t } = await getTranslation(lng, 'accommodation')
  const galleryLabels = {
    prev: t('gallery.prev'),
    next: t('gallery.next'),
    open: t('gallery.open'),
  }

  return (
    <Section id="villa" tone="cream">
      <BotanicalAccent corner="tr" />
      <Container>
        <PartHeader index={t('parts.villa.index')} label={t('parts.villa.label')} tag={t('parts.villa.tag')} />

        <Reveal className={styles.galleryWrap}>
          <RoomGallery images={VILLA_GALLERY} alt={t('villa.title')} labels={galleryLabels} />
        </Reveal>

        <Reveal className={styles.leadWrap}>
          <p className={styles.lead}>{t('villa.lead')}</p>
        </Reveal>

        <Reveal>
          <VillaOffer lng={lng} />
        </Reveal>
      </Container>
    </Section>
  )
}
