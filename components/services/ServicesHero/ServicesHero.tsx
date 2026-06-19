import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { SERVICE_HERO_IMAGE } from '@/lib/content/services'
import type { Locale } from '@/lib/i18n/settings'
import styles from './ServicesHero.module.css'

interface ServicesHeroProps {
  lng: Locale
}

export async function ServicesHero({ lng }: ServicesHeroProps) {
  const { t } = await getTranslation(lng, 'services')

  return (
    <section className={styles.hero}>
      <Image src={SERVICE_HERO_IMAGE} alt="" fill priority sizes="100vw" className={styles.bg} />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal className={styles.content}>
          <Eyebrow tone="ember">{t('hero.eyebrow')}</Eyebrow>
          <h1 className={styles.title}>{t('hero.title')}</h1>
          <p className={styles.intro}>{t('hero.intro')}</p>
          <Button href="/reservations" lng={lng} variant="solid" className={styles.cta}>
            {t('hero.cta')}
            <Icon icon={IconArrowRight} size={18} />
          </Button>
        </Reveal>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLabel}>{t('hero.scroll')}</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
