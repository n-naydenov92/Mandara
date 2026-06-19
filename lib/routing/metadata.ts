import type { Metadata } from 'next'
import { getTranslation } from '@/lib/i18n/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import { buildLocalePath } from './paths'

export async function buildPageMetadata(
  lngRaw: string,
  navKey: string,
  href: string,
): Promise<Metadata> {
  const lng = isLocale(lngRaw) ? lngRaw : DEFAULT_LOCALE
  const { i18n } = await getTranslation(lng, 'nav')
  const title = i18n.getFixedT(lng, 'nav')(navKey)

  return {
    title,
    alternates: {
      canonical: buildLocalePath(lng, href),
      languages: {
        bg: href,
        en: buildLocalePath('en', href),
        'x-default': href,
      },
    },
  }
}
