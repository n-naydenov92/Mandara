import type { InitOptions } from 'i18next'

export const LOCALES = ['bg', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'bg'

export const NAMESPACES = ['common', 'nav', 'home', 'rooms', 'booking', 'experience', 'gallery', 'services', 'region', 'about', 'accommodation'] as const
export type Namespace = (typeof NAMESPACES)[number]
export const DEFAULT_NAMESPACE: Namespace = 'common'

export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const STICKY_HEADER_OFFSET = 60

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function getI18nextOptions(lng: Locale, ns: Namespace | Namespace[]): InitOptions {
  return {
    lng,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...LOCALES],
    defaultNS: DEFAULT_NAMESPACE,
    fallbackNS: DEFAULT_NAMESPACE,
    ns,
    interpolation: { escapeValue: false },
  }
}
