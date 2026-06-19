import { IconArrowRight } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Icon } from '@/components/ui/Icon/Icon'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { SceneReveal } from '@/components/motion/SceneReveal/SceneReveal'
import { SceneItem } from '@/components/motion/SceneReveal/SceneItem'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { ImageFrame } from '@/components/ui/ImageFrame/ImageFrame'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { EXPERIENCE_IMAGES } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n/settings'
import styles from './ExperienceTeaser.module.css'

interface ExperienceTeaserProps {
  lng: Locale
}

// Горната група се разкрива с един trigger при влизане на секцията, едно по едно:
// ляв текст → лява снимка → дясна снимка.
const TEXT_DELAY = 0
const LEFT_IMAGE_DELAY = 0.15
const RIGHT_IMAGE_DELAY = 0.3

export async function ExperienceTeaser({ lng }: ExperienceTeaserProps) {
  const { t } = await getTranslation(lng, 'home')
  const imageAlt = t('experience.imageAlt')
  const { landscape, portrait } = EXPERIENCE_IMAGES

  return (
    <Section id="experience" tone="ivory">
      <SceneReveal className={styles.wrap} stagger={0} delayChildren={0}>
        <div className={styles.colLeft}>
          <SceneItem className={styles.textTop} delay={TEXT_DELAY}>
            <Eyebrow>{t('experience.eyebrow')}</Eyebrow>
            <p className={styles.lead}>{t('experience.lead')}</p>
          </SceneItem>

          <SceneItem className={styles.imgLeft} delay={LEFT_IMAGE_DELAY}>
            <ImageFrame
              src={landscape.src}
              alt={imageAlt}
              sizes="(max-width: 768px) 70vw, 50vw"
            />
          </SceneItem>
        </div>

        <div className={styles.colRight}>
          <SceneItem className={styles.imgRight} delay={RIGHT_IMAGE_DELAY}>
            <ImageFrame
              src={portrait.src}
              alt={imageAlt}
              sizes="(max-width: 768px) 70vw, 50vw"
            />
          </SceneItem>

          <Reveal className={styles.textBottom}>
            <p className={styles.footerText}>{t('experience.footer')}</p>
            <LocaleLink lng={lng} href="/experience" className={styles.cta}>
              {t('experience.cta')}
              <Icon icon={IconArrowRight} size={16} />
            </LocaleLink>
          </Reveal>
        </div>

        <BotanicalAccent corner="br" className={styles.leaf} />
      </SceneReveal>
    </Section>
  )
}
