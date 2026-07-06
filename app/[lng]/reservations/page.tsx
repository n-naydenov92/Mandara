import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BookingWidget } from '@/components/booking/BookingWidget/BookingWidget'
import { ROOMS } from '@/lib/content/rooms'
import { isBookingMode, type BookingMode } from '@/lib/booking/modes'
import { isLocale, type Locale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'

// Placeholder — потребителят ще смени с истинска hero снимка на басейна/вилата.
const HERO_IMAGE = '/images/about/villa.jpg'

interface PageProps {
  params: Promise<{ lng: string }>
  searchParams: Promise<{ subject?: string; room?: string; mode?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  return buildPageMetadata(lng, 'reservations', '/reservations')
}

interface InitialSelection {
  mode: BookingMode
  room?: string
}

// Линкът може да предзададе режим: ?room=<slug> → стая, ?subject|mode=villa|lounger|room.
function resolveInitial(subject?: string, room?: string, mode?: string): InitialSelection {
  if (room && ROOMS.some((entry) => entry.slug === room)) {
    return { mode: 'room', room }
  }
  const candidate = mode ?? subject
  if (candidate && isBookingMode(candidate)) {
    return { mode: candidate }
  }
  return { mode: 'villa' }
}

// Предпопълва съобщението спрямо режима/стаята.
async function resolvePrefill(lng: Locale, selection: InitialSelection): Promise<string> {
  const { t, i18n } = await getTranslation(lng, ['booking', 'rooms'])
  if (selection.mode === 'room' && selection.room) {
    const tRooms = i18n.getFixedT(lng, 'rooms')
    return t('prefill.room', { name: tRooms(`${selection.room}.name`) })
  }
  return t(`prefill.${selection.mode}`)
}

export default async function ReservationsPage({ params, searchParams }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const { subject, room, mode } = await searchParams
  const initial = resolveInitial(subject, room, mode)
  const prefillMessage = await resolvePrefill(lng, initial)
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
          <BookingWidget
            initialMode={initial.mode}
            initialRoom={initial.room}
            prefillMessage={prefillMessage}
          />
        </Container>
      </Section>
    </>
  )
}
