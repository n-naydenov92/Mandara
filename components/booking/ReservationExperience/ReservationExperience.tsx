'use client'

import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AvailabilityCalendar,
  type DateRange,
} from '@/components/booking/AvailabilityCalendar/AvailabilityCalendar'
import { InquiryForm } from '@/components/booking/InquiryForm/InquiryForm'
import { StayRules } from '@/components/booking/StayRules/StayRules'
import { VILLA_UNIT } from '@/lib/booking/bookingGateway'
import { quoteNights, type Quote } from '@/lib/booking/quote'
import styles from './ReservationExperience.module.css'

interface ReservationExperienceProps {
  hasCalendar: boolean
  defaultMessage?: string
}

// Резервира се само цялата вила — един режим, без избор на стая или шезлонг.
export function ReservationExperience({ hasCalendar, defaultMessage }: ReservationExperienceProps) {
  const { t } = useTranslation('booking')
  const [range, setRange] = useState<DateRange | null>(null)
  const [guests, setGuests] = useState<string>('')

  const quote = useMemo<Quote | null>(() => (range ? quoteNights(range.prices) : null), [range])

  const handleRangeChange = useCallback((next: DateRange | null) => setRange(next), [])

  return (
    <div className={styles.experience}>
      <div className={styles.panel}>
        <p className={styles.note}>{t('modes.villa.note')}</p>

        <div className={styles.grid}>
          <div className={styles.calendarCol}>
            {hasCalendar ? (
              <AvailabilityCalendar
                availabilityUnit={VILLA_UNIT}
                selectionKind="nights"
                onRangeChange={handleRangeChange}
              />
            ) : (
              <div className={styles.notice}>
                <h3 className={styles.noticeTitle}>{t('placeholder.title')}</h3>
                <p className={styles.noticeText}>{t('placeholder.text')}</p>
              </div>
            )}
          </div>

          <div className={styles.formCol}>
            <h2 className={styles.formTitle}>{t('title')}</h2>
            <p className={styles.formSubtitle}>{t('subtitle')}</p>
            <InquiryForm
              defaultMessage={defaultMessage}
              unitLabel={t('modes.villa.tab')}
              guests={guests}
              onGuestsChange={setGuests}
              arrival={range?.arrival}
              departure={range?.departure}
              quote={quote}
              showDates={!hasCalendar}
            />
          </div>
        </div>
      </div>

      <StayRules />
    </div>
  )
}
