export const REGION_HERO_IMAGE = '/images/about/villa.jpg'

export const DESTINATION_KEYS = [
  'lopushanski',
  'chiprovtsiMonastery',
  'chiprovtsiMuseum',
  'chiprovtsiWaterfall',
  'martinovoDam',
  'gushovski',
  'durshinSkok',
  'chernogorski',
  'magura',
  'zemen',
] as const
export type DestinationKey = (typeof DESTINATION_KEYS)[number]

export type DestinationIconKey = 'monastery' | 'museum' | 'waterfall' | 'lake' | 'cave'

export interface Destination {
  key: DestinationKey
  iconKey: DestinationIconKey
  distanceKm: number // разстояние с автомобил от вила Мандара (Горна Ковачица)
  timeMin: number // време за път с автомобил в минути
  src: string // placeholder — предстои реална фотосесия на всяка забележителност
  reversed: boolean // редува тона ivory/transparent и ъгъла на акцента
}

/* Топ 10 туристически дестинации, подредени от най-близка до най-далечна.
   Разстоянията/времената са с автомобил по път. Текстовете живеят в
   locales/<lng>/region.json под destinations.items.<key>. */
export const DESTINATIONS = [
  { key: 'lopushanski', iconKey: 'monastery', distanceKm: 6, timeMin: 10, src: '/images/gallery/g4.jpg', reversed: false },
  { key: 'chiprovtsiMonastery', iconKey: 'monastery', distanceKm: 10, timeMin: 15, src: '/images/gallery/g5.jpg', reversed: true },
  { key: 'chiprovtsiMuseum', iconKey: 'museum', distanceKm: 16, timeMin: 22, src: '/images/gallery/g2.jpg', reversed: false },
  { key: 'chiprovtsiWaterfall', iconKey: 'waterfall', distanceKm: 17, timeMin: 28, src: '/images/gallery/g1.jpg', reversed: true },
  { key: 'martinovoDam', iconKey: 'lake', distanceKm: 20, timeMin: 30, src: '/images/about/villa.jpg', reversed: false },
  { key: 'gushovski', iconKey: 'monastery', distanceKm: 22, timeMin: 32, src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_05.png', reversed: true },
  { key: 'durshinSkok', iconKey: 'waterfall', distanceKm: 28, timeMin: 40, src: '/images/gallery/omai_zile_accommodation_104_signature_pavilion_03.png', reversed: false },
  { key: 'chernogorski', iconKey: 'monastery', distanceKm: 95, timeMin: 100, src: '/images/gallery/omai_zile_accommodation_101_master_pavilion_02.png', reversed: true },
  { key: 'magura', iconKey: 'cave', distanceKm: 75, timeMin: 75, src: '/images/gallery/omai_zile_accommodation_106_deluxe_pavilion_07.png', reversed: false },
  { key: 'zemen', iconKey: 'monastery', distanceKm: 130, timeMin: 120, src: '/images/gallery/omai_zile_accommodation_105_deluxe_pavilion_02.png', reversed: true },
] as const satisfies readonly Destination[]
