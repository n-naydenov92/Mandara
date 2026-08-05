// Топ 5 кадъра на общите части за слайдера в „Цялата вила" (избрани от клиента).
export const VILLA_GALLERY: readonly string[] = [
  '/images/gallery/hp-main-banner.webp',
  '/images/gallery/hf_20260712_205940_62973581-cc5e-4622-9f8d-e3b0ea9dfbc3.webp',
  '/images/gallery/hf_20260712_205844_5ed791f8-7777-4b76-8458-064be91b4845.webp',
  '/images/gallery/hf_20260712_205054_7f6423ff-6adc-4522-9bc8-ee7e9338eb63.webp',
  '/images/gallery/hf_20260712_204643_ed4790d4-aea9-4b8a-b9cb-41fc3b9060f6.webp',
] as const

// Ключове на удобствата за „Какво включва" — текстът живее в accommodation namespace.
export const VILLA_INCLUDES: readonly string[] = [
  'pool',
  'bathrooms',
  'kitchen',
  'diningLiving',
  'bbqFirepit',
  'poolSlide',
  'kidsCorner',
] as const
