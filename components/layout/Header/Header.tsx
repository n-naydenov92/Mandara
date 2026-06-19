'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconLeaf } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher/LocaleSwitcher'
import { OverlayMenu } from '@/components/layout/OverlayMenu/OverlayMenu'
import { HamburgerIcon } from '@/components/layout/OverlayMenu/HamburgerIcon'
import { useStickyHeader } from '@/components/motion/hooks/useStickyHeader'
import type { Locale } from '@/lib/i18n/settings'
import styles from './Header.module.css'

interface HeaderProps {
  lng: Locale
  secondaryNav: Record<string, string>
}

export function Header({ lng, secondaryNav }: HeaderProps) {
  const { t } = useTranslation('common')
  const isStuck = useStickyHeader()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpen = () => setIsMenuOpen(true)
  const handleClose = () => setIsMenuOpen(false)

  const headerClass = [styles.header, isStuck ? styles.stuck : ''].filter(Boolean).join(' ')

  return (
    <>
      <header className={headerClass}>
        <nav className={styles.nav} aria-label={t('menu.label')}>
          <button
            type="button"
            className={styles.menuTrigger}
            onClick={handleOpen}
            aria-expanded={isMenuOpen}
            aria-controls="overlay-menu"
          >
            <HamburgerIcon open={isMenuOpen} />
            <span className={styles.menuLabel}>{t('menu.open')}</span>
          </button>

          <LocaleLink lng={lng} href="/" className={styles.logo} aria-label={t('brandFull')}>
            <span className={styles.logoText}>{t('brand')}</span>
            <Icon icon={IconLeaf} size={16} className={styles.logoHerb} />
          </LocaleLink>

          <div className={styles.right}>
            <LocaleSwitcher lng={lng} />
            <LocaleLink lng={lng} href="/reservations" className={styles.cta}>
              {t('cta.reserve')}
            </LocaleLink>
          </div>
        </nav>
      </header>
      <OverlayMenu
        lng={lng}
        secondaryNav={secondaryNav}
        isOpen={isMenuOpen}
        onClose={handleClose}
      />
    </>
  )
}
