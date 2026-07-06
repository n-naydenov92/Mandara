import { IconClock, IconMapPin } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import styles from './DistanceChips.module.css'

export interface DistanceUnits {
  km: string
  min: string
  hour: string
}

interface DistanceChipsProps {
  distanceKm: number
  timeMin: number
  units: DistanceUnits
  className?: string
}

const ICON_SIZE = 18
const MINUTES_PER_HOUR = 60

// Под час → „40 мин“; иначе „1 ч 40 мин“ / „2 ч“ (без излишни минути).
function formatTime(totalMin: number, units: DistanceUnits): string {
  if (totalMin < MINUTES_PER_HOUR) {
    return `${totalMin} ${units.min}`
  }
  const hours = Math.floor(totalMin / MINUTES_PER_HOUR)
  const minutes = totalMin % MINUTES_PER_HOUR
  if (minutes === 0) {
    return `${hours} ${units.hour}`
  }
  return `${hours} ${units.hour} ${minutes} ${units.min}`
}

export function DistanceChips({ distanceKm, timeMin, units, className }: DistanceChipsProps) {
  const listClass = className ? `${styles.chips} ${className}` : styles.chips

  return (
    <ul className={listClass}>
      <li className={styles.chip}>
        <Icon icon={IconClock} size={ICON_SIZE} />
        {formatTime(timeMin, units)}
      </li>
      <li className={styles.chip}>
        <Icon icon={IconMapPin} size={ICON_SIZE} />
        {distanceKm} {units.km}
      </li>
    </ul>
  )
}
