import { ImageReveal } from '@/components/motion/ImageReveal/ImageReveal'
import styles from './ArchImage.module.css'

interface ArchImageProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  // Изключва вътрешния clip reveal — задай false, когато родителят вече анимира
  // entrance-а (напр. <Reveal>), защото трансформацията му чупи whileInView.
  reveal?: boolean
}

export function ArchImage({ src, alt, sizes, priority, className, reveal }: ArchImageProps) {
  const classNames = className ? `${styles.arch} ${className}` : styles.arch
  return (
    <ImageReveal
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      hoverZoom
      kenburns={false}
      reveal={reveal}
      className={classNames}
    />
  )
}
