// Ценова граница на вила Мандара — сменяема и отделена от употреба (senior-architect).
// Стойностите са placeholder-и от FB и се препокриват през env (като SITE в lib/config/site.ts).

export interface SeasonalRate {
  offSeason: number // €/нощувка извън сезон
  inSeason: number // €/нощувка в сезон
}

export interface VillaPricing {
  currency: string
  whole: SeasonalRate // наемане на цялата вила
  perRoom: SeasonalRate // наемане на единична стая
  capacity: number // максимален брой гости
  bedrooms: number // брой спални
}

const DEFAULT_WHOLE_OFF_SEASON = 500
const DEFAULT_WHOLE_IN_SEASON = 700
const DEFAULT_ROOM_OFF_SEASON = 150
const DEFAULT_ROOM_IN_SEASON = 150
const DEFAULT_CAPACITY = 9
const DEFAULT_BEDROOMS = 6

function readPositiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const PRICING: VillaPricing = {
  currency: process.env.NEXT_PUBLIC_PRICE_CURRENCY ?? 'EUR',
  whole: {
    offSeason: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_VILLA_OFF, DEFAULT_WHOLE_OFF_SEASON),
    inSeason: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_VILLA_IN, DEFAULT_WHOLE_IN_SEASON),
  },
  perRoom: {
    offSeason: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_ROOM_OFF, DEFAULT_ROOM_OFF_SEASON),
    inSeason: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_ROOM_IN, DEFAULT_ROOM_IN_SEASON),
  },
  capacity: readPositiveNumber(process.env.NEXT_PUBLIC_VILLA_CAPACITY, DEFAULT_CAPACITY),
  bedrooms: readPositiveNumber(process.env.NEXT_PUBLIC_VILLA_BEDROOMS, DEFAULT_BEDROOMS),
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  BGN: 'лв.',
}

export function formatPrice(amount: number, currency: string = PRICING.currency): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  return `${amount} ${symbol}`
}

export function lowestRate(rate: SeasonalRate): number {
  return Math.min(rate.offSeason, rate.inSeason)
}
