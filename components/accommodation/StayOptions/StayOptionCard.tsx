import Image from 'next/image'
import { IconArrowDown } from '@tabler/icons-react'
import { Icon } from '@/components/ui/Icon/Icon'
import styles from './StayOptions.module.css'

type StayVariant = 'villa' | 'room'

interface StayOptionCardProps {
  variant: StayVariant
  href: string
  image: string
  imageAlt: string
  tag: string
  title: string
  price: string
  note: string
  ctaLabel: string
}

export function StayOptionCard({
  variant,
  href,
  image,
  imageAlt,
  tag,
  title,
  price,
  note,
  ctaLabel,
}: StayOptionCardProps) {
  const cardClass = `${styles.card} ${styles[variant]}`

  return (
    <a className={cardClass} href={href}>
      <div className={styles.media}>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.img} />
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
        <p className={styles.note}>{note}</p>
        <span className={styles.cta}>
          {ctaLabel}
          <Icon icon={IconArrowDown} size={16} />
        </span>
      </div>
    </a>
  )
}
