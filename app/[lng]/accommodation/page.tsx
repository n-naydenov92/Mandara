import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'
import { AccommodationHero } from '@/components/accommodation/AccommodationHero/AccommodationHero'
import { StayOptions } from '@/components/accommodation/StayOptions/StayOptions'
import { WholeVillaSection } from '@/components/accommodation/WholeVillaSection/WholeVillaSection'
import { AccommodationRooms } from '@/components/accommodation/AccommodationRooms/AccommodationRooms'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  const locale = isLocale(lng) ? lng : DEFAULT_LOCALE
  const base = await buildPageMetadata(locale, 'accommodation', '/accommodation')
  const { t } = await getTranslation(locale, 'accommodation')
  return { ...base, title: t('meta.title'), description: t('meta.description') }
}

export default async function AccommodationPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <AccommodationHero lng={lng} />
      <StayOptions lng={lng} />
      <WholeVillaSection lng={lng} />
      <AccommodationRooms lng={lng} />
      <CtaBand lng={lng} />
    </>
  )
}
