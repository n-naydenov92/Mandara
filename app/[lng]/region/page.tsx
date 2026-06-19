import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'
import { RegionHero } from '@/components/region/RegionHero/RegionHero'
import { RegionIntro } from '@/components/region/RegionIntro/RegionIntro'
import { RegionBlock } from '@/components/region/RegionBlock/RegionBlock'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'
import { REGION_BLOCKS } from '@/lib/content/region'

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
      <RegionIntro lng={lng} />
      {REGION_BLOCKS.map((block) => (
        <RegionBlock
          key={block.key}
          lng={lng}
          blockKey={block.key}
          src={block.src}
          tone={block.reversed ? 'ivory' : 'transparent'}
          reversed={block.reversed}
        />
      ))}
      <CtaBand lng={lng} />
    </>
  )
}
