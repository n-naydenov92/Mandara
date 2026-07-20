import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BookingWidget } from '@/components/booking/BookingWidget/BookingWidget'
import { isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'

// Placeholder — потребителят ще смени с истинска hero снимка на басейна/вилата.
const HERO_IMAGE = '/images/about/za-vilata-banner.webp'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  return buildPageMetadata(lng, 'reservations', '/reservations')
}

export default async function ReservationsPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const { t } = await getTranslation(lng, 'booking')

  return (
    <>
      <PageHero
        image={HERO_IMAGE}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        scrollLabel={t('hero.scroll')}
        kenBurns
      />
      <Section tone="cream">
        <Container>
          <BookingWidget prefillMessage={t('prefill.villa')} />
        </Container>
      </Section>
    </>
  )
}
