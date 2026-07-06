'use client'

import { useRef, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BOOKING_MODES, type BookingMode } from '@/lib/booking/modes'
import { headlinePrice } from '@/lib/booking/quote'
import { formatPrice } from '@/lib/content/pricing'
import styles from './ModeTabs.module.css'

interface ModeTabsProps {
  active: BookingMode
  onChange: (mode: BookingMode) => void
}

export function ModeTabs({ active, onChange }: ModeTabsProps) {
  const { t } = useTranslation('booking')
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const moveTo = (index: number) => {
    const count = BOOKING_MODES.length
    const next = (index + count) % count
    const mode = BOOKING_MODES[next]
    if (!mode) {
      return
    }
    onChange(mode.id)
    refs.current[next]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveTo(index - 1)
    }
  }

  return (
    <div className={styles.tabs} role="tablist" aria-label={t('modes.label')}>
      {BOOKING_MODES.map((mode, index) => {
        const selected = mode.id === active
        return (
          <button
            key={mode.id}
            ref={(element) => {
              refs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`mode-tab-${mode.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={selected ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onChange(mode.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span className={styles.name}>{t(`modes.${mode.id}.tab`)}</span>
            <span className={styles.price}>
              {t(`modes.${mode.id}.price`, { price: formatPrice(headlinePrice(mode.id)) })}
            </span>
          </button>
        )
      })}
    </div>
  )
}
