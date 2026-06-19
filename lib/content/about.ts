// Данни за страница „За вила Мандара" — единствен източник, отделен от употреба.
// Смяна на реални снимки/стойности = редакция само тук.

export const ABOUT_HERO_IMAGE =
  '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png'

export const VILLA_STAT_KEYS = ['rooms', 'capacity', 'area', 'location'] as const
export type VillaStatKey = (typeof VILLA_STAT_KEYS)[number]

export interface VillaStat {
  key: VillaStatKey
}

export const VILLA_STATS = [
  { key: 'rooms' },
  { key: 'capacity' },
  { key: 'area' },
  { key: 'location' },
] as const satisfies readonly VillaStat[]

export const ABOUT_BLOCK_KEYS = ['architecture', 'interior', 'garden', 'wellness'] as const
export type AboutBlockKey = (typeof ABOUT_BLOCK_KEYS)[number]

export interface AboutBlock {
  key: AboutBlockKey
  src: string
  reversed: boolean
}

export const ABOUT_BLOCKS = [
  { key: 'architecture', src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png', reversed: false },
  { key: 'interior', src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png', reversed: true },
  { key: 'garden', src: '/images/gallery/g1.jpg', reversed: false },
  { key: 'wellness', src: '/images/gallery/g4.jpg', reversed: true },
] as const satisfies readonly AboutBlock[]

export const AMENITY_GROUP_KEYS = ['accommodation', 'wellness', 'outdoors', 'services'] as const
export type AmenityGroupKey = (typeof AMENITY_GROUP_KEYS)[number]

export interface AmenityGroup {
  key: AmenityGroupKey
  items: readonly string[]
}

export const AMENITY_GROUPS = [
  { key: 'accommodation', items: ['sixRooms', 'linens', 'livingRoom', 'kitchen', 'heating', 'wifi'] },
  { key: 'wellness', items: ['pool', 'herbalRituals', 'sauna', 'loungers'] },
  { key: 'outdoors', items: ['garden', 'terrace', 'firePit', 'parking'] },
  { key: 'services', items: ['chef', 'transfer', 'concierge', 'cleaning'] },
] as const satisfies readonly AmenityGroup[]

export const LOCATION_NEARBY_KEYS = ['monastery', 'trails', 'springs', 'town'] as const
export type LocationNearbyKey = (typeof LOCATION_NEARBY_KEYS)[number]
