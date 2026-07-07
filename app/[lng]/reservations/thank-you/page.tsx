import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslation } from '@/lib/i18n/server'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Button } from '@/components/ui/Button/Button'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/settings'
import styles from './thank-you.module.css'

// Placeholder — потребителят ще смени с истинска hero снимка на вилата.
const HERO_IMAGE = '/images/about/villa.jpg'

interface PageProps {
  params: Promise<{ lng: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  const safeLng = isLocale(lng) ? lng : DEFAULT_LOCALE
  const { t } = await getTranslation(safeLng, 'booking')
  // Страница след плащане — не се индексира (достъпна е само през Stripe redirect).
  return { title: t('thankYou.title'), robots: { index: false } }
}

export default async function ReservationsThankYouPage({ params }: PageProps) {
  const { lng } = await params
  if (!isLocale(lng)) {
    notFound()
  }

  const { t } = await getTranslation(lng, 'booking')

  return (
    <>
      <PageHero image={HERO_IMAGE} eyebrow={t('thankYou.eyebrow')} title={t('thankYou.title')} kenBurns />
      <Section tone="cream">
        <Container>
          <div className={styles.wrap}>
            <p className={styles.lead}>{t('thankYou.lead')}</p>
            <p className={styles.body}>{t('thankYou.body')}</p>
            <p className={styles.note}>{t('thankYou.note')}</p>
            <Button href="/" lng={lng} variant="solid" className={styles.cta}>
              {t('thankYou.home')}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
