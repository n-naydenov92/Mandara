import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fontDisplay, fontUi, fontScript } from '@/lib/fonts'
import { LOCALES, NAMESPACES, isLocale, type Locale } from '@/lib/i18n/settings'
import { getResources, getTranslation } from '@/lib/i18n/server'
import { TranslationsProvider } from '@/lib/i18n/TranslationsProvider'
import { SmoothScroll } from '@/components/motion/SmoothScroll/SmoothScroll'
import { DayCycleBackground } from '@/components/motion/DayCycleBackground/DayCycleBackground'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { NAV_ITEMS } from '@/lib/routing/paths'
import { SITE } from '@/lib/config/site'
import '@/styles/globals.css'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ lng: string }>
}

export function generateStaticParams() {
  return LOCALES.map((lng) => ({ lng }))
}

export async function generateMetadata(): Promise<Metadata> {
  return { metadataBase: new URL(SITE.url) }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const namespaces = [...NAMESPACES]
  const resources = await getResources(lng, namespaces)
  const { t } = await getTranslation(lng, 'common')
  const fontVariables = `${fontDisplay.variable} ${fontUi.variable} ${fontScript.variable}`

  const otherLng: Locale = lng === 'bg' ? 'en' : 'bg'
  const { i18n: i18nOther } = await getTranslation(otherLng, 'nav')
  const tOther = i18nOther.getFixedT(otherLng, 'nav')
  const secondaryNav: Record<string, string> = {}
  for (const item of NAV_ITEMS) {
    secondaryNav[item.labelKey] = tOther(item.labelKey)
  }

  return (
    <html lang={lng} className={fontVariables}>
      <body>
        <DayCycleBackground />
        <TranslationsProvider lng={lng} namespaces={namespaces} resources={resources}>
          <a href="#main" className="skip-link">
            {t('skipToContent')}
          </a>
          <SmoothScroll>
            <Header lng={lng} secondaryNav={secondaryNav} />
            <main id="main">{children}</main>
            <Footer lng={lng} />
          </SmoothScroll>
        </TranslationsProvider>
      </body>
    </html>
  )
}
