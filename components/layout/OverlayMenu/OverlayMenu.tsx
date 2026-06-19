'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { IconLeaf } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { useScrollLock } from '@/components/motion/hooks/useScrollLock'
import { useLenis } from '@/components/motion/SmoothScroll/SmoothScroll'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import { NAV_ITEMS } from '@/lib/routing/paths'
import { SITE } from '@/lib/config/site'
import type { Locale } from '@/lib/i18n/settings'
import styles from './OverlayMenu.module.css'

interface OverlayMenuProps {
  lng: Locale
  secondaryNav: Record<string, string>
  isOpen: boolean
  onClose: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

export function OverlayMenu({ lng, secondaryNav, isOpen, onClose }: OverlayMenuProps) {
  const { t } = useTranslation('nav')
  const { t: tCommon } = useTranslation('common')
  const reduced = useReducedMotionSafe()
  const lenis = useLenis()
  const panelRef = useRef<HTMLDivElement>(null)

  useScrollLock(isOpen)

  useEffect(() => {
    if (!lenis) {
      return
    }
    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => {
      lenis.start()
    }
  }, [isOpen, lenis])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    panelRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  const panelTransition = reduced ? { duration: 0 } : { duration: 0.55, ease: EASE }

  const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.15 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: reduced ? 0 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: reduced ? 0 : 0.5, ease: EASE } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            aria-hidden="true"
          />
          <motion.div
            id="overlay-menu"
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={tCommon('menu.label')}
            tabIndex={-1}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={panelTransition}
          >
            <div className={styles.head}>
              <span className={styles.logo}>{tCommon('brand')}</span>
              <button type="button" className={styles.close} onClick={onClose}>
                {tCommon('menu.close')}
              </button>
            </div>

            <nav className={styles.body} aria-label={tCommon('menu.label')} data-lenis-prevent>
              <motion.ul
                className={styles.links}
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <LocaleLink
                      lng={lng}
                      href={item.href}
                      className={styles.link}
                      onClick={onClose}
                    >
                      <span className={styles.linkPrimary}>{t(item.labelKey)}</span>
                      <span className={styles.linkSecondary}>{secondaryNav[item.labelKey]}</span>
                    </LocaleLink>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <div className={styles.bottom}>
              <div className={styles.bottomText}>
                <p className={styles.tagline}>{tCommon('tagline')}</p>
                <a
                  className={styles.handle}
                  href={SITE.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE.social.instagramHandle}
                </a>
              </div>
              <Icon icon={IconLeaf} size={32} className={styles.herb} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
