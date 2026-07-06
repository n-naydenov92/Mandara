'use client'

import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/lib/content/pricing'
import type { Quote } from '@/lib/booking/quote'
import styles from './PriceSummary.module.css'

interface PriceSummaryProps {
  quote: Quote | null
}

export function PriceSummary({ quote }: PriceSummaryProps) {
  const { t } = useTranslation('booking')

  if (!quote || quote.total <= 0) {
    return <p className={styles.empty}>{t('price.empty')}</p>
  }

  return (
    <div className={styles.card} aria-live="polite">
      <span className={styles.title}>{t('price.title')}</span>
      <ul className={styles.lines}>
        {quote.lines.map((line) => (
          <li key={line.labelKey} className={styles.line}>
            <span>{t(line.labelKey, line.labelParams)}</span>
            <span>{formatPrice(line.amount, quote.currency)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>{t('price.total')}</span>
        <span className={styles.totalvalue}>{formatPrice(quote.total, quote.currency)}</span>
      </div>
      <p className={styles.disclaimer}>{t('price.disclaimer')}</p>
    </div>
  )
}
