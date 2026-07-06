// Трите начина за резервация като данни (senior-architect: режимите зад граница).
// Клиент-безопасно — без SMOOBU_* env. Дисплей текстовете идват през i18n в компонентите.

import { VILLA_UNIT } from '@/lib/booking/bookingGateway'

export type BookingMode = 'villa' | 'lounger' | 'room'

// Какво иска UI-ят за всеки режим — data-driven, за да няма условия из компонентите.
export interface BookingModeConfig {
  id: BookingMode
  selectionKind: 'nights' | 'days' // нощувки (вила/стая) или дни (шезлонг)
  needsRoom: boolean // ред с избор на конкретна стая
  needsQuantity: boolean // поле „брой шезлонги"
  needsGuests: boolean // поле „гости"
  image: string // снимка за картата (placeholder — потребителят ще я смени)
}

// Наличността и на трите режима идва от един обект: свободна вила = свободна дата.
export const AVAILABILITY_UNIT = VILLA_UNIT

const VILLA_MODE: BookingModeConfig = {
  id: 'villa',
  selectionKind: 'nights',
  needsRoom: false,
  needsQuantity: false,
  needsGuests: true,
  image: '/images/about/villa.jpg',
}

const LOUNGER_MODE: BookingModeConfig = {
  id: 'lounger',
  selectionKind: 'days',
  needsRoom: false,
  needsQuantity: true,
  needsGuests: false,
  image: '/images/gallery/g1.jpg',
}

const ROOM_MODE: BookingModeConfig = {
  id: 'room',
  selectionKind: 'nights',
  needsRoom: true,
  needsQuantity: false,
  needsGuests: true,
  image: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png',
}

export const BOOKING_MODES = [VILLA_MODE, LOUNGER_MODE, ROOM_MODE] as const

const MODE_BY_ID: Record<BookingMode, BookingModeConfig> = {
  villa: VILLA_MODE,
  lounger: LOUNGER_MODE,
  room: ROOM_MODE,
}

export function isBookingMode(value: string): value is BookingMode {
  return value in MODE_BY_ID
}

export function modeConfig(mode: BookingMode): BookingModeConfig {
  return MODE_BY_ID[mode]
}
