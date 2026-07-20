export const REGION_HERO_IMAGE = '/images/region/za-vilata-basein.webp'

export const DESTINATION_KEYS = [
  'chiprovtsiMonastery',
  'chiprovtsi',
  'montanensium',
  'klisura',
  'belogradchik',
  'magura',
  'radetzki',
] as const
export type DestinationKey = (typeof DESTINATION_KEYS)[number]

export type DestinationIconKey = 'monastery' | 'town' | 'fortress' | 'cave' | 'ship'

export interface Destination {
  key: DestinationKey
  iconKey: DestinationIconKey
  distanceKm: number // разстояние с автомобил от вила Мандара (Горна Ковачица)
  timeMin: number // време за път с автомобил в минути
  src: string // реален кадър от дестинацията (споделен с началната страница)
  reversed: boolean // редува тона ivory/transparent и ъгъла на акцента
}

const REGION_IMG_DIR = '/images/homepage'

/* Забележителностите от началната страница, подредени от най-близката до
   най-далечната (с автомобил по път). Снимките са споделени с RegionTeaser
   на home. Текстовете живеят в locales/<lng>/region.json под
   destinations.items.<key>. */
export const DESTINATIONS = [
  { key: 'chiprovtsiMonastery', iconKey: 'monastery', distanceKm: 8, timeMin: 15, src: `${REGION_IMG_DIR}/chiprovski-manastir.webp`, reversed: false },
  { key: 'chiprovtsi', iconKey: 'town', distanceKm: 10, timeMin: 15, src: `${REGION_IMG_DIR}/grad-chiprovtsi.webp`, reversed: true },
  { key: 'montanensium', iconKey: 'fortress', distanceKm: 20, timeMin: 25, src: `${REGION_IMG_DIR}/antichna-krepost-montana.webp`, reversed: false },
  { key: 'klisura', iconKey: 'monastery', distanceKm: 35, timeMin: 45, src: `${REGION_IMG_DIR}/klisurski-manastir.webp`, reversed: true },
  { key: 'belogradchik', iconKey: 'fortress', distanceKm: 40, timeMin: 45, src: `${REGION_IMG_DIR}/belogradchishki-skali.webp`, reversed: false },
  { key: 'magura', iconKey: 'cave', distanceKm: 50, timeMin: 60, src: `${REGION_IMG_DIR}/peshtera-magurata.webp`, reversed: true },
  { key: 'radetzki', iconKey: 'ship', distanceKm: 55, timeMin: 60, src: `${REGION_IMG_DIR}/koraba-radecki.webp`, reversed: false },
] as const satisfies readonly Destination[]
