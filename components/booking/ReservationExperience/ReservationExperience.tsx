'use client'

import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AvailabilityCalendar,
  type DateRange,
} from '@/components/booking/AvailabilityCalendar/AvailabilityCalendar'
import { InquiryForm } from '@/components/booking/InquiryForm/InquiryForm'
import { ModeTabs } from '@/components/booking/ModeTabs/ModeTabs'
import { OptionCards } from '@/components/booking/OptionCards/OptionCards'
import { AVAILABILITY_UNIT, modeConfig, type BookingMode } from '@/lib/booking/modes'
import { dayPriceFor, quoteLounger, quoteRoom, quoteVilla, type Quote } from '@/lib/booking/quote'
import { ROOMS } from '@/lib/content/rooms'
import styles from './ReservationExperience.module.css'

interface ReservationExperienceProps {
  initialMode: BookingMode
  initialRoom?: string
  hasCalendar: boolean
  defaultMessage?: string
}

const DEFAULT_QUANTITY = 1

export function ReservationExperience({
  initialMode,
  initialRoom,
  hasCalendar,
  defaultMessage,
}: ReservationExperienceProps) {
  const { t } = useTranslation('booking')
  const { t: tRooms } = useTranslation('rooms')
  const [mode, setMode] = useState<BookingMode>(initialMode)
  const [range, setRange] = useState<DateRange | null>(null)
  const [room, setRoom] = useState<string>(initialRoom ?? ROOMS[0]?.slug ?? '')
  const [quantity, setQuantity] = useState<number>(DEFAULT_QUANTITY)
  const [guests, setGuests] = useState<string>('')

  const config = modeConfig(mode)

  // Смяна към режим с различна единица (нощувки⇄дни) нулира избраните дати.
  const handleModeChange = (next: BookingMode) => {
    if (modeConfig(next).selectionKind !== config.selectionKind) {
      setRange(null)
    }
    setMode(next)
  }

  const quote = useMemo<Quote | null>(() => {
    if (!range) {
      return null
    }
    if (mode === 'villa') {
      return quoteVilla(range.arrival, range.departure)
    }
    if (mode === 'room') {
      return quoteRoom(range.arrival, range.departure)
    }
    return quoteLounger(range.arrival, range.departure, quantity)
  }, [mode, range, quantity])

  const handleRangeChange = useCallback((next: DateRange | null) => setRange(next), [])

  const unitLabel = mode === 'room' ? tRooms(`${room}.name`) : t(`modes.${mode}.tab`)
  const dayPrice = dayPriceFor(mode)

  return (
    <div className={styles.experience}>
      <OptionCards active={mode} onSelect={handleModeChange} />

      <div className={styles.panel}>
        <ModeTabs active={mode} onChange={handleModeChange} />
        <p className={styles.note}>{t(`modes.${mode}.note`)}</p>

        {config.needsRoom && (
          <div className={styles.rooms} role="group" aria-label={t('room.pickLabel')}>
            <span className={styles.roomsLabel}>{t('room.pickLabel')}</span>
            <div className={styles.roomPills}>
              {ROOMS.map((entry) => (
                <button
                  key={entry.slug}
                  type="button"
                  aria-pressed={entry.slug === room}
                  className={entry.slug === room ? `${styles.roomPill} ${styles.roomPillActive}` : styles.roomPill}
                  onClick={() => setRoom(entry.slug)}
                >
                  {tRooms(`${entry.slug}.name`)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.grid}>
          <div className={styles.calendarCol}>
            {hasCalendar ? (
              <AvailabilityCalendar
                key={config.selectionKind}
                availabilityUnit={AVAILABILITY_UNIT}
                selectionKind={config.selectionKind}
                onRangeChange={handleRangeChange}
                dayPrice={dayPrice}
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
              mode={mode}
              unitLabel={unitLabel}
              room={config.needsRoom ? room : undefined}
              guests={guests}
              onGuestsChange={setGuests}
              quantity={quantity}
              onQuantityChange={setQuantity}
              arrival={range?.arrival}
              departure={range?.departure}
              quote={quote}
              showDates={!hasCalendar}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
