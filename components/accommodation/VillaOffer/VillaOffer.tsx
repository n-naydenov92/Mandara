import { IconArrowRight, IconSparkles } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Button } from '@/components/ui/Button/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { PRICING, formatPrice } from '@/lib/content/pricing'
import { VILLA_INCLUDES } from '@/lib/content/villa'
import { VILLA_AMENITY_ICON, VILLA_AMENITY_ICON_FALLBACK } from '@/lib/content/villaAmenityIcons'
import type { Locale } from '@/lib/i18n/settings'
import styles from './VillaOffer.module.css'

interface VillaOfferProps {
  lng: Locale
}

export async function VillaOffer({ lng }: VillaOfferProps) {
  const { t } = await getTranslation(lng, 'accommodation')
  const rates = [
    { label: t('pricing.offSeasonLabel'), value: formatPrice(PRICING.whole.offSeason) },
    { label: t('pricing.inSeasonLabel'), value: formatPrice(PRICING.whole.inSeason) },
  ]
  const highlights = t('villa.highlights', { returnObjects: true }) as unknown as string[]

  return (
    <div className={styles.card}>
      <div className={styles.intro}>
        <span className={styles.badge}>
          <Icon icon={IconSparkles} size={15} />
          {t('villa.badge')}
        </span>
        <p className={styles.exclusivity}>{t('villa.exclusivity')}</p>
      </div>

      <div className={styles.rates}>
        {rates.map((rate) => (
          <div key={rate.label} className={styles.rate}>
            <span className={styles.rateLabel}>{rate.label}</span>
            <span className={styles.rateValue}>{rate.value}</span>
            <span className={styles.perNight}>{t('pricing.perNight')}</span>
          </div>
        ))}
      </div>

      <ul className={styles.amenities}>
        {VILLA_INCLUDES.map((key) => {
          const AmenityIcon = VILLA_AMENITY_ICON[key] ?? VILLA_AMENITY_ICON_FALLBACK
          return (
            <li key={key} className={styles.amenity}>
              <span className={styles.amenityIcon} aria-hidden="true">
                <Icon icon={AmenityIcon} size={20} />
              </span>
              {t(`villa.includes.${key}`)}
            </li>
          )
        })}
      </ul>

      <div className={styles.footer}>
        <ul className={styles.highlights}>
          {highlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              {highlight}
            </li>
          ))}
        </ul>
        <Button href="/reservations?subject=villa" lng={lng} variant="solid" className={styles.cta}>
          {t('cta.villa')}
          <Icon icon={IconArrowRight} size={18} />
        </Button>
      </div>
    </div>
  )
}
