import { getTranslation } from '@/lib/i18n/server'
import { bookingGateway } from '@/lib/booking/bookingGateway'
import { InquiryForm } from '@/components/booking/InquiryForm/InquiryForm'
import type { Locale } from '@/lib/i18n/settings'
import styles from './BookingWidget.module.css'

interface BookingWidgetProps {
  lng: Locale
  prefillMessage?: string
}

export async function BookingWidget({ lng, prefillMessage }: BookingWidgetProps) {
  const { t } = await getTranslation(lng, 'booking')
  const config = bookingGateway.getEmbedConfig()

  if (config.provider === 'smoobu' && config.src) {
    return (
      <iframe
        className={styles.embed}
        src={config.src}
        title={t('title')}
        loading="lazy"
      />
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.notice}>
        <h2 className={styles.noticeTitle}>{t('placeholder.title')}</h2>
        <p className={styles.noticeText}>{t('placeholder.text')}</p>
      </div>

      <div>
        <h2 className={styles.formTitle}>{t('title')}</h2>
        <p className={styles.formSubtitle}>{t('subtitle')}</p>
        <InquiryForm defaultMessage={prefillMessage} />
      </div>
    </div>
  )
}
