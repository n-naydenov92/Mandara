// Клиентска граница към резервацията — POST-ва към нашия сървърен route, който създава
// резервацията в Smoobu. senior-architect: сменяемо (Smoobu днес; друго после) без промяна
// по формата. Тайният ключ живее на сървъра, не тук.

import type { InquiryInput, InquiryResult } from '@/lib/booking/bookingGateway'

export async function submitReservation(input: InquiryInput): Promise<InquiryResult> {
  try {
    const response = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    })
    const data = (await response.json().catch(() => null)) as InquiryResult | null
    if (data && typeof data.ok === 'boolean') {
      return data
    }
    return { ok: false, error: 'request-failed' }
  } catch {
    return { ok: false, error: 'network' }
  }
}
