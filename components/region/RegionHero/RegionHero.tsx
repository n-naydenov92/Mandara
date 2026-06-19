import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { REGION_HERO_IMAGE } from '@/lib/content/region'
import type { Locale } from '@/lib/i18n/settings'

interface RegionHeroProps {
  lng: Locale
}

export async function RegionHero({ lng }: RegionHeroProps) {
  const { t } = await getTranslation(lng, 'region')

  return (
    <PageHero
      image={REGION_HERO_IMAGE}
      eyebrow={t('hero.eyebrow')}
      title={t('hero.title')}
      scrollLabel={t('hero.scroll')}
    />
  )
}
