// Жива цена на панела. Smoobu е авторитет за дневните цени на вилата. senior-architect:
// ценовата логика е отделена от UI и не измисля числа — сумата идва от реалните дневни цени.

import { PRICING } from '@/lib/content/pricing'

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

function quote(lines: QuoteLine[]): Quote {
  const total = lines.reduce((sum, line) => sum + line.amount, 0)
  return { lines, total, currency: PRICING.currency }
}

// Вила: сумата е сборът на дневните цени от Smoobu за избраните нощи. Липсва ли цена за
// някоя нощ → null (крием сумата), за да не показваме измислени числа.
export function quoteNights(prices: readonly (number | null)[]): Quote | null {
  if (prices.length === 0 || prices.some((price) => price === null)) {
    return null
  }
  const total = prices.reduce<number>((sum, price) => sum + (price ?? 0), 0)
  return quote([{ labelKey: 'price.lineNights', labelParams: { count: prices.length }, amount: total }])
}
