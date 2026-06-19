import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { ABOUT_HERO_IMAGE } from '@/lib/content/about'
import type { Locale } from '@/lib/i18n/settings'

interface AboutHeroProps {
  lng: Locale
}

export async function AboutHero({ lng }: AboutHeroProps) {
  const { t } = await getTranslation(lng, 'about')

  return (
    <PageHero
      image={ABOUT_HERO_IMAGE}
      eyebrow={t('hero.eyebrow')}
      title={t('hero.title')}
      scrollLabel={t('hero.scroll')}
    />
  )
}
