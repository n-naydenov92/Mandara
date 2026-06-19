export const GALLERY_CATEGORIES = [
  'all',
  'exterior',
  'interior',
  'garden',
  'pool',
  'rooms',
] as const
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

export type ImageCategory = Exclude<GalleryCategory, 'all'>

export interface GalleryImage {
  id: string
  category: ImageCategory
  captionKey: string
  src: string
  width: number
  height: number
}

interface ImageSource {
  src: string
  width: number
  height: number
}

// Реални висококачествени кадри на павилионите/стаите.
const ROOMS = {
  master1: { src: '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png', width: 3840, height: 2560 },
  master2: { src: '/images/gallery/omai_zile_accommodation_101_master_pavilion_14.png', width: 3840, height: 2560 },
  signature1: { src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png', width: 3840, height: 2157 },
  signature2: { src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_04.png', width: 3840, height: 2560 },
  signature3: { src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_04-2.png', width: 3840, height: 2560 },
  deluxe1: { src: '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png', width: 3840, height: 2560 },
  deluxe2: { src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_01.png', width: 3840, height: 2157 },
  deluxe3: { src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_05.png', width: 3840, height: 2560 },
  deluxe4: { src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_06.png', width: 3840, height: 2560 },
  deluxe5: { src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_07.png', width: 3840, height: 2560 },
} as const satisfies Record<string, ImageSource>

// Временни placeholder-и — за категории без реални снимки (екстериор/градина/басейн).
// Бъдеща смяна с реални снимки = редакция само тук.
const PLACEHOLDERS = {
  portraitA: { src: '/images/gallery/g1.jpg', width: 1024, height: 1229 },
  portraitB: { src: '/images/gallery/g2.jpg', width: 1024, height: 1229 },
  landscapeA: { src: '/images/gallery/g4.jpg', width: 1200, height: 800 },
  landscapeB: { src: '/images/gallery/g5.jpg', width: 1200, height: 800 },
  wide: { src: '/images/about/villa.jpg', width: 1200, height: 674 },
} as const satisfies Record<string, ImageSource>

function img(
  id: string,
  category: ImageCategory,
  captionKey: string,
  source: ImageSource,
): GalleryImage {
  return { id, category, captionKey, ...source }
}

// Редът е подреден за bento ритъма (виж BentoGrid): първият кадър попада в едрата
// квадратна клетка, третият — във вертикалната, петият — в единствената хоризонтална.
// Затова portrait е на 1/3, а широкият кадър — на 5.
export const GALLERY_IMAGES: readonly GalleryImage[] = [
  // Екстериор
  img('ext-1', 'exterior', 'facade', PLACEHOLDERS.portraitA),
  img('ext-2', 'exterior', 'terrace', PLACEHOLDERS.landscapeA),
  img('ext-3', 'exterior', 'courtyard', PLACEHOLDERS.portraitB),
  img('ext-4', 'exterior', 'entrance', PLACEHOLDERS.landscapeB),
  img('ext-5', 'exterior', 'panorama', PLACEHOLDERS.wide),
  img('ext-6', 'exterior', 'dusk', PLACEHOLDERS.landscapeA),

  // Интериор — g2 (portrait) + реални интериори от павилионите
  img('int-1', 'interior', 'living', PLACEHOLDERS.portraitB),
  img('int-2', 'interior', 'dining', ROOMS.signature1),
  img('int-3', 'interior', 'lounge', ROOMS.deluxe2),
  img('int-4', 'interior', 'hall', ROOMS.master2),
  img('int-5', 'interior', 'fireplace', ROOMS.signature2),
  img('int-6', 'interior', 'reading', ROOMS.deluxe3),

  // Градина
  img('gar-1', 'garden', 'herbs', PLACEHOLDERS.portraitA),
  img('gar-2', 'garden', 'lawn', PLACEHOLDERS.landscapeB),
  img('gar-3', 'garden', 'morning', PLACEHOLDERS.portraitB),
  img('gar-4', 'garden', 'flowers', PLACEHOLDERS.landscapeA),
  img('gar-5', 'garden', 'gardenView', PLACEHOLDERS.wide),
  img('gar-6', 'garden', 'shade', PLACEHOLDERS.landscapeB),

  // Басейн
  img('pool-1', 'pool', 'poolside', PLACEHOLDERS.portraitB),
  img('pool-2', 'pool', 'sunbeds', PLACEHOLDERS.landscapeA),
  img('pool-3', 'pool', 'relax', PLACEHOLDERS.portraitA),
  img('pool-4', 'pool', 'water', PLACEHOLDERS.landscapeB),
  img('pool-5', 'pool', 'poolView', PLACEHOLDERS.wide),
  img('pool-6', 'pool', 'poolDusk', PLACEHOLDERS.landscapeA),

  // Стаи — реални кадри на павилионите
  img('room-1', 'rooms', 'masterPavilion', ROOMS.master1),
  img('room-2', 'rooms', 'signaturePavilion', ROOMS.signature1),
  img('room-3', 'rooms', 'deluxePavilion', ROOMS.deluxe1),
  img('room-4', 'rooms', 'masterPavilion', ROOMS.master2),
  img('room-5', 'rooms', 'signaturePavilion', ROOMS.signature2),
  img('room-6', 'rooms', 'deluxePavilion', ROOMS.deluxe2),
  img('room-7', 'rooms', 'signaturePavilion', ROOMS.signature3),
  img('room-8', 'rooms', 'deluxePavilion', ROOMS.deluxe3),
  img('room-9', 'rooms', 'deluxePavilion', ROOMS.deluxe4),
  img('room-10', 'rooms', 'deluxePavilion', ROOMS.deluxe5),
] as const
