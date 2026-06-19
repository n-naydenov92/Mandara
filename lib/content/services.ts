/* Данни за страницата „5★ Услуги". Снимките са временни placeholder-и
   (заместват се с финални снимки по-късно) — затова сочат към съществуващи
   файлове в public/images. Презентацията (икони, layout) живее в компонентите. */

export const FLAGSHIP_SERVICES = [
  { key: 'chef', image: '/images/gallery/g2.jpg' },
  { key: 'transfer', image: '/images/gallery/g1.jpg' },
  { key: 'spa', image: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png' },
  { key: 'tasting', image: '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png' },
  { key: 'concierge', image: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_05.png' },
  { key: 'butler', image: '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png' },
] as const

export type FlagshipService = (typeof FLAGSHIP_SERVICES)[number]
export type FlagshipServiceKey = FlagshipService['key']

export const SERVICE_HERO_IMAGE = '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png'
