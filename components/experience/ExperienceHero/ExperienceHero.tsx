import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { EXPERIENCE_HERO_IMAGE } from '@/lib/content/experience'
import type { Locale } from '@/lib/i18n/settings'

interface ExperienceHeroProps {
  lng: Locale
}

export async function ExperienceHero({ lng }: ExperienceHeroProps) {
  const { t } = await getTranslation(lng, 'experience')

  return (
    <PageHero
      image={EXPERIENCE_HERO_IMAGE}
      eyebrow={t('hero.eyebrow')}
      title={t('hero.title')}
      scrollLabel={t('hero.scroll')}
    />
  )
}
