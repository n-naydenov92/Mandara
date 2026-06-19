import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Parallax } from '@/components/motion/Parallax/Parallax'
import styles from './PartHeader.module.css'

interface PartHeaderProps {
  index: string
  label: string
  tag: string
}

export function PartHeader({ index, label, tag }: PartHeaderProps) {
  return (
    <header className={styles.header}>
      <Parallax className={styles.indexWrap} strength={18}>
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
      </Parallax>
      <Reveal className={styles.labelWrap}>
        <h2 className={styles.label}>{label}</h2>
      </Reveal>
      <span className={styles.tag}>{tag}</span>
    </header>
  )
}
