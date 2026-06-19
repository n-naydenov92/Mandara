import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/config/site'
import { NAV_ITEMS } from '@/lib/routing/paths'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '')

  return NAV_ITEMS.map((item) => {
    const bgHref = item.href === '/' ? '/' : item.href
    const enHref = item.href === '/' ? '/en' : `/en${item.href}`
    const bgUrl = `${base}${bgHref}`

    return {
      url: bgUrl,
      alternates: {
        languages: {
          bg: bgUrl,
          en: `${base}${enHref}`,
        },
      },
    }
  })
}
