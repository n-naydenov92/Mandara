'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react'
import { CornerBranches } from '@/components/motion/CornerBranches/CornerBranches'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'
import { HOME_HERO_IMAGE } from '@/lib/content/home'
import { SITE } from '@/lib/config/site'
import type { Locale } from '@/lib/i18n/settings'
import styles from './Hero.module.css'

interface HeroProps {
  lng: Locale
}

const EASE = [0.22, 1, 0.36, 1] as const
// Между overlay-а (z:1) и съдържанието (z:3).
const BRANCHES_Z_INDEX = 2

export function Hero({ lng }: HeroProps) {
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')
  const reduced = useReducedMotionSafe()

  const contentMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.3, delay: 0.2, ease: EASE },
      }

  return (
    <section className={styles.hero} id="home">
      <Image src={HOME_HERO_IMAGE} alt="" fill priority sizes="100vw" className={styles.image} />
      <div className={styles.overlay} />
      <CornerBranches tone="light" parallax zIndex={BRANCHES_Z_INDEX} />

      <motion.div className={styles.content} {...contentMotion}>
        <span className={styles.eyebrow}>{t('hero.eyebrow')}</span>
        <h1 className={styles.title}>
          {t('hero.titleLine1')}
          <br />
          <em>{t('hero.titleLine2')}</em>
        </h1>
        <LocaleLink lng={lng} href="/reservations" className={styles.cta}>
          {t('hero.cta')}
          <Icon icon={IconArrowRight} size={18} />
        </LocaleLink>
      </motion.div>

      <span className={styles.location}>{tCommon('location')}</span>
      <div className={styles.scroll}>
        <span className={styles.scrollLabel}>{tCommon('scroll')}</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </div>
      <div className={styles.social}>
        <a href={SITE.social.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Icon icon={IconBrandInstagram} size={20} />
        </a>
        <a href={SITE.social.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Icon icon={IconBrandFacebook} size={20} />
        </a>
      </div>
    </section>
  )
}
