'use client'

import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SITE } from '@/lib/config/site'
import styles from './InquiryForm.module.css'

interface InquiryFormProps {
  defaultMessage?: string
}

export function InquiryForm({ defaultMessage = '' }: InquiryFormProps) {
  const { t } = useTranslation('booking')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (key: string) => String(data.get(key) ?? '')

    const subject = `${t('title')} — ${get('name')}`
    const body = [
      `${t('form.name')}: ${get('name')}`,
      `${t('form.email')}: ${get('email')}`,
      `${t('form.phone')}: ${get('phone')}`,
      `${t('form.dates')}: ${get('dates')}`,
      `${t('form.guests')}: ${get('guests')}`,
      '',
      get('message'),
    ].join('\n')

    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

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
          <input className={styles.input} type="text" name="guests" inputMode="numeric" />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{t('form.dates')}</span>
        <input className={styles.input} type="text" name="dates" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{t('form.message')}</span>
        <textarea className={styles.textarea} name="message" rows={4} defaultValue={defaultMessage} />
      </label>

      <button type="submit" className={styles.submit}>
        {t('form.submit')}
      </button>
    </form>
  )
}
