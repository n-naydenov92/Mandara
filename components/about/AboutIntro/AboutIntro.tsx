import type { ComponentType } from 'react'
import { IconBed, IconBath, IconUsers, IconRuler2, IconMapPin } from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent/BotanicalAccent'
import { Icon } from '@/components/ui/Icon/Icon'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { RevealGroup } from '@/components/motion/RevealGroup/RevealGroup'
import { VILLA_STATS, type VillaStatKey } from '@/lib/content/about'
import type { Locale } from '@/lib/i18n/settings'
import styles from './AboutIntro.module.css'

interface AboutIntroProps {
  lng: Locale
}

interface TablerIconProps {
  size?: number | string
  stroke?: number
  className?: string
}

const NO_HINT = ''

const STAT_ICON = {
  rooms: IconBed,
  bathrooms: IconBath,
  capacity: IconUsers,
  area: IconRuler2,
  location: IconMapPin,
} as const satisfies Record<VillaStatKey, ComponentType<TablerIconProps>>

interface VillaStatCardProps {
  icon: ComponentType<TablerIconProps>
  value: string
  label: string
  hint: string
}

function VillaStatCard({ icon, value, label, hint }: VillaStatCardProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.icon}>
        <Icon icon={icon} size={26} />
      </span>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {hint !== NO_HINT && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}

export async function AboutIntro({ lng }: AboutIntroProps) {
  const { t } = await getTranslation(lng, 'about')

  return (
    <Section tone="cream">
      <BotanicalAccent corner="tl" />
      <BotanicalAccent corner="br" />
      <Container>
        <Reveal className={styles.lead} duration={1.4}>
          <p>{t('intro.lead')}</p>
        </Reveal>

        <RevealGroup className={styles.stats}>
          {VILLA_STATS.map((stat) => (
            <VillaStatCard
              key={stat.key}
              icon={STAT_ICON[stat.key]}
              value={t(`intro.stats.${stat.key}.value`)}
              label={t(`intro.stats.${stat.key}.label`)}
              hint={t(`intro.stats.${stat.key}.hint`, { defaultValue: NO_HINT })}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
