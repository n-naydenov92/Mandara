import { IconArrowRight } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { FLAGSHIP_SERVICES } from '@/lib/content/services'
import type { Locale } from '@/lib/i18n/settings'
import { ServicesCarousel, type ServiceSlide } from './ServicesCarousel'
import styles from './ServicesTeaser.module.css'

interface ServicesTeaserProps {
  lng: Locale
}

export async function ServicesTeaser({ lng }: ServicesTeaserProps) {
  const { t } = await getTranslation(lng, 'home')

  const items: ServiceSlide[] = FLAGSHIP_SERVICES.map(({ key, image }) => ({
    src: image,
    alt: t(`services.items.${key}.title`),
    title: t(`services.items.${key}.title`),
    meta: t(`services.items.${key}.meta`),
  }))

  const controlLabels = { prev: t('services.controls.prev'), next: t('services.controls.next') }

  return (
    <Section id="services" tone="transparent">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <Reveal>
            <Eyebrow>{t('services.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.title}>{t('services.title')}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <LocaleLink lng={lng} href="/five-star-services" className={styles.cta}>
              {t('services.cta')}
              <Icon icon={IconArrowRight} size={16} />
            </LocaleLink>
          </Reveal>
        </div>

        <ServicesCarousel
          className={styles.carousel}
          items={items}
          controlLabels={controlLabels}
          regionLabel={t('services.eyebrow')}
        />
      </div>
    </Section>
  )
}
