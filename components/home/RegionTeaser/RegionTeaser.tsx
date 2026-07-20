'use client'

import { useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { IconArrowLeft, IconArrowRight, IconClock, IconMapPin } from '@tabler/icons-react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { CornerBranches } from '@/components/motion/CornerBranches/CornerBranches'
import { REGION_KEYS, REGION_DESTINATIONS } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n/settings'
import styles from './RegionTeaser.module.css'

interface RegionTeaserProps {
  lng: Locale
}

const ICON_SIZE = 16
const META_ICON_SIZE = 18
const NAV_ICON_SIZE = 20
const COUNTER_PAD = 2

function wrapIndex(index: number, count: number): number {
  return (index + count) % count
}

function formatCounter(value: number): string {
  return String(value).padStart(COUNTER_PAD, '0')
}

export function RegionTeaser({ lng }: RegionTeaserProps) {
  const { t } = useTranslation('home')
  const count = REGION_KEYS.length
  const [active, setActive] = useState(0)

  const handlePrev = () => setActive((index) => wrapIndex(index - 1, count))
  const handleNext = () => setActive((index) => wrapIndex(index + 1, count))

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      handlePrev()
    } else if (event.key === 'ArrowRight') {
      handleNext()
    }
  }

  return (
    <section id="region" className={styles.section} aria-label={t('region.eyebrow')}>
      <CornerBranches tone="dark" corners={['bl']} />
      <div
        className={styles.layout}
        role="group"
        aria-label={t('region.eyebrow')}
        onKeyDown={handleKeyDown}
      >
        <aside className={styles.lead}>
          <Eyebrow>{t('region.eyebrow')}</Eyebrow>
          <p className={styles.place}>{t('region.place')}</p>
          <p className={styles.intro}>{t('region.intro')}</p>
        </aside>

        <div className={styles.titleArea}>
          <div className={styles.titleStack}>
            {REGION_KEYS.map((key, index) => (
              <div className={styles.title} data-active={index === active} key={key}>
                {t(`region.points.${key}.title`)}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imagesRow}>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navPrev}`}
            onClick={handlePrev}
            aria-label={t('region.nav.prev')}
          >
            <Icon icon={IconArrowLeft} size={NAV_ICON_SIZE} />
          </button>
          {REGION_KEYS.map((key, index) => (
            <div className={styles.img} data-active={index === active} key={key}>
              <Image
                src={REGION_DESTINATIONS[key].image}
                alt={t(`region.points.${key}.title`)}
                fill
                sizes="(max-width: 820px) 100vw, 65vw"
                className={styles.imgInner}
                {...(index === 0 ? { priority: true } : { loading: 'lazy' as const })}
              />
              <div className={styles.imgScrim} aria-hidden="true" />
              <ul className={styles.distance}>
                <li className={styles.chip}>
                  <Icon icon={IconClock} size={META_ICON_SIZE} />
                  {REGION_DESTINATIONS[key].timeMin} {t('region.units.min')}
                </li>
                <li className={styles.chip}>
                  <Icon icon={IconMapPin} size={META_ICON_SIZE} />
                  {REGION_DESTINATIONS[key].distanceKm} {t('region.units.km')}
                </li>
              </ul>
            </div>
          ))}
          <button
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={handleNext}
            aria-label={t('region.nav.next')}
          >
            <Icon icon={IconArrowRight} size={NAV_ICON_SIZE} />
          </button>
        </div>

        <div className={styles.bodyArea}>
          {REGION_KEYS.map((key, index) => (
            <div className={styles.body} data-active={index === active} key={key}>
              <span className={styles.meta}>{t(`region.points.${key}.meta`)}</span>
              <p className={styles.bodyText}>{t(`region.points.${key}.body`)}</p>
              <LocaleLink lng={lng} href={REGION_DESTINATIONS[key].href} className={styles.cta}>
                {t('region.cta')}
                <Icon icon={IconArrowRight} size={ICON_SIZE} />
              </LocaleLink>
            </div>
          ))}
        </div>

        <div className={styles.nav}>
          <span className={styles.counter} aria-hidden="true">
            {formatCounter(active + 1)} <span className={styles.counterSep}>—</span>{' '}
            {formatCounter(count)}
          </span>
        </div>
      </div>
    </section>
  )
}
