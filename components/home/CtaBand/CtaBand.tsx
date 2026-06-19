import { IconArrowRight } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Container } from '@/components/ui/Container/Container'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import type { Locale } from '@/lib/i18n/settings'
import styles from './CtaBand.module.css'

interface CtaBandProps {
  lng: Locale
}

export async function CtaBand({ lng }: CtaBandProps) {
  const { t, i18n } = await getTranslation(lng, ['home', 'common'])
  const tCommon = i18n.getFixedT(lng, 'common')

  return (
    <section className={styles.band} id="cta">
      <Container className={styles.inner}>
        <Reveal>
          <h2 className={styles.title}>{t('cta.title')}</h2>
          <p className={styles.subtitle}>{t('cta.subtitle')}</p>
          <Button href="/reservations" lng={lng} variant="solid" className={styles.button}>
            {tCommon('cta.inquire')}
            <Icon icon={IconArrowRight} size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
