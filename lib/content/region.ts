export const REGION_BLOCK_KEYS = ['village', 'nature', 'nearby'] as const
export type RegionBlockKey = (typeof REGION_BLOCK_KEYS)[number]

export interface RegionBlock {
  key: RegionBlockKey
  src: string
  reversed: boolean
}

/* Placeholder снимки (преизползват /public/images/*) — ще се сменят с реална
   фотосесия на Горна Ковачевица. Текстовете живеят в locales/<lng>/region.json
   под blocks.<key>. */
export const REGION_BLOCKS = [
  { key: 'village', src: '/images/gallery/g5.jpg', reversed: false },
  { key: 'nature', src: '/images/gallery/g4.jpg', reversed: true },
  { key: 'nearby', src: '/images/gallery/g2.jpg', reversed: false },
] as const satisfies readonly RegionBlock[]

export const REGION_HERO_IMAGE = '/images/about/villa.jpg'
