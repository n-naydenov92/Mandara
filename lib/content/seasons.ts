export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const
export type Season = (typeof SEASONS)[number]

const SPRING_START = 2
const SUMMER_START = 5
const AUTUMN_START = 8

export function getSeasonByMonth(month: number): Season {
  if (month >= SPRING_START && month < SUMMER_START) {
    return 'spring'
  }
  if (month >= SUMMER_START && month < AUTUMN_START) {
    return 'summer'
  }
  if (month >= AUTUMN_START && month <= 10) {
    return 'autumn'
  }
  return 'winter'
}

export function getCurrentSeason(date: Date = new Date()): Season {
  return getSeasonByMonth(date.getMonth())
}
