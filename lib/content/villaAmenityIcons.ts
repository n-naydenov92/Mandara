import type { ComponentType } from 'react'
import {
  IconPool,
  IconToolsKitchen2,
  IconArmchair,
  IconGrill,
  IconPlant2,
  IconCar,
  IconLeaf,
} from '@tabler/icons-react'

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

// Икона за всяко удобство на цялата вила (ключове от VILLA_INCLUDES).
export const VILLA_AMENITY_ICON: Record<string, ComponentType<TablerIconProps>> = {
  pool: IconPool,
  kitchen: IconToolsKitchen2,
  living: IconArmchair,
  bbq: IconGrill,
  garden: IconPlant2,
  parking: IconCar,
}

export const VILLA_AMENITY_ICON_FALLBACK: ComponentType<TablerIconProps> = IconLeaf
