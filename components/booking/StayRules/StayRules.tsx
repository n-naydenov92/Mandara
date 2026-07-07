'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './StayRules.module.css'

interface StayRule {
  title: string
  body: string
}

// Първото правило е отворено по подразбиране, за да подскаже, че секцията се разгъва.
const INITIAL_OPEN_INDEX = 0

export function StayRules() {
  const { t } = useTranslation('booking')
  const rules = t('stayInfo.items', { returnObjects: true }) as unknown as StayRule[]
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([INITIAL_OPEN_INDEX]))

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  if (!Array.isArray(rules) || rules.length === 0) {
    return null
  }

  return (
    <section className={styles.wrap} aria-labelledby="stay-info-title">
      <h3 id="stay-info-title" className={styles.title}>
        {t('stayInfo.title')}
      </h3>
      <ul className={styles.list}>
        {rules.map((rule, index) => {
          const open = openIndices.has(index)
          const headerId = `stay-rule-header-${index}`
          const panelId = `stay-rule-panel-${index}`
          return (
            <li key={rule.title} className={styles.item}>
              <button
                type="button"
                id={headerId}
                className={styles.header}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span className={styles.ruleTitle}>{rule.title}</span>
                <IconChevronDown
                  className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                  size={20}
                  stroke={1.5}
                  aria-hidden
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={open ? `${styles.body} ${styles.bodyOpen}` : styles.body}
              >
                <div className={styles.bodyInner}>
                  <p className={styles.bodyText}>{rule.body}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
