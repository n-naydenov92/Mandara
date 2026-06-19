'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { LOCALES, type Locale } from '@/lib/i18n/settings'
import { buildLocalePath, stripLocale } from '@/lib/routing/paths'
import styles from './LocaleSwitcher.module.css'

interface LocaleSwitcherProps {
  lng: Locale
}

export function LocaleSwitcher({ lng }: LocaleSwitcherProps) {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const { path } = stripLocale(pathname)

  return (
    <div className={styles.switcher}>
      {LOCALES.map((locale, index) => {
        const isActive = locale === lng
        return (
          <Fragment key={locale}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
            )}
            <Link
              href={buildLocalePath(locale, path)}
              hrefLang={locale}
              aria-current={isActive ? 'true' : undefined}
              className={isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              {t(`language.${locale}`)}
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}
