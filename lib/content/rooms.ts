export interface RoomSpecs {
  beds: number
  area: number
}

export interface Room {
  slug: string
  accent: string
  image: string // корица — съвпада с images[0]
  images: readonly string[] // галерия за слайдера (placeholder снимки)
  specs: RoomSpecs
}

export const ROOMS: readonly Room[] = [
  {
    slug: 'dawn',
    accent: 'hsl(215, 40%, 72%)',
    image: '/images/gallery/g2.jpg',
    images: [
      '/images/gallery/g2.jpg',
      '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png',
      '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_05.png',
      '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_06.png',
    ],
    specs: { beds: 1, area: 28 },
  },
  {
    slug: 'sunrise',
    accent: 'hsl(40, 80%, 70%)',
    image: '/images/gallery/g5.jpg',
    images: [
      '/images/gallery/g5.jpg',
      '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png',
      '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_07.png',
    ],
    specs: { beds: 2, area: 26 },
  },
  {
    slug: 'noon',
    accent: 'hsl(48, 85%, 65%)',
    image: '/images/gallery/g1.jpg',
    images: [
      '/images/gallery/g1.jpg',
      '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png',
      '/images/gallery/omai_zile_accommodation_104_signature_pavilion_04.png',
    ],
    specs: { beds: 1, area: 30 },
  },
  {
    slug: 'sunset',
    accent: 'hsl(20, 68%, 55%)',
    image: '/images/gallery/g4.jpg',
    images: [
      '/images/gallery/g4.jpg',
      '/images/gallery/omai_zile_accommodation_104_signature_pavilion_04-2.png',
      '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png',
    ],
    specs: { beds: 2, area: 27 },
  },
  {
    slug: 'dusk',
    accent: 'hsl(295, 22%, 48%)',
    image: '/images/about/villa.jpg',
    images: [
      '/images/about/villa.jpg',
      '/images/gallery/omai_zile_accommodation_101_master_pavilion_14.png',
      '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_06.png',
    ],
    specs: { beds: 1, area: 24 },
  },
  {
    slug: 'night',
    accent: 'hsl(235, 20%, 25%)',
    image: '/images/gallery/g5.jpg',
    images: [
      '/images/gallery/g5.jpg',
      '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png',
      '/images/gallery/omai_zile_accommodation_101_master_pavilion_14.png',
    ],
    specs: { beds: 1, area: 25 },
  },
] as const
