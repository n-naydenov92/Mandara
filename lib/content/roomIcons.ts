import type { ComponentType } from 'react'
import {
  IconSunrise,
  IconSunLow,
  IconSunHigh,
  IconSunset,
  IconMoon,
  IconMoonStars,
  IconSun,
} from '@tabler/icons-react'

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

// Икона за момента от деня, на който е кръстена стаята — споделена между
// RoomDetailCard (About) и RoomFeature (Настаняване).
export const ROOM_TIME_ICON: Record<string, ComponentType<TablerIconProps>> = {
  dawn: IconSunrise,
  sunrise: IconSunLow,
  noon: IconSunHigh,
  sunset: IconSunset,
  dusk: IconMoon,
  night: IconMoonStars,
}

export const ROOM_TIME_ICON_FALLBACK: ComponentType<TablerIconProps> = IconSun
