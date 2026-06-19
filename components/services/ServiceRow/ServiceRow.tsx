import type { ComponentType } from 'react'
import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { SceneReveal } from '@/components/motion/SceneReveal/SceneReveal'
import { SceneItem } from '@/components/motion/SceneReveal/SceneItem'
import styles from './ServiceRow.module.css'

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

interface ServiceRowProps {
  reverse: boolean
  number: string
  icon: ComponentType<TablerIconProps>
  image: string
  imageAlt: string
  title: string
  description: string
  features: readonly string[]
}

const IMAGE_SIZES = '(max-width: 768px) 90vw, 45vw'

export function ServiceRow({
  reverse,
  number,
  icon,
  image,
  imageAlt,
  title,
  description,
  features,
}: ServiceRowProps) {
  const wrapClass = reverse ? `${styles.wrap} ${styles.reverse}` : styles.wrap

  return (
    <SceneReveal className={wrapClass}>
      <SceneItem className={styles.media}>
        <Image src={image} alt={imageAlt} fill sizes={IMAGE_SIZES} className={styles.image} />
      </SceneItem>

      <SceneItem className={styles.text}>
        <div className={styles.meta}>
          <Icon icon={icon} size={26} className={styles.icon} />
          <Eyebrow>{number}</Eyebrow>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              {feature}
            </li>
          ))}
        </ul>
      </SceneItem>
    </SceneReveal>
  )
}
