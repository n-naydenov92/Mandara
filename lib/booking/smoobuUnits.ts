// Мап между нашия обект (само вилата) и Smoobu apartment id. САМО СЪРВЪР: чете
// не-публичния SMOOBU_APARTMENT_VILLA — не импортвай в клиентски компонент.

import { VILLA_UNIT } from '@/lib/booking/bookingGateway'

const PLACEHOLDER = '__TBD__'

function clean(value: string | undefined): string | undefined {
  return value && value !== PLACEHOLDER ? value : undefined
}

export function isUnit(value: string): boolean {
  return value === VILLA_UNIT
}

export function resolveApartmentId(unit: string): string | undefined {
  return unit === VILLA_UNIT ? clean(process.env.SMOOBU_APARTMENT_VILLA) : undefined
}

export function isSmoobuConfigured(): boolean {
  return clean(process.env.SMOOBU_API_KEY) !== undefined && resolveApartmentId(VILLA_UNIT) !== undefined
}
