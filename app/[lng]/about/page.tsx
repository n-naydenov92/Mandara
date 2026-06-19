import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'
import { AboutHero } from '@/components/about/AboutHero/AboutHero'
import { AboutIntro } from '@/components/about/AboutIntro/AboutIntro'
import { AboutBlock } from '@/components/about/AboutBlock/AboutBlock'
import { RoomsShowcase } from '@/components/about/RoomsShowcase/RoomsShowcase'
import { AmenitiesGrid } from '@/components/about/AmenitiesGrid/AmenitiesGrid'
import { LocationBlock } from '@/components/about/LocationBlock/LocationBlock'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'
import { ABOUT_BLOCKS } from '@/lib/content/about'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  const locale = isLocale(lng) ? lng : DEFAULT_LOCALE
  const base = await buildPageMetadata(locale, 'about', '/about')
  const { t } = await getTranslation(locale, 'about')
  return { ...base, title: t('meta.title'), description: t('meta.description') }
}

export default async function AboutPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <AboutHero lng={lng} />
      <AboutIntro lng={lng} />
      {ABOUT_BLOCKS.map((block) => (
        <AboutBlock
          key={block.key}
          lng={lng}
          blockKey={block.key}
          src={block.src}
          tone={block.reversed ? 'ivory' : 'transparent'}
          reversed={block.reversed}
        />
      ))}
      <RoomsShowcase lng={lng} />
      <AmenitiesGrid lng={lng} />
      <LocationBlock lng={lng} />
      <CtaBand lng={lng} />
    </>
  )
}
