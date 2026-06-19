import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <span className={styles.code}>404</span>
      <p className={styles.text}>Страницата не е намерена.</p>
      <Link href="/" className={styles.link}>
        Към началото
      </Link>
    </section>
  )
}
