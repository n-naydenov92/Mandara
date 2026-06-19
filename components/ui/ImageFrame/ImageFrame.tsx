import Image from 'next/image'
import styles from './ImageFrame.module.css'

interface ImageFrameProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
}

export function ImageFrame({ src, alt, sizes = '50vw', priority = false }: ImageFrameProps) {
  return (
    <div className={styles.frame}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
    </div>
  )
}
