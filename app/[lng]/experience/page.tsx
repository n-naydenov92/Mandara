import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'
import { ExperienceHero } from '@/components/experience/ExperienceHero/ExperienceHero'
import { ExperienceBlock } from '@/components/experience/ExperienceBlock/ExperienceBlock'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  const locale = isLocale(lng) ? lng : DEFAULT_LOCALE
  const base = await buildPageMetadata(locale, 'experience', '/experience')
  const { t } = await getTranslation(locale, 'experience')
  return { ...base, title: t('meta.title'), description: t('meta.description') }
}

export default async function ExperiencePage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <ExperienceHero lng={lng} />
      <ExperienceBlock lng={lng} themeKey="gastronomy" tone="transparent" />
      <ExperienceBlock lng={lng} themeKey="wellness" tone="ivory" reversed />
      <ExperienceBlock lng={lng} themeKey="nature" tone="transparent" />
      <ExperienceBlock lng={lng} themeKey="events" tone="ivory" reversed />
      <CtaBand lng={lng} />
    </>
  )
}
