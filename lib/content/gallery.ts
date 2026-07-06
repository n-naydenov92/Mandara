export const GALLERY_CATEGORIES = [
  'all',
  'dining',
  'bedrooms',
  'pool',
  'yard',
  'attractions',
  'amenities',
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
  // Трапезария — реален интериор от павилионите + placeholder-и
  img('din-1', 'dining', 'dining', ROOMS.signature1),
  img('din-2', 'dining', 'breakfast', PLACEHOLDERS.landscapeA),
  img('din-3', 'dining', 'diningNook', PLACEHOLDERS.portraitB),
  img('din-4', 'dining', 'kitchen', ROOMS.deluxe2),
  img('din-5', 'dining', 'diningView', PLACEHOLDERS.wide),
  img('din-6', 'dining', 'lounge', PLACEHOLDERS.landscapeB),

  // Спални — реални кадри на павилионите
  img('bed-1', 'bedrooms', 'masterPavilion', ROOMS.master1),
  img('bed-2', 'bedrooms', 'signaturePavilion', ROOMS.signature1),
  img('bed-3', 'bedrooms', 'deluxePavilion', ROOMS.deluxe1),
  img('bed-4', 'bedrooms', 'masterPavilion', ROOMS.master2),
  img('bed-5', 'bedrooms', 'signaturePavilion', ROOMS.signature2),
  img('bed-6', 'bedrooms', 'deluxePavilion', ROOMS.deluxe3),
  img('bed-7', 'bedrooms', 'signaturePavilion', ROOMS.signature3),
  img('bed-8', 'bedrooms', 'deluxePavilion', ROOMS.deluxe4),
  img('bed-9', 'bedrooms', 'deluxePavilion', ROOMS.deluxe5),

  // Басейн
  img('pool-1', 'pool', 'poolside', PLACEHOLDERS.portraitB),
  img('pool-2', 'pool', 'sunbeds', PLACEHOLDERS.landscapeA),
  img('pool-3', 'pool', 'relax', PLACEHOLDERS.portraitA),
  img('pool-4', 'pool', 'water', PLACEHOLDERS.landscapeB),
  img('pool-5', 'pool', 'poolView', PLACEHOLDERS.wide),
  img('pool-6', 'pool', 'poolDusk', PLACEHOLDERS.landscapeA),

  // Двор — екстериор и градина
  img('yard-1', 'yard', 'courtyard', PLACEHOLDERS.portraitB),
  img('yard-2', 'yard', 'terrace', PLACEHOLDERS.landscapeA),
  img('yard-3', 'yard', 'garden', PLACEHOLDERS.portraitA),
  img('yard-4', 'yard', 'lawn', PLACEHOLDERS.landscapeB),
  img('yard-5', 'yard', 'panorama', PLACEHOLDERS.wide),
  img('yard-6', 'yard', 'flowers', PLACEHOLDERS.landscapeA),

  // Атракциони — placeholder-и (очакват реални снимки от региона)
  img('attr-1', 'attractions', 'oldTown', PLACEHOLDERS.portraitA),
  img('attr-2', 'attractions', 'beach', PLACEHOLDERS.landscapeA),
  img('attr-3', 'attractions', 'vineyard', PLACEHOLDERS.portraitB),
  img('attr-4', 'attractions', 'hiking', PLACEHOLDERS.landscapeB),
  img('attr-5', 'attractions', 'landmark', PLACEHOLDERS.wide),
  img('attr-6', 'attractions', 'sunset', PLACEHOLDERS.landscapeA),

  // Удобства — placeholder-и (очакват реални снимки)
  img('amen-1', 'amenities', 'lounge', PLACEHOLDERS.portraitB),
  img('amen-2', 'amenities', 'fireplace', PLACEHOLDERS.landscapeA),
  img('amen-3', 'amenities', 'spa', PLACEHOLDERS.portraitA),
  img('amen-4', 'amenities', 'wine', PLACEHOLDERS.landscapeB),
  img('amen-5', 'amenities', 'terraceView', PLACEHOLDERS.wide),
  img('amen-6', 'amenities', 'firepit', PLACEHOLDERS.landscapeB),
] as const
