'use client'

import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitInquiry } from '@/lib/booking/inquiry'
import type { InquiryInput } from '@/lib/booking/bookingGateway'
import type { Quote } from '@/lib/booking/quote'
import { PRICING, formatPrice } from '@/lib/content/pricing'
import { SITE } from '@/lib/config/site'
import { PriceSummary } from '@/components/booking/PriceSummary/PriceSummary'
import styles from './InquiryForm.module.css'

interface InquiryFormProps {
  defaultMessage?: string
  unitLabel: string // човешко име на обекта за имейла (цялата вила)
  guests: string
  onGuestsChange: (value: string) => void
  arrival?: string
  departure?: string
  quote: Quote | null
  showDates?: boolean // fallback без календар → текстово поле за дати
}

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

type ContactInfo = ReturnType<typeof readContact>

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; contact: ContactInfo }

function formatDate(iso: string, locale: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface SummaryRowProps {
  label: string
  value: string
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className={styles.summaryRow}>
      <dt className={styles.summaryKey}>{label}</dt>
      <dd className={styles.summaryValue}>{value}</dd>
    </div>
  )
}

export function InquiryForm({
  defaultMessage = '',
  unitLabel,
  guests,
  onGuestsChange,
  arrival,
  departure,
  quote,
  showDates = false,
}: InquiryFormProps) {
  const { t, i18n } = useTranslation('booking')
  const [state, setState] = useState<FormState>({ status: 'idle' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const contact = readContact(event.currentTarget)
    setState({ status: 'submitting' })
    const input: InquiryInput = {
      ...contact,
      mode: 'villa',
      unit: unitLabel,
      guests: guests || undefined,
      arrival,
      departure,
      total: quote ? String(quote.total) : undefined,
      currency: quote?.currency,
    }
    // Детайлите отиват при собственика (ако формата е настроена). Резервацията се
    // потвърждава с депозита на следващия екран, затова показваме обобщението независимо.
    await submitInquiry(input)
    setState({ status: 'success', contact })
  }

  if (state.status === 'success') {
    const { contact } = state
    const depositUrl = SITE.payments.stripeDepositUrl
    const depositAmount = formatPrice(PRICING.deposit)
    const dateLabel =
      arrival && departure
        ? `${formatDate(arrival, i18n.language)} – ${formatDate(departure, i18n.language)}`
        : contact.dates || '—'

    return (
      <div className={styles.summaryCard} role="status" aria-live="polite">
        <div className={styles.summaryHead}>
          <h3 className={styles.summaryTitle}>{t('summary.title')}</h3>
          <p className={styles.summaryIntro}>{t('summary.intro')}</p>
        </div>

        <dl className={styles.summaryList}>
          <SummaryRow label={t('summary.unit')} value={unitLabel} />
          <SummaryRow label={t('summary.dates')} value={dateLabel} />
          {guests && <SummaryRow label={t('summary.guests')} value={guests} />}
          <SummaryRow label={t('summary.name')} value={contact.name} />
          <SummaryRow label={t('summary.email')} value={contact.email} />
          {contact.phone && <SummaryRow label={t('summary.phone')} value={contact.phone} />}
        </dl>

        {quote && quote.total > 0 && (
          <div className={styles.priceBlock}>
            {quote.lines.map((line) => (
              <div key={line.labelKey} className={styles.priceLine}>
                <span>{t(line.labelKey, line.labelParams)}</span>
                <span>{formatPrice(line.amount, quote.currency)}</span>
              </div>
            ))}
            <div className={styles.priceTotal}>
              <span>{t('price.total')}</span>
              <span>{formatPrice(quote.total, quote.currency)}</span>
            </div>
          </div>
        )}

        <div className={styles.depositBlock}>
          <div className={styles.depositHeadRow}>
            <span className={styles.depositLabel}>{t('deposit.now')}</span>
            <span className={styles.depositAmount}>{depositAmount}</span>
          </div>
          <p className={styles.depositNote}>{t('deposit.note')}</p>
          {depositUrl && (
            <a className={styles.depositButton} href={depositUrl}>
              {t('deposit.pay', { amount: depositAmount })}
            </a>
          )}
          <p className={styles.depositSafe}>{t('deposit.safe')}</p>
        </div>
      </div>
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
    </form>
  )
}
