// Чисти, тестваеми date помощници за календара (понеделник-базирана седмица).

export const WEEK_LENGTH = 7
const MS_PER_DAY = 1000 * 60 * 60 * 24

export function toISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function nightsBetween(arrivalISO: string, departureISO: string): number {
  return Math.round((Date.parse(departureISO) - Date.parse(arrivalISO)) / MS_PER_DAY)
}

// ISO датите на нощите в интервал [arrival, departure) — без деня на заминаване.
export function nightsInRange(arrivalISO: string, departureISO: string): string[] {
  const nights: string[] = []
  const cursor = new Date(arrivalISO)
  const end = new Date(departureISO)
  while (cursor < end) {
    nights.push(toISO(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return nights
}

// ISO датите в инклузивен интервал [start, end] — за избор на дни (шезлонг).
export function daysInRange(startISO: string, endISO: string): string[] {
  const days: string[] = []
  const cursor = new Date(startISO)
  const end = new Date(endISO)
  while (cursor <= end) {
    days.push(toISO(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

function chunk<T>(items: readonly T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push([...items.slice(i, i + size)])
  }
  return rows
}

// Матрица от седмици за месеца; null за празните водещи/следващи клетки.
export function monthMatrix(month: Date): (Date | null)[][] {
  const last = endOfMonth(month).getDate()
  const leading = (startOfMonth(month).getDay() + 6) % 7 // понеделник = 0
  const cells: (Date | null)[] = Array.from({ length: leading }, () => null)
  for (let day = 1; day <= last; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day))
  }
  while (cells.length % WEEK_LENGTH !== 0) {
    cells.push(null)
  }
  return chunk(cells, WEEK_LENGTH)
}
