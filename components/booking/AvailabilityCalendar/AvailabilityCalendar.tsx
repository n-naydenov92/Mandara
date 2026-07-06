'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import { formatPrice } from '@/lib/content/pricing'
import type { DayAvailability } from '@/lib/booking/bookingGateway'
import {
  addMonths,
  daysInRange,
  endOfMonth,
  isSameMonth,
  monthMatrix,
  nightsInRange,
  startOfMonth,
  toISO,
} from './calendarUtils'
import styles from './AvailabilityCalendar.module.css'

export interface DateRange {
  arrival: string
  departure: string
}

// Нощувки (вила/стая) или дни (шезлонг) — определя поведението на избора.
export type SelectionKind = 'nights' | 'days'

interface AvailabilityCalendarProps {
  availabilityUnit: string // обектът, чиято наличност четем (винаги вилата за v1)
  selectionKind: SelectionKind
  onRangeChange: (range: DateRange | null) => void
  dayPrice?: (iso: string) => number | null // цена в клетката (само за вила); иначе скрита
}

type Phase = 'loading' | 'loaded' | 'error'

const NAV_ICON_SIZE = 18

async function fetchMonth(unit: string, month: Date, signal: AbortSignal): Promise<DayAvailability[]> {
  const from = toISO(startOfMonth(month))
  const to = toISO(endOfMonth(month))
  const response = await fetch(`/api/availability?unit=${unit}&from=${from}&to=${to}`, { signal })
  if (!response.ok) {
    throw new Error(`availability ${response.status}`)
  }
  const payload = (await response.json()) as { days?: DayAvailability[] }
  return payload.days ?? []
}

function buildWeekdays(locale: string): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  // 2024-01-01 е понеделник → строим понеделник-базиран ред.
  return Array.from({ length: 7 }, (_, index) => format.format(new Date(2024, 0, 1 + index)))
}

