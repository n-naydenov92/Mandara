'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterTabs } from '@/components/gallery/FilterTabs/FilterTabs'
import { BentoGrid } from '@/components/gallery/BentoGrid/BentoGrid'
import { useLightbox, type LightboxItem } from '@/components/gallery/Lightbox/useLightbox'
import {
  GALLERY_CATEGORIES,
  GALLERY_IMAGES,
  type GalleryCategory,
  type GalleryImage,
} from '@/lib/content/gallery'
import styles from './GalleryView.module.css'

function filterByCategory(category: GalleryCategory): readonly GalleryImage[] {
  if (category === 'all') {
    return GALLERY_IMAGES
  }
  return GALLERY_IMAGES.filter((image) => image.category === category)
}

export function GalleryView() {
  const { t } = useTranslation('gallery')
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')

  const visibleItems = useMemo(() => filterByCategory(activeCategory), [activeCategory])
  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      visibleItems.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: t(`captions.${item.captionKey}`),
      })),
    [visibleItems, t],
  )

  const { open } = useLightbox(lightboxItems)

  const handleSelectCategory = (category: GalleryCategory) => {
    setActiveCategory(category)
  }

  const handleOpen = (index: number) => {
    open(index)
  }

  return (
    <>
      <FilterTabs
        categories={GALLERY_CATEGORIES}
        active={activeCategory}
        onSelect={handleSelectCategory}
      />
      <div
        role="tabpanel"
        id="gallery-panel"
        aria-labelledby={`gallery-tab-${activeCategory}`}
        className={styles.panel}
      >
        {visibleItems.length === 0 ? (
          <p className={styles.empty}>{t('empty')}</p>
        ) : (
          <BentoGrid items={visibleItems} onOpen={handleOpen} />
        )}
      </div>
    </>
  )
}
