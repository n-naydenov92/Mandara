'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrowRight } from '@tabler/icons-react'
import { GalleryTile } from '@/components/gallery/GalleryTile/GalleryTile'
import { useLightbox, type LightboxItem } from '@/components/gallery/Lightbox/useLightbox'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { GALLERY_ITEMS, GALLERY_SMALL } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n/settings'
import styles from './GalleryPreview.module.css'

interface GalleryPreviewProps {
  lng: Locale
}

const ALL_ITEMS = [...GALLERY_ITEMS, ...GALLERY_SMALL]

export function GalleryPreview({ lng }: GalleryPreviewProps) {
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')

  const items: LightboxItem[] = useMemo(
    () =>
      ALL_ITEMS.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: t(`gallery.captions.${item.key}`),
      })),
    [t],
  )

  const { open } = useLightbox(items)

  return (
    <Section id="gallery-preview" tone="panel">
      <Container>
        <div className={styles.header}>
          <div>
            <Eyebrow>{t('gallery.eyebrow')}</Eyebrow>
            <h2 className={styles.title}>{t('gallery.title')}</h2>
          </div>
          <LocaleLink lng={lng} href="/gallery" className={styles.viewAll}>
            {tCommon('cta.viewAll')}
            <Icon icon={IconArrowRight} size={16} />
          </LocaleLink>
        </div>

        <div className={styles.grid}>
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryTile
              key={item.key}
              src={item.src}
              caption={t(`gallery.captions.${item.key}`)}
              index={index}
              revealDelay={index * 0.12}
              onOpen={open}
            />
          ))}
        </div>

        <div className={styles.gridSmall}>
          {GALLERY_SMALL.map((item, index) => (
            <GalleryTile
              key={item.key}
              src={item.src}
              caption={t(`gallery.captions.${item.key}`)}
              index={GALLERY_ITEMS.length + index}
              revealDelay={index * 0.12}
              onOpen={open}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
