// Smoobu клиент — наличност и цени (само четене). СЪРВЪР-ОНЛИ.
// Извиква се единствено от route handler-и (app/api/*), които текат на сървъра,
// затова тайният SMOOBU_API_KEY никога не стига до браузъра.
//
// Наличността се слива от ДВА източника, защото Smoobu ги държи разделени:
//  • /api/rates        → цена + минимален престой (полето `available` тук НЕ отразява
//                         ръчните блокирания, затова не му вярваме за заетостта).
//  • /api/reservations → реалните резервации И ръчните „Block dates" (blocked channel).
// Ден е свободен само ако rates го позволява И няма резервация/блок върху него.

import type { AvailabilityResult, DayAvailability } from '@/lib/booking/bookingGateway'
import { resolveApartmentId } from '@/lib/booking/smoobuUnits'

const RATES_ENDPOINT = 'https://login.smoobu.com/api/rates'
const RESERVATIONS_ENDPOINT = 'https://login.smoobu.com/api/reservations'
const REVALIDATE_SECONDS = 600
const RESERVATIONS_PAGE_SIZE = 100
const PLACEHOLDER = '__TBD__'
export const AVAILABILITY_TAG = 'smoobu-availability'

const rawKey = process.env.SMOOBU_API_KEY
const API_KEY = rawKey && rawKey !== PLACEHOLDER ? rawKey : undefined

// Аутентикацията е изолирана тук. Legacy header `Api-Key` sunset-ва на 25 септ. 2026 →
// смяната към HMAC (X-API-Key/X-Timestamp/X-Nonce/X-Signature) се прави само в тази функция.
function smoobuHeaders(): HeadersInit {
  return { 'Api-Key': API_KEY ?? '', 'Content-Type': 'application/json' }
}

const cacheOptions = { next: { revalidate: REVALIDATE_SECONDS, tags: [AVAILABILITY_TAG] } }

// Формата на /api/rates: data[apartmentId][YYYY-MM-DD] = { price, min_length_of_stay, available }.
interface SmoobuRateDay {
  price?: number | null
  min_length_of_stay?: number | null
  available?: number
}

interface SmoobuRatesResponse {
  data?: Record<string, Record<string, SmoobuRateDay>>
}

// Резервация ИЛИ ръчен блок. Ръчният блок идва като `is-blocked-booking: true`
// (обикновено channel „Blocked channel"); реалната резервация е type `reservation`.
interface SmoobuBooking {
  arrival?: string
  departure?: string
  type?: string
  'is-blocked-booking'?: boolean
}

interface SmoobuReservationsResponse {
  bookings?: SmoobuBooking[]
  page_count?: number
}

// Нощите в интервала [arrival, departure) — заминаването е свободно за нов гост.
function eachNight(arrivalISO: string, departureISO: string): string[] {
  const nights: string[] = []
  const cursor = new Date(`${arrivalISO}T00:00:00Z`)
  const end = new Date(`${departureISO}T00:00:00Z`)
  while (cursor < end) {
    nights.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return nights
}

// Заема ли този запис датите: реалната резервация да; блокът да; истинска
// анулация (type `cancellation` без blocked флаг) — не.
function occupies(booking: SmoobuBooking): boolean {
  return booking['is-blocked-booking'] === true || booking.type !== 'cancellation'
}

async function fetchJson<T>(url: string, label: string): Promise<T> {
  const response = await fetch(url, { headers: smoobuHeaders(), ...cacheOptions })
  if (!response.ok) {
    throw new Error(`Smoobu ${label} request failed: ${response.status}`)
  }
  return (await response.json()) as T
}

// Цени + минимален престой от /api/rates (полето `available` също се пази — може да е
// затворено от rate-план — но заетостта идва от резервациите).
async function fetchRateDays(apartmentId: string, from: string, to: string): Promise<DayAvailability[]> {
  const url = `${RATES_ENDPOINT}?start_date=${from}&end_date=${to}&apartments[]=${apartmentId}`
  const payload = await fetchJson<SmoobuRatesResponse>(url, 'rates')
  const byDate = payload.data?.[apartmentId] ?? {}
  return Object.entries(byDate)
    .map(([date, info]) => ({
      date,
      available: (info.available ?? 0) > 0,
      price: info.price ?? null,
      minStay: info.min_length_of_stay ?? null,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Датите, заети от резервации и ръчни блокирания в [from, to] (с пагинация).
async function fetchOccupiedDates(apartmentId: string, from: string, to: string): Promise<Set<string>> {
  const occupied = new Set<string>()
  let page = 1
  let pageCount = 1
  do {
    const url = `${RESERVATIONS_ENDPOINT}?apartmentId=${apartmentId}&from=${from}&to=${to}&pageSize=${RESERVATIONS_PAGE_SIZE}&page=${page}`
    const payload = await fetchJson<SmoobuReservationsResponse>(url, 'reservations')
    pageCount = payload.page_count ?? 1
    for (const booking of payload.bookings ?? []) {
      if (occupies(booking) && booking.arrival && booking.departure) {
        for (const night of eachNight(booking.arrival, booking.departure)) {
          occupied.add(night)
        }
      }
    }
    page += 1
  } while (page <= pageCount)
  return occupied
}

export async function getAvailability(
  unit: string,
  from: string,
  to: string,
): Promise<AvailabilityResult> {
  const apartmentId = resolveApartmentId(unit)
  if (!apartmentId || !API_KEY) {
    return { days: [] }
  }

  const [rateDays, occupied] = await Promise.all([
    fetchRateDays(apartmentId, from, to),
    fetchOccupiedDates(apartmentId, from, to),
  ])

  const days = rateDays.map((day) => ({
    ...day,
    available: day.available && !occupied.has(day.date),
  }))
  return { days }
}
