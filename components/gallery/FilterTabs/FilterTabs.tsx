'use client'

import { useRef, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { GalleryCategory } from '@/lib/content/gallery'
import styles from './FilterTabs.module.css'

interface FilterTabsProps {
  categories: readonly GalleryCategory[]
  active: GalleryCategory
  onSelect: (category: GalleryCategory) => void
}

export function FilterTabs({ categories, active, onSelect }: FilterTabsProps) {
  const { t } = useTranslation('gallery')
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  const focusTab = (index: number) => {
    const next = (index + categories.length) % categories.length
    const category = categories[next]
    if (!category) {
      return
    }
    tabsRef.current[next]?.focus()
    onSelect(category)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      focusTab(index + 1)
    } else if (event.key === 'ArrowLeft') {
      focusTab(index - 1)
    } else if (event.key === 'Home') {
      focusTab(0)
    } else if (event.key === 'End') {
      focusTab(categories.length - 1)
    } else {
      return
    }
    event.preventDefault()
  }

  return (
    <div role="tablist" aria-label={t('categoriesLabel')} className={styles.tabs}>
      {categories.map((category, index) => {
        const isActive = category === active
        return (
          <button
            key={category}
            ref={(node) => {
              tabsRef.current[index] = node
            }}
            type="button"
            role="tab"
            id={`gallery-tab-${category}`}
            aria-selected={isActive}
            aria-controls="gallery-panel"
            tabIndex={isActive ? 0 : -1}
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => onSelect(category)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {t(`categories.${category}`)}
          </button>
        )
      })}
    </div>
  )
}
