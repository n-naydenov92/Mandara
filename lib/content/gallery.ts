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

// Всички кадри са в едно съотношение 2400×1792 (4:3); bento клетките кадрират.
const IMG_DIR = '/images/gallery'
const IMG_WIDTH = 2400
const IMG_HEIGHT = 1792

function img(
  id: string,
  category: ImageCategory,
  captionKey: string,
  file: string,
): GalleryImage {
  return { id, category, captionKey, src: `${IMG_DIR}/${file}`, width: IMG_WIDTH, height: IMG_HEIGHT }
}

// Пълната колекция кадри на вилата. Bento ритъмът е период 6 (виж BentoGrid.module.css):
// 1-ви от всяка категория е hero-кадърът в едрата клетка.
export const GALLERY_IMAGES: readonly GalleryImage[] = [
  // dining (9)
  img('din-1', 'dining', 'dining', 'Hp-trapezaria.webp'),
  img('din-2', 'dining', 'kitchen', 'hp-kuhnia.webp'),
  img('din-3', 'dining', 'diningTable', 'hf_20260712_205913_b2cb195e-dec6-4935-b7ba-1adf69fffd92.webp'),
  img('din-4', 'dining', 'kitchen', 'hf_20260712_205909_075c7bec-808a-4461-b619-196108010902.webp'),
  img('din-5', 'dining', 'diningView', 'za-vilata-prostranstvo.webp'),
  img('din-6', 'dining', 'kitchen', 'hf_20260712_205839_0d9f29d5-7280-4a2b-a471-63b91a6e8574.webp'),
  img('din-7', 'dining', 'diningTable', 'hf_20260712_205919_da16f9e3-724f-4c6e-8191-63634f1fe1c9.webp'),
  img('din-8', 'dining', 'diningView', 'hf_20260712_205924_fdc89bb5-e53d-4f9f-876a-a2ee21ca7840.webp'),
  img('din-9', 'dining', 'kitchen', 'hf_20260713_064535_fd60969f-6816-4001-80c5-f0c32827b467.webp'),

  // bedrooms (13)
  img('bed-1', 'bedrooms', 'bedroom', 'hlad.webp'),
  img('bed-2', 'bedrooms', 'bedroom', 'hp-staite.webp'),
  img('bed-3', 'bedrooms', 'bedroom', 'izgrev-zalez-3.webp'),
  img('bed-4', 'bedrooms', 'bedroom', 'zemya-1.webp'),
  img('bed-5', 'bedrooms', 'bedroom', 'izgrev-zalez-1.webp'),
  img('bed-6', 'bedrooms', 'bedroom', 'hlad-0.webp'),
  img('bed-7', 'bedrooms', 'bedroom', 'hlad-1.webp'),
  img('bed-8', 'bedrooms', 'bedroom', 'hlad-2.webp'),
  img('bed-9', 'bedrooms', 'bedroom', 'izgrev-zalez-2.webp'),
  img('bed-10', 'bedrooms', 'bedroom', 'zemya-2.webp'),
  img('bed-11', 'bedrooms', 'bedroom', 'zemya-3.webp'),
  img('bed-12', 'bedrooms', 'bedroom', 'hlad-3.webp'),
  img('bed-13', 'bedrooms', 'bedroom', 'hlad-4.webp'),

  // pool (29)
  img('pool-1', 'pool', 'poolView', 'hp-main-banner.webp'),
  img('pool-2', 'pool', 'pool', 'hf_20260712_204724_57e50f5e-842e-47db-b280-5e69dec12998.webp'),
  img('pool-3', 'pool', 'sunbeds', 'hf_20260712_205448_29ae6d9c-5e88-464f-aa55-878969a75f75.webp'),
  img('pool-4', 'pool', 'pool', 'hf_20260712_204735_ef0d01bf-50b3-4220-b798-fbe855ff5d00.webp'),
  img('pool-5', 'pool', 'poolside', 'hp-za-baseina.webp'),
  img('pool-6', 'pool', 'relax', 'hf_20260712_205441_69c9c616-999d-4f55-ab49-43071041aaa5.webp'),
  img('pool-7', 'pool', 'poolView', 'za-vilata-basein.webp'),
  img('pool-8', 'pool', 'sunbeds', 'hf_20260712_204730_1b12c580-712e-4592-9cbe-4c4c79081cc6.webp'),
  img('pool-9', 'pool', 'pool', 'hf_20260712_205537_29bacfbc-7714-422f-a2eb-003771140661.webp'),
  img('pool-10', 'pool', 'pool', 'hf_20260712_204957_7c394b98-eef4-41c8-8312-efcb91460026.webp'),
  img('pool-11', 'pool', 'sunbeds', 'hf_20260712_205054_7f6423ff-6adc-4522-9bc8-ee7e9338eb63.webp'),
  img('pool-12', 'pool', 'sunbeds', 'hf_20260712_205003_379d1d79-1926-4480-8de5-5464843312e7.webp'),
  img('pool-13', 'pool', 'poolside', 'hf_20260712_205151_61dbc9af-e1ea-49b0-9625-3fd9632939a8.webp'),
  img('pool-14', 'pool', 'pool', 'hf_20260712_205423_02a5fe78-e2ba-4193-b376-35a75bb3070e.webp'),
  img('pool-15', 'pool', 'pool', 'hf_20260712_205452_2ab9a401-0934-4a84-aa5e-5ce3a23638eb.webp'),
  img('pool-16', 'pool', 'sunbeds', 'hf_20260712_205508_fb84f5d4-5b5e-4ad9-8495-04e10c18b8d1.webp'),
  img('pool-17', 'pool', 'pool', 'hf_20260712_205531_4e42678a-344b-4203-90d9-34df941f2237.webp'),
  img('pool-18', 'pool', 'sunbeds', 'hf_20260712_205436_ca816e9a-999b-41c8-aefd-71a18d7b4f08.webp'),
  img('pool-19', 'pool', 'pool', 'za-vilata-banner.webp'),
  img('pool-20', 'pool', 'pool', 'za-vilata-prostranstvo-otvun.webp'),
  img('pool-21', 'pool', 'poolView', 'hp-za-vilata.webp'),
  img('pool-22', 'pool', 'waterslide', 'hf_20260713_064529_1e6138ee-d445-41e4-877f-9b9bc3ac5595.webp'),
  img('pool-23', 'pool', 'relax', 'hf_20260712_204515_38769151-f0e9-4a1f-9d45-6ae5bd282b77.webp'),
  img('pool-24', 'pool', 'relax', 'hf_20260712_204520_f437ab57-81bf-40bc-9b12-94e57e1c542f.webp'),
  img('pool-25', 'pool', 'relax', 'hp-izjivyavane1.webp'),
  img('pool-26', 'pool', 'poolsideAround', 'hf_20260712_205105_0c8e8b50-528e-4790-af5d-a25543688cf2.webp'),
  img('pool-27', 'pool', 'poolsideAround', 'hf_20260712_205112_f8c67ca3-b9dd-4f27-a6e4-8ccc8dff7474.webp'),
  img('pool-28', 'pool', 'relax', 'hf_20260712_204528_886dbd00-511e-458d-a206-b22e2d48a27c.webp'),
  img('pool-29', 'pool', 'relax', 'izjivyavaniya-banner.webp'),

  // yard (7)
  img('yard-1', 'yard', 'courtyard', 'hp-dvor.webp'),
  img('yard-2', 'yard', 'garden', 'za-vilata-gradinata-2.webp'),
  img('yard-3', 'yard', 'lawn', 'za-vilata-gradinata.webp'),
  img('yard-4', 'yard', 'sunbeds', 'hf_20260712_205135_47a11185-186e-473c-962e-df14961ca867.webp'),
  img('yard-5', 'yard', 'courtyard', 'nastanqvane-banner.webp'),
  img('yard-6', 'yard', 'courtyard', 'hf_20260712_205209_1ab55a00-0025-48a0-8ba5-9585fabd80ec.webp'),
  img('yard-7', 'yard', 'garden', 'hf_20260712_205407_c268b051-4680-4f67-b477-c253db344161.webp'),

  // attractions (6)
  img('attr-1', 'attractions', 'playground', 'Hp-detski-kat.webp'),
  img('attr-2', 'attractions', 'playground', 'hf_20260712_205014_4df00427-1de2-4227-b107-df2196eb6a26.webp'),
  img('attr-3', 'attractions', 'bbq', 'hf_20260712_204638_82bdf933-2f6b-4fed-9e5d-7d8739934933.webp'),
  img('attr-4', 'attractions', 'bar', 'hf_20260712_204643_ed4790d4-aea9-4b8a-b9cb-41fc3b9060f6.webp'),
  img('attr-5', 'attractions', 'bar', 'hf_20260712_204655_957cc970-7450-4b8b-8d2b-bb03e6364395.webp'),
  img('attr-6', 'attractions', 'firepit', 'hp-izjivyavane2.webp'),

  // amenities (8)
  img('amen-1', 'amenities', 'sauna', 'hp-sauna.webp'),
  img('amen-2', 'amenities', 'livingRoom', 'za-vilata-hol.webp'),
  img('amen-3', 'amenities', 'staircase', 'hf_20260712_205614_93ee11d8-5667-415f-acfb-003529f3c90b.webp'),
  img('amen-4', 'amenities', 'lounge', 'hf_20260712_205940_62973581-cc5e-4622-9f8d-e3b0ea9dfbc3.webp'),
  img('amen-5', 'amenities', 'sauna', 'hf_20260713_064507_bdc5351d-34c2-42e6-b525-8e4ce5f4ff2b.webp'),
  img('amen-6', 'amenities', 'livingRoom', 'hf_20260712_205844_5ed791f8-7777-4b76-8458-064be91b4845.webp'),
  img('amen-7', 'amenities', 'lounge', 'hf_20260712_210004_e713d2ca-a566-4db7-8645-bb2c5012d147.webp'),
  img('amen-8', 'amenities', 'livingRoom', 'hf_20260712_205934_c574716a-3cb6-4ec3-9078-54a082b84546.webp'),
] as const
