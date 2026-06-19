import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicesHero } from '@/components/services/ServicesHero/ServicesHero'
import { ServicesShowcase } from '@/components/services/ServicesShowcase/ServicesShowcase'
import { CtaBand } from '@/components/home/CtaBand/CtaBand'
import { isLocale } from '@/lib/i18n/settings'
import { buildPageMetadata } from '@/lib/routing/metadata'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  return buildPageMetadata(lng, 'services', '/five-star-services')
}

export default async function FiveStarServicesPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  return (
    <>
      <ServicesHero lng={lng} />
      <ServicesShowcase lng={lng} />
      <CtaBand lng={lng} />
    </>
  )
}
