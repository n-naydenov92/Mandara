// Мапинг между нашите обекти (вила + 6 стаи) и Smoobu apartment id-тата.
// САМО СЪРВЪР: чете не-публични env (SMOOBU_*). Не импортвай в клиентски компонент —
// сървърът подава готовия списък обекти на клиента през props.

import { ROOMS } from '@/lib/content/rooms'
import { VILLA_UNIT } from '@/lib/booking/bookingGateway'

const PLACEHOLDER = '__TBD__'

// slug → env var със Smoobu apartment id.
const APARTMENT_ENV: Record<string, string | undefined> = {
  [VILLA_UNIT]: process.env.SMOOBU_APARTMENT_VILLA,
  dawn: process.env.SMOOBU_APARTMENT_DAWN,
  sunrise: process.env.SMOOBU_APARTMENT_SUNRISE,
  noon: process.env.SMOOBU_APARTMENT_NOON,
  sunset: process.env.SMOOBU_APARTMENT_SUNSET,
  dusk: process.env.SMOOBU_APARTMENT_DUSK,
  night: process.env.SMOOBU_APARTMENT_NIGHT,
}

export const UNIT_IDS: readonly string[] = [VILLA_UNIT, ...ROOMS.map((room) => room.slug)]

function clean(value: string | undefined): string | undefined {
  return value && value !== PLACEHOLDER ? value : undefined
}

export function isUnit(value: string): boolean {
  return UNIT_IDS.includes(value)
}

export function resolveApartmentId(unit: string): string | undefined {
  return clean(APARTMENT_ENV[unit])
}

// Обектите, които реално имат Smoobu id → само те се показват в селектора/календара.
export function configuredUnits(): string[] {
  return UNIT_IDS.filter((unit) => resolveApartmentId(unit) !== undefined)
}

export function isSmoobuConfigured(): boolean {
  return clean(process.env.SMOOBU_API_KEY) !== undefined && configuredUnits().length > 0
}
