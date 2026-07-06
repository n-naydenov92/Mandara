// Данни за схематичната карта на България (секция „Локация" в About).
// Силуетът и точките са проектирани еднократно от една проекция
// (equirectangular с корекция cos(midLat)) → точките лежат точно върху силуета.
// Текстовете за разстояние/време живеят в локалите (about.json → location.map).

export const MAP_VIEWBOX = '0 0 1000 639'

// Опростена граница на България (по часовниковата стрелка от СЗ ъгъл).
export const BULGARIA_PATH =
  'M62.3 24 L97.6 55.3 L215.6 95 L350.5 115.8 L480.8 132.5 L572.8 84.5 L672.5 42.8 ' +
  'L733.8 26.1 L976 107.5 L894.8 178.4 L874.8 220.2 L868.7 324.5 L805.8 366.2 L848.8 449.7 ' +
  'L890.2 474.8 L680.1 478.9 L634.1 531.1 L511.5 614.6 L396.5 595.8 L289.2 591.6 L174.2 600 ' +
  'L112.9 612.5 L108.3 529 L102.2 466.4 L31.7 403.8 L36.3 314.1 L51.6 241 L24 178.4 L43.9 95 Z'

export interface MapPoint {
  x: number
  y: number
}

// Вила Мандара — край Горна Ковачица (Монтана, северозапад).
export const VILLA_POINT: MapPoint = { x: 125.2, y: 199.3 }

export const MAP_CITY_KEYS = [
  'vidin',
  'sofia',
  'pleven',
  'blagoevgrad',
  'plovdiv',
  'staraZagora',
  'haskovo',
  'smolyan',
  'burgas',
  'varna',
] as const
export type MapCityKey = (typeof MAP_CITY_KEYS)[number]

export interface MapCity extends MapPoint {
  key: MapCityKey
}

export const MAP_CITIES: readonly MapCity[] = [
  { key: 'vidin', x: 110, y: 82 },
  { key: 'sofia', x: 169.6, y: 324.5 },
  { key: 'pleven', x: 368.9, y: 174.3 },
  { key: 'blagoevgrad', x: 135.9, y: 467 },
  { key: 'plovdiv', x: 388.9, y: 441.4 },
  { key: 'staraZagora', x: 525.3, y: 380.8 },
  { key: 'haskovo', x: 513, y: 485.8 },
  { key: 'smolyan', x: 382.7, y: 560.2 },
  { key: 'burgas', x: 805.8, y: 366.2 },
  { key: 'varna', x: 874.8, y: 220.2 },
] as const
