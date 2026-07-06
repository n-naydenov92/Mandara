export interface ExperienceImage {
  src: string
  width: number
  height: number
}

export const EXPERIENCE_IMAGES = {
  landscape: { src: '/images/gallery/g4.jpg', width: 1200, height: 800 },
  portrait: { src: '/images/gallery/g2.jpg', width: 1024, height: 1229 },
} as const satisfies Record<string, ExperienceImage>

export const REGION_KEYS = ['belasitsa', 'monastery', 'wine', 'trails'] as const
export type RegionKey = (typeof REGION_KEYS)[number]

export interface RegionDestination {
  // [широка лява, тясна дясна] landscape снимка за scroll-секцията „За региона“
  images: readonly [ExperienceImage, ExperienceImage]
  href: string
  distanceKm: number // разстояние от вилата (placeholder — потребителят ще уточни)
  timeMin: number // време за път от вилата в минути (placeholder)
}

// Placeholder снимки — 8 различни, за да личи смяната при скрол. Заменяеми с реални
// кадри от региона (по 2 на дестинация).
const REGION_IMG = {
  lounge: { src: '/images/gallery/g4.jpg', width: 1200, height: 800 },
  exterior: { src: '/images/gallery/g5.jpg', width: 1200, height: 800 },
  villa: { src: '/images/about/villa.jpg', width: 1200, height: 674 },
  pool: { src: '/images/gallery/g1.jpg', width: 1024, height: 1229 },
  interior: { src: '/images/gallery/g2.jpg', width: 1024, height: 1229 },
  pavilion1: { src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_05.png', width: 1600, height: 1067 },
  pavilion2: { src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png', width: 1600, height: 1067 },
  pavilion3: { src: '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png', width: 1600, height: 1067 },
} as const satisfies Record<string, ExperienceImage>

export const REGION_DESTINATIONS = {
  belasitsa: { images: [REGION_IMG.lounge, REGION_IMG.exterior], href: '/region', distanceKm: 15, timeMin: 25 },
  monastery: { images: [REGION_IMG.villa, REGION_IMG.pool], href: '/region', distanceKm: 10, timeMin: 15 },
  wine: { images: [REGION_IMG.interior, REGION_IMG.pavilion1], href: '/region', distanceKm: 6, timeMin: 12 },
  trails: { images: [REGION_IMG.pavilion2, REGION_IMG.pavilion3], href: '/region', distanceKm: 2, timeMin: 6 },
} as const satisfies Record<RegionKey, RegionDestination>

export interface VillaSpace {
  slug: string
  image: string // корица за slide-а (placeholder — потребителят ще смени с реален кадър)
}

// Пространствата на вилата за pinned scroll-секцията на началната страница.
// Отделно от ROOMS (стаите) — тук показваме цялата вила, не настаняването.
export const VILLA_SPACES: readonly VillaSpace[] = [
  { slug: 'pool', image: '/images/gallery/g1.jpg' },
  { slug: 'dining', image: '/images/gallery/g2.jpg' },
  { slug: 'rooms', image: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png' },
  { slug: 'kitchen', image: '/images/gallery/g4.jpg' },
  { slug: 'kids', image: '/images/gallery/g5.jpg' },
  { slug: 'yard', image: '/images/about/villa.jpg' },
  { slug: 'sauna', image: '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png' },
] as const

