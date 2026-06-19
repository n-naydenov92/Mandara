import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { Hero } from '@/components/home/Hero/Hero'
import { AboutSplit } from '@/components/home/AboutSplit/AboutSplit'
import { GalleryPreview } from '@/components/home/GalleryPreview/GalleryPreview'
import { RoomsScene } from '@/components/home/RoomsScene/RoomsScene'
import { ExperienceTeaser } from '@/components/home/ExperienceTeaser/ExperienceTeaser'
import { RegionTeaser } from '@/components/home/RegionTeaser/RegionTeaser'
import { ServicesTeaser } from '@/components/home/ServicesTeaser/ServicesTeaser'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'

interface HomePageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lng } = await params
  const locale = isLocale(lng) ? lng : DEFAULT_LOCALE
  const { t } = await getTranslation(locale, 'home')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: locale === DEFAULT_LOCALE ? '/' : `/${locale}`,
      languages: { bg: '/', en: '/en', 'x-default': '/' },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <Hero lng={lng} />
      <AboutSplit lng={lng} />
      <GalleryPreview lng={lng} />
      <RoomsScene lng={lng} />
      <ExperienceTeaser lng={lng} />
      <RegionTeaser lng={lng} />
      <ServicesTeaser lng={lng} />
      <CtaBand lng={lng} />
    </>
  )
}
