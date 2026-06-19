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
  belasitsa: { images: [REGION_IMG.lounge, REGION_IMG.exterior], href: '/region' },
  monastery: { images: [REGION_IMG.villa, REGION_IMG.pool], href: '/region' },
  wine: { images: [REGION_IMG.interior, REGION_IMG.pavilion1], href: '/region' },
  trails: { images: [REGION_IMG.pavilion2, REGION_IMG.pavilion3], href: '/region' },
} as const satisfies Record<RegionKey, RegionDestination>

export interface GalleryItem {
  key: string
  src: string
  width: number
  height: number
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  { key: 'pool', src: '/images/gallery/g1.jpg', width: 1024, height: 1229 },
  { key: 'lounge', src: '/images/gallery/g4.jpg', width: 1200, height: 800 },
  { key: 'interior', src: '/images/gallery/g2.jpg', width: 1024, height: 1229 },
  { key: 'exterior', src: '/images/gallery/g5.jpg', width: 1200, height: 800 },
] as const

export const GALLERY_SMALL: readonly GalleryItem[] = [
  { key: 'gardens', src: '/images/about/villa.jpg', width: 1200, height: 674 },
  { key: 'view', src: '/images/gallery/g5.jpg', width: 1200, height: 800 },
  { key: 'sunset', src: '/images/gallery/g4.jpg', width: 1200, height: 800 },
] as const
