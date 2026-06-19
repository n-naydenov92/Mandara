import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import styles from './PageHero.module.css'

interface PageHeroProps {
  image: string
  eyebrow: string
  title: string
  scrollLabel?: string
  kenBurns?: boolean
}

export function PageHero({ image, eyebrow, title, scrollLabel, kenBurns = false }: PageHeroProps) {
  const imageClass = kenBurns ? `${styles.image} ${styles.kenburns}` : styles.image
  return (
    <section className={styles.hero}>
      <Image src={image} alt="" fill priority sizes="100vw" className={imageClass} />
      <div className={styles.overlay} />

      <Reveal className={styles.content} duration={1.4}>
        <Eyebrow tone="ember">{eyebrow}</Eyebrow>
        <h1 className={styles.title}>{title}</h1>
      </Reveal>

      {scrollLabel ? (
        <div className={styles.scroll}>
          <span className={styles.scrollLabel}>{scrollLabel}</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </div>
      ) : null}
    </section>
  )
}