export function AvailabilityCalendar({
  availabilityUnit,
  selectionKind,
  onRangeChange,
  dayPrice,
}: AvailabilityCalendarProps) {
  const { t, i18n } = useTranslation('booking')
  const [month, setMonth] = useState<Date>(() => startOfMonth(new Date()))
  const [byDate, setByDate] = useState<Map<string, DayAvailability>>(() => new Map())
  const [phase, setPhase] = useState<Phase>('loading')
  const [arrival, setArrival] = useState<string | null>(null)
  const [departure, setDeparture] = useState<string | null>(null)
  const [rangeError, setRangeError] = useState(false)

  const today = useMemo(() => toISO(new Date()), [])
  const minMonth = useMemo(() => startOfMonth(new Date()), [])
  const weekdays = useMemo(() => buildWeekdays(i18n.language), [i18n.language])
  const weeks = useMemo(() => monthMatrix(month), [month])
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(i18n.language, { month: 'long', year: 'numeric' }).format(month),
    [i18n.language, month],
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchMonth(availabilityUnit, month, controller.signal)
      .then((days) => {
        setByDate(new Map(days.map((day) => [day.date, day])))
        setPhase('loaded')
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPhase('error')
        }
      })
    return () => controller.abort()
  }, [availabilityUnit, month])

  // Решетката остава на екрана при навигация — само се затъмнява, докато идва новата наличност.
  const goToMonth = (delta: number) => {
    setPhase('loading')
    setMonth((current) => addMonths(current, delta))
  }

  const dayInfo = (iso: string): DayAvailability | undefined => byDate.get(iso)

  const isSelectable = (iso: string): boolean =>
    phase === 'loaded' && iso >= today && dayInfo(iso)?.available === true

  const allAvailable = (dates: readonly string[]): boolean =>
    dates.every((date) => dayInfo(date)?.available === true)

  const emit = (next: DateRange | null) => {
    setRangeError(false)
    onRangeChange(next)
  }

  const selectSingle = (iso: string) => {
    setArrival(iso)
    setDeparture(iso)
    emit(selectionKind === 'days' ? { arrival: iso, departure: iso } : null)
  }

  // Нощувки: 1-ви клик = пристигане, 2-ри (по-късна дата) = заминаване.
  const pickNight = (iso: string) => {
    if (!arrival || departure || iso <= arrival) {
      setArrival(iso)
      setDeparture(null)
      emit(null)
      return
    }
    if (!allAvailable(nightsInRange(arrival, iso))) {
      setRangeError(true)
      return
    }
    setDeparture(iso)
    emit({ arrival, departure: iso })
  }

  // Дни: 1-ви клик = единичен ден; следващ по-късен ден разширява инклузивно.
  const pickDay = (iso: string) => {
    const single = Boolean(arrival && departure && arrival === departure)
    if (single && arrival && iso > arrival) {
      if (!allAvailable(daysInRange(arrival, iso))) {
        setRangeError(true)
        return
      }
      setDeparture(iso)
      emit({ arrival, departure: iso })
      return
    }
    selectSingle(iso)
  }

  const handleDayClick = (iso: string) => {
    if (selectionKind === 'days') {
      pickDay(iso)
      return
    }
    pickNight(iso)
  }

  const dayClass = (iso: string): string => {
    const classes = [styles.day]
    if (iso === arrival || iso === departure) {
      classes.push(styles.selected)
    } else if (arrival && departure && iso > arrival && iso < departure) {
      classes.push(styles.inRange)
    }
    if (phase === 'loaded' && dayInfo(iso)?.available === false) {
      classes.push(styles.unavailable)
    }
    return classes.join(' ')
  }

  const dayLabel = (date: Date, available: boolean): string => {
    const dateText = new Intl.DateTimeFormat(i18n.language, { day: 'numeric', month: 'long' }).format(date)
    const status = available ? t('calendar.legend.available') : t('calendar.legend.unavailable')
    return `${dateText} — ${status}`
  }

  const selectionCount = useMemo(() => {
    if (!arrival || !departure) {
      return 0
    }
    return selectionKind === 'days'
      ? daysInRange(arrival, departure).length
      : nightsInRange(arrival, departure).length
  }, [arrival, departure, selectionKind])

  const minStay = arrival && selectionKind === 'nights' ? dayInfo(arrival)?.minStay ?? null : null

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => goToMonth(-1)}
          disabled={isSameMonth(month, minMonth)}
          aria-label={t('calendar.prevMonth')}
        >
          <Icon icon={IconChevronLeft} size={NAV_ICON_SIZE} />
        </button>
        <span className={styles.monthLabel}>{monthLabel}</span>
        <button
          type="button"
          className={styles.nav}
          onClick={() => goToMonth(1)}
          aria-label={t('calendar.nextMonth')}
        >
          <Icon icon={IconChevronRight} size={NAV_ICON_SIZE} />
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {weekdays.map((name) => (
          <span key={name} className={styles.weekday}>
            {name}
          </span>
        ))}
      </div>

      {phase === 'error' ? (
        <p className={styles.status} role="alert">
          {t('calendar.error')}
        </p>
      ) : (
        <div
          className={phase === 'loading' ? `${styles.grid} ${styles.gridLoading}` : styles.grid}
          aria-busy={phase === 'loading'}
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <span key={`empty-${weekIndex}-${dayIndex}`} className={styles.empty} />
                }
                const iso = toISO(date)
                const price = dayPrice?.(iso) ?? null
                return (
                  <button
                    key={iso}
                    type="button"
                    className={dayClass(iso)}
                    disabled={!isSelectable(iso)}
                    aria-pressed={iso === arrival || iso === departure}
                    aria-label={dayLabel(date, dayInfo(iso)?.available === true)}
                    onClick={() => handleDayClick(iso)}
                  >
                    <span className={styles.dayNum}>{date.getDate()}</span>
                    {price != null && <span className={styles.dayPrice}>{formatPrice(price)}</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchFree}`} />
          {t('calendar.legend.available')}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchBusy}`} />
          {t('calendar.legend.unavailable')}
        </span>
      </div>

      {minStay != null && minStay > 1 && (
        <p className={styles.note}>{t('calendar.minStay', { count: minStay })}</p>
      )}
      {rangeError && (
        <p className={styles.note} role="alert">
          {t('calendar.unavailableRange')}
        </p>
      )}
      {selectionCount > 0 && (
        <p className={styles.summary} aria-live="polite">
          {selectionKind === 'days'
            ? t('calendar.days', { count: selectionCount })
            : t('calendar.nights', { count: selectionCount })}
        </p>
      )}
    </div>
  )
}
