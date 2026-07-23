// Кадър за hero-а на началната страница — вилата на здрач (басейн + топло осветена фасада).
export const HOME_HERO_IMAGE = '/images/homepage/hp-main-banner.webp'

export interface ExperienceImage {
  src: string
  width: number
  height: number
}

export const EXPERIENCE_IMAGES = {
  landscape: { src: '/images/homepage/hp-izjivyavane1.webp', width: 2400, height: 1792 },
  portrait: { src: '/images/homepage/hp-izjivyavane2.webp', width: 2400, height: 1792 },
} as const satisfies Record<string, ExperienceImage>

export const REGION_KEYS = [
  'belogradchik',
  'magura',
  'radetzki',
  'chiprovtsiMonastery',
  'chiprovtsi',
  'montanensium',
  'klisura',
] as const
export type RegionKey = (typeof REGION_KEYS)[number]

export interface RegionDestination {
  image: string // реален кадър от дестинацията
  href: string
  distanceKm: number // разстояние от вилата
  timeMin: number // време за път от вилата в минути
}

const REGION_IMG_DIR = '/images/homepage'

export const REGION_DESTINATIONS = {
  belogradchik: { image: `${REGION_IMG_DIR}/belogradchishki-skali.webp`, href: '/region', distanceKm: 40, timeMin: 45 },
  magura: { image: `${REGION_IMG_DIR}/peshtera-magurata.webp`, href: '/region', distanceKm: 50, timeMin: 60 },
  radetzki: { image: `${REGION_IMG_DIR}/koraba-radecki.webp`, href: '/region', distanceKm: 55, timeMin: 60 },
  chiprovtsiMonastery: { image: `${REGION_IMG_DIR}/chiprovski-manastir.webp`, href: '/region', distanceKm: 8, timeMin: 15 },
  chiprovtsi: { image: `${REGION_IMG_DIR}/grad-chiprovtsi.webp`, href: '/region', distanceKm: 10, timeMin: 15 },
  montanensium: { image: `${REGION_IMG_DIR}/antichna-krepost-montana.webp`, href: '/region', distanceKm: 20, timeMin: 25 },
  klisura: { image: `${REGION_IMG_DIR}/klisurski-manastir.webp`, href: '/region', distanceKm: 35, timeMin: 45 },
} as const satisfies Record<RegionKey, RegionDestination>

export interface VillaSpace {
  slug: string
  image: string // корица за slide-а (placeholder — потребителят ще смени с реален кадър)
}

// Пространствата на вилата за pinned scroll-секцията на началната страница.
// Отделно от ROOMS (стаите) — тук показваме цялата вила, не настаняването.
export const VILLA_SPACES: readonly VillaSpace[] = [
  { slug: 'pool', image: '/images/homepage/hp-za-baseina.webp' },
  { slug: 'dining', image: '/images/homepage/hp-trapezaria.webp' },
  { slug: 'rooms', image: '/images/homepage/hp-staite.webp' },
  { slug: 'kitchen', image: '/images/homepage/hp-kuhnia.webp' },
  { slug: 'kids', image: '/images/homepage/hp-detski-kat.webp' },
  { slug: 'yard', image: '/images/homepage/hp-dvor.webp' },
  { slug: 'sauna', image: '/images/homepage/hp-sauna.webp' },
] as const

