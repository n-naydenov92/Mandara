import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'
import { RegionHero } from '@/components/region/RegionHero/RegionHero'
import { DestinationsIntro } from '@/components/region/DestinationsIntro/DestinationsIntro'
import { DestinationBlock } from '@/components/region/DestinationBlock/DestinationBlock'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'
import { DESTINATIONS } from '@/lib/content/region'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  const locale = isLocale(lng) ? lng : DEFAULT_LOCALE
  const base = await buildPageMetadata(locale, 'region', '/region')
  const { t } = await getTranslation(locale, 'region')
  return { ...base, title: t('meta.title'), description: t('meta.description') }
}

export default async function RegionPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <RegionHero lng={lng} />
      <DestinationsIntro lng={lng} />
      {DESTINATIONS.map((destination) => (
        <DestinationBlock key={destination.key} lng={lng} destination={destination} />
      ))}
      <CtaBand lng={lng} />
    </>
  )
}
