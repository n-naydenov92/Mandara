export interface RoomSpecs {
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
    image: '/images/gallery/izgrev-zalez-1.webp',
    images: [
      '/images/gallery/izgrev-zalez-1.webp',
      '/images/gallery/izgrev-zalez-2.webp',
      '/images/gallery/izgrev-zalez-3.webp',
      '/images/gallery/izgrev-zalez-4.webp',
    ],
    specs: { area: 16 },
  },
  {
    slug: 'sunset',
    accent: 'hsl(20, 68%, 55%)',
    image: '/images/gallery/izgrev-zalez-3.webp',
    images: [
      '/images/gallery/izgrev-zalez-3.webp',
      '/images/gallery/izgrev-zalez-4.webp',
      '/images/gallery/izgrev-zalez-1.webp',
      '/images/gallery/izgrev-zalez-2.webp',
    ],
    specs: { area: 16 },
  },
  {
    slug: 'noon',
    accent: 'hsl(48, 85%, 65%)',
    image: '/images/gallery/hlad.webp',
    images: [
      '/images/gallery/hlad.webp',
      '/images/gallery/hlad-0.webp',
      '/images/gallery/hlad-1.webp',
      '/images/gallery/hlad-2.webp',
      '/images/gallery/hlad-3.webp',
      '/images/gallery/hlad-4.webp',
    ],
    specs: { area: 20 },
  },
  {
    slug: 'night',
    accent: 'hsl(235, 20%, 25%)',
    image: '/images/gallery/zemya-1.webp',
    images: [
      '/images/gallery/zemya-1.webp',
      '/images/gallery/zemya-2.webp',
      '/images/gallery/zemya-3.webp',
    ],
    specs: { area: 16 },
  },
] as const
