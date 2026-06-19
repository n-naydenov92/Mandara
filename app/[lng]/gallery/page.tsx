import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GalleryView } from '@/components/gallery/GalleryView/GalleryView'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { getTranslation } from '@/lib/i18n/server'
import { isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'

interface PageProps {
  params: Promise<{ lng: string }>
}

const HERO_IMAGE = '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  return buildPageMetadata(lng, 'gallery', '/gallery')
}

export default async function GalleryPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const { t } = await getTranslation(lng, 'gallery')

  return (
    <>
      <PageHero
        image={HERO_IMAGE}
        eyebrow={t('eyebrow')}
        title={t('title')}
        scrollLabel={t('scroll')}
      />
      <Section tone="cream">
        <Container>
          <GalleryView />
        </Container>
      </Section>
    </>
  )
}
