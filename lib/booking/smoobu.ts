// Smoobu клиент — наличност и цени (само четене). СЪРВЪР-ОНЛИ.
// Извиква се единствено от route handler-и (app/api/*), които текат на сървъра,
// затова тайният SMOOBU_API_KEY никога не стига до браузъра.
// (Препоръка: добави пакета `server-only` и го импортни тук за compile-time защита.)

import type { AvailabilityResult, DayAvailability } from '@/lib/booking/bookingGateway'
import { resolveApartmentId } from '@/lib/booking/smoobuUnits'

const RATES_ENDPOINT = 'https://login.smoobu.com/api/rates'
const REVALIDATE_SECONDS = 600
const PLACEHOLDER = '__TBD__'
export const AVAILABILITY_TAG = 'smoobu-availability'

const rawKey = process.env.SMOOBU_API_KEY
const API_KEY = rawKey && rawKey !== PLACEHOLDER ? rawKey : undefined

// Аутентикацията е изолирана тук. Legacy header `Api-Key` sunset-ва на 25 септ. 2026 →
// смяната към HMAC (X-API-Key/X-Timestamp/X-Nonce/X-Signature) се прави само в тази функция.
function smoobuHeaders(): HeadersInit {
  return { 'Api-Key': API_KEY ?? '', 'Content-Type': 'application/json' }
}

// Формата на /api/rates: data[apartmentId][YYYY-MM-DD] = { price, min_length_of_stay, available }.
interface SmoobuRateDay {
  price?: number | null
  min_length_of_stay?: number | null
  available?: number
}

interface SmoobuRatesResponse {
  data?: Record<string, Record<string, SmoobuRateDay>>
}

function toDays(byDate: Record<string, SmoobuRateDay>): DayAvailability[] {
  return Object.entries(byDate)
    .map(([date, info]) => ({
      date,
      available: (info.available ?? 0) > 0,
      price: info.price ?? null,
      minStay: info.min_length_of_stay ?? null,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
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

  const url = `${RATES_ENDPOINT}?start_date=${from}&end_date=${to}&apartments[]=${apartmentId}`
  const response = await fetch(url, {
    headers: smoobuHeaders(),
    next: { revalidate: REVALIDATE_SECONDS, tags: [AVAILABILITY_TAG] },
  })

  if (!response.ok) {
    throw new Error(`Smoobu rates request failed: ${response.status}`)
  }

  const payload = (await response.json()) as SmoobuRatesResponse
  const byDate = payload.data?.[apartmentId]
  return { days: byDate ? toDays(byDate) : [] }
}
