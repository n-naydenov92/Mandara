import { ImageReveal } from '@/components/motion/ImageReveal/ImageReveal'
import styles from './ArchImage.module.css'

interface ArchImageProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}

export function ArchImage({ src, alt, sizes, priority, className }: ArchImageProps) {
  const classNames = className ? `${styles.arch} ${className}` : styles.arch
  return (
    <ImageReveal
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      hoverZoom
      kenburns={false}
      className={classNames}
    />
  )
}
