import type { ComponentType } from 'react'
import { IconChefHat, IconCar, IconFlower, IconGlassFull, IconBell, IconHanger } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { ServiceRow } from '@/components/services/ServiceRow/ServiceRow'
import { FLAGSHIP_SERVICES, type FlagshipServiceKey } from '@/lib/content/services'
import type { Locale } from '@/lib/i18n/settings'
import styles from './ServicesShowcase.module.css'

interface ServicesShowcaseProps {
  lng: Locale
}

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

const SERVICE_ICON = {
  chef: IconChefHat,
  transfer: IconCar,
  spa: IconFlower,
  tasting: IconGlassFull,
  concierge: IconBell,
  butler: IconHanger,
} as const satisfies Record<FlagshipServiceKey, ComponentType<TablerIconProps>>

const NUMBER_PAD = 2
const CORNERS = ['tr', 'bl', 'br', 'tl'] as const

function formatNumber(index: number): string {
  return String(index + 1).padStart(NUMBER_PAD, '0')
}

export async function ServicesShowcase({ lng }: ServicesShowcaseProps) {
  const { t } = await getTranslation(lng, 'services')

  return (
    <>
      {FLAGSHIP_SERVICES.map((service, index) => {
        const title = t(`items.${service.key}.title`)
        const features = t(`items.${service.key}.features`, { returnObjects: true }) as string[]
        const reverse = index % 2 === 1
        const corner = CORNERS[index % CORNERS.length] ?? 'tr'

        return (
          <Section key={service.key} tone={reverse ? 'ivory' : 'cream'} className={styles.section}>
            <BotanicalAccent corner={corner} className={styles.leaf} />
            <ServiceRow
              reverse={reverse}
              number={formatNumber(index)}
              icon={SERVICE_ICON[service.key]}
              image={service.image}
              imageAlt={title}
              title={title}
              description={t(`items.${service.key}.description`)}
              features={features}
            />
          </Section>
        )
      })}
    </>
  )
}
