import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n/settings'

export interface NavItem {
  href: string
  labelKey: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/accommodation', labelKey: 'accommodation' },
  { href: '/reservations', labelKey: 'reservations' },
  { href: '/about', labelKey: 'about' },
  { href: '/experience', labelKey: 'experience' },
  { href: '/gallery', labelKey: 'gallery' },
  { href: '/region', labelKey: 'region' },
  { href: '/five-star-services', labelKey: 'services' },
] as const

export function buildLocalePath(lng: Locale, href: string): string {
  if (lng === DEFAULT_LOCALE) {
    return href
  }
  if (href === '/') {
    return `/${lng}`
  }
  return `/${lng}${href}`
}

export function stripLocale(pathname: string): { lng: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
    const rest = `/${segments.slice(1).join('/')}`
    return { lng: first, path: rest === '/' ? '/' : rest }
  }
  return { lng: DEFAULT_LOCALE, path: pathname || '/' }
}
