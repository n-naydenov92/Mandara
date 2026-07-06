'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BOOKING_MODES, type BookingMode } from '@/lib/booking/modes'
import { headlinePrice } from '@/lib/booking/quote'
import { formatPrice } from '@/lib/content/pricing'
import styles from './OptionCards.module.css'

interface OptionCardsProps {
  active: BookingMode
  onSelect: (mode: BookingMode) => void
}

export function OptionCards({ active, onSelect }: OptionCardsProps) {
  const { t } = useTranslation('booking')

  return (
    <div className={styles.grid}>
      {BOOKING_MODES.map((mode) => {
        const selected = mode.id === active
        return (
          <button
            key={mode.id}
            type="button"
            aria-pressed={selected}
            className={selected ? `${styles.card} ${styles.cardActive}` : styles.card}
            onClick={() => onSelect(mode.id)}
          >
            <span className={styles.media}>
              <Image
                src={mode.image}
                alt=""
                fill
                sizes="(max-width: 820px) 100vw, 33vw"
                className={styles.image}
              />
            </span>
            <span className={styles.body}>
              <span className={styles.name}>{t(`modes.${mode.id}.tab`)}</span>
              <span className={styles.desc}>{t(`modes.${mode.id}.desc`)}</span>
              <span className={styles.price}>
                {t(`modes.${mode.id}.price`, { price: formatPrice(headlinePrice(mode.id)) })}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
