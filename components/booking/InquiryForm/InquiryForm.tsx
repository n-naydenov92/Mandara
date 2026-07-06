'use client'

import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitInquiry } from '@/lib/booking/inquiry'
import type { InquiryInput } from '@/lib/booking/bookingGateway'
import { modeConfig, type BookingMode } from '@/lib/booking/modes'
import type { Quote } from '@/lib/booking/quote'
import { PRICING } from '@/lib/content/pricing'
import { PriceSummary } from '@/components/booking/PriceSummary/PriceSummary'
import styles from './InquiryForm.module.css'

interface InquiryFormProps {
  defaultMessage?: string
  mode: BookingMode
  unitLabel: string // човешко име на режима/обекта за имейла
  room?: string // slug на избраната стая (само режим „стая")
  guests: string
  onGuestsChange: (value: string) => void
  quantity: number
  onQuantityChange: (value: number) => void
  arrival?: string
  departure?: string
  quote: Quote | null
  showDates?: boolean // fallback без календар → текстово поле за дати
}

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error' }

function readContact(form: HTMLFormElement) {
  const data = new FormData(form)
  const get = (key: string) => String(data.get(key) ?? '').trim()
  return {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    message: get('message'),
    dates: get('dates'),
  }
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min
  }
  return Math.min(max, Math.max(min, value))
}

export function InquiryForm({
  defaultMessage = '',
  mode,
  unitLabel,
  room,
  guests,
  onGuestsChange,
  quantity,
  onQuantityChange,
  arrival,
  departure,
  quote,
  showDates = false,
}: InquiryFormProps) {
  const { t } = useTranslation('booking')
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const config = modeConfig(mode)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setState({ status: 'submitting' })
    const contact = readContact(form)
    const input: InquiryInput = {
      ...contact,
      mode,
      unit: unitLabel,
      room: config.needsRoom ? room : undefined,
      guests: config.needsGuests ? guests || undefined : undefined,
      quantity: config.needsQuantity ? String(quantity) : undefined,
      arrival,
      departure,
      total: quote ? String(quote.total) : undefined,
      currency: quote?.currency,
    }
    const result = await submitInquiry(input)
    setState({ status: result.ok ? 'success' : 'error' })
    if (result.ok) {
      form.reset()
    }
  }

  if (state.status === 'success') {
    return (
      <p className={styles.success} role="status" aria-live="polite">
        {t('states.success')}
      </p>
    )
  }

  const submitting = state.status === 'submitting'

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{t('form.name')}</span>
          <input className={styles.input} type="text" name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{t('form.email')}</span>
          <input className={styles.input} type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{t('form.phone')}</span>
          <input className={styles.input} type="tel" name="phone" autoComplete="tel" />
        </label>

        {config.needsGuests && (
          <label className={styles.field}>
            <span className={styles.label}>{t('form.guests')}</span>
            <input
              className={styles.input}
              type="number"
              name="guests"
              min={1}
              max={PRICING.capacity}
              value={guests}
              onChange={(event) => onGuestsChange(event.target.value)}
            />
          </label>
        )}

        {config.needsQuantity && (
          <label className={styles.field}>
            <span className={styles.label}>{t('form.loungers')}</span>
            <input
              className={styles.input}
              type="number"
              name="quantity"
              min={1}
              max={PRICING.loungerMax}
              value={quantity}
              onChange={(event) => onQuantityChange(clamp(Number(event.target.value), 1, PRICING.loungerMax))}
            />
          </label>
        )}
      </div>

      {showDates && (
        <label className={styles.field}>
          <span className={styles.label}>{t('form.dates')}</span>
          <input className={styles.input} type="text" name="dates" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>{t('form.message')}</span>
        <textarea className={styles.textarea} name="message" rows={4} defaultValue={defaultMessage} />
      </label>

      <PriceSummary quote={quote} />

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? t('states.submitting') : t('form.submit')}
      </button>

      {state.status === 'error' && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {t('states.error')}
        </p>
      )}
    </form>
  )
}
