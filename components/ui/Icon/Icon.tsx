import type { ComponentType } from 'react'

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

interface IconProps {
  icon: ComponentType<TablerIconProps>
  size?: number
  className?: string
}

const DEFAULT_STROKE = 1.5

export function Icon({ icon: TablerIcon, size = 20, className }: IconProps) {
  return <TablerIcon size={size} stroke={DEFAULT_STROKE} className={className} />
}
