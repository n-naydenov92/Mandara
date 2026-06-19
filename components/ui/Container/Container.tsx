import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  const classNames = className ? `${styles.container} ${className}` : styles.container
  return <Tag className={classNames}>{children}</Tag>
}
