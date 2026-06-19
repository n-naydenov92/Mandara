import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { StubPage } from '@/components/layout/StubPage/StubPage'
import { BookingWidget } from '@/components/booking/BookingWidget/BookingWidget'
import { ROOMS } from '@/lib/content/rooms'
import { isLocale, type Locale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'

interface PageProps {
  params: Promise<{ lng: string }>
  searchParams: Promise<{ subject?: string; room?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  return buildPageMetadata(lng, 'reservations', '/reservations')
}

// Предпопълва съобщението спрямо контекста от линка (вила или конкретна стая).
async function resolvePrefill(lng: Locale, subject?: string, room?: string): Promise<string> {
  if (subject === 'villa') {
    const { t } = await getTranslation(lng, 'booking')
    return t('prefill.villa')
  }
  if (room && ROOMS.some((entry) => entry.slug === room)) {
    const { t, i18n } = await getTranslation(lng, ['booking', 'rooms'])
    const tRooms = i18n.getFixedT(lng, 'rooms')
    return t('prefill.room', { name: tRooms(`${room}.name`) })
  }
  return ''
}

export default async function ReservationsPage({ params, searchParams }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const { subject, room } = await searchParams
  const prefillMessage = await resolvePrefill(lng, subject, room)

  return (
    <StubPage lng={lng} navKey="reservations">
      <BookingWidget lng={lng} prefillMessage={prefillMessage} />
    </StubPage>
  )
}
