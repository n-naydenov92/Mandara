import type { ComponentType } from 'react'
import {
  IconPool,
  IconToolsKitchen2,
  IconArmchair,
  IconFlame,
  IconRipple,
  IconMoodKid,
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
  diningLiving: IconArmchair,
  bbqFirepit: IconFlame,
  poolSlide: IconRipple,
  kidsCorner: IconMoodKid,
}

export const VILLA_AMENITY_ICON_FALLBACK: ComponentType<TablerIconProps> = IconLeaf
