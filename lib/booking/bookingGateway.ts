// Booking домейн типове — споделена граница между формата, Smoobu клиента и UI.
// senior-architect: типовете живеят отделно от конкретните реализации (Formspree, Smoobu),
// за да са сменяеми без да чупим употребата.

// Идентификатор на „цялата вила" като обект (клиент-безопасна константа).
export const VILLA_UNIT = 'villa'

export interface InquiryInput {
  name: string
  email: string
  phone?: string
  dates?: string
  guests?: string
  message?: string
  // Контекст от календара (Фаза 2) — обект и избран интервал.
  unit?: string
  arrival?: string
  departure?: string
  // Контекст от панела — режим (винаги „villa") и изчислена цена от Smoobu.
  mode?: string
  total?: string
  currency?: string
}

export type InquiryResult = { ok: true } | { ok: false; error: string }

// Наличност за един ден от един обект — пречистена форма, която UI консумира.
export interface DayAvailability {
  date: string // ISO yyyy-mm-dd
  available: boolean
  price: number | null
  minStay: number | null
}

export interface AvailabilityResult {
  days: readonly DayAvailability[]
}
