import { IconToolsKitchen2, IconYoga, IconMountain, IconGlassChampagne } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { ExperienceCarousel } from '@/components/experience/ExperienceCarousel/ExperienceCarousel'
import { EXPERIENCE_MEDIA, type ExperienceThemeKey } from '@/lib/content/experience'
import type { Locale } from '@/lib/i18n/settings'
import styles from './ExperienceBlock.module.css'

type BlockTone = 'ivory' | 'transparent' | 'cream'

interface ExperienceBlockProps {
  lng: Locale
  themeKey: ExperienceThemeKey
  tone?: BlockTone
  reversed?: boolean
}

const EYEBROW_ICON_SIZE = 22

const THEME_ICON = {
  gastronomy: IconToolsKitchen2,
  wellness: IconYoga,
  nature: IconMountain,
  events: IconGlassChampagne,
} as const satisfies Record<ExperienceThemeKey, typeof IconMountain>

export async function ExperienceBlock({
  lng,
  themeKey,
  tone = 'transparent',
  reversed = false,
}: ExperienceBlockProps) {
  const { t } = await getTranslation(lng, 'experience')

  const items = EXPERIENCE_MEDIA[themeKey].map((slide) => {
    const label = t(`themes.${themeKey}.slides.${slide.slideKey}`)
    return { src: slide.src, alt: label, label }
  })
  const controlLabels = { prev: t('controls.prev'), next: t('controls.next') }
  const gridClass = reversed ? `${styles.grid} ${styles.reversed}` : styles.grid
  const accentCorner = reversed ? 'bl' : 'br'

  return (
    <Section id={themeKey} tone={tone}>
      <BotanicalAccent corner={accentCorner} />
      <Container className={gridClass}>
        <Reveal className={styles.text} duration={1.4}>
          <span className={styles.eyebrowRow}>
            <Icon icon={THEME_ICON[themeKey]} size={EYEBROW_ICON_SIZE} className={styles.eyebrowIcon} />
            <Eyebrow>{t(`themes.${themeKey}.eyebrow`)}</Eyebrow>
          </span>
          <h2 className={styles.title}>{t(`themes.${themeKey}.title`)}</h2>
          <p className={styles.intro}>{t(`themes.${themeKey}.intro`)}</p>
        </Reveal>

        <Reveal className={styles.media} delay={0.12} duration={1.4}>
          <ExperienceCarousel items={items} controlLabels={controlLabels} />
        </Reveal>
      </Container>
    </Section>
  )
}
