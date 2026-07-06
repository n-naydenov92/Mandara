// Жива цена по бизнес правилата (senior-architect: ценовата логика отделена от UI).
// Авторитет за цената; Smoobu остава авторитет само за наличност (v1). Чисто и тестваемо.

import { PRICING } from '@/lib/content/pricing'
import type { BookingMode } from '@/lib/booking/modes'

const MS_PER_DAY = 1000 * 60 * 60 * 24
const FRIDAY = 5
const SATURDAY = 6

export interface QuoteLine {
  labelKey: string // i18n ключ (price.*) — преводът се прави в компонента
  labelParams?: Record<string, string | number>
  amount: number
}

export interface Quote {
  lines: readonly QuoteLine[]
  total: number
  currency: string
}

export function nightCount(arrivalISO: string, departureISO: string): number {
  return Math.max(0, Math.round((Date.parse(departureISO) - Date.parse(arrivalISO)) / MS_PER_DAY))
}

// Инклузивен брой дни [arrival, departure] — за шезлонг (1 ден, ако датите съвпадат).
export function dayCount(arrivalISO: string, departureISO: string): number {
  return nightCount(arrivalISO, departureISO) + 1
}

// Водеща цена за таб/карта (от env) — „от 500 / нощ", „18 / ден", „180 / нощ".
export function headlinePrice(mode: BookingMode): number {
  if (mode === 'lounger') {
    return PRICING.loungerDay
  }
  if (mode === 'room') {
    return PRICING.roomNight
  }
  return PRICING.villaNight.weekday
}

// Цена на нощта, започваща на дадена дата (вила: пт/сб срещу делник).
export function villaNightPrice(iso: string): number {
  const day = new Date(iso).getDay()
  return day === FRIDAY || day === SATURDAY ? PRICING.villaNight.weekend : PRICING.villaNight.weekday
}

// Ден-цена за клетка на календара по режим: вила (500/700), стая (180), шезлонг (18).
export function dayPriceFor(mode: BookingMode): (iso: string) => number {
  if (mode === 'room') {
    return () => PRICING.roomNight
  }
  if (mode === 'lounger') {
    return () => PRICING.loungerDay
  }
  return villaNightPrice
}

function weekendNights(arrivalISO: string, departureISO: string): number {
  let count = 0
  const cursor = new Date(arrivalISO)
  const end = new Date(departureISO)
  while (cursor < end) {
    const day = cursor.getDay()
    if (day === FRIDAY || day === SATURDAY) {
      count += 1
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

function quote(lines: QuoteLine[]): Quote {
  const total = lines.reduce((sum, line) => sum + line.amount, 0)
  return { lines, total, currency: PRICING.currency }
}

// Цялата вила: всяка нощ пт/сб = уикенд тарифа, иначе делник.
export function quoteVilla(arrivalISO: string, departureISO: string): Quote {
  const nights = nightCount(arrivalISO, departureISO)
  const weekend = weekendNights(arrivalISO, departureISO)
  const weekday = nights - weekend
  const { weekday: weekdayRate, weekend: weekendRate } = PRICING.villaNight
  const lines: QuoteLine[] = []
  if (weekday > 0) {
    lines.push({ labelKey: 'price.lineWeekday', labelParams: { count: weekday, price: weekdayRate }, amount: weekday * weekdayRate })
  }
  if (weekend > 0) {
    lines.push({ labelKey: 'price.lineWeekend', labelParams: { count: weekend, price: weekendRate }, amount: weekend * weekendRate })
  }
  return quote(lines)
}

// Единична стая: плоска тарифа на нощ.
export function quoteRoom(arrivalISO: string, departureISO: string): Quote {
  const nights = nightCount(arrivalISO, departureISO)
  const amount = nights * PRICING.roomNight
  return quote([{ labelKey: 'price.lineRoom', labelParams: { count: nights, price: PRICING.roomNight }, amount }])
}

// Шезлонг: 18€ × брой шезлонги × брой дни (инклузивно).
export function quoteLounger(arrivalISO: string, departureISO: string, quantity: number): Quote {
  const days = dayCount(arrivalISO, departureISO)
  const amount = days * quantity * PRICING.loungerDay
  return quote([
    { labelKey: 'price.lineLounger', labelParams: { quantity, days, price: PRICING.loungerDay }, amount },
  ])
}
