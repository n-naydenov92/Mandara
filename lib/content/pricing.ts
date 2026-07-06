// Ценова граница на вила Мандара — сменяема и отделена от употреба (senior-architect).
// Стойностите са placeholder-и от FB и се препокриват през env (като SITE в lib/config/site.ts).

export interface SeasonalRate {
  offSeason: number // €/нощувка извън сезон
  inSeason: number // €/нощувка в сезон
}

// Нощна тарифа на цялата вила по ден от седмицата (пт/сб срещу делник).
export interface VillaNightlyRate {
  weekday: number // €/нощувка пн–чт + нд
  weekend: number // €/нощувка пт + сб
}

export interface VillaPricing {
  currency: string
  whole: SeasonalRate // наемане на цялата вила (маркетинг „от …")
  perRoom: SeasonalRate // наемане на единична стая (маркетинг „от …")
  capacity: number // максимален брой гости
  bedrooms: number // брой спални
  // Резервационни тарифи — експлицитни бизнес правила за живата цена в панела.
  villaNight: VillaNightlyRate // делник / пт-сб
  roomNight: number // €/нощ за единична стая
  loungerDay: number // €/ден за един шезлонг
  loungerMax: number // UI таван за поле „брой шезлонги"
}

const DEFAULT_WHOLE_OFF_SEASON = 500
const DEFAULT_WHOLE_IN_SEASON = 700
const DEFAULT_ROOM_OFF_SEASON = 180
const DEFAULT_ROOM_IN_SEASON = 180
const DEFAULT_CAPACITY = 9
const DEFAULT_BEDROOMS = 4
const DEFAULT_VILLA_WEEKDAY = 500
const DEFAULT_VILLA_WEEKEND = 700
const DEFAULT_ROOM_NIGHT = 180
const DEFAULT_LOUNGER_DAY = 18
const DEFAULT_LOUNGER_MAX = 8

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
  villaNight: {
    weekday: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_VILLA_WEEKDAY, DEFAULT_VILLA_WEEKDAY),
    weekend: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_VILLA_WEEKEND, DEFAULT_VILLA_WEEKEND),
  },
  roomNight: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_ROOM_NIGHT, DEFAULT_ROOM_NIGHT),
  loungerDay: readPositiveNumber(process.env.NEXT_PUBLIC_PRICE_LOUNGER_DAY, DEFAULT_LOUNGER_DAY),
  loungerMax: readPositiveNumber(process.env.NEXT_PUBLIC_LOUNGER_MAX, DEFAULT_LOUNGER_MAX),
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
